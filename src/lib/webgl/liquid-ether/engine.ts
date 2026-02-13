import * as THREE from 'three';
import { Common } from './common';
import { Mouse } from './mouse';
import * as shaders from './shaders';
import { SimOptions, AutoDriverOptions } from './types';
import {
  Advection,
  ExternalForce,
  Viscous,
  Divergence,
  Poisson,
  Pressure,
} from './passes';

export class Simulation {
  options: SimOptions;
  fbos: Record<string, THREE.WebGLRenderTarget> = {};
  fboSize = new THREE.Vector2();
  cellScale = new THREE.Vector2();
  boundarySpace = new THREE.Vector2();

  advection!: Advection;
  externalForce!: ExternalForce;
  viscous!: Viscous;
  divergence!: Divergence;
  poisson!: Poisson;
  pressure!: Pressure;

  constructor(options?: Partial<SimOptions>) {
    this.options = {
      iterations_poisson: 32,
      iterations_viscous: 32,
      mouse_force: 20,
      resolution: 0.5,
      cursor_size: 100,
      viscous: 30,
      isBounce: false,
      dt: 0.014,
      isViscous: false,
      BFECC: true,
      ...options,
    };
    this.init();
  }

  init() {
    this.calcSize();
    this.createAllFBO();
    this.createShaderPass();
  }

  private getFloatType() {
    const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
    return isIOS ? THREE.HalfFloatType : THREE.FloatType;
  }

  createAllFBO() {
    const type = this.getFloatType();
    const opts = {
      type,
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    } as const;

    const fboKeys = [
      'vel_0',
      'vel_1',
      'vel_viscous0',
      'vel_viscous1',
      'div',
      'pressure_0',
      'pressure_1',
    ];

    for (const key of fboKeys) {
      this.fbos[key] = new THREE.WebGLRenderTarget(
        this.fboSize.x,
        this.fboSize.y,
        opts
      );
    }
  }

  createShaderPass() {
    this.advection = new Advection({
      cellScale: this.cellScale,
      fboSize: this.fboSize,
      dt: this.options.dt,
      src: this.fbos.vel_0,
      dst: this.fbos.vel_1,
    });
    this.externalForce = new ExternalForce({
      cellScale: this.cellScale,
      cursor_size: this.options.cursor_size,
      dst: this.fbos.vel_1,
    });
    this.viscous = new Viscous({
      cellScale: this.cellScale,
      boundarySpace: this.boundarySpace,
      viscous: this.options.viscous,
      src: this.fbos.vel_1,
      dst: this.fbos.vel_viscous1,
      dst_: this.fbos.vel_viscous0,
      dt: this.options.dt,
    });
    this.divergence = new Divergence({
      cellScale: this.cellScale,
      boundarySpace: this.boundarySpace,
      src: this.fbos.vel_viscous0,
      dst: this.fbos.div,
      dt: this.options.dt,
    });
    this.poisson = new Poisson({
      cellScale: this.cellScale,
      boundarySpace: this.boundarySpace,
      src: this.fbos.div,
      dst: this.fbos.pressure_1,
      dst_: this.fbos.pressure_0,
    });
    this.pressure = new Pressure({
      cellScale: this.cellScale,
      boundarySpace: this.boundarySpace,
      src_p: this.fbos.pressure_0,
      src_v: this.fbos.vel_viscous0,
      dst: this.fbos.vel_0,
      dt: this.options.dt,
    });
  }

  calcSize() {
    const width = Math.max(
      1,
      Math.round(this.options.resolution * Common.width)
    );
    const height = Math.max(
      1,
      Math.round(this.options.resolution * Common.height)
    );
    this.cellScale.set(1 / width, 1 / height);
    this.fboSize.set(width, height);
  }

  resize() {
    this.calcSize();
    for (const key in this.fbos) {
      this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
    }
  }

  update() {
    if (this.options.isBounce) this.boundarySpace.set(0, 0);
    else this.boundarySpace.copy(this.cellScale);

    this.advection.update({
      dt: this.options.dt,
      isBounce: this.options.isBounce,
      BFECC: this.options.BFECC,
    });
    this.externalForce.update({
      cursor_size: this.options.cursor_size,
      mouse_force: this.options.mouse_force,
      cellScale: this.cellScale,
    });

    let vel: THREE.WebGLRenderTarget = this.fbos.vel_1;
    if (this.options.isViscous) {
      const result = this.viscous.update({
        viscous: this.options.viscous,
        iterations: this.options.iterations_viscous,
        dt: this.options.dt,
      });
      if (result) vel = result;
    }

    this.divergence.update({ vel });
    const pressure = this.poisson.update({
      iterations: this.options.iterations_poisson,
    });
    this.pressure.update({ vel, pressure });
  }
}

