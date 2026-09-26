import * as THREE from 'three';

// Enclosing room: an inverted box (walls + ceiling) with a distinct floor.
// The checkerboard ground is hidden while the room is active (see mainapp.js),
// so this provides its own floor to avoid z-fighting and receive shadows.
export function createRoom(groundY){
  const roomSize = 50;
  const group = new THREE.Group();

  const boxGeo = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0x3a3b44, roughness: 0.92, metalness: 0.0, side: THREE.BackSide
  });
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.y = roomSize / 2 + groundY;
  box.receiveShadow = true;
  group.add(box);

  // Distinct floor so the room reads as a room and catches the shadow cleanly.
  const floorGeo = new THREE.PlaneGeometry(roomSize, roomSize);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x26272d, roughness: 0.85, metalness: 0.05
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = groundY + 0.01;
  floor.receiveShadow = true;
  group.add(floor);

  return {
    mesh: group,
    dispose: () => { boxGeo.dispose(); boxMat.dispose(); floorGeo.dispose(); floorMat.dispose(); }
  };
}
