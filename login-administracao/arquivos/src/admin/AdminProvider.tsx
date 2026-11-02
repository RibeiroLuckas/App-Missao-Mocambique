import React, { createContext, useContext, useEffect, useState } from 'react';
import { originalPhotoUrls } from './initialGallery';
import type { Session } from '@supabase/supabase-js';
import { supabase, ContentItem, ContentKind } from './client';

type Collections = Record<ContentKind, ContentItem[]>;
const empty: Collections = { projects: [], missions: [], photos: [] };
const Context = createContext<{
  session: Session | null; isAdmin: boolean; checking: boolean; open: boolean;
  setOpen: (open: boolean) => void; items: Collections; error: string;
  reload: () => Promise<void>; loaded: boolean;
}>(null!);
export const useAdmin = () => useContext(Context);
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(Boolean(supabase));
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Collections>(empty);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  async function reload() {
    if (!supabase) return;
    const { data, error } = await supabase.from('mission_content').select('id,kind,payload').order('created_at', { ascending: false });
    if (error) { setError('Não foi possível carregar os conteúdos. Tente novamente.'); return; }
    const next: Collections = { projects: [], missions: [], photos: [] };
    for (const row of data) if (row.kind in next) next[row.kind as ContentKind].push({ ...row.payload, ...(row.kind === 'photos' && row.payload.assetKey ? { url: originalPhotoUrls[row.payload.assetKey] } : {}), id: row.id });
    setItems(next); setLoaded(true); setError('');
  }
  useEffect(() => {
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((_event, value) => { setIsAdmin(false); setChecking(true); setSession(value); });
    supabase.auth.getSession().then(({ data, error }) => { if (error) setError('Não foi possível recuperar sua sessão.'); setSession(data.session); setChecking(false); if (data.session && sessionStorage.getItem('mission_admin_return')) { setOpen(true); sessionStorage.removeItem('mission_admin_return'); } });
    void reload();
    const refresh = () => { void reload(); };
    window.addEventListener('focus', refresh);
    return () => { data.subscription.unsubscribe(); window.removeEventListener('focus', refresh); };
  }, []);
  useEffect(() => {
    let active = true;
    if (!session || !supabase) { setIsAdmin(false); setChecking(false); return; }
    setChecking(true);
    supabase.rpc('is_mission_admin').then(({ data, error }) => {
      if (active) { setIsAdmin(!error && data === true); setChecking(false); if (error) setError('Não foi possível verificar sua permissão.'); }
    });
    return () => { active = false; };
  }, [session]);
  return <Context.Provider value={{ session, isAdmin, checking, open, setOpen, items, error, reload, loaded }}>{children}</Context.Provider>;
}
