// screens/AssignWork.jsx
// screens/AssignWork.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';   // ✅ Correct import
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
    <View style={{ flex: 1, backgroundColor: '#f1f5f9', padding: 12 }}>
      <Text style={styles.title}>Assign Work</Text>

      {acceptedReports.length === 0 ? (
        <Text style={styles.empty}>No accepted reports to assign.</Text>
      ) : (
        <>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Select Report</Text>
          <FlatList
            data={acceptedReports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedReportId(item.id)}
                style={[
                  styles.reportRow,
                  selectedReportId === item.id ? { borderColor: '#4e9bde', borderWidth: 2 } : null,
                ]}
              >
                <Image source={item.image ? { uri: item.image } : defaultProfile} style={styles.avatar} />
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={{ fontWeight: '700' }}>{item.title}</Text>
                  <Text>{item.category} • {item.segregationType}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <Text style={{ fontWeight: '700', marginTop: 12 }}>Select Contractor</Text>
          {Platform.OS === 'android' ? (
            <View style={styles.pickerWrap}>
              <Picker selectedValue={selectedContractor} onValueChange={(val) => setSelectedContractor(val)}>
                {CONTRACTORS.map(c => (
                  <Picker.Item key={c.name} label={`${c.name} (${c.specialization})`} value={c.name} />
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
                    selectedContractor === c.name ? styles.contractorBtnActive : null,
                  ]}
                >
                  <Text style={selectedContractor === c.name ? { color: '#fff' } : {}}>
                    {c.name} ({c.specialization})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={{ fontWeight: '700', marginTop: 12 }}>Select Contractor Type</Text>
          <View style={styles.pickerWrap}>
            <Picker selectedValue={selectedType} onValueChange={setSelectedType}>
              <Picker.Item label="Waste Contractor" value="Waste" />
              <Picker.Item label="Disposal Contractor" value="Disposal" />
              <Picker.Item label="Sanitation Contractor" value="Sanitation" />
            </Picker>
          </View>

          <CustomButton title="Assign Selected Report" onPress={handleAssign} color="#0ea5e9" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 20, color: '#64748b' },
  reportRow: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 8 },
  pickerWrap: { backgroundColor: '#fff', borderRadius: 8, marginVertical: 10, padding: 6 },
  contractorBtn: { padding: 8, borderRadius: 8, marginVertical: 6, backgroundColor: '#fff' },
  contractorBtnActive: { backgroundColor: '#4e9bde' },
});
