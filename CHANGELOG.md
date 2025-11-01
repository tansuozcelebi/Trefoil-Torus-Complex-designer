# Changelog

All notable changes to this project will be documented in this file.

# [1.1.4] - 2025-11-01
### Changed
- Scene panel and preset management logic extracted to `src/ui/scenePanel.js` for better code organization.
- Modularized defaultPresets, loadUserPresets, saveUserPresets, and createPresetThumbnail functions.
- Presets now save and restore position (posX, posY, posZ) and rotation (rotX, rotY, rotZ) values.

### Fixed
- Code structure improved with cleaner separation of concerns.

# [1.1.2] - 2025-09-28
### Added
- Glow (hover/press) visual feedback for 6-axis gizmo buttons (desktop + touch).
- Draggable gizmo panel with persistent position (localStorage) supporting mouse & touch.

### Changed
- Gizmo layout now includes a drag bar; panel border radii adjusted.

# [1.1.3] - 2025-09-28
### Added
- Main navigation tabs now have glow hover/active effects.
- New objects spawn with a random curated palette (material + wireframe) and enforced metallic material.

### Changed
- Default new object material overrides to Metallic (metalness 0.9 / roughness 0.22) regardless of current global params.

# [1.1.1] - 2025-09-28
### Added
- Mobile / tablet 6-axis touch transform gizmo (X/Y/Z translate + RX/RY/RZ rotate) with press-and-hold repeat. Auto appears on touch devices.
- README section for Mobile / Tablet Touch Transform Gizmo.

### Fixed
- Minor UI layering: touch gizmo has high z-index and does not block nav panels.

### Changed
- Documentation updated to mention touch support.

# [1.1.0] - 2025-09-16
### Added
- Keyboard controls: W/S (posY), A/D (posX), Q/E (posZ), I/K (a), J/L (b), U/O (p), N/M (q). Shift ile hızlı hareket.
- Keyboard shortcuts table added to README, Help, and Object menu.

### Changed
- Help and Object menu now show keyboard shortcuts.

### Fixed
- Only one object is created on first load, all objects are now always clickable.

# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-09-14
### Added
- Parametric trefoil knot implemented as `TrefoilCurve` and rendered with `THREE.TubeGeometry`.
- Interactive GUI (dat.GUI) for geometry, material, lighting, view, and transform controls.
- MeshPhysicalMaterial with Fresnel highlight via `onBeforeCompile`.
- Wireframe overlay, screenshot export, GLTF export placeholder.
- OrbitControls (mouse orbit/zoom/pan), shadows, Reflector-based reflection toggle, and LOD heuristics.
- Basic unit test for `TrefoilCurve`.

### Fixed
- Centering and camera framing of the knot on rebuild.
- Wireframe-centering and transform application bugs.

### Notes
- Some features are placeholders (GLTF export and HDR env map). These can be implemented in a patch release.
