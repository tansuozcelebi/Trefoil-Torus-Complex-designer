import * as THREE from 'three';

export function createRendererAndScene(container){
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Add accessibility label for SEO and a11y
  renderer.domElement.setAttribute('aria-label', 'Trefoil knot 3D visualization of parametric surface');
  
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e0f12);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(10, 5, 16);

  return { renderer, scene, camera };
}
