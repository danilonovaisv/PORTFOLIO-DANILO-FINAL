---
description: # 🕵️ Workflow: Auditoria de Layout e Conformidade Visual
---

# 🕵️ Workflow: Auditoria de Layout e Conformidade Visual (Atualizado)

**Agente:** `DesignSystemAuditor`
**Objetivo:** Garantir fidelidade pixel-perfect e coerência semântica entre Design (Docs) e Código (Src).

---

## 🏗️ Passo 1: Inicialização e Setup

O usuário deve iniciar o comando definindo o escopo.

**Comando de Entrada:**
`/audit --page [HOME | SOBRE | PORTFOLIO] --agent [NOME]`

**Mapeamento de Contexto (Automático):**
O agente deve carregar imediatamente os arquivos correspondentes à seleção, usando os caminhos exatos abaixo:

| Seleção  | Fonte da Verdade (Docs/Ref)                                | Implementação (Código Alvo) |
| -------- | ---------------------------------------------------------- | --------------------------- |
| **HOME** | **Visual Desktop:** `HOME-PORTFOLIO-BLACK---GHOST.jpg`<br> |

<br>**Visual Mobile:** `HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg`<br>

<br>**Specs:** `HOME - PROTOTIPO INTERATIVO.md` | `src/app/page.tsx`<br>

<br>`src/components/home/*` |
| **SOBRE** | **Visual Desktop:** `SOBRE-PORTFOLIO-BLACK---GHOST.jpg`<br>

<br>**Visual Mobile:** `SOBRE-MOBILE-BLACK---GHOST.jpg`<br>

<br>**Specs:** `SOBRE-PROTOTIPO-INTERATIVO.md` | `src/app/sobre/page.tsx`<br>

<br>`src/components/sobre/*` |
| **PORTFOLIO** | **Visual Desktop:** `PORTFOLIO-PAGE-LAYOUYT.jpg`<br>

<br>**Specs:** `PORTFOLIO - PROTÓTIPO INTERATIVO.md` | `src/app/portfolio/page.tsx`<br>

<br>`src/components/portfolio/*` |

---

## 🔍 Passo 2: Protocolo de Análise Profunda

O agente deve percorrer o código e compará-lo com as regras visuais e especificações técnicas carregadas.

### 1. Estrutura e Grid

- **Largura Máxima:** Verificar `layout.tsx` e containers principais. Eles usam `max-w-screen-xl` ou valores arbitrários que divergem do design?
- **Colunas:**
- _Home:_ O Grid Bento de projetos em `src/components/home/FeaturedProjectsSection.tsx` respeita a assimetria da imagem `HOME-PORTFOLIO-BLACK`?
- _Portfolio:_ O `ProjectsGallery.tsx` está usando 3 colunas no desktop e 1 no mobile conforme o MD?

- **Ordem (Mobile vs Desktop):** Verificar se classes como `order-last lg:order-first` estão sendo usadas corretamente para reorganizar blocos.

### 2. Espaçamentos (Ritmo Vertical)

- **Gaps:** Medir visualmente (mentalmente comparando o código) se os `gap-4`, `gap-8` do Tailwind correspondem ao respiro das imagens.
- **Padding de Seção:** Verificar se as seções principais (`HomeHero`, `AboutOrigin`, etc.) possuem `py-16` ou `py-24` consistentes.

### 3. Tipografia e Textos

- **Fonte:** Confirmar se `src/config/brand.ts` está sendo a única fonte de definição de fontes (`TT Norms Pro`).
- **Hierarquia:**
- Verificar se os tamanhos de fonte em `src/app/globals.css` (clamp) estão sendo aplicados via classes utilitárias (`text-display`, `text-h1`).

- **Quebra de Linha:** O agente deve alertar se títulos longos não tiverem `max-w-[ch]` para evitar linhas infinitas em monitores ultrawide.

### 4. Responsividade

- **Breakpoints:** Verificar o uso consistente do prefixo `lg:` (1024px) como ponto de virada principal (Desktop).
- **Menu:** O `MobileStaggeredMenu.tsx` deve ser ativado apenas em `< lg`.
- **Touch Targets:** Botões em `src/components/ui/CTAButton.tsx` devem ter altura mínima (ex: `h-12` ou `py-3`).

### 5. Componentes e Interações

- **Estados:** Verificar se os botões têm `hover:`, `active:` e `focus-visible:` definidos.
- **Feedback:** Componentes de formulário (`ContactForm.tsx`) possuem estados de erro/sucesso visuais alinhados com o tema escuro?
- **Animações:** As transições em `src/config/motion.ts` estão sendo usadas, ou há animações "hardcoded" soltas nos componentes?

### 6. Acessibilidade

- **Contraste:** Verificar se textos cinza (`text-secondary`) sobre fundo preto têm contraste suficiente.
- **Tags Semânticas:** Uso correto de `<main>`, `<section>`, `<h1>`, `<button>` vs `<div>`.
- **Imagens:** Verificar se componentes como `Image` do Next.js possuem `alt` descritivo.

### 7. Coerência Global

- **Design Tokens:** O código usa cores hexadecimais soltas (ex: `#0048ff`) ou usa variáveis do Tailwind/Brand (`bg-primary`)? _Isso é crítico para manutenção._

---

## 📝 Passo 3: Geração do Relatório de Auditoria

O agente deve retornar a análise no seguinte formato estruturado:

### 📊 Relatório de Auditoria: [NOME DA PÁGINA]

**Status Geral:** 🟢 Aprovado / 🟡 Atenção / 🔴 Crítico

#### 1. Discrepâncias Visuais (Design vs Code)

| Elemento/Seção | O que diz o Design (Docs) | O que diz o Código (Src) | Severidade | Sugestão de Correção                      |
| -------------- | ------------------------- | ------------------------ | ---------- | ----------------------------------------- |
| Ex: Hero H1    | Fonte Bold, 64px          | Fonte Regular, 48px      | 🔴 Crítico | Ajustar classes para `font-bold text-6xl` |

#### 2. Análise Estrutural e Semântica

- **HTML/SEO:** (Ex: H1 duplicado encontrado na página Sobre).
- **Responsividade:** (Ex: Padding lateral insuficiente no mobile em `src/app/page.tsx`).
- **Componentização:** (Ex: Código repetido que poderia ser isolado).

#### 3. Auditoria de Performance e Best Practices

- **CLS (Layout Shift):** (Ex: Imagens sem `width/height`).
- **Hardcoded Values:** (Ex: Cores `#040013` usadas inline).

---

## 🚀 Passo 4: Plano de Ação Executável

Para cada item "🔴 Crítico" ou "🟡 Importante", o agente deve gerar um **Prompt de Correção Atômico** pronto para ser executado por um coder.

---

**Para iniciar, basta dizer:**
"Audite a página [HOME / SOBRE / PORTFOLIO]"
