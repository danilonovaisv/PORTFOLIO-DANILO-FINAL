(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,12394,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(90072),a=e.i(8560);let o={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var s=r;class n{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}let l=new s.OrthographicCamera(-1,1,1,-1,0,1);class u extends s.BufferGeometry{constructor(){super(),this.setAttribute("position",new s.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new s.Float32BufferAttribute([0,2,0,0,2,0],2))}}let h=new u;class d{constructor(e){this._mesh=new s.Mesh(h,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,l)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class f extends n{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof r.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=r.UniformsUtils.clone(e.uniforms),this.material=new r.ShaderMaterial({name:void 0!==e.name?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new d(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class c extends n{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r,a,o=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0),this.inverse?(r=0,a=1):(r=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),s.buffers.stencil.setFunc(o.ALWAYS,r,0xffffffff),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(o.EQUAL,1,0xffffffff),s.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),s.buffers.stencil.setLocked(!0)}}class p extends n{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class m{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),void 0===t){const i=e.getSize(new r.Vector2);this._width=i.width,this._height=i.height,(t=new r.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:r.HalfFloatType})).texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new f(o),this.copyPass.material.blending=r.NoBlending,this.clock=new r.Clock}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){void 0===e&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(!1!==r.enabled){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),r.needsSwap){if(i){let t=this.renderer.getContext(),i=this.renderer.state.buffers.stencil;i.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),i.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==c&&(r instanceof c?i=!0:r instanceof p&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let t=this.renderer.getSize(new r.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class g extends n{constructor(e,t,i=null,a=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=a,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new r.Color}render(e,t,i){let r,a,o=e.autoClear;e.autoClear=!1,null!==this.overrideMaterial&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),null!==this.clearColor&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),null!==this.clearAlpha&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),!0==this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),!0===this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),null!==this.clearColor&&e.setClearColor(this._oldClearColor),null!==this.clearAlpha&&e.setClearAlpha(r),null!==this.overrideMaterial&&(this.scene.overrideMaterial=a),e.autoClear=o}}let v={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new r.Color(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class w extends n{constructor(e,t=1,i,a){super(),this.strength=t,this.radius=i,this.threshold=a,this.resolution=void 0!==e?new r.Vector2(e.x,e.y):new r.Vector2(256,256),this.clearColor=new r.Color(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new r.WebGLRenderTarget(s,n,{type:r.HalfFloatType}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){const t=new r.WebGLRenderTarget(s,n,{type:r.HalfFloatType});t.texture.name="UnrealBloomPass.h"+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);const i=new r.WebGLRenderTarget(s,n,{type:r.HalfFloatType});i.texture.name="UnrealBloomPass.v"+e,i.texture.generateMipmaps=!1,this.renderTargetsVertical.push(i),s=Math.round(s/2),n=Math.round(n/2)}this.highPassUniforms=r.UniformsUtils.clone(v.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new r.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:v.vertexShader,fragmentShader:v.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new r.Vector2(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new r.Vector3(1,1,1),new r.Vector3(1,1,1),new r.Vector3(1,1,1),new r.Vector3(1,1,1),new r.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=r.UniformsUtils.clone(o.uniforms),this.blendMaterial=new r.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,premultipliedAlpha:!0,blending:r.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new r.Color,this._oldClearAlpha=1,this._basic=new r.MeshBasicMaterial,this._fsQuad=new d(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(i,a);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(i,a),this.renderTargetsVertical[e].setSize(i,a),this.separableBlurMaterials[e].uniforms.invSize.value=new r.Vector2(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2)}render(e,t,i,r,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let s=this.renderTargetBright;for(let t=0;t<this.nMips;t++)this._fsQuad.material=this.separableBlurMaterials[t],this.separableBlurMaterials[t].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[t].uniforms.direction.value=w.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[t]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[t].uniforms.colorTexture.value=this.renderTargetsHorizontal[t].texture,this.separableBlurMaterials[t].uniforms.direction.value=w.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[t]),e.clear(),this._fsQuad.render(e),s=this.renderTargetsVertical[t];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(i),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new r.ShaderMaterial({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new r.Vector2(.5,.5)},direction:{value:new r.Vector2(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new r.ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}w.BlurDirectionX=new r.Vector2(1,0),w.BlurDirectionY=new r.Vector2(0,1);let M={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class y extends n{constructor(){super(),this.isOutputPass=!0,this.uniforms=r.UniformsUtils.clone(M.uniforms),this.material=new r.RawShaderMaterial({name:M.name,uniforms:this.uniforms,vertexShader:M.vertexShader,fragmentShader:M.fragmentShader}),this._fsQuad=new d(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},r.ColorManagement.getTransfer(this._outputColorSpace)===r.SRGBTransfer&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===r.LinearToneMapping?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===r.ReinhardToneMapping?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===r.CineonToneMapping?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===r.ACESFilmicToneMapping?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===r.AgXToneMapping?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===r.NeutralToneMapping?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===r.CustomToneMapping&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),!0===this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function b(){let e=(0,i.useRef)(null),o=(0,i.useRef)(null),s=(0,i.useRef)(null),n=function(){let[e,t]=(0,i.useState)("high");return(0,i.useEffect)(()=>{let e,i=navigator,r=/iPhone|iPad|iPod|Android/i.test(i.userAgent),a=i.hardwareConcurrency&&i.hardwareConcurrency<=4,o=i.deviceMemory&&i.deviceMemory<4;if(r||a||o)return void t("low");if(window.devicePixelRatio>2)return void t("medium");let s=0,n=performance.now(),l=!0,u=()=>{s++;let i=performance.now();i>=n+1e3&&(30>Math.round(1e3*s/(i-n))&&l&&t(e=>"low"===e?"low":"medium"),s=0,n=i),e=requestAnimationFrame(u)};return e=requestAnimationFrame(u),()=>{l=!1,cancelAnimationFrame(e)}},[]),({high:{quality:"high",fireflyCount:20,particleCount:50,enablePostProcessing:!0,pixelRatio:Math.min(window.devicePixelRatio,2)},medium:{quality:"medium",fireflyCount:12,particleCount:25,enablePostProcessing:!1,pixelRatio:1.5},low:{quality:"low",fireflyCount:6,particleCount:10,enablePostProcessing:!1,pixelRatio:1}})[e]}();return(0,i.useEffect)(()=>{let t,i,l,u,h,d,c,p,v,M,b,x,T,C,S,_,P,A=e.current;if(!A)return;let R={loadingSteps:0,totalSteps:5,isComplete:!1,updateProgress:e=>{let t=Math.min(e,5);s.current&&(s.current.style.width=`${t/5*100}%`)},complete:e=>{R.isComplete||(R.isComplete=!0,R.updateProgress(5),setTimeout(()=>{o.current&&o.current.classList.add("fade-out"),e.classList.add("fade-in"),setTimeout(()=>{o.current&&(o.current.style.display="none")},1e3)},1500))}},E=new r.Scene,D=new r.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3);D.position.z=20,R.updateProgress(1);let U=new a.WebGLRenderer({antialias:!0,powerPreference:"high-performance",alpha:!0,premultipliedAlpha:!1,stencil:!1,depth:!0,preserveDrawingBuffer:!1});U.setSize(window.innerWidth,window.innerHeight),U.toneMapping=r.ACESFilmicToneMapping,U.toneMappingExposure=.9,U.setClearColor(0,0),U.domElement.style.position="absolute",U.domElement.style.top="0",U.domElement.style.left="0",U.domElement.style.zIndex="0",U.domElement.style.pointerEvents="none",U.domElement.style.background="transparent",A.appendChild(U.domElement),R.updateProgress(2);let B=new m(U),F=new g(E,D);B.addPass(F);let G=new w(new r.Vector2(window.innerWidth,window.innerHeight),.3,1.25,0);B.addPass(G),R.updateProgress(3);let N=new f({uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new r.Vector2(window.innerWidth,window.innerHeight)},uAnalogGrain:{value:.4},uAnalogBleeding:{value:1},uAnalogVSync:{value:1},uAnalogScanlines:{value:1},uAnalogVignette:{value:1},uAnalogJitter:{value:.4},uAnalogIntensity:{value:.6},uLimboMode:{value:0}},vertexShader:`
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
        
        float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
        float random(float x) { return fract(sin(x) * 43758.5453123); }
        float gaussian(float z, float u, float o) { return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o)))); }
        
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
      `});B.addPass(N);let V=new y;B.addPass(V);let I={bodyColor:991271,glowColor:"blue",eyeGlowColor:"violet",ghostOpacity:.88,ghostScale:2.4,emissiveIntensity:5.8,pulseSpeed:1.6,pulseIntensity:.6,eyeGlowIntensity:4.5,eyeGlowDecay:.95,eyeGlowResponse:.31,rimLightIntensity:1.8,followSpeed:.05,wobbleAmount:.35,floatSpeed:1.6,movementThreshold:.07,particleCount:5*n.particleCount,particleDecayRate:.005,particleColor:"violet",createParticlesOnlyWhenMoving:!0,particleCreationRate:"low"===n.quality?2:5,revealRadius:37,fadeStrength:1.7,baseOpacity:.9,revealOpacity:.05,fireflyGlowIntensity:4.3,fireflySpeed:.09,analogIntensity:.9,analogGrain:.4,analogBleeding:.9,analogVSync:1.7,analogScanlines:1,analogVignette:2.4,analogJitter:.5,limboMode:!1},L={cyan:65535,lime:65280,magenta:0xff00ff,yellow:0xffff00,orange:0xff4500,pink:0xff1493,purple:9699539,blue:33023,green:65408,red:0xff0040,teal:65450,violet:9055202},O=new r.PlaneGeometry(300,300),z=new r.ShaderMaterial({uniforms:{ghostPosition:{value:new r.Vector3(0,0,0)},revealRadius:{value:I.revealRadius},fadeStrength:{value:I.fadeStrength},baseOpacity:{value:I.baseOpacity},revealOpacity:{value:I.revealOpacity},time:{value:0}},vertexShader:`
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 ghostPosition;
        uniform float revealRadius;
        uniform float fadeStrength;
        uniform float baseOpacity;
        uniform float revealOpacity;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        void main() {
          float dist = distance(vWorldPosition.xy, ghostPosition.xy);
          float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
          float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
          reveal = pow(reveal, fadeStrength);
          float opacity = mix(revealOpacity, baseOpacity, reveal);
          gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
        }
      `,transparent:!0,depthWrite:!1}),j=new r.Mesh(O,z);j.position.z=-50,j.renderOrder=-100,E.add(j);let H=new r.AmbientLight(657966,.08);E.add(H);let W=new r.Group;E.add(W);let k=new r.SphereGeometry(2,40,40),Q=k.getAttribute("position").array;for(let e=0;e<Q.length;e+=3)if(Q[e+1]<-.2){let t=Q[e],i=Q[e+2],r=.35*Math.sin(5*t),a=.25*Math.cos(4*i),o=.15*Math.sin((t+i)*3);Q[e+1]=-2+r+a+o}k.computeVertexNormals();let q=new r.MeshStandardMaterial({color:I.bodyColor,transparent:!0,opacity:I.ghostOpacity,emissive:L[I.glowColor],emissiveIntensity:I.emissiveIntensity,roughness:.02,metalness:0,side:r.DoubleSide,alphaTest:.1}),K=new r.Mesh(k,q);W.add(K);let X=new r.DirectionalLight(4886754,I.rimLightIntensity);X.position.set(-8,6,-4),E.add(X);let J=new r.DirectionalLight(5301186,.7*I.rimLightIntensity);J.position.set(8,-4,-6),E.add(J),R.updateProgress(4);let Y=(l=new r.Group,W.add(l),u=new r.SphereGeometry(.45,16,16),h=new r.MeshBasicMaterial({color:0}),(d=new r.Mesh(u,h)).position.set(-.7,.6,1.9),d.scale.set(1.1,1,.6),l.add(d),(c=new r.Mesh(u,h)).position.set(.7,.6,1.9),c.scale.set(1.1,1,.6),l.add(c),p=new r.SphereGeometry(.3,12,12),v=new r.MeshBasicMaterial({color:L[I.eyeGlowColor],transparent:!0,opacity:0}),(M=new r.Mesh(p,v)).position.set(-.7,.6,2),l.add(M),b=new r.MeshBasicMaterial({color:L[I.eyeGlowColor],transparent:!0,opacity:0}),(x=new r.Mesh(p,b)).position.set(.7,.6,2),l.add(x),T=new r.SphereGeometry(.525,12,12),C=new r.MeshBasicMaterial({color:L[I.eyeGlowColor],transparent:!0,opacity:0,side:r.BackSide}),(S=new r.Mesh(T,C)).position.set(-.7,.6,1.95),l.add(S),_=new r.MeshBasicMaterial({color:L[I.eyeGlowColor],transparent:!0,opacity:0,side:r.BackSide}),(P=new r.Mesh(T,_)).position.set(.7,.6,1.95),l.add(P),{leftEyeMaterial:v,rightEyeMaterial:b,leftOuterGlowMaterial:C,rightOuterGlowMaterial:_}),$=[],Z=new r.Group;E.add(Z);let ee=n.fireflyCount;for(let e=0;e<ee;e++){let e=new r.SphereGeometry(.02,2,2),t=new r.MeshBasicMaterial({color:0xffff44,transparent:!0,opacity:.9}),i=new r.Mesh(e,t);i.position.set((Math.random()-.5)*40,(Math.random()-.5)*30,(Math.random()-.5)*20);let a=new r.SphereGeometry(.08,8,8),o=new r.MeshBasicMaterial({color:0xffff88,transparent:!0,opacity:.4,side:r.BackSide}),s=new r.Mesh(a,o);i.add(s);let n=new r.PointLight(0xffff44,.8,3,2);i.add(n),i.userData={velocity:new r.Vector3((Math.random()-.5)*I.fireflySpeed,(Math.random()-.5)*I.fireflySpeed,(Math.random()-.5)*I.fireflySpeed),phase:Math.random()*Math.PI*2,pulseSpeed:2+3*Math.random(),glowMat:o,fireflyMat:t,light:n},Z.add(i),$.push(i)}let et=[],ei=new r.Group;E.add(ei);let er=[],ea=[new r.SphereGeometry(.05,6,6),new r.TetrahedronGeometry(.04,0),new r.OctahedronGeometry(.045,0)],eo=new r.MeshBasicMaterial({color:L[I.particleColor],transparent:!0,opacity:0,alphaTest:.1});for(let e=0;e<100;e++){let e=ea[Math.floor(Math.random()*ea.length)],t=new r.Mesh(e,eo.clone());t.visible=!1,ei.add(t),er.push(t)}function es(){let e;if(er.length>0)(e=er.pop())&&(e.visible=!0);else{if(!(et.length<I.particleCount))return null;let t=ea[Math.floor(Math.random()*ea.length)];e=new r.Mesh(t,eo.clone()),ei.add(e)}if(!e)return null;let t=new r.Color(L[I.particleColor]);t.offsetHSL(.1*Math.random()-.05,0,0);let i=e.material;i.color=t,e.position.copy(W.position),e.position.z-=.8+.6*Math.random(),e.position.x+=(Math.random()-.5)*3.5,e.position.y+=(Math.random()-.5)*3.5-.8;let a=.6+.7*Math.random();e.scale.set(a,a,a),e.rotation.set(6*Math.random(),6*Math.random(),6*Math.random()),e.userData.life=1,e.userData.decay=.003*Math.random()+I.particleDecayRate,e.userData.rotationSpeed={x:(Math.random()-.5)*.015,y:(Math.random()-.5)*.015,z:(Math.random()-.5)*.015},e.userData.velocity={x:(Math.random()-.5)*.012,y:(Math.random()-.5)*.012-.002,z:(Math.random()-.5)*.012-.006},i.opacity=.9*Math.random(),et.push(e)}let en="ontouchstart"in window||navigator.maxTouchPoints>0,el=window.innerWidth<=768,eu=en||el,eh=0,ed=()=>{eh=window.scrollY};window.addEventListener("scroll",ed,{passive:!0});let ef=new r.Vector2,ec=!1,ep=(e,i)=>{ec=!0,ef.x=e/window.innerWidth*2-1,ef.y=-(2*(i/window.innerHeight))+1,clearTimeout(t),t=setTimeout(()=>{ec=!1},3e3)},em=e=>{ep(e.clientX,e.clientY)},eg=e=>{e.touches.length>0&&ep(e.touches[0].clientX,e.touches[0].clientY)};window.addEventListener("mousemove",em),window.addEventListener("touchstart",eg,{passive:!0}),window.addEventListener("touchmove",eg,{passive:!0});let ev=()=>{D.aspect=window.innerWidth/window.innerHeight,D.updateProjectionMatrix(),U.setSize(window.innerWidth,window.innerHeight),B.setSize(window.innerWidth,window.innerHeight),G.setSize(window.innerWidth,window.innerHeight),N.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight)};window.addEventListener("resize",ev);let ew=0,eM=0,ey=0,eb=!1,ex=0;R.updateProgress(5),setTimeout(()=>{for(let e=0;e<3;e++)B.render();for(let e=0;e<10;e++)es();B.render(),eb=!0,R.complete(U.domElement)},100);let eT=e=>{let t,r;if(i=requestAnimationFrame(eT),!eb)return;let a=e-eM;if(eM=e,a>100)return;ew+=a/16.67*.01,z.uniforms.time.value=ew,N.uniforms.uTime.value=ew,N.uniforms.uLimboMode.value=+!!I.limboMode;let o=9*Math.sin(.85*ew)+2*Math.cos(.85*ew*.5),s=6*Math.sin(.85*ew*.7+Math.PI/2)+1.5*Math.sin(.85*ew*1.3);ec?(t=12*ef.x+.1*o,r=8*ef.y+.1*s+-(eh/window.innerHeight*15)):(t=o,r=s+-(eh/window.innerHeight*15));let l=W.position.clone();W.position.x+=(t-W.position.x)*I.followSpeed,W.position.y+=(r-W.position.y)*I.followSpeed,z.uniforms.ghostPosition.value.copy(W.position);let u=l.distanceTo(W.position);ey=ey*I.eyeGlowDecay+u*(1-I.eyeGlowDecay),W.position.y+=.03*Math.sin(ew*I.floatSpeed*1.5);let h=Math.sin(ew*I.pulseSpeed)*I.pulseIntensity;q.emissiveIntensity=I.emissiveIntensity+h;let d=ey>I.movementThreshold,f=d?2*I.eyeGlowResponse:I.eyeGlowResponse,c=Y.leftEyeMaterial.opacity+(!!d-Y.leftEyeMaterial.opacity)*f;Y.leftEyeMaterial.opacity=c,Y.rightEyeMaterial.opacity=c,Y.leftOuterGlowMaterial.opacity=.3*c,Y.rightOuterGlowMaterial.opacity=.3*c,(eu?ey>.003:I.createParticlesOnlyWhenMoving?ey>.005&&ec:ey>.005)&&e-ex>100&&(Array.from({length:Math.min(I.particleCreationRate,Math.max(1,Math.floor(100*u)))}).forEach(()=>es()),ex=e),et.forEach(e=>{if(!e.visible)return;e.userData.life-=e.userData.decay;let t=e.material;t.opacity=.85*e.userData.life,e.userData.velocity&&(e.position.add(e.userData.velocity),e.position.x+=8e-4*Math.cos(1.8*ew+e.position.y)),e.userData.rotationSpeed&&(e.rotation.x+=e.userData.rotationSpeed.x,e.rotation.y+=e.userData.rotationSpeed.y,e.rotation.z+=e.userData.rotationSpeed.z),e.userData.life<=0&&(e.visible=!1,t.opacity=0,er.push(e))});for(let e=et.length-1;e>=0;e--)et[e].visible||et.splice(e,1);n.enablePostProcessing?B.render():U.render(E,D)};return eT(0),()=>{window.removeEventListener("scroll",ed),window.removeEventListener("mousemove",em),window.removeEventListener("touchstart",eg),window.removeEventListener("touchmove",eg),window.removeEventListener("resize",ev),cancelAnimationFrame(i),O.dispose(),z.dispose(),k.dispose(),q.dispose(),Y.leftEyeMaterial.dispose(),Y.rightEyeMaterial.dispose(),Y.leftOuterGlowMaterial.dispose(),Y.rightOuterGlowMaterial.dispose(),$.forEach(e=>{e.geometry.dispose(),e.material.dispose(),e.userData.glowMat&&e.userData.glowMat.dispose(),e.userData.fireflyMat&&e.userData.fireflyMat.dispose()}),ea.forEach(e=>e.dispose()),eo.dispose(),er.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),et.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),U.dispose(),G.dispose&&G.dispose(),F.dispose&&F.dispose(),A&&U.domElement&&A.removeChild(U.domElement)}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{ref:e,className:"w-full h-full absolute top-0 left-0"}),(0,t.jsx)("div",{ref:o,className:"preloader",id:"preloader",children:(0,t.jsxs)("div",{className:"preloader-content",children:[(0,t.jsx)("div",{className:"ghost-loader",children:(0,t.jsxs)("svg",{className:"ghost-svg",height:"80",viewBox:"0 0 512 512",width:"80",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{className:"ghost-body",d:"m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z",fill:"white"}),(0,t.jsx)("circle",{className:"ghost-eye left-eye",cx:"208",cy:"225",r:"22",fill:"black"}),(0,t.jsx)("circle",{className:"ghost-eye right-eye",cx:"297",cy:"225",r:"22",fill:"black"})]})}),(0,t.jsx)("div",{className:"loading-text",children:"Summoning spirits"}),(0,t.jsx)("div",{className:"loading-progress",children:(0,t.jsx)("div",{ref:s,className:"progress-bar"})})]})})]})}e.s(["default",()=>b],12394)},47908,e=>{e.n(e.i(12394))}]);