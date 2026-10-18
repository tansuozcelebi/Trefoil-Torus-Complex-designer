import { describe, it, expect } from 'vitest';
import { snapPosition } from './floatingPanels.js';

const VW = 1280, VH = 800;

describe('snapPosition', () => {
  it('snaps to the viewport edges within the magnet distance', () => {
    const s = snapPosition({ left: 15, top: 300, width: 200, height: 100 }, [], VW, VH);
    expect(s.left).toBe(8);
    expect(s.snappedX).toBe(true);
    expect(s.top).toBe(300);
    expect(s.snappedY).toBe(false);
  });

  it('docks beside another panel and aligns its top edge', () => {
    const other = { left: 100, top: 100, width: 300, height: 200 };
    // dragged just right of `other`, slightly lower
    const s = snapPosition({ left: 410, top: 108, width: 150, height: 80 }, [other], VW, VH);
    expect(s.left).toBe(406); // other.right + gap
    expect(s.top).toBe(100);  // tops aligned
  });

  it('stacks under another panel and aligns its left edge', () => {
    const other = { left: 500, top: 50, width: 300, height: 40 };
    const s = snapPosition({ left: 505, top: 99, width: 200, height: 120 }, [other], VW, VH);
    expect(s.top).toBe(96);   // other.bottom + gap
    expect(s.left).toBe(500); // left edges aligned
  });

  it('leaves the position alone when nothing is near and keeps it on screen', () => {
    const s = snapPosition({ left: 600, top: 400, width: 100, height: 100 }, [], VW, VH);
    expect([s.left, s.top, s.snappedX, s.snappedY]).toEqual([600, 400, false, false]);
    const off = snapPosition({ left: 2000, top: -50, width: 100, height: 100 }, [], VW, VH);
    expect([off.left, off.top]).toEqual([VW - 100, 0]);
  });
});
