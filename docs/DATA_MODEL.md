# Project Classroom Data Model

## Propósito

Project Classroom utiliza una arquitectura híbrida de Markdown y YAML. YAML mantiene registros estructurados, relaciones e información breve que el sitio necesita consultar. Markdown mantiene el contenido docente que requiere desarrollo narrativo.

La separación principal del modelo es temporal:

- `Course` conserva la definición permanente y reutilizable de un curso.
- `Edition` representa una ejecución específica y contiene únicamente información dependiente del tiempo.

Los archivos de `_data/` son fuentes de datos de GitHub Pages. No sustituyen al contenido en Markdown ni a la operación académica administrada por Blackboard.

## Responsabilidad de los archivos

### `_data/careers.yml`

Contiene el catálogo de carreras a las que pueden asociarse los cursos.

Cada registro incluye:

- `id`: identificador interno, estable y único de la carrera.
- `name`: nombre público de la carrera.

El registro inicial representa la carrera Técnico en Análisis de Datos, a la que pertenece TDA-301.

### `_data/courses.yml`

Contiene los metadatos permanentes de cada curso.

Cada registro incluye:

- `id`: identificador interno, estable y único del curso.
- `code`: código académico conocido del curso.
- `name`: nombre público del curso.
- `career_id`: referencia al `id` de un registro en `careers.yml`.
- `plan_year`: año del plan de estudios.
- `semester`: semestre curricular.
- `class_hours`: horas de clases definidas por el programa.
- `credits`: créditos SCT-AIEP.
- `modality`: modalidad oficial.
- `prerequisite`: módulo prerrequisito, cuando corresponda.
- `profile_competency_contribution`: competencia del perfil de egreso a la que tributa el curso.
- `competency_unit`: unidad de competencia permanente declarada por el programa.

No se deben incorporar aquí periodos, fechas ni otra información propia de una ejecución. El nombre de TDA-301 se toma de la información publicada en la portada del proyecto.

### `_data/editions.yml`

Contiene los metadatos temporales de ejecuciones específicas de los cursos.

Cada registro incluye:

- `id`: identificador estable y único de la edición.
- `course_id`: referencia al `id` de un registro en `courses.yml`.
- `period`: periodo al que corresponde la ejecución.
- `path`: segmento estable de la URL pública de la edición dentro del curso.
- `current`: indica cuál edición debe enlazarse como vigente desde la navegación del curso.
- `academic_calendar_period_id`: referencia al periodo institucional aplicable definido en `academic_calendar.yml`.
- `academic_calendar_event_ids`: lista de eventos institucionales relevantes durante la ejecución de la edición.
- `starts_on`: fecha de inicio, cuando se conozca.
- `ends_on`: fecha de término, cuando se conozca.

La edición inicial de TDA-301 representa el periodo `2026-1`, con fecha de inicio `2026-03-17` y fecha de término `2026-05-09`. Las fechas se almacenan en formato ISO 8601 (`AAAA-MM-DD`).

Una nueva ejecución de TDA-301 debe agregarse como otro registro de `editions.yml`. No debe crearse una copia del curso en `courses.yml`.

El campo `path` no contiene la ruta completa. La URL pública se construye conservando la relación entre curso y edición:

```text
/<course-id>/<edition-path>/
```

Para la edición inicial, la ruta resultante es `/tda-301/2026-1/`. Solo una edición de cada curso puede declarar `current: true`.

### `_data/academic_calendar.yml`

Contiene fechas institucionales compartidas que afectan a varios cursos y no pertenecen a una edición particular.

El archivo declara:

- `year`: año académico representado.
- `institution`: institución responsable del calendario.
- `source_url`: fuente institucional vigente.
- `resolution`: instrumento que establece o modifica las fechas.
- `updated_on`: fecha de vigencia o actualización de la fuente.
- `periods`: agrupaciones de eventos para su presentación.

Cada periodo incluye:

- `id`: identificador estable que permite relacionarlo con una edición.
- `title`: nombre público del periodo académico.
- `events`: lista de hitos institucionales correspondientes.

