import * as THREE from 'three';

// Funnel ground: a bowl that opens upward with its rim at ground level and
// narrows to a small flat floor below, so objects (with physics on) roll down
// its walls and gather at the bottom. The same profile builds the visual mesh
// and a coarser triangle-mesh collider (see createFunnel().collider).
const RIM = 20;      // rim radius at ground level
const NECK = 2.5;    // radius of the flat floor at the bottom
const DEPTH = 9;     // floor depth below ground level
const APRON = 60;    // outer radius of the flat ground around the rim

// Profile from the floor centre up to the rim: [radius, y] (y relative to ground).
// The wall follows a smooth ease so it is steep near the neck and flattens out
// toward the rim, like a real funnel.
function profile(steps){
  const pts = [[0, -DEPTH]];
  for (let i = 0; i <= steps; i++){
    const t = i / steps;                       // 0 = neck, 1 = rim
    const r = NECK + (RIM - NECK) * t;
    const y = -DEPTH * Math.pow(1 - t, 2.2);   // concave wall
    pts.push([r, y]);
  }
  pts.push([APRON, 0]); // flat apron around the rim at ground level
  return pts;
}

// World-space triangle mesh for the physics engine.
function buildCollider(groundY, radialSegs, steps){
  const pts = profile(steps);
  const vertices = [];
  for (let s = 0; s < radialSegs; s++){
    const a = (s / radialSegs) * Math.PI * 2;
    const c = Math.cos(a), sn = Math.sin(a);
    for (const [r, y] of pts) vertices.push(r * c, y + groundY, r * sn);
  }
  const n = pts.length;
  const indices = [];
  for (let s = 0; s < radialSegs; s++){
    const s2 = (s + 1) % radialSegs;
    for (let k = 0; k < n - 1; k++){
      const a = s * n + k, b = s * n + k + 1, c = s2 * n + k, d = s2 * n + k + 1;
      indices.push(a, b, c, b, d, c);
    }
  }
  return { vertices, indices };
}

export function createFunnel(groundY){
  const lathePts = profile(48).map(([r, y]) => new THREE.Vector2(r, y));
  const geo = new THREE.LatheGeometry(lathePts, 96);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x4b5a70, roughness: 0.55, metalness: 0.25, side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = groundY;
  mesh.receiveShadow = true;
  mesh.castShadow = false;

  // Subtle ring/spoke lines so the curvature reads clearly.
  const wireGeo = new THREE.WireframeGeometry(new THREE.LatheGeometry(profile(12).map(([r, y]) => new THREE.Vector2(r, y)), 32));
  const wireMat = new THREE.LineBasicMaterial({ color: 0x9fc4ff, transparent: true, opacity: 0.18 });
  const wire = new THREE.LineSegments(wireGeo, wireMat);
  wire.position.y = 0.01;
  mesh.add(wire);

  return {
    mesh,
    collider: buildCollider(groundY, 40, 16),
    dispose: () => { geo.dispose(); mat.dispose(); wireGeo.dispose(); wireMat.dispose(); }
  };
}
