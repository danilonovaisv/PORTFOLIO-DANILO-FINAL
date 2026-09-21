# Implementation Plan: CMS e videos de Trabalhos e Landing Pages

Data: 2026-09-21
Status: APROVADO pelo usuario; implementacao e verificacao em andamento. A secao 11 registra resultados posteriores a auditoria inicial.

## 1. Escopo e limites da auditoria

Escopos: `@04-TRABALHOS` e `@07-LANDING-PAGES`, incluindo formularios administrativos, contratos de persistencia e consumidores publicos dos dados.

Este documento registra uma auditoria estrutural baseada no grafo, uma proposta de implementacao e os pontos ainda nao verificaveis. Nao constitui confirmacao de bugs de CSS ou de validacao em runtime.

- Consultado `graphify-out/graph.json`, com 16.135 nos; mtime observado: 2026-09-21T08:54:36.840Z. A data do arquivo nao comprova sincronismo de cada no com o codigo atual.
- `graphify-out/wiki/index.md`, ponto de entrada solicitado pelas regras, esta ausente. A navegacao prosseguiu pelo grafo existente, sem reconstruir ou alterar o indice.
- As referencias abaixo sao `source_file` e `source_location` do grafo. As linhas precisam ser reconfirmadas antes da implementacao.
- O grafo contem simbolos, chamadas e imports, mas nao os corpos completos dos schemas, payloads ou JSX. Nao permite comprovar classes CSS, atributos de reproducao, campos obrigatorios, casts inseguros ou todas as tags `<video>`.
- A regra local permite ler arquivos brutos apenas mediante autorizacao explicita. Essa autorizacao foi solicitada para aprofundar a auditoria e ainda nao foi recebida ao preparar este documento.
- Nao houve leitura de registros privados, alteracao de Supabase, migracao, deploy ou execucao de testes da aplicacao.
- Alteracoes preexistentes observadas e preservadas: `public/build-info.json` e os submodulos `raw/micrograd`, `raw/minGPT`, `raw/nanoGPT`.

## 2. Mapa estrutural comprovado

### Trabalhos

| Camada | Referencia do grafo | Evidencia e papel no plano |
| --- | --- | --- |
| Formulario | `src/components/admin/ProjectForm.tsx:1` | Ponto de entrada administrativo; reutilizar o formulario existente. |
| Midia do formulario | `src/components/admin/form-sections/MediaUploadSection.tsx:1` | Superficie de configuracao de midia a alinhar ao renderer. |
| Schemas | `src/lib/admin/schemas/project.ts:51`, `:117`, `:121`, `:126` | Existem `projectBaseFieldsSchema`, `projectBaseSchema`, `projectFormSchema` e `projectMutationSchema`. Nao propor uma segunda cadeia paralela de validacao. |
| Mutacao | `src/app/admin/(protected)/trabalhos/actions.ts:24` | `upsertProjectAction`; revisar o contrato entre formulario e servidor. |
| Validacao compartilhada | `src/lib/admin/validation.ts:49`, `:61` | Existem `formatZodError` e `validatePayload`; preservar e ampliar quando necessario. |
| Storage | `src/lib/admin/project-storage.ts:25` | Existe normalizacao de caminhos; avaliar consistencia com persistencia e remocao de midias. |
| Adaptacao publica | `src/lib/portfolio/project-mappers.ts:325` | Existe `normalizeStoredDestination`; validar round-trip e destinos sem substituir o mapper indiscriminadamente. |
| Enquadramento | `src/lib/media/media-format.ts:1`, `:3`, `:13`, `:18`, `:23` | Existem `MediaFormat`, `MediaFit`, mapas de classes e `getDefaultMediaFit`. Este e um ponto preferencial de reuso, sujeito a leitura do contrato. |

### Landing Pages

