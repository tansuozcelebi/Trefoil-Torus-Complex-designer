/**
 * Scene Setup Module - Manages ground styles, environment, materials, reflections
 */

export function setupSceneModule(params) {
  const {
    scene3d,
    ground,
    reflector,
    groundInstance,
    updateMaterial,
    toggleWireframe,
    activeParams,
    gui
  } = params;

  const groundStyles = {
    none: {
      name: 'None',
      setup: () => {
        if (ground) ground.visible = false;
      }
    },
    room: {
      name: 'Room',
      setup: () => {
        if (ground) {
          ground.visible = true;
          if (groundInstance) groundInstance.setStyle('room');
        }
      }
    },
    sea: {
      name: 'Sea',
      setup: () => {
        if (ground) {
          ground.visible = true;
          if (groundInstance) groundInstance.setStyle('sea');
        }
      }
    },
    funnel: {
      name: 'Funnel',
      setup: () => {
        if (ground) {
          ground.visible = true;
          if (groundInstance) groundInstance.setStyle('funnel');
        }
      }
    }
  };

  function setGroundStyle(styleName) {
    const style = groundStyles[styleName];
    if (style) {
      style.setup();
    }
  }

  function toggleReflection(enabled) {
    if (reflector) {
      reflector.visible = enabled;
    }
  }

  return {
    groundStyles,
    setGroundStyle,
    toggleReflection,
    updateMaterial,
    toggleWireframe
  };
}
