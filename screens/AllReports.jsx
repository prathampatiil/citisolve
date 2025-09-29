import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useReports } from '../context/ReportContext';
import CustomButton from '../components/CustomButton';
import defaultProfile from '../assets/default_profile.png';

export default function AllReports() {
  const { reports, upvoteReport } = useReports();
  const currentUser = 'John Doe'; // demo

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { color: '#10b981', fontWeight: '700' };
      case 'Accepted':
        return { color: '#3b82f6', fontWeight: '700' };
      case 'Pending':
        return { color: '#6b7280', fontWeight: '700' };
      default:
        return { color: '#475569' };
    }
  };

  return (
    <LinearGradient colors={['#2563eb', '#06b6d4']} style={styles.gradient}>
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
                  <Text style={[styles.small, getStatusStyle(item.status)]}>
                    Status: {item.status}
                  </Text>
                  <Text style={styles.small}>⬆ {item.upvotes.length} Upvotes</Text>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#ffffffff',
  },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: '#111827' },
  cardDescription: { fontSize: 14, color: '#475569', marginBottom: 6 },
  thumbnail: { width: '100%', height: 160, borderRadius: 10, marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  small: { fontSize: 12, color: '#475569' },
});
