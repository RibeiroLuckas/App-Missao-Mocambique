import { createClient } from 'npm:@supabase/supabase-js@2.118.0';

Deno.serve(async (request: Request) => {
  const origin = request.headers.get('origin') || '';
  const allowed = (Deno.env.get('ALLOWED_ORIGINS') || '').split(',').map(value => value.trim()).filter(Boolean);
  const cors = { 'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : '', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Vary': 'Origin' };
  const reply = (status: number, data: object) => new Response(JSON.stringify(data), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
  if (!origin || !allowed.includes(origin)) return reply(403, { error: 'Origem não autorizada.' });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return reply(405, { error: 'Método não permitido.' });
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return reply(401, { error: 'Faça login.' });
  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth } } });
  const { data: { user }, error: authError } = await client.auth.getUser(auth.slice(7));
  if (authError || !user?.email || user.app_metadata.provider !== 'google') return reply(401, { error: 'Faça login com Google.' });
  let message: unknown;
  try {
    // Bound streamed request size, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: 'Mensagem obrigatória.' });
    const chunks: Uint8Array[] = []; let length = 0;
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      length += value.length;
      if (length > 20000) { await reader.cancel(); return reply(413, { error: 'Mensagem muito longa.' }); }
      chunks.push(value);
    }
    const body = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
    message = JSON.parse(new TextDecoder().decode(body)).message;
  } catch { return reply(400, { error: 'Mensagem inválida.' }); }
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 4000) return reply(400, { error: 'Use de 10 a 4000 caracteres.' });
  const key = Deno.env.get('RESEND_API_KEY'); const from = Deno.env.get('HELP_FROM_EMAIL');
  if (!key || !from) return reply(503, { error: 'Envio de e-mail ainda não configurado.' });
  const { data: ticket, error: limitError } = await client.rpc('reserve_help_request');
  if (limitError) return reply(429, { error: 'Não foi possível reservar o envio. Limite: três solicitações por hora.' });
  const service = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': ticket },
      body: JSON.stringify({ from, to: ['gabriel@innovatsolution.com'], reply_to: user.email, subject: 'Ajuda — App Missão Moçambique', text: `Solicitação: ${ticket}\nConta Google: ${user.email}\n\n${message.trim()}` }),
      signal: AbortSignal.timeout(15000),
    });
    await service.from('developer_help_requests').update({ status: response.ok ? 'sent' : 'failed' }).eq('id', ticket);
    if (!response.ok) return reply(502, { error: 'O provedor de e-mail recusou o envio.' });
    return reply(200, { sent: true });
  } catch {
    await service.from('developer_help_requests').update({ status: 'failed' }).eq('id', ticket);
    return reply(502, { error: 'Não foi possível enviar agora.' });
  }
});
