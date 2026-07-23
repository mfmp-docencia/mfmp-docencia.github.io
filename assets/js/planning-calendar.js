(function () {
  var calendar = document.querySelector('.planning-calendar');

  if (!calendar) return;

  var eventSources = Array.prototype.slice.call(calendar.querySelectorAll('[data-planning-date]'));
  var events = eventSources.map(function (source) {
    return {
      date: parseDate(source.dataset.planningDate),
      dateKey: source.dataset.planningDate,
      type: source.dataset.planningType,
      typeLabel: source.dataset.planningTypeLabel,
      title: source.dataset.planningTitle,
      time: source.dataset.planningTime,
      status: source.dataset.planningStatus
    };
  });
  var viewButtons = Array.prototype.slice.call(calendar.querySelectorAll('[data-planning-view]'));
  var previousButton = calendar.querySelector('[data-planning-direction="previous"]');
  var nextButton = calendar.querySelector('[data-planning-direction="next"]');
  var periodLabel = calendar.querySelector('.planning-period-label');
  var grid = calendar.querySelector('.planning-calendar-grid');
  var emptyMessage = calendar.querySelector('.planning-empty');
  var courseStart = parseDate(calendar.dataset.startsOn);
  var courseEnd = parseDate(calendar.dataset.endsOn);
  var cursor = new Date(courseStart.getTime());
  var activeView = 'week';
  var dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  function parseDate(value) {
    var parts = value.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function dateKey(date) {
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + month + '-' + day;
  }

  function startOfWeek(date) {
    var result = new Date(date.getTime());
    var day = result.getDay() || 7;
    result.setDate(result.getDate() - day + 1);
    return result;
  }

  function endOfWeek(date) {
    var result = startOfWeek(date);
    result.setDate(result.getDate() + 5);
    return result;
  }

  function periodBounds() {
    if (activeView === 'month') {
      return {
        start: new Date(cursor.getFullYear(), cursor.getMonth(), 1),
        end: new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0)
      };
    }

    return { start: startOfWeek(cursor), end: endOfWeek(cursor) };
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' }).format(date);
  }

  function updateLabel(bounds) {
    if (activeView === 'month') {
      periodLabel.textContent = new Intl.DateTimeFormat('es-CL', { month: 'long', year: 'numeric' }).format(bounds.start);
      return;
    }

    periodLabel.textContent = formatDate(bounds.start) + ' – ' + formatDate(bounds.end);
  }

  function createEvent(event) {
    var item = document.createElement('div');
    var type = document.createElement('span');
    var title = document.createElement('strong');
    item.className = 'planning-grid-event planning-grid-event--' + event.type;
    type.className = 'planning-grid-event-type';
    type.textContent = event.typeLabel + (event.status === 'example' ? ' · Ejemplo' : '');
    title.textContent = event.title;
    item.appendChild(type);
    item.appendChild(title);

    if (event.time) {
      var time = document.createElement('span');
      time.textContent = event.time;
      item.appendChild(time);
    }

    return item;
  }

  function createDayCell(date, bounds) {
    var cell = document.createElement('div');
    var heading = document.createElement('div');
    var matchingEvents = events.filter(function (event) { return event.dateKey === dateKey(date); });
    var dayIndex = (date.getDay() + 6) % 7;
    cell.className = 'planning-grid-day';
    cell.setAttribute('role', 'gridcell');
    heading.className = 'planning-grid-day-heading';
    heading.innerHTML = '<span>' + dayNames[dayIndex] + '</span><strong>' + date.getDate() + '</strong>';
    cell.appendChild(heading);

    if (activeView === 'month' && date.getMonth() !== bounds.start.getMonth()) {
      cell.classList.add('planning-grid-day--outside');
    }
    if (date < courseStart || date > courseEnd) {
      cell.classList.add('planning-grid-day--inactive');
    }

    matchingEvents.forEach(function (event) { cell.appendChild(createEvent(event)); });
    return cell;
  }

  function renderGrid(bounds) {
    var date = new Date(bounds.start.getTime());
    var visibleCount = 0;
    var renderedCells = 0;
    grid.replaceChildren();
    grid.dataset.view = activeView;

    if (activeView === 'month') {
      var firstDay = bounds.start.getDay();
      var leadingCells = firstDay === 0 ? 0 : (firstDay + 6) % 7;
      for (var leading = 0; leading < leadingCells; leading += 1) {
        grid.appendChild(createEmptyCell());
        renderedCells += 1;
      }
    }

    while (date <= bounds.end) {
      if (date.getDay() !== 0) {
        grid.appendChild(createDayCell(date, bounds));
        visibleCount += events.filter(function (event) { return event.dateKey === dateKey(date); }).length;
        renderedCells += 1;
      }
      date.setDate(date.getDate() + 1);
    }

    if (activeView === 'month') {
      while (renderedCells % 6 !== 0) {
        grid.appendChild(createEmptyCell());
        renderedCells += 1;
      }
    }

    emptyMessage.hidden = visibleCount !== 0;
  }

  function createEmptyCell() {
    var cell = document.createElement('div');
    cell.className = 'planning-grid-day planning-grid-day--empty';
    cell.setAttribute('aria-hidden', 'true');
    return cell;
  }

  function updateCalendar() {
    var bounds = periodBounds();
    updateLabel(bounds);
    renderGrid(bounds);
    previousButton.disabled = bounds.start <= courseStart;
    nextButton.disabled = bounds.end >= courseEnd;
  }

  viewButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeView = button.dataset.planningView;
      viewButtons.forEach(function (candidate) {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      });
      updateCalendar();
    });
  });

  previousButton.addEventListener('click', function () {
    if (activeView === 'month') cursor.setMonth(cursor.getMonth() - 1);
    else cursor.setDate(cursor.getDate() - 7);
    if (cursor < courseStart) cursor = new Date(courseStart.getTime());
    updateCalendar();
  });

  nextButton.addEventListener('click', function () {
    if (activeView === 'month') cursor.setMonth(cursor.getMonth() + 1);
    else cursor.setDate(cursor.getDate() + 7);
    if (cursor > courseEnd) cursor = new Date(courseEnd.getTime());
    updateCalendar();
  });

  updateCalendar();
}());
