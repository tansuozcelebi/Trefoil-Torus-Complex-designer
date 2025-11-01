// Minimal modal utility
export function showModal(html, { title = '' } = {}){
  let existing = document.getElementById('tc-modal-root');
  if (existing) existing.remove();
  const root = document.createElement('div');
  root.id = 'tc-modal-root';
  root.style.position = 'fixed';
  root.style.left = '0';
  root.style.top = '0';
  root.style.width = '100%';
  root.style.height = '100%';
  root.style.display = 'flex';
  root.style.alignItems = 'center';
  root.style.justifyContent = 'center';
  root.style.zIndex = '2000';
  root.style.background = 'rgba(0,0,0,0.6)';
  // Fade-in transition for overlay
  root.style.opacity = '0';
  root.style.transition = 'opacity 200ms ease-out';

  const box = document.createElement('div');
  box.style.background = '#0b0f14';
  box.style.color = '#fff';
  box.style.padding = '18px';
  box.style.borderRadius = '8px';
  box.style.maxWidth = '880px';
  box.style.maxHeight = '80vh';
  box.style.overflow = 'auto';
  // Pop-in transition for dialog
  box.style.opacity = '0';
  box.style.transform = 'translateY(6px) scale(0.96)';
  box.style.transition = 'opacity 220ms ease-out, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)';
  box.innerHTML = (title ? `<h3>${title}</h3>` : '') + html;

  const close = document.createElement('button');
  close.textContent = 'Close';
  close.style.marginTop = '12px';
  close.style.padding = '8px 12px';
  close.style.border = 'none';
  close.style.cursor = 'pointer';
  let closing = false;
  const animateOutAndRemove = () => {
    if (closing) return; closing = true;
    // Start fade/scale out
    root.style.opacity = '0';
    box.style.opacity = '0';
    box.style.transform = 'translateY(6px) scale(0.96)';
    // Remove after transitions
    window.setTimeout(() => { if (root && root.parentNode) root.parentNode.removeChild(root); }, 230);
  };
  close.addEventListener('click', animateOutAndRemove);

  box.appendChild(close);
  root.appendChild(box);
  document.body.appendChild(root);
  // Kick off enter animations on next frame
  requestAnimationFrame(() => {
    root.style.opacity = '1';
    box.style.opacity = '1';
    box.style.transform = 'none';
  });
  return () => animateOutAndRemove();
}

export function closeModal(){
  const el = document.getElementById('tc-modal-root');
  if (!el) return;
  const box = el.firstElementChild;
  // Animate out similarly to the close button
  el.style.transition = el.style.transition || 'opacity 200ms ease-out';
  el.style.opacity = '0';
  if (box && box instanceof HTMLElement) {
    box.style.transition = box.style.transition || 'opacity 220ms ease-out, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)';
    box.style.opacity = '0';
    box.style.transform = 'translateY(6px) scale(0.96)';
  }
  window.setTimeout(() => { if (el && el.parentNode) el.parentNode.removeChild(el); }, 230);
}
