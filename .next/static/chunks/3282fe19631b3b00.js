(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53086,t=>{"use strict";var e=t.i(50789),i=t.i(29715);function s(t,e,i){return Math.max(t,Math.min(e,i))}var o=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(t){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;let i=s(0,this.currentTime/this.duration,1),o=(e=i>=1)?1:this.easing(i);this.value=this.from+(this.to-this.from)*o}else if(this.lerp){var i,o,r,n;this.value=(i=this.value,o=this.to,r=60*this.lerp,(1-(n=1-Math.exp(-r*t)))*i+n*o),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)}else this.value=this.to,e=!0;e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:o,onStart:r,onUpdate:n}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=n}},r=class{constructor(t,e,{autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(...s){let o=this;clearTimeout(i),i=setTimeout(()=>{i=void 0,t.apply(o,s)},e)}}(this.resize,s),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},n=class{events={};emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t]?.(...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter(t=>e!==t)}}off(t,e){this.events[t]=this.events[t]?.filter(t=>e!==t)}destroy(){this.events={}}},a=100/6,l={passive:!1},c=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,l),this.element.addEventListener("touchstart",this.onTouchStart,l),this.element.addEventListener("touchmove",this.onTouchMove,l),this.element.addEventListener("touchend",this.onTouchEnd,l)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new n;on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,l),this.element.removeEventListener("touchstart",this.onTouchStart,l),this.element.removeEventListener("touchmove",this.onTouchMove,l),this.element.removeEventListener("touchend",this.onTouchEnd,l)}onTouchStart=t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.options.touchMultiplier,o=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t,o=1===s?a:2===s?this.window.width:1,r=1===s?a:2===s?this.window.height:1;e*=o,i*=r,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},h=t=>Math.min(1,1.001-Math.pow(2,-10*t)),m=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new o;emitter=new n;dimensions;virtualScroll;constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:i=t,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:n=.075,touchInertiaExponent:a=1.7,duration:l,easing:m,lerp:d=.1,infinite:u=!1,orientation:p="vertical",gestureOrientation:f="horizontal"===p?"both":"vertical",touchMultiplier:v=1,wheelMultiplier:g=1,autoResize:x=!0,prevent:w,virtualScroll:S,overscroll:y=!0,autoRaf:b=!1,anchors:N=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:M=!1}={}){window.lenisVersion="1.3.16",t&&t!==document.documentElement||(t=window),"number"==typeof l&&"function"!=typeof m?m=h:"function"==typeof m&&"number"!=typeof l&&(l=1),this.options={wrapper:t,content:e,eventsTarget:i,smoothWheel:s,syncTouch:o,syncTouchLerp:n,touchInertiaExponent:a,duration:l,easing:m,lerp:d,infinite:u,gestureOrientation:f,orientation:p,touchMultiplier:v,wheelMultiplier:g,autoResize:x,prevent:w,virtualScroll:S,overscroll:y,autoRaf:b,anchors:N,autoToggle:T,allowNestedScroll:E,__experimental__naiveDimensions:M},this.dimensions=new r(t,e,{autoResize:x}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new c(i,{touchMultiplier:v,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0})),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}onScrollEnd=t=>{t instanceof CustomEvent||"smooth"!==this.isScrolling&&!1!==this.isScrolling||t.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let t=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[t]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=t=>{t.propertyName.includes("overflow")&&this.checkOverflow()};setScroll(t){this.isHorizontal?this.options.wrapper.scrollTo({left:t,behavior:"instant"}):this.options.wrapper.scrollTo({top:t,behavior:"instant"})}onClick=t=>{let e=t.composedPath().find(t=>t instanceof HTMLAnchorElement&&t.getAttribute("href")?.includes("#"));if(e){let t=e.getAttribute("href");if(t){let e="object"==typeof this.options.anchors&&this.options.anchors?this.options.anchors:void 0,i=`#${t.split("#")[1]}`;this.scrollTo(i,e)}}};onPointerDown=t=>{1===t.button&&this.reset()};onVirtualScroll=t=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(t))return;let{deltaX:e,deltaY:i,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:s}),s.ctrlKey||s.lenisStopPropagation)return;let o=s.type.includes("touch"),r=s.type.includes("wheel");this.isTouching="touchstart"===s.type||"touchmove"===s.type;let n=0===e&&0===i;if(this.options.syncTouch&&o&&"touchstart"===s.type&&n&&!this.isStopped&&!this.isLocked)return void this.reset();let a="vertical"===this.options.gestureOrientation&&0===i||"horizontal"===this.options.gestureOrientation&&0===e;if(n||a)return;let l=s.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent;if(l.find(t=>t instanceof HTMLElement&&("function"==typeof c&&c?.(t)||t.hasAttribute?.("data-lenis-prevent")||o&&t.hasAttribute?.("data-lenis-prevent-touch")||r&&t.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.checkNestedScroll(t,{deltaX:e,deltaY:i}))))return;if(this.isStopped||this.isLocked){s.cancelable&&s.preventDefault();return}if(!(this.options.syncTouch&&o||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),s.lenisStopPropagation=!0;return}let h=i;"both"===this.options.gestureOrientation?h=Math.abs(i)>Math.abs(e)?i:e:"horizontal"===this.options.gestureOrientation&&(h=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||0===this.animatedScroll&&i>0||this.animatedScroll===this.limit&&i<0))&&(s.lenisStopPropagation=!0),s.cancelable&&s.preventDefault();let m=o&&this.options.syncTouch,d=o&&"touchend"===s.type;d&&(h=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+h,{programmatic:!1,...m?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(!1===this.isScrolling||"native"===this.isScrolling){let t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isStopped||(this.isScrolling="native"),this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle)return void this.rootElement.style.removeProperty("overflow");this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle)return void this.rootElement.style.setProperty("overflow","clip");this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=t=>{let e=t-(this.time||t);this.time=t,this.animate.advance(.001*e),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(t,{offset:e=0,immediate:i=!1,lock:o=!1,duration:r=this.options.duration,easing:n=this.options.easing,lerp:a=this.options.lerp,onStart:l,onComplete:c,force:m=!1,programmatic:d=!0,userData:u}={}){if(!this.isStopped&&!this.isLocked||m){if("string"==typeof t&&["top","left","start","#"].includes(t))t=0;else if("string"==typeof t&&["bottom","right","end"].includes(t))t=this.limit;else{let i;if("string"==typeof t?(i=document.querySelector(t))||("#top"===t?t=0:console.warn("Lenis: Target not found",t)):t instanceof HTMLElement&&t?.nodeType&&(i=t),i){if(this.options.wrapper!==window){let t=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?t.left:t.top}let s=i.getBoundingClientRect();t=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof t){if(t+=e,t=Math.round(t),this.options.infinite){if(d){this.targetScroll=this.animatedScroll=this.scroll;let e=t-this.animatedScroll;e>this.limit/2?t-=this.limit:e<-this.limit/2&&(t+=this.limit)}}else t=s(0,t,this.limit);if(t===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=u??{},i){this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}d||(this.targetScroll=t),"number"==typeof r&&"function"!=typeof n?n=h:"function"==typeof n&&"number"!=typeof r&&(r=1),this.animate.fromTo(this.animatedScroll,t,{duration:r,easing:n,lerp:a,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(t,e)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),d&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(t,{deltaX:e,deltaY:i}){let s,o,r,n,a,l,c,h,m,d,u,p,f,v,g=Date.now(),x=t._lenis??={},w=this.options.gestureOrientation;if(g-(x.time??0)>2e3){x.time=Date.now();let e=window.getComputedStyle(t);x.computedStyle=e;let i=e.overflowX,m=e.overflowY;if(s=["auto","overlay","scroll"].includes(i),o=["auto","overlay","scroll"].includes(m),x.hasOverflowX=s,x.hasOverflowY=o,!s&&!o||"vertical"===w&&!o||"horizontal"===w&&!s)return!1;a=t.scrollWidth,l=t.scrollHeight,c=t.clientWidth,h=t.clientHeight,r=a>c,n=l>h,x.isScrollableX=r,x.isScrollableY=n,x.scrollWidth=a,x.scrollHeight=l,x.clientWidth=c,x.clientHeight=h}else r=x.isScrollableX,n=x.isScrollableY,s=x.hasOverflowX,o=x.hasOverflowY,a=x.scrollWidth,l=x.scrollHeight,c=x.clientWidth,h=x.clientHeight;if(!s&&!o||!r&&!n||"vertical"===w&&(!o||!n)||"horizontal"===w&&(!s||!r)||("horizontal"===w?m="x":"vertical"===w?m="y":(0!==e&&s&&r&&(m="x"),0!==i&&o&&n&&(m="y")),!m))return!1;if("x"===m)d=t.scrollLeft,u=a-c,p=e,f=s,v=r;else{if("y"!==m)return!1;d=t.scrollTop,u=l-h,p=i,f=o,v=n}return(p>0?d<u:d>0)&&f&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){let t=this.options.wrapper;return this.isHorizontal?t.scrollX??t.scrollLeft:t.scrollY??t.scrollTop}get scroll(){var t;return this.options.infinite?(this.animatedScroll%(t=this.limit)+t)%t:this.animatedScroll}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let t="lenis";return this.options.autoToggle&&(t+=" lenis-autoToggle"),this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),"smooth"===this.isScrolling&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};function d({children:t}){return(0,i.useEffect)(()=>{let t=new m({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2});return requestAnimationFrame(function e(i){t.raf(i),requestAnimationFrame(e)}),()=>{t.destroy()}},[]),(0,e.jsx)(e.Fragment,{children:t})}t.s(["default",()=>d],53086)},51167,(t,e,i)=>{e.exports=t.r(14111)},62819,t=>{"use strict";var e=t.i(50789),i=t.i(40467),s=t.i(62101),o=t.i(51167),r=t.i(88679),n=t.i(74701),a=t.i(86746);function l(){return(l=Object.assign.bind()).apply(null,arguments)}var c=t.i(9858),h=t.i(29715),m=t.i(56436),d=t.i(78464);function u(t,e,i){let s=(0,d.useThree)(t=>t.size),o=(0,d.useThree)(t=>t.viewport),r="number"==typeof t?t:s.width*o.dpr,n="number"==typeof e?e:s.height*o.dpr,a=("number"==typeof t?i:t)||{},{samples:l=0,depth:m,...u}=a,p=null!=m?m:a.depthBuffer,f=h.useMemo(()=>{let t=new c.WebGLRenderTarget(r,n,{minFilter:c.LinearFilter,magFilter:c.LinearFilter,type:c.HalfFloatType,...u});return p&&(t.depthTexture=new c.DepthTexture(r,n,c.FloatType)),t.samples=l,t},[]);return h.useLayoutEffect(()=>{f.setSize(r,n),l&&(f.samples=l)},[l,f,r,n]),h.useEffect(()=>()=>f.dispose(),[]),f}let p=(0,t.i(80536).shaderMaterial)({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class f extends c.MeshPhysicalMaterial{constructor(t=6,e=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new c.Color("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=i=>{i.uniforms={...i.uniforms,...this.uniforms},this.anisotropy>0&&(i.defines.USE_ANISOTROPY=""),e?i.defines.USE_SAMPLER="":i.defines.USE_TRANSMISSION="",i.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),i.fragmentShader=i.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${t}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${t}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${t})) , material.thickness + thickness_smear * (i + randomCoords) / float(${t}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${t})), material.thickness + thickness_smear * (i + randomCoords) / float(${t}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${t}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(t=>Object.defineProperty(this,t,{get:()=>this.uniforms[t].value,set:e=>this.uniforms[t].value=e}))}}let v=h.forwardRef(({buffer:t,transmissionSampler:e=!1,backside:i=!1,side:s=c.FrontSide,transmission:o=1,thickness:r=0,backsideThickness:n=0,backsideEnvMapIntensity:d=1,samples:v=10,resolution:g,backsideResolution:x,background:w,anisotropy:S,anisotropicBlur:y,...b},N)=>{let T,E,M,j;(0,m.extend)({MeshTransmissionMaterial:f});let z=h.useRef(null),[C]=h.useState(()=>new p),k=u(x||g),R=u(g);return(0,a.useFrame)(t=>{if(z.current.time=t.clock.elapsedTime,z.current.buffer===R.texture&&!e){var o;(j=null==(o=z.current.__r3f.parent)?void 0:o.object)&&(M=t.gl.toneMapping,T=t.scene.background,E=z.current.envMapIntensity,t.gl.toneMapping=c.NoToneMapping,w&&(t.scene.background=w),j.material=C,i&&(t.gl.setRenderTarget(k),t.gl.render(t.scene,t.camera),j.material=z.current,j.material.buffer=k.texture,j.material.thickness=n,j.material.side=c.BackSide,j.material.envMapIntensity=d),t.gl.setRenderTarget(R),t.gl.render(t.scene,t.camera),j.material=z.current,j.material.thickness=r,j.material.side=s,j.material.buffer=R.texture,j.material.envMapIntensity=E,t.scene.background=T,t.gl.setRenderTarget(null),t.gl.toneMapping=M)}}),h.useImperativeHandle(N,()=>z.current,[]),h.createElement("meshTransmissionMaterial",l({args:[v,e],ref:z},b,{buffer:t||R.texture,_transmission:o,anisotropicBlur:null!=y?y:S,transmission:e?o:0,thickness:r,side:s}))});function g(){let t=(0,h.useRef)(null);return(0,a.useFrame)(e=>{let i=e.clock.elapsedTime;t.current&&(t.current.rotation.x=.05*Math.sin(.5*i),t.current.rotation.y=.05*Math.sin(.3*i))}),(0,e.jsxs)("mesh",{ref:t,rotation:[0,0,Math.PI/2],scale:[8,1,1],children:[(0,e.jsx)("capsuleGeometry",{args:[.4,1,32,64]}),(0,e.jsx)(v,{resolution:1024,distortion:.25,color:"#ffffff",thickness:1,anisotropy:1,chromaticAberration:.06,roughness:.2,toneMapped:!0})]})}function x(){return(0,e.jsx)("group",{children:(0,e.jsx)(g,{})})}function w(){let t=(0,o.usePathname)();return(0,e.jsxs)("header",{className:"fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl h-16 flex items-center justify-center pointer-events-none",children:[(0,e.jsxs)("div",{className:"relative z-10 flex items-center justify-between w-full px-8 pointer-events-auto",children:[(0,e.jsx)(i.default,{href:"/","aria-label":"Ir para a home",className:"relative block shrink-0 transition-transform duration-300 hover:scale-105",children:(0,e.jsx)("div",{className:"relative h-6 w-20",children:(0,e.jsx)(s.default,{src:r.ASSETS.logoDark,alt:"Danilo Novais",fill:!0,className:"object-contain"})})}),(0,e.jsx)("nav",{className:"flex items-center gap-6",children:r.NAV_LINKS.map(s=>{let o="page"===(e=>{if(e.startsWith("/sobre")&&t.startsWith("/sobre")||e.startsWith("/portfolio")&&t.startsWith("/portfolio")||"/#hero"===e&&"/"===t)return"page"})(s.href);return(0,e.jsx)(i.default,{href:s.href,className:`text-sm font-medium lowercase tracking-wide transition-colors duration-200 ${o?"text-[#0057FF]":"text-gray-800 hover:text-[#0057FF]"}`,"aria-current":o,children:s.label},s.label)})})]}),(0,e.jsxs)("div",{className:"absolute inset-0 z-0 rounded-full overflow-hidden",children:[(0,e.jsx)("div",{className:"absolute inset-0 bg-white/70 backdrop-blur-md -z-10"}),(0,e.jsxs)(n.Canvas,{camera:{position:[0,0,5],fov:45},gl:{alpha:!0,antialias:!0},dpr:[1,2],className:"pointer-events-none",children:[(0,e.jsx)("ambientLight",{intensity:.5}),(0,e.jsx)("pointLight",{position:[10,10,10]}),(0,e.jsx)(x,{})]})]})]})}var S=t.i(98631);let y=(0,S.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]),b=(0,S.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var N=t.i(69742),T=t.i(13622);function E(){let[t,o]=(0,h.useState)(!1),n=(0,h.useRef)(null);return(0,h.useEffect)(()=>{t?document.body.style.overflow="hidden":document.body.style.overflow="unset"},[t]),(0,e.jsxs)("div",{className:"fixed top-4 right-4 z-50 md:hidden",ref:n,children:[(0,e.jsx)("button",{onClick:()=>o(!t),className:"relative z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-black","aria-label":t?"Fechar menu":"Abrir menu",children:t?(0,e.jsx)(b,{size:24}):(0,e.jsx)(y,{size:24})}),(0,e.jsx)(T.AnimatePresence,{children:t&&(0,e.jsxs)(N.motion.div,{initial:{clipPath:"circle(0% at calc(100% - 3rem) 3rem)"},animate:{clipPath:"circle(150% at calc(100% - 3rem) 3rem)"},exit:{clipPath:"circle(0% at calc(100% - 3rem) 3rem)"},transition:{duration:.5,ease:[.76,0,.24,1]},className:"fixed inset-0 bg-[#06071f] z-40 flex flex-col items-center justify-center",children:[(0,e.jsx)("div",{className:"absolute top-8 left-8",children:(0,e.jsx)(s.default,{src:r.ASSETS.logoLight,alt:"Danilo Novais",width:120,height:40,className:"object-contain"})}),(0,e.jsx)("nav",{className:"flex flex-col gap-8 text-center",children:r.NAV_LINKS.map((t,s)=>(0,e.jsx)(N.motion.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0},exit:{opacity:0,y:40},transition:{delay:.1+.1*s,duration:.5},children:(0,e.jsx)(i.default,{href:t.href,onClick:()=>o(!1),className:"text-4xl text-white font-thin tracking-wider lowercase hover:text-[#0057FF] transition-colors",children:t.label})},t.label))}),(0,e.jsx)("div",{className:"absolute bottom-12 text-white/50 text-sm",children:"© 2025 Danilo Novais."})]})})]})}function M(){return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{className:"hidden lg:block",children:(0,e.jsx)(w,{})}),(0,e.jsx)("div",{className:"lg:hidden",children:(0,e.jsx)(j,{})})]})}function j(){return(0,e.jsxs)("header",{className:"fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6 pointer-events-none",children:[(0,e.jsx)(i.default,{href:"/",className:"pointer-events-auto relative w-24 h-8",children:(0,e.jsx)(s.default,{src:r.ASSETS.logoDark,alt:"Danilo Novais",fill:!0,className:"object-contain object-left invert md:invert-0"})}),(0,e.jsx)("div",{className:"pointer-events-auto",children:(0,e.jsx)(E,{})})]})}function z(){return(0,e.jsx)(M,{})}t.s(["default",()=>z],62819)},63426,t=>{"use strict";var e=t.i(50789),i=t.i(88679),s=t.i(69742);t.s(["default",0,()=>(0,e.jsx)(s.motion.footer,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8},className:"fixed bottom-0 w-full z-50 bg-[#0057FF] text-white border-t border-white/10",children:(0,e.jsxs)("div",{className:"container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4",children:[(0,e.jsx)("div",{className:"order-2 md:order-1 text-center md:text-left text-xs md:text-sm text-white/90",children:(0,e.jsx)("p",{children:"© 2025 Danilo Novais Vilela — todos os direitos reservados."})}),(0,e.jsxs)("div",{className:"order-1 md:order-2 flex flex-col md:flex-row items-center gap-6 md:gap-8",children:[(0,e.jsx)("nav",{children:(0,e.jsx)("ul",{className:"flex flex-wrap justify-center gap-4 md:gap-6",children:i.NAV_LINKS.map(t=>(0,e.jsx)("li",{children:(0,e.jsxs)("a",{href:t.href,className:"relative text-xs md:text-sm font-medium lowercase text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded",children:[t.label,(0,e.jsx)("span",{className:"absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-200 origin-left hover:scale-x-100"})]})},t.label))})}),(0,e.jsx)("div",{className:"flex gap-4 border-l border-white/20 pl-0 md:pl-6",children:i.SOCIALS.map(t=>(0,e.jsxs)("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"text-white/85 hover:text-white hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded-full","aria-label":t.platform,children:[(0,e.jsx)("span",{className:"sr-only",children:t.platform}),t.icon]},t.platform))})]})]})})])}]);