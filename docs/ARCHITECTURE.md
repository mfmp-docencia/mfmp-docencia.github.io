# Project Classroom Architecture

## Filosofía del proyecto

Project Classroom es un framework para gestionar y publicar conocimiento docente mediante GitHub Pages. Su propósito es conservar el contenido académico reusable separado de la operación cotidiana de una asignatura.

El proyecto parte de tres ideas centrales:

1. El conocimiento docente debe mantenerse como contenido versionado, durable y reutilizable.
2. La definición permanente de un curso y su ejecución en un periodo concreto son conceptos distintos.
3. Project Classroom y Blackboard cumplen responsabilidades complementarias, no intercambiables.

Project Classroom gestiona el conocimiento: organiza y publica aquello que debe sobrevivir entre distintas ejecuciones de un curso. Blackboard gestiona la operación académica: administra la interacción y las actividades propias de una ejecución concreta.

Esta separación evita que el conocimiento permanente quede ligado a una plataforma operativa o deba reconstruirse para cada nueva edición.

## Visión

Project Classroom busca establecer una base común para publicar cursos que puedan evolucionar y utilizarse nuevamente en ediciones futuras.

Cada curso debe constituir una fuente estable de conocimiento docente. Cada edición debe aportar su planificación temporal sin alterar la identidad ni la estructura permanente del curso. El historial del repositorio permite conservar la evolución de ambos conceptos y comprender sus cambios a lo largo del tiempo.

La publicación se realiza mediante GitHub Pages. El repositorio contiene las fuentes del sitio y GitHub Pages actúa como motor de compilación y publicación. Por diseño, el funcionamiento del proyecto no depende de disponer de una instalación local de Jekyll.

## Objetivos

- Gestionar contenido docente permanente en una estructura versionada.
- Publicar ese contenido mediante GitHub Pages.
- Separar el contenido reusable de un curso de la planificación temporal de sus ediciones.
- Facilitar la creación de nuevas ediciones sin duplicar el contenido permanente.
- Permitir que los cursos evolucionen sin perder su historial.
- Mantener una frontera clara entre la gestión del conocimiento y la operación académica.
- Proporcionar una organización comprensible para futuros colaboradores.
- Favorecer la reutilización de cursos y ediciones futuras.

## Principios de diseño

### Separación entre conocimiento y operación

Project Classroom contiene conocimiento docente publicable. Blackboard contiene la operación académica. La información operativa no debe trasladarse a Project Classroom cuando no forma parte del conocimiento que se desea conservar y reutilizar.

### Separación entre contenido y tiempo

El contenido permanente pertenece a `Course`. La planificación temporal pertenece a `Edition`. Una edición referencia el curso que ejecuta, pero no duplica su contenido.

### Reutilización explícita

El contenido común se mantiene una sola vez en el curso. Las diferencias temporales se expresan en la edición correspondiente. La estructura debe permitir incorporar nuevas ediciones sin copiar ni reorganizar el curso completo.

### Responsabilidad única

Cada elemento del repositorio debe representar una responsabilidad definida. El contenido del curso, los datos de una edición, la presentación y la configuración global no deben mezclarse innecesariamente.

### Publicación administrada

GitHub Pages es el motor de compilación y publicación. El repositorio no exige una instalación local de Jekyll como condición para contribuir o publicar.

### Cambios versionados

Los cambios relevantes en cursos, ediciones y estructura se registran en Git. El historial debe permitir identificar qué cambió y por qué sin depender de documentación externa.

### Simplicidad

La arquitectura debe utilizar únicamente los mecanismos necesarios para representar cursos, ediciones y su publicación. Una abstracción nueva requiere una necesidad concreta dentro de este dominio.

## Modelo de dominio

El modelo distingue dos entidades principales: `Course` y `Edition`.

### Course

`Course` representa la definición permanente y reusable de un curso.

Contiene el conocimiento que conserva su sentido entre diferentes periodos académicos. Su identidad no depende de fechas ni de una ejecución particular.

Ejemplos de información que pertenece a `Course`:

- Identificación del curso.
- Descripción estable.
- Propósito y objetivos permanentes.
- Metadatos oficiales del programa, como plan, horas, créditos y prerrequisitos.
- Organización del contenido docente.
- Unidades, aprendizajes esperados y criterios de evaluación.
- Contenido docente concebido para ser reutilizado.

Un cambio en `Course` modifica la definición reusable del curso y puede afectar a sus ediciones presentes o futuras.

### Edition

`Edition` representa la planificación temporal de un curso para una ejecución concreta.

Contiene información cuyo significado depende de un periodo o calendario particular. Una edición está asociada a un único curso y no reemplaza su contenido permanente.

Ejemplos de información que pertenece a `Edition`:

