# MISSÃO PARA GOOGLE ANTIGRAVITY
## Recuperar e relincar todos os assets migrados de Supabase Storage para Cloudflare R2

Você é o agente principal `cloudflare-asset-recovery`, atuando como Arquiteto de Software Sênior, especialista em Next.js, TypeScript, Cloudflare R2, D1, migração de dados, integridade de conteúdo e testes E2E.

### Objetivo final

Recuperar as referências de todos os assets dos projetos já publicados no portfólio, fazer cada referência apontar para o objeto correto no Cloudflare R2 e garantir que imagens, vídeos, galerias, capas, thumbnails, arquivos 3D e mídias incorporadas continuem associados ao conteúdo original.

Não recrie conteúdo, não substitua assets por imagens genéricas e não descarte registros sem prova. A prioridade é preservar a identidade de cada arquivo e o relacionamento com seu projeto.

Repositório: `https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL`
Site: `https://portfoliodanilo.com`
CDN R2: `https://assets.portfoliodanilo.com`
Branch de trabalho: crie uma branch descritiva, por exemplo `fix/cloudflare-r2-asset-references`.

### Evidências iniciais já encontradas

Use estes fatos como hipóteses fortes, mas confirme todos no checkout local:

1. A página pública `/portfolio` apresenta projetos e pelo menos uma imagem em produção ainda é requisitada pelo domínio antigo `umkmwbkwvulxtdodzmzf.supabase.co`.
2. O asset `down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp` aparece no HTML/requisição antiga, e o inventário `assets.json` contém o mesmo caminho com URL R2:
   `https://assets.portfoliodanilo.com/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp`.
3. `assets.json` e `src/config/site-assets.json` contêm registros com `bucket`, `file_path`, `file_url`, `key` e `id`. Eles são candidatos a inventário de reconciliação, não prova de que todos os objetos ainda respondem.
4. `src/lib/storage/r2.ts` documenta um bucket físico unificado `portfolio-assets`; `site-assets` e `portfolio-media` são prefixos virtuais de key. `resolveR2Key()` adiciona o prefixo do bucket virtual e `getR2AssetUrl()` monta a URL CDN.
5. `src/lib/utils.ts:getAssetUrl()` retorna qualquer URL HTTP(S) imediatamente, antes de tentar normalizá-la. Portanto, uma URL absoluta antiga do Supabase pode escapar da resolução R2.
6. `src/lib/media/asset-contract.ts:resolveSupabaseUrl()` também preserva URLs absolutas que não contêm `/storage/v1/`, mesmo que o host seja o domínio legado de Supabase. Inspecione todos os consumidores.
7. `src/lib/supabase/urls.ts:buildSupabaseStorageUrl()` já tem caminho R2-first quando `getR2PublicUrl()` está configurado. Porém `getR2PublicUrl()` retorna `null` quando a variável não está disponível. Confirme o ambiente real de build e runtime, especialmente com OpenNext/Workers.
8. `next.config.mjs` já inclui `assets.portfoliodanilo.com` nos hosts R2 de imagens e CSP, mas confirme o resultado no build de produção.
9. `scripts/verify-supabase-assets.mjs`, `scripts/check-storage-links.ts`, `scripts/verify-asset-corrections.ts`, `scripts/update-supabase-urls.ts` e `scripts/repair-site-assets-paths.ts` têm lógica ou dependência direta de Supabase. Não os execute como reparo de produção sem provar que são compatíveis com o estado atual. Em particular, os scripts que escrevem em `site_assets` via Supabase não são automaticamente adequados para D1.
10. `MIGRATION_COMPLETENESS.md` e `MIGRATION_CORRECTION_PLAN.md` podem estar desatualizados em relação ao `wrangler.toml` e ao código atual. A fonte de verdade deve ser o checkout atual, as bindings efetivas e os dados reais.

### Skills obrigatórias

Leia integralmente as skills antes de agir:

- `.agents/skills/systematic-debugging/SKILL.md`, se existir.
- `.agents/skills/writing-plans/SKILL.md`, se existir.
- `.agents/skills/subagent-driven-development/SKILL.md`, se existir.
- `.agents/skills/verification-before-completion/SKILL.md`, se existir.
- `.agents/skills/verify-portfolio-change/SKILL.md`, se existir.
- `.agents/skills/audit-cloudflare-asset-inventory/SKILL.md`.
- `.agents/skills/resolve-legacy-storage-urls/SKILL.md`.
- `.agents/skills/verify-r2-object-integrity/SKILL.md`.
- `.agents/skills/tdd-asset-url-recovery/SKILL.md`.
- `.agents/skills/verify-portfolio-media/SKILL.md`.

