import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { edgeTable, triTable } from 'three/examples/jsm/objects/MarchingCubes.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { TrefoilCurve } from './trefoil.js';
import { SeptafoilCurve } from './septafoil.js';

// Shape library: every object type the designer can build, grouped by kind.
//   curve      — closed/open 3D curve swept into a tube (supports joint weighting)
//   parametric — surface r(u, v)
//   explicit   — height field z = f(x, y)
//   implicit   — level set F(x, y, z) = 0 (polygonised with marching cubes)
//   custom-*   — user formulas for the three surface kinds
// Surfaces use the math convention (z up) and are mapped to three.js (y up).

const TAU = Math.PI * 2;

// ---------------------------------------------------------------- curves --
class FnCurve extends THREE.Curve {
  constructor(fn){ super(); this.fn = fn; }
  getPoint(t, target = new THREE.Vector3()){ return this.fn(t, target); }
}

export const CURVES = [
  { id: 'Trefoil', desc: 'Torus knot (p, q)', closed: true,
    make: (P) => new TrefoilCurve(P.a, P.b, P.p, P.q) },
  { id: 'Septafoil', desc: 'Torus knot, many lobes', closed: true,
    make: (P) => new SeptafoilCurve(P.a, P.b, P.p, P.q) },
  { id: 'Figure-Eight', desc: 'The 4₁ knot', closed: true,
    make: (P) => { const s = P.a / 2; return new FnCurve((t, o) => {
      const th = t * TAU; const r = 2 + Math.cos(2 * th);
      return o.set(s * r * Math.cos(3 * th), s * r * Math.sin(3 * th), s * P.b * Math.sin(4 * th));
    }); } },
  { id: 'Lissajous', desc: 'Lissajous knot (q, p, 2(p+q)−3)', closed: true,
    make: (P) => { const s = P.a * 1.4, nx = P.q, ny = P.p, nz = 2 * (P.p + P.q) - 3;
      return new FnCurve((t, o) => { const th = t * TAU;
        return o.set(s * Math.cos(nx * th + 0.7), s * Math.cos(ny * th + 0.2), s * P.b * Math.cos(nz * th));
      }); } },
  { id: 'Spring', desc: 'Helix — q turns, pitch b', closed: false,
    make: (P) => { const turns = Math.max(1, P.q); return new FnCurve((t, o) => { const th = t * TAU * turns;
      return o.set(P.a * Math.cos(th), P.a * Math.sin(th), (t - 0.5) * turns * 2 * P.b);
    }); } },
  { id: 'Torus Ring', desc: 'Circle of radius a', closed: true,
    make: (P) => new FnCurve((t, o) => o.set(P.a * Math.cos(t * TAU), P.a * Math.sin(t * TAU), 0)) }
];

