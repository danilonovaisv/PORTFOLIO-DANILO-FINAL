import * as THREE from 'three';
import { Common } from '@/lib/webgl/liquid-ether/common';
import { Mouse } from '@/lib/webgl/liquid-ether/mouse';
import * as shaders from '@/lib/webgl/liquid-ether/shaders';
import { ShaderPassProps } from '@/lib/webgl/liquid-ether/types';

export class ShaderPass {
  props: ShaderPassProps;
  uniforms?: Record<string, THREE.IUniform>;
  scene: THREE.Scene | null = null;
  camera: THREE.Camera | null = null;
  material: THREE.RawShaderMaterial | null = null;
  geometry: THREE.BufferGeometry | null = null;
  plane: THREE.Mesh | null = null;

  constructor(props: ShaderPassProps) {
    this.props = props || {};
    this.uniforms = this.props.material?.uniforms as
      | Record<string, THREE.IUniform>
      | undefined;
  }

  init(..._args: any[]) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    if (this.props.material) {
      this.material = new THREE.RawShaderMaterial(this.props.material);
      this.geometry = new THREE.PlaneGeometry(2, 2);
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
    }
  }

  update() {
    if (!Common.renderer || !this.scene || !this.camera) return;
    Common.renderer.setRenderTarget(this.props.output || null);
    Common.renderer.render(this.scene, this.camera);
    Common.renderer.setRenderTarget(null);
  }

  dispose() {
    this.geometry?.dispose();
    this.material?.dispose();
    this.scene = null;
    this.camera = null;
  }
}

export class Advection extends ShaderPass {
  line!: THREE.LineSegments;

  constructor(simProps: any) {
    super({
      material: {
        vertexShader: shaders.face_vert,
        fragmentShader: shaders.advection_frag,
        uniforms: {
          boundarySpace: { value: simProps.cellScale },
          px: { value: simProps.cellScale },
          fboSize: { value: simProps.fboSize },
          velocity: { value: simProps.src.texture },
          dt: { value: simProps.dt },
          isBFECC: { value: true },
        },
      },
      output: simProps.dst,
    });
    this.init();
  }

  init() {
    super.init();
    this.createBoundary();
  }

  createBoundary() {
    const boundaryG = new THREE.BufferGeometry();
    const vertices_boundary = new Float32Array([
      -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1,
      -1, 0,
    ]);
    boundaryG.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices_boundary, 3)
    );
    const boundaryM = new THREE.RawShaderMaterial({
      vertexShader: shaders.line_vert,
      fragmentShader: shaders.advection_frag,
      uniforms: this.uniforms!,
    });
    this.line = new THREE.LineSegments(boundaryG, boundaryM);
    this.scene!.add(this.line);
  }

  update(params: { dt?: number; isBounce?: boolean; BFECC?: boolean } = {}) {
    if (!this.uniforms) return;
    if (typeof params.dt === 'number') this.uniforms.dt.value = params.dt;
    if (typeof params.isBounce === 'boolean')
      this.line.visible = params.isBounce;
    if (typeof params.BFECC === 'boolean')
      this.uniforms.isBFECC.value = params.BFECC;
    super.update();
  }
}

export class ExternalForce extends ShaderPass {
  mouse!: THREE.Mesh;

  constructor(simProps: any) {
    super({ output: simProps.dst });
    this.init(simProps);
  }

  init(simProps: any) {
    super.init();
    const mouseG = new THREE.PlaneGeometry(1, 1);
    const mouseM = new THREE.RawShaderMaterial({
      vertexShader: shaders.mouse_vert,
      fragmentShader: shaders.externalForce_frag,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        px: { value: simProps.cellScale },
        force: { value: new THREE.Vector2(0, 0) },
        center: { value: new THREE.Vector2(0, 0) },
        scale: {
          value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size),
        },
      },
    });
    this.mouse = new THREE.Mesh(mouseG, mouseM);
    this.scene!.add(this.mouse);
  }

  update(
    props: {
      mouse_force?: number;
      cellScale?: THREE.Vector2;
      cursor_size?: number;
    } = {}
  ) {
    const forceX = (Mouse.diff.x / 2) * (props.mouse_force || 0);
    const forceY = (Mouse.diff.y / 2) * (props.mouse_force || 0);
    const cellScale = props.cellScale || new THREE.Vector2(1, 1);
    const cursorSize = props.cursor_size || 0;
    const cursorSizeX = cursorSize * cellScale.x;
    const cursorSizeY = cursorSize * cellScale.y;

    const centerX = Math.min(
      Math.max(Mouse.coords.x, -1 + cursorSizeX + cellScale.x * 2),
      1 - cursorSizeX - cellScale.x * 2
    );
    const centerY = Math.min(
      Math.max(Mouse.coords.y, -1 + cursorSizeY + cellScale.y * 2),
      1 - cursorSizeY - cellScale.y * 2
    );

    const uniforms = (this.mouse.material as THREE.RawShaderMaterial).uniforms;
    uniforms.force.value.set(forceX, forceY);
    uniforms.center.value.set(centerX, centerY);
    uniforms.scale.value.set(cursorSize, cursorSize);
    super.update();
  }
}

