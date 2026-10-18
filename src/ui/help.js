// Help content - multilingual (20 languages)
// Language metadata with flags
export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' }
];

// Tab translations
export const tabTranslations = {
  en: { Home: 'Home', Environment: 'Environment', Scene: 'Scene', Object: 'Object', Export: 'Export', About: 'About', Help: 'Help' },
  tr: { Home: 'Ana Sayfa', Environment: 'Ortam', Scene: 'Sahne', Object: 'Nesne', Export: 'Dışa Aktar', About: 'Hakkında', Help: 'Yardım' },
  es: { Home: 'Inicio', Environment: 'Entorno', Scene: 'Escena', Object: 'Objeto', Export: 'Exportar', About: 'Acerca de', Help: 'Ayuda' },
  fr: { Home: 'Accueil', Environment: 'Environnement', Scene: 'Scène', Object: 'Objet', Export: 'Exporter', About: 'À propos', Help: 'Aide' },
  de: { Home: 'Startseite', Environment: 'Umgebung', Scene: 'Szene', Object: 'Objekt', Export: 'Exportieren', About: 'Über', Help: 'Hilfe' },
  it: { Home: 'Home', Environment: 'Ambiente', Scene: 'Scena', Object: 'Oggetto', Export: 'Esportare', About: 'Informazioni', Help: 'Aiuto' },
  pt: { Home: 'Início', Environment: 'Ambiente', Scene: 'Cena', Object: 'Objeto', Export: 'Exportar', About: 'Sobre', Help: 'Ajuda' },
  ru: { Home: 'Главная', Environment: 'Окружение', Scene: 'Сцена', Object: 'Объект', Export: 'Экспорт', About: 'О программе', Help: 'Справка' },
  zh: { Home: '主页', Environment: '环境', Scene: '场景', Object: '对象', Export: '导出', About: '关于', Help: '帮助' },
  ja: { Home: 'ホーム', Environment: '環境', Scene: 'シーン', Object: 'オブジェクト', Export: 'エクスポート', About: '概要', Help: 'ヘルプ' },
  ko: { Home: '홈', Environment: '환경', Scene: '장면', Object: '객체', Export: '내보내기', About: '정보', Help: '도움말' },
  ar: { Home: 'الرئيسية', Environment: 'البيئة', Scene: 'المشهد', Object: 'كائن', Export: 'تصدير', About: 'حول', Help: 'مساعدة' },
  hi: { Home: 'होम', Environment: 'वातावरण', Scene: 'दृश्य', Object: 'वस्तु', Export: 'निर्यात', About: 'के बारे में', Help: 'सहायता' },
  nl: { Home: 'Home', Environment: 'Omgeving', Scene: 'Scène', Object: 'Object', Export: 'Exporteren', About: 'Over', Help: 'Help' },
  pl: { Home: 'Strona główna', Environment: 'Środowisko', Scene: 'Scena', Object: 'Obiekt', Export: 'Eksportuj', About: 'O programie', Help: 'Pomoc' },
  sv: { Home: 'Hem', Environment: 'Miljö', Scene: 'Scen', Object: 'Objekt', Export: 'Exportera', About: 'Om', Help: 'Hjälp' },
  no: { Home: 'Hjem', Environment: 'Miljø', Scene: 'Scene', Object: 'Objekt', Export: 'Eksporter', About: 'Om', Help: 'Hjelp' },
  da: { Home: 'Hjem', Environment: 'Miljø', Scene: 'Scene', Object: 'Objekt', Export: 'Eksporter', About: 'Om', Help: 'Hjælp' },
  fi: { Home: 'Koti', Environment: 'Ympäristö', Scene: 'Kohtaus', Object: 'Objekti', Export: 'Vie', About: 'Tietoja', Help: 'Ohje' },
  el: { Home: 'Αρχική', Environment: 'Περιβάλλον', Scene: 'Σκηνή', Object: 'Αντικείμενο', Export: 'Εξαγωγή', About: 'Σχετικά', Help: 'Βοήθεια' }
};

export function getTabLabel(tabName, lang = 'en') {
  return tabTranslations[lang]?.[tabName] || tabName;
}

// UI control labels (buttons, panel titles, hints) — translated in all 20 languages
// so every on-screen button follows the selected language.
export const uiTranslations = {
  en: { gizmo: 'Gizmo', move: 'Move', rotate: 'Rotate', physics: 'Physics', hide: 'Hide', show: 'Show', stats: 'Statistics', objectDrag: 'Object — drag', gizmoHint: 'To move/rotate the selected object. Works while physics is on too.' },
  tr: { gizmo: 'Gizmo', move: 'Taşı', rotate: 'Döndür', physics: 'Fizik', hide: 'Gizle', show: 'Göster', stats: 'İstatistik', objectDrag: 'Nesne — sürükle', gizmoHint: 'Seçili nesneyi taşımak/döndürmek için. Fizik açıkken de kullanılabilir.' },
  es: { gizmo: 'Gizmo', move: 'Mover', rotate: 'Rotar', physics: 'Física', hide: 'Ocultar', show: 'Mostrar', stats: 'Estadísticas', objectDrag: 'Objeto — arrastrar', gizmoHint: 'Para mover/rotar el objeto seleccionado. Funciona también con la física activada.' },
  fr: { gizmo: 'Gizmo', move: 'Déplacer', rotate: 'Pivoter', physics: 'Physique', hide: 'Masquer', show: 'Afficher', stats: 'Statistiques', objectDrag: 'Objet — glisser', gizmoHint: "Pour déplacer/pivoter l'objet sélectionné. Fonctionne aussi quand la physique est activée." },
  de: { gizmo: 'Gizmo', move: 'Bewegen', rotate: 'Drehen', physics: 'Physik', hide: 'Ausblenden', show: 'Einblenden', stats: 'Statistik', objectDrag: 'Objekt — ziehen', gizmoHint: 'Zum Bewegen/Drehen des ausgewählten Objekts. Funktioniert auch bei aktivierter Physik.' },
  it: { gizmo: 'Gizmo', move: 'Sposta', rotate: 'Ruota', physics: 'Fisica', hide: 'Nascondi', show: 'Mostra', stats: 'Statistiche', objectDrag: 'Oggetto — trascina', gizmoHint: "Per spostare/ruotare l'oggetto selezionato. Funziona anche con la fisica attiva." },
  pt: { gizmo: 'Gizmo', move: 'Mover', rotate: 'Girar', physics: 'Física', hide: 'Ocultar', show: 'Mostrar', stats: 'Estatísticas', objectDrag: 'Objeto — arrastar', gizmoHint: 'Para mover/girar o objeto selecionado. Funciona também com a física ativada.' },
  ru: { gizmo: 'Gizmo', move: 'Двигать', rotate: 'Вращать', physics: 'Физика', hide: 'Скрыть', show: 'Показать', stats: 'Статистика', objectDrag: 'Объект — тянуть', gizmoHint: 'Для перемещения/вращения выбранного объекта. Работает и при включённой физике.' },
  zh: { gizmo: 'Gizmo', move: '移动', rotate: '旋转', physics: '物理', hide: '隐藏', show: '显示', stats: '统计', objectDrag: '对象 — 拖动', gizmoHint: '用于移动/旋转选定对象。物理开启时也可使用。' },
  ja: { gizmo: 'Gizmo', move: '移動', rotate: '回転', physics: '物理', hide: '非表示', show: '表示', stats: '統計', objectDrag: 'オブジェクト — ドラッグ', gizmoHint: '選択したオブジェクトを移動/回転します。物理が有効な間も使用できます。' },
  ko: { gizmo: 'Gizmo', move: '이동', rotate: '회전', physics: '물리', hide: '숨기기', show: '표시', stats: '통계', objectDrag: '객체 — 드래그', gizmoHint: '선택한 객체를 이동/회전합니다. 물리가 켜져 있을 때도 사용할 수 있습니다.' },
  ar: { gizmo: 'Gizmo', move: 'تحريك', rotate: 'تدوير', physics: 'الفيزياء', hide: 'إخفاء', show: 'إظهار', stats: 'إحصائيات', objectDrag: 'كائن — اسحب', gizmoHint: 'لتحريك/تدوير الكائن المحدد. يعمل أيضًا عند تفعيل الفيزياء.' },
  hi: { gizmo: 'Gizmo', move: 'ले जाएँ', rotate: 'घुमाएँ', physics: 'भौतिकी', hide: 'छिपाएँ', show: 'दिखाएँ', stats: 'आँकड़े', objectDrag: 'वस्तु — खींचें', gizmoHint: 'चयनित वस्तु को स्थानांतरित/घुमाने के लिए। भौतिकी चालू होने पर भी काम करता है।' },
  nl: { gizmo: 'Gizmo', move: 'Verplaatsen', rotate: 'Draaien', physics: 'Fysica', hide: 'Verbergen', show: 'Tonen', stats: 'Statistieken', objectDrag: 'Object — slepen', gizmoHint: 'Om het geselecteerde object te verplaatsen/draaien. Werkt ook als fysica aan staat.' },
  pl: { gizmo: 'Gizmo', move: 'Przesuń', rotate: 'Obróć', physics: 'Fizyka', hide: 'Ukryj', show: 'Pokaż', stats: 'Statystyki', objectDrag: 'Obiekt — przeciągnij', gizmoHint: 'Aby przesunąć/obrócić wybrany obiekt. Działa również przy włączonej fizyce.' },
  sv: { gizmo: 'Gizmo', move: 'Flytta', rotate: 'Rotera', physics: 'Fysik', hide: 'Dölj', show: 'Visa', stats: 'Statistik', objectDrag: 'Objekt — dra', gizmoHint: 'För att flytta/rotera det valda objektet. Fungerar även när fysik är på.' },
  no: { gizmo: 'Gizmo', move: 'Flytt', rotate: 'Roter', physics: 'Fysikk', hide: 'Skjul', show: 'Vis', stats: 'Statistikk', objectDrag: 'Objekt — dra', gizmoHint: 'For å flytte/rotere det valgte objektet. Fungerer også når fysikk er på.' },
  da: { gizmo: 'Gizmo', move: 'Flyt', rotate: 'Roter', physics: 'Fysik', hide: 'Skjul', show: 'Vis', stats: 'Statistik', objectDrag: 'Objekt — træk', gizmoHint: 'For at flytte/rotere det valgte objekt. Virker også når fysik er slået til.' },
  fi: { gizmo: 'Gizmo', move: 'Siirrä', rotate: 'Kierrä', physics: 'Fysiikka', hide: 'Piilota', show: 'Näytä', stats: 'Tilastot', objectDrag: 'Objekti — vedä', gizmoHint: 'Valitun objektin siirtämiseen/kiertämiseen. Toimii myös fysiikan ollessa päällä.' },
  el: { gizmo: 'Gizmo', move: 'Μετακίνηση', rotate: 'Περιστροφή', physics: 'Φυσική', hide: 'Απόκρυψη', show: 'Εμφάνιση', stats: 'Στατιστικά', objectDrag: 'Αντικείμενο — σύρσιμο', gizmoHint: 'Για μετακίνηση/περιστροφή του επιλεγμένου αντικειμένου. Λειτουργεί και όταν η φυσική είναι ενεργή.' }
};

// Floating-panel labels: navbar chip ("Menu") and close-button tooltip.
const UI_EXTRA = {
  menu: { en: 'Menu', tr: 'Menü', es: 'Menú', fr: 'Menu', de: 'Menü', it: 'Menu', pt: 'Menu', ru: 'Меню', zh: '菜单', ja: 'メニュー', ko: '메뉴', ar: 'القائمة', hi: 'मेनू', nl: 'Menu', pl: 'Menu', sv: 'Meny', no: 'Meny', da: 'Menu', fi: 'Valikko', el: 'Μενού' },
  close: { en: 'Close', tr: 'Kapat', es: 'Cerrar', fr: 'Fermer', de: 'Schließen', it: 'Chiudi', pt: 'Fechar', ru: 'Закрыть', zh: '关闭', ja: '閉じる', ko: '닫기', ar: 'إغلاق', hi: 'बंद करें', nl: 'Sluiten', pl: 'Zamknij', sv: 'Stäng', no: 'Lukk', da: 'Luk', fi: 'Sulje', el: 'Κλείσιμο' },
  drag: { en: 'Drag to move', tr: 'Taşımak için sürükleyin', es: 'Arrastra para mover', fr: 'Glisser pour déplacer', de: 'Zum Verschieben ziehen', it: 'Trascina per spostare', pt: 'Arraste para mover', ru: 'Перетащите, чтобы переместить', zh: '拖动以移动', ja: 'ドラッグして移動', ko: '드래그하여 이동', ar: 'اسحب للتحريك', hi: 'हिलाने के लिए खींचें', nl: 'Sleep om te verplaatsen', pl: 'Przeciągnij, aby przesunąć', sv: 'Dra för att flytta', no: 'Dra for å flytte', da: 'Træk for at flytte', fi: 'Siirrä vetämällä', el: 'Σύρετε για μετακίνηση' }
};
Object.keys(UI_EXTRA).forEach(k => Object.keys(UI_EXTRA[k]).forEach(lang => {
  if (uiTranslations[lang]) uiTranslations[lang][k] = UI_EXTRA[k][lang];
}));

