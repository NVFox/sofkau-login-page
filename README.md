# Sofkau Login Page

## Estructura del Proyecto

```text
sofkau-login-page/
├── .env                   # Variables de entorno para URLs de servicios
├── .gitignore             # Reglas de exclusión para Git
├── nodemon.json           # Configuración para recarga automática
├── package.json           # Dependencias y scripts del proyecto
├── postcss.config.js      # Configuración de PostCSS
├── public/                # Archivos públicos estáticos
│   └── v1/
│       ├── index.html     # Páginas HTML estáticas
│       └── script.js      # Scripts del cliente
├── src/
│   ├── client/            
│   │   ├── config/        # Configuraciones específicas del cliente
│   │   ├── events/        # Sistema de eventos para la comunicación entre componentes
│   │   ├── handlers/      # Manejadores de errores y otras operaciones
│   │   ├── helpers/       # Funciones útiles para validación y otras operaciones
│   │   ├── services/      # Servicios de API y lógica de negocio
│   │   ├── validation/    # Validación de formularios
│   │   ├── main.css       # Punto de entrada principal de Tailwind CSS
│   │   ├── login.ts       # Punto de entrada principal del cliente (vista login)
│   │   ├── signup.ts      # Punto de entrada principal del cliente (vista signup)
│   │   ├── profile.ts     # Punto de entrada principal del cliente (vista profile)
│   │   └── tsconfig.json  # Configuración de TypeScript para el cliente
│   ├── server/        
│   │   ├── config/        # Configuraciones específicas del servidor
│   │   ├── controllers/   # Controladores de la API
│   │   ├── exceptions/    # Excepciones personalizadas
│   │   ├── handlers/      # Manejadores globales
│   │   ├── middlewares/   # Middleware de Express
│   │   ├── routes/        # Rutas de la API
│   │   ├── services/      # Servicios de API
│   │   ├── views/         # Vistas renderizables
│   │   └── main.ts        # Entrada del servidor
│   └── shared/            
│       ├── models/        # Modelos de la aplicación
│       ├── request/       # Tipos de peticiones
│       ├── responses/     # Tipos de respuestas
│       └── validation/    # Esquemas de validación (zod)
├── tailwind.config.js     # Configuración de Tailwind CSS
├── tsconfig.json          # Configuración global de TypeScript
└── webpack.config.js      # Configuración de empaquetado
```

### Descripción de Carpetas

- **src/client**: Contiene el código del lado del cliente, incluyendo validaciones y manejo de peticiones HTTP.
- **src/server**: Contiene el código del lado del servidor, incluyendo controladores, manejadores y rutas.
- **src/shared**: Contiene el código compartido entre cliente y servidor, incluyendo modelos, peticiones, respuestas y esquemas de validación.
- **public**: Contiene archivos estáticos, como el archivo HTML principal, heredado de la primera versión de este proyecto.

## Arquitectura del lado del servidor (`src/server`)

El servidor está construido utilizando Node.js y Express. A continuación, se describen los módulos implementados y algunos puntos clave:

### Módulos implementados en el servidor

- **config**: Contiene configuraciones específicas del servidor, como la configuración de Axios.
- **controllers**: Maneja las solicitudes HTTP entrantes y define la lógica de negocio.
- **exceptions**: Define excepciones personalizadas para manejar errores específicos.
- **handlers**: Contiene manejadores globales para errores y otras operaciones.
- **middlewares**: Incluye middleware de Express para procesar solicitudes y respuestas.
- **routes**: Define las rutas de la API y las asocia con los controladores correspondientes.
- **services**: Implementa la lógica de negocio y la interacción con bases de datos u otros servicios.
- **views**: Contiene las vistas renderizables del servidor, utilizando plantillas EJS para generar HTML dinámico.
- **main.ts**: Punto de entrada principal del servidor que inicia la aplicación.

### Puntos clave en el servidor

