(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/CopyShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopyShader",
    ()=>CopyShader
]);
/**
 * @module CopyShader
 * @three_import import { CopyShader } from 'three/addons/shaders/CopyShader.js';
 */ /**
 * Full-screen copy shader pass.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */ const CopyShader = {
    name: 'CopyShader',
    uniforms: {
        'tDiffuse': {
            value: null
        },
        'opacity': {
            value: 1.0
        }
    },
    vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: /* glsl */ `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
};
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/Pass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FullScreenQuad",
    ()=>FullScreenQuad,
    "Pass",
    ()=>Pass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
/**
 * Abstract base class for all post processing passes.
 *
 * This module is only relevant for post processing with {@link WebGLRenderer}.
 *
 * @abstract
 * @three_import import { Pass } from 'three/addons/postprocessing/Pass.js';
 */ class Pass {
    /**
	 * Constructs a new pass.
	 */ constructor(){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isPass = true;
        /**
		 * If set to `true`, the pass is processed by the composer.
		 *
		 * @type {boolean}
		 * @default true
		 */ this.enabled = true;
        /**
		 * If set to `true`, the pass indicates to swap read and write buffer after rendering.
		 *
		 * @type {boolean}
		 * @default true
		 */ this.needsSwap = true;
        /**
		 * If set to `true`, the pass clears its buffer before rendering
		 *
		 * @type {boolean}
		 * @default false
		 */ this.clear = false;
        /**
		 * If set to `true`, the result of the pass is rendered to screen. The last pass in the composers
		 * pass chain gets automatically rendered to screen, no matter how this property is configured.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.renderToScreen = false;
    }
    /**
	 * Sets the size of the pass.
	 *
	 * @abstract
	 * @param {number} width - The width to set.
	 * @param {number} height - The height to set.
	 */ setSize() {}
    /**
	 * This method holds the render logic of a pass. It must be implemented in all derived classes.
	 *
	 * @abstract
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render() {
        console.error('THREE.Pass: .render() must be implemented in derived pass.');
    }
    /**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever the pass is no longer used in your app.
	 *
	 * @abstract
	 */ dispose() {}
}
// Helper for passes that need to fill the viewport with a single quad.
const _camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"](-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
class FullscreenTriangleGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"] {
    constructor(){
        super();
        this.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
            -1,
            3,
            0,
            -1,
            -1,
            0,
            3,
            -1,
            0
        ], 3));
        this.setAttribute('uv', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
            0,
            2,
            0,
            0,
            2,
            0
        ], 2));
    }
}
const _geometry = new FullscreenTriangleGeometry();
/**
 * This module is a helper for passes which need to render a full
 * screen effect which is quite common in context of post processing.
 *
 * The intended usage is to reuse a single full screen quad for rendering
 * subsequent passes by just reassigning the `material` reference.
 *
 * This module can only be used with {@link WebGLRenderer}.
 *
 * @augments Mesh
 * @three_import import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
 */ class FullScreenQuad {
    /**
	 * Constructs a new full screen quad.
	 *
	 * @param {?Material} material - The material to render te full screen quad with.
	 */ constructor(material){
        this._mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](_geometry, material);
    }
    /**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever the instance is no longer used in your app.
	 */ dispose() {
        this._mesh.geometry.dispose();
    }
    /**
	 * Renders the full screen quad.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 */ render(renderer) {
        renderer.render(this._mesh, _camera);
    }
    /**
	 * The quad's material.
	 *
	 * @type {?Material}
	 */ get material() {
        return this._mesh.material;
    }
    set material(value) {
        this._mesh.material = value;
    }
}
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/ShaderPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShaderPass",
    ()=>ShaderPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/Pass.js [app-client] (ecmascript)");
;
;
/**
 * This pass can be used to create a post processing effect
 * with a raw GLSL shader object. Useful for implementing custom
 * effects.
 *
 * ```js
 * const fxaaPass = new ShaderPass( FXAAShader );
 * composer.addPass( fxaaPass );
 * ```
 *
 * @augments Pass
 * @three_import import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
 */ class ShaderPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    /**
	 * Constructs a new shader pass.
	 *
	 * @param {Object|ShaderMaterial} [shader] - A shader object holding vertex and fragment shader as well as
	 * defines and uniforms. It's also valid to pass a custom shader material.
	 * @param {string} [textureID='tDiffuse'] - The name of the texture uniform that should sample
	 * the read buffer.
	 */ constructor(shader, textureID = 'tDiffuse'){
        super();
        /**
		 * The name of the texture uniform that should sample the read buffer.
		 *
		 * @type {string}
		 * @default 'tDiffuse'
		 */ this.textureID = textureID;
        /**
		 * The pass uniforms.
		 *
		 * @type {?Object}
		 */ this.uniforms = null;
        /**
		 * The pass material.
		 *
		 * @type {?ShaderMaterial}
		 */ this.material = null;
        if (shader instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]) {
            this.uniforms = shader.uniforms;
            this.material = shader;
        } else if (shader) {
            this.uniforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(shader.uniforms);
            this.material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                name: shader.name !== undefined ? shader.name : 'unspecified',
                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            });
        }
        // internals
        this._fsQuad = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullScreenQuad"](this.material);
    }
    /**
	 * Performs the shader pass.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        if (this.uniforms[this.textureID]) {
            this.uniforms[this.textureID].value = readBuffer.texture;
        }
        this._fsQuad.material = this.material;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this._fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
            if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
            this._fsQuad.render(renderer);
        }
    }
    /**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever the pass is no longer used in your app.
	 */ dispose() {
        this.material.dispose();
        this._fsQuad.dispose();
    }
}
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/MaskPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClearMaskPass",
    ()=>ClearMaskPass,
    "MaskPass",
    ()=>MaskPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/Pass.js [app-client] (ecmascript)");
;
/**
 * This pass can be used to define a mask during post processing.
 * Meaning only areas of subsequent post processing are affected
 * which lie in the masking area of this pass. Internally, the masking
 * is implemented with the stencil buffer.
 *
 * ```js
 * const maskPass = new MaskPass( scene, camera );
 * composer.addPass( maskPass );
 * ```
 *
 * @augments Pass
 * @three_import import { MaskPass } from 'three/addons/postprocessing/MaskPass.js';
 */ class MaskPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    /**
	 * Constructs a new mask pass.
	 *
	 * @param {Scene} scene - The 3D objects in this scene will define the mask.
	 * @param {Camera} camera - The camera.
	 */ constructor(scene, camera){
        super();
        /**
		 * The scene that defines the mask.
		 *
		 * @type {Scene}
		 */ this.scene = scene;
        /**
		 * The camera.
		 *
		 * @type {Camera}
		 */ this.camera = camera;
        /**
		 * Overwritten to perform a clear operation by default.
		 *
		 * @type {boolean}
		 * @default true
		 */ this.clear = true;
        /**
		 * Overwritten to disable the swap.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.needsSwap = false;
        /**
		 * Whether to inverse the mask or not.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.inverse = false;
    }
    /**
	 * Performs a mask pass with the configured scene and camera.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        const context = renderer.getContext();
        const state = renderer.state;
        // don't update color or depth
        state.buffers.color.setMask(false);
        state.buffers.depth.setMask(false);
        // lock buffers
        state.buffers.color.setLocked(true);
        state.buffers.depth.setLocked(true);
        // set up stencil
        let writeValue, clearValue;
        if (this.inverse) {
            writeValue = 0;
            clearValue = 1;
        } else {
            writeValue = 1;
            clearValue = 0;
        }
        state.buffers.stencil.setTest(true);
        state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
        state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
        state.buffers.stencil.setClear(clearValue);
        state.buffers.stencil.setLocked(true);
        // draw into the stencil buffer
        renderer.setRenderTarget(readBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        // unlock color and depth buffer and make them writable for subsequent rendering/clearing
        state.buffers.color.setLocked(false);
        state.buffers.depth.setLocked(false);
        state.buffers.color.setMask(true);
        state.buffers.depth.setMask(true);
        // only render where stencil is set to 1
        state.buffers.stencil.setLocked(false);
        state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1
        state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
        state.buffers.stencil.setLocked(true);
    }
}
/**
 * This pass can be used to clear a mask previously defined with {@link MaskPass}.
 *
 * ```js
 * const clearPass = new ClearMaskPass();
 * composer.addPass( clearPass );
 * ```
 *
 * @augments Pass
 */ class ClearMaskPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    /**
	 * Constructs a new clear mask pass.
	 */ constructor(){
        super();
        /**
		 * Overwritten to disable the swap.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.needsSwap = false;
    }
    /**
	 * Performs the clear of the currently defined mask.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render(renderer /*, writeBuffer, readBuffer, deltaTime, maskActive */ ) {
        renderer.state.buffers.stencil.setLocked(false);
        renderer.state.buffers.stencil.setTest(false);
    }
}
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/EffectComposer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EffectComposer",
    ()=>EffectComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/CopyShader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/ShaderPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/MaskPass.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Used to implement post-processing effects in three.js.
 * The class manages a chain of post-processing passes to produce the final visual result.
 * Post-processing passes are executed in order of their addition/insertion.
 * The last pass is automatically rendered to screen.
 *
 * This module can only be used with {@link WebGLRenderer}.
 *
 * ```js
 * const composer = new EffectComposer( renderer );
 *
 * // adding some passes
 * const renderPass = new RenderPass( scene, camera );
 * composer.addPass( renderPass );
 *
 * const glitchPass = new GlitchPass();
 * composer.addPass( glitchPass );
 *
 * const outputPass = new OutputPass()
 * composer.addPass( outputPass );
 *
 * function animate() {
 *
 * 	composer.render(); // instead of renderer.render()
 *
 * }
 * ```
 *
 * @three_import import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
 */ class EffectComposer {
    /**
	 * Constructs a new effect composer.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} [renderTarget] - This render target and a clone will
	 * be used as the internal read and write buffers. If not given, the composer creates
	 * the buffers automatically.
	 */ constructor(renderer, renderTarget){
        /**
		 * The renderer.
		 *
		 * @type {WebGLRenderer}
		 */ this.renderer = renderer;
        this._pixelRatio = renderer.getPixelRatio();
        if (renderTarget === undefined) {
            const size = renderer.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
            this._width = size.width;
            this._height = size.height;
            renderTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](this._width * this._pixelRatio, this._height * this._pixelRatio, {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]
            });
            renderTarget.texture.name = 'EffectComposer.rt1';
        } else {
            this._width = renderTarget.width;
            this._height = renderTarget.height;
        }
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.renderTarget2.texture.name = 'EffectComposer.rt2';
        /**
		 * A reference to the internal write buffer. Passes usually write
		 * their result into this buffer.
		 *
		 * @type {WebGLRenderTarget}
		 */ this.writeBuffer = this.renderTarget1;
        /**
		 * A reference to the internal read buffer. Passes usually read
		 * the previous render result from this buffer.
		 *
		 * @type {WebGLRenderTarget}
		 */ this.readBuffer = this.renderTarget2;
        /**
		 * Whether the final pass is rendered to the screen (default framebuffer) or not.
		 *
		 * @type {boolean}
		 * @default true
		 */ this.renderToScreen = true;
        /**
		 * An array representing the (ordered) chain of post-processing passes.
		 *
		 * @type {Array<Pass>}
		 */ this.passes = [];
        /**
		 * A copy pass used for internal swap operations.
		 *
		 * @private
		 * @type {ShaderPass}
		 */ this.copyPass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"]);
        this.copyPass.material.blending = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoBlending"];
        /**
		 * The internal clock for managing time data.
		 *
		 * @private
		 * @type {Clock}
		 */ this.clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
    }
    /**
	 * Swaps the internal read/write buffers.
	 */ swapBuffers() {
        const tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
    }
    /**
	 * Adds the given pass to the pass chain.
	 *
	 * @param {Pass} pass - The pass to add.
	 */ addPass(pass) {
        this.passes.push(pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    /**
	 * Inserts the given pass at a given index.
	 *
	 * @param {Pass} pass - The pass to insert.
	 * @param {number} index - The index into the pass chain.
	 */ insertPass(pass, index) {
        this.passes.splice(index, 0, pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    /**
	 * Removes the given pass from the pass chain.
	 *
	 * @param {Pass} pass - The pass to remove.
	 */ removePass(pass) {
        const index = this.passes.indexOf(pass);
        if (index !== -1) {
            this.passes.splice(index, 1);
        }
    }
    /**
	 * Returns `true` if the pass for the given index is the last enabled pass in the pass chain.
	 *
	 * @param {number} passIndex - The pass index.
	 * @return {boolean} Whether the pass for the given index is the last pass in the pass chain.
	 */ isLastEnabledPass(passIndex) {
        for(let i = passIndex + 1; i < this.passes.length; i++){
            if (this.passes[i].enabled) {
                return false;
            }
        }
        return true;
    }
    /**
	 * Executes all enabled post-processing passes in order to produce the final frame.
	 *
	 * @param {number} deltaTime - The delta time in seconds. If not given, the composer computes
	 * its own time delta value.
	 */ render(deltaTime) {
        // deltaTime value is in seconds
        if (deltaTime === undefined) {
            deltaTime = this.clock.getDelta();
        }
        const currentRenderTarget = this.renderer.getRenderTarget();
        let maskActive = false;
        for(let i = 0, il = this.passes.length; i < il; i++){
            const pass = this.passes[i];
            if (pass.enabled === false) continue;
            pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
            pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
            if (pass.needsSwap) {
                if (maskActive) {
                    const context = this.renderer.getContext();
                    const stencil = this.renderer.state.buffers.stencil;
                    //context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
                    stencil.setFunc(context.NOTEQUAL, 1, 0xffffffff);
                    this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
                    //context.stencilFunc( context.EQUAL, 1, 0xffffffff );
                    stencil.setFunc(context.EQUAL, 1, 0xffffffff);
                }
                this.swapBuffers();
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaskPass"] !== undefined) {
                if (pass instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaskPass"]) {
                    maskActive = true;
                } else if (pass instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClearMaskPass"]) {
                    maskActive = false;
                }
            }
        }
        this.renderer.setRenderTarget(currentRenderTarget);
    }
    /**
	 * Resets the internal state of the EffectComposer.
	 *
	 * @param {WebGLRenderTarget} [renderTarget] - This render target has the same purpose like
	 * the one from the constructor. If set, it is used to setup the read and write buffers.
	 */ reset(renderTarget) {
        if (renderTarget === undefined) {
            const size = this.renderer.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
            this._pixelRatio = this.renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = this.renderTarget1.clone();
            renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
    }
    /**
	 * Resizes the internal read and write buffers as well as all passes. Similar to {@link WebGLRenderer#setSize},
	 * this method honors the current pixel ration.
	 *
	 * @param {number} width - The width in logical pixels.
	 * @param {number} height - The height in logical pixels.
	 */ setSize(width, height) {
        this._width = width;
        this._height = height;
        const effectiveWidth = this._width * this._pixelRatio;
        const effectiveHeight = this._height * this._pixelRatio;
        this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
        this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
        for(let i = 0; i < this.passes.length; i++){
            this.passes[i].setSize(effectiveWidth, effectiveHeight);
        }
    }
    /**
	 * Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
	 * Setting the pixel ratio will automatically resize the composer.
	 *
	 * @param {number} pixelRatio - The pixel ratio to set.
	 */ setPixelRatio(pixelRatio) {
        this._pixelRatio = pixelRatio;
        this.setSize(this._width, this._height);
    }
    /**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever the composer is no longer used in your app.
	 */ dispose() {
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.copyPass.dispose();
    }
}
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/RenderPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenderPass",
    ()=>RenderPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/Pass.js [app-client] (ecmascript)");
;
;
/**
 * This class represents a render pass. It takes a camera and a scene and produces
 * a beauty pass for subsequent post processing effects.
 *
 * ```js
 * const renderPass = new RenderPass( scene, camera );
 * composer.addPass( renderPass );
 * ```
 *
 * @augments Pass
 * @three_import import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
 */ class RenderPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    /**
	 * Constructs a new render pass.
	 *
	 * @param {Scene} scene - The scene to render.
	 * @param {Camera} camera - The camera.
	 * @param {?Material} [overrideMaterial=null] - The override material. If set, this material is used
	 * for all objects in the scene.
	 * @param {?(number|Color|string)} [clearColor=null] - The clear color of the render pass.
	 * @param {?number} [clearAlpha=null] - The clear alpha of the render pass.
	 */ constructor(scene, camera, overrideMaterial = null, clearColor = null, clearAlpha = null){
        super();
        /**
		 * The scene to render.
		 *
		 * @type {Scene}
		 */ this.scene = scene;
        /**
		 * The camera.
		 *
		 * @type {Camera}
		 */ this.camera = camera;
        /**
		 * The override material. If set, this material is used
		 * for all objects in the scene.
		 *
		 * @type {?Material}
		 * @default null
		 */ this.overrideMaterial = overrideMaterial;
        /**
		 * The clear color of the render pass.
		 *
		 * @type {?(number|Color|string)}
		 * @default null
		 */ this.clearColor = clearColor;
        /**
		 * The clear alpha of the render pass.
		 *
		 * @type {?number}
		 * @default null
		 */ this.clearAlpha = clearAlpha;
        /**
		 * Overwritten to perform a clear operation by default.
		 *
		 * @type {boolean}
		 * @default true
		 */ this.clear = true;
        /**
		 * If set to `true`, only the depth can be cleared when `clear` is to `false`.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.clearDepth = false;
        /**
		 * Overwritten to disable the swap.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.needsSwap = false;
        /**
		 * This flag indicates that this pass renders the scene itself.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isRenderPass = true;
        this._oldClearColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
    }
    /**
	 * Performs a beauty pass with the configured scene and camera.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        const oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        let oldClearAlpha, oldOverrideMaterial;
        if (this.overrideMaterial !== null) {
            oldOverrideMaterial = this.scene.overrideMaterial;
            this.scene.overrideMaterial = this.overrideMaterial;
        }
        if (this.clearColor !== null) {
            renderer.getClearColor(this._oldClearColor);
            renderer.setClearColor(this.clearColor, renderer.getClearAlpha());
        }
        if (this.clearAlpha !== null) {
            oldClearAlpha = renderer.getClearAlpha();
            renderer.setClearAlpha(this.clearAlpha);
        }
        if (this.clearDepth == true) {
            renderer.clearDepth();
        }
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        if (this.clear === true) {
            // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
            renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        }
        renderer.render(this.scene, this.camera);
        // restore
        if (this.clearColor !== null) {
            renderer.setClearColor(this._oldClearColor);
        }
        if (this.clearAlpha !== null) {
            renderer.setClearAlpha(oldClearAlpha);
        }
        if (this.overrideMaterial !== null) {
            this.scene.overrideMaterial = oldOverrideMaterial;
        }
        renderer.autoClear = oldAutoClear;
    }
}
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LuminosityHighPassShader",
    ()=>LuminosityHighPassShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
/**
 * @module LuminosityHighPassShader
 * @three_import import { LuminosityHighPassShader } from 'three/addons/shaders/LuminosityHighPassShader.js';
 */ /**
 * Luminosity high pass shader.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */ const LuminosityHighPassShader = {
    name: 'LuminosityHighPassShader',
    uniforms: {
        'tDiffuse': {
            value: null
        },
        'luminosityThreshold': {
            value: 1.0
        },
        'smoothWidth': {
            value: 1.0
        },
        'defaultColor': {
            value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x000000)
        },
        'defaultOpacity': {
            value: 0.0
        }
    },
    vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: /* glsl */ `

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

		}`
};
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnrealBloomPass",
    ()=>UnrealBloomPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/Pass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/CopyShader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$LuminosityHighPassShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js [app-client] (ecmascript)");
;
;
;
;
/**
 * This pass is inspired by the bloom pass of Unreal Engine. It creates a
 * mip map chain of bloom textures and blurs them with different radii. Because
 * of the weighted combination of mips, and because larger blurs are done on
 * higher mips, this effect provides good quality and performance.
 *
 * When using this pass, tone mapping must be enabled in the renderer settings.
 *
 * Reference:
 * - [Bloom in Unreal Engine](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/)
 *
 * ```js
 * const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
 * const bloomPass = new UnrealBloomPass( resolution, 1.5, 0.4, 0.85 );
 * composer.addPass( bloomPass );
 * ```
 *
 * @augments Pass
 * @three_import import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
 */ class UnrealBloomPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    /**
	 * Constructs a new Unreal Bloom pass.
	 *
	 * @param {Vector2} [resolution] - The effect's resolution.
	 * @param {number} [strength=1] - The Bloom strength.
	 * @param {number} radius - The Bloom radius.
	 * @param {number} threshold - The luminance threshold limits which bright areas contribute to the Bloom effect.
	 */ constructor(resolution, strength = 1, radius, threshold){
        super();
        /**
		 * The Bloom strength.
		 *
		 * @type {number}
		 * @default 1
		 */ this.strength = strength;
        /**
		 * The Bloom radius. Must be in the range `[0,1]`.
		 *
		 * @type {number}
		 */ this.radius = radius;
        /**
		 * The luminance threshold limits which bright areas contribute to the Bloom effect.
		 *
		 * @type {number}
		 */ this.threshold = threshold;
        /**
		 * The effect's resolution.
		 *
		 * @type {Vector2}
		 * @default (256,256)
		 */ this.resolution = resolution !== undefined ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](resolution.x, resolution.y) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](256, 256);
        /**
		 * The effect's clear color
		 *
		 * @type {Color}
		 * @default (0,0,0)
		 */ this.clearColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0, 0, 0);
        /**
		 * Overwritten to disable the swap.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.needsSwap = false;
        // internals
        // render targets
        this.renderTargetsHorizontal = [];
        this.renderTargetsVertical = [];
        this.nMips = 5;
        let resx = Math.round(this.resolution.x / 2);
        let resy = Math.round(this.resolution.y / 2);
        this.renderTargetBright = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](resx, resy, {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]
        });
        this.renderTargetBright.texture.name = 'UnrealBloomPass.bright';
        this.renderTargetBright.texture.generateMipmaps = false;
        for(let i = 0; i < this.nMips; i++){
            const renderTargetHorizontal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](resx, resy, {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]
            });
            renderTargetHorizontal.texture.name = 'UnrealBloomPass.h' + i;
            renderTargetHorizontal.texture.generateMipmaps = false;
            this.renderTargetsHorizontal.push(renderTargetHorizontal);
            const renderTargetVertical = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](resx, resy, {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]
            });
            renderTargetVertical.texture.name = 'UnrealBloomPass.v' + i;
            renderTargetVertical.texture.generateMipmaps = false;
            this.renderTargetsVertical.push(renderTargetVertical);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
        // luminosity high pass material
        const highPassShader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$LuminosityHighPassShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LuminosityHighPassShader"];
        this.highPassUniforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(highPassShader.uniforms);
        this.highPassUniforms['luminosityThreshold'].value = threshold;
        this.highPassUniforms['smoothWidth'].value = 0.01;
        this.materialHighPassFilter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            uniforms: this.highPassUniforms,
            vertexShader: highPassShader.vertexShader,
            fragmentShader: highPassShader.fragmentShader
        });
        // gaussian blur materials
        this.separableBlurMaterials = [];
        // These sizes have been changed to account for the altered coefficients-calculation to avoid blockiness,
        // while retaining the same blur-strength. For details see https://github.com/mrdoob/three.js/pull/31528
        const kernelSizeArray = [
            6,
            10,
            14,
            18,
            22
        ];
        resx = Math.round(this.resolution.x / 2);
        resy = Math.round(this.resolution.y / 2);
        for(let i = 0; i < this.nMips; i++){
            this.separableBlurMaterials.push(this._getSeparableBlurMaterial(kernelSizeArray[i]));
            this.separableBlurMaterials[i].uniforms['invSize'].value = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1 / resx, 1 / resy);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
        // composite material
        this.compositeMaterial = this._getCompositeMaterial(this.nMips);
        this.compositeMaterial.uniforms['blurTexture1'].value = this.renderTargetsVertical[0].texture;
        this.compositeMaterial.uniforms['blurTexture2'].value = this.renderTargetsVertical[1].texture;
        this.compositeMaterial.uniforms['blurTexture3'].value = this.renderTargetsVertical[2].texture;
        this.compositeMaterial.uniforms['blurTexture4'].value = this.renderTargetsVertical[3].texture;
        this.compositeMaterial.uniforms['blurTexture5'].value = this.renderTargetsVertical[4].texture;
        this.compositeMaterial.uniforms['bloomStrength'].value = strength;
        this.compositeMaterial.uniforms['bloomRadius'].value = 0.1;
        const bloomFactors = [
            1.0,
            0.8,
            0.6,
            0.4,
            0.2
        ];
        this.compositeMaterial.uniforms['bloomFactors'].value = bloomFactors;
        this.bloomTintColors = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1)
        ];
        this.compositeMaterial.uniforms['bloomTintColors'].value = this.bloomTintColors;
        // blend material
        this.copyUniforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"].uniforms);
        this.blendMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            uniforms: this.copyUniforms,
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"].vertexShader,
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"].fragmentShader,
            premultipliedAlpha: true,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthTest: false,
            depthWrite: false,
            transparent: true
        });
        this._oldClearColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]();
        this._oldClearAlpha = 1;
        this._basic = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]();
        this._fsQuad = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullScreenQuad"](null);
    }
    /**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever the pass is no longer used in your app.
	 */ dispose() {
        for(let i = 0; i < this.renderTargetsHorizontal.length; i++){
            this.renderTargetsHorizontal[i].dispose();
        }
        for(let i = 0; i < this.renderTargetsVertical.length; i++){
            this.renderTargetsVertical[i].dispose();
        }
        this.renderTargetBright.dispose();
        //
        for(let i = 0; i < this.separableBlurMaterials.length; i++){
            this.separableBlurMaterials[i].dispose();
        }
        this.compositeMaterial.dispose();
        this.blendMaterial.dispose();
        this._basic.dispose();
        //
        this._fsQuad.dispose();
    }
    /**
	 * Sets the size of the pass.
	 *
	 * @param {number} width - The width to set.
	 * @param {number} height - The height to set.
	 */ setSize(width, height) {
        let resx = Math.round(width / 2);
        let resy = Math.round(height / 2);
        this.renderTargetBright.setSize(resx, resy);
        for(let i = 0; i < this.nMips; i++){
            this.renderTargetsHorizontal[i].setSize(resx, resy);
            this.renderTargetsVertical[i].setSize(resx, resy);
            this.separableBlurMaterials[i].uniforms['invSize'].value = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1 / resx, 1 / resy);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
    }
    /**
	 * Performs the Bloom pass.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        renderer.getClearColor(this._oldClearColor);
        this._oldClearAlpha = renderer.getClearAlpha();
        const oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        renderer.setClearColor(this.clearColor, 0);
        if (maskActive) renderer.state.buffers.stencil.setTest(false);
        // Render input to screen
        if (this.renderToScreen) {
            this._fsQuad.material = this._basic;
            this._basic.map = readBuffer.texture;
            renderer.setRenderTarget(null);
            renderer.clear();
            this._fsQuad.render(renderer);
        }
        // 1. Extract Bright Areas
        this.highPassUniforms['tDiffuse'].value = readBuffer.texture;
        this.highPassUniforms['luminosityThreshold'].value = this.threshold;
        this._fsQuad.material = this.materialHighPassFilter;
        renderer.setRenderTarget(this.renderTargetBright);
        renderer.clear();
        this._fsQuad.render(renderer);
        // 2. Blur All the mips progressively
        let inputRenderTarget = this.renderTargetBright;
        for(let i = 0; i < this.nMips; i++){
            this._fsQuad.material = this.separableBlurMaterials[i];
            this.separableBlurMaterials[i].uniforms['colorTexture'].value = inputRenderTarget.texture;
            this.separableBlurMaterials[i].uniforms['direction'].value = UnrealBloomPass.BlurDirectionX;
            renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
            renderer.clear();
            this._fsQuad.render(renderer);
            this.separableBlurMaterials[i].uniforms['colorTexture'].value = this.renderTargetsHorizontal[i].texture;
            this.separableBlurMaterials[i].uniforms['direction'].value = UnrealBloomPass.BlurDirectionY;
            renderer.setRenderTarget(this.renderTargetsVertical[i]);
            renderer.clear();
            this._fsQuad.render(renderer);
            inputRenderTarget = this.renderTargetsVertical[i];
        }
        // Composite All the mips
        this._fsQuad.material = this.compositeMaterial;
        this.compositeMaterial.uniforms['bloomStrength'].value = this.strength;
        this.compositeMaterial.uniforms['bloomRadius'].value = this.radius;
        this.compositeMaterial.uniforms['bloomTintColors'].value = this.bloomTintColors;
        renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
        renderer.clear();
        this._fsQuad.render(renderer);
        // Blend it additively over the input texture
        this._fsQuad.material = this.blendMaterial;
        this.copyUniforms['tDiffuse'].value = this.renderTargetsHorizontal[0].texture;
        if (maskActive) renderer.state.buffers.stencil.setTest(true);
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this._fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(readBuffer);
            this._fsQuad.render(renderer);
        }
        // Restore renderer settings
        renderer.setClearColor(this._oldClearColor, this._oldClearAlpha);
        renderer.autoClear = oldAutoClear;
    }
    // internals
    _getSeparableBlurMaterial(kernelRadius) {
        const coefficients = [];
        const sigma = kernelRadius / 3;
        for(let i = 0; i < kernelRadius; i++){
            coefficients.push(0.39894 * Math.exp(-0.5 * i * i / (sigma * sigma)) / sigma);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            defines: {
                'KERNEL_RADIUS': kernelRadius
            },
            uniforms: {
                'colorTexture': {
                    value: null
                },
                'invSize': {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.5, 0.5)
                },
                'direction': {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.5, 0.5)
                },
                'gaussianCoefficients': {
                    value: coefficients
                } // precomputed Gaussian coefficients
            },
            vertexShader: /* glsl */ `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
            fragmentShader: /* glsl */ `

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

				}`
        });
    }
    _getCompositeMaterial(nMips) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            defines: {
                'NUM_MIPS': nMips
            },
            uniforms: {
                'blurTexture1': {
                    value: null
                },
                'blurTexture2': {
                    value: null
                },
                'blurTexture3': {
                    value: null
                },
                'blurTexture4': {
                    value: null
                },
                'blurTexture5': {
                    value: null
                },
                'bloomStrength': {
                    value: 1.0
                },
                'bloomFactors': {
                    value: null
                },
                'bloomTintColors': {
                    value: null
                },
                'bloomRadius': {
                    value: 0.0
                }
            },
            vertexShader: /* glsl */ `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
            fragmentShader: /* glsl */ `

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

				}`
        });
    }
}
UnrealBloomPass.BlurDirectionX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1.0, 0.0);
UnrealBloomPass.BlurDirectionY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.0, 1.0);
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/OutputShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OutputShader",
    ()=>OutputShader
]);
/**
 * @module OutputShader
 * @three_import import { OutputShader } from 'three/addons/shaders/OutputShader.js';
 */ /**
 * Performs tone mapping and color space conversion for
 * FX workflows.
 *
 * Used by {@link OutputPass}.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */ const OutputShader = {
    name: 'OutputShader',
    uniforms: {
        'tDiffuse': {
            value: null
        },
        'toneMappingExposure': {
            value: 1
        }
    },
    vertexShader: /* glsl */ `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: /* glsl */ `

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

		}`
};
;
}),
"[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/OutputPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OutputPass",
    ()=>OutputPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/postprocessing/Pass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$OutputShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/shaders/OutputShader.js [app-client] (ecmascript)");