- Identificación de la edición.
- Periodo al que corresponde.
- Planificación temporal.
- Distribución concreta de clases para esa ejecución.
- Relación entre fechas y contenidos del curso.
- Referencia al periodo del calendario académico institucional aplicable.
- Eventos fechados de clases, actividades y evaluaciones de la ejecución.
- Actividades y recursos que pueden variar entre periodos.

Una nueva ejecución del mismo curso debe producir una nueva edición, no una copia del curso.

### Relación entre Course y Edition

La relación se expresa de la siguiente forma:

```text
Course
├── contenido permanente
├── unidades y resultados de aprendizaje
└── Edition
    ├── periodo
    ├── clases que referencian unidades
    ├── planificación temporal
    ├── actividades
    └── recursos
```

Un `Course` puede tener múltiples `Edition`. Una `Edition` pertenece a un `Course`. Las unidades forman parte del curso y se conservan entre periodos; las clases pertenecen a la edición y referencian una unidad mediante `unit_id`. Por ello, dos ediciones pueden cubrir las mismas unidades con cantidades y secuencias de clases diferentes.

La edición referencia el contenido permanente del curso y agrega contexto temporal. También puede presentar, como información complementaria, el periodo del calendario académico institucional que le corresponde. Ese calendario continúa siendo un dato compartido: la edición lo referencia, pero no lo copia ni pasa a ser su propietaria.

El calendario académico no se publica como una sección global de la aplicación porque su vigencia cambia por año y periodo. Se muestra como un bloque desplegable junto a la planificación de la edición y limita su contenido a los eventos institucionales relevantes para esa ejecución. De esta manera aporta contexto sin competir visualmente ni confundirse con el calendario propio del curso.

La planificación del curso se conserva como eventos estructurados asociados a la edición. Una única colección de eventos alimenta las vistas semanal y mensual del calendario; la presentación no debe duplicar ni transformar manualmente las fechas. Como la duración esperada de un curso es de hasta tres meses, el filtrado puede realizarse en el navegador sin incorporar un servicio de calendario o una base de datos adicional.

Si un dato puede reutilizarse sin cambios en una edición futura, debe evaluarse como parte del curso. Si solo describe cuándo ocurre algo en una ejecución determinada, pertenece a la edición.

### Frontera con Blackboard

El modelo de Project Classroom termina donde comienza la operación académica administrada por Blackboard.

```text
Project Classroom          Blackboard
-----------------          ----------
Conocimiento docente       Operación académica
Contenido permanente       Ejecución cotidiana
Cursos reutilizables       Gestión operativa
Planificación publicada    Interacción de la edición
```

La planificación temporal puede publicarse como parte de una `Edition`. La ejecución de esa planificación corresponde a Blackboard.

## Arquitectura del repositorio

La organización del repositorio debe reflejar directamente el modelo de dominio y separar las fuentes del contenido de los elementos compartidos por el sitio.

```text
/
├── _config.yml
├── _data/
├── _includes/
├── _layouts/
├── assets/
├── courses/
│   └── <course-id>/
│       ├── index.md
│       ├── content/
│       └── editions/
│           └── <edition-id>/
│               ├── index.md
│               ├── classes/     (cuando exista contenido narrativo)
│               ├── activities/
│               └── resources/
├── docs/
│   └── ARCHITECTURE.md
└── index.md
```

### Raíz del repositorio

La raíz contiene la configuración de GitHub Pages, la portada del sitio y los directorios principales. No debe contener contenido específico de una edición.

### `courses/`

Contiene los cursos publicados por Project Classroom. Cada curso posee un identificador estable representado por su directorio.

El archivo `index.md` del curso contiene su definición principal. El directorio `content/` contiene el conocimiento permanente asociado al curso. El directorio `editions/` agrupa sus distintas ediciones.

### `courses/<course-id>/editions/`

Contiene exclusivamente información dependiente de una ejecución temporal del curso. Cada edición utiliza un identificador que la distingue dentro del curso y mantiene sus propias clases, planificación, actividades y recursos.

Una edición no debe copiar archivos desde `content/`. Debe referenciar o vincular el contenido permanente que corresponda.

La colección estructurada de clases se mantiene en `_data/edition_classes.yml`. El directorio `classes/` se crea únicamente cuando una clase publicada necesita contenido narrativo en Markdown; no es obligatorio mientras las clases solo tengan metadatos.

### `_layouts/` y `_includes/`

Contienen las estructuras de presentación compartidas por el sitio. No deben incorporar contenido académico específico de un curso o edición.

### `_data/`

Contiene datos estructurados compartidos cuando estos no pertenecen exclusivamente a una página, curso o edición. No debe utilizarse para ocultar la distinción entre `Course` y `Edition`.

### `assets/`

Contiene los recursos de presentación compartidos por el sitio. La ubicación de un recurso debe conservar la separación entre elementos globales y contenido propio de un curso.

### `docs/`

