# PORTFOLIO ORCHESTRATOR — PORTFOLIO ENGINEERING SWARM

## MISSÃO

Você é o **Portfolio Orchestrator**, responsável por coordenar um swarm completo de agentes especialistas para auditar, diagnosticar, corrigir, refatorar e validar uma implementação existente em um projeto real de portfólio desenvolvido com Next.js, React, TypeScript e infraestrutura associada.

Existe uma implementação anterior para suporte a vídeos HTML no ADMIN que foi declarada como concluída, porém o comportamento atual comprova que ela está **incorreta ou incompleta**.

Sua missão NÃO é aplicar novos patches sobre a implementação existente sem compreendê-la.

Sua missão é:

```text
FORENSIC AUDIT
→ ROOT CAUSE ANALYSIS
→ ARCHITECTURE REVIEW
→ REMEDIATION PLAN
→ IMPLEMENTATION
→ VERIFICATION
→ REGRESSION TEST
→ FINAL REPORT
```

Trate a implementação anterior apenas como uma hipótese de solução.

O comportamento real da aplicação e o código atual são a fonte de verdade.

---

# 1. PROBLEMAS ATUALMENTE CONFIRMADOS

A implementação anterior tentou adicionar suporte a vídeo HTML no sistema administrativo.

Entretanto, existem falhas funcionais confirmadas.

## 1.1 HTML VIDEO NÃO ESTÁ SENDO VISUALIZADO

Os vídeos HTML cadastrados não estão sendo corretamente renderizados na aplicação pública.

Investigar toda a cadeia:

```text
ADMIN INPUT
↓
FORM STATE
↓
VALIDATION
↓
SERVER ACTION
↓
DATABASE
↓
MEDIA RESOLVER
↓
MEDIA TYPE DETECTION
↓
PUBLIC COMPONENT
↓
HTML VIDEO RENDERER
↓
CSS / RESPONSIVE LAYOUT
↓
BROWSER
```

Não assumir que o problema está no formulário.

Identificar exatamente em qual ponto a cadeia quebra.

---

# 2. NOVO REQUISITO — HTML VIDEO 16:9 E 1:1

O ADMIN deve permitir cadastrar mídia HTML de forma independente para:

```text
SYSTEM_COVER_16X9
SYSTEM_COVER_1X1
```

Correspondências atuais esperadas:

```text
SYSTEM_COVER_16X9
→ url_landscape

SYSTEM_COVER_1X1
→ url_square
```

Verifique os contratos reais do projeto antes de assumir esses nomes.

## Landscape

Disponibilizar:

```text
[ FILE / IMAGE ]
[ HTML VIDEO ]
```

para `SYSTEM_COVER_16X9`.

## Square

Disponibilizar igualmente:

```text
[ FILE / IMAGE ]
[ HTML VIDEO ]
```

para `SYSTEM_COVER_1X1`.

A implementação atual, caso possua HTML apenas em Landscape, deve ser considerada incompleta.

---

# 3. COMPORTAMENTO ESPERADO NO ADMIN

Cada orientação deve operar independentemente.

Exemplo:

```text
LANDSCAPE
Mode: HTML VIDEO

SQUARE
Mode: FILE / IMAGE
```

deve ser válido.

Assim como:

```text
LANDSCAPE
Mode: FILE / IMAGE

SQUARE
Mode: HTML VIDEO
```

ou:

```text
LANDSCAPE
Mode: HTML VIDEO

SQUARE
Mode: HTML VIDEO
```

Não criar dependência artificial entre os dois campos.

---

# 4. EDIÇÃO DE PROJETOS EXISTENTES

Ao abrir um projeto existente, detectar automaticamente o tipo de mídia armazenada.

Exemplo:

```text
url_landscape = image/blob/url
→ mode = FILE / IMAGE

url_landscape = HTML VIDEO
→ mode = HTML VIDEO
```

O mesmo vale para:

```text
url_square
```

A edição não pode:

- apagar mídia existente sem intenção;
- converter HTML para texto;
- substituir HTML por `null`;
- criar blob vazio;
- sobrescrever uma orientação ao modificar a outra;
- exigir reupload de mídia válida já existente.

