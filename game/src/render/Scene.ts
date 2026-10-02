// Renderer, lights, sky and fog. Visual targets from gdd/23 (art direction):
// a pale grey-gold haze, warm low sun, amber vs cyan inner light.
import * as THREE from 'three';

export const PALETTE = {
  stone: 0x6e6a62,
  grass: 0x7a8466,
  haze: 0xc9c2ae,
  amber: 0xe8a23a,
  moss: 0x5e8c4a,
  cyan: 0x5fd4e0,
  violet: 0x8a5cd6,
  glass: 0x141821,
  friend: 0xe2c56a,
  foe: 0xe0453a,
};

export interface Quality { shadows: boolean; shadowSize: number; pixelRatio: number; grassDensity: number }

export class SceneRig {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly sun: THREE.DirectionalLight;
  readonly hemi: THREE.HemisphereLight;
  private sky: THREE.Mesh;
  quality: Quality;

  constructor(container: HTMLElement, quality: Quality) {
    this.quality = quality;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.pixelRatio));
    this.renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.95;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = quality.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 900);
    this.scene.fog = new THREE.FogExp2(PALETTE.haze, 0.0042);
    this.scene.background = new THREE.Color(PALETTE.haze);

    this.hemi = new THREE.HemisphereLight(0xdcd6c4, 0x3c3a32, 0.95);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffe0ae, 2.4);
    this.sun.position.set(-60, 90, 40);
    this.sun.castShadow = quality.shadows;
    this.sun.shadow.mapSize.set(quality.shadowSize, quality.shadowSize);
    const s = this.sun.shadow.camera;
    s.left = -60; s.right = 60; s.top = 60; s.bottom = -60; s.near = 1; s.far = 260;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.04;
    this.scene.add(this.sun, this.sun.target);

    this.sky = this.makeSky();
    this.scene.add(this.sky);
    window.addEventListener('resize', () => this.resize());
  }

  private makeSky(): THREE.Mesh {
    const geo = new THREE.SphereGeometry(800, 32, 16);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        sunDir: { value: new THREE.Vector3(-0.5, 0.6, 0.35).normalize() },
        time: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 sunDir; uniform float time;
        varying vec3 vDir;
        void main() {
          float h = clamp(vDir.y, -0.2, 1.0);
          vec3 horizon = vec3(0.86, 0.80, 0.68);
          vec3 zenith = vec3(0.50, 0.58, 0.64);
          vec3 col = mix(horizon, zenith, pow(max(h, 0.0), 0.55));
          float s = max(dot(vDir, sunDir), 0.0);
          col += vec3(1.0, 0.82, 0.55) * pow(s, 64.0) * 1.6 + vec3(1.0, 0.75, 0.45) * pow(s, 6.0) * 0.25;
          // the Fall-line: the faint scar the Starwound left across the sky
          float band = exp(-pow((vDir.x * 0.8 + vDir.y * 1.4 - 0.9) * 9.0, 2.0)) * smoothstep(0.05, 0.4, vDir.y);
          col += vec3(0.37, 0.83, 0.88) * band * 0.10;
          gl_FragColor = vec4(col, 1.0);
          #include <colorspace_fragment>
        }`,
    });
    const m = new THREE.Mesh(geo, mat);
    m.frustumCulled = false;
    m.renderOrder = -1;
    return m;
  }

  /** Keeps the sun's shadow box centred on the area around the camera target. */
  followShadow(target: THREE.Vector3, extent: number) {
    const s = this.sun.shadow.camera;
    if (s.right !== extent) { s.left = -extent; s.right = extent; s.top = extent; s.bottom = -extent; s.updateProjectionMatrix(); }
    // snap to texel grid to stop shadow shimmer
    const texel = (extent * 2) / this.quality.shadowSize;
    const tx = Math.round(target.x / texel) * texel, tz = Math.round(target.z / texel) * texel;
    this.sun.target.position.set(tx, target.y, tz);
    this.sun.position.set(tx - 60, target.y + 90, tz + 40);
    this.sky.position.copy(this.camera.position);
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
