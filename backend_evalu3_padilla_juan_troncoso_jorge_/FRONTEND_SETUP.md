# Guía: Conectar Frontend con API Backend

## 📋 Resumen de cambios realizados

### 1. **app.js actualizado** 
Archivo: [`resources/js/app.js`](resources/js/app.js)

He agregado funcionalidad completa para consumir la API desde el frontend usando el SDK de TypeScript:

- ✅ Configuración de la URL base del API
- ✅ Función `loadCandidates()` para obtener la lista de candidatos
- ✅ Función `displayCandidates()` para renderizar los candidatos en HTML
- ✅ Función `viewCandidate()` para ver detalles de un candidato
- ✅ Función `toggleStatus()` para cambiar el estado del candidato
- ✅ Manejo de errores y notificaciones

### 2. **welcome.blade.php actualizada**
Archivo: [`resources/views/welcome.blade.php`](resources/views/welcome.blade.php)

He creado una interfaz limpia para mostrar los candidatos con:
- Header descriptivo
- Contenedor para los candidatos (`id="candidates-container"`)
- Footer informativo
- Estilos con Tailwind CSS

---

## 🚀 Cómo usar

### Paso 1: Verificar la URL de la API
Abre el archivo `.env` y confirma que la variable `VITE_API_URL` sea correcta:

```env
VITE_API_URL=http://localhost:8000/api
```

Si tu backend está en otro puerto o servidor, actualiza esta URL.

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Iniciar el servidor de desarrollo
```bash
npm run dev
```

O si usas Vite directamente:
```bash
npx vite
```

### Paso 4: Iniciar el servidor Laravel
En otra terminal:
```bash
php artisan serve
```

Por defecto se ejecutará en `http://localhost:8000`

### Paso 5: Acceder a la aplicación
Abre tu navegador en `http://localhost:5173` (o el puerto que use Vite) y deberías ver la lista de candidatos.

---

## 📡 Cómo funciona la integración

### Flujo de datos:

```
Frontend (Vite + TypeScript)
    ↓
    SDK de TypeScript (`sdk_js/`)
    ↓
    HTTP Request
    ↓
Backend (Laravel API)
    ↓
    Base de datos
    ↓
    JSON Response
    ↓
SDK deserializa
    ↓
Frontend renderiza
```

### Métodos disponibles del SDK:

El SDK proporciona estos métodos en `DefaultService`:

```typescript
// Obtener lista de candidatos
DefaultService.listCandidates({
    role: 'employer' | 'admin',  // Tipo de acceso
    page: number,                 // Número de página
    perPage: number              // Candidatos por página
})

// Obtener un candidato específico
DefaultService.getCandidate(id: string)

// Cambiar estado de un candidato
DefaultService.toggleStatus(id: string)
```

---

## 🔧 Personalizaciones disponibles

### Cambiar el rol en la consulta
Abre `resources/js/app.js` y en la función `loadCandidates()`:

```javascript
// Para ver perfiles "Blind CV" (anónimos) - DEFAULT PARA EMPLEADORES
role: 'employer'

// Para ver perfiles completos con datos demográficos - SOLO ADMINS
role: 'admin'
```

### Modificar cantidad de candidatos por página
```javascript
perPage: 10  // Cambia a 20, 50, 100 según necesites
```

### Agregar filtros
```javascript
const response = await DefaultService.listCandidates({
    role: 'employer',
    page: 1,
    perPage: 10,
    skill: 'JavaScript',      // Filtrar por habilidad
    certification: 'AWS'      // Filtrar por certificación
});
```

---

## 🐛 Solución de problemas

### Error: "Cannot find module '../../sdk_js/index'"
- Verifica que la carpeta `sdk_js/` existe en el proyecto
- Asegúrate de usar la ruta relativa correcta desde `resources/js/app.js`

### Error: "Failed to fetch from http://localhost:8000/api"
- Verifica que el servidor Laravel está corriendo (`php artisan serve`)
- Revisa que el puerto es 8000 (o actualiza `.env` con el puerto correcto)
- Comprueba que la ruta API existe: `routes/api.php`

### Los candidatos no aparecen
1. Abre la consola del navegador (F12)
2. Revisa los mensajes de error en la pestaña "Console"
3. Verifica que hay datos en la base de datos
4. Comprueba las peticiones en la pestaña "Network"

### Error CORS
Si obtienes error de CORS, necesitas configurar en Laravel (`config/cors.php`):

```php
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 📚 Estructura de datos devueltos

### BlindUserResponse (para empleadores)
```typescript
{
    id: string;
    name?: string;
    email?: string;
    // Sin datos sensibles
}
```

### FullUserResponse (para admins)
```typescript
{
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    skills?: string;
    certifications?: string;
    // Todos los datos demográficos
}
```

---

## 🎯 Próximos pasos sugeridos

1. **Agregar autenticación**: Implementar login para validar el rol
2. **Paginación**: Agregar botones "Siguiente/Anterior"
3. **Búsqueda avanzada**: Formularios para filtrar por skill y certificación
4. **Exportar datos**: Agregar botón para descargar en CSV/PDF
5. **Editar candidatos**: Para admins, permitir actualizar información

---

## 📖 Referencias

- [OpenAPI TypeScript Codegen](https://github.com/ferdikoenn/openapi-typescript-codegen)
- [Laravel API Resource](https://laravel.com/docs/routing#api-resource-routes)
- [Vite + Laravel](https://laravel.com/docs/vite)
- [Tailwind CSS](https://tailwindcss.com/)

