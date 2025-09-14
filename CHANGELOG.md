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