// ------------------------------------------------------------ parametric --
// fn(u, v) with u, v in [0, 1] → [x, y, z] (math, z up)
const spow = (x, e) => Math.sign(x) * Math.pow(Math.abs(x), e);
export const PARAMETRIC = [
  { id: 'Sphere', desc: 'Radius-a sphere', fn: (u, v, P) => { const th = u * TAU, ph = v * Math.PI;
      return [P.a * Math.sin(ph) * Math.cos(th), P.a * Math.sin(ph) * Math.sin(th), P.a * Math.cos(ph)]; } },
  { id: 'Torus', desc: 'Donut — R = a, r = 0.7·b', fn: (u, v, P) => { const th = u * TAU, ph = v * TAU, R = P.a, r = 0.7 * P.b;
      return [(R + r * Math.cos(ph)) * Math.cos(th), (R + r * Math.cos(ph)) * Math.sin(th), r * Math.sin(ph)]; } },
  { id: 'Möbius Strip', desc: 'One-sided band', fn: (u, v, P) => { const th = u * TAU, t = (v * 2 - 1) * 0.8 * P.b, R = P.a;
      return [(R + t * Math.cos(th / 2)) * Math.cos(th), (R + t * Math.cos(th / 2)) * Math.sin(th), t * Math.sin(th / 2)]; } },
  { id: 'Klein Bottle', desc: 'Figure-8 immersion', fn: (u, v, P) => { const a = u * TAU, b = v * TAU, R = 0.9 * P.a;
      const k = R + Math.cos(a / 2) * Math.sin(b) - Math.sin(a / 2) * Math.sin(2 * b);
      return [k * Math.cos(a), k * Math.sin(a), Math.sin(a / 2) * Math.sin(b) + Math.cos(a / 2) * Math.sin(2 * b)]; } },
  { id: 'Helicoid', desc: 'Minimal ruled surface', fn: (u, v, P) => { const r = (u * 2 - 1) * P.a, th = v * TAU * 2;
      return [r * Math.cos(th), r * Math.sin(th), 0.4 * P.b * th]; } },
  { id: 'Catenoid', desc: 'Minimal surface of revolution', fn: (u, v, P) => { const th = u * TAU, z = (v * 2 - 1) * 1.4, c = P.a / 2;
      return [c * Math.cosh(z) * Math.cos(th), c * Math.cosh(z) * Math.sin(th), c * z * 1.3]; } },
  { id: 'Enneper', desc: 'Self-intersecting minimal surface', fn: (u, v, P) => { const r = u * 1.4, th = v * TAU, k = 0.45 * P.a;
      const x = r * Math.cos(th), y = r * Math.sin(th);
      return [k * (x - x * x * x / 3 + x * y * y), k * (y - y * y * y / 3 + y * x * x), k * (x * x - y * y)]; } },
  { id: "Dini's Surface", desc: 'Twisted pseudosphere', fn: (u, v, P) => { const a = u * 4 * Math.PI, b = 0.1 + v * 1.9, k = P.a / 2;
      return [k * Math.cos(a) * Math.sin(b), k * Math.sin(a) * Math.sin(b), k * (Math.cos(b) + Math.log(Math.tan(b / 2)) + 0.2 * P.b * a)]; } },
  { id: 'Seashell', desc: 'Logarithmic spiral shell', fn: (u, v, P) => { const a = u * 6 * Math.PI, b = v * TAU, k = 0.55 * P.a / 2;
      const e1 = Math.exp(a / (6 * Math.PI)), c2 = Math.cos(b / 2) ** 2;
      return [k * 2 * (1 - e1) * Math.cos(a) * c2, k * 2 * (-1 + e1) * Math.sin(a) * c2,
        k * (1 - Math.exp(a / (3 * Math.PI)) - Math.sin(b) + e1 * Math.sin(b))]; } },
  { id: 'Superellipsoid', desc: 'Superquadric — exponent q/3', fn: (u, v, P) => { const th = u * TAU - Math.PI, ph = v * Math.PI - Math.PI / 2, e = Math.max(0.1, P.q / 3);
      return [P.a * spow(Math.cos(ph), e) * spow(Math.cos(th), e), P.a * spow(Math.cos(ph), e) * spow(Math.sin(th), e), P.a * spow(Math.sin(ph), e)]; } },
  { id: 'Hyperboloid', desc: 'One-sheet hyperboloid', fn: (u, v, P) => { const th = u * TAU, z = (v * 2 - 1) * 1.2, k = 0.6 * P.a;
      return [k * Math.cosh(z) * Math.cos(th), k * Math.cosh(z) * Math.sin(th), k * 1.3 * Math.sinh(z) * P.b]; } },
  { id: 'Twisted Torus', desc: 'Elliptic section twisted p/2 times', fn: (u, v, P) => { const th = u * TAU, ph = v * TAU, R = P.a;
      const A = 0.8 * P.b, B = 0.3 * P.b, al = P.p * th / 2, ca = A * Math.cos(ph), cb = B * Math.sin(ph);
      const c1 = ca * Math.cos(al) - cb * Math.sin(al), c2 = ca * Math.sin(al) + cb * Math.cos(al);
      return [(R + c1) * Math.cos(th), (R + c1) * Math.sin(th), c2]; } }
];

