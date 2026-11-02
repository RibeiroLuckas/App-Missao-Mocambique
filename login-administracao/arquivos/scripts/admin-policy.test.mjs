import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

test('RLS: público lê; Google autorizado edita e administra acessos; ajuda exige login e limita envios', async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon; create role authenticated;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key);
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
      create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
      grant usage on schema auth, public, storage to anon, authenticated;
      grant execute on all functions in schema auth to anon, authenticated;
      create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
      create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant select,insert,delete on storage.objects to anon,authenticated;
      insert into auth.users values ('11111111-1111-4111-8111-111111111111');
    `);
    await db.exec(await readFile(new URL('../supabase/migrations/202611020001_admin.sql', import.meta.url), 'utf8'));
    async function actor(role, email, provider = 'google') {
      await db.exec('reset role');
      await db.query("select set_config('request.jwt.claims',$1,false)", [JSON.stringify(email ? { sub: '11111111-1111-4111-8111-111111111111', email, app_metadata: { provider } } : {})]);
      await db.exec(`set role ${role}`);
    }
    const insert = () => db.query("insert into mission_content(id,kind,payload) values ('project','projects',$1)", [{title:'Missão de teste',description:'Descrição pública'}]);
    await actor('anon');
    assert.equal((await db.query('select * from mission_content')).rows.length, 5);
    await assert.rejects(insert(), /permission denied|row-level security/);
    await assert.rejects(db.query('select * from mission_admins'), /permission denied/);
    await assert.rejects(db.query('select reserve_help_request()'), /permission denied/);
    await actor('authenticated','visitor@example.com');
    assert.equal((await db.query('select is_mission_admin() as allowed')).rows[0].allowed,false);
    await assert.rejects(insert(), /row-level security/);
    await assert.rejects(db.query("insert into mission_admins(email) values ('visitor@example.com')"), /row-level security/);
    await assert.rejects(db.query("insert into storage.objects(bucket_id,name) values ('mission-photos','photo.jpg')"), /row-level security/);
    await actor('authenticated','gabriel@innovatsolution.com','email');
    assert.equal((await db.query('select is_mission_admin() as allowed')).rows[0].allowed,false);
    await assert.rejects(db.query('select reserve_help_request()'), /Login Google/);
    for (const email of ['gabriel@innovatsolution.com','eliane.rios@innovatsolution.com','lucas.ribeiro.araujo000@gmail.com']) {
      await actor('authenticated',email);
      assert.equal((await db.query('select is_mission_admin() as allowed')).rows[0].allowed,true,email);
    }
    await insert();
    await db.query("update mission_content set payload = '{\"title\":\"Projeto editado\"}' where id='project'");
    await db.query("insert into storage.objects(bucket_id,name) values ('mission-photos','photo.jpg')");
    await db.query("insert into mission_admins(email) values ('new-admin@example.com')");
    assert.equal((await db.query("delete from mission_admins where email='lucas.ribeiro.araujo000@gmail.com' returning email")).rows.length,0,'cannot revoke own access');
    await actor('authenticated','new-admin@example.com');
    assert.equal((await db.query('select is_mission_admin() as allowed')).rows[0].allowed,true);
    await db.query("delete from mission_admins where email='gabriel@innovatsolution.com'");
    await actor('authenticated','gabriel@innovatsolution.com');
    assert.equal((await db.query('select is_mission_admin() as allowed')).rows[0].allowed,false,'revocation affects existing JWT');
    assert.equal((await db.query("delete from mission_content returning id")).rows.length,0);
    await actor('anon');
    assert.equal((await db.query("select payload from mission_content where id='project'")).rows[0].payload.title,'Projeto editado');
    assert.equal((await db.query("select * from storage.objects")).rows.length,1);
    await actor('authenticated','visitor@example.com');
    for (let i=0;i<3;i++) assert.ok((await db.query('select reserve_help_request() as ticket')).rows[0].ticket);
    await assert.rejects(db.query('select reserve_help_request()'), /Limite de três/);
    await assert.rejects(db.query('select * from developer_help_requests'), /permission denied/);
    await actor('authenticated','new-admin@example.com');
    assert.equal((await db.query('delete from mission_content returning id')).rows.length,6);
    assert.equal((await db.query('delete from storage.objects returning name')).rows.length,1);
  } finally { await db.close(); }
});
