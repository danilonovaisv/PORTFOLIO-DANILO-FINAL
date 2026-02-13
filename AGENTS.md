# **AGENTS.md - Contexto & Diretrizes para portfoliodanilo.com**

## **1. Stack Tecnológico & Versões (Estrito)**

- **Framework Principal**: Next.js 14+ (App Router). NÃO utilizar padrões do diretório pages/.
- **Motor 3D**: React Three Fiber (R3F) v8+ com Three.js r160+.
  - _Restrição Crítica_: Componentes R3F (<Canvas>, <Mesh>) DEVEM ser Client Components ("use client").
- **Backend**: Supabase (PostgreSQL 15+). Utilizar biblioteca @supabase/ssr para autenticação.
- **Hosting**: Firebase Hosting (via experimento webframeworks).
- **Estilização**: Tailwind CSS v4.

## **2. Arquitetura de Componentes**

- **Separação de Responsabilidades**:
  - Dados são buscados no Servidor (Server Actions ou Server Components).
  - Interatividade e 3D residem no Cliente.
  - O estado global da cena 3D deve ser gerenciado via Zustand (evitar React Context para loops de renderização 3D para prevenir lag).

## **3. Protocolos de Depuração (Workflows Padrão)**

- **Erro de Realtime**: Primeiro, verifique se a tabela está na publicação supabase_realtime. Segundo, valide as políticas RLS.
- **Erro de Deploy Firebase**: Verifique se firebase experiments:enable webframeworks está ativo e se o node version no package.json corresponde à runtime do Google Cloud Functions.
- **Erro Visual R3F**: Injete <Stats /> e verifique vazamento de memória (geometrias não descartadas).

## **4. Comandos Operacionais**

- **Dev**: npm run dev (Porta 3000).
- **Build**: npm run build (Deve passar sem erros de lint/type).
- **Deploy**: firebase deploy --only hosting.

A inclusão deste arquivo na raiz do repositório garante que qualquer agente instanciado pelo Antigravity "leia" as regras do jogo antes de escrever uma única linha de código, economizando tokens e tempo de refatoração.
