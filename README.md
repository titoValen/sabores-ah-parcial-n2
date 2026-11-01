# Sabores

Proyecto full stack para la materia **Aplicaciones Híbridas**, desarrollado a partir de la API del primer parcial.

La aplicación representa el menú de un restaurante y permite gestionar platos, chefs y usuarios. Para el segundo parcial se incorporará una interfaz en React.js conectada a una API REST desarrollada con Node.js, Express y MongoDB.

## Estado del proyecto

Actualmente se encuentra disponible el backend del primer parcial, con endpoints REST para platos y chefs. La implementación de usuarios, autenticación JWT y el frontend React forman parte del desarrollo del segundo parcial.

## Tecnologías

### Backend

- Node.js
- Express
- JavaScript con ECMAScript Modules
- MongoDB
- pnpm
- EJS, para conservar las vistas del primer parcial

### Frontend planificado

- React.js
- Vite
- React Router
- Context API
- React Hook Form
- Zod

## Funcionalidades

### Platos

- Listar platos.
- Filtrar por sección, tipo de plato y condición vegetariana.
- Consultar un plato por su identificador.
- Crear, editar y eliminar platos.
- Asociar cada plato con un chef.

### Chefs

- Listar chefs.
- Consultar un chef por su identificador.
- Crear, editar y eliminar chefs.
- Consultar los platos asociados a un chef.

### Usuarios y autenticación

La versión del segundo parcial deberá incorporar:

- Registro de usuarios.
- Login.
- Contraseñas encriptadas con bcrypt.
- Autenticación mediante JWT.
- Roles `user` y `admin`.
- Lectura pública de platos y chefs.
- Operaciones de creación, edición y eliminación restringidas a usuarios administradores.

## Endpoints actuales

La API del primer parcial se encuentra bajo el prefijo `/api`.

### Platos

```text
GET    /api/dishes
GET    /api/dishes/:id
POST   /api/dishes
PUT    /api/dishes/:id
DELETE /api/dishes/:id
```

Ejemplos de filtros:

```text
GET /api/dishes?section=pastas
GET /api/dishes?section=pastas&vegetarian=true
GET /api/dishes?typeOfDish=plato%20principal
```

### Chefs

```text
GET    /api/chefs
GET    /api/chefs/:id
POST   /api/chefs
PUT    /api/chefs/:id
DELETE /api/chefs/:id
GET    /api/chefs/:id/dishes
```

Las rutas de usuarios, registro, login y autorización JWT se agregarán durante la implementación del segundo parcial.

## Base de datos

El proyecto utiliza MongoDB. La base de datos configurada para el proyecto es `AH20232CP1`.

Colecciones principales:

```text
dishes
chefs
usuarios
```

La relación entre platos y chefs se establece mediante el identificador del chef almacenado en cada plato.

## Requisitos

- Node.js instalado.
- pnpm instalado.
- Una instancia de MongoDB local o una conexión a MongoDB Atlas.

## Instalación del backend

Ingresar a la carpeta del backend e instalar sus dependencias:

```bash
cd backend
pnpm install
```

Crear un archivo `.env` dentro de `backend`:

```env
PORT=3333
MONGODB_URI=<URL_DE_CONEXION>
DB_NAME=AH20232CP1
```

Iniciar el servidor en modo desarrollo:

```bash
pnpm dev
```

También puede iniciarse en modo normal:

```bash
pnpm start
```

La API queda disponible en:

```text
http://localhost:3333
```

## Frontend

La carpeta `frontend` está reservada para la aplicación React del segundo parcial. Allí se incorporarán:

- Las páginas y componentes de la interfaz.
- El Router para las distintas vistas.
- El contexto de sesión.
- Los servicios separados para consumir la API.
- Los formularios y validaciones.
- Las rutas protegidas para administradores.

Cuando el frontend esté implementado, se instalará y ejecutará desde esa carpeta:

```bash
cd frontend
pnpm install
pnpm dev
```

## Estructura del proyecto

```text
.
├── backend/
│   ├── api/
│   │   ├── controllers/
│   │   └── routes/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── views/
│   ├── app.js
│   └── package.json
├── frontend/
├── clase_21/
│   ├── back/
│   └── front/
├── CONSIGNAS_PARCIAL.md
└── README.md
```

La carpeta `clase_21` contiene ejemplos trabajados durante la cursada. Se utilizará como referencia para aplicar los patrones de autenticación, servicios, middleware, Context, Router y CRUD React al dominio de este proyecto.

## Objetivos del segundo parcial

- Separar la interfaz React de la API REST.
- Mantener una división clara entre rutas, controladores, servicios, middlewares y esquemas.
- Implementar registro, login y autenticación JWT.
- Validar datos en backend y frontend.
- Gestionar el estado de sesión mediante Context API.
- Implementar el CRUD de platos y chefs desde React.
- Restringir las operaciones de modificación a usuarios administradores.

## Variables de entorno

Los archivos `.env` no deben subirse al repositorio. Deben entregarse por separado, de acuerdo con la consigna del parcial.

## Autor

**Tito Valentín**<br>
Materia: Aplicaciones Híbridas<br>
Parcial: Segundo parcial<br>
Año: 2026