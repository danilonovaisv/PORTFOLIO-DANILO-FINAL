# ADR 006: Arquitetura da seção O Que Me Move

## Status
Aprovado para implementação após gate humano.

## Contexto
A seção `06-O-QUE-ME-MOVE` já possui documento-base com pilha visual, comportamento desktop/mobile, background cromático, manifesto final e Ghost 3D. O projeto também possui regras rígidas de motion, tokens Ghost, Tailwind Oxide com `source(none)` e `getAssetUrl()` como utilitário canônico.

Havia uma tensão entre:
1. concentrar toda a animação em uma única stack
2. separar DOM motion e WebGL por responsabilidade

## Decisão
A seção será implementada como sistema híbrido:
- Motion no DOM para background, overlay, header, frases e manifesto
- React Three Fiber + drei + three.js apenas para `GhostScene`

## Justificativa
Essa separação reduz acoplamento entre narrativa textual e canvas, facilita fallback 2D, preserva performance e segue a ontologia já registrada do projeto.

## Consequências
### Positivas
- boundary claro entre UI declarativa e WebGL
- melhor controle de reduced motion
- manutenção mais previsível
- risco menor de regressão em layout e stacking

### Negativas
- exige coordenação cuidadosa de z-index
- exige contrato de scroll único
- aumenta a disciplina de handoff entre agents

## Guardrails
- nenhum agent pode introduzir GSAP nesta seção
- nenhum agent pode quebrar `source(none)` do Tailwind
- nenhum agent pode resolver assets por helper legado
- qualquer alteração arquitetural exige atualização documental antes do código

## Approval Gate
Nenhum código, alteração de arquivo do repositório, comando destrutivo ou ação de deploy pode ocorrer antes de aprovação humana explícita.
