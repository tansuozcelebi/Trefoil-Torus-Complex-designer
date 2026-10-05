import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  compileExpression, buildShapeGeometry, buildImplicitGeometry, buildWeightedTube,
  jointRadiusFactor, OBJECT_TYPES, getShapeKind, CURVES
} from './shapes.js';

const base = {
  a: 2, b: 1, p: 2, q: 3, tubeRadius: 0.25, uSegments: 120, vSegments: 12,
  surfSegments: 24, resolution: 20, bound: 3,
  jointWeight: 0, jointCount: 3, jointSharpness: 4, jointOffset: 0,
  customF: 'x^2 + y^2 + z^2 - 4', customExplicit: 'sin(x)*cos(y)',
  customX: '2*cos(u)*sin(v)', customY: '2*sin(u)*sin(v)', customZ: '2*cos(v)',
  uMin: 0, uMax: 6.2832, vMin: 0, vMax: 3.1416
};

describe('compileExpression', () => {
  it('handles powers, unary minus and functions like math notation', () => {
    expect(compileExpression('-x^2', ['x'])(3)).toBe(-9);
    expect(compileExpression('2^-1', [])()).toBe(0.5);
    expect(compileExpression('(x^2+y^2)^2', ['x', 'y'])(1, 1)).toBe(4);
    expect(compileExpression('2^3^2', [])()).toBe(512); // right-associative
    expect(compileExpression('sin(pi/2) + max(1, 2)', [])()).toBeCloseTo(3);
    expect(compileExpression('0.5*(x^4 + y^4 + z^4) - 8*(x^2+y^2+z^2)', ['x', 'y', 'z'])(1, 1, 1)).toBeCloseTo(-22.5);
  });
  it('rejects unknown names and injection attempts', () => {
    expect(() => compileExpression('alert(1)', ['x'])).toThrow(/Unknown name/);
    expect(() => compileExpression('constructor', ['x'])).toThrow();
    expect(() => compileExpression('x; y', ['x', 'y'])).toThrow();
    expect(() => compileExpression('x[0]', ['x'])).toThrow();
    expect(() => compileExpression('', ['x'])).toThrow(/Empty/);
  });
});

describe('buildShapeGeometry', () => {
  it('builds every object type without error', () => {
    for (const type of OBJECT_TYPES){
      if (type === 'BaskınFoil') continue; // ribbon is built inline in mainapp
      const { geometry, error } = buildShapeGeometry({ ...base, objectType: type });
      expect(error, type).toBeUndefined();
      expect(geometry.attributes.position.count, type).toBeGreaterThan(30);
      const arr = geometry.attributes.position.array;
      for (let i = 0; i < arr.length; i++) expect(Number.isFinite(arr[i]), type).toBe(true);
    }
  });
  it('reports bad custom formulas instead of throwing', () => {
    const r = buildShapeGeometry({ ...base, objectType: 'Custom Implicit', customF: 'x^2 + foo' });
    expect(r.error).toMatch(/Unknown name: foo/);
    expect(r.geometry.attributes.position.count).toBeGreaterThan(0);
  });
  it('classifies kinds', () => {
    expect(getShapeKind('Trefoil')).toBe('curve');
    expect(getShapeKind('Klein Bottle')).toBe('parametric');
    expect(getShapeKind("Goursat's Tangle")).toBe('implicit');
    expect(getShapeKind('Ripple')).toBe('explicit');
    expect(getShapeKind('Custom Explicit')).toBe('custom-explicit');
    expect(getShapeKind('BaskınFoil')).toBe('ribbon');
  });
});

describe('implicit mesher', () => {
  it('meshes a sphere at the right radius with outward normals and winding', () => {
    const g = buildImplicitGeometry((x, y, z) => x * x + y * y + z * z - 4, 2.5, 30);
    const p = g.attributes.position.array, n = g.attributes.normal.array, idx = g.index.array;
    expect(idx.length / 3).toBeGreaterThan(300);
    // welded: far fewer vertices than 3 per triangle
    expect(g.attributes.position.count).toBeLessThan(idx.length / 2);
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), f = new THREE.Vector3();
    for (let i = 0; i < idx.length; i += 3){
      const ia = idx[i] * 3;
      a.fromArray(p, ia); b.fromArray(p, idx[i + 1] * 3); c.fromArray(p, idx[i + 2] * 3);
      expect(a.length()).toBeGreaterThan(1.9); expect(a.length()).toBeLessThan(2.1);
      // normal points away from the centre
      expect(n[ia] * a.x + n[ia + 1] * a.y + n[ia + 2] * a.z).toBeGreaterThan(0);
      // winding (b-a)x(c-a) agrees with the outward direction
      f.subVectors(b, a).cross(c.clone().sub(a));
      expect(f.dot(a)).toBeGreaterThanOrEqual(-1e-9);
    }
  });
});

describe('joint weighting', () => {
  it('bulges at joints and leaves the tube unchanged at weight 0', () => {
    const P = { ...base, jointWeight: 0.8, jointCount: 3, jointSharpness: 4, jointOffset: 0 };
    expect(jointRadiusFactor(0, P, true)).toBeCloseTo(1.8);
    expect(jointRadiusFactor(1 / 6, P, true)).toBeLessThan(1.05);
    expect(jointRadiusFactor(0.3, { ...P, jointWeight: 0 }, true)).toBe(1);
    expect(jointRadiusFactor(0, { ...P, jointWeight: -5 }, true)).toBeCloseTo(0.12); // clamped pinch
  });
  it('keeps TubeGeometry vertex layout so physics colliders still work', () => {
    const curve = CURVES[0].make(base);
    const g = buildWeightedTube(curve, 60, 0.25, 10, true, { ...base, jointWeight: 0.5 });
    const t = new THREE.TubeGeometry(curve, 60, 0.25, 10, true);
    expect(g.attributes.position.count).toBe(t.attributes.position.count);
    expect(g.index.count).toBe(t.index.count);
  });
});
