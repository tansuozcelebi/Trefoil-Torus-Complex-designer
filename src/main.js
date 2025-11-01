// Keyboard controls moved to controls/keyboard.js and initialized later
// ...imports...
import * as THREE from 'three';
import { createRendererAndScene } from './core/scene.js';
import { createBaseGround } from './core/ground.js';
import { createLights } from './core/lights.js';
import { setupKeyboardControls } from './controls/keyboard.js';
import { tabs as TabsConfig } from './ui/tabs';
import { setupGUI } from './ui/guiMenu.js';
import { TrefoilCurve } from './objects/trefoil.js';
import { SeptafoilCurve } from './objects/septafoil.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { saveAs } from 'file-saver';

// Raycaster ve pointer tanımı sadece renderer'dan sonra olacak



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

// area to show active object info
const activeInfo = document.createElement('div');
activeInfo.style.marginLeft = '12px';
activeInfo.style.color = '#3fa7ff'; // blue
activeInfo.style.fontSize = '12px';
navBar.appendChild(activeInfo);

// version display moved to bottom-left stats overlay

function makeTab(label){
  const t = document.createElement('button');
  t.textContent = label;
  t.style.padding = '6px 10px';
  t.style.border = 'none';
  t.style.background = 'transparent';
  t.style.color = '#fff';
  t.style.cursor = 'pointer';
  t.style.borderRadius = '4px';
  t.style.position = 'relative';
  t.style.transition = 'background 0.25s ease, box-shadow 0.3s ease, transform 0.18s ease';
  t.style.boxShadow = '0 0 0px rgba(0,180,255,0)';
  t.addEventListener('mouseenter', () => {
    t.style.background = 'rgba(35,120,200,0.18)';
    t.style.boxShadow = '0 0 8px rgba(0,170,255,0.55), 0 0 16px rgba(0,120,255,0.35)';
  });
  t.addEventListener('mouseleave', () => {
    if (!t.dataset.active){
      t.style.background = 'transparent';
      t.style.boxShadow = '0 0 0px rgba(0,180,255,0)';
      t.style.transform = 'none';
    }
  });
  t.addEventListener('mousedown', () => { t.style.transform = 'translateY(1px) scale(0.97)'; });
  t.addEventListener('mouseup', () => { t.style.transform = 'none'; });
  return t;
}

const panels = {};
function addTabButton(name){
  const btn = makeTab(name);
  btn.dataset.tab = name;
  btn.addEventListener('click', () => showTab(name));
  navBar.appendChild(btn);
  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  // position will be computed dynamically under the triggering button in showTab
  panel.style.transform = 'translateY(-8px) scale(0.98)';
  panel.style.zIndex = '999';
  panel.style.background = 'rgba(15,15,20,0.65)';
  panel.style.backdropFilter = 'blur(8px) saturate(120%)';
  panel.style.border = '1px solid rgba(255,255,255,0.08)';
  panel.style.boxShadow = '0 10px 28px rgba(0,0,0,0.35)';
  panel.style.color = '#fff';
  panel.style.padding = '12px';
  panel.style.borderRadius = '10px';
  panel.style.minWidth = '320px';
  panel.style.maxHeight = '60vh';
  panel.style.overflow = 'auto';
  panel.style.opacity = '0';
  panel.style.display = 'none';
  panel.style.transition = 'transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1.2), opacity 360ms cubic-bezier(0.2, 0.8, 0.2, 1)';
  document.body.appendChild(panel);
  panels[name] = panel;
}

// Build left tabs, spacer, and right-aligned Object
TabsConfig.left.forEach(addTabButton);
const spacer = document.createElement('div'); spacer.style.flex = '1'; navBar.appendChild(spacer);
TabsConfig.right.forEach(addTabButton);
TabsConfig.tail.forEach(addTabButton);




// quick helper to toggle tabs
const panelHideTimers = {};
function setPanelVisible(key, visible){
  const el = panels[key]; if (!el) return;
  clearTimeout(panelHideTimers[key]);
  if (visible){
    if (el.style.display !== 'block'){
      el.style.display = 'block';
      // force reflow before animating to target
      void el.offsetHeight;
    }
    el.style.opacity = '1';
    el.style.transform = 'translateY(0px) scale(1)';
  } else {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px) scale(0.98)';
    panelHideTimers[key] = setTimeout(()=>{ el.style.display = 'none'; }, 220);
  }
}

function showTab(name){
  Object.keys(panels).forEach(k => setPanelVisible(k, false));
  const panel = panels[name];
  if (panel){
    // Try to locate the triggering button (works for both vanilla and React nav if data-tab is present)
    const triggerBtn = document.querySelector(`button[data-tab="${name}"]`) || Array.from(document.querySelectorAll('button')).find(b => b.textContent === name);
    if (triggerBtn){
      const rect = triggerBtn.getBoundingClientRect();
      const margin = 8; // small gap under the button
      // Set panel width to at least 320px, but allow it to shrink if near the right edge
      const minW = 320;
      panel.style.minWidth = minW + 'px';
      // Compute left/top based on viewport coordinates (fixed positioning)
      let left = rect.left;
      let top = rect.bottom + margin;
      // Adjust if overflowing to the right
      // Temporarily display to measure width if needed
      const prevDisplay = panel.style.display;
      if (prevDisplay === 'none') panel.style.display = 'block';
      const pw = Math.max(panel.offsetWidth || 0, minW);
      if (prevDisplay === 'none') panel.style.display = 'none';
      if (left + pw > window.innerWidth - 12){
        left = Math.max(12, window.innerWidth - pw - 12);
      }
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    }
    setPanelVisible(name, true);
  }
  // If Object tab is selected, ensure Controls GUI is visible
  if (name === 'Object' && typeof window.showControlsGUI === 'function') {
    window.showControlsGUI();
  }
  // update active tab glow
  // first clear across all nav buttons that carry data-tab
  Array.from(document.querySelectorAll('button[data-tab]')).forEach(b => {
    if (b.textContent === name){
      b.dataset.active = '1';
      b.style.background = 'rgba(35,120,200,0.28)';
      b.style.boxShadow = '0 0 10px rgba(0,200,255,0.75), 0 0 24px rgba(0,140,255,0.45)';
    } else {
      delete b.dataset.active;
      b.style.background = 'transparent';
      b.style.boxShadow = '0 0 0px rgba(0,0,0,0)';
      b.style.transform = 'none';
    }
  });
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
  <div style="margin-top:16px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
    <strong>Object Presets</strong>
    <div>
      <input id="scenePresetName" placeholder="Preset name" style="padding:4px 6px; border-radius:4px; border:1px solid #444; background:#111; color:#fff; width:160px;" />
      <button id="sceneSavePresetBtn" style="padding:6px 10px; border:none; border-radius:6px; background:#2a2a2e; color:#fff; cursor:pointer;">Save current</button>
    </div>
  </div>
  <div id="scenePresetRow" style="margin-top:10px; display:flex; gap:10px; overflow-x:auto; padding-bottom:6px;"></div>
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
  // grid now only follows helpers checkbox (showGrid removed)
  grid.visible = checked;
  shadowReceiver.visible = checked;
});

