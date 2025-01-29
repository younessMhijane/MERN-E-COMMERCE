import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Voici votre profil</Text>
      <Link href="/login" className="mt-4 text-blue-500 underline">
        Login
      </Link>
      <Link href="/register" className="mt-4 text-blue-500 underline">
        Register
      </Link>
    </View>
  );
}
