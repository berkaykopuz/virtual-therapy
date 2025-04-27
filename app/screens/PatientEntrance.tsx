import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { RootStackParamList } from '../(tabs)/patient';

interface PatientData {
  id: string;
  name: string;
  pinCode: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'PatientEntrance'>;

export default function PatientEntrance({ navigation }: Props) {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsList: PatientData[] = [];
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'patients'));
        querySnapshot.forEach((doc) => {
          const { name, pinCode } = doc.data();
          patientsList.push({ id: doc.id, name, pinCode });
        });
        setPatients(patientsList);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load patients.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientPress = (patient: PatientData) => {
    setSelectedPatient(patient);
    setEnteredPin('');
    setIsModalVisible(true);
  };

  const handleVerifyPin = () => {
    if (enteredPin === selectedPatient?.pinCode) {
      setIsModalVisible(false);
      navigation.navigate('PatientHome', { patientName: selectedPatient.name });
    } else {
      Alert.alert('Error', 'Incorrect PIN code!');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b0000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Entrance</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.patientItem} onPress={() => handlePatientPress(item)}>
            <Text style={styles.patientName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Enter PIN Code</Text>
            <TextInput
              style={styles.input}
              placeholder="PIN Code"
              value={enteredPin}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={setEnteredPin}
              secureTextEntry
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleVerifyPin}>
              <Text style={styles.modalButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  patientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  patientName: {
    fontSize: 18,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: "#8b0000",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
