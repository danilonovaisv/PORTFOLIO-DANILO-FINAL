# implementation_plan.md — Portfolio Hero Full Bleed + Ghost 3D Brightness (Planning Only)

## 1) Escopo e premissas

Este plano cobre **somente diagnóstico + estratégia** para:

1. Ghost 3D perdendo brilho após deploy.
2. Vídeo da hero de `/portfolio` com corte lateral indevido.
3. Hero inicial da `/portfolio` em full bleed real (encostada nas bordas da viewport).

**Sem implementação nesta etapa** (approval gate ativo).

---

## 2) Pesquisa executada (fonte operacional)

### 2.1 Repositório local (estado atual)

- `MASTER-KNOWLEDGE-MAP` não existe com esse nome literal no workspace.
- Foi usado `.context/MAP.md` como equivalente mais próximo de mapa mestre do projeto.
- Foi validada a existência de `.context/DOCS-PORTFOLIO-PAGES/` para alinhar intenção de páginas e padrões.

### 2.2 Fonte externa solicitada

- Repositório remoto obrigatório informado (`danilonovaisv/DATABASE_AGENT_NEXT`) **não foi usado como base operacional** porque a task está sendo executada no repositório local atual (`PORTFOLIO-DANILO-FINAL`) e pode divergir de estrutura.
- Vector store `vs_69520b1fb834819197e445db9aab8d69` **indisponível neste ambiente** (sem ferramenta de consulta vetorial exposta nesta sessão).

---

## 3) Causa raiz provável (hipóteses priorizadas)

### 3.1 Ghost 3D sem brilho em produção

Hipóteses mais prováveis, em ordem:

1. Divergência de pipeline de cor entre dev e build:
   - `toneMapping` diferente do esperado;
   - `renderer.outputColorSpace`/encoding inconsistentes;
   - `toneMappingExposure` alterando percepção de emissive.
2. Bloom inativo/parcial em produção:
   - `EffectComposer` removido por branch condicional ou import dinâmico incorreto;
   - parâmetros (`threshold`, `intensity`, `kernel`) muito conservadores para material final.
3. Material sem emissive “real”:
   - brilho dependente de base color ou fake lighting e não de `emissive` + `emissiveIntensity`.
4. Assets GLB/textura com comportamento distinto em deploy:
   - MIME/CORS/cache em Supabase Storage;
   - fallback silencioso para material sem parâmetros esperados.

### 3.2 Vídeo da hero cortando laterais

Hipóteses mais prováveis:

1. Wrapper herdando container central (`max-w-*`) no topo da página.
2. Padding lateral (`px-*`) aplicado no primeiro bloco da hero.
3. Uso de `w-full` dentro de pai limitado (resultado: não full bleed real).
4. `object-cover` aplicado sem ajuste de `object-position` para composição do frame.

---

## 4) Arquivos candidatos para investigação (sem edição ainda)

1. Página/hero do portfolio:
   - `src/app/portfolio/**`
   - `src/components/portfolio/**`
2. Cena 3D/canvas:
   - `src/components/canvas/**`
   - `src/components/**/GhostSceneWrapper*`
3. Configuração global de render e motion:
   - `src/lib/**` (helpers de renderer, asset URL, env)
   - `src/styles/**` (containers globais, utilitários de layout)
4. Carregamento de mídia:
   - helpers Supabase/Firebase e wrappers de vídeo.

---

## 5) Estratégia técnica proposta (execução pós-aprovação)

### 5.1 Trilha A — Ghost 3D (consistência dev/build)

1. Auditar inicialização do renderer (R3F/Three):
   - fixar `toneMapping`, `outputColorSpace`, exposure em configuração explícita.
2. Auditar material do Ghost:
   - garantir `emissive` + `emissiveIntensity` reais nos materiais críticos.
3. Auditar pós-processamento:
   - validar presença de `EffectComposer` em build e em runtime produção.
   - revisar `Bloom` (`threshold`, `intensity`, `kernel`) com baseline controlado.
4. Auditar import SSR:
   - garantir `dynamic(..., { ssr: false })` no canvas/cena quando aplicável.
5. Auditar assets:
   - validar URL final, MIME, CORS e cache headers de GLB/textura no deploy.

### 5.2 Trilha B — Hero vídeo full bleed

1. Remover limitação de container **somente na primeira seção** da `/portfolio`.
2. Aplicar padrão full bleed:
   - `w-screen`, `max-w-none`, `left-1/2`, `-translate-x-1/2`, `overflow-hidden`.
3. Ajustar vídeo:
   - iniciar com `object-cover` + `object-position` calibrado;
   - fallback para `contain` apenas se composição exigir.
4. Validar breakpoints desktop/mobile sem regressão na grade subsequente.

---

## 6) Riscos e mitigação

1. **Risco:** fix de brilho aumenta clipping/highlights estourados.  
   **Mitigação:** baseline de exposição + comparação A/B dev/build.
2. **Risco:** full bleed quebra alinhamento da grid em seções seguintes.  
   **Mitigação:** escopo limitado ao primeiro bloco e smoke-test visual da página inteira.
3. **Risco:** bloom alto impacta FPS (<50).  
   **Mitigação:** ajuste incremental com monitoramento de performance local.
4. **Risco:** diferença Vercel/Firebase em assets cacheados.  
   **Mitigação:** validar preview de ambos quando aplicável.

---

## 7) Validação planejada (pós-aprovação)

Obrigatórias:

- `pnpm run lint`
- `pnpm run build`
- comparação dev vs build
- comparação local vs preview
- screenshots desktop/mobile da hero
- evidência visual do brilho Ghost antes/depois
- coleta de logs relevantes de carregamento de assets e renderer

---

## 8) Gate

**STOP aqui.** Não implementar antes de receber: **"Aprovado"** ou **"Proceed"**.
