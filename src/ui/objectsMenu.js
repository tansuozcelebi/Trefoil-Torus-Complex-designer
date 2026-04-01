/**
 * Objects Menu Module - Manages object list, add/delete, properties
 */

export function setupObjectsMenu(params) {
  const {
    scene3d,
    objects,
    getActiveRecord,
    setActive,
    ensureInitialObject,
    refreshObjectsList,
    applyTransform,
    saveParamsToActive,
  } = params;

  // Objects panel from index.tsx (React component mount point)
  let objectsPanel = null;

  function addObjectFromPreset(presetName) {
    if (!presetName || presetName === 'none') {
      return;
    }

    const newObj = {
      id: Math.random().toString(36).substring(2, 11),
      type: presetName,
      params: {}
    };

    if (presetName === 'trefoil') {
      newObj.params = {
        a: 8,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        roughness: 0.18,
        metalness: 0.68,
        autoRotate: false,
        autoRotX: 0,
        autoRotY: 0.005,
        autoRotZ: 0
      };
    } else if (presetName === 'septafoil') {
      newObj.params = {
        n: 7,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        roughness: 0.18,
        metalness: 0.68,
        autoRotate: false,
        autoRotX: 0,
        autoRotY: 0.005,
        autoRotZ: 0
      };
    }

    objects.push(newObj);
    setActive(newObj.id);
    refreshObjectsList();
  }

  function buildObjectsList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.style.cssText = `
      padding: 12px;
      backgroundColor: transparent;
      color: #fff;
      fontFamily: monospace;
      fontSize: 13px;
    `;

    // Preset selector
    const presetSection = document.createElement('div');
    presetSection.style.marginBottom = '12px';
    presetSection.innerHTML = '<div style="font-size: 11px; color: #aaa; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Add Object</div>';

    const select = document.createElement('select');
    select.style.cssText = `
      width: 100%;
      padding: 6px;
      background: rgba(40,40,50,0.8);
      color: #fff;
      border: 1px solid rgba(100,120,150,0.4);
      borderRadius: 4px;
      cursor: pointer;
      font-family: monospace;
      fontSize: 12px;
    `;

    const noneOpt = document.createElement('option');
    noneOpt.value = 'none';
    noneOpt.textContent = '-- Select --';
    select.appendChild(noneOpt);

    ['trefoil', 'septafoil'].forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
      if (e.target.value !== 'none') {
        addObjectFromPreset(e.target.value);
        e.target.value = 'none';
      }
    });

    presetSection.appendChild(select);
    container.appendChild(presetSection);

    // Objects list
    if (objects.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'color: #666; font-size: 12px; padding: 12px 0;';
      empty.textContent = '(no objects)';
      container.appendChild(empty);
    } else {
      const listDiv = document.createElement('div');
      listDiv.style.fontSize = '12px';

      objects.forEach((obj, idx) => {
        const item = document.createElement('div');
        item.style.cssText = `
          padding: 6px;
          marginBottom: 6px;
          background: ${obj.id === getActiveRecord()?.id ? 'rgba(50,120,200,0.3)' : 'rgba(40,40,50,0.5)'};
          border: 1px solid ${obj.id === getActiveRecord()?.id ? 'rgba(100,180,255,0.6)' : 'rgba(100,100,120,0.3)'};
          borderRadius: 4px;
          cursor: pointer;
          userSelect: none;
          transition: all 0.2s;
          display: flex;
          justifyContent: space-between;
          alignItems: center;
        `;

        const label = document.createElement('span');
        label.textContent = `${obj.type} #${idx + 1}`;
        label.style.flex = '1';

        const delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.style.cssText = `
          padding: 2px 6px;
          background: transparent;
          color: #f66;
          border: none;
          cursor: pointer;
          fontSize: 12px;
          opacity: 0.6;
          transition: opacity 0.2s;
        `;
        delBtn.addEventListener('mouseenter', () => (delBtn.style.opacity = '1'));
        delBtn.addEventListener('mouseleave', () => (delBtn.style.opacity = '0.6'));
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          objects.splice(idx, 1);
          if (objects.length === 0) {
            ensureInitialObject();
          } else if (getActiveRecord()?.id === obj.id) {
            setActive(objects[Math.max(0, idx - 1)].id);
          }
          refreshObjectsList();
        });

        item.appendChild(label);
        item.appendChild(delBtn);

        item.addEventListener('mouseenter', () => {
          item.style.background = 'rgba(60,130,210,0.4)';
        });
        item.addEventListener('mouseleave', () => {
          item.style.background = obj.id === getActiveRecord()?.id ? 'rgba(50,120,200,0.3)' : 'rgba(40,40,50,0.5)';
        });

        item.addEventListener('click', () => {
          setActive(obj.id);
          refreshObjectsList();
        });

        listDiv.appendChild(item);
      });

      container.appendChild(listDiv);
    }
  }

  return { addObjectFromPreset, buildObjectsList };
}
