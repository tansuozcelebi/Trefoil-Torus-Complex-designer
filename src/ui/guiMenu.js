// guiMenu.js
// Contains the GUI menu setup for the app
import { GUI } from 'dat.gui';

export function setupGUI(params, rebuild, updateMaterial, toggleReflection, toggleWireframe, toggleGrid, applyTransform, knotMaterial, wireframeMesh, spot, ambient, reflector, saveParams) {
  const gui = new GUI({ width: 320 });

  // Geometry folder
  const geomFolder = gui.addFolder('Geometry');
  geomFolder.add(params, 'objectType', ['Trefoil', 'Septafoil']).name('Object Type').onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'a', 0.1, 5.0, 0.01).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'b', 0.0, 2.0, 0.01).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'p', 1, 15, 1).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'q', 1, 15, 1).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'tubeRadius', 0.01, 1.0, 0.01).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'uSegments', 16, 2000, 1).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.add(params, 'vSegments', 3, 128, 1).onChange(() => { saveParams && saveParams(); rebuild(); });
  geomFolder.open();

  // Material folder
  const matFolder = gui.addFolder('Material');
  matFolder.add(params, 'materialType', ['Metallic', 'Opaque', 'Transparent']).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'metalness', 0, 1, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'roughness', 0, 1, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'opacity', 0.01, 1, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'ior', 1.0, 2.5, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'useTransmission').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'fresnel').name('Fresnel Highlight').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.addColor(params, 'materialColor').name('Material Color').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.addColor(params, 'wireframeColor').name('Wireframe Color').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.open();

  // Lighting folder
  const lightsFolder = gui.addFolder('Lighting');
  lightsFolder.add(params, 'spotIntensity', 0, 5, 0.01).onChange((v) => { spot.intensity = v; saveParams && saveParams(); });
  lightsFolder.add(params, 'ambientIntensity', 0, 2, 0.01).onChange((v) => { ambient.intensity = v; saveParams && saveParams(); });
  lightsFolder.add(params, 'envMapIntensity', 0, 5, 0.01).onChange((v) => { if (knotMaterial) knotMaterial.envMapIntensity = v; saveParams && saveParams(); });
  lightsFolder.add(params, 'showReflection').onChange((v) => { saveParams && saveParams(); toggleReflection(v); });
  lightsFolder.add(params, 'reflectorOpacity', 0.0, 1.0, 0.01).name('Reflector Opacity').onChange((v) => {
    if (reflector && reflector.material){ reflector.material.transparent = v < 1.0; reflector.material.opacity = v; }
    saveParams && saveParams();
  });
  lightsFolder.open();

  // View folder
  const viewFolder = gui.addFolder('View');
  viewFolder.add(params, 'useWireframe').onChange((v) => { saveParams && saveParams(); toggleWireframe(v); });
  viewFolder.add(params, 'showGrid').onChange((v) => { saveParams && saveParams(); toggleGrid(v); });
  // autoRotate/rotationSpeed handlers are (re)bound in main to sync OrbitControls; still save here on change
  viewFolder.add(params, 'autoRotate').onChange(() => { saveParams && saveParams(); });
  viewFolder.add(params, 'rotationSpeed', 0, 2, 0.01).onChange(() => { saveParams && saveParams(); });
  viewFolder.open();


  // Mathematical Surface folder
  const mathFolder = gui.addFolder('Math Surface');
  mathFolder.addColor(params, 'mathWireframeColor').name('Wireframe Color').onChange((v) => {
    if (window.setMathWireframeColor) window.setMathWireframeColor(v);
    saveParams && saveParams();
  });
  mathFolder.open();


  // 6-axis control folder
  const sixFolder = gui.addFolder('6-Axis Controls XYZABC');
  sixFolder.add(params, 'posX', -10, 10, 0.01).name('posX').onChange(() => { saveParams && saveParams(); applyTransform(); });
  sixFolder.add(params, 'posY', -10, 10, 0.01).name('posY').onChange(() => { saveParams && saveParams(); applyTransform(); });
  sixFolder.add(params, 'posZ', -10, 10, 0.01).name('posZ').onChange(() => { saveParams && saveParams(); applyTransform(); });
  sixFolder.add(params, 'rotX', -180, 180, 0.1).name('rotX').onChange(() => { saveParams && saveParams(); applyTransform(); });
  sixFolder.add(params, 'rotY', -180, 180, 0.1).name('rotY').onChange(() => { saveParams && saveParams(); applyTransform(); });
  sixFolder.add(params, 'rotZ', -180, 180, 0.1).name('rotZ').onChange(() => { saveParams && saveParams(); applyTransform(); });
  sixFolder.open();

  // Keyboard shortcuts info
  const kbDiv = document.createElement('div');
  kbDiv.style.margin = '16px 0 0 0';
  kbDiv.innerHTML = `
    <strong>Keyboard Shortcuts</strong><br/>
    <table style="min-width:220px;font-size:13px;margin-top:4px">
      <tr><td>W/S</td><td>posY up/down</td></tr>
      <tr><td>A/D</td><td>posX left/right</td></tr>
      <tr><td>Q/E</td><td>posZ forward/back</td></tr>
      <tr><td>I/K</td><td>a increase/decrease</td></tr>
      <tr><td>J/L</td><td>b decrease/increase</td></tr>
      <tr><td>U/O</td><td>p decrease/increase</td></tr>
      <tr><td>N/M</td><td>q decrease/increase</td></tr>
    </table>
    <span style="font-size:12px;opacity:0.7">Hold <b>Shift</b> for larger steps (position).</span>
  `;
  gui.domElement.appendChild(kbDiv);

  return { gui, geomFolder, matFolder, lightsFolder, viewFolder, sixFolder };
}
