// screens/ContractorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useReports } from '../context/ReportContext';
import CustomButton from '../components/CustomButton';
import defaultProfile from '../assets/default_profile.png';

export default function ContractorDashboard() {
  const contractorName = 'Contractor 1'; // later replace with AuthContext
  const { reports, acceptWork, submitCompletion } = useReports();
  const assignedReports = reports.filter(r => r.contractor === contractorName && (r.status === 'Assigned' || r.status === 'In Progress'));
  const [loadingMap, setLoadingMap] = useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Camera roll permission is needed to upload completion photos.');
        }
      }
    })();
  }, []);

  const pickImageAndUpload = async (reportId) => {
    try {
      setLoadingMap(prev => ({ ...prev, [reportId]: true }));
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!result.cancelled && result.assets && result.assets[0].uri) {
        submitCompletion(reportId, result.assets[0].uri);
        Alert.alert('Uploaded', 'Completion photo uploaded successfully.');
      }
    } catch (err) {
      console.error('Image pick/upload error', err);
      Alert.alert('Error', 'Could not upload image. Try again.');
    } finally {
      setLoadingMap(prev => ({ ...prev, [reportId]: false }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contractor Dashboard</Text>
      {assignedReports.length === 0 ? (
        <Text style={styles.emptyText}>No assigned reports.</Text>
      ) : (
        <FlatList
          data={assignedReports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.small}>Type: {item.assignedContractorType}</Text>
              <Text style={styles.small}>Category: {item.category}</Text>
              <Text style={{ marginVertical: 6 }}>{item.description}</Text>
              {item.image ? <Image source={{ uri: item.image }} style={styles.thumb} /> : <Image source={defaultProfile} style={styles.thumb} />}

              {item.status === 'Assigned' && (
                <CustomButton title="Accept Work" color="#0ea5e9" onPress={() => acceptWork(item.id, contractorName)} />
              )}

              {item.status === 'In Progress' && (
                <CustomButton title={loadingMap[item.id] ? 'Uploading...' : 'Upload Completion Photo'} color="#10b981" onPress={() => pickImageAndUpload(item.id)} />
              )}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f1f5f9' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  thumb: { width: '100%', height: 160, borderRadius: 10, marginBottom: 8 },
  small: { fontSize: 12, color: '#475569' }
});
