// screens/NewReport.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ background gradient
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
  const prefillTitle = route?.params?.title || '';

  const [title, setTitle] = useState(prefillTitle);
  const [description, setDescription] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(prefillTitle || '');
  const [segregationType, setSegregationType] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [coords, setCoords] = useState(null);

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

    const finalTitle = title || selectedComplaint;

    addReport({
      title: finalTitle,
      description,
      image: imageUri,
      coordinates: coords,
      category: selectedComplaint,
      segregationType: selectedComplaint === 'Garbage Dump' ? segregationType : '',
      createdBy: 'John Doe',
    });

    Alert.alert('Success', 'Report submitted successfully!');
    navigation.replace('UserDrawer');
  };

  return (
    <LinearGradient colors={['#14b8a6', '#99f6e4']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📝 New Report</Text>

        {/* Complaint Types */}
        <Text style={styles.label}>Complaint Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {COMPLAINT_TYPES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.badge, selectedComplaint === c && styles.badgeActive]}
              onPress={() => {
                setSelectedComplaint(c);
                setTitle(c);
              }}
            >
              <Text style={[styles.badgeText, selectedComplaint === c && { color: '#fff' }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Describe the issue"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Waste Type */}
        {selectedComplaint === 'Garbage Dump' && (
          <>
            <Text style={styles.label}>Waste Segregation Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
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

        {/* Photo */}
        <Text style={styles.label}>Photo</Text>
        <View style={styles.row}>
          <CustomButton title="Gallery" color="#0ea5e9" onPress={pickImage} />
          <CustomButton title="Camera" color="#10b981" onPress={takePhoto} />
        </View>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <Text style={styles.coords}>{coords || 'Fetching coordinates...'}</Text>

        {/* Submit */}
        <CustomButton title="Submit Report" color="#6366f1" onPress={handleSubmit} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 16, color: '#fff' },
  label: { fontWeight: '700', marginTop: 10, marginBottom: 6, color: '#064e3b' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 10 },
  coords: { fontSize: 12, color: '#475569', marginBottom: 14 },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    marginRight: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  badgeActive: { backgroundColor: '#14b8a6' },
  badgeText: { fontSize: 13, fontWeight: '600', color: '#1e293b' },
});