| Camada | Referencia do grafo | Evidencia e papel no plano |
| --- | --- | --- |
| Formulario | `src/components/admin/LandingPageForm.tsx:57` | Integra edicao e preparacao de conteudo. |
| Selecao de editor | `src/components/admin/landing-pages/LandingPageEditorSwitch.tsx:1` | Mantem variantes de template; preservar compatibilidade. |
| Editores | `src/components/admin/MasterProjectTemplateEditor.tsx:50`, `MasterProjectTemplateV2Editor.tsx:77`, `MasterProjectTemplateV3Editor.tsx:98` | Tres editores e respectivos drafts tipados existem. Multiplicidade e uma superficie de divergencia, nao prova de defeito. |
| Tipos | `src/types/project-template.ts:106`, `:131`, `:157`, `:187`, `:201` | Tipos V1/V2/V3, hero e conteudo interpretado ja existem. |
| Legado | `src/types/landing-page.ts:25`, `:50` | `LandingPageBlockContent` e `LandingPageBlock` precisam permanecer compativeis. |
| Transformacao | `src/lib/admin/transformers/landing-page.ts:14` | Adaptadores de draft e normalizacao devem compartilhar o contrato de leitura/escrita. |
| Preparacao/salvamento | `src/lib/admin/services/landing-page-save.ts:34`, `:73`, `:117`, `:191`, `:328`, `:436` | Existem `prepareLandingPageData`, `saveLegacyContent`, `saveMasterTemplateV1/V2/V3` e `normalizePersistedAsset`. |
| Validacao da mutacao | `src/app/admin/(protected)/landing-pages/actions.ts:9`, `:25` | Existem `landingPageMutationSchema` e `SaveLandingPageInput`; profundidade da validacao JSON ainda precisa ser examinada. |
| Leitura | `src/lib/projects/template-schema.ts:45`, `:126`, `:209`, `:327` | Normalizadores V1/V2/V3 e `parseLandingPageContent`; fonte preferencial para compatibilidade de leitura. |
| Normalizacao de midia | `src/lib/projects/template-schema-utils.ts:214`, `:247`, `:266`, `:321`, `:361` | Normalizacao de assets, galerias e blocos ja centralizada em parte. |
| Rota publica | `src/app/projects/[slug]/page.tsx:25` | Existe contrato `LandingPageRecord`; verificar a fronteira Supabase/renderizacao. |

## 3. Riscos e melhorias propostas para CMS

As prioridades abaixo sao prioridades de verificacao/implementacao, nao severidades de bugs ja reproduzidos.

| Prioridade | Risco a verificar | Acao proposta | Criterio de aceite |
| --- | --- | --- | --- |
| P1 | Validacao superficial do JSON apesar de schemas externos existentes | Reutilizar schemas atuais e validar o conteudo por variante no servidor, antes de persistir; retornar erros associados aos campos. | Payload malformado nao chega ao banco; erro e acionavel no formulario. |
| P1 | Divergencia entre draft, serializacao e normalizacao publica | Definir contrato canonico por versao usando discriminantes existentes; inferir tipos dos schemas quando compativel. Evitar casts como substitutos de validacao. | Editar, salvar, reabrir e renderizar preserva campos e versao. |
| P1 | Valores de midia ou layout invalidos vindos do CMS | Validar tipo de midia, URL/caminho pelos helpers existentes, dimensoes positivas finitas e enums de layout. Nao aceitar classes Tailwind arbitrarias do payload. | Dados invalidos produzem erro ou fallback controlado, nunca layout quebrado. |
| P1 | Falha parcial entre upload, persistencia e limpeza de storage | Auditar ordem das operacoes e tratamento de erros; manter midia anterior ate confirmar persistencia, com compensacao se aplicavel. | Falha de save nao remove assets usados pela publicacao vigente. |
| P2 | Regras de asset repetidas nos editores e renderizadores | Reutilizar `MediaAssetField`, contratos de asset e mapas de fit/formato existentes; extrair apenas duplicacao comprovada. | Preview administrativo e pagina publica recebem o mesmo asset normalizado e politica de enquadramento. |
| P2 | Normalizacao silenciosa ocultar versao ou dados desconhecidos | Distinguir dados legados validos, versao nao suportada e payload corrompido; preservar compatibilidade sem regravar silenciosamente. | Conteudo legado tem fixture; versao desconhecida nao causa crash nem perda de dados. |
| P2 | Conteudo extenso, arrays vazios e metadados ausentes | Definir limites coerentes com o produto, fallback para midia ausente e dimensoes estaveis; verificar min-width e quebra de texto. | Sem overflow horizontal, sobreposicao ou deslocamento evitavel em mobile. |

