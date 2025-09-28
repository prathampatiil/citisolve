// screens/Onboarding.jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, SafeAreaView, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function Onboarding({ navigation }) {
  const slides = [
    {
      title: 'Citizen Complaints',
      desc: 'Quickly report potholes, garbage, streetlight issues and more.',
    },
    {
      title: 'Location Aware',
      desc: 'Reports automatically capture your current location.',
    },
    {
      title: 'Priority by Upvotes',
      desc: 'More upvotes → higher priority for municipal action.',
    },
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
    <SafeAreaView style={styles.container}>
      {/* CitiSolve Logo only */}
      <Image
        source={require('../assets/citysolvelogo.jpg')}
        style={styles.logo}
      />

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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={index < slides.length - 1 ? 'Next →' : 'Start App'}
          onPress={() => {
            if (index < slides.length - 1) setIndex(index + 1);
            else navigation.replace('RoleSelection');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: '800',
    color: '#d97706', // CitiSolve orange
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
});
