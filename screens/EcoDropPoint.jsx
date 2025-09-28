import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // ✅ FIXED

export default function EcoDropPoint() {
  const [wasteType, setWasteType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (!wasteType || !location) {
      alert('Please select waste type and drop location.');
      return;
    }
    alert(`Waste Type: ${wasteType}\nDrop Location: ${location}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco Drop Point</Text>

      {/* Waste Type Picker */}
      <Text style={styles.label}>Select Waste Type:</Text>
      <Picker
        selectedValue={wasteType}
        onValueChange={(value) => setWasteType(value)}
        style={styles.picker}
      >
        <Picker.Item label="-- Choose Waste Type --" value="" />
        <Picker.Item label="Plastic" value="plastic" />
        <Picker.Item label="E-Waste" value="ewaste" />
        <Picker.Item label="Organic" value="organic" />
        <Picker.Item label="Glass" value="glass" />
        <Picker.Item label="Metal" value="metal" />
      </Picker>

      {/* Drop Location Picker */}
      <Text style={styles.label}>Select Drop Location:</Text>
      <Picker
        selectedValue={location}
        onValueChange={(value) => setLocation(value)}
        style={styles.picker}
      >
        <Picker.Item label="-- Choose Location --" value="" />
        <Picker.Item label="Community Center" value="community_center" />
        <Picker.Item label="Eco Drop Bin - Market" value="market_bin" />
        <Picker.Item label="School Collection Point" value="school_point" />
        <Picker.Item label="Municipal Yard" value="municipal_yard" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center', color: '#0f172a' },
  label: { fontSize: 16, fontWeight: '500', marginTop: 10, color: '#334155' },
  picker: { backgroundColor: '#fff', marginVertical: 10, borderRadius: 6 },
  button: {
    marginTop: 20,
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