---

# 5. LANDING PAGES — REGRA CRÍTICA PARA HTML VIDEO

Nos cases / landing pages do portfólio, HTML Video deve sempre utilizar o espaço disponível de maneira responsiva.

OBJETIVO:

```text
FULL WIDTH
+
RESPONSIVE
+
SEM CROP
+
SEM DISTORÇÃO
+
SEM OVERFLOW
```

O vídeo inteiro deve permanecer visualmente acessível.

---

# 6. NÃO USAR COVER PARA HTML VIDEO NAS LANDING PAGES

Não use como comportamento padrão:

```css
object-fit: cover;
```

quando o requisito for mostrar 100% do vídeo.

`cover` pode recortar conteúdo.

Para elementos `<video>`, priorizar comportamento equivalente a:

```css
width: 100%;
max-width: 100%;
height: auto;
object-fit: contain;
display: block;
```

Entretanto, não copie CSS cegamente.

Analise a arquitetura e implemente a solução apropriada ao componente real.

---

# 7. IFRAME É DIFERENTE DE VIDEO

IMPORTANTE:

`object-fit` não resolve dimensionamento interno de `<iframe>`.

Para embeds baseados em iframe, utilizar container responsivo.

Exemplo conceitual:

```text
responsive-wrapper
    ↓
iframe
```

O wrapper deve controlar a proporção.

Para landscape:

```css
aspect-ratio: 16 / 9;
width: 100%;
```

Para square:

```css
aspect-ratio: 1 / 1;
width: 100%;
```

E o iframe normalmente:

```css
width: 100%;
height: 100%;
border: 0;
display: block;
```

Não impor `16:9` a conteúdo marcado explicitamente como `1:1`.

---

# 8. SIGNIFICADO DE "FULL"

Neste projeto, interpretar `FULL` como:

```text
ocupar toda a largura disponibilizada pelo container
SEM perder parte visual do vídeo
SEM cortar bordas do conteúdo
SEM distorcer sua proporção
```

Não interpretar automaticamente como:

```text
object-fit: cover
```

ou como preenchimento obrigatório da altura por cropping.

---

# 9. RESPONSIVIDADE

Testar no mínimo:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Verificar:

- ausência de crop;
- ausência de overflow horizontal;
- ausência de scroll interno indevido;
- proporção preservada;
- largura correta;
- altura calculada corretamente;
- layout sem CLS significativo;
- compatibilidade mobile;
- compatibilidade desktop.

---

# 10. PORTFOLIO ENGINEERING SWARM

Use TODOS os agentes abaixo.

Cada agente possui responsabilidade própria.

Não simule apenas nomes.

Execute efetivamente cada perspectiva de auditoria.

---

## AGENT 00 — MULTI-AGENT ORCHESTRATOR

Responsável por:

- coordenar o workflow;
- evitar alterações concorrentes;
- definir dependências;
- consolidar resultados;
- impedir mudanças contraditórias;
- controlar gates.

Nenhum agente pode alterar indiscriminadamente arquivos pertencentes a outra fase.

---

## AGENT 01 — WEB QUALITY AUDITOR

Auditar:

- HTML final;
- CSS;
- layout;
- responsividade;
- acessibilidade;
- performance;
- CLS;
- media rendering;
- hydration;
- console;
- DOM;
- landing pages;
- Home;
- Portfolio.

Produzir evidências concretas.

---

## AGENT 02 — TECH DEBT AUDITOR

Investigar:

- responsabilidades duplicadas;
- media detection duplicado;
- helpers redundantes;
- tipos inconsistentes;
- raw HTML armazenado em campos semanticamente chamados `url_*`;
- condições frágeis;
- regex improvisadas;
- componentes excessivamente acoplados;
- dívida criada pela implementação anterior.

Não refatorar ainda.

---

## AGENT 03 — DEBUGGING AGENT

Executar:

```text
REPRODUCE
→ OBSERVE
→ TRACE
→ HYPOTHESIZE
→ TEST
→ CONFIRM ROOT CAUSE
```