Nao esta prevista migracao de banco nesta proposta. Primeiro confirmar tipos gerados, shape real dos JSONs, defaults e constraints existentes. Qualquer migracao necessaria deve ser adicionada ao plano com compatibilidade e rollback antes de execucao.

## 4. Inventario de renderizacao de midia

Inventario de simbolos e consumidores identificados pelo grafo, ainda nao exaustivo para tags HTML. Presenca de componente/import nao comprova que a ramificacao ativa renderize video.

| Arquivo candidato | Evidencia do grafo | Tratamento planejado |
| --- | --- | --- |
| `src/components/ui/HTMLVideoBlock.tsx` | Componente em L16; importado por blocos, preview e MediaCard. | Inspecionar fit e wrappers; corrigir apenas apresentacao sem alterar ciclo de reproducao. |
| `src/components/ui/media/MediaCard.tsx` | Chama `getDefaultMediaFit` em L51 e importa `HTMLVideoBlock` em L12. | Garantir contain para video principal no escopo, sem alterar indiscriminadamente defaults de imagens. |
| `src/components/portfolio/ProjectCard.tsx` | Importa `MediaCard` em L7. | Propagar politica explicita de video integral se o contrato compartilhado exigir. |
| `src/components/portfolio/content/AdaptiveMediaLayout.tsx` | Chama deteccao de video em L51 e YouTube em L106-L107. | Verificar midia principal, proporcoes, wrappers e caminhos HTML/externo separadamente. |
| `src/components/projects/BlockRenderer.tsx` | Importa `HTMLVideoBlock` em L12. | Revisar blocos legados e selecao de classes por tipo de midia. |
| `src/components/projects/templates/MasterProjectTemplate.tsx` | Componente em L109. | Confirmar todas as ramificacoes de midia da versao V1. |
| `src/components/projects/templates/master-v2/BlockMedia.tsx` | Componente em L22; detecta asset de video em L31. | Corrigir video e verificar wrappers consumidores. |
| `src/components/projects/templates/master-v2/SectionFeatures3.tsx`, `SectionFullHighlight.tsx`, `SectionGrid.tsx`, `SectionSplit.tsx` | Importam `BlockMedia` em L9, L7, L6 e L6. | Remover restricoes que causem clipping apenas se comprovadas; preservar grid. |
| `src/components/projects/templates/alpa/AlpaHeroLayout.tsx` | Importa `HTMLVideoBlock` em L9. | Verificar dimensoes, transformacoes e cortes no hero. |
| `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx` | Importa `HTMLVideoBlock`, `AlpaBlockVideoFull` e `AlpaBlockMediaText`. | Verificar todas as variantes que encaminham midia. |
| `src/components/projects/templates/alpa/blocks/AlpaBlockVideoFull.tsx` | Componente em L19; resolve asset e YouTube em L25/L29. | Ajustar video HTML para exibicao integral; iframe exige politica propria. |
| `src/components/projects/templates/alpa/blocks/AlpaBlockMediaText.tsx` | Componente em L31; detecta video em L45. | Corrigir video dentro de layouts com texto sem comprimir ou cortar o asset. |
| `src/components/admin/templates/MediaAssetField.tsx` | Importa `HTMLVideoBlock` em L5. | Preview deve refletir o enquadramento publico. |
| `src/components/admin/blocks/MediaInput.tsx`, `src/components/admin/form-sections/MediaUploadSection.tsx` | Nos presentes no grafo. | Confirmar previews HTML e ajustar somente se necessario. |
| `src/components/ui/shared/ResponsiveVideo.tsx` | Componente em L28; usado em PortfolioHeroNew, Home e Sobre. | Nao alterar default global sem verificar consumidores; preferir opt-in nos usos pertinentes. |
| `src/components/projects/templates/AssetLightbox.tsx`, `src/components/portfolio/content/modal-media.ts` | Nos presentes no grafo. | Confirmar se ha renderizacao de video e incluir na cobertura quando aplicavel. |