Se uma skill existente não estiver presente, não invente que foi carregada. Registre a ausência e use o procedimento equivalente deste pacote.

### Governança e limites

- Comece em modo read-only. Faça `git status --short`, `git log -5 --oneline`, identifique branch, leia os arquivos e rode apenas verificações sem efeitos colaterais.
- Não leia nem imprima valores de `.env*`, tokens, chaves privadas, service-role keys ou credenciais. É permitido verificar apenas a presença de variáveis sem mostrar seus valores.
- Não execute `DROP`, `DELETE`, `TRUNCATE`, `UPDATE`, `INSERT`, `UPSERT`, `wrangler r2 object delete`, exclusões em lote, migrações remotas, deploy, push ou publicação sem aprovação explícita.
- Não remova assets, registros, projetos ou campos. Não altere `assets.json` ou `src/config/site-assets.json` em massa sem demonstrar por que são incorretos.
- Não faça rewrite global de toda URL HTTP para R2. URLs de YouTube, Vimeo, CDNs externos, links de parceiros e conteúdo externo devem continuar externos.
- Não converta URLs assinadas ou privadas em URLs públicas. Detecte `token`, `signature`, `X-Amz-*`, parâmetros de autorização e trate esses casos separadamente.
- Não assuma que `HTTP 200` do HTML ou do Next Image optimizer prova que o objeto de origem está correto. Valide a URL CDN canônica diretamente.
- Se houver alterações locais não relacionadas, preserve-as. Não faça reset, checkout destrutivo ou limpeza de arquivos desconhecidos.

### Fase 1: Reconhecimento completo do projeto

1. Inspecione `package.json`, `pnpm-lock.yaml`, `wrangler.toml`, `open-next.config.ts`, `next.config.mjs`, `src/lib/env.ts`, `src/lib/storage/r2.ts`, `src/lib/supabase/urls.ts`, `src/lib/utils.ts`, `src/lib/media/asset-contract.ts`, `src/config/brand.ts`, `src/config/site-assets.json`, `assets.json`, `src/lib/video-assets.ts` e todos os módulos que carregam projetos.
2. Descubra a camada de dados ativa. Determine se o conteúdo vem de D1, Supabase, arquivos JSON estáticos, cache, API ou uma combinação. Não deduza isso apenas pelo nome de diretório.
3. Inspecione o schema e as queries das tabelas de projetos e assets. Investigue, se existirem, campos como `thumbnail_path`, `hero_image_path`, `url_landscape`, `url_square`, `gallery`, `home_featured`, `case_body`, `metadata`, `file_path`, `file_url` e campos de landing pages.
4. Faça busca global por:
   - `umkmwbkwvulxtdodzmzf.supabase.co`
   - `supabase.co/storage/v1`
   - `/storage/v1/object/public/`
   - `/storage/v1/render/image/public/`
   - `getAssetUrl`, `getGhostAssetUrl`, `resolveSupabaseUrl`, `buildSupabaseStorageUrl`, `supabaseLoader`
   - nomes de buckets `site-assets`, `portfolio-media`, `portfolio-assets`
5. Identifique os consumidores de URL em cards, páginas de projeto, galerias, hero, home, seção Sobre, landing pages, player de vídeo, previews HTML, modelos 3D e área administrativa.
6. Leia as regras, agentes, skills e workflows já existentes. Não substitua a arquitetura agêntica do repositório.

Entregável da fase: `.agents/artifacts/asset-recovery/01-repository-audit.md`, contendo arquitetura real, caminhos de código, fluxo de dados, findings com severidade e arquivos que serão alterados.

### Fase 2: Inventário e reconciliação dos assets

Construa um inventário unificado, sem gravar no banco, usando:

- `assets.json`;
- `src/config/site-assets.json`;
- exports/fixtures existentes;
- registros reais da fonte de dados ativa, somente com queries read-only;
- inventário real do bucket R2, se as credenciais e ferramentas já estiverem configuradas.

Chave de reconciliação primária: `bucket + normalized_file_path`. Use `id` e `key` como identificadores auxiliares. Nunca faça match apenas por nome do arquivo.

