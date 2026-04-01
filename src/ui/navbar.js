/**
 * Navbar Module - Manages navigation bar, tabs, language selector, and mobile sidebar
 * This is extracted from mainapp.js to reduce file complexity
 */

import { getCurrentLanguage, setLanguage, languages, getTabLabel, getHelpHtml } from './help.js';
import { getAboutHtml } from './about.js';
import { tabs as TabsConfig } from './tabs.ts';

// Navbar setup - replaces ~600 lines from mainapp.js
export function setupNavbar() {
  const panels = {};
  const panelHideTimers = {};
  
  // Top navigation bar
  const navBar = document.createElement('div');
  navBar.style.cssText = `
    position: fixed;
    top: 12px;
    left: 12px;
    right: 12px;
    transform: none;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(20,20,22,0.7);
    padding: 6px 10px;
    border-radius: 8px;
    backdrop-filter: blur(6px);
    flex-wrap: nowrap;
    max-width: calc(100vw - 24px);
  `;
  document.body.appendChild(navBar);

  // Mobile overlay
  const mobileOverlay = document.createElement('div');
  mobileOverlay.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5); z-index: 1999; display: none;
    opacity: 0; transition: opacity 0.3s ease;
  `;
  document.body.appendChild(mobileOverlay);

  // Mobile sidebar
  const mobileSidebar = document.createElement('div');
  mobileSidebar.style.cssText = `
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 30%; min-width: 200px; max-width: 300px;
    background: rgba(15,15,20,0.95); backdrop-filter: blur(12px);
    z-index: 2000; transform: translateX(100%); transition: transform 0.3s ease;
    overflow-y: auto; padding: 20px;
    box-shadow: -4px 0 20px rgba(0,0,0,0.5);
  `;
  document.body.appendChild(mobileSidebar);

  // Hamburger button
  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.innerHTML = '☰';
  hamburgerBtn.style.cssText = `
    display: none; padding: 8px 12px; border: none;
    background: rgba(35,120,200,0.3); color: #fff; cursor: pointer;
    border-radius: 6px; font-size: 18px; line-height: 1;
    transition: background 0.2s ease; min-height: 44px; min-width: 44px;
    margin-left: auto;
  `;
  navBar.appendChild(hamburgerBtn);

  // Tab container
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tc-navbar-tabs';
  tabsContainer.style.cssText = `
    display: flex; align-items: center; gap: 6px; flex: 1;
    flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden;
    scroll-behavior: smooth; -webkit-overflow-scrolling: touch;
  `;
  navBar.appendChild(tabsContainer);

  // Active info display
  const activeInfo = document.createElement('div');
  activeInfo.style.cssText = `
    margin-left: 12px; color: #3fa7ff; font-size: 12px;
    flex-shrink: 0; order: -1;
  `;
  navBar.appendChild(activeInfo);

  // Helper: toggle mobile sidebar
  function toggleMobileSidebar(open) {
    hamburgerBtn.innerHTML = open ? '✕' : '☰';
    mobileSidebar.dataset.open = open ? 'true' : 'false';
    if (open) {
      mobileOverlay.style.display = 'block';
      setTimeout(() => (mobileOverlay.style.opacity = '1'), 10);
      mobileSidebar.style.transform = 'translateX(0)';
    } else {
      mobileOverlay.style.opacity = '0';
      mobileSidebar.style.transform = 'translateX(100%)';
      setTimeout(() => (mobileOverlay.style.display = 'none'), 300);
    }
  }

  mobileOverlay.addEventListener('click', () => toggleMobileSidebar(false));
  hamburgerBtn.addEventListener('click', () => {
    toggleMobileSidebar(mobileSidebar.dataset.open !== 'true');
  });

  // Helper: create styled tab button
  function makeTab(label) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText = `
      padding: 6px 10px; border: none; background: transparent;
      color: #fff; cursor: pointer; border-radius: 4px; position: relative;
      transition: background 0.25s ease, box-shadow 0.3s ease, transform 0.18s ease;
      box-shadow: 0 0 0px rgba(0,180,255,0); white-space: nowrap;
    `;
    btn.addEventListener('mouseenter', () => {
      if (!btn.dataset.active) {
        btn.style.background = 'rgba(35,120,200,0.18)';
        btn.style.boxShadow = '0 0 8px rgba(0,170,255,0.55), 0 0 16px rgba(0,120,255,0.35)';
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (!btn.dataset.active) {
        btn.style.background = 'transparent';
        btn.style.boxShadow = '0 0 0px rgba(0,180,255,0)';
      }
    });
    ['mousedown', 'touchstart'].forEach(evt => {
      btn.addEventListener(evt, () => (btn.style.transform = 'translateY(1px) scale(0.97)'));
    });
    ['mouseup', 'touchend'].forEach(evt => {
      btn.addEventListener(evt, () => (btn.style.transform = 'none'));
    });
    return btn;
  }

  // Helper: set panel visibility
  function setPanelVisible(key, visible) {
    if (!panels[key]) return;
    clearTimeout(panelHideTimers[key]);
    if (visible) {
      panels[key].style.display = 'block';
      setTimeout(() => {
        panels[key].style.opacity = '1';
        panels[key].style.transform = 'translateY(0px) scale(1)';
      }, 10);
    } else {
      panels[key].style.opacity = '0';
      panels[key].style.transform = 'translateY(-8px) scale(0.98)';
      panelHideTimers[key] = setTimeout(() => {
        panels[key].style.display = 'none';
      }, 220);
    }
  }

  // Helper: show specific tab
  function showTab(name) {
    Object.keys(panels).forEach(k => setPanelVisible(k, false));
    if (!panels[name]) return;
    
    const triggerBtn = document.querySelector(`button[data-tab="${name}"]`) ||
                       Array.from(document.querySelectorAll('button')).find(b => b.textContent === name);
    if (triggerBtn) {
      const rect = triggerBtn.getBoundingClientRect();
      const minW = 320;
      panels[name].style.minWidth = minW + 'px';
      let left = rect.left;
      let top = rect.bottom + 8;
      
      const pw = Math.max(panels[name].offsetWidth || 0, minW);
      if (left + pw > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - pw - 12);
      }
      panels[name].style.left = left + 'px';
      panels[name].style.top = top + 'px';
    }
    setPanelVisible(name, true);

    // Special handling for Scene tab
    if (name === 'Scene' && window.scenePanelAPI?.buildScenePresets) {
      try { window.scenePanelAPI.buildScenePresets(); } catch (e) {}
    }
    
    // Update active styling
    Array.from(document.querySelectorAll('button[data-tab]')).forEach(b => {
      if (b.textContent === name) {
        b.dataset.active = '1';
        b.style.background = 'rgba(35,120,200,0.28)';
        b.style.boxShadow = '0 0 10px rgba(0,200,255,0.75), 0 0 24px rgba(0,140,255,0.45)';
      } else {
        delete b.dataset.active;
        b.style.background = 'transparent';
        b.style.boxShadow = '0 0 0px rgba(0,0,0,0)';
      }
    });
  }

  // Add tab button
  function addTabButton(name) {
    const currentLang = getCurrentLanguage();
    const btn = makeTab(getTabLabel(name, currentLang));
    btn.dataset.tab = name;
    btn.addEventListener('click', () => {
      showTab(name);
      if (window.innerWidth <= 768) {
        toggleMobileSidebar(false);
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    tabsContainer.appendChild(btn);

    // Mobile version
    const mobileBtn = makeTab(getTabLabel(name, currentLang));
    mobileBtn.dataset.tab = name;
    mobileBtn.style.cssText = `width: 100%; margin-bottom: 8px; text-align: left; padding: 12px 16px; ${mobileBtn.style.cssText}`;
    mobileBtn.addEventListener('click', () => { showTab(name); toggleMobileSidebar(false); });
    mobileSidebar.appendChild(mobileBtn);

    // Create panel
    const panel = document.createElement('div');
    panel.style.cssText = `
      position: fixed; transform: translateY(-8px) scale(0.98); z-index: 999;
      background: rgba(15,15,20,0.65); backdrop-filter: blur(8px) saturate(120%);
      border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 28px rgba(0,0,0,0.35);
      color: #fff; padding: 12px; border-radius: 10px; min-width: 320px;
      max-height: 60vh; overflow: auto; opacity: 0; display: none;
      transition: transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1.2), opacity 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
    `;
    document.body.appendChild(panel);
    panels[name] = panel;
  }

  // Build tabs
  TabsConfig.left.forEach(addTabButton);
  const spacer = document.createElement('div');
  spacer.style.flex = '1';
  tabsContainer.appendChild(spacer);
  TabsConfig.right.forEach(addTabButton);
  TabsConfig.tail.forEach(addTabButton);

  // Language selector
  function updateLanguage(newLang) {
    setLanguage(newLang);
    const langBtn = document.querySelector('button[data-lang-selector]');
    const langData = languages.find(l => l.code === newLang);
    if (langBtn && langData) langBtn.innerHTML = `${langData.flag} ${newLang.toUpperCase()}`;
    
    document.querySelectorAll('button[data-tab]').forEach(btn => {
      btn.textContent = getTabLabel(btn.dataset.tab, newLang);
    });
    
    if (panels['Help']) panels['Help'].innerHTML = getHelpHtml(newLang);
    if (panels['About']) {
      const select = panels['About'].querySelector('#aboutLang');
      if (select) select.value = newLang;
      const content = panels['About'].querySelector('#aboutContent');
      if (content) content.innerHTML = getAboutHtml(newLang);
    }
    if (window.exportPanelAPI?.updateLanguage) window.exportPanelAPI.updateLanguage();
  }

  const langContainer = document.createElement('div');
  langContainer.style.position = 'relative';
  const currentLangData = languages.find(l => l.code === getCurrentLanguage()) || languages[0];
  
  const langBtn = document.createElement('button');
  langBtn.setAttribute('data-lang-selector', 'true');
  langBtn.innerHTML = `${currentLangData.flag} ${currentLangData.code.toUpperCase()}`;
  langBtn.style.cssText = `
    padding: 6px 10px; background: rgba(60,60,70,0.9); color: #fff;
    border: 1px solid rgba(100,100,120,0.5); border-radius: 6px; cursor: pointer;
    font-size: 11px; font-weight: 600; transition: all 0.2s;
  `;

  const langDropdown = document.createElement('div');
  langDropdown.style.cssText = `
    display: none; position: absolute; top: 100%; right: 0; margin-top: 4px;
    background: rgba(30,30,35,0.95); border: 1px solid rgba(100,100,120,0.5);
    border-radius: 6px; backdrop-filter: blur(8px); max-height: 400px; overflow-y: auto;
    z-index: 10000; min-width: 180px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  languages.forEach(lang => {
    const item = document.createElement('div');
    item.style.cssText = `
      padding: 8px 12px; cursor: pointer; transition: background 0.2s;
      display: flex; align-items: center; gap: 8px; font-size: 12px; color: #fff;
    `;
    item.innerHTML = `<span style="font-size:16px">${lang.flag}</span> <span>${lang.name}</span>`;
    item.addEventListener('mouseenter', () => (item.style.background = 'rgba(60,60,80,0.8)'));
    item.addEventListener('mouseleave', () => (item.style.background = 'transparent'));
    item.addEventListener('click', () => {
      updateLanguage(lang.code);
      langDropdown.style.display = 'none';
    });
    langDropdown.appendChild(item);
  });

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.style.display = langDropdown.style.display === 'none' ? 'block' : 'none';
  });
  langBtn.addEventListener('mouseenter', () => {
    langBtn.style.background = 'rgba(80,80,100,0.9)';
    langBtn.style.borderColor = 'rgba(120,120,150,0.7)';
  });
  langBtn.addEventListener('mouseleave', () => {
    langBtn.style.background = 'rgba(60,60,70,0.9)';
    langBtn.style.borderColor = 'rgba(100,100,120,0.5)';
  });
  
  document.addEventListener('click', () => { langDropdown.style.display = 'none'; });
  langContainer.appendChild(langBtn);
  langContainer.appendChild(langDropdown);
  tabsContainer.appendChild(langContainer);

  // Mobile language section
  const mobileLangSection = document.createElement('div');
  mobileLangSection.style.cssText = `margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);`;
  languages.forEach(lang => {
    const item = document.createElement('button');
    item.style.cssText = `
      width: 100%; padding: 12px 16px; cursor: pointer; transition: background 0.2s;
      display: flex; align-items: center; gap: 8px; font-size: 14px; color: #fff;
      background: transparent; border: none; border-radius: 6px; margin-bottom: 4px; text-align: left;
    `;
    item.innerHTML = `<span style="font-size:20px">${lang.flag}</span> <span>${lang.name}</span>`;
    item.addEventListener('mouseenter', () => (item.style.background = 'rgba(60,60,80,0.8)'));
    item.addEventListener('mouseleave', () => (item.style.background = 'transparent'));
    item.addEventListener('click', () => { updateLanguage(lang.code); toggleMobileSidebar(false); });
    mobileLangSection.appendChild(item);
  });
  mobileSidebar.appendChild(mobileLangSection);

  // Responsive handler
  function updateMobileMenu() {
    const isMobile = window.innerWidth <= 768;
    hamburgerBtn.style.display = isMobile ? 'block' : 'none';
    if (isMobile) {
      tabsContainer.style.display = 'none';
      activeInfo.style.fontSize = '10px';
      activeInfo.style.marginLeft = '6px';
      activeInfo.style.flex = '1';
    } else {
      tabsContainer.style.display = 'flex';
      activeInfo.style.fontSize = '12px';
      activeInfo.style.marginLeft = '12px';
      activeInfo.style.flex = '0';
      toggleMobileSidebar(false);
    }
  }
  window.addEventListener('resize', updateMobileMenu);
  updateMobileMenu();

  // Close panels on outside click
  window.addEventListener('pointerdown', (e) => {
    const inNav = navBar.contains(e.target);
    let inPanel = false;
    Object.values(panels).forEach(p => { if (p.contains(e.target)) inPanel = true; });
    if (!inNav && !inPanel) Object.keys(panels).forEach(k => setPanelVisible(k, false));
  });

  return { navBar, panels, toggleMobileSidebar, showTab, activeInfo, updateLanguage };
}