`DynamicAssetVideo` nao apareceu entre os simbolos correspondentes consultados. Isso nao comprova ausencia no repositorio: procurar declaracoes, aliases, imports, `<video>`, `<source>`, embeds e HTML injetado na inspeccao autorizada.

Os imports de `ResponsiveVideo` por `VideoManifesto`, `AboutHero`, `AboutMethod` e `AboutClosing`, e de `MediaCard` por `FeaturedProjectCardFrame`, comprovam impacto compartilhado potencial. Nao efetuar substituicao global de `object-cover`.

## 5. Estrategia de CSS e preservacao de comportamento

1. Levantar por video: src, poster, flags de reproducao, controles, preload, handlers, refs, hooks de visibilidade, fit computado, dimensoes e todos os ancestrais que possam cortar a imagem.
2. Para video principal, substituir `object-cover` por `object-contain object-center`; eliminar conflitos de props, estilos inline, variantes responsivas e classes compostas que reintroduzam cover.
3. Para fluxo com altura intrinseca, preferir wrapper `w-full flex items-center justify-center bg-transparent` e video `block w-full h-auto max-w-full object-contain object-center`.
4. Para slot com dimensoes reservadas, usar wrapper com proporcao conhecida e altura resolvida; video `block w-full h-full object-contain object-center`. `h-full` requer altura definida no ancestral.
5. `aspect-video` equivale a 16:9, nao a proporcao original de qualquer video. Utilizar 16:9 apenas para slot editorial deliberado ou asset correspondente; videos 9:16, 1:1 e 4:3 devem conservar sua proporcao visual. Slots fixos podem ter faixas livres transparentes, sem esticar o conteudo.
6. Se o wrapper precisar acompanhar a proporcao original, priorizar dimensoes validadas do asset ou fluxo intrinseco. Nao adicionar captura de metadata em runtime sem necessidade; se indispensavel, compor o handler existente e evitar layout shift.
7. Verificar overflow, scale, zoom, max-height, min-width, clip-path, border-radius e posicionamento absoluto. `object-contain` isolado nao impede corte provocado por ancestrais ou transformacoes.
8. Manter `.std-grid`, tokens locais e easing existentes. Nao introduzir cores hex/rgb hardcoded. Fundo do slot transparente ou token semantico existente quando exigido pelo design.
9. Nao alterar `autoplay`/`autoPlay`, `muted`, `loop` e `playsinline`/`playsInline`, nem a logica que controla esses comportamentos. Preservar igualmente sources responsivas e tratamento de erro.
10. Em iframe/YouTube, object-fit nao controla o video dentro do documento externo. Ajustar apenas o wrapper conforme o contrato do player; registrar limites de acesso cross-origin. Nao prometer corrigir recortes incorporados no proprio arquivo de midia.

## 6. Arquivos previstos para alteracao apos aprovacao

A lista e candidata: editar apenas arquivos em que a inspecao confirmar necessidade. A aprovacao nao implica reescrever todos os componentes listados.

