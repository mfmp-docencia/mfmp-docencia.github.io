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

No se deben incorporar aquí periodos, fechas ni otra información propia de una ejecución. El nombre de TDA-301 se toma de la información publicada en la portada del proyecto.

### `_data/editions.yml`

Contiene los metadatos temporales de ejecuciones específicas de los cursos.

Cada registro incluye:

- `id`: identificador estable y único de la edición.
- `course_id`: referencia al `id` de un registro en `courses.yml`.
- `period`: periodo al que corresponde la ejecución.
- `path`: segmento estable de la URL pública de la edición dentro del curso.
- `current`: indica cuál edición debe enlazarse como vigente desde la navegación del curso.
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

Cada evento incluye:

- `starts_on`: fecha de inicio en formato ISO 8601.
- `ends_on`: fecha de término en formato ISO 8601, cuando el evento comprende más de un día.
- `title`: nombre breve del hito institucional.
- `detail`: aclaración opcional y breve.
- `type`: categoría de presentación, como `academic`, `holiday` o `pause`.

El calendario académico institucional no sustituye la planificación de una `Edition`. Las clases y actividades de una ejecución concreta continúan bajo `courses/<course-id>/editions/<edition-id>/`.

### `_data/navigation.yml`

Define exclusivamente la navegación principal del sitio.

Cada elemento incluye:

- `label`: texto visible del enlace.
- `url`: ruta del destino dentro del sitio.

La navegación general contiene las entradas `Inicio`, `Cursos`, `Calendario` y `Acerca de`. No contiene el catálogo de carreras, cursos o ediciones; esas relaciones pertenecen a sus respectivos archivos de datos.

## Relación entre Career, Course y Edition

Las entidades forman una jerarquía de referencias:

```text
Career
└── Course
    └── Edition
```

- Una `Career` puede estar relacionada con varios `Course`.
- Un `Course` referencia una `Career` mediante `career_id`.
- Un `Course` puede tener varias `Edition`.
- Una `Edition` referencia un `Course` mediante `course_id`.

La relación se declara desde la entidad dependiente. Por esta razón, `careers.yml` no mantiene una lista duplicada de cursos y `courses.yml` no mantiene una lista duplicada de ediciones.

Para el ejemplo inicial:

```text
tecnico-analisis-datos
└── tda-301
    └── tda-301-2026-1
```

Cada registro debe contener únicamente información académica confirmada. Si un valor todavía no se conoce, debe marcarse explícitamente como pendiente o `null` y no sustituirse por un dato supuesto.

## Contenido almacenado en Markdown

Markdown debe contener el conocimiento docente que necesita estructura narrativa y que no funciona como un registro breve de catálogo.

Corresponde almacenar en Markdown:

- La presentación y descripción desarrollada de un curso.
- Sus objetivos y contenido permanente.
- La organización narrativa del contenido docente.
- El contenido y los recursos reutilizables del curso.
- La planificación desarrollada de una edición cuando requiera más que metadatos breves.
- Las páginas globales de presentación, calendario institucional y contacto.

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
