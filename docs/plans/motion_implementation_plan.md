# Estratégia de Implementação Cinética: Sessão 06

## 1. Topologia de Scroll (Textos e Background)
- **Background Scrubbing:** - Hook: `const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] })`
  - Mapping: `useTransform(scrollYProgress, [0, 0.5, 1], ["hsl(...)", "hsl(...)", "hsl(...)"])`
- **Text Reveal (Intersection):**
  - Hook: `useInView` ou `inView()` (Motion 12+).
  - Configuração: `animate(el, { opacity: 1, x: 0 }, { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] })`.
  - Cleanup (Reversão): `return () => animate(el, { opacity: 0, x: -100 })`.

## 2. Topologia Split Text (Manifesto)
- **Variantes de Motion (Spring):**
  - Pai: `transition: { staggerChildren: 0.03 }`
  - Filhos (Letras/Palavras): `initial={{ y: "100%", opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`.
  - Spring Config: `type: "spring", stiffness: 200, damping: 20, mass: 1`.

## 3. Física do 3D Ghost (R3F)
- **Canvas Config:** `<Canvas frameloop="demand" dpr={[1, 2]}>`
- **Componentes Drei:** `<Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>`
- **Pointer Tracking (Desktop):** ```javascript
  useFrame((state) => {
    ghostRef.current.position.x = THREE.MathUtils.lerp(ghostRef.current.position.x, state.pointer.x * 2, 0.05)
    ghostRef.current.position.y = THREE.MathUtils.lerp(ghostRef.current.position.y, state.pointer.y * 2, 0.05)
  })


⚠️ Atenção: Como estamos usando frameloop="demand", qualquer evento de pointermove na window ou scroll deve invocar a função invalidate() do R3F para acordar o renderizador enquanto houver interação.

---

### Artefato B
**Arquivo:** `artifacts/task_list.md`
```markdown
# Checklist de Execução Rigorosa

## Performance (Renderização & CPU)
- [ ] Aplicar `will-change: transform, opacity` via CSS Modules ou Tailwind para todos os nós de texto (`.kinetic-text`).
- [ ] Configurar `frameloop="demand"` no Canvas do R3F.
- [ ] Interceptar os listeners de `pointermove` e `scrollYProgress.on('change')` para acionar `invalidate()`, parando a renderização 3D quando a rolagem/mouse parar.
- [ ] Implementar *Early Bail-out* no `useFrame` do R3F: se o elemento estiver fora do viewport (use um ref + IntersectionObserver), não calcule o LERP.

## Acessibilidade & UX
- [ ] Resgatar `const shouldReduceMotion = useReducedMotion()` em todos os componentes de animação.
- [ ] **Fallback de Acessibilidade**: Se `shouldReduceMotion` for true, substituir as interpolações `x` e `y` por fading simples `opacity: [0, 1]` e definir `staggerChildren: 0`.
- [ ] Desativar o tracking de mouse no R3F para usuários com preferência de movimento reduzido (congelar o Ghost no centro).

## Comportamento Mobile
- [ ] Desativar o `Raycaster` / Tracking de Pointer em telas `< 768px`.
- [ ] Ancorar o Ghost top-left e interpolar o eixo Y do 3D acompanhando estritamente o `scrollYProgress` no Mobile.
- [ ] Ajustar a função de cleanup do texto: textos devem deslizar para `x: 100` (direita) ao sair da tela no mobile, evitando colisão visual com a margem esquerda.



