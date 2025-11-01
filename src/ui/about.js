// Prefer a local bundled photo; fall back to public avatars if missing
const authorPhoto = new URL('../assets/author.jpg', import.meta.url).href;
const about_en = `
<h2>Trefoil Torus Complex Designer</h2>
<p>Version 1.1.3 — A small experimental designer built with AI only</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
	<img src="${authorPhoto}" alt="Profile Photo" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Author: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn Profile</a>
  </div>
  
</div>
<p>Features: parametric torus/knots, PBR materials, shader-driven sea, reflection, export, and scene presets.</p>
<p>You can send email to tansu@kreamakina.com for feedback or inquiries.</p>
<a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">GitHub Repository</a>
<p>For more background on knot mathematics, see <a href="https://en.wikipedia.org/wiki/Knot_theory" target="_blank" rel="noopener">Knot theory (Wikipedia)</a>.</p>
<h4>Bibliography & Resources</h4>
<ul>
	<li><a href="https://en.wikipedia.org/wiki/Knot_theory" target="_blank" rel="noopener">Knot theory — Wikipedia</a></li>
	<li><a href="https://mathworld.wolfram.com/TrefoilKnot.html" target="_blank" rel="noopener">Trefoil Knot — MathWorld</a></li>
	<li>H. Schubert, "Knoten" (Textbook on classical knot theory)</li>
</ul>
`;

const about_tr = `
<h2>Trefoil Torus Complex Designer</h2>
<p>Sürüm 1.1.3 — Three.js ve Vite ile yapılmış küçük bir deneysel tasarım aracı.</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
	<img src="${authorPhoto}" alt="Profil Fotoğrafı" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
	<div>
		<h3 style="margin:0 0 6px 0;">Yazar: Tansu Ozcelebi (2025)</h3>
		<a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn Profili</a>
	</div>
</div>
<p>Özellikler: parametrik torus/düğüm, PBR materyaller, shader tabanlı deniz, yansıtma, dışa aktarma ve sahne ön ayarları.</p>
<p>Düğüm teorisi hakkında daha fazla bilgi için <a href="https://en.wikipedia.org/wiki/Knot_theory" target="_blank" rel="noopener">Knot theory (Wikipedia)</a> sayfasına bakabilirsiniz.</p>
`;

export function getAboutHtml(lang = 'en'){
	return lang === 'tr' ? about_tr : about_en;
}

