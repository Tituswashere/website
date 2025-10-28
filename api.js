// main.js — Self-contained Theme + Sidebar system
(function (global) {
  const ThemeAPI = {
    theme: localStorage.getItem("theme") || "dark",

    injectCSS() {
      if (document.querySelector("style[data-theme-style]")) return;

      const style = document.createElement("style");
      style.dataset.themeStyle = "true";
      style.textContent = `
/* === MATERIAL YOU DARK THEME COLORS === */
.dark {
  --md-sys-color-primary: rgb(170 199 255);
  --md-sys-color-surface-tint: rgb(170 199 255);
  --md-sys-color-on-primary: rgb(10 48 95);
  --md-sys-color-primary-container: rgb(40 71 119);
  --md-sys-color-on-primary-container: rgb(214 227 255);
  --md-sys-color-secondary: rgb(190 198 220);
  --md-sys-color-on-secondary: rgb(40 49 65);
  --md-sys-color-secondary-container: rgb(62 71 89);
  --md-sys-color-on-secondary-container: rgb(218 226 249);
  --md-sys-color-tertiary: rgb(221 188 224);
  --md-sys-color-on-tertiary: rgb(63 40 68);
  --md-sys-color-tertiary-container: rgb(87 62 92);
  --md-sys-color-on-tertiary-container: rgb(250 216 253);
  --md-sys-color-error: rgb(255 180 171);
  --md-sys-color-on-error: rgb(105 0 5);
  --md-sys-color-error-container: rgb(147 0 10);
  --md-sys-color-on-error-container: rgb(255 218 214);
  --md-sys-color-background: rgb(17 19 24);
  --md-sys-color-on-background: rgb(226 226 233);
  --md-sys-color-surface: rgb(17 19 24);
  --md-sys-color-on-surface: rgb(226 226 233);
  --md-sys-color-surface-variant: rgb(68 71 78);
  --md-sys-color-on-surface-variant: rgb(196 198 208);
  --md-sys-color-outline: rgb(142 144 153);
  --md-sys-color-outline-variant: rgb(68 71 78);
  --md-sys-color-shadow: rgb(0 0 0);
  --md-sys-color-scrim: rgb(0 0 0);
  --md-sys-color-inverse-surface: rgb(226 226 233);
  --md-sys-color-inverse-on-surface: rgb(46 48 54);
  --md-sys-color-inverse-primary: rgb(65 95 145);
  --md-sys-color-primary-fixed: rgb(214 227 255);
  --md-sys-color-on-primary-fixed: rgb(0 27 62);
  --md-sys-color-primary-fixed-dim: rgb(170 199 255);
  --md-sys-color-on-primary-fixed-variant: rgb(40 71 119);
  --md-sys-color-secondary-fixed: rgb(218 226 249);
  --md-sys-color-on-secondary-fixed: rgb(19 28 43);
  --md-sys-color-secondary-fixed-dim: rgb(190 198 220);
  --md-sys-color-on-secondary-fixed-variant: rgb(62 71 89);
  --md-sys-color-tertiary-fixed: rgb(250 216 253);
  --md-sys-color-on-tertiary-fixed: rgb(40 19 46);
  --md-sys-color-tertiary-fixed-dim: rgb(221 188 224);
  --md-sys-color-on-tertiary-fixed-variant: rgb(87 62 92);
  --md-sys-color-surface-dim: rgb(17 19 24);
  --md-sys-color-surface-bright: rgb(55 57 62);
  --md-sys-color-surface-container-lowest: rgb(12 14 19);
  --md-sys-color-surface-container-low: rgb(25 28 32);
  --md-sys-color-surface-container: rgb(29 32 36);
  --md-sys-color-surface-container-high: rgb(40 42 47);
  --md-sys-color-surface-container-highest: rgb(51 53 58);
}

/* === GLOBAL STYLES === */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
  font-family: 'Roboto', sans-serif;
  background: var(--md-sys-color-background);
  color: var(--md-sys-color-on-background);
  transition: background 0.3s, color 0.3s;
  overflow-x: hidden;
  margin: 0;
}

/* === SIDEBAR (Desktop) === */
sidebar-desktop {
  display: none;
}

@media (min-width: 768px) {
  sidebar-desktop {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: 240px;
    height: 100vh;
    background: var(--md-sys-color-surface-container);
    padding: 16px;
    box-shadow: 2px 0 8px rgba(0,0,0,0.2);
  }
  sidebar-desktop a {
    color: var(--md-sys-color-on-surface);
    text-decoration: none;
    padding: 10px 0;
  }
}

/* === SIDEBAR (Mobile) === */
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
  cursor: pointer;
  margin: 12px;
}

.hamburger div {
  height: 3px;
  background: var(--md-sys-color-on-background);
  border-radius: 2px;
  transition: 0.3s;
}

.hamburger.active div:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active div:nth-child(2) {
  opacity: 0;
}
.hamburger.active div:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

sidebar-mobile {
  position: fixed;
  top: 0;
  left: -250px;
  width: 220px;
  height: 100vh;
  background: var(--md-sys-color-surface-container);
  transition: left 0.3s ease;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

sidebar-mobile.open {
  left: 0;
}

sidebar-mobile a {
  text-decoration: none;
  color: var(--md-sys-color-on-surface);
  padding: 12px 0;
}
      `;
      document.head.appendChild(style);
    },

    applyTheme() {
      document.body.classList.add(this.theme);
    },

    init() {
      this.injectCSS();
      this.applyTheme();
      this.setupSidebar();
    },

    setupSidebar() {
      const burger = document.querySelector(".hamburger");
      const mobileSidebar = document.querySelector("sidebar-mobile");

      if (burger && mobileSidebar) {
        burger.addEventListener("click", () => {
          burger.classList.toggle("active");
          mobileSidebar.classList.toggle("open");
        });
      }
    }
  };

  global.ThemeAPI = ThemeAPI;
})(window);
