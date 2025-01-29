import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Veuillez entrer un email et un mot de passe.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.11.103:5000/api/users/auth', {
        email: email,
        password: password,
      });
        Alert.alert('Succès', 'Connexion réussie !');
        router.push('/home');

    } catch (error) {
      Alert.alert('Erreur', error.response ? error.response.data.message : 'Une erreur s\'est produite. Veuillez réessayer.');
    }
  };
  


  return (
    <View className="flex-1 justify-center px-4">
      <Text className="text-2xl font-bold mb-8 text-center">Connexion</Text>
      <TextInput
        className="border border-gray-400 rounded-lg mb-4 p-2"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-400 rounded-lg mb-6 p-2"
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-violet-600 py-2 px-4 rounded-lg"
      >
        <Text className="text-white text-center">Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push('/register')}
        className="mt-4 py-2 px-4 rounded-lg border border-gray-400"
      >
        <Text className="text-blue-500 text-center">Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
