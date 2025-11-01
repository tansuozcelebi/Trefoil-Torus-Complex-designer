// Prefer a local bundled photo; fall back to public avatars if missing
const authorPhoto = new URL('../assets/author.jpg', import.meta.url).href;

const aboutContent = {
  en: `<h2>Trefoil Torus Complex Designer</h2>
<p>Version 1.1.3 — Interactive 3D parametric surface designer</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Profile Photo" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Author: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn Profile</a>
  </div>
</div>
<p><strong>Features:</strong> Parametric torus/knots (Trefoil, Septafoil), PBR materials with transmission and fresnel effects, shader-driven animated sea surface, real-time reflections, environment presets, GLB export, and scene preset management.</p>
<p>Built with Three.js and Vite. Contact: <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">GitHub Repository</a></p>
<h4>About Knot Theory</h4>
<p>The <strong>trefoil knot</strong> is the simplest non-trivial knot in mathematics, characterized by three crossings. It appears in nature, art, and physics. For more information, see <a href="https://en.wikipedia.org/wiki/Knot_theory" target="_blank" rel="noopener">Knot Theory on Wikipedia</a>.</p>`,

  tr: `<h2>Trefoil Torus Complex Designer</h2>
<p>Sürüm 1.1.3 — İnteraktif 3D parametrik yüzey tasarım aracı</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Profil Fotoğrafı" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Yazar: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn Profili</a>
  </div>
</div>
<p><strong>Özellikler:</strong> Parametrik torus/düğümler (Trefoil, Septafoil), iletim ve fresnel efektli PBR materyaller, shader tabanlı animasyonlu deniz yüzeyi, gerçek zamanlı yansımalar, ortam ön ayarları, GLB dışa aktarma ve sahne yönetimi.</p>
<p>Three.js ve Vite ile geliştirildi. İletişim: <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">GitHub Deposu</a></p>
<h4>Düğüm Teorisi Hakkında</h4>
<p><strong>Trefoil düğümü</strong> matematikte en basit önemsiz olmayan düğümdür ve üç geçişle karakterizedir. Doğada, sanatta ve fizikte karşımıza çıkar. Daha fazla bilgi için <a href="https://en.wikipedia.org/wiki/Knot_theory" target="_blank" rel="noopener">Wikipedia'daki Düğüm Teorisi</a> sayfasına bakın.</p>`,

  es: `<h2>Trefoil Torus Complex Designer</h2>
<p>Versión 1.1.3 — Diseñador interactivo de superficies paramétricas 3D</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Foto de perfil" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Autor: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</div>
<p><strong>Características:</strong> Toros/nudos paramétricos (Trefoil, Septafoil), materiales PBR con efectos de transmisión y fresnel, superficie marina animada con shaders, reflejos en tiempo real, presets de entorno, exportación GLB y gestión de presets de escena.</p>
<p>Desarrollado con Three.js y Vite. Contacto: <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">Repositorio GitHub</a></p>
<h4>Sobre la Teoría de Nudos</h4>
<p>El <strong>nudo trébol</strong> es el nudo no trivial más simple en matemáticas, caracterizado por tres cruces. Aparece en la naturaleza, el arte y la física. Para más información, consulte <a href="https://es.wikipedia.org/wiki/Teor%C3%ADa_de_nudos" target="_blank" rel="noopener">Teoría de Nudos en Wikipedia</a>.</p>`,

  fr: `<h2>Trefoil Torus Complex Designer</h2>
<p>Version 1.1.3 — Concepteur de surfaces paramétriques 3D interactif</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Photo de profil" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Auteur: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</div>
<p><strong>Fonctionnalités:</strong> Tores/nœuds paramétriques (Trefoil, Septafoil), matériaux PBR avec effets de transmission et fresnel, surface maritime animée par shaders, réflexions en temps réel, préréglages d'environnement, exportation GLB et gestion des préréglages de scène.</p>
<p>Développé avec Three.js et Vite. Contact: <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">Dépôt GitHub</a></p>
<h4>À propos de la Théorie des Nœuds</h4>
<p>Le <strong>nœud de trèfle</strong> est le nœud non trivial le plus simple en mathématiques, caractérisé par trois croisements. Il apparaît dans la nature, l'art et la physique. Pour plus d'informations, consultez <a href="https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_n%C5%93uds" target="_blank" rel="noopener">Théorie des Nœuds sur Wikipédia</a>.</p>`,

  de: `<h2>Trefoil Torus Complex Designer</h2>
<p>Version 1.1.3 — Interaktiver 3D-Designer für parametrische Oberflächen</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Profilfoto" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Autor: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</div>
<p><strong>Funktionen:</strong> Parametrische Tori/Knoten (Trefoil, Septafoil), PBR-Materialien mit Übertragungs- und Fresnel-Effekten, shader-gesteuerte animierte Meeresoberfläche, Echtzeit-Reflexionen, Umgebungsvorlagen, GLB-Export und Szenenverwaltung.</p>
<p>Entwickelt mit Three.js und Vite. Kontakt: <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">GitHub Repository</a></p>
<h4>Über Knotentheorie</h4>
<p>Der <strong>Kleeblattknoten</strong> ist der einfachste nichttriviale Knoten in der Mathematik und zeichnet sich durch drei Kreuzungen aus. Er erscheint in Natur, Kunst und Physik. Weitere Informationen finden Sie unter <a href="https://de.wikipedia.org/wiki/Knotentheorie" target="_blank" rel="noopener">Knotentheorie auf Wikipedia</a>.</p>`
};