// -------------------------------------------------------------- explicit --
// f(x, y) → z on the square [-R, R]²
export const EXPLICIT = [
  { id: 'Monkey Saddle', desc: 'z = x³ − 3xy²', R: 1.6, f: (x, y) => x * x * x - 3 * x * y * y },
  { id: 'Saddle', desc: 'z = (x² − y²) / 3', R: 2.6, f: (x, y) => (x * x - y * y) / 3 },
  { id: 'Ripple', desc: 'Damped radial wave', R: 3.5, f: (x, y) => { const r = Math.hypot(x, y); return 1.1 * Math.sin(2.2 * r) / (1 + 0.3 * r); } },
  { id: 'Gaussian', desc: 'Bell-shaped hill', R: 3, f: (x, y) => 2.4 * Math.exp(-(x * x + y * y) / 2) }
];

// -------------------------------------------------------------- implicit --
// F(x, y, z) < 0 inside, > 0 outside; bound(P) → half-size of the sampling box
export const IMPLICIT = [
  { id: 'Implicit Sphere', name: 'Sphere', desc: 'x² + y² + z² = a²', bound: (P) => P.a * 1.15,
    F: (x, y, z, P) => x * x + y * y + z * z - P.a * P.a },
  { id: 'Implicit Torus', name: 'Torus', desc: 'Donut shape', bound: (P) => P.a + 0.7 * P.b + 0.3,
    F: (x, y, z, P) => { const q = Math.hypot(x, y) - P.a; const r = 0.7 * P.b; return q * q + z * z - r * r; } },
  { id: 'Cylinder', desc: 'Capped cylinder along z', bound: (P) => P.a * 0.8 + 0.3,
    F: (x, y, z, P) => Math.max(Math.hypot(x, y) - P.a / 2, Math.abs(z) - P.a * 0.75) },
  { id: 'Cone', desc: 'Double cone at origin', bound: (P) => P.a * 0.85 + 0.3,
    F: (x, y, z, P) => Math.max(Math.hypot(x, y) - 0.6 * Math.abs(z), Math.abs(z) - P.a * 0.8) },
  { id: "Goursat's Tangle", desc: 'Quartic surface with cubic symmetry', bound: (P) => 3 * P.a / 2,
    F: (x, y, z, P) => { const s = 2 / P.a; x *= s; y *= s; z *= s;
      return x ** 4 + y ** 4 + z ** 4 - 5 * (x * x + y * y + z * z) + 11.8; } },
  { id: 'Gyroid', desc: 'Triply periodic minimal sheet', bound: (P) => 1.35 * P.a + 0.2,
    F: (x, y, z, P) => { const f = 1.6; const g = Math.sin(f * x) * Math.cos(f * y) + Math.sin(f * y) * Math.cos(f * z) + Math.sin(f * z) * Math.cos(f * x);
      return Math.max(Math.abs(g) - 0.32, Math.hypot(x, y, z) - 1.3 * P.a); } },
  { id: 'Heart', desc: 'Taubin heart surface', bound: (P) => 1.4 * P.a / 1.2,
    F: (x, y, z, P) => { const s = 1.2 / P.a; x *= s; y *= s; z *= s;
      const k = x * x + 2.25 * y * y + z * z - 1; return k * k * k - x * x * z * z * z - 0.1125 * y * y * z * z * z; } }
];

// ---------------------------------------------------------------- custom --
export const CUSTOM = [
  { id: 'Custom Parametric', desc: 'x(u,v), y(u,v), z(u,v)' },
  { id: 'Custom Implicit', desc: 'F(x, y, z) = 0' },
  { id: 'Custom Explicit', desc: 'z = f(x, y)' }
];

export const SHAPE_GROUPS = [
  { key: 'curves', title: 'Knots & Curves', color: '#5fb3ff', items: CURVES },
  { key: 'parametric', title: 'Parametric (u,v)', color: '#ffd76a', items: PARAMETRIC },
  { key: 'implicit', title: 'Implicit (F = 0)', color: '#ff6f9c', items: IMPLICIT },
  { key: 'explicit', title: 'Explicit z = f(x,y)', color: '#6cf2b7', items: EXPLICIT }
];

