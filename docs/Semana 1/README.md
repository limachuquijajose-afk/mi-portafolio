# HIERRO — Landing page de entrenamiento de fuerza

Landing page estática para un programa de entrenamiento de fuerza
(powerlifting / fuerza progresiva). Construida con HTML, CSS y
JavaScript sin frameworks ni dependencias de build.

## Estructura del proyecto

```
fitness-site/
├── index.html      # Estructura y contenido de la página
├── styles.css       # Sistema de diseño, tipografía y layout
├── script.js         # Menú móvil, calculadora de discos, formulario
├── README.md
└── .gitignore
```

## Secciones

- **Hero** — propuesta de valor con una barra cargada animada en CSS.
- **Filosofía** — tres principios del método, presentados como una bitácora de entrenamiento.
- **Programas** — tres niveles (Base, Bloque de Fuerza, Powerlifting) en tarjetas comparables.
- **Alimentación** — sección con sub-pestañas (Pre-entreno / Post-entreno / Días de descanso) que muestran qué priorizar y qué evitar en cada momento del día. Es guía general, no un plan nutricional individualizado.
- **Calculadora de discos** — herramienta interactiva: ingresás el peso total y calcula qué discos van de cada lado de la barra (asume barra olímpica de 20 kg y discos estándar: 25 / 20 / 15 / 10 / 5 / 2.5 / 1.25 kg).
- **CTA / Contacto** — formulario de captura de correo (demo local, sin backend real).

## Cómo verla localmente

No requiere instalación ni build. Alcanza con abrir `index.html` en el navegador,
o servirla con cualquier servidor estático:

```bash
# Opción 1: abrir directo
open index.html          # macOS
xdg-open index.html      # Linux

# Opción 2: servidor local simple
python3 -m http.server 8000
# luego entrar a http://localhost:8000
```

## Personalización

- **Colores y tipografía**: todos los tokens de diseño están como variables
  CSS al inicio de `styles.css` (`:root`), en `--bg`, `--ink`, `--rust`, `--brass`, etc.
- **Contenido**: los textos de programas, filosofía y CTA están directamente
  en `index.html`, listos para reemplazar por copy real.
- **Sub-pestañas de alimentación**: cada pestaña es un botón `.nutri-tab` con
  un panel `.nutri-panel` asociado por `data-target` / `id`. Para agregar una
  pestaña nueva, sumá el par botón + panel en `index.html` y `initNutritionTabs()`
  en `script.js` los detecta automáticamente, sin tocar el JS.
- **Calculadora de discos**: los discos disponibles y el peso de la barra
  están definidos en `script.js` en las constantes `BAR_WEIGHT` y `AVAILABLE_PLATES`.
- **Formulario de contacto**: actualmente solo muestra un mensaje de
  confirmación en pantalla. Para conectarlo a un servicio real (Mailchimp,
  Formspree, un backend propio, etc.), reemplazá la lógica dentro de
  `initContactForm()` en `script.js`.

## Compatibilidad

Responsive de escritorio a mobile, con menú hamburguesa por debajo de los
720px. Respeta `prefers-reduced-motion` para desactivar animaciones a quien
las tenga desactivadas a nivel sistema operativo.

## Licencia

Libre para usar y modificar como base de tu propio proyecto.
