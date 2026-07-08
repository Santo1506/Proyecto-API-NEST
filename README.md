<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Sistema de Gestión Escolar - Backend NestJS

API REST desarrollada con **NestJS**, **TypeORM** y **PostgreSQL** para gestionar estudiantes, profesores, cursos e inscripciones en una institución educativa.

## Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **PostgreSQL** (v12 o superior)
- **Docker** (opcional, para ejecutar PostgreSQL en contenedor)

## Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd proyect_api_nest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
HOST=localhost
POSTGRES_USER=estudiante
POSTGRES_PASSWORD=pass123
POSTGRES_DB=universidad
DB_PORT=5432
```

### 4. Crear la base de datos (opcional con Docker)

Si usas Docker:

```bash
docker-compose up -d
```

Si usas PostgreSQL local, crea la BD manualmente:

```sql
CREATE DATABASE universidad;
```

## Ejecutar el proyecto

### Modo desarrollo (watch mode)

```bash
npm run start:dev
```

El servidor estará en `http://localhost:3000`

### Modo producción

```bash
npm run start:prod
```

## Conectar el Frontend

1. Abre el archivo `index.html` del frontend con **Live Server**
2. En la interfaz, configura la URL del backend: `http://localhost:3000`
3. Haz clic en "Guardar URL"

## Endpoints Disponibles

### Profesores
- `GET /api/profesores` — Lista todos
- `GET /api/profesores/:id` — Obtiene uno
- `POST /api/profesores` — Crea uno
- `PUT /api/profesores/:id` — Actualiza
- `DELETE /api/profesores/:id` — Elimina

### Estudiantes
- `GET /api/estudiantes` — Lista todos
- `GET /api/estudiantes/:id` — Obtiene uno
- `POST /api/estudiantes` — Crea uno
- `PUT /api/estudiantes/:id` — Actualiza
- `DELETE /api/estudiantes/:id` — Elimina

### Cursos
- `GET /api/cursos` — Lista todos
- `GET /api/cursos/:id` — Obtiene uno
- `POST /api/cursos` — Crea uno
- `PUT /api/cursos/:id` — Actualiza
- `DELETE /api/cursos/:id` — Elimina

### Inscripciones
- `GET /api/inscripciones` — Lista todas
- `GET /api/inscripciones/:id` — Obtiene una
- `POST /api/inscripciones` — Crea una
- `PUT /api/inscripciones/:id` — Actualiza
- `DELETE /api/inscripciones/:id` — Elimina

## Estructura del Proyecto