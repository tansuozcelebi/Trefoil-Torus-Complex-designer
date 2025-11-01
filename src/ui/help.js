// Help content - bilingual
const help_tr = `<h3>Hızlı Yardım</h3>
<p><strong>Fare Kontrolleri:</strong></p>
<ul>
  <li><strong>Sol tık + sürükle:</strong> Nesneyi döndür</li>
  <li><strong>Orta tık + sürükle:</strong> Sahneyi döndür</li>
  <li><strong>Tekerlek:</strong> Yakınlaştır/Uzaklaştır</li>
  <li><strong>Sağ tık + sürükle:</strong> Sahneyi kaydır</li>
</ul>
<p><strong>Klavye Kısayolları:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil Knot</li>
  <li><kbd>S</kbd> - Septafoil Knot</li>
  <li><kbd>G</kbd> - Zemin Görünümünü Değiştir</li>
  <li><kbd>A</kbd> - Hakkında Paneli</li>
  <li><kbd>H</kbd> - Yardım Paneli</li>
  <li><kbd>M</kbd> - GUI Menüsü</li>
</ul>
<p><strong>Dokunmatik Cihazlar:</strong></p>
<ul>
  <li>Ekranın sağ üst köşesindeki <strong>gizmo menüsünü</strong> kullanın</li>
  <li>Gizmo'yu sürükleyerek konumlandırabilirsiniz</li>
  <li>+/− düğmeleri ile pozisyon ve rotasyonu ayarlayın</li>
</ul>`;

const help_en = `<h3>Quick Help</h3>
<p><strong>Mouse Controls:</strong></p>
<ul>
  <li><strong>Left click + drag:</strong> Rotate object</li>
  <li><strong>Middle click + drag:</strong> Rotate scene</li>
  <li><strong>Wheel:</strong> Zoom in/out</li>
  <li><strong>Right click + drag:</strong> Pan scene</li>
</ul>
<p><strong>Keyboard Shortcuts:</strong></p>
<ul>
  <li><kbd>T</kbd> - Trefoil Knot</li>
  <li><kbd>S</kbd> - Septafoil Knot</li>
  <li><kbd>G</kbd> - Cycle Ground Style</li>
  <li><kbd>A</kbd> - About Panel</li>
  <li><kbd>H</kbd> - Help Panel</li>
  <li><kbd>M</kbd> - Toggle GUI Menu</li>
</ul>
<p><strong>Touch Devices:</strong></p>
<ul>
  <li>Use the <strong>gizmo menu</strong> in the top-right corner</li>
  <li>Drag the gizmo to reposition it</li>
  <li>Adjust position and rotation with +/− buttons</li>
</ul>`;

let currentLang = localStorage.getItem('tc_lang') || 'tr';

export function getHelpHtml(lang) {
  if (lang) {
    currentLang = lang;
    localStorage.setItem('tc_lang', lang);
  }
  return currentLang === 'en' ? help_en : help_tr;
}

export function setLanguage(lang) {
  if (lang === 'tr' || lang === 'en') {
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
