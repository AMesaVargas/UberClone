# uberClone

## Integrantes

Jhoner Alexander Mesa Vargas
 Yein Alexa Casas Velez
 
## Descripción

uberClone es una aplicación móvil de transporte desarrollada con React Native CLI para el Front-end y Node.js junto a Firebase para el Back-end. La aplicación permite gestionar usuarios, solicitar viajes en tiempo real, calcular rutas y procesar pagos de manera 100% real mediante la integración asíncrona de la pasarela de Mercado Pago. El proyecto sigue un patrón arquitectónico limpio basado en Controladores, Rutas y Servicios, utilizando Hooks nativos para el manejo dinámico del estado.

## Instrucciones de instalación y ejecución

### Clonar el repositorio

git clone https://github.com/tu-usuario/uberClone.git
cd uberClone

### Instalar dependencias

npm install

### Instalar dependencias adicionales

# Navegación
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens
npm install react-native-safe-area-context

# Pasarela de Pagos y Componentes Web
npm install mercadopago
npm install react-native-webview
npm install react-native-vector-icons

### Configuración del Android SDK (Solo si presenta errores de conexión)

Crear un archivo llamado `local.properties` dentro de la carpeta `android` del proyecto y agregar la ruta local de tu Android SDK:
`sdk.dir = C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk`

### Ejecutar la aplicación

1. Activar el modo desarrollador en el dispositivo móvil.
2. Activar la depuración USB.
3. Conectar el dispositivo al computador.
4. Luego ejecutar en una terminal para inicializar Metro:
   ```bash
   npx react-native start
   npx react- native run-android 
   
