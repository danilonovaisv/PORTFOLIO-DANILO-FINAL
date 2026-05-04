# Requirements: 06 O Que Me Move

## Objetivo do negócio
Transformar a seção `O Que Me Move` em uma experiência scroll-driven cinematográfica que consolide o conceito Ghost Design com presença visual forte, sem ruído e sem quebrar a identidade do projeto.

## Objetivo do produto
A seção deve conduzir o visitante por uma narrativa visual composta por:
1. fundo cromático vivo
2. overlay anti-banding
3. header editorial estável
4. frases rotativas em destaque
5. manifesto final centralizado
6. Ghost 3D sobrepondo o clímax visual

## Stack obrigatória
- Next.js 15 App Router
- React 18.3+
- TypeScript 5.x
- Tailwind CSS 3.4+ com Oxide e `source(none)`
- Motion / Framer Motion 11+
- React Three Fiber 8+ + drei + three.js
- Supabase Storage para assets
- Deploy em Vercel ou Firebase
- pnpm

## Restrições rígidas
- Não quebrar tokens do Ghost System.
- Não usar vermelho como cor de identidade.
- Motion permitido: `opacity`, `blur`, `translateY`.
- Motion proibido na UI: `scale`, `rotate`, `bounce`.
- Easing global Ghost: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Grid 4/8/12 com `max-width` até `1680px`.
- `getAssetUrl()` deve vir de `@/lib/utils`.
- Não usar GSAP nesta seção.
- Não expor secrets do Supabase ou do deploy.

## Requisitos funcionais
### RF01
A seção deve começar em `#040013`.

### RF02
As seis frases devem sincronizar a leitura visual com a mudança de background.

### RF03
O background deve ser controlado por `animate() + inView()` da Motion, nunca por `transition: background-color`.

### RF04
O `BeliefFixedHeader` deve usar split text por palavras ou linhas, preservando legibilidade.

### RF05
O `BeliefManifesto` deve revelar `ISSO É / GHOST / DESIGN` no clímax, em três linhas, centralizado.

### RF06
O `GhostScene` deve operar como camada 3D isolada, com `frameloop="demand"` e fallback 2D.

### RF07
No desktop, o Ghost responde a cursor de forma suave.

### RF08
No mobile, o Ghost inicia top-left e só centraliza no clímax.

### RF09
A rota `/sobre` deve ter `loading.tsx`, `error.tsx` e `not-found.tsx`.

### RF10
A experiência deve respeitar `prefers-reduced-motion`.

## Requisitos não funcionais
### RNF01 Performance
Animar prioritariamente `transform` e `opacity`. Blur apenas onde indispensável e com degradação em dispositivos frágeis.

### RNF02 Acessibilidade
Canvas decorativo, fallback visual compatível, sem prender foco em área sticky, sem flashes acima de 3Hz.

### RNF03 Manutenibilidade
Tokens centralizados em `src/config/beliefTokens.ts`; tipos em `src/types/beliefs.ts`; lógica de scroll centralizada em `useBeliefsScroll.ts`.

### RNF04 Observabilidade
Validação final com evidências visuais, checklist de stacking e revisão de reduced motion.

## Conteúdo obrigatório
Frases:
1. Um vídeo que respira
2. Uma marca que se reconhece
3. Um detalhe que fica
4. Crio para gerar presença
5. Mesmo quando não estou ali
6. Mesmo quando ninguém percebe o esforço

Manifesto:
- ISSO É
- GHOST
- DESIGN

Header:
- Acredito no design que muda o dia de alguém.
- Não pelo choque, mas pela conexão.
