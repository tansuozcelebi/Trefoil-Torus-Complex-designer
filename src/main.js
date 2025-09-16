import * as THREE from 'three';
import { setupGUI } from './ui/guiMenu.js';
import { TrefoilCurve } from './trefoil.js';
import { SeptafoilCurve } from './objects/septafoil.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { saveAs } from 'file-saver';

// App container
const container = document.createElement('div');
document.body.appendChild(container);

// inject minimal global styles for consistent UI typography and colors
const style = document.createElement('style');
style.textContent = `
  :root { --tc-font: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
  body { font-family: var(--tc-font); margin: 0; }
  button { font-family: var(--tc-font); }
  /* panels and nav
     ensure high-contrast text and friendlier link color in About */
  div[style] a { color: #7fbfff; text-decoration: underline; }
  #tc-modal-root div a { color: #9fc8ff; }
`;
document.head.appendChild(style);

// top navigation bar and content panels
const navBar = document.createElement('div');
navBar.style.position = 'fixed';
navBar.style.top = '12px';
navBar.style.left = '12px';
navBar.style.transform = 'none';
navBar.style.zIndex = '1000';
navBar.style.display = 'flex';
navBar.style.alignItems = 'center';
navBar.style.gap = '6px';
navBar.style.background = 'rgba(20,20,22,0.7)';
navBar.style.padding = '6px 10px';
navBar.style.borderRadius = '8px';
navBar.style.backdropFilter = 'blur(6px)';
document.body.appendChild(navBar);

function makeTab(label){
  const t = document.createElement('button');
  t.textContent = label;
  t.style.padding = '6px 10px';
  t.style.border = 'none';
  t.style.background = 'transparent';
  t.style.color = '#fff';
  t.style.cursor = 'pointer';
  t.style.borderRadius = '4px';
  t.addEventListener('mouseenter', () => t.style.background = 'rgba(255,255,255,0.04)');
  t.addEventListener('mouseleave', () => t.style.background = 'transparent');
  return t;
}

const tabs = ['Home','Environment','Object','Scene','About','Help'];
const panels = {};
tabs.forEach((name) => {
  const btn = makeTab(name);
  btn.addEventListener('click', () => showTab(name));
  navBar.appendChild(btn);
  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '56px';
  panel.style.left = '12px';
  panel.style.transform = 'none';
  panel.style.zIndex = '999';
  panel.style.background = 'rgba(10,10,12,0.85)';
  panel.style.color = '#fff';
  panel.style.padding = '12px';
  panel.style.borderRadius = '8px';
  panel.style.minWidth = '320px';
  panel.style.maxHeight = '60vh';
  panel.style.overflow = 'auto';
  panel.style.display = 'none';
  document.body.appendChild(panel);
  panels[name] = panel;
});

// quick helper to toggle tabs
function showTab(name){
  Object.keys(panels).forEach(k => panels[k].style.display = 'none');
  if (panels[name]) panels[name].style.display = 'block';
  // If Object tab is selected, ensure Controls GUI is visible
  if (name === 'Object' && typeof window.showControlsGUI === 'function') {
    window.showControlsGUI();
  }
}

// default open Home
showTab('Home');

// Environment panel will receive the toolbar
const envPanel = panels['Environment'];
const objectPanel = panels['Object'];
// Scene panel for selecting scenes/presets
const scenePanel = panels['Scene'];
scenePanel.innerHTML = `
  <strong>Scene</strong>
  <div style="margin-top:8px">Choose a scene preset or toggle debug overlays.</div>
  <div style="margin-top:12px">
    <label>Preset: </label>
    <select id="scenePreset">
      <option value="default">Default</option>
      <option value="showcase">Showcase</option>
      <option value="studio">Studio</option>
    </select>
  </div>
  <div style="margin-top:10px">
    <label><input type="checkbox" id="toggleHelpers" /> Show Helpers</label>
  </div>
`;
// wire simple interactions
scenePanel.querySelector('#scenePreset').addEventListener('change', (e) => {
  const v = e.target.value;
  // simple presets: tweak params and rebuild
  if (v === 'showcase'){
    params.autoRotate = true; params.rotationSpeed = 0.3; params.metalness = 0.95; params.roughness = 0.12;
  } else if (v === 'studio'){
    params.autoRotate = false; params.rotationSpeed = 0.05; params.metalness = 0.2; params.roughness = 0.6;
  } else {
    params.autoRotate = false; params.rotationSpeed = 0.12; params.metalness = 0.8; params.roughness = 0.25;
  }
  // reflect changes in controls and rebuild
  try { gui.updateDisplay(); } catch(e) {}
  rebuild();
  // Re-apply reflection constraints if currently enabled
  if (params && params.showReflection !== undefined) {
    toggleReflection(params.showReflection);
  }
});
scenePanel.querySelector('#toggleHelpers').addEventListener('change', (e) => {
  const checked = e.target.checked;
  // toggle grid and shadow receiver as an example
  grid.visible = checked || params.showGrid;
  shadowReceiver.visible = checked;
});

