/* =============================================
   Legal Hub — Interactive
   Theme (dark/light) + Language (DE/EN) + A11y
   ============================================= */

/* Anti-flash IIFE — also inlined in each HTML <head> for instant apply */
(function () {
  var t = localStorage.getItem('legalTheme');
  var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = t || (d ? 'dark' : 'light');
  var l = localStorage.getItem('legalLang') || 'de';
  document.documentElement.lang = l;
})();

/* SVG icons */
var SUN_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
var MOON_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

var THEME_KEY = 'legalTheme';
var LANG_KEY  = 'legalLang';

/* Announce changes to screen readers via aria-live region */
function announce(msg) {
  var el = document.getElementById('a11y-live');
  if (!el) return;
  el.textContent = '';
  requestAnimationFrame(function () { el.textContent = msg; });
}

/* Apply theme and update toggle button */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var isDark = theme === 'dark';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.title = isDark ? 'Switch to light mode / Helles Design' : 'Switch to dark mode / Dunkles Design';
  btn.innerHTML = isDark
    ? SUN_ICON  + '<span class="sr-only">Switch to light mode</span>'
    : MOON_ICON + '<span class="sr-only">Switch to dark mode</span>';
}

/* Apply language and update lang buttons */
function applyLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    var active = btn.dataset.lang === lang;
    btn.setAttribute('aria-pressed', String(active));
  });
}

document.addEventListener('DOMContentLoaded', function () {
  /* --- Theme toggle --- */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    applyTheme(document.documentElement.dataset.theme || 'light');
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      announce(next === 'dark' ? 'Dunkles Design aktiviert · Dark mode on' : 'Helles Design aktiviert · Light mode on');
    });
  }

  /* --- Language toggle --- */
  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.dataset.lang;
      applyLang(lang);
      announce(lang === 'de' ? 'Sprache: Deutsch' : 'Language: English');
    });
  });

  /* Init lang button states */
  applyLang(document.documentElement.lang || 'de');

  /* --- OS theme-change listener --- */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});