// Scene panel: build object presets grid moved from Home
async function buildScenePresets(){
  const row = scenePanel.querySelector('#scenePresetRow');
  if (!row) return;
  row.innerHTML = '';
  const userPresets = loadUserPresets();
  const allPresets = [...defaultPresets, ...userPresets];
  for (const p of allPresets){
    const card = document.createElement('div');
    card.style.minWidth = '180px';
    card.style.background = 'rgba(255,255,255,0.03)';
    card.style.border = '1px solid rgba(255,255,255,0.1)';
    card.style.borderRadius = '8px';
    card.style.padding = '8px';
    const img = document.createElement('img');
    img.style.width = '100%'; img.style.aspectRatio = '4/3'; img.style.objectFit = 'cover'; img.style.borderRadius = '6px';
    img.src = await createPresetThumbnail(p);
    const title = document.createElement('div');
    title.textContent = p.name; title.style.marginTop = '6px'; title.style.fontWeight = '600';
    const desc = document.createElement('div'); desc.textContent = p.desc || ''; desc.style.opacity = '0.8'; desc.style.fontSize = '12px';
    const addBtn = document.createElement('button'); addBtn.textContent = 'Add';
    addBtn.style.marginTop = '8px'; addBtn.style.width = '100%';
    addBtn.style.padding = '6px 10px'; addBtn.style.border = 'none'; addBtn.style.borderRadius = '6px'; addBtn.style.background = '#2a2a2e'; addBtn.style.color = '#fff';
    addBtn.onclick = () => addObjectFromPreset(p);
    card.appendChild(img); card.appendChild(title); card.appendChild(desc); card.appendChild(addBtn);
    row.appendChild(card);
  }
}

scenePanel.querySelector('#sceneSavePresetBtn').addEventListener('click', async () => {
  const name = scenePanel.querySelector('#scenePresetName').value.trim() || `Preset ${Date.now()}`;
  const rec = getActiveRecord(); if (!rec) return;
  const newPreset = { key: 'user-' + Date.now(), name, desc: '', type: rec.params.objectType, params: { a: rec.params.a, b: rec.params.b, p: rec.params.p, q: rec.params.q, tubeRadius: rec.params.tubeRadius, uSegments: rec.params.uSegments, vSegments: rec.params.vSegments } };
  if (rec.params.magnitude !== undefined) newPreset.params.magnitude = rec.params.magnitude;
  const arr = loadUserPresets(); arr.push(newPreset); saveUserPresets(arr);
  await buildScenePresets();
});

// Initial build
buildScenePresets();

// Stats overlay (bottom-left): vertex & face counts
const APP_VERSION = 'v1.1.3';
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
statsOverlay.innerHTML = `Verts: 0<br/>Faces: 0<br/><span style="display:inline-block;margin-top:4px;font-size:11px;color:#7da6cc;opacity:0.9">${APP_VERSION}</span>`;
document.body.appendChild(statsOverlay);

function updateStats(){
  if (!knotGeometry) {
    statsOverlay.innerHTML = `Verts: 0<br/>Faces: 0<br/><span style="display:inline-block;margin-top:4px;font-size:11px;color:#7da6cc;opacity:0.9">${APP_VERSION}</span>`;
    return;
  }
  const verts = knotGeometry.attributes && knotGeometry.attributes.position ? knotGeometry.attributes.position.count : 0;
  let faces = 0;
  if (knotGeometry.index) faces = Math.floor(knotGeometry.index.count / 3);
  else faces = Math.floor(verts / 3);
  statsOverlay.innerHTML = `Verts: ${verts.toLocaleString()}<br/>Faces: ${faces.toLocaleString()}<br/><span style="display:inline-block;margin-top:4px;font-size:11px;color:#7da6cc;opacity:0.9">${APP_VERSION}</span>`;
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

const { renderer, scene, camera } = createRendererAndScene(container);
scene.background = new THREE.Color(0x0b0f14);
camera.position.set(5, 3, 8);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// Lights
const { ambient, spot } = createLights(scene);

// Ground + shadow receiver
const { ground, shadowReceiver, groundSize } = createBaseGround(scene, renderer);

import { createSea as makeSea } from './grounds/sea.js';
import { createMathSurface as makeMath } from './grounds/math.js';
import { createRoom as makeRoom } from './grounds/room.js';
import { createFunnel as makeFunnel } from './grounds/funnel.js';

let reflector = null;
let seaObj = null; // {mesh, setTime, resize}
let mathObj = null;
let currentGroundStyle = 'Flat';
let roomObj = null; // {mesh, dispose}
let funnelObj = null; // {mesh, dispose}
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
  magnitude: 1.0, // BaskınFoil genislik/genlik parametresi
  materialType: 'Metallic',
  metalness: 0.8,
  roughness: 0.25,
  opacity: 1.0,
  ior: 1.45,
  useTransmission: false,
  useWireframe: true,
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
  mathWireframeColor: '#000000',
  showUCSGizmo: true
};

// Multi-object: in-memory list and helpers
let objects = []; // { id, name, desc, type, params, mesh, wireframe, geometry, material }
let activeId = null;
let nextId = 1;

function updateActiveHeader(rec){
  const r = rec || objects.find(o => o.id === activeId);
  if (!r){ activeInfo.textContent = ''; return; }
  activeInfo.textContent = `Active [#${r.id}] ${r.name}${r.desc ? ' — ' + r.desc : ''}`;
}

function getActiveRecord(){ return objects.find(o => o.id === activeId) || null; }

