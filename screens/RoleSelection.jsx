// screens/RoleSelection.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../theme';

export default function RoleSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/citisolve.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to CitiSolve</Text>
      <Text style={styles.subtitle}>Select your role</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserLogin')}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContractorLogin')}
      >
        <Text style={styles.buttonText}>Vendor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    backgroundColor: theme.colors.background, // dark teal background
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.colors.textDark, // light teal
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.textLight, // softer teal
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginVertical: 8,
    // ✅ shadows for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6, // for Android
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 18,
  },
});
