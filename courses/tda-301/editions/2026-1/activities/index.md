---
layout: default
title: Actividades TDA-301 · 2026-1
description: Actividades de la edición 2026-1 del curso TDA-301.
permalink: /tda-301/2026-1/actividades/
course_id: tda-301
edition_id: tda-301-2026-1
breadcrumb_label: Actividades
---

<header class="page-header container">
  <p class="eyebrow">TDA-301 · Edición 2026-1</p>
  <h1>Actividades</h1>
  <p>Ejercicios, evaluaciones y otras actividades correspondientes a esta edición.</p>
</header>

<section class="section container" aria-labelledby="actividades-curso">
  <h2 id="actividades-curso">Actividades de la edición</h2>
  <div class="course-content-classes">
    {% for edition_activities in site.data.edition_activities %}
      {% if edition_activities.edition_id == page.edition_id %}
        {% for activity in edition_activities.activities %}
          {% if activity.status == 'publish' %}
            <article id="{{ activity.id }}" class="course-content-class">
              <h3>{{ activity.title }}</h3>
              <p>{{ activity.description }}</p>
            </article>
          {% endif %}
        {% endfor %}
      {% endif %}
    {% endfor %}
  </div>
</section>
