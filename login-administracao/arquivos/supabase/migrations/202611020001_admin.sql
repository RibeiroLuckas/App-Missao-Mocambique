-- Run once with the Supabase SQL editor or `supabase db push`.
begin;
create table public.mission_admins (
  email text primary key check (email = lower(trim(email)) and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  created_at timestamptz not null default now()
);
insert into public.mission_admins(email) values
  ('eliane.rios@innovatsolution.com'), ('gabriel@innovatsolution.com'), ('lucas.ribeiro.araujo000@gmail.com');

create function public.is_mission_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (auth.jwt()->'app_metadata'->>'provider') = 'google'
    and exists (select 1 from public.mission_admins where email = lower(auth.jwt()->>'email')),
    false
  );
$$;
revoke all on function public.is_mission_admin() from public;
grant execute on function public.is_mission_admin() to anon, authenticated;
alter table public.mission_admins enable row level security;
revoke all on public.mission_admins from anon, authenticated;
grant select, insert, delete on public.mission_admins to authenticated;
create policy admins_read on public.mission_admins for select to authenticated using (public.is_mission_admin());
create policy admins_add on public.mission_admins for insert to authenticated with check (public.is_mission_admin());
create policy admins_remove on public.mission_admins for delete to authenticated using (public.is_mission_admin() and email <> lower(auth.jwt()->>'email'));

create table public.mission_content (
  id text primary key,
  kind text not null check (kind in ('projects','missions','photos')),
  payload jsonb not null,
  created_at timestamptz not null default now(),
  constraint valid_payload check (
    jsonb_typeof(payload) = 'object'
    and payload ? 'title' and jsonb_typeof(payload->'title') = 'string'
    and length(trim(payload->>'title')) between 1 and 160
    and octet_length(payload::text) <= 20000
    and (kind <> 'photos' or (payload ? 'url' and payload->>'url' ~ '^https://') or (payload ? 'assetKey' and payload->>'assetKey' in ('gal_1','gal_2','gal_3','gal_4')))
  )
);
-- Preserve the existing public project and gallery as editable/deletable records.
insert into public.mission_content(id,kind,payload) values
 ('official-ild','projects','{"title":"Igreja em lugares difíceis","description":"Plantação de igrejas e capacitação pastoral em Beira, Moçambique.","status":"Em Andamento"}'),
 ('gal_1','photos','{"title":"Sorrisos em Moçambique","assetKey":"gal_1","date":"Missão Sofala"}'),
 ('gal_2','photos','{"title":"Inauguração de Poço de Água","assetKey":"gal_2","date":"Região de Beira"}'),
 ('gal_3','photos','{"title":"Alegria do Evangelho","assetKey":"gal_3","date":"Ministério Infantil"}'),
 ('gal_4','photos','{"title":"Mural de Oração & Fé","assetKey":"gal_4","date":"First Orlando"}');
alter table public.mission_content enable row level security;
revoke all on public.mission_content from anon, authenticated;
grant select on public.mission_content to anon, authenticated;
grant insert, update, delete on public.mission_content to authenticated;
create policy content_public_read on public.mission_content for select using (true);
create policy content_admin_insert on public.mission_content for insert to authenticated with check (public.is_mission_admin());
create policy content_admin_update on public.mission_content for update to authenticated using (public.is_mission_admin()) with check (public.is_mission_admin());
create policy content_admin_delete on public.mission_content for delete to authenticated using (public.is_mission_admin());

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('mission-photos','mission-photos',true,5242880,array['image/jpeg','image/png','image/webp']);
create policy photo_public_read on storage.objects for select using (bucket_id = 'mission-photos');
create policy photo_admin_insert on storage.objects for insert to authenticated with check (bucket_id = 'mission-photos' and public.is_mission_admin());
create policy photo_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'mission-photos' and public.is_mission_admin());

create table public.developer_help_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending','sent','failed'))
);
alter table public.developer_help_requests enable row level security;
revoke all on public.developer_help_requests from anon, authenticated;
-- Reserve requests under a per-user transaction lock to enforce the rate limit.
create function public.reserve_help_request() returns uuid
language plpgsql security definer set search_path = '' as $$
declare ticket uuid;
begin
  if auth.uid() is null or coalesce(auth.jwt()->'app_metadata'->>'provider','') <> 'google' then
    raise exception 'Login Google obrigatório';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text, 0));
  if (select count(*) from public.developer_help_requests where user_id = auth.uid() and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'Limite de três solicitações por hora atingido';
  end if;
  insert into public.developer_help_requests(user_id) values (auth.uid()) returning id into ticket;
  return ticket;
end;
$$;
revoke all on function public.reserve_help_request() from public;
grant execute on function public.reserve_help_request() to authenticated;
commit;
