---
layout: default
title: Inicio
description: Cursos y recursos docentes publicados en MFMP Docencia.
---

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-content">
      <p class="eyebrow">Enseñar · Compartir · Aprender</p>
      <h1>MFMP Docencia</h1>
      <p class="hero-summary">Un espacio para enseñar, compartir y aprender.</p>
      <a class="button" href="{{ '/courses/' | relative_url }}">Explorar cursos</a>
    </div>
    <div class="hero-illustration" aria-hidden="true">
      <svg viewBox="0 0 360 260" role="img">
        <path d="M35 61c54-17 102-6 145 30v133c-40-31-88-43-145-28V61Z"/>
        <path d="M325 61c-54-17-102-6-145 30v133c40-31 88-43 145-28V61Z"/>
        <path d="M180 91v133M63 88c38-8 67 0 92 18M63 119c38-8 67 0 92 18M63 150c38-8 67 0 92 18M297 88c-38-8-67 0-92 18M297 119c-38-8-67 0-92 18M297 150c-38-8-67 0-92 18"/>
        <path class="accent-stroke" d="M325 74c20 3 31 13 31 30v116c-65-14-121-5-176 26C125 215 69 206 4 220V104c0-17 11-27 31-30"/>
      </svg>
    </div>
  </div>
</section>

<section class="section container intro-grid" aria-labelledby="presentacion">
  <div>
    <p class="eyebrow">Presentación</p>
    <h2 id="presentacion">Contenido que crece junto a cada curso</h2>
  </div>
  <div>
    <p>MFMP Docencia conserva el contenido permanente de cada curso y separa su conocimiento reusable de la planificación de cada periodo académico.</p>
    <p>Así, los materiales pueden crecer con el tiempo sin perder claridad, contexto ni historial.</p>
  </div>
</section>

<section class="section section-tinted" aria-labelledby="cursos-destacados">
  <div class="container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Cursos</p>
        <h2 id="cursos-destacados">Comienza por aquí</h2>
      </div>
      <a class="text-link" href="{{ '/courses/' | relative_url }}">Ver todos los cursos <span aria-hidden="true">→</span></a>
    </div>

    <div class="card-grid">
      {% for course in site.data.courses %}
        <article class="course-card">
          <p class="course-code">{{ course.code }}</p>
          <h3><a href="{{ '/courses/' | append: course.id | append: '/' | relative_url }}">{{ course.name }}</a></h3>
          {% for career in site.data.careers %}
            {% if career.id == course.career_id %}<p>{{ career.name }}</p>{% endif %}
          {% endfor %}
          <a class="card-link" href="{{ '/courses/' | append: course.id | append: '/' | relative_url }}" aria-label="Ir al curso {{ course.name }}">Ir al curso <span aria-hidden="true">→</span></a>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
