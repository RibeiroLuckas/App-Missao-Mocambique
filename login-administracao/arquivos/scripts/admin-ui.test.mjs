import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

test('admin UI: public navigation, Google entry, CRUD, access management and authenticated support', { timeout: 120000 }, async () => {
  const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','3100','--strictPort'],{env:{...process.env,VITE_SUPABASE_URL:'https://mission-ui-test.supabase.co',VITE_SUPABASE_ANON_KEY:'test-public-key'},stdio:['ignore','pipe','pipe']});
  let output=''; server.stdout.on('data',data=>output+=data);server.stderr.on('data',data=>output+=data);
  let browser;
  try {
    for(let i=0;i<100;i++) { if(output.includes('ready in'))break; if(server.exitCode!==null)throw new Error(output); await new Promise(resolve=>setTimeout(resolve,100)); }
    browser=await chromium.launch({executablePath:process.env.BROWSER_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
    let rows=[]; let emails=['gabriel@innovatsolution.com']; let helpCalls=0; let failSave=false;
    async function context(role) {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      ctx.setDefaultTimeout(10000);
      if(role) await ctx.addInitScript(({role})=>{
        const user={id:'11111111-1111-4111-8111-111111111111',email:role==='admin'?'gabriel@innovatsolution.com':'visitor@example.com',app_metadata:{provider:'google'},user_metadata:{},aud:'authenticated',created_at:new Date().toISOString()};
        const payload=btoa(JSON.stringify({sub:user.id,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated'}));
        localStorage.setItem('sb-mission-ui-test-auth-token',JSON.stringify({access_token:`eyJhbGciOiJIUzI1NiJ9.${payload}.test`,refresh_token:'test-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user}));
      },{role});
      await ctx.route('https://mission-ui-test.supabase.co/**',async route=>{
        const req=route.request(), url=new URL(req.url()), method=req.method();
        const respond=(body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
        if(url.pathname.includes('/rpc/is_mission_admin'))return respond(role==='admin');
        if(url.pathname.includes('/mission_content')){
          const id=url.searchParams.get('id')?.replace('eq.','');
          if(method==='GET')return respond(rows);
          if(failSave)return respond({message:'forced failure'},500);
          const body=req.postDataJSON();
          if(method==='POST')rows.unshift(body);
          if(method==='PATCH')rows=rows.map(row=>row.id===id?{...row,...body}:row);
          if(method==='DELETE')rows=rows.filter(row=>row.id!==id);
          return respond({id:id||body.id});
        }
        if(url.pathname.includes('/mission_admins')){
          if(method==='GET')return respond(emails.map(email=>({email})));
          if(method==='POST'){const email=req.postDataJSON().email;emails.push(email);return respond(null,201);}
          if(method==='DELETE'){const email=url.searchParams.get('email').replace('eq.','');emails=emails.filter(e=>e!==email);return respond({email});}
        }
        if(url.pathname.includes('/functions/v1/developer-help')){helpCalls++;return respond({sent:true});}
        if(url.pathname.includes('/storage/v1/object'))return respond({Key:'uploaded'});
        return respond({});
      });
      await ctx.route(/https:\/\/(?!mission-ui-test\.supabase\.co).*/,route=>route.abort());
      return ctx;
    }
    async function open(page) { await page.goto('http://127.0.0.1:3100'); await page.locator('#nav-tab-mais').click(); await page.getByRole('button',{name:/Entrar \/ Área administrativa|Minha conta e administração/}).click(); }
    const anon=await context(null);const publicPage=await anon.newPage();await open(publicPage);
    assert.equal(await publicPage.getByRole('button',{name:'Continuar com Google'}).isVisible(),true);
    assert.equal(await publicPage.getByRole('button',{name:'Pedir ajuda',exact:true}).count(),0);
    await publicPage.getByRole('button',{name:'Fechar administração'}).click();await publicPage.locator('#nav-tab-inicio').click();
    const admin=await context('admin');const page=await admin.newPage();await open(page);
    await page.getByText('Administrador autorizado',{exact:true}).waitFor();
    await page.getByRole('button',{name:'Adicionar projeto',exact:true}).click();
    await page.getByLabel('Título',{exact:true}).fill('Poço comunitário');await page.getByLabel('Descrição',{exact:true}).fill('Água potável para a comunidade.');
    failSave=true;await page.getByRole('button',{name:'Salvar e publicar'}).click();await page.getByText(/Seu formulário foi mantido/).waitFor();assert.equal(await page.getByLabel('Título',{exact:true}).inputValue(),'Poço comunitário');
    failSave=false;await page.getByRole('button',{name:'Salvar e publicar'}).click();await page.getByRole('heading',{name:'Poço comunitário'}).waitFor();
    await page.getByRole('button',{name:'Editar',exact:true}).click();await page.getByLabel('Título',{exact:true}).fill('Poço atualizado');await page.getByRole('button',{name:'Salvar e publicar'}).click();await page.getByRole('heading',{name:'Poço atualizado'}).waitFor();
    await page.getByRole('button',{name:'Missões',exact:true}).click();await page.getByRole('button',{name:'Adicionar missão',exact:true}).click();
    await page.getByLabel('Título',{exact:true}).fill('Missão Beira');await page.getByLabel('Descrição',{exact:true}).fill('Apoio comunitário e evangelismo.');await page.getByLabel('Período').fill('Julho 2027');await page.getByLabel('Local',{exact:true}).fill('Beira');await page.getByRole('button',{name:'Salvar e publicar'}).click();await page.getByRole('heading',{name:'Missão Beira'}).waitFor();
    await page.getByRole('button',{name:'Editar',exact:true}).click();await page.getByLabel('Título',{exact:true}).fill('Missão Beira editada');await page.getByRole('button',{name:'Salvar e publicar'}).click();await page.getByRole('heading',{name:'Missão Beira editada'}).waitFor();
    await page.getByRole('button',{name:'Excluir',exact:true}).click();await page.getByRole('button',{name:'Cancelar',exact:true}).click();assert.equal(rows.filter(r=>r.kind==='missions').length,1);
    await page.getByRole('button',{name:'Excluir',exact:true}).click();await page.getByRole('button',{name:'Confirmar exclusão'}).click();await page.getByText('Conteúdo excluído.',{exact:true}).waitFor();assert.equal(rows.filter(r=>r.kind==='missions').length,0);
    await page.getByRole('button',{name:'Fotos',exact:true}).click();await page.getByRole('button',{name:'Adicionar foto',exact:true}).click();await page.getByLabel('Título',{exact:true}).fill('Foto da missão');
    await page.locator('input[type=file]').setInputFiles({name:'foto.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nL8AAAAASUVORK5CYII=','base64')});
    await page.getByRole('button',{name:'Salvar e publicar'}).click();await page.getByRole('heading',{name:'Foto da missão'}).waitFor();assert.ok(rows.find(r=>r.kind==='photos').payload.storagePath);
    await page.getByRole('button',{name:'Excluir',exact:true}).click();await page.getByRole('button',{name:'Confirmar exclusão'}).click();await page.getByText('Conteúdo excluído.',{exact:true}).waitFor();
    await page.getByRole('button',{name:'Acessos',exact:true}).click();await page.getByLabel('E-mail Google').fill('new-admin@example.com');await page.getByRole('button',{name:'Autorizar e-mail'}).click();await page.getByText('E-mail autorizado.',{exact:false}).waitFor();assert.ok(emails.includes('new-admin@example.com'));
    await page.getByRole('button',{name:'Remover acesso',exact:true}).click();await page.getByRole('button',{name:'Confirmar remoção'}).click();await page.getByText('Acesso removido.',{exact:true}).waitFor();assert.ok(!emails.includes('new-admin@example.com'));
    await page.getByRole('button',{name:'Fechar administração'}).click();await page.getByRole('button',{name:/Projetos Missionários Poços/}).click();await page.getByRole('heading',{name:'Poço atualizado'}).waitFor();
    const visitor=await context('visitor');const visitorPage=await visitor.newPage();await open(visitorPage);await visitorPage.getByText('Sua conta não tem permissão',{exact:false}).waitFor();assert.equal(await visitorPage.getByRole('button',{name:'Acessos',exact:true}).count(),0);
    await visitorPage.getByLabel('Mensagem',{exact:true}).fill('Preciso de ajuda com o aplicativo.');await visitorPage.getByRole('button',{name:'Enviar solicitação'}).click();await visitorPage.getByText('Solicitação enviada para gabriel@innovatsolution.com.',{exact:true}).waitFor();assert.equal(helpCalls,1);
    await visitor.close();await admin.close();await anon.close();
  } finally { if(browser)await browser.close();server.kill('SIGTERM'); }
});
