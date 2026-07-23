(function () {
  var sidebar = document.querySelector('.course-sidebar-disclosure');
  var navigation = document.querySelector('[data-course-sidebar-nav]');
  var mobileQuery = window.matchMedia('(max-width: 42rem)');

  if (!sidebar) return;

  function updateInitialState(event) {
    sidebar.open = !event.matches;
  }

  updateInitialState(mobileQuery);
  mobileQuery.addEventListener('change', updateInitialState);

  function updateAnchorState() {
    if (!navigation) return;

    var anchorLinks = navigation.querySelectorAll('[data-course-anchor]');
    var contentPath = navigation.dataset.contentPath;
    var activeId = window.location.pathname === contentPath
      ? window.location.hash.replace(/^#/, '')
      : '';

    anchorLinks.forEach(function (link) {
      if (link.dataset.courseAnchor === activeId) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  updateAnchorState();
  window.addEventListener('hashchange', updateAnchorState);
}());
