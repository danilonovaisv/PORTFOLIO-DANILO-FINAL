---
description: # WORKFLOW DE ALINHAMENTO E CALIBRAGEM DE CONTEXTO
---

# WORKFLOW DE ALINHAMENTO E CALIBRAGEM DE CONTEXTO

Você é um especialista sênior em Engenharia de Software. Antes de iniciarmos qualquer tarefa de codificação ou auditoria, preciso que você execute uma **análise profunda do estado atual do projeto** para atualizar seu contexto interno.

Sua missão é escanear o ambiente, identificar a stack tecnológica, a arquitetura de pastas e os documentos disponíveis.

---

## ETAPA 1: Reconhecimento da Stack (Tech Stack)

1.  **Leia o arquivo `package.json`** na raiz.
2.  Identifique e liste internamente:
    - Versão do **Next.js** (e se estamos usando App Router ou Pages Router).
    - Versão do **React**.
    - Presença de bibliotecas chave: **Three.js / React Three Fiber**, **Framer Motion**, **Tailwind CSS**, **GSAP**, etc.
    - Scripts disponíveis (build, dev, lint).
3.  **Leia o `tsconfig.json`** e `tailwind.config.ts` (ou .js) para entender os aliases de importação (ex: `@/components`) e configuração de estilos.

## ETAPA 2: Mapeamento da Arquitetura

1.  Liste a estrutura de pastas principal dentro de `/src`.
2.  Identifique onde ficam:
    - **Páginas/Rotas:** (ex: `src/app/page.tsx` vs `pages/index.tsx`).
    - **Componentes UI:** (ex: `src/components/ui` ou `src/components/common`).
    - **Assets/Public:** Onde estão imagens e modelos 3D.
3.  Confirme o padrão de estilização (Tailwind classes vs CSS Modules vs Styled Components).

## ETAPA 3: Verificação de Documentação e Contexto das Páginas

1.  Verifique a existência da pasta **`.context/`** na raiz do projeto.
2.  **Leia TODOS os arquivos `.md` dentro de `.context/`**, pois eles contêm o detalhamento completo de cada página do projeto:
    - `HOME - PROTOTIPO INTERATIVO.md` → Estrutura, seções e comportamento da página Home.
    - `PORTFOLIO - PROTÓTIPO INTERATIVO.md` → Especificações da página de Portfolio.
    - `SOBRE-PROTOTIPO-INTERATIVO.md` → Definições da página Sobre (About).
    - `HYBRID-GHOST-REVEAL-IMPLEMENTATION.md` → Detalhes técnicos do efeito Ghost Reveal.
    - `MOBILE-LAYOUT-FIXES.md` → Ajustes de layout específicos para mobile.
3.  Extraia de cada documento:
    - Estrutura de seções e componentes.
    - Estilos, cores e tipografia esperados.
    - Comportamentos interativos e animações.
    - Referências visuais (imagens `.jpg`, `.png` na mesma pasta).
4.  Verifique se a pasta `.context/` contém as imagens de referência citadas nos docs.

---

## SAÍDA ESPERADA (Resumo de Alinhamento)

Após a análise, forneça apenas um resumo no seguinte formato, confirmando que está pronto:

**✅ CALIBRAGEM CONCLUÍDA**

- **Framework:** [Ex: Next.js 14 (App Router)]
- **Estilização:** [Ex: Tailwind CSS + Framer Motion]
- **3D/WebGL:** [Ex: R3F instalado / Não detectado]
- **Documento de Auditoria:** [Encontrado / Não Encontrado]
- **Estrutura de Pastas:** Entendida.

**Estou sincronizado com o projeto. Aguardando o comando para iniciar o Workflow de Auditoria.**
