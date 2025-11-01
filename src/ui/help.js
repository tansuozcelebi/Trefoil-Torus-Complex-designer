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
