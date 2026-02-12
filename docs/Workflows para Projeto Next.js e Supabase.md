
# **AGENTS.md \- Contexto & Diretrizes para portfoliodanilo.com**

## **1\. Stack Tecnológico & Versões (Estrito)**

* **Framework Principal**: Next.js 14+ (App Router). NÃO utilizar padrões do diretório pages/.  
* **Motor 3D**: React Three Fiber (R3F) v8+ com Three.js r160+.  
  * *Restrição Crítica*: Componentes R3F (\<Canvas\>, \<Mesh\>) DEVEM ser Client Components ("use client").  
* **Backend**: Supabase (PostgreSQL 15+). Utilizar biblioteca @supabase/ssr para autenticação.  
* **Hosting**: Firebase Hosting (via experimento webframeworks).  
* **Estilização**: Tailwind CSS v4.

## **2\. Arquitetura de Componentes**

* **Separação de Responsabilidades**:  
  * Dados são buscados no Servidor (Server Actions ou Server Components).  
  * Interatividade e 3D residem no Cliente.  
  * O estado global da cena 3D deve ser gerenciado via Zustand (evitar React Context para loops de renderização 3D para prevenir lag).

## **3\. Protocolos de Depuração (Workflows Padrão)**

* **Erro de Realtime**: Primeiro, verifique se a tabela está na publicação supabase\_realtime. Segundo, valide as políticas RLS.  
* **Erro de Deploy Firebase**: Verifique se firebase experiments:enable webframeworks está ativo e se o node version no package.json corresponde à runtime do Google Cloud Functions.  
* **Erro Visual R3F**: Injete \<Stats /\> e verifique vazamento de memória (geometrias não descartadas).

## **4\. Comandos Operacionais**

* **Dev**: npm run dev (Porta 3000).  
* **Build**: npm run build (Deve passar sem erros de lint/type).  
* **Deploy**: firebase deploy \--only hosting.

A inclusão deste arquivo na raiz do repositório garante que qualquer agente instanciado pelo Antigravity "leia" as regras do jogo antes de escrever uma única linha de código, economizando tokens e tempo de refatoração.

## ---

**4\. Deep Dive: Workflows para Supabase Realtime e Storage**

A integração do Supabase em aplicações Next.js frequentemente apresenta falhas silenciosas ou bloqueios de segurança (RLS) que são difíceis de diagnosticar manualmente. O workflow agêntico proposto substitui a verificação manual de logs por uma auditoria sistemática de segurança e conectividade.

### **4.1 Diagnóstico do Problema: O "Triângulo de Falhas"**

As falhas no Supabase geralmente ocorrem em três vetores:

1. **Conectividade WebSocket (Realtime)**: O cliente tenta conectar, mas o banco de dados não publica os eventos.  
2. **Permissões (RLS)**: O usuário autenticado tem permissão de leitura, mas não de subscrição ou upload.  
3. **Configuração de Cliente**: Instância incorreta do cliente Supabase (Singleton vs. Múltiplas instâncias) causando perda de sessão.

### **4.2 O Workflow supabase-fixer no Antigravity**

Utilizando as skills dos repositórios Nice-Wolf-Studio 18 e sickn33 14, definimos o seguinte roteiro de execução para o agente.

#### **Fase 1: Auditoria de Configuração e RLS**

**Gatilho**: O usuário reporta "O upload de imagens falha com erro 403" ou "Não vejo atualizações em tempo real".

**Ação do Agente**:

1. **Carregamento de Contexto**: O agente lê src/utils/supabase/client.ts e supabase/config.toml.  
2. **Introspecção do Banco de Dados**: O agente utiliza a CLI do Supabase (se disponível no terminal do Antigravity) ou solicita acesso SQL para consultar tabelas de sistema do Postgres (pg\_catalog, pg\_publication\_tables).  
   * *Verificação Crítica*: Ele executa select \* from pg\_publication\_tables where pubname \= 'supabase\_realtime'; para garantir que a tabela alvo está listada.  
