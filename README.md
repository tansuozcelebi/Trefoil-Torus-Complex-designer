# Complex Torus Renderer by Tansu Ozcelebi

Bunu üniversitede yazmak için 2 ay uğraşmışken AI ile 2 saatte bitti.
Muazzam kaliteli ayrıca ahde edip gölgelendiriyor.

![alt text](image.png)

Bunlara ek olarak bilinen sorunları var. Render işi ok parametreli biliyorsunuz.

![alt text](image-1.png)


A small Vite + Three.js demo that renders a parametric trefoil-like knot with interactive controls.

Quick start (PowerShell):

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) in your browser.


Features:
- Parametric knot implemented as `TrefoilCurve` (see `src/trefoil.js`).
- Tube geometry via `THREE.TubeGeometry`.
- GUI controls (dat.GUI) for parameters, materials, lighting, and export.
- **Keyboard Shortcuts:**

| Key         | Action                |
|-------------|-----------------------|
| W/S         | posY up/down          |
| A/D         | posX left/right       |
| Q/E         | posZ forward/back     |
| I/K         | a increase/decrease   |
| J/L         | b decrease/increase   |
| U/O         | p decrease/increase   |
| N/M         | q decrease/increase   |

Hold Shift for larger steps (position).

## Mobile / Tablet Touch Transform Gizmo

Dokunmatik cihazlarda (telefon / tablet) sağ altta otomatik çıkan 6-eksen (XYZ + RX/RY/RZ) transform paneli ile aktif objeyi klavye olmadan konumlandırabilir ve döndürebilirsiniz.

Buttons:

| Button | Effect              |
|--------|---------------------|
| X+/X-  | Move +/− X (0.1)    |
| Y+/Y-  | Move +/− Y (0.1)    |
| Z+/Z-  | Move +/− Z (0.1)    |
| RX+/RX-| Rotate X ±5°        |
| RY+/RY-| Rotate Y ±5°        |
| RZ+/RZ-| Rotate Z ±5°        |

Basılı tutunca tekrar eder (press & hold repeat). Gizmo Hide ile paneli gizleyebilir, tekrar göstermek için aynı düğmeye (Gizmo Show) dokunabilirsiniz.

Bu panel sadece dokunmatik destekli cihazları otomatik algılayınca yüklenir.

Notes:
- To run:

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

Tests:

```powershell
npm run test
```

To build: `npm run build` and serve the `dist` folder.

## Docker Deployment / Docker ile Dağıtım

You can run this application using Docker for easy deployment:

```bash
# Copy environment file
cp .env.example .env

# Build and run with Docker Compose
docker compose up -d

# Access at http://localhost:8080
```

For detailed Docker instructions, see [DOCKER.md](DOCKER.md).

## Release v1.0.0

This repository is released as version `1.0.0`.

See `CHANGELOG.md` for the initial release notes. To publish a release:

1. Commit your changes and tag the release:

```powershell
git add .
git commit -m "chore(release): v1.0.0"
git tag v1.0.0
git push && git push --tags
```

2. Create a GitHub release from the `v1.0.0` tag and attach build artifacts if needed.
