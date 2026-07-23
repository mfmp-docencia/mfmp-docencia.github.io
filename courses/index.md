---
layout: default
title: Cursos
description: Catálogo de cursos publicados en MFMP Docencia.
permalink: /courses/
---

<header class="page-header container">
  <p class="eyebrow">Catálogo</p>
  <h1>Cursos</h1>
  <p>Conoce los cursos disponibles y accede a su contenido permanente y a la planificación de sus ediciones.</p>
</header>

<section class="section container" aria-label="Cursos disponibles">
  <div class="card-grid">
    {% for course in site.data.courses %}
      <article class="course-card">
        <p class="course-code">{{ course.code }}</p>
        <h2><a href="{{ '/' | append: course.id | append: '/' | relative_url }}">{{ course.name }}</a></h2>
        {% for career in site.data.careers %}
          {% if career.id == course.career_id %}<p class="career-tag">{{ career.name }}</p>{% endif %}
        {% endfor %}
        <a class="card-link" href="{{ '/' | append: course.id | append: '/' | relative_url }}" aria-label="Ir al curso {{ course.name }}">Ir al curso <span aria-hidden="true">→</span></a>
      </article>
    {% endfor %}
  </div>
</section>
