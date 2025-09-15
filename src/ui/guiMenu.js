// guiMenu.js
// Contains the GUI menu setup for the app
import { GUI } from 'dat.gui';

export function setupGUI(params, rebuild, updateMaterial, toggleReflection, toggleWireframe, toggleGrid, applyTransform, knotMaterial, wireframeMesh, spot, ambient, reflector) {
  const gui = new GUI({ width: 320 });

  // Geometry folder
  const geomFolder = gui.addFolder('Geometry');
  geomFolder.add(params, 'objectType', ['Trefoil', 'Septafoil']).name('Object Type').onChange(rebuild);
  geomFolder.add(params, 'a', 0.1, 5.0, 0.01).onChange(rebuild);
  geomFolder.add(params, 'b', 0.0, 2.0, 0.01).onChange(rebuild);
  geomFolder.add(params, 'p', 1, 15, 1).onChange(rebuild);
  geomFolder.add(params, 'q', 1, 5, 1).onChange(rebuild);
  geomFolder.add(params, 'tubeRadius', 0.01, 1.0, 0.01).onChange(rebuild);
  geomFolder.add(params, 'uSegments', 16, 2000, 1).onChange(rebuild);
  geomFolder.add(params, 'vSegments', 3, 128, 1).onChange(rebuild);
  geomFolder.open();

  // Material folder
  const matFolder = gui.addFolder('Material');
  matFolder.add(params, 'materialType', ['Metallic', 'Opaque', 'Transparent']).onChange(updateMaterial);
  matFolder.add(params, 'metalness', 0, 1, 0.01).onChange(updateMaterial);
  matFolder.add(params, 'roughness', 0, 1, 0.01).onChange(updateMaterial);
  matFolder.add(params, 'opacity', 0.01, 1, 0.01).onChange(updateMaterial);
  matFolder.add(params, 'ior', 1.0, 2.5, 0.01).onChange(updateMaterial);
  matFolder.add(params, 'useTransmission').onChange(updateMaterial);
  matFolder.add(params, 'fresnel').name('Fresnel Highlight').onChange(updateMaterial);
  matFolder.addColor(params, 'materialColor').name('Material Color').onChange(updateMaterial);
  matFolder.addColor(params, 'wireframeColor').name('Wireframe Color').onChange(updateMaterial);
  matFolder.open();

  // Lighting folder
  const lightsFolder = gui.addFolder('Lighting');
  lightsFolder.add(params, 'spotIntensity', 0, 5, 0.01).onChange((v) => { spot.intensity = v; });
  lightsFolder.add(params, 'ambientIntensity', 0, 2, 0.01).onChange((v) => { ambient.intensity = v; });
  lightsFolder.add(params, 'envMapIntensity', 0, 5, 0.01).onChange((v) => { if (knotMaterial) knotMaterial.envMapIntensity = v; });
  lightsFolder.add(params, 'showReflection').onChange(toggleReflection);
  lightsFolder.add(params, 'reflectorOpacity', 0.0, 1.0, 0.01).name('Reflector Opacity').onChange((v) => {
    if (reflector && reflector.material){ reflector.material.transparent = v < 1.0; reflector.material.opacity = v; }
  });
  lightsFolder.open();

  // View folder
  const viewFolder = gui.addFolder('View');
  viewFolder.add(params, 'useWireframe').onChange(toggleWireframe);
  viewFolder.add(params, 'showGrid').onChange(toggleGrid);
  viewFolder.add(params, 'autoRotate').onChange(() => {});
  viewFolder.add(params, 'rotationSpeed', 0, 2, 0.01);
  viewFolder.open();


  // Mathematical Surface folder
  const mathFolder = gui.addFolder('Math Surface');
  mathFolder.addColor(params, 'mathWireframeColor').name('Wireframe Color').onChange((v) => {
    if (window.setMathWireframeColor) window.setMathWireframeColor(v);
  });
  mathFolder.open();

  // 6-axis control folder
  const sixFolder = gui.addFolder('6-Axis Controls');
  sixFolder.add(params, 'posX', -10, 10, 0.01).name('posX').onChange(applyTransform);
  sixFolder.add(params, 'posY', -10, 10, 0.01).name('posY').onChange(applyTransform);
  sixFolder.add(params, 'posZ', -10, 10, 0.01).name('posZ').onChange(applyTransform);
  sixFolder.add(params, 'rotX', -180, 180, 0.1).name('rotX').onChange(applyTransform);
  sixFolder.add(params, 'rotY', -180, 180, 0.1).name('rotY').onChange(applyTransform);
  sixFolder.add(params, 'rotZ', -180, 180, 0.1).name('rotZ').onChange(applyTransform);
  sixFolder.open();

  return { gui, geomFolder, matFolder, lightsFolder, viewFolder, sixFolder };
}
