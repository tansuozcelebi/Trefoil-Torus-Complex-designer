import * as THREE from 'three';

export function createLights(scene){
  const ambient = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambient);

  // Spotlight: kept for the bright specular highlight on the object. Its target
  // follows the active object (see mainapp.js). Shadow casting is handled by the
  // directional light below so coverage isn't limited to the spotlight cone.
  const spot = new THREE.SpotLight(0xffffff, 1.5);
  spot.position.set(5, 10, 5);
  spot.angle = Math.PI / 5;
  spot.decay = 1;
  spot.distance = 0;
  spot.castShadow = false;
  scene.add(spot);

  // Directional light: the single shadow caster. A wide orthographic shadow
  // frustum covers the whole ground so shadows reach the entire surface,
  // regardless of where objects sit (a spotlight cone could not do this).
  const dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(8, 20, 8);
  dir.castShadow = true;
  dir.shadow.mapSize.set(2048, 2048);
  const s = 32; // half-size of the ortho frustum (covers the 60x60 ground)
  dir.shadow.camera.left = -s;
  dir.shadow.camera.right = s;
  dir.shadow.camera.top = s;
  dir.shadow.camera.bottom = -s;
  dir.shadow.camera.near = 1;
  dir.shadow.camera.far = 80;
  dir.shadow.bias = -0.0004;
  dir.shadow.normalBias = 0.02;
  dir.shadow.radius = 4; // soft edges (PCFSoftShadowMap)
  dir.shadow.camera.updateProjectionMatrix();
  scene.add(dir);
  scene.add(dir.target); // target stays at origin

  return { ambient, spot, dir };
}
