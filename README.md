# UberClone

## Members

Jhoner Alexander Mesa Vargas
Yein Alexa Casas Velez
 
## Description

uberClone is a mobile transportation application developed with React Native CLI for the Front-end and Node.js along with Firebase for the Back-end. The application manages user registration, login, and real-time trip requests. It handles multiple fare rates and integrates with the Google Maps API for navigation and real-time trip tracking. Additionally, it integrates the Mercado Pago API for 100% real payment processing. The system also includes a client rating system and full multi-language support (English and Spanish). The project follows a clean architectural pattern based on Controllers, Routes, and Services, using native Hooks for dynamic state management.

## Installation and Execution Instructions

### Clone the repository
```bash
git clone https://github.com/tu-usuario/UberClone.git
cd UberClone
```
### Install dependencies
```bash
npm install
```
### Install additional dependencies

# Navigation
```
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens
npm install react-native-safe-area-context
```
# Payment Gateway and Web Components
```
npm install mercadopago
npm install react-native-webview
npm install react-native-vector-icons
```
### Android SDK Configuration (Only if connection errors occur)

Create a file named local.properties inside the android folder 
of the project and add your local Android SDK path:

`sdk.dir = C:\\Users\\YOUR_USER\\AppData\\Local\\Android\\Sdk`

### Run the application

1. Enable developer mode on your mobile device.
2. Enable USB debugging.
3. Connect the device to your computer.

Then run
```
npx react-native start

```
This is to initialize Metro.

At another terminal
```
npx react-native run-android

```
This performs the respective execution and installation 
of the application.

### Technologies Used

* JavaScript
* React Native CLI
* Node.js
* React Navigation
* Android SDK
