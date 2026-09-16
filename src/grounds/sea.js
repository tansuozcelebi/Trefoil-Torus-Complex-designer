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
  // Subdivided plane so we can give the surface REAL vertical relief (Water on
  // its own is flat and only fakes ripples via the normal map).
  const geo = new THREE.PlaneGeometry(size, size, 96, 96);
  const basePos = Float32Array.from(geo.attributes.position.array);
  const water = new Water(geo, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals,
    sunDirection: new THREE.Vector3(0.7, 0.8, 0.2).normalize(),
    sunColor: 0xffffff,
    waterColor: 0x0a2b3a,
    distortionScale: 6.0,
    fog: false
  });
  water.rotation.x = -Math.PI / 2;
  water.position.y = groundY;

  // Wave height (world units). Higher = taller waves.
  const WAVE_AMP = 1.6;

  function setTime(t){
    if (water.material && water.material.uniforms && water.material.uniforms['time']){
      water.material.uniforms['time'].value = t * 0.6;
    }
    // Displace the plane's vertices along its local +Z (world up) to make real,
    // rolling waves. Local X/Y are the base positions; z carries the height.
    const arr = geo.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3){
      const x = basePos[i], y = basePos[i + 1];
      arr[i + 2] = WAVE_AMP * (
        Math.sin(x * 0.045 + t * 0.8) * 0.5 +
        Math.sin(y * 0.037 - t * 0.6) * 0.4 +
        Math.sin((x + y) * 0.028 + t * 1.1) * 0.35 +
        Math.sin((x - y) * 0.06 + t * 0.9) * 0.2
      );
    }
    geo.attributes.position.needsUpdate = true;
  }
  function resize(){ /* Water manages its own reflection render target */ }

  return {
    mesh: water,
    setTime,
    resize,
    dispose: () => { waterNormals.dispose(); geo.dispose(); if (water.material) water.material.dispose(); }
  };
}
