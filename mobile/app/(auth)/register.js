import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Config from 'react-native-config';
import logo from '../../assets/images/logo.png';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email

    if (!username) newErrors.username = "Le nom d'utilisateur est requis.";
    if (!email) newErrors.email = "L'email est requis.";
    else if (!emailRegex.test(email)) newErrors.email = "L'email n'est pas valide.";
    
    if (!password) newErrors.password = "Le mot de passe est requis.";

    if (!conPassword) newErrors.conPassword = "Veuillez confirmer votre mot de passe.";
    else if (password !== conPassword) newErrors.conPassword = "Les mots de passe ne correspondent pas.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne `true` si pas d'erreurs
  };

  const handleRegister = async () => {
    if (!validateForm()) return; // Stopper si le formulaire est invalide

    try {
      const response = await axios.post(`${Config.API_URL}/api/users/register`, {
        username,
        email,
        password,
      });

      Alert.alert('Succès', 'Inscription réussie !');
      router.push('/login');
    } catch (error) {
      Alert.alert('Erreur', error.response ? error.response.data.message : 'Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Image source={logo} className='h-32 w-32 rounded-full mx-auto' />
      <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-2 text-base"
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text className="text-red-500 text-sm mb-2">{errors.username}</Text>}

      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-2 text-base"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>}

      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-2 text-base"
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text className="text-red-500 text-sm mb-2">{errors.password}</Text>}

      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-2 text-base"
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={conPassword}
        onChangeText={setConPassword}
      />
      {errors.conPassword && <Text className="text-red-500 text-sm mb-2">{errors.conPassword}</Text>}

      <TouchableOpacity className="bg-violet-600 rounded-md p-3 mb-4" onPress={handleRegister}>
        <Text className="text-white text-center font-medium">S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')} className="p-3">
        <Text className="text-center text-gray-500">Déjà inscrit ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
