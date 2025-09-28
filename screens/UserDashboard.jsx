// screens/UserDashboard.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

const CATEGORIES = [
  { title: 'Garbage Dump', icon: 'trash-outline', color: '#0ea5e9' },
  { title: 'StreetLamp Damage', icon: 'flash-outline', color: '#6366f1' },
  { title: 'Burning Garbage', icon: 'flame-outline', color: '#f97316' },
  { title: 'Sweeping Not Done', icon: 'brush-outline', color: '#10b981' },
  { title: 'Sewage Overflow', icon: 'water-outline', color: '#3b82f6' },
  { title: 'Potholes', icon: 'construct-outline', color: '#8b5cf6' },
  { title: 'Public Toilet Issues', icon: 'male-female-outline', color: '#f43f5e' },
  { title: 'Open Drains', icon: 'warning-outline', color: '#facc15' },
  { title: 'Debris / Construction', icon: 'hammer-outline', color: '#22c55e' },
  { title: 'Dead Animals', icon: 'paw-outline', color: '#6366f1' },
];

export default function UserDashboard({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategoryPress = (category) => {
    setModalVisible(false);
    navigation.navigate('New Report', { title: category.title });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>User Dashboard</Text>

        <CustomButton title="New Report" onPress={() => navigation.navigate('New Report')} color="#0ea5e9" />
        <CustomButton title="My Reports" onPress={() => navigation.navigate('My Reports')} color="#6366f1" />
        <CustomButton title="All Complaints" onPress={() => navigation.navigate('All Reports')} color="#4e9bde" />
        <CustomButton title="Eco Drop Point" onPress={() => navigation.navigate('Eco Drop Point')} color="#16a34a" /> 
        {/* ✅ New button added */}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={CATEGORIES}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.categoryRow, { backgroundColor: item.color + '22' }]}
                  onPress={() => handleCategoryPress(item)}
                >
                  <Ionicons name={item.icon} size={28} color={item.color} style={{ marginBottom: 6 }} />
                  <Text style={[styles.categoryText, { color: '#111' }]}>{item.title}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  title: { fontSize: 24, fontWeight: '700', marginVertical: 20, textAlign: 'center', color: '#0f172a' },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    backgroundColor: '#4db6ac',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  categoryRow: { flex: 1, margin: 6, borderRadius: 12, padding: 10, alignItems: 'center' },
  categoryText: { fontSize: 12, textAlign: 'center', fontWeight: '500' },
});
