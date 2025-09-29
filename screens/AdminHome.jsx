// screens/AdminHome.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';

export default function AdminHome({ navigation }) {
  return (
    <LinearGradient colors={['#2563eb', '#06b6d4']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>

        {/* Full-width buttons */}
        <CustomButton
          title="View All Reports"
          color="#4e9bde"
          onPress={() => navigation.navigate('Reports')}
          style={styles.fullButton}
        />
        <CustomButton
          title="Assign Work"
          color="#0ea5e9"
          onPress={() => navigation.navigate('Assign Work')}
          style={styles.fullButton}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 16, justifyContent: 'center', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 24, color: '#fff' },
  fullButton: { width: '100%', marginVertical: 10, borderRadius: 12, paddingVertical: 14 },
});
