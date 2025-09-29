// screens/Onboarding.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Onboarding({ navigation }) {
  const slides = [
    { title: 'Citizen Complaints', desc: 'Quickly report potholes, garbage, streetlight issues and more.' },
    { title: 'Location Aware', desc: 'Reports automatically capture your current location.' },
    { title: 'Priority by Upvotes', desc: 'More upvotes → higher priority for municipal action.' },
  ];

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <LinearGradient
      colors={['#8b5cf6', '#ec4899']} // purple → pink gradient
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* ✅ Styled Logo (works even if not transparent) */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/citysolvelogo.jpg')} // non-transparent logo
            style={styles.logo}
          />
        </View>

        {/* Animated Slide Content */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            flex: 1,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text style={styles.title}>{slides[index].title}</Text>
          <Text style={styles.desc}>{slides[index].desc}</Text>
        </Animated.View>

        {/* Gradient Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            if (index < slides.length - 1) setIndex(index + 1);
            else navigation.replace('RoleSelection');
          }}
        >
          <LinearGradient
            colors={['#ec4899', '#8b5cf6']} // pink → purple gradient
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {index < slides.length - 1 ? 'Next →' : 'Start App'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ✅ Styled wrapper for non-transparent logos
  logoWrapper: {
    padding: 12,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)', // soft overlay behind logo
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  logo: { width: 120, height: 120, borderRadius: 20, resizeMode: 'contain' },

  title: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#f1f5f9',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: { fontSize: 16, fontWeight: '700', color: '#fff', textAlign: 'center' },
});