const byId = new Map();
CURVES.forEach(d => byId.set(d.id, { kind: 'curve', def: d }));
PARAMETRIC.forEach(d => byId.set(d.id, { kind: 'parametric', def: d }));
EXPLICIT.forEach(d => byId.set(d.id, { kind: 'explicit', def: d }));
IMPLICIT.forEach(d => byId.set(d.id, { kind: 'implicit', def: d }));
byId.set('Custom Parametric', { kind: 'custom-parametric' });
byId.set('Custom Implicit', { kind: 'custom-implicit' });
byId.set('Custom Explicit', { kind: 'custom-explicit' });
byId.set('BaskınFoil', { kind: 'ribbon' });

// Per-object parameters added by the shape library (joints, surface quality,
// custom formulas). Kept in every object record so switching objects restores them.
export const SHAPE_PARAM_DEFAULTS = {
  jointWeight: 0, jointCount: 3, jointSharpness: 4, jointOffset: 0,
  surfSegments: 96, resolution: 56, bound: 3,
  customF: 'x^4 + y^4 + z^4 - 5*(x^2 + y^2 + z^2) + 11.8',
  customExplicit: 'sin(x) * cos(y)',
  customX: '(2 + cos(v)) * cos(u)', customY: '(2 + cos(v)) * sin(u)', customZ: 'sin(v)',
  uMin: 0, uMax: 6.2832, vMin: 0, vMax: 6.2832
};
export const SHAPE_PARAM_KEYS = Object.keys(SHAPE_PARAM_DEFAULTS);

export function getShapeKind(type){ return (byId.get(type) || { kind: 'curve' }).kind; }
export function getShapeLabel(type){ const e = byId.get(type); return (e && e.def && (e.def.name || e.def.id)) || type; }
export function isSurfaceKind(kind){ return kind !== 'curve' && kind !== 'ribbon'; }

// Ordered list for the "Object Type" dropdown.
export const OBJECT_TYPES = [
  ...CURVES.map(d => d.id), 'BaskınFoil',
  ...PARAMETRIC.map(d => d.id), ...EXPLICIT.map(d => d.id), ...IMPLICIT.map(d => d.id),
  ...CUSTOM.map(d => d.id)
];

// ------------------------------------------------------ formula compiler --
// Compiles a small math expression into a function of the given variables.
// Grammar: + - * / ^ (right-assoc, binds tighter than unary minus: -x^2 = -(x^2)),
// parentheses, numbers, the variables, pi/e and whitelisted Math functions.
// Parsed into a JS string that only references Math.* and the variables, so no
// arbitrary code can be injected.
const MATH_FNS = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'sinh', 'cosh', 'tanh',
  'exp', 'log', 'sqrt', 'cbrt', 'abs', 'pow', 'min', 'max', 'floor', 'ceil', 'sign', 'hypot'];