export function getUILabel(key, lang = 'en') {
  return (uiTranslations[lang] && uiTranslations[lang][key]) || uiTranslations.en[key] || key;
}

// dat.GUI folder titles + descriptive controller labels (Object panel), keyed by
// the English text as dat.GUI renders it. Technical/symbol rows (a, b, p, q,
// metalness, posX, ...) are intentionally left untranslated.
export const guiTranslations = {
  en: { 'Geometry':'Geometry','Material':'Material','Lighting':'Lighting','View':'View','Math Surface':'Math Surface','6-Axis Controls XYZABC':'Transform (6-axis)','Object Type':'Object Type','Magnitude':'Magnitude','Fresnel Highlight':'Fresnel Highlight','Material Color':'Material Color','Wireframe Color':'Wireframe Color','useTransmission':'Transmission','useWireframe':'Wireframe','autoRotate':'Auto Rotate','rotationSpeed':'Rotation Speed','Transform Gizmo':'Transform Gizmo','Gizmo Mode':'Gizmo Mode','UCS Gizmo':'UCS Gizmo','materialType':'Material Type' },
  tr: { 'Geometry':'Geometri','Material':'Malzeme','Lighting':'Işıklandırma','View':'Görünüm','Math Surface':'Matematik Yüzey','6-Axis Controls XYZABC':'Dönüşüm (6 eksen)','Object Type':'Nesne Tipi','Magnitude':'Büyüklük','Fresnel Highlight':'Fresnel Parlaklığı','Material Color':'Malzeme Rengi','Wireframe Color':'Tel Kafes Rengi','useTransmission':'Geçirgenlik','useWireframe':'Tel Kafes','autoRotate':'Otomatik Döndür','rotationSpeed':'Dönüş Hızı','Transform Gizmo':'Dönüşüm Gizmo','Gizmo Mode':'Gizmo Modu','UCS Gizmo':'UCS Gizmo','materialType':'Malzeme Tipi' },
  es: { 'Geometry':'Geometría','Material':'Material','Lighting':'Iluminación','View':'Vista','Math Surface':'Superficie matemática','6-Axis Controls XYZABC':'Transformación (6 ejes)','Object Type':'Tipo de objeto','Magnitude':'Magnitud','Fresnel Highlight':'Brillo Fresnel','Material Color':'Color del material','Wireframe Color':'Color de malla','useTransmission':'Transmisión','useWireframe':'Malla','autoRotate':'Rotación automática','rotationSpeed':'Velocidad de rotación','Transform Gizmo':'Gizmo de transformación','Gizmo Mode':'Modo Gizmo','UCS Gizmo':'Gizmo UCS','materialType':'Tipo de material' },
  fr: { 'Geometry':'Géométrie','Material':'Matériau','Lighting':'Éclairage','View':'Vue','Math Surface':'Surface mathématique','6-Axis Controls XYZABC':'Transformation (6 axes)','Object Type':"Type d'objet",'Magnitude':'Amplitude','Fresnel Highlight':'Reflet de Fresnel','Material Color':'Couleur du matériau','Wireframe Color':'Couleur du filaire','useTransmission':'Transmission','useWireframe':'Filaire','autoRotate':'Rotation auto','rotationSpeed':'Vitesse de rotation','Transform Gizmo':'Gizmo de transformation','Gizmo Mode':'Mode Gizmo','UCS Gizmo':'Gizmo UCS','materialType':'Type de matériau' },
  de: { 'Geometry':'Geometrie','Material':'Material','Lighting':'Beleuchtung','View':'Ansicht','Math Surface':'Math. Fläche','6-Axis Controls XYZABC':'Transformation (6 Achsen)','Object Type':'Objekttyp','Magnitude':'Betrag','Fresnel Highlight':'Fresnel-Glanz','Material Color':'Materialfarbe','Wireframe Color':'Gitterfarbe','useTransmission':'Transmission','useWireframe':'Gitter','autoRotate':'Auto-Rotation','rotationSpeed':'Rotationsgeschw.','Transform Gizmo':'Transformations-Gizmo','Gizmo Mode':'Gizmo-Modus','UCS Gizmo':'UCS-Gizmo','materialType':'Materialtyp' },
  it: { 'Geometry':'Geometria','Material':'Materiale','Lighting':'Illuminazione','View':'Vista','Math Surface':'Superficie matematica','6-Axis Controls XYZABC':'Trasformazione (6 assi)','Object Type':'Tipo oggetto','Magnitude':'Magnitudo','Fresnel Highlight':'Riflesso Fresnel','Material Color':'Colore materiale','Wireframe Color':'Colore wireframe','useTransmission':'Trasmissione','useWireframe':'Wireframe','autoRotate':'Rotazione automatica','rotationSpeed':'Velocità rotazione','Transform Gizmo':'Gizmo trasformazione','Gizmo Mode':'Modalità Gizmo','UCS Gizmo':'Gizmo UCS','materialType':'Tipo materiale' },
  pt: { 'Geometry':'Geometria','Material':'Material','Lighting':'Iluminação','View':'Vista','Math Surface':'Superfície matemática','6-Axis Controls XYZABC':'Transformação (6 eixos)','Object Type':'Tipo de objeto','Magnitude':'Magnitude','Fresnel Highlight':'Brilho Fresnel','Material Color':'Cor do material','Wireframe Color':'Cor do wireframe','useTransmission':'Transmissão','useWireframe':'Wireframe','autoRotate':'Rotação automática','rotationSpeed':'Velocidade de rotação','Transform Gizmo':'Gizmo de transformação','Gizmo Mode':'Modo Gizmo','UCS Gizmo':'Gizmo UCS','materialType':'Tipo de material' },
  ru: { 'Geometry':'Геометрия','Material':'Материал','Lighting':'Освещение','View':'Вид','Math Surface':'Мат. поверхность','6-Axis Controls XYZABC':'Трансформация (6 осей)','Object Type':'Тип объекта','Magnitude':'Величина','Fresnel Highlight':'Блик Френеля','Material Color':'Цвет материала','Wireframe Color':'Цвет каркаса','useTransmission':'Пропускание','useWireframe':'Каркас','autoRotate':'Автоповорот','rotationSpeed':'Скорость вращения','Transform Gizmo':'Гизмо трансформации','Gizmo Mode':'Режим гизмо','UCS Gizmo':'Гизмо UCS','materialType':'Тип материала' },
  zh: { 'Geometry':'几何','Material':'材质','Lighting':'光照','View':'视图','Math Surface':'数学曲面','6-Axis Controls XYZABC':'变换（6轴）','Object Type':'对象类型','Magnitude':'幅度','Fresnel Highlight':'菲涅耳高光','Material Color':'材质颜色','Wireframe Color':'线框颜色','useTransmission':'透射','useWireframe':'线框','autoRotate':'自动旋转','rotationSpeed':'旋转速度','Transform Gizmo':'变换控件','Gizmo Mode':'控件模式','UCS Gizmo':'UCS控件','materialType':'材质类型' },
  ja: { 'Geometry':'ジオメトリ','Material':'マテリアル','Lighting':'ライティング','View':'ビュー','Math Surface':'数式サーフェス','6-Axis Controls XYZABC':'変換（6軸）','Object Type':'オブジェクトタイプ','Magnitude':'振幅','Fresnel Highlight':'フレネル反射','Material Color':'マテリアル色','Wireframe Color':'ワイヤーフレーム色','useTransmission':'透過','useWireframe':'ワイヤーフレーム','autoRotate':'自動回転','rotationSpeed':'回転速度','Transform Gizmo':'変換ギズモ','Gizmo Mode':'ギズモモード','UCS Gizmo':'UCSギズモ','materialType':'マテリアルタイプ' },
  ko: { 'Geometry':'지오메트리','Material':'재질','Lighting':'조명','View':'뷰','Math Surface':'수학 곡면','6-Axis Controls XYZABC':'변환(6축)','Object Type':'오브젝트 유형','Magnitude':'크기','Fresnel Highlight':'프레넬 하이라이트','Material Color':'재질 색상','Wireframe Color':'와이어프레임 색상','useTransmission':'투과','useWireframe':'와이어프레임','autoRotate':'자동 회전','rotationSpeed':'회전 속도','Transform Gizmo':'변환 기즈모','Gizmo Mode':'기즈모 모드','UCS Gizmo':'UCS 기즈모','materialType':'재질 유형' },
  ar: { 'Geometry':'الهندسة','Material':'الخامة','Lighting':'الإضاءة','View':'العرض','Math Surface':'سطح رياضي','6-Axis Controls XYZABC':'تحويل (6 محاور)','Object Type':'نوع الكائن','Magnitude':'المقدار','Fresnel Highlight':'لمعان فرينل','Material Color':'لون الخامة','Wireframe Color':'لون الإطار السلكي','useTransmission':'نفاذية','useWireframe':'إطار سلكي','autoRotate':'تدوير تلقائي','rotationSpeed':'سرعة الدوران','Transform Gizmo':'أداة التحويل','Gizmo Mode':'وضع الأداة','UCS Gizmo':'أداة UCS','materialType':'نوع الخامة' },
  hi: { 'Geometry':'ज्यामिति','Material':'सामग्री','Lighting':'प्रकाश','View':'दृश्य','Math Surface':'गणितीय सतह','6-Axis Controls XYZABC':'रूपांतरण (6-अक्ष)','Object Type':'वस्तु प्रकार','Magnitude':'परिमाण','Fresnel Highlight':'फ्रेनल हाइलाइट','Material Color':'सामग्री रंग','Wireframe Color':'वायरफ्रेम रंग','useTransmission':'पारगमन','useWireframe':'वायरफ्रेम','autoRotate':'स्वतः घूर्णन','rotationSpeed':'घूर्णन गति','Transform Gizmo':'रूपांतरण गिज़्मो','Gizmo Mode':'गिज़्मो मोड','UCS Gizmo':'UCS गिज़्मो','materialType':'सामग्री प्रकार' },
  nl: { 'Geometry':'Geometrie','Material':'Materiaal','Lighting':'Verlichting','View':'Weergave','Math Surface':'Wiskundig oppervlak','6-Axis Controls XYZABC':'Transformatie (6 assen)','Object Type':'Objecttype','Magnitude':'Grootte','Fresnel Highlight':'Fresnel-glans','Material Color':'Materiaalkleur','Wireframe Color':'Wireframe-kleur','useTransmission':'Transmissie','useWireframe':'Wireframe','autoRotate':'Automatisch draaien','rotationSpeed':'Draaisnelheid','Transform Gizmo':'Transformatie-gizmo','Gizmo Mode':'Gizmo-modus','UCS Gizmo':'UCS-gizmo','materialType':'Materiaaltype' },
  pl: { 'Geometry':'Geometria','Material':'Materiał','Lighting':'Oświetlenie','View':'Widok','Math Surface':'Powierzchnia mat.','6-Axis Controls XYZABC':'Transformacja (6 osi)','Object Type':'Typ obiektu','Magnitude':'Wielkość','Fresnel Highlight':'Odblask Fresnela','Material Color':'Kolor materiału','Wireframe Color':'Kolor siatki','useTransmission':'Transmisja','useWireframe':'Siatka','autoRotate':'Autoobrót','rotationSpeed':'Prędkość obrotu','Transform Gizmo':'Gizmo transformacji','Gizmo Mode':'Tryb gizmo','UCS Gizmo':'Gizmo UCS','materialType':'Typ materiału' },
  sv: { 'Geometry':'Geometri','Material':'Material','Lighting':'Belysning','View':'Vy','Math Surface':'Matematisk yta','6-Axis Controls XYZABC':'Transformering (6 axlar)','Object Type':'Objekttyp','Magnitude':'Storlek','Fresnel Highlight':'Fresnel-glans','Material Color':'Materialfärg','Wireframe Color':'Wireframe-färg','useTransmission':'Transmission','useWireframe':'Wireframe','autoRotate':'Auto-rotation','rotationSpeed':'Rotationshastighet','Transform Gizmo':'Transform-gizmo','Gizmo Mode':'Gizmo-läge','UCS Gizmo':'UCS-gizmo','materialType':'Materialtyp' },
  no: { 'Geometry':'Geometri','Material':'Materiale','Lighting':'Belysning','View':'Visning','Math Surface':'Matematisk flate','6-Axis Controls XYZABC':'Transformasjon (6 akser)','Object Type':'Objekttype','Magnitude':'Størrelse','Fresnel Highlight':'Fresnel-glans','Material Color':'Materialfarge','Wireframe Color':'Wireframe-farge','useTransmission':'Transmisjon','useWireframe':'Wireframe','autoRotate':'Auto-rotasjon','rotationSpeed':'Rotasjonshastighet','Transform Gizmo':'Transform-gizmo','Gizmo Mode':'Gizmo-modus','UCS Gizmo':'UCS-gizmo','materialType':'Materialtype' },
  da: { 'Geometry':'Geometri','Material':'Materiale','Lighting':'Belysning','View':'Visning','Math Surface':'Matematisk flade','6-Axis Controls XYZABC':'Transformation (6 akser)','Object Type':'Objekttype','Magnitude':'Størrelse','Fresnel Highlight':'Fresnel-glans','Material Color':'Materialefarve','Wireframe Color':'Wireframe-farve','useTransmission':'Transmission','useWireframe':'Wireframe','autoRotate':'Auto-rotation','rotationSpeed':'Rotationshastighed','Transform Gizmo':'Transform-gizmo','Gizmo Mode':'Gizmo-tilstand','UCS Gizmo':'UCS-gizmo','materialType':'Materialetype' },
  fi: { 'Geometry':'Geometria','Material':'Materiaali','Lighting':'Valaistus','View':'Näkymä','Math Surface':'Matemaattinen pinta','6-Axis Controls XYZABC':'Muunnos (6 akselia)','Object Type':'Objektin tyyppi','Magnitude':'Suuruus','Fresnel Highlight':'Fresnel-korostus','Material Color':'Materiaalin väri','Wireframe Color':'Rautalankaväri','useTransmission':'Läpäisy','useWireframe':'Rautalanka','autoRotate':'Automaattinen pyöritys','rotationSpeed':'Pyörimisnopeus','Transform Gizmo':'Muunnos-gizmo','Gizmo Mode':'Gizmo-tila','UCS Gizmo':'UCS-gizmo','materialType':'Materiaalityyppi' },
  el: { 'Geometry':'Γεωμετρία','Material':'Υλικό','Lighting':'Φωτισμός','View':'Προβολή','Math Surface':'Μαθηματική επιφάνεια','6-Axis Controls XYZABC':'Μετασχηματισμός (6 άξονες)','Object Type':'Τύπος αντικειμένου','Magnitude':'Μέγεθος','Fresnel Highlight':'Λάμψη Fresnel','Material Color':'Χρώμα υλικού','Wireframe Color':'Χρώμα πλέγματος','useTransmission':'Μετάδοση','useWireframe':'Πλέγμα','autoRotate':'Αυτόματη περιστροφή','rotationSpeed':'Ταχύτητα περιστροφής','Transform Gizmo':'Gizmo μετασχηματισμού','Gizmo Mode':'Λειτουργία Gizmo','UCS Gizmo':'UCS Gizmo','materialType':'Τύπος υλικού' }
};

