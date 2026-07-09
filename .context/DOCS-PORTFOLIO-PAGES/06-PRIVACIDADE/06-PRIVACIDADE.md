# 06-PRIVACIDADE

## 0. Estrutura de arquivos da página

- Arquivos principais:
  - `src/app/privacidade/page.tsx`
- Componentes reutilizados:
  - `src/components/layout/SiteFooter.tsx`
- Dependências:
  - Metadata do Next.js
  - Componente de dados estruturados JSON-LD (`src/components/ui/JsonLd.tsx`)

## 1. Objetivo da Página

Garantir conformidade regulatória e transparência legal sobre o tratamento de dados pessoais. A página explica de forma direta, clara e concisa quais dados são coletados pelo formulário de contato, como são utilizados e quais os direitos do usuário sobre suas próprias informações.

## 2. Estrutura de Conteúdo

A página `/privacidade` é estruturada com:

1. **Título Principal (h1):** "Política de Privacidade".
2. **Introdução:** Texto explicativo sobre o compromisso com a privacidade do usuário.
3. **Seção de Coleta de Dados (h2):** Detalha quais campos do formulário (nome, e-mail, telefone, mensagem) são armazenados e tratados.
4. **Seção de Uso das Informações (h2):** Explica que as informações servem unicamente para responder às propostas e dúvidas enviadas pelo usuário, proibindo o compartilhamento com terceiros.
5. **Seção de Cookies e Analytics (h2):** Informações sobre a coleta opcional e analítica de tráfego.
6. **Seção de Direitos (h2):** Informa como o usuário pode exercer o direito de retificar ou excluir suas informações a qualquer momento, incluindo um link para a rota `/contato`.
7. **Rodapé (SiteFooter):** Fechamento padrão com as informações de copyright e links rápidos.

## 3. Identidade Visual

- **Cores aplicadas:**
  - Fundo escuro padrão (`#040013`).
  - Títulos em branco sólido (`#fcffff`) e textos em branco translúcido (`text-white/80` ou `text-white/70`).
  - Link de contato estilizado em azul primário (`text-bluePrimary underline`).
- **Layout:**
  - Envolvido pela grid padrão do design system (`.std-grid`) limitando o conteúdo a uma largura ergonômica de leitura (`max-w-3xl`) centralizada.

## 4. Interatividade & Animações

- **Navegação estática:**
  - Por se tratar de uma página informativa/legal, a interatividade é mínima para priorizar carregamento instantâneo, contendo apenas o link para a página de contato.

## 5. Responsividade

- A grade `.std-grid` ajusta automaticamente as margens laterais conforme o dispositivo, garantindo que o texto permaneça legível em telas pequenas.

## 6. Acessibilidade & SEO

- **JSON-LD (Structured Data):**
  - Renderiza dados estruturados com a marcação de breadcrumbs `/` ➔ `/privacidade`.
- **Meta Tags de SEO:**
  - Meta Title: `Política de Privacidade`
  - Meta Description: `Entenda como os dados são tratados no portfólio de Danilo Novais. Transparência sobre coleta, uso e direitos de privacidade.`
  - Canonical: `https://portfoliodanilo.com/privacidade`
