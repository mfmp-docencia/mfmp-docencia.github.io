---
layout: default
title: Calendario académico
description: Principales fechas del calendario académico AIEP 2026.
permalink: /calendario/
---

<header class="page-header container">
  <p class="eyebrow">AIEP · 2026</p>
  <h1>Calendario académico</h1>
  <p>Fechas institucionales relevantes para organizar el año académico.</p>
</header>

<section class="calendar-source container" aria-label="Fuente del calendario">
  <div>
    <p class="source-note">Fuente vigente: {{ site.data.academic_calendar.resolution }}, del 7 de mayo de 2026.</p>
    <a class="text-link" href="{{ site.data.academic_calendar.source_url }}" target="_blank" rel="noopener noreferrer">Consultar documento oficial de AIEP <span aria-hidden="true">↗</span></a>
  </div>
</section>

<section class="section section-tinted" aria-label="Fechas académicas 2026">
  <div class="container calendar-periods">
    {% for period in site.data.academic_calendar.periods %}
      <section class="calendar-period" aria-labelledby="period-{{ forloop.index }}">
        <h2 id="period-{{ forloop.index }}">{{ period.title }}</h2>
        <ol class="calendar-list">
          {% for event in period.events %}
            <li class="calendar-event calendar-event--{{ event.type }}">
              <p class="calendar-date">
                {{ event.starts_on | date: '%d-%m-%Y' }}{% if event.ends_on %}<br><span>al {{ event.ends_on | date: '%d-%m-%Y' }}</span>{% endif %}
              </p>
              <div>
                <h3>{{ event.title }}</h3>
                {% if event.detail %}<p>{{ event.detail }}</p>{% endif %}
              </div>
            </li>
          {% endfor %}
        </ol>
      </section>
    {% endfor %}
  </div>
</section>
