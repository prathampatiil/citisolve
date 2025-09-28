// screens/SplashScreen.jsx
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/citisolve.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Sub Text */}
      <Text style={styles.tagline}>Solving City Problems Together</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4500', // ✅ red-orange background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 0,
  },
});