export class Viscous extends ShaderPass {
  constructor(simProps: any) {
    super({
      material: {
        vertexShader: shaders.face_vert,
        fragmentShader: shaders.viscous_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          velocity: { value: simProps.src.texture },
          velocity_new: { value: simProps.dst_.texture },
          v: { value: simProps.viscous },
          px: { value: simProps.cellScale },
          dt: { value: simProps.dt },
        },
      },
      output: simProps.dst,
      output0: simProps.dst_,
      output1: simProps.dst,
    });
    this.init();
  }

  update(params: { viscous?: number; iterations?: number; dt?: number } = {}) {
    if (!this.uniforms) return;
    let fbo_in: THREE.WebGLRenderTarget, fbo_out: THREE.WebGLRenderTarget;
    if (typeof params.viscous === 'number')
      this.uniforms.v.value = params.viscous;
    const iter = params.iterations ?? 0;

    fbo_out = this.props.output1 as THREE.WebGLRenderTarget;

    for (let i = 0; i < iter; i++) {
      if (i % 2 === 0) {
        fbo_in = this.props.output0 as THREE.WebGLRenderTarget;
        fbo_out = this.props.output1 as THREE.WebGLRenderTarget;
      } else {
        fbo_in = this.props.output1 as THREE.WebGLRenderTarget;
        fbo_out = this.props.output0 as THREE.WebGLRenderTarget;
      }
      this.uniforms.velocity_new.value = fbo_in.texture;
      this.props.output = fbo_out;
      if (typeof params.dt === 'number') this.uniforms.dt.value = params.dt;
      super.update();
    }
    return fbo_out;
  }
}

export class Divergence extends ShaderPass {
  constructor(simProps: any) {
    super({
      material: {
        vertexShader: shaders.face_vert,
        fragmentShader: shaders.divergence_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          velocity: { value: simProps.src.texture },
          px: { value: simProps.cellScale },
          dt: { value: simProps.dt },
        },
      },
      output: simProps.dst,
    });
    this.init();
  }

  update(params: { vel?: THREE.WebGLRenderTarget } = {}) {
    if (this.uniforms && params.vel) {
      this.uniforms.velocity.value = params.vel.texture;
    }
    super.update();
  }
}

export class Poisson extends ShaderPass {
  constructor(simProps: any) {
    super({
      material: {
        vertexShader: shaders.face_vert,
        fragmentShader: shaders.poisson_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          pressure: { value: simProps.dst_.texture },
          divergence: { value: simProps.src.texture },
          px: { value: simProps.cellScale },
        },
      },
      output: simProps.dst,
      output0: simProps.dst_,
      output1: simProps.dst,
    });
    this.init();
  }

  update(params: { iterations?: number } = {}) {
    let p_in: THREE.WebGLRenderTarget, p_out: THREE.WebGLRenderTarget;
    const iter = params.iterations ?? 0;

    p_out = this.props.output1 as THREE.WebGLRenderTarget;

    for (let i = 0; i < iter; i++) {
      if (i % 2 === 0) {
        p_in = this.props.output0 as THREE.WebGLRenderTarget;
        p_out = this.props.output1 as THREE.WebGLRenderTarget;
      } else {
        p_in = this.props.output1 as THREE.WebGLRenderTarget;
        p_out = this.props.output0 as THREE.WebGLRenderTarget;
      }
      if (this.uniforms) this.uniforms.pressure.value = p_in.texture;
      this.props.output = p_out;
      super.update();
    }
    return p_out;
  }
}

export class Pressure extends ShaderPass {
  constructor(simProps: any) {
    super({
      material: {
        vertexShader: shaders.face_vert,
        fragmentShader: shaders.pressure_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          pressure: { value: simProps.src_p.texture },
          velocity: { value: simProps.src_v.texture },
          px: { value: simProps.cellScale },
          dt: { value: simProps.dt },
        },
      },
      output: simProps.dst,
    });
    this.init();
  }

  update(
    params: {
      vel?: THREE.WebGLRenderTarget;
      pressure?: THREE.WebGLRenderTarget;
    } = {}
  ) {
    if (this.uniforms && params.vel && params.pressure) {
      this.uniforms.velocity.value = params.vel.texture;
      this.uniforms.pressure.value = params.pressure.texture;
    }
    super.update();
  }
}
