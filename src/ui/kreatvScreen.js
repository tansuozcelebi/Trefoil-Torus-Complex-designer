import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// KREATV screen: a YouTube video that plays continuously on the TV's screen.
// The video is a real <iframe> laid out in 3D by a CSS3DRenderer that sits
// *behind* the transparent WebGL canvas. The TV's screen is a mesh that writes
// alpha 0 ("punches a hole"), so the video shows through exactly where the
// screen is visible, and objects in front of the TV still cover it.
export const KREATV_VIDEO_ID = 'VqpZqw_ES44';
const EMBED_URL = `https://www.youtube.com/embed/${KREATV_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${KREATV_VIDEO_ID}`
  + '&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1';
const PX_W = 960, PX_H = 540;

let _logoTexture = null;
function logoTexture(){
  if (_logoTexture) return _logoTexture;
  const c = document.createElement('canvas'); c.width = 512; c.height = 92;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#16181d'; ctx.fillRect(0, 0, c.width, c.height);
  ctx.font = 'bold 64px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#e8ecf2'; ctx.fillText('KREA', c.width / 2 - 52, c.height / 2 + 2);
  ctx.fillStyle = '#ff9f43'; ctx.fillText('TV', c.width / 2 + 112, c.height / 2 + 2);
  _logoTexture = new THREE.CanvasTexture(c);
  _logoTexture.colorSpace = THREE.SRGBColorSpace;
  return _logoTexture;
}

export function createKreaTvLayer({ scene, camera, before }){
  const css = new CSS3DRenderer();
  css.setSize(window.innerWidth, window.innerHeight);
  // Same stacking level as the WebGL canvas but earlier in the DOM, so it is
  // painted underneath it (and above the Clearwater background canvas).
  css.domElement.style.cssText = 'position:fixed; inset:0; z-index:1; pointer-events:none;';
  css.domElement.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(css.domElement, before || null);

  const screens = new Set(); // CSS3DObjects currently created

  function attach(mesh, layout){
    if (!mesh || !layout) return;
    const { screen, logo } = layout;

    // Hole-punch screen: NoBlending + opacity 0 writes transparent pixels.
    const hole = new THREE.Mesh(
      new THREE.PlaneGeometry(screen.w, screen.h),
      new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, blending: THREE.NoBlending })
    );
    hole.position.set(screen.x, screen.y, screen.z);
    hole.name = 'kreatv-screen';
    mesh.add(hole);

    const badge = new THREE.Mesh(
      new THREE.PlaneGeometry(logo.w, logo.h),
      new THREE.MeshBasicMaterial({ map: logoTexture() })
    );
    badge.position.set(logo.x, logo.y, logo.z);
    badge.name = 'kreatv-logo';
    mesh.add(badge);

    const el = document.createElement('div');
    el.style.cssText = `width:${PX_W}px; height:${PX_H}px; background:#000; backface-visibility:hidden;`;
    const iframe = document.createElement('iframe');
    iframe.src = EMBED_URL;
    iframe.title = 'KREATV';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.style.cssText = 'width:100%; height:100%; border:0; display:block;';
    el.appendChild(iframe);
    const video = new CSS3DObject(el);
    video.position.set(screen.x, screen.y, screen.z);
    video.scale.setScalar(screen.w / PX_W);
    video.name = 'kreatv-video';
    mesh.add(video);
    screens.add(video);

    mesh.userData.kreatv = { iframe, muted: true, extras: [hole, badge] };
  }

  // Muted autoplay is the only autoplay browsers allow; sound is toggled
  // through the YouTube IFrame API (enablejsapi=1).
  function toggleSound(mesh){
    const tv = mesh && mesh.userData && mesh.userData.kreatv;
    if (!tv || !tv.iframe.contentWindow) return false;
    tv.muted = !tv.muted;
    const send = (func, args = []) => tv.iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
    send(tv.muted ? 'mute' : 'unMute');
    if (!tv.muted){ send('setVolume', [100]); send('playVideo'); }
    return true;
  }

  function inScene(obj){
    let o = obj;
    while (o){ if (o === scene) return true; o = o.parent; }
    return false;
  }

  // Objects are removed in several places (rebuild, delete, presets); drop the
  // iframe of any TV that is no longer part of the scene.
  function sweep(){
    screens.forEach(v => {
      if (inScene(v)) return;
      screens.delete(v);
      if (v.element && v.element.parentNode) v.element.parentNode.removeChild(v.element);
      const owner = v.parent;
      const tv = owner && owner.userData && owner.userData.kreatv;
      if (tv) tv.extras.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
    });
  }

  function render(){
    sweep();
    if (screens.size) css.render(scene, camera);
  }

  function resize(w, h){ css.setSize(w, h); }

  return { attach, toggleSound, render, resize, get count(){ return screens.size; } };
}
