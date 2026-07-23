# Front matter de clases

Este documento define el contrato mínimo de una página de clase. La clase pertenece a una edición concreta y referencia una unidad permanente del curso.

## Ubicación

```text
courses/<course-id>/editions/<edition-path>/classes/<class-id>/index.md
```

La carpeta utiliza el identificador estable de la clase. La ruta pública usa una forma breve y legible declarada mediante `permalink`.

## Plantilla

```yaml
---
layout: lesson
title: Clase 1
description: Introducción y contenidos de la primera clase.
permalink: /tda-301/2026-1/clases/clase-1/
course_id: tda-301
edition_id: tda-301-2026-1
unit_id: tda-301-unidad-1
class_id: example-clase-1
---
```

## Reglas

1. `course_id` debe existir en `_data/courses.yml`.
2. `edition_id` debe existir en `_data/editions.yml` y pertenecer al curso declarado.
3. `class_id` debe existir dentro de la edición correspondiente en `_data/edition_classes.yml`.
4. `unit_id` debe coincidir con la unidad referenciada por esa clase.
5. `title` debe describir la misma clase que el registro estructurado.
6. `permalink` debe conservar el curso y la edición en la URL.
7. `number` y `status` no se declaran en la página: su fuente única es `_data/edition_classes.yml`.
8. Una clase nueva o duplicada se registra inicialmente con `status: draft`.

El layout `lesson` y la estructura visible de la página se implementan por separado. Esta plantilla define los datos que ese layout podrá asumir como válidos.

## Contenido paginado

El contenido principal se escribe siempre en Markdown. Para dividirlo en páginas se utiliza el comentario:

```markdown
## Primera página

Contenido inicial.

<!-- page -->

## Segunda página

Contenido siguiente.
```

El visor presenta una página a la vez, comienza en la primera e incorpora los controles Anterior, Siguiente y `X de Y`. Las flechas izquierda y derecha también permiten navegar cuando el visor tiene el foco.

Si JavaScript no está disponible, el contenido conserva su orden de lectura vertical. Las actividades y los recursos relacionados se presentan después del visor y solo aparecen cuando existen registros publicados.

Los documentos PDF o PPT deben importarse al formato canónico Markdown. El proceso puede extraer texto e imágenes y agregar los separadores automáticamente; el archivo original puede conservarse como descarga opcional, pero no constituye la fuente principal de publicación.