export function getGuiLabel(label, lang = 'en') {
  const m = guiTranslations[lang] || guiTranslations.en;
  return (m && m[label]) || guiTranslations.en[label] || label;
}

// Statistics-panel labels (title, table headers, row labels), translated so the
// stats overlay follows the selected language.
export const statsTranslations = {
  en: { active: 'Active', vertices: 'Vertices', faces: 'Faces', scene: 'Scene', objects: 'objects', fps: 'FPS' },
  tr: { active: 'Aktif', vertices: 'Köşe', faces: 'Yüzey', scene: 'Sahne', objects: 'nesne', fps: 'FPS' },
  es: { active: 'Activo', vertices: 'Vértices', faces: 'Caras', scene: 'Escena', objects: 'objetos', fps: 'FPS' },
  fr: { active: 'Actif', vertices: 'Sommets', faces: 'Faces', scene: 'Scène', objects: 'objets', fps: 'IPS' },
  de: { active: 'Aktiv', vertices: 'Ecken', faces: 'Flächen', scene: 'Szene', objects: 'Objekte', fps: 'FPS' },
  it: { active: 'Attivo', vertices: 'Vertici', faces: 'Facce', scene: 'Scena', objects: 'oggetti', fps: 'FPS' },
  pt: { active: 'Ativo', vertices: 'Vértices', faces: 'Faces', scene: 'Cena', objects: 'objetos', fps: 'FPS' },
  ru: { active: 'Активный', vertices: 'Вершины', faces: 'Грани', scene: 'Сцена', objects: 'объектов', fps: 'FPS' },
  zh: { active: '活动', vertices: '顶点', faces: '面', scene: '场景', objects: '对象', fps: '帧率' },
  ja: { active: 'アクティブ', vertices: '頂点', faces: '面', scene: 'シーン', objects: 'オブジェクト', fps: 'FPS' },
  ko: { active: '활성', vertices: '정점', faces: '면', scene: '장면', objects: '객체', fps: 'FPS' },
  ar: { active: 'نشط', vertices: 'رؤوس', faces: 'أوجه', scene: 'المشهد', objects: 'كائنات', fps: 'إطار/ث' },
  hi: { active: 'सक्रिय', vertices: 'शीर्ष', faces: 'फलक', scene: 'दृश्य', objects: 'वस्तुएँ', fps: 'FPS' },
  nl: { active: 'Actief', vertices: 'Hoekpunten', faces: 'Vlakken', scene: 'Scène', objects: 'objecten', fps: 'FPS' },
  pl: { active: 'Aktywny', vertices: 'Wierzchołki', faces: 'Ściany', scene: 'Scena', objects: 'obiekty', fps: 'FPS' },
  sv: { active: 'Aktiv', vertices: 'Hörn', faces: 'Ytor', scene: 'Scen', objects: 'objekt', fps: 'FPS' },
  no: { active: 'Aktiv', vertices: 'Hjørner', faces: 'Flater', scene: 'Scene', objects: 'objekter', fps: 'FPS' },
  da: { active: 'Aktiv', vertices: 'Hjørner', faces: 'Flader', scene: 'Scene', objects: 'objekter', fps: 'FPS' },
  fi: { active: 'Aktiivinen', vertices: 'Kärjet', faces: 'Pinnat', scene: 'Kohtaus', objects: 'objektia', fps: 'FPS' },
  el: { active: 'Ενεργό', vertices: 'Κορυφές', faces: 'Έδρες', scene: 'Σκηνή', objects: 'αντικείμενα', fps: 'FPS' }
};

export function getStatsLabel(key, lang = 'en') {
  const m = statsTranslations[lang] || statsTranslations.en;
  return (m && m[key]) || statsTranslations.en[key] || key;
}

// --- Shape library: GUI rows (joint weighting / surface), the "Shapes" tab and
// the library panel UI. Values per language follow the key order below.
const GUI_EXTRA_KEYS = ['Joint Weighting', 'Joint Weight', 'Joint Count', 'Joint Sharpness', 'Joint Offset', 'Surface', 'Surface Detail', 'Implicit Resolution', 'Domain Size'];
const GUI_EXTRA = {
  en: ['Joint Weighting', 'Joint Weight', 'Joint Count', 'Joint Sharpness', 'Joint Offset', 'Surface', 'Surface Detail', 'Implicit Resolution', 'Domain Size'],
  tr: ['Eklem Ağırlıklandırma', 'Eklem Ağırlığı', 'Eklem Sayısı', 'Eklem Keskinliği', 'Eklem Kayması', 'Yüzey', 'Yüzey Detayı', 'Örtük Çözünürlük', 'Alan Boyutu'],
  es: ['Ponderación de articulaciones', 'Peso de articulación', 'Número de articulaciones', 'Nitidez de articulación', 'Desfase de articulación', 'Superficie', 'Detalle de superficie', 'Resolución implícita', 'Tamaño del dominio'],
  fr: ['Pondération des articulations', "Poids d'articulation", "Nombre d'articulations", "Netteté d'articulation", "Décalage d'articulation", 'Surface', 'Détail de surface', 'Résolution implicite', 'Taille du domaine'],
  de: ['Gelenkgewichtung', 'Gelenkgewicht', 'Gelenkanzahl', 'Gelenkschärfe', 'Gelenkversatz', 'Fläche', 'Flächendetail', 'Implizite Auflösung', 'Bereichsgröße'],
  it: ['Ponderazione giunti', 'Peso giunto', 'Numero giunti', 'Nitidezza giunto', 'Offset giunto', 'Superficie', 'Dettaglio superficie', 'Risoluzione implicita', 'Dimensione dominio'],
  pt: ['Ponderação de juntas', 'Peso da junta', 'Número de juntas', 'Nitidez da junta', 'Deslocamento da junta', 'Superfície', 'Detalhe da superfície', 'Resolução implícita', 'Tamanho do domínio'],
  ru: ['Вес суставов', 'Вес сустава', 'Число суставов', 'Резкость сустава', 'Смещение суставов', 'Поверхность', 'Детализация поверхности', 'Неявное разрешение', 'Размер области'],
  zh: ['关节权重', '关节权重值', '关节数量', '关节锐度', '关节偏移', '曲面', '曲面细节', '隐式分辨率', '定义域大小'],
  ja: ['ジョイントウェイト', 'ジョイントの重み', 'ジョイント数', 'ジョイントの鋭さ', 'ジョイントのオフセット', 'サーフェス', 'サーフェス詳細', '陰関数の解像度', '領域サイズ'],
  ko: ['관절 가중치', '관절 가중값', '관절 개수', '관절 선명도', '관절 오프셋', '곡면', '곡면 디테일', '음함수 해상도', '영역 크기'],
  ar: ['ترجيح المفاصل', 'وزن المفصل', 'عدد المفاصل', 'حدة المفصل', 'إزاحة المفصل', 'السطح', 'تفاصيل السطح', 'دقة الضمني', 'حجم المجال'],
  hi: ['जोड़ भारांकन', 'जोड़ भार', 'जोड़ संख्या', 'जोड़ तीक्ष्णता', 'जोड़ ऑफ़सेट', 'सतह', 'सतह विवरण', 'अंतर्निहित रेज़ोल्यूशन', 'डोमेन आकार'],
  nl: ['Gewrichtweging', 'Gewrichtgewicht', 'Aantal gewrichten', 'Gewrichtscherpte', 'Gewrichtverschuiving', 'Oppervlak', 'Oppervlakdetail', 'Impliciete resolutie', 'Domeingrootte'],
  pl: ['Ważenie przegubów', 'Waga przegubu', 'Liczba przegubów', 'Ostrość przegubu', 'Przesunięcie przegubów', 'Powierzchnia', 'Szczegółowość powierzchni', 'Rozdzielczość niejawna', 'Rozmiar dziedziny'],
  sv: ['Ledviktning', 'Ledvikt', 'Antal leder', 'Ledskärpa', 'Ledförskjutning', 'Yta', 'Ytdetalj', 'Implicit upplösning', 'Domänstorlek'],
  no: ['Leddvekting', 'Leddvekt', 'Antall ledd', 'Leddskarphet', 'Leddforskyvning', 'Flate', 'Flatedetalj', 'Implisitt oppløsning', 'Domenestørrelse'],
  da: ['Ledvægtning', 'Ledvægt', 'Antal led', 'Ledskarphed', 'Ledforskydning', 'Flade', 'Fladedetalje', 'Implicit opløsning', 'Domænestørrelse'],
  fi: ['Nivelpainotus', 'Nivelen paino', 'Nivelten määrä', 'Nivelen terävyys', 'Nivelen siirtymä', 'Pinta', 'Pinnan tarkkuus', 'Implisiittinen resoluutio', 'Alueen koko'],
  el: ['Στάθμιση αρθρώσεων', 'Βάρος άρθρωσης', 'Πλήθος αρθρώσεων', 'Οξύτητα άρθρωσης', 'Μετατόπιση αρθρώσεων', 'Επιφάνεια', 'Λεπτομέρεια επιφάνειας', 'Πεπλεγμένη ανάλυση', 'Μέγεθος πεδίου']
};
Object.keys(GUI_EXTRA).forEach(lang => {
  guiTranslations[lang] = guiTranslations[lang] || {};
  GUI_EXTRA_KEYS.forEach((k, i) => { guiTranslations[lang][k] = GUI_EXTRA[lang][i]; });
});

const SHAPES_TAB = { en: 'Shapes', tr: 'Şekiller', es: 'Formas', fr: 'Formes', de: 'Formen', it: 'Forme', pt: 'Formas', ru: 'Фигуры', zh: '形状', ja: '形状', ko: '도형', ar: 'الأشكال', hi: 'आकृतियाँ', nl: 'Vormen', pl: 'Kształty', sv: 'Former', no: 'Former', da: 'Former', fi: 'Muodot', el: 'Σχήματα' };
Object.keys(SHAPES_TAB).forEach(lang => { if (tabTranslations[lang]) tabTranslations[lang].Shapes = SHAPES_TAB[lang]; });

