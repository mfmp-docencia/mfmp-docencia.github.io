---
layout: default
title: Taller de Programación para el Análisis de Datos
description: Página del curso TDA-301.
permalink: /tda-301/
course_id: tda-301
---

<header class="page-header container">
  <p class="eyebrow">TDA-301</p>
  <h1>Taller de Programación para el Análisis de Datos</h1>
  <p>Técnico en Análisis de Datos</p>
</header>

<section class="section container intro-grid" aria-labelledby="contenido-curso">
  <div>
    <p class="eyebrow">Curso</p>
    <h2 id="contenido-curso">Contenido permanente</h2>
  </div>
  <p>Esta página reúne la definición y los recursos reutilizables del curso. El contenido académico se incorporará aquí a medida que sea confirmado.</p>
</section>

<section class="section section-tinted" aria-labelledby="ediciones">
  <div class="container">
    <p class="eyebrow">Calendario del curso</p>
    <h2 id="ediciones">Ediciones</h2>
    <div class="card-grid">
      {% for edition in site.data.editions %}
        {% if edition.course_id == 'tda-301' %}
          {% assign edition_url = '/' | append: page.course_id | append: '/' | append: edition.path | append: '/' %}
          <article class="course-card">
            <p class="course-code">Periodo {{ edition.period }}</p>
            <h3><a href="{{ edition_url | relative_url }}">Calendario de la edición</a></h3>
            <p>Desde el {{ edition.starts_on | date: '%d-%m-%Y' }} hasta el {{ edition.ends_on | date: '%d-%m-%Y' }}.</p>
            <a class="card-link" href="{{ edition_url | relative_url }}">Ver calendario <span aria-hidden="true">→</span></a>
          </article>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>
