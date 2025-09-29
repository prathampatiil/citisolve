// screens/AdminReports.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useReports } from '../context/ReportContext';
import CustomButton from '../components/CustomButton';
import defaultProfile from '../assets/default_profile.png';

const CONTRACTORS = [
  { name: 'Contractor 1', specialization: 'Organic' },
  { name: 'Contractor 2', specialization: 'Plastic' },
  { name: 'Contractor 3', specialization: 'Hazardous' },
  { name: 'Contractor 4', specialization: 'Metal' },
  { name: 'Contractor 5', specialization: 'Mixed/Sorting' },
];

export default function AdminReports() {
  const { reports, acceptReport, assignWork, verifyCompletion, rejectVerification } =
    useReports();

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedReportToAssign, setSelectedReportToAssign] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(CONTRACTORS[0].name);

  const handleOpenAssign = (report) => {
    setSelectedReportToAssign(report);
    setSelectedContractor(CONTRACTORS[0].name);
    setAssignModalVisible(true);
  };

  const handleAssignConfirm = () => {
    if (!selectedReportToAssign) return;
    assignWork(selectedReportToAssign.id, selectedContractor, 'Default Disposal Facility');
    setAssignModalVisible(false);
    setSelectedReportToAssign(null);
  };

  const handleVerify = (reportId) => {
    Alert.alert(
      'Mark Completed',
      'Verify that the completion proof is valid and mark this report as Completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Verify', onPress: () => verifyCompletion(reportId) },
      ]
    );
  };

  const handleReject = (reportId) => {
    Alert.alert('Reject Verification', 'Are you sure you want to reject this completion?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reject', onPress: () => rejectVerification(reportId, 'Rejected by admin') },
    ]);
  };

  const renderReportCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.small}>
          {item.category} • {item.segregationType || 'N/A'}
        </Text>
      </View>

      <Text style={styles.small}>Reported by: {item.createdBy}</Text>
      <Text style={styles.small}>Coordinates: {item.coordinates || 'N/A'}</Text>
      <Text style={{ marginVertical: 8 }}>{item.description}</Text>

      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <Image source={defaultProfile} style={styles.image} />
      )}

      <View style={{ marginTop: 8 }}>
        <Text style={styles.small}>Status: {item.status}</Text>
        {item.contractor && <Text style={styles.small}>Assigned To: {item.contractor}</Text>}
        {item.disposalCenter && <Text style={styles.small}>Disposal: {item.disposalCenter}</Text>}
      </View>

      <View style={styles.actionRow}>
        {item.status === 'Pending' && (
          <>
            <CustomButton title="Accept" color="#0284c7" onPress={() => acceptReport(item.id)} />
            <CustomButton title="Assign" color="#38bdf8" onPress={() => handleOpenAssign(item)} />
          </>
        )}

        {item.status === 'Accepted' && (
          <CustomButton title="Assign" color="#38bdf8" onPress={() => handleOpenAssign(item)} />
        )}

        {item.status === 'Assigned' && (
          <>
            <CustomButton
              title="View Worker"
              color="#6366f1"
              onPress={() =>
                Alert.alert('Assigned Worker', item.contractor || 'Not assigned')
              }
            />
            <CustomButton title="Reassign" color="#f59e0b" onPress={() => handleOpenAssign(item)} />
          </>
        )}

        {item.status === 'Pending Verification' && (
          <>
            <CustomButton title="Verify" color="#10b981" onPress={() => handleVerify(item.id)} />
            <CustomButton title="Reject" color="#ef4444" onPress={() => handleReject(item.id)} />
          </>
        )}

        {item.status === 'Completed' && (
          <Text style={[styles.small, { marginTop: 8, fontWeight: '700', color: '#10b981' }]}>
            ✅ Completed on:{' '}
            {new Date(
              item.history.find((h) => h.status === 'Completed')?.at || item.createdAt
            ).toLocaleString()}
          </Text>
        )}
      </View>

      {item.status === 'Pending Verification' && item.completionPhoto && (
        <>
          <Text style={[styles.small, { marginTop: 8, fontWeight: '700' }]}>
            Completion Proof
          </Text>
          <Image source={{ uri: item.completionPhoto }} style={styles.completionImage} />
        </>
      )}

      <TouchableOpacity
        style={{ marginTop: 8 }}
        onPress={() => {
          const lines = item.history
            .map(
              (h) =>
                `${h.status} ${
                  h.at ? `(${new Date(h.at).toLocaleString()})` : ''
                }${h.contractor ? ` - ${h.contractor}` : ''}${h.note ? ` - ${h.note}` : ''}`
            )
            .join('\n');
          Alert.alert('History', lines || 'No history');
        }}
      >
        <Text style={[styles.small, { color: '#0284c7' }]}>📜 View History</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#2563eb', '#06b6d4']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Reports</Text>

        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={renderReportCard}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* Assign Modal */}
        <Modal visible={assignModalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Assign Report</Text>
              <Text style={styles.small}>
                Report: {selectedReportToAssign?.title || '—'}
              </Text>

              {CONTRACTORS.map((c) => (
                <TouchableOpacity
                  key={c.name}
                  style={[
                    styles.contractorRow,
                    selectedContractor === c.name && styles.contractorRowActive,
                  ]}
                  onPress={() => setSelectedContractor(c.name)}
                >
                  <Image source={defaultProfile} style={styles.contractorAvatar} />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontWeight: '700' }}>{c.name}</Text>
                    <Text style={styles.small}>{c.specialization}</Text>
                  </View>
                </TouchableOpacity>
              ))}

              <View style={styles.modalButtons}>
                <CustomButton title="Cancel" color="#64748b" onPress={() => setAssignModalVisible(false)} />
                <CustomButton title="Assign" color="#0284c7" onPress={handleAssignConfirm} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 12 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 16, color: '#075985' },

  // Cards
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  small: { fontSize: 12, color: '#475569' },
  image: { width: '100%', height: 160, borderRadius: 10, marginTop: 8 },
  completionImage: { width: '100%', height: 180, borderRadius: 12, marginTop: 8 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap', gap: 8 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#075985' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },

  // Contractor Rows
  contractorRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, marginBottom: 8, backgroundColor: '#f9fafb' },
  contractorRowActive: { backgroundColor: '#bae6fd' },
  contractorAvatar: { width: 50, height: 50, borderRadius: 25 },
});
