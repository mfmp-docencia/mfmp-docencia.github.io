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
    var unitBreadcrumb = document.querySelector('[data-breadcrumb-unit]');
    var classBreadcrumbs = document.querySelectorAll('[data-breadcrumb-class]');
    var activeId = window.location.hash.replace(/^#/, '');
    var hasActiveClass = false;

    anchorLinks.forEach(function (link) {
      if (window.location.pathname === link.dataset.coursePath && link.dataset.courseAnchor === activeId) {
        link.setAttribute('aria-current', 'location');
        hasActiveClass = true;
      } else {
        link.removeAttribute('aria-current');
      }
    });

    classBreadcrumbs.forEach(function (item) {
      var isActive = item.dataset.breadcrumbClass === activeId;
      item.hidden = !isActive;
      if (isActive) hasActiveClass = true;
    });

    if (unitBreadcrumb) {
      if (hasActiveClass) {
        unitBreadcrumb.removeAttribute('aria-current');
      } else {
        unitBreadcrumb.setAttribute('aria-current', 'page');
      }
    }
  }

  updateAnchorState();
  window.addEventListener('hashchange', updateAnchorState);
}());
