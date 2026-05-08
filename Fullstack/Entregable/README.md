# Sistema de Gestión para Botica Nova Salud

## Descripción

Sistema integral de gestión farmacéutica desarrollado con tecnologías modernas para la administración eficiente de inventario, procesamiento de ventas y control de stock. Implementa autenticación segura mediante JWT y proporciona una interfaz web responsiva para la gestión operativa diaria.

## Características Principales

- **Gestión de Inventario**: Operaciones CRUD completas para productos farmacéuticos con validación de stock
- **Sistema de Ventas**: Procesamiento de transacciones con cálculo automático de totales y actualización en tiempo real del inventario
- **Alertas de Stock**: Sistema de notificaciones para productos con niveles de inventario críticos
- **Autenticación y Autorización**: Implementación de JWT para control de acceso seguro con encriptación de contraseñas
- **Interfaz de Usuario**: Aplicación web responsiva desarrollada con Bootstrap 5
- **API REST**: Endpoints documentados para integración con sistemas externos
- **Base de Datos NoSQL**: Modelado de datos con MongoDB y Mongoose

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución JavaScript del lado del servidor
- **Express.js**: Framework web minimalista para Node.js
- **MongoDB**: Base de datos NoSQL orientada a documentos
- **Mongoose**: ODM (Object Document Mapping) para MongoDB

### Seguridad
- **JWT (JSON Web Tokens)**: Estándar para autenticación stateless
- **bcrypt**: Librería para hash de contraseñas

### Frontend
- **EJS**: Motor de plantillas para renderizado del lado del servidor
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **JavaScript ES6+**: Lógica del lado del cliente

### Herramientas de Desarrollo
- **Nodemon**: Herramienta para reinicio automático del servidor en desarrollo
- **CORS**: Middleware para manejo de solicitudes cross-origin
- **dotenv**: Gestión de variables de entorno

## Requisitos del Sistema

- **Node.js**: Versión 16.0.0 o superior
- **MongoDB**: Versión 4.4 o superior (Community Server recomendado)
- **Sistema Operativo**: Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Memoria RAM**: Mínimo 4GB
- **Espacio en Disco**: 500MB para instalación y datos

## Instalación

### 1. Clonación del Repositorio
```bash
git clone https://github.com/wonderlord007/Entregables-.git
cd EJEMPLONODEJS
```

### 2. Instalación de Dependencias
```bash
npm install
```

### 3. Configuración de Variables de Entorno

El proyecto incluye un archivo `.env` preconfigurado. Verificar y ajustar las siguientes variables según sea necesario:

```env
# Puerto del servidor
PORT=3000

# URI de conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/botica_nova_salud

# Clave secreta para JWT (IMPORTANTE: cambiar en producción)
JWT_SECRET=mi_clave_jwt_muy_segura_para_produccion_2024_abcdef123456

# Configuración adicional (opcional)
NODE_ENV=development
```

**Importante**: 
- La clave JWT_SECRET debe ser única y segura. Se recomienda generar una cadena aleatoria de al menos 32 caracteres.
- En producción, cambiar JWT_SECRET por una clave generada aleatoriamente.
- Ajustar MONGODB_URI según la configuración de MongoDB.

### 4. Configuración de MongoDB

Asegurar que MongoDB esté ejecutándose en el puerto 27017 (puerto por defecto). Para iniciar MongoDB:

**Windows**:
```bash
net start MongoDB
```

**Linux/macOS**:
```bash
sudo systemctl start mongod
# o
mongod
```

## Configuración y Despliegue

### Modo de Desarrollo
```bash
npm run dev
```

### Modo de Producción
```bash
npm start
```

El servidor iniciará en `http://localhost:3000` por defecto.

## Uso del Sistema

### Autenticación
1. **Registro**: Crear una cuenta de usuario proporcionando email y contraseña
2. **Inicio de Sesión**: Autenticarse con credenciales válidas para obtener acceso al sistema

