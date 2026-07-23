(function () {
  var sidebar = document.querySelector('.course-sidebar-disclosure');
  var mobileQuery = window.matchMedia('(max-width: 42rem)');

  if (!sidebar) return;

  function updateInitialState(event) {
    sidebar.open = !event.matches;
  }

  updateInitialState(mobileQuery);
  mobileQuery.addEventListener('change', updateInitialState);
}());
