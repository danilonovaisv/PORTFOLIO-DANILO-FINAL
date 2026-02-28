  RELATÓRIO DE AUDITORIA TÉCNICA — ADMIN + SUPABASE                                                                
                                                                                                                        
  Data: 2026-02-28                                                                                                    
  Auditor: Análise estática + inspeção de schema/migrations/código-fonte                              
  Nota: Os arquivos /mnt/data/ (assets-site.json, CSVs do Security Advisor, TIPOS DE CENA.json, listas peças.json,
  SUPER-TEMPLATE-COPY.md, System Prompt CENAS PUBLICITÁRIAS.md) não estão acessíveis neste ambiente. Foram marcados como
   INDETERMINADO nos pontos que dependem exclusivamente deles.                                                          
                                                                                                                        
  ---
  1. RESUMO EXECUTIVO
                                                                                                                        
  - [P0] site_settings sem RLS e com GRANT ALL TO anon — a OpenAI API Key armazenada em texto puro (JSONB) está exposta 
  publicamente via REST API do Supabase.                                                                                
  - [P0] admin_users exposta publicamente — policy "Enable read access for all users" USING (true) permite que qualquer
  pessoa (anonymous) leia user_ids e roles de administradores.
  - [P0] Políticas conflitantes em portfolio_projects — três policies sobrepostas criam brechas: qualquer usuário
  autenticado (não apenas admins) pode escrever/deletar projetos.
  - [P0] experiences, content_version, projects (legacy) com RLS ativo mas sem policies — acesso totalmente bloqueado
  para todas as roles não-superuser; gatilhos de versão quebram silenciosamente.
  - [P1] Dois registros de auditoria paralelos e incompatíveis — código grava em audit_log (legacy); migration criou
  admin_audit_log (novo, nunca usado).
  - [P1] Rename de projeto sem atomicidade — storage move + DB update não são transacionais; falha parcial corrompem
  dados sem rollback.
  - [P1] Modelos nano-banana, flow, whisky são aliases de DALL-E 3 — UI os apresenta como motores distintos, mas todos
  chamam model: 'dall-e-3'. Erro de expectativa do usuário.
  - [P1] Copy Agent: YouTube URL passa como texto para o LLM sem extração de transcript — o modelo não acessa URLs;
  transcript não é obtido. Feature documentada não funciona como esperado.
  - [P1] Copy Agent: fallback silencioso retorna success: true mesmo quando IA falhou — oculta falha real do usuário.
  - [P2] 4:5 mapeado para 1024x1024 (quadrado) — aspect ratio 4:5 portrait deveria gerar imagem portrait, não quadrada.

  ---
  2. MATRIZ DE PROBLEMAS

  ID: SEC-01
  Área: DB/RLS/Security
  Sintoma: OpenAI key legível publicamente via REST
  Evidência: GRANT ALL TO anon em site_settings; sem ENABLE ROW LEVEL SECURITY; key em JSONB puro
  Causa Provável: RLS nunca habilitado na tabela; supabase_vault instalado mas não usado
  Severidade: P0
  Correção Sugerida: Habilitar RLS + policy admin-only + migrar key para vault.secrets
  ────────────────────────────────────────
  ID: SEC-02
  Área: DB/RLS
  Sintoma: admin_users leitura pública
  Evidência: CREATE POLICY "Enable read access for all users" ... USING (true) em schema.sql:830
  Causa Provável: Policy placeholder sem restrição de role
  Severidade: P0
  Correção Sugerida: Trocar por policy is_admin() ou apenas authenticated
  ────────────────────────────────────────
  ID: SEC-03
  Área: DB/RLS
  Sintoma: Qualquer autenticado pode escrever projetos
  Evidência: 3 policies sobrepostas: "Auth manage projects" (any auth), "authenticated_admin_full_access" (ALL com
    USING(true)), "Admin manage projects" (admin check)
  Causa Provável: Migration 20260224 adicionou policy permissiva sem remover legadas
  Severidade: P0
  Correção Sugerida: Remover "Auth manage projects" e "authenticated_admin_full_access"; manter apenas "Admin manage
    projects"
  ────────────────────────────────────────
  ID: SEC-04
  Área: DB/RLS
  Sintoma: experiences, content_version, projects bloqueados para todos
  Evidência: RLS ativo + zero policies visíveis no schema.sql para essas tabelas
  Causa Provável: Tabelas criadas/migradas sem policies
  Severidade: P0
  Correção Sugerida: Criar policies admin-write + public-read seletivo ou desabilitar RLS nas tabelas não sensíveis
  ────────────────────────────────────────
  ID: SEC-05
  Área: Storage
  Sintoma: portfolio-media e site-assets públicos (SELECT anon)
  Evidência: legacy_buckets_select em migration 20260208000002 e Auth manage legado
  Causa Provável: Decisão de design mas precisa ser explícita
  Severidade: P1
  Correção Sugerida: Confirmar intenção; documentar que são CDN público intencionalmente
  ────────────────────────────────────────
  ID: ADM-01
  Área: ADMIN/DB
  Sintoma: Dois sistemas de audit paralelos
  Evidência: audit_log (schema.sql, usado pelo código); admin_audit_log (migration 20260207201000, não usado)
  Causa Provável: Migration criou nova tabela sem migrar código
  Severidade: P1
  Correção Sugerida: Unificar: ou migrar código para admin_audit_log ou remover a tabela órfã
  ────────────────────────────────────────
  ID: ADM-02
  Área: ADMIN/Storage
  Sintoma: Rename não é atômico
  Evidência: actions.ts:79-113 move storage ANTES de salvar no DB; sem rollback
  Causa Provável: Supabase storage não tem transações DB
  Severidade: P1
  Correção Sugerida: Inverter ordem (salvar DB primeiro, depois mover storage) ou usar compensação explícita
  ────────────────────────────────────────
  ID: ADM-03
  Área: ADMIN/Storage
  Sintoma: String.replace sem anchoring pode substituir path errado
  Evidência: storage-utils.ts:41 usa file.replace(oldPrefix, newPrefix) sem regex ^
  Causa Provável: JS replace substitui primeira ocorrência em qualquer posição
  Severidade: P1
  Correção Sugerida: Usar file.startsWith(oldPrefix) + newPrefix + file.slice(oldPrefix.length)
  ────────────────────────────────────────
  ID: ADM-04
  Área: ADMIN/Storage
  Sintoma: Delete não tenta todos os 3 path schemes com erro silenciado
  Evidência: actions.ts:157-163 tem try/catch que swallows erros de delete
  Causa Provável: Erro logado mas não propagado; arquivos órfãos residuais
  Severidade: P2
  Correção Sugerida: Logar detalhes do erro por path + retornar lista de falhas parciais ao admin
  ────────────────────────────────────────
  ID: SCN-01
  Área: ADMIN/Scene
  Sintoma: nano-banana, flow, whisky chamam dall-e-3 silenciosamente
  Evidência: actions.ts:271 model: 'dall-e-3' hardcoded para todos modelos
  Causa Provável: Modelos custom não implementados; apenas prompt style difere
  Severidade: P1
  Correção Sugerida: Tornar explícito na UI que são variações de prompt do DALL-E 3, ou renomear para refletir realidade
  ────────────────────────────────────────
  ID: SCN-02
  Área: ADMIN/Scene
  Sintoma: Ratio 4:5 gera imagem quadrada 1024x1024
  Evidência: schema/scene-generator.ts:37 '4:5': '1024x1024'
  Causa Provável: DALL-E 3 não suporta 4:5 nativo; fallback para quadrado sem aviso
  Severidade: P2
  Correção Sugerida: Mapear para 1024x1792 (portrait mais próximo) ou remover opção 4:5
  ────────────────────────────────────────
  ID: SCN-03
  Área: ADMIN/Scene
  Sintoma: pieceType sem validação enum server-side
  Evidência: sceneInputSchema aceita qualquer string; só tem min/max
  Causa Provável: Select com opções no frontend mas bypass via fetch direto
  Severidade: P2
  Correção Sugerida: Adicionar .refine() com conjunto de valores válidos do SCENE_CATEGORIES
  ────────────────────────────────────────
  ID: SCN-04
  Área: ADMIN/Scene
  Sintoma: TIPOS DE CENA.json vs SCENE_CATEGORIES — conformidade não verificável
  Evidência: /mnt/data/TIPOS DE CENA.json inacessível
  Causa Provável: INDETERMINADO
  Severidade: INDETERMINADO
  Correção Sugerida: Comparar manualmente SCENE_CATEGORIES com TIPOS DE CENA.json
  ────────────────────────────────────────
  ID: CPY-01
  Área: ADMIN/Copy
  Sintoma: YouTube URL não gera transcript; LLM não acessa URLs
  Evidência: actions.ts:166-169 apenas insere URL como texto no prompt
  Causa Provável: LLM não tem acesso a internet; transcript não é extraído
  Severidade: P1
  Correção Sugerida: Integrar YouTube Transcript API ou avisar usuário que o link é apenas referência textual
  ────────────────────────────────────────
  ID: CPY-02
  Área: ADMIN/Copy
  Sintoma: Fallback retorna success: true quando IA falhou
  Evidência: actions.ts:279-284 retorna success: true, content: buildFallbackCopy(...)
  Causa Provável: Intenção de não bloquear usuário, mas oculta falha real
  Severidade: P1
  Correção Sugerida: Retornar success: false com fallbackContent em campo separado, ou manter flag aiUsed: false
  ────────────────────────────────────────
  ID: CPY-03
  Área: ADMIN/Copy
  Sintoma: youtubeUrl validação fraca
  Evidência: copyInputSchema: apenas includes('youtube.com')
  Causa Provável: https://evil.com?youtube.com passa
  Severidade: P2
  Correção Sugerida: Usar regex de URL completa do YouTube
  ────────────────────────────────────────
  ID: CPY-04
  Área: ADMIN/Copy
  Sintoma: SUPER-TEMPLATE-COPY.md vs output format — conformidade não verificável
  Evidência: /mnt/data/SUPER-TEMPLATE-COPY.md inacessível
  Causa Provável: INDETERMINADO
  Severidade: INDETERMINADO
  Correção Sugerida: Comparar campos hardcoded no outputFormat com SUPER-TEMPLATE-COPY.md
  ────────────────────────────────────────
  ID: SET-01
  Área: ADMIN/Settings
  Sintoma: OpenAI key salva como JSONB puro, sem criptografia
  Evidência: settings.ts:18-27 lê de site_settings.value como string
  Causa Provável: supabase_vault disponível mas não usado
  Severidade: P0 (via SEC-01)
  Correção Sugerida: Migrar para vault.create_secret() / vault.read_secret()
  ────────────────────────────────────────
  ID: SET-02
  Área: ADMIN/Settings
  Sintoma: admin_users roles ('editor','viewer') não reconhecidos por is_admin()
  Evidência: admin_users.role CHECK IN ('owner','editor','viewer') vs is_admin() verifica 'admin','owner','super_admin'
  Causa Provável: Schemas divergentes entre tabela e função
  Severidade: P1
  Correção Sugerida: Alinhar roles: adicionar 'admin' ao CHECK ou ajustar is_admin()
  ────────────────────────────────────────
  ID: SEC-06
  Área: Security
  Sintoma: Policy placeholder não renomeada
  Evidência: CREATE POLICY "replace_with_policy_name" ON "public"."admin_users"
  Causa Provável: Policy criada sem nome real
  Severidade: P2
  Correção Sugerida: Renomear para nome descritivo
  ────────────────────────────────────────
  ID: STR-01
  Área: Storage
  Sintoma: Estrutura v4/MARCA/PROJETO legada coexiste com nova estrutura MARCA/PROJETO/assets-do-projeto
  Evidência: actions.ts:64-100 lida com 3 path schemes simultaneamente
  Causa Provável: Migração de storage incompleta
  Severidade: P1
  Correção Sugerida: Executar migração completa para novo esquema + remover lógica de compatibilidade após validação

  ---
  3. ACHADOS DETALHADOS

  ---
  SEC-01 — site_settings sem RLS, OpenAI key exposta publicamente

  Como reproduzir:
  curl "https://<SUPABASE_URL>/rest/v1/site_settings?key=eq.openai_api_key" \
    -H "apikey: <ANON_KEY>"
  # Retorna: {"key":"openai_api_key","value":"sk-..."}

  Evidências:
  - supabase/schema.sql: GRANT ALL ON TABLE "public"."site_settings" TO "anon"
  - site_settings NÃO aparece na lista de tabelas com ENABLE ROW LEVEL SECURITY
  - settings.ts:18-27 lê value diretamente de JSONB (texto puro)
  - supabase_vault instalado (schema.sql:61) mas não utilizado

  Causa raiz: A tabela site_settings foi criada sem RLS habilitado. O grant TO anon combinado com ausência de RLS
  permite leitura anônima completa via PostgREST.

  Correção proposta:

  -- 1. Habilitar RLS
  ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

  -- 2. Revogar grants excessivos
  REVOKE ALL ON TABLE public.site_settings FROM anon;

  -- 3. Policy: apenas service_role/admin lê e escreve
  CREATE POLICY "Admin manage site_settings"
    ON public.site_settings
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

  -- 4. Migrar chave para vault (opcional mas recomendado)
  SELECT vault.create_secret('sk-...', 'openai_api_key');
  -- Depois acessar com: SELECT vault.read_secret('openai_api_key')

  Testes necessários:
  - Query anon via curl deve retornar 0 rows ou 403
  - Admin autenticado consegue ler/escrever
  - getOpenAIKey() continua funcionando (requer service_role)

  ---
  SEC-02 — admin_users leitura anônima

  Evidências:
  - schema.sql:830 CREATE POLICY "Enable read access for all users" ON "public"."admin_users" FOR SELECT USING (true)
  - Expõe user_id (UUID) e role de todos os administradores

  Correção proposta:

  DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_users;
  -- Manter apenas:
  -- CREATE POLICY "Admin read admin_users" ON public.admin_users FOR SELECT USING (public.is_admin());

  ---
  SEC-03 — Políticas conflitantes em portfolio_projects

  Evidências:
  - schema.sql:810 "Auth manage projects" USING (auth.role() = 'authenticated') — nunca foi removida
  - migration 20260224 adicionou "authenticated_admin_full_access" FOR ALL ... USING(true) WITH CHECK(true) —
  efetivamente abre escrita para qualquer usuário autenticado
  - migration 20260207183000 criou "Admin manage projects" com check de role correto

  Comportamento real: Em PostgreSQL com RLS, políticas são combinadas com OR para SELECT e AND para
  INSERT/UPDATE/DELETE. Para operações de escrita, como há 3 policies FOR ALL, qualquer uma que passar (incluindo
  USING(true)) permite a operação. Qualquer usuário autenticado pode criar/editar/deletar projetos.

  Correção proposta:

  -- Remover as policies permissivas
  DROP POLICY IF EXISTS "Auth manage projects" ON public.portfolio_projects;
  DROP POLICY IF EXISTS "authenticated_admin_full_access" ON public.portfolio_projects;
  -- Manter apenas "Admin manage projects" (da migration 20260207183000)

  ---
  SEC-04 — experiences, content_version, projects com RLS sem policies

  Evidências:
  - schema.sql: Todas as 3 tabelas têm ENABLE ROW LEVEL SECURITY mas nenhuma CREATE POLICY referenciando-as
  - Trigger bump_on_publish_impact em content_version escrita via SECURITY DEFINER (funciona)
  - Mas leituras/escritas diretas de admin para experiences e projects (legacy) estão bloqueadas

  Impacto real:
  - Admin não consegue gerenciar experiences (seção "Sobre")
  - Tabela projects (legacy) completamente inacessível
  - content_version escrita apenas via trigger (SECURITY DEFINER bypassa RLS)

  Correção proposta:

  -- experiences: admin escreve, público lê publicadas
  CREATE POLICY "Admin manage experiences" ON public.experiences
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
  CREATE POLICY "Public read published experiences" ON public.experiences
    FOR SELECT USING (status = 'published');

  -- content_version: apenas service_role/sistema modifica
  CREATE POLICY "System manage content_version" ON public.content_version
    FOR ALL USING (public.is_admin());
  CREATE POLICY "Public read content_version" ON public.content_version
    FOR SELECT USING (true);

  -- projects (legacy): se não for mais usado, desabilitar RLS ou criar política minimal

  ---
  ADM-01 — Dois sistemas de auditoria paralelos

  Evidências:
  - audit.ts:53 grava em audit_log (campos: entity, entity_id, details)
  - migration 20260207201000 cria admin_audit_log (campos: resource, resource_id, status, error_code, etc.) — mais
  completo, nunca usado
  - audit_log não tem policy de RLS configurada apesar de ENABLE ROW LEVEL SECURITY

  Causa raiz: Nova tabela criada em migration sem atualizar o código de audit.ts.

  Correção proposta: Migrar audit.ts para usar admin_audit_log (que já tem RLS com policy Admin read audit log). Após
  migração, deprecar audit_log.

  ---
  ADM-02/ADM-03 — Rename de projeto sem atomicidade + replace sem anchoring

  Evidências:
  - trabalhos/actions.ts:79-113: move storage → atualiza DB (nesta ordem)
  - Se storage move OK mas DB update falha: arquivos em novo path, DB apontando para path antigo
  - storage-utils.ts:41: file.replace(oldPrefix, newPrefix) — sem ^ anchoring

  Exemplo de falha de replace: Se oldPrefix = "client/proj-abc" e um arquivo tem path "client/proj-abc-v2/image.jpg", o
  replace incorretamente muda para "client/proj-novo-v2/image.jpg".

  Correção proposta:
  // storage-utils.ts - replace com anchoring correto
  const newFilePath = file.startsWith(oldPrefix + '/')
    ? newPrefix + file.slice(oldPrefix.length)
    : file; // não mover se não for prefixo exato

  Para atomicidade: salvar no DB primeiro; se falhar, não mexer no storage. Se storage falhar após DB salvo, implementar
   tarefa de reconciliação assíncrona.

  ---
  SCN-01 — Modelos custom são aliases de DALL-E 3

  Evidências:
  - actions.ts:257-260: supportedModels = new Set(['dall-e-3', 'nano-banana', 'flow', 'whisky'])
  - actions.ts:271: model: 'dall-e-3' hardcoded independentemente do modelo escolhido
  - A única diferença é o promptStyle (texto do prompt)

  Impacto: Usuário seleciona "Whisky (cinematográfico)" esperando motor diferente, recebe DALL-E 3 com prompt diferente.
   A diferença real é real (o estilo de prompt influencia o resultado), mas a apresentação é enganosa.

  Correção proposta: Ajustar UI para apresentar como "Estilos DALL-E 3" e não "modelos" distintos. Ou implementar
  backends reais quando disponíveis.

  ---
  CPY-01 — YouTube: URL sem extração de transcript

  Evidências:
  - actions.ts:166-169: apenas concatena a URL como texto no prompt
  - model: 'gpt-4o' não acessa URLs
  - Sem chamada a YouTube Data API v3 ou serviço de transcript

  Impacto: Usuário espera que o conteúdo do vídeo informe a copy; na realidade o LLM apenas vê a URL como string, sem
  conteúdo real.

  Correções possíveis (por ordem de custo):
  1. Adicionar campo de texto livre "Transcrição/roteiro" para o usuário colar manualmente
  2. Integrar youtube-transcript npm para extrair transcript quando disponível
  3. Usar YouTube Data API v3 para metadata (título, descrição, tags)

  ---
  CPY-02 — Fallback silencioso com success: true

  Evidências:
  - actions.ts:278-284: catch retorna success: true, content: buildFallbackCopy(), notice: '...'
  - O notice é mostrado ao usuário mas o resultado tem aparência de sucesso

  Impacto: Admin pode não perceber que está recebendo um rascunho genérico (sem análise visual, sem SEO tags, sem campos
   obrigatórios do template SUPER-TEMPLATE-COPY.md) em vez de copy gerado por IA.

  Correção proposta:
  return {
    success: false, // ou usar `aiSuccess: false`
    fallbackContent: buildFallbackCopy(context),
    error: 'A geração com IA falhou. Rascunho base disponível abaixo.',
  };

  ---
  SET-02 — Divergência de roles entre admin_users e is_admin()

  Evidências:
  - admin_users.role CHECK IN ('owner', 'editor', 'viewer')
  - is_admin() verifica: 'admin', 'owner', 'super_admin'
  - Resultado: um usuário com role 'editor' em admin_users não é reconhecido como admin pela função is_admin(); pode
  logar mas não consegue executar operações que exigem service_role

  Correção proposta: Alinhar os conjuntos de roles. Opções:
  - A) Adicionar 'admin' e 'editor' ao CHECK de admin_users E ao is_admin()
  - B) Usar a tabela admin_users diretamente no is_admin() (JOIN com auth.users)

  ---
  4. PLANO DE AJUSTE (ROADMAP)

  P0 — Segurança crítica (executar primeiro, em sequência)

  P0.1 → Habilitar RLS em site_settings + revogar GRANT anon → migrar key para vault.secrets
  P0.2 → Remover policy "Enable read access for all users" de admin_users
  P0.3 → Resolver conflito de policies em portfolio_projects (remover Auth manage e authenticated_admin_full_access)
  P0.4 → Criar policies para experiences, content_version, projects (legacy)

  Dependências: P0.1 depende de testar que getOpenAIKey() ainda funciona via service_role após RLS habilitado. P0.3 deve
   ser testado com login de usuário não-admin para garantir bloqueio correto.

  Riscos:
  - P0.1 pode quebrar qualquer acesso público existente a site_settings (verificar se frontend usa)
  - P0.4 pode re-habilitar acesso à tabela projects legada que estava efetivamente inativa

  Rollback: Backup das policies atuais antes de qualquer DROP (executar pg_dump --schema-only).

  ---
  P1 — Alto impacto (após P0)

  P1.1 → Unificar sistemas de audit: migrar audit.ts para admin_audit_log
  P1.2 → Corrigir rename atômico: inverter ordem (DB first, storage second) + fix de anchoring no replace
  P1.3 → YouTube Copy Agent: adicionar aviso explícito ou campo de transcrição manual
  P1.4 → Copy Agent fallback: retornar success:false com fallbackContent separado
  P1.5 → SCN-01: ajustar UI do Scene Generator para apresentar modelos como "estilos" não backends distintos
  P1.6 → Alinhar roles de admin_users com is_admin()
  P1.7 → Executar migração de storage do esquema v4/ para novo esquema (após P1.2)

  ---
  P2 — Melhorias (após P1)

  P2.1 → SCN-02: corrigir mapeamento 4:5 → portrait (1024x1792) ou remover opção
  P2.2 → Adicionar enum validation em pieceType no server action
  P2.3 → Fortalecer validação de youtubeUrl (regex completa)
  P2.4 → Renomear policy "replace_with_policy_name" com nome descritivo
  P2.5 → Adicionar hash ao 3D asset ghost.glb para cache imutável
  P2.6 → Avaliar autenticação nos endpoints das edge functions de limpeza
  P2.7 → Confirmar conformidade de SCENE_CATEGORIES com TIPOS DE CENA.json [INDETERMINADO - requer arquivo]
  P2.8 → Confirmar campos do outputFormat do Copy Agent com SUPER-TEMPLATE-COPY.md [INDETERMINADO - requer arquivo]

  ---
  5. CHECKLIST PÓS-CORREÇÃO

  Banco de Dados

  - site_settings: \d+ public.site_settings mostra row_security = on
  - SELECT * FROM site_settings via anon key retorna 0 rows (403/empty)
  - experiences: admin consegue INSERT/UPDATE via dashboard
  - content_version: trigger bump_on_publish_impact executa sem erro após publicar projeto
  - portfolio_projects: usuário autenticado sem role 'admin' recebe erro 42501 ao tentar INSERT
  - admin_users: SELECT anon retorna 0 rows

  Storage

  - Renomear projeto de "brand-a/proj-old" para "brand-a/proj-new": todos os arquivos movidos corretamente, nenhum
  arquivo duplicado
  - Deletar projeto: storage limpo nos 3 path schemes
  - Arquivo com nome "proj-abc-v2" não é afetado por rename de "proj-abc"
  - buildV4Path(kind:'landing-page') gera path com landin-page (não landing-page)

  Admin UI

  - Settings: salvar OpenAI key → getOpenAIKey() retorna valor correto
  - CRUD completo de projeto (criar, editar, renomear, incluir/remover peça, deletar)
  - Scene Generator: geração com DALL-E 3 funciona; erro 429 retorna SCN-RATE-LIMIT
  - Scene Generator: UI deixa claro que nano-banana/flow/whisky são estilos de prompt
  - Copy Agent: falha de IA retorna estado não-sucesso com rascunho separado identificado
  - Copy Agent: YouTube URL com domínio estranho é rejeitada na validação

  Geração / Tokens

  - openai_api_key não aparece em nenhum log de console (sanitizado)
  - SUPABASE_SERVICE_ROLE_KEY não aparece em respostas HTTP ou payloads do cliente
  - audit_log (ou admin_audit_log após unificação) registra todas as ações scene.generate e copy.generate

  Segurança

  - curl /rest/v1/site_settings com anon key: vazio ou 403
  - curl /rest/v1/admin_users com anon key: vazio ou 403
  - Nenhuma das policies usa placeholder replace_with_policy_name
  - is_admin() retorna true para roles esperados; false para 'editor' se não mapeado

  ---
  ITENS INDETERMINADOS (requerem arquivos externos)

  Item: SCN-04
  Arquivo necessário: TIPOS DE CENA.json
  O que verificar: Comparar categorias/subcategorias com SCENE_CATEGORIES em types.ts
  ────────────────────────────────────────
  Item: CPY-04
  Arquivo necessário: SUPER-TEMPLATE-COPY.md
  O que verificar: Comparar campos do outputFormat hardcoded em actions.ts com template oficial
  ────────────────────────────────────────
  Item: SCN-05
  Arquivo necessário: System Prompt CENAS PUBLICITÁRIAS.md
  O que verificar: Comparar promptBase em actions.ts com system prompt oficial
  ────────────────────────────────────────
  Item: STR-02
  Arquivo necessário: assets-site.json
  O que verificar: Verificar se paths de assets do site seguem convenção correta
  ────────────────────────────────────────
  Item: SCN-ADV
  Arquivo necessário: listas peças.json
  O que verificar: Confirmar se lista de peças no UI cobre todos os itens do JSON de referência
