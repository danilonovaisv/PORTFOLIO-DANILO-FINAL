---
description: Replicação Fiel da Hero Animation “GHOST”
---

🧠 WORKFLOW ANTIGRAVITY

Replicação Fiel da Hero Animation “GHOST”

Objetivo Final:
A animação WebGL do Ghost deve ser indistinguível da referência
https://codepen.io/danilonovaisv/pen/azZbdQo
em movimento, brilho, atmosfera, resposta ao mouse e pós-processamento, respeitando Next.js App Router + R3F.

⸻

🧩 VISÃO GERAL DO PIPELINE

REFERÊNCIA → ANÁLISE → PARIDADE VISUAL → CORREÇÕES → OTIMIZAÇÃO → TESTES → PREVIEW → APROVAÇÃO

Cada fase é executada por agentes especializados, com checkpoints objetivos.

⸻

🛰️ AGENTE 0 — BOOTSTRAP & CONTEXTO

Responsabilidade
• Ler e indexar TODA a documentação
• Criar baseline técnico e visual

Inputs obrigatórios
• Documentação Hero + Ghost ￼
• Protocolo Antigravity ￼
• Workflow Refinamento 3D ￼
• Código atual (/docs/HOME/REFERENCIA_HERO-GHOST/code-ref.tsx)
• Assets da referência (/docs/HOME/REFERENCIA_HERO-GHOST/)
• Documento com detalhemento da pagina (docs/blueprints_project/Blueprint_Hero_Section.md) e ('/docs/HOME/REFERENCIA_HERO-GHOST/ANALISE-GHOST.md'0

Outputs
• Checklist técnico de paridade
• Lista de gaps entre implementação atual vs referência

⸻

👁️ AGENTE 1 — ANÁLISE VISUAL FORENSE (REFERÊNCIA)

Missão
Decompor a animação original frame a frame.

Checklist de Análise
• Geometria:
• SphereGeometry deformada apenas na base
• Frequências senoidais (X/Z combinados)
• Material:
• MeshStandardMaterial
• emissiveIntensity > 5.0
• roughness ≈ 0.02
• Movimento:
• Flutuação orgânica (sin/cos desacoplados)
• Lerp lento para mouse (0.04–0.06)
• Pós-processamento:
• Bloom agressivo
• Grain + scanlines + chromatic aberration
• Transparência:
• Canvas com alpha real (sem black box)

Saída
• Documento: “Parâmetros Visuais Canônicos”
• Tabela de valores-alvo

⸻

🧬 AGENTE 2 — GEOMETRIA & SHADER DO GHOST

Objetivo
Eliminar qualquer deformação em CPU.

Ações
• Migrar deformação para Vertex Shader
• Usar:
• onBeforeCompile OU
• ShaderMaterial dedicado
• Garantir:
• Normais recalculadas
• Base Y fixa (efeito “tecido”)

Validação
• Silhueta idêntica à referência
• Nenhum recalculo por frame

⸻

💡 AGENTE 3 — MATERIAL & EMISSIVE DYNAMICS

Responsabilidade
Ajustar o “espírito” do Ghost.

Ações
• Emissive HDR:

emissiveIntensity = 5.8 + sin(time _ 1.6) _ 0.8

    •	Rim Light:
    •	DirectionalLight lateral
    •	Intensidade alta
    •	Eyes:
    •	meshBasicMaterial
    •	Bloom-only (sem luz física)

Validação
• Ghost “explode” no bloom
• Olhos nunca perdem destaque

⸻

🌫️ AGENTE 4 — PARTÍCULAS (INSTANCED MESH)

Objetivo
Performance perfeita + profundidade atmosférica.

Regras Absolutas

🚫 Proibido:
• Arrays de Mesh
• Spawn/despawn dinâmico

✅ Obrigatório:
• InstancedMesh
• Atualização via setMatrixAt

Validação
• ≤ 2 draw calls
• 60+ FPS estável

⸻

📼 AGENTE 5 — POST-PROCESSING (ANALOG DECAY)

Missão Crítica
Reproduzir o efeito VHS/CRT sem quebrar alpha.

Pipeline Obrigatório

<EffectComposer>
  <Bloom />
  <AnalogDecay />
</EffectComposer>

Shader AnalogDecay deve conter:
• Chromatic Aberration temporal
• Scanlines (uv.y \* alta frequência)
• Grain gaussiano
• Jitter horizontal (60Hz)
• Vignette radial

⚠️ NÃO usar ShaderPass legado

Validação
• Background CSS visível
• Zero artefatos pretos

⸻

🖱️ AGENTE 6 — INTERAÇÃO & FÍSICA ORGÂNICA

Ações
• Usar state.pointer (NDC)
• Converter para World Space via viewport
• Movimento:

damp(position, target, 0.05)

Extra
• Rotação do Ghost baseada na velocidade do mouse

Validação
• Movimento “vivo”
• Nunca robótico

⸻

⚙️ AGENTE 7 — PERFORMANCE & FALLBACKS

Checklist
• dpr = Math.min(2, devicePixelRatio)
• antialias = false
• PerformanceMonitor ativo
• prefers-reduced-motion:
• ❌ WebGL
• ✅ Gradiente estático

⸻

🧪 AGENTE 8 — TESTES & PREVIEWS ITERATIVOS

Loop obrigatório

AJUSTE → PREVIEW → COMPARAÇÃO → CORREÇÃO

Comparações
• Vídeo lado a lado
• Overlay de frames
• Teste em:
• Chrome / Safari
• Retina / Não-retina

⸻

✅ CRITÉRIOS DE APROVAÇÃO FINAL

✔️ Movimento indistinguível
✔️ Bloom com mesma intensidade
✔️ Atmosfera idêntica
✔️ Sem queda de FPS
✔️ Transparência perfeita
✔️ Zero warnings no console

⸻
