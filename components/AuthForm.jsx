// components/AuthForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';

export default function AuthForm({ type = 'login', role = 'User', onSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (type === 'register' && (!username || !email || !password)) {
      alert('Please fill all fields');
      return;
    }
    if (type === 'login' && (!email || !password)) {
      alert('Please fill all fields');
      return;
    }
    onSubmit({ username, email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role} {type === 'login' ? 'Login' : 'Register'}
      </Text>

      {type === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={theme.colors.textLight}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.textLight}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme.colors.textLight}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{type === 'login' ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.colors.textDark,
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 18,
  },
});