Cada evento incluye:

- `id`: identificador estable y único dentro del calendario académico.
- `starts_on`: fecha de inicio en formato ISO 8601.
- `ends_on`: fecha de término en formato ISO 8601, cuando el evento comprende más de un día.
- `title`: nombre breve del hito institucional.
- `detail`: aclaración opcional y breve.
- `type`: categoría de presentación, como `academic`, `holiday` o `pause`.

El calendario académico institucional no sustituye la planificación de una `Edition`. Se presenta como información complementaria y desplegable dentro de la página de la edición relacionada. `academic_calendar_period_id` identifica el periodo y `academic_calendar_event_ids` limita la presentación a las fechas institucionales relevantes para esa ejecución. Las clases y actividades continúan bajo `courses/<course-id>/editions/<edition-id>/`. No existe una página global independiente para el calendario académico.

### `_data/planning.yml`

Contiene los eventos temporales que componen la planificación visible de cada edición. Cada planificación declara:

- `edition_id`: referencia al `id` de la edición propietaria.
- `events`: lista ordenable de clases, actividades y evaluaciones.

Cada evento incluye:

- `id`: identificador estable y único dentro de la planificación.
- `starts_on`: fecha ISO 8601 utilizada por las vistas semanal y mensual.
- `starts_at`: hora de inicio opcional en formato `HH:MM`.
- `ends_at`: hora de término opcional en formato `HH:MM`.
- `type`: tipo semántico del evento, actualmente `class`, `activity` o `assessment`. La cuadrícula también presenta los eventos institucionales referenciados con tipos `holiday` y `pause`.
- `type_label`: etiqueta pública en español correspondiente al tipo.
- `title`: nombre breve del evento.
- `status`: estado de confirmación. Los datos demostrativos utilizan `example`.
- `class_id`: referencia opcional a una clase de `edition_classes.yml` cuando `type` es `class` y la clase ya está confirmada.
- `activity_id`: referencia opcional a una actividad de `edition_activities.yml` cuando `type` es `activity` o `assessment`.

La vista semanal y la vista mensual se generan desde los mismos eventos; no mantienen calendarios duplicados. La cuadrícula incorpora además los eventos del calendario académico incluidos en `academic_calendar_event_ids`, sin copiar sus fechas a `planning.yml`. El campo semántico `type` controla su variante visual: por ejemplo, `holiday` utiliza el color coral de la identidad y `pause` una variante neutra. No se almacenan colores literales en los datos.

Ambas vistas utilizan una cuadrícula académica de lunes a sábado y omiten el domingo. Para cursos de hasta tres meses, todos los eventos de la edición se publican junto con la página y el filtrado ocurre en el navegador.

Mientras una fecha no esté confirmada, el evento debe declarar `status: example`, utilizar un `id` que comience con `example-` y mostrarse explícitamente como demostración. Los ejemplos deben reemplazarse o eliminarse antes de considerar publicada la planificación definitiva.

### `_data/course_content.yml`

Define la estructura académica permanente de cada curso. Cada registro declara:

- `course_id`: referencia al curso propietario.
- `units`: unidades que organizan el contenido permanente.

`units` es una colección variable: un curso puede declarar una, dos o tres unidades —o la cantidad que requiera su definición confirmada— sin modificar la plantilla de navegación.

Cada unidad incluye:

- `id`: identificador estable dentro del curso.
- `number`: número ordinal que se presenta como `Unidad X`.
- `name`: nombre público de la unidad.
- `class_hours`: horas de clases asignadas a la unidad.
- `expected_learnings`: colección de aprendizajes esperados de la unidad.
- `status`: ciclo de publicación de la unidad.

Cada aprendizaje esperado incluye `id`, `number`, `statement` y una lista `evaluation_criteria`. Cada criterio conserva su `code` oficial y su `statement` por separado. La interfaz muestra únicamente el texto con un bullet, mientras el código queda disponible en los datos para mantener la trazabilidad con el programa. Los criterios se almacenan dentro del aprendizaje al que evalúan y no directamente en la unidad.

