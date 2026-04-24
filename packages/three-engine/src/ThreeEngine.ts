import * as THREE from 'three';
import { chooseQuality } from './quality';
import { isLowEndDevice } from './guards';
export class ThreeEngine {
  private container?: HTMLElement;
  private renderer?: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private raf = 0;
  private quality: 'low'|'medium'|'high' = 'medium';

  async mount(el: HTMLElement) {
    this.container = el;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 200);
    this.camera.position.set(0, 1.6, 3);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(el.clientWidth, el.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(this.renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemi.position.set(0, 20, 0); this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.6); dir.position.set(5, 10, 2); this.scene.add(dir);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    ground.rotation.x = -Math.PI/2; this.scene.add(ground);

    this.setQuality(isLowEndDevice() ? 'low' : chooseQuality());
    this.loop();
  }

  setQuality(q: 'low'|'medium'|'high') { this.quality = q; }
  async loadHuman() {}
  highlightMuscles(_ids: string[]) {}
  setEnvironment(_time: 'dawn'|'noon'|'night') {}

  private loop = () => {
    if (!this.renderer) return;
    this.raf = requestAnimationFrame(this.loop);
    this.renderer.render(this.scene, this.camera);
  };

  resize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const { clientWidth:w, clientHeight:h } = this.container;
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.renderer?.dispose();
    this.container?.firstChild && this.container.removeChild(this.container.firstChild as Node);
  }
}
