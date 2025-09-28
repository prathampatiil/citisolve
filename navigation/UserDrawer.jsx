import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import UserDashboard from '../screens/UserDashboard';
import NewReport from '../screens/NewReport';
import MyReports from '../screens/MyReports';
import AllReports from '../screens/AllReports';
import EcoDropPoint from '../screens/EcoDropPoint'; // ✅ Added

import defaultProfile from '../assets/default_profile.png';

const Drawer = createDrawerNavigator();

export default function UserDrawer({ navigation }) {
  const currentUser = { name: 'John Doe', email: 'john@example.com' };

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image source={defaultProfile} style={styles.avatar} />
        <Text style={styles.username}>{currentUser?.name || currentUser?.email}</Text>
        <Text style={styles.email}>{currentUser?.email}</Text>
      </View>

      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'RoleSelection' }] })}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#4e9bde',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={UserDashboard}
        options={{ drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="New Report"
        component={NewReport}
        options={{ drawerIcon: ({ color }) => <Ionicons name="add-circle-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="My Reports"
        component={MyReports}
        options={{ drawerIcon: ({ color }) => <Ionicons name="document-text-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="All Reports"
        component={AllReports}
        options={{ drawerIcon: ({ color }) => <Ionicons name="list-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="Eco Drop Point" // ✅ New screen
        component={EcoDropPoint}
        options={{ drawerIcon: ({ color }) => <Ionicons name="leaf-outline" size={22} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileSection: { paddingVertical: 30, paddingHorizontal: 15, backgroundColor: '#5aa0e0', alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
  username: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  email: { fontSize: 12, color: '#eee', marginBottom: 5 },
  logoutContainer: { padding: 15, borderTopWidth: 1, borderTopColor: '#ddd' },
  logoutButton: { flexDirection: 'row', backgroundColor: '#e74c3c', paddingVertical: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  logoutText: { color: '#fff', fontSize: 15, marginLeft: 8, fontWeight: '600' },
});
