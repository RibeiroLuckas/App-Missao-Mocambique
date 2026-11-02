# Login Google e administração

O aplicativo continua público. A entrada fica em **Mais → Entrar / Área administrativa**. Qualquer pessoa conectada com Google pode pedir ajuda; somente e-mails autorizados podem editar conteúdo ou gerenciar acessos. A autorização é aplicada no PostgreSQL e no Storage por RLS, não somente pelos botões da interface.

Administradores iniciais:
- eliane.rios@innovatsolution.com
- gabriel@innovatsolution.com
- lucas.ribeiro.araujo000@gmail.com

## 1. Criar o Supabase e o login Google

1. Crie um projeto em https://supabase.com. Guarde a senha do banco em local seguro.
2. No SQL Editor, execute **uma vez** `supabase/migrations/202611020001_admin.sql`. Isso cria as tabelas, permissões, a lista inicial e o bucket público `mission-photos`.
3. No Google Cloud Console, configure a tela de consentimento OAuth e crie um cliente OAuth do tipo **Web application**. Configure o callback exibido em Supabase → Authentication → Sign In / Providers → Google, normalmente `https://SEU-PROJETO.supabase.co/auth/v1/callback`. Se o aplicativo Google estiver em modo de testes, adicione também os três e-mails como usuários de teste no Google.
4. Ative o provedor **Google** no Supabase com o Client ID e Client Secret. Mantenha outros provedores desativados se não forem usados. O Client Secret fica somente no Supabase.
5. Em Authentication → URL Configuration, defina Site URL para o endereço HTTPS da nova hospedagem e adicione esse endereço à lista de Redirect URLs. Para desenvolvimento, adicione `http://localhost:3000`. Não é preciso usar Vercel.
6. Copie a Project URL e a chave pública `anon` (legacy API key) do Supabase para um `.env.local` ignorado pelo Git:

```dotenv
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
```

Essas duas configurações são públicas e entram no bundle. **Nunca** coloque `service_role`, senhas, Google Client Secret ou chave Resend em variáveis `VITE_*`. Na hospedagem, configure as duas variáveis antes do build, pois Vite as lê ao compilar. Reinicie o servidor local depois de configurá-las.

## 2. Ativar o envio de ajuda por e-mail

A função `developer-help` valida a sessão Google no servidor, aceita até três tentativas por usuário por hora e envia sempre para **gabriel@innovatsolution.com**, com Reply-To igual ao e-mail autenticado. O cliente não pode escolher destinatário ou remetente. Falhas não aparecem como envio confirmado.

1. Crie uma conta em https://resend.com e verifique um domínio remetente que você controla (DNS). O remetente de testes do Resend tem restrições de destinatário; use um domínio verificado para produção.
2. Instale/use a CLI oficial Supabase, autentique-se na sua conta e vincule o projeto: `supabase link --project-ref SEU_PROJECT_REF`.
3. Nas configurações de **Edge Functions → Secrets**, cadastre:
   - `RESEND_API_KEY`: chave privada Resend.
   - `HELP_FROM_EMAIL`: endereço remetente do domínio verificado, por exemplo `suporte@seu-dominio.com`.
   - `ALLOWED_ORIGINS`: origens permitidas separadas por vírgula, sem barra final, por exemplo `https://seu-app.com,http://localhost:3000`.
4. Faça deploy: `supabase functions deploy developer-help`. O arquivo `supabase/config.toml` desativa a checagem JWT do gateway; a função verifica explicitamente o token com `auth.getUser` e exige login Google antes de qualquer envio. As variáveis `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` são fornecidas ao runtime pelo Supabase.
5. Entre com uma conta Google, abra **Mais → Minha conta e administração → Pedir ajuda** e envie uma solicitação. Confirme a entrega na caixa de Gabriel e o Reply-To. Esse teste real depende da configuração acima e não deve ser substituído por respostas simuladas.

Não envie credenciais pelo chat nem as versionem. As chaves privadas ficam nas configurações seguras do serviço.

## 3. Uso da administração

- **Projetos missionários**: adicionar, editar e excluir projetos compartilhados.
- **Missões**: adicionar, editar e excluir viagens, períodos e locais.
- **Fotos**: publicar JPG, PNG ou WebP de até 5 MB e excluir fotos. Imagens publicadas ficam acessíveis ao público; não publique arquivos privados.
- **Acessos**: cadastrar o e-mail Google em minúsculas para conceder acesso administrativo completo. Também é possível revogar acessos. Você não pode remover o próprio acesso pelo painel. A revogação passa a bloquear escritas no banco imediatamente, mesmo que a pessoa ainda esteja com a página aberta.
- **Pedir ajuda**: disponível apenas após login, inclusive a usuários sem acesso administrativo.

Os textos institucionais e os detalhes da parceria continuam como conteúdo editorial do site. O projeto Igreja em Lugares Difíceis e as quatro fotos originais são cadastrados pela migração, preservando a apresentação inicial; o projeto pode ser editado/excluído e as fotos podem ser excluídas no painel. Novos projetos e missões aparecem nas respectivas seções públicas. Os antigos cadastros personalizados salvos apenas em localStorage não são migrados automaticamente. Sem Supabase configurado, o app continua navegável e o login informa que ainda precisa ser ativado, sem simular autenticação.

## 4. Desenvolvimento e validação

```sh
pnpm install --frozen-lockfile
pnpm run dev
pnpm run lint
pnpm run build
pnpm run test:admin
```

Os testes de política usam PostgreSQL via PGlite, com os papéis e funções de autenticação equivalentes para exercitar a migração. O teste de interface usa Chromium instalado (ou `BROWSER_PATH`) e respostas de backend simuladas; ele não comprova a configuração real de Google, Supabase ou Resend. O código de Edge Functions é executado em Deno pelo Supabase e fica fora do tsconfig do navegador.

Ao trocar de hospedagem, sirva `dist` por HTTPS, configure o fallback de navegação para `index.html` e atualize Site URL, Redirect URLs e ALLOWED_ORIGINS. Nenhuma dependência da Vercel foi adicionada.
