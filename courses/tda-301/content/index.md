---
layout: default
title: Contenidos TDA-301
description: Unidades y clases del curso TDA-301.
permalink: /tda-301/contenidos/
course_id: tda-301
---

<header class="page-header container content-page-header">
  <p class="eyebrow">TDA-301</p>
  <h1>Contenidos</h1>
  <p>Organización de unidades y clases del curso.</p>
</header>

<section class="section container course-content-outline" aria-label="Unidades del curso">
  {% for course_content in site.data.course_content %}
    {% if course_content.course_id == page.course_id %}
      {% for unit in course_content.units %}
        <article class="course-content-unit course-content-unit-summary">
          <p class="eyebrow">Unidad {{ unit.number }}</p>
          <h2>{{ unit.name }}</h2>
          <p class="unit-hours">{{ unit.class_hours }} horas de clases</p>
          <p>Consulta sus aprendizajes esperados y criterios de evaluación.</p>
          <a class="button-link" href="{{ '/tda-301/contenidos/unidad-' | append: unit.number | append: '/' | relative_url }}">Ver Unidad {{ unit.number }}</a>
        </article>
      {% endfor %}
    {% endif %}
  {% endfor %}
</section>
