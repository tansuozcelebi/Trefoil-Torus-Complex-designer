// exportMenu.js
// Export functionality for 3D objects
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter.js';
import { saveAs } from 'file-saver';

let exportCounter = 0;

// Load counter from localStorage on module load
const savedCounter = localStorage.getItem('tc_export_counter');
if (savedCounter) {
  exportCounter = parseInt(savedCounter, 10) || 0;
}

function getNextExportCode() {
  exportCounter++;
  localStorage.setItem('tc_export_counter', exportCounter.toString());
  return exportCounter.toString().padStart(4, '0');
}

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export async function exportAsGLB(mesh, objectName = 'Object') {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    const exportCode = getNextExportCode();
    const fileName = `${sanitizeFileName(objectName)}_${exportCode}.glb`;
    
    const options = {
      binary: true,
      maxTextureSize: 2048,
      embedImages: true
    };
    
    exporter.parse(
      mesh,
      (result) => {
        const blob = new Blob([result], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
        resolve({ success: true, fileName });
      },
      (error) => {
        console.error('GLB export error:', error);
        reject(error);
      },
      options
    );
  });
}

export async function exportAsGLTF(mesh, objectName = 'Object') {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    const exportCode = getNextExportCode();
    const fileName = `${sanitizeFileName(objectName)}_${exportCode}.gltf`;
    
    const options = {
      binary: false,
      maxTextureSize: 2048
    };
    
    exporter.parse(
      mesh,
      (result) => {
        const output = JSON.stringify(result, null, 2);
        const blob = new Blob([output], { type: 'text/plain' });
        saveAs(blob, fileName);
        resolve({ success: true, fileName });
      },
      (error) => {
        console.error('GLTF export error:', error);
        reject(error);
      },
      options
    );
  });
}

export async function exportAsOBJ(mesh, objectName = 'Object') {
  try {
    const exporter = new OBJExporter();
    const exportCode = getNextExportCode();
    const objFileName = `${sanitizeFileName(objectName)}_${exportCode}.obj`;
    const mtlFileName = `${sanitizeFileName(objectName)}_${exportCode}.mtl`;
    
    const result = exporter.parse(mesh);
    
    // Create MTL file content
    const material = mesh.material;
    let mtlContent = `# Material file for ${objFileName}\n`;
    mtlContent += `newmtl material_${exportCode}\n`;
    
    if (material.color) {
      const color = material.color;
      mtlContent += `Kd ${color.r.toFixed(4)} ${color.g.toFixed(4)} ${color.b.toFixed(4)}\n`;
    }
    
    if (material.metalness !== undefined) {
      mtlContent += `Ns ${(material.metalness * 900 + 100).toFixed(2)}\n`;
    }
    
    if (material.opacity !== undefined) {
      mtlContent += `d ${material.opacity.toFixed(4)}\n`;
      if (material.opacity < 1.0) {
        mtlContent += `Tr ${(1 - material.opacity).toFixed(4)}\n`;
      }
    }
    
    // Add MTL reference to OBJ
    const objContent = `mtllib ${mtlFileName}\nusemtl material_${exportCode}\n${result}`;
    
    // Save OBJ file
    const objBlob = new Blob([objContent], { type: 'text/plain' });
    saveAs(objBlob, objFileName);
    
    // Save MTL file
    const mtlBlob = new Blob([mtlContent], { type: 'text/plain' });
    saveAs(mtlBlob, mtlFileName);
    
    return { success: true, fileName: objFileName };
  } catch (error) {
    console.error('OBJ export error:', error);
    throw error;
  }
}

