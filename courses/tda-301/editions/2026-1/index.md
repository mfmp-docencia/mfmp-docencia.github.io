---
layout: default
title: Calendario TDA-301 · 2026-1
description: Calendario de la edición 2026-1 del curso TDA-301.
permalink: /tda-301/2026-1/
course_id: tda-301
edition_id: tda-301-2026-1
planning_calendar: true
breadcrumb_label: Calendario
---

{% assign current_edition = nil %}
{% for edition in site.data.editions %}
  {% if edition.id == page.edition_id %}
    {% assign current_edition = edition %}
  {% endif %}
{% endfor %}

{% assign current_planning = nil %}
{% for planning in site.data.planning %}
  {% if planning.edition_id == page.edition_id %}
    {% assign current_planning = planning %}
  {% endif %}
{% endfor %}

<header class="page-header container">
  <p class="eyebrow">TDA-301 · Edición 2026-1</p>
  <h1>Calendario del curso</h1>
  <p>Planificación temporal de la edición 2026-1.</p>
</header>

<section class="section container edition-calendar-content" aria-label="Calendarios de la edición">
  <div class="edition-planning" aria-labelledby="planificacion">
    <p class="eyebrow">Calendario del curso</p>
    <h2 id="planificacion">Planificación</h2>
    <p class="edition-date-range">Desde el {{ current_edition.starts_on | date: '%d-%m-%Y' }} hasta el {{ current_edition.ends_on | date: '%d-%m-%Y' }}.</p>
    <div class="planning-calendar" data-starts-on="{{ current_edition.starts_on | date: '%Y-%m-%d' }}" data-ends-on="{{ current_edition.ends_on | date: '%Y-%m-%d' }}">
      <div class="planning-calendar-toolbar">
        <div class="planning-view-toggle" aria-label="Vista del calendario">
          <button type="button" data-planning-view="week" aria-pressed="true">Semana</button>
          <button type="button" data-planning-view="month" aria-pressed="false">Mes</button>
        </div>
        <div class="planning-navigation">
          <button type="button" data-planning-direction="previous" aria-label="Periodo anterior">←</button>
          <p class="planning-period-label" aria-live="polite"></p>
          <button type="button" data-planning-direction="next" aria-label="Periodo siguiente">→</button>
        </div>
      </div>
      <p class="planning-example-note">Datos de demostración para revisar el componente. Se reemplazarán por la planificación confirmada.</p>
      <div class="planning-grid-wrapper" tabindex="0" aria-label="Cuadrícula desplazable de la planificación">
        <div class="planning-calendar-grid" role="grid" aria-live="polite"></div>
      </div>
      <div class="planning-events-source" hidden>
        {% for event in current_planning.events %}
          <span
            data-planning-date="{{ event.starts_on | date: '%Y-%m-%d' }}"
            data-planning-type="{{ event.type }}"
            data-planning-type-label="{{ event.type_label }}"
            data-planning-title="{{ event.title }}"
            data-planning-time="{% if event.starts_at %}{{ event.starts_at }}{% if event.ends_at %}–{{ event.ends_at }}{% endif %}{% endif %}"
            data-planning-status="{{ event.status }}"
          ></span>
        {% endfor %}
        {% for period in site.data.academic_calendar.periods %}
          {% if period.id == current_edition.academic_calendar_period_id %}
            {% for event in period.events %}
              {% for relevant_event_id in current_edition.academic_calendar_event_ids %}
                {% if relevant_event_id == event.id %}
                  <span
                    data-planning-date="{{ event.starts_on | date: '%Y-%m-%d' }}"
                    data-planning-type="{{ event.type }}"
                    data-planning-type-label="{% if event.type == 'holiday' %}Feriado{% else %}Pausa académica{% endif %}"
                    data-planning-title="{{ event.title }}"
                    data-planning-time=""
                    data-planning-status="official"
                  ></span>
                {% endif %}
              {% endfor %}
            {% endfor %}
          {% endif %}
        {% endfor %}
      </div>
      <p class="planning-empty" hidden>No hay eventos de planificación en este periodo.</p>
      <noscript><p class="source-note">Activa JavaScript para filtrar la planificación por semana o mes.</p></noscript>
    </div>
  </div>

  <div class="academic-calendar-section">
    <p class="academic-calendar-intro">Revisa acá el calendario académico.</p>
    <details class="academic-calendar-disclosure">
      <summary>
        <span>
          <span class="eyebrow">AIEP · {{ site.data.academic_calendar.year }}</span>
          <strong>Calendario académico</strong>
        </span>
        <span class="disclosure-action">Ver fechas institucionales <span aria-hidden="true">↓</span></span>
      </summary>
      <div class="academic-calendar-disclosure-content">
        {% for period in site.data.academic_calendar.periods %}
          {% if period.id == current_edition.academic_calendar_period_id %}
            <p class="academic-period-title">{{ period.title }} · Fechas relevantes para esta edición</p>
            <ol class="academic-calendar-list">
              {% for event in period.events %}
                {% for relevant_event_id in current_edition.academic_calendar_event_ids %}
                  {% if relevant_event_id == event.id %}
                    <li class="academic-calendar-event academic-calendar-event--{{ event.type }}">
                      <p class="calendar-date">
                        {{ event.starts_on | date: '%d-%m-%Y' }}{% if event.ends_on %} al {{ event.ends_on | date: '%d-%m-%Y' }}{% endif %}
                      </p>
                      <h3>{{ event.title }}</h3>
                      {% if event.detail %}<p>{{ event.detail }}</p>{% endif %}
                    </li>
                  {% endif %}
                {% endfor %}
              {% endfor %}
            </ol>
          {% endif %}
        {% endfor %}
        <p class="source-note">Fuente vigente: {{ site.data.academic_calendar.resolution }}.</p>
        <a class="text-link" href="{{ site.data.academic_calendar.source_url }}" target="_blank" rel="noopener noreferrer">Consultar calendario académico completo <span aria-hidden="true">↗</span></a>
      </div>
    </details>
  </div>

  <p><a class="text-link" href="{{ '/tda-301/' | relative_url }}">← Volver al curso</a></p>
</section>
