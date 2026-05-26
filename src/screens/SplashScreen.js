import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles from '../styles/SplashStyles'; // Tus estilos del fondo negro y logo centrado

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Mantiene la barra superior del celular negra */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Tu logo sin fondo centrado */}
      <Image
        source={require('../assets/splash_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