3. **Análise de Políticas RLS**: O agente extrai as políticas da tabela storage.objects. Ele verifica especificamente se existe uma política INSERT para o role authenticated.  
   * *Raciocínio do Agente*: "A política atual permite SELECT para public, mas o upload requer permissão explícita de INSERT."

#### **Fase 2: Plano de Implementação e Correção**

O agente gera um artefato de **Plano de Implementação** 25 detalhando a correção SQL necessária.

* **Correção de Storage**:  
  SQL  
  \-- O agente propõe e aplica:  
  create policy "Permitir upload autenticado"  
  on storage.objects for insert  
  to authenticated  
  with check ( bucket\_id \= 'portfolio-assets' AND auth.uid() \= owner );

* **Correção de Realtime**:  
  O agente refatora o hook do lado do cliente para incluir tratamento de erros de canal:  
  TypeScript  
  channel.subscribe((status) \=\> {  
    if (status \=== 'SUBSCRIBED') { /\*... \*/ }  
    if (status \=== 'CHANNEL\_ERROR') { console.error('Erro de RLS ou Conexão'); }  
  })

#### **Fase 3: Verificação via Browser**

Diferente de um chat de IA comum, o agente do Antigravity abre o navegador "headless".4

1. Ele navega até a página de upload.  
2. Realiza o login com credenciais de teste (lidas de .env.local).  
3. Tenta o upload novamente.  
4. Captura um **Screenshot** do sucesso ou do novo erro de console, fornecendo prova visual da resolução.5

## ---

**5\. Deep Dive: Depuração de UI e Bugs em React Three Fiber (R3F)**

A depuração de aplicações 3D é complexa porque erros matemáticos (ex: dividir por zero na posição de uma câmera) resultam em telas pretas ou meshes invisíveis, sem lançar exceções tradicionais de JavaScript. O Antigravity aborda isso através de inspeção visual e análise de árvore de componentes.

### **5.1 Desafios Específicos do R3F**

* **Perda de Contexto WebGL**: Navegar entre rotas no Next.js pode desmontar o \<Canvas\> incorretamente, causando falhas ao retornar.  
* **Hidratação (Hydration Mismatch)**: O Next.js tenta renderizar HTML no servidor, mas o \<Canvas\> é puramente cliente. Se não isolado, gera erros de "Prop mismatch".  
* **Performance (Re-renders)**: Atualizar o estado do React (React State) a cada frame (60fps) mata a performance.

### **5.2 O Workflow r3f-visual-debugger**

Baseado nas skills do repositório EnzeD/r3f-skills 20 e no pacote 3d-web-experience.13

#### **Fase 1: Reprodução Visual e Instrumentação**

**Gatilho**: "A animação 3D trava quando eu rolo a página" ou "O modelo 3D desaparece".

**Ação do Agente**:

1. **Instrumentação**: O agente injeta automaticamente o componente \<Stats /\> (da biblioteca @react-three/drei) no código para monitorar FPS e chamadas de desenho (draw calls).  
2. **Verificação de Render Loop**: O agente analisa o código em busca de anti-padrões.  
   * *Detecção*: "Encontrei um useState sendo atualizado dentro de um useFrame. Isso causa re-renderização completa do componente React a cada 16ms."  
   * *Correção*: O agente refatora o código para usar useRef para valores mutáveis que não precisam de re-renderização do React, manipulando a mesh diretamente.

#### **Fase 2: Isolamento de Contexto**

Para resolver problemas de hidratação e contexto WebGL:

1. O agente verifica se o \<Canvas\> está sendo renderizado condicionalmente ou dentro de transições de página (como framer-motion).  
2. Ele aplica o padrão de "Tunneling" ou move o Canvas para um layout persistente (template.tsx no Next.js App Router) para evitar que o contexto WebGL seja destruído na navegação.  
3. **Artefato de Vídeo**: O agente grava uma sessão de navegação no navegador interno, demonstrando que a transição entre páginas agora mantém a cena 3D estável e fluida.3

## ---

**6\. Deep Dive: Orquestração DevOps para Firebase e Next.js**

