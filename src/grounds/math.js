import * as THREE from 'three';

// Height function of the mathematical surface (single source of truth so the
// visual mesh and the physics collider agree).
function surfaceHeight(x, y){
  return Math.sin(x * 0.1) * Math.cos(y * 0.1) * 4.0;
}

// Build a coarse, world-space triangle mesh of the surface for the physics
// engine. The visual mesh is high-res (seg 128); the collider is decimated
// (colliderSeg) because the surface waves are gentle (period ~63 units), so a
// coarse mesh matches closely while keeping sphere-vs-trimesh cheap. Vertices
// are baked to match the visual mesh's transform (rotation.x = -PI/2, then
// position.y = groundY): worldX = x, worldY = height + groundY, worldZ = -y.
function buildColliderData(size, groundY, colliderSeg){
  const half = size / 2;
  const n = colliderSeg + 1;
  const vertices = [];
  for (let iy = 0; iy < n; iy++){
    for (let ix = 0; ix < n; ix++){
      const x = -half + (ix / colliderSeg) * size;
      const y = half - (iy / colliderSeg) * size;
      vertices.push(x, surfaceHeight(x, y) + groundY, -y);
    }
  }
  const indices = [];
  for (let iy = 0; iy < colliderSeg; iy++){
    for (let ix = 0; ix < colliderSeg; ix++){
      const a = iy * n + ix, b = a + 1, c = a + n, d = c + 1;
      indices.push(a, c, b, b, c, d); // upward-facing winding
    }
  }
  return { vertices, indices };
}

export function createMathSurface(groundY){
  const size = 100;
  const seg = 128;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  for (let i = 0; i < geo.attributes.position.count; i++){
    const x = geo.attributes.position.getX(i);
    const y = geo.attributes.position.getY(i);
    const z = surfaceHeight(x, y);
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
    // Coarse world-space collider so falling objects rest on the actual surface.
    collider: buildColliderData(size, groundY, 48),
    setWireframeColor: (color) => { wireMat.color.set(color); },
    dispose: () => { geo.dispose(); mat.dispose(); wireMat.dispose(); }
  };
}
