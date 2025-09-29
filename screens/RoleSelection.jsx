// screens/RoleSelection.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleSelection({ navigation }) {
  return (
    <LinearGradient
      colors={['#8b5cf6', '#ec4899']} // purple → pink gradient background
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* ✅ Styled Logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/citisolve.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Welcome to CitiSolve</Text>
        <Text style={styles.subtitle}>Select your role</Text>

        {/* User Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserLogin')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>

        {/* Admin Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminLogin')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>

        {/* Vendor Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ContractorLogin')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Contaractor</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // ✅ Logo with shadow and background
  logoWrapper: {
    padding: 12,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)', // frosted glass effect
    marginBottom: 20,
    shadowColor: '#cb76f9ff',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 4 },
    elevation: 0,
  },
  logo: { width: 120, height: 120, resizeMode: 'contain' },

  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#f1f5f9',
    marginBottom: 24,
  },

  // ✅ All buttons styled with matching purple
  button: {
    width: 220,
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#7c3aedff', // deep purple to match gradient
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
