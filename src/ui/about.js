// Prefer a local bundled photo; fall back to public avatars if missing
const authorPhoto = new URL('../assets/author.jpg', import.meta.url).href;

const aboutContent = {
  en: `<h2>Trefoil Torus Complex Designer</h2>
<p>Version ${__APP_VERSION__} — Interactive 3D parametric surface designer</p>
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
<p>Sürüm ${__APP_VERSION__} — İnteraktif 3D parametrik yüzey tasarım aracı</p>
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
<p>Versión ${__APP_VERSION__} — Diseñador interactivo de superficies paramétricas 3D</p>
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
<p>Version ${__APP_VERSION__} — Concepteur de surfaces paramétriques 3D interactif</p>
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
<p>Version ${__APP_VERSION__} — Interaktiver 3D-Designer für parametrische Oberflächen</p>
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

// Translated About-panel strings for the languages that don't have a full
// custom block above. {LINK} is replaced with the localized Wikipedia link.
const aboutStrings = {
  en: { tagline: "Interactive 3D parametric surface designer", author: "Author", features: "Features", featuresText: "Parametric torus/knots (Trefoil, Septafoil), PBR materials with transmission and fresnel effects, animated water surface, real-time reflections, environment presets, GLB export, physics, and scene preset management.", built: "Built with Three.js and Vite. Contact:", github: "GitHub Repository", knotH: "About Knot Theory", knot: "The <strong>trefoil knot</strong> is the simplest non-trivial knot in mathematics, characterized by three crossings. It appears in nature, art, and physics. For more information, see {LINK}." },
  it: { tagline: "Designer interattivo di superfici parametriche 3D", author: "Autore", features: "Caratteristiche", featuresText: "Tori/nodi parametrici (Trefoil, Septafoil), materiali PBR con effetti di trasmissione e fresnel, superficie d'acqua animata, riflessi in tempo reale, preset di ambiente, esportazione GLB, fisica e gestione dei preset di scena.", built: "Realizzato con Three.js e Vite. Contatto:", github: "Repository GitHub", knotH: "Informazioni sulla teoria dei nodi", knot: "Il <strong>nodo trifoglio</strong> è il nodo non banale più semplice in matematica, caratterizzato da tre incroci. Appare in natura, arte e fisica. Per maggiori informazioni, vedi {LINK}." },
  pt: { tagline: "Designer interativo de superfícies paramétricas 3D", author: "Autor", features: "Recursos", featuresText: "Toros/nós paramétricos (Trefoil, Septafoil), materiais PBR com efeitos de transmissão e fresnel, superfície de água animada, reflexos em tempo real, predefinições de ambiente, exportação GLB, física e gerenciamento de predefinições de cena.", built: "Criado com Three.js e Vite. Contato:", github: "Repositório GitHub", knotH: "Sobre a teoria dos nós", knot: "O <strong>nó trifólio</strong> é o nó não trivial mais simples da matemática, caracterizado por três cruzamentos. Aparece na natureza, na arte e na física. Para mais informações, consulte {LINK}." },
  ru: { tagline: "Интерактивный редактор 3D параметрических поверхностей", author: "Автор", features: "Возможности", featuresText: "Параметрические торы/узлы (Trefoil, Septafoil), PBR-материалы с эффектами пропускания и Френеля, анимированная водная поверхность, отражения в реальном времени, пресеты окружения, экспорт GLB, физика и управление пресетами сцены.", built: "Создано с помощью Three.js и Vite. Контакт:", github: "Репозиторий GitHub", knotH: "О теории узлов", knot: "<strong>Трилистник</strong> — простейший нетривиальный узел в математике, характеризующийся тремя пересечениями. Он встречается в природе, искусстве и физике. Подробнее см. {LINK}." },
  zh: { tagline: "交互式 3D 参数曲面设计器", author: "作者", features: "功能", featuresText: "参数化环面/纽结（Trefoil、Septafoil）、具有透射和菲涅耳效果的 PBR 材质、动画水面、实时反射、环境预设、GLB 导出、物理引擎以及场景预设管理。", built: "使用 Three.js 和 Vite 构建。联系方式：", github: "GitHub 仓库", knotH: "关于纽结理论", knot: "<strong>三叶结</strong>是数学中最简单的非平凡纽结，具有三个交叉。它出现在自然、艺术和物理中。更多信息，请参见 {LINK}。" },
  ja: { tagline: "インタラクティブな3Dパラメトリック曲面デザイナー", author: "作者", features: "機能", featuresText: "パラメトリックなトーラス/結び目（Trefoil、Septafoil）、透過・フレネル効果を備えたPBRマテリアル、アニメーションする水面、リアルタイム反射、環境プリセット、GLBエクスポート、物理エンジン、シーンプリセット管理。", built: "Three.jsとViteで構築。連絡先：", github: "GitHubリポジトリ", knotH: "結び目理論について", knot: "<strong>三葉結び目</strong>は、3つの交差を特徴とする数学で最も単純な非自明な結び目です。自然、芸術、物理学に現れます。詳細は{LINK}をご覧ください。" },
  ko: { tagline: "인터랙티브 3D 파라메트릭 곡면 디자이너", author: "저자", features: "기능", featuresText: "파라메트릭 토러스/매듭(Trefoil, Septafoil), 투과 및 프레넬 효과가 있는 PBR 재질, 애니메이션 수면, 실시간 반사, 환경 프리셋, GLB 내보내기, 물리 엔진, 장면 프리셋 관리.", built: "Three.js와 Vite로 제작. 연락처:", github: "GitHub 저장소", knotH: "매듭 이론에 대하여", knot: "<strong>세잎매듭</strong>은 세 개의 교차점을 특징으로 하는 수학에서 가장 단순한 비자명 매듭입니다. 자연, 예술, 물리학에 나타납니다. 자세한 내용은 {LINK}을(를) 참조하세요." },
  ar: { tagline: "مصمم تفاعلي للأسطح البارامترية ثلاثية الأبعاد", author: "المؤلف", features: "الميزات", featuresText: "حلقات/عقد بارامترية (Trefoil، Septafoil)، خامات PBR مع تأثيرات النفاذية وفرينل، سطح ماء متحرك، انعكاسات في الوقت الفعلي، إعدادات بيئة مسبقة، تصدير GLB، محرك فيزياء، وإدارة إعدادات المشهد.", built: "مبني باستخدام Three.js وVite. للتواصل:", github: "مستودع GitHub", knotH: "حول نظرية العقد", knot: "<strong>عقدة الثالوث</strong> هي أبسط عقدة غير تافهة في الرياضيات، وتتميز بثلاثة تقاطعات. تظهر في الطبيعة والفن والفيزياء. لمزيد من المعلومات، انظر {LINK}." },
  hi: { tagline: "इंटरैक्टिव 3D पैरामीट्रिक सतह डिज़ाइनर", author: "लेखक", features: "विशेषताएँ", featuresText: "पैरामीट्रिक टोरस/गाँठें (Trefoil, Septafoil), ट्रांसमिशन और फ्रेनेल प्रभावों वाली PBR सामग्री, एनिमेटेड जल सतह, रीयल-टाइम परावर्तन, वातावरण प्रीसेट, GLB निर्यात, भौतिकी, और दृश्य प्रीसेट प्रबंधन।", built: "Three.js और Vite से निर्मित। संपर्क:", github: "GitHub रिपॉज़िटरी", knotH: "गाँठ सिद्धांत के बारे में", knot: "<strong>ट्रेफ़ॉइल गाँठ</strong> गणित में सबसे सरल गैर-तुच्छ गाँठ है, जो तीन क्रॉसिंग द्वारा विशेषता है। यह प्रकृति, कला और भौतिकी में दिखाई देती है। अधिक जानकारी के लिए, {LINK} देखें।" },
  nl: { tagline: "Interactieve 3D parametrische oppervlakontwerper", author: "Auteur", features: "Functies", featuresText: "Parametrische torussen/knopen (Trefoil, Septafoil), PBR-materialen met transmissie- en fresnel-effecten, geanimeerd wateroppervlak, realtime reflecties, omgevingspresets, GLB-export, fysica en scènepreset-beheer.", built: "Gebouwd met Three.js en Vite. Contact:", github: "GitHub-repository", knotH: "Over knopentheorie", knot: "De <strong>klaverbladknoop</strong> is de eenvoudigste niet-triviale knoop in de wiskunde, gekenmerkt door drie kruisingen. Hij komt voor in de natuur, kunst en natuurkunde. Zie voor meer informatie {LINK}." },
  pl: { tagline: "Interaktywny projektant powierzchni parametrycznych 3D", author: "Autor", features: "Funkcje", featuresText: "Parametryczne torusy/węzły (Trefoil, Septafoil), materiały PBR z efektami transmisji i fresnela, animowana powierzchnia wody, odbicia w czasie rzeczywistym, ustawienia środowiska, eksport GLB, fizyka i zarządzanie ustawieniami sceny.", built: "Zbudowano przy użyciu Three.js i Vite. Kontakt:", github: "Repozytorium GitHub", knotH: "O teorii węzłów", knot: "<strong>Węzeł trójlistny</strong> to najprostszy nietrywialny węzeł w matematyce, charakteryzujący się trzema skrzyżowaniami. Występuje w przyrodzie, sztuce i fizyce. Więcej informacji: {LINK}." },
  sv: { tagline: "Interaktiv 3D parametrisk ytdesigner", author: "Författare", features: "Funktioner", featuresText: "Parametriska torusar/knutar (Trefoil, Septafoil), PBR-material med transmissions- och fresnel-effekter, animerad vattenyta, realtidsreflektioner, miljöförinställningar, GLB-export, fysik och hantering av scenförinställningar.", built: "Byggd med Three.js och Vite. Kontakt:", github: "GitHub-arkiv", knotH: "Om knutteori", knot: "<strong>Treklöverknuten</strong> är den enklaste icke-triviala knuten i matematiken, kännetecknad av tre korsningar. Den förekommer i naturen, konsten och fysiken. För mer information, se {LINK}." },
  no: { tagline: "Interaktiv 3D parametrisk overflatedesigner", author: "Forfatter", features: "Funksjoner", featuresText: "Parametriske toruser/knuter (Trefoil, Septafoil), PBR-materialer med transmisjons- og fresnel-effekter, animert vannoverflate, sanntidsrefleksjoner, miljøforhåndsinnstillinger, GLB-eksport, fysikk og håndtering av sceneforhåndsinnstillinger.", built: "Bygget med Three.js og Vite. Kontakt:", github: "GitHub-repositorium", knotH: "Om knuteteori", knot: "<strong>Kløverbladknuten</strong> er den enkleste ikke-trivielle knuten i matematikken, kjennetegnet av tre kryssinger. Den forekommer i naturen, kunsten og fysikken. For mer informasjon, se {LINK}." },
  da: { tagline: "Interaktiv 3D parametrisk overfladedesigner", author: "Forfatter", features: "Funktioner", featuresText: "Parametriske torusser/knuder (Trefoil, Septafoil), PBR-materialer med transmissions- og fresnel-effekter, animeret vandoverflade, realtidsrefleksioner, miljøforudindstillinger, GLB-eksport, fysik og håndtering af sceneforudindstillinger.", built: "Bygget med Three.js og Vite. Kontakt:", github: "GitHub-arkiv", knotH: "Om knudeteori", knot: "<strong>Trekløverknuden</strong> er den enkleste ikke-trivielle knude i matematikken, kendetegnet ved tre krydsninger. Den forekommer i naturen, kunsten og fysikken. For mere information, se {LINK}." },
  fi: { tagline: "Interaktiivinen 3D-parametristen pintojen suunnittelija", author: "Tekijä", features: "Ominaisuudet", featuresText: "Parametriset torukset/solmut (Trefoil, Septafoil), PBR-materiaalit läpäisy- ja fresnel-efekteillä, animoitu vedenpinta, reaaliaikaiset heijastukset, ympäristön esiasetukset, GLB-vienti, fysiikka ja kohtausten esiasetusten hallinta.", built: "Rakennettu Three.js:llä ja Vitellä. Yhteystiedot:", github: "GitHub-tietovarasto", knotH: "Tietoa solmuteoriasta", knot: "<strong>Apilasolmu</strong> on matematiikan yksinkertaisin epätriviaali solmu, jolle on ominaista kolme risteystä. Sitä esiintyy luonnossa, taiteessa ja fysiikassa. Lisätietoja: {LINK}." },
  el: { tagline: "Διαδραστικός σχεδιαστής 3D παραμετρικών επιφανειών", author: "Συγγραφέας", features: "Χαρακτηριστικά", featuresText: "Παραμετρικοί τόροι/κόμβοι (Trefoil, Septafoil), υλικά PBR με εφέ μετάδοσης και fresnel, κινούμενη επιφάνεια νερού, ανακλάσεις σε πραγματικό χρόνο, προεπιλογές περιβάλλοντος, εξαγωγή GLB, φυσική και διαχείριση προεπιλογών σκηνής.", built: "Δημιουργήθηκε με Three.js και Vite. Επικοινωνία:", github: "Αποθετήριο GitHub", knotH: "Σχετικά με τη θεωρία κόμβων", knot: "Ο <strong>τριφυλλικός κόμβος</strong> είναι ο απλούστερος μη τετριμμένος κόμβος στα μαθηματικά, που χαρακτηρίζεται από τρεις διασταυρώσεις. Εμφανίζεται στη φύση, την τέχνη και τη φυσική. Για περισσότερες πληροφορίες, δείτε {LINK}." }
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
  const s = aboutStrings[lang] || aboutStrings.en;
  const linkHtml = `<a href="${link.url}" target="_blank" rel="noopener">${link.title}</a>`;

  return `<h2>Trefoil Torus Complex Designer</h2>
<p>Version ${__APP_VERSION__} — ${s.tagline}</p>
<div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
  <img src="${authorPhoto}" alt="Profile" width="96" height="96" style="border-radius:50%; object-fit:cover; box-shadow:0 0 12px rgba(0,170,255,0.35);" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3 style="margin:0 0 6px 0;">${s.author}: Tansu Ozcelebi (2025)</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</div>
<p><strong>${s.features}:</strong> ${s.featuresText}</p>
<p>${s.built} <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<p><a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">${s.github}</a></p>
<h4>${s.knotH}</h4>
<p>${s.knot.replace('{LINK}', linkHtml)}</p>`;
};

['it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'nl', 'pl', 'sv', 'no', 'da', 'fi', 'el'].forEach(lang => {
  aboutContent[lang] = baseContent(lang);
});

export function getAboutHtml(lang = 'en'){
  return aboutContent[lang] || aboutContent.en;
}

