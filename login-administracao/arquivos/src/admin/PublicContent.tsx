import { useAdmin } from './AdminProvider';
import { configured } from './client';
import type { ContentKind } from './client';
export default function PublicContent({ kind, onOfficialDetail }: { kind: ContentKind; onOfficialDetail?: () => void }) {
  const { items, error, reload } = useAdmin();
  return <div className="space-y-3">
    {error && <p role="status" className="text-sm text-amber-200">{error} <button onClick={() => void reload()} className="underline">Tentar novamente</button></p>}
    {(kind === 'projects' && !configured ? [{ id: 'official-ild', title: 'Igreja em lugares difíceis', description: 'Plantação de igrejas e capacitação pastoral em Beira, Moçambique.', status: 'Em Andamento', impact: '' }] : items[kind]).map(item => <article key={item.id} className="rounded-2xl border border-[#0b2d4f] bg-[#031d38] p-4 space-y-2">
      <h3 className="font-bold text-white">{item.title}</h3>
      {(item.date || item.location) && <p className="text-sm text-amber-300">{[item.date, item.location].filter(Boolean).join(' · ')}</p>}
      <p className="text-sm whitespace-pre-wrap text-slate-200">{item.description}</p>
      {item.impact && <p className="text-sm text-slate-300">{item.impact}</p>}
      {item.status && <span className="inline-block rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300">{item.status}</span>}
      {item.id === 'official-ild' && onOfficialDetail && <button onClick={onOfficialDetail} className="block text-sm font-bold text-amber-300">Conheça a parceria →</button>}
    </article>)}
  </div>;
}
