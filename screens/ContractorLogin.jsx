// screens/ContractorLogin.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function ContractorLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing', 'Enter email and password');
      return;
    }
    // In frontend-only demo, accept any credentials
    navigation.replace('ContractorDrawer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contractor Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#94a3b8"
      />

      <CustomButton title="Login" color="#0ea5e9" onPress={handleLogin} />
      <CustomButton
        title="Register"
        color="#6366f1"
        onPress={() => navigation.navigate('ContractorRegister')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#1e293b', // ✅ dark slate background
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#f1f5f9', // light text for contrast
  },
  input: {
    backgroundColor: '#334155', // slightly lighter slate for input fields
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#475569',
    color: '#f1f5f9', // input text white-ish
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
});
