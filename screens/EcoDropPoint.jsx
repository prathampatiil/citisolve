import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function EcoDropPoint() {
  const [wasteType, setWasteType] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pointsEarned] = useState(Math.floor(Math.random() * 50) + 10); // Random points for fun
  const [sparkleAnim] = useState(new Animated.Value(0));

  const handleSubmit = () => {
    if (!wasteType || !location) {
      alert('Please select waste type and drop location.');
      return;
    }
    // Trigger sparkle animation
    Animated.timing(sparkleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <LinearGradient
        colors={['#16a34a', '#0ea5e9']}
        style={styles.gradient}
      >
        <View style={styles.congratsContainer}>
          <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
          <Text style={styles.pointsText}>You earned {pointsEarned} Eco Points ♻️</Text>
          <Text style={styles.thankYouText}>
            Thank you for helping your community by properly disposing of waste.
          </Text>

          {/* Optional: Retry button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSubmitted(false);
              setWasteType('');
              setLocation('');
            }}
          >
            <Text style={styles.buttonText}>Drop Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#16a34a', '#0ea5e9']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Eco Drop Point</Text>

        <Text style={styles.label}>Select Waste Type:</Text>
        <Picker
          selectedValue={wasteType}
          onValueChange={(value) => setWasteType(value)}
          style={styles.picker}
          dropdownIconColor="#0f172a"
        >
          <Picker.Item label="-- Choose Waste Type --" value="" />
          <Picker.Item label="Plastic" value="plastic" />
          <Picker.Item label="E-Waste" value="ewaste" />
          <Picker.Item label="Organic" value="organic" />
          <Picker.Item label="Glass" value="glass" />
          <Picker.Item label="Metal" value="metal" />
        </Picker>

        <Text style={styles.label}>Select Drop Location:</Text>
        <Picker
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
          style={styles.picker}
          dropdownIconColor="#0f172a"
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center', color: '#fff' },
  label: { fontSize: 16, fontWeight: '500', marginTop: 10, color: '#f0fdfa' },
  picker: { 
    backgroundColor: '#ffffffcc', 
    marginVertical: 10, 
    borderRadius: 6 
  },
  button: {
    marginTop: 20,
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Congrats Screen
  congratsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  congratsText: { fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 12 },
  pointsText: { fontSize: 22, fontWeight: '700', color: '#ffeb3b', textAlign: 'center', marginBottom: 8 },
  thankYouText: { fontSize: 16, color: '#e0f7fa', textAlign: 'center', marginBottom: 20 },
});