function setActive(id){
  const rec = objects.find(o => o.id === id);
  if (!rec) return;
  activeId = id;
  // sync GUI params from record
  Object.assign(params, rec.params);
  try { if (typeof gui !== 'undefined') gui.updateDisplay(); } catch(e) {}
  updateActiveHeader(rec);
  // mirror globals for compatibility
  knotMesh = rec.mesh || null;
  wireframeMesh = rec.wireframe || null;
  knotGeometry = rec.geometry || null;
  knotMaterial = rec.material || null;
  updateStats();
  // ensure Controls show
  try { if (window.showControlsGUI) window.showControlsGUI(); } catch(e) {}
}

function addObjectFromPreset(preset){
  const id = nextId++;
  // curated pleasant palette (materialColor, wireframeColor)
  const palette = [
    ['#5fb3ff', '#0a2233'], // bright cyan blue
    ['#ffa646', '#331a00'], // warm orange
    ['#9d7bff', '#1c1433'], // soft violet
    ['#6cf2b7', '#062d20'], // mint green
    ['#ff5f87', '#33000f'], // pinkish red
    ['#ffd76a', '#332600'], // golden yellow
    ['#5ee3ff', '#012b33'], // aqua
    ['#b8ff72', '#1e3300'], // lime soft
    ['#ff9de3', '#330024'], // pastel magenta
    ['#9fffcf', '#003328']  // seafoam
  ];
  const pick = palette[Math.floor(Math.random()*palette.length)];
  const matColor = pick[0];
  const wireColor = pick[1];
  const rec = {
    id,
    name: preset.name || `Object ${id}`,
    desc: preset.desc || '',
    type: preset.type || 'Trefoil',
    params: {
      objectType: preset.type || 'Trefoil',
      a: preset.params?.a ?? params.a,
      b: preset.params?.b ?? params.b,
      p: preset.params?.p ?? params.p,
      q: preset.params?.q ?? params.q,
      tubeRadius: preset.params?.tubeRadius ?? params.tubeRadius,
      uSegments: preset.params?.uSegments ?? params.uSegments,
      vSegments: preset.params?.vSegments ?? params.vSegments,
      magnitude: preset.params?.magnitude ?? params.magnitude,
      // randomized metallic material defaults
      materialType: 'Metallic',
      metalness: 0.9,
      roughness: 0.22,
      opacity: 1.0,
      ior: params.ior,
      useTransmission: false,
      fresnel: params.fresnel,
      materialColor: matColor,
      wireframeColor: wireColor,
      // view
      useWireframe: params.useWireframe,
      posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0
    }
  };
  objects.push(rec);
  setActive(id);
  rebuild();
  refreshObjectsList();
}

function ensureInitialObject(){
  if (objects.length === 0){
    addObjectFromPreset({ name: 'Object 1', desc: 'Initial', type: params.objectType, params: { a: params.a, b: params.b, p: params.p, q: params.q, tubeRadius: params.tubeRadius, uSegments: params.uSegments, vSegments: params.vSegments } });
  }
}

// Presets and storage
const defaultPresets = [
  { key: 'trefoilClassic', name: 'Trefoil Classic', desc: 'p=2,q=3', type: 'Trefoil', params: { a: 2, b: 1, p: 2, q: 3 } },
  { key: 'septafoilTight', name: 'Septafoil Tight', desc: 'p=3,q=7', type: 'Septafoil', params: { a: 1.5, b: 0.8, p: 3, q: 7 } },
  { key: 'torusKnot54', name: 'Trefoil (5,4)', desc: 'p=5,q=4', type: 'Trefoil', params: { a: 2.4, b: 0.9, p: 5, q: 4 } }
];

function loadUserPresets(){
  try { return JSON.parse(localStorage.getItem('tc.userPresets') || '[]'); } catch(e){ return []; }
}
function saveUserPresets(arr){
  try { localStorage.setItem('tc.userPresets', JSON.stringify(arr||[])); } catch(e) {}
}

function saveParamsToActive(){
  const rec = getActiveRecord();
  if (!rec) return;
  rec.params = {
    objectType: params.objectType,
    a: params.a, b: params.b, p: params.p, q: params.q,
    tubeRadius: params.tubeRadius, uSegments: params.uSegments, vSegments: params.vSegments,
  magnitude: params.magnitude,
    materialType: params.materialType, metalness: params.metalness, roughness: params.roughness,
    opacity: params.opacity, ior: params.ior, useTransmission: params.useTransmission,
    fresnel: params.fresnel, materialColor: params.materialColor, wireframeColor: params.wireframeColor,
    useWireframe: params.useWireframe,
    posX: params.posX, posY: params.posY, posZ: params.posZ,
    rotX: params.rotX, rotY: params.rotY, rotZ: params.rotZ
  };
}

