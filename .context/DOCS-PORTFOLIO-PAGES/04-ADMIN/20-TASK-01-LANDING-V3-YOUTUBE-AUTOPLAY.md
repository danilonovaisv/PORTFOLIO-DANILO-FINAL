# TASK-01: Landing Page Template V3 YouTube Autoplay

## Objetivo

Restaurar autoplay real para embeds de YouTube usados no Template V3 (`master-project-v3-alpa`) sem exigir clique manual quando o bloco estiver configurado para autoplay.

## Sessão/Ação do ADMIN afetada

- Sessão: `Landing Pages`
- Fluxo: edição de blocos dinâmicos do Template V3 com mídia `YouTube`
- Campo operacional: `landing_pages.content`

## Arquivos envolvidos

- `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/admin/(protected)/landing-pages/[id]/page.tsx`
- `src/components/admin/LandingPageForm.tsx`

## Sintoma anterior

- O bloco exibia o embed corretamente, mas o player permanecia parado e exigia clique manual.
- Em lightbox, o autoplay também ficava inconsistente quando o player era remontado no client.

## Causa-raiz confirmada

- O embed estava sendo montado sem `mute=1`, o que aciona a política de bloqueio de autoplay dos browsers modernos.
- O autoplay dependia da combinação completa de parâmetros de embed do YouTube, não apenas de `autoplay=1`.

## Implementação aplicada

- O iframe do player passou a ser gerado com o conjunto compatível com autoplay silencioso:
  - `autoplay=1`
  - `mute=1`
  - `playsinline=1`
  - `loop=1`
  - `playlist=[videoId]`
- A correção foi aplicada no renderer do Template V3 sem alterar o contrato salvo no ADMIN.

## Dependências e impacto no ADMIN

- O ADMIN continua persistindo a decisão de autoplay via `settings.autoplay`.
- Não houve mudança de schema; a correção é de runtime.
- O comportamento final ainda depende da política do browser e do provider, especialmente em cenários de economia de bateria ou background tab.

## Edge cases

- Se o navegador bloquear qualquer reprodução automática, o embed continua carregando e o usuário pode iniciar a reprodução manualmente.
- Em dispositivos mobile, autoplay só é consistente com vídeo mutado e inline.

## Regras para futuras edições

- Para vídeos YouTube que precisem iniciar sozinhos, manter `settings.autoplay = true`.
- Não remover `mute=1` do builder do embed.
- Se o design exigir áudio inicial, isso precisa ser tratado como interação explícita do usuário, não como autoplay.

## Checklist de validação

- [ ] Bloco V3 com YouTube abre já em playback quando `autoplay` estiver ativo.
- [ ] O player não exige clique inicial em desktop compatível.
- [ ] O embed continua funcional em mobile dentro do limite técnico do navegador.
- [ ] Não há regressão em blocos de vídeo nativo.
