# Sabores - API de Restaurante

API web desarrollada como proyecto para el **Parcial 1 de Aplicaciones Híbridas** de la carrera de Tecnicatura Superior en Diseño y Programación Web.

El proyecto consiste en una API para gestionar el menú de un restaurante, permitiendo consultar, crear, modificar y eliminar platos, además de administrar los chefs asociados a cada preparación.

## Tecnologías

- Node.js
- Express
- JavaScript
- pnpm
- MongoDB
- ECMAScript Modules (ES Modules)

## Temática

La aplicación representa un restaurante llamado **Sabores**, organizado mediante diferentes categorías de platos.

Las secciones principales del menú son:

- Entradas
- Platos principales
- Pastas
- Postres
- Bebidas

Al seleccionar una sección, se muestran únicamente los platos correspondientes a esa categoría.

## Entidades

### Plato

Cada plato contiene información como:

- Nombre
- Descripción
- Precio
- Imagen
- Sección
- Tipo de plato
- Información sobre si es vegetariano
- Chef responsable

Ejemplo:

```json
{
  "name": "Ravioles de ricota",
  "description": "Ravioles caseros rellenos de ricota y espinaca.",
  "price": 8500,
  "image": "https://picsum.photos/400/225",
  "section": "pastas",
  "typeOfDish": "plato principal",
  "vegetarian": true,
  "chefId": "..."
}
```

### Chef

Los chefs representan la segunda entidad relacionada con los platos.

Cada chef contiene:

- Nombre
- Foto
- Descripción

Un chef puede no tener platos asociados, mientras que cada plato pertenece a un chef determinado.

## Funcionalidades

### Platos

La API permite:

- Obtener todos los platos.
- Filtrar platos por sección.
- Filtrar platos utilizando dos campos.
- Obtener un plato específico.
- Crear un nuevo plato.
- Modificar un plato existente.
- Eliminar un plato.

### Chefs

La API permite:

- Obtener todos los chefs.
- Crear un nuevo chef.
- Obtener un chef específico.
- Modificar un chef existente.
- Eliminar un chef.
- Obtener todos los platos pertenecientes a un chef determinado.

## Endpoints

### Platos

```text
GET    /api/dishes
GET    /api/dishes/:id
POST   /api/dishes
PUT    /api/dishes/:id
DELETE /api/dishes/:id
```

### Filtrado

Ejemplo de filtrado por sección:

```text
GET /api/dishes?section=pastas
```

Ejemplo de filtrado utilizando dos campos:

```text
GET /api/dishes?section=pastas&vegetarian=true
```

### Chefs

```text
GET  /api/chefs
POST /api/chefs
GET  /api/chefs/:id
PUT  /api/chefs/:id
DELETE /api/chefs/:id
GET  /api/chefs/:id/dishes
```

## Base de datos

El proyecto utiliza MongoDB.

La base de datos se denomina:

```text
AH20232CP1
```

Colecciones principales:

```text
dishes
chefs
```

La relación entre ambas entidades se establece mediante el identificador del chef dentro de cada plato.

```text
Chef
 │
 ├── Plato
 ├── Plato
 └── Plato
```

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar a la carpeta del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

Instalar las dependencias:

```bash
pnpm install
```

Crear el archivo `.env` con las variables de entorno necesarias para la conexión a MongoDB.

Ejemplo:

```env
PORT=3333
MONGODB_URI=<URL_DE_CONEXION>
DB_NAME=AH20232CP1
```

Iniciar el servidor:

```bash
pnpm start
```

La aplicación se ejecutará en:

```text
http://localhost:3333
```

## Estructura del proyecto

La aplicación se organiza separando las responsabilidades entre las diferentes capas:

```text
api/
├── controllers/
└── routes/
config/
controllers/
routes/
services/
app.js
```

La estructura busca mantener separadas las responsabilidades de las rutas, controladores, servicios, API y vistas.

## Objetivo académico

El objetivo del proyecto es aplicar los contenidos trabajados en la materia **Aplicaciones Híbridas**, utilizando Node.js, Express, MongoDB, JavaScript y ECMAScript Modules para desarrollar una API web funcional.

El proyecto contempla:

- Modelado de una base de datos.
- Operaciones CRUD.
- Filtrado de información.
- Relación entre entidades.
- Creación de endpoints.
- División de responsabilidades.
- Generación de páginas dinámicas.
- Uso del driver nativo de MongoDB.
- Uso de Express.

## Autor

**Tito Valentín**
**Materia:** Aplicaciones Híbridas
**Parcial:** Parcial 1
**Año:** 2026