Para cada referência antiga:
1. Parseie a URL como URL, não com substituições regex cegas.
2. Reconheça somente hosts Supabase conhecidos e rotas públicas de Storage.
3. Extraia bucket e object key após `/storage/v1/object/public/` ou `/storage/v1/render/image/public/`.
4. Normalize encoding por segmento, barras duplicadas, prefixos repetidos e bucket virtual, sem alterar nomes legítimos de arquivo.
5. Procure match exato no inventário por bucket + file_path.
6. Calcule a URL candidata com o domínio `https://assets.portfoliodanilo.com` e o prefixo virtual do bucket.
7. Confirme que o objeto existe no R2 e que o domínio público está habilitado antes de marcar como recuperado.
8. Registre ambiguidades, duplicatas, arquivos sem correspondência e objetos ausentes. Não escolha automaticamente quando houver mais de um candidato.

A estrutura física esperada, a confirmar com `wrangler.toml` e `src/lib/storage/r2.ts`, é:

- bucket físico: `portfolio-assets`
- key: `site-assets/<file_path>` para assets do bucket virtual `site-assets`
- key: `portfolio-media/<file_path>` para mídia do bucket virtual `portfolio-media`
- URL pública: `https://assets.portfoliodanilo.com/<key>`

Não confunda bucket lógico e bucket físico. Não duplique `site-assets/site-assets` nem `portfolio-media/portfolio-media`.

Entregáveis:
- `.agents/artifacts/asset-recovery/02-asset-inventory.json`
- `.agents/artifacts/asset-recovery/03-reconciliation-report.md`
- `.agents/artifacts/asset-recovery/04-unresolved-assets.csv`

O relatório precisa mostrar totais por bucket, por tipo, por projeto e por status: `matched`, `verified`, `missing`, `ambiguous`, `external`, `signed_or_private`, `malformed`.

### Fase 3: Diagnóstico da causa raiz

Teste explicitamente as hipóteses:

A. URL absoluta antiga passa sem normalização por `getAssetUrl()` ou `resolveSupabaseUrl()`.

B. Algum consumidor usa `thumbnail_path`, `hero_image_path`, `gallery` ou `case_body` diretamente, sem passar por um resolver comum.

C. `NEXT_PUBLIC_R2_PUBLIC_URL` está ausente no build ou no runtime, fazendo `getR2PublicUrl()` retornar `null` e habilitando fallback antigo.

D. Os metadados do inventário possuem URL R2 correta, mas os registros de conteúdo ainda carregam URLs Supabase antigas.

E. A URL R2 candidata está errada por prefixo virtual duplicado, encoding, bucket incorreto ou diferença de extensão.

F. O objeto existe no R2, mas o custom domain não está Active, o acesso público não está habilitado, ou a resposta HTTP/headers está incorreta.

G. A aplicação usa caminhos diferentes para imagens, vídeos e modelos 3D, e só um deles passa pela resolução R2.

Para cada hipótese, apresente evidência reproduzível e resultado PASS/FAIL. Não escolha uma causa apenas por plausibilidade.

### Fase 4: Desenho da correção

Antes de implementar, produza um plano curto com arquivos exatos, testes e rollback.

A solução preferencial é uma camada canônica de resolução de assets, reutilizada por todos os componentes:

- URLs Supabase públicas reconhecidas devem ser convertidas para R2 por meio do bucket e object key originais.
- URLs R2 já válidas devem permanecer estáveis, sem duplicar prefixos.
- Paths relativos conhecidos devem ser resolvidos com bucket explícito ou regra já existente e testada.
- URLs externas HTTPS devem permanecer externas.
- `data:`, `blob:` e caminhos locais devem manter o comportamento atual.
- URLs assinadas/privadas não devem ser tornadas públicas automaticamente.
- Imagens, vídeos, HTML previews e modelos 3D devem preservar seu tipo e comportamento.
- Não use endpoint Supabase de image transformation para R2. Para R2, use URL de objeto original e, quando apropriado, o Next.js Image Optimizer ou estratégia já aprovada pelo projeto.
- O resolver deve ser determinístico, testável, seguro contra URL malformada e independente de acesso ao banco durante renderização.

Não crie um segundo sistema paralelo se `src/lib/supabase/urls.ts` puder ser corrigido com segurança. Porém, não force a lógica dentro de um helper inadequado: compare os contratos e centralize o comportamento com o menor diff possível.

### Fase 5: Implementação TDD

1. Crie testes que falhem antes da implementação.
2. Cubra pelo menos:
   - Supabase public object URL de `site-assets`;
   - Supabase public object URL de `portfolio-media`;
   - Supabase render/image URL;
   - URL R2 já canônica;
   - URL externa HTTPS;
   - URL local `/site.assets/...`;
   - `data:` e `blob:`;
   - vídeo `.mp4` e `.webm`;
   - arquivo `.glb`/`.gltf`;
   - caminho com espaços, acentos e caracteres escapados;
   - bucket duplicado;
   - bucket desconhecido;
   - URL assinada/privada;
   - URL inválida.
