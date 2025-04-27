import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';

interface PatientData {
  name: string;
  age: string;
  gender: string;
  pinCode: string;
  didMoveCorrectly?: boolean;
}

const genders = ['Male', 'Female'];

export default function PatientSaveScreen() {
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    age: '',
    gender: '',
    pinCode: '',
    didMoveCorrectly: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePatient = async () => {
    if (!patientData.name || !patientData.age || !patientData.gender || patientData.pinCode.length !== 4) {
      Alert.alert('Error', 'Please fill all fields. PIN must be 4 digits.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(FIREBASE_DB, 'patients'), {
        name: patientData.name,
        age: Number(patientData.age),
        gender: patientData.gender,
        pinCode: patientData.pinCode,
        didMoveCorrectly: false, 
      });
      Alert.alert('Success', 'Patient saved successfully.');
      setPatientData({ name: '', age: '', gender: '', pinCode: '' });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save patient.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Patient</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={patientData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={patientData.age}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('age', text)}
      />

      <View style={styles.radioGroup}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.radioButton}
            onPress={() => handleInputChange('gender', gender)}
          >
            <View style={styles.radioCircle}>
              {patientData.gender === gender && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="PIN Code (4 digits)"
        value={patientData.pinCode}
        keyboardType="numeric"
        maxLength={4}
        onChangeText={(text) => handleInputChange('pinCode', text)}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color ='#dc143c' />
      ) : (
        <Button title="Save" color="#dc143c" onPress={handleSavePatient} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dc143c',
  },
  radioText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#dc143c',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
