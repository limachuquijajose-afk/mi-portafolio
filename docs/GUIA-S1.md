# Guía de Uso y Documentación: Proyecto HIERRO (Semana 1)

Este documento detalla la estructura, funcionamiento y consideraciones técnicas del proyecto **HIERRO**, un sitio web interactivo orientado a programas de entrenamiento de fuerza progresiva y nutrición deportiva. Está pensado para que cualquier compañero pueda comprender el propósito y la arquitectura del código fuente.

## Estructura del Repositorio y Componentes

El proyecto se compone de tres archivos principales organizados de la siguiente manera:

| Archivo      | Tipo                | Descripción                                                                                                                           |
| :----------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `index.html` | Estructura / HTML   | Define la maquetación semántica, secciones de contenido, pestañas de nutrición y la calculadora de discos.                            |
| `styles.css` | Estilos / CSS       | Implementa el sistema de diseño mediante tokens (`:root`), texturas visuales, animaciones de carga y diseño adaptable (_responsive_). |
| `script.js`  | Lógica / JavaScript | Gestiona la interactividad del menú móvil, las pestañas dinámicas de alimentación y la lógica matemática de la calculadora de placas. |

## Instrucciones de Instalación y Uso

Para poner en marcha este proyecto de manera local en tu equipo, seguí los pasos detallados a continuación:

1. Cloná este repositorio en tu máquina utilizando la terminal con el comando `git clone <url-del-repositorio>`.
2. Navegá hacia la carpeta del proyecto correspondiente a la semana con `cd semana-1` (recuerda que esta dentor de la carpeta docs).
3. Abrí la carpeta completa utilizando tu entorno de desarrollo favorito, por ejemplo ejecutando `code .` para iniciar Visual Studio Code.
4. Iniciá un servidor local (como la extensión _Live Server_) o abrí directamente el archivo `index.html` en tu navegador web preferido.

### Tareas del Proyecto

- [x] Maquetar la estructura HTML semántica del sitio principal.
- [x] Configurar los estilos visuales, paleta de colores y texturas de grano.
- [x] Programar la lógica interactiva de la calculadora de discos y pestañas en JavaScript.

## Ejemplo de Lógica y Bloque de Código

El siguiente bloque extraído de `script.js` muestra cómo se calcula matemáticamente la distribución de discos de hierro por cada lado de la barra olímpica de `20` kg:

```javascript
function calculatePlatesPerSide(perSideWeight) {
  let remaining = Math.round(perSideWeight * 100) / 100;
  const used = [];

  for (const plate of AVAILABLE_PLATES) {
    while (remaining + 1e-9 >= plate) {
      used.push(plate);
      remaining = Math.round((remaining - plate) * 100) / 100;
    }
  }
  return { used, remaining };
}
```

## Imagenes de referencia

![Captura de mi proyecto](../img/captura%20proyecto%20semana%201.png)
