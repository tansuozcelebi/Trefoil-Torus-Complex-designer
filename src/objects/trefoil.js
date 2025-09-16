import * as THREE from 'three';

// Trefoil curve: parametric family with p=2, q=3 by default ama orjinali istediğim gibi olmadı aslında
export class TrefoilCurve extends THREE.Curve {
  constructor(a = 2.0, b = 1.0, p = 2, q = 3) {
    super();
    this.a = a;
    this.b = b;
    this.p = p;
    this.q = q;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const theta = t * Math.PI * 2;
    const a = this.a;
    const b = this.b;
    const p = this.p;
    const q = this.q;
//denklemimiz bu
    const x = (a + b * Math.cos(q * theta)) * Math.cos(p * theta);
    const y = (a + b * Math.cos(q * theta)) * Math.sin(p * theta);
    const z = b * Math.sin(q * theta);

    return optionalTarget.set(x, y, z);
  }

  updateParams({ a, b, p, q }){
    if (a !== undefined) this.a = a;
    if (b !== undefined) this.b = b;
    if (p !== undefined) this.p = p;
    if (q !== undefined) this.q = q;
  }
}
