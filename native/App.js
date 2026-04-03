import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';

// Screens
import Welcome from './screens/Welcome';
import Join from './screens/Join';
import EmailAuthScreen from './screens/EmailAuthScreen';
import BodyScan from './screens/BodyScan';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Join" component={Join} />
          <Stack.Screen name="EmailAuth" component={EmailAuthScreen} />
          <Stack.Screen name="BodyScan" component={BodyScan} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