export async function exportAsSTL(mesh, objectName = 'Object') {
  try {
    const exporter = new STLExporter();
    const exportCode = getNextExportCode();
    const fileName = `${sanitizeFileName(objectName)}_${exportCode}.stl`;
    
    const result = exporter.parse(mesh, { binary: true });
    const blob = new Blob([result], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('STL export error:', error);
    throw error;
  }
}

export async function exportAsPLY(mesh, objectName = 'Object') {
  try {
    const exporter = new PLYExporter();
    const exportCode = getNextExportCode();
    const fileName = `${sanitizeFileName(objectName)}_${exportCode}.ply`;
    
    const result = exporter.parse(mesh, null, { binary: true });
    const blob = new Blob([result], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('PLY export error:', error);
    throw error;
  }
}

export function setupExportPanel(panel, getActiveRecord, getCurrentLanguage) {
  if (!panel) return;
  
  const translations = {
    en: {
      title: 'Export 3D Model',
      selectFormat: 'Select Format:',
      exportBtn: 'Export',
      noObject: 'No object selected',
      success: 'Export successful!',
      error: 'Export failed',
      formats: {
        glb: 'GLB (Binary GLTF) - Best for web & color',
        gltf: 'GLTF (JSON) - Editable format',
        obj: 'OBJ + MTL - Universal format',
        stl: 'STL - 3D printing',
        ply: 'PLY - Point cloud with color'
      },
      info: 'Each export gets a unique sequential code.',
      counter: 'Next export code:'
    },
    tr: {
      title: '3D Model Dışa Aktar',
      selectFormat: 'Format Seç:',
      exportBtn: 'Dışa Aktar',
      noObject: 'Seçili nesne yok',
      success: 'Dışa aktarma başarılı!',
      error: 'Dışa aktarma başarısız',
      formats: {
        glb: 'GLB (Binary GLTF) - Web ve renk için en iyi',
        gltf: 'GLTF (JSON) - Düzenlenebilir format',
        obj: 'OBJ + MTL - Evrensel format',
        stl: 'STL - 3D baskı',
        ply: 'PLY - Renkli nokta bulutu'
      },
      info: 'Her dışa aktarma işlemi benzersiz bir ardışık kod alır.',
      counter: 'Sonraki dışa aktarma kodu:'
    }
  };
  
  function updatePanelContent() {
    const lang = getCurrentLanguage ? getCurrentLanguage() : 'en';
    const t = translations[lang] || translations.en;
    const nextCode = (exportCounter + 1).toString().padStart(4, '0');
    
    panel.innerHTML = `
      <div style="min-width: 320px;">
        <h3 style="margin-top: 0; margin-bottom: 12px; color: #9fc8ff;">${t.title}</h3>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500;">${t.selectFormat}</label>
          <select id="exportFormat" style="width: 100%; padding: 8px; border-radius: 6px; background: rgba(40,40,50,0.9); color: #fff; border: 1px solid rgba(100,100,120,0.5); font-size: 13px;">
            <option value="glb">${t.formats.glb}</option>
            <option value="gltf">${t.formats.gltf}</option>
            <option value="obj">${t.formats.obj}</option>
            <option value="stl">${t.formats.stl}</option>
            <option value="ply">${t.formats.ply}</option>
          </select>
        </div>
        
        <div style="margin-bottom: 16px; padding: 10px; background: rgba(60,120,180,0.15); border-radius: 6px; border-left: 3px solid #3a7bd5;">
          <div style="font-size: 12px; color: #a8c5ff; margin-bottom: 4px;">${t.info}</div>
          <div style="font-size: 13px; font-weight: 600; color: #7fbfff;">${t.counter} <span style="color: #ffa646;">${nextCode}</span></div>
        </div>
        
        <button id="exportBtn" style="width: 100%; padding: 12px; border-radius: 6px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
          ${t.exportBtn}
        </button>
        
        <div id="exportStatus" style="margin-top: 12px; padding: 8px; border-radius: 6px; display: none;"></div>
      </div>
    `;
    
    const exportBtn = panel.querySelector('#exportBtn');
    const exportFormat = panel.querySelector('#exportFormat');
    const exportStatus = panel.querySelector('#exportStatus');
    
    exportBtn.addEventListener('mouseenter', () => {
      exportBtn.style.transform = 'translateY(-2px)';
      exportBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    exportBtn.addEventListener('mouseleave', () => {
      exportBtn.style.transform = 'translateY(0)';
      exportBtn.style.boxShadow = 'none';
    });
    
    exportBtn.addEventListener('click', async () => {
      const rec = getActiveRecord ? getActiveRecord() : null;
      
      if (!rec || !rec.mesh) {
        exportStatus.style.display = 'block';
        exportStatus.style.background = 'rgba(220,50,50,0.2)';
        exportStatus.style.color = '#ff6b6b';
        exportStatus.textContent = t.noObject;
        setTimeout(() => { exportStatus.style.display = 'none'; }, 3000);
        return;
      }
      
      const format = exportFormat.value;
      const objectName = rec.name || 'Object';
      
      exportBtn.disabled = true;
      exportBtn.textContent = 'Exporting...';
      exportBtn.style.opacity = '0.6';
      
      try {
        let result;
        
        switch (format) {
          case 'glb':
            result = await exportAsGLB(rec.mesh, objectName);
            break;
          case 'gltf':
            result = await exportAsGLTF(rec.mesh, objectName);
            break;
          case 'obj':
            result = await exportAsOBJ(rec.mesh, objectName);
            break;
          case 'stl':
            result = await exportAsSTL(rec.mesh, objectName);
            break;
          case 'ply':
            result = await exportAsPLY(rec.mesh, objectName);
            break;
          default:
            throw new Error('Unknown format');
        }
        
        exportStatus.style.display = 'block';
        exportStatus.style.background = 'rgba(50,220,120,0.2)';
        exportStatus.style.color = '#5fdc8f';
        exportStatus.textContent = `${t.success} ${result.fileName}`;
        
        // Update counter display
        updatePanelContent();
        
        setTimeout(() => { exportStatus.style.display = 'none'; }, 5000);
      } catch (error) {
        console.error('Export error:', error);
        exportStatus.style.display = 'block';
        exportStatus.style.background = 'rgba(220,50,50,0.2)';
        exportStatus.style.color = '#ff6b6b';
        exportStatus.textContent = `${t.error}: ${error.message}`;
        setTimeout(() => { exportStatus.style.display = 'none'; }, 5000);
      } finally {
        exportBtn.disabled = false;
        exportBtn.textContent = t.exportBtn;
        exportBtn.style.opacity = '1';
      }
    });
  }
  
  updatePanelContent();
  
  // Return an update function so language changes can refresh the panel
  return {
    updateLanguage: updatePanelContent
  };
}
