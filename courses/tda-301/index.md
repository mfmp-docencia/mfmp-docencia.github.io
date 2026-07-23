---
layout: default
title: Taller de Programación para el Análisis de Datos
description: Página del curso TDA-301.
permalink: /tda-301/
course_id: tda-301
---

<header class="page-header container course-page-header">
  <p class="eyebrow">TDA-301</p>
  <h1>Taller de Programación para el Análisis de Datos</h1>
  <p class="career-tag">Técnico en Análisis de Datos</p>
</header>

<section class="section container course-overview" aria-labelledby="contenido-curso">
  <header class="section-heading course-overview-heading">
    <div>
      <p class="eyebrow">Curso</p>
      <h2 id="contenido-curso">Información del módulo</h2>
    </div>
  </header>
  {% for course in site.data.courses %}
    {% if course.id == page.course_id %}
      <div class="course-competencies">
        <section class="course-competency">
          <h3>Tributación a la Competencia del Perfil de Egreso</h3>
          <p>{{ course.profile_competency_contribution }}</p>
        </section>
        <section class="course-competency">
          <h3>Unidad de competencia</h3>
          <p>{{ course.competency_unit }}</p>
        </section>
      </div>
      <dl class="course-facts">
        <div><dt>Plan</dt><dd>{{ course.plan_year }}</dd></div>
        <div><dt>Semestre</dt><dd>{{ course.semester }}</dd></div>
        <div><dt>Horas de clases</dt><dd>{{ course.class_hours }}</dd></div>
        <div><dt>Créditos SCT-AIEP</dt><dd>{{ course.credits }}</dd></div>
        <div><dt>Modalidad</dt><dd>{{ course.modality }}</dd></div>
        <div><dt>Prerrequisito</dt><dd>{{ course.prerequisite }}</dd></div>
      </dl>
    {% endif %}
  {% endfor %}
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
