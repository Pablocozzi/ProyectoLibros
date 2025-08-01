Sistema web de venta de libros.

Se utiliza: 

- Node.js + Express
- HTML5, CSS3 y Tailwind CSS
- JavaScript (ES6)
- JSON como base de datos simulada
- Fetch API
- Postman (para pruebas de endpoints)

Estructura del proyecto: 

- /pages → vistas home.html, admin.html, carrito.html
- /data → archivos users.json, ventas.json, data.json
- /routes → rutas del backend (user.routes.js, ventas.routes.js)
- index.js → servidor principal

Base de datos:

Los datos se encuentran en formato JSON:
- users.json: contiene usuarios con userName, pass, y rol (admin o usuario)
- ventas.json: lista de órdenes registradas por usuario
- data.json: catálogo de libros

Funcionalidades implementadas:

Login con roles (usuario / admin):
Vista de usuario: 
- Visualización de productos por categoría
- Carrito de compras con almacenamiento local
- Generación de orden de compra
- Cierre de sesión

Vista de administrador:
- Ver todas las ventas
- Filtrar ventas por usuario
- Total de ventas
- Resumen de libros vendidos
- Modificar usuario / cantidad
- Eliminar ventas
- Cierre de sesión

Pruebas y verificación

- Todos los endpoints fueron testeados en Postman (GET, POST, PUT, DELETE)
- Se validan errores y respuestas
- Mensajes claros al usuario desde el frontend

Video con explicación del funcionamiento general del sistema:

https://drive.google.com/file/d/1E7KgTWlBfhpppRBhh5WbLZi9B6L5dxAx/view?usp=drive_link
