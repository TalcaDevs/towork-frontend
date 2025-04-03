```
ToWork - Plataforma Web para estudiantes recién egresados
```

"To Work" es una plataforma web diseñada para estudiantes recién egresados que buscan posicionarse eficazmente en el mercado laboral.

Estructura del Proyecto
```
towork-frontend/
│
├── node_modules/            # Dependencias instaladas
├── public/                  # Archivos estáticos accesibles públicamente
│   └── icons/               # Iconos del sistema
│
├── src/                     # Código fuente de la aplicación
│   ├── assets/              # Recursos estáticos
│   │   ├── icons/           # Componentes de iconos SVG
│   │   │   ├── ArrowRightIcon.tsx
│   │   │   ├── ArrowUpRightIcon.tsx
│   │   │   ├── ClockIcon.tsx
│   │   │   ├── CurrencyDollarIcon.tsx
│   │   │   ├── FacebookIcon.tsx
│   │   │   ├── FileTextIcon.tsx
│   │   │   ├── GitHubIcon.tsx
│   │   │   ├── InstagramIcon.tsx
│   │   │   ├── LightbulbIcon.tsx
│   │   │   ├── LikesIcon.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── MapPinIcon.tsx
│   │   │   ├── PackageIcon.tsx
│   │   │   ├── PrinterIcon.tsx
│   │   │   ├── SearchIcon.tsx
│   │   │   ├── StarBlueIcon.tsx
│   │   │   └── StarPurpleIcon.tsx
│   │   └── react.svg
│   │
│   ├── components/          # Componentes reutilizables
│   │   ├── sections/        # Secciones de página
│   │   │   ├── BentoSection.tsx
│   │   │   ├── CardSection.tsx
│   │   │   ├── Herosection.tsx
│   │   │   ├── ShowcaseSection.tsx
│   │   │   └── WelcomeSection.tsx
│   │   │
│   │   ├── Button.tsx       # Componente de botón
│   │   ├── Cards.tsx        # Componente de tarjeta
│   │   ├── Footer.tsx       # Pie de página
│   │   ├── Input.tsx        # Componente de entrada
│   │   ├── Navbar.tsx       # Barra de navegación
│   │   ├── SearchInput.tsx  # Entrada de búsqueda
│   │   ├── SignIn.tsx       # Formulario de inicio de sesión
│   │   ├── Tag.tsx          # Etiqueta/tag para categorías
│   │   └── Title.tsx        # Componente de título
│   │
│   ├── data/                # Datos mock y constantes
│   │   └── mockCards.ts     # Datos de ejemplo para tarjetas
│   │
│   ├── interfaces/          # Definiciones de tipos TypeScript
│   │   ├── auth.interface.ts
│   │   ├── button.interface.ts
│   │   ├── cards.interface.ts
│   │   ├── icons.interface.ts
│   │   ├── jobCategory.interface.ts
│   │   ├── navLink.interface.ts
│   │   ├── searchInput.interface.ts
│   │   ├── tag.interface.ts
│   │   ├── title.interface.ts
│   │   └── types.ts
│   │
│   ├── pages/               # Páginas o vistas principales
│   │   ├── Home.tsx         # Página de inicio
│   │   ├── Profile.tsx      # Página de perfil de usuario
│   │   ├── SignIn.tsx       # Página de inicio de sesión
│   │   └── SignUp.tsx       # Página de registro
│   │
│   ├── routes/              # Configuración de rutas
│   │   └── routes.ts        # Definición de rutas
│   │
│   ├── services/            # Servicios para comunicación con API
│   │   └── AuthService.ts   # Servicio de autenticación
│   │
│   ├── App.css              # Estilos para el componente App
│   ├── App.tsx              # Componente principal de la aplicación
│   ├── index.css            # Estilos globales
│   ├── main.tsx             # Punto de entrada de la aplicación
│   └── vite-env.d.ts        # Declaraciones de tipos para Vite
│
├── .env                     # Variables de entorno locales
├── .gitignore               # Archivos ignorados por Git
├── eslint.config.js         # Configuración de ESLint
├── index.html               # Plantilla HTML principal
├── package.json             # Dependencias y scripts
├── pnpm-lock.yaml           # Bloqueo de versiones de dependencias
├── README.md                # Documentación del proyecto
├── tailwind.config.js       # Configuración de Tailwind CSS
├── tsconfig.app.json        # Configuración de TypeScript para la aplicación
├── tsconfig.json            # Configuración general de TypeScript
├── tsconfig.node.json       # Configuración de TypeScript para Node
└── vite.config.ts           # Configuración de Vite
```
Descripción de las Carpetas Principales
```
assets: Contiene recursos estáticos como iconos SVG, imágenes y otros elementos visuales utilizados en la aplicación. Todos los iconos están implementados como componentes de React para facilitar su uso y personalización.
components: Incluye todos los componentes reutilizables de la aplicación:
```
```
components: Incluye todos los componentes reutilizables de la aplicación:
Button: Componente de botón personalizable con diferentes variantes y tamaños.
Cards: Tarjetas para mostrar información de trabajos o artículos.
Navbar: Barra de navegación principal.
SearchInput: Campo de búsqueda con sugerencias automáticas.
sections/: Componentes más grandes que representan secciones completas de una página.
```
```
data: Almacena datos mock para desarrollo y pruebas, así como constantes utilizadas en la aplicación.
interfaces: Contiene todas las definiciones de tipos TypeScript utilizadas en el proyecto, asegurando un código fuertemente tipado.
pages: Páginas principales de la aplicación, como Home, SignIn, SignUp y Profile.
routes: Configuración del sistema de rutas de la aplicación.
services: Servicios para la comunicación con APIs externas, como el AuthService para la autenticación de usuarios.
```
Tecnologías Utilizadas
```
React: Biblioteca principal para la construcción de interfaces de usuario.
TypeScript: Lenguaje tipado que extiende JavaScript para mejorar la calidad del código.
Tailwind CSS: Framework de utilidades CSS para un diseño rápido y consistente.
Vite: Herramienta de compilación y desarrollo de alta velocidad.
React Router: Para la navegación entre páginas.
```
Instalación y Configuración
```
Clona el repositorio:
bashCopiargit clone https://github.com/tu-usuario/towork-frontend.git
cd towork-frontend
```
Instala las dependencias:
```
pnpm install
```
Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto basado en .env.example.

Inicia el servidor de desarrollo:
```
pnpm dev
```
Abre tu navegador en http://localhost:5173

Scripts Disponibles
```
dev: Inicia el servidor de desarrollo.
build: Compila la aplicación para producción.
lint: Ejecuta el linter para detectar problemas de código.
```