// Stats overlay (bottom-left): vertex & face counts
const statsOverlay = document.createElement('div');
statsOverlay.style.position = 'fixed';
statsOverlay.style.left = '12px';
statsOverlay.style.bottom = '12px';
statsOverlay.style.zIndex = '1000';
statsOverlay.style.padding = '8px 10px';
statsOverlay.style.background = 'rgba(0,0,0,0.6)';
statsOverlay.style.color = '#fff';
statsOverlay.style.fontFamily = 'monospace';
statsOverlay.style.fontSize = '13px';
statsOverlay.style.borderRadius = '6px';
statsOverlay.style.minWidth = '120px';
statsOverlay.innerHTML = `Verts: 0<br/>Faces: 0`;
document.body.appendChild(statsOverlay);

function updateStats(){
  if (!knotGeometry) {
    statsOverlay.innerHTML = `Verts: 0<br/>Faces: 0`;
    return;
  }
  const verts = knotGeometry.attributes && knotGeometry.attributes.position ? knotGeometry.attributes.position.count : 0;
  let faces = 0;
  if (knotGeometry.index) faces = Math.floor(knotGeometry.index.count / 3);
  else faces = Math.floor(verts / 3);
  statsOverlay.innerHTML = `Verts: ${verts.toLocaleString()}<br/>Faces: ${faces.toLocaleString()}`;
}

// top toolbar for ground style (moved into Environment panel)
const toolbar = document.createElement('div');
toolbar.style.display = 'flex';
toolbar.style.flexDirection = 'column';
toolbar.style.alignItems = 'stretch';
toolbar.style.gap = '8px';
envPanel.appendChild(toolbar);

function makeBtn(label, onClick){
  const b = document.createElement('button');
  b.textContent = label;
  b.style.padding = '8px 12px';
  b.style.borderRadius = '6px';
  b.style.border = 'none';
  b.style.cursor = 'pointer';
  b.style.background = '#222';
  b.style.color = '#fff';
  b.style.width = '100%';
  b.addEventListener('click', onClick);
  return b;
}

const flatBtn = makeBtn('Flat', () => setGroundStyle('Flat'));
const seaBtn = makeBtn('Sea Wave', () => setGroundStyle('Sea'));
const mathBtn = makeBtn('Mathematical surface', () => setGroundStyle('Math'));
const roomBtn = makeBtn('Room', () => setGroundStyle('Room'));
const funnelBtn = makeBtn('Funnel', () => setGroundStyle('Funnel'));
toolbar.appendChild(flatBtn);
toolbar.appendChild(seaBtn);
toolbar.appendChild(mathBtn);
toolbar.appendChild(roomBtn);
toolbar.appendChild(funnelBtn);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// use soft shadows where available
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f14);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(5, 3, 8);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// Lights
// create ambient with a safe default intensity (do not reference `params` before it's declared)
const ambient = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambient);

const spot = new THREE.SpotLight(0xffffff, 1.5);
spot.position.set(5, 10, 5);
spot.castShadow = true;
spot.angle = Math.PI / 6;
spot.shadow.mapSize.set(2048, 2048);
// shadow camera and bias tweaks for better quality
spot.shadow.bias = -0.0005;
spot.shadow.camera.near = 0.5;
spot.shadow.camera.far = 500;
spot.shadow.camera.fov = 30;
scene.add(spot);
// ensure the spot has a target in the scene so we can update it later
scene.add(spot.target);

