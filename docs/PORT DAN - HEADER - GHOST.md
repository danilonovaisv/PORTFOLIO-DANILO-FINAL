# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Navigation  
### Mobile & Tablet: Staggered Menu Navigation

---

## SECTION PURPOSE (what this section must achieve)
- Fornecer navegação global e identidade visual do site.
- Permanecer visível em todas as páginas.
- Reforçar a identidade **premium + experimental** do projeto.
- Atuar como camada atmosférica complementar à Hero Ghost.

---

## RESPONSABILIDADE CONCEITUAL

### Desktop
- O header se comporta como um **objeto óptico fluido**.
- Utiliza **refração real em WebGL** (Fluid Glass).
- Não disputa atenção com a Hero — apenas dialoga visualmente.

### Mobile & Tablet
- O header é **funcional e minimalista**.
- A navegação ocorre via **menu fullscreen staggered**.
- Performance e clareza são priorizadas sobre efeitos visuais.

---

## BREAKPOINT STRATEGY

| Device | Behaviour |
|------|----------|
| Desktop ≥ 1024px | Fluid Glass Header |
| Tablet ≤ 1023px | Staggered Menu |
| Mobile ≤ 640px | Staggered Menu |

---

## DESKTOP — FLUID GLASS HEADER

### VISUAL REFERENCE
https://reactbits.dev/components/fluid-glass

---

### VISUAL BEHAVIOR
- Elemento translúcido com refração real (MeshTransmissionMaterial)
- Distorção óptica sutil
- Chromatic aberration controlada
- Movimento leve seguindo o cursor
- Renderiza o conteúdo por trás (não possui fundo sólido)

---

### CONTENT (DESKTOP)
- Logo (Light)
- Navigation links:
  - Home → `/` ou `#hero`
  - Sobre → `/sobre`
  - Portfolio → `/portfolio`
  - Contato → `#contact`

---

### LAYOUT TYPE
- Header flutuante
- Centralizado horizontalmente
- Altura compacta
- Não ocupa 100% da largura (aspecto de “objeto”)

---

### FILE ARCHITECTURE (DESKTOP)

```
components/header/
 ├─ SiteHeader.tsx
 ├─ DesktopFluidHeader.tsx
 └─ webgl/
     └─ FluidGlass.tsx
```

---

### FLUID GLASS — DEFAULT CONFIGURATION

```tsx
<FluidGlass
  mode="lens"
  lensProps={{
    scale: 0.25,
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  }}
/>
```

---

### INTERACTIONS (DESKTOP)
- Hover nos links:
  - Apenas alteração de opacidade
  - ❌ Sem underline
  - ❌ Sem animações chamativas
- Pointer move:
  - Vidro acompanha suavemente o cursor
- Scroll:
  - Header permanece fixo
  - ❌ Sem morph de tamanho
  - ❌ Sem animação por scroll

---

### PERFORMANCE (DESKTOP)
- Canvas WebGL isolado
- Sem ScrollControls
- DPR limitado
- Geometria simples (`lens.glb`)
- Fallback automático se WebGL falhar

---

### ACCESSIBILITY (DESKTOP)
- Navegação por teclado funcional
- Links com `aria-label`
- Fallback HTML:
  - Logo + links estáticos se WebGL não estiver disponível

---

## MOBILE & TABLET — STAGGERED MENU

### VISUAL REFERENCE
https://reactbits.dev/components/staggered-menu

---

### VISUAL BEHAVIOR
- Menu fullscreen
- Entrada lateral
- Animação staggered editorial
- Camadas de cor animadas (prelayers)
- Ícone Menu ↔ Close animado

---

### STAGGERED MENU — DEFAULT CONFIGURATION

```tsx
<StaggeredMenu
  position="right"
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
  menuButtonColor="#e9e9ef"
  openMenuButtonColor="#000"
  changeMenuColorOnOpen={true}
  colors={['#B19EEF', '#5227FF']}
  accentColor="#5227FF"
  isFixed
/>
```

---

## Z-INDEX STRATEGY

```
z-40 → Header / Menu
z-20 → Hero Content
z-0  → WebGL Hero Canvas
```

---

## NON-NEGOTIABLES (HEADER)
- ❌ Header não compete com a Hero
- ❌ Sem glassmorphism fake em CSS
- ❌ Sem animações decorativas gratuitas
- ✅ WebGL apenas no Desktop
- ✅ Mobile sem WebGL pesado
- ✅ Fallback funcional obrigatório
