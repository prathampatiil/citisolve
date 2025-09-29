// screens/AdminLogin.jsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthForm from '../components/AuthForm';

export default function AdminLogin({ navigation }) {
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
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <AuthForm
                type="login"
                role="Admin"
                onSubmit={() => navigation.replace('AdminDrawer')}
                inputStyle={styles.blackBorderInput}
              />

              <TouchableOpacity onPress={() => navigation.navigate('AdminRegister')}>
                <Text style={styles.registerText}>No account? Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  cardWrapper: { width: '100%', paddingHorizontal: 16 }, // make wrapper stretch fully
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 22,
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#1E88E5',
    fontWeight: '600',
  },
  blackBorderInput: { borderWidth: 1.5, borderColor: '#ffffffff', borderRadius: 8, marginBottom: 12 },
});