- **Correcao visual:** arquivos da tabela de midia, prioritariamente `HTMLVideoBlock.tsx`, `MediaCard.tsx`, `BlockMedia.tsx`, `AlpaBlockVideoFull.tsx`, `AlpaBlockMediaText.tsx`, `AdaptiveMediaLayout.tsx` e seus wrappers pertinentes.
- **Contrato de fit:** `src/lib/media/media-format.ts` e `src/lib/portfolio/card-media.ts`, apenas se a politica explicita nao puder ser aplicada nos consumidores existentes.
- **CMS Trabalhos:** `src/lib/admin/schemas/project.ts`, `src/components/admin/ProjectForm.tsx`, `src/components/admin/form-sections/MediaUploadSection.tsx`, `src/app/admin/(protected)/trabalhos/actions.ts`; `project-storage.ts` e `project-mappers.ts` somente para falhas confirmadas no contrato.
- **CMS Landing Pages:** `src/types/project-template.ts`, `src/types/landing-page.ts`, `src/lib/projects/template-schema.ts`, `template-schema-utils.ts`, `template-schema-defaults.ts`, `src/lib/admin/transformers/landing-page.ts`, `src/lib/admin/services/landing-page-save.ts`, `src/app/admin/(protected)/landing-pages/actions.ts`, `LandingPageForm.tsx` e os editores afetados.
- **Documentacao existente:** atualizar `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/04-TRABALHOS.md` e `07-LANDING-PAGES.md` apos alteracoes reais; registrar bugs reproduzidos no relatorio de auditoria existente apropriado.
- **Testes existentes:** ampliar os arquivos pertinentes da secao seguinte; criar teste novo somente quando nao houver cobertura adequada existente.

## 7. Sequencia de execucao proposta

1. Receber aprovacao do plano e autorizacao explicita para ler os arquivos brutos pertinentes, conforme regra de navegacao do projeto.
2. Ler os arquivos antes de edita-los; reconfirmar o grafo e completar inventario com linha, variante, flag e classe atual. Consultar guia local de Next.js em `node_modules/next/dist/docs/` antes de escrever codigo relacionado.
3. Reproduzir o corte e capturar baseline no admin e nas paginas publicas. Determinar quais videos principais pertencem aos dois escopos.
4. Corrigir exclusivamente enquadramento e wrappers, preservando comportamento de playback e defaults externos ao escopo.
5. Implementar melhorias de contrato CMS comprovadamente necessarias, preservando registros legados e evitando migracao implicita.
6. Ampliar testes de contratos e verificacoes visuais, validar mobile/desktop e executar os checks.
7. Atualizar a documentacao existente e apresentar diff, evidencias, resultados e limitacoes. Sem deploy ou commit automatico nesta missao.

## 8. Verificacao e criterios de aceite

### Contratos e regressao

Reutilizar os testes identificados no grafo:

- `test/unit/template-schema.test.ts`: legado, V1/V2/V3, versao desconhecida, null, arrays vazios e dados invalidos.
- `test/lib/admin/landing-page-transformer.test.ts`: round-trip draft -> payload -> parse -> draft, sem perda de campos.
- `test/unit/project-storage.test.ts` e `test/unit/project-mapper.test.ts`: consistencia de caminhos/destinos e falha parcial quando pertinente.
- `test/lib/portfolio/card-media.test.ts`, `test/components/ui/MediaCard.test.tsx`, `test/components/portfolio/ProjectCard.test.tsx`: politica de fit por tipo e escopo.
- `test/unit/html-video-block.test.tsx`: preservacao dos atributos e comportamento de playback existentes.
- `test/components/projects/BlockRenderer.test.tsx` e `test/unit/modal-media.test.ts`: variantes de bloco, fallbacks e modal quando aplicavel.

### Matriz visual

- Viewports: 360, 390, 768, 1280 e 1920 px; incluir orientacao paisagem no mobile.
- Assets: 16:9, 9:16, 1:1, 4:3 e ultrawide, com marcadores visiveis nas quatro bordas.
- Superficies: previews administrativos, card principal, detalhe/modal, legado e templates V1/V2/V3/hero usados pelos registros de teste.
- Estados: antes/depois de loadedmetadata, poster, pausado/reproduzindo, erro de rede e asset ausente.
- Navegadores: Chromium e WebKit automatizados quando disponiveis; Safari/iOS real como verificacao complementar, sem afirmar equivalencia total da emulacao.
- Conferir CSS computado, geometria e screenshots de frames decodificados com `videoWidth`/`videoHeight` positivos. Apenas conferir a presenca de uma classe nao prova ausencia de cropping.
- Aceite: quatro bordas visiveis, proporcao visual preservada, sem distorcao, overflow ou sobreposicao; espacos livres sao permitidos; playback igual ao baseline; Home/Sobre sem regressao por componentes compartilhados.

