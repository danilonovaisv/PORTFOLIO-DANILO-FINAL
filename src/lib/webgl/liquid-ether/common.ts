import * as THREE from 'three';

export class CommonManager {
  width = 0;
  height = 0;
  aspect = 1;
  pixelRatio = 1;
  isMobile = false;
  breakpoint = 768;
  fboWidth: number | null = null;
  fboHeight: number | null = null;
  time = 0;
  delta = 0;
  container: HTMLElement | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  private _lastTime = 0;

  init(container: HTMLElement) {
    this.container = container;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    // Always transparent
    this.renderer.autoClear = false;
    this.renderer.setClearColor(new THREE.Color(0x000000), 0);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height);

    const el = this.renderer.domElement;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.display = 'block';

    this._lastTime = performance.now();

    return el;
  }

  resize() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(1, Math.floor(rect.width));
    this.height = Math.max(1, Math.floor(rect.height));
    this.aspect = this.width / this.height;
    if (this.renderer) {
      this.renderer.setSize(this.width, this.height, false);
    }
  }

  update() {
    const now = performance.now();
    this.delta = Math.min(now - this._lastTime, 100) / 1000;
    this._lastTime = now;
    this.time += this.delta;
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
    this.container = null;
  }
}

export const Common = new CommonManager();
