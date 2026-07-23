(function () {
  var viewer = document.querySelector('[data-lesson-pages]');
  var viewerShell = document.querySelector('[data-lesson-viewer]');
  var fullscreenButton = document.querySelector('[data-lesson-fullscreen]');
  if (!viewer) return;

  var groups = [[]];

  Array.from(viewer.childNodes).forEach(function (node) {
    if (node.nodeType === Node.COMMENT_NODE && node.nodeValue.trim() === 'page') {
      if (groups[groups.length - 1].some(function (item) {
        return item.nodeType !== Node.TEXT_NODE || item.textContent.trim();
      })) {
        groups.push([]);
      }
      return;
    }

    groups[groups.length - 1].push(node);
  });

  groups = groups.filter(function (group) {
    return group.some(function (node) {
      return node.nodeType !== Node.TEXT_NODE || node.textContent.trim();
    });
  });

  viewer.textContent = '';

  var pages = groups.map(function (group, index) {
    var page = document.createElement('section');
    page.className = 'lesson-page';
    page.dataset.lessonPage = String(index);
    page.setAttribute('aria-label', 'Página ' + (index + 1) + ' de ' + groups.length);
    page.hidden = index !== 0;
    group.forEach(function (node) { page.appendChild(node); });
    viewer.appendChild(page);
    return page;
  });

  var controls = document.createElement('nav');
  controls.className = 'lesson-viewer-controls';
  controls.setAttribute('aria-label', 'Navegación del contenido de la clase');
  controls.innerHTML = [
    '<button type="button" data-lesson-previous>← Anterior</button>',
    '<p aria-live="polite"><span data-lesson-current>1</span> de ' + pages.length + '</p>',
    '<button type="button" data-lesson-next>Siguiente →</button>'
  ].join('');
  viewer.after(controls);

  if (!viewerShell || !viewerShell.requestFullscreen || !document.exitFullscreen) {
    if (fullscreenButton) fullscreenButton.hidden = true;
  } else if (fullscreenButton) {
    fullscreenButton.addEventListener('click', function () {
      if (document.fullscreenElement === viewerShell) {
        document.exitFullscreen();
      } else {
        viewerShell.requestFullscreen();
      }
    });

    document.addEventListener('fullscreenchange', function () {
      var isFullscreen = document.fullscreenElement === viewerShell;
      fullscreenButton.setAttribute(
        'aria-label',
        isFullscreen ? 'Salir de pantalla completa' : 'Ver contenido en pantalla completa'
      );
      fullscreenButton.setAttribute(
        'title',
        isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'
      );
      fullscreenButton.classList.toggle('is-fullscreen', isFullscreen);
    });
  }

  var previousButton = controls.querySelector('[data-lesson-previous]');
  var nextButton = controls.querySelector('[data-lesson-next]');
  var currentLabel = controls.querySelector('[data-lesson-current]');
  var currentIndex = 0;

  function showPage(index) {
    currentIndex = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach(function (page, pageIndex) {
      page.hidden = pageIndex !== currentIndex;
    });
    currentLabel.textContent = String(currentIndex + 1);
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === pages.length - 1;
  }

  previousButton.addEventListener('click', function () {
    showPage(currentIndex - 1);
  });

  nextButton.addEventListener('click', function () {
    showPage(currentIndex + 1);
  });

  viewer.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') showPage(currentIndex - 1);
    if (event.key === 'ArrowRight') showPage(currentIndex + 1);
  });

  showPage(0);
}());
