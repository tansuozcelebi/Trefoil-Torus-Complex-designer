import * as THREE from 'three';
import { buildShapeGeometry, SHAPE_PARAM_DEFAULTS, SHAPE_PARAM_KEYS } from '../objects/shapes.js';

// Default presets
export const defaultPresets = [
  { key: 'trefoilClassic', name: 'Trefoil Classic', desc: 'p=2,q=3', type: 'Trefoil', params: { a: 2, b: 1, p: 2, q: 3, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } },
  { key: 'septafoilTight', name: 'Septafoil Tight', desc: 'p=3,q=7', type: 'Septafoil', params: { a: 1.5, b: 0.8, p: 3, q: 7, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } },
  { key: 'torusKnot54', name: 'Trefoil (5,4)', desc: 'p=5,q=4', type: 'Trefoil', params: { a: 2.4, b: 0.9, p: 5, q: 4, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } },
  { key: 'trefoilJointed', name: 'Jointed Trefoil', desc: '6 joints, weight 0.6', type: 'Trefoil', params: { a: 2, b: 1, p: 2, q: 3, tubeRadius: 0.28, jointWeight: 0.6, jointCount: 6, jointSharpness: 3.5, jointOffset: 0, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } }
];

// User presets storage
export function loadUserPresets(){
  try { return JSON.parse(localStorage.getItem('tc.userPresets') || '[]'); } catch(e){ return []; }
}

export function saveUserPresets(arr){
  try { localStorage.setItem('tc.userPresets', JSON.stringify(arr||[])); } catch(e) {}
}

// Create preset thumbnail. One shared offscreen renderer is reused for every
// thumbnail: creating a WebGL context per card can exhaust the browser's context
// limit and drop the main scene's context.
let _thumbRenderer = null;
function thumbRenderer(w, h){
  if (!_thumbRenderer){
    _thumbRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  }
  _thumbRenderer.setSize(w, h, false);
  return _thumbRenderer;
}

