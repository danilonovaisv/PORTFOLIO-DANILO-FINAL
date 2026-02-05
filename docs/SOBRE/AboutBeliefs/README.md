# About Beliefs - Documentação Completa

Documentação técnica e especificações da sessão "About Beliefs" (O Que Me Move) do portfólio Danilo Novais.

---

## 📚 Índice de Documentos

### 1. **SPEC_AboutBeliefs_v2.md** - Especificação Completa
**Descrição:** Documento principal com todas as especificações técnicas, objetivos, estrutura de conteúdo, identidade visual, animações, responsividade e acessibilidade.

**Quando usar:**
- Referência completa do projeto
- Entender todos os requisitos e objetivos
- Planejamento de implementação
- Documentação para novos desenvolvedores

**Seções principais:**
- Objetivo da Página/Sessão
- Estrutura de Conteúdo
- Identidade Visual
- Interatividade & Animações
- Responsividade
- Acessibilidade & SEO
- Integrações ou Recursos Especiais
- Considerações Técnicas
- Sugestão de Implementação 3D
- Paleta de Cores
- Checklist de Implementação

---

### 2. **AJUSTES_IMPLEMENTADOS.md** - Resumo Executivo
**Descrição:** Resumo dos principais ajustes e mudanças, com foco nas diferenças entre mobile e desktop.

**Quando usar:**
- Visão rápida das mudanças principais
- Entender diferenças mobile vs desktop
- Checklist de ajustes necessários
- Referência rápida durante desenvolvimento

**Destaques:**
- ✅ BeliefFixedHeader - Posicionamento Responsivo
- ✅ Frases Rotativas - Animações Diferentes por Dispositivo
- ✅ Ghost 3D - Alinhamento Vertical
- ✅ Asset 3D - URL do Supabase
- ✅ Paleta de Cores
- ✅ Responsividade - Breakpoints
- ✅ Checklist de Ajustes Necessários

---

### 3. **GUIA_VISUAL.md** - Diagramas e Layouts
**Descrição:** Guia visual com diagramas ASCII mostrando layouts, animações e comportamentos.

**Quando usar:**
- Entender visualmente a estrutura
- Visualizar animações e transições
- Compreender posicionamento de elementos
- Referência rápida de comportamentos

**Diagramas incluídos:**
- 📱 Layout Mobile
- 💻 Layout Desktop
- 🎬 Animação das Frases (Mobile e Desktop)
- 👻 Comportamento do Ghost 3D
- 🎨 Transições de Background
- 📐 Grid System
- 🎯 Alinhamento Ghost ↔ Texto
- 🔄 Fluxo de Scroll
- 🎭 Manifesto Final - Morphing Text
- 📊 Performance Checklist

---

### 4. **EXEMPLOS_CODIGO.md** - Snippets Prontos
**Descrição:** Exemplos de código prontos para copiar e colar, com implementações completas.

**Quando usar:**
- Implementar funcionalidades específicas
- Copiar snippets de código
- Referência de sintaxe e padrões
- Acelerar desenvolvimento

**Snippets incluídos:**
- 📱 Animação Mobile - Frases Rotativas (Horizontal)
- 💻 Animação Desktop - Frases Rotativas (Vertical)
- 🎯 BeliefFixedHeader - Posicionamento Responsivo
- 👻 GhostModel - Alinhamento Vertical com Texto
- 🎨 Transições de Background Color
- 📐 Layout Mobile - Ghost Esquerda + Texto Direita
- 🎭 Manifesto Final - Morphing Text
- 🔧 Hook Customizado - useIsMobile
- 🎯 Constantes e Configurações
- 🎨 Classes Tailwind Úteis
- 🚀 Exemplo Completo - Integração

---

## 🎯 Início Rápido

### Para entender o projeto:
1. Leia **AJUSTES_IMPLEMENTADOS.md** para visão geral
2. Consulte **GUIA_VISUAL.md** para entender layouts
3. Veja **SPEC_AboutBeliefs_v2.md** para detalhes completos

### Para implementar:
1. Consulte **EXEMPLOS_CODIGO.md** para snippets
2. Use **GUIA_VISUAL.md** para referência visual
3. Valide com **SPEC_AboutBeliefs_v2.md** (checklist final)

---

## 📋 Principais Mudanças (TL;DR)

### 🔄 Animações Mobile vs Desktop

#### Desktop (mantém):
- Frases entram de **baixo para cima** (`y: 20 → 0`)
- Frases saem de **baixo para cima** (`y: 0 → -20`)
- Texto posicionado à **esquerda**
- Ghost posicionado à **direita**

#### Mobile (NOVO):
- Frases entram da **direita para esquerda** (`x: +24 → 0`)
- Frases saem da **esquerda para direita** (`x: 0 → -24`)
- Texto posicionado no **rodapé, centralizado**
- Ghost posicionado à **esquerda**
- **SEM movimento vertical** (não usar `y`)

---

### 🎯 Alinhamento Ghost ↔ Texto

**Regra obrigatória (Desktop e Mobile):**
- Ghost sempre alinhado **verticalmente ao centro do bloco de texto**
- Não ao centro da viewport
- Se texto quebrar linhas, Ghost acompanha

---

### 📱 Layout Mobile

```
┌─────────────────────────────┐
│  Header (sticky top-right)  │
├─────────────────────────────┤
│  Ghost (esq) + Texto (dir)  │
├─────────────────────────────┤
│  Texto Rotativo (rodapé)    │
└─────────────────────────────┘
```

---

### 💻 Layout Desktop

```
┌─────────────────────────────┐
│  Header (centro + direita)  │
├─────────────────────────────┤
│  Texto (esq) + Ghost (dir)  │
└─────────────────────────────┘
```

