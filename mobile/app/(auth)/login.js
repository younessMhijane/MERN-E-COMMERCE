import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/features/auth/authSlice";
import { API_URL } from '@env';
import logo from '../../assets/images/logo.png';
import { Image } from 'react-native';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Erreur', 'Adresse email invalide');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/users/auth`, {
        email,
        password,
      });

      dispatch(setCredentials({
        user: response.data.user,
        token: response.data.token
      }));

      router.replace('/profile');
      
    } catch (error) {
      let errorMessage = 'Erreur de connexion';
      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Problème de connexion internet';
      }
      Alert.alert('Erreur', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Image source={logo} className='h-32 w-32 rounded-full mx-auto' />
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
        className="bg-violet-600 py-2 px-4 rounded-lg justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-medium">Se connecter</Text>
        )}
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