El programa oficial TDA301, plan 2022, define dos unidades de 36 horas y tres aprendizajes esperados por unidad. El programa no establece una distribución clase a clase; esa distribución pertenece a cada edición.

### `_data/edition_classes.yml`

Define las clases concretas de cada ejecución. Cada registro declara `edition_id` y una colección `classes`. Cada clase incluye:

- `id`: identificador estable y único dentro de la edición.
- `unit_id`: referencia a la unidad permanente que desarrolla.
- `number`: orden público de la clase dentro de la edición.
- `title`: nombre público de la clase.
- `status`: ciclo de publicación.

`status` solo admite:

- `draft`: la clase está en preparación y no aparece en la navegación ni en la página pública de contenidos.
- `publish`: la clase está habilitada y visible para los estudiantes.
- `archived`: la clase se conserva en los datos como referencia histórica, pero no se muestra públicamente.

Solo las clases con `status: publish` se incluyen en la navegación y en la presentación pública de la edición. La interfaz agrupa cada clase bajo la unidad referenciada por `unit_id`. Así, una edición puede distribuir una unidad en `x` clases y la siguiente en `x + 1` sin modificar ni duplicar la unidad oficial. El contenido narrativo de una clase se almacena bajo `courses/<course-id>/editions/<edition-path>/classes/`.

### `_data/edition_activities.yml`

Define las actividades particulares de cada ejecución. Cada registro declara `edition_id` y una colección `activities`. Cada actividad incluye:

- `id`: identificador estable dentro de la edición.
- `title`: nombre público de la actividad.
- `description`: descripción breve para el listado.
- `status`: ciclo de publicación `draft`, `publish` o `archived`, con el mismo comportamiento definido para las clases.
- `unit_id`: referencia opcional a la unidad relacionada.
- `class_id`: referencia opcional a una clase de la misma edición.

Solo las actividades con `status: publish` aparecen en la página pública de su edición. Cuando una actividad tiene una fecha, esta también se representa como un evento de `planning.yml` relacionado con la misma edición.

La página `Recursos` también pertenece a la edición porque sus materiales pueden variar entre ejecuciones. Actividades y Recursos se almacenan bajo `courses/<course-id>/editions/<edition-path>/` y sus rutas públicas siguen la forma `/<course-id>/<edition-path>/actividades/` y `/<course-id>/<edition-path>/recursos/`.

### `_data/navigation.yml`

Define exclusivamente la navegación principal del sitio.

Cada elemento incluye:

- `label`: texto visible del enlace.
- `url`: ruta del destino dentro del sitio.

La navegación general contiene las entradas `Inicio`, `Cursos` y `Acerca de`. El calendario pertenece al contexto temporal de una edición y no se publica como opción global. La navegación principal tampoco contiene el catálogo de carreras o ediciones; esas relaciones pertenecen a sus respectivos archivos de datos.

## Relaciones principales del dominio

Las entidades permanentes y temporales forman esta estructura de referencias:

```text
Career
└── Course
    ├── Unit
    └── Edition
        ├── Class ──referencia──> Unit
        ├── PlanningEvent ──referencia──> Class | Activity
        ├── Activity
        └── Resource

AcademicCalendarPeriod
└── AcademicCalendarEvent
    └── referenciado por Edition
```

- Una `Career` puede estar relacionada con varios `Course`.
- Un `Course` referencia una `Career` mediante `career_id`.
- Un `Course` puede organizar su contenido permanente en varias `Unit`.
- Un `Course` puede tener varias `Edition`.
- Una `Edition` referencia un `Course` mediante `course_id`.
- Una `Edition` posee colecciones de `Class`, `PlanningEvent`, `Activity` y recursos propios.
- Cada `Class` referencia una `Unit` del curso mediante `unit_id`.
- Un `PlanningEvent` puede referenciar una clase o actividad de su misma edición.
- Una `Edition` referencia los eventos institucionales aplicables sin duplicarlos.

La relación se declara desde la entidad dependiente. Por esta razón, `careers.yml` no mantiene una lista duplicada de cursos y `courses.yml` no mantiene una lista duplicada de ediciones.