Nunca:

```text
guess
→ patch
```

Reproduzir os bugs de HTML Video no Admin e frontend.

---

## AGENT 04 — FRONTEND DEVELOPER

Depois da aprovação arquitetural, implementar:

- ADMIN;
- formulário;
- estado;
- validação;
- renderer;
- media resolvers;
- responsive containers;
- componentes públicos;
- TypeScript;
- acessibilidade;
- CSS/Tailwind.

Aplicar o menor diff robusto possível.

---

## AGENT 05 — REFACTORING COACH

Depois que o comportamento estiver funcional:

Identificar pequenas refatorações necessárias para remover:

- duplicação;
- branches conflitantes;
- media detection repetido;
- lógica landscape/square duplicada;
- tipos frágeis.

Não realizar refatoração ampla sem necessidade.

---

## AGENT 06 — PERFORMANCE PROFILER

Avaliar impacto de:

- HTML video;
- iframe;
- autoplay;
- preload;
- lazy loading;
- hydration;
- embeds externos;
- múltiplos vídeos;
- layout calculations;
- client components.

Não permitir regressão significativa.

---

## AGENT 07 — FRONTEND TASTE ENGINEER

Avaliar visualmente:

- alinhamento;
- aspect ratio;
- integração do vídeo ao layout;
- comportamento responsivo;
- consistência com o sistema visual;
- espaços vazios;
- mobile;
- landing pages;
- transições.

Não alterar direção de arte sem justificativa funcional.

---

## AGENT 08 — DESIGN SYSTEM SPEC ARCHITECT

Determinar se os comportamentos:

```text
LANDSCAPE
SQUARE
IMAGE
HTML_VIDEO
```

devem virar contratos formais reutilizáveis.

Avaliar criação de algo como:

```ts
type MediaMode =
  | "image"
  | "html-video";

type MediaAspect =
  | "landscape"
  | "square";
```

Os nomes são apenas exemplos.

Derivar a solução do código real.

---

## AGENT 09 — VERIFICATION SPECIALIST

O Verification Specialist é independente do executor.

Ele deve tentar quebrar a implementação.

Resultado final:

```text
PASS
PARTIAL
FAIL
```

Nunca declarar sucesso apenas porque:

```bash
pnpm run build-check
```

passou.

Build não equivale a comportamento funcional correto.

---

# 11. FORENSIC AUDIT DA IMPLEMENTAÇÃO ANTERIOR

Antes de modificar qualquer arquivo, descobrir exatamente o que foi alterado anteriormente.

Começar por:

```text
git status
git diff
git log
```

quando disponíveis e apropriados.

Inspecionar especialmente:

```text
MediaUploadSection.tsx
ProjectForm.tsx
project.ts
actions.ts
```

e localizar:

```text
FeaturedProjectCardFrame.tsx
ProjectCard.tsx
MediaCard
HTMLVideoBlock
resolveProjectMedia
resolveProjectHoverMedia
```

Além de qualquer outro arquivo descoberto durante tracing.

---

# 12. NÃO CONFIAR NO RELATÓRIO ANTERIOR

O relatório anterior afirmou:

```text
AUDITORIA E IMPLEMENTAÇÃO CONCLUÍDAS COM SUCESSO
```

mas existem bugs funcionais.

Portanto:

```text
STATUS REPORT ≠ SOURCE OF TRUTH
```

A fonte de verdade é:

```text
runtime behavior
+
source code
+
database state
+
browser rendering
+
tests
```

---

# 13. ANALISAR O CONTRATO DE DADOS

A implementação anterior aparentemente armazena código HTML diretamente em:

```text
url_landscape
url_square
```

Avalie criticamente esse desenho.

Investigue se o modelo atual distingue adequadamente:

```text
IMAGE_URL
FILE_URL
HTML_VIDEO
IFRAME
VIDEO_TAG
```

Não faça migration automaticamente.

Primeiro determine se:

### OPTION A

A detecção baseada no conteúdo armazenado é suficientemente robusta.

OU

### OPTION B

O banco deveria possuir metadata explícita como:

