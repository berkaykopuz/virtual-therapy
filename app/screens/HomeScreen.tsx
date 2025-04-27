import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../(tabs)/patient';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const handleUserSavePress = () => {
    navigation.navigate('PatientSave');
  };

  const handleUserEntrancePress = () => {
    navigation.navigate('PatientEntrance');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Patient Registry"
          onPress={handleUserSavePress}
          color="#dc143c"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Patient Entrance"
          onPress={handleUserEntrancePress}
          color="#8b0000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});