Contiene documentación dirigida a quienes mantienen y extienden el proyecto. Esta documentación no forma parte del contenido académico de un curso.

## Flujo de publicación

El flujo de publicación utiliza GitHub Pages como servicio de compilación:

1. Un colaborador modifica el contenido, los datos o la estructura del repositorio.
2. Los cambios se revisan antes de incorporarse a la rama publicada.
3. Los cambios aceptados se integran en la rama configurada para GitHub Pages.
4. GitHub Pages compila las fuentes del sitio.
5. Si la compilación finaliza correctamente, GitHub Pages publica la nueva versión.
6. El resultado se verifica en la URL pública del proyecto.

```text
Cambio versionado
       │
       ▼
Rama de publicación
       │
       ▼
Compilación de GitHub Pages
       │
       ▼
Sitio publicado
```

La compilación oficial es la realizada por GitHub Pages. Una instalación local de Jekyll puede ser una herramienta opcional de un colaborador, pero no constituye una dependencia del proyecto ni una etapa obligatoria del flujo.

Los errores de compilación deben corregirse en las fuentes del repositorio. No se modifican manualmente los archivos generados por GitHub Pages.

## Convenciones de desarrollo

### Identificadores y rutas

- Los identificadores de cursos deben ser estables y únicos dentro del sitio.
- Los identificadores de ediciones deben ser únicos dentro de su curso.
- Los nombres de archivos y directorios deben utilizar minúsculas y `kebab-case`.
- Las rutas no deben contener espacios, tildes ni caracteres especiales.
- `index.md` representa la entrada principal de un curso o edición.

### Propiedad del contenido

- El contenido independiente de un periodo pertenece a `Course`.
- La planificación dependiente de un periodo pertenece a `Edition`.
- Una edición no debe duplicar contenido permanente del curso.
- La información propia de la operación académica se mantiene en Blackboard.
- Antes de agregar un dato, se debe identificar explícitamente cuál de estas responsabilidades lo posee.

### Archivos de contenido

- El contenido se redacta en Markdown.
- Los metadatos de una página se declaran en su front matter.
- Los títulos deben describir con claridad el contenido representado.
- Los enlaces internos deben preservar la relación entre el curso y sus ediciones.
- La estructura de encabezados debe ser consistente dentro de cada documento.

### Presentación

- Los layouts y componentes compartidos no deben contener información específica de un curso o edición.
- El contenido académico no debe depender de una presentación particular para conservar su significado.
- Las decisiones de presentación global se mantienen separadas del contenido docente.
- La navegación global se presenta en el header. Dentro del contexto de un curso, la navegación se traslada a una barra lateral jerárquica con Inicio, Calendario, Contenidos, unidades, clases publicadas, Actividades, Recursos y Contáctame. Las unidades se leen desde el curso; las clases, Actividades y Recursos se leen desde la edición vigente.
- En pantallas pequeñas, la barra lateral se presenta como un índice desplegable para no desplazar excesivamente el contenido principal.

### Cambios y colaboración

- Cada cambio debe tener un alcance identificable.
- Los mensajes de commit deben explicar de forma breve el propósito del cambio.
- Los cambios de contenido permanente y planificación temporal deben mantenerse diferenciados.
- Los archivos generados por GitHub Pages no se incorporan manualmente al repositorio.
- No se deben publicar datos que pertenezcan exclusivamente a la operación académica de Blackboard.

## Roadmap

El roadmap describe la consolidación progresiva de la arquitectura ya definida. No introduce nuevas responsabilidades para el proyecto.

### Etapa 1: definición estructural

- Formalizar la estructura base de `Course` y `Edition`.
- Documentar los metadatos mínimos de cada entidad.
- Establecer identificadores y rutas consistentes.
- Confirmar la rama utilizada por GitHub Pages.

### Etapa 2: curso inicial

- Organizar el contenido permanente del primer curso.
- Crear su primera edición sin duplicar el contenido del curso.
- Representar su planificación temporal.
- Verificar la separación entre Project Classroom y Blackboard.

### Etapa 3: reutilización

- Crear una edición futura a partir del mismo curso.
- Confirmar que el contenido permanente se reutiliza sin copias.
- Ajustar las convenciones cuando la segunda edición revele ambigüedades.
- Documentar el procedimiento para crear una edición.

### Etapa 4: incorporación de nuevos cursos

- Incorporar un nuevo curso utilizando la misma arquitectura.
- Confirmar que layouts, componentes y convenciones son compartidos.
- Corregir dependencias accidentales respecto del curso inicial.
- Documentar el procedimiento para crear un curso.

### Etapa 5: consolidación

- Mantener actualizada la documentación arquitectónica.
- Revisar periódicamente la frontera entre conocimiento y operación.
- Preservar la compatibilidad de cursos y ediciones existentes.
- Evaluar cada cambio futuro según su aporte a la reutilización.
