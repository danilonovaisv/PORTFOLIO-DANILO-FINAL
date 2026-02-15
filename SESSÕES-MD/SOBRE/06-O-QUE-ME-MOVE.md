# 06-O-QUE-ME-MOVE

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/sobre/sections/AboutBeliefs.tsx`
- Subcomponentes:
  - `src/components/sobre/beliefs/BeliefSection.tsx`
  - `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
  - `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx`
  - `src/components/sobre/beliefs/BeliefFinalSection.tsx`
  - `src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx`
- 3D:
  - `src/components/sobre/3d/GhostScene.tsx`
  - `src/components/sobre/3d/GhostModel.tsx`

## 1. Objetivo da Página/Sessão

Entregar clímax emocional da página Sobre, transformando crenças em experiência sensorial (texto, cor e presença do Ghost).

## 2. Estrutura de Conteúdo

- Header fixo:
  - “Acredito no design que muda o dia de alguém…”
- Frases rotativas:
  - 6 frases curtas em sequência.
- Manifesto final:
  - “ISSO É / GHOST / DESIGN”.
- Camada 3D:
  - Ghost interativo com scroll + mouse.

## 3. Identidade Visual

- Cores:
  - Alternância entre `bluePrimary`, `purpleDetails`, `pinkDetails`.
- Estética:
  - Sessão mais experimental e impactante da página.

## 4. Interatividade & Animações

- Camadas fixas + scroll progress global.
- Texto mobile em camada fixed independente.
- Ghost 3D com escala, wobble e rotação dinâmica.

## 5. Responsividade

- Desktop:
  - Frases no fluxo, header fixo, canvas central.
- Mobile:
  - Frases renderizadas em camada fixa na base.

## 6. Acessibilidade & SEO

- `section` e `aria-label` presentes.
- Falta estratégia clara para desativar 3D sob `prefers-reduced-motion`.
- Complexidade visual alta pode impactar legibilidade em alguns cenários.

## 7. Integrações ou Recursos Especiais

- Canvas R3F com GLTF remoto em tempo real.
- DPR até 2 e `antialias: true`.
- Camadas com z-index alto e sticky.

## 8. Considerações Técnicas

- É a sessão de maior custo gráfico da página.
- Alto risco de variação de performance em dispositivos móveis.
- Arquitetura atual diverge de pontos críticos do protótipo.

## 9. Componentes Interativos

| Componente                | Descrição          | Estados                  | Interações       | Status       |
| ------------------------- | ------------------ | ------------------------ | ---------------- | ------------ |
| BeliefFixedHeader         | Texto fixo inicial | Hidden, Visible, FadeOut | Scroll progress  | Implementado |
| BeliefSection             | Frases por tela    | Enter, Hold, Exit        | Scroll por seção | Implementado |
| BeliefFinalSectionOverlay | Manifesto final    | Hidden, Visible          | whileInView      | Implementado |
| GhostScene (3D)           | Canvas do Ghost    | Idle, Intensified        | Scroll + cursor  | Implementado |

## 10. Estrutura de Páginas e Navegação

- Quinta sessão principal da `/sobre`.
- Prepara transição para fechamento e CTAs.

## 11. Informações Relevantes para Compreensão da Sessão

- O protótipo desta sessão é extremamente específico: camadas, sincronização de cor com frase, reset total e scroll bidirecional reversível.

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Crítica): sincronização cor + texto
  - Protótipo exige transição de cor DURANTE entrada de cada frase com camada de crossfade.
  - Implementação aplica cor por seção full-screen, sem mecanismo explícito de crossfade sincronizado por frase.
- Inconformidade 2 (Crítica): reset total ao sair
  - Protótipo exige reset completo (frase 1, escala 1, rotação base, manifesto oculto, bg inicial).
  - Implementação não possui rotina explícita de reset total por saída da viewport.
- Inconformidade 3 (Crítica): ordem de camadas no clímax
  - Protótipo pede manifesto final acima do Ghost no momento de morph.
  - Implementação atual posiciona Ghost em `z-60` e overlay final em `z-40`.
- Inconformidade 4 (Alta): cor do texto “GHOST” no manifesto final
  - Esperado: `bluePrimary`.
  - Implementado: branco.
- Inconformidade 5 (Alta): regra de reduced motion
  - Protótipo pede desligar canvas/3D com `prefers-reduced-motion`.
  - Implementação mantém Canvas e dinâmica 3D.
- Inconformidade 6 (Média): altura da sessão
  - Protótipo de referência descreve seção em escala ~140vh (desktop) com progressão controlada.
  - Implementação usa `h-[800vh]`, alterando ritmo narrativo.
