import React, { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck, LogOut, Plus, Pencil, Trash2, ImagePlus, Mail, ArrowLeft } from 'lucide-react';
import { useAdmin } from './AdminProvider';
import { configured, supabase, ContentItem, ContentKind } from './client';

const field = 'w-full rounded-xl border border-slate-600 bg-[#011122] p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400';
const action = 'rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-50';
const labels = { projects: 'Projetos missionários', missions: 'Missões', photos: 'Fotos' };
export function AdminEntry() {
  const { setOpen, session } = useAdmin();
  return <button onClick={() => setOpen(true)} className="w-full flex items-center gap-3 rounded-xl border border-amber-400/30 bg-[#031d38] p-4 text-left">
    <ShieldCheck className="text-amber-400" /><span><strong className="block text-white">{session ? 'Minha conta e administração' : 'Entrar / Área administrativa'}</strong><span className="text-xs text-slate-300">Conta Google · Conteúdo · Ajuda ao desenvolvedor</span></span>
  </button>;
}
export default function AdminPanel() {
  const { session, isAdmin, checking, open, setOpen, items, error, reload } = useAdmin();
  const [tab, setTab] = useState<ContentKind | 'help' | 'access'>('projects');
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [removeEmail, setRemoveEmail] = useState('');
  async function loadEmails() {
    const { data, error } = await supabase!.from('mission_admins').select('email').order('email');
    if (error) throw new Error('Não foi possível carregar os acessos.');
    setEmails(data.map(row => row.email));
  }
  useEffect(() => {
    if (open && isAdmin && tab === 'access') void run(loadEmails);
    else setEmails([]);
  }, [open, isAdmin, tab]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [pendingDelete, setPendingDelete] = useState<ContentItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) { dialog.current?.showModal(); setNotice(''); } else dialog.current?.close();
  }, [open]);
  useEffect(() => { if (!isAdmin) { setEditing(null); setPendingDelete(null); } }, [isAdmin]);
  function switchTab(value: typeof tab) { setTab(value); setEditing(null); setPendingDelete(null); setRemoveEmail(''); setNotice(''); }
  async function run(work: () => Promise<void>) {
    setBusy(true); setNotice('');
    try { await work(); } catch (e) { setNotice(e instanceof Error ? e.message : 'Não foi possível concluir. Tente novamente.'); }
    finally { setBusy(false); }
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!supabase || !isAdmin || !editing || (tab === 'help' || tab === 'access')) return;
    const kind = tab; const id = editing.id || crypto.randomUUID();
    await run(async () => {
      const payload: ContentItem = { id, title: String(form.get('title') || '').trim() };
      if (!payload.title) throw new Error('Informe um título.');
      for (const key of ['description','impact','status','date','location'] as const) if (form.has(key)) payload[key] = String(form.get(key)).trim();
      let uploaded: string | undefined;
      if (kind === 'photos') {
        const file = form.get('photo') as File | null;
        if (!file?.size) throw new Error('Selecione uma foto.');
        const formats: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
        if (!formats[file.type] || file.size > 5 * 1024 * 1024) throw new Error('Use JPG, PNG ou WebP de até 5 MB.');
        uploaded = `${crypto.randomUUID()}.${formats[file.type]}`;
        const { error } = await supabase!.storage.from('mission-photos').upload(uploaded, file, { contentType: file.type });
        if (error) throw new Error('Falha no upload. Verifique sua permissão e tente novamente.');
        payload.url = supabase!.storage.from('mission-photos').getPublicUrl(uploaded).data.publicUrl;
        payload.storagePath = uploaded;
      }
      const operation = editing.id
        ? supabase!.from('mission_content').update({ payload }).eq('id', id).eq('kind', kind).select('id').single()
        : supabase!.from('mission_content').insert({ id, kind, payload }).select('id').single();
      const { error } = await operation;
      if (error) {
        if (uploaded) await supabase!.storage.from('mission-photos').remove([uploaded]);
        throw new Error('Não foi possível salvar. Seu formulário foi mantido para tentar novamente.');
      }
      setEditing(null); await reload(); setNotice('Conteúdo salvo e publicado no site.');
    });
  }
  async function remove() {
    if (!supabase || !isAdmin || !pendingDelete || (tab === 'help' || tab === 'access')) return;
    const item = pendingDelete;
    await run(async () => {
      const { error } = await supabase!.from('mission_content').delete().eq('id', item.id).eq('kind', tab).select('id').single();
      if (error) throw new Error('Não foi possível excluir. Tente novamente.');
      let cleanupFailed = false;
      if (item.storagePath) { const { error } = await supabase!.storage.from('mission-photos').remove([item.storagePath]); cleanupFailed = Boolean(error); }
      setPendingDelete(null); await reload();
      setNotice(cleanupFailed ? 'Foto removida do site; o arquivo ainda precisa ser removido do armazenamento pelo administrador.' : 'Conteúdo excluído.');
    });
  }
  return <dialog ref={dialog} onCancel={e => { if (busy) e.preventDefault(); else setOpen(false); }} onClose={() => setOpen(false)} aria-labelledby="admin-title" className="m-auto w-[calc(100%-1rem)] max-w-xl max-h-[92dvh] overflow-y-auto rounded-3xl border border-[#234561] bg-[#041d34] p-0 text-slate-100 shadow-2xl backdrop:bg-black/75">
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700 bg-[#041d34] p-5"><h2 id="admin-title" className="font-bold">Área administrativa</h2><button aria-label="Fechar administração" disabled={busy} onClick={() => setOpen(false)} className="p-2"><X /></button></header>
    <div className="p-5 space-y-5">
      {!session ? <div className="space-y-5 py-5 text-center">
        <ShieldCheck className="mx-auto h-14 w-14 text-amber-400" /><p className="text-xs uppercase tracking-widest text-amber-400">Missão Moçambique</p><h3 className="text-3xl font-bold">Bem-vindo de volta</h3><p className="text-slate-300">Entre com sua conta Google para acessar sua conta. A equipe autorizada pode gerenciar fotos, missões e projetos.</p>
        <button className={action + ' w-full'} disabled={!configured || busy} onClick={() => void run(async () => {
          sessionStorage.setItem('mission_admin_return', 'true');
          const { error } = await supabase!.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } });
          if (error) { sessionStorage.removeItem('mission_admin_return'); throw new Error('Não foi possível iniciar o login com Google. Tente novamente.'); }
        })}><span className="mr-3 inline-block rounded-full bg-white px-2 font-bold text-blue-600">G</span>Continuar com Google</button>
        {!configured && <p role="status" className="rounded-xl border border-amber-400/30 p-3 text-sm text-amber-200">O login ainda não foi ativado. Configure o Supabase e o provedor Google para continuar.</p>}
        <p className="text-xs text-slate-400">O site continua disponível para visitar sem fazer login.</p>
      </div> : <>
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold break-all">{session.user.email}</p><p className="text-xs text-slate-300">{checking ? 'Verificando acesso…' : isAdmin ? 'Administrador autorizado' : 'Conta conectada'}</p></div><button disabled={busy} className="flex gap-2 text-sm" onClick={() => void run(async () => { const { error } = await supabase!.auth.signOut(); if (error) throw new Error('Não foi possível sair.'); })}><LogOut size={18} /> Sair</button></div>
        {!checking && !isAdmin && <p className="rounded-xl bg-slate-800 p-4 text-sm">Sua conta não tem permissão para alterar o site. Solicite acesso à equipe responsável. Você pode usar o formulário de ajuda abaixo.</p>}
        <nav aria-label="Administração" className="flex flex-wrap gap-2">{isAdmin && (Object.keys(labels) as ContentKind[]).map(kind => <button disabled={busy} key={kind} onClick={() => switchTab(kind)} aria-pressed={tab === kind} className={`rounded-xl px-3 py-2 text-sm ${tab === kind ? 'bg-amber-400 text-slate-950' : 'bg-slate-800'}`}>{labels[kind]}</button>)}{isAdmin && <button disabled={busy} onClick={() => switchTab('access')} aria-pressed={tab === 'access'} className="rounded-xl bg-slate-800 px-3 py-2 text-sm">Acessos</button>}<button disabled={busy} onClick={() => switchTab('help')} className="rounded-xl bg-slate-800 px-3 py-2 text-sm">Pedir ajuda</button></nav>
        {(tab === 'help' || (!isAdmin && !checking)) ? <form className="space-y-4" onSubmit={event => { event.preventDefault(); void run(async () => {
          const { error } = await supabase!.functions.invoke('developer-help', { body: { message } });
          if (error) throw new Error('Não foi possível enviar o e-mail. Tente novamente mais tarde.');
          setMessage(''); setNotice('Solicitação enviada para gabriel@innovatsolution.com.');
        }); }}><h3 className="font-bold flex gap-2"><Mail /> Ajuda do desenvolvedor</h3><p className="text-sm text-slate-300">Descreva sua dúvida ou problema. A resposta será enviada para o e-mail da sua conta Google.</p><label className="block">Mensagem<textarea required minLength={10} maxLength={4000} value={message} onChange={e => setMessage(e.target.value)} className={field + ' mt-2 min-h-36'} /></label><button disabled={busy || message.trim().length < 10} className={action}>{busy ? 'Enviando…' : 'Enviar solicitação'}</button></form> : isAdmin && tab === 'access' ? <>
          <h3 className="text-xl font-bold">Administradores autorizados</h3>
          <p className="text-sm text-slate-300">Adicione o e-mail da conta Google. Essa pessoa poderá editar o site e gerenciar outros administradores.</p>
          <form className="space-y-3" onSubmit={event => { event.preventDefault(); void run(async () => {
            const email = newEmail.trim().toLowerCase();
            const { error } = await supabase!.from('mission_admins').insert({ email });
            if (error) throw new Error(error.code === '23505' ? 'Este e-mail já está autorizado.' : 'Não foi possível autorizar este e-mail.');
            setNewEmail(''); await loadEmails(); setNotice('E-mail autorizado. A pessoa já pode entrar com Google.');
          }); }}>
            <label className="block">E-mail Google<input type="email" required maxLength={254} value={newEmail} onChange={event => setNewEmail(event.target.value)} className={field + ' mt-1'} /></label><button disabled={busy} className={action}>Autorizar e-mail</button>
          </form>
          <ul className="space-y-3">{emails.map(email => <li key={email} className="rounded-xl border border-slate-700 p-3 space-y-2"><span className="block break-all">{email}</span>{email !== session.user.email?.toLowerCase() && <button disabled={busy} className="text-sm text-red-300" onClick={() => setRemoveEmail(email)}>Remover acesso</button>}</li>)}</ul>
          {removeEmail && <div role="alert" className="rounded-xl border border-red-400 p-3 space-y-3"><p>Remover acesso de {removeEmail}?</p><button disabled={busy} onClick={() => void run(async () => {
            const { error } = await supabase!.from('mission_admins').delete().eq('email', removeEmail).select('email').single();
            if (error) throw new Error('Não foi possível remover o acesso.');
            setRemoveEmail(''); await loadEmails(); setNotice('Acesso removido.');
          })} className="mr-4 text-red-300">Confirmar remoção</button><button disabled={busy} onClick={() => setRemoveEmail('')}>Cancelar</button></div>}
        </> : isAdmin && tab !== 'help' && <>
          {editing ? <form key={`${tab}-${editing.id}`} onSubmit={save} className="space-y-4">
            <button type="button" disabled={busy} onClick={() => setEditing(null)} className="flex gap-2 text-sm"><ArrowLeft size={18} /> Cancelar</button><h3 className="text-xl font-bold">{editing.id ? 'Editar' : 'Adicionar'} {tab === 'photos' ? 'foto' : tab === 'missions' ? 'missão' : 'projeto'}</h3>
            <label className="block">Título<input name="title" required maxLength={160} defaultValue={editing.title} className={field + ' mt-1'} /></label>
            {tab === 'photos' ? <label className="block">Foto (JPG, PNG ou WebP, até 5 MB)<input name="photo" type="file" required accept="image/jpeg,image/png,image/webp" className={field + ' mt-1'} /></label> : <>
              <label className="block">Descrição<textarea name="description" required maxLength={5000} defaultValue={editing.description} className={field + ' mt-1 min-h-28'} /></label>
              {tab === 'missions' ? <><label className="block">Período<input name="date" required maxLength={160} defaultValue={editing.date} className={field + ' mt-1'} /></label><label className="block">Local<input name="location" required maxLength={200} defaultValue={editing.location} className={field + ' mt-1'} /></label></> : <label className="block">Impacto<input name="impact" maxLength={500} defaultValue={editing.impact} className={field + ' mt-1'} /></label>}
              <label className="block">Status<select name="status" defaultValue={editing.status || 'Planejado'} className={field + ' mt-1'}>{['Planejado','Em Andamento','Concluído','Inscrições Abertas','Confirmado'].map(status => <option key={status}>{status}</option>)}</select></label>
            </>}
            <button disabled={busy} className={action}>{busy ? 'Salvando…' : 'Salvar e publicar'}</button>
          </form> : <>
            <button disabled={busy} className={action + ' flex items-center gap-2'} onClick={() => setEditing({ id: '', title: '' })}>{tab === 'photos' ? <ImagePlus size={18} /> : <Plus size={18} />} Adicionar {tab === 'photos' ? 'foto' : tab === 'missions' ? 'missão' : 'projeto'}</button>
            {items[tab].length === 0 && <p className="text-sm text-slate-300">Nenhum conteúdo cadastrado nesta seção.</p>}
            {items[tab].map(item => <article key={item.id} className="space-y-3 rounded-xl border border-slate-700 p-4">{item.url && <img src={item.url} alt={item.title} className="h-36 w-full rounded-lg object-cover" />}<h3 className="font-bold">{item.title}</h3><p className="text-sm text-slate-300 whitespace-pre-wrap">{item.description}</p><div className="flex gap-4">{tab !== 'photos' && <button disabled={busy} onClick={() => setEditing(item)} className="flex gap-2 text-amber-300"><Pencil size={18} />Editar</button>}<button disabled={busy} onClick={() => setPendingDelete(item)} className="flex gap-2 text-red-300"><Trash2 size={18} />Excluir</button></div></article>)}
          </>}
          {pendingDelete && <div role="alert" className="rounded-xl border border-red-400 p-4 space-y-3"><p>Excluir “{pendingDelete.title}”? Esta ação remove o conteúdo do site.</p><div className="flex gap-4"><button disabled={busy} onClick={() => void remove()} className="rounded-lg bg-red-700 p-3">Confirmar exclusão</button><button disabled={busy} onClick={() => setPendingDelete(null)}>Cancelar</button></div></div>}
        </>}
      </>}
      {(notice || error) && <p role="status" className="rounded-xl border border-amber-400/30 p-3 text-sm text-amber-200">{notice || error}</p>}
    </div>
  </dialog>;
}
