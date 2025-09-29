// screens/AssignWork.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useReports } from '../context/ReportContext';
import defaultProfile from '../assets/default_profile.png';
import CustomButton from '../components/CustomButton';

const CONTRACTORS = [
  { name: 'Contractor 1', specialization: 'Organic' },
  { name: 'Contractor 2', specialization: 'Plastic' },
  { name: 'Contractor 3', specialization: 'Hazardous' },
  { name: 'Contractor 4', specialization: 'Metal' },
  { name: 'Contractor 5', specialization: 'Mixed/Sorting' },
];

export default function AssignWork() {
  const { reports, assignWork } = useReports();
  const acceptedReports = reports.filter(r => r.status === 'Accepted');

  const [selectedReportId, setSelectedReportId] = useState(acceptedReports[0]?.id || null);
  const [selectedContractor, setSelectedContractor] = useState(CONTRACTORS[0].name);
  const [selectedType, setSelectedType] = useState('Waste');

  const handleAssign = () => {
    if (!selectedReportId) return;
    assignWork(selectedReportId, selectedContractor, selectedType);
  };

  return (
    <LinearGradient colors={['#2563eb', '#06b6d4']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>🔧 Assign Work</Text>

        {acceptedReports.length === 0 ? (
          <Text style={styles.empty}>No accepted reports to assign.</Text>
        ) : (
          <>
            {/* Reports */}
            <Text style={styles.label}>Select Report</Text>
            <FlatList
              data={acceptedReports}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedReportId(item.id)}
                  style={[
                    styles.reportRow,
                    selectedReportId === item.id && styles.reportRowActive,
                  ]}
                >
                  <Image
                    source={item.image ? { uri: item.image } : defaultProfile}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.small}>
                      {item.category} • {item.segregationType}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* Contractor */}
            <Text style={styles.label}>Select Contractor</Text>
            {Platform.OS === 'android' ? (
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={selectedContractor}
                  onValueChange={(val) => setSelectedContractor(val)}
                >
                  {CONTRACTORS.map(c => (
                    <Picker.Item
                      key={c.name}
                      label={`${c.name} (${c.specialization})`}
                      value={c.name}
                    />
                  ))}
                </Picker>
              </View>
            ) : (
              <View style={styles.pickerWrap}>
                {CONTRACTORS.map(c => (
                  <TouchableOpacity
                    key={c.name}
                    onPress={() => setSelectedContractor(c.name)}
                    style={[
                      styles.contractorBtn,
                      selectedContractor === c.name && styles.contractorBtnActive,
                    ]}
                  >
                    <Text
                      style={selectedContractor === c.name ? { color: '#fff' } : {}}
                    >
                      {c.name} ({c.specialization})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Contractor Type */}
            <Text style={styles.label}>Select Contractor Type</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={selectedType} onValueChange={setSelectedType}>
                <Picker.Item label="Waste Contractor" value="Waste" />
                <Picker.Item label="Disposal Contractor" value="Disposal" />
                <Picker.Item label="Sanitation Contractor" value="Sanitation" />
              </Picker>
            </View>

            <CustomButton
              title="Assign Selected Report"
              onPress={handleAssign}
              color="#0ea5e9"
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
    color: '#134e4a',
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#64748b' },
  label: { fontWeight: '700', marginTop: 12, marginBottom: 6, color: '#0f172a' },

  // Report card
  reportRow: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  reportRowActive: { borderColor: '#4e9bde', borderWidth: 2 },
  avatar: { width: 70, height: 70, borderRadius: 10 },
  cardTitle: { fontWeight: '700', fontSize: 15, color: '#111827' },
  small: { fontSize: 12, color: '#475569' },

  // Picker
  pickerWrap: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Contractor buttons (iOS)
  contractorBtn: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    backgroundColor: '#fff',
  },
  contractorBtnActive: {
    backgroundColor: '#4e9bde',
  },
});
