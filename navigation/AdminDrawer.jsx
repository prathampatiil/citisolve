import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import AdminHome from '../screens/AdminHome';
import AssignWork from '../screens/AssignWork';
import AdminReports from '../screens/AdminReports';
import defaultProfile from '../assets/default_profile.png';

const Drawer = createDrawerNavigator();

function CustomAdminDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image source={defaultProfile} style={styles.avatar} />
        <Text style={styles.username}>Admin Name</Text>
        <Text style={styles.email}>admin@example.com</Text>
      </View>

      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.replace('RoleSelection')}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomAdminDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#4e9bde',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={AdminHome}
        options={{ drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="Assign Work"
        component={AssignWork}
        options={{ drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="Reports"
        component={AdminReports}
        options={{ drawerIcon: ({ color }) => <Ionicons name="document-text-outline" size={22} color={color} /> }}
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
