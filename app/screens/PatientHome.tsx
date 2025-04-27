import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../(tabs)/patient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'PatientHome'>;

export default function PatientHome({ navigation, route }: Props) {
  
    const { patientName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>🎉 Welcome, {patientName}! 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b0000',
    textAlign: 'center',
  },
});
