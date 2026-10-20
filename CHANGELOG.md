# Changelog

All notable changes to this project will be documented in this file.

# [Unreleased]
### Changed
- Every build bumps the patch version by one (x.y.Z → x.y.Z+1), including the SiteGround deploy, which commits the new version back to main (`chore: version … [skip ci]`). The lockfile's version is kept in step. PR CI builds stay validation-only (`NO_VERSION_BUMP`).
- Funnel ground rebuilt as an upright funnel (rim at ground level, flat floor below, flat apron around it), lighter with subtle grid lines.
- Sea Wave water is ocean blue.

### Fixed
- Funnel + physics: objects now collide with the funnel (triangle-mesh collider) instead of falling through it to an invisible plane.

# [2026-10-18] (PR #48)
### Added
- Double-click an object to select it and open the Object panel (double-clicking a KREATV screen still toggles its sound).
- Double-click the corner axis gizmo (UCS) to switch the transform gizmo to rotate mode.
- Floating panels: the navbar (by its ⋮⋮ grip), the statistics panel and the gizmo panel can be dragged and snap magnetically to the screen edges and to each other. Each can be closed with ✕; it shrinks with an animation into a chip in the bottom dock and grows back when the chip is clicked. Positions and closed state are remembered.
- Tab panels open above the navbar when it has been moved near the bottom of the screen.

### Changed
- The Object panel only shows the parameters the selected shape uses (e.g. a sphere shows `a` and surface detail; a knot shows `a, b, p, q`, tube settings and joint weighting; KREATV shows only its size). Glass settings (`ior`, transmission) appear only for transparent materials, and the Math Surface folder only on the mathematical-surface ground.
- Removed the duplicate auto-rotate / rotation-speed rows from the View folder.
- Help updated in all 20 languages for the new double-click actions.

# [1.2.0] - 2026-10-13
### Added
- **KREATV** shape (Shapes → Objects): a TV whose screen continuously plays the KREA intro video (YouTube, muted autoplay, looped). Double-click the TV to toggle sound. It is a full physics object with a box + sphere compound collider.
- Physics bodies accept box shapes in addition to spheres.

### Changed
- Help panel rewritten in all 20 languages to match the current app: camera mouse controls, the real keyboard shortcuts (W/A/S/D/Q/E, I/K/J/L/U/O/N/M, G/R), every panel, physics, KREATV, touch and UCS tips.
- CSP (nginx + .htaccess) allows YouTube frames (`frame-src`).

### Fixed
- Keyboard object shortcuts no longer fire while typing in a text field (e.g. a custom formula).

# [1.1.4] - 2025-11-01
### Added
- Comprehensive SEO optimization with meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
- Invisible semantic content block for search engine indexing (trefoil knot, parametric surfaces, topology).
- **Multilingual SEO content in 10 major languages**: English, Spanish, Mandarin Chinese, Hindi, Arabic, Portuguese, Bengali, Russian, Japanese, French, German.
- Canonical URL and accessibility aria-label on 3D canvas element.

### Changed
- Scene panel and preset management logic extracted to `src/ui/scenePanel.js` for better code organization.
- Touch gizmo (6-axis transform) extracted to `src/ui/touchGizmo.js` for cleaner architecture.
- Modularized defaultPresets, loadUserPresets, saveUserPresets, and createPresetThumbnail functions.
- Presets now save and restore position (posX, posY, posZ) and rotation (rotX, rotY, rotZ) values.
- Home tab no longer opens by default on app launch - user clicks nav buttons to open panels.
- Page title optimized for SEO: "Trefoil Knot – 3D Parametric Surface Visualization | FABUS".

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
