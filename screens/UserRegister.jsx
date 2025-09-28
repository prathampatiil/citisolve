// screens/UserRegister.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';

export default function UserRegister({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AuthForm
          type="register"
          role="User"
          onSubmit={() => navigation.replace('UserDrawer')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   // center vertically
    alignItems: 'center',       // center horizontally
    backgroundColor: '#f0f4f8', // soft background
  },
  card: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Android shadow
  },
});
