
# 🧱 AUDITORIA TÉCNICA — PROMPTS COMPLETOS
Portfólio: [https://portfoliodanilo.com](https://portfoliodanilo.com)  
Layout de referência: `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`  
Repositório: `https://github.com/danilonovaisv/_danilonov_portfolio`

---

## 🟦 Seção: Hero

### 🎯 Ajuste 1 — Animação de texto e entrada suave

📝 Objetivo:
Otimizar a animação de entrada do título principal e do canvas 3D da seção Hero para reproduzir o mesmo comportamento visual do layout de referência.

📂 Contexto:
Este código faz parte da seção `Hero.tsx`, que representa o topo do portfólio (App Router Next.js).

💻 Código:
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-6xl md:text-7xl font-bold tracking-tight"
>
  Design, não é só estética.
</motion.h1>
```

🚫 Restrições:
- Não alterar o texto ou estrutura semântica (mantém `<h1>`).
- Não adicionar novas dependências.
- Manter responsividade e centralização.

✅ Estilo Esperado:
- Framer Motion com easing suave (`easeOut`).
- Tipografia fluida e responsiva (`clamp` opcional).
- Formatação Prettier e padrão Tailwind.

📦 Formato de Resposta:
- Retorne o código completo ajustado com explicação breve.

📊 Nível de Detalhamento:
- Explique a função de cada propriedade de animação.

🔄 Finalidade de Longo Prazo:
Este código será usado no Hero principal do portfólio em produção.

---

### 🎯 Ajuste 2 — Canvas 3D e Suspense

📝 Objetivo:
Adicionar carregamento assíncrono do modelo `.glb` usando `React.Suspense` e otimização de luzes para FPS estável.

📂 Contexto:
Este código faz parte de `HeroGlassCanvas.tsx`, responsável pelo modelo 3D do orb translúcido.

💻 Código:
```tsx
<Suspense fallback={<div>Loading 3D...</div>}>
  <Canvas camera={{ position: [0, 0, 3] }}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[2, 2, 5]} intensity={1.2} />
    <GlassOrb />
  </Canvas>
