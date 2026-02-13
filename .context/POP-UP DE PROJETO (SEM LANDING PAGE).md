
# POP-UP DE PROJETO (SEM LANDING PAGE)

## Modal Dinâmico para Cards do Portfólio

---

# 1. OBJETIVO

Este documento define o comportamento do **Pop-up de Projeto** utilizado quando um card do portfólio **não possui landing page dedicada**.

O pop-up deve:

- Abrir sobre a página atual
- Exibir mídia em destaque (imagem ou vídeo)
- Permitir navegação entre múltiplas mídias
- Permitir zoom em imagens
- Manter performance e responsividade
- Ser reutilizável para qualquer projeto

---

# 2. CONDIÇÃO DE ABERTURA

Quando um card do portfólio é clicado:

if (project.hasLandingPage) {
navigateToLanding()
} else {
openModal()
}

O pop-up substitui a navegação.

---

# 3. ESTRUTURA DO MODAL

## 3.1 Camadas

Overlay escuro (backdrop-blur opcional)
Container central
Botão fechar (X)
Área principal de mídia
Barra de controle (vídeo)
Miniaturas (se houver mais de 1 mídia)
Informações do projeto

---

# 4. ESTRUTURA DE DADOS

```ts
interface PortfolioProject {
  id: string
  title: string
  category?: string
  year?: string
  client?: string
  media: MediaItem[]
}

interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  poster?: string
  thumbnail?: string
  youtubeUrl?: string
}```
-----


# 5. COMPORTAMENTO DO MODAL

## 5.1 Cenário 1 — Projeto com 1 única mídia

Se houver apenas 1 item:
    •    Renderiza mídia full
    •    Não renderiza miniaturas
    •    Permite zoom (se imagem)
    •    Vídeo com autoplay muted

⸻

## 5.2 Cenário 2 — Projeto com múltiplas mídias

Renderização:

[ Mídia Principal Full ]
[ Miniaturas abaixo ]

Ao clicar em miniatura:

setActiveMedia(index)

A mídia principal é substituída dinamicamente.

⸻

# 6. MÍDIA PRINCIPAL

## 6.1 Imagem

Renderização:
    •    Ocupa largura máxima do container
    •    Mantém proporção
    •    Centralizada
    •    Fundo escuro

Zoom
    •    Click ou pinch
    •    Scale transform
    •    Drag para mover
    •    Esc para sair do zoom

Implementação sugerida:
    •    CSS transform scale()
    •    ou biblioteca:
    •    react-medium-image-zoom
    •    react-zoom-pan-pinch

⸻

## 6.2 Vídeo (Storage Supabase)

Renderização:

<video
  autoplay
  muted
  playsinline
  loop
  controls
>

Regras:
    •    Autoplay muted obrigatório
    •    Loop opcional
    •    Lazy load
    •    Poster obrigatório

⸻

## 6.3 Vídeo YouTube

Renderização:

<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1"
  allow="autoplay; encrypted-media"
>

Regras:
    •    Autoplay ativo
    •    Muted obrigatório
    •    Sem sugestões no final
    •    Responsivo (aspect-ratio 16:9)

⸻

# 7. MINIATURAS

## 7.1 Renderização

[ thumb1 ] [ thumb2 ] [ thumb3 ] ...

Características:
    •    80–120px largura
    •    Bordas arredondadas
    •    Hover state
    •    Estado ativo destacado (border azul ou glow)

⸻

## 7.2 Comportamento
    •    Scroll horizontal se exceder largura
    •    Click troca mídia principal
    •    Transição suave (fade ou crossfade)

⸻

# 8. LAYOUT RESPONSIVO

⸻

Desktop
    •    Modal centralizado
    •    Largura máxima: 1200px
    •    Altura máxima: 85vh
    •    Miniaturas abaixo
    •    Scroll interno se necessário

⸻

Tablet
    •    Largura: 90%
    •    Miniaturas menores
    •    Texto abaixo da mídia

⸻

Mobile
    •    Modal ocupa 100%
    •    Fullscreen real
    •    Botão fechar fixo no topo
    •    Miniaturas em scroll horizontal
    •    Zoom por pinch
    •    Swipe opcional entre mídias

⸻

# 9. CONTROLES

## 9.1 Botão Fechar
    •    Canto superior direito
    •    Clique fora fecha
    •    ESC fecha
    •    Volta estado anterior

⸻


## 9.2 Navegação por Teclado (Desktop)
    •    ← → troca mídia
    •    ESC fecha
    •    Enter ativa zoom

⸻

# 10. PERFORMANCE
    •    Lazy load para mídias secundárias
    •    Pré-carregar próxima mídia
    •    Compressão WebP / AVIF
    •    Vídeos com preload=“metadata”
    •    Pausar vídeo ao trocar mídia

⸻

# 11. ACESSIBILIDADE
    •    aria-modal=“true”
    •    role=“dialog”
    •    aria-label no botão fechar
    •    Trap de foco
    •    Alt obrigatório
    •    Controles acessíveis

⸻

# 12. UX ESPERADA

O pop-up deve transmitir:
    •    Imersão
    •    Elegância
    •    Clareza
    •    Foco total na mídia

Sem distrações.

⸻

# 13. FLUXO DE INTERAÇÃO
    1.    Usuário clica no card
    2.    Overlay fade-in
    3.    Modal scale-in
    4.    Primeira mídia ativa
    5.    Usuário pode:
    •    Trocar mídia
    •    Dar zoom
    •    Fechar
    •    Navegar via teclado

⸻

# 14. COMPONENTIZAÇÃO SUGERIDA

<PortfolioModal>
  <MediaViewer />
  <Thumbnails />
  <ProjectInfo />
</PortfolioModal>

Subcomponentes:
    •    ImageViewer
    •    VideoPlayer
    •    YouTubeEmbed
    •    ThumbnailList

⸻

# 15. REGRA FINAL

Este pop-up:
    •    NÃO substitui landing page
    •    NÃO possui estrutura editorial longa
    •    É um visualizador de projeto rápido
    •    Funciona como galeria expandida

⸻

# 16. CONCLUSÃO

O sistema precisa:
    •    Detectar se há landing
    •    Caso não haja:
    •    Abrir modal
    •    Renderizar mídia full
    •    Permitir navegação
    •    Permitir zoom
    •    Funcionar em qualquer dispositivo

⸻

Se quiser, posso agora:
    1.    🔧 Criar versão ultra técnica para DEV implementar
    2.    🎨 Criar versão focada em UX/UI detalhada
    3.    🧠 Transformar isso em prompt para Agent implementar
    4.    📐 Criar fluxograma estrutural do modal

Escolha a próxima etapa.


