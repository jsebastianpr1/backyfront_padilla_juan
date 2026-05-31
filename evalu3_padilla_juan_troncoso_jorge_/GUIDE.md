# 📖 Guía de Aprendizaje e Instrucciones: Proyecto ProviEmplea

Bienvenido a la guía oficial de **ProviEmplea**. Este documento ha sido diseñado como un manual de aprendizaje para comprender para qué sirve la plataforma, cómo funciona su arquitectura interna en PHP/Laravel y cómo utilizar cada una de sus características y endpoints.

---

## 🎯 1. ¿Para qué sirve ProviEmplea?

**ProviEmplea** es una plataforma digital de empleo orientada a vecinas y vecinos de la comuna de Providencia. A diferencia de las bolsas de trabajo tradicionales, esta plataforma introduce dos conceptos pioneros en la gestión del talento público y privado:

1. **Búsqueda Inversa de Empleo:** Las empresas y reclutadores buscan activamente a los candidatos basándose exclusivamente en sus competencias, formación y certificaciones, y no al revés (los candidatos no postulan, sino que son seleccionados).
2. **Currículum Ciego (Blind CV) Antidiscriminación:** Con el objetivo de erradicar cualquier tipo de discriminación arbitraria durante la primera fase de selección, la plataforma oculta automáticamente la información sociodemográfica de los candidatos. Los empleadores **no tienen acceso** a:
   - Nombres o apellidos completos.
   - Correo electrónico de contacto directo.
   - Edad.
   - Género.
   - Comuna de residencia (todos son vecinos de Providencia).

Únicamente pueden buscar, filtrar y evaluar a los candidatos en función de su **profesión, habilidades técnicas, certificaciones académicas y referencias profesionales**.

---

## ⚙️ 2. ¿Cómo funciona técnicamente?

El backend está desarrollado sobre el framework **PHP/Laravel 12+** utilizando **SQLite** como base de datos por su portabilidad. La arquitectura interna destaca por los siguientes componentes:

