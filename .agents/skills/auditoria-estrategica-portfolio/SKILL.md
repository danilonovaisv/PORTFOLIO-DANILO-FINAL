---
name: auditoria-estrategica-portfolio
description: Skill de Auditoria Estratégica para o Portfólio Danilo Novais (portfoliodanilo.com). Executa análise visual, usabilidade, performance, SEO e direcionamento de design.
---

# Auditoria Estratégica — Portfólio Danilo Novais

**Site:** portfoliodanilo.com
**Repositório:** PORTFOLIO-DANILO-FINAL

Use esta skill para orientar a auditoria e as refatorações no portfólio de Danilo Novais, garantindo que as modificações estejam alinhadas com as diretrizes e prioridades de design, usabilidade, performance e SEO.

## 1. Resumo Executivo

O projeto apresenta uma proposta visual diferenciada, combinando direção de arte, experiências interativas, animações cinematográficas e tecnologias modernas. A arquitetura utiliza Next.js 16, React 19, TypeScript, Tailwind CSS, React Three Fiber e Supabase.

Existem oportunidades importantes de evolução na relação entre impacto visual e eficiência, na experiência mobile, na organização do conteúdo e na validação técnica do SEO.

**Prioridades de Auditoria:**
- **Design (Alta):** Hierarquia visual e consistência.
- **Usabilidade (Alta):** Navegação e conversão.
- **Performance (Crítica):** WebGL, vídeos e carregamento.
- **SEO (Alta):** Indexação e conteúdo estratégico.

## 2. Design e Direção de Arte (Ghost Design System)

- **Hierarquia Visual:** Estabelecer uma hierarquia visual clara entre mensagem, projetos e elementos decorativos (WebGL, partículas). Eles devem trabalhar a favor da mensagem e não competir com os projetos.
- **Camada WebGL:** O código posiciona a camada WebGL acima do conteúdo editorial na Hero. Valide visualmente em diferentes luminosidades e tamanhos de tela.
- **Padronização:** Padronizar espaçamentos, proporções e componentes. Revisar a legibilidade dos textos secundários em fundos escuros (Void Black).
- **Mobile:** Garantir que thumbnails tenham composição consistente e boa leitura.

## 3. Usabilidade e Experiência do Usuário

- **Descoberta:** Tornar os principais projetos acessíveis com poucos movimentos. Destacar resultados e contribuições em cada case.
- **Contato e Informações:** Facilitar o acesso ao currículo, LinkedIn e contato.
- **Mobile e Acessibilidade:** Testar o menu mobile com navegação por teclado e leitores de tela. Verificar se os elementos interativos possuem estados claros de foco, carregamento e resposta.
- **Jornada de Contratação:** Desenvolver uma jornada orientada à contratação sem comprometer a experiência visual.

## 4. Performance e Carregamento

- **Testes:** Executar Google Lighthouse e PageSpeed Insights. Medir LCP, INP e CLS em dispositivos móveis.
- **Otimizações:**
  - Imagens em WebP/AVIF com dimensões adequadas.
  - Carregar vídeos sob demanda, usando posters otimizados.
  - Reduzir o pacote de JavaScript.
  - Priorizar animações CSS (transform/opacity).
  - Validar a renderização com conexões lentas.

## 5. SEO e Descoberta Orgânica

- **Validação de Sitemap e Robots:** O sitemap precisa ser XML válido e validado no Search Console. O `robots.txt` não deve bloquear a pasta `/_next/*` ou recursos críticos.
- **Conteúdo Estratégico:** 
  - Trabalhar palavras-chave: Direção de Criação, Branding, Creative Leadership e Art Direction.
  - Criar descrições e textos alternativos (alt) específicos.
  - Melhorar a semântica de H1/H2 e indexação dos cases individuais.

## 6. Plano de Ação Recomendado (Workflow)

Ao utilizar esta skill, siga a seguinte ordem de execução:
1. **Auditoria visual desktop e mobile** (Crítica)
2. **Testes de acessibilidade e navegação** (Alta)
3. **Diagnóstico Lighthouse e Core Web Vitals** (Crítica)
4. **Revisão de WebGL, vídeos e animações** (Alta)
5. **Correção e validação do sitemap/robots** (Alta)
6. **Otimização de conteúdo e SEO dos projetos** (Alta)
7. **Testes finais e regressão visual** (Alta)
