// Floating panels: draggable, closable on-screen panels (navbar, statistics,
// gizmo) that snap magnetically to the viewport edges and to each other.
// A closed panel shrinks into a chip in the dock at the bottom of the screen;
// clicking the chip grows the panel back. Position and closed state persist.

const SNAP = 14;    // px: magnet distance
const GAP = 6;      // px: gap kept between panels snapped side by side
const EDGE = 8;     // px: margin kept to the viewport edges
const DURATION = 320;

const registry = []; // { el, isHidden() }

let dock = null;
function ensureDock(){
  if (dock) return dock;
  dock = document.createElement('div');
  dock.className = 'tc-dock';
  dock.style.cssText = 'position:fixed; left:50%; bottom:12px; transform:translateX(-50%); z-index:1600; display:flex; gap:6px; pointer-events:none;';
  document.body.appendChild(dock);
  return dock;
}

// Pure snapping math (exported for tests). rect: {left, top, width, height} of
// the panel being dragged at its raw position; others: rects of the other
// visible panels; vw/vh: viewport size. Returns {left, top, snappedX, snappedY}.
export function snapPosition(rect, others, vw, vh){
  const { width: w, height: h } = rect;
  let { left, top } = rect;
  const xs = [EDGE, vw - w - EDGE];
  const ys = [EDGE, vh - h - EDGE];
  const overlap = (a0, a1, b0, b1) => a0 < b1 + SNAP && b0 < a1 + SNAP;
  for (const o of others){
    const oRight = o.left + o.width, oBottom = o.top + o.height;
    if (overlap(top, top + h, o.top, oBottom)){
      xs.push(oRight + GAP, o.left - w - GAP); // side by side
    }
    if (overlap(left, left + w, o.left, oRight)){
      ys.push(oBottom + GAP, o.top - h - GAP); // stacked
      xs.push(o.left, oRight - w);             // aligned edges when stacked
    }
    if (overlap(top, top + h, o.top, oBottom)){
      ys.push(o.top, oBottom - h);             // aligned edges when side by side
    }
  }
  const pick = (v, cands) => {
    let best = null, bd = SNAP + 1;
    for (const c of cands){ const d = Math.abs(c - v); if (d < bd){ bd = d; best = c; } }
    return best;
  };
  const sx = pick(left, xs), sy = pick(top, ys);
  if (sx !== null) left = sx;
  if (sy !== null) top = sy;
  left = Math.max(0, Math.min(vw - w, left));
  top = Math.max(0, Math.min(vh - h, top));
  return { left, top, snappedX: sx !== null, snappedY: sy !== null };
}

export function makeCloseButton(title){
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = '✕';
  b.title = title || 'Close';
  b.setAttribute('aria-label', b.title);
  b.style.cssText = 'border:none; background:transparent; color:inherit; cursor:pointer; font-size:12px; line-height:1; padding:2px 4px; opacity:0.7; flex:0 0 auto; border-radius:4px;';
  b.addEventListener('mouseenter', () => { b.style.opacity = '1'; b.style.background = 'rgba(255,90,90,0.25)'; });
  b.addEventListener('mouseleave', () => { b.style.opacity = '0.7'; b.style.background = 'transparent'; });
  return b;
}