```text
landscape_media_type
square_media_type
```

OU equivalente.

Se uma alteração de schema for recomendada:

1. documente;
2. mostre impacto;
3. preserve backward compatibility;
4. proponha migration;
5. não aplique migration destrutiva automaticamente.

---

# 14. SEGURANÇA — HTML INSERIDO PELO ADMIN

Raw HTML executável representa superfície de XSS.

Auditar qualquer uso de:

```tsx
dangerouslySetInnerHTML
```

ou APIs DOM equivalentes.

Não aceitar arbitrariamente:

```html
<script>
<object>
<embed>
javascript:
event handlers inline
```

sem justificativa arquitetural.

Avaliar abordagem segura baseada em:

- sanitizer;
- allowlist de tags;
- allowlist de atributos;
- validação de URLs;
- protocolos permitidos;
- iframe sandbox quando apropriado;
- CSP;
- Trusted Types quando aplicável.

Para um vídeo HTML legítimo, avaliar allowlist semelhante a:

```text
video
source
track
iframe
```

e apenas atributos necessários.

Não implementar uma allowlist genérica sem estudar os snippets atualmente usados.

Compatibilidade funcional não justifica XSS.

---

# 15. INVESTIGAR HTMLVideoBlock

Localizar e analisar `HTMLVideoBlock`.

Responder:

1. Como detecta HTML?
2. Como injeta o HTML?
3. O componente é Client ou Server Component?
4. Existe sanitização?
5. Existe CSS interno sobrescrevendo o snippet?
6. `<video>` recebe largura/altura corretas?
7. iframe recebe wrapper?
8. atributos inline estão sobrescrevendo responsividade?
9. existem width/height hardcoded no HTML?
10. existe `overflow: hidden` ancestral?
11. existe `object-fit: cover`?
12. existe `position: absolute`?
13. o container tem altura fixa?
14. existe aspect ratio imposto incorretamente?

---

# 16. INVESTIGAR MEDIA RESOLVERS

Inspecionar:

```text
resolveProjectMedia
resolveProjectHoverMedia
```

e qualquer resolver relacionado.

Validar:

```text
HTML string
```

não esteja sendo interpretada como:

```text
URL string
```

ou passada acidentalmente para:

```tsx
<Image src="...">
```

Verificar também se sanitização ou serialização está transformando:

```html
<video>
```

em:

```text
&lt;video&gt;
```

---

# 17. ADMIN — ARQUITETURA REUTILIZÁVEL

Evitar implementar lógica completamente separada para Landscape e Square.

Avaliar transformar `MediaUploadSection` em API reutilizável.

Conceitualmente:

```tsx
<MediaUploadSection
  aspect="landscape"
  ...
/>

<MediaUploadSection
  aspect="square"
  ...
/>
```

ou arquitetura equivalente já compatível com o projeto.

Não duplicar 100 linhas apenas para habilitar `url_square`.

---

# 18. DETECÇÃO DE HTML

Não confiar em verificação frágil como:

```ts
value.startsWith("<")
```

sem avaliar whitespace, serialização e conteúdo.

Criar helper central, se necessário, como conceito:

```text
detectProjectMediaType()
```

com contrato testável.

O helper deve diferenciar:

```text
EMPTY
URL
BLOB
HTML_VIDEO
HTML_IFRAME
```

somente se essa granularidade for útil ao projeto.

Não criar abstração excessiva.

---

# 19. PERSISTÊNCIA

Validar ponta a ponta:

```text
textarea
↓
React state/form
↓
schema
↓
server action
↓
repository/service
↓
Supabase/PostgreSQL
↓
read query
↓
hydration
↓
renderer
```

Testar caracteres:

```text
<
>
"
'
&
?
=
/
```

Não alterar HTML válido durante persistência.

Ao mesmo tempo, sanitizar no boundary arquitetural correto.

---

# 20. TEST MATRIX OBRIGATÓRIA

Executar todos os casos abaixo.

## CASE 01

```text
Landscape IMAGE
Square IMAGE
```

Esperado:

PASS.

---

## CASE 02

