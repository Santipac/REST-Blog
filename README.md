# API-Blog

### Este proyecto es una RESTful-API para un proyecto de Blog en el que estoy trabajando. 
* Se pueden autenticar y registrar usuarios directamente a la DB.
* Se pueden realizar operaciones CRUD para los modelos de User y Post.


### Tecnologías y Herramientas:
* Node.JS
* Express
* Typescript
* JWT
* Prisma ORM
* PostgreSQL
* Postman

### Guía Auth
| Routes |  Endpoint|  Method | Use |
| ------------- |:-------------:| -----|------- |
| auth | signup  | POST | Registrar Usuario |
| |  / | POST | Iniciar Sesión |
| |  refresh |  GET| Refrescar Token de Usuario |

### Guía Users
| Routes |  Endpoint|  Method | Use |
| ------------- |:-------------:| -----|------- |
| users |  /  | GET  | Recibir todos los Usuarios|
|  |  / :id  | GET  | Recibir unico Usuario|
|  |  / :id  | DELETE  | Eliminar Usuario por ID |
|  |  / :id  | PATCH  | Actualizar Usuario por ID|


### Guía Posts
| Routes |  Endpoint|  Method | Use |
| ------------- |:-------------:| -----|------- |
| posts | / |  POST  | Crear Post |
|  | / |  GET  | Recibir todos los Posts |
|  | / :id |  GET  | Recibir unico Post |
|  | / :id |  PATCH  | Actualizar Post |
|  | / :id |  DELETE  | Eliminar Post |