Para el ejemplo inicial:

```text
tecnico-analisis-datos
└── tda-301
    ├── tda-301-unidad-1
    ├── tda-301-unidad-2
    └── tda-301-2026-1
        ├── example-clase-1 ──unit_id──> tda-301-unidad-1
        └── example-class-01 ──class_id──> example-clase-1
```

Cada registro debe contener únicamente información académica confirmada. Si un valor todavía no se conoce, debe marcarse explícitamente como pendiente o `null` y no sustituirse por un dato supuesto.

## Contenido almacenado en Markdown

Markdown debe contener el conocimiento docente que necesita estructura narrativa y que no funciona como un registro breve de catálogo.

Corresponde almacenar en Markdown:

- La presentación y descripción desarrollada de un curso.
- Sus objetivos y contenido permanente.
- La organización narrativa del contenido docente.
- El contenido permanente de las unidades del curso.
- El contenido desarrollado de las clases, actividades y recursos dentro de su edición.
- La planificación desarrollada de una edición cuando requiera más que metadatos breves.
- Las páginas globales de presentación y contacto.

El contenido permanente debe ubicarse bajo el curso correspondiente. El contenido temporal debe ubicarse bajo su edición. Una edición debe referenciar el contenido del curso en lugar de duplicarlo.

Los archivos YAML no deben contener párrafos extensos de contenido docente. Los archivos Markdown no deben duplicar catálogos o relaciones que ya estén definidas en `_data/`.

La información global de contacto se mantiene en una única página `/contacto/`. Los cursos pueden enlazarla desde su navegación, pero no deben copiar sus datos en cada directorio de curso.

Una página global enlazada desde la experiencia de estudiantes puede declarar `navigation_course_id` en su front matter para conservar temporalmente la navegación del curso de origen. Este campo solo controla la presentación del header: no establece propiedad académica, no sustituye a `course_id` y no convierte la página global en contenido del curso. En la configuración inicial, `/contacto/` conserva la navegación de TDA-301.

## Reglas para identificadores

Todos los identificadores deben cumplir estas reglas:

1. Ser únicos dentro del archivo que define la entidad.
2. Permanecer estables una vez publicados.
3. Utilizar minúsculas, números y guiones ASCII.
4. No contener espacios, tildes ni caracteres especiales.
5. Tener significado suficiente para reconocer la entidad sin incorporar información no confirmada.

El identificador de un curso deriva de su código normalizado:

```text
TDA-301 -> tda-301
```

El identificador de una edición comienza con el identificador del curso y agrega una parte que distingue la ejecución:

```text
tda-301-<edition-id>
```

Los identificadores provisionales deben incluir la palabra `example` para impedir que se interpreten como datos académicos confirmados. Deben reemplazarse por identificadores definitivos cuando la información esté disponible.

Las referencias deben coincidir exactamente con el identificador de su entidad de destino. Un `career_id` inexistente o un `course_id` inexistente representa un error de integridad de datos.

## Reglas para nombres de archivos

- Los nombres deben escribirse en minúsculas y `kebab-case`.
- Solo deben utilizar caracteres ASCII, números, guiones y la extensión correspondiente.
- Los archivos de datos compartidos se ubican en `_data/` y utilizan la extensión `.yml`.
- Los archivos de contenido utilizan la extensión `.md`.
- `index.md` representa la entrada principal de un curso o edición.
- El nombre de un directorio de curso debe coincidir con su `id`.
- El nombre de un directorio de edición debe corresponder a la parte de su `id` que distingue esa edición dentro del curso.

## Integridad y actualización

Antes de publicar un cambio en el modelo se debe comprobar que:

- Cada `career_id` resuelva a una carrera existente.
- Cada `course_id` resuelva a un curso existente.
- No existan identificadores duplicados.
- La información permanente no se haya agregado a una edición.
- La información temporal no se haya agregado a un curso.
- Los valores desconocidos permanezcan explícitamente marcados como ejemplos, pendientes o `null`.
- Todos los archivos YAML tengan sintaxis válida.
