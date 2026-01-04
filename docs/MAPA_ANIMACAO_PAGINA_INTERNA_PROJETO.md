# 🎞️ MAPA DE ANIMAÇÃO — PÁGINA INTERNA DE PROJETO (FRAME‑BY‑FRAME)
## Ghost System · Portfólio
## Documento canônico de Motion + Leitura
## Referência: PROTOTIPO INTERATIVO – PORT DAN GHOST.md

---

## 🎯 OBJETIVO

Definir **como o conteúdo da Página Interna de Projeto se revela no tempo**, garantindo:

- Leitura confortável
- Hierarquia clara
- Continuidade com a página Portfólio
- Coerência total com o sistema do SOBRE (ghost design)

⚠️ Este documento trata **apenas de animação e ritmo**, não de layout estrutural.

---

## 🧠 PRINCÍPIO‑CHAVE

> **Nada “entra” para impressionar.**  
> O conteúdo **se revela para ser lido**.

Cada bloco tem:
- tempo próprio
- pausa consciente
- ausência de exagero

---

## 🧩 ESTRUTURA DE CONTEÚDO (ORDEM REAL)

1. Backdrop
2. Container da Página Interna
3. Mídia principal (imagem/vídeo)
4. Título do projeto
5. Meta informações (cliente, ano, tags)
6. Conteúdo secundário (galeria / texto / bullets)
7. Botão fechar (sempre acessível)

---

## ⏱️ TIMELINE — FRAME A FRAME (CANÔNICO)

### 🕰️ T = 0ms
**Estado inicial**
- Backdrop: `opacity: 0`
- Container:
  - `opacity: 0`
  - `scale: 0.98`
  - `y: 12px`
- Conteúdo interno invisível

---

### 🕰️ T = 0 → 180ms
**Backdrop aparece**
```ts
opacity: 0 → 1
ease: linear
```

---

### 🕰️ T = 120 → 380ms
**Container aparece**
```ts
opacity: 0 → 1
scale: 0.98 → 1
y: 12 → 0
ease: cubic-bezier(0.22, 1, 0.36, 1)
```

---

### 🕰️ T = 380 → 520ms
**Pausa consciente**
- Nada anima
- Usuário reconhece o contexto

---

### 🕰️ T = 520 → 760ms
### Mídia principal
```ts
opacity: 0 → 1
```
- ❌ sem translate
- ❌ sem scale
- Apenas presença

---

### 🕰️ T = 760 → 960ms
### Título do projeto
```ts
opacity: 0 → 1
y: 6 → 0
duration: 200ms
```

---

### 🕰️ T = 960 → 1120ms
### Meta informações
```ts
opacity: 0 → 1
y: 4 → 0
duration: 160ms
```

---

### 🕰️ T = 1120 → 1500ms
### Conteúdo secundário (se existir)
- Galeria / texto / bullets entram em **stagger leve**
```ts
opacity: 0 → 1
y: 8 → 0
stagger: 80ms
```

---

## 🔁 ESTADO DE LEITURA (IDLE)

Após 1500ms:
- Nenhuma animação contínua
- Nada flutua
- Nada pulsa
- O foco é leitura

---

## 🕰️ SAÍDA (FECHAMENTO)

### T = 0 → 180ms
**Container**
```ts
opacity: 1 → 0
scale: 1 → 0.98
y: 0 → 8
```

### T = 0 → 150ms
**Backdrop**
```ts
opacity: 1 → 0
```

---

## 🚫 PROIBIÇÕES ABSOLUTAS

- ❌ Animação por scroll interno
- ❌ Parallax dentro do modal
- ❌ Blur decorativo
- ❌ Spring / bounce
- ❌ Entrada simultânea de tudo

---

## 🧪 CHECKLIST DE VALIDAÇÃO

- [ ] Abertura silenciosa
- [ ] Pausa perceptível após abrir
- [ ] Mídia aparece antes do texto
- [ ] Título vem antes dos detalhes
- [ ] Conteúdo secundário não compete
- [ ] Fechamento rápido e discreto

---

# 🤖 PROMPT EXECUTOR — AGENT COPILOT
## Página Interna de Projeto (Motion)

```md
Você deve implementar o mapa de animação canônico da Página Interna de Projeto conforme especificado.

Objetivo:
Aplicar animação editorial, silenciosa e orientada à leitura no modal de projetos do Portfólio.

Arquivos envolvidos:
- PortfolioModal.tsx (ou equivalente)
- Componentes internos da página de projeto
- Framer Motion / AnimatePresence

Ações obrigatórias:
1. Implementar timeline de abertura em 4 fases:
   - backdrop
   - container
   - mídia principal
   - textos (título → meta → conteúdo)
2. Garantir pausas entre as fases (conforme tempos do documento)
3. Usar apenas opacity, y leve (≤12px) e scale ≤1
4. Remover qualquer animação contínua após entrada
5. Implementar fechamento rápido e discreto

Regras:
- ❌ Não alterar layout
- ❌ Não alterar textos
- ❌ Não adicionar novos efeitos
- ❌ Não usar animações por scroll
- ✅ Usar Framer Motion com AnimatePresence
- ✅ Respeitar prefers-reduced-motion

Critérios de aceite:
- A página interna parece uma continuação natural do Portfólio
- A leitura é clara e sem distrações
- A animação não chama atenção para si
- O comportamento é coerente com a página SOBRE
```

---

## 🧠 CONCLUSÃO

Este mapa garante que a **Página Interna de Projeto**:
- seja lida como conteúdo, não como efeito
- mantenha o usuário orientado
- preserve o Ghost System

Ele fecha o ciclo:
> Explorar → Entrar → Ler → Voltar
