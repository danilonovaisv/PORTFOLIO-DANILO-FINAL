# 🎬 MODAL / PÁGINA INTERNA DE PROJETO — DESIGN & MOTION SPEC (CANÔNICO)
## Projeto: PORTFÓLIO — Ghost System
## Escopo: Página interna de projeto em modal (Zoom Viewer + Página de Projeto)
## Página base: Portfolio Showcase
## Documento revisado conforme: HOME - PROTOTIPO INTERATIVO.md

---

## 🎯 OBJETIVO DO MODAL / PÁGINA INTERNA

Criar um **sistema de visualização de projetos dentro do site**, apresentado em formato de **modal/página interna**, que:

- Preserve o contexto do Portfólio
- Não caracterize navegação externa ou landing page
- Funcione como **continuação direta da página**
- Permita aprofundar o trabalho sem quebrar fluxo
- Seja reutilizável para projetos simples e complexos

⚠️ Importante:  
Este componente **NÃO é uma landing page**.  
Ele representa uma **página interna de projeto**, exibida em camada superior (modal).

---

## 🧠 PRINCÍPIOS EDITORIAIS (GHOST SYSTEM)

- Página interna ≠ destaque publicitário
- Abertura é **convite**, não impacto
- Leitura contínua e silenciosa
- Conteúdo > efeito
- Fechamento devolve o usuário exatamente ao ponto anterior

---

## 🧩 TIPOS DE PÁGINA INTERNA

### 🅐 TIPO A — VISUALIZAÇÃO AMPLIADA (ZOOM VIEWER)

**Usar quando:**
- O projeto possui uma peça principal forte
- O objetivo é observação e detalhe visual

#### Conteúdo
- Mídia principal ampliada (imagem ou vídeo)
- Título do projeto
- Cliente
- Ano
- Tags discretas

Uso comum:
- peças gráficas
- mockups
- key visuals

---

### 🅑 TIPO B — PÁGINA INTERNA DE PROJETO (CONTEÚDO)

**Usar quando:**
- O projeto possui várias entregas
- É necessário contextualizar o trabalho

#### Conteúdo
- Hero interno (imagem ou vídeo)
- Galeria complementar
- Texto curto de contexto
- Lista de entregas / papéis
- Links relacionados (se existirem)

⚠️ Tudo acontece **dentro do modal**, sem navegação externa.

---

## 🧱 ESTRUTURA DA PÁGINA INTERNA (AMBOS)

### Camadas (z-index)
1. Backdrop
2. Container da página interna
3. Conteúdo
4. Botão de fechar

---

## 📐 LAYOUT — DESKTOP

### Container
- Max-width: `1200px`
- Max-height: `90vh`
- Border-radius: `24px`
- Background: branco ou escuro (conforme projeto)
- Padding: `32px`
- Scroll interno habilitado

### Tipo A — Zoom
```
[            MÍDIA PRINCIPAL            ]
[  Título — Cliente — Ano — Tags       ]
```

### Tipo B — Página Interna
```
[  Mídia principal  ][  Texto / Dados  ]
[  Galeria          ][  Lista / Links  ]
```

---

## 📱 LAYOUT — MOBILE

- Coluna única
- Mídia no topo
- Conteúdo abaixo
- Scroll interno contínuo
- Botão fechar sempre visível

---

## 🎞️ MOTION — FRAME A FRAME (CANÔNICO)

### 🕰️ T = 0ms — Estado inicial
- Backdrop: `opacity: 0`
- Página interna:
  - `opacity: 0`
  - `scale: 0.98`
  - `y: 12px`

---

### 🕰️ T = 0 → 180ms — Backdrop
```ts
opacity: 0 → 1
ease: linear
```

---

### 🕰️ T = 120 → 380ms — Página interna
```ts
opacity: 0 → 1
scale: 0.98 → 1
y: 12 → 0
ease: cubic-bezier(0.22, 1, 0.36, 1)
```

---

### 🕰️ T = 380 → 520ms — Estabilização
- Nenhum movimento
- Usuário começa a leitura

---

## 🕰️ SAÍDA (FECHAMENTO)

### Página interna
- `opacity: 1 → 0`
- `scale: 1 → 0.98`
- `y: 0 → 8`
- Duração: 180ms

### Backdrop
- `opacity: 1 → 0`
- Duração: 150ms

---

## 🚫 O QUE NÃO DEVE ACONTECER

- ❌ Linguagem de landing page
- ❌ CTA promocional
- ❌ Animação exagerada
- ❌ Scroll da página base ativo
- ❌ Perda do contexto do portfólio

---

## 🖱️ INTERAÇÃO

### Abrir
- Clique no card do portfólio

### Fechar
- `ESC`
- Click no backdrop
- Botão fechar

### Acessibilidade
- `role="dialog"`
- `aria-modal="true"`
- Foco inicial no botão fechar
- Retorno de foco ao card original

---

## ⚛️ IMPLEMENTAÇÃO (REACT + FRAMER)

### Estado
```ts
selectedProject: Project | null
```

### Montagem
- Usar `AnimatePresence`
- Modal renderizado via Portal no final do `body`

---

## 🎨 TIPOGRAFIA (CONSISTENTE COM SOBRE)

- Título: `text-xl md:text-2xl font-semibold`
- Meta: `text-xs uppercase tracking-wide opacity-70`
- Texto: `text-sm leading-relaxed`

Palavras-chave podem:
- usar azul
- peso 600
- hover sutil

---

## ⚙️ PERFORMANCE

- `will-change` apenas no container
- Imagens lazy-loaded
- Scroll interno com `overscroll-contain`
- Sem impactar RAF do parallax externo

---

## ✅ CHECKLIST FINAL (QA)

- [ ] Não parece landing page
- [ ] Mantém contexto do portfólio
- [ ] Leitura confortável
- [ ] Abertura silenciosa
- [ ] Fechamento correto
- [ ] Mobile funcional
- [ ] Acessível
- [ ] Performance ok

---

## 🧠 CONCLUSÃO

Esta **página interna de projeto**:
- respeita o Ghost System
- aprofunda o trabalho
- não quebra o fluxo
- não vira marketing

Ela é **extensão natural da página Portfólio**, não um destino isolado.
