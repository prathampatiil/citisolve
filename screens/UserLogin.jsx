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

export default function UserLogin({ navigation }) {
  return (
    <LinearGradient
      colors={['#004d40', '#00796b']} // dark → medium teal gradient
      style={styles.gradientContainer}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20} // adjust as needed
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <AuthForm
              type="login"
              role="User"
              // 👇 pass custom style for text inputs
              inputStyle={styles.inputStyle}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    padding: 22,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.75,
    shadowRadius: 8,
    elevation: 10, // Android shadow
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
  // ✅ Visible black border for inputs
  inputStyle: {
    borderWidth: 2,
    borderColor: '#ffffffff', // black
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
});
