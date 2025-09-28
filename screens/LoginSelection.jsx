// screens/LoginSelection.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import theme from '../theme'; // import theme

export default function LoginSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CitiSolve</Text>
      <Text style={styles.subtitle}>
        Please choose how you want to log in.
      </Text>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="User Login"
          color={theme.colors.primary}
          onPress={() => navigation.navigate('UserAuth')}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Admin Login"
          color={theme.colors.secondary}
          onPress={() => navigation.navigate('AdminAuth')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textDark,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: theme.spacing.sm,
  },
});
