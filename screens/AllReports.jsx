import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useReports } from '../context/ReportContext';
import CustomButton from '../components/CustomButton';
import defaultProfile from '../assets/default_profile.png';

export default function AllReports() {
  const { reports, upvoteReport } = useReports();
  const currentUser = 'John Doe'; // demo

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 All Reports</Text>
      {reports.length === 0 ? (
        <Text style={styles.emptyText}>No reports found.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.small}>Category: {item.category}</Text>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
              ) : (
                <Image source={defaultProfile} style={styles.thumbnail} />
              )}
              <View style={styles.metaRow}>
                <Text>Status: {item.status}</Text>
                <Text>Upvotes: {item.upvotes.length}</Text>
              </View>
              <CustomButton
                title="⬆ Upvote"
                color="#f59e0b"
                onPress={() => upvoteReport(item.id, currentUser)}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardDescription: { fontSize: 14, color: '#475569', marginBottom: 6 },
  thumbnail: { width: '100%', height: 150, borderRadius: 8, marginBottom: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  small: { fontSize: 12, color: '#475569' }
});