function createPresetThumbnail(preset){
  return new Promise((resolve) => {
    try {
      const w = 160, h = 120;
      const renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer2.setSize(w, h);
      const scn = new THREE.Scene();
      scn.background = null;
      const cam = new THREE.PerspectiveCamera(45, w/h, 0.1, 100);
      cam.position.set(3, 2, 4);
      cam.lookAt(0,0,0);
      let geo;
      if (preset.type === 'BaskınFoil') {
        // Basit ribbon geometry thumbnail (düşük segment)
        const a = preset.params?.a ?? 2;
        const b = preset.params?.b ?? 1;
        const p = preset.params?.p ?? 2;
        const q = preset.params?.q ?? 3;
        const mag = preset.params?.magnitude ?? 1.0;
        const segs = 180;
        const halfW = 0.15 * mag;
        const positions = new Float32Array(segs * 2 * 3);
        const indices = [];
        function curvePos(t){
          const ct = Math.cos(t), st = Math.sin(t);
          const x = (a + b * Math.cos(q * t)) * Math.cos(p * t);
          const y = (a + b * Math.cos(q * t)) * Math.sin(p * t);
          const z = b * Math.sin(q * t);
          return new THREE.Vector3(x, z, y); // z-y swap for nicer orientation
        }
        const tangents = [];
        const pts = [];
        for(let i=0;i<segs;i++){ const t = (i/segs)*Math.PI*2; pts.push(curvePos(t)); }
        for(let i=0;i<segs;i++){ const p0 = pts[i]; const p1 = pts[(i+1)%segs]; tangents.push(new THREE.Vector3().subVectors(p1,p0).normalize()); }
        for(let i=0;i<segs;i++){
          const pnt = pts[i];
          const tan = tangents[i];
            // simple normal approximation
          const up = new THREE.Vector3(0,1,0);
          let side = new THREE.Vector3().crossVectors(up, tan).normalize();
          if (side.lengthSq() < 1e-5) side = new THREE.Vector3(1,0,0);
          const left = new THREE.Vector3().addVectors(pnt, side.clone().multiplyScalar(-halfW));
          const right = new THREE.Vector3().addVectors(pnt, side.clone().multiplyScalar(halfW));
          positions.set([left.x,left.y,left.z], i*6 + 0);
          positions.set([right.x,right.y,right.z], i*6 + 3);
          const i2 = (i+1)%segs;
          indices.push(i*2, i*2+1, i2*2);
          indices.push(i*2+1, i2*2+1, i2*2);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        g.setIndex(indices);
        g.computeVertexNormals();
        geo = g;
      } else {
        const curve = (preset.type === 'Septafoil')
          ? new SeptafoilCurve(preset.params?.a ?? 2, preset.params?.b ?? 1, preset.params?.p ?? 2, preset.params?.q ?? 3)
          : new TrefoilCurve(preset.params?.a ?? 2, preset.params?.b ?? 1, preset.params?.p ?? 2, preset.params?.q ?? 3);
        geo = new THREE.TubeGeometry(curve, 200, preset.params?.tubeRadius ?? 0.25, 16, true);
      }
      if (geo.center) geo.center();
      const mat = new THREE.MeshBasicMaterial({ color: 0x9fbfff, wireframe: false });
      const mesh = new THREE.Mesh(geo, mat);
      scn.add(mesh);
      const light = new THREE.AmbientLight(0xffffff, 1.0);
      scn.add(light);
      renderer2.render(scn, cam);
      const url = renderer2.domElement.toDataURL('image/png');
      // cleanup
      geo.dispose(); mat.dispose(); renderer2.dispose();
      resolve(url);
    } catch(e){ resolve(''); }
  });
}

function buildHomeUI(){
  const home = panels['Home'];
  if (!home) return;
  home.innerHTML = `
    <div style="margin-top:4px;"><strong>Objects</strong></div>
    <div id="objectsList" style="margin-top:6px; display:flex; flex-direction:column; gap:6px;"></div>
    <div style="margin-top:10px; font-size:12px; opacity:0.85;">Presets taşındı: Scene menüsü altından erişebilirsiniz.</div>
  `;
  refreshObjectsList();
}

function refreshObjectsList(){
  const el = panels['Home']?.querySelector('#objectsList');
  if (!el) return;
  el.innerHTML = '';
  objects.forEach((o) => {
    const row = document.createElement('div');
    row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px';
    const btn = document.createElement('button'); btn.textContent = `#${o.id} ${o.name}`; btn.style.flex = '1'; btn.style.padding = '6px 8px'; btn.style.border = 'none'; btn.style.borderRadius = '6px'; btn.style.background = (o.id===activeId?'#3a3a3f':'#2a2a2e'); btn.style.color='#fff';
    btn.onclick = () => { setActive(o.id); };
    const del = document.createElement('button'); del.textContent = '✕'; del.style.padding='6px 8px'; del.style.border='none'; del.style.borderRadius='6px'; del.style.background='#512'; del.style.color='#fff';
    del.onclick = () => {
      // remove meshes from scene
      if (o.wireframe){ try { o.wireframe.geometry.dispose(); o.wireframe.material.dispose(); } catch(e){} if (o.wireframe.parent) o.wireframe.parent.remove(o.wireframe); }
      if (o.mesh){ try { o.mesh.geometry.dispose(); o.mesh.material.dispose(); } catch(e){} if (o.mesh.parent) o.mesh.parent.remove(o.mesh); }
      objects = objects.filter(x => x.id !== o.id);
      if (activeId === o.id){ activeId = objects[0]?.id ?? null; setActive(activeId); }
      refreshObjectsList(); updateStats();
    };
    row.appendChild(btn); row.appendChild(del);
    el.appendChild(row);
  });
}

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

// UCS Gizmo (corner axes) overlay
let ucsScene = null;
let ucsCamera = null;
let ucsAxes = null;
let ucsGroup = null;
let ucsPickables = [];
let ucsHover = null;
let ucsRaycaster = null;
let ucsTween = null; // {start,duration,fromPos,fromQuat,toPos,toQuat}
const UCS_SIZE = 96; // pixels
const UCS_RECT = { x: 10, y: 10, size: UCS_SIZE };

function initUCS(){
  if (ucsScene) return;
  ucsScene = new THREE.Scene();
  ucsCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
  ucsCamera.position.set(0,0,3);
  ucsRaycaster = new THREE.Raycaster();

  // Root group that holds axes lines and click discs
  ucsGroup = new THREE.Group();
  ucsScene.add(ucsGroup);

  // Axes lines (helper)
  ucsAxes = new THREE.AxesHelper(1.2);
  const axesMat = ucsAxes.material; // LineBasicMaterial
  axesMat.depthTest = false;
  ucsAxes.renderOrder = 999;
  ucsGroup.add(ucsAxes);

  // Utility to create a text sprite (letter)
  function makeLetterSprite(letter, color){
    const size = 64;
    const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,size,size);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = color; ctx.shadowBlur = 8;
    ctx.fillText(letter, size/2, size/2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sp = new THREE.Sprite(mat);
    sp.scale.set(0.45, 0.45, 1);
    sp.renderOrder = 1000;
    return sp;
  }

  // Create clickable discs at axis ends
  function addAxisDisc(axis, color, pos){
    const discG = new THREE.CircleGeometry(0.22, 40);
    const discM = new THREE.MeshBasicMaterial({ color, depthTest: false });
    const disc = new THREE.Mesh(discG, discM);
    disc.position.copy(pos);
    disc.renderOrder = 1000;
    disc.userData.axis = axis;
    // subtle outline ring
    const ringG = new THREE.RingGeometry(0.24, 0.26, 40);
    const ringM = new THREE.MeshBasicMaterial({ color: 0x111111, depthTest: false });
    const ring = new THREE.Mesh(ringG, ringM);
    ring.position.copy(pos);
    ring.renderOrder = 999;
    // label sprite
    const letter = axis;
    const letterSprite = makeLetterSprite(letter, color);
    letterSprite.position.copy(pos.clone().add(new THREE.Vector3(0,0,0.001)));
    ucsGroup.add(ring);
    ucsGroup.add(disc);
    ucsGroup.add(letterSprite);
    ucsPickables.push(disc);
    return disc;
  }

  addAxisDisc('X', 0xff4444, new THREE.Vector3(1.2, 0, 0));
  addAxisDisc('Y', 0x66cc44, new THREE.Vector3(0, 1.2, 0));
  addAxisDisc('Z', 0x2a7fff, new THREE.Vector3(0, 0, 1.2));
}

function toggleUCSGizmo(v){
  params.showUCSGizmo = v;
  if (v && !ucsScene) initUCS();
}

// Snap camera to axis (Blender-like); hold Shift for negative direction
function snapViewToAxis(axis, negative){
  const dir = new THREE.Vector3(
    axis === 'X' ? 1 : 0,
    axis === 'Y' ? 1 : 0,
    axis === 'Z' ? 1 : 0
  );
  if (negative) dir.multiplyScalar(-1);
  const target = controls ? controls.target.clone() : new THREE.Vector3(0,0,0);
  const dist = camera.position.distanceTo(target) || 5;
  const toPos = target.clone().add(dir.multiplyScalar(dist));
  // choose up vector: prefer Z-up except when looking along Z
  const up = (axis === 'Z') ? new THREE.Vector3(0,1,0) : new THREE.Vector3(0,0,1);

  // compute target quaternion from lookAt
  const m = new THREE.Matrix4();
  m.lookAt(toPos, target, up);
  const toQuat = new THREE.Quaternion().setFromRotationMatrix(m).invert();

  // tween setup
  ucsTween = {
    start: performance.now(),
    duration: 350,
    fromPos: camera.position.clone(),
    fromQuat: camera.quaternion.clone(),
    toPos,
    toQuat
  };
}

// Pointer helpers for UCS area
function getPointerInUCS(event){
  const rect = renderer.domElement.getBoundingClientRect();
  const px = event.clientX - rect.left;
  const pyFromBottom = rect.bottom - event.clientY; // bottom-origin
  const { x, y, size } = UCS_RECT;
  const inside = (px >= x && px <= x + size && pyFromBottom >= y && pyFromBottom <= y + size);
  if (!inside) return null;
  const nx = ((px - x) / size) * 2 - 1;
  const ny = ((pyFromBottom - y) / size) * 2 - 1;
  return { ndc: new THREE.Vector2(nx, ny) };
}

function handleUCSPointerMove(event){
  if (!params.showUCSGizmo || !ucsScene) return;
  const hit = getPointerInUCS(event);
  if (!hit){
    if (ucsHover){ ucsHover.scale.set(1,1,1); ucsHover = null; renderer.domElement.style.cursor = 'default'; }
    return;
  }
  ucsRaycaster.setFromCamera(hit.ndc, ucsCamera);
  const isects = ucsRaycaster.intersectObjects(ucsPickables, false);
  if (isects.length){
    const obj = isects[0].object;
    if (ucsHover && ucsHover !== obj) ucsHover.scale.set(1,1,1);
    ucsHover = obj;
    ucsHover.scale.set(1.2,1.2,1.2);
    renderer.domElement.style.cursor = 'pointer';
  } else {
    if (ucsHover){ ucsHover.scale.set(1,1,1); ucsHover = null; }
    renderer.domElement.style.cursor = 'default';
  }
}

function handleUCSPointerDown(event){
  if (!params.showUCSGizmo || !ucsScene) return;
  const hit = getPointerInUCS(event);
  if (!hit) return;
  ucsRaycaster.setFromCamera(hit.ndc, ucsCamera);
  const isects = ucsRaycaster.intersectObjects(ucsPickables, false);
  if (isects.length){
    event.preventDefault();
    const axis = isects[0].object.userData.axis;
    const negative = !!event.shiftKey;
    snapViewToAxis(axis, negative);
  }
}

renderer.domElement.addEventListener('pointermove', handleUCSPointerMove);
renderer.domElement.addEventListener('pointerdown', handleUCSPointerDown);

// Setup GUI menu (objectType at the top)
const { gui, viewFolder } = setupGUI(
  params,
  rebuild,
  updateMaterial,
  toggleReflection,
  toggleWireframe,
  applyTransform,
  knotMaterial,
  wireframeMesh,
  spot,
  ambient,
  reflector,
  saveParamsToActive,
  toggleUCSGizmo
);

// Do not show GUI on first launch; persist user's last choice
let guiVisible = true;
const guiPref = localStorage.getItem('tc_gui_open');
if (guiPref === null || guiPref === '0') {
  gui.domElement.style.display = 'none';
  guiVisible = false;
}
function setGUIVisible(v){
  guiVisible = !!v;
  gui.domElement.style.display = guiVisible ? '' : 'none';
  localStorage.setItem('tc_gui_open', guiVisible ? '1' : '0');
}

// Environment panel: add a simple toggle to open/close Advanced Controls (GUI)
if (envPanel) {
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.alignItems = 'center';
  row.style.gap = '8px';
  row.style.marginBottom = '8px';
  const label = document.createElement('label');
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.checked = guiVisible;
  chk.addEventListener('change', () => setGUIVisible(chk.checked));
  label.appendChild(chk);
  label.append(' Advanced Controls (GUI)');
  row.appendChild(label);
  // insert at top of the Environment panel
  envPanel.insertBefore(row, envPanel.firstChild);
}

// Initialize keyboard controls after GUI and helpers are available
const disposeKeyboard = setupKeyboardControls({ params, getActiveRecord, applyTransform, rebuild, saveParamsToActive, gui });

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
viewFolder.add(params, 'autoRotate').onChange((v) => { controls.autoRotate = v; saveParamsToActive(); });
viewFolder.add(params, 'rotationSpeed', 0, 2, 0.01).onChange((v) => { controls.autoRotateSpeed = v * 10; saveParamsToActive(); });

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
  // Sadece aktif objenin mesh/wireframe'ini güncelle
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
  let isFoil = false;
  if (params.objectType === 'BaskınFoil') {
    isFoil = true;
    // Create variable-width ribbon along torus-like curve
    const segs = uSeg;
    const halfWBase = 0.2 * (params.magnitude ?? 1.0);
    const positions = new Float32Array(segs * 2 * 3);
    const indices = [];
    function curvePos(t){
      const a = params.a, b = params.b, p = params.p, q = params.q;
      const x = (a + b * Math.cos(q * t)) * Math.cos(p * t);
      const y = (a + b * Math.cos(q * t)) * Math.sin(p * t);
      const z = b * Math.sin(q * t);
      return new THREE.Vector3(x, z, y); // y<->z değişikliği görsel oryantasyon için
    }
    const pts = []; const tangents = [];
    for(let i=0;i<segs;i++){ const t = (i/segs)*Math.PI*2; pts.push(curvePos(t)); }
    for(let i=0;i<segs;i++){ const p0 = pts[i]; const p1 = pts[(i+1)%segs]; tangents.push(new THREE.Vector3().subVectors(p1,p0).normalize()); }
    for(let i=0;i<segs;i++){
      const t = (i/segs);
      // width modulation sin tabanlı - magnitude etkisi
      const widthMod = (Math.sin(t*Math.PI*2*params.q) * 0.5 + 0.5); // 0..1
      const halfW = halfWBase * (0.25 + 0.75*widthMod);
      const pnt = pts[i];
      const tan = tangents[i];
      let up = new THREE.Vector3(0,1,0);
      // up eğer tan'a çok paralel ise farklı eksen seç
      if (Math.abs(tan.dot(up)) > 0.95) up = new THREE.Vector3(1,0,0);
      let side = new THREE.Vector3().crossVectors(up, tan).normalize();
      if (side.lengthSq() < 1e-5) side = new THREE.Vector3(1,0,0);
      const left = new THREE.Vector3().addVectors(pnt, side.clone().multiplyScalar(-halfW));
      const right = new THREE.Vector3().addVectors(pnt, side.clone().multiplyScalar(halfW));
      positions.set([left.x,left.y,left.z], i*6 + 0);
      positions.set([right.x,right.y,right.z], i*6 + 3);
      const i2 = (i+1)%segs;
      indices.push(i*2, i*2+1, i2*2);
      indices.push(i*2+1, i2*2+1, i2*2);
    }
    knotGeometry = new THREE.BufferGeometry();
    knotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    knotGeometry.setIndex(indices);
    knotGeometry.computeVertexNormals();
  } else {
    if (params.objectType === 'Septafoil'){
      curve = new SeptafoilCurve(params.a, params.b, params.p, params.q);
    } else {
      curve = new TrefoilCurve(params.a, params.b, params.p, params.q);
    }
    knotGeometry = new THREE.TubeGeometry(curve, uSeg, params.tubeRadius, params.vSegments, true);
  }
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

  // --- Apply 6-axis transform from active object's params (not just zero) ---
  // If available, use the active object's params for transform
  let rec = getActiveRecord && getActiveRecord();
  let px = params.posX, py = params.posY, pz = params.posZ, rx = params.rotX, ry = params.rotY, rz = params.rotZ;
  if (rec && rec.params) {
    px = rec.params.posX ?? px;
    py = rec.params.posY ?? py;
    pz = rec.params.posZ ?? pz;
    rx = rec.params.rotX ?? rx;
    ry = rec.params.rotY ?? ry;
    rz = rec.params.rotZ ?? rz;
  }
  knotMesh.position.set(px, py, pz);
  knotMesh.rotation.set(THREE.MathUtils.degToRad(rx), THREE.MathUtils.degToRad(ry), THREE.MathUtils.degToRad(rz));

  scene.add(knotMesh);

  // Keep camera fixed across rebuilds; just aim light
  if (knotGeometry && knotGeometry.boundingSphere){
    const radius = knotGeometry.boundingSphere.radius;
    const upOffset = radius * 2.0 * 0.3; // raise object above ground proportionally
    // Optionally, you can add upOffset to py if you want to keep the object above ground
    // knotMesh.position.y += upOffset;
    spot.target.position.copy(knotMesh.position);
  }

  // wireframe overlay as child of knotMesh so centers/d transforms match exactly
  if (!isFoil) { // foil için wireframe çok karmaşık görünebilir, isteğe bağlı ileride eklenir
    const geo2 = new THREE.WireframeGeometry(knotGeometry);
    const mat2 = new THREE.LineBasicMaterial({ color: new THREE.Color(params.wireframeColor), transparent: true, opacity: 0.6 });
    wireframeMesh = new THREE.LineSegments(geo2, mat2);
    wireframeMesh.renderOrder = 1;
    knotMesh.add(wireframeMesh);
    wireframeMesh.visible = params.useWireframe;
  } else {
    wireframeMesh = null;
  }

  toggleWireframe(params.useWireframe);
  // update vertex/face stats
  updateStats();

  // Aktif objenin kaydına mesh, geometry, material referanslarını güncelle
  const rec2 = getActiveRecord && getActiveRecord();
  if (rec2) {
    rec2.mesh = knotMesh;
    rec2.geometry = knotGeometry;
    rec2.material = knotMaterial;
    rec2.wireframe = wireframeMesh;
  }
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
  saveParamsToActive();
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
// initialize grid visibility (helpers off by default)
grid.visible = false;


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
  if (mathObj){
    if (mathObj.wireframe) scene.remove(mathObj.wireframe);
    scene.remove(mathObj.mesh); mathObj.dispose(); mathObj = null;
  }
  if (roomObj){ scene.remove(roomObj.mesh); roomObj.dispose?.(); roomObj = null; }
  if (funnelObj){ scene.remove(funnelObj.mesh); funnelObj.dispose?.(); funnelObj = null; }
  if (reflector) { reflector.visible = false; }
  ground.visible = false;

  if (style === 'Flat'){
    ground.visible = true;
    ground.receiveShadow = true;
    shadowReceiver.visible = true; // project soft shadow onto flat plane
    if (!scene.children.includes(shadowReceiver)) scene.add(shadowReceiver);
  } else if (style === 'Sea'){
    seaObj = makeSea(ground.position.y);
    // enlarge sea coverage to feel like an infinite plane
    seaObj.mesh.scale.set(8,8,8);
    scene.add(seaObj.mesh);
    // Let shadow fall onto the sea surface itself
    shadowReceiver.visible = false;
    ground.visible = false;
  } else if (style === 'Math'){
    mathObj = makeMath(ground.position.y);
    scene.add(mathObj.mesh);
    if (mathObj.wireframe) scene.add(mathObj.wireframe);
    // Sadece matematiksel yüzey gölge alacak, planar shadowReceiver gizlenir
    shadowReceiver.visible = false;
    ground.visible = false;
    if (mathObj.mesh) mathObj.mesh.receiveShadow = true;
  } else if (style === 'Room'){
    roomObj = makeRoom(ground.position.y);
    scene.add(roomObj.mesh);
    // Keep the flat ground in the room and project shadow onto it
    ground.visible = true;
    shadowReceiver.visible = true;
    if (!scene.children.includes(shadowReceiver)) scene.add(shadowReceiver);
  } else if (style === 'Funnel'){
    funnelObj = makeFunnel(ground.position.y);
    scene.add(funnelObj.mesh);
    // Shadow should fall onto the funnel surface, not the flat plane
    ground.visible = false;
    shadowReceiver.visible = false;
  }
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
  if (seaObj && seaObj.resize){
    seaObj.resize(window.innerWidth, window.innerHeight);
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

  // Render UCS corner gizmo
  if (params.showUCSGizmo){
    if (!ucsScene) initUCS();
    // Align UCS camera to main camera orientation
    ucsCamera.quaternion.copy(camera.quaternion);
    // run tween if active
    if (ucsTween){
      const nowMs = performance.now();
      const t = Math.min(1, (nowMs - ucsTween.start) / ucsTween.duration);
      camera.position.lerpVectors(ucsTween.fromPos, ucsTween.toPos, t);
      THREE.Quaternion.slerp(ucsTween.fromQuat, ucsTween.toQuat, camera.quaternion, t);
      if (t >= 1) ucsTween = null;
      if (controls) controls.update();
    }
    // prepare viewport/scissor in bottom-left corner
    const size = UCS_SIZE;
    const px = UCS_RECT.x, py = UCS_RECT.y;
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.setScissorTest(true);
    renderer.setScissor(px, py, size, size);
    renderer.setViewport(px, py, size, size);
    renderer.render(ucsScene, ucsCamera);
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.autoClear = true;
  }
  // update stats per-frame to reflect any realtime changes
  updateStats();
}

// İlk obje kaydı oluşturulmadan rebuild yapılıyordu; bu da 'kontrol edilemeyen gizli obje' hissi veriyordu.
// Önce ensureInitialObject() ile Object 1'i yaratıyoruz; addObjectFromPreset zaten rebuild çağırıyor.
ensureInitialObject();
animate();

// --- Raycaster-based object selection and highlight ---
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (event) => {
  // Only left click
  if (event.button !== 0) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  // Collect all meshes for objects
  const meshes = objects.map(o => o.mesh).filter(Boolean);
  const intersects = raycaster.intersectObjects(meshes, false);
  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    const rec = objects.find(o => o.mesh === mesh);
    if (rec) {
      setActive(rec.id);
      // Highlight: store original color, set highlight, revert after 0.5s
      const mat = mesh.material;
      if (mat && mat.color) {
        const orig = mat.color.getHex();
        mat.color.set('#ffe066');
        setTimeout(() => {
          // Only revert if still same active object
          if (objects.find(o => o.mesh === mesh)) {
            mat.color.set(orig);
          }
        }, 500);
      }
    }
  }
});

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
// Home UI'yi kur (obje zaten oluşturuldu)
buildHomeUI();
// allow language selection and modal viewing
panels['About'].innerHTML = `
  <div id="aboutLocale">
    <label>Language: </label>
    <select id="aboutLang"><option value="en">English</option><option value="tr">Türkçe</option></select>
  </div>
  <div style="margin-top:8px; font-size:11px; color:#7da6cc;">
    <strong>Version:</strong> 1.1.3 — ${new Date().toISOString().split('T')[0]}
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

// --- Touch 6-axis Transform Gizmo (Mobile/Tablet) ---
function isTouchDevice(){
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

let gizmoRoot = null;
let gizmoVisible = true;
const moveStepBase = 0.1;
const rotStep = 5; // degrees
let repeatTimer = null;

function applyAndSaveTransform(){
  saveParamsToActive();
  applyTransform();
  try { gui.updateDisplay(); } catch(e){}
}

function buildTouchGizmo(){
  if (gizmoRoot) return;
  gizmoRoot = document.createElement('div');
  gizmoRoot.style.position = 'fixed';
  // restore saved position if any
  const savedPos = JSON.parse(localStorage.getItem('tc_gizmo_pos')||'null');
  if (savedPos && typeof savedPos.x==='number' && typeof savedPos.y==='number'){
    gizmoRoot.style.left = savedPos.x + 'px';
    gizmoRoot.style.top = savedPos.y + 'px';
  } else {
    gizmoRoot.style.right = '12px';
    gizmoRoot.style.bottom = '12px';
  }
  gizmoRoot.style.zIndex = '1500';
  gizmoRoot.style.display = 'flex';
  gizmoRoot.style.flexDirection = 'column';
  gizmoRoot.style.gap = '6px';
  gizmoRoot.style.pointerEvents = 'auto';

  // DRAG HANDLE
  const dragBar = document.createElement('div');
  dragBar.textContent = '⇕ Gizmo';
  dragBar.style.cursor = 'move';
  dragBar.style.userSelect = 'none';
  dragBar.style.fontSize = '11px';
  dragBar.style.letterSpacing = '0.5px';
  dragBar.style.padding = '4px 10px 4px 10px';
  dragBar.style.alignSelf = 'stretch';
  dragBar.style.background = 'linear-gradient(90deg,#20262e,#1a1f25)';
  dragBar.style.border = '1px solid rgba(255,255,255,0.08)';
  dragBar.style.borderRadius = '10px 10px 0 0';
  dragBar.style.color = '#9fd6ff';
  dragBar.style.fontWeight = '600';
  dragBar.style.textShadow = '0 0 6px rgba(0,180,255,0.55)';
  dragBar.style.backdropFilter = 'blur(6px)';

  let dragState = null; // {ox, oy, sx, sy, hadExplicit}
  const startDrag = (clientX, clientY) => {
    const rect = gizmoRoot.getBoundingClientRect();
    dragState = { ox: clientX, oy: clientY, sx: rect.left, sy: rect.top, hadExplicit: gizmoRoot.style.left!=='' || gizmoRoot.style.top!=='' };
    // if anchored by right/bottom, convert to left/top
    if (!dragState.hadExplicit){
      gizmoRoot.style.left = rect.left + 'px';
      gizmoRoot.style.top = rect.top + 'px';
      gizmoRoot.style.right = 'auto';
      gizmoRoot.style.bottom = 'auto';
    }
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDragMove, { passive:false });
    document.addEventListener('touchend', endDrag);
  };
  const onDragMove = (e) => {
    if (!dragState) return;
    let cx, cy;
    if (e.touches && e.touches.length){ cx = e.touches[0].clientX; cy = e.touches[0].clientY; e.preventDefault(); }
    else { cx = e.clientX; cy = e.clientY; }
    const dx = cx - dragState.ox; const dy = cy - dragState.oy;
    let nx = dragState.sx + dx; let ny = dragState.sy + dy;
    // clamp inside viewport
    const maxX = window.innerWidth - 40; const maxY = window.innerHeight - 40;
    nx = Math.min(Math.max(-5, nx), maxX);
    ny = Math.min(Math.max(-5, ny), maxY);
    gizmoRoot.style.left = nx + 'px';
    gizmoRoot.style.top = ny + 'px';
  };
  const endDrag = () => {
    if (dragState){
      // persist
      const rect = gizmoRoot.getBoundingClientRect();
      localStorage.setItem('tc_gizmo_pos', JSON.stringify({ x: rect.left, y: rect.top }));
    }
    dragState = null;
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', endDrag);
  };
  dragBar.addEventListener('mousedown', (e)=>{ startDrag(e.clientX, e.clientY); });
  dragBar.addEventListener('touchstart', (e)=>{ if (e.touches && e.touches.length){ startDrag(e.touches[0].clientX, e.touches[0].clientY); } });

  const panel = document.createElement('div');
  panel.style.display = 'grid';
  panel.style.gridTemplateColumns = 'repeat(3, 56px)';
  panel.style.gap = '6px';
  panel.style.padding = '10px';
  panel.style.background = 'rgba(15,15,20,0.88)';
  panel.style.backdropFilter = 'blur(6px)';
  panel.style.border = '1px solid rgba(255,255,255,0.12)';
  panel.style.borderRadius = '0 0 10px 10px';
  panel.style.fontFamily = 'var(--tc-font, system-ui)';
  panel.style.boxShadow = '0 4px 18px -4px rgba(0,0,0,0.6)';

  function makeBtn(label, color){
    const b = document.createElement('button');
    b.textContent = label;
    b.style.padding = '10px 4px';
    b.style.fontSize = '12px';
    b.style.fontWeight = '600';
    b.style.background = color || '#2a2f38';
    b.style.color = '#fff';
    b.style.border = 'none';
    b.style.borderRadius = '6px';
    b.style.cursor = 'pointer';
    b.style.touchAction = 'manipulation';
    b.style.position = 'relative';
    b.style.boxShadow = '0 0 0px rgba(0,180,255,0.0), 0 0 0px rgba(255,255,255,0.0)';
    b.style.transition = 'box-shadow 0.25s ease, transform 0.15s ease, filter 0.2s';
    b.addEventListener('mouseenter', ()=>{ b.style.boxShadow='0 0 8px rgba(0,200,255,0.65), 0 0 18px rgba(0,120,255,0.35)'; });
    b.addEventListener('mouseleave', ()=>{ b.style.boxShadow='0 0 0px rgba(0,180,255,0.0)'; });
    const pressOn = ()=>{ b.style.transform='translateY(1px) scale(0.97)'; b.style.boxShadow='0 0 14px rgba(0,220,255,0.9), 0 0 28px rgba(0,150,255,0.55)'; };
    const pressOff = ()=>{ b.style.transform='translateY(0) scale(1)'; b.style.boxShadow='0 0 8px rgba(0,200,255,0.65), 0 0 18px rgba(0,120,255,0.35)'; };
    b.addEventListener('mousedown', pressOn);
    b.addEventListener('mouseup', pressOff);
    b.addEventListener('mouseleave', ()=>{ b.style.transform='translateY(0) scale(1)'; });
    b.addEventListener('touchstart', (ev)=>{ ev.preventDefault(); b.style.filter='brightness(1.25)'; });
    b.addEventListener('touchend', ()=>{ b.style.filter='none'; });
    return b;
  }

  function handleAction(fn){
    fn();
    clearInterval(repeatTimer);
    repeatTimer = setInterval(fn, 120);
  }
  function stopRepeat(){ clearInterval(repeatTimer); repeatTimer=null; }

  const actions = [
    { label:'X+', fn:()=>{ params.posX += moveStepBase; applyAndSaveTransform(); } },
    { label:'X-', fn:()=>{ params.posX -= moveStepBase; applyAndSaveTransform(); } },
    { label:'Y+', fn:()=>{ params.posY += moveStepBase; applyAndSaveTransform(); } },
    { label:'Y-', fn:()=>{ params.posY -= moveStepBase; applyAndSaveTransform(); } },
    { label:'Z+', fn:()=>{ params.posZ += moveStepBase; applyAndSaveTransform(); } },
    { label:'Z-', fn:()=>{ params.posZ -= moveStepBase; applyAndSaveTransform(); } },
    { label:'RX+', fn:()=>{ params.rotX = (params.rotX + rotStep)%360; applyAndSaveTransform(); } },
    { label:'RX-', fn:()=>{ params.rotX = (params.rotX - rotStep)%360; applyAndSaveTransform(); } },
    { label:'RY+', fn:()=>{ params.rotY = (params.rotY + rotStep)%360; applyAndSaveTransform(); } },
    { label:'RY-', fn:()=>{ params.rotY = (params.rotY - rotStep)%360; applyAndSaveTransform(); } },
    { label:'RZ+', fn:()=>{ params.rotZ = (params.rotZ + rotStep)%360; applyAndSaveTransform(); } },
    { label:'RZ-', fn:()=>{ params.rotZ = (params.rotZ - rotStep)%360; applyAndSaveTransform(); } }
  ];

  actions.forEach(a=>{
    const b = makeBtn(a.label);
    b.addEventListener('mousedown', ()=>handleAction(a.fn));
    b.addEventListener('mouseup', stopRepeat);
    b.addEventListener('mouseleave', stopRepeat);
    b.addEventListener('touchstart', ()=>handleAction(a.fn));
    b.addEventListener('touchend', stopRepeat);
    b.addEventListener('touchcancel', stopRepeat);
    panel.appendChild(b);
  });

  const toggle = document.createElement('button');
  toggle.textContent = 'Gizmo Hide';
  toggle.style.marginTop = '6px';
  toggle.style.padding = '8px 10px';
  toggle.style.border = 'none';
  toggle.style.background = '#444';
  toggle.style.color = '#fff';
  toggle.style.borderRadius = '6px';
  toggle.style.cursor = 'pointer';
  toggle.addEventListener('click', ()=>{
    gizmoVisible = !gizmoVisible;
    panel.style.display = gizmoVisible ? 'grid' : 'none';
    toggle.textContent = gizmoVisible ? 'Gizmo Hide' : 'Gizmo Show';
  });

  gizmoRoot.appendChild(dragBar);
  gizmoRoot.appendChild(panel);
  gizmoRoot.appendChild(toggle);
  document.body.appendChild(gizmoRoot);
}

if (isTouchDevice()){
  buildTouchGizmo();
}