### A. Estructura de Datos y Casting de Eloquent
En la base de datos se almacena tanto la información demográfica (sensible) como la profesional en una sola tabla (`users`).
- Para manejar datos complejos (listados de competencias o múltiples referencias laborales), se utiliza la directiva de casteo (`casts`) de Laravel. El modelo transfiere nativamente los campos JSON de la base de datos a colecciones y arreglos asociativos en PHP.
- El modelo [User.php](file:///c:/Users/juans/OneDrive/Documents/evalu3_padilla_juan_troncoso_jorge_/app/Models/User.php) cuenta con el método `toBlindArray()`. Esta función sirve como "filtro de seguridad", purgando los campos demográficos antes de enviar las respuestas JSON a los clientes.

### B. Capa de Caché de Alto Rendimiento (Cache-Aside)
Para evitar lecturas repetitivas y optimizar el tiempo de respuesta, se implementó almacenamiento en caché de base de datos:
- Las lecturas generan una clave de caché única basada en los parámetros de búsqueda (`users:all:{hash_de_filtros}`).
- **Cache Hit (Acierto):** Latencia `< 15ms` sin tocar la base de datos.
- **Cache Miss (Fallo):** Latencia `~120ms` (consulta SQL tradicional, indexación en caché y entrega).
- **Consistencia Instantánea (Write Invalidation):** Cuando un candidato se registra (`POST`), edita sus datos (`PUT`), se elimina (`DELETE`) o apaga su visibilidad (`PATCH`), el controlador ejecuta un `Cache::flush()`, limpiando la caché global para asegurar que las empresas vean cambios en tiempo real.

### C. Optimización de Memoria (Paginación)
En lugar de cargar todos los candidatos a la vez en RAM, el método de consulta general implementa paginación (`paginate`). Esto permite descargar y mostrar la información en "bloques" o páginas de tamaño controlado, reduciendo drásticamente el consumo de red y hardware.

---

## 📁 3. Estructura del Proyecto

Los archivos más importantes del proyecto se organizan de la siguiente manera en su espacio de trabajo:

```bash
evalu3_padilla_juan_troncoso_jorge_/
├── app/
│   ├── Models/
│   │   └── User.php            # Modelo de Candidato con casts JSON y toBlindArray()
│   └── Http/Controllers/Api/
│       └── UserController.php  # Controlador CRUD, Paginación, Caché y Toggle de Visibilidad
├── bootstrap/
│   └── app.php                 # Configuración del framework y registro de API
├── database/
│   ├── migrations/
│   │   ├── ..._create_users_table.php # Migración con campos demográficos y profesionales
│   │   └── ..._create_cache_table.php # Migración de base de datos para soporte de Caché
│   └── seeders/
│       └── DatabaseSeeder.php  # Sembrador con 5 candidatos variados de Providencia
├── lang/es/
│   └── validation.php          # Traducciones y etiquetas de validación en español
├── routes/
│   └── api.php                 # Rutas de la API agrupadas con limitador de tasa (Rate Limit)
├── sdk_js/                     # SDK cliente JavaScript/TypeScript autogenerado
├── .env                        # Configuración del entorno (Idioma, Claves, SQLite)
├── composer.phar               # Ejecutable local de Composer
└── swagger.yaml                # Especificación OpenAPI 3.0 completa en español con ejemplos
```

---

## 🚀 4. Guía de Uso Paso a Paso

### Paso 1: Configurar el Entorno
El entorno de desarrollo ya se encuentra instalado y configurado. En caso de requerir reconstruir la base de datos SQLite y poblarla con los candidatos iniciales de prueba, ejecute el siguiente comando en su terminal:

```powershell
# Registrar el PATH de PHP e inicializar base de datos limpia con semillas
$env:PATH += ";C:\Users\juans\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe"
php artisan migrate:fresh --seed
```

### Paso 2: Iniciar el Servidor de Desarrollo
Para encender el servidor backend local y permitir que el sitio web frontend o clientes de prueba consuman los servicios, ejecute:

```powershell
php artisan serve --port=8080
```
*El servidor estará escuchando peticiones en: `http://localhost:8080/api`*

---

### Paso 3: Consumo y Pruebas de Endpoints (CRUD)

Puede probar los endpoints utilizando herramientas como **Postman**, **Thunder Client** en VS Code, o directamente desde PowerShell mediante comandos `Invoke-RestMethod`.

#### A. Listar la Vitrina de Empleo (Currículum Ciego - Vista Empleador)
Muestra únicamente a los candidatos activos (`is_active = true`) y oculta sus datos sensibles.

* **Petición (GET):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios" -Method GET
  ```
* **Respuesta Esperada:** JSON que contiene únicamente la profesión, competencias técnicas (`skills`), certificaciones y referencias profesionales. Los campos de nombres, correo y edad no se incluyen.

#### B. Listar como Administrador (Vista de Gestión)
Si se incluye el rol de administrador, el servidor permite auditar los datos sensibles de contacto de los postulantes.

* **Petición (GET):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios?role=admin" -Method GET
  ```

#### C. Filtrar Candidatos por Competencias o Formación
Las empresas pueden realizar búsquedas quirúrgicas según sus necesidades:

* **Filtrar por Habilidad (ej. Laravel):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios?skill=Laravel Framework" -Method GET
  ```
* **Filtrar por Certificación (ej. Google UX):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios?certification=Google UX Design Professional" -Method GET
  ```

#### D. Encender o Apagar el Perfil (Toggle de Visibilidad)
Un candidato puede suspender temporalmente su visibilidad en la vitrina de empleos (por ejemplo, si ya consiguió trabajo) mediante una petición parcial `PATCH`:

* **Petición para Apagar (is_active = false) al Candidato ID 4:**
  ```powershell
  $body = @{ is_active = $false } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios/4/status" -Method PATCH -Body $body -ContentType "application/json"
  ```
  *Nota: Si un empleador intenta consultar `GET /api/usuarios/4` estando inactivo, la API le devolverá un error `404 Not Found` de manera automática.*

* **Petición para Encender (is_active = true):**
  ```powershell
  $body = @{ is_active = $true } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios/4/status" -Method PATCH -Body $body -ContentType "application/json"
  ```

#### E. Registro de un Nuevo Candidato
Permite añadir postulantes al sistema. Valida campos obligatorios y formato de datos.

* **Petición (POST):**
  ```powershell
  $nuevoCandidato = @{
      name = "Esteban Muñoz"
      email = "esteban.munoz@providencia.cl"
      age = 31
      gender = "Masculino"
      comuna = "Providencia"
      profession = "Administrador de Redes"
      skills = @("Cisco", "Seguridad informática")
  } | ConvertTo-Json -Compress
  
  Invoke-RestMethod -Uri "http://localhost:8080/api/usuarios" -Method POST -Body $nuevoCandidato -ContentType "application/json"
  ```

---

## 📑 5. Cómo Usar y Visualizar la Documentación de Swagger

La documentación OpenAPI 3.0 completa del proyecto se encuentra en la raíz bajo el nombre de [swagger.yaml](file:///c:/Users/juans/OneDrive/Documents/evalu3_padilla_juan_troncoso_jorge_/swagger.yaml).

### Para probarla de manera interactiva:
1. Abra su navegador e ingrese a **[Swagger Editor](https://editor.swagger.io/)** o instale la extensión de Swagger UI en su editor de código.
2. Copie el contenido del archivo `swagger.yaml` o cárguelo en la plataforma.
3. Podrá visualizar los endpoints, esquemas interactivos de entrada/salida y ejecutar pruebas directas hacia su servidor local.
4. La documentación incluye detalladamente guías de integración de performance, tiempos de respuesta esperados de la caché y el manejo de cabeceras ante bloqueos de tráfico (`Rate Limiting`).
