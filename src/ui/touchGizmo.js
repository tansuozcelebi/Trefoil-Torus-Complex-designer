// Touch 6-axis Transform Gizmo (Mobile/Tablet)

function isTouchDevice(){
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

let gizmoRoot = null;
let gizmoVisible = true;
const moveStepBase = 0.1;
const rotStep = 5; // degrees
let repeatTimer = null;

// Setup touch gizmo with dependencies from main app
export function setupTouchGizmo(params, saveParamsToActive, applyTransform, gui){
  if (!isTouchDevice()) return;
  
  function applyAndSaveTransform(){
    saveParamsToActive();
    applyTransform();
    try { gui.updateDisplay(); } catch(e){}
  }

  function buildTouchGizmo(){
    if (gizmoRoot) return;
    gizmoRoot = document.createElement('div');
    gizmoRoot.style.position = 'fixed';
    // restore saved position if any
    const savedPos = JSON.parse(localStorage.getItem('tc_gizmo_pos')||'null');
    if (savedPos && typeof savedPos.x==='number' && typeof savedPos.y==='number'){
      gizmoRoot.style.left = savedPos.x + 'px';
      gizmoRoot.style.top = savedPos.y + 'px';
    } else {
      gizmoRoot.style.right = '12px';
      gizmoRoot.style.bottom = '12px';
    }
    gizmoRoot.style.zIndex = '1500';
    gizmoRoot.style.display = 'flex';
    gizmoRoot.style.flexDirection = 'column';
    gizmoRoot.style.gap = '6px';
    gizmoRoot.style.pointerEvents = 'auto';

    // DRAG HANDLE
    const dragBar = document.createElement('div');
    dragBar.textContent = '⇕ Gizmo';
    dragBar.style.cursor = 'move';
    dragBar.style.userSelect = 'none';
    dragBar.style.fontSize = '11px';
    dragBar.style.letterSpacing = '0.5px';
    dragBar.style.padding = '4px 10px 4px 10px';
    dragBar.style.alignSelf = 'stretch';
    dragBar.style.background = 'linear-gradient(90deg,#20262e,#1a1f25)';
    dragBar.style.border = '1px solid rgba(255,255,255,0.08)';
    dragBar.style.borderRadius = '10px 10px 0 0';
    dragBar.style.color = '#9fd6ff';
    dragBar.style.fontWeight = '600';
    dragBar.style.textShadow = '0 0 6px rgba(0,180,255,0.55)';
    dragBar.style.backdropFilter = 'blur(6px)';

    let dragState = null; // {ox, oy, sx, sy, hadExplicit}
    const startDrag = (clientX, clientY) => {
      const rect = gizmoRoot.getBoundingClientRect();
      dragState = { ox: clientX, oy: clientY, sx: rect.left, sy: rect.top, hadExplicit: gizmoRoot.style.left!=='' || gizmoRoot.style.top!=='' };
      // if anchored by right/bottom, convert to left/top
      if (!dragState.hadExplicit){
        gizmoRoot.style.left = rect.left + 'px';
        gizmoRoot.style.top = rect.top + 'px';
        gizmoRoot.style.right = 'auto';
        gizmoRoot.style.bottom = 'auto';
      }
      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', onDragMove, { passive:false });
      document.addEventListener('touchend', endDrag);
    };
    const onDragMove = (e) => {
      if (!dragState) return;
      let cx, cy;
      if (e.touches && e.touches.length){ cx = e.touches[0].clientX; cy = e.touches[0].clientY; e.preventDefault(); }
      else { cx = e.clientX; cy = e.clientY; }
      const dx = cx - dragState.ox; const dy = cy - dragState.oy;
      let nx = dragState.sx + dx; let ny = dragState.sy + dy;
      // clamp inside viewport
      const maxX = window.innerWidth - 40; const maxY = window.innerHeight - 40;
      nx = Math.min(Math.max(-5, nx), maxX);
      ny = Math.min(Math.max(-5, ny), maxY);
      gizmoRoot.style.left = nx + 'px';
      gizmoRoot.style.top = ny + 'px';
    };
    const endDrag = () => {
      if (dragState){
        // persist
        const rect = gizmoRoot.getBoundingClientRect();
        localStorage.setItem('tc_gizmo_pos', JSON.stringify({ x: rect.left, y: rect.top }));
      }
      dragState = null;
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', onDragMove);
      document.removeEventListener('touchend', endDrag);
    };
    dragBar.addEventListener('mousedown', (e)=>{ startDrag(e.clientX, e.clientY); });
    dragBar.addEventListener('touchstart', (e)=>{ if (e.touches && e.touches.length){ startDrag(e.touches[0].clientX, e.touches[0].clientY); } });

    const panel = document.createElement('div');
    panel.style.display = 'grid';
    panel.style.gridTemplateColumns = 'repeat(3, 56px)';
    panel.style.gap = '6px';
    panel.style.padding = '10px';
    panel.style.background = 'rgba(15,15,20,0.88)';
    panel.style.backdropFilter = 'blur(6px)';
    panel.style.border = '1px solid rgba(255,255,255,0.12)';
    panel.style.borderRadius = '0 0 10px 10px';
    panel.style.fontFamily = 'var(--tc-font, system-ui)';
    panel.style.boxShadow = '0 4px 18px -4px rgba(0,0,0,0.6)';

    function makeBtn(label, color){
      const b = document.createElement('button');
      b.textContent = label;
      b.style.padding = '10px 4px';
      b.style.fontSize = '12px';
      b.style.fontWeight = '600';
      b.style.background = color || '#2a2f38';
      b.style.color = '#fff';
      b.style.border = 'none';
      b.style.borderRadius = '6px';
      b.style.cursor = 'pointer';
      b.style.touchAction = 'manipulation';
      b.style.position = 'relative';
      b.style.boxShadow = '0 0 0px rgba(0,180,255,0.0), 0 0 0px rgba(255,255,255,0.0)';
      b.style.transition = 'box-shadow 0.25s ease, transform 0.15s ease, filter 0.2s';
      b.addEventListener('mouseenter', ()=>{ b.style.boxShadow='0 0 8px rgba(0,200,255,0.65), 0 0 18px rgba(0,120,255,0.35)'; });
      b.addEventListener('mouseleave', ()=>{ b.style.boxShadow='0 0 0px rgba(0,180,255,0.0)'; });
      const pressOn = ()=>{ b.style.transform='translateY(1px) scale(0.97)'; b.style.boxShadow='0 0 14px rgba(0,220,255,0.9), 0 0 28px rgba(0,150,255,0.55)'; };
      const pressOff = ()=>{ b.style.transform='translateY(0) scale(1)'; b.style.boxShadow='0 0 8px rgba(0,200,255,0.65), 0 0 18px rgba(0,120,255,0.35)'; };
      b.addEventListener('mousedown', pressOn);
      b.addEventListener('mouseup', pressOff);
      b.addEventListener('mouseleave', ()=>{ b.style.transform='translateY(0) scale(1)'; });
      b.addEventListener('touchstart', (ev)=>{ ev.preventDefault(); b.style.filter='brightness(1.25)'; });
      b.addEventListener('touchend', ()=>{ b.style.filter='none'; });
      return b;
    }

    function handleAction(fn){
      fn();
      clearInterval(repeatTimer);
      repeatTimer = setInterval(fn, 120);
    }
    function stopRepeat(){ clearInterval(repeatTimer); repeatTimer=null; }

    const actions = [
      { label:'X+', fn:()=>{ params.posX += moveStepBase; applyAndSaveTransform(); } },
      { label:'X-', fn:()=>{ params.posX -= moveStepBase; applyAndSaveTransform(); } },
      { label:'Y+', fn:()=>{ params.posY += moveStepBase; applyAndSaveTransform(); } },
      { label:'Y-', fn:()=>{ params.posY -= moveStepBase; applyAndSaveTransform(); } },
      { label:'Z+', fn:()=>{ params.posZ += moveStepBase; applyAndSaveTransform(); } },
      { label:'Z-', fn:()=>{ params.posZ -= moveStepBase; applyAndSaveTransform(); } },
      { label:'RX+', fn:()=>{ params.rotX = (params.rotX + rotStep)%360; applyAndSaveTransform(); } },
      { label:'RX-', fn:()=>{ params.rotX = (params.rotX - rotStep)%360; applyAndSaveTransform(); } },
      { label:'RY+', fn:()=>{ params.rotY = (params.rotY + rotStep)%360; applyAndSaveTransform(); } },
      { label:'RY-', fn:()=>{ params.rotY = (params.rotY - rotStep)%360; applyAndSaveTransform(); } },
      { label:'RZ+', fn:()=>{ params.rotZ = (params.rotZ + rotStep)%360; applyAndSaveTransform(); } },
      { label:'RZ-', fn:()=>{ params.rotZ = (params.rotZ - rotStep)%360; applyAndSaveTransform(); } }
    ];

    actions.forEach(a=>{
      const b = makeBtn(a.label);
      b.addEventListener('mousedown', ()=>handleAction(a.fn));
      b.addEventListener('mouseup', stopRepeat);
      b.addEventListener('mouseleave', stopRepeat);
      b.addEventListener('touchstart', ()=>handleAction(a.fn));
      b.addEventListener('touchend', stopRepeat);
      b.addEventListener('touchcancel', stopRepeat);
      panel.appendChild(b);
    });

    const toggle = document.createElement('button');
    toggle.textContent = 'Gizmo Hide';
    toggle.style.marginTop = '6px';
    toggle.style.padding = '8px 10px';
    toggle.style.border = 'none';
    toggle.style.background = '#444';
    toggle.style.color = '#fff';
    toggle.style.borderRadius = '6px';
    toggle.style.cursor = 'pointer';
    toggle.addEventListener('click', ()=>{
      gizmoVisible = !gizmoVisible;
      panel.style.display = gizmoVisible ? 'grid' : 'none';
      toggle.textContent = gizmoVisible ? 'Gizmo Hide' : 'Gizmo Show';
    });

    gizmoRoot.appendChild(dragBar);
    gizmoRoot.appendChild(panel);
    gizmoRoot.appendChild(toggle);
    document.body.appendChild(gizmoRoot);
  }

  buildTouchGizmo();
}
