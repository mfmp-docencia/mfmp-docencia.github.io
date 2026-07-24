---
layout: default
title: Recursos TDA-301 · 2026-1
description: Recursos de la edición 2026-1 del curso TDA-301.
permalink: /tda-301/2026-1/recursos/
course_id: tda-301
edition_id: tda-301-2026-1
breadcrumb_label: Recursos
resource_library: true
---

<header class="page-header container">
  <p class="eyebrow">TDA-301 · Edición 2026-1</p>
  <h1>Recursos</h1>
  <p>Materiales, referencias y herramientas correspondientes a esta edición.</p>
</header>

<section class="section container" aria-labelledby="recursos-curso">
  <div class="section-heading resource-library-heading">
    <div>
      <p class="eyebrow">Biblioteca</p>
      <h2 id="recursos-curso">Recursos publicados</h2>
    </div>
    <p>Consulta los materiales disponibles para esta edición.</p>
  </div>

  {% assign has_published_resources = false %}
  {% for edition_resources in site.data.edition_resources %}
    {% if edition_resources.edition_id == page.edition_id %}
      {% for resource in edition_resources.resources %}
        {% if resource.status == 'publish' %}
          {% assign has_published_resources = true %}
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}

  {% if has_published_resources %}
  <form class="resource-filters" data-resource-filters>
    <label>
      <span>Tipo</span>
      <select data-resource-filter="type">
        <option value="">Todos</option>
      </select>
    </label>
    <label>
      <span>Unidad</span>
      <select data-resource-filter="unit">
        <option value="">Todas</option>
      </select>
    </label>
    <label>
      <span>Clase</span>
      <select data-resource-filter="class">
        <option value="">Todas</option>
      </select>
    </label>
    <label>
      <span>Etiqueta</span>
      <select data-resource-filter="tag">
        <option value="">Todas</option>
      </select>
    </label>
    <button type="reset">Limpiar filtros</button>
  </form>
  <p class="resource-filter-status" data-resource-filter-status aria-live="polite"></p>

  <div class="resource-library" aria-label="Listado de recursos publicados">
    {% for edition_resources in site.data.edition_resources %}
      {% if edition_resources.edition_id == page.edition_id %}
        {% for resource in edition_resources.resources %}
          {% if resource.status == 'publish' %}
            {% assign resource_unit_label = '' %}
            {% assign resource_class_label = '' %}
            {% for course_content in site.data.course_content %}
              {% if course_content.course_id == page.course_id %}
                {% for unit in course_content.units %}
                  {% if unit.id == resource.unit_id %}
                    {% assign resource_unit_label = 'Unidad ' | append: unit.number %}
                  {% endif %}
                {% endfor %}
              {% endif %}
            {% endfor %}
            {% for edition_classes in site.data.edition_classes %}
              {% if edition_classes.edition_id == page.edition_id %}
                {% for class in edition_classes.classes %}
                  {% if class.id == resource.class_id %}
                    {% assign resource_class_label = class.title %}
                  {% endif %}
                {% endfor %}
              {% endif %}
            {% endfor %}
    <article
      class="resource-library-card"
      data-resource-type="{{ resource.type }}"
      data-resource-type-label="{{ resource.type_label }}"
      data-resource-unit="{{ resource.unit_id }}"
      data-resource-unit-label="{{ resource_unit_label }}"
      data-resource-class="{{ resource.class_id }}"
      data-resource-class-label="{{ resource_class_label }}"
      data-resource-tags="{% for tag in resource.tags %}{{ tag }} {% endfor %}">
      <p class="eyebrow">{{ resource.type_label }}</p>
      <h3>{{ resource.title }}</h3>
      <p>{{ resource.description }}</p>
      {% if resource.format %}<p class="resource-format">{{ resource.format }}</p>{% endif %}
      {% if resource_class_label %}
      <p class="resource-context">{{ resource_unit_label }} · {{ resource_class_label }}</p>
      {% else %}
        {% if resource_unit_label %}<p class="resource-context">{{ resource_unit_label }}</p>{% endif %}
      {% endif %}
      {% if resource.url %}
        {% if resource.delivery == 'download' %}
      <a class="resource-action" href="{{ resource.url | relative_url }}" download="{{ resource.download_name }}">
        <span aria-hidden="true">↓</span> Descargar {{ resource.format }}
      </a>
        {% else %}
      <a class="resource-action" href="{{ resource.url }}">Abrir recurso</a>
        {% endif %}
      {% endif %}
    </article>
          {% endif %}
        {% endfor %}
      {% endif %}
    {% endfor %}
  </div>
  <p class="resource-filter-empty" data-resource-filter-empty hidden>No hay recursos que coincidan con los filtros seleccionados.</p>
  {% else %}
  <p class="resource-library-empty">Todavía no hay recursos publicados para esta edición.</p>
  {% endif %}
</section>
