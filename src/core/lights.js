import * as THREE from 'three';

export function createLights(scene){
  const ambient = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambient);

  const spot = new THREE.SpotLight(0xffffff, 1.5);
  spot.position.set(5, 10, 5);
  spot.angle = Math.PI / 5;
  spot.decay = 1;
  spot.distance = 0;
  spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  spot.shadow.bias = -0.00015;
  scene.add(spot);

  return { ambient, spot };
}