---

## 🎨 Paleta de Cores

```typescript
bluePrimary:    #0048ff  // CTAs, links, interativos
blueAccent:     #4fe6ff  // Destaques secundários
purpleDetails:  #8705f2  // Pequenos detalhes
pinkDetails:    #f501d3  // Ênfases pontuais
background:     #040013  // Fundo escuro principal
```

---

## 🔗 Asset 3D

**URL do GLB (Supabase Storage):**
```
https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb
```

**Implementação:**
- ✅ Já configurado em `src/components/sobre/3d/GhostModel.tsx`
- ✅ Preload ativo
- ✅ Tipagem correta

---

## 📂 Estrutura de Arquivos

### Documentação:
```
docs/SOBRE/AboutBeliefs/
├── README.md                    # Este arquivo (índice)
├── SPEC_AboutBeliefs_v2.md      # Especificação completa
├── AJUSTES_IMPLEMENTADOS.md     # Resumo executivo
├── GUIA_VISUAL.md               # Diagramas visuais
└── EXEMPLOS_CODIGO.md           # Snippets de código
```

### Implementação atual:
```
src/components/sobre/
├── sections/
│   └── AboutBeliefs.tsx          # Componente principal
├── beliefs/
│   ├── BeliefFixedHeader.tsx     # Header sticky
│   ├── BeliefSection.tsx         # Frases rotativas
│   ├── BeliefFinalSection.tsx    # Seção final (background)
│   └── BeliefFinalSectionOverlay.tsx  # Manifesto final
└── 3d/
    ├── GhostModel.tsx            # Modelo 3D
    └── GhostScene.tsx            # Cena R3F
```

---

## ✅ Checklist de Implementação

### Prioridade Alta:
- [ ] Ajustar animação mobile das frases (horizontal)
- [ ] Posicionar texto rotativo no rodapé (mobile)
- [ ] Garantir alinhamento vertical Ghost ↔ Texto
- [ ] Testar composição "ghost esquerda + texto direita" (mobile)

### Prioridade Média:
- [ ] Ajustar BeliefFixedHeader para top-right (mobile)
- [ ] Sincronizar transições de background com frases
- [ ] Otimizar tamanho do Ghost por breakpoint

### Prioridade Baixa:
- [ ] Adicionar fallback para WebGL não suportado
- [ ] Melhorar acessibilidade (aria-labels)
- [ ] Adicionar loading state para GLB

---

## 🎯 Frases do Manifesto

1. "Um vídeo que respira."
2. "Uma marca que se reconhece."
3. "Um detalhe que fica."
4. "Crio para gerar presença."
5. "Mesmo quando não estou ali."
6. "Mesmo quando ninguém percebe o esforço."

**Manifesto final:**
```
ISSO É
GHOST
DESIGN.
```

---

## 🚀 Tecnologias Utilizadas

- **React** (Client Component)
- **TypeScript**
- **Framer Motion** (Animações e scroll)
- **React Three Fiber** (R3F - Canvas 3D)
- **Drei** (Helpers R3F: Float, Environment, useGLTF)
- **Three.js** (Engine 3D)
- **Tailwind CSS** (Estilização)
- **Supabase Storage** (Hospedagem do GLB)

---

## 📊 Performance

### Otimizações implementadas:
- ✅ GLB Preload (`useGLTF.preload()`)
- ✅ Suspense Boundary
- ✅ Error Boundary (ThreeErrorBoundary)
- ✅ Responsive Scale
- ✅ LERP para suavidade
- ✅ Easing consistente (cubic-bezier)

### Otimizações pendentes:
- ⚠️ Fallback WebGL
- ⚠️ Loading State
- ⚠️ Lazy loading condicional

---

## 🎨 Easing Padrão (Ghost Easing)

```typescript
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
```

Usado em todas as animações para consistência visual.

---

## 📱 Breakpoints

```typescript
Mobile:   < 768px   (md)
Tablet:   768-1024px
Desktop:  > 1024px
Large:    > 1440px
Small:    < 360px
```

---

## 🔧 Hooks Customizados

### `useIsMobile()`
Detecta se está em mobile (< 768px)

```typescript
const isMobile = useIsMobile();
```

### `useScroll()`
Framer Motion - tracking de scroll

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end end'],
});
```

---

## 🎯 Objetivos da Sessão

1. **Gerar vínculo emocional** através de manifesto pessoal
2. **Mostrar visão de design** de forma íntima e memorável
3. **Conectar visitante** com o "porquê" do trabalho
4. **Consolidar identidade** "Ghost Design"
5. **Diferenciar estúdio** pelo posicionamento emocional
6. **Preparar usuário** para seções seguintes (clientes/contato)

---

## 📞 Suporte

Para dúvidas sobre implementação:
1. Consulte os documentos nesta pasta
2. Verifique exemplos de código
3. Revise componentes existentes em `src/components/sobre/`

---

## 📝 Notas de Versão

**v2.0** - 2025
- ✅ Especificação completa revisada
- ✅ Ajustes mobile vs desktop documentados
- ✅ Guia visual com diagramas ASCII
- ✅ Exemplos de código prontos
- ✅ Checklist de implementação
- ✅ Documentação de performance

**v1.0** - 2024
- Implementação inicial

---

## 🎨 Design System

Baseado em **Ghost Design** - conceito autoral do estúdio.

**Princípios:**
- Conexão > Choque
- Presença sutil
- Detalhes que ficam
- Design que muda o dia de alguém

---

**Última atualização:** 2025
**Status:** Documentação completa ✅
**Pronto para implementação:** Sim ✅