// Add content for remaining languages (using English as template with local adjustments)
const baseContent = (lang) => {
  const knotTheoryLinks = {
    it: { title: 'Teoria dei Nodi', url: 'https://it.wikipedia.org/wiki/Teoria_dei_nodi' },
    pt: { title: 'Teoria dos Nós', url: 'https://pt.wikipedia.org/wiki/Teoria_dos_n%C3%B3s' },
    ru: { title: 'Теория узлов', url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BE%D1%80%D0%B8%D1%8F_%D1%83%D0%B7%D0%BB%D0%BE%D0%B2' },
    zh: { title: '纽结理论', url: 'https://zh.wikipedia.org/wiki/%E7%B4%90%E7%B5%90%E7%90%86%E8%AB%96' },
    ja: { title: '結び目理論', url: 'https://ja.wikipedia.org/wiki/%E7%B5%90%E3%81%B3%E7%9B%AE%E7%90%86%E8%AB%96' },
    ko: { title: '매듭 이론', url: 'https://ko.wikipedia.org/wiki/%EB%A7%A4%EB%93%AD_%EC%9D%B4%EB%A1%A0' },
    ar: { title: 'نظرية العقدة', url: 'https://ar.wikipedia.org/wiki/%D9%86%D8%B8%D8%B1%D9%8A%D8%A9_%D8%A7%D9%84%D8%B9%D9%82%D8%AF%D8%A9' },
    hi: { title: 'गाँठ सिद्धांत', url: 'https://en.wikipedia.org/wiki/Knot_theory' },
    nl: { title: 'Knopentheorie', url: 'https://nl.wikipedia.org/wiki/Knopentheorie' },
    pl: { title: 'Teoria węzłów', url: 'https://pl.wikipedia.org/wiki/Teoria_w%C4%99z%C5%82%C3%B3w' },
    sv: { title: 'Knutteori', url: 'https://sv.wikipedia.org/wiki/Knutteori' },
    no: { title: 'Knuteteori', url: 'https://no.wikipedia.org/wiki/Knuteteori' },
    da: { title: 'Knudeteori', url: 'https://da.wikipedia.org/wiki/Knudeteori' },
    fi: { title: 'Solmuteoria', url: 'https://fi.wikipedia.org/wiki/Solmuteoria' },
    el: { title: 'Θεωρία κόμβων', url: 'https://el.wikipedia.org/wiki/%CE%98%CE%B5%CF%89%CF%81%CE%AF%CE%B1_%CE%BA%CF%8C%CE%BC%CE%B2%CF%89%CE%BD' }
  };
  
  const link = knotTheoryLinks[lang] || { title: 'Knot Theory', url: 'https://en.wikipedia.org/wiki/Knot_theory' };
  
  return `<h2>Trefoil Torus Complex Designer</h2>
<p>Version 1.1.3 — Interactive 3D parametric surface designer</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Profile" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">Author: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</div>
<p><strong>Features:</strong> Parametric torus/knots (Trefoil, Septafoil), PBR materials with transmission and fresnel effects, shader-driven animated sea surface, real-time reflections, environment presets, GLB export, and scene preset management.</p>
<p>Built with Three.js and Vite. Contact: <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">GitHub Repository</a></p>
<h4>About Knot Theory</h4>
<p>The <strong>trefoil knot</strong> is the simplest non-trivial knot in mathematics, characterized by three crossings. It appears in nature, art, and physics. For more information, see <a href="${link.url}" target="_blank" rel="noopener">${link.title} on Wikipedia</a>.</p>`;
};

['it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'nl', 'pl', 'sv', 'no', 'da', 'fi', 'el'].forEach(lang => {
  aboutContent[lang] = baseContent(lang);
});

export function getAboutHtml(lang = 'en'){
  return aboutContent[lang] || aboutContent.en;
}

