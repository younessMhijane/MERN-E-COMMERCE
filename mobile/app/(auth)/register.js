import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // ✅ Import du router

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ Utilisation de useRouter

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez entrer un email et un mot de passe.');
      return;
    }

    Alert.alert('Succès', 'Inscription réussie !');
    router.push('/login'); // ✅ Naviguer vers l'écran de connexion
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</Text>
      
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4 text-base"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-6 text-base"
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-violet-600 rounded-md p-3 mb-4"
        onPress={handleRegister}
      >
        <Text className="text-white text-center font-medium">S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/login')}
        className="p-3"
      >
        <Text className="text-center text-gray-500">Déjà inscrit ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
