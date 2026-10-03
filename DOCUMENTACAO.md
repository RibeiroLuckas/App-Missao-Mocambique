# Documentação Técnica e Manual do Usuário
## 🇲🇿 App Missão Moçambique — First Baptist Orlando (Campus Brasileiro)

Este documento reúne todas as especificações técnicas, funcionalidades de negócios, arquitetura e instruções operacionais do **App Missão Moçambique**. Ele foi desenvolvido para auxiliar na apresentação do aplicativo aos líderes da missão e servir como guia de manutenção e expansão.

---

## 📋 Sumário
1. [Visão Geral do Aplicativo](#1-visão-geral-do-aplicativo)
2. [Arquitetura e Tecnologias](#2-arquitetura-e-tecnologias)
3. [Detalhamento de Módulos e Recursos](#3-detalhamento-de-módulos-e-recursos)
4. [Configuração de Mídia e Áudios Bíblicos (CDN & Backblaze B2)](#4-configuração-de-mídia-e-áudios-bíblicos-cdn--backblaze-b2)
5. [Como Rodar, Atualizar e Distribuir no Celular](#5-como-rodar-atualizar-e-distribuir-no-celular)
6. [Painel do Administrador (Como Operar)](#6-painel-do-administrador-como-operar)

---

## 1. Visão Geral do Aplicativo

O **App Missão Moçambique** é uma plataforma digital projetada para conectar, apoiar e engajar a comunidade da **First Baptist Orlando (Campus Brasileiro)** com a frente missionária em Moçambique.

O aplicativo centraliza três pilares essenciais:
1. **Espiritualidade**: Bíblia completa para leitura diária, player de áudio integrado (capítulo por capítulo) e diário de devocional pessoal.
2. **Comunidade**: Mural interativo para compartilhamento e intercessão de pedidos de oração em tempo real.
3. **Apoio Missionário**: Feed dinâmico de notícias direto do campo missionário, informações de contato oficiais, simulador interativo de impacto de doações e instruções claras de contribuição financeira (PIX, Transferência e Doação Online).

---

## 2. Arquitetura e Tecnologias

O aplicativo foi planejado para ser leve, rápido e com altíssima compatibilidade de visualização em dispositivos móveis e desktops.

* **Front-end**: React 18 (com TypeScript para tipagem estática e segurança do código).
* **Build Tool**: Vite (garante carregamento ultrarrápido das dependências e otimização de arquivos de produção).
* **Estilização**: Tailwind CSS (design moderno, responsivo e adaptativo ao tamanho de qualquer tela).
* **Animações**: `motion` (transições de abas, efeitos de toque e modais dinâmicos fluidos).
* **Ícones**: Lucide-React (biblioteca moderna de vetores limpos e consistentes).
* **Persistência de Dados**: LocalStorage no navegador/celular do usuário para dados de uso privado (diário de devocional, histórico de pedidos de oração locais, estado de preferência de áudio).

---

## 3. Detalhamento de Módulos e Recursos

### 🏠 Módulo 1: Início (Home)
* **Versículo Diário**: Roda automaticamente um versículo edificante com base no dia do mês, mantendo a tela sempre atualizada.
* **Feed Missionário**: Lista com as últimas notícias, testemunhos e fotos vindas diretamente de Moçambique.
* **Diário de Devocional**: Campo de texto privado onde o usuário pode escrever suas anotações, lições bíblicas e reflexões pessoais. Os dados são salvos de forma automática e segura no próprio dispositivo do usuário.

### 📖 Módulo 2: Bíblia (Leitura Dinâmica)
* **Estrutura Canônica**: Organizado entre Velho e Novo Testamento.
* **Busca Rápida**: Filtros em tempo real por palavras-chave ou referências bíblicas nos capítulos.
* **Navegação Inteligente**: Botões de capítulo anterior e posterior que facilitam a leitura contínua sem precisar voltar ao menu principal.
* **Compartilhamento**: Copiar versículos diretamente para a área de transferência do celular para enviar via WhatsApp/Redes Sociais com apenas um toque.

### 🎧 Módulo 3: Player de Áudio Bíblico (CDN)
* **Sincronização de Capítulos**: O player reconhece o livro e o capítulo selecionados na aba de leitura e busca o arquivo de áudio equivalente.
* **Compatibilidade e Flexibilidade**: Desenvolvido com uma inteligência que aceita variados padrões de nomenclatura de arquivos (FCBH, Numérico, Curto, etc.) e diferentes versões de áudio (Bíblias Dramatizadas ou leitura simples em português e inglês).
* **Configurações de Reprodução**: Controle de velocidade (0.5x, 1x, 1.25x, 1.5x, 2x), barra de progresso interativa para avançar ou retroceder, mutar áudio e tocar em segundo plano.

### 🙏 Módulo 4: Pedidos de Oração (Mural de Fé)
* **Envio Facilitado**: Formulário simplificado para o membro registrar seu nome, categoria do pedido (Saúde, Família, Libertação, Missões, Intercessão, etc.) e o texto do pedido.
* **Filtros e Visualização**: Filtros rápidos por categoria para incentivar a igreja a interceder por causas específicas.
* **Contador de Intercessores**: Os membros podem interagir com os pedidos clicando no botão de apoio para indicar que "estão orando" por aquela causa.

### 💝 Módulo 5: Apoio e Doações
* **Instruções Bancárias**: Exibição clara de canais online de doação (First Orlando Portal) e dados para transferências internacionais (Banco, SWIFT, Routing Number e conta).
* **Simulador de Impacto**: Uma ferramenta visual onde o doador move um seletor de valor (ex: $20, $50, $150, $500) e o aplicativo mostra imediatamente o benefício físico real que o valor gerará em Moçambique (ex: compra de Bíblias, cestas básicas de alimento, fomento de poço artesiano de água potável ou kits de material escolar).

### ⚙️ Módulo 6: Painel do Administrador (Configurações do App)
* Acesso através de um botão discreto configurado nas configurações, permitindo a edição e personalização ao vivo do aplicativo sem precisar modificar o código-fonte:
  * Alteração do link base do servidor de áudios (CDN).
  * Inserção de novas notícias no feed diretamente pelo celular.
  * Cadastro de novos versículos diários para rotação.
  * Atualização dos dados de doação e canais de transferência oficial.

---

## 4. Configuração de Mídia e Áudios Bíblicos (CDN & Backblaze B2)

Como os áudios da Bíblia inteira ocupam centenas de gigabytes, eles são hospedados em um bucket público na nuvem (Backblaze B2, integrado ou não à CDN) e transmitidos via streaming.

### 🔗 Como os links de áudio são formados
O aplicativo monta o endereço do arquivo MP3 dinamicamente seguindo esta lógica estruturada:
`[URL_BASE_DA_CDN]/[CÓDIGO_DA_VERSÃO]/[NOME_DO_ARQUIVO].mp3`

#### Exemplo prático de URL:
* **URL Base**: `https://bible-audio-missao.b-cdn.net/`
* **Código da Versão**: `PORBBSN1DA` (Bíblia Dramatizada em Português - Novo Testamento)
* **Padrão de arquivo (FCBH)**: `B40___01_Mateus______PORBBSN1DA.mp3`

### 🛠️ Configuração do Bucket Público no Backblaze B2:
1. **Ativação Pública**: O bucket contendo os arquivos MP3 precisa estar configurado como **Public** no painel da Backblaze para permitir que o navegador do usuário faça o streaming sem restrições de cabeçalho de autenticação (Erro 401).
2. **CORS (Cross-Origin Resource Sharing)**: É vital habilitar as regras de CORS no bucket B2 permitindo requisições de origens externas (`*` ou o domínio específico do seu app) para que o navegador não bloqueie a reprodução do áudio por motivos de segurança do player HTML5.
3. **Taxa Única de Ativação ($1.00)**: Para novas contas Backblaze que desejam hospedar buckets públicos de download/streaming direto sem cadastro fixo de faturamento recorrente, o Backblaze requer uma transação rápida de **$1.00** de depósito (crédito) para validar a idoneidade da conta. Esse saldo fica disponível na conta para cobrir qualquer tráfego excedente futuro (lembrando que os primeiros 10 GB de armazenamento mensal e os downloads via integradores de CDN parceiros são totalmente gratuitos).

---

## 5. Como Rodar, Atualizar e Distribuir no Celular

Como este aplicativo foi programado como um **Web App Responsivo**, ele possui extrema versatilidade de distribuição, sem depender exclusivamente das restrições e custos das lojas oficiais da Apple e Google.

### Opção A: PWA (Progressive Web App - Atalho de Instalação Direta)
Esta é a forma como o app foi instalado inicialmente no seu celular. É a mais fácil, barata e independente:
1. **O que é**: O usuário acessa o endereço web oficial do aplicativo no navegador do celular (Safari no iPhone ou Chrome no Android).
2. **Como Instalar**: 
   * **No Android**: Surge um aviso na parte inferior escrito "Adicionar à Tela de Início" ou, clicando nos três pontinhos superiores, seleciona-se "Instalar Aplicativo".
   * **No iOS (iPhone)**: O usuário clica no botão "Compartilhar" (ícone do quadrado com seta para cima) no Safari e escolhe a opção **"Adicionar à Tela de Início"**.
3. **Resultado**: Um ícone da Missão Moçambique aparecerá na tela inicial do celular. Ao abrir, ele roda em tela cheia (sem as barras do navegador), comportando-se exatamente como um aplicativo nativo baixado da loja.
4. **Como atualizar**: **100% automático!** Sempre que você altera e salva o código do site principal, o aplicativo do celular de todos os usuários é atualizado instantaneamente na próxima vez que for aberto. Não há necessidade de reinstalação ou download de novas versões!

### Opção B: Empacotamento Nativo (Google Play e Apple App Store)
Se a liderança da missão fizer questão de colocar o aplicativo para download direto dentro da **Google Play Store** (Android) e **Apple App Store** (iOS), o código-fonte atual deste projeto pode ser facilmente envelopado como aplicativo híbrido nativo.

#### Passos para publicar nas lojas utilizando o **CapacitorJS**:
1. No diretório do projeto, instala-se o Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init "Missão Moçambique" "com.missaomocambique.app" --web-dir=dist
   ```
2. Instalam-se as plataformas desejadas (Android e iOS):
   ```bash
   npm install @capacitor/android @capacitor/ios
   npx cap add android
   npx cap add ios
   ```
3. Toda vez que o aplicativo for atualizado no código, gera-se o build do site e sincroniza-se com o celular:
   ```bash
   npm run build
   npx cap sync
   ```
4. Abre-se o ambiente de compilação nativo do Google (Android Studio) ou Apple (Xcode) para gerar o arquivo `.apk` (Android) ou `.ipa` (iOS) final e enviá-lo para aprovação nas respectivas lojas:
   ```bash
   npx cap open android
   npx cap open ios
   ```

*Nota: Para publicar na Google Play, o desenvolvedor precisa de uma conta de desenvolvedor do Google (taxa única de $25). Para a Apple App Store, é necessária uma conta Apple Developer Program (anuidade de $99).*

---

## 6. Painel do Administrador (Como Operar)

Para evitar que você precise de um programador toda vez que a missão tiver uma novidade, o painel administrativo integrado permite a gestão imediata:

1. Acesse o aplicativo e abra a aba de **Configurações/Administração** (ou clique na engrenagem administrativa).
2. **Adicionar Notícia**: Insira um título, resumo, texto principal e clique em "Salvar". O feed de Moçambique será atualizado instantaneamente para todos os fiéis.
3. **Mudar Contatos e Banco**: Se o PIX ou os dados bancários internacionais mudarem, basta redigir as novas informações no formulário administrativo. Todos os usuários visualizarão as novas informações de doação em tempo real.
4. **Configuração de Áudio**: Se você mudar de provedor de hospedagem de áudio no futuro ou quiser testar novas versões bíblicas, basta alterar a URL base ou os identificadores no painel sem mexer em nenhuma linha de código complexo.

---
*Desenvolvido com carinho para o suporte espiritual e material da Missão Moçambique.*
