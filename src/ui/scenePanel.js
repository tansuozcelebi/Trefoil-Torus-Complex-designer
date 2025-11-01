import * as THREE from 'three';

// Default presets
export const defaultPresets = [
  { key: 'trefoilClassic', name: 'Trefoil Classic', desc: 'p=2,q=3', type: 'Trefoil', params: { a: 2, b: 1, p: 2, q: 3, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } },
  { key: 'septafoilTight', name: 'Septafoil Tight', desc: 'p=3,q=7', type: 'Septafoil', params: { a: 1.5, b: 0.8, p: 3, q: 7, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } },
  { key: 'torusKnot54', name: 'Trefoil (5,4)', desc: 'p=5,q=4', type: 'Trefoil', params: { a: 2.4, b: 0.9, p: 5, q: 4, posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0 } }
];

// User presets storage
export function loadUserPresets(){
  try { return JSON.parse(localStorage.getItem('tc.userPresets') || '[]'); } catch(e){ return []; }
}

export function saveUserPresets(arr){
  try { localStorage.setItem('tc.userPresets', JSON.stringify(arr||[])); } catch(e) {}
}

// Create preset thumbnail
export async function createPresetThumbnail(preset){
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
      // Simple ribbon geometry thumbnail (low segment)
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
    } else if (preset.type === 'Septafoil') {
      const { SeptafoilCurve } = await import('../objects/septafoil.js');
      const curve = new SeptafoilCurve(preset.params?.a??1.5, preset.params?.b??0.8, preset.params?.p??3, preset.params?.q??7);
      geo = new THREE.TubeGeometry(curve, 200, 0.15, 8, true);
    } else {
      const { TrefoilCurve } = await import('../objects/trefoil.js');
      const curve = new TrefoilCurve(preset.params?.a??2, preset.params?.b??1, preset.params?.p??2, preset.params?.q??3);
      geo = new THREE.TubeGeometry(curve, 200, 0.15, 8, true);
    }
    const mat = new THREE.MeshStandardMaterial({ color: 0x5fb3ff, metalness: 0.9, roughness: 0.2 });
    const mesh = new THREE.Mesh(geo, mat);
    scn.add(mesh);
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(2,3,4);
    scn.add(light);
    scn.add(new THREE.AmbientLight(0xffffff, 0.4));
    renderer2.render(scn, cam);
    const url = renderer2.domElement.toDataURL('image/png');
    // cleanup
    geo.dispose(); mat.dispose(); renderer2.dispose();
    return url;
  } catch(e){ return ''; }
}

// Build Scene panel UI and presets grid
export function setupScenePanel(scenePanel, params, gui, rebuild, toggleReflection, grid, shadowReceiver, getActiveRecord, addObjectFromPreset){
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
    const arr = loadUserPresets(); arr.push(newPreset); saveUserPresets(arr);
    await buildScenePresets();
  });

  // Initial build
  buildScenePresets();

  // Return rebuild function so showTab can call it
  return { buildScenePresets };
}
