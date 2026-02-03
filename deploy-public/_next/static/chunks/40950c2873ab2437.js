(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37497,35730,e=>{"use strict";var t=e.i(76522);e.s(["useThree",()=>t.C],37497),e.s(["extend",()=>t.e],35730)},51078,e=>{"use strict";let t;var r=e.i(79606),i=e.i(52155),a=e.i(84542),s=e.i(37497);function o({pixelated:e}){let t=(0,s.useThree)(e=>e.gl),r=(0,s.useThree)(e=>e.internal.active),a=(0,s.useThree)(e=>e.performance.current),o=(0,s.useThree)(e=>e.viewport.initialDpr),n=(0,s.useThree)(e=>e.setDpr);return i.useEffect(()=>{let i=t.domElement;return()=>{r&&n(o),e&&i&&(i.style.imageRendering="auto")}},[]),i.useEffect(()=>{n(a*o),e&&t.domElement&&(t.domElement.style.imageRendering=1===a?"auto":"pixelated")},[a]),null}var n=e.i(9858);function l({all:e,scene:t,camera:r}){let a=(0,s.useThree)(({gl:e})=>e),o=(0,s.useThree)(({camera:e})=>e),l=(0,s.useThree)(({scene:e})=>e);return i.useLayoutEffect(()=>{let i=[];e&&(t||l).traverse(e=>{!1===e.visible&&(i.push(e),e.visible=!0)}),a.compile(t||l,r||o);let s=new n.WebGLCubeRenderTarget(128);new n.CubeCamera(.01,1e5,s).update(a,t||l),s.dispose(),i.forEach(e=>e.visible=!1)},[]),null}let u={cyan:"#00ffff",lime:"#00ff00",magenta:"#ff00ff",yellow:"#ffff00",orange:"#ff4500",pink:"#ff1493",purple:"#9400d3",blue:"#0080ff",green:"#00ff80",red:"#ff0040",teal:"#00ffaa",violet:"#8a2be2"},h={...u,deepSpace:"#0f2027",neonCyan:"#50e3c2",violetGlow:"#8a2be2",midnightBlue:"#040013",electricBlue:"#0080ff",voidSky:"#020112",ghostBlue:"#0048ff",darkVoid:"#01010f",fogBlue:"#051f51"},c="violet";function f(e){return parseInt((function(e){if(!e||"string"!=typeof e)return console.warn("resolveConfigColor received invalid color:",e),"#00ffff";let t=h[e];return void 0!==t?t:e.startsWith("#")||e.startsWith("0x")?e:(console.warn(`[ghostConfig] Cor n\xe3o encontrada: ${e}, usando cyan`),u.cyan)})(e).replace("#",""),16)}var d=e.i(86985),m=e.i(35730);let p={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`
    uniform float opacity;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );
    	gl_FragColor = opacity * texel;

    }
  `};var g=Object.defineProperty,v=(e,t,r)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?g(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,r};class x{constructor(){v(this,"enabled",!0),v(this,"needsSwap",!0),v(this,"clear",!1),v(this,"renderToScreen",!1)}setSize(e,t){}render(e,t,r,i,a){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}class y{constructor(e){v(this,"camera",new n.OrthographicCamera(-1,1,1,-1,0,1)),v(this,"geometry",new n.PlaneGeometry(2,2)),v(this,"mesh"),this.mesh=new n.Mesh(this.geometry,e)}get material(){return this.mesh.material}set material(e){this.mesh.material=e}dispose(){this.mesh.geometry.dispose()}render(e){e.render(this.mesh,this.camera)}}var b=Object.defineProperty,M=(e,t,r)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?b(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,r};class T extends x{constructor(e,t="tDiffuse"){super(),M(this,"textureID"),M(this,"uniforms"),M(this,"material"),M(this,"fsQuad"),this.textureID=t,e instanceof n.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):(this.uniforms=n.UniformsUtils.clone(e.uniforms),this.material=new n.ShaderMaterial({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new y(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this.fsQuad.render(e)}dispose(){this.fsQuad.dispose(),this.material.dispose()}}var w=Object.defineProperty,S=(e,t,r)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?w(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,r};class C extends x{constructor(e,t){super(),S(this,"scene"),S(this,"camera"),S(this,"inverse"),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){let i,a,s=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0),this.inverse?(i=0,a=1):(i=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.buffers.stencil.setFunc(s.ALWAYS,i,0xffffffff),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(s.EQUAL,1,0xffffffff),o.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.buffers.stencil.setLocked(!0)}}class P extends x{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}var R=Object.defineProperty,B=(e,t,r)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?R(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,r};class A{constructor(e,t){if(B(this,"renderer"),B(this,"_pixelRatio"),B(this,"_width"),B(this,"_height"),B(this,"renderTarget1"),B(this,"renderTarget2"),B(this,"writeBuffer"),B(this,"readBuffer"),B(this,"renderToScreen"),B(this,"passes",[]),B(this,"copyPass"),B(this,"clock"),this.renderer=e,void 0===t){const r={minFilter:n.LinearFilter,magFilter:n.LinearFilter,format:n.RGBAFormat},i=e.getSize(new n.Vector2);this._pixelRatio=e.getPixelRatio(),this._width=i.width,this._height=i.height,(t=new n.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,r)).texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,void 0===p&&console.error("THREE.EffectComposer relies on CopyShader"),void 0===T&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new T(p),this.copyPass.material.blending=n.NoBlending,this.clock=new n.Clock}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){void 0===e&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),r=!1,i=this.passes.length;for(let t=0;t<i;t++){let i=this.passes[t];if(!1!==i.enabled){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),i.needsSwap){if(r){let t=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==C&&(i instanceof C?r=!0:i instanceof P&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let t=this.renderer.getSize(new n.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var U=Object.defineProperty,D=(e,t,r)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?U(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,r};class _ extends x{constructor(e,t,r,i,a=0){super(),D(this,"scene"),D(this,"camera"),D(this,"overrideMaterial"),D(this,"clearColor"),D(this,"clearAlpha"),D(this,"clearDepth",!1),D(this,"_oldClearColor",new n.Color),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=a,this.clear=!0,this.needsSwap=!1}render(e,t,r){let i,a=e.autoClear;e.autoClear=!1;let s=null;void 0!==this.overrideMaterial&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),i=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,i),void 0!==this.overrideMaterial&&(this.scene.overrideMaterial=s),e.autoClear=a}}let V={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new n.Color(0)},defaultOpacity:{value:0}},vertexShader:`
    varying vec2 vUv;

    void main() {

    	vUv = uv;

    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec3 defaultColor;
    uniform float defaultOpacity;
    uniform float luminosityThreshold;
    uniform float smoothWidth;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );

    	vec3 luma = vec3( 0.299, 0.587, 0.114 );

    	float v = dot( texel.xyz, luma );

    	vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

    	float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

    	gl_FragColor = mix( outputColor, texel, alpha );

    }
  `};var E=Object.defineProperty,j=(e,t,r)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?E(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,r};let z=(j(t=class extends x{constructor(e,t,r,i){super(),this.strength=void 0!==t?t:1,this.radius=r,this.threshold=i,this.resolution=void 0!==e?new n.Vector2(e.x,e.y):new n.Vector2(256,256),this.clearColor=new n.Color(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new n.WebGLRenderTarget(a,s,{type:n.HalfFloatType}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){const t=new n.WebGLRenderTarget(a,s,{type:n.HalfFloatType});t.texture.name="UnrealBloomPass.h"+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);const r=new n.WebGLRenderTarget(a,s,{type:n.HalfFloatType});r.texture.name="UnrealBloomPass.v"+e,r.texture.generateMipmaps=!1,this.renderTargetsVertical.push(r),a=Math.round(a/2),s=Math.round(s/2)}this.highPassUniforms=n.UniformsUtils.clone(V.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new n.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const o=[3,5,7,9,11];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(o[e])),this.separableBlurMaterials[e].uniforms.texSize.value=new n.Vector2(a,s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new n.Vector3(1,1,1),new n.Vector3(1,1,1),new n.Vector3(1,1,1),new n.Vector3(1,1,1),new n.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=n.UniformsUtils.clone(p.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new n.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:n.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new n.Color,this.oldClearAlpha=1,this.basic=new n.MeshBasicMaterial,this.fsQuad=new y(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.materialCopy.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(r,i);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(r,i),this.renderTargetsVertical[e].setSize(r,i),this.separableBlurMaterials[e].uniforms.texSize.value=new n.Vector2(r,i),r=Math.round(r/2),i=Math.round(i/2)}render(e,r,i,a,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let n=this.renderTargetBright;for(let r=0;r<this.nMips;r++)this.fsQuad.material=this.separableBlurMaterials[r],this.separableBlurMaterials[r].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[r].uniforms.direction.value=t.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[r]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[r].uniforms.colorTexture.value=this.renderTargetsHorizontal[r].texture,this.separableBlurMaterials[r].uniforms.direction.value=t.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[r]),e.clear(),this.fsQuad.render(e),n=this.renderTargetsVertical[r];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(i),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){return new n.ShaderMaterial({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new n.Vector2(.5,.5)},direction:{value:new n.Vector2(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new n.ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}},"BlurDirectionX",new n.Vector2(1,0)),j(t,"BlurDirectionY",new n.Vector2(0,1)),t),F={uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new n.Vector2(1,1)},uAnalogGrain:{value:.4},uAnalogBleeding:{value:1},uAnalogVSync:{value:1},uAnalogScanlines:{value:1},uAnalogVignette:{value:1},uAnalogJitter:{value:.4},uAnalogIntensity:{value:.6},uLimboMode:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAnalogGrain;
    uniform float uAnalogBleeding;
    uniform float uAnalogVSync;
    uniform float uAnalogScanlines;
    uniform float uAnalogVignette;
    uniform float uAnalogJitter;
    uniform float uAnalogIntensity;
    uniform float uLimboMode;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float random(float x) {
      return fract(sin(x) * 43758.5453123);
    }

    float gaussian(float z, float u, float o) {
      return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
    }

    vec3 grain(vec2 uv, float time, float intensity) {
      float seed = dot(uv, vec2(12.9898, 78.233));
      float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
      noise = gaussian(noise, 0.0, 0.5 * 0.5);
      return vec3(noise) * intensity;
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 1.8;

      vec2 jitteredUV = uv;
      if (uAnalogJitter > 0.01) {
        float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
        jitteredUV.x += jitterAmount;
        jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
      }

      if (uAnalogVSync > 0.01) {
        float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
        float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
        jitteredUV.y += vsyncRoll * vsyncChance;
      }

      vec4 color = texture2D(tDiffuse, jitteredUV);

      if (uAnalogBleeding > 0.01) {
        float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
        float offsetPhase = time * 1.5 + uv.y * 20.0;
        vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
        vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
        float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
        float g = texture2D(tDiffuse, jitteredUV).g;
        float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
        color = vec4(r, g, b, color.a);
      }

      if (uAnalogGrain > 0.01) {
        vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
        grainEffect *= (1.0 - color.rgb);
        color.rgb += grainEffect;
      }

      if (uAnalogScanlines > 0.01) {
        float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
        float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
        float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
        float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - horizontalLines);
      }

      if (uAnalogVignette > 0.01) {
        vec2 vignetteUV = (uv - 0.5) * 2.0;
        float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
        color.rgb *= vignette;
      }

      if (uLimboMode > 0.5) {
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = vec3(gray);
      }

      gl_FragColor = color;
    }
  `};function L(){let e=(0,i.useRef)(null),t=(0,i.useMemo)(()=>Array.from({length:20}).map(()=>({position:new n.Vector3((Math.random()-.5)*40,(Math.random()-.5)*30,(Math.random()-.5)*20),velocity:new n.Vector3((Math.random()-.5)*.09,(Math.random()-.5)*.09,(Math.random()-.5)*.09),phase:Math.random()*Math.PI*2,pulseSpeed:2+3*Math.random()})),[]);return(0,d.useFrame)(({clock:r})=>{if(!e.current)return;let i=r.getElapsedTime();e.current.children.forEach((e,r)=>{let a=t[r];if(!a)return;e.position.add(a.velocity),Math.abs(e.position.x)>30&&(a.velocity.x*=-1),Math.abs(e.position.y)>20&&(a.velocity.y*=-1),Math.abs(e.position.z)>15&&(a.velocity.z*=-1);let s=.4*Math.sin((i+a.phase)*a.pulseSpeed)+.6,o=e.material;o&&(o.opacity=.9*s);let l=e.children.find(e=>e instanceof n.PointLight),u=e.children.find(e=>e instanceof n.Mesh);l&&(l.intensity=3.44*s),u&&(u.material.opacity=2.15*s)})}),(0,r.jsx)("group",{ref:e,children:t.map((e,t)=>(0,r.jsxs)("mesh",{position:e.position,children:[(0,r.jsx)("sphereGeometry",{args:[.05,2,2]}),(0,r.jsx)("meshBasicMaterial",{color:0xffff44,transparent:!0,opacity:.9}),(0,r.jsxs)("mesh",{children:[(0,r.jsx)("sphereGeometry",{args:[.09,8,8]}),(0,r.jsx)("meshBasicMaterial",{color:0xffff88,transparent:!0,opacity:.4,side:n.BackSide})]}),(0,r.jsx)("pointLight",{color:0xffff44,intensity:.5,distance:4,decay:3})]},t))})}function O({ghostGroup:e,movementRef:t,count:a}){let s=(0,i.useRef)(null),o=(0,i.useRef)(2),l=(0,i.useMemo)(()=>{let e=[new n.SphereGeometry(.05,6,6),new n.TetrahedronGeometry(.04,0),new n.OctahedronGeometry(.045,0)];return Array.from({length:a}).map((t,r)=>({key:r,geometry:e[Math.floor(Math.random()*e.length)]}))},[a]);return(0,d.useFrame)(({clock:r})=>{if(!s.current||!e.current)return;let i=1e3*r.getElapsedTime();if(t.current>.005&&i-o.current>200){let t=0;for(let r of s.current.children){if(t>=5)break;if(!r.visible){r.visible=!0,r.position.copy(e.current.position),r.position.z-=.8+.6*Math.random(),r.position.x+=(Math.random()-.5)*3.5,r.position.y+=(Math.random()-.5)*3.5-.8;let i=.6+.7*Math.random();r.scale.set(i,i,i),r.rotation.set(6*Math.random(),6*Math.random(),6*Math.random());let a=new n.Color(f(c));a.offsetHSL(.1*Math.random()-.05,0,0),r.material.color=a,r.material.opacity=.9*Math.random(),r.userData={life:1,decay:.003*Math.random()+.005,velocity:new n.Vector3((Math.random()-.5)*.015,(Math.random()-.5)*.012-.002,(Math.random()-.5)*.012-.006),rotationSpeed:new n.Vector3((Math.random()-.5)*.015,(Math.random()-.5)*.015,(Math.random()-.5)*.015)},t++}}o.current=i}s.current.children.forEach(e=>{if(!e.visible)return;let t=e.userData;t.life-=t.decay,e.material.opacity=.85*t.life,e.position.add(t.velocity);let i=8e-4*Math.cos(1.8*r.getElapsedTime()+e.position.y);e.position.x+=i,e.rotation.x+=t.rotationSpeed.x,e.rotation.y+=t.rotationSpeed.y,e.rotation.z+=t.rotationSpeed.z,t.life<=0&&(e.visible=!1)})}),(0,r.jsx)("group",{ref:s,children:l.map(e=>(0,r.jsx)("mesh",{geometry:e.geometry,visible:!1,children:(0,r.jsx)("meshBasicMaterial",{color:f(c),transparent:!0,opacity:0,alphaTest:.1})},e.key))})}function I({particleCount:e=100,ghostRef:t}){let a=(0,i.useRef)(null),o=t||a,l=(0,i.useRef)(new n.Group),u=(0,i.useRef)(null),h=(0,i.useRef)(null),c=(0,i.useRef)(null),m=(0,i.useRef)(null),{viewport:p,mouse:g,camera:v,scene:x,gl:y,size:b}=(0,s.useThree)(),[M,w]=(0,i.useState)(!1),S=(0,i.useRef)(new n.Vector3),C=(0,i.useRef)(0);return(0,i.useEffect)(()=>{if(!y||!x||!v)return;y.setClearColor(0,0);let e=new A(y);e.setSize(b.width,b.height);let t=new _(x,v);e.addPass(t);let r=new z(new n.Vector2(b.width,b.height),.3,1.15,.5);e.addPass(r),c.current=r;let i=new T(F);return i.uniforms.uResolution.value.set(b.width,b.height),e.addPass(i),m.current=i,h.current=e,w(!0),()=>{e.dispose(),w(!1)}},[y,x,v,b]),(0,d.useFrame)(({clock:e})=>{if(!o.current||!u.current)return;let t=e.getElapsedTime();m.current&&m.current.uniforms&&(m.current.uniforms.uTime.value=t);let r=g.x*p.width*.3,i=g.y*p.height*.3;o.current.position.x+=(r-o.current.position.x)*.05,o.current.position.y+=(i-o.current.position.y)*.05;let a=.03*Math.sin(1.6*t*.5)+.018*Math.cos(1.6*t*.7);o.current.position.y+=a;let s=.6*Math.sin(1.6*t);u.current.material instanceof n.MeshStandardMaterial&&(u.current.material.emissiveIntensity=8.5+s);let c=r-o.current.position.x,f=i-o.current.position.y;if(o.current.rotation.z=n.MathUtils.lerp(o.current.rotation.z,-(.05*c),.05),o.current.rotation.x=n.MathUtils.lerp(o.current.rotation.x,.02*f,.02),l.current&&l.current.userData?.leftEyeMaterial){let e=S.current,t=e.distanceTo(o.current.position);C.current=.95*C.current+4.05*t,e.copy(o.current.position);let r=C.current>.07,{leftEyeMaterial:i,rightEyeMaterial:a,leftOuterMaterial:s,rightOuterMaterial:u}=l.current.userData;i.opacity=n.MathUtils.lerp(i.opacity,+!!r,r?.31:.155),a.opacity=i.opacity,s.opacity=.63*i.opacity,u.opacity=.63*i.opacity}h.current&&M&&h.current.render()},.5),(0,i.useEffect)(()=>{if(!l.current)return;let e=f("purple"),t=new n.SphereGeometry(.45,16,16),r=new n.MeshBasicMaterial({color:0}),i=new n.Mesh(t,r);i.position.set(-.7,.6,1.9),i.scale.set(1.1,1,.6);let a=new n.Mesh(t,r);a.position.set(.7,.6,1.9),a.scale.set(1.1,1,.6);let s=new n.SphereGeometry(.3,12,12),u=new n.SphereGeometry(.525,12,12),h=new n.MeshBasicMaterial({color:e,transparent:!0,opacity:0}),c=new n.MeshBasicMaterial({color:e,transparent:!0,opacity:0,side:n.BackSide}),d=new n.Mesh(s,h.clone()),m=new n.Mesh(s,h.clone()),p=new n.Mesh(u,c.clone()),g=new n.Mesh(u,c.clone());d.position.set(-.7,.6,2),m.position.set(.7,.6,2),p.position.set(-.7,.6,1.95),g.position.set(.7,.6,1.95),l.current.clear(),l.current.add(i,a,d,m,p,g),l.current.userData={leftEyeMaterial:d.material,rightEyeMaterial:m.material,leftOuterMaterial:p.material,rightOuterMaterial:g.material},o.current&&o.current.add(l.current)},[o]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(L,{}),(0,r.jsx)(O,{ghostGroup:o,movementRef:C,count:e}),(0,r.jsx)("group",{ref:o,name:"ghost",scale:.88,children:(0,r.jsxs)("mesh",{ref:u,children:[(0,r.jsx)("sphereGeometry",{args:[2,64,64]}),(0,r.jsx)("meshStandardMaterial",{color:f("ghostBlue"),emissive:f("blue"),emissiveIntensity:8.5,roughness:.02,metalness:0,transparent:!0,opacity:.5,blending:n.AdditiveBlending,depthWrite:!1,side:n.DoubleSide,onBeforeCompile:e=>{e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      
      // Ghost Skirt Deformation
      float y = position.y;
      if (y < -0.2) {
        float x = position.x;
        float z = position.z;
        
        float noise1 = sin(x * 5.0) * 0.35;
        float noise2 = cos(z * 4.0) * 0.25;
        float noise3 = sin((x + z) * 3.0) * 0.15;
        
        transformed.y = -2.0 + noise1 + noise2 + noise3;
      }
      `)}})]})})]})}(0,m.extend)({EffectComposer:A,RenderPass:_,UnrealBloomPass:z,ShaderPass:T});let G={uniforms:{ghostPosition:{value:new n.Vector3},time:{value:0},revealRadius:{value:17},fadeStrength:{value:.7},baseOpacity:{value:.08},revealOpacity:{value:-.2}},vertexShader:`
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform vec3 ghostPosition;
    uniform float time;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    varying vec3 vWorldPosition;
    
    void main() {
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      // FIXED: Match CodePen dynamics exactly
      float dynamicRadius = revealRadius * 0.3 + sin(time * 2.0) * 1.0;
      float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength * 2.5);
      
      float finalOpacity = mix(revealOpacity * 0.5, baseOpacity * 0.3, reveal);
      
      // FIXED: Blue-tinted atmosphere like CodePen (was near-black)
      gl_FragColor = vec4(0.0, 0.2, 1.0, finalOpacity * 0.8);
    }
  `,transparent:!0};function k(){let e=(0,i.useRef)(null);return(0,d.useFrame)(({clock:t,scene:r})=>{if(!e.current)return;let i=r.getObjectByName("ghost"),a=e.current.material;a.uniforms.time.value=t.getElapsedTime(),i&&a.uniforms.ghostPosition.value.copy(i.position)}),(0,r.jsxs)("mesh",{ref:e,position:[0,0,-10],children:[(0,r.jsx)("planeGeometry",{args:[100,100]}),(0,r.jsx)("shaderMaterial",{attach:"material",args:[G]})]})}function Q(){let e=function(){let[e,t]=(0,i.useState)("high");return(0,i.useEffect)(()=>{let e,r=navigator,i=/iPhone|iPad|iPod|Android/i.test(r.userAgent),a=r.hardwareConcurrency&&r.hardwareConcurrency<=4,s=r.deviceMemory&&r.deviceMemory<4;if(i||a||s)return void t("low");if(window.devicePixelRatio>2)return void t("medium");let o=0,n=performance.now(),l=!0,u=()=>{o++;let r=performance.now();r>=n+1e3&&(30>Math.round(1e3*o/(r-n))&&l&&t(e=>"low"===e?"low":"medium"),o=0,n=r),e=requestAnimationFrame(u)};return e=requestAnimationFrame(u),()=>{l=!1,cancelAnimationFrame(e)}},[]),({high:{quality:"high",fireflyCount:20,particleCount:50,enablePostProcessing:!0,pixelRatio:Math.min(window.devicePixelRatio,2)},medium:{quality:"medium",fireflyCount:12,particleCount:25,enablePostProcessing:!1,pixelRatio:1.5},low:{quality:"low",fireflyCount:6,particleCount:10,enablePostProcessing:!1,pixelRatio:1}})[e]}(),t=(0,i.useRef)(null),s=e.pixelRatio;return(0,r.jsx)("div",{className:"w-full h-full relative bg-transparent",children:(0,r.jsx)(a.Canvas,{shadows:!1,dpr:s,camera:{position:[0,0,25],fov:75},gl:{antialias:"low"!==e.quality,powerPreference:"high-performance",alpha:!0,stencil:!1,depth:!0},style:{background:"transparent"},children:(0,r.jsxs)(i.Suspense,{fallback:null,children:[(0,r.jsx)(o,{pixelated:"low"===e.quality}),(0,r.jsx)("ambientLight",{color:"cyan",intensity:.08}),(0,r.jsx)("directionalLight",{position:[-8,6,-4],intensity:1.8,color:"#4a90e2"}),(0,r.jsx)("directionalLight",{position:[8,-4,-6],intensity:1.26,color:"#50e3c2"}),(0,r.jsx)(I,{ghostRef:t,particleCount:5*e.particleCount}),(0,r.jsx)(k,{}),(0,r.jsx)(l,{all:!0})]})})})}e.s(["GhostCanvas",()=>Q,"default",0,Q],51078)},1398,e=>{e.n(e.i(51078))}]);