// Ground + optional Reflector (Flat default uses a large repeating chessboard)
const groundSize = 2000;
// create a canvas-based checkerboard texture
function createCheckerTexture(size = 512, squares = 8){
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const sq = size / squares;
  for(let y=0;y<squares;y++){
    for(let x=0;x<squares;x++){
      const isWhite = (x + y) % 2 === 0;
      ctx.fillStyle = isWhite ? '#ffffff' : '#222222';
      ctx.fillRect(x*sq, y*sq, sq, sq);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(groundSize / 10, groundSize / 10);
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

const checkerTex = createCheckerTexture(1024, 8);
const groundMat = new THREE.MeshStandardMaterial({ map: checkerTex, roughness: 0.6, metalness: 0.0 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(groundSize, groundSize), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2.5;
ground.receiveShadow = true;
scene.add(ground);

// persistent shadow receiver so shadows remain visible even when reflector/other grounds are active
const shadowMat = new THREE.ShadowMaterial({ opacity: 0.6 });
const shadowReceiver = new THREE.Mesh(new THREE.PlaneGeometry(groundSize, groundSize), shadowMat);
shadowReceiver.rotation.x = -Math.PI / 2;
shadowReceiver.position.y = ground.position.y + 0.002; // slight offset to avoid z-fighting
shadowReceiver.receiveShadow = true;
shadowReceiver.renderOrder = 2;
scene.add(shadowReceiver);

import { createSea as makeSea } from './grounds/sea.js';
import { createMathSurface as makeMath } from './grounds/math.js';

let reflector = null;
let seaObj = null; // {mesh, setTime, resize}
let mathObj = null;
let currentGroundStyle = 'Flat';
// Saved states for reflection toggling
let _savedMaxDistance = null;
let _savedCameraFar = null;

// Controls and GUI state
const params = {
  a: 2.0,
  b: 1.0,
  objectType: 'Trefoil',
  p: 2,
  q: 3,
  tubeRadius: 0.25,
  uSegments: 400,
  vSegments: 32,
  materialType: 'Metallic',
  metalness: 0.8,
  roughness: 0.25,
  opacity: 1.0,
  ior: 1.45,
  useTransmission: false,
  useWireframe: true,
  showGrid: false,
  showReflection: false,
  reflectorOpacity: 0.6,
  fresnel: true,
  materialColor: '#9fbfff',
  wireframeColor: '#000000',
  spotIntensity: 1.5,
  spotPosition: { x: 5, y: 10, z: 5 },
  ambientIntensity: 1.0,
  envMapIntensity: 1.0,
  autoRotate: false,
  rotationSpeed: 0.12,
  texture: 'none',
  mathWireframeColor: '#000000'
};

// 6-axis transform controls (position in world units, rotation in degrees)
params.posX = 0.0;
params.posY = 0.0;
params.posZ = 0.0;
params.rotX = 0.0;
params.rotY = 0.0;
params.rotZ = 0.0;


let knotMesh = null;
let wireframeMesh = null;
let knotGeometry = null;
let knotMaterial = null;

// Setup GUI menu (objectType at the top)
const { gui, viewFolder } = setupGUI(params, rebuild, updateMaterial, toggleReflection, toggleWireframe, toggleGrid, applyTransform, knotMaterial, wireframeMesh, spot, ambient, reflector);

// Export folder (if needed)
// const exportFolder = gui.addFolder('Export');
// exportFolder.add({ screenshot: takeScreenshot }, 'screenshot');
// exportFolder.open();

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate = params.autoRotate;
controls.autoRotateSpeed = params.rotationSpeed * 10;

// bind GUI auto-rotate and rotation speed
viewFolder.__controllers.forEach(c => { /* keep existing references */ });
viewFolder.__controllers = viewFolder.__controllers || [];
viewFolder.add(params, 'autoRotate').onChange((v) => { controls.autoRotate = v; });
viewFolder.add(params, 'rotationSpeed', 0, 2, 0.01).onChange((v) => { controls.autoRotateSpeed = v * 10; });

function createMaterial(){
  const mat = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(params.materialColor),
    metalness: params.metalness,
    roughness: params.roughness,
    opacity: params.opacity,
    transparent: params.materialType === 'Transparent' || params.opacity < 1.0,
    envMapIntensity: params.envMapIntensity,
    ior: params.ior,
    transmission: params.useTransmission ? 0.9 : 0.0,
    side: THREE.DoubleSide
  });

  if (params.fresnel){
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        '#include <dithering_fragment>\n\n// Fresnel edge highlight\nfloat fresnel = pow(1.0 - max(dot(normalize(vViewPosition), normalize(vNormal)), 0.0), 2.5);\ngl_FragColor.rgb += vec3(0.2, 0.35, 0.6) * fresnel * 0.6;'
      );
    };
  }

  return mat;
}

function rebuild(){
  // LOD: reduce uSegments on small screens
  const isMobile = window.innerWidth < 800 || window.devicePixelRatio > 2.5;
  const uSeg = isMobile ? Math.max(64, Math.round(params.uSegments * 0.25)) : params.uSegments;

  if (knotMesh){
    // dispose previous mesh geometry/material safely
    try { if (knotMesh.geometry) knotMesh.geometry.dispose(); } catch(e) {}
    try { if (knotMesh.material) knotMesh.material.dispose(); } catch(e) {}
    // removing knotMesh also removes child wireframeMesh if attached
    if (knotMesh.parent) knotMesh.parent.remove(knotMesh);
    else scene.remove(knotMesh);
    knotMesh = null;
  }
  if (wireframeMesh){
    try { if (wireframeMesh.geometry) wireframeMesh.geometry.dispose(); } catch(e) {}
    try { if (wireframeMesh.material) wireframeMesh.material.dispose(); } catch(e) {}
    if (wireframeMesh.parent) wireframeMesh.parent.remove(wireframeMesh);
    else scene.remove(wireframeMesh);
    wireframeMesh = null;
  }

  // choose curve implementation based on user selection
  let curve;
  if (params.objectType === 'Septafoil'){
    curve = new SeptafoilCurve(params.a, params.b, params.p, params.q);
  } else {
    curve = new TrefoilCurve(params.a, params.b, params.p, params.q);
  }
  knotGeometry = new THREE.TubeGeometry(curve, uSeg, params.tubeRadius, params.vSegments, true);
  // center geometry so the object is centered at origin
  if (knotGeometry && typeof knotGeometry.center === 'function'){
    knotGeometry.center();
    knotGeometry.computeBoundingSphere();
  }
  knotMaterial = createMaterial();
  knotMaterial.envMap = currentEnvMap;
  knotMaterial.needsUpdate = true;

  knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
  knotMesh.castShadow = true;
  knotMesh.receiveShadow = true;
  // ensure initial transform applied
  applyTransform();
  scene.add(knotMesh);

  // Keep camera fixed across rebuilds; just position object and aim light
  if (knotGeometry && knotGeometry.boundingSphere){
    const radius = knotGeometry.boundingSphere.radius;
    const upOffset = radius * 2.0 * 0.3; // raise object above ground proportionally
    knotMesh.position.set(0, upOffset, 0);
    if (wireframeMesh) wireframeMesh.position.set(0, upOffset, 0);
    spot.target.position.copy(knotMesh.position);
  }

  // wireframe overlay as child of knotMesh so centers/d transforms match exactly
  const geo2 = new THREE.WireframeGeometry(knotGeometry);
  const mat2 = new THREE.LineBasicMaterial({ color: new THREE.Color(params.wireframeColor), transparent: true, opacity: 0.6 });
  wireframeMesh = new THREE.LineSegments(geo2, mat2);
  wireframeMesh.renderOrder = 1;
  // add to knot mesh so it inherits the same local transform and center
  knotMesh.add(wireframeMesh);
  wireframeMesh.visible = params.useWireframe;

  toggleWireframe(params.useWireframe);
  // update vertex/face stats
  updateStats();
}

function applyTransform(){
  if (!knotMesh) return;
  knotMesh.position.set(params.posX, params.posY, params.posZ);
  knotMesh.rotation.set(THREE.MathUtils.degToRad(params.rotX), THREE.MathUtils.degToRad(params.rotY), THREE.MathUtils.degToRad(params.rotZ));
  if (wireframeMesh){
  // wireframe is a child of knotMesh; it inherits transforms so avoid manual offsets
  wireframeMesh.position.set(0,0,0);
  wireframeMesh.rotation.set(0,0,0);
  }
}

// Environment
let currentEnvMap = null;
function loadEnv(){
  // use simple gradient environment if no HDR available
  const tex = new THREE.TextureLoader().load('/');
  // leave currentEnvMap null for now; user can add HDR later
}

function updateMaterial(){
  if (!knotMaterial) return;
  const old = knotMaterial;
  knotMaterial = createMaterial();
  knotMaterial.envMap = currentEnvMap;
  knotMaterial.needsUpdate = true;
  if (knotMesh) knotMesh.material = knotMaterial;
  if (wireframeMesh && wireframeMesh.material) {
    wireframeMesh.material.color.set(params.wireframeColor);
    wireframeMesh.material.needsUpdate = true;
  }
}

function toggleWireframe(v){
  if (!wireframeMesh) return;
  wireframeMesh.visible = v;
}

const grid = new THREE.GridHelper(20, 40, 0x222222, 0x0a0a0a);
grid.position.y = -2.499;
scene.add(grid);
// initialize grid visibility from params (default off)
grid.visible = params.showGrid;

function toggleGrid(v){ grid.visible = v; }


function toggleReflection(v){
  if (v){
    if (!reflector){
      const geometry = new THREE.PlaneGeometry(groundSize, groundSize);
      reflector = new Reflector(geometry, {
        // smaller clip bias reduces self-reflection artifacts
        clipBias: 0.001,
        // clamp render target sizes
        textureWidth: Math.min(1024, Math.max(512, Math.floor(window.innerWidth * window.devicePixelRatio))),
        textureHeight: Math.min(1024, Math.max(512, Math.floor(window.innerHeight * window.devicePixelRatio))),
        color: 0x777777,
        recursion: 0
      });
      reflector.rotation.x = -Math.PI / 2;
      reflector.position.y = ground.position.y + 0.001;
      // make reflector slightly transparent so the underlying checkerboard remains visible
      reflector.material.transparent = params.reflectorOpacity < 1.0;
      reflector.material.opacity = params.reflectorOpacity;
      scene.add(reflector);
    }
    // while reflection is active, limit far distance and orbit range to avoid far-haze in the reflection
    if (_savedCameraFar === null) _savedCameraFar = camera.far;
    camera.far = Math.min(camera.far, 300);
    camera.updateProjectionMatrix();
    if (controls){
      if (_savedMaxDistance === null) _savedMaxDistance = controls.maxDistance ?? null;
      controls.maxDistance = Math.min(50, _savedMaxDistance || 50);
    }
    // keep ground visible and just show the reflector over it
    ground.visible = true;
    if (reflector) reflector.visible = true;
  } else {
    if (reflector) reflector.visible = false;
    // restore camera/controls distances
    if (_savedCameraFar !== null){ camera.far = _savedCameraFar; camera.updateProjectionMatrix(); _savedCameraFar = null; }
    if (controls && _savedMaxDistance !== null){ controls.maxDistance = _savedMaxDistance; _savedMaxDistance = null; }
    ground.visible = true;
  }
}

// apply initial reflection state
toggleReflection(params.showReflection);

function takeScreenshot(){
  renderer.domElement.toBlob((blob) => {
    if (blob) saveAs(blob, 'trefoil.png');
  });
}

// Ground style helpers
function setGroundStyle(style){
  currentGroundStyle = style;
  // remove additional ground types
  if (seaObj){ scene.remove(seaObj.mesh); seaObj.dispose(); seaObj = null; }
  if (mathObj){ scene.remove(mathObj.mesh); mathObj.dispose(); mathObj = null; }
  if (reflector) { reflector.visible = false; }
  ground.visible = false;

  if (style === 'Flat'){
    ground.visible = true;
  } else if (style === 'Sea'){
    seaObj = makeSea(ground.position.y);
    scene.add(seaObj.mesh);
  } else if (style === 'Math'){
    mathObj = makeMath(ground.position.y);
    scene.add(mathObj.mesh);
  }
}

function createSea(){
  // GPU procedural seascape shader (adapted from TDM Seascape)
  const geo = new THREE.PlaneGeometry(200, 200, 1, 1);

  seaUniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iMouse: { value: new THREE.Vector2(0, 0) }
  };

  const frag = `
  precision mediump float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;

  #define PI 3.141592
  #define SEA_HEIGHT 0.6
  #define SEA_CHOPPY 4.0
  #define SEA_SPEED 0.8
  #define SEA_FREQ 0.16

  mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise2(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return -1.0 + 2.0 * mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
  }

  float sea_octave(vec2 uv, float choppy){
    uv += noise2(uv);
    vec2 wv = 1.0 - abs(sin(uv));
    vec2 swv = abs(cos(uv));
    wv = mix(wv, swv, wv);
    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
  }

  float mapSea(vec3 p){
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;
    float d; float h = 0.0;
    float SEA_TIME = 1.0 + iTime * SEA_SPEED;
    for(int i=0;i<3;i++){
      d = sea_octave((uv+SEA_TIME)*freq, choppy);
      d += sea_octave((uv-SEA_TIME)*freq, choppy);
      h += d * amp;
      uv = octave_m * uv; freq *= 1.9; amp *= 0.22;
      choppy = mix(choppy, 1.0, 0.2);
    }
    return p.y - h;
  }

  vec3 getSkyColor(vec3 e){
    e.y = (max(e.y,0.0)*0.8+0.2)*0.8;
    return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4) * 1.1;
  }

  float diffuseN(vec3 n, vec3 l, float p){ return pow(dot(n,l)*0.4 + 0.6, p); }
  float specularN(vec3 n, vec3 l, vec3 e, float s){
    float nrm = (s + 8.0) / (PI * 8.0);
    return pow(max(dot(reflect(e,n), l), 0.0), s) * nrm;
  }

  vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist){
    float fresnel = clamp(1.0 - dot(n, -eye), 0.0, 1.0);
    fresnel = min(fresnel * fresnel * fresnel, 0.5);
    vec3 reflected = getSkyColor(reflect(eye, n));
    vec3 SEA_BASE = vec3(0.0,0.09,0.18);
    vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6)*0.6;
    vec3 refracted = SEA_BASE + diffuseN(n, l, 80.0) * SEA_WATER_COLOR * 0.12;
    vec3 color = mix(refracted, reflected, fresnel);
    float atten = max(1.0 - dot(dist, dist) * 0.001, 0.0);
    color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
    color += specularN(n, l, eye, 600.0 * inversesqrt(dot(dist,dist)));
    return color;
  }

  vec3 getNormal(vec3 p){
    float eps = 0.1 / iResolution.x;
    vec3 n;
    n.y = mapSea(p);
    n.x = mapSea(vec3(p.x+eps,p.y,p.z)) - n.y;
    n.z = mapSea(vec3(p.x,p.y,p.z+eps)) - n.y;
    n.y = eps;
    return normalize(n);
  }

  vec3 getPixel(vec2 fragCoord, float time){
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    vec3 ang = vec3(sin(time*3.0)*0.1, sin(time)*0.2+0.3, time);
    vec3 ori = vec3(0.0,3.5,time*5.0);
    vec3 dir = normalize(vec3(uv.xy, -2.0)); dir.z += length(uv) * 0.14;
    // simple rotation via euler omitted for brevity; use dir directly
    vec3 p = ori;
    // naive march: sample height at origin projection
    float t = 0.0; float maxT = 1000.0; float h = mapSea(ori + dir * maxT);
    vec3 hit = ori + dir * maxT;
    vec3 dist = hit - ori;
    vec3 n = getNormal(hit);
    vec3 light = normalize(vec3(0.0,1.0,0.8));
    return mix(getSkyColor(dir), getSeaColor(hit, n, light, dir, dist), pow(smoothstep(0.0,-0.02,dir.y),0.2));
  }

  void main(){
    vec2 fragCoord = gl_FragCoord.xy;
    float time = iTime * 0.3 + iMouse.x*0.01;
    vec3 color = getPixel(fragCoord, time);
    gl_FragColor = vec4(pow(color, vec3(0.65)), 1.0);
  }
  `;

  const vert = `
  precision mediump float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `;

  const mat = new THREE.ShaderMaterial({
    uniforms: seaUniforms,
    vertexShader: vert,
    fragmentShader: frag,
    transparent: false,
    side: THREE.DoubleSide
  });

  seaMesh = new THREE.Mesh(geo, mat);
  seaMesh.rotation.x = -Math.PI/2;
  seaMesh.position.y = ground.position.y;
  seaMesh.receiveShadow = true;
  scene.add(seaMesh);
}

