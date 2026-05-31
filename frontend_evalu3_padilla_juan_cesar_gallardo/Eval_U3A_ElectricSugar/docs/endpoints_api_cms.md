# 🚀 Acordeón de Endpoints de la API (CMS Simulado)
### Centro de Negocios Santiago Centro (Metro Toesca)

Esta es una guía rápida de referencia para recordar los endpoints REST que alimentan dinámicamente el sitio web.

---

## ⚙️ Configuración General
* **URL Base local:** `http://localhost:5173` *(con `npm.cmd run dev` activo)*
* **Cabecera obligatoria (Headers) para POST:** `Content-Type: application/json`

---

## 🗺️ Listado de Endpoints

### 1. Obtener Todo el Contenido
* **Método:** `GET`
* **Endpoint:** `http://localhost:5173/api/content`
* **Descripción:** Devuelve la base de datos JSON completa (`nosotros`, `servicios`, `faq`, `testimonios`, `noticias`).
* **Respuesta:** `200 OK`

---

### 2. Agregar una Pregunta Frecuente (FAQ)
* **Método:** `POST`
* **Endpoint:** `http://localhost:5173/api/content/faq`
* **Descripción:** Añade una nueva pregunta frecuente al listado. El servidor le genera un ID automático.
* **Cuerpo (Body - JSON):**
```json
{
  "pregunta": "¿Cómo agendo asesoría en la sede de Santiago Centro (Metro Toesca)?",
  "respuesta": "Nos encontramos en Manuel Rodríguez Sur 749, Santiago (Metro Toesca). Puedes enviar una solicitud por nuestro formulario o correo electrónico para asignarte un asesor sin costo."
}
```
* **Respuesta:** `201 Created`

---

### 3. Publicar una Noticia de Fomento
* **Método:** `POST`
* **Endpoint:** `http://localhost:5173/api/content/news`
* **Descripción:** Publica una noticia al inicio del panel. El servidor autogenera el ID y la fecha del día actual en español.
* **Cuerpo (Body - JSON):**
```json
{
  "titulo": "Lanzamiento de Fondos Concursables 2026",
  "resumen": "Sercotec abre convocatorias para el subsidio Capital Semilla Emprende apoyando proyectos con hasta 3.5 millones de pesos.",
  "imagen": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80",
  "link": "https://www.sercotec.cl"
}
```
* **Respuesta:** `201 Created`

---

### 4. Agregar un Video Tutorial (YouTube)
* **Método:** `POST`
* **Endpoint:** `http://localhost:5173/api/content/videos`
* **Descripción:** Añade un nuevo video tutorial de YouTube a la galería multimedia interactiva. El servidor autogenera un ID único.
* **Cuerpo (Body - JSON):**
```json
{
  "titulo": "Sercotec: Cómo registrarse en el portal paso a paso",
  "descripcion": "Videotutorial explicativo sobre cómo crearse una cuenta en el sistema oficial de Sercotec para postular a fondos.",
  "youtubeId": "gI9xexs_r3o",
  "categoria": "Portal Sercotec"
}
```
* **Respuesta:** `201 Created`

---

### 5. Actualizar Secciones Completas (Fusión / Merge)
* **Método:** `POST`
* **Endpoint:** `http://localhost:5173/api/content`
* **Descripción:** Fusión inteligente. Sobrescribe únicamente la clave principal que le envíes en el cuerpo, manteniendo las demás intactas.

#### Ejemplo B: Actualizar todos los Testimonios (Sin imágenes)
```json
{
  "testimonios": [
    {
      "id": "t-1",
      "cliente": "Daniela Pardo",
      "empresa": "Emprendedora (Santiago Centro)",
      "comentario": "Excelente lugar para capacitarse. Los cursos mensuales son muy prácticos y actualizados."
    }
  ]
}
```
* **Respuesta:** `200 OK`

---

## ⚡ Recordatorio: Colecciones de Peticiones Listas
Si no quieres escribir estas peticiones, puedes importarlas de forma directa desde la carpeta `/docs`:
* **VS Code (Thunder Client):** [sercotec_cms.thunder_collection.json](file:///c:/Users/juans/OneDrive/Documents/Eval_U3A_ElectricSugar/docs/sercotec_cms.thunder_collection.json)
* **Postman:** [sercotec_cms.postman_collection.json](file:///c:/Users/juans/OneDrive/Documents/Eval_U3A_ElectricSugar/docs/sercotec_cms.postman_collection.json)
