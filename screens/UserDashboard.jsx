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
    <LinearGradient colors={['#8b5cf6', '#ec4899']} style={styles.gradient}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }}>
        <Text style={styles.title}>🚀 User Dashboard</Text>

        {/* Dashboard Buttons with subtle border */}
        <View style={styles.dashboardButtons}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate('New Report')}
          >
            <Text style={styles.buttonText}>📝 New Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate('My Reports')}
          >
            <Text style={styles.buttonText}>📂 My Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate('All Reports')}
          >
            <Text style={styles.buttonText}>🌍 All Complaints</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate('Eco Drop Point')}
          >
            <Text style={styles.buttonText}>♻️ Eco Drop Point</Text>
          </TouchableOpacity>
        </View>
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
                  style={[
                    styles.categoryRow,
                    {
                      backgroundColor: item.color + '12',
                      borderColor: item.color,
                    },
                  ]}
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
  dashboardButtons: {
    marginTop: 10,
  },
  mainButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12, // slightly smaller
    marginVertical: 6,   // slightly smaller
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff55', // subtle, semi-transparent border to match background
    shadowColor: '#00000011', // very soft shadow
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  buttonText: {
    color: '#111',
    fontSize: 15, // slightly smaller
    fontWeight: '600',
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
    shadowColor: '#00000033',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
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
    shadowColor: '#00000022',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
    elevation: 2,
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
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#00000022',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    color: '#111',
  },
});
