import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// KREATV: a flat-screen TV on a stand. Built directly in three.js (y up) and
// centred on its bounding box. The geometry is only the cabinet; the screen
// (which shows a video) is attached by ui/kreatvScreen.js using the layout
// stored in geometry.userData.kreatv. geometry.userData.collider holds a box +
// sphere compound collider for the physics engine (boxes collide with the
// ground and other objects, the spheres let it rest on triangle-mesh terrain).
export function buildKreaTvGeometry(P){
  const s = Math.max(0.2, (P && P.a) || 2) / 2;
  const sw = 3.2 * s, sh = 1.8 * s;            // 16:9 screen
  const bezelSide = 0.12 * s, bezelTop = 0.12 * s, bezelBottom = 0.3 * s;
  const cw = sw + 2 * bezelSide, ch = sh + bezelTop + bezelBottom, cd = 0.22 * s;
  const neckH = 0.5 * s, baseH = 0.08 * s;

  const box = (w, h, d, x, y, z) => new THREE.BoxGeometry(w, h, d).translate(x, y, z);
  const parts = [
    box(cw, ch, cd, 0, 0, 0),                                          // cabinet
    box(sw * 0.6, sh * 0.6, 0.25 * s, 0, 0.05 * s, -(cd / 2 + 0.125 * s)), // back housing
    box(0.3 * s, neckH, 0.12 * s, 0, -ch / 2 - neckH / 2, -0.05 * s),  // neck
    box(1.6 * s, baseH, 0.8 * s, 0, -ch / 2 - neckH - baseH / 2, -0.05 * s) // base
  ];
  const geometry = mergeGeometries(parts, false);
  parts.forEach(g => g.dispose());

  // Centre on the bounding box and shift the layout by the same amount.
  geometry.computeBoundingBox();
  const c = geometry.boundingBox.getCenter(new THREE.Vector3());
  geometry.translate(-c.x, -c.y, -c.z);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const screenY = (bezelBottom - bezelTop) / 2 - c.y;
  geometry.userData.kreatv = {
    screen: { w: sw, h: sh, x: -c.x, y: screenY, z: cd / 2 - c.z + 0.006 * s },
    logo: { w: 0.9 * s, h: 0.16 * s, x: -c.x, y: -ch / 2 + bezelBottom / 2 - c.y, z: cd / 2 - c.z + 0.007 * s }
  };

  const at = (x, y, z) => ({ x: x - c.x, y: y - c.y, z: z - c.z });
  const baseY = -ch / 2 - neckH - baseH / 2;
  const r = 0.1 * s;
  const spheres = [];
  // Base corners + cabinet corners, kept inside the boxes.
  [[-0.7, -0.3], [0.7, -0.3], [-0.7, 0.2], [0.7, 0.2]].forEach(([fx, fz]) =>
    spheres.push({ ...at(fx * s, baseY - baseH / 2 + r, fz * s - 0.05 * s), r }));
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([fx, fy]) =>
    spheres.push({ ...at(fx * (cw / 2 - r), fy * (ch / 2 - r), 0), r }));
  geometry.userData.collider = {
    boxes: [
      { ...at(0, 0, 0), hx: cw / 2, hy: ch / 2, hz: cd / 2 },
      { ...at(0, -ch / 2 - neckH / 2, -0.05 * s), hx: 0.15 * s, hy: neckH / 2, hz: 0.06 * s },
      { ...at(0, baseY, -0.05 * s), hx: 0.8 * s, hy: baseH / 2, hz: 0.4 * s }
    ],
    spheres
  };
  return geometry;
}