export function compileExpression(expr, vars){
  const src = String(expr || '').trim();
  if (!src) throw new Error('Empty expression');
  const toks = [];
  const re = /\s*(?:(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+)|([a-zA-Z_][a-zA-Z0-9_]*)|(\*\*|[-+*/^(),]))/y;
  let m, i = 0;
  while (i < src.length){
    re.lastIndex = i;
    m = re.exec(src);
    if (!m || m[0].length === 0){ if (/^\s*$/.test(src.slice(i))) break; throw new Error(`Unexpected character "${src[i]}"`); }
    toks.push(m[1] ? { t: 'num', v: m[1] } : m[2] ? { t: 'id', v: m[2] } : { t: 'op', v: m[3] === '**' ? '^' : m[3] });
    i = re.lastIndex;
  }
  let k = 0;
  const peek = () => toks[k], take = () => toks[k++];
  const expect = (v) => { const t = take(); if (!t || t.v !== v) throw new Error(`Expected "${v}"`); };
  function parseExpr(){ let s = parseTerm(); while (peek() && (peek().v === '+' || peek().v === '-')){ const op = take().v; s = `(${s}${op}${parseTerm()})`; } return s; }
  function parseTerm(){ let s = parseUnary(); while (peek() && (peek().v === '*' || peek().v === '/')){ const op = take().v; s = `(${s}${op}${parseUnary()})`; } return s; }
  function parseUnary(){ if (peek() && (peek().v === '-' || peek().v === '+')){ const op = take().v; return `(${op}${parseUnary()})`; } return parsePower(); }
  function parsePower(){ const b = parsePrimary(); if (peek() && peek().v === '^'){ take(); return `Math.pow(${b},${parseUnary()})`; } return b; }
  function parsePrimary(){
    const t = take();
    if (!t) throw new Error('Unexpected end of expression');
    if (t.t === 'num') return t.v;
    if (t.t === 'op' && t.v === '('){ const s = parseExpr(); expect(')'); return `(${s})`; }
    if (t.t === 'id'){
      if (vars.includes(t.v)) return t.v;
      if (t.v === 'pi' || t.v === 'PI') return 'Math.PI';
      if (t.v === 'e' || t.v === 'E') return 'Math.E';
      if (MATH_FNS.includes(t.v)){
        expect('(');
        const args = [parseExpr()];
        while (peek() && peek().v === ','){ take(); args.push(parseExpr()); }
        expect(')');
        return `Math.${t.v}(${args.join(',')})`;
      }
      throw new Error(`Unknown name: ${t.v}`);
    }
    throw new Error(`Unexpected "${t.v}"`);
  }
  const js = parseExpr();
  if (k < toks.length) throw new Error(`Unexpected "${toks[k].v}"`);
  // eslint-disable-next-line no-new-func
  const fn = new Function(...vars, `return ${js};`);
  const probe = fn(...vars.map(() => 0.37)); // trial evaluation
  if (typeof probe !== 'number') throw new Error('Expression must produce a number');
  return fn;
}

// ------------------------------------------------------ geometry builders --
// Tube along a curve whose radius is modulated by "joints": evenly spaced
// bumps (weight > 0 → bulges, < 0 → pinches). Keeps TubeGeometry's vertex
// layout ((segments+1) rings of (radial+1) verts) so physics colliders work.
export function jointRadiusFactor(t, P, closed){
  const w = P.jointWeight || 0;
  if (!w) return 1;
  const n = Math.max(1, Math.round(P.jointCount || 1));
  const sharp = Math.max(0.5, P.jointSharpness || 4);
  let x = (t - (P.jointOffset || 0)) * n;
  if (!closed) x = t * n - 0.5 - (P.jointOffset || 0) * n;
  const d = Math.abs(x - Math.round(x)); // 0 at a joint … 0.5 between joints
  const bump = Math.exp(-(d * sharp) * (d * sharp) * 2);
  return Math.max(0.12, 1 + w * bump);
}

