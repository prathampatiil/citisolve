// screens/AdminHome.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ background gradient
import { useReports } from '../context/ReportContext';
import CustomButton from '../components/CustomButton';
import defaultProfile from '../assets/default_profile.png';

export default function AdminHome({ navigation }) {
  const { reports, acceptReport, verifyCompletion } = useReports();

  const pendingReports = reports.filter(r => r.status === 'Pending' || r.status === 'Accepted');
  const pendingVerification = reports.filter(r => r.status === 'Pending Verification');
  const completedReports = reports.filter(r => r.status === 'Completed');

  const handleVerify = (reportId) => {
    verifyCompletion(reportId);
  };

  return (
    <LinearGradient
      colors={['#2563eb', '#06b6d4']} // modern blue → teal gradient
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>

        <View style={styles.topRow}>
          <CustomButton
            title="View All Reports"
            color="#4e9bde"
            onPress={() => navigation.navigate('AdminReports')}
          />
          <CustomButton
            title="Assign Work"
            color="#0ea5e9"
            onPress={() => navigation.navigate('Assign Work')}
          />
        </View>

        {/* Pending */}
        <Text style={styles.sectionTitle}>Pending Reports</Text>
        {pendingReports.length === 0 ? (
          <Text style={styles.emptyText}>No pending reports.</Text>
        ) : (
          <FlatList
            data={pendingReports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.small}>
                  {item.category} • {new Date(item.createdAt).toLocaleString()}
                </Text>
                <Text style={styles.small}>Waste Type: {item.segregationType || 'N/A'}</Text>
                <Text style={styles.small}>Coordinates: {item.coordinates || 'N/A'}</Text>
                <Text style={{ marginVertical: 8 }}>{item.description}</Text>

                <View style={styles.row}>
                  <CustomButton
                    title="Accept"
                    color="#0ea5e9"
                    onPress={() => {
                      acceptReport(item.id);
                      navigation.navigate('Assign Work');
                    }}
                  />
                  <CustomButton
                    title="View Details"
                    color="#6366f1"
                    onPress={() => navigation.navigate('AdminReports', { reportId: item.id })}
                  />
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 12 }}
          />
        )}

        {/* Pending Verification */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pending Verification</Text>
        {pendingVerification.length === 0 ? (
          <Text style={styles.emptyText}>No reports pending verification.</Text>
        ) : (
          <FlatList
            data={pendingVerification}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.small}>
                  {item.category} • {item.contractor || 'Unassigned'}
                </Text>
                <Text style={styles.small}>Waste Type: {item.segregationType || 'N/A'}</Text>
                <Text style={styles.small}>Coordinates: {item.coordinates || 'N/A'}</Text>
                <Text style={{ marginVertical: 6 }}>{item.description}</Text>

                <Text style={{ fontWeight: '700', marginBottom: 6 }}>Completion Proof</Text>
                {item.completionPhoto ? (
                  <Image
                    source={{ uri: item.completionPhoto }}
                    style={styles.completionImage}
                    resizeMode="cover"
                    defaultSource={defaultProfile}
                  />
                ) : (
                  <Image source={defaultProfile} style={styles.completionImage} />
                )}

                <View style={styles.row}>
                  <CustomButton
                    title="Verify & Complete"
                    color="#10b981"
                    onPress={() => handleVerify(item.id)}
                  />
                  <CustomButton
                    title="View History"
                    color="#4e9bde"
                    onPress={() => navigation.navigate('AdminReports', { reportId: item.id })}
                  />
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )}

        {/* Completed */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Completed Reports</Text>
        {completedReports.length === 0 ? (
          <Text style={styles.emptyText}>No completed reports yet.</Text>
        ) : (
          <FlatList
            data={completedReports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.small}>
                  {item.category} • {item.contractor || 'Unassigned'}
                </Text>
                <Text style={styles.small}>Waste Type: {item.segregationType || 'N/A'}</Text>
                <Text style={styles.small}>Coordinates: {item.coordinates || 'N/A'}</Text>
                <Text style={{ marginVertical: 6 }}>{item.description}</Text>
                <Text style={[styles.small, { color: '#10b981', fontWeight: '700' }]}>
                  ✅ Completed
                </Text>
                <View style={styles.row}>
                  <CustomButton
                    title="View History"
                    color="#4e9bde"
                    onPress={() => navigation.navigate('AdminReports', { reportId: item.id })}
                  />
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#fff', // contrast with gradient
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8, marginBottom: 8, color: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 8, color: '#e0f2f1' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  small: { fontSize: 12, color: '#475569', marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 8 },
  completionImage: { width: '100%', height: 180, borderRadius: 10, marginBottom: 8 },
});
