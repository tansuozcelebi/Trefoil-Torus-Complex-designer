// guiMenu.js
// Contains the GUI menu setup for the app
import { GUI } from 'dat.gui';
import { OBJECT_TYPES, getShapeParams } from '../objects/shapes.js';

export function setupGUI(params, rebuild, updateMaterial, toggleReflection, toggleWireframe, applyTransform, knotMaterial, wireframeMesh, spot, ambient, reflector, saveParams, toggleUCSGizmo) {
  // autoPlace:false: don't let dat.GUI mount itself at the top-right of the page.
  // The app appends gui.domElement into the Object panel (see showControlsGUI).
  const gui = new GUI({ width: 320, autoPlace: false });

  // Controllers whose visibility depends on the selected shape (see refreshForShape).
  const shapeCtl = {};

  // Geometry folder
  const geomFolder = gui.addFolder('Geometry');
  const onGeom = () => { saveParams && saveParams(); rebuild(); };
  geomFolder.add(params, 'objectType', OBJECT_TYPES).name('Object Type').onChange(onGeom);
  shapeCtl.a = geomFolder.add(params, 'a', 0.1, 5.0, 0.01).onChange(onGeom);
  shapeCtl.b = geomFolder.add(params, 'b', 0.0, 2.0, 0.01).onChange(onGeom);
  shapeCtl.p = geomFolder.add(params, 'p', 1, 15, 1).onChange(onGeom);
  shapeCtl.q = geomFolder.add(params, 'q', 1, 15, 1).onChange(onGeom);
  shapeCtl.tubeRadius = geomFolder.add(params, 'tubeRadius', 0.01, 1.0, 0.01).onChange(onGeom);
  shapeCtl.uSegments = geomFolder.add(params, 'uSegments', 16, 2000, 1).onChange(onGeom);
  shapeCtl.vSegments = geomFolder.add(params, 'vSegments', 3, 128, 1).onChange(onGeom);
  // New magnitude for BaskınFoil / variable width ribbon amplitude
  if (params.magnitude === undefined) params.magnitude = 1.0;
  shapeCtl.magnitude = geomFolder.add(params, 'magnitude', 0.0, 5.0, 0.01).name('Magnitude').onChange(onGeom);
  geomFolder.open();

  // Joint weighting (knots/curves): bulges (+) or pinches (−) the tube at evenly
  // spaced joints along the curve — e.g. 3 joints on a trefoil sit on its lobes.
  const jointFolder = gui.addFolder('Joint Weighting');
  const onShape = () => { saveParams && saveParams(); rebuild(); };
  jointFolder.add(params, 'jointWeight', -0.85, 2.0, 0.01).name('Joint Weight').onChange(onShape);
  jointFolder.add(params, 'jointCount', 1, 24, 1).name('Joint Count').onChange(onShape);
  jointFolder.add(params, 'jointSharpness', 0.5, 12, 0.1).name('Joint Sharpness').onChange(onShape);
  jointFolder.add(params, 'jointOffset', 0, 1, 0.01).name('Joint Offset').onChange(onShape);

  // Surfaces (parametric / explicit / implicit / custom): mesh quality. These
  // rebuilds are heavier, so they apply when the slider is released.
  const surfFolder = gui.addFolder('Surface');
  shapeCtl.surfSegments = surfFolder.add(params, 'surfSegments', 16, 220, 1).name('Surface Detail').onFinishChange(onShape);
  shapeCtl.resolution = surfFolder.add(params, 'resolution', 16, 120, 1).name('Implicit Resolution').onFinishChange(onShape);
  shapeCtl.bound = surfFolder.add(params, 'bound', 0.5, 8, 0.1).name('Domain Size').onFinishChange(onShape);

  // Material folder
  const matFolder = gui.addFolder('Material');
  matFolder.add(params, 'materialType', ['Metallic', 'Opaque', 'Transparent']).onChange(() => { saveParams && saveParams(); updateMaterial(); refreshMaterialRows(); });
  matFolder.add(params, 'metalness', 0, 1, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'roughness', 0, 1, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.add(params, 'opacity', 0.01, 1, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  const iorCtl = matFolder.add(params, 'ior', 1.0, 2.5, 0.01).onChange(() => { saveParams && saveParams(); updateMaterial(); });
  const transCtl = matFolder.add(params, 'useTransmission').onChange(() => { saveParams && saveParams(); updateMaterial(); refreshMaterialRows(); });
  matFolder.add(params, 'fresnel').name('Fresnel Highlight').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.addColor(params, 'materialColor').name('Material Color').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  shapeCtl.wireframeColor = matFolder.addColor(params, 'wireframeColor').name('Wireframe Color').onChange(() => { saveParams && saveParams(); updateMaterial(); });
  matFolder.open();

  // Lighting folder
  const lightsFolder = gui.addFolder('Lighting');
  lightsFolder.add(params, 'spotIntensity', 0, 5, 0.01).onChange((v) => { spot.intensity = v; saveParams && saveParams(); });
  lightsFolder.add(params, 'ambientIntensity', 0, 2, 0.01).onChange((v) => { ambient.intensity = v; saveParams && saveParams(); });
  lightsFolder.add(params, 'envMapIntensity', 0, 5, 0.01).onChange((v) => { if (knotMaterial) knotMaterial.envMapIntensity = v; saveParams && saveParams(); });
  // Reflection controls live in the Scene panel (they belong to the scene, not
  // the object); see setupScenePanel.
  lightsFolder.open();

  // View folder
  const viewFolder = gui.addFolder('View');
  shapeCtl.useWireframe = viewFolder.add(params, 'useWireframe').onChange((v) => { saveParams && saveParams(); toggleWireframe(v); });
  // autoRotate / rotationSpeed rows are added by mainapp (they drive OrbitControls).
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
  // UCS Gizmo toggle
  if (params.showUCSGizmo === undefined) params.showUCSGizmo = true;
  sixFolder.add(params, 'showUCSGizmo').name('UCS Gizmo').onChange((v) => { saveParams && saveParams(); if (toggleUCSGizmo) toggleUCSGizmo(v); });
  sixFolder.open();

  const show = (ctl, on) => { if (ctl && ctl.__li) ctl.__li.style.display = on ? '' : 'none'; };
  const showFolder = (f, on) => { const li = f && f.domElement && f.domElement.parentElement; if (li) li.style.display = on ? '' : 'none'; };

  // Glass settings only matter for transparent / transmissive materials.
  function refreshMaterialRows(){
    const glass = params.materialType === 'Transparent' || !!params.useTransmission;
    show(iorCtl, glass);
    show(transCtl, glass);
  }

  // Show only the rows the selected shape uses (e.g. a sphere has no p/q, a
  // knot has no surface detail, the KREATV only has its size).
  function refreshForShape(type){
    const used = getShapeParams(type || params.objectType);
    Object.keys(shapeCtl).forEach(k => {
      const key = (k === 'wireframeColor' || k === 'useWireframe') ? 'wireframe' : k;
      show(shapeCtl[k], used.has(key));
    });
    showFolder(jointFolder, used.has('joints'));
    showFolder(surfFolder, ['surfSegments', 'resolution', 'bound'].some(k => used.has(k)));
    refreshMaterialRows();
  }

  // The Math Surface folder belongs to the mathematical-surface ground only.
  function setMathFolderVisible(on){ showFolder(mathFolder, on); }

  refreshForShape(params.objectType);
  setMathFolderVisible(false);

  return { gui, geomFolder, matFolder, lightsFolder, viewFolder, sixFolder, refreshForShape, setMathFolderVisible };
}
