# 05-CONTATO

## 0. Estrutura de arquivos da página

- Arquivos principais:
  - `src/app/contato/page.tsx`
- Componentes reutilizados:
  - `src/components/home/clients/ClientsBrandsSection.tsx`
  - `src/components/home/contact/ContactSection.tsx`
  - `src/components/layout/SiteFooter.tsx`
- Dependências:
  - Metadata do Next.js
  - Componente de dados estruturados JSON-LD (`src/components/ui/JsonLd.tsx`)
  - Resend API (para envio dos e-mails de formulário via endpoint `/api/contact`)

## 1. Objetivo da Página

Oferecer uma rota dedicada de conversão direta e contato institucional. A página reúne o formulário de envio de mensagens e as redes sociais profissionais do criador em uma URL limpa (`/contato`), otimizada para ser compartilhada em propostas comerciais e cartões de visita digitais.

## 2. Estrutura de Conteúdo

A página `/contato` é composta por uma sequência vertical de componentes estruturados:
1. **Marcas e Clientes (ClientsBrandsSection):** Exibe a parede de marcas atendidas para passar credibilidade antes da ação.
2. **Formulário de Contato (ContactSection):** Formulário de envio de mensagem de contato com inputs validados para Nome, E-mail, Telefone/WhatsApp e Mensagem.
3. **Rodapé (SiteFooter):** Fechamento padrão do site com direitos autorais e links de termos/privacidade.

## 3. Identidade Visual

- **Cores aplicadas:**
  - Fundo escuro absoluto (`#040013`) herdado de globals e cores de acento do Ghost Design System (azul primário e ciano elétrico).
- **Densidade:**
  - Densidade de informação focada puramente em comunicação e fechamento.

## 4. Interatividade & Animações

- **Validação e Envio de Formulário:**
  - Validação estrita de campos em client-side e feedback de loading/sucesso durante o disparo do formulário.
  - O formulário dispara os dados para a API Route `/api/contact` que se conecta via Resend API para notificar `danilo@portfoliodanilo.com` instantaneamente em HTML estilizado nas cores do Ghost Era.
- **Scroll Animado:**
  - Elementos entram na tela usando animações coordenadas de viewport via Framer Motion.

## 5. Responsividade

- Layout mobile-first com inputs de formulário largos de fácil digitação no toque e flexibilização de margens verticais.

## 6. Acessibilidade & SEO

- **JSON-LD (Structured Data):**
  - Renderiza dados estruturados de "ContactPage" para buscadores com a correta árvore de breadcrumbs `/` ➔ `/contato`.
- **Meta Tags de SEO:**
  - Meta Title: `Contato | Vamos Conversar`
  - Meta Description: `Fale com Danilo Novais para projetos de branding, motion e experiências digitais. Formulário direto, e-mail e redes para iniciar a conversa.`
  - Canonical: `https://portfoliodanilo.com/contato`