function ribbonThumbGeometry(P){
  const a = P.a ?? 2, b = P.b ?? 1, p = P.p ?? 2, q = P.q ?? 3, mag = P.magnitude ?? 1.0;
  const segs = 180, halfW = 0.15 * mag;
  const positions = new Float32Array(segs * 2 * 3);
  const indices = [];
  const pts = [];
  for (let i = 0; i < segs; i++){
    const t = (i / segs) * Math.PI * 2;
    pts.push(new THREE.Vector3((a + b * Math.cos(q * t)) * Math.cos(p * t), b * Math.sin(q * t), (a + b * Math.cos(q * t)) * Math.sin(p * t)));
  }
  for (let i = 0; i < segs; i++){
    const tan = new THREE.Vector3().subVectors(pts[(i + 1) % segs], pts[i]).normalize();
    let side = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
    if (side.lengthSq() < 1e-5) side = new THREE.Vector3(1, 0, 0);
    const l = pts[i].clone().addScaledVector(side, -halfW), r = pts[i].clone().addScaledVector(side, halfW);
    positions.set([l.x, l.y, l.z], i * 6); positions.set([r.x, r.y, r.z], i * 6 + 3);
    const i2 = (i + 1) % segs;
    indices.push(i * 2, i * 2 + 1, i2 * 2, i * 2 + 1, i2 * 2 + 1, i2 * 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

export async function createPresetThumbnail(preset){
  try {
    const w = 160, h = 120;
    const P = { a: 2, b: 1, p: 2, q: 3, tubeRadius: 0.25, vSegments: 10, ...SHAPE_PARAM_DEFAULTS, ...(preset.params || {}), objectType: preset.type || 'Trefoil' };
    let geo;
    if (P.objectType === 'BaskınFoil') geo = ribbonThumbGeometry(P);
    else geo = buildShapeGeometry(P, { uSegments: 180, surfSegments: 40, resolution: 28 }).geometry;
    // fit the shape into a fixed-size frame
    geo.center();
    geo.computeBoundingSphere();
    const s = 1.7 / (geo.boundingSphere.radius || 1);
    const scn = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    cam.position.set(3, 2, 4);
    cam.lookAt(0, 0, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x5fb3ff, metalness: 0.8, roughness: 0.25, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(s);
    scn.add(mesh);
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(2, 3, 4);
    scn.add(light);
    scn.add(new THREE.AmbientLight(0xffffff, 0.45));
    const r = thumbRenderer(w, h);
    r.setClearColor(0x000000, 0);
    r.render(scn, cam);
    const url = r.domElement.toDataURL('image/png');
    geo.dispose(); mat.dispose();
    return url;
  } catch(e){ return ''; }
}

// Build Scene panel UI and presets grid
export function setupScenePanel(scenePanel, params, gui, rebuild, toggleReflection, grid, shadowReceiver, getActiveRecord, addObjectFromPreset, setReflectorOpacity){
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
    <div style="margin-top:10px">
      <label><input type="checkbox" id="sceneReflection" /> Reflection</label>
    </div>
    <div style="margin-top:8px; display:flex; align-items:center; gap:8px;">
      <label for="sceneReflOpacity" style="white-space:nowrap;">Reflection opacity</label>
      <input type="range" id="sceneReflOpacity" min="0" max="1" step="0.01" style="flex:1;" />
    </div>
    <div style="margin-top:16px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
      <strong>Object Presets</strong>
      <div>
        <input id="scenePresetName" placeholder="Preset name" style="padding:4px 6px; border-radius:4px; border:1px solid #444; background:#111; color:#fff; width:160px;" />
        <button id="sceneSavePresetBtn" style="padding:6px 10px; border:none; border-radius:6px; background:#2a2a2e; color:#fff; cursor:pointer;">Save current</button>
      </div>
    </div>
    <div id="scenePresetRow" style="margin-top:10px; display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:10px; max-height:40vh; overflow-y:auto; padding-right:4px;"></div>
  `;

  // Scene preset selector handler
  scenePanel.querySelector('#scenePreset').addEventListener('change', (e) => {
    const v = e.target.value;
    if (v === 'showcase'){
      params.autoRotate = true; params.rotationSpeed = 0.3; params.metalness = 0.95; params.roughness = 0.12;
    } else if (v === 'studio'){
      params.autoRotate = false; params.rotationSpeed = 0.05; params.metalness = 0.2; params.roughness = 0.6;
    } else {
      params.autoRotate = false; params.rotationSpeed = 0.12; params.metalness = 0.8; params.roughness = 0.25;
    }
    try { gui.updateDisplay(); } catch(e) {}
    rebuild();
    if (params && params.showReflection !== undefined) {
      toggleReflection(params.showReflection);
    }
  });

  // Helpers toggle
  scenePanel.querySelector('#toggleHelpers').addEventListener('change', (e) => {
    const checked = e.target.checked;
    grid.visible = checked;
    shadowReceiver.visible = checked;
  });

  // Reflection controls (moved here from the Object panel — they belong to the scene).
  const reflChk = scenePanel.querySelector('#sceneReflection');
  const reflOpacity = scenePanel.querySelector('#sceneReflOpacity');
  if (reflChk) reflChk.checked = !!params.showReflection;
  if (reflOpacity) reflOpacity.value = params.reflectorOpacity != null ? params.reflectorOpacity : 0.6;
  reflChk && reflChk.addEventListener('change', (e) => {
    params.showReflection = e.target.checked;
    try { toggleReflection(params.showReflection); } catch(err) {}
  });
  reflOpacity && reflOpacity.addEventListener('input', (e) => {
    const v = parseFloat(e.target.value);
    params.reflectorOpacity = v;
    if (typeof setReflectorOpacity === 'function') setReflectorOpacity(v);
  });

  // Build object presets grid
  async function buildScenePresets(){
    const row = scenePanel.querySelector('#scenePresetRow');
    if (!row) return;
    row.innerHTML = '';
    const userPresets = loadUserPresets();
    const allPresets = [...defaultPresets, ...userPresets];
    for (const p of allPresets){
      const card = document.createElement('div');
      card.style.width = '100%';
      card.style.background = 'rgba(255,255,255,0.03)';
      card.style.border = '1px solid rgba(255,255,255,0.1)';
      card.style.borderRadius = '8px';
      card.style.padding = '8px';
      const img = document.createElement('img');
      img.style.width = '100%'; img.style.aspectRatio = '4/3'; img.style.objectFit = 'cover'; img.style.borderRadius = '6px';
      img.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))';
      try { img.src = await createPresetThumbnail(p); } catch(e) { /* ignore */ }
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

  // Save preset handler
  scenePanel.querySelector('#sceneSavePresetBtn').addEventListener('click', async () => {
    const name = scenePanel.querySelector('#scenePresetName').value.trim() || `Preset ${Date.now()}`;
    const rec = getActiveRecord(); if (!rec) return;
    const newPreset = { 
      key: 'user-' + Date.now(), 
      name, 
      desc: '', 
      type: rec.params.objectType, 
      params: { 
        a: rec.params.a, 
        b: rec.params.b, 
        p: rec.params.p, 
        q: rec.params.q, 
        tubeRadius: rec.params.tubeRadius, 
        uSegments: rec.params.uSegments, 
        vSegments: rec.params.vSegments,
        posX: rec.params.posX ?? 0,
        posY: rec.params.posY ?? 0,
        posZ: rec.params.posZ ?? 0,
        rotX: rec.params.rotX ?? 0,
        rotY: rec.params.rotY ?? 0,
        rotZ: rec.params.rotZ ?? 0
      } 
    };
    if (rec.params.magnitude !== undefined) newPreset.params.magnitude = rec.params.magnitude;
    // keep joint weighting, surface quality and custom formulas with the preset
    SHAPE_PARAM_KEYS.forEach(k => { if (rec.params[k] !== undefined) newPreset.params[k] = rec.params[k]; });
    const arr = loadUserPresets(); arr.push(newPreset); saveUserPresets(arr);
    await buildScenePresets();
  });

  // Initial build
  buildScenePresets();

  // Return rebuild function so showTab can call it
  return { buildScenePresets };
}
