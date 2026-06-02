# task.md — Portfolio Hero + Ghost 3D (Planning Only)

## Regras desta fase

- Tarefas com duração alvo <= 1h cada.
- Sem implementação antes de aprovação.
- Responsável definido por task.
- Dependências explícitas.
- Critério de aceite por task.

---

## Backlog de execução (pós-aprovação)

### T1 — Inventário de pontos de entrada da `/portfolio` (<= 30min)

- **Responsável:** orchestrator
- **Dependências:** nenhuma
- **Descrição:** mapear arquivos reais da hero, wrapper de vídeo e containers de layout.
- **Aceite:** lista objetiva de arquivos com ownership técnico (hero/layout/video).

### T2 — Auditoria do pipeline de cor do Ghost (<= 45min)

- **Responsável:** spectral-artist
- **Dependências:** T1
- **Descrição:** revisar `toneMapping`, `outputColorSpace`, exposure/gamma no canvas/cena.
- **Aceite:** diagnóstico com divergências dev/build e baseline recomendado.

### T3 — Auditoria de material emissive do Ghost (<= 45min)

- **Responsável:** spectral-artist
- **Dependências:** T1
- **Descrição:** validar uso de `emissive`/`emissiveIntensity` real nos materiais críticos.
- **Aceite:** checklist com materiais afetados e valores-alvo.

### T4 — Auditoria de Bloom / EffectComposer em produção (<= 45min)

- **Responsável:** spectral-artist
- **Dependências:** T2
- **Descrição:** confirmar montagem do composer em build e parâmetros ativos de Bloom.
- **Aceite:** confirmação de caminho de execução em produção + parâmetros sugeridos.

### T5 — Auditoria SSR do canvas (<= 20min)

- **Responsável:** frontend-specialist
- **Dependências:** T1
- **Descrição:** verificar import dinâmico com `ssr: false` quando necessário.
- **Aceite:** decisão documentada (manter/ajustar) com justificativa técnica.

### T6 — Auditoria de assets GLB/textura (<= 40min)

- **Responsável:** qa.verifier
- **Dependências:** T1
- **Descrição:** validar URL/MIME/CORS/cache para assets de cena no ambiente de preview.
- **Aceite:** log com status de resposta e eventuais bloqueios de rede.

### T7 — Plano de refator da hero para full bleed (<= 45min)

- **Responsável:** frontend-specialist
- **Dependências:** T1
- **Descrição:** desenhar alteração do topo da `/portfolio` removendo restrição de container.
- **Aceite:** proposta com classes exatas (`w-screen`, `max-w-none`, `left-1/2`, `-translate-x-1/2`, `overflow-hidden`).

### T8 — Plano de ajuste do vídeo da hero (<= 30min)

- **Responsável:** frontend-specialist
- **Dependências:** T7
- **Descrição:** definir `object-fit`/`object-position` por breakpoint para preservar composição.
- **Aceite:** matriz de comportamento desktop/mobile documentada.

### T9 — Plano de validação regressiva (<= 30min)

- **Responsável:** qa.verifier
- **Dependências:** T2, T4, T8
- **Descrição:** preparar checklist de regressão visual e performance (>50 FPS alvo).
- **Aceite:** checklist pronto com critérios binários por item.

### T10 — Execução de checks obrigatórios (<= 40min)

- **Responsável:** qa.verifier
- **Dependências:** implementação concluída
- **Descrição:** rodar `pnpm run lint` e `pnpm run build` + registrar evidências.
- **Aceite:** comandos finalizados com logs anexados.

### T11 — Evidências visuais (<= 40min)

- **Responsável:** qa.verifier
- **Dependências:** T10
- **Descrição:** capturar screenshots hero desktop/mobile e comparação brilho before/after.
- **Aceite:** pacote de evidências com identificação de ambiente (dev/build/preview).

### T12 — Encerramento e documentação final (<= 30min)

- **Responsável:** orchestrator
- **Dependências:** T11
- **Descrição:** consolidar `walkthrough.md` e avaliar atualização de `.context/DOCS-PORTFOLIO-PAGES`.
- **Aceite:** walkthrough completo com causa raiz, decisões, arquivos alterados, evidências e riscos.

---

## Gate

Aguardando comando explícito: **"Aprovado"** ou **"Proceed"**.

Sem esse comando:

- não alterar código
- não rodar build
- não fazer deploy