const SHAPE_UI_KEYS = ['library', 'functions', 'add', 'apply', 'explicit', 'implicit', 'parametric', 'hint', 'curves'];
const SHAPE_UI = {
  en: ['Shape Library', 'Functions', '+ Add', 'Apply to selected', 'Explicit', 'Implicit', 'Parametric', 'Click a shape to add it to the scene.', 'Knots & Curves'],
  tr: ['Şekil Kütüphanesi', 'Fonksiyonlar', '+ Ekle', 'Seçiliye uygula', 'Açık', 'Örtük', 'Parametrik', 'Sahneye eklemek için bir şekle tıklayın.', 'Düğümler ve Eğriler'],
  es: ['Biblioteca de formas', 'Funciones', '+ Añadir', 'Aplicar a la selección', 'Explícita', 'Implícita', 'Paramétrica', 'Haz clic en una forma para añadirla a la escena.', 'Nudos y curvas'],
  fr: ['Bibliothèque de formes', 'Fonctions', '+ Ajouter', 'Appliquer à la sélection', 'Explicite', 'Implicite', 'Paramétrique', "Cliquez sur une forme pour l'ajouter à la scène.", 'Nœuds et courbes'],
  de: ['Formenbibliothek', 'Funktionen', '+ Hinzufügen', 'Auf Auswahl anwenden', 'Explizit', 'Implizit', 'Parametrisch', 'Klicke auf eine Form, um sie zur Szene hinzuzufügen.', 'Knoten & Kurven'],
  it: ['Libreria di forme', 'Funzioni', '+ Aggiungi', 'Applica alla selezione', 'Esplicita', 'Implicita', 'Parametrica', 'Fai clic su una forma per aggiungerla alla scena.', 'Nodi e curve'],
  pt: ['Biblioteca de formas', 'Funções', '+ Adicionar', 'Aplicar à seleção', 'Explícita', 'Implícita', 'Paramétrica', 'Clique numa forma para adicioná-la à cena.', 'Nós e curvas'],
  ru: ['Библиотека фигур', 'Функции', '+ Добавить', 'Применить к выбранному', 'Явная', 'Неявная', 'Параметрическая', 'Нажмите на фигуру, чтобы добавить её в сцену.', 'Узлы и кривые'],
  zh: ['形状库', '函数', '+ 添加', '应用到所选', '显式', '隐式', '参数化', '点击形状将其添加到场景。', '纽结与曲线'],
  ja: ['形状ライブラリ', '関数', '+ 追加', '選択に適用', '陽関数', '陰関数', 'パラメトリック', '形状をクリックしてシーンに追加します。', '結び目と曲線'],
  ko: ['도형 라이브러리', '함수', '+ 추가', '선택 항목에 적용', '명시적', '음함수', '매개변수', '도형을 클릭하면 장면에 추가됩니다.', '매듭과 곡선'],
  ar: ['مكتبة الأشكال', 'الدوال', '+ إضافة', 'تطبيق على المحدد', 'صريحة', 'ضمنية', 'بارامترية', 'انقر على شكل لإضافته إلى المشهد.', 'العقد والمنحنيات'],
  hi: ['आकृति लाइब्रेरी', 'फ़ंक्शन', '+ जोड़ें', 'चयनित पर लागू करें', 'स्पष्ट', 'अंतर्निहित', 'पैरामीट्रिक', 'किसी आकृति को दृश्य में जोड़ने के लिए उस पर क्लिक करें।', 'गाँठें और वक्र'],
  nl: ['Vormenbibliotheek', 'Functies', '+ Toevoegen', 'Toepassen op selectie', 'Expliciet', 'Impliciet', 'Parametrisch', 'Klik op een vorm om deze aan de scène toe te voegen.', 'Knopen & krommen'],
  pl: ['Biblioteka kształtów', 'Funkcje', '+ Dodaj', 'Zastosuj do zaznaczonego', 'Jawna', 'Niejawna', 'Parametryczna', 'Kliknij kształt, aby dodać go do sceny.', 'Węzły i krzywe'],
  sv: ['Formbibliotek', 'Funktioner', '+ Lägg till', 'Tillämpa på markerat', 'Explicit', 'Implicit', 'Parametrisk', 'Klicka på en form för att lägga till den i scenen.', 'Knutar & kurvor'],
  no: ['Formbibliotek', 'Funksjoner', '+ Legg til', 'Bruk på valgt', 'Eksplisitt', 'Implisitt', 'Parametrisk', 'Klikk på en form for å legge den til i scenen.', 'Knuter og kurver'],
  da: ['Formbibliotek', 'Funktioner', '+ Tilføj', 'Anvend på valgt', 'Eksplicit', 'Implicit', 'Parametrisk', 'Klik på en form for at tilføje den til scenen.', 'Knuder og kurver'],
  fi: ['Muotokirjasto', 'Funktiot', '+ Lisää', 'Käytä valittuun', 'Eksplisiittinen', 'Implisiittinen', 'Parametrinen', 'Lisää muoto näkymään napsauttamalla sitä.', 'Solmut ja käyrät'],
  el: ['Βιβλιοθήκη σχημάτων', 'Συναρτήσεις', '+ Προσθήκη', 'Εφαρμογή στο επιλεγμένο', 'Ρητή', 'Πεπλεγμένη', 'Παραμετρική', 'Κάντε κλικ σε ένα σχήμα για να το προσθέσετε στη σκηνή.', 'Κόμβοι & καμπύλες']
};
// "Objects" group title in the Shapes library (holds the KREATV model).
const MODELS_TITLE = { en: 'Objects', tr: 'Nesneler', es: 'Objetos', fr: 'Objets', de: 'Objekte', it: 'Oggetti', pt: 'Objetos', ru: 'Объекты', zh: '物体', ja: 'オブジェクト', ko: '오브젝트', ar: 'كائنات', hi: 'वस्तुएँ', nl: 'Objecten', pl: 'Obiekty', sv: 'Objekt', no: 'Objekter', da: 'Objekter', fi: 'Objektit', el: 'Αντικείμενα' };

export function getShapeUILabel(key, lang = 'en') {
  if (key === 'models') return MODELS_TITLE[lang] || MODELS_TITLE.en;
  const i = SHAPE_UI_KEYS.indexOf(key);
  if (i < 0) return key;
  return (SHAPE_UI[lang] || SHAPE_UI.en)[i] || SHAPE_UI.en[i];
}

