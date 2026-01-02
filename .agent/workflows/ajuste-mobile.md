---
description: ### Workflow de QA e Ajuste Mobile: Ghost Portfolio
---

**Contexto:**
Você está atuando como um **Engenheiro de Frontend Especialista em Mobile & Responsividade**. Sua missão é auditar e corrigir o layout do projeto "Ghost Portfolio" para garantir que ele siga rigorosamente as especificações do documento "PROTOTIPO INTERATIVO - PORT DAN GHOST.pdf" em telas pequenas.

**Regras de Ouro (Mobile):**

1.  **No Horizontal Scroll:** O site nunca deve ter scroll horizontal.

2.  **Touch Targets:** Áreas de toque devem ter no mínimo 48x48px.

3.  **Performance:** WebGL pesado deve ser desativado ou simplificado em mobile.

4.  **Layout:** Grid de 1 coluna na maioria das seções.

---

## FASE 1: Configuração do Viewport

Para cada teste, simule/considere as seguintes larguras:

- **Mobile Small:** 375px (iPhone SE/X)
- **Mobile Standard:** 390px - 430px (iPhone Pro Max / Androids modernos)
- **Tablet Portrait:** 768px (iPad Mini)

---

## FASE 2: Auditoria Componente por Componente

Analise o código atual (arquivos `.tsx` e classes Tailwind) verificando os seguintes pontos críticos extraídos da documentação. Se encontrar divergência, **aplique a correção imediatamente**.

1. Header & Navegação

- [ ] **Layout:** O Header deve ser uma barra fixa no topo (height: 48-64px), full-width.
- [ ] **Elementos:** Logo à esquerda, Ícone Hamburger à direita.
- [ ] **Menu Overlay:** Ao clicar no hamburger, abre um overlay fullscreen (gradiente).
- [ ] **Animação:** Itens entram em "stagger" (um após o outro).
- [ ] **Bug Comum:** Verificar se o efeito "Glassmorphism fluido que segue o mouse" do Desktop está **desativado** no mobile.

2. Hero & Manifesto Video

- [ ] **WebGL:** O "Ghost Atmosphere" deve estar leve ou substituído por um gradiente estático se a performance for ruim.
- [ ] **Vídeo:**
- ❌ **Erro:** O vídeo flutuar no canto inferior direito (comportamento desktop).
- ✅ **Correto:** O vídeo deve ser uma **seção separada**, logo abaixo do Hero, ocupando 100% da largura (aspect-video).

- [ ] **Som:** O vídeo deve iniciar mudo. Deve haver um botão claro para ativar o som.

3. Portfolio Showcase

- [ ] **Estrutura:** As listras (accordion) do desktop devem virar **Cards Full-width** empilhados verticalmente.
- [ ] **Conteúdo:** Título centralizado, imagem visível (ou estática), sem necessidade de hover para revelar.
- [ ] **Remoções:** Remover a label flutuante "[what we love working on]" no mobile.

4. Featured Projects (Bento Grid)

- [ ] **Grid:** Desfazer o layout irregular "Bento". Todos os cards devem ser empilhados verticalmente (1 coluna).
- [ ] **CTA Card:** Deve aparecer como o último item da pilha.

5. Clients / Brands

- [ ] **Grid:** Ajustar para 3 ou 4 colunas (o grid de 6+ colunas do desktop fica ilegível no mobile).

6. Contact Section

- [ ] **Layout:** Coluna única. Ordem: Headline -> Infos -> Formulário -> Social.
- [ ] **Inputs:** Altura confortável para digitar (min 48px).

7. Footer (Ponto Crítico)

- [ ] **Posição:** O footer deve ser **ESTÁTICO** (`position: relative` ou flow normal).
- [ ] **Erro Fatal:** Se o footer estiver `fixed` (preso na parte inferior da tela) no mobile, corrija imediatamente. Ele só é fixo no Desktop.

---

## FASE 3: Interações e Gestos

1. **Hovers:** Remova ou adapte qualquer lógica que dependa de `:hover` para mostrar informações críticas (mobile não tem hover).

- _Exemplo:_ Nos cards de projetos, se o título só aparece no hover, no mobile ele deve estar sempre visível.

2. **Tamanho de Toque:** Verifique botões e links. Se tiverem padding pequeno (`p-1` ou `p-2`), aumente para garantir a área de toque de 48px.

---

## FASE 4: Execução de Ajustes

Para cada problema encontrado na Fase 2:

1. Identifique o arquivo componente (ex: `src/components/Footer.tsx`).
2. Utilize os prefixos do Tailwind para segregar os estilos:

- Use classes base para **Mobile** (ex: `flex-col`, `static`).
- Use prefixos `md:` ou `lg:` para restaurar o comportamento **Desktop** (ex: `md:flex-row`, `md:fixed`).

3. Gere o código corrigido do componente inteiro.

**Saída esperada:**
Para cada correção, me entregue:

1. _Qual regra mobile estava sendo violada._
2. _O código corrigido._

Comece a análise agora.