### Gestión de Productos
- **Visualización**: Lista completa de productos con información de stock
- **Creación**: Agregar nuevos productos especificando nombre, precio, stock actual y stock mínimo
- **Modificación**: Actualizar información de productos existentes
- **Eliminación**: Remover productos del inventario

### Procesamiento de Ventas
- **Creación de Ventas**: Seleccionar productos y cantidades para procesar transacciones
- **Validación Automática**: Verificación de disponibilidad de stock antes de confirmar ventas
- **Cálculo de Totales**: Computación automática de montos totales
- **Actualización de Inventario**: Descuento automático del stock vendido

## Documentación de API

### Endpoints de Autenticación
```
POST /api/auth/register
- Descripción: Registro de nuevos usuarios
- Body: { "email": "string", "password": "string" }

POST /api/auth/login
- Descripción: Autenticación de usuarios
- Body: { "email": "string", "password": "string" }
- Respuesta: { "token": "jwt_token", "user": {...} }
```

### Endpoints de Productos
```
GET /api/productos
- Descripción: Obtener lista completa de productos

POST /api/productos
- Descripción: Crear nuevo producto
- Body: { "nombre": "string", "precio": number, "stock_actual": number, "stock_minimo": number }

GET /api/productos/:id
- Descripción: Obtener producto específico

PUT /api/productos/:id
- Descripción: Actualizar producto existente

DELETE /api/productos/:id
- Descripción: Eliminar producto
```

### Endpoints de Ventas
```
GET /api/ventas
- Descripción: Obtener historial de ventas

POST /api/ventas
- Descripción: Crear nueva venta
- Body: { "productos": [{ "producto": "ObjectId", "cantidad": number }] }
```

## Arquitectura del Sistema

```
Entregable/
├── config/
│   └── db.js                 # Configuración de conexión a base de datos
├── controllers/
│   ├── authController.js     # Lógica de negocio para autenticación
│   ├── productos.controller.js # Controladores para gestión de productos
│   └── ventas.controller.js  # Controladores para procesamiento de ventas
├── models/
│   ├── authModel.js          # Esquema de usuario para autenticación
│   ├── Producto.js           # Esquema de producto con validaciones
│   └── Venta.js              # Esquema de venta con referencias
├── routes/
│   ├── auth.routes.js        # Definición de rutas de autenticación
│   ├── productos.routes.js   # Rutas para operaciones de productos
│   └── ventas.routes.js      # Rutas para operaciones de ventas
├── services/
│   └── authService.js        # Servicios de autenticación y validación
├── views/
│   └── index.ejs             # Plantilla principal de la interfaz
├── index.js                  # Punto de entrada de la aplicación
├── package.json              # Metadatos y dependencias del proyecto
├── .env                      # Variables de entorno (no versionado)
└── README.md                 # Documentación del proyecto
```

## Consideraciones de Seguridad

- **Encriptación de Contraseñas**: Uso de bcrypt con salt rounds configurables
- **Tokens JWT**: Implementación de expiración automática de sesiones
- **Validación de Datos**: Sanitización de inputs en todos los endpoints
- **Control de Acceso**: Middleware de autenticación para rutas protegidas
- **Variables de Entorno**: Configuración segura sin exposición de credenciales

## Solución de Problemas

### Error de Conexión a MongoDB
- Verificar que MongoDB esté ejecutándose: `mongod --version`
- Comprobar la URI de conexión en el archivo `.env`
- Asegurar que no existan procesos bloqueando el puerto 27017

### Error de Puerto Ocupado
- Modificar la variable `PORT` en `.env` a un puerto disponible
- Identificar procesos usando el puerto: `netstat -ano | findstr :3000`

### Problemas con Dependencias
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Errores de Autenticación
- Verificar que `JWT_SECRET` esté correctamente configurado
- Comprobar expiración de tokens (por defecto 24 horas)

## Scripts Disponibles

```json
{
  "start": "node index.js",
  "dev": "npx nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para la nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realizar commits descriptivos (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.

## Soporte

Para soporte técnico o consultas sobre el sistema, contactar al equipo de desarrollo.

---

**Botica Nova Salud** - Sistema de gestión farmacéutica profesional.