// --- Help panel --------------------------------------------------------------
// One layout for every language (buildHelp) filled from per-language strings,
// so the content stays identical across translations. Tab names come from
// tabTranslations. Order of each list matters (see buildHelp).
//   m  — mouse: orbit, pan, zoom, select, gizmo drag
//   k  — keyboard: W/S, A/D, Q/E, Shift, I/K, J/L, U/O, N/M, G, R
//   p  — panels: Home, Environment, Scene, Shapes, Object, Export, About
//   ph — physics, tv — KREATV, tc — touch, ucs — corner axis gizmo tip
const HELP_TEXT = {
  en: {
    h: 'Quick Help', mouse: 'Mouse', kb: 'Keyboard', panels: 'Panels', phys: 'Physics', touch: 'Touch devices', tips: 'Tips',
    m: ['Left drag: orbit the camera', 'Right drag: pan the scene', 'Wheel: zoom in / out', 'Left click on an object: select it', 'Drag the gizmo arrows / rings: move or rotate the selected object', 'Double-click an object: open its Object panel'],
    k: ['move up / down', 'move left / right', 'move forward / back', 'hold for bigger steps', 'change a', 'change b', 'change p', 'change q', 'gizmo: move mode', 'gizmo: rotate mode'],
    p: ['object list — select or delete objects', 'ground styles (Flat, Granite, Sea, Mathematical surface, Room, Funnel, Clearwater) and advanced controls', 'scene presets, reflection and grid', 'shape library (knots, parametric, implicit, explicit surfaces, KREATV) and custom formulas', 'geometry, material, lighting and transform settings of the selected object', 'export the selected object (GLB, GLTF, OBJ, STL, PLY)', 'project info and language selection'],
    ph: ['The <strong>Physics</strong> button in the top bar turns the physics engine on / off: objects fall, rest on the ground and collide.', 'While physics runs you can still grab the selected object with the gizmo and push the others.'],
    tv: ['Add it from <strong>Shapes → Objects → KREATV</strong>.', 'Its screen plays a video continuously (muted at start).', '<strong>Double-click</strong> the TV screen to turn the sound on / off (double-click the cabinet to open its settings).', 'It is a full physics object: it falls, collides and can be pushed.'],
    tc: ['Use the on-screen gizmo panel: move / rotate with the +/− buttons.', 'Press and hold a button for rapid movement.', 'The navbar, statistics and gizmo panels can be dragged (navbar by its ⋮⋮ grip) and snap magnetically to the screen edges and to each other; ✕ closes a panel into the bottom dock, click its chip to reopen it.'],
    ucs: 'Click an axis of the corner axis gizmo (UCS) to snap the view; Shift+click looks from the opposite side. Double-click the corner axis gizmo to switch the transform gizmo to rotate mode.'
  },
  tr: {
    h: 'Hızlı Yardım', mouse: 'Fare', kb: 'Klavye', panels: 'Paneller', phys: 'Fizik', touch: 'Dokunmatik cihazlar', tips: 'İpuçları',
    m: ['Sol tık + sürükle: kamerayı döndür', 'Sağ tık + sürükle: sahneyi kaydır', 'Tekerlek: yakınlaştır / uzaklaştır', 'Nesneye sol tık: nesneyi seç', 'Gizmo oklarını / halkalarını sürükle: seçili nesneyi taşı veya döndür', 'Nesneye çift tık: Nesne panelini aç'],
    k: ['yukarı / aşağı taşı', 'sola / sağa taşı', 'ileri / geri taşı', 'basılı tutunca daha büyük adım', 'a değerini değiştir', 'b değerini değiştir', 'p değerini değiştir', 'q değerini değiştir', 'gizmo: taşıma modu', 'gizmo: döndürme modu'],
    p: ['nesne listesi — nesneleri seç veya sil', 'zemin stilleri (Düz, Granit, Deniz, Matematiksel yüzey, Oda, Huni, Clearwater) ve gelişmiş kontroller', 'sahne hazır ayarları, yansıma ve ızgara', 'şekil kütüphanesi (düğümler, parametrik, örtük, açık yüzeyler, KREATV) ve özel formüller', 'seçili nesnenin geometri, malzeme, ışık ve dönüşüm ayarları', 'seçili nesneyi dışa aktar (GLB, GLTF, OBJ, STL, PLY)', 'proje bilgisi ve dil seçimi'],
    ph: ['Üst çubuktaki <strong>Fizik</strong> düğmesi fizik motorunu açar / kapatır: nesneler düşer, zeminde durur ve çarpışır.', 'Fizik çalışırken seçili nesneyi gizmo ile tutup diğerlerini itebilirsiniz.'],
    tv: ['<strong>Şekiller → Nesneler → KREATV</strong> ile ekleyin.', 'Ekranında sürekli bir video oynar (başta sessiz).', 'Sesi açmak / kapatmak için TV ekranına <strong>çift tıklayın</strong> (ayarlar için kasaya çift tıklayın).', 'Tam bir fizik nesnesidir: düşer, çarpışır ve itilebilir.'],
    tc: ['Ekrandaki gizmo panelini kullanın: +/− düğmeleriyle taşıyın / döndürün.', 'Hızlı hareket için düğmeyi basılı tutun.', 'Navbar, istatistik ve gizmo panelleri sürüklenebilir (navbar ⋮⋮ tutamağından) ve ekran kenarlarına ve birbirine mıknatısla yapışır; ✕ paneli alttaki rafa kapatır, geri açmak için düğmesine tıklayın.'],
    ucs: 'Görünümü hizalamak için köşedeki eksen gizmosunun (UCS) bir eksenine tıklayın; Shift+tık ters taraftan bakar. Köşedeki eksen gizmosuna çift tıklamak dönüşüm gizmosunu döndürme moduna alır.'
  },
  es: {
    h: 'Ayuda rápida', mouse: 'Ratón', kb: 'Teclado', panels: 'Paneles', phys: 'Física', touch: 'Dispositivos táctiles', tips: 'Consejos',
    m: ['Arrastrar con clic izquierdo: orbitar la cámara', 'Arrastrar con clic derecho: desplazar la escena', 'Rueda: acercar / alejar', 'Clic izquierdo sobre un objeto: seleccionarlo', 'Arrastrar las flechas / anillos del gizmo: mover o rotar el objeto seleccionado', 'Doble clic en un objeto: abrir su panel Objeto'],
    k: ['mover arriba / abajo', 'mover izquierda / derecha', 'mover adelante / atrás', 'mantener para pasos mayores', 'cambiar a', 'cambiar b', 'cambiar p', 'cambiar q', 'gizmo: modo mover', 'gizmo: modo rotar'],
    p: ['lista de objetos — seleccionar o eliminar', 'estilos de suelo (Plano, Granito, Mar, Superficie matemática, Sala, Embudo, Clearwater) y controles avanzados', 'presets de escena, reflejo y cuadrícula', 'biblioteca de formas (nudos, superficies paramétricas, implícitas, explícitas, KREATV) y fórmulas propias', 'geometría, material, iluminación y transformación del objeto seleccionado', 'exportar el objeto seleccionado (GLB, GLTF, OBJ, STL, PLY)', 'información del proyecto y selección de idioma'],
    ph: ['El botón <strong>Física</strong> de la barra superior activa / desactiva el motor de física: los objetos caen, reposan en el suelo y chocan.', 'Con la física activa aún puedes agarrar el objeto seleccionado con el gizmo y empujar a los demás.'],
    tv: ['Añádelo desde <strong>Formas → Objetos → KREATV</strong>.', 'Su pantalla reproduce un vídeo de forma continua (silenciado al inicio).', '<strong>Doble clic</strong> en la pantalla del televisor para activar / desactivar el sonido (doble clic en la carcasa para abrir sus ajustes).', 'Es un objeto físico completo: cae, choca y se puede empujar.'],
    tc: ['Usa el panel gizmo en pantalla: mueve / rota con los botones +/−.', 'Mantén pulsado un botón para un movimiento rápido.', 'La barra de navegación y los paneles de estadísticas y gizmo se pueden arrastrar (la barra por su asa ⋮⋮) y se pegan magnéticamente a los bordes y entre sí; ✕ cierra un panel en el dock inferior, haz clic en su botón para reabrirlo.'],
    ucs: 'Haz clic en un eje del gizmo de ejes de la esquina (UCS) para alinear la vista; Mayús+clic mira desde el lado opuesto. Doble clic en el gizmo de ejes de la esquina para pasar el gizmo de transformación al modo rotar.'
  },
  fr: {
    h: 'Aide rapide', mouse: 'Souris', kb: 'Clavier', panels: 'Panneaux', phys: 'Physique', touch: 'Appareils tactiles', tips: 'Astuces',
    m: ['Glisser clic gauche : orbiter la caméra', 'Glisser clic droit : déplacer la scène', 'Molette : zoomer / dézoomer', "Clic gauche sur un objet : le sélectionner", "Glisser les flèches / anneaux du gizmo : déplacer ou pivoter l'objet sélectionné", 'Double-clic sur un objet : ouvrir son panneau Objet'],
    k: ['monter / descendre', 'gauche / droite', 'avant / arrière', 'maintenir pour des pas plus grands', 'modifier a', 'modifier b', 'modifier p', 'modifier q', 'gizmo : mode déplacement', 'gizmo : mode rotation'],
    p: ['liste des objets — sélectionner ou supprimer', 'styles de sol (Plat, Granit, Mer, Surface mathématique, Pièce, Entonnoir, Clearwater) et contrôles avancés', 'préréglages de scène, réflexion et grille', 'bibliothèque de formes (nœuds, surfaces paramétriques, implicites, explicites, KREATV) et formules personnalisées', "géométrie, matériau, éclairage et transformation de l'objet sélectionné", "exporter l'objet sélectionné (GLB, GLTF, OBJ, STL, PLY)", 'informations sur le projet et choix de la langue'],
    ph: ['Le bouton <strong>Physique</strong> de la barre supérieure active / désactive le moteur physique : les objets tombent, reposent au sol et se heurtent.', "Pendant la simulation, vous pouvez saisir l'objet sélectionné avec le gizmo et pousser les autres."],
    tv: ['Ajoutez-le via <strong>Formes → Objets → KREATV</strong>.', 'Son écran diffuse une vidéo en continu (muette au départ).', "<strong>Double-cliquez</strong> sur l'écran du téléviseur pour activer / couper le son (double-cliquez sur le boîtier pour ouvrir ses réglages).", "C'est un objet physique complet : il tombe, entre en collision et peut être poussé."],
    tc: ["Utilisez le panneau gizmo à l'écran : déplacez / pivotez avec les boutons +/−.", 'Maintenez un bouton appuyé pour un mouvement rapide.', "La barre de navigation et les panneaux statistiques et gizmo se déplacent par glisser (la barre par sa poignée ⋮⋮) et s'aimantent aux bords de l'écran et entre eux ; ✕ range un panneau dans le dock du bas, cliquez sur sa pastille pour le rouvrir."],
    ucs: "Cliquez sur un axe du gizmo d'axes dans le coin (UCS) pour aligner la vue ; Maj+clic regarde depuis le côté opposé. Double-cliquez sur le gizmo d'axes du coin pour passer le gizmo de transformation en mode rotation."
  },
  de: {
    h: 'Schnellhilfe', mouse: 'Maus', kb: 'Tastatur', panels: 'Panels', phys: 'Physik', touch: 'Touch-Geräte', tips: 'Tipps',
    m: ['Linke Maustaste ziehen: Kamera umkreisen', 'Rechte Maustaste ziehen: Szene verschieben', 'Mausrad: vergrößern / verkleinern', 'Linksklick auf ein Objekt: auswählen', 'Gizmo-Pfeile / -Ringe ziehen: ausgewähltes Objekt bewegen oder drehen', 'Doppelklick auf ein Objekt: Objekt-Panel öffnen'],
    k: ['nach oben / unten', 'nach links / rechts', 'nach vorn / hinten', 'halten für größere Schritte', 'a ändern', 'b ändern', 'p ändern', 'q ändern', 'Gizmo: Bewegen-Modus', 'Gizmo: Drehen-Modus'],
    p: ['Objektliste — Objekte auswählen oder löschen', 'Bodenstile (Flach, Granit, Meer, Mathematische Fläche, Raum, Trichter, Clearwater) und erweiterte Steuerung', 'Szenen-Presets, Spiegelung und Raster', 'Formenbibliothek (Knoten, parametrische, implizite, explizite Flächen, KREATV) und eigene Formeln', 'Geometrie, Material, Licht und Transformation des ausgewählten Objekts', 'ausgewähltes Objekt exportieren (GLB, GLTF, OBJ, STL, PLY)', 'Projektinfo und Sprachauswahl'],
    ph: ['Die Schaltfläche <strong>Physik</strong> in der oberen Leiste schaltet die Physik-Engine ein / aus: Objekte fallen, liegen auf dem Boden und stoßen zusammen.', 'Während die Physik läuft, kannst du das ausgewählte Objekt mit dem Gizmo greifen und andere anschieben.'],
    tv: ['Hinzufügen über <strong>Formen → Objekte → KREATV</strong>.', 'Sein Bildschirm spielt ununterbrochen ein Video ab (anfangs stumm).', '<strong>Doppelklick</strong> auf den Bildschirm des Fernsehers schaltet den Ton ein / aus (Doppelklick aufs Gehäuse öffnet seine Einstellungen).', 'Es ist ein vollwertiges Physikobjekt: Es fällt, kollidiert und kann geschoben werden.'],
    tc: ['Nutze das Gizmo-Panel auf dem Bildschirm: mit +/− bewegen / drehen.', 'Taste gedrückt halten für schnelle Bewegung.', 'Navigationsleiste, Statistik- und Gizmo-Panel lassen sich ziehen (die Leiste am Griff ⋮⋮) und rasten magnetisch an den Bildschirmrändern und aneinander ein; ✕ legt ein Panel ins Dock unten, ein Klick auf seinen Chip öffnet es wieder.'],
    ucs: 'Klicke auf eine Achse des Achsen-Gizmos in der Ecke (UCS), um die Ansicht auszurichten; Umschalt+Klick blickt von der Gegenseite. Doppelklick auf das Achsen-Gizmo in der Ecke schaltet das Transformations-Gizmo in den Drehen-Modus.'
  },
  it: {
    h: 'Guida rapida', mouse: 'Mouse', kb: 'Tastiera', panels: 'Pannelli', phys: 'Fisica', touch: 'Dispositivi touch', tips: 'Suggerimenti',
    m: ['Trascina con il tasto sinistro: orbita la telecamera', 'Trascina con il tasto destro: sposta la scena', 'Rotella: ingrandisci / riduci', 'Clic sinistro su un oggetto: selezionalo', "Trascina frecce / anelli del gizmo: sposta o ruota l'oggetto selezionato", 'Doppio clic su un oggetto: apri il pannello Oggetto'],
    k: ['su / giù', 'sinistra / destra', 'avanti / indietro', 'tieni premuto per passi più grandi', 'modifica a', 'modifica b', 'modifica p', 'modifica q', 'gizmo: modalità sposta', 'gizmo: modalità ruota'],
    p: ['elenco oggetti — seleziona o elimina', 'stili del terreno (Piano, Granito, Mare, Superficie matematica, Stanza, Imbuto, Clearwater) e controlli avanzati', 'preset di scena, riflesso e griglia', 'libreria di forme (nodi, superfici parametriche, implicite, esplicite, KREATV) e formule personalizzate', "geometria, materiale, luci e trasformazione dell'oggetto selezionato", "esporta l'oggetto selezionato (GLB, GLTF, OBJ, STL, PLY)", 'informazioni sul progetto e scelta della lingua'],
    ph: ['Il pulsante <strong>Fisica</strong> nella barra superiore attiva / disattiva il motore fisico: gli oggetti cadono, poggiano a terra e si urtano.', "Con la fisica attiva puoi ancora afferrare l'oggetto selezionato con il gizmo e spingere gli altri."],
    tv: ['Aggiungilo da <strong>Forme → Oggetti → KREATV</strong>.', 'Il suo schermo riproduce un video in continuo (inizialmente muto).', "<strong>Doppio clic</strong> sullo schermo del televisore per attivare / disattivare l'audio (doppio clic sulla cornice per aprirne le impostazioni).", 'È un oggetto fisico completo: cade, urta e può essere spinto.'],
    tc: ['Usa il pannello gizmo sullo schermo: sposta / ruota con i pulsanti +/−.', 'Tieni premuto un pulsante per un movimento rapido.', 'La barra di navigazione e i pannelli statistiche e gizmo si trascinano (la barra dalla maniglia ⋮⋮) e si agganciano magneticamente ai bordi e tra loro; ✕ chiude un pannello nel dock in basso, clicca sul suo pulsante per riaprirlo.'],
    ucs: "Fai clic su un asse del gizmo degli assi nell'angolo (UCS) per allineare la vista; Maiusc+clic guarda dal lato opposto. Doppio clic sul gizmo degli assi nell'angolo per passare il gizmo di trasformazione alla modalità ruota."
  },
  pt: {
    h: 'Ajuda rápida', mouse: 'Mouse', kb: 'Teclado', panels: 'Painéis', phys: 'Física', touch: 'Dispositivos touch', tips: 'Dicas',
    m: ['Arrastar com botão esquerdo: orbitar a câmera', 'Arrastar com botão direito: deslocar a cena', 'Roda: aproximar / afastar', 'Clique esquerdo num objeto: selecioná-lo', 'Arrastar as setas / anéis do gizmo: mover ou girar o objeto selecionado', 'Clique duplo num objeto: abrir o painel Objeto'],
    k: ['mover para cima / baixo', 'mover para esquerda / direita', 'mover para frente / trás', 'segure para passos maiores', 'alterar a', 'alterar b', 'alterar p', 'alterar q', 'gizmo: modo mover', 'gizmo: modo girar'],
    p: ['lista de objetos — selecionar ou excluir', 'estilos de piso (Plano, Granito, Mar, Superfície matemática, Sala, Funil, Clearwater) e controles avançados', 'presets de cena, reflexo e grade', 'biblioteca de formas (nós, superfícies paramétricas, implícitas, explícitas, KREATV) e fórmulas próprias', 'geometria, material, iluminação e transformação do objeto selecionado', 'exportar o objeto selecionado (GLB, GLTF, OBJ, STL, PLY)', 'informações do projeto e seleção de idioma'],
    ph: ['O botão <strong>Física</strong> na barra superior liga / desliga o motor de física: os objetos caem, repousam no chão e colidem.', 'Com a física ativa você ainda pode pegar o objeto selecionado com o gizmo e empurrar os outros.'],
    tv: ['Adicione em <strong>Formas → Objetos → KREATV</strong>.', 'A tela reproduz um vídeo continuamente (sem som no início).', '<strong>Clique duas vezes</strong> na tela da TV para ligar / desligar o som (clique duas vezes na moldura para abrir as configurações).', 'É um objeto físico completo: cai, colide e pode ser empurrado.'],
    tc: ['Use o painel gizmo na tela: mova / gire com os botões +/−.', 'Mantenha um botão pressionado para movimento rápido.', 'A barra de navegação e os painéis de estatísticas e gizmo podem ser arrastados (a barra pela alça ⋮⋮) e grudam magneticamente nas bordas e entre si; ✕ fecha um painel no dock inferior, clique no botão dele para reabrir.'],
    ucs: 'Clique num eixo do gizmo de eixos do canto (UCS) para alinhar a vista; Shift+clique olha do lado oposto. Clique duplo no gizmo de eixos do canto para pôr o gizmo de transformação no modo girar.'
  },
  ru: {
    h: 'Краткая справка', mouse: 'Мышь', kb: 'Клавиатура', panels: 'Панели', phys: 'Физика', touch: 'Сенсорные устройства', tips: 'Советы',
    m: ['Левая кнопка + перетаскивание: вращение камеры', 'Правая кнопка + перетаскивание: сдвиг сцены', 'Колесо: приблизить / отдалить', 'Левый клик по объекту: выбрать его', 'Перетаскивание стрелок / колец гизмо: перемещение или вращение выбранного объекта', 'Двойной клик по объекту: открыть панель «Объект»'],
    k: ['вверх / вниз', 'влево / вправо', 'вперёд / назад', 'удерживать для крупного шага', 'изменить a', 'изменить b', 'изменить p', 'изменить q', 'гизмо: режим перемещения', 'гизмо: режим вращения'],
    p: ['список объектов — выбор и удаление', 'стили пола (Плоский, Гранит, Море, Мат. поверхность, Комната, Воронка, Clearwater) и расширенные настройки', 'пресеты сцены, отражение и сетка', 'библиотека фигур (узлы, параметрические, неявные, явные поверхности, KREATV) и свои формулы', 'геометрия, материал, свет и трансформация выбранного объекта', 'экспорт выбранного объекта (GLB, GLTF, OBJ, STL, PLY)', 'о проекте и выбор языка'],
    ph: ['Кнопка <strong>Физика</strong> на верхней панели включает / выключает физический движок: объекты падают, лежат на земле и сталкиваются.', 'Во время симуляции можно схватить выбранный объект гизмо и толкать остальные.'],
    tv: ['Добавьте через <strong>Фигуры → Объекты → KREATV</strong>.', 'На его экране непрерывно идёт видео (сначала без звука).', '<strong>Двойной клик</strong> по экрану телевизора включает / выключает звук (двойной клик по корпусу открывает настройки).', 'Это полноценный физический объект: падает, сталкивается, его можно толкать.'],
    tc: ['Используйте экранную панель гизмо: перемещайте / вращайте кнопками +/−.', 'Удерживайте кнопку для быстрого движения.', 'Панель навигации, статистика и гизмо перетаскиваются (панель — за ручку ⋮⋮) и магнитно прилипают к краям экрана и друг к другу; ✕ сворачивает панель в нижний док, нажмите на её значок, чтобы открыть снова.'],
    ucs: 'Нажмите на ось угловой гизмо осей (UCS), чтобы выровнять вид; Shift+клик — взгляд с противоположной стороны. Двойной клик по угловой гизмо осей переключает гизмо трансформации в режим вращения.'
  },
  zh: {
    h: '快速帮助', mouse: '鼠标', kb: '键盘', panels: '面板', phys: '物理', touch: '触摸设备', tips: '提示',
    m: ['左键拖动：环绕相机', '右键拖动：平移场景', '滚轮：放大 / 缩小', '左键单击对象：选中它', '拖动控件箭头 / 圆环：移动或旋转所选对象', '双击对象：打开其对象面板'],
    k: ['上 / 下移动', '左 / 右移动', '前 / 后移动', '按住以增大步长', '调整 a', '调整 b', '调整 p', '调整 q', '控件：移动模式', '控件：旋转模式'],
    p: ['对象列表 — 选择或删除对象', '地面样式（平面、花岗岩、海面、数学曲面、房间、漏斗、Clearwater）和高级控制', '场景预设、反射和网格', '形状库（纽结、参数、隐式、显式曲面、KREATV）和自定义公式', '所选对象的几何、材质、光照和变换设置', '导出所选对象（GLB、GLTF、OBJ、STL、PLY）', '项目信息和语言选择'],
    ph: ['顶部栏的<strong>物理</strong>按钮可开启 / 关闭物理引擎：对象会下落、停在地面并相互碰撞。', '物理运行时仍可用控件抓住所选对象并推动其他对象。'],
    tv: ['通过<strong>形状 → 物体 → KREATV</strong>添加。', '屏幕会持续播放视频（初始静音）。', '<strong>双击</strong>电视屏幕可开启 / 关闭声音（双击机身打开其设置）。', '它是完整的物理对象：会下落、碰撞，也可被推动。'],
    tc: ['使用屏幕上的控件面板：用 +/− 按钮移动 / 旋转。', '按住按钮可快速移动。', '导航栏、统计和控件面板可拖动（导航栏通过 ⋮⋮ 手柄），并会磁性吸附到屏幕边缘和彼此；✕ 将面板收起到底部停靠栏，点击其按钮即可重新打开。'],
    ucs: '点击角落坐标轴控件（UCS）的某个轴以对齐视图；Shift+单击从反方向观看。双击角落坐标轴控件，可将变换控件切换为旋转模式。'
  },
  ja: {
    h: 'クイックヘルプ', mouse: 'マウス', kb: 'キーボード', panels: 'パネル', phys: '物理', touch: 'タッチデバイス', tips: 'ヒント',
    m: ['左ドラッグ：カメラを周回', '右ドラッグ：シーンをパン', 'ホイール：ズームイン / アウト', 'オブジェクトを左クリック：選択', 'ギズモの矢印 / リングをドラッグ：選択オブジェクトを移動・回転', 'オブジェクトをダブルクリック：オブジェクトパネルを開く'],
    k: ['上 / 下へ移動', '左 / 右へ移動', '前 / 後へ移動', '押しながらで大きなステップ', 'a を変更', 'b を変更', 'p を変更', 'q を変更', 'ギズモ：移動モード', 'ギズモ：回転モード'],
    p: ['オブジェクト一覧 — 選択・削除', '地面スタイル（フラット、御影石、海、数式サーフェス、部屋、じょうご、Clearwater）と詳細設定', 'シーンプリセット、反射、グリッド', '形状ライブラリ（結び目、パラメトリック・陰関数・陽関数サーフェス、KREATV）とカスタム数式', '選択オブジェクトのジオメトリ、マテリアル、ライト、変換設定', '選択オブジェクトをエクスポート（GLB、GLTF、OBJ、STL、PLY）', 'プロジェクト情報と言語選択'],
    ph: ['上部バーの<strong>物理</strong>ボタンで物理エンジンをオン / オフ：オブジェクトが落下し、地面に止まり、衝突します。', '物理の実行中もギズモで選択オブジェクトをつかみ、他を押せます。'],
    tv: ['<strong>形状 → オブジェクト → KREATV</strong> から追加します。', '画面では動画が連続再生されます（最初はミュート）。', 'テレビの画面を<strong>ダブルクリック</strong>すると音声のオン / オフを切り替えます（本体をダブルクリックすると設定を開きます）。', '完全な物理オブジェクトです：落下・衝突し、押すこともできます。'],
    tc: ['画面上のギズモパネルを使用：+/− ボタンで移動 / 回転。', 'ボタンを長押しすると素早く動きます。', 'ナビバー、統計、ギズモの各パネルはドラッグでき（ナビバーは ⋮⋮ ハンドル）、画面端や互いにマグネットのように吸着します。✕ で下部のドックにしまい、そのボタンをクリックすると再表示します。'],
    ucs: '隅の座標軸ギズモ（UCS）の軸をクリックすると視点を合わせます。Shift+クリックで反対側から見ます。隅の座標軸ギズモをダブルクリックすると、変換ギズモが回転モードになります。'
  },
  ko: {
    h: '빠른 도움말', mouse: '마우스', kb: '키보드', panels: '패널', phys: '물리', touch: '터치 기기', tips: '팁',
    m: ['왼쪽 드래그: 카메라 궤도 회전', '오른쪽 드래그: 장면 이동', '휠: 확대 / 축소', '객체 왼쪽 클릭: 선택', '기즈모 화살표 / 링 드래그: 선택한 객체 이동 또는 회전', '객체 더블클릭: 객체 패널 열기'],
    k: ['위 / 아래 이동', '왼쪽 / 오른쪽 이동', '앞 / 뒤 이동', '누르고 있으면 큰 단계', 'a 변경', 'b 변경', 'p 변경', 'q 변경', '기즈모: 이동 모드', '기즈모: 회전 모드'],
    p: ['객체 목록 — 선택 또는 삭제', '바닥 스타일(평면, 화강암, 바다, 수학 곡면, 방, 깔때기, Clearwater)과 고급 설정', '장면 프리셋, 반사 및 그리드', '도형 라이브러리(매듭, 매개변수·음함수·명시적 곡면, KREATV)와 사용자 수식', '선택한 객체의 지오메트리, 재질, 조명, 변환 설정', '선택한 객체 내보내기(GLB, GLTF, OBJ, STL, PLY)', '프로젝트 정보 및 언어 선택'],
    ph: ['상단 바의 <strong>물리</strong> 버튼으로 물리 엔진을 켜고 끕니다: 객체가 떨어지고 바닥에 놓이며 서로 충돌합니다.', '물리가 실행 중이어도 기즈모로 선택한 객체를 잡아 다른 객체를 밀 수 있습니다.'],
    tv: ['<strong>도형 → 오브젝트 → KREATV</strong>에서 추가합니다.', '화면에서 동영상이 계속 재생됩니다(처음에는 음소거).', 'TV 화면을 <strong>더블클릭</strong>하면 소리를 켜고 끕니다(본체를 더블클릭하면 설정이 열립니다).', '완전한 물리 객체입니다: 떨어지고, 충돌하고, 밀 수 있습니다.'],
    tc: ['화면의 기즈모 패널 사용: +/− 버튼으로 이동 / 회전.', '버튼을 길게 누르면 빠르게 이동합니다.', '내비게이션 바, 통계, 기즈모 패널은 드래그할 수 있고(내비게이션 바는 ⋮⋮ 손잡이) 화면 가장자리와 서로에게 자석처럼 붙습니다. ✕를 누르면 하단 독으로 들어가며, 해당 버튼을 클릭하면 다시 열립니다.'],
    ucs: '모서리 축 기즈모(UCS)의 축을 클릭하면 뷰가 정렬됩니다. Shift+클릭은 반대쪽에서 봅니다. 모서리 축 기즈모를 더블클릭하면 변환 기즈모가 회전 모드로 바뀝니다.'
  },
  ar: {
    h: 'مساعدة سريعة', mouse: 'الفأرة', kb: 'لوحة المفاتيح', panels: 'اللوحات', phys: 'الفيزياء', touch: 'الأجهزة اللمسية', tips: 'نصائح',
    m: ['السحب بالزر الأيسر: تدوير الكاميرا حول المشهد', 'السحب بالزر الأيمن: تحريك المشهد', 'العجلة: تكبير / تصغير', 'النقر الأيسر على كائن: تحديده', 'سحب أسهم / حلقات الأداة: تحريك الكائن المحدد أو تدويره', 'النقر المزدوج على كائن: فتح لوحة الكائن الخاصة به'],
    k: ['تحريك لأعلى / لأسفل', 'تحريك لليسار / لليمين', 'تحريك للأمام / للخلف', 'اضغط باستمرار لخطوات أكبر', 'تغيير a', 'تغيير b', 'تغيير p', 'تغيير q', 'الأداة: وضع التحريك', 'الأداة: وضع التدوير'],
    p: ['قائمة الكائنات — تحديد أو حذف', 'أنماط الأرضية (مسطح، جرانيت، بحر، سطح رياضي، غرفة، قمع، Clearwater) والتحكم المتقدم', 'إعدادات المشهد المسبقة والانعكاس والشبكة', 'مكتبة الأشكال (عقد، أسطح بارامترية وضمنية وصريحة، KREATV) والصيغ المخصصة', 'إعدادات الهندسة والخامة والإضاءة والتحويل للكائن المحدد', 'تصدير الكائن المحدد (GLB، GLTF، OBJ، STL، PLY)', 'معلومات المشروع واختيار اللغة'],
    ph: ['زر <strong>الفيزياء</strong> في الشريط العلوي يشغّل / يوقف محرك الفيزياء: تسقط الكائنات وتستقر على الأرض وتتصادم.', 'أثناء تشغيل الفيزياء يمكنك الإمساك بالكائن المحدد بالأداة ودفع الكائنات الأخرى.'],
    tv: ['أضفه من <strong>الأشكال ← كائنات ← KREATV</strong>.', 'تعرض شاشته مقطع فيديو باستمرار (مكتوم الصوت في البداية).', '<strong>انقر نقرًا مزدوجًا</strong> على شاشة التلفاز لتشغيل / إيقاف الصوت (انقر نقرًا مزدوجًا على الهيكل لفتح إعداداته).', 'إنه كائن فيزيائي كامل: يسقط ويتصادم ويمكن دفعه.'],
    tc: ['استخدم لوحة الأداة على الشاشة: حرّك / دوّر بأزرار +/−.', 'اضغط مطولًا على الزر لحركة سريعة.', 'يمكن سحب شريط التنقل ولوحتي الإحصائيات والأداة (الشريط من مقبضه ⋮⋮) وتلتصق مغناطيسيًا بحواف الشاشة وببعضها؛ ✕ يطوي اللوحة في الشريط السفلي، وانقر على زرها لإعادة فتحها.'],
    ucs: 'انقر على محور في أداة المحاور بالزاوية (UCS) لمحاذاة العرض؛ Shift+نقر للنظر من الجهة المقابلة. النقر المزدوج على أداة المحاور في الزاوية يحوّل أداة التحويل إلى وضع التدوير.'
  },
  hi: {
    h: 'त्वरित सहायता', mouse: 'माउस', kb: 'कीबोर्ड', panels: 'पैनल', phys: 'भौतिकी', touch: 'टच डिवाइस', tips: 'सुझाव',
    m: ['बायाँ बटन खींचें: कैमरा घुमाएँ', 'दायाँ बटन खींचें: दृश्य खिसकाएँ', 'व्हील: ज़ूम इन / आउट', 'वस्तु पर बायाँ क्लिक: उसे चुनें', 'गिज़्मो के तीर / छल्ले खींचें: चुनी गई वस्तु को हिलाएँ या घुमाएँ', 'वस्तु पर डबल-क्लिक: उसका वस्तु पैनल खोलें'],
    k: ['ऊपर / नीचे', 'बाएँ / दाएँ', 'आगे / पीछे', 'बड़े कदम के लिए दबाए रखें', 'a बदलें', 'b बदलें', 'p बदलें', 'q बदलें', 'गिज़्मो: मूव मोड', 'गिज़्मो: रोटेट मोड'],
    p: ['वस्तु सूची — चुनें या हटाएँ', 'फ़र्श शैलियाँ (समतल, ग्रेनाइट, समुद्र, गणितीय सतह, कमरा, कीप, Clearwater) और उन्नत नियंत्रण', 'दृश्य प्रीसेट, प्रतिबिंब और ग्रिड', 'आकृति लाइब्रेरी (गाँठें, पैरामीट्रिक, अंतर्निहित, स्पष्ट सतहें, KREATV) और अपने सूत्र', 'चुनी गई वस्तु की ज्यामिति, सामग्री, प्रकाश और रूपांतरण सेटिंग', 'चुनी गई वस्तु निर्यात करें (GLB, GLTF, OBJ, STL, PLY)', 'परियोजना जानकारी और भाषा चयन'],
    ph: ['ऊपरी पट्टी का <strong>भौतिकी</strong> बटन भौतिकी इंजन चालू / बंद करता है: वस्तुएँ गिरती हैं, ज़मीन पर रुकती हैं और टकराती हैं।', 'भौतिकी चलते समय भी आप गिज़्मो से चुनी गई वस्तु पकड़कर दूसरों को धकेल सकते हैं।'],
    tv: ['<strong>आकृतियाँ → वस्तुएँ → KREATV</strong> से जोड़ें।', 'इसकी स्क्रीन पर लगातार एक वीडियो चलता है (शुरू में म्यूट)।', 'आवाज़ चालू / बंद करने के लिए टीवी स्क्रीन पर <strong>डबल-क्लिक</strong> करें (सेटिंग खोलने के लिए बॉडी पर डबल-क्लिक करें)।', 'यह पूर्ण भौतिकी वस्तु है: गिरती है, टकराती है और धकेली जा सकती है।'],
    tc: ['स्क्रीन पर गिज़्मो पैनल का उपयोग करें: +/− बटनों से हिलाएँ / घुमाएँ।', 'तेज़ गति के लिए बटन दबाए रखें।', 'नेवबार, आँकड़े और गिज़्मो पैनल खींचे जा सकते हैं (नेवबार अपने ⋮⋮ हैंडल से) और स्क्रीन के किनारों व एक-दूसरे से चुंबक की तरह चिपकते हैं; ✕ पैनल को नीचे के डॉक में बंद करता है, फिर खोलने के लिए उसके बटन पर क्लिक करें।'],
    ucs: 'दृश्य संरेखित करने के लिए कोने के अक्ष गिज़्मो (UCS) के किसी अक्ष पर क्लिक करें; Shift+क्लिक विपरीत दिशा से दिखाता है। कोने के अक्ष गिज़्मो पर डबल-क्लिक करने से रूपांतरण गिज़्मो रोटेट मोड में चला जाता है।'
  },
  nl: {
    h: 'Snelle hulp', mouse: 'Muis', kb: 'Toetsenbord', panels: 'Panelen', phys: 'Fysica', touch: 'Touchapparaten', tips: 'Tips',
    m: ['Linksklik slepen: camera rond laten draaien', 'Rechtsklik slepen: scène verschuiven', 'Wiel: in- / uitzoomen', 'Linksklik op een object: selecteren', 'Gizmo-pijlen / -ringen slepen: geselecteerd object verplaatsen of draaien', 'Dubbelklik op een object: open het Object-paneel'],
    k: ['omhoog / omlaag', 'links / rechts', 'vooruit / achteruit', 'ingedrukt houden voor grotere stappen', 'a wijzigen', 'b wijzigen', 'p wijzigen', 'q wijzigen', 'gizmo: verplaatsmodus', 'gizmo: draaimodus'],
    p: ['objectlijst — selecteren of verwijderen', 'vloerstijlen (Vlak, Graniet, Zee, Wiskundig oppervlak, Kamer, Trechter, Clearwater) en geavanceerde bediening', 'scènepresets, reflectie en raster', 'vormenbibliotheek (knopen, parametrische, impliciete, expliciete oppervlakken, KREATV) en eigen formules', 'geometrie, materiaal, verlichting en transformatie van het geselecteerde object', 'geselecteerd object exporteren (GLB, GLTF, OBJ, STL, PLY)', 'projectinfo en taalkeuze'],
    ph: ['De knop <strong>Fysica</strong> in de bovenbalk zet de fysica-engine aan / uit: objecten vallen, liggen op de grond en botsen.', 'Terwijl fysica loopt kun je het geselecteerde object nog met de gizmo pakken en andere wegduwen.'],
    tv: ['Toevoegen via <strong>Vormen → Objecten → KREATV</strong>.', 'Het scherm speelt doorlopend een video af (eerst gedempt).', '<strong>Dubbelklik</strong> op het tv-scherm om het geluid aan / uit te zetten (dubbelklik op de behuizing voor de instellingen).', 'Het is een volwaardig fysica-object: het valt, botst en kan worden geduwd.'],
    tc: ['Gebruik het gizmo-paneel op het scherm: verplaats / draai met de +/−-knoppen.', 'Houd een knop ingedrukt voor snelle beweging.', 'De navigatiebalk en de statistiek- en gizmopanelen zijn te verslepen (de balk aan zijn greep ⋮⋮) en klikken magnetisch vast aan de schermranden en aan elkaar; ✕ zet een paneel in het dock onderaan, klik op de knop om het weer te openen.'],
    ucs: 'Klik op een as van de assen-gizmo in de hoek (UCS) om de weergave uit te lijnen; Shift+klik kijkt vanaf de andere kant. Dubbelklik op de assen-gizmo in de hoek om de transformatie-gizmo naar draaimodus te zetten.'
  },
  pl: {
    h: 'Szybka pomoc', mouse: 'Mysz', kb: 'Klawiatura', panels: 'Panele', phys: 'Fizyka', touch: 'Urządzenia dotykowe', tips: 'Wskazówki',
    m: ['Przeciąganie lewym: obrót kamery', 'Przeciąganie prawym: przesuwanie sceny', 'Kółko: przybliż / oddal', 'Lewy klik na obiekcie: zaznacz go', 'Przeciąganie strzałek / pierścieni gizmo: przesuń lub obróć zaznaczony obiekt', 'Dwuklik na obiekcie: otwórz jego panel Obiekt'],
    k: ['w górę / w dół', 'w lewo / w prawo', 'do przodu / do tyłu', 'przytrzymaj dla większych kroków', 'zmień a', 'zmień b', 'zmień p', 'zmień q', 'gizmo: tryb przesuwania', 'gizmo: tryb obrotu'],
    p: ['lista obiektów — zaznacz lub usuń', 'style podłoża (Płaskie, Granit, Morze, Powierzchnia matematyczna, Pokój, Lejek, Clearwater) i zaawansowane sterowanie', 'presety sceny, odbicie i siatka', 'biblioteka kształtów (węzły, powierzchnie parametryczne, niejawne, jawne, KREATV) i własne wzory', 'geometria, materiał, oświetlenie i transformacja zaznaczonego obiektu', 'eksport zaznaczonego obiektu (GLB, GLTF, OBJ, STL, PLY)', 'informacje o projekcie i wybór języka'],
    ph: ['Przycisk <strong>Fizyka</strong> na górnym pasku włącza / wyłącza silnik fizyki: obiekty spadają, leżą na podłożu i zderzają się.', 'Gdy fizyka działa, nadal możesz chwycić zaznaczony obiekt gizmo i popychać inne.'],
    tv: ['Dodaj przez <strong>Kształty → Obiekty → KREATV</strong>.', 'Na ekranie bez przerwy odtwarzany jest film (na początku wyciszony).', '<strong>Kliknij dwukrotnie</strong> ekran telewizora, aby włączyć / wyłączyć dźwięk (dwuklik na obudowie otwiera ustawienia).', 'To pełnoprawny obiekt fizyczny: spada, zderza się i można go pchać.'],
    tc: ['Użyj ekranowego panelu gizmo: przesuwaj / obracaj przyciskami +/−.', 'Przytrzymaj przycisk dla szybkiego ruchu.', 'Pasek nawigacji oraz panele statystyk i gizmo można przeciągać (pasek za uchwyt ⋮⋮) i przyciągają się magnetycznie do krawędzi ekranu i do siebie; ✕ chowa panel do doku na dole, kliknij jego przycisk, aby go ponownie otworzyć.'],
    ucs: 'Kliknij oś gizmo osi w rogu (UCS), aby wyrównać widok; Shift+klik patrzy z przeciwnej strony. Dwuklik na gizmo osi w rogu przełącza gizmo transformacji w tryb obrotu.'
  },
  sv: {
    h: 'Snabbhjälp', mouse: 'Mus', kb: 'Tangentbord', panels: 'Paneler', phys: 'Fysik', touch: 'Pekenheter', tips: 'Tips',
    m: ['Dra med vänster: kretsa kameran', 'Dra med höger: panorera scenen', 'Hjul: zooma in / ut', 'Vänsterklick på ett objekt: markera det', 'Dra gizmons pilar / ringar: flytta eller rotera markerat objekt', 'Dubbelklicka på ett objekt: öppna dess Objekt-panel'],
    k: ['upp / ner', 'vänster / höger', 'framåt / bakåt', 'håll för större steg', 'ändra a', 'ändra b', 'ändra p', 'ändra q', 'gizmo: flyttläge', 'gizmo: rotationsläge'],
    p: ['objektlista — markera eller ta bort', 'golvstilar (Plan, Granit, Hav, Matematisk yta, Rum, Tratt, Clearwater) och avancerade kontroller', 'scenförval, reflektion och rutnät', 'formbibliotek (knutar, parametriska, implicita, explicita ytor, KREATV) och egna formler', 'geometri, material, ljus och transformering för markerat objekt', 'exportera markerat objekt (GLB, GLTF, OBJ, STL, PLY)', 'projektinfo och språkval'],
    ph: ['Knappen <strong>Fysik</strong> i toppfältet slår på / av fysikmotorn: objekt faller, vilar på marken och kolliderar.', 'Medan fysiken körs kan du fortfarande greppa markerat objekt med gizmon och knuffa andra.'],
    tv: ['Lägg till via <strong>Former → Objekt → KREATV</strong>.', 'Skärmen spelar en video kontinuerligt (ljudlös från början).', '<strong>Dubbelklicka</strong> på tv-skärmen för att slå på / av ljudet (dubbelklicka på höljet för inställningar).', 'Det är ett fullständigt fysikobjekt: det faller, kolliderar och kan knuffas.'],
    tc: ['Använd gizmopanelen på skärmen: flytta / rotera med +/−-knapparna.', 'Håll in en knapp för snabb rörelse.', 'Navigeringsfältet och statistik- och gizmopanelerna kan dras (fältet i greppet ⋮⋮) och fäster magnetiskt mot skärmkanterna och varandra; ✕ stänger en panel till dockan längst ner, klicka på dess knapp för att öppna den igen.'],
    ucs: 'Klicka på en axel i hörnets axelgizmo (UCS) för att rikta vyn; Skift+klick tittar från motsatt sida. Dubbelklicka på hörnets axelgizmo för att växla transform-gizmon till rotationsläge.'
  },
  no: {
    h: 'Hurtighjelp', mouse: 'Mus', kb: 'Tastatur', panels: 'Paneler', phys: 'Fysikk', touch: 'Berøringsenheter', tips: 'Tips',
    m: ['Dra med venstre: kretse kameraet', 'Dra med høyre: panorere scenen', 'Hjul: zoom inn / ut', 'Venstreklikk på et objekt: velg det', 'Dra gizmoens piler / ringer: flytt eller roter valgt objekt', 'Dobbeltklikk på et objekt: åpne Objekt-panelet'],
    k: ['opp / ned', 'venstre / høyre', 'fremover / bakover', 'hold for større steg', 'endre a', 'endre b', 'endre p', 'endre q', 'gizmo: flyttemodus', 'gizmo: rotasjonsmodus'],
    p: ['objektliste — velg eller slett', 'gulvstiler (Flat, Granitt, Hav, Matematisk flate, Rom, Trakt, Clearwater) og avanserte kontroller', 'scenevalg, refleksjon og rutenett', 'formbibliotek (knuter, parametriske, implisitte, eksplisitte flater, KREATV) og egne formler', 'geometri, materiale, lys og transformasjon for valgt objekt', 'eksporter valgt objekt (GLB, GLTF, OBJ, STL, PLY)', 'prosjektinfo og språkvalg'],
    ph: ['Knappen <strong>Fysikk</strong> i topplinjen slår fysikkmotoren av / på: objekter faller, hviler på bakken og kolliderer.', 'Mens fysikken kjører kan du fortsatt gripe valgt objekt med gizmoen og dytte andre.'],
    tv: ['Legg til via <strong>Former → Objekter → KREATV</strong>.', 'Skjermen spiller en video kontinuerlig (uten lyd i starten).', '<strong>Dobbeltklikk</strong> på TV-skjermen for å slå lyden av / på (dobbeltklikk på kabinettet for innstillinger).', 'Det er et fullverdig fysikkobjekt: det faller, kolliderer og kan dyttes.'],
    tc: ['Bruk gizmopanelet på skjermen: flytt / roter med +/−-knappene.', 'Hold inne en knapp for rask bevegelse.', 'Navigasjonslinjen og statistikk- og gizmopanelene kan dras (linjen i håndtaket ⋮⋮) og fester seg magnetisk til skjermkantene og hverandre; ✕ legger et panel i dokken nederst, klikk på knappen for å åpne det igjen.'],
    ucs: 'Klikk på en akse i hjørnets aksegizmo (UCS) for å justere visningen; Shift+klikk ser fra motsatt side. Dobbeltklikk på hjørnets aksegizmo for å sette transform-gizmoen i rotasjonsmodus.'
  },
  da: {
    h: 'Hurtig hjælp', mouse: 'Mus', kb: 'Tastatur', panels: 'Paneler', phys: 'Fysik', touch: 'Berøringsenheder', tips: 'Tips',
    m: ['Træk med venstre: kredse kameraet', 'Træk med højre: panorere scenen', 'Hjul: zoom ind / ud', 'Venstreklik på et objekt: vælg det', 'Træk gizmoens pile / ringe: flyt eller roter valgt objekt', 'Dobbeltklik på et objekt: åbn dets Objekt-panel'],
    k: ['op / ned', 'venstre / højre', 'frem / tilbage', 'hold for større trin', 'ændr a', 'ændr b', 'ændr p', 'ændr q', 'gizmo: flyttetilstand', 'gizmo: rotationstilstand'],
    p: ['objektliste — vælg eller slet', 'gulvstile (Flad, Granit, Hav, Matematisk flade, Rum, Tragt, Clearwater) og avancerede kontroller', 'sceneforudindstillinger, refleksion og gitter', 'formbibliotek (knuder, parametriske, implicitte, eksplicitte flader, KREATV) og egne formler', 'geometri, materiale, lys og transformation for valgt objekt', 'eksportér valgt objekt (GLB, GLTF, OBJ, STL, PLY)', 'projektinfo og sprogvalg'],
    ph: ['Knappen <strong>Fysik</strong> i topbjælken slår fysikmotoren til / fra: objekter falder, hviler på jorden og kolliderer.', 'Mens fysikken kører, kan du stadig gribe det valgte objekt med gizmoen og skubbe andre.'],
    tv: ['Tilføj via <strong>Former → Objekter → KREATV</strong>.', 'Skærmen afspiller en video uafbrudt (uden lyd i starten).', '<strong>Dobbeltklik</strong> på tv-skærmen for at slå lyden til / fra (dobbeltklik på kabinettet for indstillinger).', 'Det er et fuldt fysikobjekt: det falder, kolliderer og kan skubbes.'],
    tc: ['Brug gizmopanelet på skærmen: flyt / roter med +/−-knapperne.', 'Hold en knap nede for hurtig bevægelse.', 'Navigationslinjen og statistik- og gizmopanelerne kan trækkes (linjen i håndtaget ⋮⋮) og hæfter magnetisk til skærmkanterne og hinanden; ✕ lægger et panel i docken nederst, klik på dets knap for at åbne det igen.'],
    ucs: 'Klik på en akse i hjørnets aksegizmo (UCS) for at justere visningen; Shift+klik ser fra den modsatte side. Dobbeltklik på hjørnets aksegizmo for at sætte transform-gizmoen i rotationstilstand.'
  },
  fi: {
    h: 'Pikaohje', mouse: 'Hiiri', kb: 'Näppäimistö', panels: 'Paneelit', phys: 'Fysiikka', touch: 'Kosketuslaitteet', tips: 'Vinkit',
    m: ['Vedä vasemmalla: kierrä kameraa', 'Vedä oikealla: siirrä näkymää', 'Rulla: lähennä / loitonna', 'Vasen napsautus objektiin: valitse se', 'Vedä gizmon nuolia / renkaita: siirrä tai kierrä valittua objektia', 'Kaksoisnapsauta objektia: avaa sen Objekti-paneeli'],
    k: ['ylös / alas', 'vasemmalle / oikealle', 'eteen / taakse', 'pidä pohjassa isompiin askeliin', 'muuta a', 'muuta b', 'muuta p', 'muuta q', 'gizmo: siirtotila', 'gizmo: kiertotila'],
    p: ['objektiluettelo — valitse tai poista', 'lattiatyylit (Tasainen, Graniitti, Meri, Matemaattinen pinta, Huone, Suppilo, Clearwater) ja lisäasetukset', 'näkymän esiasetukset, heijastus ja ruudukko', 'muotokirjasto (solmut, parametriset, implisiittiset, eksplisiittiset pinnat, KREATV) ja omat kaavat', 'valitun objektin geometria, materiaali, valaistus ja muunnos', 'vie valittu objekti (GLB, GLTF, OBJ, STL, PLY)', 'projektin tiedot ja kielen valinta'],
    ph: ['Yläpalkin <strong>Fysiikka</strong>-painike kytkee fysiikkamoottorin päälle / pois: objektit putoavat, lepäävät maassa ja törmäävät.', 'Fysiikan ollessa käynnissä voit yhä tarttua valittuun objektiin gizmolla ja tönäistä muita.'],
    tv: ['Lisää kohdasta <strong>Muodot → Objektit → KREATV</strong>.', 'Sen näytöllä pyörii video jatkuvasti (aluksi mykistettynä).', '<strong>Kaksoisnapsauta</strong> television näyttöä kytkeäksesi äänen päälle / pois (kaksoisnapsauta runkoa avataksesi asetukset).', 'Se on täysi fysiikkaobjekti: se putoaa, törmää ja sitä voi työntää.'],
    tc: ['Käytä näytön gizmopaneelia: siirrä / kierrä +/−-painikkeilla.', 'Pidä painiketta pohjassa nopeaan liikkeeseen.', 'Navigointipalkkia sekä tilasto- ja gizmopaneeleja voi vetää (palkkia ⋮⋮-kahvasta), ja ne tarttuvat magneettisesti näytön reunoihin ja toisiinsa; ✕ sulkee paneelin alareunan telakkaan, avaa se uudelleen napsauttamalla sen painiketta.'],
    ucs: 'Napsauta kulman akseligizmon (UCS) akselia kohdistaaksesi näkymän; Vaihto+napsautus katsoo vastakkaiselta puolelta. Kulman akseligizmon kaksoisnapsautus vaihtaa muunnosgizmon kiertotilaan.'
  },
  el: {
    h: 'Γρήγορη βοήθεια', mouse: 'Ποντίκι', kb: 'Πληκτρολόγιο', panels: 'Πίνακες', phys: 'Φυσική', touch: 'Συσκευές αφής', tips: 'Συμβουλές',
    m: ['Σύρσιμο με αριστερό: περιστροφή κάμερας', 'Σύρσιμο με δεξί: μετακίνηση σκηνής', 'Ροδέλα: μεγέθυνση / σμίκρυνση', 'Αριστερό κλικ σε αντικείμενο: επιλογή', 'Σύρσιμο βελών / δακτυλίων gizmo: μετακίνηση ή περιστροφή του επιλεγμένου αντικειμένου', 'Διπλό κλικ σε αντικείμενο: άνοιγμα του πίνακα Αντικείμενο'],
    k: ['πάνω / κάτω', 'αριστερά / δεξιά', 'μπροστά / πίσω', 'κρατήστε για μεγαλύτερα βήματα', 'αλλαγή a', 'αλλαγή b', 'αλλαγή p', 'αλλαγή q', 'gizmo: λειτουργία μετακίνησης', 'gizmo: λειτουργία περιστροφής'],
    p: ['λίστα αντικειμένων — επιλογή ή διαγραφή', 'στυλ εδάφους (Επίπεδο, Γρανίτης, Θάλασσα, Μαθηματική επιφάνεια, Δωμάτιο, Χωνί, Clearwater) και προηγμένα χειριστήρια', 'προεπιλογές σκηνής, αντανάκλαση και πλέγμα', 'βιβλιοθήκη σχημάτων (κόμβοι, παραμετρικές, πεπλεγμένες, ρητές επιφάνειες, KREATV) και δικοί σας τύποι', 'γεωμετρία, υλικό, φωτισμός και μετασχηματισμός του επιλεγμένου αντικειμένου', 'εξαγωγή του επιλεγμένου αντικειμένου (GLB, GLTF, OBJ, STL, PLY)', 'πληροφορίες έργου και επιλογή γλώσσας'],
    ph: ['Το κουμπί <strong>Φυσική</strong> στην επάνω μπάρα ενεργοποιεί / απενεργοποιεί τη μηχανή φυσικής: τα αντικείμενα πέφτουν, ακουμπούν στο έδαφος και συγκρούονται.', 'Ενώ τρέχει η φυσική μπορείτε ακόμη να πιάσετε το επιλεγμένο αντικείμενο με το gizmo και να σπρώξετε τα άλλα.'],
    tv: ['Προσθέστε το από <strong>Σχήματα → Αντικείμενα → KREATV</strong>.', 'Η οθόνη του παίζει συνεχώς ένα βίντεο (αρχικά σε σίγαση).', '<strong>Διπλό κλικ</strong> στην οθόνη της τηλεόρασης για ενεργοποίηση / απενεργοποίηση ήχου (διπλό κλικ στο περίβλημα για τις ρυθμίσεις).', 'Είναι πλήρες αντικείμενο φυσικής: πέφτει, συγκρούεται και μπορεί να σπρωχτεί.'],
    tc: ['Χρησιμοποιήστε τον πίνακα gizmo στην οθόνη: μετακίνηση / περιστροφή με τα κουμπιά +/−.', 'Κρατήστε πατημένο ένα κουμπί για γρήγορη κίνηση.', 'Η γραμμή πλοήγησης και οι πίνακες στατιστικών και gizmo σύρονται (η γραμμή από τη λαβή ⋮⋮) και κολλούν μαγνητικά στις άκρες της οθόνης και μεταξύ τους· το ✕ κλείνει έναν πίνακα στη βάση κάτω, κάντε κλικ στο κουμπί του για να ανοίξει ξανά.'],
    ucs: 'Κάντε κλικ σε άξονα του gizmo αξόνων στη γωνία (UCS) για ευθυγράμμιση της προβολής· Shift+κλικ κοιτάζει από την αντίθετη πλευρά. Διπλό κλικ στο gizmo αξόνων της γωνίας αλλάζει το gizmo μετασχηματισμού σε λειτουργία περιστροφής.'
  }
};

