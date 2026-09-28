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

const helpContent = {
  en: `<h3>Quick Help</h3>
<p><strong>Mouse Controls:</strong></p>
<ul>
  <li><strong>Left click + drag:</strong> Rotate object</li>
  <li><strong>Middle click + drag:</strong> Rotate scene (OrbitControls)</li>
  <li><strong>Wheel:</strong> Zoom in / Zoom out</li>
  <li><strong>Right click + drag:</strong> Pan scene</li>
</ul>
<p><strong>Keyboard Shortcuts:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil Knot</li>
  <li><kbd>S</kbd> - Septafoil Knot</li>
  <li><kbd>G</kbd> - Cycle Ground Style (Funnel, Sea, Room, etc.)</li>
  <li><kbd>A</kbd> - About Panel</li>
  <li><kbd>H</kbd> - Help Panel (this window)</li>
  <li><kbd>M</kbd> - Toggle GUI Menu</li>
</ul>
<p><strong>Touch Devices:</strong></p>
<ul>
  <li>Use the <strong>gizmo menu</strong> in the top-right corner.</li>
  <li>Drag the gizmo to reposition it.</li>
  <li>Adjust position and rotation with +/− buttons.</li>
  <li>Press and hold for rapid movement.</li>
</ul>
<p><strong>Panel Usage:</strong></p>
<ul>
  <li><strong>Home:</strong> Welcome message</li>
  <li><strong>Scene:</strong> Scene preset management</li>
  <li><strong>About:</strong> Project information</li>
  <li><strong>Help:</strong> This help window</li>
</ul>
<p>For more information, check the <em>About</em> tab.</p>`,
  
  tr: `<h3>Hızlı Yardım</h3>
<p><strong>Fare ile Kontrol:</strong></p>
<ul>
  <li><strong>Sol tık + sürükle:</strong> Nesneyi döndür</li>
  <li><strong>Orta tık + sürükle:</strong> Sahneyi döndür (OrbitControls)</li>
  <li><strong>Tekerlek:</strong> Yakınlaştır / Uzaklaştır</li>
  <li><strong>Sağ tık + sürükle:</strong> Sahneyi kaydır</li>
</ul>
<p><strong>Klavye Kısayolları:</strong></p>
<ul>
  <li><kbd>T</kbd> - Treyfoil Knot (Trefoil)</li>
  <li><kbd>S</kbd> - Septafoil Knot</li>
  <li><kbd>G</kbd> - Zemin Görünümünü Değiştir (Funnel, Sea, Room, vb.)</li>
  <li><kbd>A</kbd> - Hakkında Paneli</li>
  <li><kbd>H</kbd> - Yardım Paneli (bu pencere)</li>
  <li><kbd>M</kbd> - GUI Menüsünü Aç/Kapat</li>
</ul>
<p><strong>Dokunmatik Cihazlar:</strong></p>
<ul>
  <li>Ekranın sağ üst köşesindeki <strong>gizmo menüsünü</strong> kullanın.</li>
  <li>Gizmo'yu sürükleyerek konumlandırabilirsiniz.</li>
  <li>+/− düğmeleri ile pozisyon ve rotasyonu ayarlayın.</li>
  <li>Basılı tutarak hızlı hareket ettirin.</li>
</ul>
<p><strong>Panel Kullanımı:</strong></p>
<ul>
  <li><strong>Home:</strong> Karşılama mesajı</li>
  <li><strong>Scene:</strong> Sahne hazır ayarları (preset) yönetimi</li>
  <li><strong>About:</strong> Proje hakkında bilgi</li>
  <li><strong>Help:</strong> Bu yardım penceresi</li>
</ul>
<p>Daha fazla bilgi için <em>About</em> sekmesine göz atın.</p>`,
  
  es: `<h3>Ayuda Rápida</h3>
<p><strong>Controles del Ratón:</strong></p>
<ul>
  <li><strong>Clic izquierdo + arrastrar:</strong> Rotar objeto</li>
  <li><strong>Clic central + arrastrar:</strong> Rotar escena (OrbitControls)</li>
  <li><strong>Rueda:</strong> Acercar / Alejar</li>
  <li><strong>Clic derecho + arrastrar:</strong> Desplazar escena</li>
</ul>
<p><strong>Atajos de Teclado:</strong></p>
<ul>
  <li><kbd>T</kbd> - Nudo Trefoil</li>
  <li><kbd>S</kbd> - Nudo Septafoil</li>
  <li><kbd>G</kbd> - Cambiar Estilo del Suelo</li>
  <li><kbd>A</kbd> - Panel Acerca de</li>
  <li><kbd>H</kbd> - Panel de Ayuda</li>
  <li><kbd>M</kbd> - Alternar Menú GUI</li>
</ul>
<p><strong>Dispositivos Táctiles:</strong></p>
<ul>
  <li>Use el <strong>menú gizmo</strong> en la esquina superior derecha.</li>
  <li>Arrastre el gizmo para reposicionarlo.</li>
  <li>Ajuste posición y rotación con botones +/−.</li>
  <li>Mantenga presionado para movimiento rápido.</li>
</ul>
<p><strong>Uso de Paneles:</strong></p>
<ul>
  <li><strong>Home:</strong> Mensaje de bienvenida</li>
  <li><strong>Scene:</strong> Gestión de presets de escena</li>
  <li><strong>About:</strong> Información del proyecto</li>
  <li><strong>Help:</strong> Esta ventana de ayuda</li>
</ul>`,
  
  fr: `<h3>Aide Rapide</h3>
<p><strong>Contrôles de la Souris:</strong></p>
<ul>
  <li><strong>Clic gauche + glisser:</strong> Faire pivoter l'objet</li>
  <li><strong>Clic central + glisser:</strong> Faire pivoter la scène</li>
  <li><strong>Molette:</strong> Zoomer / Dézoomer</li>
  <li><strong>Clic droit + glisser:</strong> Déplacer la scène</li>
</ul>
<p><strong>Raccourcis Clavier:</strong></p>
<ul>
  <li><kbd>T</kbd> - Nœud Trefoil</li>
  <li><kbd>S</kbd> - Nœud Septafoil</li>
  <li><kbd>G</kbd> - Changer le Style du Sol</li>
  <li><kbd>A</kbd> - Panneau À Propos</li>
  <li><kbd>H</kbd> - Panneau d'Aide</li>
  <li><kbd>M</kbd> - Basculer le Menu GUI</li>
</ul>
<p><strong>Appareils Tactiles:</strong></p>
<ul>
  <li>Utilisez le <strong>menu gizmo</strong> dans le coin supérieur droit.</li>
  <li>Faites glisser le gizmo pour le repositionner.</li>
  <li>Ajustez position et rotation avec les boutons +/−.</li>
  <li>Maintenez appuyé pour un mouvement rapide.</li>
</ul>
<p><strong>Utilisation des Panneaux:</strong></p>
<ul>
  <li><strong>Home:</strong> Message de bienvenue</li>
  <li><strong>Scene:</strong> Gestion des préréglages</li>
  <li><strong>About:</strong> Informations sur le projet</li>
  <li><strong>Help:</strong> Cette fenêtre d'aide</li>
</ul>`,
  
  de: `<h3>Schnelle Hilfe</h3>
<p><strong>Maussteuerung:</strong></p>
<ul>
  <li><strong>Linksklick + ziehen:</strong> Objekt drehen</li>
  <li><strong>Mittelklick + ziehen:</strong> Szene drehen</li>
  <li><strong>Rad:</strong> Vergrößern / Verkleinern</li>
  <li><strong>Rechtsklick + ziehen:</strong> Szene schwenken</li>
</ul>
<p><strong>Tastenkombinationen:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil-Knoten</li>
  <li><kbd>S</kbd> - Septafoil-Knoten</li>
  <li><kbd>G</kbd> - Bodenstil wechseln</li>
  <li><kbd>A</kbd> - Über-Panel</li>
  <li><kbd>H</kbd> - Hilfe-Panel</li>
  <li><kbd>M</kbd> - GUI-Menü umschalten</li>
</ul>
<p><strong>Touch-Geräte:</strong></p>
<ul>
  <li>Verwenden Sie das <strong>Gizmo-Menü</strong> in der oberen rechten Ecke.</li>
  <li>Ziehen Sie das Gizmo, um es neu zu positionieren.</li>
  <li>Passen Sie Position und Rotation mit +/− Tasten an.</li>
  <li>Halten Sie gedrückt für schnelle Bewegung.</li>
</ul>
<p><strong>Panel-Verwendung:</strong></p>
<ul>
  <li><strong>Home:</strong> Willkommensnachricht</li>
  <li><strong>Scene:</strong> Szenenvorlagen-Verwaltung</li>
  <li><strong>About:</strong> Projektinformationen</li>
  <li><strong>Help:</strong> Dieses Hilfefenster</li>
</ul>`,
  
  it: `<h3>Guida Rapida</h3>
<p><strong>Controlli Mouse:</strong></p>
<ul>
  <li><strong>Clic sinistro + trascina:</strong> Ruota oggetto</li>
  <li><strong>Clic centrale + trascina:</strong> Ruota scena</li>
  <li><strong>Rotella:</strong> Ingrandisci / Riduci</li>
  <li><strong>Clic destro + trascina:</strong> Sposta scena</li>
</ul>
<p><strong>Scorciatoie Tastiera:</strong></p>
<ul>
  <li><kbd>T</kbd> - Nodo Trefoil</li>
  <li><kbd>S</kbd> - Nodo Septafoil</li>
  <li><kbd>G</kbd> - Cambia Stile Terreno</li>
  <li><kbd>A</kbd> - Pannello Info</li>
  <li><kbd>H</kbd> - Pannello Aiuto</li>
  <li><kbd>M</kbd> - Attiva/Disattiva Menu GUI</li>
</ul>
<p><strong>Dispositivi Touch:</strong></p>
<ul>
  <li>Usa il <strong>menu gizmo</strong> nell'angolo in alto a destra.</li>
  <li>Trascina il gizmo per riposizionarlo.</li>
  <li>Regola posizione e rotazione con i pulsanti +/−.</li>
  <li>Tieni premuto per movimento rapido.</li>
</ul>
<p><strong>Uso Pannelli:</strong></p>
<ul>
  <li><strong>Home:</strong> Messaggio di benvenuto</li>
  <li><strong>Scene:</strong> Gestione preset scena</li>
  <li><strong>About:</strong> Informazioni progetto</li>
  <li><strong>Help:</strong> Questa finestra di aiuto</li>
</ul>`,
  
  pt: `<h3>Ajuda Rápida</h3>
<p><strong>Controles do Mouse:</strong></p>
<ul>
  <li><strong>Clique esquerdo + arrastar:</strong> Girar objeto</li>
  <li><strong>Clique central + arrastar:</strong> Girar cena</li>
  <li><strong>Roda:</strong> Aproximar / Afastar</li>
  <li><strong>Clique direito + arrastar:</strong> Deslocar cena</li>
</ul>
<p><strong>Atalhos de Teclado:</strong></p>
<ul>
  <li><kbd>T</kbd> - Nó Trefoil</li>
  <li><kbd>S</kbd> - Nó Septafoil</li>
  <li><kbd>G</kbd> - Alternar Estilo do Chão</li>
  <li><kbd>A</kbd> - Painel Sobre</li>
  <li><kbd>H</kbd> - Painel de Ajuda</li>
  <li><kbd>M</kbd> - Alternar Menu GUI</li>
</ul>
<p><strong>Dispositivos Touch:</strong></p>
<ul>
  <li>Use o <strong>menu gizmo</strong> no canto superior direito.</li>
  <li>Arraste o gizmo para reposicioná-lo.</li>
  <li>Ajuste posição e rotação com botões +/−.</li>
  <li>Mantenha pressionado para movimento rápido.</li>
</ul>
<p><strong>Uso de Painéis:</strong></p>
<ul>
  <li><strong>Home:</strong> Mensagem de boas-vindas</li>
  <li><strong>Scene:</strong> Gerenciamento de presets</li>
  <li><strong>About:</strong> Informações do projeto</li>
  <li><strong>Help:</strong> Esta janela de ajuda</li>
</ul>`,
  
  ru: `<h3>Быстрая справка</h3>
<p><strong>Управление мышью:</strong></p>
<ul>
  <li><strong>Левая кнопка + перетаскивание:</strong> Вращение объекта</li>
  <li><strong>Средняя кнопка + перетаскивание:</strong> Вращение сцены</li>
  <li><strong>Колесо:</strong> Приближение / Отдаление</li>
  <li><strong>Правая кнопка + перетаскивание:</strong> Панорамирование сцены</li>
</ul>
<p><strong>Горячие клавиши:</strong></p>
<ul>
  <li><kbd>T</kbd> - Узел Трефойл</li>
  <li><kbd>S</kbd> - Узел Септафойл</li>
  <li><kbd>G</kbd> - Сменить стиль земли</li>
  <li><kbd>A</kbd> - Панель О программе</li>
  <li><kbd>H</kbd> - Панель справки</li>
  <li><kbd>M</kbd> - Переключить меню GUI</li>
</ul>
<p><strong>Сенсорные устройства:</strong></p>
<ul>
  <li>Используйте <strong>меню gizmo</strong> в правом верхнем углу.</li>
  <li>Перетащите gizmo для изменения позиции.</li>
  <li>Настройте положение и вращение кнопками +/−.</li>
  <li>Удерживайте для быстрого движения.</li>
</ul>
<p><strong>Использование панелей:</strong></p>
<ul>
  <li><strong>Home:</strong> Приветственное сообщение</li>
  <li><strong>Scene:</strong> Управление пресетами сцены</li>
  <li><strong>About:</strong> Информация о проекте</li>
  <li><strong>Help:</strong> Это окно справки</li>
</ul>`,
  
  zh: `<h3>快速帮助</h3>
<p><strong>鼠标控制：</strong></p>
<ul>
  <li><strong>左键 + 拖动：</strong>旋转对象</li>
  <li><strong>中键 + 拖动：</strong>旋转场景</li>
  <li><strong>滚轮：</strong>放大 / 缩小</li>
  <li><strong>右键 + 拖动：</strong>平移场景</li>
</ul>
<p><strong>键盘快捷键：</strong></p>
<ul>
  <li><kbd>T</kbd> - 三叶结</li>
  <li><kbd>S</kbd> - 七叶结</li>
  <li><kbd>G</kbd> - 切换地面样式</li>
  <li><kbd>A</kbd> - 关于面板</li>
  <li><kbd>H</kbd> - 帮助面板</li>
  <li><kbd>M</kbd> - 切换 GUI 菜单</li>
</ul>
<p><strong>触摸设备：</strong></p>
<ul>
  <li>使用右上角的<strong>gizmo菜单</strong>。</li>
  <li>拖动gizmo以重新定位。</li>
  <li>使用 +/− 按钮调整位置和旋转。</li>
  <li>按住可快速移动。</li>
</ul>
<p><strong>面板使用：</strong></p>
<ul>
  <li><strong>Home：</strong>欢迎消息</li>
  <li><strong>Scene：</strong>场景预设管理</li>
  <li><strong>About：</strong>项目信息</li>
  <li><strong>Help：</strong>此帮助窗口</li>
</ul>`,
  
  ja: `<h3>クイックヘルプ</h3>
<p><strong>マウス操作：</strong></p>
<ul>
  <li><strong>左クリック + ドラッグ：</strong>オブジェクトを回転</li>
  <li><strong>中クリック + ドラッグ：</strong>シーンを回転</li>
  <li><strong>ホイール：</strong>ズームイン / ズームアウト</li>
  <li><strong>右クリック + ドラッグ：</strong>シーンをパン</li>
</ul>
<p><strong>キーボードショートカット：</strong></p>
<ul>
  <li><kbd>T</kbd> - トレフォイルノット</li>
  <li><kbd>S</kbd> - セプタフォイルノット</li>
  <li><kbd>G</kbd> - 地面スタイルを切り替え</li>
  <li><kbd>A</kbd> - 概要パネル</li>
  <li><kbd>H</kbd> - ヘルプパネル</li>
  <li><kbd>M</kbd> - GUIメニューを切り替え</li>
</ul>
<p><strong>タッチデバイス：</strong></p>
<ul>
  <li>右上隅の<strong>gizmoメニュー</strong>を使用します。</li>
  <li>gizmoをドラッグして再配置します。</li>
  <li>+/− ボタンで位置と回転を調整します。</li>
  <li>長押しで素早く移動できます。</li>
</ul>
<p><strong>パネルの使用：</strong></p>
<ul>
  <li><strong>Home：</strong>ようこそメッセージ</li>
  <li><strong>Scene：</strong>シーンプリセット管理</li>
  <li><strong>About：</strong>プロジェクト情報</li>
  <li><strong>Help：</strong>このヘルプウィンドウ</li>
</ul>`,
  
  ko: `<h3>빠른 도움말</h3>
<p><strong>마우스 제어:</strong></p>
<ul>
  <li><strong>왼쪽 클릭 + 드래그:</strong> 객체 회전</li>
  <li><strong>가운데 클릭 + 드래그:</strong> 장면 회전</li>
  <li><strong>휠:</strong> 확대 / 축소</li>
  <li><strong>오른쪽 클릭 + 드래그:</strong> 장면 이동</li>
</ul>
<p><strong>키보드 단축키:</strong></p>
<ul>
  <li><kbd>T</kbd> - 트레포일 매듭</li>
  <li><kbd>S</kbd> - 셉타포일 매듭</li>
  <li><kbd>G</kbd> - 지면 스타일 전환</li>
  <li><kbd>A</kbd> - 정보 패널</li>
  <li><kbd>H</kbd> - 도움말 패널</li>
  <li><kbd>M</kbd> - GUI 메뉴 토글</li>
</ul>
<p><strong>터치 장치:</strong></p>
<ul>
  <li>오른쪽 상단의 <strong>gizmo 메뉴</strong>를 사용하세요.</li>
  <li>gizmo를 드래그하여 위치를 변경하세요.</li>
  <li>+/− 버튼으로 위치와 회전을 조정하세요.</li>
  <li>길게 눌러 빠르게 이동하세요.</li>
</ul>
<p><strong>패널 사용:</strong></p>
<ul>
  <li><strong>Home:</strong> 환영 메시지</li>
  <li><strong>Scene:</strong> 장면 프리셋 관리</li>
  <li><strong>About:</strong> 프로젝트 정보</li>
  <li><strong>Help:</strong> 이 도움말 창</li>
</ul>`,
  
  ar: `<h3>مساعدة سريعة</h3>
<p><strong>التحكم بالماوس:</strong></p>
<ul>
  <li><strong>النقر الأيسر + السحب:</strong> تدوير الكائن</li>
  <li><strong>النقر الأوسط + السحب:</strong> تدوير المشهد</li>
  <li><strong>العجلة:</strong> تكبير / تصغير</li>
  <li><strong>النقر الأيمن + السحب:</strong> تحريك المشهد</li>
</ul>
<p><strong>اختصارات لوحة المفاتيح:</strong></p>
<ul>
  <li><kbd>T</kbd> - عقدة ثلاثية الأوراق</li>
  <li><kbd>S</kbd> - عقدة سباعية</li>
  <li><kbd>G</kbd> - تبديل نمط الأرضية</li>
  <li><kbd>A</kbd> - لوحة حول</li>
  <li><kbd>H</kbd> - لوحة المساعدة</li>
  <li><kbd>M</kbd> - تبديل قائمة GUI</li>
</ul>
<p><strong>الأجهزة اللمسية:</strong></p>
<ul>
  <li>استخدم <strong>قائمة gizmo</strong> في الزاوية العلوية اليمنى.</li>
  <li>اسحب gizmo لإعادة وضعه.</li>
  <li>اضبط الموضع والدوران بأزرار +/−.</li>
  <li>اضغط مع الاستمرار للحركة السريعة.</li>
</ul>
<p><strong>استخدام اللوحات:</strong></p>
<ul>
  <li><strong>Home:</strong> رسالة ترحيب</li>
  <li><strong>Scene:</strong> إدارة الإعدادات المسبقة</li>
  <li><strong>About:</strong> معلومات المشروع</li>
  <li><strong>Help:</strong> نافذة المساعدة هذه</li>
</ul>`,
  
  hi: `<h3>त्वरित सहायता</h3>
<p><strong>माउस नियंत्रण:</strong></p>
<ul>
  <li><strong>बायाँ क्लिक + खींचें:</strong> ऑब्जेक्ट घुमाएँ</li>
  <li><strong>मध्य क्लिक + खींचें:</strong> दृश्य घुमाएँ</li>
  <li><strong>व्हील:</strong> ज़ूम इन / ज़ूम आउट</li>
  <li><strong>दायाँ क्लिक + खींचें:</strong> दृश्य पैन करें</li>
</ul>
<p><strong>कीबोर्ड शॉर्टकट:</strong></p>
<ul>
  <li><kbd>T</kbd> - ट्रेफ़ॉइल गाँठ</li>
  <li><kbd>S</kbd> - सेप्टाफ़ॉइल गाँठ</li>
  <li><kbd>G</kbd> - ज़मीन शैली बदलें</li>
  <li><kbd>A</kbd> - के बारे में पैनल</li>
  <li><kbd>H</kbd> - सहायता पैनल</li>
  <li><kbd>M</kbd> - GUI मेनू टॉगल करें</li>
</ul>
<p><strong>टच डिवाइस:</strong></p>
<ul>
  <li>ऊपरी दाएँ कोने में <strong>gizmo मेनू</strong> का उपयोग करें।</li>
  <li>gizmo को खींचकर स्थिति बदलें।</li>
  <li>+/− बटन से स्थिति और घुमाव समायोजित करें।</li>
  <li>तेज़ गति के लिए दबाए रखें।</li>
</ul>
<p><strong>पैनल उपयोग:</strong></p>
<ul>
  <li><strong>Home:</strong> स्वागत संदेश</li>
  <li><strong>Scene:</strong> दृश्य प्रीसेट प्रबंधन</li>
  <li><strong>About:</strong> परियोजना जानकारी</li>
  <li><strong>Help:</strong> यह सहायता विंडो</li>
</ul>`,
  
  nl: `<h3>Snelle hulp</h3>
<p><strong>Muisbediening:</strong></p>
<ul>
  <li><strong>Linksklik + slepen:</strong> Object draaien</li>
  <li><strong>Middelklik + slepen:</strong> Scène draaien</li>
  <li><strong>Wiel:</strong> Inzoomen / Uitzoomen</li>
  <li><strong>Rechtsklik + slepen:</strong> Scène verschuiven</li>
</ul>
<p><strong>Sneltoetsen:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil Knoop</li>
  <li><kbd>S</kbd> - Septafoil Knoop</li>
  <li><kbd>G</kbd> - Grondstijl wijzigen</li>
  <li><kbd>A</kbd> - Over paneel</li>
  <li><kbd>H</kbd> - Help paneel</li>
  <li><kbd>M</kbd> - GUI-menu schakelen</li>
</ul>
<p><strong>Aanraakapparaten:</strong></p>
<ul>
  <li>Gebruik het <strong>gizmo-menu</strong> in de rechterbovenhoek.</li>
  <li>Sleep de gizmo om hem te verplaatsen.</li>
  <li>Pas positie en rotatie aan met +/− knoppen.</li>
  <li>Houd ingedrukt voor snelle beweging.</li>
</ul>
<p><strong>Paneelgebruik:</strong></p>
<ul>
  <li><strong>Home:</strong> Welkomstbericht</li>
  <li><strong>Scene:</strong> Scène preset beheer</li>
  <li><strong>About:</strong> Projectinformatie</li>
  <li><strong>Help:</strong> Dit helpvenster</li>
</ul>`,
  
  pl: `<h3>Szybka pomoc</h3>
<p><strong>Sterowanie myszą:</strong></p>
<ul>
  <li><strong>Lewy przycisk + przeciąganie:</strong> Obracanie obiektu</li>
  <li><strong>Środkowy przycisk + przeciąganie:</strong> Obracanie sceny</li>
  <li><strong>Kółko:</strong> Powiększanie / Pomniejszanie</li>
  <li><strong>Prawy przycisk + przeciąganie:</strong> Przesuwanie sceny</li>
</ul>
<p><strong>Skróty klawiszowe:</strong></p>
<ul>
  <li><kbd>T</kbd> - Węzeł Trefoil</li>
  <li><kbd>S</kbd> - Węzeł Septafoil</li>
  <li><kbd>G</kbd> - Zmień styl podłoża</li>
  <li><kbd>A</kbd> - Panel O programie</li>
  <li><kbd>H</kbd> - Panel pomocy</li>
  <li><kbd>M</kbd> - Przełącz menu GUI</li>
</ul>
<p><strong>Urządzenia dotykowe:</strong></p>
<ul>
  <li>Użyj <strong>menu gizmo</strong> w prawym górnym rogu.</li>
  <li>Przeciągnij gizmo, aby zmienić pozycję.</li>
  <li>Dostosuj pozycję i obrót przyciskami +/−.</li>
  <li>Przytrzymaj dla szybkiego ruchu.</li>
</ul>
<p><strong>Użycie paneli:</strong></p>
<ul>
  <li><strong>Home:</strong> Wiadomość powitalna</li>
  <li><strong>Scene:</strong> Zarządzanie presetami sceny</li>
  <li><strong>About:</strong> Informacje o projekcie</li>
  <li><strong>Help:</strong> To okno pomocy</li>
</ul>`,
  
  sv: `<h3>Snabbhjälp</h3>
<p><strong>Muskontroller:</strong></p>
<ul>
  <li><strong>Vänsterklick + dra:</strong> Rotera objekt</li>
  <li><strong>Mittenklick + dra:</strong> Rotera scen</li>
  <li><strong>Hjul:</strong> Zooma in / Zooma ut</li>
  <li><strong>Högerklick + dra:</strong> Panorera scen</li>
</ul>
<p><strong>Tangentbordsgenvägar:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil-knut</li>
  <li><kbd>S</kbd> - Septafoil-knut</li>
  <li><kbd>G</kbd> - Byt markstil</li>
  <li><kbd>A</kbd> - Om-panel</li>
  <li><kbd>H</kbd> - Hjälppanel</li>
  <li><kbd>M</kbd> - Växla GUI-meny</li>
</ul>
<p><strong>Pekenheter:</strong></p>
<ul>
  <li>Använd <strong>gizmo-menyn</strong> i övre högra hörnet.</li>
  <li>Dra gizmon för att ompositionera den.</li>
  <li>Justera position och rotation med +/− knappar.</li>
  <li>Håll ned för snabb rörelse.</li>
</ul>
<p><strong>Panelanvändning:</strong></p>
<ul>
  <li><strong>Home:</strong> Välkomstmeddelande</li>
  <li><strong>Scene:</strong> Scenförinställningshantering</li>
  <li><strong>About:</strong> Projektinformation</li>
  <li><strong>Help:</strong> Detta hjälpfönster</li>
</ul>`,
  
  no: `<h3>Rask hjelp</h3>
<p><strong>Musekontroller:</strong></p>
<ul>
  <li><strong>Venstreklikk + dra:</strong> Roter objekt</li>
  <li><strong>Midtklikk + dra:</strong> Roter scene</li>
  <li><strong>Hjul:</strong> Zoom inn / Zoom ut</li>
  <li><strong>Høyreklikk + dra:</strong> Panorere scene</li>
</ul>
<p><strong>Tastatursnarveier:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil-knute</li>
  <li><kbd>S</kbd> - Septafoil-knute</li>
  <li><kbd>G</kbd> - Bytt bakkestil</li>
  <li><kbd>A</kbd> - Om-panel</li>
  <li><kbd>H</kbd> - Hjelpepanel</li>
  <li><kbd>M</kbd> - Veksle GUI-meny</li>
</ul>
<p><strong>Berøringsenheter:</strong></p>
<ul>
  <li>Bruk <strong>gizmo-menyen</strong> i øvre høyre hjørne.</li>
  <li>Dra gizmo for å omposisjonere den.</li>
  <li>Juster posisjon og rotasjon med +/− knapper.</li>
  <li>Hold nede for rask bevegelse.</li>
</ul>
<p><strong>Panelbruk:</strong></p>
<ul>
  <li><strong>Home:</strong> Velkomstmelding</li>
  <li><strong>Scene:</strong> Sceneforhåndsinnstillinger</li>
  <li><strong>About:</strong> Prosjektinformasjon</li>
  <li><strong>Help:</strong> Dette hjelpevinduet</li>
</ul>`,
  
  da: `<h3>Hurtig hjælp</h3>
<p><strong>Musekontroller:</strong></p>
<ul>
  <li><strong>Venstreklik + træk:</strong> Roter objekt</li>
  <li><strong>Midterklik + træk:</strong> Roter scene</li>
  <li><strong>Hjul:</strong> Zoom ind / Zoom ud</li>
  <li><strong>Højreklik + træk:</strong> Panorere scene</li>
</ul>
<p><strong>Tastaturgenveje:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil-knude</li>
  <li><kbd>S</kbd> - Septafoil-knude</li>
  <li><kbd>G</kbd> - Skift grundstil</li>
  <li><kbd>A</kbd> - Om-panel</li>
  <li><kbd>H</kbd> - Hjælpepanel</li>
  <li><kbd>M</kbd> - Skift GUI-menu</li>
</ul>
<p><strong>Berøringsenheder:</strong></p>
<ul>
  <li>Brug <strong>gizmo-menuen</strong> i øverste højre hjørne.</li>
  <li>Træk gizmo for at omplacere den.</li>
  <li>Juster position og rotation med +/− knapper.</li>
  <li>Hold nede for hurtig bevægelse.</li>
</ul>
<p><strong>Panelbrug:</strong></p>
<ul>
  <li><strong>Home:</strong> Velkomstbesked</li>
  <li><strong>Scene:</strong> Scene preset-håndtering</li>
  <li><strong>About:</strong> Projektinformation</li>
  <li><strong>Help:</strong> Dette hjælpevindue</li>
</ul>`,
  
  fi: `<h3>Pikaohje</h3>
<p><strong>Hiiriohjaus:</strong></p>
<ul>
  <li><strong>Vasen napsautus + vedä:</strong> Kierrä objektia</li>
  <li><strong>Keskimmäinen napsautus + vedä:</strong> Kierrä kohtausta</li>
  <li><strong>Rulla:</strong> Lähennä / Loitonna</li>
  <li><strong>Oikea napsautus + vedä:</strong> Panoroi kohtausta</li>
</ul>
<p><strong>Pikanäppäimet:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil-solmu</li>
  <li><kbd>S</kbd> - Septafoil-solmu</li>
  <li><kbd>G</kbd> - Vaihda maatyyli</li>
  <li><kbd>A</kbd> - Tietoja-paneeli</li>
  <li><kbd>H</kbd> - Ohje-paneeli</li>
  <li><kbd>M</kbd> - Vaihda GUI-valikko</li>
</ul>
<p><strong>Kosketuslaitteet:</strong></p>
<ul>
  <li>Käytä <strong>gizmo-valikkoa</strong> oikeassa yläkulmassa.</li>
  <li>Vedä gizmo sijoittaaksesi sen uudelleen.</li>
  <li>Säädä sijaintia ja kiertoa +/− painikkeilla.</li>
  <li>Pidä painettuna nopeaa liikettä varten.</li>
</ul>
<p><strong>Paneelin käyttö:</strong></p>
<ul>
  <li><strong>Home:</strong> Tervetuloviesti</li>
  <li><strong>Scene:</strong> Kohtausesiasetukset</li>
  <li><strong>About:</strong> Projektin tiedot</li>
  <li><strong>Help:</strong> Tämä ohjeikkuna</li>
</ul>`,
  
  el: `<h3>Γρήγορη βοήθεια</h3>
<p><strong>Έλεγχοι ποντικιού:</strong></p>
<ul>
  <li><strong>Αριστερό κλικ + σύρσιμο:</strong> Περιστροφή αντικειμένου</li>
  <li><strong>Μεσαίο κλικ + σύρσιμο:</strong> Περιστροφή σκηνής</li>
  <li><strong>Τροχός:</strong> Μεγέθυνση / Σμίκρυνση</li>
  <li><strong>Δεξί κλικ + σύρσιμο:</strong> Μετακίνηση σκηνής</li>
</ul>
<p><strong>Συντομεύσεις πληκτρολογίου:</strong></p>
<ul>
  <li><kbd>T</kbd> - Κόμβος Trefoil</li>
  <li><kbd>S</kbd> - Κόμβος Septafoil</li>
  <li><kbd>G</kbd> - Αλλαγή στυλ εδάφους</li>
  <li><kbd>A</kbd> - Πίνακας Σχετικά</li>
  <li><kbd>H</kbd> - Πίνακας Βοήθειας</li>
  <li><kbd>M</kbd> - Εναλλαγή μενού GUI</li>
</ul>
<p><strong>Συσκευές αφής:</strong></p>
<ul>
  <li>Χρησιμοποιήστε το <strong>μενού gizmo</strong> στην πάνω δεξιά γωνία.</li>
  <li>Σύρετε το gizmo για να το αναδιατάξετε.</li>
  <li>Ρυθμίστε θέση και περιστροφή με κουμπιά +/−.</li>
  <li>Κρατήστε πατημένο για γρήγορη κίνηση.</li>
</ul>
<p><strong>Χρήση πινάκων:</strong></p>
<ul>
  <li><strong>Home:</strong> Μήνυμα καλωσορίσματος</li>
  <li><strong>Scene:</strong> Διαχείριση προεπιλογών σκηνής</li>
  <li><strong>About:</strong> Πληροφορίες έργου</li>
  <li><strong>Help:</strong> Αυτό το παράθυρο βοήθειας</li>
</ul>`
};

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