O deploy de aplicações Next.js modernas (App Router) no Firebase Hosting é notoriamente frágil devido à natureza "Serverless" das funções que suportam o SSR (Server-Side Rendering). Problemas de "Cold Start" e falhas na geração estática são comuns.

### **6.1 A Complexidade do App Router no Firebase**

O Firebase tenta envolver as rotas dinâmicas do Next.js em Cloud Functions. Se a configuração não for exata, o build falha silenciosamente ou a aplicação retorna erros 500 em produção.

* **Erro Comum**: O processo de build tenta acessar o Supabase para gerar páginas estáticas (generateStaticParams), mas as variáveis de ambiente não estão disponíveis no ambiente de build do Cloud Functions.

### **6.2 O Workflow firebase-devops-orchestrator**

Este workflow utiliza as skills de devops do repositório sickn33 15 e práticas documentadas da comunidade.26

#### **Fase 1: Auditoria de Configuração (firebase.json)**

**Gatilho**: "O deploy falhou" ou "Erro 404 ao atualizar a página dinâmica".

**Ação do Agente**:

1. **Verificação de Experimentos**: O agente verifica se o arquivo .firebaserc ou a configuração global tem webframeworks ativado.  
   * *Comando*: firebase experiments:enable webframeworks.  
2. **Análise de next.config.js**: Verifica a configuração de output. Para Firebase com SSR, output: 'standalone' é frequentemente preferido, mas o framework do Firebase pode exigir configurações específicas de imagem.

#### **Fase 2: Simulação de Build e Injeção de Segredos**

O agente simula o ambiente de produção localmente para capturar erros de build.

1. **Simulação**: Executa firebase emulators:start ou npm run build em um ambiente limpo.  
2. **Detecção de Falha de Segredos**: Se o build falhar ao conectar no Supabase, o agente identifica que as variáveis de ambiente não estão sendo passadas para o contexto de geração estática.  
3. **Correção**: O agente sugere e implementa um script de pré-deploy que injeta as variáveis do .env.local no comando de deploy do Firebase, ou configura o Google Secret Manager se estiver em um ambiente corporativo.

#### **Fase 3: Verificação de Roteamento (Rewrites)**

Para corrigir o erro de "404 na atualização" (comum em SPAs):

1. O agente inspeciona a seção rewrites no firebase.json.  
2. Garante que existe uma regra de "catch-all" que direciona todas as requisições não estáticas para a Cloud Function que serve o Next.js.  
   JSON  
   "rewrites": \[ { "source": "\*\*", "function": "server" } \]

3. **Validação Final**: O agente realiza o deploy em um "Preview Channel" do Firebase e acessa a URL gerada para confirmar que rotas profundas carregam corretamente.

## ---

**7\. Estratégia de Implementação e Orquestração Avançada**

Para o portfoliodanilo.com, a implementação não deve ser feita de forma ad-hoc. Recomenda-se uma abordagem em camadas para a instalação e manutenção das skills.

### **7.1 Matriz de Instalação de Skills**

A tabela abaixo resume as skills específicas que devem ser instaladas via terminal do Antigravity (ou clonadas manualmente) para cobrir os requisitos do projeto.

| Domínio de Problema | Skill Recomendada | Repositório Fonte | Função Crítica |
| :---- | :---- | :---- | :---- |
| **Geral / Setup** | senior-fullstack | sickn33/antigravity-awesome-skills | Orquestração geral do projeto Next.js. |
| **Backend / DB** | supabase-developer | Nice-Wolf-Studio/claude-code-supabase-skills | Auditoria de RLS e correção de Realtime. |
| **Visual / 3D** | 3d-web-experience | sickn33 (Bundle) | Debugging de performance R3F e WebGL. |
| **Infra / Deploy** | firebase-deployment | VoltAgent ou sickn33 | Configuração de webframeworks e CI/CD. |
| **Qualidade** | systematic-debugging | sickn33 | Metodologia de resolução de bugs passo-a-passo. |

### **7.2 O Fluxo de Trabalho Integrado ("O Mantenedor")**

Para manutenção contínua, recomenda-se a criação de uma skill composta personalizada, denominada portfolio-maintainer, que encadeia as skills acima.

