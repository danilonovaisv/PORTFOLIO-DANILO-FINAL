import { docsUri } from '../utils/uri.mjs';

function initDocsResources(server) {
    // Motion directive
    server.registerResource("Vue: Motion directive", docsUri("vue", "motion-directive"), {
        description: "Animate UIs in Motion for Vue with motion components. Animate CSS, transforms, & SVGs. Use variants for orchestration, gestures, and keyframes.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "motion-directive");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion directive

Motion for Vue offers a number of ways to animate your UI. Scaling from extremely simple prop-based animations, to more complex orchestration.

## Basic animations

You'll perform almost all animations on [a](/docs/vue-motion-component.md) \`[<motion />](/docs/vue-motion-component.md)\` [component](/docs/vue-motion-component.md). This is basically a DOM element with motion superpowers.

\`\`\`
import { motion } from "motion-v"
\`\`\`

For basic animations, you can update values on [the](/docs/vue-motion-component#animate.md) \`[animate](/docs/vue-motion-component#animate.md)\` [prop](/docs/vue-motion-component#animate.md):

\`\`\`
<motion.div :animate="{ opacity: 1 }" />
\`\`\`

When any value in its animate prop changes, the component will automatically animate to the new target.

## Animatable values

Motion can animate any CSS value, even those that can't be animated by browsers, like \`mask-image\`. It supports:

*   Numbers: \`0\`, \`100\` etc.
    
*   Strings containing numbers: \`"0vh"\`, \`"10px"\` etc.
    
*   Colors: Hex, RGBA, HSLA.
    
*   Complex strings containing multiple numbers and/or colors (like \`box-shadow\`).
    
*   \`display: "none"/"block"\` and \`visibility: "hidden"/"visible"\`.
    

### Value type conversion

In general, values can only be animated between two of the same type (i.e \`"0px"\` to \`"100px"\`).

Colors can be freely animated between hex, RGBA and HSLA types.

Additionally, \`x\`, \`y\`, \`width\`, \`height\`, \`top\`, \`left\`, \`right\` and \`bottom\` can animate between different value types.

\`\`\`
<motion.div
  :initial='{ x: "100%" }'
  :animate='{ x: "calc(100vw - 50%)" }'
/>
\`\`\`

It's also possible to animate \`width\` and \`height\` in to/out of \`"auto"\`.

\`\`\`
<motion.div
  :initial='{ height: "0px" }'
  :animate='{ height: "auto" }'
/>
\`\`\`

**Note:** If additionally animating \`display\` in to/out of \`"none"\`, replace this with \`visibility\` \`"hidden"\` as elements with \`display: none\` can't be measured.

### Transforms

Unlike CSS, Motion can animate every transform axis independently:

*   Translate: \`x\`, \`y\`, \`z\`
    
*   Scale: \`scale\`, \`scaleX\`, \`scaleY\`
    
*   Rotate: \`rotate\`, \`rotateX\`, \`rotateY\`, \`rotateZ\`
    
*   Skew: \`skew\`, \`skewX\`, \`skewY\`
    
*   Perspective: \`transformPerspective\`
    

\`motion\` components have enhanced \`style\` props, allowing you to set individual transforms:

\`\`\`
<motion.section :style="{ x: -20 }" />
\`\`\`

Animating transforms independently provides great flexibility, especially around gestures.

\`\`\`
<motion.button :whileHover="{ scale: 1.1 }" whilePress="{ scale: 0.9 }" />
\`\`\`

Independent transforms perform great, but Motion's hybrid engine also uniquely offers hardware acceleration by setting \`transform\` directly.

\`\`\`
<motion.li
  :initial='{ transform: "translateX(-100px)" }'
  :animate='{ transform: "translateX(0px)" }'
  :transition='{ type: "spring" }'
/>
\`\`\`

**SVG note:** For SVG components, \`x\` and \`y\` **attributes** can be set using \`attrX\` and \`attrY\`.

### Transform origin

\`transform-origin\` has three shortcut values that can be set and animated individually:

*   \`originX\`
    
*   \`originY\`
    
*   \`originZ\`
    

If set as numbers, \`originX\` and \`Y\` default to a progress value between \`0\` and \`1\`. \`originZ\` defaults to pixels.

\`\`\`
<motion.div :style='{ originX: 0.5 }' />
\`\`\`

### CSS variables

Motion for Vue can animate the value of CSS variables, and also use CSS variables as animation targets.

#### Animating CSS variables

Sometimes it's convenient to be able to animate a CSS variable to animate many children:

\`\`\`
<motion.ul
  :initial="{ '--rotate': '0deg' }"
  :animate="{ '--rotate': '360deg' }"
  :transition="{ duration: 2, repeat: Infinity }"
>
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
</motion.ul>
\`\`\`

**Note:** Animating the value of a CSS variable **always triggers paint**, therefore it can be more performant to use \`[MotionValue](/docs/vue-motion-value.md)\`[s](/docs/vue-motion-value.md) to setup this kind of animation.

### CSS variables as animation targets

HTML \`motion\` components accept animation targets with CSS variables:

\`\`\`
<motion.li :animate="{ backgroundColor: 'var(--action-bg)' }" />
\`\`\`

#### SVG line drawing

Line drawing animations can be created with many different SVG elements using three special properties: \`pathLength\`, \`pathSpacing\` and \`pathOffset\`.

\`\`\`
<motion.path :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }" />
\`\`\`

All three are set as a progress value between \`0\` and \`1\`, \`1\` representing the total length of the path.

Path animations are compatible with \`circle\`, \`ellipse\`, \`line\`, \`path\`, \`polygon\`, \`polyline\` and \`rect\` elements.

## Transitions

By default, Motion will create appropriate transitions for snappy animations based on the type of value being animated.

For instance, physical properties like \`x\` or \`scale\` are animated with spring physics, whereas values like \`opacity\` or \`color\` are animated with duration-based easing curves.

However, you can define your own animations via [the](/docs/vue-transitions.md) \`[transition](/docs/vue-transitions.md)\` [prop](/docs/vue-transitions.md).

\`\`\`
<motion.div
  :animate="{ x: 100 }"
  :transition="{ ease: 'easeOut', duration: 2 }"
/>
\`\`\`

## Enter animations

When a \`motion\` component is first created, it'll automatically animate to the values in \`animate\` if they're different from those initially rendered, which you can either do via CSS or via [the](/docs/vue-motion-component.md) \`[initial](/docs/vue-motion-component.md)\` [prop.](/docs/vue-motion-component.md)

\`\`\`
<motion.li
  :initial="{ opacity: 0, scale: 0 }"
  :animate="{ opacity: 1, scale: 1 }"
/>
\`\`\`

You can also disable the enter animation entirely by setting \`:initial="false"\`. This will make the element render with the values defined in \`animate\`.

\`\`\`
<motion.div :initial="false" :animate="{ y: 100 }" />
\`\`\`

## Exit animations

You can also easily animate elements as they exit the DOM.

In Vue, when a component is removed, it's usually removed instantly. Motion provides [the](/docs/vue-animate-presence.md) \`[AnimatePresence](/docs/vue-animate-presence.md)\` [component](/docs/vue-animate-presence.md) which keeps elements in the DOM while they perform an \`exit\` animation.

\`\`\`
<AnimatePresence>
    <motion.div
      v-if="isVisible"
      key="modal"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
    />
</AnimatePresence>
\`\`\`

## Keyframes

Values in \`animate\` can be set as a series of keyframes. This will animate through each value in sequence.

\`\`\`
<motion.div :animate="{ x: [0, 100, 0] }" />
\`\`\`

We can use a value's current state as the initial keyframe by setting it to \`null\`.

\`\`\`
<motion.div :animate="{ x: [null, 100, 0] }" />
\`\`\`

This way, if a keyframe animation is interrupting another animation, the transition will feel more natural.

By default, each keyframe is spaced naturally throughout the animation. You can override this by setting [the](/docs/vue-transitions#times.md) \`[times](/docs/vue-transitions#times.md)\` [option](/docs/vue-transitions#times.md) via \`transition\`.

\`times\` is an array of progress values between \`0\` and \`1\`, defining where in the animation each keyframe should be positioned.

\`\`\`
<motion.circle
  :cx="500"
  :animate="{
    cx: [null, 100, 200],
    transition={{ duration: 3, times: [0, 0.2, 1] }}
  }"
/>
\`\`\`

## Gesture animations

Motion for Vue has shortcut props for animating to/from a target when a gesture starts/ends.

\`\`\`
<motion.button
  :initial="{ opacity: 0 }"
  :whileHover="{ backgroundColor: 'rgba(220, 220, 220, 1)' }"
  :whilePress="{ backgroundColor: 'rgba(255, 255, 255, 1)' }"
  :whileInView="{ opacity: 1 }"
/>
\`\`\`

It supports \`hover\`, \`press\`, \`drag\`, \`focus\` and \`inView\`.

## Variants

Setting \`animate\` as a target is useful for simple, single-element animations. But sometimes we want to orchestrate animations that propagate throughout the DOM. We can do so with variants.

Variants are a set of named targets.

\`\`\`
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
\`\`\`

They're passed to \`motion\` components via the \`variants\` prop:

\`\`\`
<motion.div :variants="variants" />
\`\`\`

These variants can now be referred to by a label, wherever you can define an animation target:

\`\`\`
<motion.div
  :variants="variants"
  initial="hidden"
  animate="visible"
/>
\`\`\`

You can also define multiple variants via an array:

\`\`\`
:animate="['visible', 'danger']"
\`\`\`

### Propagation

This is already useful for reusing and combining animation targets. But it becomes powerful for orchestrating animations throughout trees.

Variants will flow down through \`motion\` components. So in this example when the \`ul\` enters the viewport, all of its children with a "visible" variant will also animate in:

\`\`\`
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

return (
  <motion.ul
    initial="hidden"
    whileInView="visible"
    :variants="list"
  >
    <motion.li :variants="item" />
    <motion.li :variants="item" />
    <motion.li :variants="item" />
  </motion.ul>
)
\`\`\`

### Orchestration

By default, this children animations will start simultaneously with the parent. But with variants we gain access to new \`transition\` props like \`[when](/docs/vue-transitions#orchestration.md)\`[,](/docs/vue-transitions#orchestration.md) \`[delayChildren](/docs/vue-transitions#orchestration.md)\`[,](/docs/vue-transitions#orchestration.md) \`[staggerChildren](/docs/vue-transitions#orchestration.md)\` [and](/docs/vue-transitions#orchestration.md) \`[staggerDirection](/docs/vue-transitions#orchestration.md)\`.

\`\`\`
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3, // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}
\`\`\`

### Dynamic variants

Each variant can be defined as a function that resolves when a variant is made active.

\`\`\`
const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 }
  })
}
\`\`\`

These functions are provided a single argument, which is passed via the \`custom\` prop:

\`\`\`
<motion.div v-for="(item,index) in items" :custom="index" :variants="variants" />
\`\`\`

This way, variants can be resolved differently for each animating element.

## Animation controls

Declarative animations are ideal for most UI interactions. But sometimes we need to take manual control over animation playback.

The \`[useAnimate](/docs/vue-use-animate.md)\` [hook](/docs/vue-use-animate.md) can be used for:

*   Animating any HTML/SVG element (not just \`motion\` components).
    
*   Complex animation sequences.
    
*   Controlling animations with \`time\`, \`speed\`, \`play()\`, \`pause()\` and other playback controls.
    

\`\`\`
<script setup>
  const [scope, animate] = useAnimate()
  watch(scope, () => {
    const controls = animate([
      [scope.current, { x: "100%" }],
      ["li", { opacity: 1 }]
    ])
  
    controls.speed = 0.8
      
    return () => controls.stop()
  })
</script>

<template>
  <ul ref="scope">
    <li />
    <li />
    <li />
  </ul>
</template>
\`\`\`

## Animate content

By passing [a](/docs/vue-motion-value.md) \`[MotionValue](/docs/vue-motion-value.md)\` as value prop to a \`RowValue\` component, it will render its latest value in the HTML.

\`\`\`
<script setup>
  import { useMotionValue, motion, animate, RowValue } from "motion-v"
  import { onMount, onUnmount } from "vue"

  const count = useMotionValue(0)
  let controls
  
  onMount(()=>{
    controls = animate(count, 100, { duration: 5 })
  })

  onUnmount(()=>{
    controls.stop()
  })
</script>

<template>
 <motion.pre><RowValue :value="count"/></motion.pre> 
</template>

\`\`\`

This is more performant than setting Vue state as the \`RowValue\` component will set \`innerHTML\` directly.`
                }
            ]
        };
    });
    // Get started with Motion for Vue
    server.registerResource("Vue: Get started with Motion for Vue", docsUri("vue", "vue"), {
        description: "Learn Motion for Vue animation library: Install, animate HTML and SVG elements with spring animations, staggering effects. Complete guide with examples.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "vue");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Get started with Motion for Vue

Motion for Vue is a simple yet limitless animation library. It's the only animation library with a **hybrid engine**, capable of hardware accelerated animations.

In this guide, we'll learn how to install Motion Vue and take a whirlwind tour of its main features.

## Why Motion for Vue?

Vue gives you the power to build dynamic user interfaces, but orchestrating complex, performant animations can be a challenge. Motion is a production-ready library designed to solve this, making it simple to create everything from beautiful micro-interactions to complex, gesture-driven animations.

\`\`\`
<motion.button :animate="{ opacity: 1 }" />
\`\`\`

### Key advantages

Here's when it's the right choice for your project.

*   Build for Vue. While other animation libraries are messy to integrate, Motion's declarative API feels like a natural extension of Vue. Animations can be linked directly to state and props.
    
*   **Hardware-acceleration.** Motion leverages the same high-performance browser animations as pure CSS, ensuring your UIs stay smooth and snappy. You get the power of 120fps animations with a much simpler and more expressive API.
    
*   **Animate anything.** CSS has hard limits. There's values you can't animate, keyframes you can't interrupt, staggers that must be hardcoded. Motion provides a single, consistent API that handles everything from simple transitions to advanced scroll, layout, and gesture-driven effects.
    
*   **App-like gestures.** Standard CSS \`:hover\` events are unreliable on touch devices. Motion provides robust, cross-device gesture recognisers for press, drag, and hover, making it easy to build interactions that feel native and intuitive on any device.
    

### When is CSS a better choice?

For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution. The strength of Motion is that it can do these simple kinds of animations but also scale to anything you can imagine. All with the same easy to write and maintain API.

## Install

Motion for Vue is available via npm:

\`\`\`
npm install motion-v
\`\`\`

### Nuxt modules

Motion Vue offers Nuxt modules support.

In \`nuxt.config.ts\`, simply add \`motion-v/nuxt\` into the modules, and it will auto-imports all the components for you.

\`\`\`
export default defineNuxtConfig({
  modules: ['motion-v/nuxt'],
})
\`\`\`

### \`unplugin-vue-components\`

Motion for Vue also supports [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) to auto-import all components from \`motion-v\`:

\`\`\`
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        MotionResolver()
      ],
    }),
  ],
})
\`\`\`

> **Note:** Auto-import currently doesn't support [the <motion /> component](/docs/vue-motion-component.md) so you'll need to import it manually.

**Note:** Motion for Vue contains APIs specifically tailored for Vue, but every feature from [vanilla Motion](/docs/quick-start.md) is also compatible and available for advanced use-cases.

## Usage

The core of Motion for Vue is [the](/docs/vue-motion-component.md) \`[<motion />](/docs/vue-motion-component.md)\` [component](/docs/vue-motion-component.md). It's a normal DOM element, supercharged with animation capabilities.

\`\`\`
<template>
  <motion.div />
</template>
\`\`\`

Animating a \`motion\` component is as straightforward as setting values via the \`animate\` prop:

\`\`\`
<motion.ul :animate="{ rotate: 360 }" />
\`\`\`

When values in \`animate\` change, the component will animate. Motion has great-feeling defaults, but animations can of course be configured via [the](/docs/vue-transitions.md) \`[transition](/docs/vue-transitions.md)\` [prop](/docs/vue-transitions.md).

\`\`\`
<motion.div
  :animate="{
    scale: 2,
    transition: { duration: 2 }
  }"
/>
\`\`\`

### Enter animation

When a component enters the page, it will automatically animate from the rendered value, but you can provide different values via the \`initial\` prop.

\`\`\`
<motion.button :initial="{ scale: 0 }" :animate="{ scale: 1 }" />
\`\`\`

Or disable this initial animation entirely by setting \`initial\` to \`false\`.

\`\`\`
<motion.button :initial="false" :animate="{ scale: 1 }" />
\`\`\`

### Gestures

\`<motion />\` extends Vue's event system with powerful gesture recognises. It currently supports hover, press, focus, and drag gestures.

\`\`\`
<motion.button
  :whileHover="{ scale: 1.1 }"
  :whilePress="{ scale: 0.95 }"
  @hoverStart="() => console.log('hover started!')"
/>
\`\`\`

Motion's gestures are designed to feel better than using CSS alone. For instance, hover events are correctly not triggered by touch screen taps. [Learn more about gestures](/docs/vue-gestures.md).

### Scroll animations

Motion supports both types of scroll animations, **scroll-triggered** and **scroll-linked**.

To trigger an animation on scroll, the \`whileInView\` prop defines a state to animate to/from when an element enters/leaves the viewport:

\`\`\`
<motion.div
  :initial="{ backgroundColor: 'rgb(0, 255, 0)', opacity: 0 }"
  :whileInView="{ backgroundColor: 'rgb(255, 0, 0)', opacity: 1 }"
/>
\`\`\`

Whereas to link a value directly to scroll position, it's possible to use \`MotionValue\`s via \`[useScroll](/docs/vue-use-scroll.md)\`.

\`\`\`
<script setup >
  const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
\`\`\`

[Learn more](/docs/vue-scroll-animations.md) about Motion's scroll animations.

### Layout animations

Motion has an industry-leading layout animation engine that supports animating between changes in layout, using only transforms, between the same or different elements, with full scale correction.

It's as easy as applying the \`layout\` prop.

\`\`\`
<motion.div layout />
\`\`\`

Or to animate between different elements, a \`layoutId\`:

\`\`\`
<motion.div layoutId="underline" />
\`\`\`

[Learn more](/docs/vue-layout-animations.md) about layout animations.

### Exit animations

By wrapping \`motion\` components with \`<AnimatePresence>\` we gain access to the \`exit\` prop.

\`\`\`
<AnimatePresence>
  <motion.div v-if="show" key="box" :exit="{ opacity: 0 }" />
</AnimatePresence>
\`\`\`

[Learn more](/docs/vue-animate-presence.md) about \`AnimatePresence\`.

## Development tools

[Motion Studio](https://motion.dev/studio) provides visual editing and AI tools to enhance your animation development workflow, like inline bezier editing, CSS spring generation and more.

##   

## Learn next

That's a very quick overview of Motion for Vue's basic features. But there's a lot more to learn!

Next, we recommend diving further into the [the](/docs/vue-motion-component.md) \`[<motion />](/docs/vue-motion-component.md)\` [component](/docs/vue-motion-component.md) to learn more about its powerful features, like variants.

Or, you can dive straight in to our [examples](https://motion.dev/examples?platform=vue), where each example comes complete with full source code that you can copy/paste into your project.`
                }
            ]
        };
    });
    // Vue animation
    server.registerResource("Vue: Vue animation", docsUri("vue", "animation"), {
        description: "Animate UIs in Motion for Vue with motion components. Animate CSS, transforms, & SVGs. Use variants for orchestration, gestures, and keyframes.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "animation");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Vue animation

Motion for Vue offers a number of ways to animate your UI. Scaling from extremely simple prop-based animations, to more complex orchestration.

## Basic animations

You'll perform almost all animations on [a](/docs/vue-motion-component.md) \`[<motion />](/docs/vue-motion-component.md)\` [component](/docs/vue-motion-component.md). This is basically a DOM element with motion superpowers.

\`\`\`
import { motion } from "motion-v"
\`\`\`

For basic animations, you can update values on [the](/docs/vue-motion-component#animate.md) \`[animate](/docs/vue-motion-component#animate.md)\` [prop](/docs/vue-motion-component#animate.md):

\`\`\`
<motion.div :animate="{ opacity: 1 }" />
\`\`\`

When any value in its animate prop changes, the component will automatically animate to the new target.

## Animatable values

Motion can animate any CSS value, even those that can't be animated by browsers, like \`mask-image\`. It supports:

*   Numbers: \`0\`, \`100\` etc.
    
*   Strings containing numbers: \`"0vh"\`, \`"10px"\` etc.
    
*   Colors: Hex, RGBA, HSLA.
    
*   Complex strings containing multiple numbers and/or colors (like \`box-shadow\`).
    
*   \`display: "none"/"block"\` and \`visibility: "hidden"/"visible"\`.
    

### Value type conversion

In general, values can only be animated between two of the same type (i.e \`"0px"\` to \`"100px"\`).

Colors can be freely animated between hex, RGBA and HSLA types.

Additionally, \`x\`, \`y\`, \`width\`, \`height\`, \`top\`, \`left\`, \`right\` and \`bottom\` can animate between different value types.

\`\`\`
<motion.div
  :initial='{ x: "100%" }'
  :animate='{ x: "calc(100vw - 50%)" }'
/>
\`\`\`

It's also possible to animate \`width\` and \`height\` in to/out of \`"auto"\`.

\`\`\`
<motion.div
  :initial='{ height: "0px" }'
  :animate='{ height: "auto" }'
/>
\`\`\`

**Note:** If additionally animating \`display\` in to/out of \`"none"\`, replace this with \`visibility\` \`"hidden"\` as elements with \`display: none\` can't be measured.

### Transforms

Unlike CSS, Motion can animate every transform axis independently:

*   Translate: \`x\`, \`y\`, \`z\`
    
*   Scale: \`scale\`, \`scaleX\`, \`scaleY\`
    
*   Rotate: \`rotate\`, \`rotateX\`, \`rotateY\`, \`rotateZ\`
    
*   Skew: \`skew\`, \`skewX\`, \`skewY\`
    
*   Perspective: \`transformPerspective\`
    

\`motion\` components have enhanced \`style\` props, allowing you to set individual transforms:

\`\`\`
<motion.section :style="{ x: -20 }" />
\`\`\`

Animating transforms independently provides great flexibility, especially around gestures.

\`\`\`
<motion.button :whileHover="{ scale: 1.1 }" whilePress="{ scale: 0.9 }" />
\`\`\`

Independent transforms perform great, but Motion's hybrid engine also uniquely offers hardware acceleration by setting \`transform\` directly.

\`\`\`
<motion.li
  :initial='{ transform: "translateX(-100px)" }'
  :animate='{ transform: "translateX(0px)" }'
  :transition='{ type: "spring" }'
/>
\`\`\`

**SVG note:** For SVG components, \`x\` and \`y\` **attributes** can be set using \`attrX\` and \`attrY\`.

### Transform origin

\`transform-origin\` has three shortcut values that can be set and animated individually:

*   \`originX\`
    
*   \`originY\`
    
*   \`originZ\`
    

If set as numbers, \`originX\` and \`Y\` default to a progress value between \`0\` and \`1\`. \`originZ\` defaults to pixels.

\`\`\`
<motion.div :style='{ originX: 0.5 }' />
\`\`\`

### CSS variables

Motion for Vue can animate the value of CSS variables, and also use CSS variables as animation targets.

#### Animating CSS variables

Sometimes it's convenient to be able to animate a CSS variable to animate many children:

\`\`\`
<motion.ul
  :initial="{ '--rotate': '0deg' }"
  :animate="{ '--rotate': '360deg' }"
  :transition="{ duration: 2, repeat: Infinity }"
>
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
</motion.ul>
\`\`\`

**Note:** Animating the value of a CSS variable **always triggers paint**, therefore it can be more performant to use \`[MotionValue](/docs/vue-motion-value.md)\`[s](/docs/vue-motion-value.md) to setup this kind of animation.

### CSS variables as animation targets

HTML \`motion\` components accept animation targets with CSS variables:

\`\`\`
<motion.li :animate="{ backgroundColor: 'var(--action-bg)' }" />
\`\`\`

#### SVG line drawing

Line drawing animations can be created with many different SVG elements using three special properties: \`pathLength\`, \`pathSpacing\` and \`pathOffset\`.

\`\`\`
<motion.path :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }" />
\`\`\`

All three are set as a progress value between \`0\` and \`1\`, \`1\` representing the total length of the path.

Path animations are compatible with \`circle\`, \`ellipse\`, \`line\`, \`path\`, \`polygon\`, \`polyline\` and \`rect\` elements.

## Transitions

By default, Motion will create appropriate transitions for snappy animations based on the type of value being animated.

For instance, physical properties like \`x\` or \`scale\` are animated with spring physics, whereas values like \`opacity\` or \`color\` are animated with duration-based easing curves.

However, you can define your own animations via [the](/docs/vue-transitions.md) \`[transition](/docs/vue-transitions.md)\` [prop](/docs/vue-transitions.md).

\`\`\`
<motion.div
  :animate="{ x: 100 }"
  :transition="{ ease: 'easeOut', duration: 2 }"
/>
\`\`\`

## Enter animations

When a \`motion\` component is first created, it'll automatically animate to the values in \`animate\` if they're different from those initially rendered, which you can either do via CSS or via [the](/docs/vue-motion-component.md) \`[initial](/docs/vue-motion-component.md)\` [prop.](/docs/vue-motion-component.md)

\`\`\`
<motion.li
  :initial="{ opacity: 0, scale: 0 }"
  :animate="{ opacity: 1, scale: 1 }"
/>
\`\`\`

You can also disable the enter animation entirely by setting \`:initial="false"\`. This will make the element render with the values defined in \`animate\`.

\`\`\`
<motion.div :initial="false" :animate="{ y: 100 }" />
\`\`\`

## Exit animations

You can also easily animate elements as they exit the DOM.

In Vue, when a component is removed, it's usually removed instantly. Motion provides [the](/docs/vue-animate-presence.md) \`[AnimatePresence](/docs/vue-animate-presence.md)\` [component](/docs/vue-animate-presence.md) which keeps elements in the DOM while they perform an \`exit\` animation.

\`\`\`
<AnimatePresence>
    <motion.div
      v-if="isVisible"
      key="modal"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
    />
</AnimatePresence>
\`\`\`

## Keyframes

Values in \`animate\` can be set as a series of keyframes. This will animate through each value in sequence.

\`\`\`
<motion.div :animate="{ x: [0, 100, 0] }" />
\`\`\`

We can use a value's current state as the initial keyframe by setting it to \`null\`.

\`\`\`
<motion.div :animate="{ x: [null, 100, 0] }" />
\`\`\`

This way, if a keyframe animation is interrupting another animation, the transition will feel more natural.

By default, each keyframe is spaced naturally throughout the animation. You can override this by setting [the](/docs/vue-transitions#times.md) \`[times](/docs/vue-transitions#times.md)\` [option](/docs/vue-transitions#times.md) via \`transition\`.

\`times\` is an array of progress values between \`0\` and \`1\`, defining where in the animation each keyframe should be positioned.

\`\`\`
<motion.circle
  :cx="500"
  :animate="{
    cx: [null, 100, 200],
    transition={{ duration: 3, times: [0, 0.2, 1] }}
  }"
/>
\`\`\`

## Gesture animations

Motion for Vue has shortcut props for animating to/from a target when a gesture starts/ends.

\`\`\`
<motion.button
  :initial="{ opacity: 0 }"
  :whileHover="{ backgroundColor: 'rgba(220, 220, 220, 1)' }"
  :whilePress="{ backgroundColor: 'rgba(255, 255, 255, 1)' }"
  :whileInView="{ opacity: 1 }"
/>
\`\`\`

It supports \`hover\`, \`press\`, \`drag\`, \`focus\` and \`inView\`.

## Variants

Setting \`animate\` as a target is useful for simple, single-element animations. But sometimes we want to orchestrate animations that propagate throughout the DOM. We can do so with variants.

Variants are a set of named targets.

\`\`\`
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
\`\`\`

They're passed to \`motion\` components via the \`variants\` prop:

\`\`\`
<motion.div :variants="variants" />
\`\`\`

These variants can now be referred to by a label, wherever you can define an animation target:

\`\`\`
<motion.div
  :variants="variants"
  initial="hidden"
  animate="visible"
/>
\`\`\`

You can also define multiple variants via an array:

\`\`\`
:animate="['visible', 'danger']"
\`\`\`

### Propagation

This is already useful for reusing and combining animation targets. But it becomes powerful for orchestrating animations throughout trees.

Variants will flow down through \`motion\` components. So in this example when the \`ul\` enters the viewport, all of its children with a "visible" variant will also animate in:

\`\`\`
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

return (
  <motion.ul
    initial="hidden"
    whileInView="visible"
    :variants="list"
  >
    <motion.li :variants="item" />
    <motion.li :variants="item" />
    <motion.li :variants="item" />
  </motion.ul>
)
\`\`\`

### Orchestration

By default, this children animations will start simultaneously with the parent. But with variants we gain access to new \`transition\` props like \`[when](/docs/vue-transitions#orchestration.md)\`[,](/docs/vue-transitions#orchestration.md) \`[delayChildren](/docs/vue-transitions#orchestration.md)\`[,](/docs/vue-transitions#orchestration.md) \`[staggerChildren](/docs/vue-transitions#orchestration.md)\` [and](/docs/vue-transitions#orchestration.md) \`[staggerDirection](/docs/vue-transitions#orchestration.md)\`.

\`\`\`
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3, // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}
\`\`\`

### Dynamic variants

Each variant can be defined as a function that resolves when a variant is made active.

\`\`\`
const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 }
  })
}
\`\`\`

These functions are provided a single argument, which is passed via the \`custom\` prop:

\`\`\`
<motion.div v-for="(item,index) in items" :custom="index" :variants="variants" />
\`\`\`

This way, variants can be resolved differently for each animating element.

## Animation controls

Declarative animations are ideal for most UI interactions. But sometimes we need to take manual control over animation playback.

The \`[useAnimate](/docs/vue-use-animate.md)\` [hook](/docs/vue-use-animate.md) can be used for:

*   Animating any HTML/SVG element (not just \`motion\` components).
    
*   Complex animation sequences.
    
*   Controlling animations with \`time\`, \`speed\`, \`play()\`, \`pause()\` and other playback controls.
    

\`\`\`
<script setup>
  const [scope, animate] = useAnimate()
  watch(scope, () => {
    const controls = animate([
      [scope.current, { x: "100%" }],
      ["li", { opacity: 1 }]
    ])
  
    controls.speed = 0.8
      
    return () => controls.stop()
  })
</script>

<template>
  <ul ref="scope">
    <li />
    <li />
    <li />
  </ul>
</template>
\`\`\`

## Animate content

By passing [a](/docs/vue-motion-value.md) \`[MotionValue](/docs/vue-motion-value.md)\` as value prop to a \`RowValue\` component, it will render its latest value in the HTML.

\`\`\`
<script setup>
  import { useMotionValue, motion, animate, RowValue } from "motion-v"
  import { onMount, onUnmount } from "vue"

  const count = useMotionValue(0)
  let controls
  
  onMount(()=>{
    controls = animate(count, 100, { duration: 5 })
  })

  onUnmount(()=>{
    controls.stop()
  })
</script>

<template>
 <motion.pre><RowValue :value="count"/></motion.pre> 
</template>

\`\`\`

This is more performant than setting Vue state as the \`RowValue\` component will set \`innerHTML\` directly.`
                }
            ]
        };
    });
    // Gesture animation
    server.registerResource("Vue: Gesture animation", docsUri("vue", "gestures"), {
        description: "Power your UI with Motion for Vue's gestures: hover, tap, pan, drag & inView. Use while- props for animations & event listeners for interactive experiences.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "gestures");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Gesture animation

Motion extends Vue's basic set of event listeners with a simple yet powerful set of UI gestures.

The \`motion\` component currently has support for **hover**, **press**, **pan**, **drag** and **inView**.

Each gesture has both a set of event listeners and a \`while-\` animation prop.

## Animation props

\`motion\` components provide multiple gesture animation props: \`whileHover\`, \`whilePress\`, \`whileFocus\`, \`whileDrag\` and \`[whileInView](/docs/vue-scroll-animations.md)\`. These can define animation targets to temporarily animate to while a gesture is active.

\`\`\`
<motion.button
  :whileHover="{
    scale: 1.2,
    transition: { duration: 1 },
  }"
  :whilePress="{ scale: 0.9 }"
/>
\`\`\`

All props can be set either as a target of values to animate to, or the name of any variants defined via the \`variants\` prop. Variants will flow down through children as normal.

\`\`\`
<motion.button
  whilePress="press"
  whileHover="hover"
  :variants="buttonVariants"
>
  <svg>
    <motion.path :variants="iconVariants" />
  </svg>
</motion.button>
\`\`\`

## Gestures

### Hover

The hover gesture detects when a pointer hovers over or leaves a component.

It differs from \`onMouseEnter\` and \`onMouseLeave\` in that hover is guaranteed to only fire as a result of actual mouse events (as opposed to browser-generated mice events emulated from touch input).

\`\`\`
<motion.a
  :whileHover="{ scale: 1.2 }"
  @hoverStart="event => {}"
  @hoverEnd="event => {}"
/>
\`\`\`

### Press

The press gesture detects when the **primary pointer** (like a left click or first touch point) presses down and releases on the same component.

\`\`\`
<motion.button :whilePress="{ scale: 0.9, rotate: 3 }" />
\`\`\`

It will fire a \`press\` event when the tap or click ends on the same component it started on, and a \`pressCancel\` event if the press or click ends outside the component.

If the pressable component is a child of a draggable component, it'll automatically cancel the press gesture if the pointer moves further than 3 pixels during the gesture.

#### Accessibility

Elements with press events are keyboard-accessible.

Any element with a press prop will be able to receive focus and \`Enter\` can be used to trigger press events on focused elements.

*   Pressing \`Enter\` down will trigger \`onPressStart\` and \`whilePress\`
    
*   Releasing \`Enter\` will trigger \`onPress\`
    
*   If the element loses focus before \`Enter\` is released, \`onPressCancel\` will fire.
    

### Pan

The pan gesture recognises when a pointer presses down on a component and moves further than 3 pixels. The pan gesture is ended when the pointer is released.

\`\`\`
<motion.div @pan="(e, pointInfo) => {}" />
\`\`\`

Pan doesn't currently have an associated \`while-\` prop.

**Note:** For pan gestures to work correctly with touch input, the element needs touch scrolling to be disabled on either x/y or both axis with the \`[touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)\` CSS rule.

### Drag

The drag gesture applies pointer movement to the x and/or y axis of the component.

\`\`\`
<motion.div drag :whileDrag="{ scale: 1.2, backgroundColor: '#f00' }" />
\`\`\`

By default, when the drag ends the element will perform an inertia animation with the ending velocity.

This can be disabled by setting \`dragMomentum\` to \`false\`, or changed via the \`dragTransition\` prop.

#### Constraints

It's also possible to set \`dragConstraints\`, either as an object with \`top\`, \`left\`, \`right\`, and \`bottom\` values, measured in pixels.

\`\`\`
<motion.div
  drag="x"
  :dragConstraints="{ left: 0, right: 300 }"
/>
\`\`\`

Or, it can accept an HTMLElement \`ref\` value. You can get the component's DOM ref value using \`useDomRef\` from \`motion-v\`, and pass it both to the draggable component's \`dragConstraints\` prop and the ref of the component you want to use as constraints.

\`\`\`
<script setup>
  import { useDomRef } from "motion-v"
  const constraintsRef = useDomRef()
</script>
<template>
  <motion.div ref="constraintsRef">
      <motion.div drag :dragConstraints="constraintsRef" />
  </motion.div>
</template>
\`\`\`

By default, dragging the element outside the constraints will tug with some elasticity. This can be changed by setting \`dragElastic\` to a value between \`0\` and \`1\`, where \`0\` equals no motion and \`1\` equals full motion outside the constraints.

#### Direction locking

It's possible to lock an element to the first axis it's dragged on by setting \`dragDirectionLock\`.

\`\`\`
<motion.div
  drag
  dragDirectionLock
  @directionLock="callback"
/>
\`\`\`

Each time the drag gesture starts, the direction of pointer travel will be detected and the element will be draggable only on this axis.

### Focus

The focus gesture detects when a component gains or loses focus by the same rules as the [CSS :focus-visible selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible).

Typically, this is when an \`input\` receives focus by any means, and when other elements receive focus by accessible means (like via keyboard navigation).

\`\`\`
<motion.a :whileFocus="{ scale: 1.2 }" href="#" />
\`\`\`

## Event propagation

Children can stop pointer events propagating to parent \`motion\` components using the \`Capture\` Vue props.

For instance, a child can stop drag and tap gestures and their related \`while\` animations from firing on parents by passing \`e.stopPropagation()\` to \`onPointerDownCapture\`.

\`\`\`
<motion.div :whilePress="{ scale: 2 }">
  <button @pointerDownCapture="e => e.stopPropagation()" />
</motion.div>
\`\`\`

## Note: SVG filters

Gestures aren't recognised on SVG \`filter\` components, as these elements don't have a physical presence and therefore don't receive events.

You can instead add \`while-\` props and event handlers to a parent and use variants to animate these elements.

\`\`\`
<template>
    <motion.svg whileHover="hover">
      <filter id="blur">
        <motion.feGaussianBlur
          :stdDeviation="0"
          :variants="{ hover: { stdDeviation: 2 } }"
        />
      </filter>
    </motion.svg>
</template>

\`\`\``
                }
            ]
        };
    });
    // Layout animation
    server.registerResource("Vue: Layout animation", docsUri("vue", "layout-animations"), {
        description: "Animate layouts effortlessly in Vue with Motion's layout prop. Smoothly transition CSS, even between different elements using layoutId. Performant & flexible.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "layout-animations");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Layout animation

Motion's industry-leading layout animations makes it easy to animate between any two layouts, even between different elements.

It's as simple as a \`layout\` prop.

\`\`\`
<motion.div layout />
\`\`\`

This little prop can animate previously unanimatable CSS values, like switching \`justify-content\` between \`flex-start\` and \`flex-end\`.

\`\`\`
<motion.div
  layout
  :style="{ justifyContent: isOn ? 'flex-start' : 'flex-end' }"
/>
\`\`\`

Or by using the \`layoutId\` prop, it's possible to match two elements and animate between them for some truly advanced animations.

\`\`\`
<motion.li layoutId="item" />
\`\`\`

It can handle anything from microinteractions to full page transitions.

## Usage

Any layout change that happens as a result of a Vue re-render can be animated.

\`\`\`
<motion.div layout :style="{ width: isOpen ? '80vw' : 0 }" />
\`\`\`

Note that CSS changes should happen immediately via \`style\`, not \`animate\`, as \`layout\` will take care of the animation.

Layout changes can be anything, changing \`width\`/\`height\`, number of grid columns, reordering a list, or adding/removing new items:

### Shared layout animations

When a new component is added that has a \`layoutId\` prop that matches an existing component, it will automatically animate out from the old component.

\`\`\`
<motion.div v-if="isSelected" layoutId="underline" />
\`\`\`

If the old component is still mounted when the new component enters, they will automatically crossfade from the old to the new.

When removing an element to animate back to its origin layout, \`[AnimatePresence](/docs/vue-animate-presence.md)\` can be used to keep it in the DOM until its exit animation has finished.

\`\`\`
<AnimatePresence>
  <motion.div v-if="isOpen" layoutId="modal" />
</AnimatePresence>
\`\`\`

### Setting a transition

Layout animations can be customised using [the](/docs/vue-transitions.md) \`[transition](/docs/vue-transitions.md)\` [prop](/docs/vue-transitions.md).

\`\`\`
<motion.div layout :transition="{ duration: 0.3 }" />
\`\`\`

If you want to set a transition specifically for **only** the layout animation, you can specify a specific \`layout\` transition.

\`\`\`
<motion.div
  layout
  :animate="{ opacity: 0.5 }"
  :transition="{
    default: { ease: 'linear' },
    layout: { duration: 0.3 }
  }"
/>
\`\`\`

When performing a shared layout animation, the transition defined for element we're animating **to** will be used.

\`\`\`

  <motion.button
    layoutId="modal"
    @click="() => isOn=true"
    // This transition will be used when the modal closes
    :transition="{ type: 'spring' }"
  >
    Open
  </motion.button>
  <AnimatePresence>
      <motion.dialog
        v-if="isOn"
        layoutId="modal"
        // This transition will be used when the modal opens
        :transition="{ duration: 0.3 }"
      />
  </AnimatePresence>

\`\`\`

### Animating within scrollable element

To correctly animate layout within scrollable elements, we need to provide them the \`layoutScroll\` prop.

\`\`\`
<motion.div layoutScroll :style="{ overflow: 'scroll' }" />
\`\`\`

This lets Motion account for the element's scroll offset when measuring children.

### Animating within fixed containers

To correctly animate layout within fixed elements, we need to provide them the \`layoutRoot\` prop.

\`\`\`
<motion.div layoutRoot :style="{ position: 'fixed' }" />
\`\`\`

This lets Motion account for the page's scroll offset when measuring children.

### Group layout animations

Layout animations are triggered when a component re-renders and its layout has changed.

\`\`\`
<script setup>
  const open = ref(false)
</script>

<template>  
    <motion.div
      layout
      :style="{ height: isOpen ? "100px" : "500px" }"
      @click="() => open=!open"
    />
</template>
\`\`\`

But what happens when we have two or more components that don't re-render at the same time, but **do** affect each other's layout?

\`\`\`
<template>
    <Accordion />
    <Accordion />
</template>
\`\`\`

When one re-renders, for performance reasons the other won't be able to detect changes to its layout.

We can synchronise layout changes across multiple components by wrapping them in the \`[LayoutGroup component](/docs/vue-layout-group.md)\`.

\`\`\`
<script setup>
import { LayoutGroup } from "motion-v"
</script>

<template>
    <LayoutGroup>
      <Accordion />
      <Accordion />
    </LayoutGroup>  
</template>

\`\`\`

When layout changes are detected in any grouped \`motion\` component, layout animations will trigger across all of them.

### Scale correction

All layout animations are performed using the \`transform\` style, resulting in smooth framerates.

Animating layout using transforms can sometimes visually distort children. To correct this distortion, the first child elements of the element can also be given \`layout\` property.

Open this sandbox and try removing \`layout\` from the pink dot to see the difference this will make:

Transforms can also distort \`boxShadow\` and \`borderRadius\`. The \`motion\` component will automatically correct this distortion on both props, as long as they're set as motion values.

If you're not animating these values, the easiest way to do this is to set them via \`style\`.

\`\`\`
<motion.div layout :style="{ borderRadius: 20 }" />
\`\`\`

## Troubleshooting

### The component isn't animating

Ensure the component is **not** set to \`display: inline\`, as browsers don't apply \`transform\` to these elements.

Ensure the component is re-rendering when you expect the layout animation to start.

### SVG layout animations are broken

SVG components aren't currently supported with layout animations. SVGs don't have layout systems so it's recommended to directly animate their attributes like \`cx\` etc.

### The content stretches undesirably

This is a natural side-effect of animating \`width\` and \`height\` with \`scale\`.

Often, this can be fixed by providing these elements a \`layout\` animation and they'll be scale-corrected.

\`\`\`
<motion.section layout>
  <motion.img layout />
</motion.section>
\`\`\`

Some elements, like images or text that are changing between different aspect ratios, might be better animated with \`layout="position"\`.

### Border radius or box shadows are behaving strangely

Animating \`scale\` is performant but can distort some styles like \`border-radius\` and \`box-shadow\`.

Motion automatically corrects for scale distortion on these properties, but they must be set on the element via \`style\`.

\`\`\`
<motion.div layout :style="{ borderRadius: '20px' }" />
\`\`\`

### Border looks stretched during animation

Elements with a \`border\` may look stretched during the animation. This is for two reasons:

1.  Because changing \`border\` triggers layout recalculations, it defeats the performance benefits of animating via \`transform\`. You might as well animate \`width\` and \`height\` classically.
    
2.  \`border\` can't render smaller than \`1px\`, which limits the degree of scale correction that Motion can perform on this style.
    

A work around is to replace \`border\` with a parent element with padding that acts as a \`border\`.

\`\`\`
<motion.div layout :style="{ borderRadius: '10px', padding: '5px' }">
  <motion.div layout "style="{ borderRadius: '5px' }" />
</motion.div>
\`\`\`

## Technical reading

Interested in the technical details behind layout animations? Nanda does an incredible job of [explaining the challenges](https://www.nan.fyi/magic-motion) of animating layout with transforms using interactive examples. Matt, creator of Motion, did a [talk at Vercel conference](https://www.youtube.com/watch?v=5-JIu0u42Jc&ab_channel=Vercel) about the implementation details that is largely up to date.

## Differences with the View Transitions API

More browsers are starting to support the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), which is similar to Motion's layout animations.

### Benefits of View Transitions API

The main two benefits of View Transitions is that **it's included in browsers** and **features a unique rendering system**.

#### Filesize

Because the View Transitions API is already included in browsers, it's cheap to implement very simple crossfade animations.

However, the CSS complexity can scale quite quickly. Motion's layout animations are around 12kb but from there it's very cheap to change transitions, add springs, mark matching

#### Rendering

Whereas Motion animates the elements as they exist on the page, View Transitions API does something quite unique in that it takes an image snapshot of the previous page state, and crossfades it with a live view of the new page state.

For shared elements, it does the same thing, taking little image snapshots and then crossfading those with a live view of the element's new state.

This can be leveraged to create interesting effects like full-screen wipes that aren't really in the scope of layout animations. [Framer's Page Effects](https://www.framer.com/academy/lessons/page-effects) were built with the View Transitions API and it also extensively uses layout animations. The right tool for the right job.

### Drawbacks to View Transitions API

There are quite a few drawbacks to the API vs layout animations:

*   **Not interruptible**: Interrupting an animation mid-way will snap the animation to the end before starting the next one. This feels very janky.
    
*   **Blocks interaction**: The animating elements overlay the "real" page underneath and block pointer events. Makes things feel quite sticky.
    
*   **Difficult to manage IDs**: Layout animations allow more than one element with a \`layoutId\` whereas View Transitions will break if the previous element isn't removed.
    
*   **Less performant:** View Transitions take an actual screenshot and animate via \`width\`/\`height\` vs layout animation's \`transform\`. This is measurably less performant when animating many elements.
    
*   **Doesn't account for scroll**: If the page scroll changes during a view transition, elements will incorrectly animate this delta.
    
*   **No relative animations:** If a nested element has a \`delay\` it will get "left behind" when its parent animates away, whereas Motion handles this kind of relative animation.
    
*   **One animation at a time**: View Transitions animate the whole screen, which means combining it with other animations is difficult and other view animations impossible.
    

All-in-all, each system offers something different and each might be a better fit for your needs. In the future it might be that Motion also offers an API based on View Transitions API.`
                }
            ]
        };
    });
    // Scroll animation
    server.registerResource("Vue: Scroll animation", docsUri("vue", "scroll-animations"), {
        description: "Create scroll-triggered or scroll-linked animations with Motion for Vue. Use whileInView for viewport triggers and useScroll to link animations to scroll progress.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "scroll-animations");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Scroll animation

There are two types of scroll animations:

*   **Scroll-triggered:** A normal animation is triggered when an element enters the viewport.
    
*   **Scroll-linked:** Values are linked directly to scroll progress.
    

Motion is capable of both types of animation.

## Scroll-triggered animations

Scroll-triggered animations are just normal animations that fire when an element enters or leaves the viewport.

Motion offers [the](/docs/vue-motion-component#whileinview.md) \`[whileInView](/docs/vue-motion-component#whileinview.md)\` [prop](/docs/vue-motion-component#whileinview.md) to set an animation target or variant when the element enters the view.

\`\`\`
<motion.div
  :initial="{ opacity: 0 }"
  :whileInView="{ opacity: 1 }"
/>
\`\`\`

### One-time animations

With [the](/docs/vue-motion-component#inviewoptions.md) \`[inViewOptions](/docs/vue-motion-component#inviewoptions.md)\` [](/docs/vue-motion-component#inviewoptions.md), it's possible to set \`once: true\` so once an element has entered the viewport, it won't animate back out.

\`\`\`
<motion.div
  initial="hidden"
  whileInView="visible"
  :inViewOptions="{ once: true }"
/>
\`\`\`

### Changing scroll container

By default, the element will be considered within the viewport when it enters/leaves the **window**. This can be changed by providing the \`ref\` of another scrollable element.

\`\`\`
<script setup>
  import { ref } from "vue"
  const scrollRef = ref(null)
</script>

<template>
    <div ref="scrollRef" :style="{ overflow: 'scroll' }">
      <motion.div
        :initial="{ opacity: 0 }"
        :whileInView="{ opacity: 1 }"
        :inViewOptions="{ root: scrollRef }"
      />
    </div>
</template>

\`\`\`

For more configuration options, checkout [the](/docs/vue-motion-component#viewport-1.md) \`[motion](/docs/vue-motion-component#viewport-1.md)\` [component](/docs/vue-motion-component#viewport-1.md) API reference.

### Setting state

It's also possible to set state when any element (not just a \`motion\` component) enters and leaves the viewport with the \`[useInView](/docs/vue-use-in-view.md)\` [hook](/docs/vue-use-in-view.md).

## Scroll-linked animations

Scroll-linked animations are created using [motion values](/docs/vue-motion-value.md) and the \`[useScroll](/docs/vue-use-scroll.md)\` [hook](/docs/vue-use-scroll.md).

\`useScroll\` returns four motion values, two that store scroll offset in pixels (\`scrollX\` and \`scrollY\`) and two that store scroll progress as a value between \`0\` and \`1\`.

These motion values can be passed directly to specific styles. For instance, passing \`scrollYProgress\` to \`scaleX\` works great as a progress bar.

\`\`\`
<script>
import { useScroll } from "motion-v"
const { scrollYProgress } = useScroll();
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />  
</template>

\`\`\`

### Value smoothing

This value can be smoothed by passing it through \`[useSpring](/docs/vue-use-spring.md)\`.

\`\`\`
<script setup>  
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})
</script>

<template>
 <motion.div :style="{ scaleX }" />
</template>
\`\`\`

### Transform other values

With [the](/docs/vue-use-transform.md) \`[useTransform](/docs/vue-use-transform.md)\` [hook](/docs/vue-use-transform.md), it's easy to use the progress motion values to mix between any value, like colors:

\`\`\`
<script setup>  
const backgroundColor = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ["#f00", "#0f0", "#00f"]
)
</script>

<template>
  <motion.div :style="{ backgroundColor }" />
</template>
\`\`\`

### Examples

#### Track element scroll offset

#### Track element within viewport

#### Parallax

#### Scroll velocity and direction

Read the [full](/docs/vue-use-scroll.md) \`[useScroll](/docs/vue-use-scroll.md)\` [docs](/docs/vue-use-scroll.md) to discover more about creating the above effects.`
                }
            ]
        };
    });
    // Transition options
    server.registerResource("Vue: Transition options", docsUri("vue", "transitions"), {
        description: "Define animation behavior with Motion for Vue's transition prop. Choose time-based or physics-based animations. Customize duration, easing, delay, and repeat.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "transitions");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Transition options

A \`transition\` defines the type of animation used when animating between two values.

\`\`\`
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}
\`\`\`

\`\`\`
// Motion component
<motion.div
  :animate="{ x: 100 }"
  :transition="transition"
/>

// animate() function
animate(".box", { x: 100 }, transition)
\`\`\`

## Setting a transition

\`transition\` can be set on any animation prop, and that transition will be used when the animation fires.

\`\`\`
<motion.div
  :whileHover="{
    scale: 1.1,
    transition: { duration: 0.2 }
  }"
/>
\`\`\`

### Value-specific transitions

When animating multiple values, each value can be animated with a different transition, with \`default\` handling all other values:

\`\`\`
// Motion component
<motion.li
  :animate="{
    x: 0,
    opacity: 1,
    transition: {
      default: { type: 'spring' },
      opacity: { ease: 'linear' }
    }
  }"
/>

// animate() function
animate("li", { x: 0, opacity: 1 }, {
  default: { type: "spring" },
  opacity: { ease: "linear" }
})
\`\`\`

### Default transitions

It's possible to set default transitions via the \`transition\` prop. Either for specific \`motion\` components:

\`\`\`
<motion.div
  :animate="{ x: 100 }"
  :transition="{ type: 'spring', stiffness: 100 }"
/>
\`\`\`

Or for a group of \`motion\` components [via](/docs/vue-motion-config#transition.md) \`[MotionConfig](/docs/vue-motion-config#transition.md)\`:

\`\`\`
<MotionConfig :transition="{ duration: 0.4, ease: 'easeInOut' }">
  <App />
</MotionConfig>
\`\`\`

## Transition settings

#### \`type\`

**Default:** Dynamic

\`type\` decides the type of animation to use. It can be \`"tween"\`, \`"spring"\` or \`"inertia"\`.

**Tween** animations are set with a duration and an easing curve.

**Spring** animations are either physics-based or duration-based.

Physics-based spring animations are set via \`stiffness\`, \`damping\` and \`mass\`, and these incorporate the velocity of any existing gestures or animations for natural feedback.

Duration-based spring animations are set via a \`duration\` and \`bounce\`. These don't incorporate velocity but are easier to understand.

**Inertia** animations decelerate a value based on its initial velocity, usually used to implement inertial scrolling.

\`\`\`
<motion.path
  :animate="{ pathLength: 1 }"
  :transition="{ duration: 2, type: 'tween' }"
/>
\`\`\`

#### Spring visualiser

### Tween

#### \`duration\`

**Default:** \`0.3\` (or \`0.8\` if multiple keyframes are defined)

The duration of the animation. Can also be used for \`"spring"\` animations when \`bounce\` is also set.

\`\`\`
animate("ul > li", { opacity: 1 }, { duration: 1 })
\`\`\`

#### \`ease\`

The easing function to use with tween animations. Accepts:

*   Easing function name. E.g \`"linear"\`
    
*   An array of four numbers to define a cubic bezier curve. E.g \`[.17,.67,.83,.67]\`
    
*   A [JavaScript easing function](/docs/easing-functions.md), that accepts and returns a value \`0\`\\-\`1\`.
    

These are the available easing function names:

*   \`"linear"\`
    
*   \`"easeIn"\`, \`"easeOut"\`, \`"easeInOut"\`
    
*   \`"circIn"\`, \`"circOut"\`, \`"circInOut"\`
    
*   \`"backIn"\`, \`"backOut"\`, \`"backInOut"\`
    
*   \`"anticipate"\`
    

When animating keyframes, \`ease\` can optionally be set as an array of easing functions to set different easings between each value:

\`\`\`
<motion.div
  :animate="{
    x: [0, 100, 0],
    transition: { ease: ['easeIn', 'easeOut'] }
  }"
/>
\`\`\`

For immediate visual feedback, you can edit CSS or Motion easing curves directly in your code editor with the [Motion extension](/docs/studio-install.md).

#### \`times\`

When animating multiple keyframes, \`times\` can be used to adjust the position of each keyframe throughout the animation.

Each value in \`times\` is a value between \`0\` and \`1\`, representing the start and end of the animation.

\`\`\`
<motion.div
  :animate="{
    x: [0, 100, 0],
    transition: { times: [0, 0.3, 1] }
  }"
/>
\`\`\`

There must be the same number of \`times\` as there are keyframes. Defaults to an array of evenly-spread durations.

### Spring

#### \`bounce\`

**Default:** \`0.25\`

\`bounce\` determines the "bounciness" of a spring animation.

\`0\` is no bounce, and \`1\` is extremely bouncy.

**Note:** \`bounce\` and \`duration\` will be overridden if \`stiffness\`, \`damping\` or \`mass\` are set.

\`\`\`
<motion.div
  :animate="{ rotateX: 90 }"
  :transition="{ type: 'spring', bounce: 0.25 }"
/>
\`\`\`

#### \`visualDuration\`

If \`visualDuration\` is set, this will override \`duration\`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

\`\`\`
<motion.div
  :animate="{ rotateX: 90 }"
  :transition="{
    type: 'spring',
    visualDuration: 0.5,
    bounce: 0.25
  }"
/>
\`\`\`

#### \`damping\`

**Default:** \`10\`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

\`\`\`
<motion.a
  :animate="{ rotate: 180 }"
  :transition="{ type: 'spring', damping: 300 }"
/>
\`\`\`

#### \`mass\`

**Default:** \`1\`

Mass of the moving object. Higher values will result in more lethargic movement.

\`\`\`
<motion.feTurbulence
  :animate="{ baseFrequency: 0.5 }"
  :transition="{ type: 'spring', mass: 0.5 }"
/>
\`\`\`

#### \`stiffness\`

**Default:** \`1\`

Stiffness of the spring. Higher values will create more sudden movement.

\`\`\`
<motion.section
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', stiffness: 50 }}
/>
\`\`\`

> _I never really understood how_ \`_damping_\`_,_ \`_mass_\` _and_ \`_stiffness_\` _influence a spring animation, so I made a_ [_tool for myself_](https://emilkowal.ski/ui/great-animations#great-animations-feel-natural) _to visualise it._~ Emil Kowalski, [Animations on the Web](https://animations.dev/)

#### \`velocity\`

**Default:** Current value velocity

The initial velocity of the spring.

\`\`\`
<motion.div
  :animate="{ rotate: 180 }"
  :transition="{ type: 'spring', velocity: 2 }"
/>
\`\`\`

#### \`restSpeed\`

**Default:** \`0.1\`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than \`restDelta\`.

\`\`\`
<motion.div
  :animate="{ rotate: 180 }"
  :transition="{ type: 'spring', restSpeed: 0.5 }"
/>
\`\`\`

#### \`restDelta\`

**Default:** \`0.01\`

End animation if distance is below this value and speed is below \`restSpeed\`. When animation ends, the spring will end.

\`\`\`
<motion.div
  :animate="{ rotate: 180 }"
  :transition="{ type: 'spring', restDelta: 0.5 }"
/>
\`\`\`

### Inertia

An animation that decelerates a value based on its initial velocity. Optionally, \`min\` and \`max\` boundaries can be defined, and inertia will snap to these with a spring animation.

This animation will automatically precalculate a target value, which can be modified with the \`modifyTarget\` property.

This allows you to add snap-to-grid or similar functionality.

Inertia is also the animation used for \`dragTransition\`, and can be configured via that prop.

#### \`power\`

**Default:** \`0.8\`

A higher power value equals a further calculated target.

\`\`\`
<motion.div
  drag
  :dragTransition="{ power: 0.2 }"
/>
\`\`\`

#### \`timeConstant\`

**Default:** \`**700**\`

Adjusting the time constant will change the duration of the deceleration, thereby affecting its feel.

\`\`\`
<motion.div
  drag
  :dragTransition="{ timeConstant: 200 }"
/>
\`\`\`

#### \`modifyTarget\`

A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.

\`\`\`
<motion.div
  drag
  // dragTransition always type: inertia
  :dragTransition="{
    power: 0,
    // Snap calculated target to nearest 50 pixels
    modifyTarget: target => Math.round(target / 50) * 50
  }"
/>
\`\`\`

#### \`min\`

Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).

\`\`\`
<motion.div
  drag
  :dragTransition="{ min: 0, max: 100 }"
/>
\`\`\`

#### \`max\`

Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).

\`\`\`
<motion.div
  drag
  :dragTransition="{ min: 0, max: 100 }"
/>
\`\`\`

#### \`bounceStiffness\`

**Default:** \`500\`

If \`min\` or \`max\` is set, this affects the stiffness of the bounce spring. Higher values will create more sudden movement.

\`\`\`
<motion.div
  drag
  :dragTransition="{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }"
/>
\`\`\`

#### \`bounceDamping\`

**Default:** \`10\`

If \`min\` or \`max\` is set, this affects the damping of the bounce spring. If set to \`0\`, spring will oscillate indefinitely.

\`\`\`
<motion.div
  drag
  :dragTransition="{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }"
/>
\`\`\`

### Orchestration

#### \`delay\`

**Default:** \`0\`

Delay the animation by this duration (in seconds).

\`\`\`
animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
\`\`\`

By setting \`delay\` to a negative value, the animation will start that long into the animation. For instance to start 1 second in, \`delay\` can be set to -\`1\`.

#### \`repeat\`

**Default:** \`0\`

The number of times to repeat the transition. Set to \`Infinity\` for perpetual animation.

\`\`\`
<motion.div
  :animate="{ rotate: 180 }"
  :transition="{ repeat: Infinity, duration: 2 }"
/>
\`\`\`

#### \`repeatType\`

**Default:** \`"loop"\`

How to repeat the animation. This can be either:

*   \`loop\`: Repeats the animation from the start.
    
*   \`reverse\`: Alternates between forward and backwards playback.
    
*   \`mirror\`: Switches animation origin and target on each iteration.
    

\`\`\`
<motion.div
  :animate="{ rotate: 180 }"
  :transition="{
    repeat: 1,
    repeatType: 'reverse',
    duration: 2
  }"
/>
\`\`\`

#### \`repeatDelay\`

**Default:** \`0\`

When repeating an animation, \`repeatDelay\` will set the duration of the time to wait, in seconds, between each repetition.

\`\`\`
<motion.div
  :animate="{ rotate: 180 }"
  :transition="{ repeat: Infinity, repeatDelay: 1 }"
/>
\`\`\`

#### \`when\`

**Default:** \`false\`

With variants, describes when an animation should trigger, relative to that of its children.

*   \`"beforeChildren"\`: Children animations will play after the parent animation finishes.
    
*   \`"afterChildren"\`: Parent animations will play after the children animations finish.
    

\`\`\`
<script setup>
const list = {
  hidden: {
    opacity: 0,
    transition: { when: "afterChildren" }
  }
}

const item = {
  hidden: {
    opacity: 0,
    transition: { duration: 2 }
  }
}
</script>

<template>
  <motion.ul :variants="list" animate="hidden">
    <motion.li :variants="item" />
    <motion.li :variants="item" />
  </motion.ul>
</template>
 
\`\`\`

#### \`delayChildren\`

**Default:** \`0\`

With variants, setting \`delayChildren\` on a parent will delay child animations by this duration (in seconds).

\`\`\`
<sctipt setup>  
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}
</sctipt>

<template> 
  <motion.ul
    :variants="container"
    initial="hidden"
    animate="show"
  >
    <motion.li :variants="item" />
    <motion.li :variants="item"/>
  </motion.ul>
</template>
\`\`\`

Using the \`[stagger](/docs/stagger.md)\` function, we can stagger the delay across children.

\`\`\`
const transition = {
  delayChildren: stagger(0.1)
}
\`\`\`

By default, delay will stagger across children from first to last. By using \`stagger\`'s \`from\` option, we can stagger from the last child, the center, or a specific index.

\`\`\`
const transition = {
  delayChildren: stagger(0.1, { from: "last" })
}
\`\`\``
                }
            ]
        };
    });
    // Motion component
    server.registerResource("Vue: Motion component", docsUri("vue", "motion-component"), {
        description: "Drive animations in Motion for Vue with motion components. Supercharge HTML/SVG for 120fps animations & gestures. High-performance, SSR-compatible & customizable.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "motion-component");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion component

The \`motion\` component drives most animations in Motion for Vue.

There's a \`motion\` component for every HTML and SVG element, for instance \`motion.div\`, \`motion.circle\` etc. Think of it as a normal Vue component, supercharged for 120fps animation and gestures.

## Usage

Import \`motion\` from \`motion-v\`:

\`\`\`
import { motion } from "motion-v"
\`\`\`

Now you can use it exactly as you would any normal HTML/SVG component:

\`\`\`
<motion.div class="box" />
\`\`\`

But you also gain access to powerful animation APIs like the \`animate\`, \`layout\`, \`whileInView\` props and much more.

\`\`\`
<motion.div
  class="box"
  // Animate when this value changes:
  :animate="{ scale: 2 }"
  // Fade in when the element enters the viewport:
  :whileInView="{ opacity: 1 }"
  // Animate the component when its layout changes:
  layout
  // Style now supports indepedent transforms:
  :style="{ x: 100 }"
/>
\`\`\`

Check out the [Animation guide](/docs/vue-animation.md) for a full overview on animations in Motion for Vue.

### Custom components

Any Vue component can be supercharged into a \`motion\` component by passing it to \`motion.create()\` as a function.

\`\`\`
const MotionComponent = motion.create(Component)
\`\`\`

**Important:** Make sure **not** to call \`motion.create()\` within template! This will make a new component every render, breaking your animations.

It's also possible to pass strings to \`motion.create\`, which will create custom DOM elements.

\`\`\`
// Will render <custom-element /> into HTML
const MotionComponent = motion.create('custom-element')
\`\`\`

By default, all \`motion\` props (like \`animate\` etc) are filtered out of the \`props\` forwarded to the provided component. By providing a \`forwardMotionProps\` config, the provided component will receive these props.

\`\`\`
motion.create(Component, { forwardMotionProps: true })
\`\`\`

### Motion Primitive

For those familiar with Radix UI Primitives, Motion provides a similar primitive pattern through the \`<Motion />\` component.

Change the rendered element via the \`as\` prop:

\`\`\`
<script setup>
import { Motion } from "motion-v"
</script>
<template>
  <Motion as="button">
    Click me
  </Motion>
</template>
\`\`\`

Use the child as the rendered element:

\`\`\`
<script setup>
import { Motion } from "motion-v"
</script>
<template>
  <Motion as-child>
    <button>Click me</button>
  </Motion>
</template>
\`\`\`

### Performance

\`motion\` components animate values outside the Vue render cycle for improved performance.

Using [motion values](/docs/vue-motion-value.md) instead of Vue state to update \`style\` will also avoid re-renders.

\`\`\`
<script setup>
  import { useMotionValue } from "motion-v"
  
  const x = useMotionValue(0)
  let timeout;
  
  onMounted(() => {
    // Won't trigger a re-render!
    timeout = setTimeout(() => x.set(100), 1000)
  })
  
  onUnMounted(()=>{
    clearTimeout(timeout)
  })
</script>

<template>  
   <motion.div :style="{ x }" />
</template>
\`\`\`

### Server-side rendering

\`motion\` components are fully compatible with server-side rendering, meaning the initial state of the component will be reflected in the server-generated output.

\`\`\`
// Server will output \`translateX(100px)\`
<motion.div :initial="false" :animate="{ x: 100 }" />
\`\`\`

This is with the exception of some SVG attributes like \`transform\` which require DOM measurements to calculate.

## Props

\`motion\` components accept the following props.

### Animation

#### \`initial\`

The initial visual state of the \`motion\` component.

This can be set as an animation target:

\`\`\`
<motion.section :initial="{ opacity: 0, x: 0 }" />
\`\`\`

Variants:

\`\`\`
<motion.li initial="visible" />
\`\`\`

\`\`\`
<motion.div :initial="['visible', 'active']" />
\`\`\`

Or set as \`false\` to disable the enter animation and initially render as the values found in \`animate\`.

\`\`\`
<motion.div :initial="false" :animate="{ opacity: 0 }" />
\`\`\`

#### \`animate\`

A target to animate to on enter, and on update.

Can be set as an animation target:

\`\`\`
<motion.div
  :initial="{ boxShadow: '0px 0px #000' }"
  :animate="{ boxShadow: '10px 10px #000' }"
/>
\`\`\`

Or variants:

\`\`\`
<motion.li animate="visible" />
\`\`\`

\`\`\`
<motion.div initial="hidden" :animate="['visible', 'active']" />
\`\`\`

#### \`exit\`

A target to animate to when a component is removed from the tree. Can be set either as an animation target, or variant.

**Note:** Owing to Vue Transition component limitations, the component being removed **must** be a **direct child** of \`[AnimatePresence](/docs/vue-animate-presence.md)\` to enable this animation.

\`\`\`
<AnimatePresence>
    <ul v-if="isVisible"  key="list">
      <motion.li :exit="{ opacity: 0 }" />
    </ul>
</AnimatePresence>
\`\`\`

#### \`transition\`

The default transition for this component to use when an animation prop (\`animate\`, \`whileHover\` etc) has no \`transition\` defined.

\`\`\`
<motion.div :transition="{ type: 'spring' }" :animate="{ scale: 1.2 }" />
\`\`\`

#### \`variants\`

The [variants](/docs/vue-animation#variants.md) for this component.

\`\`\`
<script setup>
  const variants = {
    active: {
        backgroundColor: "#f00"
    },
    inactive: {
      backgroundColor: "#fff",
      transition: { duration: 2 }
    }
  }
</script>

<template>  
  <motion.div
    :variants="variants"
    :animate="isActive ? 'active' : 'inactive'"
  />
</template>

\`\`\`

#### \`style\`

The normal Vue DOM \`style\` prop, with added support for [motion values](/docs/vue-motion-value.md) and independent transforms.

\`\`\`
<script setup>
  const x = useMotionValue(30)
</script>

<tempalte>
  <motion.div :style="{ x, rotate: 90, originX: 0.5 }" />
</tempalte>
\`\`\`

#### \`onUpdate\`

Callback triggered every frame any value on the \`motion\` component updates. It's provided a single argument with the latest values.

\`\`\`
<motion.article
  :animate="{ opacity: 1 }"
  :@update="latest => console.log(latest.opacity)"
/>
\`\`\`

#### \`onAnimationStart\`

Callback triggered when any animation (except layout animations, see \`onLayoutAnimationStart\`) starts.

It's provided a single argument, with the target or variant name of the started animation.

\`\`\`
<motion.circle
  :animate="{ r: 10 }"
  @animationStart="latest => console.log(latest.r)"
/>
\`\`\`

#### \`onAnimationComplete\`

Callback triggered when any animation (except layout animations, see \`onLayoutAnimationComplete\`) completes.

It's provided a single argument, with the target or variant name of the completed animation.

\`\`\`
<motion.circle
  :animate="{ r: 10 }"
  @animationComplete="latest => console.log(latest.r)"
/>
\`\`\`

### Hover

#### \`whileHover\`

Target or variants to label to while the hover gesture is active.

\`\`\`
<!-- As target -->
<motion.button :whileHover="{ scale: 1.2 }" />
\`\`\`

\`\`\`
<!-- As variants -->
<motion.div whileHover="hovered" />
\`\`\`

#### \`onHoverStart\`

Callback function that fires when a pointer starts hovering over the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div @hoverStart="(event) => console.log(event)" />
\`\`\`

#### \`onHoverEnd\`

Callback function that fires when a pointer stops hovering over the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div @hoverEnd="(event) => console.log(event)" />
\`\`\`

### Press

#### \`whilePress\`

Target or variants to label to while the press gesture is active.

\`\`\`
<!-- // As target -->
<motion.button :whilePress="{ scale: 0.9 }" />
\`\`\`

\`\`\`
<!-- // As variants -->
<motion.div whilePress="tapped" />
\`\`\`

#### \`onPressStart\`

Callback function that fires when a pointer starts pressing the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div @pressStart="(event) => console.log(event)" />
\`\`\`

#### \`onPress\`

Callback function that fires when a pointer stops pressing the component and the pointer was released **inside** the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div @press="(event) => console.log(event)" />
\`\`\`

#### \`onPressCancel\`

Callback function that fires when a pointer stops pressing the component and the pointer was released **outside** the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div @pressCancel="(event) => console.log(event)" />
\`\`\`

### Focus

#### \`whileFocus\`

Target or variants to label to while the focus gesture is active.

\`\`\`
<!-- As target -->
<motion.button :whileFocus="{ outline: 'dashed #000' }" />
\`\`\`

\`\`\`
 <!-- As variants -->
<motion.div whileFocus="focused" />
\`\`\`

### Pan

#### \`onPan\`

Callback function that fires when the pan gesture is recognised on this element.

**Note:** For pan gestures to work correctly with touch input, the element needs touch scrolling to be disabled on either x/y or both axis with the \`[touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)\` CSS rule.

\`\`\`
function onPan(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div @pan="onPan" />
\`\`\`

Pan and drag events are provided the origin \`PointerEvent\` as well as an object \`info\` that contains \`x\` and \`y\` point values for the following:

*   \`point\`: Relative to the device or page.
    
*   \`delta\`: Distance since the last event.
    
*   \`offset\`: Distance from the original event.
    
*   \`velocity\`: Current velocity of the pointer.
    

#### \`onPanStart\`

Callback function that fires when a pan gesture starts. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div @panStart="(event, info) => console.log(info.delta.x)" />
\`\`\`

#### \`onPanEnd\`

Callback function that fires when a pan gesture ends. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div @panEnd="(event, info) => console.log(info.delta.x)" />
\`\`\`

### Drag

#### \`drag\`

**Default:** \`false\`

Enable dragging for this element. Set \`true\` to drag in both directions. Set \`"x"\` or \`"y"\` to only drag in a specific direction.

\`\`\`
<motion.div drag />
\`\`\`

#### \`whileDrag\`

Target or variants to label to while the drag gesture is active.

\`\`\`
<!-- // As target -->
<motion.div drag :whileDrag="{ scale: 0.9 }" />
\`\`\`

\`\`\`
<!-- // As variants -->
<motion.div drag whileDrag="dragging" />
\`\`\`

#### \`dragConstraints\`

Applies constraints on the draggable area.

Set as an object of optional \`top\`, \`left\`, \`right\`, and \`bottom\` values, measured in pixels:

\`\`\`
<motion.div
  drag="x"
  :dragConstraints="{ left: 0, right: 300 }"
/>
\`\`\`

Or as a \`ref\` to another element to use its bounding box as the draggable constraints:

\`\`\`
<script setup>
  import { useDomRef } from "motion-v"
  const constraintsRef = useDomRef()
</script>
<template>
  <motion.div ref="constraintsRef">
    <motion.div drag :dragConstraints="constraintsRef" />
  </motion.div>
</template>

\`\`\`

#### \`dragSnapToOrigin\`

**Default:** \`false\`

If \`true\`, the draggable element will animate back to its center/origin when released.

\`\`\`
<motion.div drag dragSnapToOrigin />
\`\`\`

#### \`dragElastic\`

**Default:** \`0.5\`

The degree of movement allowed outside constraints. \`0\` = no movement, \`1\` = full movement.

Set to \`0.5\` by default. Can also be set as \`false\` to disable movement.

By passing an object of \`top\`/\`right\`/\`bottom\`/\`left\`, individual values can be set per constraint. Any missing values will be set to \`0\`.

\`\`\`
<motion.div
  drag
  :dragConstraints="{ left: 0, right: 300 }"
  :dragElastic="0.2"
/>
\`\`\`

#### \`dragMomentum\`

**Default:** \`true\`

Apply momentum from the pan gesture to the component when dragging finishes. Set to \`true\` by default.

\`\`\`
<motion.div
  drag
  :dragConstraints="{ left: 0, right: 300 }"
  :dragMomentum="false"
/>
\`\`\`

#### \`dragTransition\`

Allows you to change dragging momentum transition. When releasing a draggable element, an animation with type \`"inertia"\` starts. The animation is based on your dragging velocity. This property allows you to customize it.

\`\`\`
<motion.div
  drag
  :dragTransition="{ bounceStiffness: 600, bounceDamping: 10 }"
/>
\`\`\`

#### \`dragDirectionLock\`

**Default:** \`false\`

Locks drag direction into the soonest detected direction. For example, if the component is moved more on the \`x\` axis than \`y\` axis before the drag gesture kicks in, it will **only** drag on the \`x\` axis for the remainder of the gesture.

\`\`\`
<motion.div drag dragDirectionLock />
\`\`\`

#### \`dragPropagation\`

**Default:** \`false\`

Allows drag gesture propagation to child components.

\`\`\`
<motion.div drag="x" dragPropagation />
\`\`\`

#### \`dragControls\`

Usually, dragging is initiated by pressing down on a component and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we might want to initiate dragging from a different component than the draggable one.

By creating a \`dragControls\` using the \`[useDragControls](/docs/vue-use-drag-controls.md)\` [hook](/docs/vue-use-drag-controls.md), we can pass this into the draggable component's \`dragControls\` prop. It exposes a \`start\` method that can start dragging from pointer events on other components.

\`\`\`
<script setup>
  const dragControls = useDragControls()
  
  function startDrag(event) {
    dragControls.start(event, { snapToCursor: true })
  }
</script>

<template>
  <div @pointerDown="startDrag" />
  <motion.div drag="x" :dragControls="dragControls" />
</template>

\`\`\`

**Note:** Given that by setting \`dragControls\` you are taking control of initiating the drag gesture, it is possible to disable the draggable element as the initiator by setting \`:dragListener="false"\`.

#### \`dragListener\`

Determines whether to trigger the drag gesture from event listeners. If passing \`dragControls\`, setting this to \`false\` will ensure dragging can only be initiated by the controls, rather than a \`pointerdown\` event on the draggable element.

#### \`onDrag\`

Callback function that fires when the drag gesture is recognised on this element.

\`\`\`
function onDrag(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div drag @drag="onDrag" />
\`\`\`

Pan and drag events are provided the origin \`PointerEvent\` as well as an object \`info\` that contains \`x\` and \`y\` point values for the following:

*   \`point\`: Relative to the device or page.
    
*   \`delta\`: Distance since the last event.
    
*   \`offset\`: Distance from the original event.
    
*   \`velocity\`: Current velocity of the pointer.
    

#### \`onDragStart\`

Callback function that fires when a drag gesture starts. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div drag @dragStart="(event, info) => console.log(info.delta.x)" />
\`\`\`

#### \`onDragEnd\`

Callback function that fires when a drag gesture ends. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div drag @dragEnd="(event, info) => console.log(info.delta.x)" />
\`\`\`

#### \`onDirectionLock\`

Callback function that fires a drag direction is determined.

\`\`\`
<motion.div
  drag
  dragDirectionLock
  @directionLock="axis => console.log(axis)"
/>
\`\`\`

### Viewport

#### \`whileInView\`

Target or variants to label to while the element is in view.

\`\`\`
<!-- As target -->
<motion.div :whileInView="{ opacity: 1 }" />
\`\`\`

\`\`\`
// As variants
<motion.div whileInView="visible" />
\`\`\`

#### \`inViewOptions\`

Options to define how the element is tracked within the viewport.

\`\`\`
<motion.section
  :whileInView="{ opacity: 1 }"
  :inViewOptions="{ once: true }"
/>
\`\`\`

Available options:

*   \`once\`: If \`true\`, once element enters the viewport it won't detect subsequent leave/enter events.
    
*   \`root\`: The \`ref\` of an ancestor scrollable element to detect intersections with (instead of \`window\`).
    
*   \`margin\`: A margin to add to the viewport to change the detection area. Defaults to \`"0px"\`. Use multiple values to adjust top/right/bottom/left, e.g. \`"0px -20px 0px 100px"\`.
    
*   \`amount\`: The amount of an element that should enter the viewport to be considered "entered". Either \`"some"\`, \`"all"\` or a number between \`0\` and \`1\`. Defaults to \`"some"\`.
    

#### \`onViewportEnter\`

Callback function that fires when an element enters the viewport. Provided the \`[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)\` with details of the intersection event.

\`\`\`
<motion.div @viewportEnter="(entry) => console.log(entry.isIntersecting)" />
\`\`\`

#### \`onViewportLeave\`

Callback function that fires when an element enters the viewport. Provided the \`[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)\` with details of the intersection event.

\`\`\`
<motion.div @viewportLeave="(entry) => console.log(entry.intersectionRect)" />
\`\`\`

### Layout

#### \`layout\`

**Default:** \`false\`

If \`true\`, this component will [animate changes to its layout](/docs/vue-layout-animations.md).

\`\`\`
<motion.div layout />
\`\`\`

If set to \`"position"\` or \`"size"\`, only its position or size will animate, respectively.

\`\`\`
<motion.img layout="position" />
\`\`\`

#### \`layoutId\`

If set, this component will animate changes to its layout. Additionally, when a new element enters the DOM and an element already exists with a matching \`layoutId\`, it will animate out from the previous element's size/position.

\`\`\`
 <motion.li v-for="item in items" layout>
    {{item.name}}
    <motion.div v-if="item.isSelected" layoutId="underline" />
 </motion.li>
\`\`\`

If the previous component remains in the tree, the two elements will crossfade.

#### \`layoutDependency\`

By default, layout changes are detected every render. To reduce measurements and thus improve performance, you can pass a \`layoutDependency\` prop. Measurements will only occur when this value changes.

\`\`\`
<motion.nav layout :layoutDependency="isOpen" />
\`\`\`

#### \`layoutScroll\`

For layout animations to work correctly within scrollable elements, their scroll offset needs measuring. For performance reasons, \`Motion\` doesn't measure the scroll offset of every ancestor. Add the \`layoutScroll\` prop to elements that should be measured.

\`\`\`
<motion.div layoutScroll style="{ overflow: 'scroll' }">
  <motion.div layout />
</motion.div>
\`\`\`

#### \`layoutRoot\`

For layout animations to work correctly within \`position: fixed\` elements, we need to account for page scroll. Add \`layoutRoot\` to mark an element as \`position: fixed\`.

\`\`\`
<motion.div layoutRoot :style="{ position: 'fixed' }">
  <motion.div layout />
</motion.div>
\`\`\`

#### \`onLayoutAnimationStart\`

A callback to run when a layout animation starts.

#### \`onLayoutAnimationComplete\`

A callback to run when a layout animation completes.

### Advanced

#### \`inherit\`

Set to \`false\` to prevent a component inheriting or propagating changes in a parent variant.

#### \`custom\`

Custom data to pass through to dynamic variants.

\`\`\`
<script setup>  
  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }
</script>

<template>
  <motion.ul animate="visible">
    <motion.li :custom="0" :variants="variants" />
    <motion.li :custom="1" :variants="variants" />
    <motion.li :custom="2" :variants="variants" />
  </motion.ul>
</template>
\`\`\`

#### \`transformTemplate\`

By default, transforms are applied in order of \`translate\`, \`scale\`, \`rotate\` and \`skew\`.

To change this, \`transformTemplate\` can be set as a function that accepts the latest transforms and the generated transform string and returns a new transform string.

\`\`\`
<!-- // Use the latest transform values -->
<motion.div
  :style="{ x: 0, rotate: 180 }"
  :transformTemplate="({ x, rotate }) => \`rotate(\${rotate}deg) translateX(\${x}px)\`"
/>
\`\`\`

\`\`\`
<!-- // Or the generated transform string -->
<motion.div
  :style="{ x: 0, rotate: 180 }"
  :transformTemplate="(latest, generated) => \`translate(-50%, -50%) \${generated}\`"
/>
\`\`\``
                }
            ]
        };
    });
    // AnimatePresence
    server.registerResource("Vue: AnimatePresence", docsUri("vue", "animate-presence"), {
        description: "Enable effortless exit animations in Vue with AnimatePresence. It animates components on removal via the exit prop.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "animate-presence");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# AnimatePresence

\`AnimatePresence\` makes exit animations easy. By wrapping one or more \`[motion](/docs/vue-motion-component.md)\` [components](/docs/vue-motion-component.md) with \`AnimatePresence\`, we gain access to the \`exit\` animation prop.

\`\`\`
<AnimatePresence>
  <motion.div v-if="show" key="modal" :exit="{ opacity: 0 }" />}
</AnimatePresence>
\`\`\`

## Usage

### Import

\`\`\`
import { AnimatePresence } from "motion-v"
\`\`\`

### Exit animations

\`AnimatePresence\` works by detecting when its **direct children** are removed from the Vue tree.

This can be due to a component mounting/remounting:

\`\`\`
<AnimatePresence>
  <Modal v-if="show" key="modal" />
</AnimatePresence>
\`\`\`

or using \`v-show\`:

\`\`\`
<AnimatePresence>
  <Modal v-show="show" key="modal" />
</AnimatePresence>
\`\`\`

Or Its \`key\` changing:

\`\`\`
<AnimatePresence>
  <Slide :key="activeItem.id" />
</AnimatePresence>
\`\`\`

Or when children in a list are added/removed:

\`\`\`
<AnimatePresence>
    <motion.li 
      v-for="item in items" 
      :key="item.id" 
      :exit="{ opacity: 1 }" layout
    />
</AnimatePresence>
\`\`\`

Any \`motion\` components within the exiting component will fire animations defined on their \`exit\` props before the component is removed from the DOM.

\`\`\`
<template>
  <motion.div :exit="{ opacity: 0 }">
    <img :src="img.src" />
    <motion.p :exit="{ y: 10 }">{{description}}</motion.p>
  </motion.div>
</template>
\`\`\`

**Note:** Direct children must each have a unique \`key\` prop so \`AnimatePresence\` can track their presence in the tree.

Like \`initial\` and \`animate\`, \`exit\` can be defined either as an object of values, or as a variant label.

\`\`\`
<script setup>  
  const modalVariants = {
    visible: { opacity: 1, transition: { when: "beforeChildren" } },
    hidden: { opacity: 0, transition: { when: "afterChildren" } }
  }
</script>

<template>
    <motion.div 
      :variants="modalVariants"
      initial="hidden" animate="visible" exit="hidden"
    >
      {{children}}
    </motion.div>
</template>
\`\`\`

### Changing \`key\`

Changing a \`key\` prop makes Vue create an entirely new component. So by changing the \`key\` of a single child of \`AnimatePresence\`, we can easily make components like slideshows.

\`\`\`
<template>
  <AnimatePresence>
    <motion.img
      :key="image.src"
      :src="image.src"
      :initial="{ x: 300, opacity: 0 }"
      :animate="{ x: 0, opacity: 1 }"
      :exit="{ x: -300, opacity: 0 }"
    />
  </AnimatePresence>
</template>
\`\`\`

## Props

### \`initial\`

By passing \`:initial="false"\`, \`AnimatePresence\` will disable any initial animations on children that are present when the component is first rendered.

\`\`\`
<AnimatePresence :initial="false">
  <Slide :key="activeItem.id" />
</AnimatePresence>
\`\`\`

### \`custom\`

When a component is removed, there's no longer a chance to update its props (because it's no longer in the Vue tree). Therefore we can't update its exit animation with the same render that removed the component.

By passing a value through \`AnimatePresence\`'s \`custom\` prop, we can use dynamic variants to change the \`exit\` animation.

\`\`\`
<script setup>
  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === 1 ? -300 : 300
    }),
    visible: { opacity: 1, x: 0 }
  }
</script>

<template> 
  <AnimatePresence :custom="direction">
    <motion.img
      :key="image.src"
      :src="image.src"
      :variants="variants"
      initial="hidden"
      animate="visible"
      exit="hidden"
    />
  </AnimatePresence>
</template>
\`\`\`

### \`mode\`

**Default:** \`"sync"\`

Decides how \`AnimatePresence\` handles entering and exiting children.

*   \`"sync"\`: Children animate in/out as soon as they're added/removed.
    
*   \`"wait"\`: The entering child will wait until the exiting child has animated out. **Note:** Currently only renders a single child at a time.
    
*   \`"popLayout"\`: Exiting children will be "popped" out of the page layout. This allows surrounding elements to move to their new layout immediately.
    

### \`onExitComplete\`

Fires when all exiting nodes have completed animating out.

## Troubleshooting

### Exit animations aren't working

Ensure all **immediate** children get a unique \`key\` prop that **remains the same for that component every render**.

For instance, providing \`index\` as a \`key\` is **bad** because if the items reorder then the \`index\` will not be matched to the \`item\`:

\`\`\`
<AnimatePresence>
  <Component v-for="(item,index) in items" :key="index" />
</AnimatePresence>
\`\`\`

It's preferred to pass something that's unique to that item, for instance an ID:

\`\`\`
<AnimatePresence>
  <Componen v-for="(item,index) in items" :key="item.id" />
</AnimatePresence>
\`\`\`

Also make sure \`AnimatePresence\` is **outside** of the code that unmounts the element. If \`AnimatePresence\` itself unmounts, then it can't control exit animations!

For example, this will **not work**:

\`\`\`
<AnimatePresence v-if="isVisible">
  <Component />
</AnimatePresence>
\`\`\`

Instead, the conditional should be at the root of \`AnimatePresence\`:

\`\`\`
<AnimatePresence>
  <Component v-if="isVisible" />
</AnimatePresence>
\`\`\`

### Layout animations not working with \`mode="sync"\`

When mixing layout and exit animations, it might be necessary to wrap the group in \`[LayoutGroup](/docs/vue-layout-group.md)\` to ensure that components outside of \`AnimatePresence\` know when to perform a layout animation.

\`\`\`
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence>
        <motion.li v-for="item in items" layout :key="item.id" />
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
\`\`\`

### Layout animations not working with \`mode="popLayout"\`

When any HTML element has an active \`transform\` it temporarily becomes the [offset parent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) of its children. This can cause children with \`position: "absolute"\` not to appear where you expect.  
  
\`mode="popLayout"\` works by using \`position: "absolute"\`. So to ensure consistent and expected positioning during a layout animation, ensure that the animating parent has a \`position\` other than \`"static"\`.

\`\`\`
<motion.ul layout :style="{ position: 'relative' }">
  <AnimatePresence mode="popLayout">
      <motion.li v-for="item in items" layout :key="item.id" />
  </AnimatePresence>
</motion.ul>
\`\`\``
                }
            ]
        };
    });
    // LayoutGroup
    server.registerResource("Vue: LayoutGroup", docsUri("vue", "layout-group"), {
        description: "Coordinate Vue layout animations between related Motion components with LayoutGroup. Group elements to share state and enable seamless transitions, even if not rendered together. Namespace layoutId for complex UIs.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "layout-group");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# LayoutGroup

\`[motion](/docs/vue-motion-component.md)\` [components](/docs/vue-motion-component.md) with a \`layout\` prop will detect and [animate layout changes](/docs/vue-layout-animations.md) every time they commit a Vue re-render, or their \`layoutDependency\` prop changes.

\`LayoutGroup\` is used to group components that might not render together but do affect each-other's state.

## Usage

Take these accordion items that each handle their own state:

\`\`\`
<script setup>
  const isOpen = ref(false)
</script>
<template>
  <motion.div
      layout
      @click="isOpen=!isOpen"
    >
      <motion.h2 layout>{{header}}</motion.h2>
      {{isOpen ? content : null}}
    </motion.div>
</template>
\`\`\`

If we arrange these next to each other in an \`Accordion\`, when their state updates, their siblings have no way of knowing:

\`\`\`
<!-- Accordion -->
<template>
  <ToggleContent />
  <ToggleContent />
</template>
\`\`\`

This can be fixed by grouping both components with \`LayoutGroup\`:

\`\`\`
<!-- Accordion -->
<template>
  <LayoutGroup>
    <ToggleContent />
    <ToggleContent />
  </LayoutGroup>
</template>
\`\`\`

### Namespace \`layoutId\`

Components expecting to perform shared layout animations are provided a \`layoutId\` prop.

In this following example, each \`Tab\` renders an element with the \`layoutId="underline"\` prop.

\`\`\`
<!-- Tab -->
<template>
  <li>
      {{label}}
      <motion.div v-if="isSelected" layoutId="underline" />
    </li> 
</template>

<!-- TabRow -->
<template>
  <Tab v-for="item in items" :key="item.id" v-bind="item"/>
</template>
\`\`\`

\`layoutId\` is global across your site. So to render multiple \`TabRow\`s we want to group them with \`LayoutGroup\` and \`id\` prop:

\`\`\`
<!-- TabRow -->
<template>
  <LayoutGroup :id="id">
    <Tab v-for="item in items" :key="item.id" v-bind="item"/>
  </LayoutGroup>
</template>
\`\`\``
                }
            ]
        };
    });
    // LazyMotion
    server.registerResource("Vue: LazyMotion", docsUri("vue", "lazymotion"), {
        description: "Reduce your initial bundle size with LazyMotion in Motion for Vue. Load animation features synchronously or asynchronously, shrinking bundles to as low as 6kb.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "lazymotion");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# LazyMotion

For ease of use, the \`[motion](/docs/vue-motion-component.md)\` [component](/docs/vue-motion-component.md) comes pre-bundled with all of its features for a bundlesize of around 34kb.

With \`LazyMotion\` and the \`m\` component, we can reduce this to 6kb for the initial render and then sync or async load a subset of features.

## Usage

Instead of importing \`motion\`, import the slimmer \`m\` component.

\`\`\`
import { m } from "motion-v"
\`\`\`

\`m\` is used in the exact same way as \`motion\`, but unlike \`motion\`, the \`m\` component doesn't come preloaded with features like animations, layout animations, or the drag gesture.

Instead, we load these in manually via the \`LazyMotion\` component. This lets you choose which features you load in, and whether you load them as part of the main bundle, or lazy load them.

\`\`\`
<script setup>
  import { LazyMotion, domAnimation, m } from "motion-v"
</script>

<template>
   <!--Load only the domAnimation package-->
  <LazyMotion :features="domAnimation">
    <m.div :animate="{ opacity: 1 }" />
  </LazyMotion>
</template>
\`\`\`

### Available features

There are currently two **feature packages** you can load:

*   \`domAnimation\`: This provides support for animations, variants, exit animations, and press/hover/focus gestures. (**+18kb**)
    
*   \`domMax\`: This provides support for all of the above, plus pan/drag gestures and layout animations. (**+28kb**)
    

In the future it might be possible to offer more granular feature packages, but for now these were chosen to reduce the amount of duplication between features, which could result in much more data being downloaded ultimately.

#### Synchronous loading

By passing one of these feature packages to \`LazyMotion\`, they'll be bundled into your main JavaScript bundle.

\`\`\`
<script setup>
import { LazyMotion, domAnimation, m } from "motion-v"
</script>

<template>  
  <LazyMotion :features="domAnimations">
    <m.div :animate="{ opacity: 1 }" />
  </LazyMotion>
</template>

\`\`\`

#### Async loading

If you're using a bundler like Webpack or Rollup, we can pass a dynamic import function to \`features\` that will fetch features only after we've performed our initial render.

First, create a file that exports only the features you want to load.

\`\`\`
// features.js
import { domAnimation } from "motion-v"
export default domAnimation
  
// index.js
const loadFeatures = import("./features.js")
  .then(res => res.default)

<template>
    <LazyMotion :features="loadFeatures">
      <m.div :animate="{ scale: 1.5 }" />
    </LazyMotion>
</template>
\`\`\`

### \`strict\`

**Default:** \`false\`

If \`true\`, will throw an error if a \`motion\` component renders within a \`LazyMotion\` component (thereby removing the bundlesize benefits of lazy-loading).

\`\`\`
<!-- This component will throw an error that explains using a motion component 
     instead of the m component will break the benefits of code-splitting. -->
<template>
    <LazyMotion :features="domAnimation" strict>
      <motion.div />
    </LazyMotion>
</template>
\`\`\``
                }
            ]
        };
    });
    // MotionConfig
    server.registerResource("Vue: MotionConfig", docsUri("vue", "motion-config"), {
        description: "Configure all child motion components in Vue with MotionConfig. Set global transitions, manage reducedMotion preferences, and ensure CSP nonce compliance easily.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "motion-config");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# MotionConfig

The \`MotionConfig\` component can be used to set configuration options for all child \`[motion](/docs/vue-motion-component.md)\` [components](/docs/vue-motion-component.md).

\`\`\`
<script setup>
  import { motion, MotionConfig } from "motion-v"
</script>

<template>
  <MotionConfig :transition="{ duration: 1 }">
    <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
      />
  </MotionConfig>
</template>
\`\`\`

## Props

### \`transition\`

Define a fallback \`transition\` to use for all child \`motion\` components.

### \`reducedMotion\`

**Default:** \`"never"\`

\`reducedMotion\` lets you set a site-wide policy for handling reduced motion. It offers the following options:

*   \`"user"\`: Respect the user's device setting.
    
*   \`"always"\`: Enforce reduced motion (useful for debugging).
    
*   \`"never"\`: Don't respect reduced motion.
    

When reduced motion is on, transform and layout animations will be disabled. Other animations, like \`opacity\` and \`backgroundColor\`, will persist.

### \`nonce\`

If using a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src#unsafe_inline_styles) with a \`nonce\` attribute, passing the same attribute through \`MotionConfig\` will allow any \`style\` blocks generated by Motion to adhere the the security policy.`
                }
            ]
        };
    });
    // Reorder
    server.registerResource("Vue: Reorder", docsUri("vue", "reorder"), {
        description: "Easily create drag-to-reorder lists with Motion for Vue's Reorder components. Use Reorder.Group and Reorder.Item to manage list order, with automatic layout and exit animations. Lightweight and simple.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "reorder");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Reorder

The \`Reorder\` components can be used to create drag-to-reorder lists, like reorderable tabs or todo items.

\`\`\`
<script setup>
  import { Reorder } from "motion-v"
  const items = ref([0,1,2,3])
</script>

<template>  
  <Reorder.Group axis="y" v-model:values="items">
      <Reorder.Item v-for="item in items" :key="item" :value="item">
        {{item}}
      </Reorder.Item>
  </Reorder.Group>
</template>
\`\`\`

**Note:** \`Reorder\` is for simple drag-to-reorder implementations. It's exceptionally lightweight ontop of the base \`motion\` component but lacks some features like multirow, dragging between columns, or dragging within scrollable containers. For advanced use-cases we recommend using other community drag and drop components.

## Usage

Every reorderable list is wrapped in the \`Reorder.Group\` component.

\`\`\`
<script setup>
import { Reorder } from "motion-v"
</script>

<template>
  <Reorder.Group>
    
  </Reorder.Group>
</template>
\`\`\`

By default, this is rendered as a \`<ul>\`, but this can be changed with the \`as\` prop.

\`\`\`
<Reorder.Group as="ol">
\`\`\`

\`Reorder.Group\` must be passed the array of values in your reorderable list via the \`values\` prop.

Additionally, a \`onUpdate:values\` event will fire with the latest calculated order. For items to reorder, this must update the \`values\` state.

\`\`\`
<script setup>
import { Reorder } from "motion-v"
const items = ref([0,1,2,3])
</script>

<template>
  <Reorder.Group v-model:values="values">
    
  </Reorder.Group>
</template>
\`\`\`

To render each reorderable item, use \`Reorder.Item\`, passing it the value it represents via the \`value\` prop.

\`\`\`
<script setup>
import { Reorder } from "motion-v"
const items = ref([0,1,2,3])
</script>

<template>
  <Reorder.Group v-model:values="items">
      <Reorder.Item v-for="item in items" :key="item" :value="item">
        {{ item }}
      </Reorder.Item>
  </Reorder.Group>
</template>
\`\`\`

Now, when items are dragged and reordered, \`onUpdate:values\` will fire with a new order.

### Layout animations

\`Reorder.Item\` components are already configured to perform layout animations, so if new items are added or removed to the reorderable list, surrounding items will animate to their new position automatically.

###   
Exit animations

\`[AnimatePresence](/docs/react-animate-presence.md)\` can be used as normal to animate items as they enter/leave the Vue tree.

\`\`\`
<AnimatePresence>
    <ReorderItem
      v-for="item in items"
      :key="item"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
    />
</AnimatePresence>
\`\`\`

### Drag triggers

By default, all of a \`Reorder.Item\` will be draggable. \`[useDragControls](/docs/vue-use-drag-controls.md)\` can be used to define a different component to act as a drag trigger.

\`\`\`
<script>
import { Reorder, useDragControls } from "motion-v"
const controls = useDragControls()
</script>

<template>
  <Reorder.Item
      :value="value"
      :dragListener="false"
      :dragControls="controls"
    >
      <div
        className="reorder-handle"
        @pointerDown="(e) => controls.start(e)"
      />
    </Reorder.Item>
</template>
\`\`\`

### Scrollable lists

If \`Reorder.Item\` components are within a scrollable container, that container needs a \`layoutScroll\` prop so Motion can correctly measure its scroll offset.

\`\`\`
<Reorder.Group
  axis="y"
  v-model:values="items"
  layoutScroll
  :style="{ overflowY: 'scroll' }"
>
    <Item v-for="item in items" :key="item" item="item" />
</Reorder.Group>
\`\`\`

### z-index

\`Reorder.Item\` will automatically set a \`z-index\` style on the currently dragged item so it appears above the surrounding items.

However, \`z-index\` only affects items with \`position !== "static"\`. So to enable this effect ensure the position of the \`Reorder.Item\` is set to \`relative\` or \`absolute\`.

## API

### \`Reorder.Group\`

#### \`as\`

**Default**: \`"ul"\`

The underlying element for \`Reorder.Group\` to render as.

\`\`\`
<Reorder.Group as="div"></Reorder.Group>
\`\`\`

#### \`axis\`

**Default**: \`"y"\`

The direction of reorder detection.

**Note:** By default, all \`Reorder.Item\` components will visibly move only on this axis. To allow visual motion (but **not** reordering) on both axes, pass the \`drag\` prop to child \`Reorder.Item\` components.

#### \`values\`

The values array that will be reordered. Each item in this list must match a \`value\` passed to each \`Reorder.Item\`.

#### \`onUpdate:values\`

A callback that will fire when items are detected to have reordered. The provided \`newOrder\` should be passed to a \`values\` state update function.

\`\`\`
<script setup>
const items = ref([0,1,2,3])
</script>

<template>
  <Reorder.Group v-model:values="items"/>
</template>

\`\`\`

### \`Reorder.Item\`

\`Reorder.Item\` components accept all \`[motion](/docs/vue-motion-component.md)\` [component props](/docs/vue-motion-component.md) in addition to the following:

#### \`as\`

**Default:** \`"li"\`

The element for \`Reorder.Item\` to render as.

#### \`value\`

When \`onUpdate:values\` is called, this is the value that will be passed through in the newly ordered array.`
                }
            ]
        };
    });
    // Motion values
    server.registerResource("Vue: Motion values", docsUri("vue", "motion-value"), {
        description: "Power Vue animations with Motion values. Track state/velocity, sync components, & update styles without re-renders. Compose with useTransform/useSpring.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "motion-value");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion values

Motion values track the state and velocity of animated values.

They are composable, signal-like values that are performant because Motion can render them with its optimised DOM renderer.

Usually, these are created automatically by \`[motion](/docs/vue-motion-component.md)\` [components](/docs/vue-motion-component.md). But for advanced use cases, it's possible to create them manually.

\`\`\`
<script setup>
  import { motion, useMotionValue } from "motion-v"
  const x = useMotionValue(0)
</script>

<template>
  <motion.div :style="{ x }" />
</template>
\`\`\`

By manually creating motion values you can:

*   Set and get their state.
    
*   Pass to multiple components to synchronise motion across them.
    
*   Chain \`MotionValue\`s via the \`useTransform\` hook.
    
*   Update visual properties without triggering Vue's render cycle.
    
*   Subscribe to updates.
    

\`\`\`
<script setup>
  import { useMotionValue, useTransform} from "motion-v"

  const x = useMotionValue(0)
  const opacity = useTransform(
    x,
    [-200, 0, 200],
    [0, 1, 0]
  )
</script>

<template>
<!-- // Will change opacity as element is dragged left/right -->
  <motion.div drag="x" :style="{ x, opacity }" />
</template>
\`\`\`

## Usage

Motion values can be created with the \`useMotionValue\` hook. The string or number passed to \`useMotionValue\` will act as its initial state.

\`\`\`
import { useMotionValue } from "motion-v"

const x = useMotionValue(0)
\`\`\`

Motion values can be passed to a \`motion\` component via \`style\`:

\`\`\`
<motion.li :style="{ x }" />
\`\`\`

Or for SVG attributes, via the attribute prop itself:

\`\`\`
<motion.circle :cx="cx" />
\`\`\`

It's possible to pass the same motion value to multiple components.

Motion values can be updated with the \`set\` method.

\`\`\`
x.set(100)
\`\`\`

Changes to the motion value will update the DOM **without triggering a Vue re-render**. Motion values can be updated multiple times but renders will be batched to the next animation frame.

A motion value can hold any string or number. We can read it with the \`get\` method.

\`\`\`
x.get() // 100
\`\`\`

Motion values containing a number can return a velocity via the \`getVelocity\` method. This returns the velocity as calculated **per second** to account for variations in frame rate across devices.

\`\`\`
const xVelocity = x.getVelocity()
\`\`\`

For strings and colors, \`getVelocity\` will always return \`0\`.

### Events

Listeners can be added to motion values via [the](/docs/vue-motion-value#on.md) \`[on](/docs/vue-motion-value#on.md)\` [method](/docs/vue-motion-value#on.md) or [the](/docs/vue-use-motion-value-event.md) \`[useMotionValueEvent](/docs/vue-use-motion-value-event.md)\` [hook](/docs/vue-use-motion-value-event.md).

\`\`\`
useMotionValueEvent(x, "change", (latest) => console.log(latest))
\`\`\`

Available events are \`"change"\`, \`"animationStart"\`, \`"animationComplete"\` \`"animationCancel"\`.

### Composition

Beyond \`useMotionValue\`, Motion provides a number of hooks for creating and composing motion values, like \`[useSpring](/docs/vue-use-spring.md)\` and \`[useTransform](/docs/vue-use-transform.md)\`.

For example, with \`useTransform\` we can take the latest state of one or more motion values and create a new motion value with the result.

\`\`\`
const y = useTransform(() => x.get() * 2)
\`\`\`

\`useSpring\` can make a motion value that's attached to another via a spring.

\`\`\`
const dragX = useMotionValue(0)
const dragY = useMotionValue(0)
const x = useSpring(dragX)
const y = useSpring(dragY)
\`\`\`

These motion values can then go on to be passed to \`motion\` components, or composed with more hooks like \`[useVelocity](/docs/vue-use-velocity.md)\`.

## API

### \`get()\`

Returns the latest state of the motion value.

### \`getVelocity()\`

Returns the latest velocity of the motion value. Returns \`0\` if the value is non-numerical.

### \`set()\`

Sets the motion value to a new state.

\`\`\`
x.set("#f00")
\`\`\`

### \`jump()\`

Jumps the motion value to a new state in a way that breaks continuity from previous values:

*   Resets \`velocity\` to \`0\`.
    
*   Ends active animations.
    
*   Ignores attached effects (for instance \`useSpring\`'s spring).
    

\`\`\`
const x = useSpring(0)
x.jump(10)
x.getVelocity() // 0
\`\`\`

### \`isAnimating()\`

Returns \`true\` if the value is currently animating.

### \`stop()\`

Stop the active animation.

### \`on()\`

Subscribe to motion value events. Available events are:

*   \`change\`
    
*   \`animationStart\`
    
*   \`animationCancel\`
    
*   \`animationComplete\`
    

It returns a function that, when called, will unsubscribe the listener.

\`\`\`
const unsubscribe = x.on("change", latest => console.log(latest))
\`\`\`

### \`destroy()\`

Destroy and clean up subscribers to this motion value.

This is normally handled automatically, so this method is only necessary if you've manually created a motion value outside the Vue render cycle using the vanilla \`motionValue\` hook.`
                }
            ]
        };
    });
    // useMotionTemplate
    server.registerResource("Vue: useMotionTemplate", docsUri("vue", "use-motion-template"), {
        description: "Combine motion values into dynamic strings with Motion for Vue's useMotionTemplate. Create auto-updating, interpolated values for responsive animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-motion-template");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useMotionTemplate

\`useMotionTemplate\` creates a new [motion value](/docs/vue-motion-value.md) from a [string template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing other motion values.

\`\`\`
const x = useMotionValue(100)
const transform = useMotionTemplate\`transform(\${x}px)\`
\`\`\`

Whenever a motion value within the string template updates, the returned motion value will update with the latest value.

## Usage

Import from Motion:

\`\`\`
import { useMotionTemplate } from "motion-v"
\`\`\`

\`useMotionTemplate\` is a "tagged template", so rather than being called like a normal function, it's called as a string template:

\`\`\`
useMotionValue\`\`
\`\`\`

This string template can accept both text and other motion values:

\`\`\`
<script setup>
  const blur = useMotionValue(10)
  const saturate = useMotionValue(50)
  const filter = useMotionTemplate\`blur(\${10}px) saturate(\${saturate}%)\`
</script>

<template>
 <motion.div :style="{ filter }" />
</template>
\`\`\`

The latest value of the returned motion value will be the string template with each provided motion value replaced with its latest value.

\`\`\`
<script setup>
  const shadowX = useSpring(0)
  const shadowY = useMotionValue(0)
  const filter = useMotionTemplate\`drop-shadow(\${shadowX}px \${shadowY}px 20px rgba(0,0,0,0.3))\`
</script>

<template>
 <motion.div :style="{ filter }" />  
</template>
\`\`\``
                }
            ]
        };
    });
    // useMotionValueEvent
    server.registerResource("Vue: useMotionValueEvent", docsUri("vue", "use-motion-value-event"), {
        description: "Manage motion value event listeners in Vue with useMotionValueEvent. Auto-cleans events like change & animationComplete for dynamic UIs.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-motion-value-event");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useMotionValueEvent

\`useMotionValueEvent\` manages a motion value event handler throughout the lifecycle of a Vue component.

\`\`\`
<script setup>
  import { useMotionValue, useMotionValueEvent } from "motion-v"
  const x = useMotionValue(0)
  
  useMotionValueEvent(x, "animationStart", () => {
    console.log("animation started on x")
  })
  
  useMotionValueEvent(x, "change", (latest) => {
    console.log("x changed to", latest)
  })
</script>

<template>
   <motion.div :style="{ x }" />
</template>
\`\`\`

When the component is unmounted, event handlers will be safely cleaned up.

## Usage

Import from Motion:

\`\`\`
import { useMotionValueEvent } from "motion-v"
\`\`\`

To add an event listener to a motion value, provide the value, event name and callback:

\`\`\`
const color = useMotionValue("#00f")

useMotionValueEvent(color, "change", (latest) => {
  console.log(latest)
})
\`\`\`

Available events are:

*   \`change\`
    
*   \`animationStart\`
    
*   \`animationComplete\`
    
*   \`animationCancel\`
    

\`"change"\` events are provided the latest value of the motion value.

### Advanced

\`useMotionValueEvent\` is a helper function for a motion value's \`[on](/docs/vue-motion-value.md)\` [method](/docs/vue-motion-value.md). With \`on\`, you can start listening to events whenever you like, for instance within an event handler. But remember to also unsubscribe when the component unmounts.

\`\`\`
watch([x, y],(n,o,onCleanUp) => {
  const doSomething = () => {}
  
  const unsubX = x.on("change", doSomething)
  const unsubY = y.on("change", doSomething)
  
  onCleanUp(() => {
    unsubX()
    unsubY()
  })
},{
  immediate:true
})
\`\`\``
                }
            ]
        };
    });
    // useScroll
    server.registerResource("Vue: useScroll", docsUri("vue", "use-scroll"), {
        description: "Create Vue scroll-linked animations like progress bars & parallax with Motion for Vue's useScroll hook. Track scroll, element position & use motion values.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-scroll");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useScroll

\`useScroll\` is used to create scroll-linked animations, like progress indicators and parallax effects.

\`\`\`
<script setup>
  const { scrollYProgress } = useScroll()
</script>

<template>
 <motion.div :style="{ scaleX: scrollYProgress }" />  
</template>
\`\`\`

## Usage

Import \`useScroll\` from Motion:

\`\`\`
import { useScroll } from "motion-v"
\`\`\`

\`useScroll\` returns four [motion values](/docs/vue-motion-value.md):

*   \`scrollX\`/\`Y\`: The absolute scroll position, in pixels.
    
*   \`scrollXProgress\`/\`YProgress\`: The scroll position between the defined offsets, as a value between \`0\` and \`1\`.
    

### Page scroll

By default, useScroll tracks the page scroll.

\`\`\`
const { scrollY } = useScroll()

useMotionValueEvent(scrollY, "change", (latest) => {
  console.log("Page scroll: ", latest)
})
\`\`\`

For example, we could show a page scroll indicator by passing \`scrollYProgress\` straight to the \`scaleX\` style of a progress bar.

\`\`\`
<script setup>
  const { scrollYProgress } = useScroll()
</script>

<template>
   <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
\`\`\`

As \`useScroll\` returns motion values, we can compose this scroll info with other motion value hooks like \`useTransform\` and \`useSpring\`:

\`\`\`
<script setup>
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress)
</script>

<template>
  <Motion :style="{ scaleX }" />
</template>
\`\`\`

> Since \`scrollY\` is a \`MotionValue\`, there's a neat trick you can use to tell when the user's scroll direction changes:
> 
> \`\`\`
> <script setup>
>   const { scrollY } = useScroll()
>   const scrollDirection = ref('down')
>   
>   useMotionValueEvent(scrollY, 'change', (current) => {
>     const diff = current - scrollY.getPrevious()
>     scrollDirection.value = diff > 0 ? 'down' : 'up'
>   })
> </script>
> \`\`\`
> 
> Perfect for triggering a sticky header animation!
> 
> ~ Sam Selikoff, [Motion for React Recipes](https://buildui.com/courses/framer-motion-recipes)

### Element scroll

To track the scroll position of a scrollable element we can pass the element's \`ref\` to \`useScroll\`'s \`container\` option:

\`\`\`
<script setup>
  const carouselRef = useRef()
  const { scrollX } = useScroll({
    container: carouselRef
  })
</script>

<template>
  <div ref="carouselRef" style="overflow: scroll">
    <slot />
  </div>
</template>
\`\`\`

### Element position

We can track the progress of an element as it moves within a container by passing its \`ref\` to the \`target\` option.

\`\`\`
<script setup>
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  })
</script>

<template>
  <div ref="ref"/>
</template>
\`\`\`

In this example, each item has its own progress indicator.

### Scroll offsets

With [the](/docs/vue-use-scroll#offset.md) \`[offset](/docs/vue-use-scroll#offset.md)\` [option](/docs/vue-use-scroll#offset.md) we can define which parts of the element we want to track with the viewport, for instance track elements as they enter in from the bottom, leave at the top, or travel throughout the whole viewport.

## API

\`useScroll\` accepts the following options.

### \`container\`

**Default**: Browser window

The scrollable container to track the scroll position of. By default, this is the window viewport. But it can be any scrollable element.

### \`target\`

By default, this is the scrollable area of the container. It can additionally be set as another element, to track its progress within the viewport.

### \`axis\`

**Default:** \`"y"\`

The scroll axis to apply \`offset\`.

### \`offset\`

**Default:** \`["start start", "end end"]\`

\`offset\` describes intersections, points where the \`target\` and \`container\` meet.

For example, the intersection \`"start end"\` means when the **start of the target** on the tracked axis meets the **end of the container.**

So if the target is an element, the container is the window, and we're tracking the vertical axis then \`"start end"\` is where the **top of the element** meets **the bottom of the viewport**.

#### Accepted intersections

Both target and container points can be defined as:

*   **Number:** A value where \`0\` represents the start of the axis and \`1\` represents the end. So to define the top of the target with the middle of the container you could define \`"0 0.5"\`. Values outside this range are permitted.
    
*   **Names:** \`"start"\`, \`"center"\` and \`"end"\` can be used as clear shortcuts for \`0\`, \`0.5\` and \`1\` respectively.
    
*   **Pixels:** Pixel values like \`"100px"\`, \`"-50px"\` will be defined as that number of pixels from the start of the target/container.
    
*   **Percent:** Same as raw numbers but expressed as \`"0%"\` to \`"100%"\`.
    
*   **Viewport:** \`"vh"\` and \`"vw"\` units are accepted.`
                }
            ]
        };
    });
    // useSpring
    server.registerResource("Vue: useSpring", docsUri("vue", "use-spring"), {
        description: "Discover Motion for Vue's useSpring hook. Create smooth spring animations for motion values. Learn to animate with .set(), track values & customize transitions.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-spring");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useSpring

\`useSpring\` creates [a motion value](/docs/vue-motion-value.md) that will animate to its latest target with a spring animation.

The target can either be set manually via \`.set\`, or automatically by passing in another motion value.

## Usage

Import \`useSpring\` from Motion:

\`\`\`
import { useSpring } from "motion-v"
\`\`\`

### Direct control

\`useSpring\` can be created with a number, or a unit-type (\`px\`, \`%\` etc) string:

\`\`\`
const x = useSpring(0)
const y = useSpring("100vh")
\`\`\`

Now, whenever this motion value is updated via \`set()\`, the value will animate to its new target with the defined spring.

\`\`\`
x.set(100)
y.set("50vh")
\`\`\`

It's also possible to update this value immediately, without a spring, with [the](/docs/react-motion-value#jump.md) \`[jump()](/docs/react-motion-value#jump.md)\` [method](/docs/react-motion-value#jump.md).

\`\`\`
x.jump(50)
y.jump("0vh")
\`\`\`

### Track another motion value

Its also possible to automatically spring towards the latest value of another motion value:

\`\`\`
const x = useMotionValue(0)
const y = useSpring(x)
\`\`\`

This source motion value must also be a number, or unit-type string.

### Transition

The type of \`spring\` can be defined with the usual [spring transition option](/docs/vue-transitions#spring.md).

\`\`\`
useSpring(0, { stiffness: 300 })
\`\`\``
                }
            ]
        };
    });
    // useTime
    server.registerResource("Vue: useTime", docsUri("vue", "use-time"), {
        description: "Explore Motion for Vue's useTime hook. It returns elapsed time in ms every frame. Learn how it creates perpetual animations & composes with other motion values.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-time");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useTime

\`useTime\` returns a [motion value](/docs/vue-motion-value.md) that updates once per frame with the duration, in milliseconds, since it was first created.

This is especially useful in generating perpetual animations.

\`\`\`
<script setup>
const time = useTime()
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false })
</script>

<template>
  <motion.div :style="{ rotate }" />
</template>
\`\`\`

## Usage

Import from Motion:

\`\`\`
import { useTime } from "motion-v"
\`\`\`

When called, \`useTime\` will create a new motion value. This value will update every frame with the time since its creation.

You can use this either directly or by composing with other motion value hooks.

\`\`\`
const time = useTime()
const rotate = useTransform(
  time,
  [0, 4000], // For every 4 seconds...
  [0, 360], // ...rotate 360deg
  { clamp: false }
)
\`\`\``
                }
            ]
        };
    });
    // useTransform
    server.registerResource("Vue: useTransform", docsUri("vue", "use-transform"), {
        description: "Discover Motion for Vue's useTransform hook. Create new motion values by transforming others. Learn to map ranges & use clamp, ease, mixer for advanced control.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-transform");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useTransform

\`useTransform\` creates a new motion value that transforms the output of one or more motion values.

\`\`\`
const x = useMotionValue(1)
const y = useMotionValue(1)

const z = useTransform(() => x.get() + y.get()) // z.get() === 2
\`\`\`

## Usage

Import from Motion:

\`\`\`
import { useTransform } from "motion-v"
\`\`\`

\`useTransform\` can be used in two ways: with a transform function and via value maps:

\`\`\`
// Transform function
const doubledX = useTransform(() => x.get() * 2)

// Value mapping
const color = useTransform(x, [0, 100], ["#f00", "00f"])
\`\`\`

### Transform function

A transform function is a normal function that returns a value.

\`\`\`
const doubledX = useTransform(() => x.get() * 2)
\`\`\`

Any motion values read in this function via the \`get()\` method will be automatically subscribed to.

When these motion values change, the function will be run again on the next animation frame to calculate a new value.

\`\`\`
const distance = 100
const time = useTime()
const y = useTransform(() => Math.sin(time.get() / 1000) * distance)
\`\`\`

### Value mapping

\`useTransform\` can also map a single motion value from one range of values to another.

To illustrate, look at this \`x\` motion value:

\`\`\`
const x = useMotionValue(0)
\`\`\`

We can use \`useTransform\` to create a new motion value called \`opacity\`.

\`\`\`
const opacity = useTransform(x, input, output)
\`\`\`

By defining an \`input\` range and an \`output\` range, we can define relationships like "when \`x\` is \`0\`, \`opacity\` should be \`1\`. When \`x\` is \`100\` pixels either side, \`opacity\` should be \`0\`".

\`\`\`
const input = [-100, 0, 100]
const output = [0, 1, 0]
\`\`\`

Both ranges can be **any length** but must be the **same length** as each other.

The input range must always be a series of increasing or decreasing numbers.

The output range must be values all of the same type, but can be in any order. It can also be any [value type that Motion can animate](/docs/vue-animation#animatable-values.md), like numbers, units, colors and other strings.

\`\`\`
const backgroundColor = useTransform(
  x,
  [0, 100],
  ["#f00", "#00f"]
)
\`\`\`

By setting \`clamp: false\`, the ranges will map perpetually. For instance, in this example we're saying "for every \`100px\` scrolled, rotate another \`360deg\`":

\`\`\`
const { scrollY } = useScroll()
const rotate = useTransform(
  scrollY,
  [0, 100],
  [0, 360],
  { clamp: false }
)
\`\`\`

## Options

With value mapping, we can set some additional options.

### \`clamp\`

**Default:** \`true\`

If \`true\`, will clamp output to within the provided range. If \`false\`, will carry on mapping even when the input falls outside the provided range.

\`\`\`
<script setup>
const y = useTransform(x, [0, 1], [0, 2])
const z = useTransform(x, [0, 1], [0, 2], { clamp: false })

onMounted(() => {
  x.set(2)
  console.log(y.get()) // 2, input clamped
  console.log(z.get()) // 4
})
</script>
\`\`\`

### \`ease\`

An easing function, or array of easing functions, to ease the mixing between each value.

These must be JavaScript functions.

\`\`\`
<script setup>
import { cubicBezier, circOut, useTransform } from 'motion-v'

const y = useTransform(x, [0, 1], [0, 2], { ease: circOut })

const z = useTransform(
  x,
  [0, 1],
  [0, 2],
  { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) }
)
</script>
\`\`\`

### \`mixer\`

A function to use to mix between each pair of output values.

This function will be called with each pair of output values and must return a new function, that accepts a progress value between \`0\` and \`1\` and returns the mixed value.

This can be used to inject more advanced mixers than Framer Motion's default, for instance [Flubber](https://github.com/veltman/flubber) for morphing SVG paths.`
                }
            ]
        };
    });
    // useVelocity
    server.registerResource("Vue: useVelocity", docsUri("vue", "use-velocity"), {
        description: "Discover Motion for Vue's useVelocity hook. It tracks a motion value's velocity, letting you monitor the rate of change for any animatable value easily.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-velocity");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useVelocity

\`useVelocity\` accepts a [motion value](/docs/vue-motion-value.md) and returns a new one that updates with the provided motion value's velocity.

\`\`\`
<script setup>
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const scale = useTransform(
  xVelocity,
  [-3000, 0, 3000],
  [2, 1, 2],
  { clamp: false }
)
</script>

<template>
  <Motion drag="x" :style="{ x, scale }" />
</template>
\`\`\`

## Usage

Import \`useVelocity\` from Motion:

\`\`\`
import { useVelocity } from "motion-v"
\`\`\`

Pass any numerical motion value to \`useVelocity\`. It'll return a new motion value that updates with the velocity of the original value.

\`\`\`
<script setup>
import { useMotionValue, useVelocity, useMotionValueEvent } from 'motion-v'

const x = useMotionValue(0)
const xVelocity = useVelocity(x)

useMotionValueEvent(xVelocity, 'change', (latest) => {
  console.log('Velocity', latest)
})
</script>

<template>
  <Motion :style="{ x }" />
</template>
\`\`\`

Any numerical motion value will work. Even one returned from \`useVelocity\`.

\`\`\`
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const xAcceleration = useVelocity(xVelocity)
\`\`\``
                }
            ]
        };
    });
    // useAnimate
    server.registerResource("Vue: useAnimate", docsUri("vue", "use-animate"), {
        description: "Discover Motion for Vue's useAnimate hook for component-scoped animations. Use its animate function for manual control, scoped selectors & auto cleanup.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-animate");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useAnimate

\`useAnimate\` provides a way of using the \`[animate](/docs/animate.md)\` [function](/docs/animate.md) that is scoped to the elements within your component.

This allows you to use manual animation controls, timelines, selectors scoped to your component, and automatic cleanup.

It provides a \`scope\` ref, and an \`animate\` function where every DOM selector is scoped to this ref.

\`\`\`
<script setup>
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()

onMounted(() => {
  // This "li" selector will only select children
  // of the element that receives \`scope\`
  animate('li', { opacity: 1 })
})
</script>

<template>
  <ul ref="scope">
    <slot />
  </ul>
</template>
\`\`\`

Additionally, when the component calling \`useAnimate\` is removed, all animations started with its \`animate\` function will be cleaned up automatically.

## Usage

Import from Motion:

\`\`\`
import { useAnimate } from "motion-v"
\`\`\`

\`useAnimate\` returns two arguments, a \`scope\` ref and an \`[animate](/docs/animate.md)\` [function](/docs/animate.md).

\`\`\`
<script setup>
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()
</script>
\`\`\`

This \`scope\` ref must be passed to either a regular HTML/SVG element or a \`motion\` component.

\`\`\`
<script setup>
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()
</script>

<template>
  <ul ref="scope">
    <slot />
  </ul>
</template>
\`\`\`

This scoped \`animate\` function can now be used in effects and event handlers to animate elements.

We can either use the scoped element directly:

\`\`\`
animate(scope.current, { opacity: 1 }, { duration: 1 })
\`\`\`

Or by passing it a selector:

\`\`\`
animate("li", { backgroundColor: "#000" }, { ease: "linear" })
\`\`\`

This selector is \`"li"\`, but we're not selecting all \`li\` elements on the page, only those that are a child of the scoped element.

### Scroll-triggered animations

Animations can be triggered when the scope scrolls into view by combining \`useAnimate\` with \`[useInView](/docs/vue-use-in-view.md)\`.

\`\`\`
<script setup>
import { useAnimate, useInView } from 'motion-v'

const [scope, animate] = useAnimate()
const isInView = useInView(scope)

watch(isInView, (inView) => {
  if (inView) {
    animate(scope.value, { opacity: 1 })
  }
})
</script>

<template>
  <ul ref="scope">
    <li />
    <li />
    <li />
  </ul>
</template>
\`\`\``
                }
            ]
        };
    });
    // useAnimationFrame
    server.registerResource("Vue: useAnimationFrame", docsUri("vue", "use-animation-frame"), {
        description: "Use Motion for Vue's useAnimationFrame hook to run callbacks on every frame. Leverage time & delta args for precise animation control & custom frame logic.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-animation-frame");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useAnimationFrame

\`useAnimationFrame\` runs a callback once every animation frame.

\`\`\`
useAnimationFrame((time) => {
  domRef.value.style.transform = \`rotateY(\${time}deg)\`
})
\`\`\`

The callback is provided two arguments:

*   \`time\`, the total duration of time since the callback was first called.
    
*   \`delta\`, the total duration of time since the last animation frame.
    

\`\`\`
<script setup>
import { useAnimationFrame } from 'motion-v'

const domRef = ref()

useAnimationFrame((time, delta) => {
  domRef.value.style.transform = \`rotateY(\${time}deg)\`
})
</script>

<template>
  <div :ref="domRef" />
</template>
\`\`\``
                }
            ]
        };
    });
    // useDragControls
    server.registerResource("Vue: useDragControls", docsUri("vue", "use-drag-controls"), {
        description: "Master Motion for Vue's useDragControls hook. Manually start drag gestures, add touch support, snap to cursor & customize drag interactions for your components.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-drag-controls");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useDragControls

Usually, dragging is initiated by pressing down on [a](/docs/vue-gestures#drag.md) \`[motion](/docs/vue-gestures#drag.md)\` [component with a](/docs/vue-gestures#drag.md) \`[drag](/docs/vue-gestures#drag.md)\` [prop](/docs/vue-gestures#drag.md) and then moving the pointer.

For some use-cases, for example clicking at an arbitrary point on a video scrubber, we might want to initiate that dragging from a different element.

With \`useDragControls\`, we can create a set of controls to manually start dragging from any pointer event.

## Usage

Import \`useDragControls\` from Motion:

\`\`\`
import { useDragControls } from "motion-v"
\`\`\`

\`useDragControls\` returns drag controls that can be passed to a draggable \`motion\` component:

\`\`\`
<script setup>
import { useDragControls, motion } from 'motion-v'

const controls = useDragControls()
</script>

<template>
  <motion.div drag :drag-controls="controls" />
</template>
\`\`\`

Now we can start a drag session from another any element's \`onPointerDown\` event via the \`start\` method.

\`\`\`
<template>
  <div @pointerdown="(event) => controls.start(event)" />
</template>
\`\`\`

### Touch support

To support touch screens, the triggering element should have the \`touch-action: none\` style applied.

\`\`\`
<template>
  <div 
    @pointerdown="startDrag" 
    style="touch-action: none"
  />
</template>
\`\`\`

### Snap to cursor

By default, the drag gesture will only apply **changes** to the pointer position.

We can also make the \`motion\` component immediately snap to the cursor by passing \`snapToCursor: true\` to the \`start\` method.

\`\`\`
controls.start(event, { snapToCursor: true })
\`\`\`

### Disable automatic drag

With this configuration, the \`motion\` component will still automatically start a drag gesture when it receives a \`pointerdown\` event itself.

We can stop this behaviour by passing it a \`:dragListener="false"\` prop.

\`\`\`
<template>
  <motion.div
    drag
    :drag-listener="false"
    :drag-controls="controls"
  />
</template>
\`\`\``
                }
            ]
        };
    });
    // useInView
    server.registerResource("Vue: useInView", docsUri("vue", "use-in-view"), {
        description: "Use Motion for Vue's tiny useInView hook (0.6kb) to detect when elements enter the viewport. Track visibility, trigger effects & customize detection easily.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-in-view");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useInView

\`useInView\` is a tiny (0.6kb) hook that detects when the provided element is within the viewport. It can be used with any Vue element.

\`\`\`
<script setup>
import { useInView } from 'motion-v'

const domRef = ref()
const isInView = useInView(domRef)
</script>

<template>
  <div ref="domRef" />
</template>
\`\`\`

## Usage

Import \`useInView\` from Motion:

\`\`\`
import { useInView } from "motion-v"
\`\`\`

\`useInView\` can track the visibility of any HTML element. Pass a \`ref\` object to both \`useInView\` and the HTML element.

\`\`\`
<script setup>
import { useInView } from 'motion-v'

const domRef = ref()
const isInView = useInView(ref)
</script>

<template>
  <div ref="domRef" />
</template>
\`\`\`

While the element is outside the viewport, \`useInView\` will return \`false\`. When it moves inside the view, it'll re-render the component and return \`true\`.

### Effects

\`useInView\` is vanilla Vue ref state, so firing functions when \`isInView\` changes is a matter of passing it to a \`watch\`.

\`\`\`
<script setup>
watch(isInView, (inView) => {
  console.log('Element is in view: ', inView)
})
</script>
\`\`\`

## Options

\`useInView\` can accept options to define how the element is tracked within the viewport.

\`\`\`
const isInView = useInView(domRef, { once: true })
\`\`\`

### \`root\`

By default, \`useInView\` will track the visibility of an element as it enters/leaves the window viewport. Set \`root\` to be the ref of a scrollable parent, and it'll use that element to be the viewport instead.

\`\`\`
<script setup>
import { useInView } from 'motion-v'
import { computed } from 'vue'

const container = ref()
const boxRef = ref()
const isInView = useInView(boxRef,computed(() => ({ root: container.value })))
</script>

<template>
  <div ref="container" style="overflow: scroll">
    <div ref="boxRef" />
  </div>
</template>
\`\`\`

### \`margin\`

**Default:** \`"0px"\`

A margin to add to the viewport to change the detection area. Use multiple values to adjust top/right/bottom/left, e.g. \`"0px -20px 0px 100px"\`.

\`\`\`
const isInView = useInView({
  margin: "0px 100px -50px 0px"
})
\`\`\`

**\\]Note:** For browser security reasons, \`margin\` [won't take affect within cross-origin iframes](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin) unless \`root\` is explicitly defined.

### \`once\`

**Default:** \`false\`

If \`true\`, once an element is in view, useInView will stop observing the element and always return \`true\`.

\`\`\`
const isInView = useInView(ref, { once: true })
\`\`\`

### \`initial\`

**Default:** \`false\`

Set an initial value to return until the element has been measured.

\`\`\`
const isInView = useInView(ref, { initial: true })
\`\`\`

### \`amount\`

**Default:** \`"some"\`

The amount of an element that should enter the viewport to be considered "entered". Either \`"some"\`, \`"all"\` or a number between \`0\` and \`1\`.

## Example`
                }
            ]
        };
    });
    // useReducedMotion
    server.registerResource("Vue: useReducedMotion", docsUri("vue", "use-reduced-motion"), {
        description: "Learn to use Motion for Vue's useReducedMotion hook to detect reduced motion settings. Create accessible UIs by adapting animations and motion features.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "use-reduced-motion");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useReducedMotion

A hook that returns \`true\` if the current device has Reduced Motion setting enabled.

\`\`\`
const shouldReduceMotion = useReducedMotion()
\`\`\`

This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing potentially motion-sickness inducing \`x\`/\`y\` animations with \`opacity\`, disabling the autoplay of background videos, or turning off parallax motion.

It will actively respond to changes and re-render your components with the latest setting.

\`\`\`
<script setup>
import { useReducedMotion } from 'motion-v'

const props = defineProps({
  isOpen: Boolean
})

const shouldReduceMotion = useReducedMotion()
const closedX = computed(()=>shouldReduceMotion.value ? 0 : '-100%')
</script>

<template>
  <Motion
    :animate="{
      opacity: isOpen ? 1 : 0,
      x: isOpen ? 0 : closedX
    }"
  />
</template>
\`\`\`

## Usage

Import \`useReducedMotion\` from Motion:

\`\`\`
import { useReducedMotion } from "motion-v"
\`\`\`

In any component, call \`useReducedMotion\` to check whether the device's Reduced Motion setting is enabled.

\`\`\`
const prefersReducedMotion = useReducedMotion()
\`\`\`

You can then use this \`true\`/\`false\` value to change your application logic.`
                }
            ]
        };
    });
    // Integrate Motion with Radix
    server.registerResource("Vue: Integrate Motion with Radix", docsUri("vue", "radix"), {
        description: "Integrate Motion with Radix Vue for stunning animations. Learn to animate Radix primitives, use AnimatePresence for smooth exits, & animate Tooltip, Toast & more.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "radix");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Integrate Motion with Radix

[Radix-Vue](https://reka-ui.com/) is one of the most popular component libraries for Vue, and it takes just a couple steps to use Motion for Vue for animations.

In this guide, we'll learn how to use \`[motion](/docs/vue-motion-component.md)\` [components](/docs/vue-motion-component.md) with Radix primitives, as well as specific setups for exit and layout animations.

## Setup \`motion\` components

Most Radix components render and control their own DOM elements. But they also provide [the](https://reka-ui.com/docs/guides/composition#composition) \`[asChild](https://reka-ui.com/docs/guides/composition#composition)\` [prop](https://reka-ui.com/docs/guides/composition#composition) that, when set to \`true\`, will make the component use the first provided child as its DOM node instead.

By passing a \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md) as this child, we can now use all of its animation props as normal:

\`\`\`
<template>
  <ToastRoot :as-child="true">
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      layout
    >
\`\`\`

## Exit animations

Many Radix components, like [Toast](https://reka-ui.com/docs/components/toast#toast) or [Tooltip](https://reka-ui.com/docs/components/tooltip#tooltip), would be perfect for exit animations, but can't perform them without Motion's \`[AnimatePresence](/docs/vue-animate-presence.md)\`.

\`AnimatePresence\` is built on top of Vue's Transition component,This is how it tracks which components are exiting:

\`\`\`
<template>
  <AnimatePresence>
    <Motion
      v-if="isOpen"
      :exit="{ opacity: 0 }"
    />
  </AnimatePresence>
</template>
\`\`\`

Using exit animations with Motion Vue and Radix components is straightforward. Just wrap your unmounting component with \`AnimatePresence\`, and it can detect the direct child DOM unmounting and trigger exit animations.

For example, works with the Tooltip component：

\`\`\`
 <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger class="tooltip-trigger">
              Hover or focus
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <AnimatePresence>
              <Tooltip.Content as-child :side-offset="10">
                <motion.div
                  class="tooltip-content"
                  :initial="{ opacity: 0, y: 20, scale: 0.8 }"
                  :animate="{ opacity: 1, y: 0, scale: 1 }"
                  :exit="{ opacity: 0,y: 20,}"
                >
                  Add to library
                  <Tooltip.Arrow class="tooltip-arrow" />
                </motion.div>
              </Tooltip.Content>
            </AnimatePresence>
          </Tooltip.Portal>
        </Tooltip.Root>
  </Tooltip.Provider>
\`\`\`

## Layout animations

Layout animations also require this same pattern of hoisting state out of the component.

\`\`\`
<script setup>
const tab = ref('account')
</script>

<template>
  <Tabs.Root 
    v-model="tab" 
    as-child
  >
    <motion.div layout>
\`\`\`

This is to ensure \`motion\` components know to perform layout animations when the state changes. You can even pass this state to \`layoutDependency\` for better performance.

\`\`\`
<motion.div layout :layoutDependency="tab">
\`\`\`

## Motion+ examples

[Motion+](https://motion.dev/plus) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [examples](https://motion.dev/examples?platform=vue#radix), as well as premium components like \`[Cursor](/docs/vue-cursor.md)\` and \`[AnimateNumber](/docs/vue-animate-number.md)\`.

Motion+ features examples for most Radix components:

*   [Accordion](https://examples.motion.dev/vue/radix-accordion)
    
*   [Checkbox](https://examples.motion.dev/vue/radix-checkbox)
    
*   [Context Menu](https://examples.motion.dev/vue/radix-context-menu)
    
*   [Dialog](https://examples.motion.dev/vue/radix-dialog)
    
*   [Dropdown Menu](https://examples.motion.dev/vue/radix-dropdown)
    
*   [Progress](https://examples.motion.dev/vue/radix-progress)
    
*   [Radio Group](https://examples.motion.dev/vue/radix-radio-group)
    
*   [Select](https://examples.motion.dev/vue/radix-select)
    
*   [Slider](https://examples.motion.dev/vue/number-radix-slider)
    
*   [Switch](https://examples.motion.dev/vue/radix-switch)
    
*   [Tabs](https://examples.motion.dev/vue/radix-tabs)
    
*   [Toast](https://examples.motion.dev/vue/radix-toast)
    
*   [Toggle Group](https://examples.motion.dev/vue/radix-toggle-group)
    
*   [Toolbar](https://examples.motion.dev/vue/radix-toolbar)
    
*   [Tooltip](https://examples.motion.dev/vue/radix-tooltip)`
                }
            ]
        };
    });
    // Get started with Motion for React
    server.registerResource("React: Get started with Motion for React", docsUri("react", "react"), {
        description: "Learn Motion for React animation library: Install, animate HTML and SVG elements with spring animations, staggering effects. Complete guide with examples.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "react");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Get started with Motion for React

**Motion for React** is a React animation library for building smooth, production-grade UI animations. You can start with simple prop-based animations before growing to layout, gesture and scroll animations.

Motion's unique **hybrid engine** combines the performance of native browser animations with the flexibility of JavaScript. It's also trusted by companies like [Framer](https://framer.com) and [Figma](https://figma.com) to power their amazing no-code animations and gestures.

In this guide, we'll learn **why** and **when** you should use Motion, how to **install** it, and then take a whirlwind tour of its main features.

## Why Motion for React?

React gives you the power to build dynamic user interfaces, but orchestrating complex, performant animations can be a challenge. Motion is a production-ready library designed to solve this, making it simple to create everything from beautiful micro-interactions to complex, gesture-driven animations.

\`\`\`
<motion.button animate={{ opacity: 1 }} />
\`\`\`

### Key advantages

Here’s when it’s the right choice for your project.

*   **Built for React.** While other animation libraries are messy to integrate, Motion's declarative API feels like a natural extension of React. Animations can be linked directly to state and props.
    
*   **Hardware-acceleration.** Motion leverages the same high-performance browser animations as pure CSS, ensuring your UIs stay smooth and snappy. You get the power of 120fps animations with a much simpler and more expressive API.
    
*   **Animate anything.** CSS has hard limits. There's values you can't animate, keyframes you can't interrupt, staggers that must be hardcoded. Motion provides a single, consistent API that handles everything from simple transitions to advanced scroll, layout, and gesture-driven effects.
    
*   **App-like gestures.** Standard CSS \`:hover\` events are unreliable on touch devices. Motion provides robust, cross-device gesture recognisers for tap, drag, and hover, making it easy to build interactions that feel native and intuitive on any device.
    

### When is CSS a better choice?

For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution. The strength of Motion is that it can do these simple kinds of animations but also scale to anything you can imagine. All with the same easy to write and maintain API.

## Install

Motion is available via [npm](https://www.npmjs.com/package/motion):

\`\`\`
npm install motion
\`\`\`

Features can now be imported via \`"motion/react"\`:

\`\`\`
import { motion } from "motion/react"
\`\`\`

Prefer to install via CDN, or looking for framework-specific instructions? Check out our [full installation guide](/docs/react-installation.md).

## Your first animation

The \`<motion />\` component is the core API in Motion for React. It's a DOM element, supercharged with animation capabilities.

\`\`\`
<motion.ul animate={{ rotate: 360 }} />
\`\`\`

When values in \`animate\` change, the component will animate. Motion has intuitive defaults, but animations can of course be configured via [the](/docs/react-transitions.md) \`[transition](/docs/react-transitions.md)\` [prop](/docs/react-transitions.md).

\`\`\`
<motion.div
  animate={{
    scale: 2,
    transition: { duration: 2 }
  }}
/>
\`\`\`

[Learn more about React animation](/docs/react-animation.md)

## Enter animation

When a component enters the page, it will automatically animate to the values defined in the \`animate\` prop.

You can provide values to animate from via the \`initial\` prop (otherwise these will be read from the DOM).

\`\`\`
<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />
\`\`\`

Or disable this initial animation entirely by setting \`initial\` to \`false\`.

\`\`\`
<motion.button initial={false} animate={{ scale: 1 }} />
\`\`\`

## Hover & tap animation

\`<motion />\` extends React's event system with powerful [gesture animations](/docs/react-gestures.md). It currently supports hover, tap, focus, and drag.

\`\`\`
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
/>
\`\`\`

Motion's gestures are designed to feel better than using CSS or JavaScript events alone.

## Scroll animation

Motion supports both types of [scroll animations](/docs/react-scroll-animations.md): **Scroll-triggered** and **scroll-linked**.

To trigger an animation on scroll, the \`whileInView\` prop defines a state to animate to/from when an element enters/leaves the viewport:

\`\`\`
<motion.div
  initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
  whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
/>
\`\`\`

Whereas to link a value directly to scroll position, it's possible to use \`MotionValue\`s via \`useScroll\`.

\`\`\`
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
\`\`\`

## Layout animation

Motion has an industry-leading [layout animation](/docs/react-layout-animations.md) engine that supports animating between changes in layout using transforms.

It's as easy as applying the \`layout\` prop.

\`\`\`
<motion.div layout />
\`\`\`

Or to animate between completely different elements, a \`layoutId\`:

\`\`\`
<motion.div layoutId="underline" />
\`\`\`

## Exit animations

By wrapping \`motion\` components with \`<AnimatePresence>\` we gain access to [exit animations](/docs/react-animate-presence.md). This allows us to animate elements as they're removed from the DOM.

\`\`\`
<AnimatePresence>
  {show ? <motion.div key="box" exit={{ opacity: 0 }} /> : null}
</AnimatePresence>
\`\`\`

## Development tools

[Motion Studio](https://motion.dev/studio) provides visual and AI animation editing directly inside your code editor. Enhance your workflow tools like the Codex, an AI-searchable examples database, CSS spring generation, a CSS and Motion bezier editor, and more.

## Learn next

That's a very quick overview of Motion for React's basic features. But there's a lot more to learn!

Next, we recommend starting with the [React animation](/docs/react-animation.md) guide. Here, you'll learn more about the different types of animations you can build with Motion.

Or, you can learn by doing, diving straight into our collection of [Fundamentals examples](https://motion.dev/examples?platform=react#fundamentals). Each comes complete with full source code that you can copy-paste into your project.`
                }
            ]
        };
    });
    // React animation
    server.registerResource("React: React animation", docsUri("react", "animation"), {
        description: "Learn how to create React animations with Motion. Animate CSS, transforms, & SVGs. Use variants for orchestration, gestures, and keyframes.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "animation");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# React animation

[Motion for React](/) is a simple yet powerful animation library. Whether you're building hover effects, scroll-triggered animations, or complex animation sequences, this guide will provide an overview of all the ways you can animate in React with Motion.

## What you'll learn

*   How to create your first animation with the \`<motion.div />\` component.
    
*   Which values and elements you can animate.
    
*   How to customise your animations with transition options.
    
*   How to animate elements as they enter and exit the DOM.
    
*   How to orchestrate animations with variants.
    

## Animate with \`<motion />\`

Most animations in Motion are created with the [](/docs/react-motion-component.md)\`[<motion />](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md). Import it from \`"motion/react"\`:

\`\`\`
import { motion } from "motion/react"
\`\`\`

Every HTML & SVG element can be defined with a \`motion\` component:

\`\`\`
<motion.div />
\`\`\`

\`\`\`
<motion.a href="#" />
\`\`\`

\`\`\`
<motion.circle cx={0} />
\`\`\`

These components are exactly the same as their normal static counterparts, except now they have access to a bunch of [special animation props](/docs/react-motion-component#props.md).

The most common animation prop is \`animate\`. When values passed to \`animate\` change, the element will automatically animate to that value.

\`\`\`
<motion.div animate={{ opacity: 1 }} />
\`\`\`

### Enter animations

We can set initial values for an element with the \`initial\` prop. So an element defined like this will fade in when it enters the DOM:

\`\`\`
<motion.article
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
\`\`\`

## Animatable values

**Motion can animate any CSS value**, like \`opacity\`, \`filter\` etc.

\`\`\`
<motion.section
  initial={{ filter: "blur(10px)" }}
  animate={{ filter: "none" }}
/>
\`\`\`

It can even animate values that aren't normally animatable by browsers, like \`background-image\` or \`mask-image\`:

\`\`\`
<motion.nav
  initial={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)" }}
  animate={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)" }}
/>
\`\`\`

### Transforms

Unlike CSS, Motion can animate every transform axis independently.

\`\`\`
<motion.div animate={{ x: 100 }} />
\`\`\`

It supports the following special transform values:

*   Translate: \`x\`, \`y\`, \`z\`
    
*   Scale: \`scale\`, \`scaleX\`, \`scaleY\`
    
*   Rotate: \`rotate\`, \`rotateX\`, \`rotateY\`, \`rotateZ\`
    
*   Skew: \`skew\`, \`skewX\`, \`skewY\`
    
*   Perspective: \`transformPerspective\`
    

\`motion\` components also have enhanced \`style\` props, allowing you to use these shorthands statically:

\`\`\`
<motion.section style={{ x: -20 }} />
\`\`\`

Animating transforms independently provides great flexibility, especially when animating different transforms with gestures:

\`\`\`
<motion.button
  initial={{ y: 10 }}
  animate={{ y: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
/>
\`\`\`

\`\`\`
<motion.li
  initial={{ transform: "translateX(-100px)" }}
  animate={{ transform: "translateX(0px)" }}
  transition={{ type: "spring" }}
/>
\`\`\`

### Supported value types

Motion can animate any of the following value types:

*   Numbers: \`0\`, \`100\` etc.
    
*   Strings containing numbers: \`"0vh"\`, \`"10px"\` etc.
    
*   Colors: Hex, RGBA, HSLA.
    
*   Complex strings containing multiple numbers and/or colors (like \`box-shadow\`).
    
*   \`display: "none"/"block"\` and \`visibility: "hidden"/"visible"\`.
    

### Value type conversion

In general, values can only be animated between two of the same type (i.e \`"0px"\` to \`"100px"\`).

Colors can be freely animated between hex, RGBA and HSLA types.

Additionally, \`x\`, \`y\`, \`width\`, \`height\`, \`top\`, \`left\`, \`right\` and \`bottom\` can animate between different value types.

\`\`\`
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: "calc(100vw - 50%)" }}
/>
\`\`\`

It's also possible to animate \`width\` and \`height\` in to/out of \`"auto"\`.

\`\`\`
<motion.div
  initial={{ height: 0 }}
  animate={{ height: "auto" }}
/>
\`\`\`

### Transform origin

\`transform-origin\` has three shortcut values that can be set and animated individually:

*   \`originX\`
    
*   \`originY\`
    
*   \`originZ\`
    

If set as numbers, \`originX\` and \`Y\` default to a progress value between \`0\` and \`1\`. \`originZ\` defaults to pixels.

\`\`\`
<motion.div style={{ originX: 0.5 }} />
\`\`\`

### CSS variables

Motion for React can animate CSS variables, and also use CSS variable definitions as animation targets.

#### Animating CSS variables

Sometimes it's convenient to be able to animate a CSS variable to animate many children:

\`\`\`
<motion.ul
  initial={{ '--rotate': '0deg' }}
  animate={{ '--rotate': '360deg' }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <li style={{ transform: 'rotate(var(--rotate))' }} />
  <li style={{ transform: 'rotate(var(--rotate))' }} />
  <li style={{ transform: 'rotate(var(--rotate))' }} />
</motion.ul>
\`\`\`

### CSS variables as animation targets

HTML \`motion\` components accept animation targets with CSS variables:

\`\`\`
<motion.li animate={{ backgroundColor: "var(--action-bg)" }} />
\`\`\`

## Transitions

By default, Motion will create appropriate transitions for snappy animations based on the type of value being animated.

For instance, physical properties like \`x\` or \`scale\` are animated with spring physics, whereas values like \`opacity\` or \`color\` are animated with duration-based easing curves.

However, you can define your own animations via [the](/docs/react-transitions.md) \`[transition](/docs/react-transitions.md)\` [prop](/docs/react-transitions.md).

\`\`\`
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: "easeOut", duration: 2 }}
/>
\`\`\`

A default \`transition\` can be set for many components with the \`[MotionConfig](/docs/react-motion-config.md)\` [component](/docs/react-motion-config.md):

\`\`\`
<MotionConfig transition={{ duration: 0.3 }}>
  <motion.div animate={{ opacity: 1 }} />
  // etc
\`\`\`

Or you can set a specific \`transition\` on any animation prop:

\`\`\`
<motion.div
  animate={{ opacity: 1 }}
  whileHover={{
    opacity: 0.7,
    // Specific transitions override default transitions
    transition: { duration: 0.3 }
  }}
  transition={{ duration: 0.5 }}
/>
\`\`\`

## Enter animations

When a \`motion\` component is first created, it'll automatically animate to the values in \`animate\` if they're different from those initially rendered, which you can either do via CSS or via [the](/docs/react-motion-value.md) \`[initial](/docs/react-motion-value.md)\` [prop.](/docs/react-motion-value.md)

\`\`\`
<motion.li
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
/>
\`\`\`

You can also disable the enter animation entirely by setting \`initial={false}\`. This will make the element render with the values defined in \`animate\`.

\`\`\`
<motion.div initial={false} animate={{ y: 100 }} />
\`\`\`

## Exit animations

Motion for React can animate elements as they're removed from the DOM.

In React, when a component is removed, it's usually removed instantly. Motion provides [the](/docs/react-animate-presence.md) \`[AnimatePresence](/docs/react-animate-presence.md)\` [component](/docs/react-animate-presence.md) which keeps elements in the DOM while they perform an animation defined with the \`exit\` prop.

\`\`\`
<AnimatePresence>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
\`\`\`

## Keyframes

So far, we've set animation props like \`animate\` and \`exit\` to single values, like \`opacity: 0\`.

This is great when we want to animate from the current value to a new value. But sometimes we want to animate through a **series of values**. In animation terms, these are called **keyframes**.

All animation props can accept keyframe arrays:

\`\`\`
<motion.div animate={{ x: [0, 100, 0] }} />
\`\`\`

When we animate to an array of values, the element will animate through each of these values in sequence.

In the previous example, we explicitly set the initial value as \`0\`. But we can also say "use the current value" by setting the first value to \`null\`.

\`\`\`
<motion.div animate={{ x: [null, 100, 0] }} />
\`\`\`

This way, if a keyframe animation is interrupting another animation, the transition will feel more natural.

### Wildcard keyframes

This \`null\` keyframe is called a **wildcard keyframe**. A wildcard keyframe simply takes the value before it (or the current value, if this is the first keyframe in the array).

Wildcard keyframes can be useful for holding a value mid-animation without having to repeat values.

\`\`\`
<motion.div
  animate={{ x: [0, 100, null, 0 ] }}
  // same as x: [0, 100, 100, 0] but easier to maintain
/>
\`\`\`

### Keyframe timing

By default, each keyframe is spaced evenly throughout the animation. You can override this by setting [the](/docs/react-transitions#times.md) \`[times](/docs/react-transitions#times.md)\` [option](/docs/react-transitions#times.md) via \`transition\`.

\`times\` is an array of progress values between \`0\` and \`1\`, defining where in the animation each keyframe should be positioned.

\`\`\`
<motion.circle
  cx={500}
  animate={{
    cx: [null, 100, 200],
    transition: { duration: 3, times: [0, 0.2, 1] }
  }}
/>
\`\`\`

\`0\` is the start of the animation, and \`1\` is the end of the animation. Therefore, \`0.2\` places this keyframe somewhere towards the start of the animation.

## Gesture animations

Motion for React has animation props that can define how an element animates when it [recognises a gesture](/docs/react-gestures.md).

Supported gestures are:

*   \`whileHover\`
    
*   \`whileTap\`
    
*   \`whileFocus\`
    
*   \`whileDrag\`
    
*   \`whileInView\`
    

When a gesture starts, it animates to the values defined in \`while-\`, and then when the gesture ends it animates back to the values in \`initial\` or \`animate\`.

\`\`\`
<motion.button
  initial={{ opacity: 0 }}
  whileHover={{ backgroundColor: "rgba(220, 220, 220, 1)" }}
  whileTap={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
  whileInView={{ opacity: 1 }}
/>
\`\`\`

The custom Cursor component available in [Motion+](https://motion.dev/plus) takes this a step further with magnetic and target-morphing effects as a user hovers clickable targets (like buttons and links):

\`\`\`
<Cursor magnetic />
\`\`\`

## Variants

Setting \`animate\` as a target is useful for simple, single-element animations. It's also possible to orchestrate animations that propagate throughout the DOM. We can do so with variants.

Variants are a set of named targets. These names can be anything.

\`\`\`
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
\`\`\`

Variants are passed to \`motion\` components via the \`variants\` prop:

\`\`\`
<motion.div variants={variants} />
\`\`\`

These variants can now be referred to by a label, wherever you can define an animation target:

\`\`\`
<motion.div
  variants={variants}
  initial="hidden"
  whileInView="visible"
  exit="hidden"
/>
\`\`\`

You can also define multiple variants via an array:

\`\`\`
animate={["visible", "danger"]}
\`\`\`

### Propagation

Variants are useful for reusing and combining animation targets. But it becomes powerful for orchestrating animations throughout trees.

Variants will flow down through \`motion\` components. So in this example when the \`ul\` enters the viewport, all of its children with a "visible" variant will also animate in:

\`\`\`
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

return (
  <motion.ul
    initial="hidden"
    whileInView="visible"
    variants={list}
  >
    <motion.li variants={item} />
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
\`\`\`

### Orchestration

By default, this children animations will start simultaneously with the parent. But with variants we gain access to new \`transition\` props \`[when](/docs/react-transitions#orchestration.md)\` [and](/docs/react-transitions#orchestration.md) \`[delayChildren](/docs/react-transitions#orchestration.md)\`.

\`\`\`
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: stagger(0.3), // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}
\`\`\`

### Dynamic variants

Each variant can be defined as a function that resolves when a variant is made active.

\`\`\`
const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 }
  })
}
\`\`\`

These functions are provided a single argument, which is passed via the \`custom\` prop:

\`\`\`
items.map((item, index) => <motion.div custom={index} variants={variants} />)
\`\`\`

This way, variants can be resolved differently for each animating element.

## Animation controls

Declarative animations are ideal for most UI interactions. But sometimes we need to take manual control over animation playback.

The \`[useAnimate](/docs/react-use-animate.md)\` [hook](/docs/react-use-animate.md) can be used for:

*   Animating any HTML/SVG element (not just \`motion\` components).
    
*   Complex animation sequences.
    
*   Controlling animations with \`time\`, \`speed\`, \`play()\`, \`pause()\` and other playback controls.
    

\`\`\`
function MyComponent() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const controls = animate([
      [scope.current, { x: "100%" }],
      ["li", { opacity: 1 }]
    ])

    controls.speed = 0.8

    return () => controls.stop()
  }, [])

  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
\`\`\`

## Animate content

By passing [a](/docs/react-motion-value.md) \`[MotionValue](/docs/react-motion-value.md)\` as the child of a \`motion\` component, it will render its latest value in the HTML.

\`\`\`
import { useMotionValue, motion, animate } from "motion/react"

function Counter() {
  const count = useMotionValue(0)

  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 })
    return () => controls.stop()
  }, [])

  return <motion.pre>{count}</motion.pre>
}
\`\`\`

This is more performant than setting React state as the \`motion\` component will set \`innerHTML\` directly.

It's also possible to animate numbers with a ticking counter effect using the \`AnimateNumber\` component in [Motion+](https://motion.dev/plus) by passing them directly to the component:

\`\`\`
<AnimateNumber>{value}</AnimateNumber>
\`\`\`

## Next

In this guide we've covered the basic kinds of animations we can perform in Motion using its **animation props**. However, there's much more to discover.

Most of the examples on this page have used HTML elements, but Motion also has unique [SVG animation](/docs/react-svg-animation.md) features, like its simple line drawing API.

We've also only covered time-based animations, but Motion also provides powerful [scroll animation](/docs/react-scroll-animations.md) features like \`useScroll\` and \`whileInView\`.

It also provides a powerful [layout animation](/docs/react-layout-animations.md) engine, that can animate between any two layouts using performant transforms.

Finally, there's also a whole [Fundamentals examples category](https://motion.dev/examples?platform=react#fundamentals) that covers all the basics of animating with Motion for React with live demos and copy-paste code.`
                }
            ]
        };
    });
    // Layout animation
    server.registerResource("React: Layout animation", docsUri("react", "layout-animations"), {
        description: "Animate layout changes in React with Motion. Auto layout transitions, FLIP, shared-element animations via layoutId, and performance tips (with code).",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "layout-animations");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Layout animation

Motion makes it simple to **animate an element's size and position** between different layouts. With the \`layout\` prop, you can perform layout animations, and by using \`layoutId\` you can create seamless "magic motion" effects between two separate elements.

In this guide, we'll learn how to:

*   **Animate layout changes** with a single prop.
    
*   Create **shared element transitions** between components.
    
*   Explore **advanced techniques**.
    
*   **Troubleshoot** common layout animation issues.
    
*   Understand the **differences** between Motion and the native View Transitions API.
    

## How to animate layout changes

To enable layout animations on a \`motion\` component, simply add the \`layout\` prop. Any layout change that happens as a result of a React render will now be automatically animated.

\`\`\`
<motion.div layout />
\`\`\`

Layout animation can animate previously unanimatable CSS values, like switching \`justify-content\` between \`flex-start\` and \`flex-end\`.

\`\`\`
<motion.div
  layout
  style={{ justifyContent: isOn ? "flex-start" : "flex-end" }}
/>
\`\`\`

Or by using the \`layoutId\` prop, it's possible to match two elements and animate between them for some truly advanced animations.

\`\`\`
<motion.li layoutId="item" />
\`\`\`

It can handle anything from microinteractions to full page transitions.

Layout changes can be anything, changing \`width\`/\`height\`, number of grid columns, reordering a list, or adding/removing new items:

### Performance

Animating layout is traditionally slow, but Motion performs all layout animations using the CSS \`transform\` property for the highest possible performance.

### Shared layout animations

For more advanced shared layout animations, \`layoutId\` allows you to connect two different elements.

When a new component is added with a \`layoutId\` prop matching an existing component, it will automatically animate out from the old component.

\`\`\`
isSelected && <motion.div layoutId="underline" />
\`\`\`

If the original component is still on the page when the new one enters, they will automatically crossfade.

To animate an element back to its origin, you can use the \`[AnimatePresence](/docs/react-animate-presence.md)\` component to keep it in the DOM until its exit animation has finished.

\`\`\`
<AnimatePresence>
  {isOpen && <motion.div layoutId="modal" />}
</AnimatePresence>
\`\`\`

### Customise a layout animation

Layout animations can be customised using [the](/docs/react-transitions.md) \`[transition](/docs/react-transitions.md)\` [prop](/docs/react-transitions.md).

\`\`\`
<motion.div layout transition={{ duration: 0.3 }} />
\`\`\`

If you need to set a transition specifically for the layout animation while having a different transition for other properties (like \`opacity\`), you can define a dedicated \`layout\` transition.

\`\`\`
<motion.div
  layout
  animate={{ opacity: 0.5 }}
  transition={{
    ease: "linear",
    layout: { duration: 0.3 }
  }}
/>
\`\`\`

When performing a shared layout animation, the transition defined for element we're animating **to** will be used.

\`\`\`
<>
  <motion.button
    layoutId="modal"
    onClick={() => setIsOpen(true)}
    // This transition will be used when the modal closes
    transition={{ type: "spring" }}
  >
    Open
  </motion.button>
  <AnimatePresence>
    {isOn && (
      <motion.dialog
        layoutId="modal"
        // This transition will be used when the modal opens
        transition={{ duration: 0.3 }}
      />
    )}
  </AnimatePresence>
</>
\`\`\`

## Advanced use-cases

### Animating within scrollable element

To correctly animate layout within a scrollable container, you must add the \`**layoutScroll**\` prop to the scrollable element. This allows Motion to account for the element's scroll offset.

\`\`\`
<motion.div layoutScroll style={{ overflow: "scroll" }} />
\`\`\`

### Animating within fixed containers

To correctly animate layout within fixed elements, we need to provide them the \`layoutRoot\` prop.

\`\`\`
<motion.div layoutRoot style={{ position: "fixed" }} />
\`\`\`

This lets Motion account for the page's scroll offset when measuring children.

### Group layout animations

Layout animations are triggered when a component re-renders and its layout has changed.

\`\`\`
function Accordion() {
  const [isOpen, setOpen] = useState(false)
  
  return (
    <motion.div
      layout
      style={{ height: isOpen ? "100px" : "500px" }}
      onClick={() => setOpen(!isOpen)}
    />
  )
}
\`\`\`

But what happens when we have two or more components that don't re-render at the same time, but **do** affect each other's layout?

\`\`\`
function List() {
  return (
    <>
      <Accordion />
      <Accordion />
    </>  
  )
}
\`\`\`

When one re-renders, for performance reasons the other won't be able to detect changes to its layout.

We can synchronise layout changes across multiple components by wrapping them in the \`[LayoutGroup component](/docs/react-layout-group.md)\`.

\`\`\`
import { LayoutGroup } from "motion/react"

function List() {
  return (
    <LayoutGroup>
      <Accordion />
      <Accordion />
    </LayoutGroup>  
  )
}
\`\`\`

When layout changes are detected in any grouped \`motion\` component, layout animations will trigger across all of them.

### Scale correction

Because \`layout\` animations use \`transform: scale()\`, they can sometimes visually distort children or certain CSS properties.

*   **Child elements:** To fix distortion on direct children, these can also be given the \`layout\` prop.
    
*   **Border radius and box shadow:** Motion automatically corrects distortion on these properties, but they must be set via the \`style\`, \`animate\` or other animation prop.
    

\`\`\`
<motion.div layout style={{ borderRadius: 20 }} />
\`\`\`

## Troubleshooting

### The component isn't animating

Ensure the component is **not** set to \`display: inline\`, as browsers don't apply \`transform\` to these elements.

Ensure the component is re-rendering when you expect the layout animation to start.

### Animations don't work during window resize

Layout animations are blocked during horizontal window resize to improve performance and to prevent unnecessary animations.

### SVG layout animations are broken

SVG components aren't currently supported with layout animations. SVGs don't have layout systems so it's recommended to directly animate their attributes like \`cx\` etc.

### The content stretches undesirably

This is a natural side-effect of animating \`width\` and \`height\` with \`scale\`.

Often, this can be fixed by providing these elements a \`layout\` animation and they'll be scale-corrected.

\`\`\`
<motion.section layout>
  <motion.img layout />
</motion.section>
\`\`\`

Some elements, like images or text that are changing between different aspect ratios, might be better animated with \`layout="position"\`.

### Border radius or box shadows are behaving strangely

Animating \`scale\` is performant but can distort some styles like \`border-radius\` and \`box-shadow\`.

Motion automatically corrects for scale distortion on these properties, but they must be set on the element via \`style\`.

\`\`\`
<motion.div layout style={{ borderRadius: 20 }} />
\`\`\`

### Border looks stretched during animation

Elements with a \`border\` may look stretched during the animation. This is for two reasons:

1.  Because changing \`border\` triggers layout recalculations, it defeats the performance benefits of animating via \`transform\`. You might as well animate \`width\` and \`height\` classically.
    
2.  \`border\` can't render smaller than \`1px\`, which limits the degree of scale correction that Motion can perform on this style.
    

A work around is to replace \`border\` with a parent element with padding that acts as a \`border\`.

\`\`\`
<motion.div layout style={{ borderRadius: 10, padding: 5 }}>
  <motion.div layout style={{ borderRadius: 5 }} />
</motion.div>
\`\`\`

## Technical reading

Interested in the technical details behind layout animations? Nanda does an incredible job of [explaining the challenges](https://www.nan.fyi/magic-motion) of animating layout with transforms using interactive examples. Matt, creator of Motion, did a [talk at Vercel conference](https://www.youtube.com/watch?v=5-JIu0u42Jc&ab_channel=Vercel) about the implementation details that is largely up to date.

## Motion's layout animations vs the View Transitions API

More browsers are starting to support the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), which is similar to Motion's layout animations.

### Benefits of View Transitions API

The main two benefits of View Transitions is that **it's included in browsers** and **features a unique rendering system**.

#### Filesize

Because the View Transitions API is already included in browsers, it's cheap to implement very simple crossfade animations.

However, the CSS complexity can scale quite quickly. Motion's layout animations are around 12kb but from there it's very cheap to change transitions, add springs, mark matching

#### Rendering

Whereas Motion animates the elements as they exist on the page, View Transitions API does something quite unique in that it takes an image snapshot of the previous page state, and crossfades it with a live view of the new page state.

For shared elements, it does the same thing, taking little image snapshots and then crossfading those with a live view of the element's new state.

This can be leveraged to create interesting effects like full-screen wipes that aren't really in the scope of layout animations. [Framer's Page Effects](https://www.framer.com/academy/lessons/page-effects) were built with the View Transitions API and it also extensively uses layout animations. The right tool for the right job.

### Drawbacks to View Transitions API

There are quite a few drawbacks to the API vs layout animations:

*   **Not interruptible**: Interrupting an animation mid-way will snap the animation to the end before starting the next one. This feels very janky.
    
*   **Blocks interaction**: The animating elements overlay the "real" page underneath and block pointer events. Makes things feel quite sticky.
    
*   **Difficult to manage IDs**: Layout animations allow more than one element with a \`layoutId\` whereas View Transitions will break if the previous element isn't removed.
    
*   **Less performant:** View Transitions take an actual screenshot and animate via \`width\`/\`height\` vs layout animation's \`transform\`. This is measurably less performant when animating many elements.
    
*   **Doesn't account for scroll**: If the page scroll changes during a view transition, elements will incorrectly animate this delta.
    
*   **No relative animations:** If a nested element has a \`delay\` it will get "left behind" when its parent animates away, whereas Motion handles this kind of relative animation.
    
*   **One animation at a time**: View Transitions animate the whole screen, which means combining it with other animations is difficult and other view animations impossible.
    

All-in-all, each system offers something different and each might be a better fit for your needs. In the future it might be that Motion also offers an API based on View Transitions API.`
                }
            ]
        };
    });
    // Scroll animation
    server.registerResource("React: Scroll animation", docsUri("react", "scroll-animations"), {
        description: "Create scroll-triggered or scroll-linked animations with Motion for React. Use whileInView for viewport triggers and useScroll to link animations to scroll progress.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "scroll-animations");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Scroll animation

There are two types of scroll animations:

*   **Scroll-triggered:** A normal animation is triggered when an element enters the viewport.
    
*   **Scroll-linked:** Values are linked directly to scroll progress.
    

Motion is capable of both types of animation.

## Scroll-triggered animations

Scroll-triggered animations are just normal animations that fire when an element enters or leaves the viewport.

Motion offers [the](/docs/react-motion-component#whileinview.md) \`[whileInView](/docs/react-motion-component#whileinview.md)\` [prop](/docs/react-motion-component#whileinview.md) to set an animation target or variant when the element enters the view.

\`\`\`
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>
\`\`\`

### One-time animations

With [the](/docs/react-motion-component#viewport-1.md) \`[viewport](/docs/react-motion-component#viewport-1.md)\` [options](/docs/react-motion-component#viewport-1.md), it's possible to set \`once: true\` so once an element has entered the viewport, it won't animate back out.

\`\`\`
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
/>
\`\`\`

### Changing scroll container

By default, the element will be considered within the viewport when it enters/leaves the **window**. This can be changed by providing the \`ref\` of another scrollable element.

\`\`\`
function Component() {
  const scrollRef = useRef(null)
  
  return (
    <div ref={scrollRef} style={{ overflow: "scroll" }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: scrollRef }}
      />
    </div>
  )
}
\`\`\`

For more configuration options, checkout [the](/docs/react-motion-component#viewport-1.md) \`[motion](/docs/react-motion-component#viewport-1.md)\` [component](/docs/react-motion-component#viewport-1.md) API reference.

### Setting state

It's also possible to set state when any element (not just a \`motion\` component) enters and leaves the viewport with the \`[useInView](/docs/react-use-in-view.md)\` [hook](/docs/react-use-in-view.md).

## Scroll-linked animations

Scroll-linked animations are created using [motion values](/docs/react-motion-value.md) and the \`[useScroll](/docs/react-use-scroll.md)\` [hook](/docs/react-use-scroll.md).

\`useScroll\` returns four motion values, two that store scroll offset in pixels (\`scrollX\` and \`scrollY\`) and two that store scroll progress as a value between \`0\` and \`1\`.

These motion values can be passed directly to specific styles. For instance, passing \`scrollYProgress\` to \`scaleX\` works great as a progress bar.

\`\`\`
const { scrollYProgress } = useScroll();

return (
  <motion.div style={{ scaleX: scrollYProgress }} />  
)
\`\`\`

> Since \`scrollY\` is a \`MotionValue\`, there's a neat trick you can use to tell when the user's scroll direction changes:
> 
> \`\`\`
> const { scrollY } = useScroll()
> const [scrollDirection, setScrollDirection] = useState("down")
> 
> useMotionValueEvent(scrollY, "change", (current) => {
>   const diff = current - scrollY.getPrevious()
>   setScrollDirection(diff > 0 ? "down" : "up")
> })
> \`\`\`
> 
> Perfect for triggering a sticky header animation!  
> ~ Sam Selikoff, [Motion for React Recipes](https://buildui.com/courses/framer-motion-recipes)

### Value smoothing

This value can be smoothed by passing it through \`[useSpring](/docs/react-use-spring.md)\`.

\`\`\`
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})

return <motion.div style={{ scaleX }} />
\`\`\`

### Transform other values

With [the](/docs/react-use-transform.md) \`[useTransform](/docs/react-use-transform.md)\` [hook](/docs/react-use-transform.md), it's easy to use the progress motion values to mix between any value, like colors:

\`\`\`
const backgroundColor = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ["#f00", "#0f0", "#00f"]
)

return <motion.div style={{ backgroundColor }} />
\`\`\`

### Examples

#### Track element scroll offset

#### Track element within viewport

#### Parallax

#### 3D

#### Scroll velocity and direction

Read the [full](/docs/react-use-scroll.md) \`[useScroll](/docs/react-use-scroll.md)\` [docs](/docs/react-use-scroll.md) to discover more about creating the above effects.`
                }
            ]
        };
    });
    // SVG animation
    server.registerResource("React: SVG animation", docsUri("react", "svg-animation"), {
        description: "SVG animations in React with Motion. Line drawing via pathLength, transforms, attribute animation (attrX/attrY), scroll-linked animations, morphing and more.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "svg-animation");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# SVG animation

Motion makes React SVG animation straightforward. In this guide, we'll learn how to make line drawing animations, path morphing animations, animate \`viewBox\` and more.

## Overview

SVG animations are generally performed as usual, via the \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md). There's a \`motion\` component for every SVG element (e.g. \`<motion.svg>\`, \`<motion.path>\`, \`<motion.circle>\`, and even filters like \`<motion.feTurbulence>\` and \`<motion.feDisplacementMap>\`).

\`\`\`
<motion.svg>
  <motion.circle />
</motion.svg>
\`\`\`

A \`motion\` component can animate \`style\`, as normal:

\`\`\`
<motion.circle
  style={{ fill: "#00f" }}
  animate={{ fill: "#f00" }}
/>
\`\`\`

But it can also animate attributes:

\`\`\`
<motion.circle
  cx={0}
  animate={{ cx: 50 }}
/>
\`\`\`

### Animate \`viewBox\`

The \`motion.svg\` component can additionally animate \`viewBox\`. This is especially useful for easy panning animations:

\`\`\`
<motion.svg
  viewBox="0 0 200 200"
  animate={{ viewBox: "100 0 200 200" }} // 100px to the right
/>
\`\`\`

Or zoom in/out animations:

\`\`\`
<motion.svg
  viewBox="0 0 200 200"
  animate={{ viewBox: "-100 -100 300 300" }} // Zoom out
/>
\`\`\`

### Transforms

SVG transforms work differently to CSS transforms. When we define a CSS transform, the default origin is **relative to the element itself.** So for instance, this \`div\` will rotate around its center point, as you'd intuitively expect:

\`\`\`
<motion.div style={{ rotate: 90 }} />
\`\`\`

With SVGs, the transform point is relative to the top/left corner of the \`viewBox\`, which is less intuitive. Motion changes this behaviour so SVGs work the same as normal elements. Therefore, this:

\`\`\`
<motion.rect style={{ rotate: 90 }} />
\`\`\`

Will also rotate the \`rect\` element around its center point.

The default behaviour can be restored by explicitly setting an element's \`transformBox\` style:

\`\`\`
<motion.rect style={{ rotate: 90, transformBox: "view-box" }} />
\`\`\`

### \`x\`/\`y\`/\`scale\` attributes

\`motion\` components provide shorthands for \`x\`, \`y\`, and \`scale\` transforms:

\`\`\`
<motion.div animate={{ x: 100 }} />
\`\`\`

With SVG components, these will still render via the \`style\` tag. This is usually fine, but some SVG components accept \`x\`, \`y\`, and \`scale\` attributes also. You can target these via animation props using \`attrX\`, \`attrY\` and \`attrScale\` respectively:

\`\`\`
<motion.rect attrX={0} animate={{ attrX: 100 }} />
\`\`\`

### Passing \`MotionValue\`

[Motion values](/docs/react-motion-value.md) should be passed via \`style\`, when animating regular styles, or via the component's attribute where appropriate:

\`\`\`
const cx = useMotionValue(100)
const opacity = useMotionValue(1)

return <motion.rect cx={cx} style={{ opacity }} />
\`\`\`

## Line drawing

Motion simplifies the creation of “hand-drawn” line animations using three special values. Each is set as a \`0\`\\-\`1\` progress value, where \`1\` is the total length of the line:

*   \`pathLength\`: total drawn length
    
*   \`pathSpacing\`: length between segments
    
*   \`pathOffset\`: where the segment starts
    

These values work on \`path\`, \`circle\`, \`ellipse\`, \`line\`, \`polygon\`, \`polyline\`, \`rect\`.

\`\`\`
<motion.path
  d={d}
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
\`\`\`

## Path morphing

It's possible to also animate the shape of a \`path\` via its \`d\` attribute.

\`\`\`
<motion.path
  d="M 0,0 l 0,10 l 10,10"
  animate={{ d: "M 0,0 l 10,0 l 10,10" }}
/>
\`\`\`

This works natively in Motion **as long as the two paths are similar**. You can see in the example above that each path has the same number and type of path instructions.

For interpolating between very different paths, you can incorporate a third-party path mixer like [Flubber](https://www.npmjs.com/package/flubber):`
                }
            ]
        };
    });
    // Transitions
    server.registerResource("React: Transitions", docsUri("react", "transitions"), {
        description: "Define animation behavior with Motion for React's transition prop. Choose time-based or physics-based animations. Customize duration, easing, delay, and repeat.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "transitions");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Transitions

A \`transition\` defines the type of animation used when animating between two values.

\`\`\`
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}
\`\`\`

\`\`\`
// Motion component
<motion.div
  animate={{ x: 100 }}
  transition={transition}
/>

// animate() function
animate(".box", { x: 100 }, transition)
\`\`\`

## Setting a transition

\`transition\` can be set on any animation prop, and that transition will be used when the animation fires.

\`\`\`
<motion.div
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.2 }
  }}
/>
\`\`\`

### Value-specific transitions

When animating multiple values, each value can be animated with a different transition, with \`default\` handling all other values:

\`\`\`
// Motion component
<motion.li
  animate={{
    x: 0,
    opacity: 1,
    transition: {
      default: { type: "spring" },
      opacity: { ease: "linear" }
    }
  }}
/>

// animate() function
animate("li", { x: 0, opacity: 1 }, {
  default: { type: "spring" },
  opacity: { ease: "linear" }
})
\`\`\`

### Default transitions

It's possible to set default transitions via the \`transition\` prop. Either for specific \`motion\` components:

\`\`\`
<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 100 }}
/>
\`\`\`

Or for a group of \`motion\` components [via](/docs/react-motion-config#transition.md) \`[MotionConfig](/docs/react-motion-config#transition.md)\`:

\`\`\`
<MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
  <App />
</MotionConfig>
\`\`\`

## Transition settings

#### \`type\`

**Default:** Dynamic

\`type\` decides the type of animation to use. It can be \`"tween"\`, \`"spring"\` or \`"inertia"\`.

**Tween** animations are set with a duration and an easing curve.

**Spring** animations are either physics-based or duration-based.

Physics-based spring animations are set via \`stiffness\`, \`damping\` and \`mass\`, and these incorporate the velocity of any existing gestures or animations for natural feedback.

Duration-based spring animations are set via a \`duration\` and \`bounce\`. These don't incorporate velocity but are easier to understand.

**Inertia** animations decelerate a value based on its initial velocity, usually used to implement inertial scrolling.

\`\`\`
<motion.path
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, type: "tween" }}
/>
\`\`\`

#### Spring visualiser

### Tween

#### \`duration\`

**Default:** \`0.3\` (or \`0.8\` if multiple keyframes are defined)

The duration of the animation. Can also be used for \`"spring"\` animations when \`bounce\` is also set.

\`\`\`
animate("ul > li", { opacity: 1 }, { duration: 1 })
\`\`\`

#### \`ease\`

The easing function to use with tween animations. Accepts:

*   Easing function name. E.g \`"linear"\`
    
*   An array of four numbers to define a cubic bezier curve. E.g \`[.17,.67,.83,.67]\`
    
*   A [JavaScript easing function](/docs/easing-functions.md), that accepts and returns a value \`0\`\\-\`1\`.
    

These are the available easing function names:

*   \`"linear"\`
    
*   \`"easeIn"\`, \`"easeOut"\`, \`"easeInOut"\`
    
*   \`"circIn"\`, \`"circOut"\`, \`"circInOut"\`
    
*   \`"backIn"\`, \`"backOut"\`, \`"backInOut"\`
    
*   \`"anticipate"\`
    

When animating keyframes, \`ease\` can optionally be set as an array of easing functions to set different easings between each value:

\`\`\`
<motion.div
  animate={{
    x: [0, 100, 0],
    transition: { ease: ["easeIn", "easeOut"] }
  }}
/>
\`\`\`

For immediate visual feedback, you can edit CSS or Motion easing curves directly in your code editor with the [Motion extension](/docs/studio-install.md).

#### \`times\`

When animating multiple keyframes, \`times\` can be used to adjust the position of each keyframe throughout the animation.

Each value in \`times\` is a value between \`0\` and \`1\`, representing the start and end of the animation.

\`\`\`
<motion.div
  animate={{
    x: [0, 100, 0],
    transition: { times: [0, 0.3, 1] }
  }}
/>
\`\`\`

There must be the same number of \`times\` as there are keyframes. Defaults to an array of evenly-spread durations.

### Spring

#### \`bounce\`

**Default:** \`0.25\`

\`bounce\` determines the "bounciness" of a spring animation.

\`0\` is no bounce, and \`1\` is extremely bouncy.

\`\`\`
<motion.div
  animate={{ rotateX: 90 }}
  transition={{ type: "spring", bounce: 0.25 }}
/>
\`\`\`

#### \`visualDuration\`

If \`visualDuration\` is set, this will override \`duration\`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

\`\`\`
<motion.div
  animate={{ rotateX: 90 }}
  transition={{
    type: "spring",
    visualDuration: 0.5,
    bounce: 0.25
  }}
/>
\`\`\`

#### \`damping\`

**Default:** \`10\`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

\`\`\`
<motion.a
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', damping: 300 }}
/>
\`\`\`

#### \`mass\`

**Default:** \`1\`

Mass of the moving object. Higher values will result in more lethargic movement.

\`\`\`
<motion.feTurbulence
  animate={{ baseFrequency: 0.5 }}
  transition={{ type: "spring", mass: 0.5 }}
/>
\`\`\`

#### \`stiffness\`

**Default:** \`1\`

Stiffness of the spring. Higher values will create more sudden movement.

\`\`\`
<motion.section
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', stiffness: 50 }}
/>
\`\`\`

> _I never really understood how_ \`_damping_\`_,_ \`_mass_\` _and_ \`_stiffness_\` _influence a spring animation, so I made a_ [_tool for myself_](https://emilkowal.ski/ui/great-animations#great-animations-feel-natural) _to visualise it._~ Emil Kowalski, [Animations on the Web](https://animations.dev/)

#### \`velocity\`

**Default:** Current value velocity

The initial velocity of the spring.

\`\`\`
<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', velocity: 2 }}
/>
\`\`\`

#### \`restSpeed\`

**Default:** \`0.1\`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than \`restDelta\`.

\`\`\`
<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', restSpeed: 0.5 }}
/>
\`\`\`

#### \`restDelta\`

**Default:** \`0.01\`

End animation if distance is below this value and speed is below \`restSpeed\`. When animation ends, the spring will end.

\`\`\`
<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', restDelta: 0.5 }}
/>
\`\`\`

### Inertia

An animation that decelerates a value based on its initial velocity. Optionally, \`min\` and \`max\` boundaries can be defined, and inertia will snap to these with a spring animation.

This animation will automatically precalculate a target value, which can be modified with the \`modifyTarget\` property.

This allows you to add snap-to-grid or similar functionality.

Inertia is also the animation used for \`dragTransition\`, and can be configured via that prop.

#### \`power\`

**Default:** \`0.8\`

A higher power value equals a further calculated target.

\`\`\`
<motion.div
  drag
  dragTransition={{ power: 0.2 }}
/>
\`\`\`

#### \`timeConstant\`

**Default:** \`**700**\`

Adjusting the time constant will change the duration of the deceleration, thereby affecting its feel.

\`\`\`
<motion.div
  drag
  dragTransition={{ timeConstant: 200 }}
/>
\`\`\`

#### \`modifyTarget\`

A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.

\`\`\`
<motion.div
  drag
  // dragTransition always type: inertia
  dragTransition={{
    power: 0,
    // Snap calculated target to nearest 50 pixels
    modifyTarget: target => Math.round(target / 50) * 50
  }}
/>
\`\`\`

#### \`min\`

Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).

\`\`\`
<motion.div
  drag
  dragTransition={{ min: 0, max: 100 }}
/>
\`\`\`

#### \`max\`

Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).

\`\`\`
<motion.div
  drag
  dragTransition={{ min: 0, max: 100 }}
/>
\`\`\`

#### \`bounceStiffness\`

**Default:** \`500\`

If \`min\` or \`max\` is set, this affects the stiffness of the bounce spring. Higher values will create more sudden movement.

\`\`\`
<motion.div
  drag
  dragTransition={{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }}
/>
\`\`\`

#### \`bounceDamping\`

**Default:** \`10\`

If \`min\` or \`max\` is set, this affects the damping of the bounce spring. If set to \`0\`, spring will oscillate indefinitely.

\`\`\`
<motion.div
  drag
  dragTransition={{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }}
/>
\`\`\`

### Orchestration

#### \`delay\`

**Default:** \`0\`

Delay the animation by this duration (in seconds).

\`\`\`
animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
\`\`\`

By setting \`delay\` to a negative value, the animation will start that long into the animation. For instance to start 1 second in, \`delay\` can be set to -\`1\`.

#### \`repeat\`

**Default:** \`0\`

The number of times to repeat the transition. Set to \`Infinity\` for perpetual animation.

\`\`\`
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, duration: 2 }}
/>
\`\`\`

#### \`repeatType\`

**Default:** \`"loop"\`

How to repeat the animation. This can be either:

*   \`loop\`: Repeats the animation from the start.
    
*   \`reverse\`: Alternates between forward and backwards playback.
    
*   \`mirror\`: Switches animation origin and target on each iteration.
    

\`\`\`
<motion.div
  animate={{ rotate: 180 }}
  transition={{
    repeat: 1,
    repeatType: "reverse",
    duration: 2
  }}
/>
\`\`\`

#### \`repeatDelay\`

**Default:** \`0\`

When repeating an animation, \`repeatDelay\` will set the duration of the time to wait, in seconds, between each repetition.

\`\`\`
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, repeatDelay: 1 }}
/>
\`\`\`

#### \`when\`

**Default:** \`false\`

With variants, describes when an animation should trigger, relative to that of its children.

*   \`"beforeChildren"\`: Children animations will play after the parent animation finishes.
    
*   \`"afterChildren"\`: Parent animations will play after the children animations finish.
    

\`\`\`
const list = {
  hidden: {
    opacity: 0,
    transition: { when: "afterChildren" }
  }
}

const item = {
  hidden: {
    opacity: 0,
    transition: { duration: 2 }
  }
}

return (
  <motion.ul variants={list} animate="hidden">
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
\`\`\`

#### \`delayChildren\`

**Default:** \`0\`

With variants, setting \`delayChildren\` on a parent will delay child animations by this duration (in seconds).

\`\`\`
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

return (
  <motion.ul
    variants={container}
    initial="hidden"
    animate="show"
  >
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
\`\`\`

Using the \`[stagger](/docs/stagger.md)\` function, we can stagger the delay across children.

\`\`\`
const transition = {
  delayChildren: stagger(0.1)
}
\`\`\`

By default, delay will stagger across children from first to last. By using \`stagger\`'s \`from\` option, we can stagger from the last child, the center, or a specific index.

\`\`\`
const transition = {
  delayChildren: stagger(0.1, { from: "last" })
}
\`\`\``
                }
            ]
        };
    });
    // Gesture animation
    server.registerResource("React: Gesture animation", docsUri("react", "gestures"), {
        description: "Power your UI with Motion for React's gestures: hover, tap, pan, drag & inView. Use while- props for animations & event listeners for interactive experiences.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "gestures");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Gesture animation

Motion extends React's basic set of event listeners with a simple yet powerful set of UI gestures.

The \`motion\` component currently has support for [**hover**](/docs/react-hover-animation.md), **tap**, **pan**, **drag, focus** and [**inView**](/docs/react-scroll-animations.md).

Each gesture has both a set of event listeners and a \`while-\` animation prop.

## Animation props

\`motion\` components provide multiple gesture animation props: \`whileHover\`, \`whileTap\`, \`whileFocus\`, \`whileDrag\` and \`whileInView\`. These can define animation targets to temporarily animate to while a gesture is active.

\`\`\`
<motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
/>
\`\`\`

All props can be set either as a target of values to animate to, or the name of any variants defined via the \`variants\` prop. Variants will flow down through children as normal.

\`\`\`
<motion.button
  whileTap="tap"
  whileHover="hover"
  variants={buttonVariants}
>
  <svg>
    <motion.path variants={iconVariants} />
  </svg>
</motion.button>
\`\`\`

## Gestures

### Hover

The hover gesture detects when a pointer hovers over or leaves a component. [Learn more about hover animations.](/docs/react-hover-animation.md)

\`\`\`
<motion.a
  whileHover={{ scale: 1.2 }}
  onHoverStart={event => {}}
  onHoverEnd={event => {}}
/>
\`\`\`

### Tap

The tap gesture detects when the **primary pointer** (like a left click or first touch point) presses down and releases on the same component.

\`\`\`
<motion.button whileTap={{ scale: 0.9, rotate: 3 }} />
\`\`\`

It will fire a \`tap\` event when the tap or click ends on the same component it started on, and a \`tapCancel\` event if the tap or click ends outside the component.

If the tappable component is a child of a draggable component, it'll automatically cancel the tap gesture if the pointer moves further than 3 pixels during the gesture.

#### Accessibility

Elements with tap events are keyboard-accessible.

Any element with a tap prop will be able to receive focus and \`Enter\` can be used to trigger tap events on focused elements.

*   Pressing \`Enter\` down will trigger \`onTapStart\` and \`whileTap\`
    
*   Releasing \`Enter\` will trigger \`onTap\`
    
*   If the element loses focus before \`Enter\` is released, \`onTapCancel\` will fire.
    

### Pan

The pan gesture recognises when a pointer presses down on a component and moves further than 3 pixels. The pan gesture is ended when the pointer is released.

\`\`\`
<motion.div onPan={(e, pointInfo) => {}} />
\`\`\`

Pan doesn't currently have an associated \`while-\` prop.

### Drag

The drag gesture applies pointer movement to the x and/or y axis of the component.

\`\`\`
<motion.div drag whileDrag={{ scale: 1.2, backgroundColor: "#f00" }} />
\`\`\`

[Learn more about drag animations](/docs/react-drag.md).

### Focus

The focus gesture detects when a component gains or loses focus by the same rules as the [CSS :focus-visible selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible).

Typically, this is when an \`input\` receives focus by any means, and when other elements receive focus by accessible means (like via keyboard navigation).

\`\`\`
<motion.a whileFocus={{ scale: 1.2 }} href="#" />
\`\`\`

## Event propagation

Children can stop pointer events propagating to parent \`motion\` components using the \`Capture\` React props.

For instance, a child can stop drag and tap gestures and their related \`while\` animations from firing on parents by passing \`e.stopPropagation()\` to \`onPointerDownCapture\`.

\`\`\`
<motion.div whileTap={{ scale: 2 }}>
  <button onPointerDownCapture={e => e.stopPropagation()} />
</motion.div>
\`\`\`

## Note: SVG filters

Gestures aren't recognised on SVG \`filter\` components, as these elements don't have a physical presence and therefore don't receive events.

You can instead add \`while-\` props and event handlers to a parent and use variants to animate these elements.

\`\`\`
const MyComponent = () => {
  return (
    <motion.svg whileHover="hover">
      <filter id="blur">
        <motion.feGaussianBlur
          stdDeviation={0}
          variants={{ hover: { stdDeviation: 2 } }}
        />
      </filter>
    </motion.svg>
  )
}
\`\`\``
                }
            ]
        };
    });
    // Hover animation
    server.registerResource("React: Hover animation", docsUri("react", "hover-animation"), {
        description: "A complete guide to creating hover animations and effects in React with Motion. Go beyond CSS with the whileHover prop and the hover() function for advanced, cross-platform interactions.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "hover-animation");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Hover animation

Hover animations are the most common form of [gesture animation](/docs/react-gestures.md).

Motion improves on the CSS \`:hover\` psuedo-class, which can cause frustrating "sticky" states on touch devices, where hover styles can persist after a user lifts their finger.

Motion provides three powerful methods to tap into hover gestures to create reliable, cross-device hover interactions that filter out these unwanted emulated events:

*   The \`whileHover\` animation prop
    
*   \`onHover\` events
    
*   \`hover()\` gesture recogniser
    

In this guide, we'll take a look at how (and when) to use each.

## The \`whileHover\` prop

The simplest and most common way to add a hover animation with Motion is with the \`[motion](/docs/react-motion-component.md)\` [component's](/docs/react-motion-component.md) \`whileHover\` prop.

It's a declarative way to define a target animation state - when a hover gesture starts, the component will animate to the values defined in it, and when the gesture ends, it'll animate back to its previous state.

\`\`\`
<motion.button whileHover={{ scale: 1.1 }} />
\`\`\`

### Customise the animation

Transitions can be defined for when we enter a hover gesture state by setting \`transition\` within the \`whileHover\` definition.

\`\`\`
<motion.button
  whileHover={{
    scale: 1.1,
    // Will be used when gesture starts
    transition: { duration: 0.1 }
  }}
  // Will be used when gesture ends
  transition={{ duration: 0.5 }}
/>
\`\`\`

## Event handlers

You can also listen for when a hover gesture starts and ends with the \`onHoverStart\` and \`onHoverEnd\` events.

\`\`\`
<motion.a
  onHoverStart={() => console.log('Hover starts')}
  onHoverEnd={() => console.log('Hover ends')}
/>
\`\`\`

These events differ from the browser's native pointer event handling by only firing on devices where hover is truly possible. They explicitly **won't** fire as the result of a touch event.

## \`hover()\` gesture recogniser

To use \`onHoverStart\` and \`onHoverEnd\`, you need to import the full \`motion\` component. For lightweight hover gesture handling, you can import the tiny (<1kb) \`[hover()](/docs/hover.md)\` [function](/docs/hover.md).

Because it returns a cleanup function, it's straightforward to integrate with \`useEffect\`:

\`\`\`
import { hover } from "motion"
import { useRef, useEffect } from "react"

function Component() {
  const ref = useRef(null)

  useEffect(() => {
    return hover(ref.current, () => {
      console.log("on hover start")

      return () => console.log("on hover end")
    })
  }, [])

  return <button ref={ref} />
}
\`\`\``
                }
            ]
        };
    });
    // Drag animation
    server.registerResource("React: Drag animation", docsUri("react", "drag"), {
        description: "A complete guide to creating drag animations in React with Motion. Learn to build draggable UIs with constraints, momentum, direction locking, and more.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "drag");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Drag animation

Drag animations allow users to move elements with their pointer.

Motion provides a suite of features to create app-quality drag animations with a simple API:

*   Momentum
    
*   Axis control
    
*   Elastic constraints
    
*   Direction locking
    
*   Optional imperative start/stop controls
    

Although browsers provide a native [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), it can be challenging to create a pleasant experience, with an odd "ghost image" effect. On the other hand, it also contains native dropzone functionality - which isn't yet in Motion.

In this guide we'll take a look at all Motion's drag features and how to customise them.

## The \`drag\` prop

The simplest way to make a component draggable is to add the \`[drag](https://motion.dev/docs/react-motion-component#drag-1)\` prop to a \`motion\` component.

\`\`\`
<motion.div drag />
\`\`\`

### Axis locking

To lock dragging to a single axis, you can set the prop to \`"x"\` or \`"y"\`.

\`\`\`
<motion.div drag="x" />
\`\`\`

## Visual feedback with \`whileDrag\`

You can animate to an animation state while an element is being dragged using the \`[whileDrag](https://motion.dev/docs/react-motion-component#whiledrag)\` prop.

When the gesture starts, the component will animate to the state defined in \`whileDrag\`. When it ends, it will animate back to its default \`animate\` state.

This is great for creating a "lift" effect, for instance by increasing the element's scale and adding a box shadow.

\`\`\`
<motion.div
  drag
  whileDrag={{
    scale: 1.1,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
  }}
/>
\`\`\`

## Momentum

By default, when a user releases a draggable element, it has **momentum**. It will perform an inertia animation based on the velocity of the pointer, creating a realistic, physical feel.

You can disable this behaviour by setting the \`[dragMomentum](https://motion.dev/docs/react-motion-component#dragmomentum)\` prop to \`false\`.

\`\`\`
<motion.div drag dragMomentum={false} />
\`\`\`

You can also customise the physics of this inertia animation with the \`[dragTransition](https://motion.dev/docs/react-motion-component#dragtransition)\` prop. This is useful for creating a heavier or bouncier feel.

\`\`\`
<motion.div
  drag
  dragTransition={{
    bounceStiffness: 600,
    bounceDamping: 10
  }}
/>
\`\`\`

## Constraints

You can constrain the movement of a draggable element using the \`[dragConstraints](https://motion.dev/docs/react-motion-component#dragconstraints)\` prop.

### Pixel constraints

The simplest way to apply constraints is by passing an object of \`top\`, \`left\`, \`right\`, and \`bottom\` values, measured in pixels.

\`\`\`
<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
/>
\`\`\`

### Ref-based constraints

For more dynamic constraints, you can pass a \`ref\` to another component. The draggable element will then be constrained to the bounding box of that element.

\`\`\`
import { motion } from "motion/react"
import { useRef } from "react"

export function DragContainer() {
  const constraintsRef = useRef(null)

  return (
    <motion.div ref={constraintsRef} style={{ width: 300, height: 200 }}>
      <motion.div drag dragConstraints={constraintsRef} />
    </motion.div>
  )
}
\`\`\`

### Elastic constraints

By default, dragging an element beyond its constraints will "tug" with some elasticity. You can change this behavior with the \`[dragElastic](https://motion.dev/docs/react-motion-component#dragelastic)\` prop, which accepts a value between \`0\` (no movement) and \`1\` (full movement).

\`\`\`
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.1}
/>
\`\`\`

## Direction locking

You can lock an element to the first axis it's dragged on by setting the \`[dragDirectionLock](https://motion.dev/docs/react-motion-component#dragdirectionlock)\` prop to \`true\`.

\`\`\`
<motion.div
  drag="x"
  dragDirectionLock
  onDirectionLock={axis => console.log(\`Locked to \${axis} axis\`)}
/>
\`\`\`

## Drag events

You can listen to the lifecycle of a drag gesture with a set of event listeners. These are useful for updating other parts of your UI in response to a drag.

The main events are \`onDragStart\`, \`onDrag\`, and \`onDragEnd\`.

Each callback is provided with the original \`PointerEvent\`, and an \`info\` object containing valuable data about the gesture's state:

*   \`point\`: The \`x\` and \`y\` coordinates of the pointer.
    
*   \`delta\`: The distance moved since the last event.
    
*   \`offset\`: The distance from the element's origin.
    
*   \`velocity\`: The current velocity of the pointer.
    

\`\`\`
function onDrag(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div drag onDrag={onDrag} />
\`\`\`

## Manual control with \`useDragControls\`

In some cases, you might want to initiate a drag from a different element, like a handle or a video scrubber. You can achieve this with the \`[useDragControls](/docs/react-use-drag-controls.md)\` hook.

The hook returns a set of \`dragControls\` that you can pass to the draggable element. You can then call the \`controls.start()\` method from any event to begin the gesture.

\`\`\`
import { motion, useDragControls } from "motion/react"

export function Scrubber() {
  const dragControls = useDragControls()

  function startDrag(event) {
    // Start the drag gesture imperatively
    dragControls.start(event, { snapToCursor: true })
  }

  return (
    <>
      <div onPointerDown={startDrag} className="scrubber-track" />
      <motion.div
        drag="x"
        dragControls={dragControls}
        dragListener={false} // Disable the default drag handler
        className="scrubber-handle"
      />
    </>
  )
}
\`\`\``
                }
            ]
        };
    });
    // Motion component
    server.registerResource("React: Motion component", docsUri("react", "motion-component"), {
        description: "Drive animations in Motion for React with motion components. Supercharge HTML/SVG for 120fps animations & gestures. High-performance, SSR-compatible & customizable.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "motion-component");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion component

Most [React animations](/docs/react-animation.md) in Motion are powered by the \`<motion />\` component.

There's a \`motion\` component for every HTML and SVG element, for instance \`motion.div\`, \`motion.circle\` etc. Think of it as a normal React component, supercharged for 120fps animation and gestures.

## Usage

Import \`motion\` from Motion:

\`\`\`
// React
import { motion } from "motion/react"

// React Server Components (Next.js etc)
import * as motion from "motion/react-client"
\`\`\`

You can use a \`motion\` component exactly as you would any normal HTML/SVG component:

\`\`\`
<motion.div className="box" />
\`\`\`

But you also gain access to powerful animation APIs like the \`animate\`, \`layout\`, \`whileInView\` props.

\`\`\`
<motion.div
  className="box"
  // Animate when this value changes:
  animate={{ scale: 2 }}
  // Fade in when the element enters the viewport:
  whileInView={{ opacity: 1 }}
  // Animate the component when its layout changes:
  layout
  // Style now supports indepedent transforms:
  style={{ x: 100 }}
/>
\`\`\`

### Performance

\`motion\` components animate values without triggering React renders, for optimal performance.

Using [motion values](/docs/react-motion-value.md) instead of React state to update \`style\` will also avoid re-renders.

\`\`\`
const x = useMotionValue(0)

useEffect(() => {
  // Won't trigger a re-render!
  const timeout = setTimeout(() => x.set(100), 1000)

  return () => clearTimeout(timeout)
}, [])

return <motion.div style={{ x }} />
\`\`\`

### Server-side rendering

\`motion\` components are fully compatible with server-side rendering, meaning the initial state of the component will be reflected in the server-generated output.

\`\`\`
// Server will output \`translateX(100px)\`
<motion.div initial={false} animate={{ x: 100 }} />
\`\`\`

### Custom components

Any React component can be turned into a \`motion\` component by passing it to \`motion.create()\`.

\`\`\`
const MotionComponent = motion.create(Component)
\`\`\`

Your component **must** pass a ref to the component you want to animate.

**React 18:** Use \`forwardRef\` to wrap the component and pass \`ref\` to the element you want to animate:

\`\`\`
const Component = React.forwardRef((props, ref) => {
  return <div ref={ref} />
})
\`\`\`

**React 19:** React 19 can pass \`ref\` via \`props\`:

\`\`\`
const Component = (props) => {
  return <div ref={props.ref} />
})
\`\`\`

It's also possible to pass strings to \`motion.create\`, which will create custom DOM elements.

\`\`\`
// Will render <custom-element /> into HTML
const MotionComponent = motion.create('custom-element')
\`\`\`

By default, all \`motion\` props (like \`animate\` etc) are filtered out of the \`props\` forwarded to the provided component. By providing a \`forwardMotionProps\` config, the provided component will receive these props.

\`\`\`
motion.create(Component, { forwardMotionProps: true })
\`\`\`

## Props

\`motion\` components accept the following props.

### Animation

Motion provides declarative animation props like \`animate\` and \`exit\`. [Learn more about React animations in Motion](/docs/react-animation.md).

#### \`initial\`

The initial visual state of the \`motion\` component.

This can be set as an animation target:

\`\`\`
<motion.section initial={{ opacity: 0, x: 0 }} />
\`\`\`

Variants:

\`\`\`
<motion.li initial="visible" />
\`\`\`

\`\`\`
<motion.div initial={["visible", "active"]} />
\`\`\`

Or set as \`false\` to disable the enter animation and initially render as the values found in \`animate\`.

\`\`\`
<motion.div initial={false} animate={{ opacity: 0 }} />
\`\`\`

#### \`animate\`

A target to animate to on enter, and on update.

Can be set as an animation target:

\`\`\`
<motion.div
  initial={{ boxShadow: "0px 0px #000" }}
  animate={{ boxShadow: "10px 10px #000" }}
/>
\`\`\`

Or variants:

\`\`\`
<motion.li animate="visible" />
\`\`\`

\`\`\`
<motion.div initial="hidden" animate={["visible", "active"]} />
\`\`\`

#### \`exit\`

A target to animate to when a component is removed from the tree. Can be set either as an animation target, or variant.

#### \`transition\`

The default [transition](/docs/react-transitions.md) for this component to use when an animation prop (\`animate\`, \`whileHover\` etc) has no \`transition\` defined.

\`\`\`
<motion.div transition={{ type: "spring" }} animate={{ scale: 1.2 }} />
\`\`\`

For immediate visual feedback, you can edit CSS or Motion easing curves directly in your code editor with the [Motion extension](/docs/studio-install.md).

#### \`variants\`

The [variants](/docs/react-animation#variants.md) for this component.

\`\`\`
const variants = {
  active: {
      backgroundColor: "#f00"
  },
  inactive: {
    backgroundColor: "#fff",
    transition: { duration: 2 }
  }
}

return (
  <motion.div
    variants={variants}
    animate={isActive ? "active" : "inactive"}
  />
)
\`\`\`

#### \`style\`

The normal React DOM \`style\` prop, with added support for [motion values](/docs/react-motion-value.md) and independent transforms.

\`\`\`
const x = useMotionValue(30)

return <motion.div style={{ x, rotate: 90, originX: 0.5 }} />
\`\`\`

#### \`onUpdate\`

Callback triggered every frame any value on the \`motion\` component updates. It's provided a single argument with the latest values.

\`\`\`
<motion.article
  animate={{ opacity: 1 }}
  onUpdate={latest => console.log(latest.opacity)}
/>
\`\`\`

#### \`onAnimationStart\`

Callback triggered when any animation (except layout animations, see \`onLayoutAnimationStart\`) starts.

It's provided a single argument, with the target or variant name of the started animation.

\`\`\`
<motion.circle
  animate={{ r: 10 }}
  onAnimationStart={latest => console.log(latest.r)}
/>
\`\`\`

#### \`onAnimationComplete\`

Callback triggered when any animation (except layout animations, see \`onLayoutAnimationComplete\`) completes.

It's provided a single argument, with the target or variant name of the completed animation.

\`\`\`
<motion.circle
  animate={{ r: 10 }}
  onAnimationComplete={latest => console.log(latest.r)}
/>
\`\`\`

### Hover

#### \`whileHover\`

Animation state, or variant label, to perform a [hover animation](/docs/react-hover-animation.md) to while the hover gesture is active.

\`\`\`
// As target
<motion.button whileHover={{ scale: 1.2 }} />
\`\`\`

\`\`\`
// As variants
<motion.div whileHover="hovered" />
\`\`\`

#### \`onHoverStart\`

Callback function that fires when a pointer starts hovering over the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div onHoverStart={(event) => console.log(event)} />
\`\`\`

#### \`onHoverEnd\`

Callback function that fires when a pointer stops hovering over the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div onHoverEnd={(event) => console.log(event)} />
\`\`\`

#### Tap

#### \`whileTap\`

Animation state, or variant label, to perform a [press animation](/docs/react-gestures.md) to while the hover gesture is active.

\`\`\`
// As target
<motion.button whileTap={{ scale: 0.9 }} />
\`\`\`

\`\`\`
// As variants
<motion.div whileTap="tapped" />
\`\`\`

#### \`onTapStart\`

Callback function that fires when a pointer starts pressing the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div onTapStart={(event) => console.log(event)} />
\`\`\`

#### \`onTap\`

Callback function that fires when a pointer stops pressing the component and the pointer was released **inside** the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div onTap={(event) => console.log(event)} />
\`\`\`

#### \`onTapCancel\`

Callback function that fires when a pointer stops pressing the component and the pointer was released **outside** the component. Provided the triggering \`PointerEvent\`.

\`\`\`
<motion.div onTapCancel={(event) => console.log(event)} />
\`\`\`

### Focus

#### \`whileFocus\`

Animation state, or variant label, to animate to while the focus gesture is active.

\`\`\`
// As target
<motion.button whileFocus={{ outline: "dashed #000" }} />
\`\`\`

\`\`\`
// As variants
<motion.div whileFocus="focused" />
\`\`\`

### Pan

#### \`onPan\`

Callback function that fires when the pan gesture is recognised on this element.

\`\`\`
function onPan(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div onPan={onPan} />
\`\`\`

Pan and drag events are provided the origin \`PointerEvent\` as well as an object \`info\` that contains \`x\` and \`y\` point values for the following:

*   \`point\`: Relative to the device or page.
    
*   \`delta\`: Distance since the last event.
    
*   \`offset\`: Distance from the original event.
    
*   \`velocity\`: Current velocity of the pointer.
    

#### \`onPanStart\`

Callback function that fires when a pan gesture starts. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div onPanStart={(event, info) => console.log(info.delta.x)} />
\`\`\`

#### \`onPanEnd\`

Callback function that fires when a pan gesture ends. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div onPanEnd={(event, info) => console.log(info.delta.x)} />
\`\`\`

### Drag

#### \`drag\`

**Default:** \`false\`

Enable dragging for this element. Set \`true\` to drag in both directions. Set \`"x"\` or \`"y"\` to only drag in a specific direction.

\`\`\`
<motion.div drag />
\`\`\`

#### \`whileDrag\`

Animation state, or variant label, to perform a [drag animation](/docs/react-drag.md) to while the hover gesture is active.

\`\`\`
// As target
<motion.div drag whileDrag={{ scale: 0.9 }} />
\`\`\`

\`\`\`
// As variants
<motion.div drag whileDrag="dragging" />
\`\`\`

#### \`dragConstraints\`

Applies constraints on the draggable area.

Set as an object of optional \`top\`, \`left\`, \`right\`, and \`bottom\` values, measured in pixels:

\`\`\`
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 300 }}
/>
\`\`\`

Or as a \`ref\` to another element to use its bounding box as the draggable constraints:

\`\`\`
const MyComponent = () => {
  const constraintsRef = useRef(null)

  return (
     <motion.div ref={constraintsRef}>
         <motion.div drag dragConstraints={constraintsRef} />
     </motion.div>
  )
}
\`\`\`

#### \`dragSnapToOrigin\`

**Default:** \`false\`

If \`true\`, the draggable element will animate back to its center/origin when released.

\`\`\`
<motion.div drag dragSnapToOrigin />
\`\`\`

#### \`dragElastic\`

**Default:** \`0.5\`

The degree of movement allowed outside constraints. \`0\` = no movement, \`1\` = full movement.

Set to \`0.5\` by default. Can also be set as \`false\` to disable movement.

By passing an object of \`top\`/\`right\`/\`bottom\`/\`left\`, individual values can be set per constraint. Any missing values will be set to \`0\`.

\`\`\`
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}
/>
\`\`\`

#### \`dragMomentum\`

**Default:** \`true\`

Apply momentum from the pan gesture to the component when dragging finishes. Set to \`true\` by default.

\`\`\`
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragMomentum={false}
/>
\`\`\`

#### \`dragTransition\`

Allows you to change dragging momentum transition. When releasing a draggable element, an animation with type \`"inertia"\` starts. The animation is based on your dragging velocity. This property allows you to customize it.

\`\`\`
<motion.div
  drag
  dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
/>
\`\`\`

#### \`dragDirectionLock\`

**Default:** \`false\`

Locks drag direction into the soonest detected direction. For example, if the component is moved more on the \`x\` axis than \`y\` axis before the drag gesture kicks in, it will **only** drag on the \`x\` axis for the remainder of the gesture.

\`\`\`
<motion.div drag dragDirectionLock />
\`\`\`

#### \`dragPropagation\`

**Default:** \`false\`

Allows drag gesture propagation to child components.

\`\`\`
<motion.div drag="x" dragPropagation />
\`\`\`

#### \`dragControls\`

Usually, dragging is initiated by pressing down on a component and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we might want to initiate dragging from a different component than the draggable one.

By creating a \`dragControls\` using the \`[useDragControls](/docs/react-use-drag-controls.md)\` [hook](/docs/react-use-drag-controls.md), we can pass this into the draggable component's \`dragControls\` prop. It exposes a \`start\` method that can start dragging from pointer events on other components.

\`\`\`
const dragControls = useDragControls()

function startDrag(event) {
  dragControls.start(event, { snapToCursor: true })
}

return (
  <>
    <div onPointerDown={startDrag} />
    <motion.div drag="x" dragControls={dragControls} />
  </>
)
\`\`\`

#### \`dragListener\`

Determines whether to trigger the drag gesture from event listeners. If passing \`dragControls\`, setting this to \`false\` will ensure dragging can only be initiated by the controls, rather than a \`pointerdown\` event on the draggable element.

#### \`onDrag\`

Callback function that fires when the drag gesture is recognised on this element.

\`\`\`
function onDrag(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div drag onDrag={onDrag} />
\`\`\`

Pan and drag events are provided the origin \`PointerEvent\` as well as an object \`info\` that contains \`x\` and \`y\` point values for the following:

*   \`point\`: Relative to the device or page.
    
*   \`delta\`: Distance since the last event.
    
*   \`offset\`: Distance from the original event.
    
*   \`velocity\`: Current velocity of the pointer.
    

#### \`onDragStart\`

Callback function that fires when a drag gesture starts. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div drag onDragStart={(event, info) => console.log(info.delta.x)} />
\`\`\`

#### \`onDragEnd\`

Callback function that fires when a drag gesture ends. Provided the triggering \`PointerEvent\` and \`info\`.

\`\`\`
<motion.div drag onDragEnd={(event, info) => console.log(info.delta.x)} />
\`\`\`

#### \`onDirectionLock\`

Callback function that fires a drag direction is determined.

\`\`\`
<motion.div
  drag
  dragDirectionLock
  onDirectionLock={axis => console.log(axis)}
/>
\`\`\`

### Viewport

Learn more about [scroll-triggered animations](/docs/react-scroll-animations.md) in React.

#### \`whileInView\`

Target or variants to label to while the element is in view.

\`\`\`
// As target
<motion.div whileInView={{ opacity: 1 }} />
\`\`\`

\`\`\`
// As variants
<motion.div whileInView="visible" />
\`\`\`

#### \`viewport\`

Options to define how the element is tracked within the viewport.

\`\`\`
<motion.section
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
\`\`\`

Available options:

*   \`once\`: If \`true\`, once element enters the viewport it won't detect subsequent leave/enter events.
    
*   \`root\`: The \`ref\` of an ancestor scrollable element to detect intersections with (instead of \`window\`).
    
*   \`margin\`: A margin to add to the viewport to change the detection area. Defaults to \`"0px"\`. Use multiple values to adjust top/right/bottom/left, e.g. \`"0px -20px 0px 100px"\`.
    
*   \`amount\`: The amount of an element that should enter the viewport to be considered "entered". Either \`"some"\`, \`"all"\` or a number between \`0\` and \`1\`. Defaults to \`"some"\`.
    

#### \`onViewportEnter\`

Callback function that fires when an element enters the viewport. Provided the \`[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)\` with details of the intersection event.

\`\`\`
<motion.div onViewportEnter={(entry) => console.log(entry.isIntersecting)} />
\`\`\`

#### \`onViewportLeave\`

Callback function that fires when an element enters the viewport. Provided the \`[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)\` with details of the intersection event.

\`\`\`
<motion.div onViewportLeave={(entry) => console.log(entry.intersectionRect)} />
\`\`\`

### Layout

Learn more about [layout animations](/docs/react-layout-animations.md) in React.

#### \`layout\`

**Default:** \`false\`

If \`true\`, this component will perform [layout animations](/docs/react-layout-animations.md).

\`\`\`
<motion.div layout />
\`\`\`

If set to \`"position"\` or \`"size"\`, only its position or size will animate, respectively.

\`\`\`
<motion.img layout="position" />
\`\`\`

#### \`layoutId\`

If set, this component will animate changes to its layout. Additionally, when a new element enters the DOM and an element already exists with a matching \`layoutId\`, it will animate out from the previous element's size/position.

\`\`\`
{items.map(item => (
   <motion.li layout>
      {item.name}
      {item.isSelected && <motion.div layoutId="underline" />}
   </motion.li>
))}
\`\`\`

If the previous component remains in the tree, the two elements will crossfade.

#### \`layoutDependency\`

By default, layout changes are detected every render. To reduce measurements and thus improve performance, you can pass a \`layoutDependency\` prop. Measurements will only occur when this value changes.

\`\`\`
<motion.nav layout layoutDependency={isOpen} />
\`\`\`

#### \`layoutScroll\`

For layout animations to work correctly within scrollable elements, their scroll offset needs measuring. For performance reasons, Framer Motion doesn't measure the scroll offset of every ancestor. Add the \`layoutScroll\` prop to elements that should be measured.

\`\`\`
<motion.div layoutScroll style={{ overflow: "scroll" }}>
  <motion.div layout />
</motion.div>
\`\`\`

#### \`layoutRoot\`

For layout animations to work correctly within \`position: fixed\` elements, we need to account for page scroll. Add \`layoutRoot\` to mark an element as \`position: fixed\`.

\`\`\`
<motion.div layoutRoot style={{ position: "fixed" }}>
  <motion.div layout />
</motion.div>
\`\`\`

#### \`onLayoutAnimationStart\`

A callback to run when a layout animation starts.

#### \`onLayoutAnimationComplete\`

A callback to run when a layout animation completes.

### Advanced

#### \`inherit\`

Set to \`false\` to prevent a component inheriting or propagating changes in a parent variant.

#### \`custom\`

Custom data to pass through to dynamic variants.

\`\`\`
const variants = {
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.2 }
  })
}

return (
  <motion.ul animate="visible">
    <motion.li custom={0} variants={variants} />
    <motion.li custom={1} variants={variants} />
    <motion.li custom={2} variants={variants} />
  </motion.ul>
)
\`\`\`

#### \`transformTemplate\`

By default, transforms are applied in order of \`translate\`, \`scale\`, \`rotate\` and \`skew\`.

To change this, \`transformTemplate\` can be set as a function that accepts the latest transforms and the generated transform string and returns a new transform string.

\`\`\`
// Use the latest transform values
<motion.div
  style={{ x: 0, rotate: 180 }}
  transformTemplate={
    ({ x, rotate }) => \`rotate(\${rotate}deg) translateX(\${x}px)\`
  }
/>
\`\`\`

\`\`\`
// Or the generated transform string
<motion.div
  style={{ x: 0, rotate: 180 }}
  transformTemplate={
    (latest, generated) => \`translate(-50%, -50%) \${generated}\`
  }
/>
\`\`\``
                }
            ]
        };
    });
    // AnimatePresence
    server.registerResource("React: AnimatePresence", docsUri("react", "animate-presence"), {
        description: "Enable effortless exit animations in React with AnimatePresence. It animates components on removal via the exit prop.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "animate-presence");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# AnimatePresence

\`AnimatePresence\` makes exit animations easy. By wrapping one or more \`[motion](/docs/react-motion-component.md)\` [components](/docs/react-motion-component.md) with \`AnimatePresence\`, we gain access to the \`exit\` animation prop.

\`\`\`
<AnimatePresence>
  {show && <motion.div key="modal" exit={{ opacity: 0 }} />}
</AnimatePresence>
\`\`\`

## Usage

### Import

\`\`\`
import { AnimatePresence } from "motion/react"
\`\`\`

### Exit animations

\`AnimatePresence\` works by detecting when its **direct children** are removed from the React tree.

This can be due to a component mounting/remounting:

\`\`\`
<AnimatePresence>
  {show && <Modal key="modal" />}
</AnimatePresence>
\`\`\`

Its \`key\` changing:

\`\`\`
<AnimatePresence>
  <Slide key={activeItem.id} />
</AnimatePresence>
\`\`\`

Or when children in a list are added/removed:

\`\`\`
<AnimatePresence>
  {items.map(item => (
    <motion.li key={item.id} exit={{ opacity: 1 }} layout />
  ))}
</AnimatePresence>
\`\`\`

Any \`motion\` components within the exiting component will fire animations defined on their \`exit\` props before the component is removed from the DOM.

\`\`\`
function Slide({ img, description }) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <img src={img.src} />
      <motion.p exit={{ y: 10 }}>{description}</motion.p>
    </motion.div>
  )
}
\`\`\`

Like \`initial\` and \`animate\`, \`exit\` can be defined either as an object of values, or as a variant label.

\`\`\`
const modalVariants = {
  visible: { opacity: 1, transition: { when: "beforeChildren" } },
  hidden: { opacity: 0, transition: { when: "afterChildren" } }
}

function Modal({ children }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {children}
    </motion.div>
  )
}
\`\`\`

### Changing \`key\`

Changing a \`key\` prop makes React create an entirely new component. So by changing the \`key\` of a single child of \`AnimatePresence\`, we can easily make components like slideshows.

\`\`\`
export const Slideshow = ({ image }) => (
  <AnimatePresence>
    <motion.img
      key={image.src}
      src={image.src}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    />
  </AnimatePresence>
)
\`\`\`

### Access presence state

Any child of \`AnimatePresence\` can access presence state with the \`useIsPresence\` hook.

\`\`\`
import { useIsPresent } from "motion/react"

function Component() {
  const isPresent = useIsPresent()

  return isPresent ? "Here!" : "Exiting..."
}
\`\`\`

This allows you to change content or styles when a component is no longer rendered.

### Access presence data

When a component has been removed from the React tree, its props can no longer be updated. We can use \`AnimatePresence\`'s \`custom\` prop to pass new data down through the tree, even into exiting components.

\`\`\`
<AnimatePresence custom={swipeDirection}>
  <Slide key={activeSlideId}>
\`\`\`

Then later we can extract that using \`usePresenceData\`.

\`\`\`
import { AnimatePresence, usePresenceData } from "motion/react"

function Slide() {
  const isPresent = useIsPresent()
  const direction = usePresenceData()

  return (
    <motion.div exit={{ opacity: 0 }}>
      {isPresent ? "Here!" : "Exiting " + direction}
    </motion.div>
  )
}
\`\`\`

### Manual usage

It's also possible to manually tell \`AnimatePresence\` when a component is safe to remove with the \`usePresence\` hook.

This returns both \`isPresent\` state and a callback, \`safeToRemove\`, that should be called when you're ready to remove the component from the DOM (for instance after a manual animation or other timeout).

\`\`\`
import { usePresence } from "motion/react"

function Component() {
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    // Remove from DOM 1000ms after being removed from React
    !isPresent && setTimeout(safeToRemove, 1000)
  }, [isPresent])

  return <div />
}
\`\`\`

### Propagate exit animations

By default, \`AnimatePresence\` controls the \`exit\` animations on all of its children, **until** another \`AnimatePresence\` component is rendered.

\`\`\`
<AnimatePresence>
  {show ? (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence>
        {/*
          * When \`show\` becomes \`false\`, exit animations
          * on these children will not fire.
          */}
        {children}
      </AnimatePresence>
    </motion.section>
  ) : null}
</AnimatePresence>
\`\`\`

By setting an \`AnimatePresence\` component's \`propagate\` prop to \`true\`, when it's removed from another \`AnimatePresence\` it will fire all of **its** children's exit animations.

\`\`\`
<AnimatePresence>
  {show ? (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence propagate>
        {/*
          * When \`show\` becomes \`false\`, exit animations
          * on these children **will** fire.
          */}
        {children}
      </AnimatePresence>
    </motion.section>
  ) : null}
</AnimatePresence>
\`\`\`

## Props

### \`initial\`

By passing \`initial={false}\`, \`AnimatePresence\` will disable any initial animations on children that are present when the component is first rendered.

\`\`\`
<AnimatePresence initial={false}>
  <Slide key={activeItem.id} />
</AnimatePresence>
\`\`\`

### \`custom\`

When a component is removed, there's no longer a chance to update its props (because it's no longer in the React tree). Therefore we can't update its exit animation with the same render that removed the component.

By passing a value through \`AnimatePresence\`'s \`custom\` prop, we can use dynamic variants to change the \`exit\` animation.

\`\`\`
const variants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === 1 ? -300 : 300
  }),
  visible: { opacity: 1, x: 0 }
}

export const Slideshow = ({ image, direction }) => (
  <AnimatePresence custom={direction}>
    <motion.img
      key={image.src}
      src={image.src}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    />
  </AnimatePresence>
)
\`\`\`

This data can be accessed by children via \`usePresenceData\`.

### \`mode\`

**Default:** \`"sync"\`

Decides how \`AnimatePresence\` handles entering and exiting children.

#### \`sync\`

In \`"sync"\` mode, elements animate in and out as soon as they're added/removed.

This is the most basic (and default) mode - \`AnimatePresence\` takes no opinion on sequencing animations or layout. Therefore, if element layouts conflict (as in the above example), you can either implement your own solution (using \`position: absolute\` or similar), or try one of the other two \`mode\` options.

#### \`wait\`

In \`"wait"\` mode, the entering element will **wait** until the exiting child has animated out, before it animates in.

This is great for sequential animations, presenting users with one piece of information or one UI element at a time.

#### \`popLayout\`

Exiting elements will be "popped" out of the page layout, allowing surrounding elements to immediately reflow. Pairs especially well with the \`layout\` prop, so elements can animate to their new layout.

\`\`\`
<AnimatePresence>
  {items.map(item => (
    <motion.li layout exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
\`\`\`

### \`onExitComplete\`

Fires when all exiting nodes have completed animating out.

### \`propagate\`

**Default:** \`false\`

If set to \`true\`, exit animations on children will also trigger when this \`AnimatePresence\` exits from a parent \`AnimatePresence\`.

\`\`\`
<AnimatePresence>
  {show ? (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence propagate>
        {/* This exit prop will now fire when show is false */}
        <motion.div exit={{ x: -100 }} />
      </AnimatePresence>
    </motion.section>
  ) : null}
</AnimatePresence>
\`\`\`

### \`root\`

Root element for injecting \`popLayout\` styles. Defaults to \`document.head\` but can be set to another \`ShadowRoot\`, for use within shadow DOM.

## Troubleshooting

### Exit animations aren't working

Ensure all **immediate** children get a unique \`key\` prop that **remains the same for that component every render**.

For instance, providing \`index\` as a \`key\` is **bad** because if the items reorder then the \`index\` will not be matched to the \`item\`:

\`\`\`
<AnimatePresence>
  {items.map((item, index) => (
    <Component key={index} />
  ))}
</AnimatePresence>
\`\`\`

It's preferred to pass something that's unique to that item, for instance an ID:

\`\`\`
<AnimatePresence>
  {items.map((item) => (
    <Component key={item.id} />
  ))}
</AnimatePresence>
\`\`\`

Also make sure \`AnimatePresence\` is **outside** of the code that unmounts the element. If \`AnimatePresence\` itself unmounts, then it can't control exit animations!

For example, this will **not work**:

\`\`\`
isVisible && (
  <AnimatePresence>
    <Component />
  </AnimatePresence>
)
\`\`\`

Instead, the conditional should be at the root of \`AnimatePresence\`:

\`\`\`
<AnimatePresence>
  {isVisible && <Component />}
</AnimatePresence>
\`\`\`

### Layout animations not working with \`mode="sync"\`

When mixing exit and [layout animations](/docs/react-layout-animations.md), it might be necessary to wrap the group in \`[LayoutGroup](/docs/react-layout-group.md)\` to ensure that components outside of \`AnimatePresence\` know when to perform a layout animation.

\`\`\`
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence>
      {items.map(item => (
        <motion.li layout key={item.id} />
      ))}
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
\`\`\`

### Layout animations not working with \`mode="popLayout"\`

When any HTML element has an active \`transform\` it temporarily becomes the [offset parent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) of its children. This can cause children with \`position: "absolute"\` not to appear where you expect.  
  
\`mode="popLayout"\` works by using \`position: "absolute"\`. So to ensure consistent and expected positioning during a layout animation, ensure that the animating parent has a \`position\` other than \`"static"\`.

\`\`\`
<motion.ul layout style={{ position: "relative" }}>
  <AnimatePresence mode="popLayout">
    {items.map(item => (
      <motion.li layout key={item.id} />
    ))}
  </AnimatePresence>
</motion.ul>
\`\`\``
                }
            ]
        };
    });
    // LayoutGroup
    server.registerResource("React: LayoutGroup", docsUri("react", "layout-group"), {
        description: "Group elements to share state and enable seamless layout transitions, even when not re-rendered together. Namespace layoutId for complex UIs.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "layout-group");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# LayoutGroup

\`[motion](/docs/react-motion-component.md)\` [components](/docs/react-motion-component.md) with a \`layout\` prop will perform [layout animations](/docs/react-layout-animations.md) every time they commit a React render, or (if set) when their \`layoutDependency\` prop changes.

\`LayoutGroup\` is used to group components that might not render together but do affect each-other's visual state.

## Usage

Take these accordion items that each handle their own state:

\`\`\`
function Item({ header, content }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.h2 layout>{header}</motion.h2>
      {isOpen ? content : null}
    </motion.div>
  )
}
\`\`\`

If we arrange these next to each other in an \`Accordion\`, when their state updates, their siblings have no way of knowing:

\`\`\`
function Accordion() {
  return (
    <>
      <ToggleContent />
      <ToggleContent />
    </>  
  )
}
\`\`\`

This can be fixed by grouping both components with \`LayoutGroup\`:

\`\`\`
import { LayoutGroup } from "motion/react"

function Accordion() {
  return (
    <LayoutGroup>
      <ToggleContent />
      <ToggleContent />
    </LayoutGroup>  
  )
}
\`\`\`

### Namespace \`layoutId\`

Components expecting to perform shared layout animations are provided a \`layoutId\` prop.

In this following example, each \`Tab\` renders an element with the \`layoutId="underline"\` prop.

\`\`\`
function Tab({ label, isSelected }) {
  return (
    <li>
      {label}
      {isSelected
        ? <motion.div layoutId="underline" />
        : null}
    </li>  
  )
}

function TabRow({ items }) {
  return items.map(item => <Tab {...item} />)
}
\`\`\`

\`layoutId\` is global across your site. So to render multiple \`TabRow\`s we want to group them with \`LayoutGroup\` and \`id\` prop:

\`\`\`
function TabRow({ id, items }) {
  return (
    <LayoutGroup id={id}>
      {items.map(item => <Tab {...item} />)}
    </LayoutGroup>
}
\`\`\``
                }
            ]
        };
    });
    // LazyMotion
    server.registerResource("React: LazyMotion", docsUri("react", "lazy-motion"), {
        description: "Reduce your initial bundle size with LazyMotion in Motion for React. Load animation features synchronously or asynchronously, shrinking bundles to as low as 4.6kb.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "lazy-motion");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# LazyMotion

For ease of use, the \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md) comes pre-bundled with all of its features for a bundlesize of around 34kb.

With \`LazyMotion\` and the \`m\` component, we can reduce this to 4.6kb for the initial render and then sync or async load a subset of features.

\`\`\`
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
\`\`\`

Read the [Reduce bundle size](/docs/react-reduce-bundle-size.md) guide for full usage instructions.

## Props

### \`features\`

Define a feature bundle to load sync or async.

#### Sync loading

Synchronous loading is useful for defining a subset of functionality for a smaller bundlesize.

\`\`\`
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
\`\`\`

#### Async loading

Asynchronous loading can ensure your site is hydrated before loading in some or all animation functionality.

\`\`\`
// features.js
import { domAnimation } from "motion/react"
export default domAnimations
  
// index.js
const loadFeatures = import("./features.js")
  .then(res => res.default)

function Component() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div animate={{ scale: 1.5 }} />
    </LazyMotion>
  )
}
\`\`\`

### \`strict\`

**Default:** \`false\`

If \`true\`, will throw an error if a \`motion\` component renders within a \`LazyMotion\` component (thereby removing the bundlesize benefits of lazy-loading).

\`\`\`
// This component will throw an error that explains using a motion component
// instead of the m component will break the benefits of code-splitting.
function Component() {
  return (
    <LazyMotion features={domAnimation} strict>
      <motion.div />
    </LazyMotion>
  )
}
\`\`\``
                }
            ]
        };
    });
    // MotionConfig
    server.registerResource("React: MotionConfig", docsUri("react", "motion-config"), {
        description: "Configure all child motion components in React with MotionConfig. Set global transitions, manage reducedMotion preferences, and ensure CSP nonce compliance easily.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "motion-config");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# MotionConfig

The \`MotionConfig\` component can be used to set configuration options for all child \`[motion](/docs/react-motion-component.md)\` [components](/docs/react-motion-component.md).

\`\`\`
import { motion, MotionConfig } from "motion/react"

export const MyComponent = ({ isVisible }) => (
  <MotionConfig transition={{ duration: 1 }}>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
  </MotionConfig>
)
\`\`\`

## Props

### \`transition\`

Define a fallback \`transition\` to use for all child \`motion\` components.

### \`reducedMotion\`

**Default:** \`"never"\`

\`reducedMotion\` lets you set a site-wide policy for handling reduced motion. It offers the following options:

*   \`"user"\`: Respect the user's device setting.
    
*   \`"always"\`: Enforce reduced motion (useful for debugging).
    
*   \`"never"\`: Don't respect reduced motion.
    

When reduced motion is on, transform and [layout animations](/docs/react-layout-animations.md) will be disabled. Other animations, like \`opacity\` and \`backgroundColor\`, will persist.

### \`nonce\`

If using a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src#unsafe_inline_styles) with a \`nonce\` attribute, passing the same attribute through \`MotionConfig\` will allow any \`style\` blocks generated by Motion to adhere the the security policy.`
                }
            ]
        };
    });
    // Reorder
    server.registerResource("React: Reorder", docsUri("react", "reorder"), {
        description: "Easily create drag-to-reorder lists with Motion for React's Reorder components. Use Reorder.Group and Reorder.Item to manage list order, with automatic layout and exit animations. Lightweight and simple.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "reorder");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Reorder

The \`Reorder\` components can be used to create drag-to-reorder lists, like reorderable tabs or todo items.

\`\`\`
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group axis="y" values={items} onReorder={setItems}>
    {items.map((item) => (
      <Reorder.Item key={item} value={item}>
        {item}
      </Reorder.Item>
    ))}
  </Reorder.Group>
)
\`\`\`

## Usage

Every reorderable list is wrapped in the \`Reorder.Group\` component.

\`\`\`
import { Reorder } from "motion/react"

function List() {
  return (
    <Reorder.Group>
    
    </Reorder.Group>
  )
}
\`\`\`

By default, this is rendered as a \`<ul>\`, but this can be changed with the \`as\` prop.

\`\`\`
<Reorder.Group as="ol">
\`\`\`

\`Reorder.Group\` must be passed the array of values in your reorderable list via the \`values\` prop.

Additionally, a \`onReorder\` event will fire with the latest calculated order. For items to reorder, this must update the \`values\` state.

\`\`\`
import { Reorder } from "framer-motion"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
    
    </Reorder.Group>
  )
}
\`\`\`

To render each reorderable item, use \`Reorder.Item\`, passing it the value it represents via the \`value\` prop.

\`\`\`
import { Reorder } from "framer-motion"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
\`\`\`

Now, when items are dragged and reordered, \`onReorder\` will fire with a new order.

### Layout animations

\`Reorder.Item\` components are already configured to perform [layout animations](/docs/react-layout-animations.md), so if new items are added or removed to the reorderable list, surrounding items will animate to their new position automatically.

###   
Exit animations

\`[AnimatePresence](/docs/react-animate-presence.md)\` can be used as normal to animate items as they enter/leave the React tree.

\`\`\`
<AnimatePresence>
  {items.map(item => (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={item}
    />  
  ))}
</AnimatePresence>
\`\`\`

### Drag triggers

By default, all of a \`Reorder.Item\` will be draggable. \`[useDragControls](/docs/react-use-drag-controls.md)\` can be used to define a different component to act as a drag trigger.

\`\`\`
import { Reorder, useDragControls } from "framer-motion"

function Item({ value }) {
  const controls = useDragControls()
  
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="reorder-handle"
        onPointerDown={(e) => controls.start(e)}
      />
    </Reorder.Item>
  )
}
\`\`\`

### Scrollable lists

If \`Reorder.Item\` components are within a scrollable container, that container needs a \`layoutScroll\` prop so Framer Motion can correctly measure its scroll offset.

\`\`\`
<Reorder.Group
  axis="y"
  onReorder={setItems}
  layoutScroll
  style={{ overflowY: "scroll" }}
>
  {items.map((item) => (
    <Item key={item} item={item} />
  ))}
</Reorder.Group>
\`\`\`

### z-index

\`Reorder.Item\` will automatically set a \`z-index\` style on the currently dragged item so it appears above the surrounding items.

However, \`z-index\` only affects items with \`position !== "static"\`. So to enable this effect ensure the position of the \`Reorder.Item\` is set to \`relative\` or \`absolute\`.

## API

### \`Reorder.Group\`

#### \`as\`

**Default**: \`"ul"\`

The underlying element for \`Reorder.Group\` to render as.

\`\`\`
<Reorder.Group as="div"></Reorder.Group>
\`\`\`

#### \`axis\`

**Default**: \`"y"\`

The direction of reorder detection.

#### \`values\`

The values array that will be reordered. Each item in this list must match a \`value\` passed to each \`Reorder.Item\`.

#### \`onReorder\`

A callback that will fire when items are detected to have reordered. The provided \`newOrder\` should be passed to a \`values\` state update function.

\`\`\`
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group values={items} onReorder={setItems}>
\`\`\`

### \`Reorder.Item\`

\`Reorder.Item\` components accept all \`[motion](/docs/react-motion-component.md)\` [component props](/docs/react-motion-component.md) in addition to the following:

#### \`as\`

**Default:** \`"li"\`

The element for \`Reorder.Item\` to render as.

#### \`value\`

When \`onReorder\` is called, this is the value that will be passed through in the newly ordered array.`
                }
            ]
        };
    });
    // Motion values overview
    server.registerResource("React: Motion values overview", docsUri("react", "motion-value"), {
        description: "Power React animations with Motion values. Track state/velocity, sync components & update styles without re-renders. Compose with useTransform/useSpring.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "motion-value");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion values overview

Motion values track the state and velocity of animated values.

They are composable, signal-like values that are performant because Motion can render them with its optimised DOM renderer.

Usually, these are created automatically by \`[motion](/docs/react-motion-component.md)\` [components](/docs/react-motion-component.md). But for advanced use cases, it's possible to create them manually.

\`\`\`
import { motion, useMotionValue } from "motion/react"

export function MyComponent() {
  const x = useMotionValue(0)
  return <motion.div style={{ x }} />
}
\`\`\`

By manually creating motion values you can:

*   Set and get their state.
    
*   Pass to multiple components to synchronise motion across them.
    
*   Chain \`MotionValue\`s via the \`useTransform\` hook.
    
*   Update visual properties without triggering React's render cycle.
    
*   Subscribe to updates.
    

\`\`\`
const x = useMotionValue(0)
const opacity = useTransform(
  x,
  [-200, 0, 200],
  [0, 1, 0]
)

// Will change opacity as element is dragged left/right
return <motion.div drag="x" style={{ x, opacity }} />
\`\`\`

## Usage

Motion values can be created with the \`useMotionValue\` hook. The string or number passed to \`useMotionValue\` will act as its initial state.

\`\`\`
import { useMotionValue } from "motion/react"

const x = useMotionValue(0)
\`\`\`

Motion values can be passed to a \`motion\` component via \`style\`:

\`\`\`
<motion.li style={{ x }} />
\`\`\`

Or for SVG attributes, via the attribute prop itself:

\`\`\`
<motion.circle cx={cx} />
\`\`\`

It's possible to pass the same motion value to multiple components.

Motion values can be updated with the \`set\` method.

\`\`\`
x.set(100)
\`\`\`

Changes to the motion value will update the DOM **without triggering a React re-render**. Motion values can be updated multiple times but renders will be batched to the next animation frame.

A motion value can hold any string or number. We can read it with the \`get\` method.

\`\`\`
x.get() // 100
\`\`\`

Motion values containing a number can return a velocity via the \`getVelocity\` method. This returns the velocity as calculated **per second** to account for variations in frame rate across devices.

\`\`\`
const xVelocity = x.getVelocity()
\`\`\`

For strings and colors, \`getVelocity\` will always return \`0\`.

### Events

Listeners can be added to motion values via [the](/docs/react-motion-value#on.md) \`[on](/docs/react-motion-value#on.md)\` [method](/docs/react-motion-value#on.md) or [the](/docs/react-use-motion-value-event.md) \`[useMotionValueEvent](/docs/react-use-motion-value-event.md)\` [hook](/docs/react-use-motion-value-event.md).

\`\`\`
useMotionValueEvent(x, "change", (latest) => console.log(latest))
\`\`\`

Available events are \`"change"\`, \`"animationStart"\`, \`"animationComplete"\` \`"animationCancel"\`.

### Composition

Beyond \`useMotionValue\`, Motion provides a number of hooks for creating and composing motion values, like \`[useSpring](/docs/react-use-spring.md)\` and \`[useTransform](/docs/react-use-transform.md)\`.

For example, with \`useTransform\` we can take the latest state of one or more motion values and create a new motion value with the result.

\`\`\`
const y = useTransform(() => x.get() * 2)
\`\`\`

\`useSpring\` can make a motion value that's attached to another via a spring.

\`\`\`
const dragX = useMotionValue(0)
const dragY = useMotionValue(0)
const x = useSpring(dragX)
const y = useSpring(dragY)
\`\`\`

These motion values can then go on to be passed to \`motion\` components, or composed with more hooks like \`[useVelocity](/docs/react-use-velocity.md)\`.

## API

### \`get()\`

Returns the latest state of the motion value.

### \`getVelocity()\`

Returns the latest velocity of the motion value. Returns \`0\` if the value is non-numerical.

### \`set()\`

Sets the motion value to a new state.

\`\`\`
x.set("#f00")
\`\`\`

### \`jump()\`

Jumps the motion value to a new state in a way that breaks continuity from previous values:

*   Resets \`velocity\` to \`0\`.
    
*   Ends active animations.
    
*   Ignores attached effects (for instance \`useSpring\`'s spring).
    

\`\`\`
const x = useSpring(0)
x.jump(10)
x.getVelocity() // 0
\`\`\`

### \`isAnimating()\`

Returns \`true\` if the value is currently animating.

### \`stop()\`

Stop the active animation.

### \`on()\`

Subscribe to motion value events. Available events are:

*   \`change\`
    
*   \`animationStart\`
    
*   \`animationCancel\`
    
*   \`animationComplete\`
    

It returns a function that, when called, will unsubscribe the listener.

\`\`\`
const unsubscribe = x.on("change", latest => console.log(latest))
\`\`\`

When calling \`on\` inside a React component, it should be wrapped with a \`useEffect\` hook, or instead use [the](/docs/react-use-motion-value-event.md) \`[useMotionValueEvent](/docs/react-use-motion-value-event.md)\` [hook](/docs/react-use-motion-value-event.md).

### \`destroy()\`

Destroy and clean up subscribers to this motion value.

This is normally handled automatically, so this method is only necessary if you've manually created a motion value outside the React render cycle using the vanilla \`motionValue\` hook.`
                }
            ]
        };
    });
    // useMotionTemplate
    server.registerResource("React: useMotionTemplate", docsUri("react", "use-motion-template"), {
        description: "Combine motion values into dynamic strings with Motion for React's useMotionTemplate. Create auto-updating, interpolated values for responsive animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-motion-template");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useMotionTemplate

\`useMotionTemplate\` creates a new [motion value](/docs/react-motion-value.md) from a [string template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing other motion values.

\`\`\`
const x = useMotionValue(100)
const transform = useMotionTemplate\`transform(\${x}px)\`
\`\`\`

Whenever a motion value within the string template updates, the returned motion value will update with the latest value.

## Usage

Import from Motion:

\`\`\`
import { useMotionTemplate } from "motion/react"
\`\`\`

\`useMotionTemplate\` is a "tagged template", so rather than being called like a normal function, it's called as a string template:

\`\`\`
useMotionValue\`\`
\`\`\`

This string template can accept both text and other motion values:

\`\`\`
const blur = useMotionValue(10)
const saturate = useMotionValue(50)
const filter = useMotionTemplate\`blur(\${10}px) saturate(\${saturate}%)\`

return <motion.div style={{ filter }} />
\`\`\`

The latest value of the returned motion value will be the string template with each provided motion value replaced with its latest value.

\`\`\`
const shadowX = useSpring(0)
const shadowY = useMotionValue(0)

const filter = useMotionTemplate\`drop-shadow(\${shadowX}px \${shadowY}px 20px rgba(0,0,0,0.3))\`

return <motion.div style={{ filter }} />
\`\`\``
                }
            ]
        };
    });
    // useMotionValueEvent
    server.registerResource("React: useMotionValueEvent", docsUri("react", "use-motion-value-event"), {
        description: "Manage motion value event listeners in React with useMotionValueEvent. Auto-cleans events like change & animationComplete for dynamic UIs.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-motion-value-event");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useMotionValueEvent

\`useMotionValueEvent\` manages a motion value event handler throughout the lifecycle of a React component.

\`\`\`
function Component() {
  const x = useMotionValue(0)
  
  useMotionValueEvent(x, "animationStart", () => {
    console.log("animation started on x")
  })
  
  useMotionValueEvent(x, "change", (latest) => {
    console.log("x changed to", latest)
  })
  
  return <motion.div style={{ x }} />
}
\`\`\`

When the component is unmounted, event handlers will be safely cleaned up.

## Usage

Import from Motion:

\`\`\`
import { useMotionValueEvent } from "motion/react"
\`\`\`

To add an event listener to a motion value, provide the value, event name and callback:

\`\`\`
const color = useMotionValue("#00f")

useMotionValueEvent(color, "change", (latest) => {
  console.log(latest)
})
\`\`\`

Available events are:

*   \`change\`
    
*   \`animationStart\`
    
*   \`animationComplete\`
    
*   \`animationCancel\`
    

\`"change"\` events are provided the latest value of the motion value.

### Advanced

\`useMotionValueEvent\` is a helper function for a motion value's \`[on](/docs/react-motion-value.md)\` [method](/docs/react-motion-value.md). With \`on\`, you can start listening to events whenever you like, for instance within an event handler. But remember to also unsubscribe when the component unmounts.

\`\`\`
useEffect(() => {
  const doSomething = () => {}
  
  const unsubX = x.on("change", doSomething)
  const unsubY = y.on("change", doSomething)
  
  return () => {
    unsubX()
    unsubY()
  }
}, [x, y])
\`\`\``
                }
            ]
        };
    });
    // useScroll
    server.registerResource("React: useScroll", docsUri("react", "use-scroll"), {
        description: "Create scroll-linked animations like progress bars & parallax with Motion for React's useScroll hook. Track scroll, element position & use motion values.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-scroll");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useScroll

\`useScroll\` is used to create scroll-linked animations, like progress indicators and parallax effects.

\`\`\`
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
\`\`\`

## Usage

Import \`useScroll\` from Motion:

\`\`\`
import { useScroll } from "motion/react"
\`\`\`

\`useScroll\` returns four [motion values](/docs/react-motion-value.md):

*   \`scrollX\`/\`Y\`: The absolute scroll position, in pixels.
    
*   \`scrollXProgress\`/\`YProgress\`: The scroll position between the defined offsets, as a value between \`0\` and \`1\`.
    

### Page scroll

By default, useScroll tracks the page scroll.

\`\`\`
const { scrollY } = useScroll()

useMotionValueEvent(scrollY, "change", (latest) => {
  console.log("Page scroll: ", latest)
})
\`\`\`

For example, we could show a page scroll indicator by passing \`scrollYProgress\` straight to the \`scaleX\` style of a progress bar.

\`\`\`
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
\`\`\`

As \`useScroll\` returns motion values, we can compose this scroll info with other motion value hooks like \`useTransform\` and \`useSpring\`:

\`\`\`
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress)

return <motion.div style={{ scaleX }} />
\`\`\`

> Since \`scrollY\` is a \`MotionValue\`, there's a neat trick you can use to tell when the user's scroll direction changes:
> 
> \`\`\`
> const { scrollY } = useScroll()
> const [scrollDirection, setScrollDirection] = useState("down")
> 
> useMotionValueEvent(scrollY, "change", (current) => {
>   const diff = current - scrollY.getPrevious()
>   setScrollDirection(diff > 0 ? "down" : "up")
> })
> \`\`\`
> 
> Perfect for triggering a sticky header animation!
> 
> ~ Sam Selikoff, [Motion for React Recipes](https://buildui.com/courses/framer-motion-recipes)

### Element scroll

To track the scroll position of a scrollable element we can pass the element's \`ref\` to \`useScroll\`'s \`container\` option:

\`\`\`
const carouselRef = useRef(null)
const { scrollX } = useScroll({
  container: carouselRef
})

return (
  <div ref={carouselRef} style={{ overflow: "scroll" }}>
    {children}
  </div>
)
\`\`\`

### Element position

We can track the progress of an element as it moves within a container by passing its \`ref\` to the \`target\` option.

\`\`\`
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end end"]
})

return <div ref={ref}>
\`\`\`

In this example, each item has its own progress indicator.

### Scroll offsets

With [the](/docs/react-use-scroll#offset.md) \`[offset](/docs/react-use-scroll#offset.md)\` [option](/docs/react-use-scroll#offset.md) we can define which parts of the element we want to track with the viewport, for instance track elements as they enter in from the bottom, leave at the top, or travel throughout the whole viewport.

## Options

\`useScroll\` accepts the following options.

### \`container\`

**Default**: Viewport

The scrollable container to track the scroll position of. By default, this is the browser viewport. By passing a ref to a scrollable element, that element can be used instead.

\`\`\`
const targetRef = useRef(null)
const { scrollYProgress } = useScroll({ target: targetRef })
\`\`\`

### \`target\`

\`useScroll\` tracks the progress of the \`target\` within the \`container\`. By default, the \`target\` is the scrollable area of the \`container\`. It can additionally be set as another element, to track its progress within the \`container\`.

\`\`\`
const targetRef = useRef(null)
const { scrollYProgress } = useScroll({ target: targetRef })
\`\`\`

### \`axis\`

**Default:** \`"y"\`

The tracked axis for the defined \`offset\`.

### \`offset\`

**Default:** \`["start start", "end end"]\`

\`offset\` describes intersections, points where the \`target\` and \`container\` meet.

For example, the intersection \`"start end"\` means when the **start of the target** on the tracked axis meets the **end of the container.**

So if the target is an element, the container is the window, and we're tracking the vertical axis then \`"start end"\` is where the **top of the element** meets **the bottom of the viewport**.

#### Accepted intersections

Both target and container points can be defined as:

*   **Number:** A value where \`0\` represents the start of the axis and \`1\` represents the end. So to define the top of the target with the middle of the container you could define \`"0 0.5"\`. Values outside this range are permitted.
    
*   **Names:** \`"start"\`, \`"center"\` and \`"end"\` can be used as clear shortcuts for \`0\`, \`0.5\` and \`1\` respectively.
    
*   **Pixels:** Pixel values like \`"100px"\`, \`"-50px"\` will be defined as that number of pixels from the start of the target/container.
    
*   **Percent:** Same as raw numbers but expressed as \`"0%"\` to \`"100%"\`.
    
*   **Viewport:** \`"vh"\` and \`"vw"\` units are accepted.
    

\`\`\`
// Track an element as it enters from the bottom
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start end", "end end"]
})

// Track an element as it moves out the top
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start start", "end start"]
})
\`\`\``
                }
            ]
        };
    });
    // useSpring
    server.registerResource("React: useSpring", docsUri("react", "use-spring"), {
        description: "Discover Motion for React's useSpring hook. Create smooth spring animations for motion values. Learn to animate with .set(), track values & customize transitions.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-spring");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useSpring

\`useSpring\` creates [a motion value](/docs/react-motion-value.md) that will animate to its latest target with a spring animation.

The target can either be set manually via \`.set\`, or automatically by passing in another motion value.

## Usage

Import \`useSpring\` from Motion:

\`\`\`
import { useSpring } from "motion/react"
\`\`\`

### Direct control

\`useSpring\` can be created with a number, or a unit-type (\`px\`, \`%\` etc) string:

\`\`\`
const x = useSpring(0)
const y = useSpring("100vh")
\`\`\`

Now, whenever this motion value is updated via \`set()\`, the value will animate to its new target with the defined spring.

\`\`\`
x.set(100)
y.set("50vh")
\`\`\`

It's also possible to update this value immediately, without a spring, with [the](/docs/react-motion-value#jump.md) \`[jump()](/docs/react-motion-value#jump.md)\` [method](/docs/react-motion-value#jump.md).

\`\`\`
x.jump(50)
y.jump("0vh")
\`\`\`

### Track another motion value

Its also possible to automatically spring towards the latest value of another motion value:

\`\`\`
const x = useMotionValue(0)
const y = useSpring(x)
\`\`\`

This source motion value must also be a number, or unit-type string.

### Transition

The type of \`spring\` can be defined with the usual [spring transition option](/docs/react-transitions#spring.md).

\`\`\`
useSpring(0, { stiffness: 300 })
\`\`\``
                }
            ]
        };
    });
    // useTime
    server.registerResource("React: useTime", docsUri("react", "use-time"), {
        description: "Explore Motion for React's useTime hook. It returns elapsed time in ms every frame. Learn how it creates perpetual animations & composes with other motion values.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-time");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useTime

\`useTime\` returns a [motion value](/docs/react-motion-value.md) that updates once per frame with the duration, in milliseconds, since it was first created.

This is especially useful in generating perpetual animations.

\`\`\`
const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

return <motion.div style={{ rotate }} />
\`\`\`

## Usage

Import from Motion:

\`\`\`
import { useTime } from "motion/react"
\`\`\`

When called, \`useTime\` will create a new motion value. This value will update every frame with the time since its creation.

You can use this either directly or by composing with other motion value hooks.

\`\`\`
const time = useTime()
const rotate = useTransform(
  time,
  [0, 4000], // For every 4 seconds...
  [0, 360], // ...rotate 360deg
  { clamp: false }
)
\`\`\``
                }
            ]
        };
    });
    // useTransform
    server.registerResource("React: useTransform", docsUri("react", "use-transform"), {
        description: "Discover Motion for React's useTransform hook. Create new motion values by transforming others. Learn to map ranges & use clamp, ease, mixer for advanced control.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-transform");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useTransform

\`useTransform\` creates a new motion value that transforms the output of one or more motion values.

\`\`\`
const x = useMotionValue(1)
const y = useMotionValue(1)

const z = useTransform(() => x.get() + y.get()) // z.get() === 2
\`\`\`

## Usage

Import from Motion:

\`\`\`
import { useTransform } from "motion/react"
\`\`\`

\`useTransform\` can be used in two ways: with a transform function and via value maps:

\`\`\`
// Transform function
const doubledX = useTransform(() => x.get() * 2)

// Value mapping
const color = useTransform(x, [0, 100], ["#f00", "00f"])
\`\`\`

### Transform function

A transform function is a normal function that returns a value.

\`\`\`
const doubledX = useTransform(() => x.get() * 2)
\`\`\`

Any motion values read in this function via the \`get()\` method will be automatically subscribed to.

When these motion values change, the function will be run again on the next animation frame to calculate a new value.

\`\`\`
const distance = 100
const time = useTime()
const y = useTransform(() => Math.sin(time.get() / 1000) * distance)
\`\`\`

### Value mapping

\`useTransform\` can also map a single motion value from one range of values to another.

To illustrate, look at this \`x\` motion value:

\`\`\`
const x = useMotionValue(0)
\`\`\`

We can use \`useTransform\` to create a new motion value called \`opacity\`.

\`\`\`
const opacity = useTransform(x, input, output)
\`\`\`

By defining an \`input\` range and an \`output\` range, we can define relationships like "when \`x\` is \`0\`, \`opacity\` should be \`1\`. When \`x\` is \`100\` pixels either side, \`opacity\` should be \`0\`".

\`\`\`
const input = [-100, 0, 100]
const output = [0, 1, 0]
\`\`\`

Both ranges can be **any length** but must be the **same length** as each other.

The input range must always be a series of increasing or decreasing numbers.

The output range must be values all of the same type, but can be in any order. It can also be any [value type that Motion can animate](/docs/react-animation#animatable-values.md), like numbers, units, colors and other strings.

\`\`\`
const backgroundColor = useTransform(
  x,
  [0, 100],
  ["#f00", "#00f"]
)
\`\`\`

By setting \`clamp: false\`, the ranges will map perpetually. For instance, in this example we're saying "for every \`100px\` scrolled, rotate another \`360deg\`":

\`\`\`
const { scrollY } = useScroll()
const rotate = useTransform(
  scrollY,
  [0, 100],
  [0, 360],
  { clamp: false }
)
\`\`\`

## Options

With value mapping, we can set some additional options.

### \`clamp\`

**Default:** \`true\`

If \`true\`, will clamp output to within the provided range. If \`false\`, will carry on mapping even when the input falls outside the provided range.

\`\`\`
const y = useTransform(x, [0, 1], [0, 2])
const z = useTransform(x, [0, 1], [0, 2], { clamp: false })

useEffect(() => {
  x.set(2)
  console.log(y.get()) // 2, input clamped
  console.log(z.get()) // 4
})
\`\`\`

### \`ease\`

An easing function, or array of easing functions, to ease the mixing between each value.

These must be JavaScript functions.

\`\`\`
import { cubicBezier, circOut } from "motion"
import { useTransform } from "motion/react"

// In your component
const y = useTransform(x, [0, 1], [0, 2], { ease: circOut })

const z = useTransform(
  x,
  [0, 1],
  [0, 2],
  { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) }
)
\`\`\`

### \`mixer\`

A function to use to mix between each pair of output values.

This function will be called with each pair of output values and must return a new function, that accepts a progress value between \`0\` and \`1\` and returns the mixed value.

This can be used to inject more advanced mixers than Framer Motion's default, for instance [Flubber](https://github.com/veltman/flubber) for morphing SVG paths.`
                }
            ]
        };
    });
    // useVelocity
    server.registerResource("React: useVelocity", docsUri("react", "use-velocity"), {
        description: "Discover Motion for React's useVelocity hook. It tracks a motion value's velocity, letting you monitor the rate of change for any animatable value easily.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-velocity");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useVelocity

\`useVelocity\` accepts a [motion value](/docs/react-motion-value.md) and returns a new one that updates with the provided motion value's velocity.

\`\`\`
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const scale = useTransform(
  xVelocity,
  [-3000, 0, 3000],
  [2, 1, 2],
  { clamp: false }
)

return <motion.div drag="x" style={{ x, scale }} />
\`\`\`

## Usage

Import \`useVelocity\` from Motion:

\`\`\`
import { useVelocity } from "motion/react"
\`\`\`

Pass any numerical motion value to \`useVelocity\`. It'll return a new motion value that updates with the velocity of the original value.

\`\`\`
import { useMotionValue, useVelocity } from "framer-motion"

function Component() {
  const x = useMotionValue(0)
  const xVelocity = useVelocity(x)

  useMotionValueEvent(xVelocity, "change", latest => {
    console.log("Velocity", latestVelocity)
  })
  
  return <motion.div style={{ x }} />
}
\`\`\`

Any numerical motion value will work. Even one returned from \`useVelocity\`.

\`\`\`
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const xAcceleration = useVelocity(xVelocity)
\`\`\``
                }
            ]
        };
    });
    // Motion for React Three Fiber
    server.registerResource("React: Motion for React Three Fiber", docsUri("react", "three-fiber"), {
        description: "Learn how to use Motion for React with React Three Fiber.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "three-fiber");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion for React Three Fiber

Motion for React Three Fiber is a simple yet powerful 3D animation library. It offers most of the same functionality as Motion for React, but for declarative 3D scenes.

This guide will help you create animations with Motion for React Three Fiber, but assumes you know the basics of both [Motion for React](/docs/react.md) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).

## Install

Motion for React Three Fiber is built upon the [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (R3F) libraries. Install all three from npm:

\`\`\`
npm install three@0.137.0 @react-three/fiber@8.2.2 framer-motion-3d@11.2.0
\`\`\`

**Warning:** Motion for React Three Fiber is currently only compatible with React 18.

## Usage

### \`motion\` components

For every R3F component, there's a \`motion\` equivalent. Import \`motion\` from \`"framer-motion-3d"\`:

\`\`\`
import { motion } from "framer-motion-3d"
\`\`\`

And use in place of your R3F components:

\`\`\`
<motion.pointLight animate={{ x: 2 }} />
\`\`\`

### Animation

Motion for R3F supports all the same [animation](/docs/react-motion-component.md) options as usual, including the \`initial\` and \`animate\` props, \`exit\` and variants.

\`\`\`
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

return (
  <motion.meshStandardMaterial
    initial="hidden"
    animate="visible"
    variants={variants}
  />
)
\`\`\`

Currently, variants can't be automatically passed between the DOM and 3D worlds, but you can still share state to achieve similar results:

\`\`\`
// index.js
import { motion } from "framer-motion"
import { Scene } from "./scene"

export function App() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(true)}
    >
      <Scene isHovered={isHovered} />
    </motion.div>
  )
}

// scene.js
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion-3d"

export function Scene({ isHovered }) {
  return (
    <Canvas>
      <motion.group animate={isHovered ? "hover" : "rest"}>
        <motion.mesh variants={{ hover: { z: 1 } }} />
      </motion.group>
    </Canvas>
  )
}
\`\`\`

### Supported values

3D \`motion\` components support most of the the same transforms as their 2D equivalents:

*   \`x\`, \`y\` and \`z\`
    
*   \`scale\`, \`scaleX\`, \`scaleY\` and \`scaleZ\`
    
*   \`rotateX\`, \`rotateY\` and \`rotateZ\`
    

Additionally, \`color\` and \`opacity\` are supported on 3D primitives that support them, like \`meshStandardMaterial\`, with support for more values coming in the near future.

### Gestures

3D \`motion\` components support the hover and tap [gestures](/docs/react-gestures.md) on R3F with a physical presence (like \`mesh\`).

\`\`\`
<motion.mesh
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onHoverStart={() => console.log('hover start')}
  onTap={() => console.log('tapped!')}
/>
\`\`\`

### Motion values

Motion values are used to track the state and velocity of animating values, outside of React's render lifecycle.

With 3D \`motion\` components, motion values are injected via their R3F attribute:

\`\`\`
import { useMotionValue, useTransform } from "framer-motion"
import { motion } from "framer-motion-3d"

export function Box() {
  const x = useMotionValue(0)
  const scaleZ = useTransform(x, v => v / 100)
  
  return (
    <motion.mesh
      position-x={x}
      scale={[1, 1, scaleZ]}
      animate={{ x: 100 }} 
    />
  )
}
\`\`\`

### Layout animations

Images, and therefore 3D scenes, involved in layout animations can exhibit scale distortion. With the [](/docs/react-three-fiber-layout-cameras.md)\`[LayoutCamera](/docs/react-three-fiber-layout-cameras.md)\` [and](/docs/react-three-fiber-layout-cameras.md) \`[LayoutOrthographicCamera](/docs/react-three-fiber-layout-cameras.md)\` [components](/docs/react-three-fiber-layout-cameras.md) this distortion can be corrected and the 3D scene can be incorporated into the layout animation naturally.`
                }
            ]
        };
    });
    // Layout cameras
    server.registerResource("React: Layout cameras", docsUri("react", "three-fiber-layout-cameras"), {
        description: "A perspective and orthographic camera that integrates with Framer Motion's layout animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "three-fiber-layout-cameras");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Layout cameras

\`LayoutCamera\` and \`LayoutOrthographicCamera\` allow us to involve React Three Fiber scenes in Motion's [layout animations](/docs/react-layout-animations.md).

## Usage

Motion's [layout animations](/docs/react-layout-animations.md) work via the \`transform\` style. A drawback to animating \`width\` and \`height\` via \`transform\` is imagery can become distorted.

When involving a React Three Fiber scene into a layout animation, we can use Motion's \`LayoutCamera\` and \`LayoutOrthographicCamera\` components to pre-distort a 3D scene so that when the CSS \`transform\` is applied to the host \`canvas\` element, it looks correct throughout the animation.

To implement a camera, we first nee to replace \`Canvas\` from \`@react-three/fiber\` with [the](/docs/react-three-fiber-motion-canvas.md) \`[MotionCanvas](/docs/react-three-fiber-motion-canvas.md)\` [component](/docs/react-three-fiber-motion-canvas.md). Then, one of the camera components can be added anywhere within the scene:

\`\`\`
import { MotionCanvas, LayoutCamera } from "framer-motion"

function Scene() {
  <MotionCanvas>
    <LayoutCamera />
    <Box />
  </MotionCanvas>
}
\`\`\`

\`LayoutCamera\` provides a normal perspective camera:

Whereas \`LayoutOrthographicCamera\` provides an orthographic view:

## Props

Internally, \`LayoutCamera\` renders a \`<motion.perspectiveCamera />\` and \`LayoutOrthographicCamera\` renders a \`<motion.orthographicCamera />\` component, so they can accept all the usual React Three Fiber props like \`position\` and \`zoom\`, as well as \`motion\` props like \`initial\` and \`animate\`.

\`\`\`
<LayoutCamera
  position={[0, 0, 5]}
  zoom={20}
  animate={{ zoom: 100 }}
  transition={{ duration: 2 }}
/>
\`\`\``
                }
            ]
        };
    });
    // MotionCanvas
    server.registerResource("React: MotionCanvas", docsUri("react", "three-fiber-motion-canvas"), {
        description: "A React Three Fiber Canvas replacement for linking Motion for React DOM and Three.js.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "three-fiber-motion-canvas");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# MotionCanvas

React Three Fiber (R3F) uses the [Canvas component](https://docs.pmnd.rs/react-three-fiber/api/canvas) to establish a 3D scene. Using this component will break context with parent components.

To link Motion 3D context with DOM Motion, for example to share a default transition or link the [LayoutCamera](/docs/react-three-fiber-layout-cameras.md) with layout animations, the \`MotionCanvas\` component can be used instead.

\`\`\`
import { MotionConfig, motion } from "motion/react"
import { MotionCanvas, motion as motion3d } from "framer-motion-3d"

export function App() {
  return (
    <MotionConfig transition={{ type: "spring" }}>
      <motion.div animate={{ scale: 2 }}>
        <MotionCanvas>
          <motion3d.boxGeometry animate={{ x: 1 }} />
        </MotionCanvas>
      </motion.div>
    </MotionConfig>
  )
}
\`\`\`

It shares all the same props as R3F's \`Canvas\` component, with the omission of \`resize\`, as \`MotionCanvas\` implements its own resize options to sync with Framer Motion's layout animations.

It's also mandatory to enable [3D scenes within layout animations](/docs/react-three-fiber-layout-cameras.md).`
                }
            ]
        };
    });
    // Installation guide for Motion for React
    server.registerResource("React: Installation guide for Motion for React", docsUri("react", "installation"), {
        description: "Your complete guide to installing Motion for React. Learn how to set up the animation library in any project using npm, Yarn, or pnpm, with specific guides for Next.js and Vite.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "installation");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Installation guide for Motion for React

This guide covers everything you need to install and set up **Motion for React**. We'll cover installation via:

*   **Package managers** like npm, Yarn and pnpm.
    
*   **CDN** via jsDelivr.
    
*   **Frameworks** like Next.js and Vite.
    

## Prerequisites

Before you install Motion, note that Motion is only compatible with React versions \`18.2\` and higher.

## Install via package manager

The most common way of installing Motion is via a package manager.

### npm

\`\`\`
npm install motion
\`\`\`

### Yarn

\`\`\`
yarn add motion
\`\`\`

### pnpm

\`\`\`
pnpm add motion
\`\`\`

Once the package is installed, you can import Motion's components and hooks via \`"motion/react"\`:

\`\`\`
import { motion } from "motion/react"
\`\`\`

## Add via CDN

It's also possible to import Motion directly from an external CDN, without installation. [jsDelivr](https://www.jsdelivr.com/package/npm/motion) mirrors packages published to npm, so you can import the exact same bundle like this:

\`\`\`
<script type="module">
  import motion from "https://cdn.jsdelivr.net/npm/motion@latest/react/+esm"
</script>
\`\`\`

## Frameworks

Motion is designed to work seamlessly with modern React frameworks. Here are a few tips for the most popular.

### Next.js

Motion supports both the Next.js Page and App Routers.

To use with the App Router, you either need to convert the importing file to a client component with the \`"use client"\` directive:

\`\`\`
"use client"

import { motion } from "motion/react"

export default function MyComponent() {
  return <motion.div animate={{ scale: 1.5 }} />
}
\`\`\`

Or to reduce the amount of JS delivered to the client, you can replace the import with \`import * as motion from "motion/react-client"\`:

\`\`\`
import * as motion from "motion/react-client"

export default function MyComponent() {
  return <motion.div animate={{ scale: 1.5 }} />
}
\`\`\`

### Vite

No special configuration is needed with Vite. Motion works out of the box!`
                }
            ]
        };
    });
    // Upgrade guide
    server.registerResource("React: Upgrade guide", docsUri("react", "upgrade-guide"), {
        description: "Stay up-to-date with Motion and Motion for React using our comprehensive Upgrade Guide. Find step-by-step instructions and details on breaking API changes for each major version, ensuring a smooth upgrade process from your current version to the latest release.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "upgrade-guide");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Upgrade guide

We strive to reduce the number of breaking API changes but it is occasionally necessary.

The easiest way to upgrade is to start with the version you're currently using, then follow the guide to upgrade to the next version, and so on until you're at the latest version.

Changes between major versions are usually small so this is usually a quick process.

## Motion for React

### 12.0

There are no breaking changes in Motion for React in version 12. Please see the [JavaScript upgrade guide](/docs/upgrade-guide.md) for changes to the vanilla JS API.

### \`"motion/react"\`

To upgrade to Motion for React, uninstall \`framer-motion\` and install \`motion\`:

\`\`\`
npm uninstall framer-motion
npm install motion
\`\`\`

Then simply swap imports from \`"framer-motion"\` to \`"motion/react"\`:

\`\`\`
import { motion } from "motion/react"
\`\`\`

## Framer Motion

### 11.0

#### Velocity calculation changes

In previous versions, setting a \`MotionValue\` multiple times within the same animation frame would update the value's velocity:

\`\`\`
const x = motionValue(0)

requestAnimationFrame(() => {
  x.set(100)
  x.getVelocity() // Velocity of 0 -> 100
  x.set(200)
  x.getVelocity() // Velocity of 100 -> 200
})
\`\`\`

This behaviour is incorrect. Synchronous code, practically speaking for the purposes of animation, should be considered instantaneous. Therefore, in the above example, \`x\` was only \`100\` for a infinitely small amount of time. It essentially never happened.

From version 11, subsequent value updates within synchronous blocks of code won't be considered part of a \`MotionValue\`'s velocity calculations. Therefore, if \`getVelocity\` is called after the second update, velocity will be calculated between the latest value and the value at the end of the previous frame.

\`\`\`
const x = motionValue(0)

requestAnimationFrame(() => {
  x.set(100)
  x.getVelocity() // Velocity of 0 -> 100
  x.set(200)
  x.getVelocity() // Velocity of 0 -> 200
})
\`\`\`

#### Render scheduling changes

In previous versions, \`motion\` components trigger a render synchronously after mount to ensure dynamically-calculated values are updated on-screen. This process has now been moved to a [microtask](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask).

This ensures that if a component is synchronously re-rendered by a \`useLayoutEffect\`, the first render is swallowed and we only apply the final one (the one that will be used on-screen).

This is better for performance and in most cases won't have practical ramifications for you as a developer. However, there is a caveat for Jest tests. Previously it could be assumed that updates would have applied synchronously.

\`\`\`
render(
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ false }}
  />
)

expect(element).toHaveStyle("opacity: 1")
\`\`\`

Tests like this should be updated to await an animation frame.

\`\`\`
render(
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ false }}
  />
)

await nextFrame()

expect(element).toHaveStyle("opacity: 1")

// utils.js
import { frame } from "framer-motion"

export async function nextFrame() {
    return new Promise<void>((resolve) => {
        frame.postRender(() => resolve())
    })
}
\`\`\`

### 10.0

#### \`IntersectionObserver\` fallback

This version removes the \`IntersectionObserver\` fallback behaviour for \`whileInView\`.

\`IntersectionObserver\` is supported by all modern browsers, representing over 99% of visitors to sites built in [Framer](https://framer.com/). If you require support for legacy browsers like Internet Explorer or Safari 12, we recommend adding an \`IntersectionObserver\` polyfill.

#### \`AnimatePresence exitBeforeEnter\` prop

This prop was deprecated in \`7.2.0\`. Usage will now throw an error with upgrade instructions (swap to \`mode="wait"\`).

### 9.0

This version makes **tap events keyboard-accessible**.

As a result, all elements with tap listeners or \`whileTap\` will receive \`tabindex="0"\`. Reverting this behaviour is discouraged, but can be achieved by passing \`tabIndex={-1}\`.

Additionally, \`whileFocus\` now behaves like \`:focus-visible\` rather than \`:focus\`. Loosely, this means that elements receiving focus via pointer **won't trigger** focus animations, with the exception of input elements which will trigger focus from any input.

### 8.0

Framer Motion uses pointer events to detect tap, drag and hover gestures. In previous versions, these were polyfilled with mouse and touch events in legacy browsers. Version 8 removes this polyfill.

As a result, while [DragControls.start](/docs/react-use-drag-controls.md) was always only documented to work with events from \`onPointerDown\`, it was **typed** to also accept \`onMouseDown\` and \`onTouchStart\` events. These will now throw a type error for TypeScript users and should be converted to \`onPointerDown\`.

### 7.0

Framer Motion 7 makes \`react@18\` the minimum supported version.

Framer Motion 3D users should also [upgrade React Three Fiber](https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide) to \`^8.2.2\`.

### 6.0

Framer Motion 3D now lives in the \`framer-motion-3d\` package. So to upgrade to \`6.0\` simply change imports from \`"framer-motion/three"\` to \`"framer-motion-3d"\`.

### 5.0

#### Shared layout animations

Framer Motion 5 removes need for using the \`AnimateSharedLayout\` component when performing [shared element animations](/docs/react-layout-animations.md).

Now, you can use the \`layoutId\` prop and components will animate from one to another without the need for the \`AnimateSharedLayout\` wrapper.

#### Measuring layout changes

Layout changes are detected when a component with a \`layout\` or \`layoutId\` prop re-renders. But it isn't performant to measure **all** components when just **one** changes.

\`AnimateSharedLayout\` could be used to group components that affected each other's layout. When one rerendered, \`AnimateSharedLayout\` would force them all to rerender.

This was not a performant approach because all grouped components would perform a re-render. Now, components that affect each other's layout can be grouped [with LayoutGroup](/docs/react-layout-group.md):

\`\`\`
import { LayoutGroup, motion } from "framer-motion"

export function App() {
  return (
    <LayoutGroup>
      <Submenu />
      <Submenu />
    </LayoutGroup>
  )
}

function Submenu({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.ul
      layout
      style={{ height: isOpen ? "auto" : 40 }}
    >
      {children}
    </motion.ul>
  )
}
\`\`\`

Grouped components will be measured whenever one of them renders, but they won't be forced to render themselves.

#### Scoped layout animations

Previously, because \`AnimateSharedLayout\` was required, it would naturally scope shared layout animations. So animating between components with the same \`layoutId\` would only happen within the same \`AnimateSharedLayout\`:

\`\`\`
/**
 * These items share the same layoutId but won't animate
 * between each other because they're children of different
 * AnimateSharedLayout components.
 */
<>
  <AnimateSharedLayout>
    {isVisible ? <motion.div layoutId="modal" /> : null}
  </AnimateSharedLayout>
   <AnimateSharedLayout>
    {isVisible ? <motion.div layoutId="modal" /> : null}
  </AnimateSharedLayout>
</>
\`\`\`

This could lead to very poor performance. \`AnimateSharedLayout\` reduces layout thrashing within itself by batching layout measurements. But it had no way of batching between many \`AnimateSharedLayout\` components. The more you add, the more layout thrashing will occur.

Now, there is one global tree throughout your app so all layout measurements are batched. But this means all \`layoutId\`s share the same global context. To bring back this old behaviour you can namespace \`layoutId\` by providing a \`id\` prop to \`LayoutGroup\`:

\`\`\`
/**
 * These layoutIds are now namespaced with
 * the id provided to LayoutGroup.
 */
<>
  <LayoutGroup id="a">
    {isVisible ? <motion.div layoutId="modal" /> : null}
  </LayoutGroup>
  <LayoutGroup id="b">
   {isVisible ? <motion.div layoutId="modal" /> : null}
  </LayoutGroup>
</>
\`\`\`

#### Drag to reorder

Previous drag-to-reorder implementations were ad-hoc, usually adapted from an old proof-of-concept sandbox that relied on the (now removed) \`onViewportBoxUpdate\` prop. These solutions should be reimplemented with the [new Reorder components](https://www.framer.com/docs/reorder/).

#### ESM and \`create-react-app\`

To enable Framer's experimental "Handshake" features, that allow you to publish no-code components straight from Framer into production, we've moved Framer Motion to ESM modules. Some build environments like \`create-react-app\` might have some trouble mixing ES modules (like Framer Motion) and CJS modules (like React).

To fix, either upgrade to \`create-react-app@next\`, or downgrade to \`framer-motion@4.1.17\`.

### 4.0

Framer Motion 4 introduces a brand new \`LazyMotion\` component to help reduce bundle size.

Previously, a subset of \`motion\` functionality could be loaded in synchronously or asynchronously via \`MotionConfig\`'s \`features\` prop. This functionality has been removed in favour of the new \`LazyMotion\` component.

Check out the new reduce bundle size guide to find out how to use this new API.

\`\`\`
import { LazyMotion, domAnimation, m } from "framer-motion"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
\`\`\`

#### Other breaking changes

\`4\` also removes \`motion.custom()\`, which was previously deprecated in favour of \`motion()\`.

\`motion.custom()\` had the default behaviour of forwarding all of Framer Motion's props to the underlying component. To replicate this, the \`forwardMotionProps\` option can be used.

\`\`\`
const MotionComponent = motion(Component, {
    forwardMotionProps: true
})
\`\`\`

### 3.0

Framer Motion 3 is major release but the type of breaking change is very specific and very small. It's unlikely, though possible, to change the way your animations function.

#### The changing behaviour

Motion 3 features a centralisation of how animation states are computed.

All animation props are now ranked in terms of priority (left being lowest, right being highest).

When one of those props changes, or becomes active/inactive, we will recompute the necessary animations. This is an extension and codification of a behaviour that was partially implemented only for the \`while\` props, leading to a more consistent and predictable experience.

\`\`\`
const priority = ["animate", "while-", "exit"]
\`\`\`

#### Removing animation values

**Before**, if a value was outright removed from an animation prop, nothing would happen.

**Now**, if a value is removed, we check for it in the next highest-priority animation state. For instance, if \`opacity\` is removed from \`whileHover\`, Motion will check for it in \`animate\` and animate to that.

If we don't find one in \`animate\`, it'll check in \`style\`, or fallback to its initially-recorded value (for instance if the value was initially read from the DOM because none was explicitly defined).

### 2.0

Framer Motion 2 is major release and that means there's API changes. In this guide we'll take a look at how you can upgrade your code to ensure it continues to work as expected, and highlight some features that will be broken in the new version of Motion.

#### Layout animations

Framer Motion 1 supported a couple of ways to perform layout animations, the \`positionTransition\` and \`layoutTransition\` props.

\`\`\`
// Before
<motion.div layoutTransition />
\`\`\`

In Framer Motion 2, these have both been superseded by the \`layout\` prop.

\`\`\`
// After
<motion.div layout />
\`\`\`

Both of the old props used to take a transition as an argument.

\`\`\`
// Before
<motion.div layoutTransition={{ duration: 2 }} />
\`\`\`

Now, layout animations use the same default \`transition\` prop as other animations.

\`\`\`
// After
<motion.div layout transition={{ duration: 2 }} />
\`\`\`

In Framer Motion 1, layout animations could distort \`borderRadius\` and \`boxShadow\` properties on components that were changing size. This is now fixed if either property is animated.

\`\`\`
<motion.div layout initial={{ borderRadius: 20 }} />
\`\`\`

Layout animations that changed size could also distort child components. This can now be corrected by providing them with a \`layout\` prop, too.

Only immediate children will need to be corrected for scale.

\`\`\`
<motion.div layout>
  <motion.div layout />
</motion.div>
\`\`\`

#### Breaking changes

There are some changes that don't have an immediate fix that you should be aware of before upgrading.

##### Drag

Drag has been refactored to use the same layout projection rendering methodology that powers Motion 2's layout animations to ensure the two features are fully compatible with each other.

This has lead to some breaking changes:

*   Drag listeners (like \`onDrag\`) now report the \`point\` relative to the viewport, moving in line with other pointer gestures in Motion.
    
*   \`dragOriginX\` and \`dragOriginY\` have been removed. These were added to allow a hacky way to make \`positionTransition\` compatible with \`drag\`, but \`layout\` is compatible with \`drag\` by default.
    

##### \`useAnimatedState\`

The \`useAnimatedState\` API was an experimental and undocumented API for use in Framer X. This has now been removed.`
                }
            ]
        };
    });
    // useAnimate
    server.registerResource("React: useAnimate", docsUri("react", "use-animate"), {
        description: "Discover Motion for React's useAnimate hook for component-scoped animations. Use its animate function for manual control, scoped selectors & auto cleanup.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-animate");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useAnimate

\`useAnimate\` provides a way of using the \`[animate](/docs/animate.md)\` [function](/docs/animate.md) that is scoped to the elements within your component.

This allows you to use manual animation controls, timelines, selectors scoped to your component, and automatic cleanup.

It provides a \`scope\` ref, and an \`animate\` function where every DOM selector is scoped to this ref.

\`\`\`
function Component() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives \`scope\`.
    animate("li", { opacity: 1 })
  })
  
  return <ul ref={scope}>{children}</ul>
}
\`\`\`

Additionally, when the component calling \`useAnimate\` is removed, all animations started with its \`animate\` function will be cleaned up automatically.

## Usage

Import from Motion:

\`\`\`
// Mini
import { useAnimate } from "motion/react-mini"

// Hybrid
import { useAnimate } from "motion/react"
\`\`\`

\`useAnimate\` returns two arguments, a \`scope\` ref and an \`[animate](/docs/animate.md)\` [function](/docs/animate.md).

\`\`\`
function Component() {
  const [scope, animate] = useAnimate()
\`\`\`

This \`scope\` ref must be passed to either a regular HTML/SVG element or a \`motion\` component.

\`\`\`
function Component({ children }) {
  const [scope, animate] = useAnimate()
  
  return <ul ref={scope}>{children}</ul>
}
\`\`\`

This scoped \`animate\` function can now be used in effects and event handlers to animate elements.

We can either use the scoped element directly:

\`\`\`
animate(scope.current, { opacity: 1 }, { duration: 1 })
\`\`\`

Or by passing it a selector:

\`\`\`
animate("li", { backgroundColor: "#000" }, { ease: "linear" })
\`\`\`

This selector is \`"li"\`, but we're not selecting all \`li\` elements on the page, only those that are a child of the scoped element.

### Scroll-triggered animations

Animations can be triggered when the scope scrolls into view by combining \`useAnimate\` with \`[useInView](/docs/react-use-in-view.md)\`.

\`\`\`
import { useAnimate, useInView } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  
  useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1 })
     }
  }, [isInView])
  
  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
\`\`\`

### Exit animations

It's possible to compose your own exit animations when a component is removed using \`useAnimate\` in conjunction with \`[usePresence](/docs/react-animate-presence.md)\`.

\`\`\`
import { useAnimate, usePresence } from "framer-motion"

function Component() {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()
  
  useEffect(() => {
     if (isPresent) {
       const enterAnimation = async () => {
         await animate(scope.current, { opacity: 1 })
         await animate("li", { opacity: 1, x: 0 })
       }
       enterAnimation()

     } else {
       const exitAnimation = async () => {
         await animate("li", { opacity: 0, x: -100 })
         await animate(scope.current, { opacity: 0 })
         safeToRemove()
       }
       
       exitAnimation()
     }
  }, [isPresent])
  
  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
\`\`\`

This component can now be conditionally rendered as a child of \`AnimatePresence\`.

\`\`\`
<AnimatePresence>
  {show ? <Component key="dialog" /> : null}
</AnimatePresence>
\`\`\``
                }
            ]
        };
    });
    // useAnimationFrame
    server.registerResource("React: useAnimationFrame", docsUri("react", "use-animation-frame"), {
        description: "Use Motion for React's useAnimationFrame hook to run callbacks on every frame. Leverage time & delta args for precise animation control & custom frame logic.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-animation-frame");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useAnimationFrame

\`useAnimationFrame\` runs a callback once every animation frame.

\`\`\`
useAnimationFrame((time) => {
  ref.current.style.transform = \`rotateY(\${time}deg)\`
})
\`\`\`

The callback is provided two arguments:

*   \`time\`, the total duration of time since the callback was first called.
    
*   \`delta\`, the total duration of time since the last animation frame.
    

\`\`\`
import { useAnimationFrame } from "motion/react"

function Component() {
  const ref = useRef(null)
  
  useAnimationFrame((time, delta) => {
    ref.current.style.transform = \`rotateY(\${time}deg)\`
  })

  return <div ref={ref} />
}
\`\`\``
                }
            ]
        };
    });
    // useDragControls
    server.registerResource("React: useDragControls", docsUri("react", "use-drag-controls"), {
        description: "Learn how to use Motion for React's useDragControls hook to manually initiate drag gestures on motion components from any pointer event. Discover how to start dragging, enable touch support, snap to cursor, and disable automatic dragging for more custom drag interactions.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-drag-controls");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useDragControls

Usually, dragging is initiated by pressing down on [a](/docs/react-gestures#drag.md) \`[motion](/docs/react-gestures#drag.md)\` [component with a](/docs/react-gestures#drag.md) \`[drag](/docs/react-gestures#drag.md)\` [prop](/docs/react-gestures#drag.md) and then moving the pointer.

For some use-cases, for example clicking at an arbitrary point on a video scrubber, we might want to initiate that dragging from a different element.

With \`useDragControls\`, we can create a set of controls to manually start dragging from any pointer event.

## Usage

Import \`useDragControls\` from Motion:

\`\`\`
import { useDragControls } from "motion/react"
\`\`\`

\`useDragControls\` returns drag controls that can be passed to a draggable \`motion\` component:

\`\`\`
const controls = useDragControls()

return <motion.div drag dragControls={controls} />
\`\`\`

Now we can start a drag session from another any element's \`onPointerDown\` event via the \`start\` method.

\`\`\`
<div onPointerDown={event => controls.start(event)} />
\`\`\`

### Touch support

To support touch screens, the triggering element should have the \`touch-action: none\` style applied.

\`\`\`
<div onPointerDown={startDrag} style={{ touchAction: "none" }} />
\`\`\`

### Snap to cursor

By default, the drag gesture will only apply **changes** to the pointer position.

We can also make the \`motion\` component immediately snap to the cursor by passing \`snapToCursor: true\` to the \`start\` method.

\`\`\`
controls.start(event, { snapToCursor: true })
\`\`\`

### Disable automatic drag

With this configuration, the \`motion\` component will still automatically start a drag gesture when it receives a \`pointerdown\` event itself.

We can stop this behaviour by passing it a \`dragListener={false}\` prop.

\`\`\`
<motion.div
  drag
  dragListener={false}
  dragControls={controls}
/>
\`\`\`

### Configure drag threshold

By default, a drag gesture will take \`3\` pixels of cursor travel before initialising and, if using \`directionLock\`, determining which axis to lock on to.

This distance can be configured with the \`distanceThreshold\` option.

\`\`\`
controls.start(event, { distanceThreshold: 10 })
\`\`\`

### Manually stop and cancel

The drag gesture will automatically stop when the \`pointerup\` event is detected. It's also possible to end the gesture manually, with the \`.stop()\` and \`.cancel()\` methods.

\`\`\`
controls.stop()
// or
controls.cancel()
\`\`\`

Cancelling the event will skip calling the \`onDragEnd\` callback.`
                }
            ]
        };
    });
    // useInView
    server.registerResource("React: useInView", docsUri("react", "use-in-view"), {
        description: "Use Motion for React's tiny useInView hook (0.6kb) to detect when elements enter the viewport. Track visibility, trigger effects & customize detection easily.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-in-view");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useInView

\`useInView\` is a tiny (0.6kb) hook that detects when the provided element is within the viewport. It can be used with any React element.

\`\`\`
const ref = useRef(null)
const isInView = useInView(ref)

return <div ref={ref} />
\`\`\`

## Usage

Import \`useInView\` from Motion:

\`\`\`
import { useInView } from "motion/react"
\`\`\`

\`useInView\` can track the visibility of any HTML element. Pass a \`ref\` object to both \`useInView\` and the HTML element.

\`\`\`
function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return <div ref={ref} />
}
\`\`\`

While the element is outside the viewport, \`useInView\` will return \`false\`. When it moves inside the view, it'll re-render the component and return \`true\`.

### Effects

\`useInView\` is vanilla React state, so firing functions when \`isInView\` changes is a matter of passing it to a \`useEffect\`.

\`\`\`
useEffect(() => {
  console.log("Element is in view: ", isInView)
}, [isInView])
\`\`\`

## Options

\`useInView\` can accept options to define how the element is tracked within the viewport.

\`\`\`
const isInView = useInView(ref, { once: true })
\`\`\`

### \`root\`

By default, \`useInView\` will track the visibility of an element as it enters/leaves the window viewport. Set \`root\` to be the ref of a scrollable parent, and it'll use that element to be the viewport instead.

\`\`\`
function Carousel() {
  const container = useRef(null)
  const ref = useRef(null)
  const isInView = useInView({ root: container })
  
  return (
    <div ref={container} style={{ overflow: "scroll" }}>
      <div ref={ref} />
    </div>
  )
}
\`\`\`

### \`margin\`

**Default:** \`"0px"\`

A margin to add to the viewport to change the detection area. Use multiple values to adjust top/right/bottom/left, e.g. \`"0px -20px 0px 100px"\`.

\`\`\`
const isInView = useInView({
  margin: "0px 100px -50px 0px"
})
\`\`\`

### \`once\`

**Default:** \`false\`

If \`true\`, once an element is in view, useInView will stop observing the element and always return \`true\`.

\`\`\`
const isInView = useInView(ref, { once: true })
\`\`\`

### \`initial\`

**Default:** \`false\`

Set an initial value to return until the element has been measured.

\`\`\`
const isInView = useInView(ref, { initial: true })
\`\`\`

### \`amount\`

**Default:** \`"some"\`

The amount of an element that should enter the viewport to be considered "entered". Either \`"some"\`, \`"all"\` or a number between \`0\` and \`1\`.

## Example`
                }
            ]
        };
    });
    // usePageInView
    server.registerResource("React: usePageInView", docsUri("react", "use-page-in-view"), {
        description: "Track page visibility with Motion for React's usePageInView hook. Improve performance and UX by pausing animations when the document isn't visible. SSR-compatible and simple API.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-page-in-view");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# usePageInView

\`usePageInView\` is a tiny utility hook for tracking page/document visibility. This is useful for improving performance by pausing animations, video playback, or other activity when the user navigates to another tab, and resuming on return.

This saves CPU cycles, improves battery life, and helps ensure a smooth user experience.

## Usage

Import from \`"motion/react"\`:

\`\`\`
import { usePageInView } from "motion/react"
\`\`\`

\`usePageInView\` returns \`true\` when the current page is the user's active tab, and defaults to \`true\` on the server and initial client render before a measurement can be made.

\`\`\`
const isPageInView = usePageInView()
\`\`\`

This state can be used to pause animations or videos when the page is hidden:

\`\`\`
const videoRef = useRef(null)
const isInView = usePageInView()

useEffect(() => {
  const videoElement = videoRef.current
  if (!videoElement) return

  if (isInView) {
    videoElement.play()
  } else {
    videoElement.pause()
  }
}, [isInView])
\`\`\`

Or starting/stopping animation loops created with \`[useAnimationFrame](/docs/react-use-animation-frame.md)\`.

\`\`\`
useAnimationFrame(isPageInView ? update : undefined)
\`\`\``
                }
            ]
        };
    });
    // useReducedMotion
    server.registerResource("React: useReducedMotion", docsUri("react", "use-reduced-motion"), {
        description: "Learn to use Motion for React's useReducedMotion hook to detect reduced motion settings. Create accessible UIs by adapting animations and motion features.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "use-reduced-motion");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# useReducedMotion

A hook that returns \`true\` if the current device has Reduced Motion setting enabled.

\`\`\`
const shouldReduceMotion = useReducedMotion()
\`\`\`

This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing potentially motion-sickness inducing \`x\`/\`y\` animations with \`opacity\`, disabling the autoplay of background videos, or turning off parallax motion.

It will actively respond to changes and re-render your components with the latest setting.

\`\`\`
export function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()
  const closedX = shouldReduceMotion ? 0 : "-100%"

  return (
    <motion.div animate={{
      opacity: isOpen ? 1 : 0,
      x: isOpen ? 0 : closedX
    }} />
  )
}
\`\`\`

## Usage

Import \`useReducedMotion\` from Motion:

\`\`\`
import { useReducedMotion } from "motion/react"
\`\`\`

In any component, call \`useReducedMotion\` to check whether the device's Reduced Motion setting is enabled.

\`\`\`
const prefersReducedMotion = useReducedMotion()
\`\`\`

You can then use this \`true\`/\`false\` value to change your application logic.`
                }
            ]
        };
    });
    // Accessibility
    server.registerResource("React: Accessibility", docsUri("react", "accessibility"), {
        description: "Learn how to create accessible animations with Motion for React by respecting users' 'Reduced Motion' preferences. Discover the reducedMotion option for site-wide settings and the useReducedMotion hook for custom solutions like replacing transforms with opacity, disabling autoplaying videos, and parallax effects.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "accessibility");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Accessibility

Animations can have serious usability implications, even inducing motion sickness in some people.

All modern operating systems provide a setting called "Reduced Motion", where people can indicate they prefer less physical motion, either because of personal preference or because they can suffer from motion sickness.

There are already some excellent guides about _why_ and _how_ we should design accessible animations, like those at [A List Apart](http://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) and [Smashing Magazine](https://www.smashingmagazine.com/2018/04/designing-accessibility-inclusion/). The main takeaways are that for users with "Reduced Motion" enabled, we should keep educational transitions but be aware of motion sickness.

That means replacing transform animations on large elements with opacity transitions, disabling auto-playing videos, and disabling parallax animations.

Motion for React provides APIs that make it simple to respect these people's preferences. In this guide, we'll learn how to use the \`reducedMotion\` option and \`useReducedMotion\` hook to make our animations accessible.

## Automatic

The \`[reducedMotion](/docs/react-motion-config.md)\` option can be set on \`MotionConfig\` to define how you want to adhere to the Reduced Motion setting.

By setting \`reducedMotion\` it to \`"user"\`, all \`motion\` components will **automatically** disable transform and [layout animations](/docs/react-layout-animations.md), while preserving the animation of other values like \`opacity\` and \`backgroundColor\`.

\`\`\`
import { MotionConfig } from "framer-motion"

export function App({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
\`\`\`

[Framer](https://framer.com), the no-code site builder, uses this API and exposes it via a setting in \`Site Settings > Accessibility\`.

Additionally, you can allow a user to override Reduced Motion for just your site by setting reducedMotion to \`"always"\` or \`"never"\` based on their profile.

\`\`\`
<MotionConfig reducedMotion={userSetting}>
\`\`\`

## Manual

While \`reducedMotion\` is a great blanket tool for ensuring accessible animations across your whole site, more bespoke solutions can be created with [the](/docs/react-use-reduced-motion.md) \`[useReducedMotion](/docs/react-use-reduced-motion.md)\` [hook](/docs/react-use-reduced-motion.md).

This hook returns \`true\`/\`false\` depending on whether your visitor has Reduced Motion enabled.

\`\`\`
import { useReducedMotion } from "framer-motion"

// In your componentconst
shouldReduceMotion = useReducedMotion()
\`\`\`

We can use this boolean to fix some of the common accessibility problems, like the following.

### Replace \`transform\` with \`opacity\`

When Reduced Motion is enabled on iOS, the operating system still animates between states to help users transition between each context. But instead of the default scale and x/y animations, it fades content in and out.

We can achieve this in Motion by passing different values to \`animate\` based on whether \`useReducedMotion\` returns \`true\` or not.

\`\`\`
function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()
  let animate

  if (isOpen) {
    animate = shouldReduceMotion ? { opacity: 1 } : { x: 0 }
  } else {
    animate = shouldReduceMotion
      ? { opacity: 0 }
      : { x: "-100%" }
  }

  return <motion.div animate={animate} />
}
\`\`\`

### Disable auto-playing video

\`useReducedMotion\` isn’t only compatible with the Motion. It returns a simple boolean, so you can use it for any purpose, like disabling the autoplay of a background \`video\` element:

\`\`\`
function BackgroundVideo() {
  const shouldReduceMotion = useReducedMotion()

  return <video autoplay={!shouldReduceMotion} />
}
\`\`\`

### Disable parallax

Parallax animations can be very unpleasant for people pre-disposed to motion sickness.

To build parallax, we usually get \`scrollY\` from \`useViewportScroll\`, and create a new \`MotionValue\` via passing that to \`useTransform\` which will update's a \`motion\` component's \`y\` position as the scroll value changes.

To disable this for reduced motion devices, we can conditionally pass this \`MotionValue\` to the animating element.

\`\`\`
function Parallax() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 1], [0, -0.2], {
    clamp: false,
  })

  return (
    <motion.div style={{ y: shouldReduceMotion ? 0 : y }} />
  )
}
\`\`\`

## Conclusion

We've learned to respect people's Reduced Motion setting with Motion for React. The \`reducedMotion\` option makes it simple to implement across a whole site, while \`useReducedMotion\` can help us create bespoke accessibility strategies with any React API.`
                }
            ]
        };
    });
    // Reduce bundle size
    server.registerResource("React: Reduce bundle size", docsUri("react", "reduce-bundle-size"), {
        description: "Learn how to optimize your Motion for React bundle size for faster loading web experiences. This guide explains tree shaking, the benefits of useAnimate mini (2.3kb), and how to significantly reduce the motion component's size to under 4.6kb using m and LazyMotion with lazy-loaded features.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "reduce-bundle-size");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Reduce bundle size

A great web experience doesn't just look and move beautifully, it should load quickly, too.

When measuring the gzipped and minified size of Motion for React using a bundle analysis website like [Bundlephobia](https://bundlephobia.com/package/framer-motion@7.2.0), you might see big numbers like **50kb** or more!

This is misleading. Motion for React exports many functions, most of which you won't import. JavaScript bundlers like [Rollup](https://rollupjs.org/) and [Webpack](https://webpack.js.org/) are capable of "tree shaking", which means that only the code you import is shipped to consumers.

You may only use a tiny, single hook from Motion for React, like \`useReducedMotion\`. So in that case the size would be closer to **1kb**.

However, Motion for React's primary animation APIs are \`useAnimate\` and \`motion\`. Most developers will choose to use at least one of these when using Motion, so let's see how to make them as small as possible.

## \`useAnimate\`

\`[useAnimate](/docs/react-use-animate.md)\` is Motion for React's animation function, used for manually triggering and controlling animations.

It comes in two sizes, **mini** (2.3kb) and **hybrid** (17kb).

The mini version exclusively uses WAAPI for hardware accelerated animations, whereas the hybrid function can also animate sequences, motion values, independent transforms and a whole lot more.

At 2.3kb, \`useAnimate\` mini is the smallest animation library available for React.

## \`motion\`

The \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md) is Motion for React's most common animation API.

Because of its declarative, props-driven API, it's impossible for bundlers to tree shake it any smaller than **34kb**.

However, by using [the](/docs/react-lazy-motion.md) \`[m](/docs/react-lazy-motion.md)\` [and](/docs/react-lazy-motion.md) \`[LazyMotion](/docs/react-lazy-motion.md)\` [components](/docs/react-lazy-motion.md), you can bring this down significantly, to just under **4.6kb** for the initial render.

Then, with lazy-loading, you can defer the loading of animations and interactions until after your site has rendered.

### Reduce size

Instead of importing \`motion\`, import the slimmer \`m\` component.

\`\`\`
import * as m from "motion/react-m"
\`\`\`

\`m\` is used in the exact same way as \`motion\`, but unlike \`motion\`, the \`m\` component doesn't come preloaded with features like animations, [layout animations](/docs/react-layout-animations.md), or the drag gesture.

Instead, we load these in manually via the \`LazyMotion\` component. This lets you choose which features you load in, and whether you load them as part of the main bundle, or lazy load them.

\`\`\`
import { LazyMotion, domAnimation } from "motion/react"

// Load only the domAnimation package
function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
\`\`\`

### Available features

There are currently two **feature packages** you can load:

*   \`domAnimation\`: This provides support for animations, variants, exit animations, and tap/hover/focus gestures. (**+15kb**)
    
*   \`domMax\`: This provides support for all of the above, plus pan/drag gestures and layout animations. (**+25kb**)
    

In the future it might be possible to offer more granular feature packages, but for now these were chosen to reduce the amount of duplication between features, which could result in much more data being downloaded ultimately.

### Synchronous loading

By passing one of these feature packages to \`LazyMotion\`, they'll be bundled into your main JavaScript bundle.

\`\`\`
import { LazyMotion, domAnimation } from "motion/react"

function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
\`\`\`

### Lazy loading

If you're using a bundler like Webpack or Rollup, we can pass a dynamic import function to \`features\` that will fetch features only after we've performed our initial render.

First, create a file that exports only the features you want to load.

\`\`\`
// features.js
import { domMax } from "motion/react"
export default domMax
\`\`\`

Then, pass \`features\` a function that will dynamically load that file.

\`\`\`
import { LazyMotion } from "motion/react"
import * as m from "motion/react-m"

// Make sure to return the specific export containing the feature bundle.
const loadFeatures = () =>
  import("./features.js").then(res => res.default)

// This animation will run when loadFeatures resolves.
function App() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </LazyMotion>
  )
}
\`\`\`

### Strict mode

Because the normal \`motion\` component still preloads all of its functionality, including it anywhere will break the benefits of using \`LazyMotion\`.

To help prevent this, the \`strict\` prop can be set on \`LazyMotion\`. If a \`motion\` component is loaded anywhere within, it will throw with a reminder to render the \`m\` component instead.

\`\`\`
function App() {
  // This will throw!
  return (
    <LazyMotion strict>
      <motion.div />
    </LazyMotion>
  )
}
\`\`\``
                }
            ]
        };
    });
    // Motion Courses for React
    server.registerResource("React: Motion Courses for React", docsUri("react", "courses"), {
        description: "Master high-performance animations. Browse Motion Certified courses for advanced theory and best practices, or explore community-led resources perfect for beginners learning Motion for React.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "courses");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion Courses for React

Motion for React is supported by the world's best educators. Whether you are looking for a deep dive into advanced theory or a hands-on beginner guide, we have curated a selection of courses to match your journey.

## Motion Certified

Motion Certified courses are officially recognised for their exceptional quality, deep integration with Motion best practices, and advanced production value.

## Community

Courses from across the Motion ecosystem, offering unique teaching styles, and beginner-friendly introductions.`
                }
            ]
        };
    });
    // Motion x Framer integration guide
    server.registerResource("React: Motion x Framer integration guide", docsUri("react", "framer"), {
        description: "Add animations to your Framer project with Motion. Use Motion in Code Components and Overrides.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "framer");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Motion x Framer integration guide

[Framer](https://framer.link/pgsExYX) is the world's best no-code website builder. If you have a Framer website, all your animations are already powered by Motion.

Framer offers a number of [animations, interactions and components](https://framer.link/bdH9gwO) that mean you usually never need to write any code to achieve amazing effects.

However, advanced users can write [code components](https://framer.link/MXPS0dB) and [overrides](https://framer.link/bdhlZ3f), which are custom React components that you can drop into your canvas.

The full Motion for React API is available to use in both.

## Import

Import Motion for React via \`"framer-motion"\`:

\`\`\`
import { motion, useSpring } from "framer-motion"
\`\`\`

Use \`"framer-motion"\` whenever the Motion docs instruct you to use \`"motion/react"\`.

## Overrides

Components returned by overrides support the full \`[motion](/docs/react-motion-component.md)\` [component API](/docs/react-motion-component.md). This means you can pass props like \`animate\`, \`transition\`, \`whileHover\` etc:

\`\`\`
export function withRotateAnimation(Component): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                animate={{ rotate: 90 }}
                transition={{ duration: 2 }}
                style={{ ...props.style, x: 100 }}
            />
        )
    })
}
\`\`\`

## Next

With Motion set up in your Framer project, we recommend you follow the rest of the [Quick Start](/docs/react.md) guide to begin learning Motion for React.`
                }
            ]
        };
    });
    // Animate your Figma projects with Motion
    server.registerResource("React: Animate your Figma projects with Motion", docsUri("react", "figma"), {
        description: "Animate your Figma Site with Motion. Add no-code animations with Interactions, and generate Motion code with Figma Make.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "figma");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Animate your Figma projects with Motion

Figma offers powerful [site-building](https://www.figma.com/sites/) and [code generation](https://www.figma.com/make/) features. Motion is available to use in both.

When adding effects via the Figma Sites Interactions menu, you're generating Motion animations with no-code!

![Screenshot of Figma Sites interface, highlighting Hover effect](https://framerusercontent.com/images/r6kq04Sawfi36eiGmq1gAZS3134.png)

In upcoming versions of Figma, it'll be possible to generate and write your own Motion code into your Figma site.

For now, you can already add Motion code via the [Figma Make](https://www.figma.com/make/) beta.

## Figma Make

Figma Make is an AI code generator that can generate React code from text, image, and Figma artboard prompts.

In general, it will produce Motion code simply by asking it to animate something. For instance, you can give it a screenshot of the [Motion homepage](/) and tell it to animate:

![](https://framerusercontent.com/images/I9UrB7u2e1BkL2tS96LYDd7ms.png)

This will produce a code file with Motion already imported:

\`\`\`
<motion.div
  className={className}
  variants={container}
  initial="hidden"
  animate="visible"
>
  {words.map((word, index) => (
    <motion.span
      key={index}
      variants={child}
      style={{ display: "inline-block", marginRight: "0.25em" }}
    >
      {word}
    </motion.span>
  ))}
</motion.div>
\`\`\`

If your generated Make project doesn't include a \`motion\` import then you can either ask the AI to add it for you, or simply add an import to the top of your component:

\`\`\`
import { motion } from "motion/react"
\`\`\`

### Imports

As with many AI generators, Figma Make has the tendency to import Motion via \`"framer-motion"\`. This is okay! This import will work for many versions to come.

However, you can also change this manually to \`"motion/react"\` and your project will continue to work the same.

## Next

With Motion set up in your Figma project, we recommend you follow the rest of the [Quick Start](/docs/react.md) guide to begin learning Motion for React.`
                }
            ]
        };
    });
    // Animating with Tailwind CSS
    server.registerResource("React: Animating with Tailwind CSS", docsUri("react", "tailwind"), {
        description: "Unlock powerful UI animations by combining Motion with Tailwind CSS. This guide covers practical tricks for animating utility classes, generating CSS springs and more.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "tailwind");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Animating with Tailwind CSS

Motion is the perfect animation companion for [Tailwind CSS](https://tailwindcss.com) v4. In this guide, we'll learn how to:

*   **Perform basic animations** with the two libraries.
    
*   **Create responsive animations** by animating CSS variables.
    
*   **Generate Tailwind CSS spring animations** directly in your code editor using Motion for AI.
    

## Basic animations

The key to using Motion with Tailwind CSS is to let each library do what it does best.

*   **Tailwind CSS**'s utility classes for static and responsive styling.
    
*   **Motion**'s animation props like \`animate\` and \`layout\` for animation.
    

Motion animates by applying inline styles, or via native browser animations - both of which override Tailwind CSS classes. This separation is partly why the two work so well together.

Here's a basic example of a button with a hover effect. Tailwind styles the button, while Motion handles the interactivity.

\`\`\`
import { motion } from "motion/react";

function Button() {
  return (
    <motion.button
      className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Click Me!
    </motion.button>
  );
}
\`\`\`

## Responsive animations

It's possible to make an animation responsive to screen size by combining Tailwind CSS's ability to set responsive CSS variables together with Motion's ability to animate those variables.

To start, we can define our initial values like so:

\`\`\`
<motion.div
  className="
    p-8 bg-rose-500 text-white rounded-xl shadow-lg max-w-md mx-auto
    
    /* Define the CSS variable inline, with responsive values */
    [--entry-distance-y:20px] 
    md:[--entry-distance-y:50px]
  "
  initial={{ opacity: 0, y: "var(--entry-distance-y)" }}
\`\`\`

Here, on medium screens and above, the initial \`y\` value will be \`50px\`, whereas on smaller screens it'll be \`20px\`.

Then, we can set \`animate\` to animate \`y\` to \`0\` from this responsive start value.

\`\`\`
animate={{ opacity: 1, y: 0 }}
\`\`\`

It's possible to animate **to** and/or **from** a CSS variable, so it's equally possible to animate to a responsive value, or between responsive values.

## Generate CSS springs

CSS is capable of performing spring animations using the \`[linear()](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear)\` [easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear), so you can perform simple spring animations without including Motion in your bundle. The downside of \`linear()\` is its obscure syntax that makes it impossible to write or edit without a generator of some kind.

With Motion for AI, it's possible to [generate CSS springs](/docs/studio-generate-css.md) directly in your AI code editor. We can make these CSS springs reusable with Tailwind utility classes.

Once installed, we can use a prompt like "make a tailwind theme to generate a css spring utility class". You can ask for a specific spring, like a "slightly bouncy spring", or otherwise it'll default to a small selection of different-feeling springs:

\`\`\`
@theme {
  --ease-spring-snappy: linear(0, 0.2375, 0.5904, 0.8358, 0.9599, 1.0061, 1.0152, 1.0116, 1.0062, 1.0025, 1.0006, 0.9999, 1);
  --ease-spring: linear(0, 0.0942, 0.2989, 0.5275, 0.73, 0.8839, 0.9858, 1.0425, 1.0655, 1.0666, 1.0558, 1.0405, 1.0255, 1.0131, 1.0043, 0.9989, 0.9962, 1);
  --ease-spring-soft: linear(0, 0.0332, 0.1241, 0.2583, 0.4207, 0.5967, 0.7729, 0.9379, 1.0826, 1.2006, 1.2883, 1.3445, 1.3701, 1.3679, 1.3423, 1.2983, 1.2415, 1.1774, 1.1113, 1.0477, 0.9904, 0.9421, 0.9047, 0.8789, 0.8648, 0.8615, 0.8677, 0.8815, 0.9009, 0.9239, 0.9485, 0.9727, 0.9952, 1.0146, 1.0303, 1.0417, 1.0487, 1.0515, 1.0506, 1.0465, 1.0401, 1.032, 1.023, 1.0138, 1.0051, 0.9974, 0.9909, 0.986, 0.9828, 0.9811, 0.9809, 0.9819, 0.984, 0.9868, 0.99, 0.9935, 0.9968, 0.9998, 1.0025, 1.0045, 1.006, 1.0069, 1.0072, 1.0069, 1.0063, 1.0054, 1.0042, 1.003, 1.0017, 1.0005, 0.9995, 0.9986, 0.998, 0.9976, 1);
}
\`\`\`

This new spring easings can now be used via utility classes:

\`\`\`
<div className="transition-transform duration-700 ease-spring-soft">
\`\`\`

## Troubleshooting

### My animation is moving weirdly

If you find that an Motion x Tailwind CSS animation is stuttery, or moving weirdly in some way, usually there's a conflict between the Motion animation and a pre-existing Tailwind transition class.

To fix, ensure that the element has no \`transition-\` class applied, for instance \`transition-all\` etc.`
                }
            ]
        };
    });
    // Base UI & Motion
    server.registerResource("React: Base UI & Motion", docsUri("react", "base-ui"), {
        description: "Learn how to integrate Motion with Base UI React components. This guide covers using motion components with Base UI primitives, implementing exit animations with AnimatePresence, and managing layout animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "base-ui");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Base UI & Motion

[Base UI](https://base-ui.com/) is a component library for React that's rapidly growing in popularity. It's possible to animate almost all Base UI components with Motion, and in this guide we'll explore how.

## Setup \`motion\` components

By default, Base UI components render and control their own DOM elements. However most components provide [the](https://base-ui.com/react/handbook/composition#composing-custom-react-components) \`[render](https://base-ui.com/react/handbook/composition#composing-custom-react-components)\` [prop](https://base-ui.com/react/handbook/composition#composing-custom-react-components) that allows you to switch this out for a \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md).

\`\`\`
import { Menu } from "@base-ui-components/react/menu"
import { motion } from "motion/react"

function Component() {
  return (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whilePress={{ scale: 0.9 }}
      />
    } />
  )
}
\`\`\`

## Exit animations

In most situations, you can animate Base UI components as they leave the DOM using \`[AnimatePresence](/docs/react-animate-presence.md)\` and the \`exit\` prop, as usual:

\`\`\`
<AnimatePresence>
  {open && (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    } />
  )}
</AnimatePresence>
\`\`\`

However, some Base UI components like \`ContextMenu\` and \`Popover\` control this conditional rendering themselves. To add exit animations to these components, we must:

*   Hoist their \`open\` state
    
*   Add \`keepMounted\` to their \`Portal\` component
    
*   Conditionally render the \`Portal\` component with \`AnimatePresence\`
    

A component's \`open\` state can be hoisted by defining it manually with \`useState\`:

\`\`\`
const [open, setOpen] = useState(false)

return (
  <ContextMenu.Root open={open} onOpenChange={setOpen}>
\`\`\`

Then, conditionally render the \`Portal\` (with a \`keepMounted\` prop) as a child of \`AnimatePresence\`:

\`\`\`
return (
   <ContextMenu.Root open={open} onOpenChange={setOpen}>
    <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
    <AnimatePresence>
      {open && (
        <ContextMenu.Portal keepMounted>
\`\`\`

We can then add an exit animation via a \`motion\` component rendered via a \`render\` prop:

\`\`\`
function App() {
  const [open, setOpen] = useState(false)
  
  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.9)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.9)" }}
                  />
                }
              >
                {/* Children */}
              </ContextMenu.Popup>
\`\`\`

## Examples

[Motion+](https://motion.dev/plus) unlocks the source code to the full vault of Motion examples. It's a one-time payment, lifetime update membership that also unlocks a creative animation library containing components like \`[Cursor](/docs/cursor.md)\` and \`[AnimateNumber](/docs/react-animate-number.md)\`.

Check out all the [Motion x Base UI examples](https://motion.dev/examples?platform=react#base).

Motion+ also includes a custom LLM ruleset for Motion x Base UI to improve the way your AI editor will integrate the two libraries.`
                }
            ]
        };
    });
    // Radix UI & Motion
    server.registerResource("React: Radix UI & Motion", docsUri("react", "radix"), {
        description: "Learn how to add smooth animations to Radix UI with Motion for React. Exit, layout, and transition examples for Tooltips, Dialogs, and more.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "radix");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Radix UI & Motion

[Radix](https://www.radix-ui.com/primitives) is one of the most popular component libraries for React, with pre-built, accessible components for common UI patterns like Accordion, Switch etc.

It doesn't come with animations out of the box, but in this guide we'll show how to integrate Motion for React with Radix UI to add a layer of polish to these components.

In this guide, we'll learn how to use \`[motion](/docs/react-motion-component.md)\` [components](/docs/react-motion-component.md) with Radix primitives, as well as specific setups for exit and layout animations.

## Setup \`motion\` components with Radix

Most Radix components render and control their own DOM elements. But they also provide [the](https://www.radix-ui.com/primitives/docs/guides/composition) \`[asChild](https://www.radix-ui.com/primitives/docs/guides/composition)\` [prop](https://www.radix-ui.com/primitives/docs/guides/composition) that, when set to \`true\`, will make the component use the first provided child as its DOM node instead.

By passing a \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md) as this child, we can now use all of its animation props as normal:

\`\`\`
<Toast.Root asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    layout
\`\`\`

## Add exit animations to Radix

Many Radix components, like [Toast](https://www.radix-ui.com/primitives/docs/components/toast) or [Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip), would be perfect for exit animations, but can't perform them without Motion's \`[AnimatePresence](/docs/react-animate-presence.md)\`.

\`AnimatePresence\` works by mounting and unmounting its children. This is how it tracks which components are exiting:

\`\`\`
<AnimatePresence>
  {isOpen && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
\`\`\`

By default Radix tends to control state like this \`isOpen\` internally. However, it provides some helper props for us to track or control this state externally.

For instance, the Tooltip component provides the \`open\` and \`onOpenChange\` props, which makes it easy to track the tooltip state:

\`\`\`
const [isOpen, setOpen] = useState(false)

return (
  <Tooltip.Provider>
    <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
\`\`\`

Now we can use this state to conditionally render the tooltip contents.

\`\`\`
<AnimatePresence>
  {isOpen && (
    <Tooltip.Portal forceMount>
      <Tooltip.Content asChild>
        <motion.div
            exit={{ opacity: 0 }}
\`\`\`

You can see in the above example we use the \`forceMount\` prop on the \`Tooltip.Portal\` component. Because Radix expects all its children to be rendered at all times, when we're conditionally rendering children like this, setting \`forceMount\` to \`true\` allows our enter/exit animations to work correctly.

## Create layout animations with Radix

[Layout animations](/docs/react-layout-animations.md) also require this same pattern of hoisting state out of the component.

\`\`\`
const [tab, setTab] = useState("account")

return (
  <Tabs.Root value={tab} onValueChange={setTab} asChild>
    <motion.div layout>
\`\`\`

This is to ensure \`motion\` components know to perform layout animations when the state changes. You can even pass this state to \`layoutDependency\` for better performance.

\`\`\`
<motion.div layout layoutDependency={tab}>
\`\`\`

## Radix x Motion examples

[Motion+](https://motion.dev/plus) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [Motion examples](https://motion.dev/examples), as well as premium components like \`[Cursor](/docs/cursor.md)\` and \`[AnimateNumber](/docs/react-animate-number.md)\`.

Check out all the [Motion x Radix examples](https://motion.dev/examples?platform=react#radix).`
                }
            ]
        };
    });
    // Get started with Motion
    server.registerResource("JavaScript: Get started with Motion", docsUri("js", "quick-start"), {
        description: "Learn Motion animation library: Install, animate HTML/SVG/WebGL elements with spring animations, staggering effects. Complete guide with examples.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "quick-start");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Get started with Motion

Motion is an animation library that's easy to start and fun to master.

Its unique hybrid engine combines the performance of the browser with the limitless potential of a JavaScript engine. This means you can animate anything, like:

*   **HTML/CSS**
    
*   **SVG** (like path drawing animations)
    
*   **WebGL** (3D graphics)
    

The best part? It's also tiny, with a mini HTML/SVG version of the \`animate()\` function that's just 2.3kb!

By the end of this quick guide, you'll have installed Motion and made your first animation.

## Install

You can install Motion in two ways:

1.  A package manager like npm or Yarn (**most popular)**
    
2.  HTML \`script\` tag
    

### Package manager

Motion can be installed via the \`"motion"\` package.

\`\`\`
npm install motion
\`\`\`

Then imported in your JavaScript:

\`\`\`
import { animate, scroll } from "motion"
\`\`\`

### \`script\` tag

It's possible to import Motion directly using a \`script\` tag. This is perfect if you're working with a basic HTML page, or using a no-code tool like Webflow.

Import using the modern \`import\` syntax:

\`\`\`
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"
</script>
\`\`\`

Or you can add \`Motion\` as a global variable using the legacy include:

\`\`\`
<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
<script>
  const { animate, scroll } = Motion
</script>
\`\`\`

### Create an animation

The "Hello world!" of any animation library is a simple transform animation.

Let's start by importing the \`[animate](/docs/animate.md)\` [function](/docs/animate.md).

\`\`\`
import { animate } from "motion"
\`\`\`

\`animate\` can animate one or more elements. You can either use a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll#obtaining_a_list_of_matches) (like \`".my-class"\`) or provide the elements directly:

\`\`\`
// CSS selector
animate(".box", { rotate: 360 })

// Elements
const boxes = document.querySelectorAll(".box")

animate(boxes, { rotate: 360 })
\`\`\`

You can see here we're setting \`rotate\` to \`360\`. This will rotate the element 360 degrees:

## What can be animated?

Motion lets you animate anything:

*   **CSS properties** (like \`opacity\`, \`transform\` and \`filter\`)
    
*   **SVG attributes and paths**
    
*   **Independent transforms** (\`x\`, \`rotateY\` etc)
    
*   **JavaScript objects** (containing strings/colors/numbers)
    

With Motion, you don't have to worry about achieving the best performance available. When a value can be hardware accelerated, like \`opacity\`, \`filter\` or \`transform\`, it will be.

\`animate\` isn't limited to HTML. It can animate single values or any kind of object. For example, the rotation of a Three.js object:

\`\`\`
animate(
  cube.rotation,
  { y: rad(360), z: rad(360) },
  { duration: 10, repeat: Infinity, ease: "linear" }
)
\`\`\`

## Customising animations

Motion comes with smart defaults, so your animations should look and feel great out of the box. But you can further tweak options like:

*   **Duration** (how long the animation lasts)
    
*   **Delay** (how long it waits before starting)
    
*   **Easing** (how it speeds up and slows down)
    
*   **Repeat** (how it repeats, how many times, etc)
    

\`\`\`
animate(
  element,
  { scale: [0.4, 1] },
  { ease: "circInOut", duration: 1.2 }
);
\`\`\`

Motion also has amazing [spring animations](/docs/spring.md) for natural, kinetic animations:

\`\`\`
animate(
  element,
  { rotate: 90 },
  { type: "spring", stiffness: 300 }
);
\`\`\`

## Stagger animations

When animating multiple elements, it can feel more natural or lively to offset the animations of each. This is called **staggering**.

Motion provides a \`stagger\` function that can be used to dynamically set \`delay\`:

\`\`\`
import { animate, stagger } from "motion"

animate(
  "li",
  { y: 0, opacity: 1 },
  { delay: stagger(0.1) }
)
\`\`\`

## Development tools

[Motion Studio](https://motion.dev/studio) provides visual editing and AI tools to enhance your animation development workflow, like inline bezier editing, CSS spring generation and more.

### What's next?

You've just learned the basics of Motion and created a simple animation. But there's so much more to discover, like:

*   [**Keyframes and sequences**](/docs/animate.md): Create more complex animations
    
*   [**Controls**](/docs/animate.md): Pause, resume or change animations
    
*   [**Scroll-linked animations**](/docs/scroll.md)**:** Link values to scroll position
    
*   [**Scroll-triggered animations**](/docs/inview.md): Trigger animations when elements enter the viewport
    

Or you can dive straight into our [examples](https://motion.dev/examples?platform=js), which include copy & paste source code to add straight to your project.`
                }
            ]
        };
    });
    // animate
    server.registerResource("JavaScript: animate", docsUri("js", "animate"), {
        description: "Explore Motion's powerful animate() function for creating and controlling animations. Animate HTML, SVG, CSS variables, and SVG paths with mini (2.3kb) or hybrid (18kb) versions. Utilize tween, spring, or inertia animations, build complex sequences, and take advantage of comprehensive playback controls.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "animate");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# animate

The \`animate()\` function is a powerful tool for creating and controlling animations.

\`\`\`
animate("li", { opacity: 0 })
\`\`\`

It comes in two sizes, **mini (2.3kb)** and **hybrid (18kb)**.

The **mini** version can animate HTML and SVG styles using native browser APIs for incredible performance.

The **hybrid** version can additionally animate:

*   Independent transforms (\`x\`/\`y\`/\`rotateZ\` etc)
    
*   More styles, like \`mask-image\` and gradients
    
*   CSS variables
    
*   SVG paths
    
*   Animation sequences
    
*   Colors/strings/numbers
    
*   JavaScript objects and WebGL
    

## Usage

\`animate\` can be imported from the \`"motion"\` package:

\`\`\`
// Hybrid
import { animate } from "motion"

// Mini
import { animate } from "motion/mini"
\`\`\`

### HTML & SVG

Both versions of \`animate\` are capable of animating HTML and SVG styles either by passing elements directly, or via CSS selectors.

\`\`\`
// Element(s)
const box = document.getElementById("box")

animate(box, { opacity: 0 }, { duration: 0.5 })

// CSS selectors
animate("div", { opacity: 0 }, { duration: 0.5 })
\`\`\`

### Transforms

The **hybrid** version of \`animate\` can animate every transform axis independently:

*   Translate: \`x\`, \`y\`, \`z\`
    
*   Scale: \`scale\`, \`scaleX\`, \`scaleY\`
    
*   Rotate: \`rotate\`, \`rotateX\`, \`rotateY\`, \`rotateZ\`
    
*   Skew: \`skew\`, \`skewX\`, \`skewY\`
    
*   Perspective: \`transformPerspective\`
    

\`\`\`
animate("div", { rotate: 360 })
\`\`\`

### CSS variables

H**ybrid** \`animate\` can animate CSS variables in every browser:

\`\`\`
animate(element, { "--rotate": "360deg" })
\`\`\`

**Mini** \`animate\` can only animate [registered CSS properties](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static) in modern browsers.

### SVG paths

The **hybrid** \`animate\` function can perform line drawing animations with most SVG elements using three special properties: \`pathLength\`, \`pathSpacing\` and \`pathOffset\`.

\`\`\`
animate("circle", { pathLength: [0, 1] })
\`\`\`

All three are set as a progress value between \`0\` and \`1\`, \`1\` representing the total length of the path.

Path animations are compatible with \`circle\`, \`ellipse\`, \`line\`, \`path\`, \`polygon\`, \`polyline\` and \`rect\` elements.

### Single values

By passing a \`to\` and \`from\` value, the hybrid \`animate\` will output the latest values to the provided \`onUpdate\` callback.

\`\`\`
// Numbers
animate(0, 100, {
  onUpdate: latest => console.log(latest)
})

// Colors
animate("#fff", "#000", {
  duration: 2
  onUpdate: latest => console.log(latest)
})
\`\`\`

### Motion values

By passing hybrid \`animate\` a [React motion value](/docs/react-motion-value.md), it'll be automatically updated with the latest values.

\`\`\`
const x = motionValue(0)

animate(x, 200, { duration: 0.5 })
\`\`\`

### Objects

Objects can be animated much in the same way as HTML & SVG elements.

\`\`\`
const values = {
  x: 100,
  color: "#f00"
}

animate(values, { x: 200, color: "#00f" })
\`\`\`

Any object can be animated, for instance an \`Object3D\` from [Three.js](https://threejs.org):

\`\`\`
const camera = new THREE.Camera()

animate(camera.rotation, { y: 360 }, { duration: 10 })
\`\`\`

### Timeline sequences

The **hybrid** \`animate\` function can also accept complex animation sequences.

\`\`\`
const sequence = []

animate(sequence)
\`\`\`

A **sequence** is an array of \`animate\` definitions:

\`\`\`
const sequence = [
  ["ul", { opacity: 1 }, { duration: 0.5 }],
  ["li", 100, { ease: "easeInOut" }]
]
\`\`\`

Each definition will, by default, play one after the other.

It's possible to change when a segment will play by passing [an](https://motion.dev/docs/animate#at) \`[at](https://motion.dev/docs/animate#at)\` [option](https://motion.dev/docs/animate#at), which can be either an absolute time, relative time, or label.

\`\`\`
const sequence = [
  ["ul", { opacity: 1 }],
  ["li", { x: [-100, 0] }, { at: 1 }]
]
\`\`\`

Each segment can accept all \`animate\` [options](https://motion.dev/docs/animate#options) (except \`repeatDelay\` and \`repeatType\`) to control the duration and other animation settings of that segment.

\`\`\`
const sequence = [
  ["ul", { opacity: 1 }, { duration: 1 }]
]
\`\`\`

Both \`type: "keyframes"\` and \`type: "spring"\` transitions are supported.

It's also possible to override transitions for each value individually.

\`\`\`
const sequence = [
  [
    "ul",
    { opacity: 1, x: 100 },
    { duration: 1, x: { duration: 2 }}
   ]
]
\`\`\`

Sequence durations are automatically calculated, but it's also possible to pass any \`animate\` [option](#options) to change playback as a whole:

\`\`\`
animate(sequence, { duration: 10, repeat: 2 })
\`\`\`

You can also define default transition settings to be passed to all items in the sequence with the \`defaultTransition\` option:

\`\`\`
animate(sequence, {
  defaultTransition: { duration: 0.2 }
})
\`\`\`

Any value supported by \`animate\` can be animated in sequences, mixing HTML & SVGs, motion values and objects in the same animation:

\`\`\`
const color = motionValue("rgba(255, 0, 0, 1)")
const box = new THREE.BoxGeometry()

const sequence = [
  ["li", { x: 100 }],
  [box.position, { y: 10 }],
  [color, "#444"]
]
\`\`\`

### Stagger

When animating more than one element, it's possible to stagger animations by passing the \`[stagger](/docs/stagger.md)\` function to \`delay\`.

\`\`\`
import { stagger, animate } from "motion"

animate(".item", { x: 300 }, { delay: stagger(0.1) })
\`\`\`

## Options

Animations can be configured with transition options. By default, provided options will affect every animating value.

\`\`\`
animate(
  element,
  { x: 100, rotate: 0 },
  { duration: 1 }
)
\`\`\`

By providing named transitions, these can be overridden on a per-value basis:

\`\`\`
animate(
  element,
  { x: 100, rotate: 0 },
  {
    duration: 1,
    rotate: { duration: 0.5, ease: "easeOut" }
  }
)
\`\`\`

### \`type\`

\`type\` decides the type of animation to use.

**Mini** \`animate\` can either animate with the default keyframes animation, or \`spring\`:

\`\`\`
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, stiffness: 300 }
)
\`\`\`

**Hybrid** \`animate\` has all animation types built-in, and can be set to \`"tween"\`, \`"spring"\` or \`"inertia"\`.

**Tween** animations are set with a duration and an easing curve.

**Spring** animations are either physics-based or duration-based.

Physics-based spring animations are set via \`stiffness\`, \`damping\` and \`mass\`, and these incorporate the velocity of any existing gestures or animations for natural feedback.

Duration-based spring animations are set via a \`duration\` and \`bounce\`. These don't incorporate velocity but are easier to understand.

**Inertia** animations decelerate a value based on its initial velocity, usually used to implement inertial scrolling.

\`\`\`
animate("path", { pathLength: 1 }, { duration: 2, type: "tween" })
\`\`\`

### \`duration\`

**Default:** \`0.3\` (or \`0.8\` if multiple keyframes are defined)

The duration of the animation. Can also be used for \`"spring"\` animations when \`bounce\` is also set.

\`\`\`
animate("ul > li", { opacity: 1 }, { duration: 1 })
\`\`\`

### \`ease\`

The easing function to use with tween animations. Accepts:

*   Easing function name. E.g \`"linear"\`
    
*   An array of four numbers to define a cubic bezier curve. E.g \`[.17,.67,.83,.67]\`
    
*   A JavaScript easing function, that accepts and returns a value \`0\`\\-\`1\`.
    

These are the available easing function names:

*   \`"linear"\`
    
*   \`"easeIn"\`, \`"easeOut"\`, \`"easeInOut"\`
    
*   \`"circIn"\`, \`"circOut"\`, \`"circInOut"\`
    
*   \`"backIn"\`, \`"backOut"\`, \`"backInOut"\`
    
*   \`"anticipate"\`
    

When animating keyframes, \`ease\` can optionally be set as an array of easing functions to set different easings between each value:

\`\`\`
animate(
  element,
  { x: [0, 100, 0] },
  { ease: ["easeIn", "easeOut"] }
)
\`\`\`

### \`times\`

When animating multiple keyframes, \`times\` can be used to adjust the position of each keyframe throughout the animation.

Each value in \`times\` is a value between \`0\` and \`1\`, representing the start and end of the animation.

\`\`\`
animate(
  element,
  { x: [0, 100, 0] },
  { times: [0, 0.3, 1] }
)
\`\`\`

There must be the same number of \`times\` as there are keyframes. Defaults to an array of evenly-spread durations.

### \`bounce\`

**Default:** \`0.25\`

\`bounce\` determines the "bounciness" of a spring animation.

\`0\` is no bounce, and \`1\` is extremely bouncy.

\`\`\`
animate(
  "section",
  { rotateX: 90 },
  { type: "spring", bounce: 0.25 }
)
\`\`\`

### \`visualDuration\`

If \`visualDuration\` is set, this will override \`duration\`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

\`\`\`
animate(
  "section",
  { rotateX: 90 },
  { type: "spring", visualDuration: 0.5, bounce: 0.25 }
)
\`\`\`

### \`stiffness\`

**Default:** \`1\`

Stiffness of the spring. Higher values will create more sudden movement.

\`\`\`
animate(
  "section",
  { rotate: 180 },
  { type: "spring", stiffness: 50 }
)
\`\`\`

### \`damping\`

**Default:** \`10\`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

\`\`\`
animate(
  "section",
  { rotate: 180 },
  { type: "spring", damping: 300 }
)
\`\`\`

### \`mass\`

**Default:** \`1\`

Mass of the moving object. Higher values will result in more lethargic movement.

\`\`\`
animate(
  "feTurbulence",
  { baseFrequency: 0.5 },
  { type: "spring", mass: 0.5 }
)
\`\`\`

### \`velocity\`

**Default:** Current value velocity

The initial velocity of the spring.

\`\`\`
animate(
  ".my-element",
  { rotate: 180 },
  { type: "spring", velocity: 2 }
)
\`\`\`

### \`restSpeed\`

**Default:** \`0.1\`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than \`restDelta\`.

\`\`\`
animate(
  ".my-element",
  { rotate: 180 },
  { type: "spring", restSpeed: 2 }
)
\`\`\`

### \`restDelta\`

**Default:** \`0.01\`

End animation if distance is below this value and speed is below \`restSpeed\`. When animation ends, the spring will end.

\`\`\`
animate(
  ".my-element",
  { x: 200 },
  { type: "spring", restDelta: 0.5 }
)
\`\`\`

### \`delay\`

**Default:** \`0\`

Delay the animation by this duration (in seconds).

\`\`\`
animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
\`\`\`

By setting \`delay\` to a negative value, the animation will start that long into the animation. For instance to start 1 second in, \`delay\` can be set to -\`1\`.

### \`repeat\`

**Default:** \`0\`

The number of times to repeat the transition. Set to \`Infinity\` for perpetual animation.

\`\`\`
animate(
  element,
  { backgroundColor: "#fff" },
  { repeat: Infinity, duration: 2 }
)
\`\`\`

### \`repeatType\`

**Default:** \`"loop"\`

How to repeat the animation. This can be either:

*   \`loop\`: Repeats the animation from the start.
    
*   \`reverse\`: Alternates between forward and backwards playback.
    
*   \`mirror\`: Switches animation origin and target on each iteration.
    

\`\`\`
animate(
  element,
  { backgroundColor: "#fff" },
  { repeat: 1, repeatType: "reverse", duration: 2 }
)
\`\`\`

### \`repeatDelay\`

**Default:** \`0\`

When repeating an animation, \`repeatDelay\` will set the duration of the time to wait, in seconds, between each repetition.

\`\`\`
animate(
  element,
  { backgroundColor: "#fff" },
  { repeat: 1, repeatDelay: 1 }
)
\`\`\`

### \`at\`

When defining animations as part of a larger sequence, each definition will start one after the other:

\`\`\`
const sequence = [
  ["ul", { opacity: 1 }],
  // This will start when ul opacity is 1
  ["li", { x: [-100, 0] }]
]
\`\`\`

By passing \`at\`, this behaviour can be changed. \`at\` can change the time to:

*   A specific time
    
*   A labelled time
    
*   The start of the previous animation
    
*   Time relative to start or end of previous animation
    

### Specific time

Set as a number to define a specific time (in seconds):

\`\`\`
const sequence = [
  ["nav", { opacity: 1 }],
  
  // This will start 0.5 from the start of the whole animation:
  ["nav", { x: 100 }, { at: 0.5 }],
]
\`\`\`

#### Labelled time

Set as a label name to start at the same point as the label definition:

\`\`\`
const sequence = [
  ["nav", { x: 100 }, { duration: 1 }],
  
  "my-label", // label definition
  ["li", { opacity: 1 }],
  
  // my-label was defined at 1 second
  ["a", { scale: 1.2 }, { at: "my-label" }],
]
\`\`\`

#### Start of previous animation

Pass \`"<"\` to start at the same time as the previous segment:

\`\`\`
const sequence = [
  ["nav", { x: 100 }, { duration: 1 }],
  
  // This will start at the same time as the x: 100 animation
  ["li", { opacity: 1 }, { at: "<" }],
]
\`\`\`

#### Relative to end of previous animation

Pass a string starting with \`+\` or \`-\` to start relative to the end of the previous animation:

\`\`\`
const sequence = [
  ["nav", { opacity: 1 }, { duration: 1 }],
  
  // 0.5 seconds after the previous animation (1.5 secs):
  ["nav", { x: 100 }, { at: "+0.5" }],
  
  // 0.2 seconds before the end of the previous animation:
  ["nav li", { opacity: 1 }, { at: "-0.2" }],
]
\`\`\`

#### Relative to start of previous animation

Pass a string starting with \`<+\` or \`<-\` to start relative to the start of the previous animation:

\`\`\`
const sequence = [
  ["nav", { opacity: 1 }],
  
  // 0.5 seconds after the start animation (0.5 secs):
  ["nav", { x: 100 }, { at: "<0.5" }],
  
  // 0.2 seconds before the start of the previous animation (0.3 secs):
  ["nav li", { opacity: 1 }, { at: "<-0.2" }],
]
\`\`\`

### \`onUpdate\`

A function that's provided the latest animation values.

\`\`\`
animate("#fff", "#000", {
  duration: 2
  onUpdate: latest => console.log(latest)
})
\`\`\`

## Controls

\`animate()\` returns animation playback controls. These can be used to pause, play, cancel, change playback speed and more.

\`\`\`
const animation = animate(element, { opacity: 1 })

animation.time = 0.5
animation.stop()
\`\`\`

### \`duration\`

Returns the duration of the animation.

This is the duration of a single iteration of the animation, without delay or repeat options. It is **read-only**.

\`\`\`
const animation = animate(element, { opacity: 0 })

const duration = animation.duration
\`\`\`

### \`time\`

Gets and sets the current time of the animation.

\`\`\`
const animation = animate(x, 100, { duration: 1 })

// Set animation time to 0.5 seconds
animation.time = 0.5

// Get animation time
console.log(animation.time) // 0.5
\`\`\`

### \`speed\`

Gets and sets the current playback speed of the animation.

*   \`1\` is normal rate.
    
*   \`0.5\` is half rate.
    
*   \`2\` doubles the playback rate.
    
*   \`-1\` reverses playback.
    

\`\`\`
const animation = animate(element, { opacity: 0 })

const currentSpeed = animation.speed

// Double current speed
animation.speed = currentSpeed * 2
\`\`\`

### \`then()\`

A \`Promise\`\\-like API that resolves when the animation finishes:

\`\`\`
const animation = animate(element, { opacity: 0 })

// Async/await
await animation
console.log("Animation complete")

// Promise
animation.then(() => {
  console.log("Animation complete")
})
\`\`\`

### \`pause()\`

Pauses the animation until resumed with \`play()\`.

\`\`\`
const animation = animate(element, { opacity: 0 })
animation.pause()
\`\`\`

### \`play()\`

Plays an animation.

*   If an animation is **paused**, it will resume from its current \`time\`.
    
*   If an animation has **finished**, it will restart.
    

\`\`\`
animation.pause()

// Will resume from 1 second
animation.time = 1
animation.play()

// Will play from start
await animation
animation.play()
\`\`\`

### \`complete()\`

Immediately completes the animation, running it to the end state.

\`\`\`
animation.complete()
\`\`\`

### \`cancel()\`

Cancels the animation, reverting it to the initial state.

\`\`\`
const animation = animate(element, { opacity: 0 })
animation.cancel()
\`\`\`

### \`stop()\`

Stops the animation.

Any values being animated via the Web Animations API will be committed to the element via \`style\`.

Stopped animations cannot be restarted.

\`\`\`
const animation = animate(element, { opacity: 0 })
animation.stop()
\`\`\``
                }
            ]
        };
    });
    // scroll
    server.registerResource("JavaScript: scroll", docsUri("js", "scroll"), {
        description: "Learn how Motion's 5.1kb scroll() function creates high-performance, scroll-linked animations by leveraging the ScrollTimeline API. Bind animations directly to scroll progress, track vertical or horizontal scroll, and target specific elements or container scroll. Discover options for scroll offsets, pinning, and detailed scroll information.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "scroll");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# scroll

Motion's 5.1kb \`scroll()\` function creates scroll-linked animations.

A scroll-linked animation is where a value is bound directly to scroll progress. When the scroll changes, the value changes by the relative amount.

This is in contrast to a scroll-triggered animation, which is when an animation starts/stops when an element enters/leaves the viewport. In Motion, these can be built with \`[inView](/docs/inview.md)\`.

\`scroll\` is the only API that takes advantage of Motion's hybrid engine, using the \`[ScrollTimeline](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline)\` [API](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline) where possible for optimal performance. This removes scroll measurements and enables hardware-accelerated animations.

## Usage

Import \`scroll\` from Motion:

\`\`\`
import { scroll } from "motion"
\`\`\`

### Callbacks

\`scroll()\` can accept a callback function. This callback will be called when scroll changes with the latest \`progress\` value, between \`0\` and \`1\`.

\`\`\`
scroll(progress => console.log(progress))
\`\`\`

### Animation

\`scroll()\` can also accept animations created with the \`[animate()](/docs/animate.md)\` [function](/docs/animate.md).

\`\`\`
const animation = animate(
  "div",
  { transform: ["none", "rotate(90deg)"] },
  { ease: "linear" }
)  

scroll(animation)
\`\`\`

Browsers that support the \`ScrollTimeline\` API will use this to run supported animations with hardware acceleration.

### Scroll axis

By default, vertical scroll is tracked. By providing an \`axis: "x"\` option, it can instead track horizontal scrolling.

\`\`\`
scroll(callback, { axis: "x" })
\`\`\`

### Track element scroll

\`scroll()\` tracks \`window\` scroll by default. It can also track the scroll of an \`Element\`, by passing it in via the \`container\` option.

\`\`\`
scroll(callback, { container: document.getElementById("scroller") })
\`\`\`

### Track element position

We can track the progress of an element as it moves within a container by passing its \`ref\` to the \`target\` option.

\`\`\`
scroll(animation, { target: document.getElementById("item") })
\`\`\`

### Scroll offsets

With the \`offset\` option we can define which parts of the \`target\` we want to track within the \`container\`, for instance track elements as they enter in from the bottom, leave at the top, or travel throughout the whole viewport.

### Pinning

To use the browser for best performance, pinning should be performed with \`position: sticky\`.

This works well, for instance, to create section-based full-screen effects, by using a larger container element to define the scroll distance and passing this to the \`target\` option:

### Scroll information

By passing a callback with a second \`info\` argument, it's possible to get detailed information about scrolling.

\`\`\`
scroll((progress, info) => {
  console.log(info.x.current)
})
\`\`\`

The \`info\` object contains:

*   \`time\`: The time the scroll position was recorded.
    
*   \`x\`: Info on the \`x\` scroll axis.
    
*   \`y\`: Info on the \`y\` scroll axis.
    

Each individual axis is an object containing the following data:

*   \`current\`: The current scroll position.
    
*   \`offset\`: The scroll offsets resolved as pixels.
    
*   \`progress\`: A progress value, between \`0\`\\-\`1\` of the scroll within the resolved offsets.
    
*   \`scrollLength\`: The total scrollable length on this axis. If \`target\` is the default scrollable area, this is the container scroll length minus the container length.
    
*   \`velocity\`: The velocity of the scroll on this axis.
    

### Cancel animation

\`scroll()\` returns a cleanup function. Call this to cancel the scroll animation.

\`\`\`
const cancel = scroll(callback)

cancel()
\`\`\`

## Options

### \`container\`

**Default:** \`window\`

The container scroller element or window that we're tracking the scroll progress of.

\`\`\`
scroll(
  (progress) => console.log(progress),
  { container: document.getElementById("carousel") }  
)
\`\`\`

### \`axis\`

**Default:** \`"y"\`

The axis of scroll to track. Defaults to \`"y"\`.

\`\`\`
scroll(
  (progress) => console.log(progress),
  { axis: "x" }  
)
\`\`\`

### \`target\`

By default, this is the **scrollable area** of the \`container\`. It can additionally be set as another element, to track its progress within the viewport.

\`\`\`
scroll(
  animation
  { target: document.getElementById("item") }  
)
\`\`\`

### \`offset\`

**Default:** \`["start start", "end end"]\`

\`offset\` describes intersections, points where the \`target\` and \`container\` meet.

For example, the intersection \`"start end"\` means when the **start of the target** on the tracked axis meets the **end of the container.**

So if the target is an element, the container is the window, and we're tracking the vertical axis then \`"start end"\` is where the **top of the element** meets **the bottom of the viewport**.

#### Accepted intersections

Both target and container points can be defined as:

*   **Number:** A value where \`0\` represents the start of the axis and \`1\` represents the end. So to define the top of the target with the middle of the container you could define \`"0 0.5"\`. Values outside this range are permitted.
    
*   **Names:** \`"start"\`, \`"center"\` and \`"end"\` can be used as clear shortcuts for \`0\`, \`0.5\` and \`1\` respectively.
    
*   **Pixels:** Pixel values like \`"100px"\`, \`"-50px"\` will be defined as that number of pixels from the start of the target/container.
    
*   **Percent:** Same as raw numbers but expressed as \`"0%"\` to \`"100%"\`.
    
*   **Viewport:** \`"vh"\` and \`"vw"\` units are accepted.`
                }
            ]
        };
    });
    // Easing functions
    server.registerResource("JavaScript: Easing functions", docsUri("js", "easing-functions"), {
        description: "Explore Motion's built-in easing functions to control animation speed and feel. Learn how to use cubicBezier, steps, easeIn/Out, backIn/Out, circIn/Out, anticipate, and linear easings. Discover modifiers like reverseEasing and mirrorEasing for advanced control.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "easing-functions");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Easing functions

Easing functions are used to change the speed of an animation throughout the course of its duration. Different easing functions provide your animations with different "feelings".

Both the \`[animate](/docs/animate.md)\` [function](/docs/animate.md) and Motion for React's \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md) have the following easing functions built-in and you can just refer to them by name.

\`\`\`
// Named easing
ease: "easeIn"

// Bezier curve
ease: [0.39, 0.24, 0.3, 1]
\`\`\`

But you can still import them separately to use them directly, either for use with the tiny \`animate\` function from \`"motion/dom"\` or for novel use-cases.

## Usage

All of Motion's easing functions can be imported straight from \`"motion"\`:

\`\`\`
import { easeIn } from "motion"
\`\`\`

By passing a \`0\`\\-\`1\` progress value to these functions, you'll receive an eased progress back.

\`\`\`
const eased = easeIn(0.75)
\`\`\`

## Functions

Motion provides a number of built-in easing functions:

*   \`cubicBezier\`
    
*   \`easeIn\`/\`easeOut\`/\`easeInOut\`
    
*   \`backIn\`/\`backOut\`/\`backInOut\`
    
*   \`circIn\`/\`circOut\`/\`circInOut\`
    
*   \`anticipate\`
    
*   \`linear\`
    
*   \`steps\`
    

> _I usually use the_ \`_"easeOut"_\` _curve for enter and exit transitions. The acceleration at the beginning gives the user a feeling of responsiveness. I use a duration no longer than_ \`_0.3_\`_/_\`_0.4_\` _seconds to keep the animation fast._~ Emil Kowalski, [Animations on the Web](https://animations.dev/)

### \`cubicBezier\`

\`cubicBezier\` provides very precise control over the easing curve.

\`\`\`
import { cubicBezier } from "motion"

const easing = cubicBezier(.35,.17,.3,.86)

const easedProgress = easing(0.5)
\`\`\`

New easing curve definitions can be generated with [Motion Studio](https://motion.dev/studio).

### \`steps\`

\`steps\` creates an easing with evenly-spaced, discrete steps. It is spec-compliant with [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#step-easing-function) \`[steps](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#step-easing-function)\` [easing](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#step-easing-function).

\`\`\`
import { steps } from "motion"

const easing = steps(4)

easing(0.2) // 0
easing(0.25) // 0.25
\`\`\`

By default, the "steps" change at the end of a step, this can be changed by passing \`"start"\` to \`steps\`:

\`\`\`
const easing = steps(4, "start")

easing(0.2) // 0.25
\`\`\`

The distribution of steps is linear by default but can be adjusted by passing \`progress\` through another easing function first.

\`\`\`
const easing = steps(4)

easing(circInOut(0.2))
\`\`\`

## Modifiers

Easing modifiers can be used to create mirrored and reversed easing functions.

### \`reverseEasing\`

\`reverseEasing\` accepts an easing function and returns a new one that reverses it. For instance, an ease in function will become an ease out function.

\`\`\`
import { reverseEasing } from "motion"

const powerIn = (progress) => progress * progress

const powerOut = reverseEasing(powerIn)
\`\`\`

### \`mirrorEasing\`

\`mirrorEasing\` accepts an easing function and returns a new one that mirrors it. For instance, an ease in function will become an ease in-out function.

\`\`\`
import { mirrorEasing } from "motion"

const powerIn = (progress) => progress * progress

const powerInOut = mirrorEasing(powerInOut)
\`\`\``
                }
            ]
        };
    });
    // hover
    server.registerResource("JavaScript: hover", docsUri("js", "hover"), {
        description: "Discover Motion's hover function for reliable hover gesture detection, filtering out emulated touch events. ",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "hover");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# hover

Motion's \`hover\` function detects hover gestures, firing events when they start and end.

For legacy reasons, browsers emulate hover events from touch devices, which can lead to "stuck" UIs and other unwanted visual artefacts/broken behaviours. \`hover\` filters these fake events out.

\`\`\`
hover(".button", (element) => {
  console.log("hover started on", element)

  return () => console.log("hover end")
})
\`\`\`

\`hover\` is also:

*   Clean: Automatically manages event listeners
    
*   Convenient: Accepts either elements or CSS selectors for attaching multiple gestures at once
    
*   Lazy: Attaches only the event listeners needed
    

\`hover\` callbacks can do anything, but often they're used to start or control animations.

\`\`\`
hover("li", (element) => {
  const animation = animate(element, { rotate: 360 })

  return () => animation.stop()
})
\`\`\`

## Usage

### Import

\`hover\` can be imported into your project via \`"motion"\`:

\`\`\`
import { hover } from "motion"
\`\`\`

### Hover start

\`hover\` can detect hover gestures on either an \`Element\`/array of elements:

\`\`\`
hover(
  document.getElementById("my-id"),
  () => {
    console.log("my-id hovered!")
  }
)
\`\`\`

Or via a CSS selector:

\`\`\`
hover("a", () => console.log("link hovered"))
\`\`\`

When a hover gesture starts, the provided callback is provided both the element that's being hovered, and the triggering \`[PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)\`:

\`\`\`
hover("div:nth-child(2)", (element, startEvent) => {
  console.log("Hover started on", element)
  console.log("At", startEvent.clientX, startEvent.clientY)
})
\`\`\`

### Hover end

The hover start function can **optionally** return a callback. This will be called when the hover gesture ends:

\`\`\`
hover("a", () => {
  console.log("hover start")
  
  return (endEvent) => {
    console.log("hover end")
  }
})
\`\`\`

This callback will be provided the triggering \`PointerEvent\`.

### Cancelling gesture detection

\`hover\` returns a function that, when fired, will cancel all active event handlers associated with the gesture.

\`\`\`
const cancelHover = hover(element, callback)

cancelHover()
\`\`\`

## Options

### \`passive\`

**Default:** \`true\`

If set to \`false\`, it'll be possible to call \`event.preventDefault()\` but the gesture will be less performant. [Learn more about passive events](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive).

### \`once\`

**Default:** \`false\`

If set to \`true\`, each provided element will fire their gesture only once.`
                }
            ]
        };
    });
    // inView
    server.registerResource("JavaScript: inView", docsUri("js", "inview"), {
        description: "Learn to use Motion's inView function to detect when elements enter and leave the viewport. Built on Intersection Observer for optimal performance (0.5kb), it's ideal for scroll-triggered animations, lazy-loading, and more. Customize detection with root, margin, and amount options.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "inview");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# inView

\`inView\` detects when elements enter and leave the viewport.

\`\`\`
inView("#carousel li", (element) => {
  animate(element, { opacity: 1 })
})
\`\`\`

Detecting when an element is in view can help creating effects like:

*   Animating elements when they scroll into and out of view.
    
*   Deactivating animations when they're no longer visible.
    
*   Lazy-loading content.
    
*   Automatically start/stop videos.
    

\`inView\` function is built on the browser's native [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for the best possible performance (all calculations happen off the main JavaScript thread) and a tiny filesize (just 0.5kb).

## Usage

Import from \`"motion"\`:

\`\`\`
import { inView } from "motion"
\`\`\`

\`inView\` can accept either a selector, \`Element\`, or array of \`Element\`s.

\`\`\`
// Selector
inView("section", callback)

// Element
const box = document.getElementById("box")
inView(box, callback)
\`\`\`

By default, the provided callback will fire just once, when the element first enters the viewport.

\`\`\`
inView(element, () => {
  console.log("Element has entered the viewport")
})
\`\`\`

This callback is provided the matched element and [an](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) \`[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)\` [object](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) which contains information on the intersection.

\`\`\`
inView("a", (element, info) => {
  console.log("The link ", element, " has entered the viewport")
})
\`\`\`

### Leaving the viewport

A function returned from this callback will fire when the element leaves the viewport.

\`\`\`
inView(element,
  (element, enterInfo) => {
    const animation = animate(element, { opacity: 1 })
    
    // This will fire when the element leaves the viewport
    return (leaveInfo) => animation.stop()
  }
)
\`\`\`

Additionally, the gesture will also continue to fire as the element enters/leaves the viewport.

### Change viewport

By default, \`inView\` detects when the provided element(s) enter/leave the default viewport: The browser window.

But it can also detect when the element(s) enter/leave the viewport of a scrollable parent element, by passing that element to the \`root\` option:

\`\`\`
const carousel = document.querySelector("#carousel")

inView("#carousel li", callback, { root: carousel })
\`\`\`

### Stop detection

\`inView\` returns a function that, when fired, will stop viewport detection.

\`\`\`
const stop = inView(element, callback)

stop()
\`\`\`

## Options

### \`root\`

**Default:** \`window\`

If provided, \`inView\` will use the \`root\` element's viewport to detect whether the target elements are in view. Otherwise defaults to the browser window.

\`\`\`
const carousel = document.querySelector("#carousel")

inView("#carousel li", callback, { root: carousel })
\`\`\`

### \`margin\`

**Default:** \`0\`

One or more margins to apply to the viewport. This will extend or contract the point at which the element is considered inside or outside the viewport.

\`margin\` can be defined in pixels or percentages. It can accept up to four values in the order of top/right/bottom/left.

\`\`\`
inView(element, callback, { margin: "0px 100px 0px 0px" })
\`\`\`

Positive values extend the viewport boundaries beyond the root whereas negative values will pull it in.

### \`amount\`

**Default:** \`"some"\`

The amount of the target element that needs to be within the viewport boundaries to be considered in view.

This can be defined as \`"some"\`, for some of the element, or \`"all"\`, for all of the element.

Additionally, it can be defined as a number proportion between \`0\` and \`1\` where \`0\` is \`"some"\` and \`1\` is \`"all"\`.`
                }
            ]
        };
    });
    // press
    server.registerResource("JavaScript: press", docsUri("js", "press"), {
        description: "Discover Motion's press function for robust press gesture detection. Learn how it filters secondary pointers, enhances accessibility with keyboard support, and simplifies event listener management. Explore options for start and end callbacks, and passive/once event handling.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "press");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# press

Motion's \`press\` function detects press gestures, firing events when they start, end or cancel.

It's different to native browser events like \`"pointerstart"\` etc in that \`press\` automatically filters out secondary pointer events, like right clicks or a second touch point.

It also expands on \`"click"\` by being great for accessibility. Every element with a press gesture automatically becomes keyboard accessible via focus and the enter key.

\`\`\`
press("button", (element) => {
  console.log("press started on", element)

  return () => console.log("press ended")
})
\`\`\`

\`press\` is also:

*   Clean: Automatically manages event listeners
    
*   Convenient: Accepts either elements or CSS selectors for attaching multiple listeners at once
    
*   Lazy: Attaches only the listeners needed
    

It can be used to fire any function, but also to start and stop animations:

\`\`\`
press("button", (element) => {
  animate(element, { scale: 0.9 })

  return () => animate(element, { scale: 1 })
})
\`\`\`

## Video overview

## Usage

### Import

\`press\` can be imported via \`"motion"\`.

\`\`\`
import { press } from "motion"
\`\`\`

### Press start

\`press\` can detect press start gestures on either a \`Element\`/array of elements:

\`\`\`
press(
  document.getElementById("my-id"),
  () => {
    console.log("my-id pressed!")
  }
)
\`\`\`

It also accepts CSS selectors to detect press start on multiple elements:

\`\`\`
press("a", () => console.log("link pressed"))
\`\`\`

The callback is provided the element being pressed, and the triggering \`[PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)\`:

\`\`\`
press("div:nth-child(2)", (element, startEvent) => {
  console.log("Pressed", element)
  console.log("At", startEvent.clientX, startEvent.clientY)
})
\`\`\`

### Press end

The press start function can optionally return a function that will be called when the press gesture ends:

\`\`\`
press(element, (element, startEvent) => {
  console.log("press start")
  
  return (endEvent) => {
    console.log("press end")
  }
})
\`\`\`

The press end callback is passed a second argument, \`info\`. It currently has one property, \`success\`. If \`true\`, the press was successfully completed, like a click. If \`false\`, the press ended outside the element.

\`\`\`
press(element, () => {
  return (endEvent, info) => {
    console.log("press ", info.success ? "end" : "cancel")
  }
})
\`\`\`

When using keyboard accessibility, \`success\` will be \`false\` if the element is blurred while the enter key is held.

### Cancelling gesture

\`press\` returns a function that, when fired, will cancel all active event handlers associated with the gesture.

\`\`\`
const cancelPress = press(element, callback)

cancelPress()
\`\`\`

## Options

### \`passive\`

**Default:** \`true\`

If set to \`false\`, it'll be possible to call \`event.preventDefault()\` but the gesture will be less performant. [Learn more about passive events](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive).

### \`once\`

**Default:** \`false\`

If set to \`true\`, each provided element will fire their gesture only once.`
                }
            ]
        };
    });
    // resize
    server.registerResource("JavaScript: resize", docsUri("js", "resize"), {
        description: "Efficiently monitor and react to size changes of the viewport, or HTML and SVG elements, with resize. This function uses the ResizeObserver API to provide performant, per-element resize event handling, complete with easy-to-use cleanup. Ideal for dynamic layouts and responsive component designs.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "resize");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# resize

\`resize\` allows you to monitor and react to size changes in the viewport, or specific HTML and SVG elements.

\`\`\`
// Viewport
resize(() => {})

// Specific elements
resize("li", () => {})
\`\`\`

For optimal performance, all resize handlers are triggered via a single, shared \`[ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)\`.

## Usage

Import \`resize\` from \`"motion"\`.

\`\`\`
import { resize } from "motion"
\`\`\`

### Tracking viewport changes

Changes to the viewport can be detected by passing just a callback to \`resize\`:

\`\`\`
resize(() => console.log("viewport change detected"))
\`\`\`

The callback is provided a single argument, containing \`width\` and \`height\` getters.

\`\`\`
resize(({ width, height }) => console.log(width, height))
\`\`\`

### Tracking element changes

By passing an element or CSS selector, \`resize\` can detect changes on specific elements.

\`\`\`
resize("li", (element) => console.log(element, "change detected"))
\`\`\`

This function is also provided \`width\` and \`height\` getters for each \`element\`:

\`\`\`
resize(".drawer", (element, { width, height }) => {
  console.log(element, " is now ", width, height)
})
\`\`\`

The returned \`width\` and \`height\` are the element's **border box**, which is the size of the element including the border.

### Responding to size changes

For best performance, subsequent renders should be performed with the [Motion frameloop](/docs/frame.md). This ensures DOM reads and writes are correctly batched to prevent layout and style thrashing.

\`\`\`
resize(".drawer", (element, { width, height }) => {
  frame.render(() => {
    element.style.height = Math.max(400, height)
  })
})
\`\`\`

### Cleanup

\`resize\` returns a function that will, when called, remove the attached listeners.

\`\`\`
const stop = resize(log)
stop()
\`\`\`

When there are no more listeners on an element, the element will be removed from the \`ResizeObserver\`, and when there are no more listeners at all, the \`ResizeObserver\` will be stopped.`
                }
            ]
        };
    });
    // motionValue
    server.registerResource("JavaScript: motionValue", docsUri("js", "motion-value"), {
        description: "Understand Motion Values, the core of Motion's animation system, used for tracking the state and velocity of animated properties. Learn how to manually create, set, get, and subscribe to motion values for advanced animation control and rendering with effects.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "motion-value");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# motionValue

Motion Values track the state and velocity of animated values.

They are composable, signal-like values that are performant because Motion throttles rendering with its optimised frameloop.

Motion Values are usually created automatically by the \`[animate](/docs/animate.md)\` [function](/docs/animate.md) or \`[motion](/docs/react-motion-component.md)\` [components](/docs/react-motion-component.md). They aren't something you generally have to think about.

But, for advanced use cases, it's possible to create them manually.

\`\`\`
const x = motionValue(0)

x.on("change", latest => console.log(latest))

animate(x, 100)
\`\`\`

By manually creating motion values you can:

*   Set and get their state.
    
*   Subscribe to changes via the \`on\` method.
    
*   Automatically end existing animations when starting new animations.
    

\`\`\`
const color = motionValue("#f00")

animate(color, "#0f0")

animate(color, "#333") // Will automatically end the existing animation
\`\`\`

## Usage

Motion Values can be created with the \`motionValue\` function. The string or number passed to \`motionValue\` will act as its initial state.

\`\`\`
import { motionValue } from "motion"

const x = motionValue(0)
\`\`\`

Changes to a Motion Value can be subscribed to with the \`.on\` method.

\`\`\`
x.on("change", latest => console.log(latest))
\`\`\`

### Set value

Motion Values can be updated with the \`set\` method.

\`\`\`
x.set(100)
\`\`\`

### Get value and velocity

The latest value of a Motion Value can be read with \`.get()\`:

\`\`\`
const latest = x.get() // 100
\`\`\`

It's also possible to get the velocity of the value via \`.getVelocity()\`:

\`\`\`
const velocity = x.getVelocity()
\`\`\`

Velocity is available for any number-like value, for instance \`100\`, or unit types like \`"50vh"\` etc.

Velocity is intelligently calculated by using the value rendered during the previous animation frame (rather than the last value passed via \`set\`).

### Render

Motion values can be passed to effects like \`[styleEffect](/docs/style-effect.md)\`, \`[attrEffect](/docs/attr-effect.md)\` or \`[propEffect](/docs/prop-effect.md)\` to render the latest values once per animation frame.

\`\`\`
const x = motionValue(0)
const opacity = motionValue(1)

styleEffect("li", { x, opacity })

x.set(100) // Will apply to all <li> elements on the next frame
animate(opacity, 0) // Will animate all <li> opacity
\`\`\`

## API

### \`get()\`

Returns the latest state of the Motion Value.

### \`getVelocity()\`

Returns the latest velocity of the motion value. Returns \`0\` if the value is non-numerical.

### \`set()\`

Sets the Motion Value to a new state.

\`\`\`
x.set("#f00")
\`\`\`

### \`jump()\`

Jumps the Motion Value to a new state in a way that breaks continuity from previous values:

*   Resets \`velocity\` to \`0\`.
    
*   Ends active animations.
    

\`\`\`
animate(x, 100)

x.jump(10)
x.getVelocity() // 0
\`\`\`

### \`isAnimating()\`

Returns \`true\` if the value is currently animating.

### \`stop()\`

Stop the active animation.

### \`on()\`

Subscribe to Motion Value events. Available events are:

*   \`change\`
    
*   \`animationStart\`
    
*   \`animationCancel\`
    
*   \`animationComplete\`
    

\`\`\`
import { motionValue, frame } from "motion"

const color = motionValue("#fff")

color.on("change", latest => {
  frame.render(() => element.style.backgroundColor = latest)
})
\`\`\`

It returns a function that, when called, will unsubscribe the listener.

\`\`\`
const unsubscribe = x.on("change", latest => console.log(latest))
\`\`\`

### \`destroy()\`

Destroy and clean up subscribers to this Motion Value.`
                }
            ]
        };
    });
    // mapValue
    server.registerResource("JavaScript: mapValue", docsUri("js", "map-value"), {
        description: "Learn to use Motion's mapValue to create a new read-only motion value by mapping a numerical motion value's output to a range of numbers, colors, or complex strings. Understand how to define input/output ranges and control clamping behavior.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "map-value");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# mapValue

\`mapValue\` creates a new read-only [motion value](/docs/motion-value.md) that maps the output of a numerical motion value to a range of numbers, colors or complex strings.

\`\`\`
const x = motionValue(100)

// Fade out outside the 0-100 range
const opacity = mapValue(x, [-100, 0, 100, 200], [0, 1, 1, 0])

// Shift color when fading out
const backgroundColor = mapValue(opacity, [0, 1], ["#f00", "#00f"])
\`\`\`

## Usage

Import \`mapValue\` from \`"motion"\`:

\`\`\`
import { mapValue } from "motion"
\`\`\`

\`mapValue\` accepts a **numerical** motion value, an input range, and an output range:

\`\`\`
const x = motionValue(0)
const opacity = mapValue(x, [-100, 0, 100, 200], [0, 1, 1, 0])
\`\`\`

*   Both ranges **must always be the same length**.
    
*   The **input range** must always be a linear series of numbers, either counting up or counting down.
    
*   The **output range** can be a non-linear series of numbers, colors, or complex strings.
    

When mapping to complex strings, the format of each string must be the same in each keyframe, with the same number of numbers and colors, all in the same order:

\`\`\`
const boxShadow = mapValue(
  progress,
  [0, 1],
  ["0px 0px 0px rgba(0, 0, 0, 0)", "10px 10px 5px rgba(0, 0, 0, 0.3)"]
)
\`\`\`

### Unclamped ranges

By default, \`mapValue\` clamps the output value to the ranges provided:

\`\`\`
const progress = motionValue(3)
const double = mapValue(progress, [0, 1], [0, 2])

double.get() // progress clamped to 1, outputs 2
\`\`\`

By passing the \`{ clamp: false }\` option, we can unclamp this interpolation:

\`\`\`
const progress = motionValue(3)
const double = mapValue(progress, [0, 1], [0, 2], { clamp: false })

double.get() // 6
\`\`\``
                }
            ]
        };
    });
    // transformValue
    server.registerResource("JavaScript: transformValue", docsUri("js", "transform-value"), {
        description: "Discover Motion's transformValue to create new read-only motion values by computing output from one or more existing motion values. Learn how it facilitates combining multiple values or performing calculations, with automatic dependency tracking and composability.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "transform-value");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# transformValue

\`transformValue\` creates a new read-only [motion value](/docs/motion-value.md) computed from the output of one or more motion values.

\`\`\`
const blur = motionValue(0)
const filter = transformValue(() => \`blur(\${blur.get()}px)\`)

styleEffect("img", { filter })
\`\`\`

This is useful for combining multiple motion values into a single value, or performing calculations on a motion value's output.

\`\`\`
const scale = motionValue(1)
const inverseScale = transformValue(() => 1 / scale.get())

styleEffect(".parent", { scale })
styleEffect(".child", { scale: inverseScale })
\`\`\`

## Usage

\`transformValue\` accepts a single function, that returns the computed output of one or more other motion values.

\`\`\`
import { motionValue, transformValue } from "motion"

const x = motionValue(0)
const doubleX = transformValue(() => x.get() * 2)
\`\`\`

Any motion values that call \`.get()\` in this function will be tracked, so when they update, the motion value returned from \`transformValue\` will also update.

\`\`\`
doubleX.on("change", (latest) => console.log(latest))

x.set(10) // doubleX will log 20
\`\`\`

### Compose

Motion values returned from \`transformValue\` can be composed into other \`transformValue\` callbacks:

\`\`\`
const x = motionValue(0)
const y = motionValue(0)
const rotate = transformValue(() => x.get() + y.get())
const transform = transformValue(() => \`translate3d(\${x.get()}px \${y.get()}px 0) rotate(\${rotate.get()}deg)\`)
\`\`\``
                }
            ]
        };
    });
    // springValue
    server.registerResource("JavaScript: springValue", docsUri("js", "spring-value"), {
        description: "Learn to use Motion's springValue to create motion values that animate with physics-based spring motion. Discover how to apply springs to numbers or existing motion values, and configure them using options like stiffness, damping, and mass for reactive animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "spring-value");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# springValue

\`springValue\` creates a new [motion value](/docs/motion-value.md) that reacts to changes with a physics-based spring animation.

\`springValue\` either accepts a number:

\`\`\`
const x = springValue(0)
const y = springValue("100%")

// These will go to their new target with a spring animation
x.set(100)
y.set("0%")

styleEffect("div", { x, y })
\`\`\`

Or another motion value:

\`\`\`
const pointerX = motionValue(0)
const x = springValue(pointerX)

document.addEventListener("pointerMove", (e) => {
  // x will animate these changes with a spring animation
  pointerX.set(e.clientX)
})

styleEffect("div", { x })
\`\`\`

## Usage

\`springValue\` accepts either a number value or a motion value.

### Number

A number can be provided with or without a unit:

\`\`\`
import { springValue } from "motion"

const scaleX = springValue(0)
const rotate = springValue("1turn")
\`\`\`

When we've provided a number, we can animate the returned motion value by calling its \`.set()\`

\`\`\`
scaleX.set(1)
rotate.set("2turn")
\`\`\`

### Motion value

Alternatively, we can attach a spring onto another motion value by passing it to \`springValue\`:

\`\`\`
const opacity = motionValue(1)
const x = mapValue(opacity, [0, 1], [0, 100])
const xWithSpring = springValue(x)
\`\`\`

## Options

All of the normal Motion [spring options](https://motion.dev/docs/animate#spring) are supported via a second argument.

\`\`\`
springValue(0, { stiffness: 1000 })
\`\`\``
                }
            ]
        };
    });
    // attrEffect
    server.registerResource("JavaScript: attrEffect", docsUri("js", "attr-effect"), {
        description: "Discover Motion's attrEffect for applying motion values to HTML element attributes. Learn how it handles aria and data attribute casing, utilizes JavaScript setters for improved performance, and enables re-rendering when motion values update.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "attr-effect");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# attrEffect

\`attrEffect\` applies the output of [motion values](/docs/motion-value.md) to the attributes of one or more elements.

When these motion values update, the element will re-render once per frame during the [render step of the frameloop](/docs/frame.md).

\`\`\`
const width = motionValue(100)

attrEffect("rect", { width })
\`\`\`

\`attrEffect\` will automatically handle casing for \`aria\` and \`data\` attributes, converting camel case to kebab case.

\`\`\`
const value = motionValue("#fff")

attrEffect(counter, {
  ariaValuenow: value,
  dataValue: value
})

// <div aria-valuenow="#fff" data-value="#fff">
\`\`\`

It will also dynamically set attributes via their JavaScript setter, if available, for improved type-safety and performance.

## Usage

Import \`attrEffect\` from \`"motion"\`:

\`\`\`
import { attrEffect } from "motion"
\`\`\`

\`attrEffect\` accepts an element, list of elements, or CSS selector, plus a map of motion values:

\`\`\`
const progress = motionValue(0.5)

attrEffect("#progress", { "data-progress": progress })
\`\`\`

When any of the motion values update, the element(s) will re-render on the next animation frame:

\`\`\`
progress.set(1)
animate(progress, 1)
\`\`\`

Each motion value can be applied to any number of attributes, on any number of elements.

Any motion value can be provided, including those defined by \`[mapValue](/docs/map-value.md)\` and \`[transformValue](/docs/transform-value.md)\`.

### Cancel

\`attrEffect\` returns a cleanup function which, when called, will stop applying changes to the motion values to the element:

\`\`\`
const cx = motionValue(0)
const cy = motionValue(0)
const cancel = attrEffect("circle", { cx, cy })

cancel()
\`\`\``
                }
            ]
        };
    });
    // propEffect
    server.registerResource("JavaScript: propEffect", docsUri("js", "prop-effect"), {
        description: "Learn to use Motion's propEffect to dynamically apply motion values to JavaScript object properties. Understand how it facilitates re-rendering on updates, its utility for libraries like Three.js, and how to apply and clean up effects.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "prop-effect");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# propEffect

\`propEffect\` applies the output of [motion values](/docs/motion-value.md) to the properties of an object.

When these motion values update, the element will re-render once per frame during the [render step of the frameloop](/docs/frame.md).

\`\`\`
const pos = { x: 0, y: 0, z: 0 }
const x = motionValue(0)

propEffect(pos, { x })

// Set x on pos to 100
x.set(100)

// Animate x on pos to 200
animate(x, 200)
\`\`\`

This can also be used for rendering Three.js props:

\`\`\`
const cube = new THREE.Mesh(geometry, material)
const x = motionValue(0)

propEffect(cube.position, { x })
\`\`\`

## Usage

Import \`propEffect\` from \`"motion"\`:

\`\`\`
import { propEffect } from "motion"
\`\`\`

\`propEffect\` accepts an a single object, plus a map of motion values:

\`\`\`
const data = { opacity: 0, x: 100 }
const opacity = motionValue(0)

propEffect(data, { opacity })
\`\`\`

When any of the motion values update, the element(s) will re-render on the next animation frame:

\`\`\`
opacity.set(1)
\`\`\`

Each motion value can be applied to any number of styles, and any number of elements.

Any motion value can be provided, including those defined by \`[mapValue](/docs/map-value.md)\` and \`[transformValue](/docs/transform-value.md)\`.

### Cancel

\`propEffect\` returns a cleanup function which, when called, will stop applying changes to the motion values to the element:

\`\`\`
const rotateX = motionValue(0)
const cancel = propEffect(threeRotation, { x: rotateX })

cancel()
\`\`\``
                }
            ]
        };
    });
    // styleEffect
    server.registerResource("JavaScript: styleEffect", docsUri("js", "style-effect"), {
        description: "Discover Motion's styleEffect for applying motion values to HTML elements. Learn how it supports independent transforms, default unit types, CSS properties, and enables efficient re-rendering on motion value updates.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "style-effect");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# styleEffect

\`styleEffect\` applies the output of [motion values](/docs/motion-value.md) to the \`.style\` attribute of one or more elements.

When these motion values update, the element will re-render once per frame during the [render step of the frameloop](/docs/frame.md).

\`\`\`
const blur = motionValue(2)
const filter = transformValue(() => \`blur(\${blur.get()}px)\`)

styleEffect("img", { filter })
\`\`\`

In addition to regular styles, \`styleEffect\` supports:

*   Independent transforms (\`x\`, \`scaleY\` etc)
    
*   Default unit types (i.e use numbers like \`100\` instead of \`"100px"\`)
    
*   CSS properties
    

## Usage

Import \`styleEffect\` from \`"motion"\`:

\`\`\`
import { styleEffect } from "motion"
\`\`\`

\`styleEffect\` accepts an element, list of elements, or CSS selector, plus a map of motion values:

\`\`\`
const opacity = motionValue(0.5)
const backgroundColor = motionValue("#00f")

styleEffect("div", { opacity, backgroundColor })
\`\`\`

When any of the motion values update, the element(s) will re-render on the next animation frame:

\`\`\`
opacity.set(1)
animate(backgroundColor, "rgba(34, 255, 0, 1)")
\`\`\`

Each motion value can be applied to any number of styles, and any number of elements.

\`\`\`
const progress = motionValue(0)

styleEffect("#progress", {
  opacity: progress,
  scaleX: progress
})
\`\`\`

Any motion value can be provided, including those defined by \`[mapValue](/docs/map-value.md)\` and \`[transformValue](/docs/transform-value.md)\`:

\`\`\`
const blur = motionValue(2)
const filter = transformValue(() => \`blur(\${blur.get()}px)\`)

styleEffect("img", { filter })
\`\`\`

### Cancel

\`styleEffect\` returns a cleanup function which, when called, will stop applying changes to the motion values to the element:

\`\`\`
const width = motionValue("0px")
const cancel = styleEffect("#progress", { width })

cancel()
\`\`\``
                }
            ]
        };
    });
    // svgEffect
    server.registerResource("JavaScript: svgEffect", docsUri("js", "svg-effect"), {
        description: "Learn how to use Motion's svgEffect to apply motion values to SVG element styles and attributes. Discover how to create 'draw' animations with pathLength, pathSpacing, and pathOffset, and understand its automatic CSS-style transform origin handling.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "svg-effect");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# svgEffect

\`svgEffect\` applies the output of [motion values](/docs/motion-value.md) to styles and attributes of one or more elements.

When these motion values update, the element will re-render once per frame during the [render step of the frameloop](/docs/frame.md).

\`\`\`
const cx = motionValue(100)

svgEffect("circle", { cx })
\`\`\`

In addition to regular styles, \`svgEffect\` also supports simple \`0\`\\-\`1\` progress values for drawing-style animations.

These values can be used with any SVG element that supports \`stroke\`, for instance \`<rect>\`, \`<path>\` etc.

By default, \`svgEffect\` applies valid styles via \`.style\`. In cases where there's also a valid attribute equivalent with the same name, these can be set with the \`attr\` prefix:

\`\`\`
const width = motionValue(400)

svgEffect("rect", { attrWidth: width })
\`\`\`

## Usage

Import \`svgEffect\` from \`"motion"\`:

\`\`\`
import { svgEffect } from "motion"
\`\`\`

\`svgEffect\` accepts an element, list of elements, or CSS selector, plus a map of motion values:

\`\`\`
const stroke = motionValue("#00f")
const strokeWidth = motionValue(5)

svgEffect("circle", { strokeWidth, stroke })
\`\`\`

When any of the motion values update, the element(s) will re-render on the next animation frame:

\`\`\`
stroke.set("#f00")
animate(strokeWidth, 1)
\`\`\`

Each motion value can be applied to any number of styles/attributes, and any number of elements.

\`\`\`
const progress = motionValue(0)

svgEffect("#progress", {
  pathLength: progress,
  pathOffset: progress
})
\`\`\`

Any motion value can be provided, including those defined by \`[mapValue](/docs/map-value.md)\` and \`[transformValue](/docs/transform-value.md)\`.

### Draw animations

\`svgEffect\` makes it simple to make "draw"-style animations using the following special values:

*   \`pathLength\` controls the line length.
    
*   \`pathSpacing\` controls the spacing between line segments.
    
*   \`pathOffset\` controls the position of the line along the path.
    

Each can be set as a progress value between \`0\`\\-\`1\`.

\`\`\`
const pathLength = motionValue(0.5)

svgEffect("circle", { pathLength }) // 0.5 = half path length
\`\`\`

Draw animations are supported on the following elements:

*   \`<circle>\`
    
*   \`<ellipse>\`
    
*   \`<line>\`
    
*   \`<path>\`
    
*   \`<polygon>\`
    
*   \`<polyline>\`
    
*   \`<rect>\`
    

#### Infinite looping

By leaving \`pathSpacing\` unset, it will be dynamically calculated to allow for infinite looping animations.

\`\`\`
const pathLength = motionValue(0.5)
const pathOffset = motionValue(0)

svgEffect("path", { pathLength, pathOffset })

animate(pathOffset, [0, 1], { repeat: Infinity })
\`\`\`

### CSS-style transform origin

By default, SVG transform origins are calculated relative to the \`viewBox\`, which is usually unintuitive and unlike CSS transform origins, which are calculated relative to the element.

\`svgEffect\` will automatically apply the \`transform-box: fill-box\` style when a \`transform\` is detected. This will make the transform origin calculated relative to the element, as in CSS.

This can be overridden by manually setting \`transformBox\`:

\`\`\`
svgEffect("path", { transformBox: motionValue("view-box") })
\`\`\`

### Cancel

\`svgEffect\` returns a cleanup function which, when called, will stop applying changes to the motion values to the element:

\`\`\`
const width = motionValue("0px")
const cancel = svgEffect("#progress", { width })

cancel()
\`\`\``
                }
            ]
        };
    });
    // delay
    server.registerResource("JavaScript: delay", docsUri("js", "delay"), {
        description: "Discover Motion's delay function, a setTimeout alternative locked to the animation frame loop. Learn how it helps synchronize callbacks with animations, and reduces computational overhead.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "delay");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# delay

\`delay\` is a \`setTimeout\` alternative that's locked to Motion's [animation frame loop](/docs/frame.md).

This can help synchronise callbacks with other animations, and avoid the overhead of setting many \`setTimeout\`s.

## Usage

Import \`delay\` from Motion.

\`\`\`
import { delay } from "motion"
\`\`\`

### Delay a callback

Pass a callback and duration (measured in seconds) to \`delay\`. The callback will fire on the next animation frame after this duration.

\`\`\`
delay(() => console.log("one second!"), 1)
\`\`\`

### Cancel

\`delay\` returns a function that, when called, will cancel the delay.

\`\`\`
const cancel = delay(callback, 0.25)

cancel() // callback will never fire
\`\`\`

### Animation loop

\`delay\` fires its callback on the first step of Motion's [animation loop](/docs/frame.md), the \`read\` step.

We can therefore batch reads and writes with the rest of the loop using \`frame\`.

\`\`\`
import { delay, frame } from "motion"

delay(() => {
  const { left } = element.getBoundingClientRect()

  // Will render later during this animation frame
  frame.render(() => {
    element.style.left = \`\${left * 2}px\`
  })
}, 1)
\`\`\``
                }
            ]
        };
    });
    // frame
    server.registerResource("JavaScript: frame", docsUri("js", "frame"), {
        description: "Learn to use Motion's frame function to schedule tasks on its optimized animation loop. Discover how it prevents layout thrashing, offers a keep-alive API for custom loops, and improves performance by avoiding multiple requestAnimationFrame calls. Understand how to schedule callbacks for read, update, and render steps.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "frame");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# frame

\`frame\` is used to schedule a function to run on Motion's animation loop. Using Motion's animation loop:

*   Prevents [layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/#avoid-layout-thrashing).
    
*   Provides an easy keep-alive API for creating your own animation loop.
    
*   Avoids the significant performance overhead of multiple \`requestAnimationFrame\` calls.
    

## Usage

Import \`frame\` from Motion:

\`\`\`
import { frame } from "motion"
\`\`\`

### Schedule a callback

\`frame\` works like \`[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)\`, whereby callbacks provided will execute on the next animation frame.

\`frame\` splits the animation frame into three steps:

*   \`read\`: Read values from or measure the DOM.
    
*   \`update\`: Amend values once all values have been read.
    
*   \`render\`: Apply updated values to DOM once all values have been updated.
    

A function can be scheduled to run at each step like so:

\`\`\`
frame.render(() => element.style.transform = "translateX(0px)")
\`\`\`

### Cancel a callback

\`cancelFrame\` can be used to cancel a callback.

\`\`\`
import { frame, cancelFrame } from "framer-motion"

function measureElement() {
  console.log(element.getBoundingClientRect())
}

frame.read(measureElement)
cancelFrame(measureElement)
\`\`\`

### Animation loop

Often, you'll want to keep firing a function every frame. You can do so by passing \`true\` as the second argument.

\`\`\`
let i = 0

function update() {
  i++

  // Stop after 100 frames
  if (i >= 100) cancelFrame(update)
}

frame.update(update, true)
\`\`\``
                }
            ]
        };
    });
    // mix
    server.registerResource("JavaScript: mix", docsUri("js", "mix"), {
        description: "Discover Motion's mix() function to smoothly interpolate between two values based on a 0-1 progress. Learn to mix numbers, colors (with linear RGB for better fidelity), complex strings, arrays, and objects. Explore how to apply easing and generate randomly distributed values.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "mix");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# mix

\`mix\` can create a function that will mix between two values, based on a \`0\`\\-\`1\` progress value.

\`\`\`
const mixer = mix(0, 100)
mixer(0.5) // 50
\`\`\`

\`mix\` is capable of mixing between many different value types:

*   Numbers
    
*   Colors (RGBA, HSLA)
    
*   Complex strings
    
*   Arrays and objects of the above
    

Additionally, RGB color mixing is performed using the [linear RGB color space](https://www.youtube.com/watch?v=LKnqECcg6Gw), ensuring colors are mixed without the typical CSS brightness dips/greyness.

## Usage

Import from Motion:

\`\`\`
import { mix } from "motion"
\`\`\`

Create a mixer by passing two values of the same type:

\`\`\`
const mixNumber = mix(0, 100)
const mixColor = mix("#000", "#FFF")
const mixObject = mix(
  { a: "0px", b: 10 },
  { a: "20px", b: 0 }
)
\`\`\`

Pass the mixer function a \`0\`\\-\`1\` progress to return a mixed value.

\`\`\`
const mixComplex = mix("0px 0px #fff", "100px 100px #000")

mixComplex(0.5) // 50px 50px rgba(128, 128, 128, 1)
\`\`\`

Values outside the \`0\`\\-\`1\` range are also accepted.

\`\`\`
const mixNumber = mix(0, 100)

mixNumber(2) // 200
mixNumber(-1) // -100
\`\`\`

### Easing

You can apply easing to the mixed value by passing progress through [an easing function](/docs/easing-functions.md):

\`\`\`
import { mix, easeInOut } from "motion"

const mixNumber = mix(0, 100)

mixNumber(easeInOut(0.75))
\`\`\`

### Random value generation

You can generate random values by using \`Math.random()\` as the progress value in \`mix\`.

\`\`\`
const x = mix(100, 400, Math.random())
\`\`\`

By default, the progress numbers returned from \`Math.random()\` will be of a linear distribution. That is, it's just as likely to return \`0.1\` as \`0.9\`. So if you run the above hundreds of times, you'll get values evenly distributed across the provided range.

It's possible to change the distribution of \`Math.random()\` by passing it through an easing function:

\`\`\`
// Mostly higher numbers
mix(0, 50, easeOut(Math.random()))

// Mostly lower numbers
mix(0, 50, easeIn(Math.random()))
\`\`\``
                }
            ]
        };
    });
    // spring
    server.registerResource("JavaScript: spring", docsUri("js", "spring"), {
        description: "Explore Motion's spring() function for creating realistic spring animations. Learn how to use it with animate() or directly for advanced scenarios like visualizers and CSS spring generation. Understand key options including keyframes, duration, bounce, damping, mass, and stiffness.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "spring");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# spring

The \`spring\` function is most often used to provide spring functionality to the mini \`[animate()](/docs/animate.md)\` [function](/docs/animate.md).

\`\`\`
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, bounce: 0.3, duration: 0.8 }
)
\`\`\`

However, \`spring\` can also be used directly for low-level, advanced use cases. For instance, creating a spring visualiser.

## Usage

Import \`spring\` from Motion.

\`\`\`
import { spring } from "motion"
\`\`\`

\`spring\` is a function that returns a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

\`\`\`
const generator = spring({ keyframes: [0, 100] })
\`\`\`

This generator can be used to sample to spring at specific times (defined in milliseconds).

As a generator, \`next()\` returns two values, \`value\` and \`done\`.

\`\`\`
const { value, done } = generator.next(10) // Spring state at 10 milliseconds
\`\`\`

The spring can be sampled in a non-linear fashion, meaning you can sample the spring at any time.

\`\`\`
generator.next(100)
generator.next(10)
\`\`\`

### Sampling a spring

For most use-cases, like \`linear()\` easing generation or visualisation, you will probably want to run the generator in time order. You can do this with a normal loop that continues until the spring is done.

\`\`\`
const generator = spring({ keyframes: [25, 75], stiffness: 400 })
const output = []

let isDone = false
let time = 0
const sampleDuration = 20 // ms

while (!isDone) {
  const { value, done } = generator.next(time)

  output.push(value)

  time += sampleDuration

  if (done) isDone = true
}
\`\`\`

## Visualiser

## CSS generation

It's possible to use \`spring()\` to generate CSS transitions.

\`\`\`
element.style.transition = "all " + spring(0.5)
\`\`\`

Read the [CSS generation guide](/docs/css.md) for more details.

## Options

The spring can be configured with a number of options.

#### \`keyframes\`

\`spring\` **must** be provided with two keyframes to animate between. These can be any two **numerical** values.

\`\`\`
spring({ keyframes: [0, 100] })
\`\`\`

### Time options

#### \`duration\`

**Default:** \`800\`

Duration for the entire spring.

#### \`visualDuration\`

If \`visualDuration\` is set, this will override \`duration\`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

#### \`bounce\`

**Default:** \`0.25\`

\`bounce\` determines the "bounciness" of a spring animation.

\`0\` is no bounce, and \`1\` is extremely bouncy.

### Physics options

#### \`damping\`

**Default:** \`10\`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

#### \`mass\`

**Default:** \`1\`

Mass of the moving object. Higher values will result in more lethargic movement.

#### \`stiffness\`

**Default:** \`1\`

Stiffness of the spring. Higher values will create more sudden movement.

#### \`velocity\`

**Default:** Current value velocity

The initial velocity of the spring.

#### \`restSpeed\`

**Default:** \`0.1\`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than \`restDelta\`.

#### \`restDelta\`

**Default:** \`0.01\`

End animation if distance is below this value and speed is below \`restSpeed\`. When animation ends, the spring will end.`
                }
            ]
        };
    });
    // stagger
    server.registerResource("JavaScript: stagger", docsUri("js", "stagger"), {
        description: "Learn to create staggered animations across multiple elements with Motion's stagger() function. Discover options to customize the starting delay, the stagger origin ('first', 'center', 'last', or an index), and apply easing to the stagger distribution.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "stagger");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# stagger

When animating elements with the [animate](/docs/animate.md) function, it's possible to stagger animations across them using \`stagger()\`.

\`\`\`
import { animate, stagger } from "motion"

animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
\`\`\`

## Usage

Import \`stagger\` from Motion.

\`\`\`
import { animate, stagger } from "motion"
\`\`\`

By passing a duration, in seconds, to \`stagger\`, the \`delay\` of each element will be increased by that amount for each animation.

\`\`\`
animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
\`\`\`

## Options

\`stagger\` accepts options via its second argument.

### \`startDelay\`

**Default:** \`0\`

The initial delay from which to calculate subsequent delays.

\`\`\`
stagger(0.1, { startDelay: 0.2 }) // 0.2, 0.3, 0.4...
\`\`\`

### \`from\`

**Default:** \`"first"\`

Specifies which element in the array from which to stagger. Can be set as \`"first"\`, \`"center"\`, \`"last"\`, or a number to specify an index.

### \`ease\`

**Default:** \`"linear"\`

By passing an easing function, staggers can be redistributed through the total stagger time.

Any easing function or [Motion easing](/docs/easing-functions.md) is accepted, like a cubic bezier definition:

\`\`\`
stagger(0.1, { ease: [.32, .23, .4, .9] })
\`\`\`

Name of an easing function:

\`\`\`
stagger(0.1, { ease: "easeOut" })
\`\`\`

Or a custom easing function:

\`\`\`
stagger(0.1, { ease: p => Math.sin(p) })
\`\`\``
                }
            ]
        };
    });
    // transform
    server.registerResource("JavaScript: transform", docsUri("js", "transform"), {
        description: "Discover Motion's transform function to map an input value from one range to another. Learn how to use it with linear input ranges and various output types like numbers, colors, or complex strings.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "transform");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# transform

\`transform\` can map an input value from one range of values to another.

\`\`\`
const numberToColor = transform(
  [0, 100], // Input
  ["#000", "#fff"] // Output
)

numberToColor(50) // rgba(128, 128, 128, 1)
\`\`\`

## Usage

Import \`transform\` from Motion.

\`\`\`
import { transform } from "motion"
\`\`\`

A transformation function can be created by passing two ranges, an **input** range and an **output** range:

\`\`\`
const transformer = transform([0, 100], [0, 360])
\`\`\`

The transformer can now be called with an input value:

\`\`\`
transformer(50) // 180
\`\`\`

*   Both ranges **must always be the same length**.
    
*   The **input range** must always be a linear series of numbers, either counting up or counting down.
    
*   The **output range** can be a non-linear series of numbers, colors, or complex strings.
    

The input and output ranges can accept any number of values:

\`\`\`
const x = [-100, 0, 100, 200]
const opacity = [0, 1, 1, 0]
const transformer = transform(x, opacity)

transformer(-50) // 0.5
transformer(50) // 1
transformer(150) // 0.5
\`\`\`

If \`clamp: false\` is provided, the returned function will map infinitely:

\`\`\`
const transformer = transform([0, 100], [0, 360], { clamp: false })

const rotation = transformer(200) // 720
\`\`\``
                }
            ]
        };
    });
    // wrap
    server.registerResource("JavaScript: wrap", docsUri("js", "wrap"), {
        description: "Learn how to use Motion's wrap() function to constrain a value within a specific range. Ideal for implementing features like next/prev pagination by wrapping values back around when they exceed the defined minimum or maximum.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "wrap");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# wrap

\`wrap\` will take a value and wrap it within a limited range.

\`\`\`
wrap(0, 100, 150) // 50
\`\`\`

This is useful, for instance when creating next/prev pagination.

\`\`\`
const index = wrap(0, numItems, currentIndex + 1)
\`\`\`

## Usage

Import from Motion:

\`\`\`
import { wrap } from "motion"
\`\`\`

\`wrap\` accepts a \`min\` and \`max\`, and a value to wrap through that range.

Values within this range will be unaffected:

\`\`\`
wrap(0, 10, 5) // 5
\`\`\`

When the provided value is outside the range, it'll be wrapped back around:

\`\`\`
wrap(0, 10, 11) // 1
wrap(0, 10, -1) // 9
\`\`\``
                }
            ]
        };
    });
    // FAQs
    server.registerResource("JavaScript: FAQs", docsUri("js", "faqs"), {
        description: "Find answers to common questions about Motion, including browser support, and troubleshooting for animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "faqs");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# FAQs

## Browser support?

Motion supports all modern browsers. It **doesn't support** Internet Explorer 11 or below.

## Why is my animation finishing instantly?

There are a couple reasons an animation might appear to finish instantly.

### 1\\. Your browser doesn't support \`CSS.registerProperty\`

If you're animating CSS variables and your browser doesn't support the [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API), animations will finish instantly.

1.  ### \`scale: 0\` in Safari
    

There's a bug in older versions of Safari where animating to \`scale(0)\` completes instantly.`
                }
            ]
        };
    });
    // GSAP vs Motion: Which should you use?
    server.registerResource("JavaScript: GSAP vs Motion: Which should you use?", docsUri("js", "gsap-vs-motion"), {
        description: "Compare Motion and GSAP, two leading JavaScript animation libraries. Discover Motion's advantages in bundle size, hardware acceleration via native browser APIs, and its open-source model, vs GSAP's features.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "gsap-vs-motion");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# GSAP vs Motion: Which should you use?

When deciding which JavaScript animation library to trust for your project, two libraries often get mentioned because of their feature set and popularity: **Motion** (formerly Framer Motion) and **GSAP** (formerly GreenSock).

Both can create stunning animations, but they have fundamental differences. This guide compares Motion and GSAP on **adoption**, **licensing**, **performance**, and **features** (complete with full comparison table), to help you decide which is right for your project.

## Adoption

Before delving into the libraries themselves, it's helpful to see what other developers are choosing. For modern applications, [npm](https://www.npmjs.com/package/framer-motion) is a great measure of a library's adoption and momentum.

Here, the numbers are clear: **Motion is growing exponentially,** making it the most-used and fastest-growing animation library in the ecosystem. It even just passed **10 million downloads per month**.

![Graph of Motion npm downloads 2021-2025](https://framerusercontent.com/images/mnKpEm91tNi6LNEueLOI8jxUp5k.png)

## Licensing

Motion is **fully independent** and **MIT open source**. It's financially supported by a mix of incredible industry-leading sponsors like [Framer](https://framer.com), [Figma](https://figma.com), [Sanity](https://www.sanity.io/), [Tailwind CSS](https://tailwindcss.com) and [LottieFiles](https://lottiefiles.com), as well as sales from [Motion+](https://motion.dev/plus).

GSAP, by contrast, is **closed source** and **owned and funded by Webflow**. While it can be used for free in many projects, [its license](https://gsap.com/community/standard-license/) contains a critical restriction: You're prohibited from using GSAP in any tool that competes with Webflow. Furthermore, its license states that **Webflow can terminate it at its discretion**.

With Motion, you have a **guarantee of freedom**. That MIT license is irrevocable. You will never be forced to remove and replace your animation library because of a business decision made by another company. This provides the stability and peace of mind that professional development teams require.

Motion's independence and self-sufficiency also means we work with a broad base of users and companies, creating a library that works for the whole web, rather than the interests of a single company.

## Performance

Performance is more than just smooth animations. It's about providing a flawless 120fps, faster start-up times, and minimal bundle sizes. This is where Motion's modern architecture provides an advantage.

### Hardware accelerated animations

You might already know that for best animation performance you should stick to animating \`opacity\` , \`transform\`, \`filter\` and \`clipPath\`, because these styles [can be rendered entirely on the GPU](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing).

But when animating with Motion, these values can enjoy an extra performance boost using "hardware accelerated" animations. This means the animations themselves also run entirely the GPU - separate from the JavaScript running on your CPU.

This means if your website or app is performing heavy work, **animations remain smooth**.

To illustrate, in the following example the ball on the left is animated with Motion, and the ball on the right by a traditional animation library. Press the "Block JavaScript" button to block JS execution for two seconds:

In the majority of browsers, the left ball will continue animating at 60/120fps, even as the website becomes unresponsive. Traditional animation libraries like GSAP will pause and stutter where Motion remains perfectly smooth.

What's more, Motion can even perform hardware accelerated [scroll animations](/docs/scroll.md). Because browsers render all scroll on the GPU, JS-based scroll animations are always slightly out-of-sync. Not so with Motion.

\`\`\`
const animation = animate(element, { opacity: [0, 1] })

scroll(animation)
\`\`\`

### Start-up time

Two animate any two values, they have to be mixable. Think, two numbers, or two colors. But what if we want to perform an animation where we don't even know the initial value? Or we do - but it's a value like \`height: auto\`, or a color defined in a CSS variable like \`var(—my-color)\`?

To make these values mixable, the library first needs to **measure** them. But measuring something that's just been rendered forces a layout or style calculation. These are slow.

To solve this, Motion introduced **deferred keyframe resolution**. This ensures we batch all measurements into a single operation, drastically reducing style and layout calculations.

In benchmarks, Motion is **2.5x faster** than GSAP at animating from unknown values, and **6x faster** at animating between different value types.

![Comparison between Motion 10/GSAP and Motion 11's deferred keyframe resolution. Motion 11 is 2.5x faster to animate unknown values and 6x faster at unit conversion.](https://framerusercontent.com/images/muzCL6FZAQhe3Hsd69UMFkFag.png)

This is great for user experience, and also great for performance scores like Interaction to Next Paint (INP).

### Bundle size

Motion is built with a modern, modular architecture. If your bundler supports tree-shaking (like Vite, Rollup or Webpack), you only ever include the code you actually use. GSAP's older architecture, by contrast, means that importing any part of the library includes all of it.

This, combined with Motion's focus on leveraging native browser APIs, results in a significantly smaller footprint.

Library

Size

\`animate()\` (mini)

2.6kb

\`animate()\` (full)

18kb

GSAP

23kb

A smaller bundle means a **faster site load and a better user experience**, especially on mobile devices. With Motion, you can deliver stunning animations with a minimal performance cost.

## Features

Of course, performance means little if a library can't deliver the features you need. While there is plenty of overlap, both libraries have unique strengths.

### React & Vue APIs

Motion provides a first-class, declarative API that is a natural extension of [React](/docs/react.md) and [Vue](/docs/vue.md). Animations are defined directly in your components via props, keeping your code clean, readable and easy to maintain.

\`\`\`
<motion.div animate={{ x: 100 }} />
\`\`\`

GSAP, by contrast, uses an imperative model. While it has a \`useGSAP\` hook to help integrate into React's lifecycles, it still requires using refs. Mixing its imperative API into React's declarative components leads to more verbose and error-prone code.

\`\`\`
const container = useRef()

useGSAP(() => {
  gsap.to(".box", { x: 100 })
}, { scope: container })

return (
  <div ref={container}>
    <div className="box"></div>
  </div>
);
\`\`\`

Furthermore, Motion for React and Vue features an **industry-leading** [**layout animation**](/docs/react-layout-animations.md) **engine**, which goes far beyond the FLIP animations in GSAP.

### Timelines & sequencing

GSAP is famous for its powerful timeline function, which uses an imperative, chain-based API to build complex animation sequences. It's mature, and an industry standard for good reason.

\`\`\`
const tl = gsap.timeline()
tl.to("h1", { opacity: 1 })
tl.to("p", { y: 0 }, "-=0.5")
\`\`\`

Motion provides a modern, declarative alternative. Instead of chain-based commands, \`animate()\` accepts a simple JavaScript array, making it easy to read, modify and dynamically generate animation sequences.

\`\`\`
animate([
  ["h1", { opacity: 1 }],
  ["p", { y: 0 }, { at: "-0.5" }]
])
\`\`\`

This timeline can animate anything the \`animate()\` function can, mixing HTML elements, SVG elements, [motion values](/docs/motion-value.md), and even 3D objects from libraries like Three.js - all within the same sequence. As mentioned earlier, it's also 5kb lighter.

The benefit to GSAP's timeline API is that it's **mutable**. Once playback has begun, individual tracks can be added and removed to the overarching sequence, an ability that Motion doesn't yet offer.

### Full feature comparison table

This table compares Motion's mini and full-size \`animate\` functions functions with GSAP's \`gsap\` object.

#### Key

*   ✅ Supported
    
*   ❌ Not supported
    
*   ⏩ Support relies on modern browser features
    
*   🚧 In development
    
*   ⚠ Partial support
    
*   ⚛️ React/Vue only
    

  

\`animate\` mini

\`animate\`

GSAP

Core bundlesize (kb)

2.6

18

23.5

#### General

  

  

  

MIT license

✅

✅

❌

Accelerated animations

✅

✅

❌

[React API](/docs/react.md)

❌

✅ (+15kb)

❌

[Vue API](/docs/vue.md)

❌

✅ (+15kb)

❌

#### Values

  

  

  

Individual transforms

❌

✅

✅

[Complex transform  
interpolation](https://codesandbox.io/s/transform-interpolation-motion-concept-c-vs-greensock-vs-anime-js-m90tc)

✅

❌

✅

[Named colors](https://codesandbox.io/s/named-color-animations-comparison-motion-concept-c-vs-greensock-vs-anime-js-vbkey)

✅

❌

⚠ (20)

[Color type  
conversion](https://codesandbox.io/s/animation-between-color-types-motion-concept-c-vs-greensock-vs-anime-js-gvip9)

✅

✅

✅

[To/from CSS  
variables](https://codesandbox.io/s/animating-to-from-css-variables-motion-concept-c-vs-greensock-vs-anime-js-yxz1z)

✅

✅

❌

To/from CSS  
functions

✅

❌

❌

Animate CSS  
variables

✅ ⏩

✅

✅

Simple keyframes

syntax

✅

✅

✅

Wildcard keyframes

✅

✅

❌

Relative values

❌

❌

✅

#### Output

  

  

  

Element styles

✅

✅

✅

Element attributes

❌

✅

✅

Custom animations

❌

✅

✅

#### Options

  

  

  

Duration

✅

✅

✅

Direction

✅

✅

✅

Repeat

✅

✅

✅

Delay

✅

✅

✅

End delay

✅

❌

✅

Repeat delay

❌

✅

✅

#### Stagger

  

  

  

Stagger

✅ (+0.1kb)

✅ (+0.1kb)

✅

Min delay

✅

✅

✅

Ease

✅

✅

✅

Grid

❌

❌

✅

#### Layout

  

  

  

Animate layout

❌

⚠ (View)

⚠ (FLIP)

Transform-only

❌

✅ ⚛️

❌

Scale correction

❌

✅ ⚛️

❌

#### Timeline

  

  

  

Timeline

✅ (+0.6kb)

✅

✅

Selectors

✅

✅

✅

Relative offsets

✅

✅

✅

Absolute offsets

✅

✅

✅

Start of previous  
offset

✅

✅

✅

Percentage offsets

❌

❌

✅

Label offsets

✅

✅

✅

Segment stagger

✅

✅

✅

Segment keyframes

✅

✅

❌

#### Controls

  

  

  

Play

✅

✅

✅

Pause

✅

✅

✅

Finish

✅

✅

✅

Reverse

❌

❌

✅

Stop

✅

✅

✅

Playback rate

✅

✅

✅

#### Easing

  

  

  

Linear

✅

✅

✅

Cubic bezier

✅

✅

✅

Steps

✅

✅

✅

Spring

✅ (+1kb)

✅

❌

Spring physics

❌

✅

❌

Inertia

❌

✅

✅

Custom easing  
functions

✅ ⏩

✅

✅

#### Events

  

  

  

Complete

✅

✅

✅

Cancel

✅

✅

✅

Start

❌

✅

✅

Update

❌

✅

✅

Repeat

❌

❌

✅

#### Path

  

  

  

Motion path

✅ ⏩

✅ ⏩

✅ (+9.5kb)

[Path morphing](https://codesandbox.io/s/motion-one-morph-svg-paths-qldsz?file=/src/index.js)

❌

✅ (+[Flubber](https://examples.motion.dev/react/path-morphing))

✅

Path drawing

✅

✅

✅

#### Scroll

  

  

  

[Scroll trigger](https://motion.dev/dom/in-view)

✅ (+0.5kb)

✅ (+0.5kb)

✅ (+12kb)

[Scroll-linked  
animations](https://motion.dev/dom/scroll)

✅ (+2.5kb)

✅ (+2.5kb)

✅ (+12kb)

Hardware accelerated  
animations

✅

✅

❌

#### Extra Features

  

  

  

AnimateNumber

⚛️ (Motion+)

⚛️ (Motion+)

❌

Cursor

⚛️ (Motion+)

⚛️ (Motion+)

❌

Split Text

✅ (Motion+)

✅ (Motion+)

✅

Ticker

⚛️ (Motion+)

⚛️ (Motion+)

❌

Typewriter

⚛️ (Motion+)

⚛️ (Motion+)

❌

View animations

⚛️ (Motion+)

⚛️ (Motion+)

❌

## Conclusion

**Both Motion and GSAP are powerful, production-ready libraries capable of creating stunning, award-winning animations.** The best choice depends entirely on the priorities of your project and team.

### When to use Motion?

You should choose **Motion** if your priority is **overall performance, a smaller bundle size, and a modern developer experience.** Its use of native browser APIs, first-class React/Vue support, and truly open-source MIT license make it the definitive choice for building fast, modern web applications.

### When to use GSAP?

You might still prefer **GSAP** if your project requires **intricate, timeline-sequenced animations on non-React sites**. Its maturity and long history mean it is a reliable, if more traditional, choice.`
                }
            ]
        };
    });
    // Improvements to Web Animations API
    server.registerResource("JavaScript: Improvements to Web Animations API", docsUri("js", "improvements-to-the-web-animations-api-dx"), {
        description: "Discover how Motion enhances the Web Animations API (WAAPI) with features like spring animations, custom easings, default value types, improved animation state persistence, and independent transform animations. Learn about Motion's hybrid engine for hardware-accelerated performance.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "improvements-to-the-web-animations-api-dx");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Improvements to Web Animations API

Motion is the only animation library with a hybrid engine, meaning its capable of dynamically running animations either via \`requestAnimationFrame\` or via the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (WAAPI).

This allows it to animate any value, for any render target (DOM, Three.js, canvas) while also retaining the ability to run animations with hardware acceleration.

Its \`animate\` function comes in two sizes, **mini** (2.3kb) and **hybrid** (17kb).

Both functions provide a number of improvements to the feature set and developer experience of WAAPI, in this guide we'll take a look at some.

## Springs and custom easing functions

CSS and WAAPI only support in-built easing functions like \`"back-in"\`, \`"ease-in-out"\` etc.

Motion extends that to support any custom easing function by automatically generating a \`linear()\` CSS easing definition in modern browsers, with a safe fallback in older browsers

\`\`\`
animate(
  "li",
  { opacity: 1 },
  { ease: mirrorEasing(Math.sin) }
)
\`\`\`

Additionally, it supports \`spring\` animations in \`animateStyle\` by compiling the spring into a \`linear()\` easing and computing the appropriate \`duration\`. Whereas in the \`animate\` function it will pre-calculate the actual keyframes for real physics-based animations.

\`\`\`
import { animate } from "motion/dom"
import { spring } from "motion"

animate(
  "li",
  { transform: "translateX(100px)" },
  { type: spring, stiffness: 400 }
)
\`\`\`

## Default value types

WAAPI always expects a unit type for various animatable values, which can be easy to forget.

\`\`\`
element.animate({ width: "100px" })
element.animate({ width: 100 }) // Error!
\`\`\`

Motion knows the default value type for all popular values.

\`\`\`
animate(element, { width: 100 })
\`\`\`

## \`.finished\` Promise

As a newer part of the WAAPI spec, the \`animation.finished\` \`Promise\` isn't supported in every browser. Motion will polyfill it in those browsers:

\`\`\`
const animation = animate("#box", { opacity: 0 })

// Async
await animation

// Promise
animation.then(() => {})
\`\`\`

## Durations as seconds

In WAAPI (and a subset of other JavaScript animation libraries), durations are set as milliseconds:

\`\`\`
const animation = element.animate({ x: 50 }, { duration: 2000 })
animation.currentTime = 1000
\`\`\`

During development of [Framer Motion](https://framer.com/motion), user testing revealed that most of our audience find seconds a more approachable unit. So in Motion, durations are defined in seconds.

\`\`\`
const animation = animate(element, { x: 50 }, { duration: 2 })
animation.currentTime = 1
\`\`\`

## Persisting animation state

In a typical animation library, when an animation has finished, the element (or other animated object) is left in the animation's final state.

But when you call WAAPI's \`animate\` function like this:

\`\`\`
element.animate({ opacity: 0 })
\`\`\`

This is the result:

The animation ends in its initial state!

WAAPI has an option you can set to fix this behaviour. Called \`fill\`, when set to \`"forwards"\` it will persist the animation beyond its timeline.

\`\`\`
element.animate({ opacity: 0 }, { fill: "forwards" })
\`\`\`

But this is discouraged even in the [official spec](https://www.w3.org/TR/web-animations-1/#fill-behavior). \`fill: "forwards"\` doesn't exactly change the behaviour of the animation, it's better to think of it keeping the animation active indefinitely. As WAAPI animations have a higher priority than \`element.style\`, the only way to change the element's styles while these animations are active is with more animations!

Keeping all these useless animations around can also lead to memory leaks.

The spec offers two solutions. One, adding a \`Promise\` handler that manually sets the final keyframe target to \`element.style\`:

\`\`\`
await element.animate({ opacity: 0 }, 200).finished
  
element.style.opacity = 0
\`\`\`

The second is to immediately set \`element.style\` to the animation target, then animate from its current value and let the browser figure out the final keyframe itself.

\`\`\`
const opacity = element.style.opacity
element.style.opacity = 1
element.animate({ opacity, offset: 0 }, 200)
\`\`\`

Each approach has pros and cons. But a major con they both share is making the user decide. These are unintuitive fixes to an unintuitive behaviour, and whichever is chosen necessitates a wrapping library because repeating these brittle patterns is bad for readability and stability.

So instead, Motion's \`animate\` function will actually animate _to_ a value, leaving in its target state once the animation is complete.

\`\`\`
animate(element, { opacity: 0 })
\`\`\`

## Stop animations

WAAPI's \`animate\` function returns an \`Animation\`, which contains a \`cancel\` method.

\`\`\`
const animation = element.animate({ opacity: 0 }, { duration: 1000 })
setTimeout(() => { animation.cancel()}, 500)
\`\`\`

When \`cancel\` is called, the animation is stopped **and** "removed". It's as if the animation never played at all:

Motion adds a \`stop\` method. This cancels the animation but also leaves the element in its current state:

\`\`\`
const animation = animate(element, { opacity: 0 }, { duration: 1000 })
setTimeout(() => { animation.stop()}, 500)
\`\`\`

## Partial/inferred keyframes

In early versions of the WAAPI spec, two or more keyframes must be defined:

\`\`\`
element.animate({ opacity: [0.2, 1] })
\`\`\`

However, it was later changed to allow one keyframe. The browser will infer the initial keyframe based on the current visual state of the element.

\`\`\`
element.animate({ opacity: 1 })
\`\`\`

Some legacy browsers, including the common WAAPI polyfills, only support the old syntax. Which means if you try and use WAAPI as currently documented, it will throw an error in many older browsers.  
Motion's \`animate\` function automatically detects these browsers and will generate an initial keyframe from \`window.getComputedStyle(element)\` where necessary.

## Interrupting animations

WAAPI has no concept of "interrupting" existing animations. So if one animation starts while another is already playing on a specific value, the new animation simply "overrides" the existing animation.

If the old animation is still running when the new one finishes, the animating value will appear to "jump" back to the old animation.

\`\`\`
element.animate(
  { transform: ["none", "translateX(300px)"] },
  { duration: 2000, iterations: Infinity, direction: "alternate" }
)
  
setTimeout(() => {
  element.animate({ transform: "none" }, { duration: 500 })
}, 500)
\`\`\`

Motion automatically interrupts the animation of any values passed to \`animate\` and animates on to the new target:

\`\`\`
animate(
  element,
  { transform: "translateX(300px)" },
  { duration: 2, iterations: Infinity }
)
  
setTimeout(() => {
  animate(element, { transform: "none" }, { duration: 500 })
}, 500)
\`\`\`

## Cubic bezier definitions

In WAAPI, cubic bezier easing is defined as a CSS string:

\`\`\`
element.animate(
  { transform: "translateX(50px)" },
  { easing: "cubic-bezier(0.29, -0.13, 0.18, 1.18)" }
)
\`\`\`

This kind of definition will work in Motion, but we also allow this shorthand array syntax:

\`\`\`
animate(
  element,
  { transform: "translateX(50px)" },
  { ease: [0.29, -0.13, 0.18, 1.18] }
)
\`\`\`

## Independent transforms (\`animate\`\\-only)

Because CSS doesn't offer styles for \`x\`, \`scaleX\` etc, you can't animate these properties with WAAPI. Instead, you have to animate the full \`transform\` string:

\`\`\`
element.animate({ transform: "translateX(50px) scaleX(2)" })
\`\`\`

This isn't just a matter of developer aesthetics. It means it's literally impossible to animate these properties with separate animations, or with different animation options.

Some modern browsers allow \`translate\`, \`scale\` and \`rotate\` to be defined and animated separately, but even then you can't animate the axis of each.

Motion still allows the animation of \`transform\`, but adds the ability to animate all transforms individually, for all axes:

\`\`\`
animate(element, { x: 50, scaleX: 2 })
\`\`\`

Which means you can also animate them with different options:

\`\`\`
animate(
  element,
  { x: 50, scaleX: 2 },
  { x: { duration 2 }, scaleX: { repeat: 1 } }
)
\`\`\``
                }
            ]
        };
    });
    // Migrate from GSAP to Motion
    server.registerResource("JavaScript: Migrate from GSAP to Motion", docsUri("js", "migrate-from-gsap-to-motion"), {
        description: "Migrate from GSAP to Motion for hardware-accelerated animations, smaller bundle sizes, and an open MIT license. Learn to convert basic animations, timelines, scroll-triggered/linked animations, and React animations to Motion.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "migrate-from-gsap-to-motion");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Migrate from GSAP to Motion

GSAP is an incredible animation library. But, you can achieve all of the same effects using Motion, with hardware accelerated performance, often for a far smaller bundlesize.

Unlike GSAP, Motion doesn't need a costly yearly license to run on commercial websites, as its supported by [corporate sponsors](https://motion.dev/sponsor) and optional Motion+ memberships.

By the end of this guide we'll have learned the benefits and drawbacks of migrating, and also how to migrate basic animations, timeline sequences, scroll-linked and scroll-triggered animations, and React animations.

## Benefits

Motion is built on modern browser APIs like [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (WAAPI) and [Scroll Timeline](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline), which is what enables it to offer hardware acceleration for common animations like \`transform\`, \`filter\` and \`opacity\`.

There are other optimisations, like using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for scroll-triggered animations rather than measuring the scroll position every frame (which can trigger style recalculations).

Likewise, when you start an animation with the \`animate\` function and it needs to read initial styles from the DOM, that process is batched and optimised, reducing layout thrashing and style recalculations.

Motion's APIs are generally smaller than GSAP too, with our \`[scroll](/docs/scroll.md)\` [function](/docs/scroll.md) is just 75% the size of its GSAP equivalent, and the mini \`[animate](/docs/animate.md)\` [function](/docs/animate.md) 90% smaller at just 2.3kb. Even the full-sized \`animate\` function, which offers timeline sequencing, independent transform animations, and more, is 18kb, smaller than the GSAP animation functions.

Finally, because Motion is built with ES modules, it is tree-shakable. Which means if you only import the \`scroll\` function, then only this code will end up being delivered to your users. This is an immediate SEO benefit of a few Lighthouse performance points.

## Drawbacks

A robust feature comparison with GSAP can be found in our [feature comparison guide](/docs/gsap-vs-motion.md), but the biggest missing feature from the Motion JavaScript API is [layout animations](/docs/react-layout-animations.md).

Motion for React's layout animations go far beyond traditional "FLIP" techniques, with every animation performed with transforms, full scale correction for children and \`border-radius\`, and more. So if you are a keen user of GSAP's FLIP functionality then Motion doesn't offer a comparable API yet.

GSAP is also geared squarely towards power users, with APIs that we don't believe are used by the majority of users, like the ability to get/set a \`delay\` after an animation has started. Motion's philosophy is to tend towards a more accessible, smaller API, and this is shown in the relative filesizes.

Finally, \`animate\`'s \`onUpdate\` callback is currently only available for animating single values, though this will change in the future.

## Migrate

For this guide, we're going to take a look at the examples given in the [GSAP documentation](https://gsap.com/) and see how we'd rewrite them in Motion.

### Basic animations

The "Hello world' of JavaScript animations, a rotating box. In GSAP, this would be written with \`gsap.to\`:

\`\`\`
gsap.to("#animate-anything-css", {
  duration: 10,
  ease: "none",
  repeat: -1,
  rotation: 360,
})
\`\`\`

Motion's basic animation function is \`[animate](/docs/animate.md)\`:

\`\`\`
animate(
  "#animate-anything-css",
  { rotate: 360 },
  { ease: "linear", duration: 10, repeat: Infinity }
)
\`\`\`

You can see here that it looks broadly similar, with a couple of key differences.

1.  \`rotate\` instead of \`rotation\`
    
2.  \`repeat: Infinity\` instead of \`-1\` for infinitely-repeating animations
    
3.  \`ease: "linear"\` instead of \`ease: "none"\`
    

Something else to note is that in GSAP the options and animating values are all bundled in together. Whereas with Motion, these are separate objects. This isn't of huge practical importance but when animating a plain object it means that object can't have properties with the same name as GSAP options.

GSAP has two other animation methods, \`fromTo\` and \`from\`.

\`fromTo\` allows you to specify start and end keyframes:

\`\`\`
gsap.fromTo(".box", { opacity: 0 }, { opacity: 0.5, duration: 1 })
\`\`\`

With Motion, you just use the keyframe syntax:

\`\`\`
animate(".box", { opacity: [0, 0.5] }, { duration: 1 })
\`\`\`

This type of syntax (or equivalent also exists in GSAP, but \`fromTo\` is more of a legacy API.

\`from\` allows you to define values to animate **from**, with the target values being read from the DOM.

\`\`\`
gsap.from(".box", { opacity: 0 })
\`\`\`

Motion doesn't have a comparable API to this, but this is partly because we don't recommend it. Practically what has to happen here is GSAP reads the existing value from the DOM, set this as a target value, then animate from the given value. Unless the user writes their JavaScript to be render-blocking (discouraged), this "incorrect" style will be visible for a frame or more, which is rarely what we want.

### Animation controls

Both GSAP and Motion animations return animation controls. GSAP offers far more here. For instance, each animation option gets a method to get/set that option, whereas Motion tends towards the immutability of options.

\`\`\`
const animation = gsap.to()

animation.delay(0.5) // No Motion equivalent
\`\`\`

However, there are some Motion equivalents to know about.

*   \`.timeScale()\` is \`.speed\`
    
*   \`.time()\` is \`.time\`
    
*   \`.kill()\` is \`.stop()\`
    
*   \`.revert()\` is \`.cancel()\`
    
*   \`.progress(1)\` is \`.complete()\`
    
*   \`.resume()\` is \`.play()\`
    

### Timeline sequencing

Both Motion and GSAP offer timeline sequencing. The fundamental difference is that GSAP has a more imperative API, with a \`.timeline()\` constructor and \`.to\`, \`.add()\` and \`.addLabel()\` methods used to compose/amend the timeline:

\`\`\`
const timeline = gsap.timeline(options)

timeline.to("#id", { x: 100, duration: 1 })
timeline.addLabel("My label")
timeline.to("#id", { y: 50, duration: 1 })
\`\`\`

Whereas Motion uses a declarative array syntax:

\`\`\`
const timeline = [
  ["#id", { x: 100, duration: 1 }],
  "My label",
  ["#id", { y: 100, duration: 1 }]
]

animate(timeline, options)
\`\`\`

The benefit of the GSAP approach is it's easier to dynamically change a timeline in progress. Whereas with Motion, it's a little less boilerplate to compose long animations.

Composing multiple timelines is different in each library, much as above:

\`\`\`
// GSAP
timeline.add(timelineA)
timeline.add(timelineB)

// Motion
const timeline = [...timelineA, ...timelineB]
\`\`\`

### Scroll-triggered animations

Scroll-triggered animations are normal time-based animations that trigger when an element enters the viewport.

GSAP has the \`[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1)\` [](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1)plugin whereas Motion uses \`[inView](/docs/inview.md)\` function.

\`\`\`
// GSAP
gsap.to('.box', {
  scrollTrigger: '.box',
  x: 500
})

// Motion
inView(".box", ({ target }) => {
  animate(target, { x: 500 })
})
\`\`\`

There fundamental technical difference between the two is \`inView\` is based on the browser's Intersection Observer API, which is a super-performant way of detecting when elements enter the viewport. Whereas \`ScrollTrigger\` measures the element and then tracks its position relative to scroll every frame. These reads/writes cause style recalculations.

Additionally, as \`inView\` only triggers when the tracked element enters the viewport, it means scroll-triggered animations are lazily initialised. In combination with Motion's deferred keyframe resolution, this can result in drastically shorter startup times when using many scroll-triggered animations.

### Scroll-pinning

GSAP has an option called \`pin\`. If set, this will \`pin\` the element to the viewport during the [scroll animation](/docs/react-scroll-animations.md). For performance reasons, we recommend using CSS \`position: sticky\` instead.

### Scroll-linked animations

By passing \`scrub: true\` to \`scrollTrigger\`, GSAP can create scroll-linked animations. These are fundamentally different in that instead of animations being driven by time, they're being driven by scroll progress instead.

\`\`\`
gsap.to('.box', {
    scrollTrigger: {
      trigger: '.box',
      scrub: true
    }
    x: 500
});
\`\`\`

In Motion, these kinds of animations are driven by the \`[scroll](/docs/scroll.md)\` [function](/docs/scroll.md).

\`\`\`
const animation = animate(element, { x: 500 })
scroll(animation, { target: element })
\`\`\`

\`scroll\` is different in that, much like \`animate\` can use the Web Animations API for hardware accelerated performance, \`scroll\` can use the Scroll Timeline API for two performance benefits:

*   Enables hardware accelerated scroll animations
    
*   Can measure scroll progress for callbacks without polling scroll position (removing style recalculations)
    

Instead of \`start\` and \`end\` offset options, \`scroll\` accepts a single \`offset\` array, with options much like those found in GSAP.

\`\`\`
scroll(callback, {
  target: element,
  offset: ["start start", "end start"] // Exits the viewport top
})
\`\`\`

You can see here that instead of using \`"top"\`/\`"bottom"\`, or \`"left"\`/\`"right"\`, Motion uses the axis-agnostic \`"start"\` and \`"end"\` keywords.

The benefit of a single \`offset\` option is we can map more than two offsets to more than two animation keyframes. Here's an animation where the element fades in and out of the viewport:

\`\`\`
const animation = animate(element, { opacity: [0, 1, 1, 0] })

scroll(animation, {
  target: element,
  offset: [
    // When the target starts entering the bottom of the viewport, opacity = 0
    "start end",
    // When the target is fully in the bottom of the viewport, opacity = 1
    "end end",
    // When the target starts exiting the top of the viewport, opacity = 1
    "start start",
    // When the target is fully off the top of the viewport, opacity = 0
    "end start"
  ]
})
\`\`\`

### SplitText

Motion has an equivalent for the Club GSAP API \`SplitText\` for [Motion+](https://motion.dev/plus) members called \`[splitText](/docs/split-text.md)\`.

It works in much the same way as \`SplitText\` without the need to register a plugin:

\`\`\`
animate(
  splitText("h1").chars,
  { opacity: [0, 1] }
)
\`\`\`

Unlike GSAP's \`SplitText\`, Motion's \`splitText\` correctly applies the \`aria-label\` attribute to the original element with the original text, to ensure it can be read correctly by screen readers.

The main drawback to \`splitText\` vs GSAP is that it doesn't yet respect nested tags, like \`a\` tags. GSAP's \`SplitText\` is around 4kb whereas Motion's \`splitText\` is 0.7kb, so handling cases like this can add a significant overhead. It's possible to fix this by wrapping the text before/after the tag with its own \`span\` and splitting these individually:

\`\`\`
<h2>
  <span class="before">Before</span>
  <a href="#">Link</a>
  <span class="after">After</span>
</h2>

<script>
  const chars = [
    ...splitText(".before").chars,
    ...splitText("a").chars,
    ...splitText(".after").chars,
  ]
</script>
\`\`\`

### React

Motion began life as a React animation library: Framer Motion. As such, its suite of [React APIs](/docs/react.md) goes far beyond GSAP's \`useGSAP\` function.

That said, you can achieve a similar pattern for a smaller bundlesize with Motion's \`[useAnimate](/docs/react-use-animate.md)\` [hook](/docs/react-use-animate.md).

Take this rotating cube example from the GSAP docs:

\`\`\`
const RotatingCube = () => {
  const boxRef = useRef()

  useGSAP(() => {
    gsap.to(boxRef.current, {
      duration: 10,
      repeat: -1,
      rotation: 360,
    })
  })

  return <div ref={boxRef} />
}
\`\`\`

We can rewrite this with Motion's mini \`useAnimate\`, which offers a React interface to the 2.3kb \`animate\` function.

\`\`\`
import { useAnimate } from "motion/react-mini"

const RotatingCube = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const animation = animate(
      scope.current,
      { transform: "rotate(360deg)" },
      { duration: 10, repeat: Infinity }
    )

    return () => animation.stop()
  }, [])

  return <div ref={scope} />
}
\`\`\`

Now we're running the same effect with 90% less code included in the bundlesize, plus the animation is running with hardware acceleration, which means fewer stutters (especially during React re-renders.

If you wanted to use \`{ rotate: 360 }\` like in the GSAP example then that's also possible by using the hybrid \`animate\` function:

\`\`\`
import { useAnimate } from "motion/react"
\`\`\`

## Conclusion

Although Motion and GSAP's feature sets don't fully overlap, thanks to modern practises and new browser APIs we think the majority of users will see better performance and lower filesizes by migrating to Motion.

Are there more GSAP features you'd like to see covered in this guide? Or a GSAP feature you'd like to see in Motion? [Let me know](https://twitter.com/mattgperry)!`
                }
            ]
        };
    });
    // Animation performance
    server.registerResource("JavaScript: Animation performance", docsUri("js", "performance"), {
        description: "Boost web animation performance by understanding rendering and hardware acceleration. Learn which CSS properties to animate for smooth 120fps+ experiences, how to optimize rendering, and how Motion leverages hardware acceleration for jank-free animations.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "performance");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Animation performance

There are two primary factors that contribute to the performance of a [web animation](/): **rendering**, and **hardware acceleration**.

Rendering is the process of taking an update to the DOM and reflecting that change on screen. This affects the performance of **all animations**.

Hardware acceleration is the ability to run an animation off the main JavaScript thread. This affects the performance of **animations that run at the same time as other JS processes**, like React rendering or other data crunching.

Let's take a deeper look at each.

## Rendering

When we update the styles an element:

\`\`\`
element.style.height = "500px"
\`\`\`

The browser needs to reflect this change by re-rendering the page, taking the HTML and CSS and turning it into an image that shows on your screen.

Generally speaking, the steps a browser's renderer takes to do this are:

1.  **Layout**: Calculate the size and position of elements on the page
    
2.  **Paint**: Draw the page into graphical **layers** - essentially individual images that make up the page
    
3.  **Composite**: Draw these layers to the viewport.
    

As a rule of thumb, it is quicker to do less work.

### Slow rendering

For instance, if we update one element's \`height\`, this changes the size of the element. Changing the size of an element might then affect the size and/or position of a sibling or child element, which itself might have knock-on effects, and so on. So we need to recalculate the layout of all the affected elements.

Whenever the layout of a page changes, the browser also needs to repaint and recomposite the affected layers too. Many styles affect layout, like \`height\`, \`border-width\`, \`padding\`, \`position\`, etc.

Smooth animations usually run at 60 frames a second (fps), the same as most screen refresh rates. So if we want to change the \`height\` of an element at 60fps, we need to be able to re-render in 16.7 milliseconds. Screens and browsers are increasingly capable of animating at 120fps, so this time window can be reduced further to 8ms.

Re-renders can easily take upwards of 100ms! This is why animating layout is so often discouraged.  
However, this isn't a hard and fast rule. If an element's layout is isolated, for instance it has \`position: absolute\` and very few children, then you might be able to animate it smoothly. Just make sure you test these animations on low-powered devices.

### Fast rendering

The best performing styles are those that trigger only the third rendering step, the compositor.  
In every modern browser, \`transform\` and \`opacity\` will operate directly on a layer. These are therefore the safest values to animate across all devices.

Browsers are adding more values to this list, too. For instance, Chrome and Firefox handle \`filter\` and SVGs entirely on the compositor, and Chrome is adding support for \`background-color\` and \`clip-path\` soon.

Additionally, because Motion is built on the Web Animations API, browsers are smart enough to automatically place elements animating these values on a new graphical layer.

### Everything in-between

There are also plenty of values like \`box-shadow\` and \`border-radius\` that can be updated without triggering a render, but do require a potentially expensive paint (step 2).

You should **always** test the animation of these properties on low-powered devices.

However, there are still ways you can improve the performance of these animations.

#### Reduce layer size

First, the time a browser takes to repaint a layer is proportional to its size. So you can improve the performance of these animations by making smaller layers.

You can hint to the browser that they should create a new layer by setting the \`[willChange](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)\` [style](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) to \`"transform"\`:

\`\`\`
element.style.willChange = "transform"
animate(element, { borderRadius: "50%" })
\`\`\`

  
Creating new layers doesn't come for free. Each takes space on the GPU. So do so sparingly.

#### Use alternative styles

Second, you can try replacing styles will better-performing alternatives.

We've already seen that browsers are improving support for \`filter\` on the compositor. So instead of animating \`boxShadow\`, animate \`[filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)\` [with the](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) \`[drop-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)\` [function](https://developer.mozilla.org/en-US/docs/Web/CSS/filter):

\`\`\`
// ❌
animate(element, { boxShadow: "10px 10px black" })

// ✅
animate(element, { filter: "drop-shadow(10px 10px black)" })
\`\`\`

  
Likewise, browsers are adding \`clipPath\` to the compositor. So instead of animating \`borderRadius\`, animate \`[clipPath](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)\` [with the](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) \`[inset](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)\` [function](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path):  
  

\`\`\`
// ❌
animate(element, { borderRadius: "50px" })

// ✅
animate(element, { clipPath: "inset(0 round 50px)" })
\`\`\`

###   
Which is which?

So how do you tell which styles will trigger layout or paint, and which will just trigger composition?

Most tutorials on this subject will recommend [CSS Triggers](https://csstriggers.com). While this is still a good guide to catching layout-triggering styles (\`border\`, \`width\`, \`top\`), it's very out of date, missing data on \`clip-path\`, \`filter\` and outdated info on others.

Browsers are changing all the time so the best approach is when venturing outside \`transform\` and \`opacity\` to test cross-browser and cross-device. Every browser has performance profiling tools, most can remotely debug mobile devices, so be sure to use those to investigate further.

## Hardware acceleration

Rendering performance should be your primary focus because it will be a consideration in every animation you make. But there's the additional factor of the animation process itself and whether it can be hardware accelerated.

An animation, at its most basic, mixes two values over a duration of time. For example, if we wanted to animate between \`"100px"\` and \`"200px"\` over one second, if \`0.5\` seconds has elapsed our animation would calculate \`"150px"\`. This is a very simple calculation and doesn't produce noticeable overhead compared to rendering.

However, in a browser there are several ways we can compute this value:

*   With JavaScript, using \`requestAnimationFrame\` (like [GSAP](https://gsap.com) and [Motion](/))
    
*   With the Web Animations API (like Motion)
    
*   With CSS
    

The JavaScript code will **always** run on the main JS thread. This means if your app is running other JS code at the same time, your animation code could be blocked from running at all. This will result in janky animations.

However, WAAPI and CSS **can** run **some** animations off the main JS thread, directly on the compositor itself. As this is usually a GPU, this is often referred to as **hardware acceleration**.

An animation that is hardware accelerated will remain smooth, no matter how busy your main JS thread becomes.

Because Motion is built on WAAPI, it can also run hardware accelerated animations.

### Accelerated values

As a general rule, if a style invokes only the composite rendering step, it can theoretically be animated on it, too.

\`transform\` and \`opacity\` are widely supported compositor styles and these do usually animate on the compositor.

Other values like \`filter\`, \`background-color\`, \`clip-path\` and SVGs either have support or are gaining it in most browsers.

### CSS variables and individual transforms

Motion is unique from WAAPI and CSS in that it supports the animation of individual transforms:

\`\`\`
animate(".box", { x: 100, scale: 2 })
\`\`\`

Under the hood, it is animating CSS variables, and currently these are not accelerated, even though they're being applied to \`transform\`.

So if hardware acceleration is crucial in your use-case, stick to animating \`transform\`:

\`\`\`
animate(".box", { transform: "translateX(100px) scale(2)" })
\`\`\`

### Other exceptions

Even when animating supposedly performant styles, each browser has different rules for when an animation does or doesn't receive acceleration.

For instance, until very recently, if Chrome detected a \`%\` based transform like this:

\`\`\`
animate(element, { transform: "translateX(100%)" })
\`\`\`

It **wouldn't** be hardware accelerated.

### Progressive enhancement

All of this is to say, it can be a minefield ensuring your animations are hardware accelerated.

We recommend treating acceleration like progressive enhancement. It's great when a browser supports it, but usually not essential.

If you do encounter a lot of jank from a busy JavaScript thread, stick to \`transform\`, \`filter\`, \`clipPath\` and \`opacity\`.

## Conclusion

To achieve smooth animations your main priority should be **which values you animate**. As a developer, that is the thing you have most control over.

\`transform\` and \`opacity\` are cheapest to render in all browsers. Browsers are improving the rendering performance of other styles (and SVG) all the time, with \`filter\`, \`background-color\` and \`clip-path\` on the horizon.

Layout-triggering styles **can** be animated on elements that don't affect the layout of surrounding elements (for instance if they're \`position: absolute\`). But make sure you test these animations in many browsers, especially low-powered devices.

Finally, hardware acceleration is an excellent tool to avoid jank if your website is performing heavy processing during an animation. But it isn't something you have full control over, there are many conditions under which it gets disabled.`
                }
            ]
        };
    });
    // Upgrade guide
    server.registerResource("JavaScript: Upgrade guide", docsUri("js", "upgrade-guide"), {
        description: "Upgrade to the latest version of Motion by following our incremental, version-by-version guide. Major version changes are typically small, making for a quick process.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "upgrade-guide");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Upgrade guide

We strive to reduce the number of breaking API changes but it is occasionally necessary.

The easiest way to upgrade is to start with the version you're currently using, then follow the guide to upgrade to the next version, and so on until you're at the latest version.

Changes between major versions are usually small so this is usually a quick process.

## 12.0

Motion 12 introduces a small change to the \`[inView](/docs/inview.md)\`, \`[hover](/docs/hover.md)\` and \`[press](/docs/press.md)\` gestures.

Before, each callback would be provided the triggering \`PointerEvent\` (or in the case of \`inView\`, \`IntersectionEntry\`).

\`\`\`
press("a", (startEvent) => {
  return (endEvent) => {}
})
  
hover("li", (startEvent) => {
  return (endEvent) => {}
})
  
inView("section", (startEntry) => {
  return (endEntry) => {}
})
\`\`\`

Now, the first argument to the start callback is the element performing the gesture:

\`\`\`
press("a", (element, startEvent) => {
  return (endEvent) => {}
})
  
hover("li", (element, startEvent) => {
  return (endEvent) => {}
})
  
inView("section", (element, startEntry) => {
  return (endEntry) => {}
})
\`\`\`

The reason for this change is that, because gestures can be applied to multiple elements at once, the predominant use with these events was to fish out the identity of the matched element:

\`\`\`
hover("button", ({ target }) => {
  animate(target, { opacity: 0 })
  
  return (endEvent) => {}
})
\`\`\`

As there's no guarantee which element either start or end listeners are attached to, making \`target\` and \`currentTarget\` somewhat unpredictable, it made sense to have a canonical and stable argument that provides this element explicitly.

## 11.0

Motion 11.11.12 is the version that merged Framer Motion and Motion One. With a far larger user base (20x), the conventions from the Framer Motion API took precedence.

Therefore, this will be the biggest set of breaking changes Motion One users should ever expect.

**Note:** Some APIs have been removed in \`11.0\`. If an API has been removed that you relied on, please let us know with [a feature request](https://github.com/motiondivision/motionone) and we can look at restoring it in a future update.

### \`animate\`

The biggest change to the API is the \`animate\` and \`timeline\` functions.

\`animate\` now comes in [two sizes](/docs/animate.md), **mini** and **hybrid**.

The **mini** \`animate\` is broadly similar to the old \`animate\` function from Motion One. However, it's now **smaller** (just 2.5kb) and supports **default value types:**

\`\`\`
import { animate } from "motion/mini"

animate(element, { width: 200 })
\`\`\`

However, for \`timeline\`'s sequencing and animating independent transforms, the **hybrid** \`animate\` function must be used instead.

\`\`\`
import { animate } from "motion"

animate(element, { x: 100 })
\`\`\`

The hybrid \`animate\` is larger, currently 18kb, though this size will come down significantly in the short term.

#### On removing independent transforms

Animating independent transforms is a popular feature in Motion One. However, when merging Motion One and Framer Motion, I wanted to bring the best of both libraries into one package.

Motion One had a strong emphasis on a tiny filesize, whereas Framer Motion concentrated on top animation performance.

By offering a hybrid \`animate\` with more capabilities, more room opened up to make the mini \`animate\` even smaller.

The way Motion One used to \`animate\` independent transforms was via CSS variables. CSS variables have a critical performance problem in that changing one **always triggers paint**.

Framer Motion's approach of building a \`transform\` string every frame significantly outperforms this. So it doesn't make sense to me to offer two technical approaches to the same problem when one outperforms the other.

Other changes are as follows:

#### Callback function

The callback function syntax of \`animate()\` has been replaced by the hybrid \`animate()\`'s ability to animate single values, motion values and objects.

You could directly replace it like so:

\`\`\`
import { animate } from "motion"

animate(0, 1, { onUpdate: (progress) => {} })
\`\`\`

#### Options

*   \`easing\` is now \`ease\`.
    
*   \`direction\` is now \`repeatType\` with \`loop\`, \`mirror\` and \`reverse\` options.
    
*   \`repeatDelay\` has been added.
    
*   \`endDelay\` has been removed.
    
*   \`allowWebkitAcceleration\` has been removed.
    

#### Spring/Glide

*   \`glide\` has been removed. Users of \`glide\` can instead use \`type: "inertia"\` via the hybrid \`animate\` function.
    
*   Spring animations are created by passing \`spring\` to the \`type\` option, with all other spring-related options going to the animation's options rather than the \`spring\` function:
    

\`\`\`
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, stiffness: 400 }
)
\`\`\`

#### Controls

*   \`currentTime\` is now \`time\`.
    
*   \`playbackRate\` is now \`speed\`.
    
*   \`finish()\` is now \`complete()\`.
    
*   \`playState\` has been removed.
    
*   \`finished\` can be replaced by the animation controls themselves:
    

\`\`\`
const animation = animate()

animation.then(() => {})
await animation
\`\`\`

### \`inView\`

*   \`amount\`: The \`"any"\` option is now \`"some"\`.
    

### \`stagger\`

*   \`start\` is now \`startDelay\`.
    

### \`scroll\`

The \`scroll\` function has been given a huge performance boost. Now, animations will run via the browser's native \`ScrollTimeline\` where possible, or via Motion's new render-batched animation loop when not possible.

As a result, the bundlesize has doubled from 2.6kb to 5.2kb.

Additionally, \`scroll\` callbacks can now accept two arguments, \`progress\` and (moving to the second argument) \`info\`.

\`\`\`
// Previously
scroll((info) => {}, options)

// Now
scroll((progress, info) => {}, options)
\`\`\`

This allows callbacks that only need to use \`progress\` to run via \`ScrollTimeline\`, cutting scroll measurements.

### Motion DevTools

Motion DevTools is currently **incompatible** with Motion. If you're a Motion DevTools user, please stay on \`motion@10\` for now.`
                }
            ]
        };
    });
    // glide
    server.registerResource("JavaScript: glide", docsUri("js", "glide"), {
        description: "The glide easing can create momentum scroll effects and more.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "glide");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# glide

**Note:** This API is **deprecated**. You can use \`type: "inertia"\` with the new \`[animate()](/docs/animate.md)\` [function](/docs/animate.md).

—-

\`glide\` can animate transforms using momentum physics. This is great for creating scroll momentum animations.

\`\`\`
import { animate, glide } from "motion"

animate(
  element,
  { x: 500 },
  { easing: glide() }
)
\`\`\`

**Note:** \`glide\` is a simulation, so provided target keyframes and \`duration\` will be overridden.

## Velocity

\`glide\` will automatically pass velocity from any running animations into the next one, so interrupting an animation will feel natural.

This can be overridden by manually passing \`velocity\` to \`glide\`. \`velocity\` is measured as units per second.

\`\`\`
animate(
  "#carousel",
  { x: 100 },
  { easing: glide({ velocity: 1000 }) }
)
\`\`\`

If you want to pass a different \`velocity\` per value (for instance for animating at the end of a pointer gesture) you can create value-specific options:

\`\`\`
animate(
  "#ball",
  { x: 0, y: 0 },
  {
    x: { easing: glide({ velocity: 200 }) },
    y: { easing: spring({ velocity: 500 }) }
  }
)
\`\`\`

### Boundaries

By setting \`min\` and/or \`max\` you can set boundaries to the glide animation. If the animated value exceeds these boundaries, a [spring](/docs/spring.md) animation will start to catch the value and animate it to the exceeded boundary.

\`\`\`
glide({ min: -100, max: 100 })
\`\`\`

### Options

### \`velocity\`

**Default:** \`0\` or the value's current velocity

The velocity (in units per second) at which to start the glide animation.

\`\`\`
glide({ velocity: 1000 })
\`\`\`

### \`power\`

**Default:** \`0.8\`

\`power\` influences how much of the initial \`velocity\` is factored into the animation, and thus how far the animation will glide.

Higher values will throw the animation further and feel lighter, whereas lower values will feel heavier.

\`\`\`
glide({ power: 1 })
\`\`\`

### \`decay\`

**Default:** \`0.325\`

A time constant (in seconds) used to calculate velocity decay. Higher values lead to longer animations with more gradual deceleration and a lighter feel.

\`\`\`
glide({ decay: 0.5 })
\`\`\`

### \`restSpeed\`

**Default:** \`2\`, or \`0.05\` for \`scale\`

A speed (in absolute units per second) below which the spring animation is considered finished.

\`\`\`
spring({ restSpeed: 1 })
\`\`\`

### \`restDistance\`

**Default:** \`0.5\` or \`0.01\`for \`scale\`

A distance from the animation target, below which the spring animation is considered finished.

\`\`\`
spring({ restDistance: 0.1 })
\`\`\`

### \`changeTarget\`

The glide animation automatically calculates a target to animate to. By setting \`changeTarget\`, you can take this calculated target and return a new one.

For instance, the function in the following example will snap the target to the next \`100\`:

\`\`\`
const roundTo = 100

glide({
  changeTarget: (target) => Math.ceil(target / roundTo) * roundTo
})
\`\`\`

### \`min\`

A minimum boundary for the glide animation. If the animated value exceeds this boundary, a spring animation will take over to snap the value to \`min\`.

\`\`\`
glide({ min: -100 })
\`\`\`

### \`max\`

A maximum boundary for the glide animation. If the animated value exceeds this boundary, a spring animation will take over to snap the value to \`max\`.

\`\`\`
glide({ max: 100 })
\`\`\`

### \`bounceStiffness\`

**Default:** \`100\`

The attraction force of a spring used if the animation exceeds the boundaries defined by \`min\`/\`max\`. Higher values create faster, sharper movement.

\`\`\`
glide({ min: 100, bounceStiffness: 500 })
\`\`\`

### \`bounceDamping\`

**Default:** \`10\`

The opposing force of a spring. Higher values reduce the bounciness of the spring.

\`\`\`
glide({ max: 100, bounceDamping: 30 })
\`\`\`

## Limitations

There are currently some limitations with the \`spring\` easing.

### Duration

Springs with \`damping: 0\` can last an infinite amount of time, but the Web Animations API needs a finite \`duration\`. So springs currently max out at 10 seconds (which is more than long enough for the vast majority of UI animations).  
Increase \`damping\` relative to \`stiffness\` to decrease the duration of your animation.

### Timeline keyframes

\`spring\` is supported in \`timeline\` but independent transforms **must** be defined with start and end keyframes: \`{ x: [0, 100] }\`.

## No hardware acceleration

\`spring\` only works with independent transforms, which are not yet hardware accelerated in browsers.`
                }
            ]
        };
    });
    // CSS
    server.registerResource("JavaScript: CSS", docsUri("js", "css"), {
        description: "Learn how to create spring animations with CSS using Motion, both server-side and in the browser. This guide covers React Server Components, CSS-in-JS, Astro, Vue, and provides cross-browser fallback solutions.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "css");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# CSS

It's common to reach for a JavaScript library like Motion when you want to perform spring animations. But Motion is also capable of generating springs via CSS, both on the server and in the browser.

In this guide, we'll learn how to make spring animations with CSS, with a variety of libraries and frameworks:

*   React Server Components
    
*   Via the \`style\` attribute
    
*   CSS-in-JS (Styled Components, Tamagui)
    
*   Astro
    
*   React
    
*   Vue
    

We'll also learn how to fall back to either no animation or a different animation for cross-browser support.

## AI editors

Motion for AI enables your AI code editor to [generate CSS springs](/docs/studio-generate-css.md) without needing to import any library into your project.

## Import

To generate our spring CSS rules, we're going to be using Motion's \`[spring()](/docs/spring.md)\` [function](/docs/spring.md).

\`\`\`
import { spring } from "motion"
\`\`\`

## Overview

\`spring\` has two features that makes it perfect for CSS generation.

1.  A \`toString()\` method.
    
2.  A \`spring(visualDuration, bounce)\` shorthand.
    

\`toString()\` returns the spring as a CSS duration and easing. The new shorthand makes it simpler than ever to make springs.

Put together, we can create CSS rules like this:

\`\`\`
transition: transform \${spring(0.5, 0.2)};

// Outputs:
// transition: transform 800ms linear(...)
\`\`\`

The generated duration can be longer than the one provided to \`spring\` because it accepts the \`[visualDuration](/docs/spring.md)\` [option](/docs/spring.md), which makes it easier to edit springs and coordinate them with other transitions:

\`\`\`
transition:
  opacity 0.5s ease-out,
  transform \${spring(0.5, 0.2)};
\`\`\`

Here, \`transform\` will **actually** take longer, but it will **appear** to take a similar amount of time to animate as \`opacity\`. This is because the \`visualDuration\` defines the amount of time the animation takes to first reach its target, not perform the "bouncy bit" after.

## Server generation

### React Server Components

With React Server Components (RSC), it's possible to set springs via the \`style\` prop.

\`\`\`
<div style={{ transition: "all " + spring() }}>
\`\`\`

This code will be run entirely server-side, with no runtime overhead.

It's also possible to use the \`style\` tag:

\`\`\`
<style>{\`
  button:hover {
    transition: transform \${spring(0.8, 0)};
    transform: scale(1.2);
  }
\`}</style>
\`\`\`

## Client generation

### \`style\` attribute

You can set \`transition\` on an element at runtime, before changing its other values.

\`\`\`
const element = document.querySelector("button")

element.style.transition = "transform " + spring(0.3)
element.style.transform = "scale(1.2)"
\`\`\`

### CSS-in-JS

CSS-in-JS follows the same basic approach of string concatination, with the exact pattern depending on your library of choice:

#### Styled Components

\`\`\`
const Button = styled.button\`
  transition: opacity \${spring(0.5)};
\`
\`\`\`

#### Tamagui

\`\`\`
export const RoundedSquare = styled(View, {
  transition: "opacity " + spring(0.5)
})
\`\`\`

### Astro

In [Astro](https://astro.build/), you can define the spring as a CSS variable using JavaScript, and then in your CSS use that value with \`var()\`:

\`\`\`
<style define:vars={{ spring: spring(0.2, 0) }}>
  span {
    transition: transform var(--spring);
  }
</style>
\`\`\`

### Vue

\`\`\`
const springTransition = ref(spring(0.3, 1))
\`\`\`

\`\`\`
<div :style="{ transition: 'filter ' + springTransition }"></div>
\`\`\`

## Fallbacks

By default, the browser will ignore your animation if it doesn't support the \`linear()\` easing function.

In CSS it's possible to set a second \`transition\` with a lower specificity to act as a fallback, though this might not be supported by all CSS generators (like setting via \`style\`):

\`\`\`
transition: filter 0.3s ease-out;
transition: filter \${spring(0.3)};
\`\`\`

This is another benefit of the \`spring()\` shorthand accepting \`visualDuration\` instead of \`duration\` - you can use the same duration for both of these animations and they'll feel like they take an equivalent time to complete.`
                }
            ]
        };
    });
    // Add animations to your Squarespace site
    server.registerResource("JavaScript: Add animations to your Squarespace site", docsUri("js", "squarespace"), {
        description: "Elevate your Squarespace site with Motion: a free, high-performance animation library. Break free from template limits, create stunning animations, and boost your SEO with its incredibly small footprint. Easy to install and customize for optimal site speed and search ranking.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "squarespace");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Add animations to your Squarespace site

Many [Squarespace](https://squarespace.com) templates come with in-built animations, but often they lack customisation options and rely on old and bloated animation libraries like jQuery which can lead to negative SEO and performance impacts.

By using Motion, you gain:

*   **Flexibility:** You're not limited to the template's in-built options (if any). You can design any animation you want using any of Motion's APIs like [scroll](/docs/scroll.md) and [timeline sequencing](/docs/animate.md).
    
*   **Performance:** Motion is built on the latest browser APIs for hardware accelerated performance.
    
*   **Improved SEO:** Motion's tiny \`animate()\` function is just 2.6kb, and the rest of the library is small too. This leads to better SEO scores.
    

Motion is also free and open source!

## Installation

Installing Motion on a Squarespace site is super-easy. In the bottom of your admin menu, there's an option for "Custom Code".

![](https://framerusercontent.com/images/93ksiIggFVGS9hicCjVve0ILZY.png)

Clicking on this reveals a "Code Injection" option.

![](https://framerusercontent.com/images/eYloUHHlZzf0znnpAjq9xhhSux0.png)

Here, in the Footer box, add:

\`\`\`
<script type="module" defer>
    import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

    // Your animation code here
    animate("h1", { opacity: [0, 1] })
</script>
\`\`\`

You can replace \`11.13.5\` here with whichever version you want to install. The latest published version can be found on the [npm package page](https://www.npmjs.com/package/motion).

This script contains all the Motion imports, but you can also achieve even greater filesize savings if you want to use just the mini version of the \`animate\` function, which is just 2.6kb, by importing from \`https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm\`:

\`\`\`
<script type="module" defer>
    import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm"

    // Your animation code here
    animate("h1", { opacity: [0, 1] })
</script>
\`\`\`

## Selecting elements

In order to animate elements, we need to **select** them first.

We can select them generically using a tag selector, like \`"a"\` for selecting all the links on a page. For instance we can use \`animate\` and \`press\` to scale links in and out when they're pressed and de-pressed:

\`\`\`
<script type="module" defer>
    import { animate, press } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

    press("a", (element) => {
      animate(element, { scale: 0.7 })

      return () => animate(element, { scale: 1 })
    })
</script>
\`\`\`

## Custom scripts

By importing scripts directly from this URL, you're importing everything, even the bits of Motion you're not using. But, one of the great things about Motion is it's **tree-shakable**. This means you can use a bundler like [Vite](https://vite.dev/) or [Rollup](https://rollupjs.org/) to only include the bits you use.

In fact, this is a good practise for all of your Squarespace custom code. It will ensure you package everything into one neat bundle and only package the bits you need.

For example, if you only wanted to use the \`[animate](/docs/animate.md)\` [function](/docs/animate.md), you could replace the above code with this:

\`\`\`
import { animate } from "motion"

animate("header", { opacity: 1 })
\`\`\`

Building this with Rollup, uploading to a CDN, and then including with an \`async\` JS tag will boost SEO scores even further:

\`\`\`
<script async src="https://yourdomain.com/my-script.js"></script>
\`\`\`

## Next

Now that you have Motion running in your Squarespace project, you can follow our [quick start guide](/docs/quick-start.md) to start making more complex animations.`
                }
            ]
        };
    });
    // Add animations to your WordPress site
    server.registerResource("JavaScript: Add animations to your WordPress site", docsUri("js", "wordpress"), {
        description: "Enhance your WordPress site with Motion: a free, open-source animation library for creating stunning, high-performance animations. Its tiny footprint and flexibility boost your site's speed and SEO rankings, offering limitless creative possibilities.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "wordpress");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Add animations to your WordPress site

Many [WordPress](https://wordpress.org/) templates come with in-built animations, but often they lack customisation options and rely on old and bloated animation libraries like jQuery which can lead to negative SEO and performance impacts.

By using Motion, you gain:

*   **Flexibility:** You're not limited to the template's in-built options (if any). You can design any animation you want using any of Motion's APIs like [scroll](/docs/scroll.md) and [timeline sequencing](/docs/animate.md).
    
*   **Performance:** Motion is built on the latest browser APIs for hardware accelerated performance.
    
*   **Improved SEO:** Motion's tiny \`animate()\` function is just 2.6kb, and the rest of the library is small too. This leads to better SEO scores.
    

Motion is also free and open source!

## Installation

Installation of custom scripts can be tricky in WordPress. We recommend using a plugin like [Insert Headers and Footers](https://wordpress.org/plugins/insert-headers-and-footers/), as it lets you can add custom JS tags in a safe way, without blocking template updates or hacking around with PHP code.

Once the plugin is installed, you can navigate to the plugin UI via the WordPress admin panel.

![](https://framerusercontent.com/images/bhg8zaVfIAtvBFyRNb3VZzLNE6s.png)

Here, in the Footer section, add:

\`\`\`
<script type="module" defer>
    import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

    // Your animation code here
    animate("h1", { opacity: [0, 1] })
</script>
\`\`\`

You can replace \`11.13.5\` here with whichever version you want to install. The latest published version can be found on the [npm package page](https://www.npmjs.com/package/motion).

This script contains all the Motion imports, but you can also achieve even greater filesize savings if you want to use just the mini version of the \`animate\` function, which is just 2.3kb, by importing from \`https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm\`:

\`\`\`
<script type="module" defer>
    import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm"

    // Your animation code here
    animate("h1", { opacity: [0, 1] })
</script>
\`\`\`

## Selecting elements

In order to animate elements, we need to **select** them first.

We can select them generically using a tag selector, like \`"a"\` for selecting all the links on a page. For instance we can use \`animate\` and \`press\` to scale links in and out when they're pressed and de-pressed:

\`\`\`
<script type="module" defer>
    import { animate, press } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"

    press("a", (element) => {
      animate(element, { scale: 0.7 })

      return () => animate(element, { scale: 1 })
    })
</script>
\`\`\`

Or we can be more specific, by going to the **Appearance > Themes** menu, clicking the active template "Customise" button, and applying a class to the element we want to animate.

![](https://framerusercontent.com/images/cuGwkIrsZC4ErMpBNoK5g3I8JOw.png)
\`\`\`
animate(".my-class", { rotate: [0, 20, 0] }, { duration: 0.4 })
\`\`\`

## Custom scripts

By importing scripts directly from this URL, you're importing everything, even the bits of Motion you're not using. But, one of the great things about Motion is it's **tree-shakable**. This means you can use a bundler like [Vite](https://vite.dev/) or [Rollup](https://rollupjs.org/) to only include the bits you use.

In fact, this is a good practise for all of your WordPress custom code. It will ensure you package everything into one neat bundle and only package the bits you need.

For example, if you only wanted to use the \`[animate](/docs/animate.md)\` [function](/docs/animate.md), you could replace the above code with this:

\`\`\`
import { animate } from "motion"

animate("header", { opacity: 1 })
\`\`\`

Building this with Rollup, uploading to a CDN, and then including with an \`async\` JS tag will boost SEO scores even further:

\`\`\`
<script async src="https://yourdomain.com/my-script.js"></script>
\`\`\`

## Next

Now that you have Motion running in your WordPress project, you can follow our [quick start guide](/docs/quick-start.md) to start making more complex animations.`
                }
            ]
        };
    });
}

export { initDocsResources };
