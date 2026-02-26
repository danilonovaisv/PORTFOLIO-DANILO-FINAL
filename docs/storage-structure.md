# Storage Structure (Supabase) - V3

Esta documentação detalha a arquitetura padronizada (v3) para arquivos de mídia (`portfolio-media`) armazenados no Supabase, definindo regras rígidas de nomenclatura para evitar cache misses, estouro de egress, arquivos duplicados e downloads indesejados.

## A Estrutura Oficial V3

Todos os novos uploads devem obrigatoriamente seguir a seguinte estrutura de caminho:

```
v3/<marca>/<projeto>/<subpastas-opcionais>/<filename>.<hash>.<ext>
```

- **`v3`**: Prefixo obrigatório da nova estrutura.
- **`<marca>`**: Nome da marca (brand) normalizado em formato de slug (`minúsculo`, sem `_` ou `espaços`, apenas hífens).
- **`<projeto>`**: Nome do projeto (slug) normalizado.
- **`<subpastas-opcionais>`**: Opcional, usado para distinguir context (ex: `cover-16x9`, `gallery`), também formatado como slug.
- **`<filename>`**: Nome base do arquivo com caracteres especiais e extensões residuais removidas (slug default `file` se vazio).
- **`<hash>`**: String SHA-256 cortada (16 caracteres) gerada **no servidor** a partir do buffer (conteúdo real do arquivo).
- **`.<ext>`**: Extensão em caixa baixa e sem `.` duplicado.

### Exemplo
Upload de `imagem final v2_ok.png` para projeto "Boticário / Campanha Verão" no context galerias:
`v3/boticario/campanha-verao/gallery/imagem-final-v2-ok.a1b2c3d4e5f6g7h8.png`

## Governança e Performance (Egress & Cache)

**1. Hashes e Imutabilidade**
Pela regra V3 as URLs são 100% dependentes do conteúdo do arquivo (hash). Isso significa que, se modificarmos o arquivo, o hash mudará e a nova URL será utilizada. Arquivos velhos não são sobrescritos, eles ficam órfãos e um job futuro de clean-up os eliminará. Desta forma, podemos forçar CACHE MÁXIMO e IMUTÁVEL.

Todo upload enviado à API (`/api/admin/storage/upload`) para a raiz `portfolio-media` será salvo usando V3 path programaticamente com o cabeçalho idêntico de:

```http
Cache-Control: public, max-age=31536000, immutable
```

**2. Quebra de Cache**
Nunca faça uploads com UPSERT na versão v3. Como a URL base agora altera se a imagem alterar, o frontend NUNCA usará URLs do tipo genérico com timestamps de cachebust (ex: `?t=12312312`) para prefixos `v3/`. Parâmetros mutáveis em query strings esgotam cotas de CDN e Egress rapidamente.

**3. Vídeos MP4 e WEBP em Listagens e Grids**
É altamente vetado consumir arquivos `MP4` pesados de forma direta nos cards em Grid.

Regras do Frontend:
- Nunca use Tag `<video src="...">` ligada e visível com `autoPlay` global dentro de Grids listados.
- Na arquitetura implementada, convertemos e injetamos o source `<Image src={.webp} />` para thumbnails que renderizará em vez do vídeo em mobile ou quando em standby.
- Com interação (`onHover`), a tag `<video>` é renderizada de forma preemptiva / lazy e seu src resolvido. Ela utilizará `preload="none"`.
- As thumbs deverão utilizar conversão em WEBP (idealmente com variantes 320w, 640w no Next Image). Os thumbnails não devem usar PNG grande. 

## Ferramentas de Auditoria

Para manter essa sanidade, existem scripts de auditoria:
- **`npm run audit:storage`**: Lê todo o bucket `portfolio-media` para pontuar items que fugiram da regra Cache-Control ou estão salvos como /v1/ e /v2/.
- **`npm run audit:v2`**: Verifica se há código hardcoded referenciando caminhos de pastas velhas ou v2.

---
**NOTA AOS ADMINISTRADORES:**
Ao preencher uploads do painel admin, sempre escreva títulos limpos. Não edite caminhos de uploads ou sobrescreva arquivos pelo Dashboard Web do Supabase tentando burlar nosso SDK; senão isso ativará os Linting errors em CI/CD. Em caso de edição de imagem, faça novo upload pelo Admin do Portfolio.
