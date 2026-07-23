---
layout: default
title: Contenidos TDA-301
description: Unidades y clases del curso TDA-301.
permalink: /tda-301/contenidos/
course_id: tda-301
---

<header class="page-header container">
  <p class="eyebrow">TDA-301</p>
  <h1>Contenidos</h1>
  <p>Organización de unidades y clases del curso.</p>
</header>

<section class="section container course-content-outline" aria-label="Unidades del curso">
  {% for course_content in site.data.course_content %}
    {% if course_content.course_id == page.course_id %}
      {% for unit in course_content.units %}
        <article id="{{ unit.id }}" class="course-content-unit">
          <p class="eyebrow">Unidad {{ unit.number }}</p>
          <h2>{{ unit.name }}</h2>
          <p class="unit-hours">{{ unit.class_hours }} horas de clases</p>
          <div class="course-expected-learnings">
            {% for expected_learning in unit.expected_learnings %}
              <section id="{{ expected_learning.id }}" class="course-expected-learning">
                <p class="eyebrow">Aprendizaje esperado {{ expected_learning.number }}</p>
                <h3>{{ expected_learning.statement }}</h3>
                <h4>Criterios de evaluación</h4>
                <ul>
                  {% for criterion in expected_learning.evaluation_criteria %}
                    <li>{{ criterion.statement }}</li>
                  {% endfor %}
                </ul>
              </section>
            {% endfor %}
          </div>
          <div class="course-class-tags" aria-label="Clases publicadas de la Unidad {{ unit.number }}">
            {% for edition in site.data.editions %}
              {% if edition.course_id == page.course_id %}
                {% if edition.current %}
                  {% for edition_classes in site.data.edition_classes %}
                    {% if edition_classes.edition_id == edition.id %}
                      {% for class in edition_classes.classes %}
                        {% if class.unit_id == unit.id %}
                          {% if class.status == 'publish' %}
                            <span id="{{ class.id }}" class="course-class-tag">{{ class.title }}</span>
                          {% endif %}
                        {% endif %}
                      {% endfor %}
                    {% endif %}
                  {% endfor %}
                {% endif %}
              {% endif %}
            {% endfor %}
          </div>
        </article>
      {% endfor %}
    {% endif %}
  {% endfor %}
</section>