// el:       the panel (position: fixed)
// opts.key: storage key suffix; opts.handle: drag handle element;
// opts.closeButton: element that closes the panel;
// opts.label / opts.icon: chip text and inline SVG; opts.legacy(): optional
// {left, top, hidden} read from an older storage format.
export function makeFloating(el, opts){
  const key = 'tc_float_' + opts.key;
  const shownDisplay = el.style.display && el.style.display !== 'none' ? el.style.display : 'block';
  let hidden = false;

  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'tc-dock-chip';
  chip.style.cssText = 'pointer-events:auto; display:none; align-items:center; gap:6px; padding:6px 10px; border:1px solid rgba(255,255,255,0.12); border-radius:999px; background:rgba(20,20,26,0.82); backdrop-filter:blur(6px); color:#fff; font:600 11px var(--tc-font, system-ui); cursor:pointer; box-shadow:0 4px 14px rgba(0,0,0,0.35);';
  const chipLabel = document.createElement('span');
  chip.innerHTML = opts.icon || '';
  chip.appendChild(chipLabel);
  chipLabel.textContent = opts.label || opts.key;
  chip.title = chipLabel.textContent;
  chip.addEventListener('click', () => show(true));
  ensureDock().appendChild(chip);

  function save(){
    try {
      localStorage.setItem(key, JSON.stringify({
        left: el.style.left || null, top: el.style.top || null, hidden
      }));
    } catch(e) {}
  }

  function placeAt(left, top){
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
  }

  function clampIntoView(){
    if (hidden || !el.style.top || el.style.top === 'auto') return;
    const r = el.getBoundingClientRect();
    const left = Math.max(0, Math.min(window.innerWidth - r.width, r.left));
    const top = Math.max(0, Math.min(window.innerHeight - r.height, r.top));
    if (left !== r.left || top !== r.top) placeAt(left, top);
  }

  // Animate between the panel and its chip (a small "genie" shrink/grow).
  function flyOffset(){
    const r = el.getBoundingClientRect(), c = chip.getBoundingClientRect();
    return { dx: (c.left + c.width / 2) - (r.left + r.width / 2), dy: (c.top + c.height / 2) - (r.top + r.height / 2) };
  }

  function hide(animate){
    if (hidden) return;
    hidden = true;
    save();
    chip.style.display = 'inline-flex';
    if (animate && el.animate){
      const { dx, dy } = flyOffset();
      const a = el.animate(
        [{ transform: 'none', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0 }],
        { duration: DURATION, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
      a.onfinish = () => { if (hidden) el.style.display = 'none'; };
      chip.animate([{ transform: 'scale(0.4)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
        { duration: 260, delay: DURATION * 0.6, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1.3)', fill: 'backwards' });
    } else {
      el.style.display = 'none';
    }
    if (opts.onChange) opts.onChange(false);
  }

  function show(animate){
    if (!hidden) return;
    hidden = false;
    el.style.display = shownDisplay;
    clampIntoView();
    save();
    if (animate && el.animate){
      const { dx, dy } = flyOffset();
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: DURATION, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1.15)' });
      const a = chip.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0.4)', opacity: 0 }],
        { duration: 180, easing: 'ease-in' });
      a.onfinish = () => { if (!hidden) chip.style.display = 'none'; };
    } else {
      chip.style.display = 'none';
    }
    if (opts.onChange) opts.onChange(true);
  }

  if (opts.closeButton){
    opts.closeButton.addEventListener('pointerdown', (e) => e.stopPropagation());
    opts.closeButton.addEventListener('click', (e) => { e.stopPropagation(); hide(true); });
  }

  // --- Drag with magnetic snapping ---
  const handle = opts.handle || el;
  handle.style.touchAction = 'none';
  handle.style.cursor = 'move';
  handle.style.userSelect = 'none';
  let drag = null;
  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    if (opts.closeButton && opts.closeButton.contains(e.target)) return;
    const r = el.getBoundingClientRect();
    placeAt(r.left, r.top);
    drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, h: r.height };
    try { handle.setPointerCapture(e.pointerId); } catch(_) {}
    e.preventDefault();
  });
  handle.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const others = registry
      .filter(p => p.el !== el && !p.isHidden() && p.el.style.display !== 'none')
      .map(p => p.el.getBoundingClientRect());
    const s = snapPosition({ left: e.clientX - drag.dx, top: e.clientY - drag.dy, width: drag.w, height: drag.h },
      others, window.innerWidth, window.innerHeight);
    placeAt(s.left, s.top);
    el.style.outline = (s.snappedX || s.snappedY) ? '1px solid rgba(80,190,255,0.75)' : '';
  });
  const endDrag = (e) => {
    if (!drag) return;
    drag = null;
    el.style.outline = '';
    try { handle.releasePointerCapture(e.pointerId); } catch(_) {}
    save();
  };
  handle.addEventListener('pointerup', endDrag);
  handle.addEventListener('pointercancel', endDrag);

  // --- Restore saved state ---
  let state = null;
  try { state = JSON.parse(localStorage.getItem(key) || 'null'); } catch(e) {}
  if (!state && opts.legacy){ try { state = opts.legacy(); } catch(e) {} }
  if (state){
    if (state.left && state.top && state.top !== 'auto'){
      el.style.left = state.left; el.style.top = state.top;
      el.style.right = 'auto'; el.style.bottom = 'auto';
    }
    if (state.hidden){ hidden = true; el.style.display = 'none'; chip.style.display = 'inline-flex'; }
  }
  requestAnimationFrame(clampIntoView);
  window.addEventListener('resize', clampIntoView);

  const api = {
    el, show, hide,
    toggle: () => (hidden ? show(true) : hide(true)),
    isHidden: () => hidden,
    setLabel: (txt) => { chipLabel.textContent = txt; chip.title = txt; }
  };
  registry.push(api);
  return api;
}