;
;
;
/**
 * This pass is responsible for including tone mapping and color space conversion
 * into your pass chain. In most cases, this pass should be included at the end
 * of each pass chain. If a pass requires sRGB input (e.g. like FXAA), the pass
 * must follow `OutputPass` in the pass chain.
 *
 * The tone mapping and color space settings are extracted from the renderer.
 *
 * ```js
 * const outputPass = new OutputPass();
 * composer.addPass( outputPass );
 * ```
 *
 * @augments Pass
 * @three_import import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
 */ class OutputPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    /**
	 * Constructs a new output pass.
	 */ constructor(){
        super();
        /**
		 * This flag indicates that this is an output pass.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isOutputPass = true;
        /**
		 * The pass uniforms.
		 *
		 * @type {Object}
		 */ this.uniforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$OutputShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutputShader"].uniforms);
        /**
		 * The pass material.
		 *
		 * @type {RawShaderMaterial}
		 */ this.material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RawShaderMaterial"]({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$OutputShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutputShader"].name,
            uniforms: this.uniforms,
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$OutputShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutputShader"].vertexShader,
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$shaders$2f$OutputShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutputShader"].fragmentShader
        });
        // internals
        this._fsQuad = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullScreenQuad"](this.material);
        this._outputColorSpace = null;
        this._toneMapping = null;
    }
    /**
	 * Performs the output pass.
	 *
	 * @param {WebGLRenderer} renderer - The renderer.
	 * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	 * destination for the pass.
	 * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	 * previous pass from this buffer.
	 * @param {number} deltaTime - The delta time in seconds.
	 * @param {boolean} maskActive - Whether masking is active or not.
	 */ render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        this.uniforms['tDiffuse'].value = readBuffer.texture;
        this.uniforms['toneMappingExposure'].value = renderer.toneMappingExposure;
        // rebuild defines if required
        if (this._outputColorSpace !== renderer.outputColorSpace || this._toneMapping !== renderer.toneMapping) {
            this._outputColorSpace = renderer.outputColorSpace;
            this._toneMapping = renderer.toneMapping;
            this.material.defines = {};
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorManagement"].getTransfer(this._outputColorSpace) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBTransfer"]) this.material.defines.SRGB_TRANSFER = '';
            if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearToneMapping"]) this.material.defines.LINEAR_TONE_MAPPING = '';
            else if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReinhardToneMapping"]) this.material.defines.REINHARD_TONE_MAPPING = '';
            else if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CineonToneMapping"]) this.material.defines.CINEON_TONE_MAPPING = '';
            else if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"]) this.material.defines.ACES_FILMIC_TONE_MAPPING = '';
            else if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgXToneMapping"]) this.material.defines.AGX_TONE_MAPPING = '';
            else if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NeutralToneMapping"]) this.material.defines.NEUTRAL_TONE_MAPPING = '';
            else if (this._toneMapping === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomToneMapping"]) this.material.defines.CUSTOM_TONE_MAPPING = '';
            this.material.needsUpdate = true;
        }
        //
        if (this.renderToScreen === true) {
            renderer.setRenderTarget(null);
            this._fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
            this._fsQuad.render(renderer);
        }
    }
    /**
	 * Frees the GPU-related resources allocated by this instance. Call this
	 * method whenever the pass is no longer used in your app.
	 */ dispose() {
        this.material.dispose();
        this._fsQuad.dispose();
    }
}
;
}),
]);

//# sourceMappingURL=b8468_three_examples_jsm_0f901013._.js.map