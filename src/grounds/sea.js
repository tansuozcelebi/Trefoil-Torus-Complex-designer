import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

// Animated, reflective water using three.js's official Water object.
// The water normal map is generated procedurally (tileable, no external asset)
// so it works fully offline.
export function createSea(groundY){
  const size = 1000;

  // Tileable water normal map from summed integer-frequency sines.
  function makeWaterNormals(px = 512){
    const data = new Uint8Array(px * px * 4);
    const h = (x, y) => {
      const k = 2 * Math.PI / px;
      let v = 0;
      v += Math.sin(x * 4 * k) * 0.5;
      v += Math.sin(y * 4 * k) * 0.5;
      v += Math.sin((x + y) * 7 * k) * 0.25;
      v += Math.sin((x - y) * 11 * k) * 0.15;
      return v;
    };
    for (let y = 0; y < px; y++){
      for (let x = 0; x < px; x++){
        const hL = h((x - 1 + px) % px, y), hR = h((x + 1) % px, y);
        const hD = h(x, (y - 1 + px) % px), hU = h(x, (y + 1) % px);
        let nx = (hL - hR), ny = (hD - hU), nz = 1.0;
        const len = Math.hypot(nx, ny, nz) || 1;
        const i = (y * px + x) * 4;
        data[i]     = Math.floor((nx / len * 0.5 + 0.5) * 255);
        data[i + 1] = Math.floor((ny / len * 0.5 + 0.5) * 255);
        data[i + 2] = Math.floor((nz / len * 0.5 + 0.5) * 255);
        data[i + 3] = 255;
      }
    }
    const tex = new THREE.DataTexture(data, px, px, THREE.RGBAFormat);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  const waterNormals = makeWaterNormals(512);
  const geo = new THREE.PlaneGeometry(size, size);
  const water = new Water(geo, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals,
    sunDirection: new THREE.Vector3(0.7, 0.8, 0.2).normalize(),
    sunColor: 0xffffff,
    waterColor: 0x0a2b3a,
    distortionScale: 3.2,
    fog: false
  });
  water.rotation.x = -Math.PI / 2;
  water.position.y = groundY;

  function setTime(t){
    if (water.material && water.material.uniforms && water.material.uniforms['time']){
      water.material.uniforms['time'].value = t * 0.6;
    }
  }
  function resize(){ /* Water manages its own reflection render target */ }

  return {
    mesh: water,
    setTime,
    resize,
    dispose: () => { waterNormals.dispose(); geo.dispose(); if (water.material) water.material.dispose(); }
  };
}
