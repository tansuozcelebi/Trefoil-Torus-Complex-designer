import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { TrefoilCurve } from './trefoil.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { saveAs } from 'file-saver';

// App container
const container = document.createElement('div');
document.body.appendChild(container);

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

// Ground + optional Reflector
const groundMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.4, metalness: 0.0 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2.5;
ground.receiveShadow = true;
scene.add(ground);

let reflector = null;

// Controls and GUI state
const params = {
  a: 2.0,
  b: 1.0,
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
  showGrid: true,
  showReflection: false,
  fresnel: true,
  materialColor: '#9fbfff',
  wireframeColor: '#000000',
  spotIntensity: 1.5,
  spotPosition: { x: 5, y: 10, z: 5 },
  ambientIntensity: 1.0,
  envMapIntensity: 1.0,
  autoRotate: false,
  rotationSpeed: 0.12,
  texture: 'none'
};

// 6-axis transform controls (position in world units, rotation in degrees)
params.posX = 0.0;
params.posY = 0.0;
params.posZ = 0.0;
params.rotX = 0.0;
params.rotY = 0.0;
params.rotZ = 0.0;

const gui = new GUI({ width: 320 });

// GUI folders
const geomFolder = gui.addFolder('Geometry');
geomFolder.add(params, 'a', 0.1, 5.0, 0.01).onChange(rebuild);
geomFolder.add(params, 'b', 0.0, 2.0, 0.01).onChange(rebuild);
geomFolder.add(params, 'p', 1, 5, 1).onChange(rebuild);
geomFolder.add(params, 'q', 1, 5, 1).onChange(rebuild);
geomFolder.add(params, 'tubeRadius', 0.01, 1.0, 0.01).onChange(rebuild);
geomFolder.add(params, 'uSegments', 16, 2000, 1).onChange(rebuild);
geomFolder.add(params, 'vSegments', 3, 128, 1).onChange(rebuild);
geomFolder.open();

const matFolder = gui.addFolder('Material');
matFolder.add(params, 'materialType', ['Metallic', 'Opaque', 'Transparent']).onChange(updateMaterial);
matFolder.add(params, 'metalness', 0, 1, 0.01).onChange(updateMaterial);
matFolder.add(params, 'roughness', 0, 1, 0.01).onChange(updateMaterial);
matFolder.add(params, 'opacity', 0.01, 1, 0.01).onChange(updateMaterial);
matFolder.add(params, 'ior', 1.0, 2.5, 0.01).onChange(updateMaterial);
matFolder.add(params, 'useTransmission').onChange(updateMaterial);
matFolder.add(params, 'fresnel').name('Fresnel Highlight').onChange(updateMaterial);
matFolder.addColor(params, 'materialColor').name('Material Color').onChange((v) => {
  if (knotMaterial) knotMaterial.color.set(v);
});
matFolder.addColor(params, 'wireframeColor').name('Wireframe Color').onChange((v) => {
  if (wireframeMesh) wireframeMesh.material.color.set(v);
});
matFolder.open();

const lightsFolder = gui.addFolder('Lighting');
lightsFolder.add(params, 'spotIntensity', 0, 5, 0.01).onChange((v) => { spot.intensity = v; });
lightsFolder.add(params, 'ambientIntensity', 0, 2, 0.01).onChange((v) => { ambient.intensity = v; });
lightsFolder.add(params, 'envMapIntensity', 0, 5, 0.01).onChange((v) => { if (knotMaterial) knotMaterial.envMapIntensity = v; });
lightsFolder.add(params, 'showReflection').onChange(toggleReflection);
lightsFolder.open();

const viewFolder = gui.addFolder('View');
viewFolder.add(params, 'useWireframe').onChange(toggleWireframe);
viewFolder.add(params, 'showGrid').onChange(toggleGrid);
viewFolder.add(params, 'autoRotate').onChange(() => {});
viewFolder.add(params, 'rotationSpeed', 0, 2, 0.01);
viewFolder.open();

// 6-axis control folder
const sixFolder = gui.addFolder('6-Axis Controls');
sixFolder.add(params, 'posX', -10, 10, 0.01).name('posX').onChange(applyTransform);
sixFolder.add(params, 'posY', -10, 10, 0.01).name('posY').onChange(applyTransform);
sixFolder.add(params, 'posZ', -10, 10, 0.01).name('posZ').onChange(applyTransform);
sixFolder.add(params, 'rotX', -180, 180, 0.1).name('rotX').onChange(applyTransform);
sixFolder.add(params, 'rotY', -180, 180, 0.1).name('rotY').onChange(applyTransform);
sixFolder.add(params, 'rotZ', -180, 180, 0.1).name('rotZ').onChange(applyTransform);
sixFolder.open();

const exportFolder = gui.addFolder('Export');
exportFolder.add({ screenshot: takeScreenshot }, 'screenshot');
exportFolder.open();

let knotMesh = null;
let wireframeMesh = null;
let knotGeometry = null;
let knotMaterial = null;

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

  const curve = new TrefoilCurve(params.a, params.b, params.p, params.q);
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

  // Frame object: position camera to fit the bounding sphere
  if (knotGeometry && knotGeometry.boundingSphere){
    const bs = knotGeometry.boundingSphere;
    const radius = bs.radius;
    // place camera along its current direction but far enough
    const dir = new THREE.Vector3().subVectors(camera.position, new THREE.Vector3(0,0,0)).normalize();
    const distance = Math.max(radius * 2.5, 3.0);
    camera.position.copy(dir.multiplyScalar(distance));
    camera.lookAt(0,0,0);
  // move object up by 30% of the bounding-sphere diameter
  const upOffset = radius * 2.0 * 0.3; // 30% of diameter
  knotMesh.position.set(0, upOffset, 0);
  if (wireframeMesh) wireframeMesh.position.set(0, upOffset, 0);
  // aim spot light at the knot so it casts shadows
  spot.target.position.copy(knotMesh.position);
  } else {
    camera.lookAt(0,0,0);
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
}

function applyTransform(){
  if (!knotMesh) return;
  knotMesh.position.set(params.posX, params.posY, params.posZ);
  knotMesh.rotation.set(THREE.MathUtils.degToRad(params.rotX), THREE.MathUtils.degToRad(params.rotY), THREE.MathUtils.degToRad(params.rotZ));
  if (wireframeMesh){
    wireframeMesh.position.copy(knotMesh.position);
    wireframeMesh.rotation.copy(knotMesh.rotation);
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
}

function toggleWireframe(v){
  if (!wireframeMesh) return;
  wireframeMesh.visible = v;
}

const grid = new THREE.GridHelper(20, 40, 0x222222, 0x0a0a0a);
grid.position.y = -2.499;
scene.add(grid);

function toggleGrid(v){ grid.visible = v; }


function toggleReflection(v){
  if (v){
    if (!reflector){
      const geometry = new THREE.PlaneGeometry(200, 200);
      reflector = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777
      });
      reflector.rotation.x = -Math.PI / 2;
      reflector.position.y = ground.position.y + 0.001;
      scene.add(reflector);
    }
    ground.visible = false;
    if (reflector) reflector.visible = true;
  } else {
    if (reflector) reflector.visible = false;
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

// Resize handler
window.addEventListener('resize', onWindowResize, false);
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Auto-rotate
let rot = 0;

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// initial build
rebuild();
animate();

// expose rebuild for GUI callbacks
window.rebuildKnot = rebuild;

