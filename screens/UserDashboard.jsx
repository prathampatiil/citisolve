// screens/UserDashboard.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient
      colors={['#8b5cf6', '#ec4899']} // purple → pink gradient
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>🚀 User Dashboard</Text>

        {/* Transparent buttons with white text + border */}
        <CustomButton
          title="📝 New Report"
          onPress={() => navigation.navigate('New Report')}
          color="transparent"
          textColor="#fff"
          borderColor="#fff"
        />
        <CustomButton
          title="📂 My Reports"
          onPress={() => navigation.navigate('My Reports')}
          color="transparent"
          textColor="#fff"
          borderColor="#fff"
        />
        <CustomButton
          title="🌍 All Complaints"
          onPress={() => navigation.navigate('All Reports')}
          color="transparent"
          textColor="#fff"
          borderColor="#fff"
        />
        <CustomButton
          title="♻️ Eco Drop Point"
          onPress={() => navigation.navigate('Eco Drop Point')}
          color="transparent"
          textColor="#fff"
          borderColor="#fff"
        />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Category Selection Modal */}
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
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={item.color}
                    style={{ marginBottom: 6 }}
                  />
                  <Text style={styles.categoryText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginVertical: 20,
    textAlign: 'center',
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    backgroundColor: '#7c3aed',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
    color: '#374151',
  },
  categoryRow: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    color: '#111',
  },
});
