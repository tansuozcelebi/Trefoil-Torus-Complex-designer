# 🧩 SEO & Semantic Enhancement Instructions for `trefoil.fabus.app`

## 🎯 Goal
Enhance the SEO visibility of the **Trefoil 3D Visualization Website** (`trefoil.fabus.app`) by embedding descriptive metadata, structured data (JSON-LD), and invisible semantic text that helps search engines index the site for topics such as **parametric surfaces, parametric curves, knot theory, 3D mathematical visualization, WebGL, and Three.js**.

---

## 🧠 1. HTML `<head>` Optimization

Add the following tags into the `<head>` section of the main page (index.html or main layout):

```html
<title>Trefoil Knot – 3D Parametric Surface Visualization | FABUS</title>

<meta name="description" content="Explore interactive 3D trefoil knots, parametric surfaces, and curves built with WebGL and Three.js. Learn about mathematical knot theory and visualization of complex geometry." />
<meta name="keywords" content="trefoil, trefoil knot, parametric surface, parametric curve, 3D geometry, WebGL, Three.js, mathematical visualization, topology, knot theory" />
<meta name="author" content="KREA Makina / Tansu Ozcelebi" />

<meta property="og:title" content="Trefoil Knot – Parametric 3D Surface Visualization" />
<meta property="og:description" content="A real-time interactive 3D visualization of the trefoil knot and parametric surfaces using WebGL and Three.js." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://trefoil.fabus.app/preview.jpg" />
<meta property="og:url" content="https://trefoil.fabus.app/" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Trefoil Knot Visualization" />
<meta name="twitter:description" content="Interactive 3D trefoil knot built with Three.js and WebGL showcasing parametric geometry." />
<meta name="twitter:image" content="https://trefoil.fabus.app/preview.jpg" />
```

---

## 🧩 2. Structured Data (JSON-LD Schema)

Insert this inside `<head>` after meta tags:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Trefoil Knot Visualization",
  "description": "Interactive 3D visualization of a trefoil knot and parametric surfaces using WebGL and Three.js.",
  "keywords": ["trefoil knot", "parametric surface", "parametric curve", "3D visualization", "Three.js", "geometry", "mathematics", "knot theory", "WebGL"],
  "author": {
    "@type": "Organization",
    "name": "KREA Makina"
  },
  "url": "https://trefoil.fabus.app/",
  "inLanguage": "en",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "datePublished": "2025-11-01"
}
</script>
```

---

## 🧮 3. Invisible Semantic Content Block

Add this at the end of the `<body>` (but before the closing `</body>` tag):

```html
<div style="display:none;">
  <h2>About Trefoil Knots and Parametric Surfaces</h2>
  <p>
    The Trefoil Knot is one of the simplest nontrivial mathematical knots, defined parametrically using trigonometric functions to form a closed 3D loop.
    This visualization, built with WebGL and Three.js, demonstrates the elegance of mathematical geometry and topology.
    It represents a smooth parametric curve that can also generate continuous surfaces when extended along its tangent and normal vectors.
  </p>
  <p>
    Applications include 3D modeling, differential geometry, topological art, simulation of helical or knotted structures, and mathematical education.
    Explore how parametric equations and spline-based rendering can transform mathematical functions into artistic and interactive digital sculptures.
  </p>
</div>
```

---

## 🌐 4. Visible Text for On-Page SEO

Add one or more of these short descriptions inside the visible content area of the site (e.g., below the 3D viewer):

```html
<section>
  <p>
    This interactive trefoil knot demonstrates how parametric equations create complex 3D surfaces.
    It is generated entirely through mathematical functions rendered in real time using Three.js.
  </p>
  <p>
    Explore how topology and geometry combine to form continuous, nontrivial knots — a fundamental concept in mathematical visualization.
  </p>
</section>
```

---

## 📊 5. Additional Recommendations

- Optimize all 3D preview images with descriptive `alt` attributes, e.g.:
  ```html
  <img src="/preview.jpg" alt="Trefoil knot parametric 3D model visualization" />
  ```
- Keep the site URL canonical:
  ```html
  <link rel="canonical" href="https://trefoil.fabus.app/" />
  ```
- Ensure the 3D canvas element has an accessible name:
  ```html
  <canvas aria-label="Trefoil knot 3D visualization of parametric surface"></canvas>
  ```
- Include the following hidden keywords in the footer or description tags (SEO safe):
  ```
  parametric surfaces, mathematical art, 3D topology, WebGL visualization, Three.js knots, differential geometry
  ```

---

## ✅ Summary

After applying these changes:
- Search engines like Google, Bing, and Yandex will associate `trefoil.fabus.app` with **3D mathematical visualization**, **parametric curves**, and **knot theory**.
- The page will be eligible for rich search results and educational discovery categories.
- Users searching for “parametric trefoil knot,” “3D mathematical model,” or “Three.js topology” will easily find the website.

---

**Prepared by:**  
Tansu Ozcelebi  
For use by Claude (Anthropic) to implement on `trefoil.fabus.app`
