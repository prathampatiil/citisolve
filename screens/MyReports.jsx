import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useReports } from '../context/ReportContext';
import defaultProfile from '../assets/default_profile.png';

export default function MyReports() {
  const { reports } = useReports();
  const currentUser = 'John Doe'; // replace with actual auth user
  const myReports = reports.filter(r => r.createdBy === currentUser);

  const pending = myReports.filter(r => r.status !== 'Completed' && r.status !== 'In Progress');
  const inProgress = myReports.filter(r => r.status === 'In Progress');
  const completed = myReports.filter(r => r.status === 'Completed');

  const renderReport = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={item.image ? { uri: item.image } : defaultProfile} style={styles.thumbnail} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.small}>{item.category} • {new Date(item.createdAt).toLocaleString()}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text
            style={[
              styles.small,
              item.status === 'Completed' && { color: '#10b981', fontWeight: '700' },
              item.status === 'In Progress' && { color: '#f59e0b', fontWeight: '700' }
            ]}
          >
            Status: {item.status}
          </Text>
          {item.completionPhoto && <Text style={styles.small}>Completion proof uploaded</Text>}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reports</Text>

      {/* Pending */}
      <Text style={styles.sectionTitle}>Pending</Text>
      {pending.length === 0 ? (
        <Text style={styles.emptyText}>No pending reports.</Text>
      ) : (
        <FlatList data={pending} keyExtractor={i => i.id} renderItem={renderReport} />
      )}

      {/* In Progress */}
      <Text style={styles.sectionTitle}>In Progress</Text>
      {inProgress.length === 0 ? (
        <Text style={styles.emptyText}>No reports in progress.</Text>
      ) : (
        <FlatList data={inProgress} keyExtractor={i => i.id} renderItem={renderReport} />
      )}

      {/* Completed */}
      <Text style={styles.sectionTitle}>Completed</Text>
      {completed.length === 0 ? (
        <Text style={styles.emptyText}>No completed reports.</Text>
      ) : (
        <FlatList data={completed} keyExtractor={i => i.id} renderItem={renderReport} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f1f5f9' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  emptyText: { textAlign: 'center', marginTop: 8, color: '#64748b' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardDescription: { fontSize: 14, color: '#475569', marginBottom: 6 },
  thumbnail: { width: 80, height: 80, borderRadius: 8 },
  small: { fontSize: 12, color: '#475569' },
});

