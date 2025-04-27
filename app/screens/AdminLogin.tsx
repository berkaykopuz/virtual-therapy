import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  
  const signIn = async () => {
    setLoading(true);
    try{
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    }catch(error: any){
        console.log(error);
        alert('Sign in failed: ' + error.message);
    }finally{
        setLoading(false)
    }

  }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
            <Text style={styles.title}>Admin Girişi</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            { loading ? (<ActivityIndicator size="large" color="#007AFF" />)
            : 
            (<Button title='Giriş Yap' color="#b8860b" onPress={signIn}/>)
            }
        </KeyboardAvoidingView>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',
  },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10,
  },
});
