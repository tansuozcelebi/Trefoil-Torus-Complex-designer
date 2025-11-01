// Keyboard controls extracted from main.js
// Provides WASDQE for position and I/K/J/L/U/O/N/M for parameters
export function setupKeyboardControls({ params, getActiveRecord, applyTransform, rebuild, saveParamsToActive, gui }){
  function onKeyDown(e){
    const rec = typeof getActiveRecord === 'function' ? getActiveRecord() : null;
    if (!rec) return;
    let changed = false;
    const step = e.shiftKey ? 0.4 : 0.1;
    switch (e.key.toLowerCase()){
      case 'w': params.posY += step; changed = true; break;
      case 's': params.posY -= step; changed = true; break;
      case 'a': params.posX -= step; changed = true; break;
      case 'd': params.posX += step; changed = true; break;
      case 'q': params.posZ -= step; changed = true; break;
      case 'e': params.posZ += step; changed = true; break;
      case 'i': params.a += 0.05; changed = true; break;
      case 'k': params.a -= 0.05; changed = true; break;
      case 'j': params.b -= 0.05; changed = true; break;
      case 'l': params.b += 0.05; changed = true; break;
      case 'u': params.p = Math.max(1, params.p - 1); changed = true; break;
      case 'o': params.p = Math.min(15, params.p + 1); changed = true; break;
      case 'n': params.q = Math.max(1, params.q - 1); changed = true; break;
      case 'm': params.q = Math.min(15, params.q + 1); changed = true; break;
    }
    if (!changed) return;
    params.a = Math.max(0.1, Math.min(5, params.a));
    params.b = Math.max(0, Math.min(2, params.b));
    params.p = Math.round(params.p);
    params.q = Math.round(params.q);
    saveParamsToActive && saveParamsToActive();
    if ('ikjl uonm'.includes(e.key.toLowerCase())){ rebuild && rebuild(); }
    else { applyTransform && applyTransform(); }
    try { gui && gui.updateDisplay && gui.updateDisplay(); } catch(_){}
    e.preventDefault();
  }
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}