* **Cenário**: O desenvolvedor solicita "Execute uma verificação de saúde no projeto".  
* **Execução**:  
  1. O agente invoca supabase-developer para verificar a integridade da conexão e políticas.  
  2. Invoca firebase-deployment para verificar se há divergências entre o lockfile local e a versão do Node.js no Cloud Functions.  
  3. Abre o navegador e executa um teste de fumaça (smoke test) visual na galeria 3D usando as diretrizes de 3d-web-experience.

## **8\. Considerações Finais e Perspectivas Futuras**

A transição para o uso de workflows agênticos no Google Antigravity representa um amadurecimento significativo na engenharia de software. Para o projeto portfoliodanilo.com, essa abordagem transforma problemas tradicionalmente frustrantes — como a depuração de WebSockets em tempo real ou a configuração de deploys serverless — em tarefas gerenciáveis e verificáveis.

A análise demonstra que o sucesso não reside apenas na ferramenta, mas na qualidade da "inteligência" fornecida aos agentes através dos repositórios de skills. Ao adotar o sickn33/antigravity-awesome-skills como base e complementá-lo com especialistas de domínio como EnzeD/r3f-skills e Nice-Wolf-Studio, e ao governar rigorosamente o contexto através do AGENTS.md, o desenvolvedor estabelece um ambiente onde a correção de erros é sistemática, rápida e, acima de tudo, confiável. O futuro do desenvolvimento full-stack é colaborativo, onde humanos definem a arquitetura e agentes garantem a integridade operacional de cada componente da stack.

#### **Referências citadas**

