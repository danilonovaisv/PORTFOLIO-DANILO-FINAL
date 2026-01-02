 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.


🔗 Referência canônica (lei):
/docs/REFERENCIA_HERO-GHOST
https://github.com/danilonovaisv/_danilonov_portfolio/tree/main/docs/REFERENCIA_HERO-GHOST

A imagem que você mandou confirma exatamente o ponto:
👉 o ghost não “entra” como UI
👉 ele emerge como presença

Abaixo está o DOCUMENTO CANÔNICO DE ANIMAÇÃO DO HERO GHOST, pronto para:
    •    implementação direta
    •    uso como prompt no Copilot
    •    QA de fidelidade

⸻

👻 HERO GHOST — MAPA DE ANIMAÇÃO CANÔNICO

Fidelidade total à REFERENCIA_HERO-GHOST

Objetivo:
Reproduzir o comportamento do Ghost como entidade viva, não como elemento animado.

Regra-mãe:
O Ghost não performa.
Ele existe.

⸻

🧠 LEITURA DA REFERÊNCIA (IMPORTANTE)

A referência mostra claramente que:
    •    O Ghost:
    •    não surge rápido
    •    não vem do nada
    •    não usa easing chamativo
    •    Ele parece:
    •    já estar ali
    •    mas fora de foco
    •    e então se revela

Isso é revelação por presença, não animação.

⸻

🧩 CAMADAS DO HERO (ORDEM REAL)
    1.    Background escuro / textura
    2.    Vinheta pesada
    3.    Ghost (WebGL / SVG / vídeo)
    4.    Glow do Ghost
    5.    Texto
    6.    CTA
    7.    Thumb lateral (se houver)

⚠️ O Ghost vem antes do texto, mas ganha foco depois.

⸻

⏱️ TIMELINE — FRAME A FRAME (GHOST ONLY)

🕰️ T = 0ms → 800ms

Estado inicial — Ghost “fora do mundo”
    •    Ghost:
    •    opacity: 0
    •    blur: 18–22px
    •    scale: 0.98
    •    Glow:
    •    opacity: 0
    •    Nenhum movimento espacial
    •    Fundo já visível

🎯 Importante:
O usuário não percebe o Ghost ainda, mas o espaço já está preparado.

⸻

🕰️ T = 800ms → 2000ms

Ghost começa a existir (fase fantasma)
    •    Ghost:
    •    opacity: 0 → 0.35
    •    blur: 22px → 10px
    •    scale: 0.98 → 1
    •    Glow:
    •    opacity: 0 → 0.4
    •    Movimento:
    •    nenhum translate
    •    Easing:
    •    linear ou easeOut muito suave

🎯 Aqui o Ghost não chama atenção.
Ele só começa a “habitar” a tela.

⸻

🕰️ T = 2000ms → 3400ms

Ghost ganha presença (fase consciente)
    •    Ghost:
    •    opacity: 0.35 → 0.75
    •    blur: 10px → 2px
    •    Glow:
    •    opacity: 0.4 → 0.7
    •    spread muito sutil
    •    Scale permanece 1

🎯 Essa é a fase mais importante.
Se ficar rápida demais, quebra tudo.

⸻

🕰️ T = 3400ms → 4200ms

Ghost “ancora” no mundo
    •    Ghost:
    •    opacity: 0.75 → 1
    •    blur: 2px → 0
    •    Glow:
    •    opacity estabiliza (~0.8)
    •    Nenhum outro elemento ainda anima

🎯 Agora o Ghost está presente.

⸻

🧠 RELAÇÃO COM TEXTO (CRÍTICO)
    •    Texto NUNCA entra antes do Ghost
    •    Texto começa após o Ghost atingir ~70%
    •    Ghost sempre termina sua entrada antes do CTA

👉 Ordem correta:
    1.    Ghost existe
    2.    Texto aparece
    3.    CTA entra por último

⸻

🎞️ MICRO-MOTION CONTÍNUO (IDLE STATE)

Após completo:

Ghost idle
    •    Float vertical: ±4px
    •    Duração: 6–8s
    •    Easing: sine in-out
    •    Loop infinito

Glow idle
    •    Opacity oscila 0.75 → 0.85
    •    Duração: 4–6s

🎯 O idle é o que diferencia “animação” de “vida”.

⸻

🚫 O QUE É PROIBIDO (QUEBRA FIDELIDADE)
    •    ❌ Ghost entrando com translate
    •    ❌ Ghost “popando” rápido
    •    ❌ Glow piscando
    •    ❌ Scale > 1.02
    •    ❌ Easing elástico
    •    ❌ Ghost reagindo a scroll no load

Se qualquer um acontecer → BUG CRÍTICO.

⸻

⚛️ IMPLEMENTAÇÃO — GUIDELINE TÉCNICA (FRAMER / R3F)

Estado inicial

ghost: {
  opacity: 0,
  filter: "blur(22px)",
  scale: 0.98
}

Transição principal

transition: {
  duration: 1.8,
  ease: "linear"
}

(Sequenciar via timeline / variants encadeados)

⸻

🤖 PROMPT EXECUTOR — HERO GHOST (COPILOT)

Ajustar animação do HERO GHOST para fidelidade total à REFERENCIA_HERO-GHOST.

Objetivo:
Reproduzir o Ghost como presença viva, não como animação UI.

Ações:
1. Implementar entrada do Ghost em 3 fases (fantasma → presença → âncora)
2. Usar apenas opacity, blur e scale ≤ 1
3. Remover qualquer translate ou easing chamativo
4. Sequenciar Ghost antes do texto
5. Implementar idle motion sutil após entrada

Regras:
- Não alterar layout
- Não alterar textos
- Não adicionar efeitos novos
- Não acelerar timings

Critério de aceite:
- Ghost parece “já estar ali”
- Entrada é lenta e silenciosa
- Fidelidade visual à imagem de referência confirmada


⸻

✅ CHECKLIST DE FIDELIDADE (QA)
    •    Ghost começa invisível e desfocado?
    •    Entrada lenta (>3s total)?
    •    Sem movimento espacial?
    •    Glow cresce junto com presença?
    •    Texto entra depois?
    •    Idle motion sutil contínuo?

Se qualquer resposta for “não” → não está fiel.

⸻

🧠 CONCLUSÃO HONESTA

O Hero Ghost é o coração emocional do site.
Se ele errar, todo o resto perde impacto.

Esse spec acima é o nível Phantom real —
não visualmente, mas editorialmente.

⸻

Próximo passo recomendado

👉 Aplicar esse mesmo rigor na relação Ghost ↔ Texto ↔ CTA, frame a frame.
