Prompt para o Agent Manager
Objetivo: Integrar uma experiência 3D interativa no componente AboutBeliefs.tsx utilizando React Three Fiber. O objetivo é renderizar o modelo GhostModel.glb que flutua no centro da seção e reage dinamicamente ao scroll do usuário e movimentos do mouse.

Contexto Técnico (Baseado nos arquivos fornecidos):

Modelo: Utilizar o GLB hospedado em: https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb.

Lógica de Animação: Implementar a lógica contida em GhostModel.tsx, que utiliza useFrame para calcular a posição Y via lerp baseada no scroll, movimento senoidal nos eixos X/Z para o efeito de "flutuação" e rotação reativa ao mouse (tilt).

Cena: Replicar a configuração de GhostScene.tsx (Canvas com sombras, Environment preset "city", ContactShadows e ScrollControls).

Interface: Sobrepor o conteúdo textual de AboutBeliefs.tsx à cena 3D, seguindo o padrão de layout do arquivo Overlay.tsx.

Instruções de Implementação:

Estrutura de Componentes:

Crie ou atualize o arquivo AboutBeliefs.tsx para envolver o conteúdo em um container de altura controlada (ex: h-[400vh] para acomodar os ScrollControls de 4 páginas).

Instancie o <Canvas> de forma que ele fique com position: sticky ou fixed atrás do conteúdo de texto.

Configuração do GhostModel:

Mapeie os nós do GLTF (Body_Ghost_White_0, Eyes_Eyes_0, etc.) e aplique os materiais standard conforme o arquivo de referência.

Configure o responsiveScale para garantir que o modelo não quebre o layout em telas menores.

Sincronização de Scroll e Rotação:

O modelo deve realizar uma rotação completa (ou progressiva) conforme o scroll.offset avança.

Aplique um efeito de "float" suave usando o componente <Float /> do @react-three/drei em volta do grupo principal do modelo.

Estilização e Overlay:

Certifique-se de que o texto da seção "Beliefs" use pointer-events-none para não bloquear a interação do mouse com o Canvas 3D (exceto em botões de ação).

Aplique as animações do framer-motion (conforme Overlay.tsx) para que o texto surja em sincronia com os movimentos do fantasma.

Resultado Esperado: Um componente AboutBeliefs.tsx funcional onde o fantasma flutua centralizado, sobe/desce suavemente durante o scroll, gira em seu próprio eixo e reage sutilmente à posição do cursor do usuário.
-----

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
