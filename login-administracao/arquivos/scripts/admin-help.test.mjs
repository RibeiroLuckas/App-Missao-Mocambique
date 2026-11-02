import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

test('help endpoint verifies Google session, fixed recipient, limits and mail failures', async () => {
  let handler; let user = null; let limited = false; let sent = []; let mailOk = true;
  const vars = { ALLOWED_ORIGINS: 'https://app.example.com', RESEND_API_KEY: 'test-server-key', HELP_FROM_EMAIL: 'help@example.com', SUPABASE_URL: 'https://test.example.com', SUPABASE_ANON_KEY: 'test-public', SUPABASE_SERVICE_ROLE_KEY: 'test-private' };
  const previousDeno = globalThis.Deno; const previousFetch = globalThis.fetch;
  globalThis.Deno = { env: { get: key => vars[key] }, serve: value => { handler = value; } };
  globalThis.__helpClient = () => ({
    auth: { getUser: async () => ({ data: { user }, error: null }) },
    rpc: async () => ({ data: 'ticket-123', error: limited ? new Error('rate limit') : null }),
    from: () => ({ update: () => ({ eq: async () => ({ error: null }) }) }),
  });
  globalThis.fetch = async (url, options) => { assert.equal(url,'https://api.resend.com/emails'); sent.push(JSON.parse(options.body)); return new Response('{}',{status:mailOk ? 200 : 500}); };
  try {
    const source = await readFile(new URL('../supabase/functions/developer-help/index.ts',import.meta.url),'utf8');
    const compiled = ts.transpileModule(source.replace(/^import .*;\n/, 'const createClient = globalThis.__helpClient;\n'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
    await import('data:text/javascript;base64,'+Buffer.from(compiled.outputText).toString('base64'));
    async function request({ origin='https://app.example.com', token='test-token', message='Preciso de ajuda com a galeria.', extra={} }={}) {
      return handler(new Request('https://test.example.com/functions/v1/developer-help',{method:'POST',headers:{Origin:origin,...(token ? {Authorization:`Bearer ${token}`} : {}),'Content-Type':'application/json'},body:JSON.stringify({message,...extra})}));
    }
    assert.equal((await request({token:null})).status,401);
    assert.equal((await request()).status,401);
    user = { email: 'visitor@example.com', app_metadata: {provider:'email'} };
    assert.equal((await request()).status,401);
    user.app_metadata.provider = 'google';
    assert.equal((await request({origin:'https://evil.example.com'})).status,403);
    assert.equal((await request({message:'short'})).status,400);
    assert.equal((await request({message:'x'.repeat(4001)})).status,400);
    assert.equal((await request({message:'x'.repeat(21000)})).status,413);
    assert.equal(sent.length,0);
    limited=true; assert.equal((await request()).status,429); assert.equal(sent.length,0);
    limited=false;
    const response=await request({extra:{to:'evil@example.com',from:'evil@example.com'}});
    assert.equal(response.status,200); assert.deepEqual(await response.json(),{sent:true});
    assert.deepEqual(sent[0].to,['gabriel@innovatsolution.com']); assert.equal(sent[0].reply_to,'visitor@example.com'); assert.equal(sent[0].from,'help@example.com');
    mailOk=false; assert.equal((await request()).status,502);
    delete vars.RESEND_API_KEY; assert.equal((await request()).status,503);
  } finally { globalThis.fetch=previousFetch; globalThis.Deno=previousDeno; delete globalThis.__helpClient; }
});
