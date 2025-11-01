import * as THREE from 'three';

// Creates a simple inverted box room (no special updates needed)
export function createRoom(groundY){
  const roomSize = 50;
  const boxGeo = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x202024, roughness: 0.9, metalness: 0.0, side: THREE.BackSide });
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.y = roomSize/2 + groundY;
  box.receiveShadow = true;
  return {
    mesh: box,
    dispose: () => { boxGeo.dispose(); boxMat.dispose(); }
  };
}
