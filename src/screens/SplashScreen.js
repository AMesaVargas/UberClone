import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles from '../styles/SplashStyles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Image
        source={require('../assets/splash_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
