---
description: Personalized portfolio and professional landing page setup.
---

## 🎨 Fluxo de Trabalho do Portfólio (portfoliodanilo.com)

Construção de um ecossistema digital de alta performance, unindo a arquitetura "Agent-First", gráficos 3D via WebGPU e o sistema de Ghost Design (Design Invisível).

### 1. Arquitetura e Experiência (Ghost Design)

* **Agent Skills:** Utilização de `@nextjs-react-expert`, `@3d-web-experience`, e `@framer-motion`.
* **Filosofia Visual:** Aplicação do **Ghost Design System** (presença sem ruído, alto contraste, cor de destaque exclusiva `bluePrimary #0048ff`, ausência absoluta da cor vermelha).
* **Experiência 3D e Motion:** Integração do React Three Fiber para o background interativo (ex: *Liquid Ether*) e sincronização entre Framer Motion + GSAP ScrollTrigger com o easing padrão de `[0.22, 1, 0.36, 1]`.

### 2. Conteúdo e CMS Dinâmico (ALPA V3)

* **Agent Skills:** Utilização de `@supabase` e `@copy-agent` (para automatizar a geração de copy em markdown).
* **Gestão via `/admin`:** Sem arquivos de metadados estáticos. Gerenciamento de projetos, tags e mídia diretamente pela interface Admin conectada ao **Supabase** (PostgreSQL, Auth, Storage).
* **Landing Pages Dinâmicas:** Uso da arquitetura **Template ALPA (V3)** para renderizar os "Case Studies" de forma flexível (suportando até 10 tipos diferentes de blocos editoriais).
* **Otimização de Mídia:** Otimização automática de imagens/vídeos via Supabase Storage e fallback de segurança para garantir fluidez na interface.

### 3. Performance, SEO e Web Vitals (Growth)

* **Agent Skills:** Utilização de `@audit-website` integrado ao servidor MCP (Chrome DevTools).
* **SEO Semântico:** Uso do `generateMetadata` dinâmico do Next.js (Server-side) e injeção de JSON-LD (incluindo `VideoObject` para projetos com vídeo) para maximizar a indexação nos mecanismos de busca.
* **Auditoria:** Execução do comando `squirrel audit` (ou delegar ao Agente) para monitorar os Core Web Vitals (LCP, CLS, INP) e garantir nota de performance A (Score > 90).

```bash
// Comando de inicialização do Agentic Workflow (Para o Google Antigravity IDE)
/onboard (escaneia a estrutura e sincroniza as regras)
pnpm install && pnpm run dev

```