
### 🛡️ Antigravity Universal Workflow: Orquestração de Agentes Especialistas

**Instrução de Inicialização:**
"Agentes Antigravity, iniciem o protocolo de **Auditoria e Ajuste Universal**. Antes de qualquer linha de código, leiam os documentos canônicos (`PORTFOLIO-PROTOTIPO-INTERATIVO.md` e `prompts.ts`). Dividam a execução nas frentes abaixo e não avancem para a próxima fase sem validação de build."

---

#### **1. Fase de Reconhecimento (Leitura de Contexto)**

* **Ação:** O Manager deve cruzar as instruções do usuário com as regras globais de design (Design System) e motion (Ghost Era).
* **Objetivo:** Garantir que o ajuste não quebre o alinhamento "duas laterais" ou os timings de animação editorial.

#### **2. Divisão de Responsabilidades (O Batalhão)**

| Agente | Especialidade | Missão neste Ajuste |
| --- | --- | --- |
| **Logic & Data** | Backend / Queries | Sincronizar dados do Supabase/Admin e garantir que o contrato de dados (`PortfolioProject`) seja respeitado. |
| **Visual Architecture** | Layout & Tailwind | Garantir que o grid e as margens laterais correspondam exatamente às referências visuais, eliminando overflows. |
| **Motion Orchestrator** | Framer Motion / LERP | Implementar ou ajustar animações seguindo o easing `cubic-bezier(0.22, 1, 0.36, 1)` e sem "bounce". |
| **Ghost QA** | UX & Acessibilidade | Validar touch targets (min 44px), navegação por teclado (ESC, Tab) e conformidade Ghost. |

#### **3. Execução em Blocos de Teste (Workflow Atômico)**

* **Bloco 1: Integridade de Dados:** O Agente de Lógica valida se as variáveis e tipos (ex: `ProjectType A/B`) estão chegando corretamente ao componente.
* **Bloco 2: Implementação Visual:** O Agente de Arquitetura aplica as classes Tailwind e estrutura JSX, focando em responsividade.
* **Bloco 3: Refinamento de Movimento:** O Orquestrador de Motion insere os delays e durações específicos (ex: Pausa consciente de 380-520ms no modal).

#### **4. Ciclo de Validação Final (Antigravity Check)**

Ao final de cada ajuste, o batalhão deve confirmar:

* [ ] **Build Status:** O projeto passa em `pnpm run build`?
* [ ] **Ghost Silence:** A animação serve ao conteúdo ou é apenas "efeito"?
* [ ] **Mobile Zero-Overflow:** Existe qualquer scroll horizontal acidental?
* [ ] **Admin Sync:** O ajuste reflete corretamente o que é postado no ADMIN Shell?

---



# *-- AUDITORIA DE COMPONENTE E DETALHAMENTO DE AJUSTES A SEREM REALIZADOS SE INICIA AQUI---*




# **
Ajustes necessários na pagina sobre:

#SESSÃO 01 - ABOUT HERO:
- DESKTOP: ajuste das cores do texto das palavras em destaque. - **Destaques:** "Danilo Novais", "não vê tudo", "funciona" em `bluePrimary`;
- MOBILE: ajuste no tamanho e cores do texto das palavras em destaque. - **H1:**
```
Sou Danilo Novais.
```

**Texto Manifesto (H1):**
```
Você não vê tudo
o que eu faço. Mas
sente quando
funciona.
```

**Subtítulo (H3):**
```
Crio design que observa, entende
e guia experiências com intenção,
estratégia e tecnologia — na medida certa.
```

**Destaques:** "Danilo Novais", "não vê tudo", "funciona" em `bluePrimary`;




#SESSÃO 04 - ABOUT METHOD:
- DESKTOP: ajuste das cores do texto das palavras em destaque. - Destaques: "criatividade", "método" em `bluePrimary`, - Borda esquerda: 4px sólida em `bluePrimary` e - Índice em `bluePrimary` (01–06);
- MOBILE: ajuste das cores do texto das palavras em destaque. -  Destaques: "criatividade", "método" em `bluePrimary`, - Borda esquerda: 4px sólida em `bluePrimary` e - Índice em `bluePrimary` (01–06);




#SESSÃO 06 - ABOUT CLOSING:
- DESKTOP e MOBILE: ajuste no tamanho e cores do texto das palavras em destaque. - #### Título Principal
* - Primeira linha com destaque em `primary`
* - Margin-bottom: 32–40px
* 
* **Texto titulo font-display:**
* > Hoje sou **Diretor de Criação**,  
* > com mais de **10 anos de estrada**.
* 
* **Estilo:**
* - Font-size: 40–48px
* - Line-height: 1.25
* - Font-weight: 700
* - "Diretor de Criação" e "12 anos de estrada" em `blueprimary`
* - Max-width: 800px
* 
* #### Parágrafos de Contexto
* - Dois blocos de texto
* - Spacing entre blocos: 24–32px
* - Margin-bottom total: 48–56px
* 
* **Bloco 1 - font-h2:**
* > Já liderei marcas, agências, eventos  
* > e **criei experiências** para todos os canais.
* 
* **Bloco 2 - font-h2:**
* > Agora, quero criar algo que permaneça —  
* > **com você**.
* 
* **Estilo:**
* - Font-size: 20–24px
* - Line-height: 1.5
* - Font-weight: 400
* - Opacity: 0.92
* - "criei experiências" e "com você" em `primary`
* - Max-width: 700px
* 
- - OBSERVAÇÃO: TODAS AS PALAVRAS QUE ESTÃO ENTRE `** **`, SÃO TEXTOS EM DESTAQUE E PRECISAM ESTAR NA COR ÀZULPRIMARY`
