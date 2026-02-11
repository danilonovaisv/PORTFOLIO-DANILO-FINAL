import { docsUri } from '../utils/uri.mjs';

function initPlusDocsResources(server) {
    // AnimateView
    server.registerResource("React: AnimateView", docsUri("react", "animate-view"), {
        description: "A component for using View Transitions with Motion. Useful for performing Next.js page transitions.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "animate-view");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# AnimateView

Hello world

## Differences with layout animations

### Performance

The React docs for \`<ViewTransition>\` state:

> \`<ViewTransition>\` creates an image that can be moved around, scaled and cross-faded. Unlike Layout Animations you may have seen in React Native or Motion, this means that not every individual Element inside of it animates its position. This can lead to better performance and a more continuous feeling, smooth animation compared to animating every individual piece.

This is untrue.

## Install

\`\`\`
npm install react-animate-view
\`\`\``
                }
            ]
        };
    });
    // AnimateNumber
    server.registerResource("Vue: AnimateNumber", docsUri("vue", "animate-number"), {
        description: "Create beautiful number animations like countdowns with AnimateNumber and Motion. Leverages Motion's layout animations and transitions. Lightweight at just 2.5kb.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "animate-number");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# AnimateNumber

\`AnimateNumber\` creates beautiful number animations with Motion.

\`\`\`
<AnimateNumber :value="count"/>
\`\`\`

You can create a number of popular animation effects, like countdowns, engagement bars, or labelling user inputs.

It's a continuation of the original version of Max Barvian's [NumberFlow](https://number-flow.barvian.me/) component, which was built on Motion.

Because \`AnimateNumber\` leverages Motion's existing layout animations, it's only 3.6kb on top of Motion for Vue. It also means you can use Motion's existing [transition settings](/docs/vue-transitions.md).

However, being based on an older version of NumberFlow means it currently lacks a couple of its newer props like \`trend\` and \`plugins\`.

In this guide, we'll learn how to install \`AnimateNumber\` into our projects, and how to use it for a variety of number animation effects.

## Install

\`AnimateNumber\` is available via the \`"motion-plus-vue"\`package on npm:

\`\`\`
npm install motion-plus-vue
\`\`\`

## Usage

Import \`AnimateNumber\` from \`"motion-plus-vue"\`:

\`\`\`
import { AnimateNumber } from "motion-plus-vue"
\`\`\`

\`AnimateNumber\` accepts a single child, a number.

\`\`\`
<AnimateNumber :value="300" />
\`\`\`

When this number changes, it'll animate to its latest value.

\`\`\`
<script setup>
  const count = ref(0)
</script>

<template>
  <button @click="count=count+1">Increment</button>
  <AnimateNumber :value="count" />
</template>
\`\`\`

### Customise animation

The \`transition\` prop accepts Motion for Vue's [transition options](/docs/vue-transitions.md).

\`\`\`
<AnimateNumber :transition="{ type: 'spring' }">
\`\`\`

\`transition\` accepts value-specific transition settings, so it's possible to set specific transitions for \`layout\`, \`y\` and \`opacity\`:

\`\`\`
<AnimateNumber :transition="{
  layout: { duration: 0.3 },
  opacity: { ease: 'linear' },
  y: { type: 'spring', visualDuration: 0.4, bounce: 0.2 }
}">
\`\`\`

### Customise numbers

\`AnimateNumber\` uses the browser's built-in \`[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)\` to format numbers and, as such, exposes some of its formatting options.

\`\`\`
<AnimateNumber :format="{ notation: 'compact' }">
\`\`\`

### Prefix/suffix

It's also possible to \`prefix\` and \`suffix\` the number with custom text content:

\`\`\`
<AnimateNumber
  :format="{ style: 'currency', currency: 'USD' }"
  locales="en-US"
  suffix="/mo"
>
\`\`\`

### Styling

Each section of the number has a unique class that can be used to target it with CSS.

The available classes are:

*   \`number-section-pre\`: \`prefix\` and other text before the number
    
*   \`number-section-integer\`: Before the decimal
    
*   \`number-section-fraction\`: After the decimal
    
*   \`number-section-post\`: \`suffix\` and other text after the number
    

## Options

### \`transition\`

Accepts Motion for Vue's [transition options](/docs/vue-transitions.md).

### \`prefix\`

Custom text content to render before the number.

### \`suffix\`

Custom text content to render after the number.

### \`format\`

Accepts \`[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options)\` [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options).

### \`locales\`

Accepts \`[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales)\` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales)\`[locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales)\` [argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales).

\`\`\`
<!-- // Will render as US$300 outside US -->
<AnimateNumber :value="300" :format="{ currency: 'USD', style: 'currency' }"/>
\`\`\`

\`\`\`
<!-- // Will always render as $300 -->
<AnimateNumber 
  locales="en-US" 
  :value="300"
  :format="{ currency: 'USD', style: 'currency' }"
/>
\`\`\``
                }
            ]
        };
    });
    // Carousel
    server.registerResource("Vue: Carousel", docsUri("vue", "carousel"), {
        description: "A production-ready Vue carousel featuring infinite scrolling, composable controls, and animated pagination. Lightweight, fully accessible, and supports touch, wheel, and keyboard navigation.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "carousel");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Carousel

The Carousel component creates performant, accessible and fully-featured carousels in Vue. It's designed to be flexible and easy to use, supporting pointer, wheel and keyboard navigation out the box.

It allows you to go beyond the traditional limitations of CSS-only approaches, with support for infinitely-scrolling carousels and without limitations on styling.

### Features

*   **Lightweight:** Just \`+5.8kb\` on top of [the](/docs/vue-motion-component.md) \`[motion](/docs/vue-motion-component.md)\` [component](/docs/vue-motion-component.md).
    
*   **Accessible:** Automatic ARIA labels, respects reduced motion, RTL layouts, and all major input methods.
    
*   **Performant:** Built on the same [unique rendering](https://motion.dev/blog/building-the-ultimate-ticker) used by the [Ticker](/docs/vue-ticker.md) component that achieves infinite scrolling with while minimising or eliminating item cloning.
    
*   **Customisable:** Provides functions and state to easily create custom controls and pagination.
    

## Install

\`\`\`
npm install motion-plus-vue
\`\`\`

## Usage

### Import

Import the \`Carousel\` component from "motion-plus-vue"\\\`:

\`\`\`
import { Carousel } from "motion-plus-vue"
\`\`\`

\`Carousel\` component receives its items via the \`default slot\`. You can pass any valid Vue nodes (components, strings, or numbers)

\`\`\`
 <Carousel>
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
 </Carousel>
\`\`\`

\`\`\`
<Carousel>
  <Box src="sonic3" title="Sonic 3" />  <!-- This will be one Carousel item -->
  <div>Some text</div>                   <!-- This will be another Carousel item -->
  123                                    <!-- This will be a third Carousel item -->
</Carousel>
<!-- This will generate 3 Carousel items -->
\`\`\`

\`\`\`
<Carousel>
  <Box src="sonic3" title="Sonic 3" />
  <!-- This Fragment and its children will be treated as a single Carousel item -->
  <Fragment>
    <div>Some text</div>
    123
  </Fragment>
</Carousel>
\`\`\`

### Direction

By default, carousels will scroll horizontally. Setting the \`axis\` prop to \`y\`, we can make them vertical.

\`\`\`
<Carousel axis="y" />
\`\`\`

### Layout

Items are laid out via flexbox. Passing \`gap\` and \`align\` will adjust the spacing and off-axis alignment of them items.

\`\`\`
<Carousel  :gap="0" align="start" />
\`\`\`

### Overflow

By setting \`overflow\` to \`true\`, items will visually extend out from the container to the edges of the viewport.

\`\`\`
<Carousel  overflow />
\`\`\`

This makes it straightforward to place a \`Carousel\` within a document flow but still extend the ticker effect across the full viewport.

### Infinite scrolling

By default, carousels will scroll infinitely. This can be disabled by setting \`:loop="false"\`.

\`\`\`
<Carousel :loop="false"/>
\`\`\`

### Layout

By default, each item will be sized according to its contents. By setting \`itemSize="fill"\`, items will extend the match the width of the container.

\`\`\`
<Carousel itemSize="fill" />
\`\`\`

### Snapping

By default, drag and wheel controls will snap between pages. By setting \`:snap="false"\`, snapping can be disabled and the carousel will freely scroll.

\`\`\`
<Carousel  :snap="false" />
\`\`\`

### Custom controls

Custom controls can be passed to Carousel using the \`after\` slots. The \`after\` slot renders \`after\` the Carousel container:

\`\`\`
<Carousel :loop="false" >
    {{items}}
  <template #after>
    <Next/>
  </template>
</Carousel>
\`\`\`

Any component rendered within \`Carousel\` can call \`useCarousel\` to access state and pagination functions. This hook provides:

*   \`nextPage\`/\`prevPage\`: Paginate next/previous.
    
*   \`gotoPage\`: Pass it a page index to animate to this page.
    
*   \`paginationState\`:
    
    *   \`isNextActive\`/\`isPrevActive\`: If \`:loop="false"\` then these will be false when we hit the limits of the carousel.
        
    *   \`currentPage\`: Index of the current page
        
    *   \`totalPages\`: Number of total pages.
        

\`\`\`
<script setup>
import { useCarousel } from "motion-plus-vue"

const { nextPage, isNextActive } = useCarousel()
</script>

<template>
  <button :disabled="!isNextActive" @click="nextPage">
    Next
  </button>
</template>
\`\`\`

### Autoplay

With \`currentPage\` and \`nextPage\` from \`useCarousel\`, we can also set up our own autoplay functionality.

By watching \`currentPage\` with \`watch\`, the timer will restart whenever the page changes, whether that's from a swipe/drag, or from the autoplay timer itself.

\`\`\`
const { paginationState, nextPage } = useCarousel()
const progress = useMotionValue(0)

watch(
  [() => paginationState.value.currentPage, () => props.duration],
  (_1,_2,onCleanup) => {
    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: nextPage,
    })
    
    onCleanup(() => {
      animation.stop()
    })
  },
  { immediate: true }
)
\`\`\`

### Pagination visualisation

By using \`currentPage\`, \`totalPages\` and \`gotoPage\` from \`useCarousel\`, a custom pagination indicator/navigator can be built.

\`\`\`
<script setup>
import { useCarousel } from "motion-plus-vue"
import { motion } from "motion-v"

const { paginationState, gotoPage } = useCarousel()
</script>

<template>
  <ul class="dots">
    <li 
      v-for="(_, index) in Array.from({ length: paginationState.totalPages })" 
      :key="index"
      class="dot"
    >
      <motion.button
        :initial="false"
        :animate="{ opacity: paginationState.currentPage === index ? 1 : 0.5 }"
        tag="button"
        @click="gotoPage(index)"
      />
    </li>
  </ul>
</template>
\`\`\`

### Animate items with carousel scroll

\`Carousel\` renders a \`Ticker\` under-the-hood, so it has full access to the \`useTickerItem\` hook. \`useTickerItem\` returns information about the item that you can use to create bespoke per-item animations.

It returns:

*   \`offset\`: A \`[MotionValue](/docs/vue-motion-value.md)\` that represents the item's scroll offset relative to the container. At \`0\`, the item is visually aligned to the start of the ticker. Note that this will be flipped in RTL layouts.
    
*   \`bounds\`:
    
    *   \`start\`/\`end\`: The start and end boundaries of the item layout within the ticker. Note that these are reversed in RTL layouts.
        
*   \`itemIndex\`: The \`index\` of this item. For clones, this \`index\` value will represent the index value of the original item.
    

\`\`\`
<script setup>
import { useTickerItem } from "motion-plus-vue"
import { motion, useTransform } from "motion-v"

const { offset } = useTickerItem()
const rotate = useTransform(offset, [0, 300], [0, 360], { clamp: false })
</script>

<template>
  <motion.div :style="{ rotate }">
    😂
  </motion.div>
</template>
\`\`\`

\`\`\`
<Carousel>
  <Item />
</Carousel>
\`\`\`

## Options

\`Carousel\` renders a \`[<motion />](/docs/vue-motion-component.md)\` component, so it accepts most of the same props. It also supports the following options:

### \`axis\`

**Default:** \`"x"\`

Determines on which axis the ticker should lay out and scroll.

\`\`\`
<Carousel axis="y" />
\`\`\`

### \`gap\`

**Default:** \`10\`

A gap to apply between items, in pixels.

### \`align\`

**Default:** \`"center"\`

Alignment of items within the ticker's off-axis. For example, if this is a y-axis ticker, this will align items horizontally within the ticker.

Can be set to \`"start"\`, \`"center"\` or \`"end"\`.

### \`loop\`

**Default:** \`true\`

Whether to infinitely loop items. If set to \`false\`, items won't be cloned and pagination will stop at either end of the carousel.

\`\`\`
<Carousel :loop="false" />
\`\`\`

### \`overflow\`

**Default:** \`false\`

Whether to overflow items beyond the constraints of the carousel.

\`\`\`
<Carousel overflow />
\`\`\`

### \`snap\`

**Default:** \`"page"\`

By default, drag and wheel scroll will snap to the nearest page. This can be disabled by setting \`snap={false}\`.

\`\`\`
<Carousel :snap="false" />
\`\`\`

### \`transition\`

A [transition](/docs/vue-transitions.md) to use when the Carousel is paginated.

\`\`\`
<Carousel 
  :transition="{ type: 'spring', stiffness: 300 }"
/>
\`\`\`

### \`fade\`

**Default:** \`**0**\`

Fades the content out at each end of the carousel container. Can be set either as a number (pixels) or \`%\`.

When \`:loop="false"\`, the fade will automatically disappear when the edges of the carousel are reached.

\`\`\`
<Carousel  :fade="100" />
\`\`\`

### \`fadeTransition\`

The [transition](/docs/vue-transitions.md) to use to animate the \`fade\` in and out.

\`\`\`
<Carousel
  :fade="100"
  :fadeTransition="{ duration: 2 }"
/>
\`\`\`

### \`safeMargin\`

**Default:** \`0\`

\`Ticker\` uses a [unique reprojection renderer](https://motion.dev/blog/building-the-ultimate-ticker), which can reduce or eliminate item cloning. Technically, this works by reprojecting items that disappear off the start of the visible area over to the end.

The calculation for this is based on the item and ticker container's layout. If you're rotating the ticker, or transforming its items in some way that brings them back inside the visible area, you may see items disappear as they reproject. If so, you can use \`safeMargin\` to increase the visible area to compensate.

\`\`\`
<Carousel  :safeMargin="100" />
\`\`\`

### \`as\`

**Default:** \`"div"\`

The HTML element to use to render the carousel container.

\`\`\`
<Carousel items={items} as="section" />
\`\`\``
                }
            ]
        };
    });
    // Cursor
    server.registerResource("Vue: Cursor", docsUri("vue", "cursor"), {
        description: "Create custom cursors and follow-along effects in Vue with Motion+ Cursor. It auto-adapts to links, text, & buttons. Style with CSS, animate with Motion.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "cursor");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Cursor

Cursor is a creative cursor component for Vue. It makes it quick and simple to build custom cursors, or cursor-following animations.

It's exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time fee, all-in membership that offers exclusive components, premium examples and access to a private Discord community.

With its default settings, it replaces the browser cursor with a dynamic cursor.

\`\`\`
<Cursor />
\`\`\`

This cursor automatically detects the types of content it's hovering over. When hovering a link or button, it grows. When it's pressed, it shrinks. It also detects \`disabled\` status.

When hovering selectable text, it transforms into a text selector that grows with the size of the text.

  

The cursor can be fully styled with CSS and animated using Motion's variants. It's also possible to set custom content when hovering over specific elements.

With only a prop, we can create a follow cursor effect. Great for previews or popup information.

\`\`\`
<Cursor follow />
\`\`\`

We can also render as many cursors as we like, all at the same time. Attaching them to the cursor with springs of varying strengths.

In this guide, we'll learn how to install \`Cursor\`, customise it with its various options and \`useCursorState\` hook.

## Install

Cursor is available via the \`"motion-plus-vue"\`package on npm:

\`\`\`
npm install motion-plus-vue
\`\`\`

## Usage

The \`Cursor\` component is used for both custom cursor and follow cursor effects:

\`\`\`
import { Cursor } from "motion-plus-vue"
\`\`\`

When \`Cursor\` is rendered, a default custom cursor will render on the page, hiding the browser's default cursor.

\`\`\`
<Cursor />
\`\`\`

You can remove the cursor and restore the browser cursor at any time by removing the component.

\`\`\`
<Cursor v-if="isCursorVisible" />
\`\`\`

### Styling

By default, the cursor is a neutral grey color. It's possible to change the cursor's styles using CSS.

\`\`\`
<Cursor className="my-cursor" :style="{ backgroundColor: 'red' }" />
\`\`\`

#### Styling \`border-radius\`

Cursor uses Motion's [layout animations](/docs/vue-layout-animations.md) to animate its width and height via performant transforms. As such, \`borderRadius\` currently needs to be set via the \`style\` prop to enable scale correction:

\`\`\`
<Cursor style="{ borderRadius: '5px' }" />
\`\`\`

### Variants

The Cursor component and its children have access to special variants that you can use to animate based on the cursor state.

\`\`\`
<script setup>
  const variants = {
  pressed: { scale: 0.5, filter: "blur(5px)" }
}
</script>
<template>
  <Cursor variants={variants} />
</template>
\`\`\`

Available variants are:

*   \`default\`: Base cursor state
    
*   \`text\`: When hovering text
    
*   \`pointer\`: When hovering a link or button
    
*   \`pressed\`: When the mouse is pressed
    
*   \`magnetic\`: When the cursor is magnetically snapped to a target
    
*   \`exit\`: During exit animations
    

### Custom content

When \`Cursor\` is passed \`children\`, it's \`width\` and \`height\` will stop reacting to press and text targets, and become the size of its content.

\`\`\`
<Cursor>
  <p>Custom content!</p>
</Cursor>
\`\`\`

### Exit animations

> Note: Currently, since Cursor is mounted using [Vue's](https://vuejs.org/guide/built-ins/teleport) \`[Teleport](https://vuejs.org/guide/built-ins/teleport)\` [API](https://vuejs.org/guide/built-ins/teleport), it cannot be monitored by the Transition component. Therefore, we cannot enable exit animations on the cursor itself.

\`\`\`
// ❌
<AnimatePresence>
   <Cursor v-if="isCursorVisible" />
</AnimatePresence>
\`\`\`

However, we can trigger variant exit animations by changing the show prop：

\`\`\`
<Cursor :show="isCursorVisible" />
\`\`\`

### Follow cursor

By default, Cursor will replace the browser cursor. By setting \`follow\`, it will follow it instead.

\`\`\`
<Cursor follow />
\`\`\`

**Note:** Enabling \`follow\` will change some custom cursor styles, and make the default offset to the bottom right of the browser cursor.

## Magnetic snapping

By setting the \`magnetic\` prop, the \`Cursor\` will magnetically snap to the target element on hover.

\`\`\`
<Cursor magnetic />
\`\`\`

The intensity of the snap can be adjusted by passing a \`snap\` option as a strength value between \`0\` and \`1\`.

\`\`\`
<Cursor :magnetic="{ snap: 1 }" />
\`\`\`

By setting \`morph\` to \`false\`, the \`Cursor\` will retain its size when magnetically attracted to a target.

\`\`\`
<Cursor :magnetic="{ morph: false }" />
\`\`\`

### \`useMagneticPull\`

It's also possible to apply a magnetic pull in the opposite direction, on an element towards the cursor, using the \`useMagneticPull\` hook.

This hook can be used together, or independently of \`Cursor\`.

\`\`\`
import { useMagneticPull } from "motion-plus-vue"
\`\`\`

It accepts a \`ref\` of a potential target element, like a \`button\` or \`a\`. When this element is hovered, the returned [motion values](/docs/react-motion-value.md) will update with the transforms required to pull an element towards the cursor.

\`\`\`
<script setup>
import { useDomRef } from 'motion-v'
const buttonRef = useDomRef()
const { x, y } = useMagneticPull(ref, 0.1)
</script>

<template>
  <motion.button ref="buttonRef" :style="{ x, y }" />
</template>
\`\`\`

### Cursor state

It's possible to read the cursor state anywhere in your app with the \`useCursorState\` hook. A \`Cursor\` component doesn't need to be rendered for this hook to work.

\`\`\`
import { useCursorState } from "motion-plus-vue"

const state = useCursorState()
\`\`\`

Available state values are:

*   \`type\`: \`"pointer" | "default" | "text"\`
    
*   \`isPressed\`: \`boolean\`
    
*   \`fontSize\`: \`number\`, or \`null\` if no selectable text is currently hovered.
    
*   \`target\`: The hovered target element.
    
*   \`targetBoundingBox\`: A viewport-relative bounding box object of the hovered active target, or \`null\` if none.It's possible to manually change \`type\` via HTML by passing \`data-cursor\` to any element:
    

It's possible to manually change \`type\` via HTML by passing \`data-cursor\` to any element:

\`\`\`
<section data-cursor="pointer"></section>
\`\`\`

\`useCursorState\` also makes it possible to provide different dimensions for the default pointer.

\`\`\`
<script setup>
  const state = useCursorState()
  const size = computed(()=>({
    width: state.value.type === "pointer" ? 50 : 20,
    height: state.value.type === "pointer" ? 50 : 20
  }))
</script>

<template>  
  <Cursor :style="size" />
</template>
\`\`\`

## Options

\`Cursor\` renders a \`[motion.div](/docs/vue-motion-component.md)\` so supports many of the same options, as we've seen with \`exit\` and \`variants\`. It also supports the following options:

### \`follow\`

**Default:** \`false\`

By default, \`Cursor\` will replace the browser cursor. Set \`follow\` to replace this

\`\`\`
<Cursor follow>
  <p>I am following the mouse</p>
</Cursor>
\`\`\`

**Note:** Enabling \`follow\` will disable the custom cursor styles, so you will need to render your own content.

### \`center\`

**Default:** In cursor mode, \`{ x: 0.5, y: 0.5 }\` (center) and in follow mode \`{ x: 0, y: 0 }\` (top left)

An \`x\`/\`y\` point, defined as a \`0\`\\-\`1\` progress value, that defines a center point for the cursor. This point will be the "active" pixel, the hit point of the cursor.

On the \`x\` axis, \`0\` is the left and \`1\` the right point.

On the \`y\` axis, \`0\` is the top and \`1\` the bottom point.

\`\`\`
<Cursor :center="{ x: 0, y: 0.5 }" />
\`\`\`

### \`offset\`

**Default:** \`false\`

An \`x\`/\`y\` point, defined in pixels, that can shift the cursor around the \`center\` point. Use this to get pixel-perfect accuracy with aligning custom cursor.

\`\`\`
<Cursor :offset="{ x: -1, y: -1 }" />
\`\`\`

### \`spring\`

**Default:** \`false\`

Defines a spring to attach to pointer movement. You can use this to trail the pointer movement with a delay.

\`\`\`
<Cursor follow :spring="{ stiffness: 500, mass: 2 }" />
\`\`\`

### \`matchTextSize\`

**Default:** \`true\`

The default custom cursor will match the text size of the hovered text (if selectable). Use this to disable that behaviour.

\`\`\`
<Cursor :matchTextSize="false" />
\`\`\`

### \`magnetic\`

**Default:** \`false\`

If \`true\`, the \`Cursor\` will magnetically snap to active targets (clickable elements).

\`\`\`
<Cursor magnetic />
\`\`\`

By default, it will also morph to the shape of the target, but it's possible to pass some options to adjust this behaviour.

#### \`morph\`

**Default:** \`true\`

Whether to morph the \`width\`/\`height\` of the \`Cursor\` when a target is hovered.

\`\`\`
<Cursor :magnetic="{ morph: false }" />
\`\`\`

#### \`snap\`

**Default:** \`0.8\`

A snap strength value between \`0\` and \`1\`.

*   \`0\` means there's no snapping and the cursor will follow the user's cursor freely.
    
*   \`1\` is total snapping, the cursor won't react to the pointer until the target is no longer hovered.
    

\`\`\`
<Cursor :magnetic="{ snap: 0.2 }" />
\`\`\`

#### \`padding\`

**Default:** \`5\`

A value, in pixels, to add padding to the morphed cursor size.`
                }
            ]
        };
    });
    // Ticker
    server.registerResource("Vue: Ticker", docsUri("vue", "ticker"), {
        description: "Create infinitly-scrolling ticker and marquee effects with Motion for Vue's Ticker component. Looping, dragging and scrolling animations are all possible with this lightweight and performant component.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "ticker");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Ticker

Ticker makes it quick and simple to build infinitely-scrolling marquee-style animations.

It's exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time fee, all-in membership that offers exclusive components, premium examples and access to a private Discord community.

Motion+ Ticker is:

*   **Lightweight:** Just \`+2.6kb\` on top of Motion for Vue.
    
*   **Accessible:** Focus trapping for unobtrusive keyboard navigation and mandatory respect for "reduced motion" OS settings.
    
*   **Multiaxis:** Create either vertical or horizontal tickers.
    
*   **Flexible:** Defaults to a velocity-based animation but can be powered by your own [motion values](/docs/vue-motion-value.md).
    
*   **Performant:** Clones the theoretical minimum of elements.
    

Its simple API makes infinite tickers quick to make. Items are automatically repeated, meaning the absolute minimum number of clones are created for the current viewport.

\`\`\`
<Ticker>
  😂
</Ticker>
\`\`\`

Powered by \`[<motion>](/docs/vue-motion-component.md)\` [components](/docs/vue-motion-component.md), it's straightforward to drive the ticker offset with motion values to create scroll-driven or draggable tickers.

\`\`\`
<script setup>
const { scrollY } = useScroll()
</script>

<template>
 <Ticker :offset="scrollY" />  
</template>
\`\`\`

In this guide, we'll learn how to install \`Ticker\` and use it to create various animation effects.

## Install

\`Ticker\` is available via the \`"motion-plus-vue"\`package on npm:

\`\`\`
npm install motion-plus-vue
\`\`\`

## Usage

Import the \`Ticker\` component from \`"motion-plus-vue"\`:

\`\`\`
import { Ticker } from "motion-plus-vue"
\`\`\`

The \`Ticker\` component receives its items via the \`default slot\`.

You can place any components, strings, or numbers as children inside the <Ticker> tags:

\`\`\`
<Ticker>
  <Box src="sonic3" title="Sonic 3" />  <!-- This will be one ticker item -->
  <div>Some text</div>                   <!-- This will be another ticker item -->
  123                                    <!-- This will be a third ticker item -->
</Ticker>
<!-- This will generate 3 ticker items -->
\`\`\`

\`\`\`
<Ticker>
  <Box src="sonic3" title="Sonic 3" />
  <!-- This Fragment and its children will be treated as a single ticker item -->
  <Fragment>
    <div>Some text</div>
    123
  </Fragment>
</Ticker>
\`\`\`

### Direction

By default, tickers will scroll horizontally, but via the \`axis\` prop we can lay out and animate items on the \`"y"\` axis too.

\`\`\`
<Ticker axis="y" />
\`\`\`

### Adjust speed

Setting the \`velocity\` prop (in pixels per second) will change the speed and direction of the ticker animation.

\`\`\`
<Ticker :velocity="100" />
\`\`\`

Flipping this to a negative value will reverse the direction of the ticker.

\`\`\`
<Ticker :velocity="-100" />
\`\`\`

Whereas setting it to \`0\` will stop all motion.

\`\`\`
<Ticker :velocity="0" />
\`\`\`

### Adjust speed on hover

To adjust the speed of a ticker when it receives hover, \`hoverFactor\` can be set as a multiplicative number.

For example, setting it to \`0\` will stop the ticker on hover.

\`\`\`
<Ticker :hoverFactor="0" />
\`\`\`

Whereas setting it to \`0.5\` would slow the ticker animation by half during the hover.

\`\`\`
<Ticker :hoverFactor="0.5" />
\`\`\`

### Layout

Items are laid out across the selected \`axis\` using flexbox. By passing \`gap\` and \`align\` props, we can adjust the spacing and off-axis alignment of the items.

\`\`\`
<Ticker :gap="0" align="start" />
\`\`\`

### Overflow

By setting \`overflow\` to \`true\`, items will visually extend out from the container to the edges of the viewport.

\`\`\`
<Ticker overflow >
  ...
</Ticker>
\`\`\`

This makes it straightforward to place a \`Ticker\` within a document flow but still extend the ticker effect across the full viewport.

###   

### Manual control

By default, the ticker controls its own offset via an internally-created [motion value](/docs/vue-motion-value.md).

By passing a different motion value via the \`offset\` prop, we can take manual control of the offset.

\`\`\`
<script setup>
const offset = useMotionValue(0)
</script>

<template>
  <Ticker :offset="offset" />
</template>
\`\`\`

Now, when the offset motion value is changed, the offset of the ticker will update.

\`\`\`
<button @click="offset.set(-100)" />
\`\`\`

Any motion value can be passed into the ticker, like those returned from \`[useScroll](/docs/vue-use-scroll.md)\` or ones wired up to the drag gesture.

### Link items to ticker offset

The \`useTickerItem\` hook returns a motion value that updates with each item's current position in the ticker.

This motion value can be used to drive the animation of each individual item.

\`\`\`
<!-- Item component -->
<script setup>
import { useTickerItem } from 'motion-plus-vue'
import { useTransform } from 'motion-v'

const { offset } = useTickerItem()
const rotate = useTransform(offset, [0, 300], [0, 360], { clamp: false })
</script>

<template>
  <motion.div :style="{ rotate }">
    😂
  </motion.div>
</template>
\`\`\`

\`\`\`
<Ticker>
  <Item />
</Ticker>
\`\`\`

## Accessibility

### Reduced motion

Unless \`offset\` is defined, \`Ticker\` automatically respects the OS "reduced motion" setting.

### Keyboard navigation

\`Ticker\` will detect if any item within it receives focus via keypress. The animation will stop, and the first item inside the ticker will receive focus.

From here, left/right arrows (or up/down for \`axis="y"\`) can be used to navigate between focusable elements within the original (not cloned) items. Tab or shift-tab will break this focus trap.

This approach ensures tickers with many items don't hog keyboard navigation.

## Options

\`Ticker\` renders a \`[motion.div](/docs/vue-motion-component.md)\`, so it supports most of the same props. It also supports the following options:

\`\`\`
<template>
  <Ticker>
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
  </Ticker>
</template>
\`\`\`

### \`axis\`

**Default:** \`"x"\`

Determines on which axis the ticker should lay out and repeat items.

### \`velocity\`

**Default:** \`50\`

The velocity of the ticker scroll animation in pixels per second.

\`\`\`
<Ticker :velocity="-50" /> // Reversed
\`\`\`

\`\`\`
<Ticker :velocity="0" /> // Stopped
\`\`\`

### \`hoverFactor\`

**Default:** \`1\`

A factor to apply to the current velocity when the ticker is hovered.

\`\`\`
<Ticker :hoverFactor="0" /> // Will stop on hover
\`\`\`

\`\`\`
<Ticker :hoverFactor="0.5" /> // Will half speed on hover
\`\`\`

### \`gap\`

**Default:** \`10\`

A gap to apply between items, in pixels.

### \`align\`

**Default:** \`"center"\`

Alignment of items within the ticker's off-axis. For example, if this is a y-axis ticker, this will align items horizontally within the ticker.

Can be set to \`"start"\`, \`"center"\` or \`"end"\`.

### \`offset\`

A motion value to externally control ticker offset.

If provided, this option will disable the automatic ticker animation.

\`\`\`
<script setup>
import { useScroll, useTransform } from 'motion-v'

const { scrollY } = useScroll()
const invertScroll = useTransform(() => scrollY.get() * -1)
</script>

<template>
  <Ticker :offset="invertScroll">
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
  </Ticker>
</template>
\`\`\`

The \`Ticker\` renders its items in such a way that \`offset\` can be set to any numerical value, and it will be correctly wrapped so that items display correctly on screen.`
                }
            ]
        };
    });
    // Typewriter
    server.registerResource("Vue: Typewriter", docsUri("vue", "typewriter"), {
        description: "A customizable typewriter animation component for Vue that creates realistic typing animations with human-like variance, stylable cursors and accessibility.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("vue", "typewriter");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Typewriter

\`Typewriter\` is a 1.5kb Vue component for creating realistic typewriter animations.

## Features

*   **Natural animation:** Typing speeds and variance emulate real-world behaviours
    
*   **Playback control:** For easy scroll-triggered animations
    
*   **Accessible:** Correct ARIA labels for screen reader compatibility
    
*   **Reactive:** Will animate with backspace and typing to the latest provided value
    

\`Typewriter\` has a simple API.

\`\`\`
<Typewriter>Hello world!</Typewriter>
\`\`\`

When its content changes, it'll naturally type from the current content to the new content.

Typing speed is naturally variable, for example taking slight pauses between sentences and slowing down during longer words.

The text and cursor can be styled independently, and everything about the animation and typing behaviour can be modified.

\`\`\`
<Typewriter
  speed="fast"
  :variance="0.8"
  backspace="word"
  :cursorBlinkSpeed="2"
>
  {{text}}
</Typewriter>
\`\`\`

It's exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time fee, all-in membership that offers exclusive components, premium examples and access to a private Discord community.

## Usage

### Import

Install Motion+:

\`\`\`
npm install motion-plus-vue
\`\`\`

Then import from \`"motion-plus-vue"\`:

\`\`\`
import { Typewriter } from "motion-plus-vue"
\`\`\`

### Animate

By passing a string as the \`Typewriter\` child, it will animate that text in character by character.

\`\`\`
<Typewriter>Hello world!</Typewriter>
\`\`\`

### Adjust speed

The animation will emulate "normal" real-world typing speeds, based on real research. It's also possible to set speed as \`"fast"\`, \`"slow"\`, or a custom interval (in milliseconds).

\`\`\`
<Typewriter speed="slow">Hello world!</Typewriter>
\`\`\`

By default, the typing speed will vary naturally per character, based on the type of content being "typed".

For example, typing will slow down while typing long words, while at the start/end of a word, when using punctuation, or when using uncommon character combinations.

This can be configured with the \`variance\` prop. This is a \`0\`\\-\`1\` factor applied to \`speed\`, to create a range of speeds that we can randomly select between.

So for instance if we want no variance then we can set this to \`0\`.

\`\`\`
<Typewriter :variance="0">Hello world!</Typewriter>
\`\`\`

Or to have some variance it could be set to \`0.5\`:

\`\`\`
<Typewriter :variance="0.5">Hello world!</Typewriter>
\`\`\`

### Changing content

When the content passed to \`Typewriter\` changes, a backspace animation will replace the old text with the new text.

\`\`\`
<script setup lang="ts">
  defineProps<{
    text: string
  }>()
</script>
  
<template>
  <Typewriter>{{ text }}</Typewriter>
</template>
\`\`\`

By default, each character will be backspaced individually. Using the \`backspace\` prop we can also backspace each word/special character:

\`\`\`
<Typewriter backspace="word">{{text}}</Typewriter>
\`\`\`

Or remove all the mismatching content immediately:

\`\`\`
<Typewriter backspace="all">{{text}}</Typewriter>
\`\`\`

### Cursor blink speed

Emulating real-world cursors, the cursor **doesn't animate** during an active typing animation.

Before or after typing, the cursor completes a blink cycle in \`0.5\` seconds. This can be adjusted using \`cursorBlinkDuration\`:

\`\`\`
<Typewriter :cursorBlinkDuration="2">Hello world!</Typewriter>
\`\`\`

### Playback control

Animations will play by default, but can be paused at any time by setting \`play={false}\`.

This control makes it straightforward to, for instance, play animations only when they're within the viewport.

\`\`\`
<script setup lang="ts" >
  const domRef = ref()
  const isInView = useInView(ref)
</script>

<template>
  <Typewriter ref="domRef" :play="isInView">
    Hello world!
  </Typewriter>
</template>
\`\`\`

## Props

### \`as\`

**Default:** \`"span"\`

Set an element to render as.

\`\`\`
<Typewriter as="h1">Hello world!</Typewriter>
\`\`\`

### \`speed\`

**Default:** \`"normal"\`

The typing speed of the animation.

Set as \`"slow"\`, \`"normal"\` or \`"fast"\` to use a preset typing speed.

Or set as a duration, in **milliseconds**, to wait between keystrokes.

\`\`\`
<Typewriter :speed="90">Hello world!</Typewriter>
\`\`\`

### \`variance\`

**Default:** \`"natural"\`

The amount of variance between the timing of each character.

By default, this is set to \`"natural"\`. This will modify the timing between each character based on various factors:

*   Long words
    
*   Start/end of words
    
*   Punctuation
    
*   Uncommon character combinations
    

It can also be set to a factor where the speed can vary by the provided factor. For instance, setting to \`0\` will ensure a constant \`speed\`:

\`\`\`
// Constant 40ms between each character
<Typewriter :speed="40" variance="0">
\`\`\`

Whereas if we set this to \`0.5\`, then the speed can vary between \`speed\` plus/minus \`variance x speed\`:

\`\`\`
// Between 20ms and 60ms for each character
<Typewriter :speed="40" :variance="0.5">
\`\`\`

### \`play\`

**Default:** \`true\`

Animation will pause when \`play\` is \`false\`. For example, this can be used to play animations only when elements appear on screen.

\`\`\`
<script setup lang="ts" >
  const domRef = ref()
  const isInView = useInView(ref)
</script>

<template>
  <Typewriter ref="domRef" :play="isInView">
    Hello world!
  </Typewriter>
</template>
\`\`\`

### \`replace\`

**Default:** \`"type"\`

When the content changes, this sets the strategy for replacing the content.

*   \`"type"\`: Type from the current content to the new content.
    
*   \`"all"\`: Instantly delete existing content and start from scratch.
    

### \`backspace\`

**Default:** "character"

When the content changes in \`replace: "type"\` mode, \`Typewriter\` will animate back to the closest matching value between the old and new values using emulated backspaces.

This behaviour can be configured using the \`backspace\` prop:

*   \`"character"\`: Backspace each character individually.
    
*   \`"word"\`: Backspace each word (emulate option-backspace).
    
*   \`"all"\`: Delete everything instantly.
    

\`\`\`
<Typewriter backspace="all">
  {{content}}
</Typewriter>
\`\`\`

### \`backspaceFactor\`

**Default:** \`0.2\`

Configures the interval of each backspace with a factor that is relative to \`speed\`. For instance, if \`speed\` is set to \`100\`, then a factor of \`0.1\` will make each backspace 10ms.

Setting via a factor vs an absolute duration ensures you can adjust only \`speed\` and the whole animation will scale appropriately.

### \`cursorBlinkDuration\`

**Default:** \`0.5\`

When the cursor is blinking, the blink animation will take this long (in seconds).

\`\`\`
<Typewriter :cursorBlinkDuration="1">
\`\`\`

### \`cursorClassName\`

Apply this class to the cursor element for styling with CSS.

\`\`\`
<Typewriter cursorClassName="cursor">
\`\`\`

### \`cursorStyle\`

Apply styles directly to the cursor element.

\`\`\`
<Typewriter :cursorStyle="{ backgroundColor: 'red' }">
\`\`\`

### \`textClassName\`

Apply this class to the inner text element for styling with CSS.

\`\`\`
<Typewriter textClassName="typewriter-text">
\`\`\`

### \`textStyle\`

Apply styles directly to the cursor element.

\`\`\`
<Typewriter :textStyle="{ color: 'red' }">
\`\`\`

### \`onComplete\`

Callback to fire when the animation completes.`
                }
            ]
        };
    });
    // AnimateActivity
    server.registerResource("React: AnimateActivity", docsUri("react", "animate-activity"), {
        description: "AnimateActivity is Motion component for React that orchestrates enter and exit animations with React's Activity component. It handles exit animations before an element is hidden, preserving component and DOM state.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "animate-activity");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# AnimateActivity

\`AnimateActivity\` is an animated version of React's \`[Activity](https://react.dev/reference/react/Activity)\` component. It allows you to add exit animations when hiding elements.

Whereas \`[AnimatePresence](/docs/react-animate-presence.md)\` animates elements when they're **added** and **removed** from the tree, \`AnimateActivity\` uses the \`Activity\` component to **show** and **hide** the children with \`display: none\`, maintaining their internal state.

\`\`\`
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
</AnimateActivity>
\`\`\`

\`AnimateActivity\` is currently available in [Motion+](https://motion.dev/plus) Early Access. As an Early Access API, expect changes as we receive feedback.

## Install

First, add the \`motion-plus\` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](https://motion.dev/plus) to generate a private token.

\`\`\`
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
\`\`\`

Once installed, \`AnimateActivity\` can be imported via \`motion-plus/animate-activity\`.

## Usage

\`AnimateActivity\` shares the same API as \`Activity\`. By switching the \`mode\` prop from \`"visible"\` to \`"hidden"\`, its child element will be hidden with \`display: none\` **after** child exit animations have completed.

\`\`\`
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <Tab />
</AnimateActivity>
\`\`\`

\`\`\`
function Tab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}
\`\`\`

### Sequencing

As with \`AnimatePresence\`, we can use [variants](https://motion.dev/docs/react-animation#variants) to sequence exit animations through a tree.

\`\`\`
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.ul
    exit="hidden"
    variants={{
      hidden: { delayChildren: stagger(0.1) }
    }}
  >
    {items.map(item => (
      <motion.li
        variants={{ hidden: { opacity: 0 }}}
      >
        {item.title}
      </motion.li>
    ))}
  </motion.ul>
</AnimateActivity>
\`\`\`

## Layout

By default, exiting children will maintain their default styles in the DOM. This means that if they're \`position: static\` or in some way affecting the layout of the elements around them, they continue to do so until the exit animation is complete.

We can change this by setting \`layoutMode\` to \`"pop"\`. This will immediately pop the element out of its layout, allowing surrounding elements to reflow while it exits.

\`\`\`
<AnimateActivity
  mode={isVisible ? "visible" : "hidden"}
  layoutMode="pop"
/>
\`\`\`

## Props

### \`initial\`

By passing \`initial={false}\`, \`AnimateActivity\` will disable any initial animations on children that are present when the component is first rendered.

\`\`\`
<AnimateActivity
  initial={false}
  mode={isSelected ? "visible" : "hidden"}
>
  <Tab />
</AnimateActivity>
\`\`\`

### \`mode\`

\`"visible | "hidden"\`

Whether to set the child as visible or hidden via \`display: none\`. Setting to \`"hidden"\` will trigger \`exit\` animations.

### \`layoutMode\`

\`"default" | "pop"\`

If set to \`"default"\`, child layout will be unaffected during exit animations.

If set to \`"pop"\`, exiting elements will be "popped" out of the page layout, allowing surrounding elements to immediately reflow. Pairs especially well with the \`layout\` prop, so elements can animate to their new layout.

**Custom component note:** When using \`layoutMode="pop"\`, the immediate child of \`AnimateActivity\` **must** forward the provided \`ref\` to the DOM node you wish to pop out of the layout.`
                }
            ]
        };
    });
    // AnimateNumber
    server.registerResource("React: AnimateNumber", docsUri("react", "animate-number"), {
        description: "Create beautiful number animations like countdowns with AnimateNumber and Motion. Leverages Motion's layout animations and transitions. Lightweight at just 2.5kb.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "animate-number");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# AnimateNumber

\`AnimateNumber\` is a lightweight (2.5kb) React component for creating beautiful number animations with Motion. It's perfect for counters, dynamic pricing, countdowns, and more.

\`\`\`
<AnimateNumber>{count}</AnimateNumber>
\`\`\`

Built on top of Motion's powerful layout animations, \`AnimateNumber\` allows you to leverage all of Motion's existing transition settings, like \`spring\` and \`tween\`, to create fluid and engaging effects.

\`AnimateNumber\` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

## Features

*   **Built on Motion:** Leverages Motion's robust animation engine, allowing you to use familiar \`transition\` props like \`spring\`, \`duration\`, and \`ease\`.
    
*   **Lightweight:** Adds only 2.5kb on top of Motion.
    
*   **Advanced formatting:** Uses the built-in \`Intl.NumberFormat\` for powerful, locale-aware number formatting (e.g., currency, compact notation).
    
*   **Customisable:** Provides distinct CSS classes for each part of the number (prefix, integer, fraction, suffix) for full styling control.
    

## Install

First, add the \`motion-plus\` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](https://motion.dev/plus) to generate a private token.

\`\`\`
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
\`\`\`

## Usage

\`AnimateNumber\` accepts a single child, a number.

\`\`\`
<AnimateNumber>300</AnimateNumber>
\`\`\`

When this number changes, it'll animate to its latest value.

\`\`\`
import { AnimateNumber } from "motion-plus/react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <AnimateNumber>{count}</AnimateNumber>
    </>
  )
}
\`\`\`

### Customise animation

The \`transition\` prop accepts Motion for React's [transition options](/docs/react-transitions.md).

\`\`\`
<AnimateNumber transition={{ type: "spring" }}>
\`\`\`

\`transition\` accepts value-specific transition settings, so it's possible to set specific transitions for \`layout\`, \`y\` and \`opacity\`:

\`\`\`
<AnimateNumber transition={{
  layout: { duration: 0.3 },
  opacity: { ease: "linear" },
  y: { type: "spring", visualDuration: 0.4, bounce: 0.2 }
}}>
\`\`\`

### Formatting numbers

\`AnimateNumber\` uses the browser's built-in \`[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)\` to format numbers and, as such, exposes some of its formatting options.

\`\`\`
<AnimateNumber format={{ notation: "compact" }}>
\`\`\`

### Adding a prefix/suffix

It's also possible to \`prefix\` and \`suffix\` the number with custom text content:

\`\`\`
<AnimateNumber
  format={{ style: "currency", currency: "USD" }}
  locales="en-US"
  suffix="/mo"
>
\`\`\`

### Styling

Each section of the number has a unique class that can be used to target it with CSS.

The available classes are:

*   \`number-section-pre\`: \`prefix\` and other text before the number
    
*   \`number-section-integer\`: Before the decimal
    
*   \`number-section-fraction\`: After the decimal
    
*   \`number-section-post\`: \`suffix\` and other text after the number
    

## Options

### \`transition\`

Accepts Motion for React's [transition options](/docs/react-transitions.md).

### \`prefix\`

Custom text content to render before the number.

### \`suffix\`

Custom text content to render after the number.

### \`format\`

Accepts \`[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options)\` [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options).

### \`locales\`

Accepts \`[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales)\` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales)\`[locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales)\` [argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales).

\`\`\`
// Will render as US$300 outside US
<AnimateNumber format={{ currency: "USD", style: "currency" }}>
  300
</AnimateNumber>
\`\`\`

\`\`\`
// Will always render as $300
<AnimateNumber locales="en-US" format={{ currency: "USD", style: "currency" }}>
  300
</AnimateNumber>
\`\`\``
                }
            ]
        };
    });
    // Carousel
    server.registerResource("React: Carousel", docsUri("react", "carousel"), {
        description: "A production-ready React carousel featuring infinite scrolling, composable controls, and animated pagination. Lightweight, fully accessible, and supports touch, wheel, and keyboard navigation.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "carousel");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Carousel

The Carousel component creates performant, accessible and fully-featured carousels in React. It's designed to be flexible and easy to use, supporting pointer, wheel and keyboard navigation out the box.

It allows you to go beyond the traditional limitations of CSS-only approaches, with support for infinitely-scrolling carousels and without limitations on styling.

### Features

*   **Lightweight:** Just \`+5.5kb\` on top of [the](/docs/react-motion-component.md) \`[motion](/docs/react-motion-component.md)\` [component](/docs/react-motion-component.md).
    
*   **Accessible:** Automatic ARIA labels, respects reduced motion, RTL layouts, and all major input methods.
    
*   **Performant:** Built on the same [unique rendering](https://motion.dev/blog/building-the-ultimate-ticker) used by the [Ticker](/docs/react-ticker.md) component that achieves infinite scrolling with while minimising or eliminating item cloning.
    
*   **Customisable:** Provides functions and state to easily create custom controls and pagination.
    

## Install

First, add the \`motion-plus\` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](https://motion.dev/plus) to generate a private token.

\`\`\`
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
\`\`\`

## Usage

### Import

Import the \`Carousel\` component from "motion-plus/react"\\\`:

\`\`\`
import { Carousel } from "motion-plus/react"
\`\`\`

\`Carousel\` accepts a single mandatory prop, \`items\`. This is a list of valid React nodes (which can be components, strings or numbers):

\`\`\`
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Carousel items={items} />
\`\`\`

### Direction

By default, carousels will scroll horizontally. Setting the \`axis\` prop to \`y\`, we can make them vertical.

\`\`\`
<Carousel items={items} axis="y" />
\`\`\`

### Layout

Items are laid out via flexbox. Passing \`gap\` and \`align\` will adjust the spacing and off-axis alignment of them items.

\`\`\`
<Carousel items={items} gap={0} align="start" />
\`\`\`

### Overflow

By setting \`overflow\` to \`true\`, items will visually extend out from the container to the edges of the viewport.

\`\`\`
<Carousel items={items} overflow />
\`\`\`

This makes it straightforward to place a \`Carousel\` within a document flow but still extend the ticker effect across the full viewport.

### Infinite scrolling

By default, carousels will scroll infinitely. This can be disabled by setting \`loop={false}\`.

\`\`\`
<Carousel items={items} loop={false} />
\`\`\`

### Layout

By default, each item will be sized according to its contents. By setting \`itemSize="fill"\`, items will extend the match the width of the container.

\`\`\`
<Carousel items={items} itemSize="fill" />
\`\`\`

### Snapping

By default, drag and wheel controls will snap between pages. By setting \`snap={false}\`, snapping can be disabled and the carousel will freely scroll.

\`\`\`
<Carousel items={items} snap={false} />
\`\`\`

### Custom controls

Custom controls can be passed to \`Carousel\` as children.

\`\`\`
<Carousel loop={false} items={items}>
  <Next />
</Carousel>
\`\`\`

Any component rendered within \`Carousel\` can call \`useCarousel\` to access state and pagination functions. This hook provides:

*   \`nextPage\`/\`prevPage\`: Paginate next/previous.
    
*   \`gotoPage\`: Pass it a page index to animate to this page.
    
*   \`isNextActive\`/\`isPrevActive\`: If \`loop={false}\` then these will be false when we hit the limits of the carousel.
    
*   \`currentPage\`: Index of the current page
    
*   \`totalPages\`: Number of total pages.
    

\`\`\`
import { useCarousel } from "motion-plus/react"

function Next() {
  const { nextPage, isNextActive } = useCarousel()
  
  return (
    <button disabled={!isNextActive} onClick={nextPage}>
      Next
    </button>
  )
}
\`\`\`

### Autoplay

With \`currentPage\` and \`nextPage\` from \`useCarousel\`, we can also set up our own autoplay functionality.

By passing \`currentPage\` to the \`useEffect\`, the timer will restart whenever the page changes, whether that's from a swipe/drag, or from the autoplay timer itself.

\`\`\`
const { currentPage, nextPage } = useCarousel()
const progress = useMotionValue(0)

useEffect(() => {
    const animation = animate(progress, [0, 1], {
        duration,
        ease: "linear",
        onComplete: nextPage,
    })

    return () => animation.stop()
}, [duration, nextPage, progress, currentPage])
\`\`\`

### Pagination visualisation

By using \`currentPage\`, \`totalPages\` and \`gotoPage\` from \`useCarousel\`, a custom pagination indicator/navigator can be built.

\`\`\`
function Pagination() {
  const { currentPage, totalPages, gotoPage } = useCarousel()

  return (
    <ul className="dots">
      {Array.from({ length: totalPages }, (_, index) => (
        <li className="dot">
          <motion.button
              initial={false}
              animate={{ opacity: currentPage === index ? 1 : 0.5 }}
              onClick={() => gotoPage(index)}
          />
        </li>
      )}
    </ul>
  )
}
\`\`\`

###   

### Animate items with carousel scroll

\`Carousel\` renders a \`Ticker\` under-the-hood, so it has full access to the \`useTickerItem\` hook. \`useTickerItem\` returns information about the item that you can use to create bespoke per-item animations.

It returns:

*   \`offset\`: A \`[MotionValue](/docs/react-motion-value.md)\` that represents the item's scroll offset relative to the container. At \`0\`, the item is visually aligned to the start of the ticker. Note that this will be flipped in RTL layouts.
    
*   \`start\`/\`end\`: The start and end boundaries of the item layout within the ticker. Note that these are reversed in RTL layouts.
    
*   \`itemIndex\`: The \`index\` of this item. For clones, this \`index\` value will represent the index value of the original item.
    

\`\`\`
function Item() {
  const { offset } = useTickerItem()
  const rotate = useTransform(offset, [0, 300], [0, 360], { clamp: false })

  return (
    <motion.div style={{ rotate }}>
      😂
    </motion.div>
  )
}
\`\`\`

\`\`\`
<Carousel items={[<Item />]} />
\`\`\`

## Options

\`Carousel\` renders a \`[<motion />](/docs/react-motion-component.md)\` component, so it accepts most of the same props. It also supports the following options:

### \`items\`

**Required.** An array of strings or React components to render. If looping, this list will be cloned as many times as needed to visually fill the ticker.

\`\`\`
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Carousel items={items} />
\`\`\`

### \`axis\`

**Default:** \`"x"\`

Determines on which axis the ticker should lay out and scroll.

\`\`\`
<Carousel items={items} axis="y" />
\`\`\`

### \`gap\`

**Default:** \`10\`

A gap to apply between items, in pixels.

### \`align\`

**Default:** \`"center"\`

Alignment of items within the ticker's off-axis. For example, if this is a y-axis ticker, this will align items horizontally within the ticker.

Can be set to \`"start"\`, \`"center"\` or \`"end"\`.

### \`loop\`

**Default:** \`true\`

Whether to infinitely loop items. If set to \`false\`, items won't be cloned and pagination will stop at either end of the carousel.

\`\`\`
<Carousel items={items} loop={false} />
\`\`\`

### \`overflow\`

**Default:** \`false\`

Whether to overflow items beyond the constraints of the carousel.

\`\`\`
<Carousel items={items} overflow />
\`\`\`

### \`snap\`

**Default:** \`"page"\`

By default, drag and wheel scroll will snap to the nearest page. This can be disabled by setting \`snap={false}\`.

\`\`\`
<Carousel items={items} snap={false} />
\`\`\`

### \`transition\`

A [transition](/docs/react-transitions.md) to use when the Carousel is paginated.

\`\`\`
<Carousel 
  items={items}
  transition={{ type: "spring", stiffness: 300 }}
/>
\`\`\`

### \`fade\`

**Default:** \`**0**\`

Fades the content out at each end of the carousel container. Can be set either as a number (pixels) or \`%\`.

When \`loop={false}\`, the fade will automatically disappear when the edges of the carousel are reached.

\`\`\`
<Carousel items={items} fade={100} />
\`\`\`

### \`fadeTransition\`

The [transition](/docs/react-transitions.md) to use to animate the \`fade\` in and out.

\`\`\`
<Carousel
  items={items}
  fade={100}
  fadeTransition={{ duration: 2 }}
/>
\`\`\`

### \`safeMargin\`

**Default:** \`0\`

\`Ticker\` uses a [unique reprojection renderer](https://motion.dev/blog/building-the-ultimate-ticker), which can reduce or eliminate item cloning. Technically, this works by reprojecting items that disappear off the start of the visible area over to the end.

The calculation for this is based on the item and ticker container's layout. If you're rotating the ticker, or transforming its items in some way that brings them back inside the visible area, you may see items disappear as they reproject. If so, you can use \`safeMargin\` to increase the visible area to compensate.

\`\`\`
<Carousel items={items} safeMargin={100} />
\`\`\`

### \`as\`

**Default:** \`"div"\`

The HTML element to use to render the carousel container.

\`\`\`
<Carousel items={items} as="section" />
\`\`\``
                }
            ]
        };
    });
    // Cursor
    server.registerResource("React: Cursor", docsUri("react", "cursor"), {
        description: "Create custom cursors and follow-along effects in React with Motion+ Cursor. It auto-adapts to links, text, & buttons. Style with CSS, animate with Motion.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "cursor");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Cursor

\`Cursor\` is a powerful React component for building creative and interactive cursor effects. Effortlessly replace the default browser cursor, create engaging follow-cursor animations, or add magnetic snapping to UI elements.

Built on Motion's [layout animations](/docs/react-layout-animations.md), \`Cursor\` is performant and full customisable with variants, CSS and custom React components.

\`\`\`
<Cursor />
\`\`\`

\`Cursor\` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

## Features

*   **Two modes:** Easily switch between replacing the default cursor or creating a "follow" cursor effect.
    
*   **State-aware:** Automatically adapts its appearance when hovering over links, buttons, or selectable text, and when pressed.
    
*   **Magnetic:** Make the cursor snap to interactive elements on hover for a tactile feel.
    
*   **Customisable:** Use CSS, Motion variants, and custom React components to create any cursor you can imagine.
    
*   **Accessible:** Can be disabled for users who prefer reduced motion.
    

## Install

First, add the \`motion-plus\` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](https://motion.dev/plus) to generate a private token.

\`\`\`
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
\`\`\`

## Usage

The \`Cursor\` component is used for both custom cursor and follow cursor effects:

\`\`\`
import { Cursor } from "motion-plus/react"
\`\`\`

When \`Cursor\` is rendered, a default custom cursor will render on the page, hiding the browser's default cursor.

\`\`\`
<Cursor />
\`\`\`

You can remove the cursor and restore the browser cursor at any time by removing the component.

\`\`\`
{isCursorVisible ? <Cursor /> : null}
\`\`\`

### Styling

By default, the cursor is a neutral grey color. It's possible to change the cursor's styles using CSS.

\`\`\`
<Cursor className="my-cursor" style={{ backgroundColor: "red" }} />
\`\`\`

####   

#### Styling \`border-radius\`

Cursor uses Motion's [layout animations](/docs/react-layout-animations.md) to animate its width and height via performant transforms. As such, \`borderRadius\` currently needs to be set via the \`style\` prop, or an animation prop like \`animate\`, \`whileHover\` etc, to enable scale correction:

\`\`\`
<Cursor style={{ borderRadius: 5 }} />
\`\`\`

### Variants

The Cursor component and its children have access to special variants that you can use to animate based on the cursor state.

\`\`\`
const variants = {
  pressed: { scale: 0.5, filter: "blur(5px)" }
}

return <Cursor variants={variants} />
\`\`\`

Available variants are:

*   \`default\`: Base cursor state
    
*   \`text\`: When hovering text
    
*   \`pointer\`: When hovering a link or button
    
*   \`pressed\`: When the mouse is pressed
    
*   \`magnetic\`: When the cursor is magnetically snapped to a target
    
*   \`exit\`: During exit animations
    

### Custom content

When \`Cursor\` is passed \`children\`, it's \`width\` and \`height\` will stop reacting to press and text targets, and become the size of its content.

\`\`\`
<Cursor>
  <p>Custom content!</p>
</Cursor>
\`\`\`

If \`width\` or \`height\` are passed via \`style\`, this behaviour will be overridden.

\`\`\`
<Cursor style={{ width: 100 }}>
  <p>Custom content!</p>
</Cursor>
\`\`\`

### Exit animations

The \`Cursor\` component already wraps children with \`[AnimatePresence](/docs/react-animate-presence.md)\` which means children have access to the \`exit\` prop. This enables exit animations as you add/remove custom content:

\`\`\`
<Cursor>
  {showCustomContent ? (<motion.div exit={{ opacity: 0 }} />) : null}
</Cursor>
\`\`\`

To enable exit animations on the cursor itself, you can also wrap it in \`AnimatePresence\`:

\`\`\`
<AnimatePresence>
  {isCursorVisible ? <Cursor /> : null}
</AnimatePresence>
\`\`\`

It has default exit animations included, but these can be customised by an \`exit\` variant:

\`\`\`
const variants = {
  exit: { opacity: 0 }
}

return <Cursor variants={variants} />
\`\`\`

### Follow cursor

By default, Cursor will replace the browser cursor. By setting \`follow\`, it will follow it instead.

\`\`\`
<Cursor follow />
\`\`\`

### Magnetic snapping

By setting the \`magnetic\` prop, the \`Cursor\` will magnetically snap to the target element on hover.

\`\`\`
<Cursor magnetic />
\`\`\`

The intensity of the snap can be adjusted by passing a \`snap\` option as a strength value between \`0\` and \`1\`.

\`\`\`
<Cursor magnetic={{ snap: 1 }} />
\`\`\`

By setting \`morph\` to \`false\`, the \`Cursor\` will retain its size when magnetically attracted to a target.

\`\`\`
<Cursor magnetic={{ morph: false }} />
\`\`\`

#### \`useMagneticPull\`

It's also possible to apply a magnetic pull in the opposite direction, on an element towards the cursor, using the \`useMagneticPull\` hook.

  

This hook can be used together, or independently of \`Cursor\`.

\`\`\`
import { useMagneticPull } from "motion-plus/react"
\`\`\`

It accepts a \`ref\` of a potential target element, like a \`button\` or \`a\`. When this element is hovered, the returned [motion values](/docs/react-motion-value.md) will update with the transforms required to pull an element towards the cursor.

\`\`\`
const ref = useRef(null)
const { x, y } = useMagneticPull(ref, 0.1)

return <motion.button ref={ref} style={{ x, y }} />
\`\`\`

### Cursor state

It's possible to read the cursor state anywhere in your app with the \`useCursorState\` hook. A \`Cursor\` component doesn't need to be rendered for this hook to work.

\`\`\`
import { useCursorState } from "motion-plus/react"

const { type, isPressed, fontSize } = useCursorState()
\`\`\`

Available state values are:

*   \`type\`: \`"pointer" | "default" | "text"\`
    
*   \`isPressed\`: \`boolean\`
    
*   \`fontSize\`: \`number\`, or \`null\` if no selectable text is currently hovered.
    
*   \`target\`: The hovered target element.
    
*   \`targetBoundingBox\`: A viewport-relative bounding box object of the hovered active target, or \`null\` if none.
    
*   \`zone\`: The value of the closest hovered \`data-cursor-zone\` attribute.
    

It's possible to manually change \`type\` via HTML by passing \`data-cursor\` to any element:

\`\`\`
<section data-cursor="pointer"></section>
\`\`\`

\`useCursorState\` also makes it possible to provide different dimensions for the default pointer.

\`\`\`
const { type } = useCursorState()

const size = {
  width: type === "pointer" ? 50 : 20,
  height: type === "pointer" ? 50 : 20
}

return <Cursor style={size} />
\`\`\`

### Zones

It's possible to adapt our cursor (or even add/remove one) based on the currently hovered "zone", or area of the web page.

We can define a zone with the \`data-cursor-zone\` attribute:

\`\`\`
<img data-cursor-zone="gallery-preview" />
\`\`\`

We can then use \`useCursorState()\` to respond when the cursor enters or leaves this zone:

\`\`\`
const { zone } = useCursorState()

return (
  <Cursor style={cursor}>
    {zone === "gallery-preview" ? (
        <p style={caption}>View gallery</p>
    ) : null}
  </Cursor>
)
\`\`\`

We often want to change a custom cursor (or even enable/disable one) based on the currently hovered "zone" or area of the web page.

For instance, in this next example the \`<img />\` tags have a \`data-cursor-zone="message"\` attribute. When the cursor enters these elements we can pass the name of the active zone via \`useCursorState()\`:

\`\`\`
const { zone } = useCursorState()
  
return (
  <Cursor style={cursor}>
    {zone === "message" ? (
      <p style={caption}>View gallery</p>
    ) : null}
  </Cursor>
)
\`\`\`

Equally, we could:

*   Change the cursor color
    
*   Change the \`mix-blend-mode\`
    
*   Change size/shape
    
*   Add/remove a custom cursor
    

## Accessibility

Custom cursors can be disabled for users who have enabled reduced motion in their OS settings using the \`[useReducedMotion](/docs/react-use-reduced-motion.md)\` [hook](/docs/react-use-reduced-motion.md).

\`\`\`
const shouldReduceMotion = useReducedMotion()

return shouldReduceMotion ? null : <Cursor />
\`\`\`

## Options

\`Cursor\` renders a \`[motion.div](/docs/react-motion-component.md)\`, so it supports most of the same props. It also supports the following options:

### \`follow\`

**Default:** \`false\`

By default, \`Cursor\` will replace the browser cursor. Set \`follow\` to replace this

\`\`\`
<Cursor follow>
  <p>I am following the mouse</p>
</Cursor>
\`\`\`

### \`center\`

**Default:** In cursor mode, \`{ x: 0.5, y: 0.5 }\` (center) and in follow mode \`{ x: 0, y: 0 }\` (top left)

\`center\` defines an \`x\`/\`y\` point on the \`Cursor\` to use as the hit point. Or to put it another way, it defines which part of the rendered \`Cursor\` element is centered over the user's cursor.

By passing \`{ x: 0.5, y: 0.5 }\` the center of the rendered \`Cursor\` element will overlay the user's cursor. Whereas, by passing \`{ x: 0, y: 0 }\` the top/left of the \`Cursor\` will overlay the user's cursor, rendering the \`Cursor\` element off to the bottom/right of the cursor.

\`\`\`
<Cursor center={{ x: 0, y: 0.5 }} />
\`\`\`

### \`offset\`

**Default:** \`false\`

An \`x\`/\`y\` point, defined in pixels, that can shift the cursor around the \`center\` point. Use this to get pixel-perfect accuracy with aligning custom cursor.

\`\`\`
<Cursor offset={{ x: -1, y: -1 }} />
\`\`\`

### \`spring\`

**Default:** \`false\`

Defines a spring to attach to pointer movement. You can use this to trail the pointer movement with a delay.

\`\`\`
<Cursor follow spring={{ stiffness: 500, mass: 2 }} />
\`\`\`

### \`matchTextSize\`

**Default:** \`true\`

The default custom cursor will match the text size of the hovered text (if selectable). Use this to disable that behaviour.

\`\`\`
<Cursor matchTextSize={false} />
\`\`\`

### \`magnetic\`

**Default:** \`false\`

If \`true\`, the \`Cursor\` will magnetically snap to active targets (clickable elements).

\`\`\`
<Cursor magnetic />
\`\`\`

By default, it will also morph to the shape of the target, but it's possible to pass some options to adjust this behaviour.

#### \`morph\`

**Default:** \`true\`

Whether to morph the \`width\`/\`height\` of the \`Cursor\` when a target is hovered.

\`\`\`
<Cursor magnetic={{ morph: false }} />
\`\`\`

#### \`snap\`

**Default:** \`0.8\`

A snap strength value between \`0\` and \`1\`.

*   \`0\` means there's no snapping and the cursor will follow the user's cursor freely.
    
*   \`1\` is total snapping, the cursor won't react to the pointer until the target is no longer hovered.
    

\`\`\`
<Cursor magnetic={{ snap: 0.2 }} />
\`\`\`

#### \`padding\`

**Default:** \`5\`

A value, in pixels, to add padding to the morphed cursor size.

\`\`\`
<Cursor magnetic={{ padding: 0 }} />
\`\`\``
                }
            ]
        };
    });
    // Ticker
    server.registerResource("React: Ticker", docsUri("react", "ticker"), {
        description: "Create infinitely-scrolling ticker and marquee effects with Motion for React's Ticker component. Looping, dragging and scrolling animations are all possible with this lightweight and performant component.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("react", "ticker");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# Ticker

The \`Ticker\` component for React creates performant, flexible, and fully accessible ticker and marquee animations. It's perfect for showcasing logos, photos, testimonials, news headlines, and more.

\`Ticker\`'s simple API makes these infinitely-scrolling animations easy to build.

\`\`\`
<Ticker items={items} />
\`\`\`

It intelligently clones only the minimum number of items needed to create a seamless loop, ensuring optimal performance. Because it's powered by Motion, you can take full manual control with a [motion value](/docs/react-motion-value.md) to create scroll-driven or draggable effects.

\`Ticker\` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

## Features

\`Ticker\` is a production-ready component built with performance and accessibility at its core.

*   **Lightweight:** Just \`+2.1kb\` on top of Motion for React.
    
*   **Accessible:** Automatic support for "reduced motion" and intelligent keyboard focus-trapping means your site is inclusive for all users.
    
*   **Flexible:** Animate horizontally or vertically. Control the animation with velocity, scroll position, or drag gestures.
    
*   **Performant:** Creates the absolute minimum number of cloned elements required to fill the viewport. [Read more about Motion+ Ticker's unique renderer.](https://motion.dev/blog/building-the-ultimate-ticker) More efficient and maintainable than hand-rolled CSS tickers.
    
*   **Full-width overflow:** Easily create tickers that are contained within your layout but visually extend to the edges of the viewport.
    
*   **RTL-compatible:** Automatically adapts to RTL layouts.
    

## Install

First, add the \`motion-plus\` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](https://motion.dev/plus) to generate a private token.

\`\`\`
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
\`\`\`

## Usage

\`Ticker\` accepts on mandatory prop, \`items\`. This is a list of valid React nodes (which can be components, strings or numbers):

\`\`\`
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Ticker items={items} />
\`\`\`

### Direction

By default, tickers will scroll horizontally, but via the \`axis\` prop we can lay out and animate items on the \`"y"\` axis too.

\`\`\`
<Ticker items={items} axis="y" />
\`\`\`

### Adjust speed

Setting the \`velocity\` prop (in pixels per second) will change the speed and direction of the ticker animation.

\`\`\`
<Ticker items={items} velocity={100} />
\`\`\`

Flipping this to a negative value will reverse the direction of the ticker.

\`\`\`
<Ticker items={items} velocity={-100} />
\`\`\`

Whereas setting it to \`0\` will stop all motion.

\`\`\`
<Ticker items={items} velocity={0} />
\`\`\`

### Adjust speed on hover

To adjust the speed of a ticker when it receives hover, \`hoverFactor\` can be set as a multiplicative number.

For example, setting it to \`0\` will stop the ticker on hover.

\`\`\`
<Ticker items={items} hoverFactor={0} />
\`\`\`

Whereas setting it to \`0.5\` would slow the ticker animation by half during the hover.

\`\`\`
<Ticker items={items} hoverFactor={0.5} />
\`\`\`

### Layout

Items are laid out across the selected \`axis\` using flexbox. By passing \`gap\` and \`align\` props, we can adjust the spacing and off-axis alignment of the items.

\`\`\`
<Ticker items={items} gap={0} align="start" />
\`\`\`

### Overflow

By setting \`overflow\` to \`true\`, items will visually extend out from the container to the edges of the viewport.

\`\`\`
<Ticker items={items} overflow />
\`\`\`

This makes it straightforward to place a \`Ticker\` within a document flow but still extend the ticker effect across the full viewport.

### Manual control

By default, the ticker controls its own offset via an internally-created [motion value](/docs/react-motion-value.md).

By passing a different motion value via the \`offset\` prop, we can take manual control of the offset.

\`\`\`
const offset = useMotionValue(0)

return <Ticker items={items} offset={offset} />
\`\`\`

Now, when the offset motion value is changed, the offset of the ticker will update.

\`\`\`
<button onClick={() => offset.set(-100)} />
\`\`\`

Any motion value can be passed into the ticker, like those returned from \`[useScroll](/docs/react-use-scroll.md)\` or ones wired up to the drag gesture.

### Animate items with ticker scroll

The \`useTickerItem\` hook returns information about the item that you can use to create bespoke per-item animations.

It returns:

*   \`offset\`: A \`[MotionValue](/docs/react-motion-value.md)\` that represents the item's scroll offset relative to the container. At \`0\`, the item is visually aligned to the start of the ticker. Note that this will be flipped in RTL layouts.
    
*   \`start\`/\`end\`: The start and end boundaries of the item layout within the ticker. Note that these are reversed in RTL layouts.
    
*   \`itemIndex\`: The \`index\` of this item. For clones, this \`index\` value will represent the index value of the original item.
    

\`\`\`
function Item() {
  const { offset } = useTickerItem()
  const rotate = useTransform(offset, [0, 300], [0, 360], { clamp: false })

  return (
    <motion.div style={{ rotate }}>
      😂
    </motion.div>
  )
}
\`\`\`

\`\`\`
<Ticker items={[<Item />]} />
\`\`\`

## Accessibility

### Reduced motion

Unless \`offset\` is defined, \`Ticker\` automatically respects the OS "reduced motion" setting.

### Keyboard navigation

\`Ticker\` will detect if any item within it receives focus via keypress. The animation will stop, and the first item inside the ticker will receive focus.

From here, left/right arrows (or up/down for \`axis="y"\`) can be used to navigate between focusable elements within the original (not cloned) items. Tab or shift-tab will break this focus trap.

This approach ensures tickers with many items don't hog keyboard navigation.

## Options

\`Ticker\` renders a \`[motion.div](/docs/react-motion-component.md)\`, so it supports most of the same props. It also supports the following options:

### \`items\`

**Required.** An array of strings or React components to render. This list will be cloned as many times as needed to visually fill the ticker.

\`\`\`
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Ticker items={items} />
\`\`\`

### \`axis\`

**Default:** \`"x"\`

Determines on which axis the ticker should lay out and repeat items.

### \`velocity\`

**Default:** \`50\`

The velocity of the ticker scroll animation in pixels per second.

\`\`\`
<Ticker items={items} velocity={-50} /> // Reversed
\`\`\`

\`\`\`
<Ticker items={items} velocity={0} /> // Stopped
\`\`\`

### \`hoverFactor\`

**Default:** \`1\`

A factor to apply to the current velocity when the ticker is hovered.

\`\`\`
<Ticker items={items} hoverFactor={0} /> // Will stop on hover
\`\`\`

\`\`\`
<Ticker items={items} hoverFactor={0.5} /> // Will half speed on hover
\`\`\`

### \`gap\`

**Default:** \`10\`

A gap to apply between items, in pixels.

### \`align\`

**Default:** \`"center"\`

Alignment of items within the ticker's off-axis. For example, if this is a y-axis ticker, this will align items horizontally within the ticker.

Can be set to \`"start"\`, \`"center"\` or \`"end"\`.

### \`offset\`

A motion value to externally control ticker offset.

If provided, this option will disable the automatic ticker animation.

\`\`\`
const { scrollY } = useScroll()
const invertScroll = useTransform(() => scrollY.get() * -1)

return <Ticker items={items} offset={invertScroll} />
\`\`\`

The \`Ticker\` renders its items in such a way that \`offset\` can be set to any numerical value, and it will be correctly wrapped so that items display correctly on screen.

### \`fade\`

**Default:** \`**0**\`

Fades the content out at each end of the carousel container. Can be set either as a number (pixels) or \`%\`.

\`\`\`
<Ticker items={items} fade={100} />
\`\`\`

### \`safeMargin\`

**Default:** \`0\`

\`Ticker\` uses a [unique reprojection renderer](https://motion.dev/blog/building-the-ultimate-ticker), which can reduce or eliminate item cloning. Technically, this works by reprojecting items that disappear off the start of the visible area over to the end.

The calculation for this is based on the item and ticker container's layout. If you're rotating the ticker, or transforming its items in some way that brings them back inside the visible area, you may see items disappear as they reproject. If so, you can use \`safeMargin\` to increase the visible area to compensate.

\`\`\`
<Ticker items={items} safeMargin={100} />
\`\`\`

### \`as\`

**Default:** \`"div"\`

The HTML element to use to render the ticker container.

\`\`\`
<Ticker items={items} as="section" />
\`\`\``
                }
            ]
        };
    });
    // View animations
    server.registerResource("JavaScript: View animations", docsUri("js", "animate-view"), {
        description: "Discover Motion's animateView() for seamless animations between different views or layouts. Learn how it simplifies layout changes, shared element transitions, and page effects using the browser's native View Transition API. Explore its cleaner API, spring animation support, and interruption handling, while noting its current alpha status.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "animate-view");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# View animations

Motion's \`animateView()\` function makes it simple to animate between two different views or layouts.

\`\`\`
// Crossfade
animateView(update).enter({ opacity: 1 })
\`\`\`

View animations have a number of unique superpowers:

**Layout:** Animate discrete changes in layout, like switching \`justify-content\` between \`"flex-start"\` and \`"flex-end"\`.

**Shared element transitions:** Animate entirely different elements across two views. For example, this underline element moves like a single element, but each is generated entirely with CSS on the \`.selected\` tab.

**Page effects:** Add effects to the entire viewport, like wipes, slides and crossfades:

\`animateView()\` is built on the browser's native [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) for small filesize and great performance.

It aims to remove the complexity of, and expand upon, the View Transition API:

*   Cleaner API
    
*   Spring animations
    
*   Interruption handling/queuing
    

**Important:** \`animateView()\` is currently in alpha, which means the API might change. It's also exclusive to [Motion+ members](https://motion.dev/plus), who are encouraged to help us shape the API via our private Discord.

As an early access API, there are many more features to come, such as:

*   Automatic \`view-transition-name\` management
    
*   Enter/exit animations
    

  

## Import

As an Early Access API, \`animateView\` is currently only available via the \`"motion-dom"\` package.

\`\`\`
import { animateView } from "motion-dom"
\`\`\`

## Usage

The \`animateView\` function must be passed a function or async function that updates the DOM.

\`\`\`
let isOn = true

animateView(() => {
  isOn = !isOn
  container.style.justifyContent = isOn ? "flex-end" : "flex-start"
})
\`\`\`

By default, no animation will occur. But, by giving elements a \`view-transition-name\` style, they'll magically animate size/position.

\`\`\`
.toggle {
  view-transition-name: toggle;
}
\`\`\`

In a future iteration of this API, \`view-transition-name\` will be generated automatically, and removed at the end of the animation:

\`\`\`
animateView(update).add(".item")
\`\`\`

### Transition options

View animations support the same options as the \`[animate](/docs/animate.md)\` [function](/docs/animate.md). So we can customise this animation by passing a transition to \`animateView\`.

\`\`\`
import { spring } from "motion"

animateView(
  update,
  { type: spring, duration: 0.8, bounce: 0.4 }
)
\`\`\`

### Page animations

The entire page can be animated with the \`enter\` and \`exit\` methods. These are useful for making crossfade or wipe effects.

\`\`\`
// Crossfade
animateView(update)
  .exit({ opacity: 0 })
  .enter({ opacity: 1 })

// Wipe left
animateView(update)
  .enter({
    clipPath: ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]
  })

// Slide up
animateView(update)
  .exit({ opacity: 0, transform: "translateY(-50px)" })
  .enter({ opacity: 1, transform: ["translateY(50px)", "none"] }})
\`\`\`

\`enter\` and \`exit\` both accept transition options that will override the default transition:

\`\`\`
// Fade out then in
animateView(update)
  .exit({ opacity: 0 }, { duration: 0.2 })
  .enter({ opacity: 1 }, { delay: 0.2 })
\`\`\`

### Shared-element transitions

It's also possible to animate between two completely different elements by providing \`view-transition-name\` to one before \`animateView\` is fired, and the other before the update function finishes.

This can be achieved in a number of ways. For instance, this pseudo element will only exist one at a time, on the \`.selected\` tab:

\`\`\`
.tab.selected::after {
  background-color: blue;
  height: 2px;
  view-transition-name: underline;
}
\`\`\`

Alternatively, we could manually apply \`view-transition-name\` to one element at the start of the animation, and swap it at the end of the update function:

\`\`\`
item.style.viewTransitionName = "selected"

animateView(() => {
  item.style.viewTransitionName = ""
  item.style.visibility = "hidden"
  
  selectedItem.style.viewTransitionName = "selected"
})
\`\`\`

**Important:** Only one element can have \`view-transition-name\` when \`animateView\` is called, and another when the update function is finished.

A future version of this API will ease this restriction.

### Non-animatable values

Because the View Transition API creates and animates pseudo-elements, \`animateView\` is limited to animating values that are also animatable by CSS.

However, the new \`[CSS.registerProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static)\` function allows for the animation of CSS properties, and it's available in all browsers where the View Transition API is available.

We can use this to animate values like \`mask-image\`:

\`\`\`
function makeWipeProp(position, initialValue) {
  // Can only register properties once
  try {
    CSS.registerProperty({
      name: "--wipe-" + position,
      syntax: "<length-percentage>",
      inherits: false,
      initialValue,
    })
  } catch (e) {}
}

makeWipeProp("a", "-100%")
makeWipeProp("b", "0%")

const maskImage = \`linear-gradient(90deg, transparent var(--wipe-a), black var(--wipe-b))\`

animateView(update)
  .enter({
    maskImage: [maskImage, maskImage],
    "--wipe-a": "100%",
    "--wipe-b": "200%"
  })
\`\`\`

### Interruption

If a browser View Transition API animation is interrupted with a new one, the current animation will visually break by snapping to its end position before the new animation starts.

\`animateView\` fixes this by queuing the incoming animation until the current one has finished.

This behaviour can be overridden by setting \`interrupt: "immediate"\`. Starting an animation with \`"immediate"\` interruption will flush any pending DOM update functions along with the interrupting animation.

Future versions will expand on the queue by optionally fast-forwarding existing animations.

### Offset scroll position

Motion for React's [layout animations](/docs/react-layout-animations.md) cancel out any changes in scroll position, so these aren't animated. This is usually (though not always) the correct behaviour - especially with same-element transitions.

The View Transition API is limited to animating the current view, as it appears on screen. Which means any element with a \`view-transition-name\` when this kind of DOM update happens:

\`\`\`
animateView(() => window.scrollTo(0, 100))
\`\`\`

Will get animated \`100px\`. This behaviour is clearly incorrect and a future version of this API will allow this kind of animation to be cancelled out.

## Controls

\`animateView\` is an **async function** that returns animation controls.

\`\`\`
const animation = await animateView(update)

animation.pause()
\`\`\`

This allows full control over the view animation once it's begun.

It supports all the same controls as the \`[animate](/docs/animate.md)\` [function](/docs/animate.md), except \`then\` and \`cancel\`.

To run code after the animation has finished you must await \`animation.finished\` instead of \`animation\`.

\`\`\`
await animation.finished
\`\`\`

## Limitations

Beyond the limitations already discussed, as an early API there's a couple more things, like gracefully handling changes in aspect ratio, that still require CSS to solve. It's worth reading the [Chrome documentation](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) to understand how to fix these things, though the end goal for this API is to abstract all of this away behind some simple options and sensible defaults.`
                }
            ]
        };
    });
    // splitText
    server.registerResource("JavaScript: splitText", docsUri("js", "split-text"), {
        description: "Learn how to use the splitText() function to break down text content into individual characters, words, and lines, enabling granular text animations. Understand how to target these split components with CSS classes, customize splitting behavior, and troubleshoot common issues with custom fonts or existing HTML tags.",
        mimeType: "text/markdown",
    }, async () => {
        const uri = docsUri("js", "split-text");
        return {
            contents: [
                {
                    uri: uri,
                    text: `# splitText

\`splitText\` is a tiny (+0.7kb) utility that makes it simple to create complex, beautiful split text animations with Motion.

Break down text into individual characters, words, and lines, to create staggered enter or scroll-driven text effects with just a few lines of code.

\`splitText\` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

## Features

*   **Animate anything:** Split text into characters, words and lines to animate each independently.
    
*   **Lightweight**: Only adds 0.7kb to your project bundle.
    
*   **Simple API:** A clean API leaves your code maintainable.
    
*   **Accessible:** Correctly applies ARIA tags to leave your text readable for all users.
    
*   **Flexible:** Animate with Motion, CSS, or a library of your choice.
    

## Install

First, add the Motion+ library to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](https://motion.dev/plus) to generate a private token.

\`\`\`
npm install https://api.motion.dev/registry\\?package\\=motion-plus\\&version\\=1.5.4\\&token=YOUR_AUTH_TOKEN
\`\`\`

Once installed, \`splitText\` can be imported via \`motion-plus\`:

\`\`\`
import { splitText } from "motion-plus"
\`\`\`

## Usage

\`splitText\` accepts a CSS selector or an HTML Element. It replaces the element's text content with \`<span>\` tags that wrap individual characters, words, and (optionally) lines.

It returns an object containing \`chars\`, \`words\`, and \`lines\` as arrays of elements, so they can be animated right away with Motion's \`animate\` and \`stagger\` functions.

\`\`\`
const { chars } = splitText("h1")

animate(
  chars,
  { opacity: [0, 1], y: [10, 0] },
  { duration: 1, delay: stagger(0.05) }
)
\`\`\`

The returned arrays are regular elements so you're not limited to animating them with Motion. You could animate them with CSS, or another animation library of your choice. Or, you could attach gesture recognisers to each element individually, for instance with Motion's \`[hover](/docs/hover.md)\` [function](/docs/hover.md).

\`\`\`
const { words } = splitText("h1")

hover(words, (wordElement) => {
  // Hover logic
})
\`\`\`

## Techniques & troubleshooting

### Enter animations

To perform enter animations, it might be necessary to set the container to \`visibility: hidden\` via CSS until we're ready to animate.

\`\`\`
.container {
  visibility: hidden;
}
\`\`\`

\`\`\`
document.querySelector(".container").style.visibility = "visible"

const { words } = splitText(".container")
animate(words, { opacity: [0, 1] })
\`\`\`

Otherwise we might see a flash of visible text until our JS has loaded.

### Working with custom fonts

If you have custom fonts that download **after** \`splitText\` is executed, it can be that the text is split incorrectly because the dimensions of the text have changed.

To fix this, we can await the browser's \`document.fonts.ready\` promise:

\`\`\`
document.fonts.ready.then(() => {
  const { words } = splitText(element)

  animate(
    words,
    { y: [-10, 10] },
    { delay: stagger(0.04) }
  )
})
\`\`\`

### Targeting with CSS

Each split component will receive \`split-char\`, \`split-word\` and \`split-line\` classes so you can select them with CSS. Each component additionally receives a \`data-index\` of its position within the overall character, word or line lists respectively.

\`\`\`
.split-char[data-index=3] {
  color: red;
}
\`\`\`

The provided classes are configurable with the \`charClass\`, \`wordClass\` and \`lineClass\` options.

\`\`\`
splitText(element, { charClass: "my-char-class" })
\`\`\`

### Links/spans are being removed

\`splitText\` doesn't currently preserve existing tags within the text, so links and other styling spans will be removed.

It's possible to fix this by wrapping the text before/after the tag with its own \`span\` and splitting these individually:

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

### SVG \`<text />\` isn't working

\`<text />\` elements are not supported.

### \`text-align: justify\` is being lost

Splitting test in this way is incompatible with how browsers handle \`text-align: justify\`. You can implement something similar by adding styles for \`split-line\`:

\`\`\`
.align-justify .split-line {
  display: flex;
  justify-content: space-between;
}
\`\`\`

## Options

### \`splitBy\`

**Default:** \`" "\` (space)

The string to split the text by.

\`\`\`
<p>My+custom+text</p>
\`\`\`

\`\`\`
splitText(paragraph, { splitBy: "+" })
\`\`\`

### \`charClass\`

**Default:** \`"split-char"\`

A class to apply to each split \`char\` component.

### \`wordClass\`

**Default:** \`"split-word"\`

A class to apply to each split \`word\` component.

### \`lineClass\`

**Default:** \`"split-line"\`

A class to apply to each split \`line\` component.`
                }
            ]
        };
    });
}

export { initPlusDocsResources };
