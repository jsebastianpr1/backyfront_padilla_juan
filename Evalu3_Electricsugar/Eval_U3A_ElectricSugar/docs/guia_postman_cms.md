# Guía de Administración del CMS Simulado con Postman
### Centro de Negocios Santiago (Sercotec)

Esta guía explica detalladamente la arquitectura y el esquema de datos JSON que alimenta dinámicamente el sitio web, y cómo el equipo de contenido puede administrarlo utilizando la colección de **Postman** proporcionada.

---

## 1. Arquitectura del CMS Simulado

Para evitar depender de bases de datos complejas en etapas iniciales de desarrollo y facilitar una administración sencilla, la landing page consume su información desde un archivo centralizado ubicado en:
`public/data.json`

Vite cuenta con un **middleware API de CMS nativo** (configurado en `vite.config.js`) que escucha peticiones HTTP y escribe directamente sobre este archivo. Esto permite que cualquier cambio realizado mediante la API sea persistente y se refleje en tiempo real en la interfaz del usuario.

### Endpoints Disponibles:
- **`GET /api/content`**: Devuelve la base de datos de contenido completa.
- **`POST /api/content`**: Fuciona (merge) y actualiza de manera masiva los objetos de primer nivel (como `nosotros`, `servicios`, `faq`, etc.).
- **`POST /api/content/faq`**: Añade una nueva pregunta frecuente generando un ID único de forma automática.
- **`POST /api/content/news`**: Publica una nueva noticia, autogenerando ID y fecha en formato en español, y la inserta al inicio de la lista.
- **`POST /api/content/videos`**: Agrega un nuevo video tutorial de YouTube a la galería de videos interactiva.

---

## 2. Estructura de Datos JSON (Esquema CMS)

A continuación, se detalla la estructura y el propósito de las secciones principales administrables:

### A. Sección "Nosotros" (`nosotros`)
Representa la misión del Centro, sus pilares de éxito económico y la información física real del personal y sedes.

```json
{
  "nosotros": {
    "titulo": "Quiénes Somos",
    "descripcion": "El Centro de Desarrollo de Negocios Sercotec Santiago es un espacio de apoyo...",
    "pilares": [
      {
        "id": "pilar-1",
        "titulo": "Impacto Económico",
        "descripcion": "Más de $22.450 millones en aumento de ventas...",
        "icon": "user-check"
      }
    ],
    "contactoReal": {
      "centro_santiago": {
        "nombre": "Centro Principal Santiago (Metro Toesca)",
        "direccion": "Manuel Rodríguez Sur 749, Santiago",
        "telefono": "+(56) 9 3927 5633",
        "correo": "centro.santiago@centrossercotec.cl",
        "atencion": "Lunes a Viernes de 9:00 - 18:00 hrs.",
        "jefe": "Christian Gacitúa L.",
        "asistente": "María Victoria Cuevas H."
      },
      "centro_providencia": {
        "nombre": "Centro Satélite Providencia",
        "direccion": "Los Jesuitas 881, Providencia (primer piso)",
        "telefono": "+(56) 9 3927 5633",
        "correo": "centro.santiago@centrossercotec.cl",
        "atencion": "Martes y Jueves de 09:00 - 13:00 hrs.",
        "responsable": "Francisco Ramírez"
      }
    }
  }
}
```

### B. Sección "Servicios" (`servicios`)
Arreglo de servicios dinámicos. En la interfaz se renderizan automáticamente tarjetas de servicio adaptables.

```json
{
  "servicios": [
    {
      "id": "asesoria-individual",
      "nombre": "Asesoría Técnica Individual",
      "descripcion": "Mentoría personalizada de negocios con un asesor experto asignado...",
      "detalle": "Sesiones individuales enfocadas en resultados de impacto económico real...",
      "icono": "briefcase"
    }
  ]
}
```
> [!NOTE]
> **Iconos de Servicios Soportados:**
> Para garantizar una estética visual consistente y premium, la interfaz procesa y asocia dinámicamente cuatro palabras clave con iconos SVG adaptables:
> - `briefcase`: Maletín de negocios
> - `graduation-cap`: Sombrero académico (talleres)
> - `trending-up`: Gráfica ascendente (financiamiento y redes)
> - `users`: Silueta de personas (comunidad, gremios o cooperativas)

### C. Sección "Preguntas Frecuentes" (`faq`)
Arreglo que alimenta el acordeón interactivo de preguntas y respuestas frecuentes para el usuario.

