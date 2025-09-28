// screens/NewReport.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useReports } from '../context/ReportContext';
import CustomButton from '../components/CustomButton';

const COMPLAINT_TYPES = [
  'Garbage Dump',
  'Street Lamp Damage',
  'Burning Garbage',
  'Sweeping Not Done',
  'Sewage Overflow',
  'Potholes',
  'Open Drains',
  'Public Toilet Issue',
  'Debris / Construction',
  'Dead Animals',
];

const WASTE_TYPES = [
  { label: 'Green (Organic)', value: 'Green' },
  { label: 'Blue (Plastic/Recyclable)', value: 'Blue' },
  { label: 'Red (Hazardous)', value: 'Red' },
  { label: 'Metal', value: 'Metal' },
  { label: 'Mixed Waste', value: 'Mixed' },
];

export default function NewReport({ navigation, route }) {
  const { addReport } = useReports();

  // Pre-fill title if passed from FAB
  const prefillTitle = route?.params?.title || '';

  const [title, setTitle] = useState(prefillTitle);
  const [description, setDescription] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(prefillTitle || '');
  const [segregationType, setSegregationType] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [coords, setCoords] = useState(null);

  // Ask for location permission on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCoords(`${location.coords.latitude},${location.coords.longitude}`);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPerm.status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permission to take photos.');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!selectedComplaint) {
      Alert.alert('Select Complaint', 'Please select a complaint type.');
      return;
    }

    // build title automatically if empty
    const finalTitle = title || selectedComplaint;

    addReport({
      title: finalTitle,
      description,
      image: imageUri,
      coordinates: coords,
      category: selectedComplaint,
      segregationType: selectedComplaint === 'Garbage Dump' ? segregationType : '',
      createdBy: 'John Doe', // later from AuthContext
    });

    Alert.alert('Success', 'Report submitted successfully!');
    navigation.replace('UserDrawer'); // redirect to your dashboard route
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Report</Text>

      <Text style={styles.label}>Complaint Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {COMPLAINT_TYPES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.badge, selectedComplaint === c && styles.badgeActive]}
            onPress={() => {
              setSelectedComplaint(c);
              setTitle(c); // auto fill title
            }}
          >
            <Text style={[styles.badgeText, selectedComplaint === c && { color: '#fff' }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {selectedComplaint === 'Garbage Dump' && (
        <>
          <Text style={styles.label}>Waste Segregation Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            {WASTE_TYPES.map((w) => (
              <TouchableOpacity
                key={w.value}
                style={[styles.badge, segregationType === w.value && styles.badgeActive]}
                onPress={() => setSegregationType(w.value)}
              >
                <Text style={[styles.badgeText, segregationType === w.value && { color: '#fff' }]}>{w.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      <Text style={styles.label}>Photo</Text>
      <View style={styles.row}>
        <CustomButton title="Gallery" color="#0ea5e9" onPress={pickImage} />
        <CustomButton title="Camera" color="#10b981" onPress={takePhoto} />
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Text style={styles.label}>Location</Text>
      <Text style={styles.coords}>{coords || 'Fetching coordinates...'}</Text>

      <CustomButton title="Submit Report" color="#6366f1" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f1f5f9' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 8 },
  coords: { fontSize: 12, color: '#475569', marginBottom: 12 },
  badge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#e2e8f0', marginRight: 6 },
  badgeActive: { backgroundColor: '#6366f1' },
  badgeText: { fontSize: 12, color: '#1e293b' },
});