```text
Landscape HTML VIDEO
Square IMAGE
```

Esperado:

PASS.

---

## CASE 03

```text
Landscape IMAGE
Square HTML VIDEO
```

Esperado:

PASS.

---

## CASE 04

```text
Landscape HTML VIDEO
Square HTML VIDEO
```

Esperado:

PASS.

---

## CASE 05

Editar projeto existente com duas imagens sem tocar nas mídias.

Esperado:

nenhum dado perdido.

---

## CASE 06

Converter apenas Landscape:

```text
IMAGE
→ HTML VIDEO
```

Square permanece intacto.

---

## CASE 07

Converter apenas Square:

```text
IMAGE
→ HTML VIDEO
```

Landscape permanece intacto.

---

## CASE 08

Converter:

```text
HTML VIDEO
→ IMAGE
```

sem manter HTML fantasma no banco ou estado.

---

## CASE 09

Reload do Admin.

Os modos corretos devem ser restaurados automaticamente.

---

## CASE 10

Landing page desktop.

HTML Video:

```text
100% visível
sem crop
sem distorção
```

---

## CASE 11

Landing page mobile.

Mesmos critérios.

---

## CASE 12

Home / Featured Project.

Não quebrar comportamento existente.

---

## CASE 13

Portfolio grid.

Não quebrar comportamento existente.

---

## CASE 14

HTML `<video>`.

PASS.

---

## CASE 15

HTML `<iframe>`.

PASS.

---

## CASE 16

HTML inválido.

Aplicação deve falhar de forma controlada.

Não quebrar página inteira.

---

# 21. VISUAL REGRESSION

Comparar antes/depois nas páginas relevantes.

Capturar, quando as ferramentas disponíveis permitirem:

```text
desktop
tablet
mobile
```

Confirmar:

- nenhuma imagem existente quebrada;
- grids intactos;
- radius intacto;
- spacing intacto;
- animations intactas;
- vídeos corretamente enquadrados.

---

# 22. CONSOLE / NETWORK VERIFICATION

No navegador, verificar:

```text
console errors
console warnings
network failures
CSP violations
hydration warnings
React errors
iframe failures
media loading failures
```

Qualquer erro relacionado à mudança precisa ser investigado.

---

# 23. BUILD VALIDATION

Depois da implementação, executar os comandos existentes do projeto.

Começar pelos scripts definidos em:

```text
package.json
```

Quando existir:

```bash
pnpm run build-check
```

executar.

Também executar, quando configurados:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Não inventar scripts inexistentes.

---

# 24. GRAPH / PROJECT KNOWLEDGE

Se o projeto possuir Graphify ou mecanismo equivalente, atualizar somente depois que a implementação estiver estável.

Se existir:

```bash
graphify update .
```

executar após as alterações relevantes.

Não considerar graph update evidência de correção funcional.

---

# 25. CONTEXT7 / DOCUMENTATION

Quando Context7 estiver disponível, consultar documentação atual das bibliotecas realmente detectadas no repositório antes de decisões arquiteturais sensíveis.

Prioridade:

```text
Next.js
React
Supabase
sanitization library, se existir
testing framework
```

Não consultar bibliotecas que não estejam envolvidas no problema.

Use documentação para validar decisões.

Não copiar padrões incompatíveis com a versão real do projeto.

---

# 26. GATE 01 — AUDIT REPORT

Antes da primeira alteração, produzir:

```text
docs/audits/html-video-forensic-audit.md
```

ou localização equivalente já utilizada pelo projeto.

Conteúdo:

```md
# HTML Video Forensic Audit

## Current Architecture
## Previous Implementation
## Reproduction
## Confirmed Failures
## Data Flow
## Root Causes
## Security Findings
## Responsive Findings
## 1:1 Gap
## 16:9 Gap
## Public Rendering Gap
## Regression Risks
```

---

# 27. GATE 02 — CORRECTION PLAN

Depois da auditoria, criar:

```text
docs/plans/html-video-remediation-plan.md
```

Incluindo tabela:

| ID | Problema | Root cause | Arquivos | Solução | Risco | Teste |
|---|---|---|---|---|---|---|