window.setMathWireframeColor = function(color) {
  if (mathObj && mathObj.setWireframeColor) {
    mathObj.setWireframeColor(color);
  }
};

function createMathSurface(){
  if (mathObj) {
    scene.remove(mathObj.mesh);
    scene.remove(mathObj.wireframe);
    mathObj.dispose();
  }
  mathObj = makeMath(ground.position.y);
  scene.add(mathObj.mesh);
  scene.add(mathObj.wireframe);
}

// Resize handler
window.addEventListener('resize', onWindowResize, false);
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (seaUniforms && seaUniforms.iResolution){
    seaUniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
  }
  if (reflector){
    // update reflector render target size
    const w = Math.min(1024, Math.max(512, Math.floor(window.innerWidth * window.devicePixelRatio)));
    const h = Math.min(1024, Math.max(512, Math.floor(window.innerHeight * window.devicePixelRatio)));
    const rt = typeof reflector.getRenderTarget === 'function' ? reflector.getRenderTarget() : reflector.renderTarget;
    if (rt && typeof rt.setSize === 'function') rt.setSize(w, h);
  }
}

// Auto-rotate
let rot = 0;

function animate(){
  requestAnimationFrame(animate);
  const now = performance.now() * 0.001;
  // optional auto-rotate the knot object (local rotation)
  if (params.autoRotate && knotMesh){
    knotMesh.rotation.y += params.rotationSpeed * 0.01;
  }

  controls.update();

  // animate sea wave
  if (seaObj){
    seaObj.setTime(now);
  }

  // keep reflector aligned with active flat ground
  if (reflector && currentGroundStyle === 'Flat'){
    reflector.position.copy(ground.position);
    reflector.rotation.copy(ground.rotation);
  }

  renderer.render(scene, camera);
  // update stats per-frame to reflect any realtime changes
  updateStats();
}

