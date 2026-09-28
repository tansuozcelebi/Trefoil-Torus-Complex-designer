import * as THREE from 'three';
import graniteTextureUrl from '../assets/granite.webp';

// Polished granite floor. Uses a granite photo texture (src/assets/granite.webp)
// with a procedural speckle as a fallback if the image fails to load. Meant to
// be paired with the scene Reflector for a wet/polished reflection (see mainapp.js).
export function createGranite(groundY, renderer){
  const size = 60;
  const repeat = size / 15; // how many times the texture tiles across the floor

  function configureTiling(tex){
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat, repeat);
    tex.colorSpace = THREE.SRGBColorSpace;
    if (renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  }

  function makeGraniteTexture(px = 1024){
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext('2d');
    // Base dark granite
    ctx.fillStyle = '#3a3b40';
    ctx.fillRect(0, 0, px, px);
    // Speckles: grains of varying tone/size
    const grains = Math.floor(px * px / 120);
    for (let i = 0; i < grains; i++){
      const x = Math.random() * px;
      const y = Math.random() * px;
      const r = Math.random() * 1.8 + 0.3;
      const t = Math.random();
      let col;
      if (t < 0.45) col = 'rgba(20,20,24,0.8)';        // dark mineral
      else if (t < 0.8) col = 'rgba(120,122,130,0.7)';  // mid grey
      else if (t < 0.94) col = 'rgba(200,200,208,0.8)'; // light feldspar
      else col = 'rgba(150,120,110,0.5)';               // faint warm fleck
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    return configureTiling(tex);
  }

  // Load the granite photo; fall back to the procedural speckle on error.
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.28,   // polished
    metalness: 0.15,
    envMapIntensity: 1.0
  });
  // Start with the procedural speckle so the floor is never blank, then swap in
  // the granite photo — brightened via a canvas filter so the stone reads lighter.
  let currentMap = makeGraniteTexture(1024);
  mat.map = currentMap;
  new THREE.ImageLoader().load(
    graniteTextureUrl,
    (img) => {
      try {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth || 1024;
        c.height = img.naturalHeight || 1024;
        const ctx = c.getContext('2d');
        ctx.filter = 'brightness(1.85) contrast(0.92) saturate(1.05)';
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const tex = configureTiling(new THREE.CanvasTexture(c));
        const old = currentMap;
        currentMap = tex;
        mat.map = tex;
        mat.needsUpdate = true;
        if (old) old.dispose();
      } catch(e) { /* keep the procedural map */ }
    },
    undefined,
    () => { /* image failed: keep the procedural map */ }
  );

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = groundY;
  mesh.receiveShadow = true;

  return {
    mesh,
    dispose: () => { if (currentMap) currentMap.dispose(); mat.dispose(); mesh.geometry.dispose(); }
  };
}