</Suspense>
```

🚫 Restrições:
- Não alterar o modelo 3D (`GlassOrb`).
- Não modificar posição da câmera.
- Evitar novas dependências externas.

✅ Estilo Esperado:
- Uso de Suspense e lazy loading nativo do R3F.
- Renderização limpa sem travamentos.

📦 Formato de Resposta:
- Mostrar o componente completo com `Suspense` e fallback descritivo.

📊 Nível de Detalhamento:
- Breve explicação sobre o impacto de performance da implementação.

🔄 Finalidade de Longo Prazo:
Garantir experiência fluida no carregamento inicial da Home.

---

## 🟩 Seção: Video Manifesto

📝 Objetivo:
Aplicar animação de entrada progressiva (fade-in + scale) e garantir que o vídeo tenha comportamento responsivo e transição suave, igual à referência `loandbehold.studio`.

📂 Contexto:
Este código faz parte da seção `Manifesto.tsx`, usada como vídeo de introdução.

💻 Código:
```tsx
<motion.video
  initial={{ opacity: 0, scale: 1.05 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-[80vh] object-cover rounded-3xl"
/>
```

🚫 Restrições:
- Não alterar o vídeo original.
- Manter autoplay e loop.
- Não adicionar preload manual.

✅ Estilo Esperado:
- Fade-in fluido e leve aumento inicial (`scale: 1.05` → `1`).
- Bordas arredondadas (`rounded-3xl`).
- Suporte mobile e desktop.

📦 Formato de Resposta:
- Exibir código ajustado e breve explicação da lógica.

📊 Nível de Detalhamento:
- Descrever função de `motion.video` e `easeOut`.

🔄 Finalidade de Longo Prazo:
Criar uma experiência cinematográfica fluida e profissional na intro do portfólio.

---

## 🟨 Seção: Portfolio Showcase

📝 Objetivo:
Aplicar animação `staggered` entre os cards de projetos para suavizar a entrada e melhorar a percepção de profundidade.

📂 Contexto:
Parte da seção `PortfolioShowcase.tsx`, onde são renderizados os projetos principais.

💻 Código:
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.15 } },
  }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
>
  {projects.map((p, i) => (
    <motion.div
      key={p.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative group overflow-hidden rounded-xl"
    >
      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <h3 className="text-white text-lg font-semibold">{p.title}</h3>
      </div>
    </motion.div>
  ))}
</motion.div>
```

🚫 Restrições:
- Não modificar o conteúdo textual ou número de cards.
- Não adicionar bibliotecas externas.

✅ Estilo Esperado:
- Animação suave, sequencial e responsiva.
- Imagens otimizadas com `next/image`.

📦 Formato de Resposta:
- Retornar código completo com breve explicação do comportamento visual.

📊 Nível de Detalhamento:
- Explicar como o `staggerChildren` melhora UX.

🔄 Finalidade de Longo Prazo:
Aplicar consistência visual profissional em seções de portfólio.

---

## 🟧 Seção: Clients / Brands

📝 Objetivo:
Melhorar responsividade e hover nas logos, garantindo animação fluida e proporção estável entre colunas.

📂 Contexto:
Código em `Clients.tsx`, exibindo marcas de clientes e parceiros.

💻 Código:
```tsx
<motion.div
  whileHover={{ scale: 1.05, opacity: 0.9 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="w-28 h-20 relative flex items-center justify-center"
>
  <Image src={logo} alt="Brand logo" fill className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
</motion.div>
```

🚫 Restrições:
- Não alterar a proporção original das logos.
- Não alterar grid base.

✅ Estilo Esperado:
- Transição leve no hover.
- Uso de `motion.div` e `easeOut`.

📦 Formato de Resposta:
- Código ajustado e breve descrição da interação visual.

📊 Nível de Detalhamento:
- Breve explicação sobre performance em animações curtas.

🔄 Finalidade de Longo Prazo:
Garantir consistência e fluidez na identidade visual do portfólio.

---

## 🟫 Seção: Contact

📝 Objetivo:
Adicionar microinterações no CTA principal com foco, hover e tap, preservando contraste e acessibilidade.

📂 Contexto:
Código em `Contact.tsx`, seção final com botão “Get in touch”.

💻 Código:
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="px-10 py-4 bg-white text-black rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
  aria-label="Open contact form"
>
  Get in touch
</motion.button>
```

🚫 Restrições:
- Não alterar texto ou link do botão.
- Não adicionar ícones ou novas classes.

✅ Estilo Esperado:
- Microinterações suaves e acessíveis.
- Manter foco visível (`focus:ring`).

📦 Formato de Resposta:
- Retornar botão completo com explicação de acessibilidade.

📊 Nível de Detalhamento:
- Explicar o impacto de `spring` e `focus` na UX.

🔄 Finalidade de Longo Prazo:
Melhorar interação tátil e inclusão visual em dispositivos móveis.

---

## ⚫ Seção: Footer

📝 Objetivo:
Adicionar transições suaves nos links e contraste acessível em modo escuro.

📂 Contexto:
Código em `Footer.tsx`, contendo créditos e links externos.

💻 Código:
```tsx
<Link
  href="#"
  className="hover:text-white transition-colors duration-300"
  aria-label="LinkedIn Profile"
>
  LinkedIn
</Link>
```

🚫 Restrições:
- Não alterar estrutura semântica nem links originais.
- Não adicionar ícones ou cores fora da paleta.

✅ Estilo Esperado:
- Transição suave e contraste mínimo 4.5:1.
- Manter fonte legível e hierarquia clara.

📦 Formato de Resposta:
- Retornar link ajustado e explicar efeito visual.

📊 Nível de Detalhamento:
- Breve explicação da importância do contraste e foco visual.

🔄 Finalidade de Longo Prazo:
Garantir legibilidade e consistência de UI em modo escuro.
