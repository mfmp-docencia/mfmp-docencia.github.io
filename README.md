# MFMP Docencia

MFMP Docencia es un sitio educativo construido con GitHub Pages para publicar contenido docente permanente y separarlo de la planificación particular de cada periodo académico.

El proyecto utiliza TDA-301, Taller de Programación para el Análisis de Datos, como curso pivote.

## Modelo general

- Un `Course` conserva la definición reutilizable: información oficial, unidades, aprendizajes esperados y criterios de evaluación.
- Una `Edition` representa una ejecución concreta: clases, calendario, actividades y recursos.
- Una clase pertenece a una edición y referencia la unidad permanente que desarrolla.
- Blackboard conserva la operación académica; este repositorio publica conocimiento y planificación consultable.

## Estructura principal

```text
_data/       Datos estructurados y relaciones
_includes/   Componentes compartidos
_layouts/    Layouts de GitHub Pages
assets/      Estilos, scripts e imágenes
courses/     Cursos y sus ediciones
docs/        Arquitectura, modelo de datos y reglas de colaboración
```

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md)
- [Modelo de datos](docs/DATA_MODEL.md)
- [Trabajo con Codex](docs/CODEX.md)

## Publicación

GitHub Pages compila y publica el contenido integrado en la rama configurada para producción. No es obligatorio disponer de una instalación local de Jekyll para contribuir.

Antes de integrar un cambio se deben validar:

- sintaxis YAML y front matter;
- referencias entre carreras, cursos, ediciones, unidades y clases;
- enlaces internos;
- compatibilidad de las vistas clara, oscura y móvil;
- consistencia entre la implementación y la documentación.