```json
{
  "faq": [
    {
      "id": "faq-1",
      "pregunta": "¿Qué comunas atiende el Centro de Negocios Santiago?",
      "highlight": "Atendemos de manera prioritaria a micro y pequeñas empresas y cooperativas..."
    }
  ]
}
```

### D. Sección "Video Tutoriales" (`videos`)
Arreglo dinámico de tutoriales de YouTube que nutren la galería multimedia del sitio web.

```json
{
  "videos": [
    {
      "id": "v-1",
      "titulo": "Cómo Postular al Capital Semilla Emprende",
      "descripcion": "Guía oficial paso a paso para postular con éxito al fondo concursable...",
      "youtubeId": "R5v5tY6yK4w",
      "categoria": "Capital Semilla"
    }
  ]
}
```

---

## 3. Pruebas y Administración con Thunder Client (Recomendado) y Postman

Hemos preparado colecciones de solicitudes oficiales para ambas herramientas:
* **Thunder Client (VS Code):** [sercotec_cms.thunder_collection.json](file:///c:/Users/juans/OneDrive/Documents/Eval_U3A_ElectricSugar/docs/sercotec_cms.thunder_collection.json)
* **Postman:** [sercotec_cms.postman_collection.json](file:///c:/Users/juans/OneDrive/Documents/Eval_U3A_ElectricSugar/docs/sercotec_cms.postman_collection.json)

---

### Opción A: Usar Thunder Client en VS Code (La más rápida)
1. Instala la extensión **Thunder Client** en tu VS Code.
2. Abre la pestaña de **Thunder Client** en la barra lateral izquierda (icono de rayo).
3. Ve a la sección **Collections** (Colecciones).
4. Haz clic en el menú de opciones (icono de tres líneas/puntos a la derecha de Collections) y selecciona **Import**.
5. Carga el archivo [sercotec_cms.thunder_collection.json](file:///c:/Users/juans/OneDrive/Documents/Eval_U3A_ElectricSugar/docs/sercotec_cms.thunder_collection.json).
6. ¡Listo! Verás la colección `Sercotec Centro de Negocios CMS API` cargada con todas las peticiones organizadas en carpetas y con la variable de entorno `baseUrl` auto-configurada.

---

### Opción B: Usar Postman
1. Abre **Postman**.
2. Haz clic en el botón **Import** (en la esquina superior izquierda).
3. Selecciona el archivo [sercotec_cms.postman_collection.json](file:///c:/Users/juans/OneDrive/Documents/Eval_U3A_ElectricSugar/docs/sercotec_cms.postman_collection.json).
4. Confirma la importación. Verás una nueva carpeta llamada `Sercotec Centro de Negocios CMS API`.

---

### Paso Adicional: Asegurar que el Servidor Local Esté Activo
Para que la API responda a las peticiones de cualquiera de los dos clientes, el servidor local de desarrollo debe estar ejecutándose. Abre una terminal en la raíz del proyecto y ejecuta:
```bash
npm.cmd run dev
```
*Por defecto, el proyecto se iniciará en `http://localhost:5173`. Si se inicia en otro puerto, tanto Thunder Client (`baseUrl` en settings de la colección) como Postman (`base_url` a nivel de colección) permiten ajustar el puerto fácilmente.*

---

## 4. Ejemplos Prácticos de Pruebas de Endpoints

### A. Consultar el Contenido Actual (GET)
* **Petición**: `GET {{base_url}}/api/content`
* **Acción**: Haz clic en **Send**.
* **Resultado**: Obtendrás la estructura de datos completa en formato JSON con un código de estado `200 OK`. Esto te permite verificar qué información está procesando la interfaz.

---

### B. Agregar una Pregunta Frecuente Dinámica (POST)
* **Petición**: `POST {{base_url}}/api/content/faq`
* **Encabezados (Headers)**: `Content-Type: application/json`
* **Cuerpo (Body - raw JSON)**:
  ```json
  {
    "pregunta": "¿Cómo agendo asesoría si pertenezco a un gremio comercial?",
    "respuesta": "Puedes contactarnos indicando tu asociación o gremio. Te derivaremos a un asesor especializado en fomento cooperativo y asociatividad."
  }
  ```
* **Acción**: Presiona **Send**.
* **Resultado**: Código `201 Created`. El servidor autogenera un ID basado en timestamp (ej. `faq-1716...`) y añade el elemento a la base de datos de preguntas frecuentes. Abre el navegador y verás que la nueva pregunta ya aparece al final del acordeón de FAQs sin necesidad de recodificar ni reiniciar el servidor.

---

### C. Actualizar o Reemplazar un Servicio (POST)
* **Petición**: `POST {{base_url}}/api/content`
* **Encabezados (Headers)**: `Content-Type: application/json`
* **Cuerpo (Body - raw JSON)**:
  Puedes editar un servicio particular reescribiendo el arreglo `servicios` en el cuerpo.
  ```json
  {
    "servicios": [
      {
        "id": "asesoria-individual",
        "nombre": "Asesoría Técnica Individual (Premium)",
        "descripcion": "Mentoría personalizada para la toma de decisiones empresariales estratégicas.",
        "detalle": "Sesiones uno a uno adaptadas a cooperativas y pymes con asesores certificados.",
        "icono": "briefcase"
      },
      {
        "id": "capacitacion-talleres",
        "nombre": "Talleres y Charlas Prácticas",
        "descripcion": "Formaciones especializadas sin costo.",
        "detalle": "Aprende de contabilidad, redes sociales e innovación comercial.",
        "icono": "graduation-cap"
      }
    ]
  }
  ```
* **Acción**: Presiona **Send**.
* **Resultado**: Código `200 OK`. El servidor actualizará únicamente la clave `servicios` del archivo `data.json`, manteniendo intactos los otros apartados (`nosotros`, `faq`, `noticias`, etc.).

---

### D. Crear una Nueva Noticia Dinámica (POST)
* **Petición**: `POST {{base_url}}/api/content/news`
* **Cuerpo (Body - raw JSON)**:
  ```json
  {
    "titulo": "Lanzamiento del Programa Kit Digital 2026 en Providencia",
    "resumen": "Sercotec inicia postulaciones para subsidios tecnológicos enfocados en digitalizar la cadena de valor de almaceneros locales.",
    "imagen": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80",
    "link": "https://www.sercotec.cl/ruta-digital/"
  }
  ```
* **Resultado**: Código `201 Created`. La noticia se inserta automáticamente al inicio del arreglo `noticias` con la fecha del día formateada en español. La landing page ordenará la nueva noticia de primera y renderizará la imagen y el enlace del CTA dinámicamente.

---

### E. Agregar un Video Tutorial Dinámico (POST)
* **Petición**: `POST {{base_url}}/api/content/videos`
* **Encabezados (Headers)**: `Content-Type: application/json`
* **Cuerpo (Body - raw JSON)**:
  ```json
  {
    "titulo": "Sercotec Chile: Escuela de Emprendimiento Femenino",
    "descripcion": "Videotutorial del programa de capacitación estratégica con herramientas para liderar y consolidar tu negocio.",
    "youtubeId": "lIRFlvU3t_Q",
    "categoria": "Capacitación"
  }
  ```
* **Acción**: Presiona **Send**.
* **Resultado**: Código `201 Created`. El servidor genera un ID único y añade el video al final de la playlist interactiva. Podrás ver y reproducir este video de manera inmediata en la galería multimedia de la página.

---

## 5. Recomendaciones de Control de Calidad para el Equipo de Contenidos

Para asegurar que la landing page conserve sus excepcionales estándares estéticos, de rendimiento y usabilidad (UX/UI), el equipo de contenido debe aplicar las siguientes reglas al editar el JSON:

1. **Uso de Imágenes Optimización Visual:** Al cargar nuevas imágenes para las noticias o avatares de testimonios, asegúrate de utilizar URLs con imágenes de alta definición y optimizadas (puedes utilizar CDN directos como Unsplash con parámetros de ancho y formato, ej. `?w=500&auto=format`).
2. **Respeto a la Accesibilidad (ARIA):** No elimines los campos de texto descriptivo. La landing page utiliza las descripciones breves (`descripcion`) para cargarlas en los atributos semánticos de accesibilidad y lectores de pantalla.
3. **Consistencia de Iconografía:** Recuerda que los iconos para la sección de servicios están definidos por palabras clave. Si ingresas un icono que no esté en la lista (`briefcase`, `graduation-cap`, `trending-up`, `users`), la aplicación cargará un icono de reporte general por defecto para no romper la estética del sitio.
4. **Respuestas Concisas en FAQ:** Mantén las respuestas de las preguntas frecuentes bajo las 3 líneas de longitud recomendadas. Esto previene un desbordamiento visual de altura en los acordeones y garantiza transiciones CSS fluidas al expandir o colapsar cada bloque.
