// screens/AdminLogin.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';

export default function AdminLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AuthForm
          type="login"
          role="Admin"
          onSubmit={() => navigation.replace('AdminDrawer')}
        />

        {/* 👇 Register link */}
        <TouchableOpacity onPress={() => navigation.navigate('AdminRegister')}>
          <Text style={styles.registerText}>No account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   
    alignItems: 'center',       
    backgroundColor: '#0D1B2A', // ✅ Dark navy background
  },
  card: {
    width: '85%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6, // Android shadow
  },
  registerText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#1E88E5', // blue accent for links
    fontWeight: '600',
  },
});
