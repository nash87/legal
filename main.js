/* =============================================
   Legal Hub — Interactive
   InfraCraft design system · Phosphor icons
   Theme · Language · Scroll fade-in · A11y
   ============================================= */

var THEME_KEY = 'theme';
var LANG_KEY  = 'lang';

/* ─── Phosphor SVG icons ─── */
var SUN_SVG  = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>';
var MOON_SVG = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106.08,106.08,0,0,0,224,215a89,89,0,0,1-35.1-24.66Z"/></svg>';

/* ─── Announce to screen reader ─── */
function announce(msg) {
  var el = document.getElementById('a11y-live');
  if (!el) return;
  el.textContent = '';
  requestAnimationFrame(function () { el.textContent = msg; });
}

/* ─── Theme ─── */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var isDark = theme === 'dark';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.innerHTML = isDark
    ? SUN_SVG  + '<span class="sr-only">Switch to light mode</span>'
    : MOON_SVG + '<span class="sr-only">Switch to dark mode</span>';
}

/* ─── Language ─── */
function applyLang(lang) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  var btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.setAttribute('aria-label', lang === 'en' ? 'Switch to German' : 'Switch to English');
  var span = btn.querySelector('[data-en]');
  if (span) span.textContent = lang === 'en' ? 'DE' : 'EN';
}

/* ─── Scroll fade-in ─── */
function initFadeIn() {
  var items = document.querySelectorAll('.fi');
  if (!items.length) return;
  if (!window.IntersectionObserver) {
    items.forEach(function(el) { el.classList.add('vis'); });
    return;
  }
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  items.forEach(function(el) { io.observe(el); });
}

/* ─── DOMContentLoaded ─── */
document.addEventListener('DOMContentLoaded', function () {

  /* Init theme */
  var currentTheme = document.documentElement.dataset.theme || 'dark';
  applyTheme(currentTheme);

  /* Theme toggle */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      announce(next === 'dark' ? 'Dark mode on' : 'Light mode on');
    });
  }

  /* Init lang */
  var currentLang = document.documentElement.dataset.lang || 'en';
  applyLang(currentLang);

  /* Lang toggle */
  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = document.documentElement.dataset.lang === 'en' ? 'de' : 'en';
      applyLang(next);
      announce(next === 'de' ? 'Sprache: Deutsch' : 'Language: English');
    });
  }

  /* OS theme change listener — only if user has explicitly saved a preference */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
  });

  /* Fade-in */
  initFadeIn();
});