- Tipado estático con TypeScript
- Manejo de peticiones HTTP asíncronas con Axios
- Validación de endpoints y peticiones con Zod
- Servidor de desarrollo con integración de nodemon y webpack
- Generación de vistas dinámicas con ejs
- Seguridad y protección de endpoints con middleware
- Configuración de variables de entorno con dotenv

### Tecnologías utilizadas en el servidor

- **TypeScript**: Para tipado estático y desarrollo más seguro.
- **Node.js**: Para ejecutar JavaScript en el servidor.
- **Express**: Para la creación de la API y manejo de rutas.
- **Axios**: Para manejo de peticiones HTTP asíncronas.
- **Zod**: Para validación de endpoints y peticiones.
- **nodemon**: Para recarga automática del servidor en desarrollo.
- **ejs**: Para generar HTML dinámico con plantillas.
- **dotenv**: Para configuración de variables de entorno.
- **Express Middleware**: Para seguridad y protección de endpoints.

## Arquitectura del lado del cliente (`src/client`)

El cliente está construido utilizando JavaScript, Webpack y Tailwind CSS. A continuación, se describen los módulos implementados y algunos puntos clave:

### Módulos implementados en el cliente

- **config**: Contiene configuraciones específicas del cliente, como la configuración de Axios.
- **events**: Implementa un sistema de eventos para la comunicación entre componentes.
- **handlers**: Contiene manejadores de errores y otras operaciones.
- **helpers**: Contiene funciones útiles para la validación u otras operaciones.
- **services**: Implementa la lógica de negocio y la interacción con APIs.
- **validation**: Contiene esquemas de validación y validaciones concretas para formularios.
- **main.css**: Punto de entrada principal de Tailwind CSS
- **login.ts**: Punto de entrada principal del cliente (para la vista login).
- **signup.ts**: Punto de entrada principal del cliente (para la vista signup).
- **profile.ts**: Punto de entrada principal del cliente (para la vista profile).
- **tsconfig.json**: Configuración de TypeScript para el cliente.

### Puntos clave en el cliente

- Tipado estático con TypeScript
- Manejo de peticiones HTTP asíncronas con Axios
- Validación de formularios con Zod
- Estilos personalizados y responsivos con Tailwind CSS
- Empaquetado y optimización del código con Webpack
- Configuración de variables de entorno con dotenv

### Tecnologías utilizadas en el cliente

- **TypeScript**: Para tipado estático y desarrollo más seguro.
- **JavaScript (ES6+)**: Para la lógica del cliente.
- **Webpack**: Para empaquetar y optimizar el código.
- **Tailwind CSS**: Para estilos personalizados y responsivos.
- **Axios**: Para manejo de peticiones HTTP asíncronas.
- **Zod**: Para validación de formularios.
- **dotenv**: Para configuración de variables de entorno.

## Instrucciones

Sigue estos pasos para clonar el repositorio, instalar las dependencias y ejecutar el servidor para ver la aplicación en funcionamiento.

### Clonación del Repositorio

Primero, clona el repositorio desde GitHub a tu máquina local:

```bash
git clone <repository-url>
cd sofkau-login-page
```

### Instalación de Dependencias

Instala las dependencias necesarias tanto para el cliente como para el servidor:

```bash
npm install
```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias. Puedes basarte en el archivo `.env.example` proporcionado en el repositorio.

### Ejecución del Servidor

Para iniciar el servidor en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Este comando iniciará tanto el servidor como el cliente utilizando nodemon y webpack para recarga automática.

### Vista de la Aplicación

Abre tu navegador y navega a `http://localhost:9000` o en el puerto que hayas configurado en tu archivo `.env` para ver la aplicación en funcionamiento.

### Scripts Disponibles

- `npm run dev`: Inicia el servidor y el cliente en modo desarrollo con recarga automática.
- `npm run build`: Compila el código del cliente para producción.

### Notas Adicionales

- Asegúrate de tener Node.js (mínimo v16 en adelante) y npm instalados en tu máquina.
- Verifica que las variables de entorno estén correctamente configuradas antes de iniciar el servidor.

Con estos pasos, deberías poder clonar, configurar y ejecutar el proyecto sin problemas.