3. Teste a resolução de objetos conhecidos do `assets.json`, incluindo o asset GLAD citado nas evidências.
4. Corrija os consumidores que ignoram o resolver. Não altere os links externos legítimos.
5. Se for indispensável persistir correções em D1, gere primeiro backup/export, script com `--dry-run` por padrão, relatório de before/after, transação ou lotes idempotentes e rollback. Pare e solicite aprovação antes de executar qualquer escrita remota.
6. Não use scripts Supabase antigos para escrever em D1. Reimplemente/adapte com a API real do binding D1 ou com o mecanismo de dados atual, depois de inspecionar schema e documentação.

### Fase 6: Auditoria de integridade R2

Use `src/lib/storage/r2.ts` e as ferramentas já configuradas. Valide:
- `HeadBucket`/conectividade com o bucket físico;
- `HeadObject` ou `GET` por key;
- HTTP `HEAD` e, quando necessário, `GET Range: bytes=0-0` no domínio CDN;
- status, content-type, content-length, etag e cache headers;
- paginação completa do inventário, sem assumir que uma única página contém todos os objetos;
- timeout, concorrência limitada e retry exponencial com jitter;
- relatório de falhas com URL/key, status e causa.

Não altere ACL, custom domain, DNS, cache rules ou políticas do bucket sem aprovação. Confirme no painel/API Cloudflare que `assets.portfoliodanilo.com` está conectado ao bucket correto e com estado Active.

### Fase 7: Verificação de ponta a ponta

Use Playwright e os testes já presentes. Verifique:
- `/`
- `/portfolio`
- cada `/portfolio/<slug>` publicado
- `/sobre`
- páginas de landing page que exibam assets
- área administrativa apenas se houver credenciais e autorização, sem expor dados.

Critérios:
- nenhum request público de mídia deve continuar apontando para `umkmwbkwvulxtdodzmzf.supabase.co`;
- todas as URLs R2 resolvidas devem responder com sucesso e conteúdo compatível;
- todas as imagens devem renderizar;
- vídeos devem carregar metadata e iniciar quando o comportamento da UI exigir;
- galerias e ordem dos itens devem permanecer iguais;
- nenhum projeto, texto, ordem, slug ou metadado deve desaparecer;
- console sem erros novos;
- nenhuma regressão de layout, CLS ou fallback indevido;
- comparar quantidade de projetos publicados e quantidade de referências antes/depois.

### Fase 8: Verificação técnica

Inspecione os scripts de `package.json` e execute, conforme aplicável:
- `pnpm run lint`
- `pnpm run typecheck`
- testes unitários Jest relevantes
- `pnpm run test:e2e`
- `pnpm run build:cloudflare`
- smoke tests no preview local do OpenNext/Cloudflare.

Não use `pnpm run verify:assets` como prova de migração R2 sem adaptar e verificar o script, pois sua implementação atual pode procurar URLs Supabase em `src/lib/video-assets.ts`. Não use `pnpm run admin:prepare:mutate` sem auditar seus efeitos, pois chama scripts que acessam a tabela `site_assets` via Supabase.

### Fase 9: Revisão e entrega

Faça revisão independente do diff. Entregue:
1. Causa raiz confirmada, com caminhos e linhas.
2. Quantidade de referências antigas encontradas.
3. Quantidade de referências mapeadas e verificadas no R2.
4. Quantidade de objetos ausentes, ambíguos e externos preservados.
5. Arquivos alterados e justificativa.
6. Testes executados e saída resumida.
7. Relatórios e backup gerados.
8. Passos manuais restantes, se houver.
9. Instrução de deploy, mas não faça deploy sem autorização.

### Critério de conclusão

A missão só está concluída quando todos os projetos publicados mantiverem seus conteúdos e a auditoria provar que cada referência interna recuperável aponta para o objeto correto no R2. Se houver assets sem correspondência ou objeto ausente, a missão deve terminar como `PARTIAL`, com relatório e lista exata de pendências, nunca como sucesso.

Comece carregando as skills e fazendo a auditoria read-only. Não faça perguntas sobre detalhes que podem ser descobertos no repositório. Pergunte ao usuário apenas se houver decisão de negócio ou aprovação remota indispensável.