export function buildWeightedTube(curve, segments, radius, radial, closed, P){
  const frames = curve.computeFrenetFrames(segments, closed);
  const pos = [], nrm = [], uv = [], idx = [];
  const P0 = new THREE.Vector3(), N = new THREE.Vector3(), V = new THREE.Vector3();
  const len = curve.getLength() || 1;
  const dt = 1 / segments;
  for (let i = 0; i <= segments; i++){
    const t = i / segments;
    curve.getPointAt(closed && i === segments ? 0 : t, P0);
    const fi = closed && i === segments ? 0 : i;
    const Nf = frames.normals[fi], Bf = frames.binormals[fi], Tf = frames.tangents[fi];
    const r = radius * jointRadiusFactor(t, P, closed);
    // dr/ds tilts the normals so lighting follows the bulges
    const rp = radius * jointRadiusFactor(Math.min(1, t + dt), P, closed);
    const rm = radius * jointRadiusFactor(Math.max(0, t - dt), P, closed);
    const slope = (rp - rm) / (2 * dt * len);
    for (let j = 0; j <= radial; j++){
      const a = j / radial * TAU, s = Math.sin(a), c = -Math.cos(a);
      N.set(c * Nf.x + s * Bf.x, c * Nf.y + s * Bf.y, c * Nf.z + s * Bf.z).normalize();
      V.copy(P0).addScaledVector(N, r);
      pos.push(V.x, V.y, V.z);
      N.addScaledVector(Tf, -slope).normalize();
      nrm.push(N.x, N.y, N.z);
      uv.push(t, j / radial);
    }
  }
  for (let j = 1; j <= segments; j++){
    for (let i = 1; i <= radial; i++){
      const a = (radial + 1) * (j - 1) + (i - 1), b = (radial + 1) * j + (i - 1);
      const c = (radial + 1) * j + i, d = (radial + 1) * (j - 1) + i;
      idx.push(a, b, d, b, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

// math (x, y, z; z up) → three.js (x, z, -y; y up)
const toThree = (out, x, y, z) => out.set(x, z, -y);

function parametricGeometry(fn3, segs){
  return new ParametricGeometry((u, v, target) => {
    const p = fn3(u, v);
    const x = Number.isFinite(p[0]) ? p[0] : 0, y = Number.isFinite(p[1]) ? p[1] : 0, z = Number.isFinite(p[2]) ? p[2] : 0;
    toThree(target, x, y, z);
  }, segs, segs);
}

// Marching cubes over [-B, B]³ with `res` cells per axis; normals from ∇F.
export function buildImplicitGeometry(F, B, res){
  res = Math.max(8, Math.min(140, Math.round(res)));
  const n = res + 1, h = (2 * B) / res;
  const field = new Float32Array(n * n * n);
  const at = (i, j, k) => i + n * (j + n * k);
  for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++){
    const v = F(-B + i * h, -B + j * h, -B + k * h);
    field[at(i, j, k)] = Number.isFinite(v) ? v : 1e6;
  }
  const corner = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  const pos = [], nrm = [];
  const vert = new Array(12), val = new Array(8);
  const eps = h * 0.5;
  const grad = (x, y, z) => {
    const gx = F(x + eps, y, z) - F(x - eps, y, z), gy = F(x, y + eps, z) - F(x, y - eps, z), gz = F(x, y, z + eps) - F(x, y, z - eps);
    const l = Math.hypot(gx, gy, gz) || 1; return [gx / l, gy / l, gz / l];
  };
  for (let k = 0; k < res; k++) for (let j = 0; j < res; j++) for (let i = 0; i < res; i++){
    let ci = 0;
    for (let c = 0; c < 8; c++){
      const [dx, dy, dz] = corner[c];
      val[c] = field[at(i + dx, j + dy, k + dz)];
      if (val[c] > 0) ci |= 1 << c; // set = outside (same convention as three's tables)
    }
    const bits = edgeTable[ci];
    if (!bits) continue;
    for (let e = 0; e < 12; e++){
      if (!(bits & (1 << e))) continue;
      const [c0, c1] = edges[e], v0 = val[c0], v1 = val[c1];
      const tt = Math.abs(v1 - v0) < 1e-12 ? 0.5 : v0 / (v0 - v1);
      const p0 = corner[c0], p1 = corner[c1];
      vert[e] = [-B + (i + p0[0] + (p1[0] - p0[0]) * tt) * h, -B + (j + p0[1] + (p1[1] - p0[1]) * tt) * h, -B + (k + p0[2] + (p1[2] - p0[2]) * tt) * h];
    }
    const base = ci << 4;
    for (let q = 0; triTable[base + q] !== -1; q += 3){
      const A = vert[triTable[base + q]], Bv = vert[triTable[base + q + 1]], C = vert[triTable[base + q + 2]];
      const nA = grad(...A), nB = grad(...Bv), nC = grad(...C);
      // orient each triangle so its winding agrees with the outward gradient
      const ux = Bv[0] - A[0], uy = Bv[1] - A[1], uz = Bv[2] - A[2], wx = C[0] - A[0], wy = C[1] - A[1], wz = C[2] - A[2];
      const fx = uy * wz - uz * wy, fy = uz * wx - ux * wz, fz = ux * wy - uy * wx;
      const flip = fx * (nA[0] + nB[0] + nC[0]) + fy * (nA[1] + nB[1] + nC[1]) + fz * (nA[2] + nB[2] + nC[2]) < 0;
      const tri = flip ? [[A, nA], [C, nC], [Bv, nB]] : [[A, nA], [Bv, nB], [C, nC]];
      for (const [p, nn] of tri){ pos.push(p[0], p[2], -p[1]); nrm.push(nn[0], nn[2], -nn[1]); }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  // Each edge vertex is emitted once per triangle that touches it; weld the
  // duplicates (identical position + gradient normal) into an indexed mesh.
  return pos.length ? mergeVertices(g, 1e-5) : g;
}

// Builds geometry for any non-ribbon object type.
// Returns { geometry, kind, error } — on a bad custom formula, geometry is a
// small placeholder sphere and `error` carries the message.
export function buildShapeGeometry(P, opts = {}){
  const type = P.objectType;
  const kind = getShapeKind(type);
  const entry = byId.get(type);
  const segs = Math.max(8, Math.round(opts.surfSegments || P.surfSegments || 96));
  const res = opts.resolution || P.resolution || 56;
  try {
    if (kind === 'curve'){
      const def = (entry && entry.def) || CURVES[0];
      const curve = def.make(P);
      const tubular = Math.max(16, Math.round(opts.uSegments || P.uSegments || 400));
      const radial = Math.max(3, Math.round(P.vSegments || 32));
      const weighted = (P.jointWeight || 0) !== 0;
      const geometry = weighted
        ? buildWeightedTube(curve, tubular, P.tubeRadius, radial, def.closed, P)
        : new THREE.TubeGeometry(curve, tubular, P.tubeRadius, radial, def.closed);
      return { geometry, kind };
    }
    if (kind === 'parametric') return { geometry: parametricGeometry((u, v) => entry.def.fn(u, v, P), segs), kind };
    if (kind === 'explicit'){
      const R = entry.def.R * (P.a / 2);
      return { geometry: parametricGeometry((u, v) => { const x = (u * 2 - 1) * R, y = (v * 2 - 1) * R; return [x, y, entry.def.f(x / (P.a / 2), y / (P.a / 2)) * (P.a / 2) * P.b]; }, segs), kind };
    }
    if (kind === 'implicit') return { geometry: buildImplicitGeometry((x, y, z) => entry.def.F(x, y, z, P), entry.def.bound(P), res), kind };
    if (kind === 'custom-parametric'){
      const fx = compileExpression(P.customX, ['u', 'v']), fy = compileExpression(P.customY, ['u', 'v']), fz = compileExpression(P.customZ, ['u', 'v']);
      const u0 = +P.uMin, u1 = +P.uMax, v0 = +P.vMin, v1 = +P.vMax;
      return { geometry: parametricGeometry((u, v) => { const uu = u0 + (u1 - u0) * u, vv = v0 + (v1 - v0) * v; return [fx(uu, vv), fy(uu, vv), fz(uu, vv)]; }, segs), kind };
    }
    if (kind === 'custom-implicit'){
      const f = compileExpression(P.customF, ['x', 'y', 'z']);
      return { geometry: buildImplicitGeometry(f, Math.max(0.5, +P.bound || 3), res), kind };
    }
    if (kind === 'custom-explicit'){
      const f = compileExpression(P.customExplicit, ['x', 'y']);
      const R = Math.max(0.5, +P.bound || 3);
      return { geometry: parametricGeometry((u, v) => { const x = (u * 2 - 1) * R, y = (v * 2 - 1) * R; return [x, y, f(x, y)]; }, segs), kind };
    }
  } catch (e){
    return { geometry: new THREE.SphereGeometry(0.6, 24, 16), kind, error: e.message || String(e) };
  }
  return { geometry: new THREE.TubeGeometry(CURVES[0].make(P), 200, P.tubeRadius, 16, true), kind: 'curve' };
}