1. acessado em fevereiro 11, 2026, [https://www.amplifilabs.com/post/google-antigravity-review-everything-you-need-to-know-about-googles-ai-first-ide\#:\~:text=Antigravity%20shifts%20this%20dynamic.,developers%20interact%20with%20their%20tools.](https://www.amplifilabs.com/post/google-antigravity-review-everything-you-need-to-know-about-googles-ai-first-ide#:~:text=Antigravity%20shifts%20this%20dynamic.,developers%20interact%20with%20their%20tools.)  
2. Tutorial : Getting Started with Google Antigravity | by Romin Irani \- Medium, acessado em fevereiro 11, 2026, [https://medium.com/google-cloud/tutorial-getting-started-with-google-antigravity-b5cc74c103c2](https://medium.com/google-cloud/tutorial-getting-started-with-google-antigravity-b5cc74c103c2)  
3. Google Antigravity AI \- What is it?, acessado em fevereiro 11, 2026, [https://cension.ai/blog/google-antigravity-ai-what-is-it/](https://cension.ai/blog/google-antigravity-ai-what-is-it/)  
4. Browser \- Google Antigravity Documentation, acessado em fevereiro 11, 2026, [https://antigravity.google/docs/browser](https://antigravity.google/docs/browser)  
5. Build with Google Antigravity, our new agentic development platform, acessado em fevereiro 11, 2026, [https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/)  
6. Agent Skills \- Google Antigravity Documentation, acessado em fevereiro 11, 2026, [https://antigravity.google/docs/skills](https://antigravity.google/docs/skills)  
7. Skills: teaching AI agents to act consistently \- Trigger.dev, acessado em fevereiro 11, 2026, [https://trigger.dev/blog/skills](https://trigger.dev/blog/skills)  
8. antigravity-skills/README.md at main \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/rmyndharis/antigravity-skills/blob/main/README.md](https://github.com/rmyndharis/antigravity-skills/blob/main/README.md)  
9. antigravity-ide · GitHub Topics, acessado em fevereiro 11, 2026, [https://github.com/topics/antigravity-ide](https://github.com/topics/antigravity-ide)  
10. Introducing Google Antigravity, a New Era in AI-Assisted Software Development, acessado em fevereiro 11, 2026, [https://antigravity.google/blog/introducing-google-antigravity](https://antigravity.google/blog/introducing-google-antigravity)  
11. I aggregated 58 skills for Antigravity into one repo : r/google\_antigravity \- Reddit, acessado em fevereiro 11, 2026, [https://www.reddit.com/r/google\_antigravity/comments/1qcuc8u/i\_aggregated\_58\_skills\_for\_antigravity\_into\_one/](https://www.reddit.com/r/google_antigravity/comments/1qcuc8u/i_aggregated_58_skills_for_antigravity_into_one/)  
12. sickn33/antigravity-awesome-skills: The Ultimate Collection of 700+ Agentic Skills for Claude Code/Antigravity/Cursor. Battle-tested, high-performance skills for AI agents including official skills from Anthropic and Vercel. \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)  
13. antigravity-awesome-skills/docs/BUNDLES.md at main \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/sickn33/antigravity-awesome-skills/blob/main/docs/BUNDLES.md](https://github.com/sickn33/antigravity-awesome-skills/blob/main/docs/BUNDLES.md)  
14. antigravity-awesome-skills/CATALOG.md at main \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/sickn33/antigravity-awesome-skills/blob/main/CATALOG.md](https://github.com/sickn33/antigravity-awesome-skills/blob/main/CATALOG.md)  
15. AntiGravity Firebase Integration: Build Apps With One Command : r/AISEOInsider \- Reddit, acessado em fevereiro 11, 2026, [https://www.reddit.com/r/AISEOInsider/comments/1qnifd3/antigravity\_firebase\_integration\_build\_apps\_with/](https://www.reddit.com/r/AISEOInsider/comments/1qnifd3/antigravity_firebase_integration_build_apps_with/)  
16. rmyndharis/antigravity-skills: A curated collection of Agent Skills for Google Antigravity \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/rmyndharis/antigravity-skills](https://github.com/rmyndharis/antigravity-skills)  
17. antigravity-skills/CATALOG.md at main · rmyndharis/antigravity-skills, acessado em fevereiro 11, 2026, [https://github.com/rmyndharis/antigravity-skills/blob/main/CATALOG.md](https://github.com/rmyndharis/antigravity-skills/blob/main/CATALOG.md)  
18. Nice-Wolf-Studio/claude-code-supabase-skills \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/Nice-Wolf-Studio/claude-code-supabase-skills](https://github.com/Nice-Wolf-Studio/claude-code-supabase-skills)  
19. Raudbjorn/claude \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/Raudbjorn/claude](https://github.com/Raudbjorn/claude)  
20. React Three Fiber Skills for Claude Code & Codex \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/EnzeD/r3f-skills](https://github.com/EnzeD/r3f-skills)  
21. VoltAgent/awesome-agent-skills: Claude Code Skills and 300+ agent skills from official dev teams and the community, compatible with Codex, Antigravity, Gemini CLI, Cursor and others. \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)  
22. AGENTS.md, acessado em fevereiro 11, 2026, [https://agents.md/](https://agents.md/)  
23. Next.js \+ Supabase SaaS Boilerplate | supastarter \- SaaS starter kit for Next.js and Nuxt, acessado em fevereiro 11, 2026, [https://supastarter.dev/nextjs-supabase-boilerplate](https://supastarter.dev/nextjs-supabase-boilerplate)  
24. antigravity-workspace-template/AGENTS.md at main \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/study8677/antigravity-workspace-template/blob/main/AGENTS.md](https://github.com/study8677/antigravity-workspace-template/blob/main/AGENTS.md)  
25. Implementation Plan \- Google Antigravity Documentation, acessado em fevereiro 11, 2026, [https://antigravity.google/docs/implementation-plan](https://antigravity.google/docs/implementation-plan)  
26. Internal error during firebase deploy \--only hosting with Next.js 15 · Issue \#9879 \- GitHub, acessado em fevereiro 11, 2026, [https://github.com/firebase/firebase-tools/issues/9879](https://github.com/firebase/firebase-tools/issues/9879)  
27. Solving Next.js Route Refresh Issues on Firebase Hosting \- DEV Community, acessado em fevereiro 11, 2026, [https://dev.to/techbucket/solving-nextjs-route-refresh-issues-on-firebase-hosting-526](https://dev.to/techbucket/solving-nextjs-route-refresh-issues-on-firebase-hosting-526)
