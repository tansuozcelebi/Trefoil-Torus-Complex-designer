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

  const box = document.createElement('div');
  box.style.background = '#0b0f14';
  box.style.color = '#fff';
  box.style.padding = '18px';
  box.style.borderRadius = '8px';
  box.style.maxWidth = '880px';
  box.style.maxHeight = '80vh';
  box.style.overflow = 'auto';
  box.innerHTML = (title ? `<h3>${title}</h3>` : '') + html;

  const close = document.createElement('button');
  close.textContent = 'Close';
  close.style.marginTop = '12px';
  close.style.padding = '8px 12px';
  close.style.border = 'none';
  close.style.cursor = 'pointer';
  close.addEventListener('click', () => root.remove());

  box.appendChild(close);
  root.appendChild(box);
  document.body.appendChild(root);
  return () => root.remove();
}

export function closeModal(){
  const el = document.getElementById('tc-modal-root');
  if (el) el.remove();
}
