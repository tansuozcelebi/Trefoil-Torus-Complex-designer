import * as THREE from 'three';

export function createMathSurface(groundY){
  const size = 100;
  const seg = 128;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  for (let i = 0; i < geo.attributes.position.count; i++){
    const x = geo.attributes.position.getX(i);
    const y = geo.attributes.position.getY(i);
    const z = Math.sin(x*0.1)*Math.cos(y*0.1) * 4.0;
    geo.attributes.position.setZ(i, z);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ color: 0xaacc88, roughness: 0.7, metalness: 0.0 });
  const mathMesh = new THREE.Mesh(geo, mat);
  mathMesh.rotation.x = -Math.PI/2;
  mathMesh.position.y = groundY;
  mathMesh.receiveShadow = true;

  // Wireframe grid overlay
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  const wireframeMesh = new THREE.Mesh(geo, wireMat);
  wireframeMesh.rotation.x = -Math.PI/2;
  wireframeMesh.position.y = groundY + 0.01; // slight offset to avoid z-fighting
  wireframeMesh.renderOrder = 2;

  // Return both meshes and allow wireframe color to be set
  return {
    mesh: mathMesh,
    wireframe: wireframeMesh,
    setWireframeColor: (color) => { wireMat.color.set(color); },
    dispose: () => { geo.dispose(); mat.dispose(); wireMat.dispose(); }
  };
}
