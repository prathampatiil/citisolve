// screens/ContractorLogin.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';

export default function ContractorLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing', 'Enter email and password');
      return;
    }
    navigation.replace('ContractorDrawer');
  };

  return (
    <LinearGradient
      colors={['#004d40', '#00796b']}
      style={styles.gradientContainer}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Contractor Login</Text>

            <TextInput
              placeholder="Email"
              style={[styles.input, styles.blackBorderInput]}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#94a3b8"
            />

            <TextInput
              placeholder="Password"
              style={[styles.input, styles.blackBorderInput]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />

            <CustomButton title="Login" color="#0ea5e9" onPress={handleLogin} />

            <TouchableOpacity
              onPress={() => navigation.navigate('ContractorRegister')}
              activeOpacity={0.8}
              style={styles.registerWrapper}
            >
              <Text style={styles.registerText}>
                No account? <Text style={styles.registerLink}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '85%',
    padding: 22,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004d40',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    color: '#000',
  },
  blackBorderInput: { borderWidth: 1.5, borderColor: '#ffffffff' },
  registerWrapper: { marginTop: 16, paddingVertical: 10, alignItems: 'center' },
  registerText: { textAlign: 'center', color: '#004d40', fontSize: 14 },
  registerLink: { color: '#26a69a', fontWeight: '700' },
});
