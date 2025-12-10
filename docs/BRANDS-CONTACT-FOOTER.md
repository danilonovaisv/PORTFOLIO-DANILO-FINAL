:PORT DAN REVISADO - NEXT.md

# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

# **SECTION NAME: Clients/Brands**

**SECTION PURPOSE:**

- Mostrar marcas com as quais o designer já trabalhou
- Construir confiança e credibilidade

**PRIMARY MESSAGE / HEADLINE:**

- "marcas com as quais já trabalhei"

**SECONDARY MESSAGE / SUPPORT TEXT:**

- N/A

**KEY CONTENT ELEMENTS:**

- Logos das marcas
- Faixa azul de fundo

**CALL TO ACTION:**

- N/A

**LAYOUT TYPE:**

- Grid de logos

**ALIGNMENT:**

- Horizontal: Logos centralizadas
- Vertical: Centralizado verticalmente

**SPACING:**

- Padding interno: `py-12`
- Margem entre os logos: `gap-4`

**BACKGROUND:**

- Cor sólida azul (`bg-[#0057FF]`)

**SECTION COLORS:**

- Título: `text-white`
- Logos: Branco (`filter brightness-0 invert`)

**TYPOGRAPHY:**

- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold
- Tamanho: `text-xl md:text-2xl`

**IMAGERY:**

- Logos das marcas

**MEDIA:**

- N/A

**COMPONENTS USED:**

- `<section>`, `<div>`, `<h2>`, `<div>` (logo), `<img>`

**STATE VARIANTS:**

- Hover no logo: Leve escala (`scale(1.02)`)

**INTERACTIONS:**

- Hover no logo: Leve escala (`scale(1.02)`)

**SCROLL BEHAVIOUR:**

- Reveal on scroll: Animação de entrada staggered ao entrar na viewport

**ANIMATIONS:**

- Entrada:
  - Título: initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y: 0 }}
  - Logos: staggerChildren: 0.03
  - Cada logo: initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{ opacity: 1, y: 0, scale: 1 }}
- Hover:
  - whileHover={{ scale: 1.04 }} + leve brightness(1.1)

**MICRO-INTERACTIONS:**

- Feedback visual ao hover no logo

**TEXT LIMITS:**

- Título: Máximo 50 caracteres

**CONTENT PRIORITY:**

- Alta: Título e logos

**ALTERNATIVE CONTENT:**

- Se nenhum logo for exibido, mostrar uma mensagem de erro

**LINKS / Globais:**

1. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg`
2. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg`
3. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg`
4. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg`
5. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg`
6. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg`
7. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg`
8. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg`
9. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg`
10. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg`
11. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg`
12. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg`

**DATA HOOKS / TRACKING:**

- Eventos de hover nos logos para analytics

**DEPENDENCIES:**

- `HOMEPAGE_CONTENT.clients`

**ACCESSIBILITY NOTES:**

- Os logos devem ter `alt` descritivo
- Os logos devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de entrada

**SPECIAL STATES:**

- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro

**NOTES / INSPIRATION:**

- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**

- Faixa azul de fundo
- Logos das marcas
- Título "marcas com as quais já trabalhei"

---

# **SECTION NAME: Contact**

**SECTION PURPOSE:**

- Fornecer informações de contato
- Permitir que os usuários enviem mensagens

**PRIMARY MESSAGE / HEADLINE:**

- "contato"

**SECONDARY MESSAGE / SUPPORT TEXT:**

- "Tem uma pergunta ou quer trabalhar junto?"

**KEY CONTENT ELEMENTS:**

- Informações de contato (telefone, email, site)
- Formulário de contato
- Redes sociais

**CALL TO ACTION:**

- Texto: "Enviar Mensagem"
- Comportamento: Ao enviar, envia o formulário para o endpoint definido

**LAYOUT TYPE:**

- Duas colunas em desktop, uma em mobile

**ALIGNMENT:**

- Horizontal: Informações à esquerda, formulário à direita
- Vertical: Centralizado verticalmente

**SPACING:**

- Padding interno: `py-12`
- Margem entre as colunas: `space-x-8`

**BACKGROUND:**

- Cor sólida branca (`bg-white`)

**SECTION COLORS:**

- Título: `text-[#0057FF]`
- Texto: `text-[#111111]`
- Botão: `bg-[#0057FF]`, `text-white`

**TYPOGRAPHY:**

- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo
- Tamanho: Título `text-2xl`, Conteúdo `text-lg`

**IMAGERY:**

- Ícones de redes sociais

**MEDIA:**

- N/A

**COMPONENTS USED:**

- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`, `<button>`, `<a>`

**STATE VARIANTS:**

- Focus nos inputs: Borda e sombra
- Hover no botão: Leve elevação (`translateY(-1px)`)

**INTERACTIONS:**

- Envio do formulário: Envia os dados para o endpoint definido
- Clique nas redes sociais: Abre o link em nova aba

**SCROLL BEHAVIOUR:**

- N/A

**ANIMATIONS:**

- Entrada:
  - Seção: whileInView={{ opacity: 1, y: 0 }} partindo de initial={{ opacity: 0, y: 24 }}
  - Campos do formulário com staggerChildren
- Interações:
  - Inputs com focus-visible: ring-2 ring-blue-500 ring-offset-2 ring-offset-[#f5f5f7]
  - Botão "enviar mensagem":
    - whileHover={{ scale: 1.02, y: -1 }}
    - whileTap={{ scale: 0.98 }}

**MICRO-INTERACTIONS:**

- Feedback visual ao focus nos inputs e ao hover no botão

**TEXT LIMITS:**

- Título: Máximo 30 caracteres
- Subtítulo: Máximo 100 caracteres
- Inputs: Máximo 100 caracteres
- Botão: Máximo 30 caracteres

**CONTENT PRIORITY:**

- Alta: Título e formulário
- Média: Informações de contato e redes sociais

**ALTERNATIVE CONTENT:**

- Se o formulário não carregar, mostrar uma mensagem de erro

**LINKS / DESTINATIONS:**

- Formulário: Endpoint definido em `HOMEPAGE_CONTENT.contact.form.action`
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`

- **Redes sociais: Links externos:**
  - Telefone: `tel:+5511983966838`
  - Email primário: `mailto:dannovaisv@gmail.com`
  - Email secundário: `mailto:danilo@portfoliodanilo.com`
  - Instagram: `https://instagram.com/danilo_novais`
  - Facebook: `https://facebook.com/danilonovaisvilela`
  - LinkedIn: `https://linkedin.com/in/danilonovais`
  - Portfolio: `https://portfoliodanilo.com`
  - Twitter: `https://twitter.com/danilo_novais`

**DATA HOOKS / TRACKING:**

- Eventos de envio do formulário para analytics

**DEPENDENCIES:**

- `HOMEPAGE_CONTENT.contact`

**ACCESSIBILITY NOTES:**

- Todos os inputs devem ter `label` associado
- O formulário deve ser acessível via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações

**SPECIAL STATES:**

- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
- Sucesso: Mostrar mensagem de sucesso

**NOTES / INSPIRATION:**

- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**

- Formulário de contato
- Informações de contato
- Redes sociais

---

## **SECTION NAME: Footer**

**SECTION PURPOSE:**

- Fornecer informações legais e de contato
- Permitir que os usuários voltem ao topo da página

**PRIMARY MESSAGE / HEADLINE:**

- N/A

**SECONDARY MESSAGE / SUPPORT TEXT:**

- "© 2025 Danilo Novais Vilela — todos os direitos reservados"

**KEY CONTENT ELEMENTS:**

- Copyright
- Links de navegação (Home, Portfolio Showcase, Brands, Contact)
- Redes sociais

**CALL TO ACTION:**

- N/A

**LAYOUT TYPE:**

- Barra fixa no rodapé da página

**ALIGNMENT:**

- Horizontal: Copyright à esquerda, links e redes sociais à direita
- Vertical: Centralizado verticalmente

**SPACING:**

- Padding interno: `py-4`
- Margem entre os elementos: `space-x-4`

**BACKGROUND:**

- Cor sólida azul (`bg-[#0057FF]`)

**SECTION COLORS:**

- Texto: `text-white`
- Links: `text-white`, `hover:text-[#0057FF]`

**TYPOGRAPHY:**

- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Regular
- Tamanho: `text-sm`

**IMAGERY:**

- Ícones de redes sociais

**MEDIA:**

- N/A

**COMPONENTS USED:**

- `<footer>`, `<div>`, `<p>`, `<ul>`, `<li>`, `<a>`

**STATE VARIANTS:**

- Hover nos links: Muda a cor do texto para azul (`text-[#0057FF]`)

**INTERACTIONS:**

- Clique nos links: Redireciona para a página ou faz scroll até a seção
- Clique nas redes sociais: Abre o link em nova aba

**SCROLL BEHAVIOUR:**

- Fixo no rodapé da página (`fixed bottom-0 left-0 right-0`)

**ANIMATIONS:**

- Apenas um fadeIn simples:
  - initial={{ opacity: 0 }}
  - whileInView={{ opacity: 1 }}
- Links com sublinhado animado igual ao header; ícones sociais com hover scale(1.05) + leve mudança de opacidade

**MICRO-INTERACTIONS:**

- Feedback visual ao hover nos links

**TEXT LIMITS:**

- Copyright: Máximo 100 caracteres
- Links: Máximo 30 caracteres

**CONTENT PRIORITY:**

- Alta: Copyright e links de navegação
- Média: Redes sociais

**ALTERNATIVE CONTENT:**

- Se nenhuma rede social for exibida, mostrar uma mensagem de erro

**LINKS / DESTINATIONS:**

- Copyright:
  - Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
  - Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos reservados.`
- Links:
  - `home` → `#hero`
  - `portfólio showcase` → `#portfolio-showcase`
  - `sobre` → `#clients`
  - `contato` → `#contact`

**DATA HOOKS / TRACKING:**

- Eventos de clique nos links e redes sociais para analytics

**DEPENDENCIES:**

- `HOMEPAGE_CONTENT.footer`

**ACCESSIBILITY NOTES:**

- Todos os links devem ter `aria-label` descritivo
- O footer deve ser navegável via teclado (tab)

**SPECIAL STATES:**

- N/A

**NOTES / INSPIRATION:**

- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**

- Footer fixo
- Copyright
- Links de navegação
- Redes sociais

---
