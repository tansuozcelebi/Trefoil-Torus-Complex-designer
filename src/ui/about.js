import { languages, getTabLabel } from './help.js';
import { OBJECT_TYPES } from '../objects/shapes.js';

// Prefer a local bundled photo; fall back to public avatars if missing
const authorPhoto = new URL('../assets/author.jpg', import.meta.url).href;

// About-panel strings, one entry per language; the layout is shared (buildAbout).
// {LINK} is replaced with the localized Wikipedia link.
const aboutStrings = {
  en: { tagline: "Interactive 3D parametric surface designer", author: "Author", built: "Built with Three.js and Vite. Contact:", github: "GitHub Repository", knotH: "About Knot Theory", knot: "The <strong>trefoil knot</strong> is the simplest non-trivial knot in mathematics, characterized by three crossings. It appears in nature, art, and physics. For more information, see {LINK}." },
  tr: { tagline: "İnteraktif 3D parametrik yüzey tasarım aracı", author: "Yazar", built: "Three.js ve Vite ile geliştirildi. İletişim:", github: "GitHub Deposu", knotH: "Düğüm Teorisi Hakkında", knot: "<strong>Trefoil düğümü</strong> matematikte en basit önemsiz olmayan düğümdür ve üç geçişle karakterizedir. Doğada, sanatta ve fizikte karşımıza çıkar. Daha fazla bilgi için: {LINK}." },
  es: { tagline: "Diseñador interactivo de superficies paramétricas 3D", author: "Autor", built: "Desarrollado con Three.js y Vite. Contacto:", github: "Repositorio GitHub", knotH: "Sobre la Teoría de Nudos", knot: "El <strong>nudo trébol</strong> es el nudo no trivial más simple en matemáticas, caracterizado por tres cruces. Aparece en la naturaleza, el arte y la física. Para más información, consulte {LINK}." },
  fr: { tagline: "Concepteur de surfaces paramétriques 3D interactif", author: "Auteur", built: "Développé avec Three.js et Vite. Contact :", github: "Dépôt GitHub", knotH: "À propos de la Théorie des Nœuds", knot: "Le <strong>nœud de trèfle</strong> est le nœud non trivial le plus simple en mathématiques, caractérisé par trois croisements. Il apparaît dans la nature, l'art et la physique. Pour plus d'informations, consultez {LINK}." },
  de: { tagline: "Interaktiver 3D-Designer für parametrische Oberflächen", author: "Autor", built: "Entwickelt mit Three.js und Vite. Kontakt:", github: "GitHub Repository", knotH: "Über Knotentheorie", knot: "Der <strong>Kleeblattknoten</strong> ist der einfachste nichttriviale Knoten in der Mathematik und zeichnet sich durch drei Kreuzungen aus. Er erscheint in Natur, Kunst und Physik. Weitere Informationen: {LINK}." },
  it: { tagline: "Designer interattivo di superfici parametriche 3D", author: "Autore", built: "Realizzato con Three.js e Vite. Contatto:", github: "Repository GitHub", knotH: "Informazioni sulla teoria dei nodi", knot: "Il <strong>nodo trifoglio</strong> è il nodo non banale più semplice in matematica, caratterizzato da tre incroci. Appare in natura, arte e fisica. Per maggiori informazioni, vedi {LINK}." },
  pt: { tagline: "Designer interativo de superfícies paramétricas 3D", author: "Autor", built: "Criado com Three.js e Vite. Contato:", github: "Repositório GitHub", knotH: "Sobre a teoria dos nós", knot: "O <strong>nó trifólio</strong> é o nó não trivial mais simples da matemática, caracterizado por três cruzamentos. Aparece na natureza, na arte e na física. Para mais informações, consulte {LINK}." },
  ru: { tagline: "Интерактивный редактор 3D параметрических поверхностей", author: "Автор", built: "Создано с помощью Three.js и Vite. Контакт:", github: "Репозиторий GitHub", knotH: "О теории узлов", knot: "<strong>Трилистник</strong> — простейший нетривиальный узел в математике, характеризующийся тремя пересечениями. Он встречается в природе, искусстве и физике. Подробнее см. {LINK}." },
  zh: { tagline: "交互式 3D 参数曲面设计器", author: "作者", built: "使用 Three.js 和 Vite 构建。联系方式：", github: "GitHub 仓库", knotH: "关于纽结理论", knot: "<strong>三叶结</strong>是数学中最简单的非平凡纽结，具有三个交叉。它出现在自然、艺术和物理中。更多信息，请参见 {LINK}。" },
  ja: { tagline: "インタラクティブな3Dパラメトリック曲面デザイナー", author: "作者", built: "Three.jsとViteで構築。連絡先：", github: "GitHubリポジトリ", knotH: "結び目理論について", knot: "<strong>三葉結び目</strong>は、3つの交差を特徴とする数学で最も単純な非自明な結び目です。自然、芸術、物理学に現れます。詳細は{LINK}をご覧ください。" },
  ko: { tagline: "인터랙티브 3D 파라메트릭 곡면 디자이너", author: "저자", built: "Three.js와 Vite로 제작. 연락처:", github: "GitHub 저장소", knotH: "매듭 이론에 대하여", knot: "<strong>세잎매듭</strong>은 세 개의 교차점을 특징으로 하는 수학에서 가장 단순한 비자명 매듭입니다. 자연, 예술, 물리학에 나타납니다. 자세한 내용은 {LINK}을(를) 참조하세요." },
  ar: { tagline: "مصمم تفاعلي للأسطح البارامترية ثلاثية الأبعاد", author: "المؤلف", built: "مبني باستخدام Three.js وVite. للتواصل:", github: "مستودع GitHub", knotH: "حول نظرية العقد", knot: "<strong>عقدة الثالوث</strong> هي أبسط عقدة غير تافهة في الرياضيات، وتتميز بثلاثة تقاطعات. تظهر في الطبيعة والفن والفيزياء. لمزيد من المعلومات، انظر {LINK}." },
  hi: { tagline: "इंटरैक्टिव 3D पैरामीट्रिक सतह डिज़ाइनर", author: "लेखक", built: "Three.js और Vite से निर्मित। संपर्क:", github: "GitHub रिपॉज़िटरी", knotH: "गाँठ सिद्धांत के बारे में", knot: "<strong>ट्रेफ़ॉइल गाँठ</strong> गणित में सबसे सरल गैर-तुच्छ गाँठ है, जो तीन क्रॉसिंग द्वारा विशेषता है। यह प्रकृति, कला और भौतिकी में दिखाई देती है। अधिक जानकारी के लिए, {LINK} देखें।" },
  nl: { tagline: "Interactieve 3D parametrische oppervlakontwerper", author: "Auteur", built: "Gebouwd met Three.js en Vite. Contact:", github: "GitHub-repository", knotH: "Over knopentheorie", knot: "De <strong>klaverbladknoop</strong> is de eenvoudigste niet-triviale knoop in de wiskunde, gekenmerkt door drie kruisingen. Hij komt voor in de natuur, kunst en natuurkunde. Zie voor meer informatie {LINK}." },
  pl: { tagline: "Interaktywny projektant powierzchni parametrycznych 3D", author: "Autor", built: "Zbudowano przy użyciu Three.js i Vite. Kontakt:", github: "Repozytorium GitHub", knotH: "O teorii węzłów", knot: "<strong>Węzeł trójlistny</strong> to najprostszy nietrywialny węzeł w matematyce, charakteryzujący się trzema skrzyżowaniami. Występuje w przyrodzie, sztuce i fizyce. Więcej informacji: {LINK}." },
  sv: { tagline: "Interaktiv 3D parametrisk ytdesigner", author: "Författare", built: "Byggd med Three.js och Vite. Kontakt:", github: "GitHub-arkiv", knotH: "Om knutteori", knot: "<strong>Treklöverknuten</strong> är den enklaste icke-triviala knuten i matematiken, kännetecknad av tre korsningar. Den förekommer i naturen, konsten och fysiken. För mer information, se {LINK}." },
  no: { tagline: "Interaktiv 3D parametrisk overflatedesigner", author: "Forfatter", built: "Bygget med Three.js og Vite. Kontakt:", github: "GitHub-repositorium", knotH: "Om knuteteori", knot: "<strong>Kløverbladknuten</strong> er den enkleste ikke-trivielle knuten i matematikken, kjennetegnet av tre kryssinger. Den forekommer i naturen, kunsten og fysikken. For mer informasjon, se {LINK}." },
  da: { tagline: "Interaktiv 3D parametrisk overfladedesigner", author: "Forfatter", built: "Bygget med Three.js og Vite. Kontakt:", github: "GitHub-arkiv", knotH: "Om knudeteori", knot: "<strong>Trekløverknuden</strong> er den enkleste ikke-trivielle knude i matematikken, kendetegnet ved tre krydsninger. Den forekommer i naturen, kunsten og fysikken. For mere information, se {LINK}." },
  fi: { tagline: "Interaktiivinen 3D-parametristen pintojen suunnittelija", author: "Tekijä", built: "Rakennettu Three.js:llä ja Vitellä. Yhteystiedot:", github: "GitHub-tietovarasto", knotH: "Tietoa solmuteoriasta", knot: "<strong>Apilasolmu</strong> on matematiikan yksinkertaisin epätriviaali solmu, jolle on ominaista kolme risteystä. Sitä esiintyy luonnossa, taiteessa ja fysiikassa. Lisätietoja: {LINK}." },
  el: { tagline: "Διαδραστικός σχεδιαστής 3D παραμετρικών επιφανειών", author: "Συγγραφέας", built: "Δημιουργήθηκε με Three.js και Vite. Επικοινωνία:", github: "Αποθετήριο GitHub", knotH: "Σχετικά με τη θεωρία κόμβων", knot: "Ο <strong>τριφυλλικός κόμβος</strong> είναι ο απλούστερος μη τετριμμένος κόμβος στα μαθηματικά, που χαρακτηρίζεται από τρεις διασταυρώσεις. Εμφανίζεται στη φύση, την τέχνη και τη φυσική. Για περισσότερες πληροφορίες, δείτε {LINK}." }
};

