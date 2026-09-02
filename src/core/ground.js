import * as THREE from 'three';

export function createBaseGround(scene, renderer){
  const groundSize = 60;
  function createCheckerTexture(size=2048, squares=8){
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const sq = size / squares;
    for(let y=0;y<squares;y++){
      for(let x=0;x<squares;x++){
        const isWhite = (x + y) % 2 === 0;
        ctx.fillStyle = isWhite ? '#ffffff' : '#222222';
        ctx.fillRect(x*sq, y*sq, sq, sq);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(groundSize / 10, groundSize / 10);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  }
  const checkerTex = createCheckerTexture(1024, 8);
  const groundMat = new THREE.MeshStandardMaterial({ map: checkerTex, roughness: 0.6, metalness: 0.2 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(groundSize, groundSize), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.5;
  ground.receiveShadow = true;
  scene.add(ground);

  // No separate shadow receiver - shadows now fall directly on the checkerboard ground
  const shadowReceiver = null;

  // Invisible shadow-catcher for surfaces whose own material can't receive
  // shadows (e.g. the raw-GLSL sea shader). ShadowMaterial paints ONLY the
  // shadowed region as a translucent dark patch and is fully transparent
  // elsewhere, so it can sit coplanar just above such a surface to make the
  // object's shadow land on the plane the user actually sees. Repositioned
  // and toggled per ground style in mainapp.js; hidden by default.
  const shadowCatcher = new THREE.Mesh(
    new THREE.PlaneGeometry(groundSize * 4, groundSize * 4),
    new THREE.ShadowMaterial({ opacity: 0.42 })
  );
  shadowCatcher.rotation.x = -Math.PI / 2;
  shadowCatcher.position.y = ground.position.y + 0.02;
  shadowCatcher.receiveShadow = true;
  shadowCatcher.visible = false;
  scene.add(shadowCatcher);

  return { ground, shadowReceiver, shadowCatcher, groundSize };
}
