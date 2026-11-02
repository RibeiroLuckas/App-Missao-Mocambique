import { createClient } from '@supabase/supabase-js';
const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;
export const configured = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY);
export const supabase = configured ? createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY) : null;
export type ContentKind = 'projects' | 'missions' | 'photos';
export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  impact?: string;
  status?: string;
  date?: string;
  location?: string;
  url?: string;
  storagePath?: string;
  assetKey?: string;
}
