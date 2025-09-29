// screens/UserLogin.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthForm from '../components/AuthForm';

export default function UserLogin({ navigation }) {
  return (
    <LinearGradient
      colors={['#004d40', '#00796b']} // ✅ dark → medium teal gradient
      style={styles.container}
    >
      <View style={styles.card}>
        <AuthForm
          type="login"
          role="User"
          onSubmit={() => navigation.replace('UserDrawer')}
        />

        {/* Register link */}
        <TouchableOpacity
          onPress={() => navigation.navigate('UserRegister')}
          activeOpacity={0.8}
          style={styles.registerWrapper}
        >
          <Text style={styles.registerText}>
            No account? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    padding: 22,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8, // Android shadow
  },
  registerWrapper: {
    marginTop: 16,
    paddingVertical: 10,
  },
  registerText: {
    textAlign: 'center',
    color: '#004d40',
    fontSize: 14,
  },
  registerLink: {
    color: '#26a69a', // brighter teal accent
    fontWeight: '700',
  },
});
