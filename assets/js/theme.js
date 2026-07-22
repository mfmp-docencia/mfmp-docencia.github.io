(function () {
  var toggle = document.querySelector('.theme-toggle');

  if (!toggle) return;

  var label = toggle.querySelector('.theme-label');

  function setTheme(theme, persist) {
    var isDark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    label.textContent = isDark ? 'Modo claro' : 'Modo oscuro';

    if (persist) {
      try {
        localStorage.setItem('mfmp-theme', theme);
      } catch (error) {
        // El modo sigue funcionando durante la sesión si el almacenamiento no está disponible.
      }
    }
  }

  setTheme(document.documentElement.dataset.theme || 'light', false);

  toggle.addEventListener('click', function () {
    var nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme, true);
  });
}());
