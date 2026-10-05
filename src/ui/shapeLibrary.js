// Shape library panel: browse knots/curves and parametric, implicit and explicit
// surfaces (click to add one to the scene), plus a "Functions" box to type a
// custom formula and add it / apply it to the selected object.
import { SHAPE_GROUPS, compileExpression, getShapeKind } from '../objects/shapes.js';
import { getShapeUILabel } from './help.js';

// Nicer starting parameters for a few shapes (everything else uses the base).
const BASE = { a: 2, b: 1, p: 2, q: 3, tubeRadius: 0.25, uSegments: 400, vSegments: 32 };
const SHAPE_DEFAULTS = {
  Septafoil: { a: 1.5, b: 0.8, p: 3, q: 7 },
  Lissajous: { a: 1.6, tubeRadius: 0.18 },
  Spring: { a: 1.6, b: 0.7, q: 5, tubeRadius: 0.2 },
  'Torus Ring': { tubeRadius: 0.35, jointWeight: 0.7, jointCount: 12, jointSharpness: 3 },
  Superellipsoid: { q: 1.2 },
  'Twisted Torus': { p: 3 }
};

const OPEN_KEY = 'tc_shape_groups_open';
const MODE_KEY = 'tc_shape_fn_mode';

export function setupShapeLibrary(panel, api){
  if (!panel) return null;
  // The library list + functions box need more room than the default 60vh
  // panel; let this panel grow to the viewport so the formula box stays visible.
  panel.style.maxHeight = 'calc(100vh - 84px)';
  panel.style.width = 'min(360px, calc(100vw - 24px))';
  const L = (k) => getShapeUILabel(k, api.getLang());
  let open = {};
  try { open = JSON.parse(localStorage.getItem(OPEN_KEY) || '{}') || {}; } catch(e) { open = {}; }
  if (Object.keys(open).length === 0) open = { curves: true };
  let mode = 'implicit';
  try { mode = localStorage.getItem(MODE_KEY) || 'implicit'; } catch(e) {}
  let status = { text: '', ok: true };

  const css = {
    group: (c) => `margin-top:8px; border:1px solid rgba(255,255,255,0.09); border-left:3px solid ${c}; border-radius:8px; background:rgba(255,255,255,0.03); overflow:hidden;`,
    head: 'display:flex; align-items:center; gap:8px; width:100%; padding:9px 10px; border:none; background:transparent; color:inherit; cursor:pointer; text-align:left;',
    badge: 'margin-left:auto; min-width:22px; padding:1px 7px; border-radius:999px; background:rgba(255,255,255,0.08); font-size:11px; text-align:center; opacity:0.85;',
    item: 'display:block; width:100%; text-align:left; padding:7px 10px; border:none; border-top:1px solid rgba(255,255,255,0.06); background:transparent; color:inherit; cursor:pointer;',
    input: 'flex:1; min-width:0; padding:6px 8px; border-radius:6px; border:1px solid rgba(255,255,255,0.18); background:rgba(0,0,0,0.35); color:#fff; font-family:ui-monospace,Menlo,monospace !important; font-size:12px;',
    num: 'width:64px; padding:5px 6px; border-radius:6px; border:1px solid rgba(255,255,255,0.18); background:rgba(0,0,0,0.35); color:#fff; font-size:12px;',
    modeBtn: (on) => `flex:1; padding:6px 4px; border-radius:6px; cursor:pointer; font-weight:600; border:1px solid ${on ? '#ff6f9c' : 'rgba(255,255,255,0.14)'}; background:${on ? 'rgba(255,111,156,0.14)' : 'transparent'}; color:${on ? '#ff8fb1' : 'rgba(255,255,255,0.75)'};`,
    action: (primary) => `flex:1; padding:7px 8px; border-radius:6px; cursor:pointer; font-weight:600; border:1px solid ${primary ? '#4fd1b5' : 'rgba(255,255,255,0.16)'}; background:${primary ? 'rgba(79,209,181,0.14)' : 'rgba(255,255,255,0.05)'}; color:${primary ? '#7fe8cf' : '#fff'};`
  };

  function el(tag, style, text){ const e = document.createElement(tag); if (style) e.style.cssText = style; if (text != null) e.textContent = text; return e; }

  function groupTitle(g){
    if (g.key === 'curves') return L('curves');
    if (g.key === 'parametric') return `${L('parametric')} (u,v)`;
    if (g.key === 'implicit') return `${L('implicit')} (F = 0)`;
    return `${L('explicit')} z = f(x,y)`;
  }

  // Current formula values come from the selected object if it is a custom
  // shape of the matching kind, otherwise from the shared params.
  function formulas(){ const P = api.getParams(); return {
    customF: P.customF, customExplicit: P.customExplicit, customX: P.customX, customY: P.customY, customZ: P.customZ,
    uMin: P.uMin, uMax: P.uMax, vMin: P.vMin, vMax: P.vMax }; }

  function render(){
    const scroll = panel.querySelector('.tc-shapes-scroll');
    const keepScroll = scroll ? scroll.scrollTop : 0;
    const keep = draft || formulas();
    panel.innerHTML = '';
    panel.appendChild(el('strong', '', L('library')));
    panel.appendChild(el('div', 'margin-top:4px; font-size:12px; opacity:0.7;', L('hint')));

    const list = el('div', 'margin-top:6px; max-height:36vh; overflow-y:auto; padding-right:2px;');
    list.className = 'tc-shapes-scroll';
    SHAPE_GROUPS.forEach(g => {
      const box = el('div', css.group(g.color));
      const head = el('button', css.head);
      head.innerHTML = `<span style="font-weight:700; color:${g.color};"></span><span style="${css.badge}"></span><span style="opacity:0.6; font-size:10px;">${open[g.key] ? '▲' : '▼'}</span>`;
      head.children[0].textContent = groupTitle(g);
      head.children[1].textContent = String(g.items.length);
      head.addEventListener('click', () => { open[g.key] = !open[g.key]; try { localStorage.setItem(OPEN_KEY, JSON.stringify(open)); } catch(e) {} render(); });
      box.appendChild(head);
      if (open[g.key]){
        g.items.forEach(item => {
          const b = el('button', css.item);
          const name = item.name || item.id;
          b.appendChild(el('div', 'font-weight:600; font-size:13px;', name));
          b.appendChild(el('div', 'font-size:11.5px; opacity:0.6; margin-top:1px;', item.desc || ''));
          b.addEventListener('mouseenter', () => { b.style.background = 'rgba(255,255,255,0.06)'; });
          b.addEventListener('mouseleave', () => { b.style.background = 'transparent'; });
          b.addEventListener('click', () => api.addShape(item.id, name, item.desc || '', { ...BASE, ...(SHAPE_DEFAULTS[item.id] || {}) }));
          box.appendChild(b);
        });
      }
      list.appendChild(box);
    });
    panel.appendChild(list);
    list.scrollTop = keepScroll;

    // ---- Functions box --------------------------------------------------
    const fbox = el('div', 'margin-top:12px; padding:10px; border:1px solid rgba(79,209,181,0.45); border-radius:10px; background:rgba(79,209,181,0.04);');
    fbox.appendChild(el('div', 'font-size:11px; letter-spacing:1px; text-transform:uppercase; opacity:0.7; margin-bottom:8px;', L('functions')));
    const modes = el('div', 'display:flex; gap:6px; margin-bottom:8px;');
    [['explicit', L('explicit')], ['implicit', L('implicit')], ['parametric', L('parametric')]].forEach(([m, label]) => {
      const b = el('button', css.modeBtn(mode === m), label);
      b.addEventListener('click', () => { mode = m; try { localStorage.setItem(MODE_KEY, m); } catch(e) {} draft = readDraft(); render(); });
      modes.appendChild(b);
    });
    fbox.appendChild(modes);

    const row = (label, key, suffix) => {
      const r = el('div', 'display:flex; align-items:center; gap:6px; margin-top:6px;');
      r.appendChild(el('span', 'font-family:ui-monospace,Menlo,monospace !important; font-weight:700; min-width:34px;', label));
      const inp = el('input', css.input); inp.value = keep[key]; inp.dataset.key = key; inp.spellcheck = false;
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(false); });
      r.appendChild(inp);
      if (suffix) r.appendChild(el('span', 'opacity:0.5; font-size:12px;', suffix));
      return r;
    };
    const range = (label, kMin, kMax) => {
      const r = el('div', 'display:flex; align-items:center; gap:6px; margin-top:6px; font-size:12px;');
      r.appendChild(el('span', 'min-width:34px; font-family:ui-monospace,Menlo,monospace !important;', label));
      [kMin, kMax].forEach((k, i) => {
        const inp = el('input', css.num); inp.type = 'number'; inp.step = '0.1'; inp.value = keep[k]; inp.dataset.key = k;
        r.appendChild(inp);
        if (i === 0) r.appendChild(el('span', 'opacity:0.5;', '…'));
      });
      return r;
    };
    if (mode === 'explicit'){
      fbox.appendChild(el('div', 'font-size:11px; opacity:0.5; font-family:ui-monospace,Menlo,monospace !important;', 'z = f(x, y)'));
      fbox.appendChild(row('z =', 'customExplicit'));
    } else if (mode === 'implicit'){
      fbox.appendChild(el('div', 'font-size:11px; opacity:0.5; font-family:ui-monospace,Menlo,monospace !important;', 'F(x, y, z) = 0'));
      fbox.appendChild(row('F =', 'customF', '= 0'));
    } else {
      fbox.appendChild(el('div', 'font-size:11px; opacity:0.5; font-family:ui-monospace,Menlo,monospace !important;', 'r(u, v) = (x, y, z)'));
      fbox.appendChild(row('x =', 'customX'));
      fbox.appendChild(row('y =', 'customY'));
      fbox.appendChild(row('z =', 'customZ'));
      fbox.appendChild(range('u', 'uMin', 'uMax'));
      fbox.appendChild(range('v', 'vMin', 'vMax'));
    }
    const actions = el('div', 'display:flex; gap:6px; margin-top:10px;');
    const addBtn = el('button', css.action(true), L('add'));
    addBtn.addEventListener('click', () => submit(true));
    const applyBtn = el('button', css.action(false), L('apply'));
    applyBtn.addEventListener('click', () => submit(false));
    actions.appendChild(addBtn); actions.appendChild(applyBtn);
    fbox.appendChild(actions);
    const st = el('div', `margin-top:6px; min-height:15px; font-size:11.5px; color:${status.ok ? '#7fe8cf' : '#ff8f8f'};`, status.text);
    st.className = 'tc-shapes-status';
    fbox.appendChild(st);
    fbox.appendChild(el('div', 'margin-top:4px; font-size:10.5px; opacity:0.45; line-height:1.4;', 'sin cos tan exp log sqrt abs min max pow hypot · pi e · x^2 = x²'));
    panel.appendChild(fbox);
    draft = null;
  }

  // Unsaved edits in the inputs survive re-renders (mode switch, language).
  let draft = null;
  function readDraft(){
    const d = formulas();
    panel.querySelectorAll('input[data-key]').forEach(i => { d[i.dataset.key] = i.type === 'number' ? parseFloat(i.value) : i.value; });
    return d;
  }

  function submit(asNew){
    const d = readDraft();
    const type = mode === 'explicit' ? 'Custom Explicit' : mode === 'implicit' ? 'Custom Implicit' : 'Custom Parametric';
    try {
      if (mode === 'explicit') compileExpression(d.customExplicit, ['x', 'y']);
      else if (mode === 'implicit') compileExpression(d.customF, ['x', 'y', 'z']);
      else {
        ['customX', 'customY', 'customZ'].forEach(k => compileExpression(d[k], ['u', 'v']));
        ['uMin', 'uMax', 'vMin', 'vMax'].forEach(k => { if (!Number.isFinite(d[k])) throw new Error(`${k} must be a number`); });
      }
    } catch (e){
      status = { text: '⚠ ' + e.message, ok: false };
      draft = d; render();
      return;
    }
    const patch = { objectType: type, ...d };
    const label = mode === 'explicit' ? `z = ${d.customExplicit}` : mode === 'implicit' ? `${d.customF} = 0` : 'r(u,v)';
    if (asNew) api.addShape(type, type.replace('Custom ', 'f · '), label.slice(0, 48), { ...BASE, ...patch });
    else api.applyToActive(patch);
    status = { text: '✓ ' + (asNew ? L('add').replace('+', '').trim() : L('apply')), ok: true };
    draft = d; render();
  }

  // Shape builds can still fail at runtime (e.g. NaN-only formulas): surface it.
  window.addEventListener('tc-shape-built', (e) => {
    const err = e.detail && e.detail.error;
    const kind = getShapeKind(e.detail && e.detail.type);
    if (!kind.startsWith('custom')) return;
    const st = panel.querySelector('.tc-shapes-status');
    if (err && st){ st.textContent = '⚠ ' + err; st.style.color = '#ff8f8f'; }
  });

  render();
  if (api.onLanguageChange) api.onLanguageChange(() => { draft = readDraft(); render(); });
  return { render };
}
