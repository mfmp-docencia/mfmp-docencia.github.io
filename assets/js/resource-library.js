(function () {
  var filters = document.querySelector('[data-resource-filters]');
  var cards = Array.from(document.querySelectorAll('.resource-library-card'));
  var status = document.querySelector('[data-resource-filter-status]');
  var empty = document.querySelector('[data-resource-filter-empty]');

  if (!filters || !cards.length) return;

  var fields = {
    type: filters.querySelector('[data-resource-filter="type"]'),
    unit: filters.querySelector('[data-resource-filter="unit"]'),
    class: filters.querySelector('[data-resource-filter="class"]'),
    tag: filters.querySelector('[data-resource-filter="tag"]')
  };

  function addOptions(select, entries) {
    var unique = new Map();
    entries.forEach(function (entry) {
      if (entry.value && !unique.has(entry.value)) unique.set(entry.value, entry.label);
    });
    Array.from(unique.entries())
      .sort(function (left, right) { return left[1].localeCompare(right[1], 'es'); })
      .forEach(function (entry) {
        var option = document.createElement('option');
        option.value = entry[0];
        option.textContent = entry[1];
        select.appendChild(option);
      });
  }

  addOptions(fields.type, cards.map(function (card) {
    return { value: card.dataset.resourceType, label: card.dataset.resourceTypeLabel };
  }));
  addOptions(fields.unit, cards.map(function (card) {
    return { value: card.dataset.resourceUnit, label: card.dataset.resourceUnitLabel };
  }));
  addOptions(fields.class, cards.map(function (card) {
    return { value: card.dataset.resourceClass, label: card.dataset.resourceClassLabel };
  }));

  var tagEntries = [];
  cards.forEach(function (card) {
    card.dataset.resourceTags.trim().split(/\s+/).filter(Boolean).forEach(function (tag) {
      tagEntries.push({ value: tag, label: tag });
    });
  });
  addOptions(fields.tag, tagEntries);

  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var tags = card.dataset.resourceTags.trim().split(/\s+/).filter(Boolean);
      var matches =
        (!fields.type.value || card.dataset.resourceType === fields.type.value) &&
        (!fields.unit.value || card.dataset.resourceUnit === fields.unit.value) &&
        (!fields.class.value || card.dataset.resourceClass === fields.class.value) &&
        (!fields.tag.value || tags.includes(fields.tag.value));
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    status.textContent = visible === 1 ? '1 recurso disponible.' : visible + ' recursos disponibles.';
    empty.hidden = visible !== 0;
  }

  filters.addEventListener('change', applyFilters);
  filters.addEventListener('reset', function () {
    window.setTimeout(applyFilters, 0);
  });

  applyFilters();
}());
