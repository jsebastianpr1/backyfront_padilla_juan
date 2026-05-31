# Guía de Buenas Prácticas para el Desarrollo Frontend
### Centro de Negocios Santiago de SERCOTEC

Esta guía define los estándares técnicos, de accesibilidad y de arquitectura para asegurar la calidad y escalabilidad del sitio web del Centro de Negocios.

---

## A. Convenciones de Nomenclatura

### 1. Componentes (React)
Los archivos y nombres de componentes deben seguir la convención **PascalCase**. Esto ayuda a diferenciarlos visualmente de los elementos HTML estándar de React.
- **Correcto:** `TarjetaServicio.jsx`, `CarruselTestimonios.jsx`, `ContactForm.jsx`.
- **Incorrecto:** `tarjetaServicio.jsx`, `carrusel-testimonios.jsx`.

### 2. Funciones y Variables
Deben seguir la convención **camelCase**. El primer término va en minúscula y las palabras siguientes comienzan con mayúscula.
- **Correcto:** `enviarFormulario`, `datosServicios`, `handleSmoothScroll`, `selectedService`.
- **Incorrecto:** `EnviarFormulario`, `datos_servicios`.

### 3. Estilos (CSS / SASS)
Para evitar la colisión de selectores globales y asegurar un mantenimiento eficiente, se recomienda la metodología **BEM** (Block-Element-Modifier) o el uso de **CSS Modules**.
- **Ejemplo BEM:**
  ```css
  .carousel-container { ... } /* Bloque */
  .carousel-container__slide { ... } /* Elemento */
  .carousel-container__slide--active { ... } /* Modificador */
  ```

---

## B. Estructura de Archivos Recomendada
El proyecto sigue una estructura limpia y modular que separa responsabilidades de la siguiente manera:

- `src/components/`: Almacena componentes modulares y reutilizables (ej. `Carousel.jsx`, `FAQ.jsx`, `Services.jsx`, `ContactForm.jsx`).
- `src/assets/`: Contiene imágenes, iconos optimizados y logos comprimidos en formatos modernos (ej: WebP, SVG) para garantizar el mejor tiempo de carga.
- `src/services/`: Centraliza las peticiones HTTP y llamadas externas (ej: fetch de `data.json` o MockAPI).
- `docs/`: Manuales de desarrollo, guías de buenas prácticas y documentación técnica del proyecto.

---

## C. Recomendaciones de Accesibilidad (a11y) y Usabilidad

### 1. Contraste y Color
Es vital garantizar un contraste suficiente (mínimo ratio 4.5:1 bajo pautas WCAG AA) para que el texto sea legible.
- El texto blanco sobre el azul corporativo de SERCOTEC (`#0b1a3c`) cumple plenamente esta regla.
- El texto oscuro sobre fondos claros debe ser lo suficientemente fuerte (`#1f2937` sobre `#ffffff`).

### 2. Etiquetas ARIA en Componentes Interactivos
- **Carruseles:** Usar `aria-roledescription="carousel"` en el contenedor principal, `aria-hidden` para ocultar diapositivas no visibles de cara a los lectores de pantalla, y `role="tab"` en los indicadores (dots) del carrusel.
- **FAQ Accordion:** Utilizar `aria-expanded="true/false"` en los botones de pregunta para indicar el estado al lector de pantalla, junto con `aria-controls` vinculado al id de la respuesta correspondiente.

### 3. Usabilidad en Formularios
- Toda validación debe proporcionar un mensaje de error visual y claro inmediatamente debajo del input infractor.
- Los campos requeridos deben estar claramente señalados visualmente con un asterisco (`*`).
- El botón de envío debe mostrar un estado de "Cargando..." deshabilitado mientras se procesa la solicitud para evitar envíos dobles.
