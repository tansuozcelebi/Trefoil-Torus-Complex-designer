export const helpHtml = `
<h3>Quick Help / Hızlı Yardım</h3>
<ul>
  <li><strong>Object</strong> sekmesinden düğüm (knot) parametreleri ve malzeme (material) ayarlarını değiştirebilirsiniz.</li>
  <li><strong>Environment</strong> sekmesiyle zemin stilleri (Flat / Sea Wave / Mathematical surface / Room / Funnel) arasında geçiş yapın.</li>
  <li><strong>Scene</strong> sekmesi ön ayarlar (presets) ve yardımcı (helpers) anahtarlarını içerir.</li>
  <li>Fare ile sürükleyerek döndürün; tekerlek ile yakınlaştırın/uzaklaştırın. Hassas konumlandırma için 6-eksen kontrollerini kullanın.</li>
  <li><em>Export</em> içindeki <em>Screenshot</em> ile PNG, <em>Export GLB</em> ile 3B model dosyası kaydedin.</li>
  <li>Daha fazla bilgi için <strong>About</strong> sekmesine bakın.</li>
  <li>Sol altta Verts/Faces istatistikleri ve sürüm bilgisi görünür.</li>
  <li>Gelişmiş denetimler (dat.GUI) ilk açılışta gizlidir; <strong>Environment</strong> panelindeki “Advanced Controls (GUI)” anahtarıyla açıp kapatabilirsiniz.</li>
  
</ul>

<h4>Object (Nesne) Menüsü</h4>
<ul>
  <li><b>Object Type</b>: Trefoil, Septafoil, BaskınFoil (şerit).</li>
  <li><b>Parametreler</b>: a, b, p, q — şekli belirler; <b>tubeRadius</b> boru kalınlığını belirler.</li>
  <li><b>Segmentler</b>: uSegments (boyuna örnekleme), vSegments (kesit dilimleri). Bu değerler yüzey/vertex sayısını etkiler; düşük değerler performansı artırır.</li>
  <li><b>BaskınFoil</b> için <b>magnitude</b>: şerit genişliğinin genliği.</li>
  <li><b>Malzeme</b>: Metallic / Opaque / Transparent; <i>metalness</i>, <i>roughness</i>, <i>opacity</i>, <i>IOR</i>, <i>Transmission</i>, <i>Fresnel</i>, <i>Material Color</i> ve <i>Wireframe Color</i>.</li>
  <li><b>Wireframe</b>: View sekmesinden aç/kapat.</li>
</ul>

<h4>Environment (Ortam)</h4>
<ul>
  <li><b>Zemin stilleri</b>:
    <ul>
      <li><b>Flat</b>: düz zemin.</li>
      <li><b>Sea Wave</b>: shader ile animasyonlu deniz yüzeyi (GPU yükü artırabilir).</li>
      <li><b>Mathematical surface</b>: parametrik yüzey (wireframe rengi değiştirilebilir).</li>
      <li><b>Room</b>: oda benzeri kapalı ortam.</li>
      <li><b>Funnel</b>: huni benzeri formlu yüzey.</li>
    </ul>
  </li>
  <li><b>Reflection</b> (yansıma) yüzeyini aç/kapatın; <b>Reflector Opacity</b> ile opaklığı ayarlayın.</li>
  <li><b>Advanced Controls (GUI)</b>: dat.GUI panelini buradan görünür/gizli yapın.</li>
</ul>

<h4>Scene</h4>
<ul>
  <li><b>Presets</b>: örnek sahne ayarları (ör. showcase, studio).</li>
  <li><b>Helpers</b>: grid ve gölge alıcı (shadow receiver) görünürlüğünü değiştirir.</li>
</ul>

<h4>View (Görünüm)</h4>
<ul>
  <li><b>Auto Rotate</b> ve <b>Rotation Speed</b>.</li>
  <li><b>Wireframe</b> aç/kapat.</li>
</ul>

<h4>Lighting (Aydınlatma)</h4>
<ul>
  <li><b>Spot Intensity</b>, <b>Ambient Intensity</b>, <b>EnvMap Intensity</b>.</li>
  <li><b>Reflector Opacity</b> (yansıma yüzeyinin opaklığı).</li>
</ul>

<h4>UCS Gizmo</h4>
<ul>
  <li>Sol alttaki eksen diskine tıklayarak kamerayı X/Y/Z yönlerine hizalayın.</li>
  <li><b>Shift</b> basılıyken tıklarsanız negatif yöne hizalanır.</li>
  <li>Üzerine gelince vurgulanır; tıklamayla anında geçiş yapar.</li>
</ul>

<h4>Keyboard Shortcuts</h4>
<table style="min-width:320px">
<tr><th>Key</th><th>Action</th></tr>
<tr><td>W/S</td><td>posY up/down</td></tr>
<tr><td>A/D</td><td>posX left/right</td></tr>
<tr><td>Q/E</td><td>posZ forward/back</td></tr>
<tr><td>I/K</td><td>a increase/decrease</td></tr>
<tr><td>J/L</td><td>b decrease/increase</td></tr>
<tr><td>U/O</td><td>p decrease/increase</td></tr>
<tr><td>N/M</td><td>q decrease/increase</td></tr>
</table>
<p><b>Shift</b> ile konum değişikliklerinde daha büyük adımlar kullanılır.</p>

<h4>İstatistikler</h4>
<p>Sol alt köşede Verts/Faces değerleri ve uygulama sürümü görünür; uSegments/vSegments ve parametre değişikliklerinde otomatik güncellenir.</p>
`;
