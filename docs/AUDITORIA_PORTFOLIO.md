
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

AJUSTE A SESSÃO `ABOUT ORIGIN`, A SINCRONIA DE ENTRADA DO TEXTO E IMAGEM

Na maioria dos componentes React, a renderização de texto e imagens é controlada pelo navegador. A "sincronia" que você quer ajustar geralmente se refere à **tempo de carregamento** e à **ordem de exibição**.

---

### Como ajustar isso em um componente React (TypeScript)

Você pode usar o `useEffect` para controlar o tempo de carregamento ou a ordem de execução.

#### Exemplo: Usando `useEffect` com um delay

```typescript
// ... importações necessárias ...
import { useEffect, useState } from 'react';

function AboutOriginSection() {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Simula o carregamento do texto
    setTimeout(() => {
      console.log("Texto 'about origin' carregado.");
      setIsContentReady(true);
    }, 500); // Ajuste o tempo (em ms) conforme necessário

    // Simula o carregamento da imagem
    setTimeout(() => {
      console.log("Imagem 'about origin' carregada.");
    }, 1000); // Ajuste o tempo (em ms) conforme necessário
  }, []); // O array vazio significa que a função de efeito será executada apenas uma vez, no monte do componente

  return (
    <div className="about-origin-section">
      {isContentReady ? (
        <>
          {/* Texto */}
          <p className="about-origin-text">
            A origem deste projeto foi inspirada em...
          </p>
          
          {/* Imagem */}
          <img 
            src="path_para_imagem_about_origin" 
            alt="Descrição da imagem sobre a origem"
            className={isContentReady ? "about-origin-image loaded" : ""}
          />
        </>
      ) : (
        <p>Carregando conteúdo...</p>
      )}
    </div>
  );
}

export default AboutOriginSection;
```


### Passos para ajustar a sincronia:

1.  **Identifique o tempo de carregamento**: Use `console.log` ou ferramentas de depuração (como o DevTools do Chrome) para medir o tempo entre o carregamento do texto e da imagem.
2.  **Ajuste os `setTimeout`**: No código acima, os `setTimeout`s controlam o tempo de carregamento. Ajuste os valores (500ms, 1000ms) para corresponder ao tempo real do seu componente.
3.  **Verifique a ordem de renderização**: Garanta que o texto seja renderizado antes ou ao mesmo tempo que a imagem, conforme necessário para seu design.
4.  **Teste em diferentes condições**: Certifique-se de testar o componente em diferentes navegadores, dispositivos e conexões lentas para garantir uma experiência consistente.

---