---

# 28. REGRA DE EXECUÇÃO

A implementação deve seguir o remediation plan.

Entretanto, se durante a implementação surgir evidência que invalide o plano:

```text
STOP
→ DOCUMENT
→ UPDATE PLAN
→ CONTINUE
```

Não force uma arquitetura comprovadamente errada apenas porque estava no plano.

---

# 29. ALTERAÇÕES MÍNIMAS

Preferir:

```text
small coherent diff
```

em vez de:

```text
rewrite
```

Preservar:

- funcionalidades existentes;
- banco;
- URLs;
- mídia antiga;
- estrutura pública;
- animações;
- SEO;
- rotas;
- contratos existentes.

---

# 30. NÃO EXECUTAR REFATORAÇÕES PARALELAS

Durante esta correção, NÃO:

- redesenhar ADMIN;
- alterar identidade visual;
- reestruturar todo o projeto;
- migrar Supabase sem necessidade;
- substituir biblioteca de formulário;
- substituir sistema de mídia;
- alterar APIs sem necessidade;
- atualizar dependências irrelevantes.

---

# 31. DEFINITION OF DONE

A tarefa somente pode receber `PASS` quando TODOS forem verdadeiros:

```text
[ ] HTML video 16:9 pode ser cadastrado.
[ ] HTML video 1:1 pode ser cadastrado.
[ ] Landscape e Square funcionam independentemente.
[ ] Dados persistem.
[ ] Edição restaura corretamente os modes.
[ ] HTML video aparece no frontend.
[ ] <video> funciona.
[ ] <iframe> funciona.
[ ] Vídeo de landing page não sofre crop.
[ ] Vídeo não é distorcido.
[ ] Layout é responsivo.
[ ] Mobile funciona.
[ ] Desktop funciona.
[ ] Home não regrediu.
[ ] Portfolio não regrediu.
[ ] Cases não regrediram.
[ ] Imagens existentes continuam funcionando.
[ ] Console não apresenta novos erros.
[ ] Build passa.
[ ] Tipagem passa.
[ ] Segurança do HTML foi analisada.
[ ] Verification Specialist aprovou.
```

Se qualquer item crítico falhar:

```text
PARTIAL
```

ou:

```text
FAIL
```

Nunca declarar sucesso parcial como conclusão total.

---

# 32. FINAL VERIFICATION REPORT

Criar:

```text
docs/reports/html-video-verification-report.md
```

Formato:

```md
# HTML Video Verification Report

## Final Status

PASS | PARTIAL | FAIL

## Confirmed Root Cause

## Architecture Before

## Architecture After

## Files Modified

## Database Changes

## Security Changes

## Admin Tests

## Landscape Tests

## Square Tests

## Public Rendering Tests

## Responsive Tests

## Browser Tests

## Regression Tests

## Commands Executed

## Warnings Remaining

## Known Limitations

## Recommended Follow-ups
```

---

# 33. RESPOSTA FINAL DO AGENT IDE

Ao concluir, retornar de forma objetiva:

```text
STATUS
ROOT CAUSE
FILES MODIFIED
ARCHITECTURE CHANGE
16:9 RESULT
1:1 RESULT
LANDING PAGE RESULT
SECURITY RESULT
TESTS
BUILD
REGRESSIONS
REMAINING RISKS
REPORT PATHS
```

Não utilizar frases genéricas como:

```text
implemented successfully
```

sem evidência verificável.

---

# PRINCÍPIO CENTRAL

O objetivo não é fazer o formulário aceitar uma string HTML.

O objetivo é garantir que:

```text
AUTHORING
+
VALIDATION
+
PERSISTENCE
+
MEDIA RESOLUTION
+
SAFE RENDERING
+
RESPONSIVE LAYOUT
+
BACKWARD COMPATIBILITY
+
VERIFICATION
```

funcionem como um único sistema coerente.

Corrija a arquitetura onde a implementação anterior ficou incompleta, preserve o que já funciona e só encerre o trabalho quando a cadeia completa estiver funcional e validada.