const HELP_KEYS = [['W', 'S'], ['A', 'D'], ['Q', 'E'], ['Shift'], ['I', 'K'], ['J', 'L'], ['U', 'O'], ['N', 'M'], ['G'], ['R']];
const HELP_PANELS = ['Home', 'Environment', 'Scene', 'Shapes', 'Object', 'Export', 'About'];

function buildHelp(lang){
  const t = HELP_TEXT[lang] || HELP_TEXT.en;
  const list = (items) => `<ul>\n${items.map(i => `  <li>${i}</li>`).join('\n')}\n</ul>`;
  const kbd = (keys) => keys.map(k => `<kbd>${k}</kbd>`).join(' / ');
  return `<h3>${t.h}</h3>
<p><strong>${t.mouse}:</strong></p>
${list(t.m)}
<p><strong>${t.kb}:</strong></p>
${list(HELP_KEYS.map((keys, i) => `${kbd(keys)} — ${t.k[i]}`))}
<p><strong>${t.panels}:</strong></p>
${list(HELP_PANELS.map((tab, i) => `<strong>${getTabLabel(tab, lang)}:</strong> ${t.p[i]}`))}
<p><strong>${t.phys}:</strong></p>
${list(t.ph)}
<p><strong>📺 KREATV:</strong></p>
${list(t.tv)}
<p><strong>${t.touch}:</strong></p>
${list(t.tc)}
<p><strong>${t.tips}:</strong></p>
${list([t.ucs])}`;
}

const helpContent = Object.fromEntries(languages.map(l => [l.code, buildHelp(l.code)]));

let currentLang = localStorage.getItem('tc_lang') || 'tr';

export function getHelpHtml(lang) {
  if (lang) {
    currentLang = lang;
    localStorage.setItem('tc_lang', lang);
  }
  return helpContent[currentLang] || helpContent.en;
}

export function setLanguage(lang) {
  if (helpContent[lang]) {
    currentLang = lang;
    localStorage.setItem('tc_lang', lang);
    return true;
  }
  return false;
}

export function getCurrentLanguage() {
  return currentLang;
}

export const helpHtml = getHelpHtml();