// initial build
rebuild();
animate();

// expose rebuild for GUI callbacks
window.rebuildKnot = rebuild;


// move dat.GUI into the Object panel so the panel contains the controls
// dat.GUI creates a domElement we can relocate
window.showControlsGUI = function() {
  if (!objectPanel.contains(gui.domElement)) {
    gui.domElement.style.position = 'static';
    objectPanel.appendChild(gui.domElement);
  }
  gui.domElement.style.display = 'block';
};
// Show GUI in Object panel by default if Object tab is open
if (panels['Object'].style.display === 'block') {
  window.showControlsGUI();
}

// populate Home/About/Help panels with content (About/Help loaded from modules)
import { getAboutHtml } from './ui/about.js';
import { helpHtml } from './ui/help.js';
import { showModal } from './ui/modal.js';
panels['Home'].innerHTML = '<strong>Trefoil Torus Complex Designer</strong><br/>Use the tabs to change environment, object, and view options.';
// allow language selection and modal viewing
panels['About'].innerHTML = `
  <div id="aboutLocale">
    <label>Language: </label>
    <select id="aboutLang"><option value="en">English</option><option value="tr">Türkçe</option></select>
  </div>
  <div id="aboutContent" style="margin-top:10px">${getAboutHtml('en')}</div>
  <div style="margin-top:10px"><a href="#" id="aboutMore">More on knots</a></div>
`;
// wire events
panels['About'].querySelector('#aboutLang').addEventListener('change', (e) => {
  const v = e.target.value;
  panels['About'].querySelector('#aboutContent').innerHTML = getAboutHtml(v);
});
panels['About'].querySelector('#aboutMore').addEventListener('click', (e) => {
  e.preventDefault();
  showModal(getAboutHtml(panels['About'].querySelector('#aboutLang').value), { title: 'About — Trefoil Torus Complex' });
});
panels['Help'].innerHTML = helpHtml;

// allow mounting the React-based nav optionally
export async function mountReactNav(){
  try{
    const mod = await import('./ui/index.tsx');
    const unmount = mod.mountNav((tab) => showTab(tab));
    return unmount;
  } catch(e){
    console.warn('React nav mount failed', e);
    return () => {};
  }
}

// close panels when clicking outside
window.addEventListener('pointerdown', (e) => {
  // if click is inside any panel or navbar, ignore
  const inNav = navBar.contains(e.target);
  let inPanel = false;
  Object.values(panels).forEach(p => { if (p.contains(e.target)) inPanel = true; });
  if (!inNav && !inPanel){
    Object.keys(panels).forEach(k => panels[k].style.display = 'none');
  }
});