export class AutoDriver {
  mouse: typeof Mouse;
  manager: WebGLManager;
  enabled: boolean;
  speed: number;
  resumeDelay: number;
  rampDurationMs: number;
  active = false;
  current = new THREE.Vector2(0, 0);
  target = new THREE.Vector2();
  lastTime = performance.now();
  activationTime = 0;
  margin = 0.2;
  private _tmpDir = new THREE.Vector2();

  constructor(
    mouse: typeof Mouse,
    manager: WebGLManager,
    opts: AutoDriverOptions
  ) {
    this.mouse = mouse;
    this.manager = manager;
    this.enabled = opts.enabled;
    this.speed = opts.speed;
    this.resumeDelay = opts.resumeDelay || 3000;
    this.rampDurationMs = (opts.rampDuration || 0) * 1000;
    this.pickNewTarget();
  }

  pickNewTarget() {
    const r = Math.random;
    this.target.set(
      (r() * 2 - 1) * (1 - this.margin),
      (r() * 2 - 1) * (1 - this.margin)
    );
  }

  forceStop() {
    this.active = false;
    this.mouse.isAutoActive = false;
  }

  update() {
    if (!this.enabled) return;
    const now = performance.now();
    const idle = now - this.manager.lastUserInteraction;

    if (idle < this.resumeDelay || this.mouse.isHoverInside) {
      if (this.active) this.forceStop();
      return;
    }

    if (!this.active) {
      this.active = true;
      this.current.copy(this.mouse.coords);
      this.lastTime = now;
      this.activationTime = now;
    }

    if (!this.active) return;
    this.mouse.isAutoActive = true;
    let dtSec = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (dtSec > 0.2) dtSec = 0.016;

    const dir = this._tmpDir.subVectors(this.target, this.current);
    const dist = dir.length();
    if (dist < 0.01) {
      this.pickNewTarget();
      return;
    }

    dir.normalize();
    let ramp = 1;
    if (this.rampDurationMs > 0) {
      const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs);
      ramp = t * t * (3 - 2 * t);
    }

    const step = this.speed * dtSec * ramp;
    const move = Math.min(step, dist);
    this.current.addScaledVector(dir, move);
    this.mouse.setNormalized(this.current.x, this.current.y);
  }
}

export class Output {
  simulation: Simulation;
  scene: THREE.Scene;
  camera: THREE.Camera;
  output: THREE.Mesh;

  constructor(paletteTex: THREE.Texture, bgVec4: THREE.Vector4) {
    this.simulation = new Simulation();
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    this.output = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.RawShaderMaterial({
        vertexShader: shaders.face_vert,
        fragmentShader: shaders.color_frag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          velocity: { value: this.simulation.fbos.vel_0.texture },
          boundarySpace: { value: new THREE.Vector2() },
          palette: { value: paletteTex },
          bgColor: { value: bgVec4 },
        },
      })
    );
    this.scene.add(this.output);
  }

  resize() {
    this.simulation.resize();
  }

  render() {
    if (!Common.renderer) return;
    Common.renderer.setRenderTarget(null);
    Common.renderer.render(this.scene, this.camera);
  }

  update() {
    this.simulation.update();
    this.render();
  }
}

export interface WebGLManagerProps {
  $wrapper: HTMLElement;
  paletteTex: THREE.Texture;
  bgVec4: THREE.Vector4;
  autoDemo: boolean;
  autoSpeed: number;
  autoIntensity: number;
  takeoverDuration: number;
  autoResumeDelay: number;
  autoRampDuration: number;
}

export class WebGLManager {
  output!: Output;
  autoDriver?: AutoDriver;
  lastUserInteraction = performance.now();
  running = false;
  rafId: number | null = null;
  isVisible = true;

  private _loop = this.loop.bind(this);
  private _resize = this.resize.bind(this);

  constructor(props: WebGLManagerProps) {
    Common.init(props.$wrapper);
    Mouse.init(props.$wrapper);
    Mouse.autoIntensity = props.autoIntensity;
    Mouse.takeoverDuration = props.takeoverDuration;
    Mouse.onInteract = () => {
      this.lastUserInteraction = performance.now();
      if (this.autoDriver) this.autoDriver.forceStop();
    };

    this.autoDriver = new AutoDriver(Mouse, this, {
      enabled: props.autoDemo,
      speed: props.autoSpeed,
      resumeDelay: props.autoResumeDelay,
      rampDuration: props.autoRampDuration,
    });

    this.output = new Output(props.paletteTex, props.bgVec4);
    props.$wrapper.prepend(Common.renderer!.domElement);

    window.addEventListener('resize', this._resize);
  }

  resize() {
    Common.resize();
    this.output.resize();
  }

  render() {
    if (this.autoDriver) this.autoDriver.update();
    Mouse.update();
    Common.update();
    this.output.update();
  }

  loop() {
    if (!this.running) return;
    this.render();
    this.rafId = requestAnimationFrame(this._loop);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._loop();
  }

  pause() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  dispose() {
    window.removeEventListener('resize', this._resize);
    Mouse.dispose();
    Common.dispose();
  }
}
