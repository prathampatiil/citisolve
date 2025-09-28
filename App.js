// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportProvider } from './context/ReportContext';

// Screens
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import RoleSelection from './screens/RoleSelection';

import UserLogin from './screens/UserLogin';
import UserRegister from './screens/UserRegister';
import AdminLogin from './screens/AdminLogin';
import AdminRegister from './screens/AdminRegister';
import ContractorLogin from './screens/ContractorLogin';
import ContractorRegister from './screens/ContractorRegister';

// ✅ add the two missing imports
import AssignWork from './screens/AssignWork';
import ContractorDashboard from './screens/ContractorDashboard';

// Drawers
import UserDrawer from './navigation/UserDrawer';
import AdminDrawer from './navigation/AdminDrawer';
import ContractorDrawer from './navigation/ContractorDrawer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReportProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Initial screens */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="RoleSelection" component={RoleSelection} />

          {/* User Authentication */}
          <Stack.Screen name="UserLogin" component={UserLogin} />
          <Stack.Screen name="UserRegister" component={UserRegister} />

          {/* Admin Authentication */}
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="AdminRegister" component={AdminRegister} />

          {/* Contractor Authentication */}
          <Stack.Screen name="ContractorLogin" component={ContractorLogin} />
          <Stack.Screen name="ContractorRegister" component={ContractorRegister} />

          {/* Main features */}
          <Stack.Screen name="Assign Work" component={AssignWork} />
          <Stack.Screen name="ContractorDashboard" component={ContractorDashboard} />

          {/* Drawers */}
          <Stack.Screen name="UserDrawer" component={UserDrawer} />
          <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
          <Stack.Screen name="ContractorDrawer" component={ContractorDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportProvider>
  );
}
