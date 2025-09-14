import { TrefoilCurve } from '../src/trefoil.js';

test('TrefoilCurve getPoint returns Vector3 on [0,1]', () => {
  const c = new TrefoilCurve(2,1,2,3);
  const p0 = c.getPoint(0);
  const pMid = c.getPoint(0.5);
  expect(p0).toBeDefined();
  expect(p0.x).not.toBeNaN();
  expect(pMid.z).not.toBeNaN();
});
