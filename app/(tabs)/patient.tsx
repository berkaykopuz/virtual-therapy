import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PatientSave from '../screens/PatientSave';
import PatientEntrance from '../screens/PatientEntrance';
import PatientHome from '../screens/PatientHome';

export type RootStackParamList = {
  Home: undefined;
  PatientSave: undefined;
  PatientEntrance: undefined;
  PatientHome: { patientName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="PatientSave"
          component={PatientSave}
          options={{ title: 'Patient Save' }}
        />
        <Stack.Screen
          name="PatientEntrance"
          component={PatientEntrance}
          options={{ title: 'Patient Entrance' }}
        />
        <Stack.Screen
          name="PatientHome"
          component={PatientHome}
          options={{ title: 'Patient Home' }}
        />
      </Stack.Navigator>
  );
}