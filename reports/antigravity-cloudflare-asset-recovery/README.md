# Cloudflare Asset Recovery Kit

Pacote de execução para recuperar referências de imagens, vídeos e outros arquivos migrados do Supabase Storage para Cloudflare R2 no repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL`.

## Instalação

1. Faça checkout do repositório e crie uma branch dedicada.
2. Extraia o conteúdo deste ZIP na raiz do repositório, preservando os caminhos `.agents/...`.
3. Revise o diff. Não sobrescreva arquivos existentes sem comparar o conteúdo.
4. Abra o projeto no Google Antigravity.
5. No painel de agentes, selecione `cloudflare-asset-recovery` ou mencione o agente no chat.
6. Envie o conteúdo de `PROMPT-ANTIGRAVITY.md` como missão inicial.
7. Confirme que as skills aparecem em Customizations > Skills. Se a IDE já estava aberta, recarregue as customizações ou reinicie a sessão.

## Conteúdo

- `PROMPT-ANTIGRAVITY.md`: missão completa para o agente.
- `.agents/agents/cloudflare-asset-recovery.md`: agente principal reutilizável.
- `.agents/rules/storage-migration-safety.md`: guardrails acionados por decisão do modelo.
- `.agents/skills/audit-cloudflare-asset-inventory/SKILL.md`: inventário e reconciliação.
- `.agents/skills/resolve-legacy-storage-urls/SKILL.md`: resolução de URLs antigas.
- `.agents/skills/verify-r2-object-integrity/SKILL.md`: validação de objetos e CDN.
- `.agents/skills/tdd-asset-url-recovery/SKILL.md`: TDD para a correção.
- `.agents/skills/verify-portfolio-media/SKILL.md`: verificação E2E do portfólio.
- `PLAN.md`: plano técnico e gates de conclusão.

## Skills existentes a reutilizar

O catálogo atual do projeto (`.agents/knowledge_skills.json`) já declara estas skills. O agente deve abrir os arquivos existentes e reutilizá-los, sem duplicá-los:

- `.agents/skills/systematic-debugging/SKILL.md`
- `.agents/skills/writing-plans/SKILL.md`
- `.agents/skills/subagent-driven-development/SKILL.md`
- `.agents/skills/verification-before-completion/SKILL.md`
- `.agents/skills/verify-portfolio-change/SKILL.md`
- `.agents/skills/supabase-auth-storage-realtime-core/SKILL.md`
- `.agents/skills/database-design/SKILL.md`

Se algum caminho não existir na branch atual, registre a divergência e prossiga com a skill deste pacote que cobre o mesmo procedimento.

## Premissas técnicas que precisam ser confirmadas pelo agente

- `src/lib/storage/r2.ts` trata `site-assets` e `portfolio-media` como prefixos virtuais de chave dentro do bucket físico `portfolio-assets`.
- O domínio público configurado no código é `https://assets.portfoliodanilo.com`.
- `assets.json` e `src/config/site-assets.json` contêm metadados `bucket`, `file_path` e `file_url` que podem recuperar a URL canônica de muitos assets.
- O projeto possui scripts antigos que consultam Supabase diretamente. Eles não devem ser considerados scripts de reparo para o banco Cloudflare/D1 sem auditoria prévia.
- A disponibilidade HTTP de cada objeto R2 ainda precisa ser testada no ambiente do repositório. O inventário de metadados não prova, sozinho, que o objeto existe e está público.

## Segurança

Este pacote não contém credenciais. Não copie `.env`, tokens, chaves R2 ou service-role keys para relatórios, prompts, commits ou logs. A auditoria inicial é read-only. Qualquer escrita remota em D1/R2, alteração de produção, publicação ou deploy exige aprovação humana explícita.
