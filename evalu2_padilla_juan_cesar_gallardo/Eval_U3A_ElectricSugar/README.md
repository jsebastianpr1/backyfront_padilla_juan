# Landing Page - Centro de Negocios Santiago de SERCOTEC

## Descripción del Proyecto
Actualización de la plataforma web del **Centro de Negocios Santiago de SERCOTEC** para mejorar la gestión, innovación y sostenibilidad de las micro y pequeñas empresas y emprendedores atendidos por el Centro. Esta versión añade soporte para datos dinámicos a través de un endpoint simulado, carrusel responsivo y accesible de testimonios, acordeón interactivo de FAQ, diseño premium adaptable y un formulario de contacto inteligente con lógica de autocompletado y validaciones de seguridad (honeypot).

## Estructura del Proyecto
- `src/components`: Componentes dinámicos reutilizables (Services, Carousel, FAQ, ContactForm).
- `src/assets`: Logos, imágenes y elementos multimedia.
- `public/`: Contiene `data.json` que actúa como la base de datos simulada para servicios, información del centro y FAQ.
- `docs/`: Guía de buenas prácticas y manuales.

## Instrucciones de Instalación
1. Clonar el repositorio: `git clone [URL-del-repositorio]`
2. Instalar dependencias: `npm install` (o `npm.cmd install` si hay restricciones de permisos en Windows)
3. Ejecutar en local: `npm run dev` (o `npm.cmd run dev`)

## Guía de Uso de Componentes
### Componente: Tarjeta de Servicio (Reusable)
- **Props:**
  - `services`: Colección de servicios cargados desde la API local (`public/data.json`).
  - `onSelectService`: Función callback gatillada al hacer clic en "Contáctanos".
- **Funcionalidad:** Al hacer clic en el botón interactivo "Contáctanos" en la tarjeta de servicio, el sitio realiza un desplazamiento suave (scroll) hacia la sección de formulario, selecciona de manera automática el servicio en el campo desplegable "Servicio Solicitado", y hace focus en los inputs.

## Ejemplos de Código

### Ejemplo de consumo de API local
```javascript
// Ejemplo de consumo de API para la sección "Servicios" y "FAQ"
const fetchDatos = async () => {
  const response = await fetch('/data.json');
  if (!response.ok) throw new Error('Error al cargar datos');
  const data = await response.json();
  return data;
};
```