### Comandos apos implementacao

```bash
pnpm run typecheck
pnpm run lint
pnpm test
pnpm test:e2e
pnpm run build
```

Executar primeiro os testes focados conforme scripts reais do projeto e depois os checks adequados ao impacto. Nao usar sucesso de build como substituto de typecheck, pois o projeto informa `ignoreBuildErrors: true`. Para QA visual, iniciar dev server em porta livre e informar a URL.

## 9. Referencias tecnicas

Context7 foi consultado para Tailwind CSS, biblioteca `/tailwindlabs/tailwindcss.com`.

- [Aspect ratio](https://tailwindcss.com/docs/aspect-ratio): `aspect-video` fixa proporcao 16:9; usar proporcao apropriada ao slot.
- [Preflight](https://tailwindcss.com/docs/preflight): imagens/videos recebem restricoes de largura e altura automatica; overrides locais precisam ser considerados.
- [Object position](https://tailwindcss.com/docs/object-position): alinhamento do conteudo substituido dentro da caixa.

## 10. Ponto de parada

Somente este plano foi criado. A auditoria de corpos de codigo e o inventario exaustivo continuam pendentes da autorizacao de leitura; as correcoes ficam pendentes da aprovacao do plano. Nenhuma hipotese acima deve ser apresentada como bug confirmado sem reproducao ou evidencia de codigo.

## 11. Execucao apos aprovacao

O usuario aprovou o plano e a leitura; os limites anteriores descrevem a etapa inicial. A inspecao de codigo confirmou object-cover em videos principais, previews e a rota adicional `src/app/portfolio/[slug]/page.tsx`. Confirmou tambem `content: z.custom<Json>(value => value !== undefined)` na mutacao de Landing Pages.

### Entregas

- Contain nos videos nativos dos templates, previews e rota de detalhe. Imagens mantidas; flags de reproducao e handlers existentes preservados.
- `MediaCard.preserveVideoFrame` limita a mudanca aos consumidores que optam pelo enquadramento integral. `ProjectCard` ativa essa politica inclusive para payload com fit cover.
- `HTMLVideoBlock.preserveVideoFrame` aplica CSS a videos em fragmentos e srcDoc sem reescrever autoplay, muted, loop ou playsinline. Reconhecimento de documento HTML agora ignora caixa de tags. A contencao nao consegue desfazer recorte no proprio arquivo ou controlar documento remoto dentro de iframe.
- Hero Master sem parallax no video, pois o deslocamento causava clipping mesmo com contain.
- Schema de escrita dedicado em `src/lib/admin/schemas/landing-page.ts`, validacao antes de persistir e reutilizacao de drafts tipados no servico de save.
- Atualizados testes de contrato/renderer e as duas referencias `.context` dos escopos; bugs e riscos registrados em `docs/AUDIT_PENTEST.md`.

### Recomendacoes de CMS que permanecem backlog

- Substituir `destination: z.any()` de Trabalhos por contrato compativel com destinos legados e atuais, com fixtures de migracao.
- Redesenhar rename de Storage com staging/compensacao: o banco recebe URLs destino antes do move. Nao executar limpeza destrutiva enquanto referencias nao estiverem consistentes.
- Tratar uploads orfaos apos falha de save e decidir suporte administrativo explicito a V3 Hero antes de alterar seu fluxo.
- Remover any remanescente de assets do editor V3 e casts do formulario sem mudar o contrato publico inadvertidamente.

Esses pontos foram auditados e propostos, nao corrigidos nesta entrega. Nenhuma migracao, commit ou deploy foi executado.

### Verificacao parcial

- PASS: 70 testes focados em 11 suites, incluindo contratos CMS, transformacao, media, cards, blocos, storage e mapper.
- PASS: `pnpm run typecheck`.
- PASS com aviso: `pnpm run lint`, zero erros e um aviso de console no harness visual em preparacao.
- Build e validacao visual: em andamento; resultados finais serao acrescentados abaixo.