const knotTheoryLinks = {
  tr: { title: 'Düğüm Teorisi (Wikipedia)', url: 'https://tr.wikipedia.org/wiki/D%C3%BC%C4%9F%C3%BCm_teorisi' },
  es: { title: 'Teoría de Nudos', url: 'https://es.wikipedia.org/wiki/Teor%C3%ADa_de_nudos' },
  fr: { title: 'Théorie des Nœuds', url: 'https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_n%C5%93uds' },
  de: { title: 'Knotentheorie', url: 'https://de.wikipedia.org/wiki/Knotentheorie' },
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

// Highlights ("brag" cards) at the top of the About page: big numbers taken
// from the app itself so they never go stale. hl = section title; the rest are
// the card captions (the Shapes caption reuses the tab label).
const HIGHLIGHT_TEXT = {
  hl: { en: 'Highlights', tr: 'Öne Çıkanlar', es: 'Destacados', fr: 'Points forts', de: 'Highlights', it: 'In evidenza', pt: 'Destaques', ru: 'Главное', zh: '亮点', ja: 'ハイライト', ko: '하이라이트', ar: 'أبرز المزايا', hi: 'मुख्य विशेषताएँ', nl: 'Hoogtepunten', pl: 'Najważniejsze', sv: 'Höjdpunkter', no: 'Høydepunkter', da: 'Højdepunkter', fi: 'Kohokohdat', el: 'Κύρια σημεία' },
  envs: { en: 'Environments', tr: 'Ortam', es: 'Entornos', fr: 'Environnements', de: 'Umgebungen', it: 'Ambienti', pt: 'Ambientes', ru: 'Окружения', zh: '环境', ja: '環境', ko: '환경', ar: 'بيئات', hi: 'वातावरण', nl: 'Omgevingen', pl: 'Środowiska', sv: 'Miljöer', no: 'Miljøer', da: 'Miljøer', fi: 'Ympäristöt', el: 'Περιβάλλοντα' },
  langs: { en: 'Languages', tr: 'Dil', es: 'Idiomas', fr: 'Langues', de: 'Sprachen', it: 'Lingue', pt: 'Idiomas', ru: 'Языки', zh: '语言', ja: '言語', ko: '언어', ar: 'لغات', hi: 'भाषाएँ', nl: 'Talen', pl: 'Języki', sv: 'Språk', no: 'Språk', da: 'Sprog', fi: 'Kielet', el: 'Γλώσσες' },
  formats: { en: 'Export formats', tr: 'Dışa aktarma biçimi', es: 'Formatos de exportación', fr: "Formats d'export", de: 'Exportformate', it: 'Formati di esportazione', pt: 'Formatos de exportação', ru: 'Форматы экспорта', zh: '导出格式', ja: 'エクスポート形式', ko: '내보내기 형식', ar: 'صيغ التصدير', hi: 'निर्यात प्रारूप', nl: 'Exportformaten', pl: 'Formaty eksportu', sv: 'Exportformat', no: 'Eksportformater', da: 'Eksportformater', fi: 'Vientimuodot', el: 'Μορφές εξαγωγής' }
};
const hlText = (key, lang) => HIGHLIGHT_TEXT[key][lang] || HIGHLIGHT_TEXT[key].en;

// Counts the app can't derive here (environment buttons, export formats) are
// supplied by mainapp through setAboutStats().
const stats = { environments: 0, formats: 0 };
export function setAboutStats(next){ Object.assign(stats, next); }

export function getHighlights(lang = 'en'){
  return [
    { value: OBJECT_TYPES.length, label: getTabLabel('Shapes', lang) },
    { value: stats.environments, label: hlText('envs', lang) },
    { value: languages.length, label: hlText('langs', lang) },
    { value: stats.formats, label: hlText('formats', lang) }
  ].filter(h => h.value > 0);
}

function buildAbout(lang){
  const s = aboutStrings[lang] || aboutStrings.en;
  const link = knotTheoryLinks[lang] || { title: 'Knot Theory', url: 'https://en.wikipedia.org/wiki/Knot_theory' };
  const linkHtml = `<a href="${link.url}" target="_blank" rel="noopener">${link.title}</a>`;
  const cards = getHighlights(lang).map(h =>
    `<div class="tc-brag-card"><div class="tc-brag-value">${h.value}</div><div class="tc-brag-label">${h.label}</div></div>`).join('');

  return `<h2>Trefoil Torus Complex Designer</h2>
<p class="tc-about-tagline">${s.tagline} · v${__APP_VERSION__}</p>
<h4>${hlText('hl', lang)}</h4>
<div class="tc-brag">${cards}</div>
<div class="tc-about-author">
  <img src="${authorPhoto}" alt="${s.author}" width="72" height="72" loading="lazy" onerror="this.onerror=null; this.src='https://unavatar.io/github/tansuozcelebi';"/>
  <div>
    <h3>${s.author}: Tansu Ozcelebi</h3>
    <a href="https://www.linkedin.com/in/tansuozcelebi/" target="_blank" rel="noopener">LinkedIn</a> ·
    <a href="https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer" target="_blank" rel="noopener">${s.github}</a>
  </div>
</div>
<p>${s.built} <a href="mailto:tansu@kreamakina.com">tansu@kreamakina.com</a></p>
<h4>${s.knotH}</h4>
<p>${s.knot.replace('{LINK}', linkHtml)}</p>`;
}

export function getAboutHtml(lang = 'en'){
  return buildAbout(aboutStrings[lang] ? lang : 'en');
}
