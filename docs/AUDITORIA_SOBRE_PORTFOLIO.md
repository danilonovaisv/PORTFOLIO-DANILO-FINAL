
Ajuste fiel da página /sobre (Ghost Design)

Você é um Senior Frontend Engineer especializado em UI silenciosa, motion sutil e fidelidade a design systems.

Sua tarefa é ajustar / implementar / refatorar a página /sobre do projeto portifoliodanilo.com, garantindo FIDELIDADE TOTAL ao Ghost Design.

⸻

📌 FONTES DE VERDADE (OBRIGATÓRIO)

Você DEVE seguir exatamente:
    1.    Documento base (configuração e regras)
SOBRE-PROTOTIPO-INTERATIVO.md - docs/SOBRE-PROTOTIPO-INTERATIVO.md
    2.    Referências visuais finais (não interpretar, apenas replicar):
    •    Mobile: SOBRE-MOBILE-BLACK---GHOST.jpg - /docs/SOBRE-MOBILE-BLACK---GHOST.jpg
    •    Desktop: SOBRE-PORTFOLIO-BLACK---GHOST.jpg - /docs/SOBRE-PORTFOLIO-BLACK---GHOST.jpg
    
❌ Não criar soluções próprias
❌ Não “melhorar” o design
❌ Não inferir comportamentos não descritos

⸻

🧱 ESTRUTURA OBRIGATÓRIA DA PÁGINA

A página /sobre deve conter EXATAMENTE estas seções, nesta ordem:
    1.    Hero / Manifesto
    2.    Origem Criativa
    3.    O que eu faço
    4.    Como eu trabalho
    5.    O que me move
    6.    Fechamento / Confirmação
    7.    (Após isso: mesmas seções da Home → clientes, contato, footer)

⚠️ Não adicionar, remover ou fundir seções.

⸻

🎨 LAYOUT — REGRAS CRÍTICAS

Desktop
    •    Hero com texto alinhado à direita
    •    Alternância clara texto ↔ imagem na Origem
    •    Muito espaço negativo
    •    Nada centralizado por estética
    •    Layout vertical respirável

Mobile
    •    Texto SEMPRE antes da imagem
    •    Coluna única
    •    Nenhum texto sobre mídia
    •    Ritmo mais lento que desktop

Se o layout divergir das imagens de referência → BUG.

⸻

🎬 MOTION — REGRAS NÃO NEGOCIÁVEIS

Permitido
    •    opacity
    •    blur
    •    translateY (máx. 18px)

Proibido
    •    scale
    •    bounce
    •    rotate
    •    animações decorativas

Comportamento
    •    Manifestos são time-based, não scroll-based
    •    Motion só dispara ao entrar no viewport
    •    Após aparecer, o conteúdo fica estático
    •    Imagens nunca chegam a 100% de opacity

Se parecer “bonito demais”, está errado.

⸻

✍️ TEXTO & CONTEÚDO
    •    Texto idêntico ao SOBRE-PROTOTIPO-INTERATIVO.md
    •    Não reescrever, não resumir, não ajustar copy
    •    Destaques no máximo 1–2 palavras por bloco
    •    Nada grita
    •    Nada compete pela atenção

⸻

🧩 COMPONENTIZAÇÃO (GUIA)

Use componentes alinhados ao Ghost Design System, por exemplo:
    •    GhostSection
    •    GhostHeading
    •    GhostText
    •    GhostMedia
    •    GhostList
    •    GhostCTA

⚠️ Uma seção = uma intenção
⚠️ Não empilhar animações

⸻

⚠️ PROIBIÇÕES ABSOLUTAS

❌ Texto sobre imagem
❌ Gradientes chamativos
❌ Glow exagerado
❌ Microinterações chamativas
❌ “Acho que fica melhor assim”
❌ Decisões fora do .md

⸻

✅ CHECKLIST ANTES DE FINALIZAR

Antes de concluir, valide:
    •    Estrutura bate com o documento
    •    Layout bate com as imagens (mobile e desktop)
    •    Motion é silencioso e previsível
    •    Mobile-first respeitado
    •    Nenhuma animação fora do viewport
    •    prefers-reduced-motion respeitado

Se qualquer item falhar → não finalize.

⸻

🧠 PRINCÍPIO FINAL (LEMBRETE)

Ghost Design não é estilo.
É comportamento invisível.

O usuário:
    •    não percebe o layout
    •    não nota o motion
    •    não vê o esforço

Mas sente:
    •    ritmo
    •    presença
    •    confiança

Se isso não acontecer, a implementação falhou.

⸻

🔒 REGRA FINAL PARA CURSOR / COPILOT

Siga as referências.
Ignore preferências pessoais.
Implemente exatamente o que foi especificado.
