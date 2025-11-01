import * as THREE from 'three';

// Creates a funnel/cone ground under the object
export function createFunnel(groundY){
  const radiusBottom = 20;
  const height = 40;
  const radialSegments = 64;
  const coneGeo = new THREE.ConeGeometry(radiusBottom, height, radialSegments, 1, true);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1e, roughness: 0.85, metalness: 0.0, side: THREE.DoubleSide });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  // Open downward and sit below ground
  cone.rotation.x = -Math.PI/2;
  cone.position.set(0, groundY - height*0.5, 0);
  cone.receiveShadow = true;
  cone.castShadow = false;
  return {
    mesh: cone,
    dispose: () => { coneGeo.dispose(); coneMat.dispose(); }
  };
}
