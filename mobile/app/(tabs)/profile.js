import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/features/auth/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <View className="flex-1 justify-center items-center">
      {userInfo ? (
        <>
          <Text>Bienvenue, {userInfo.username} !</Text>
          <Button title="Se déconnecter" onPress={() => dispatch(logout())} />
        </>
      ) : (
       <>
        <Text>Vous n'êtes pas connecté.</Text>
        <Link href="/login" className="mt-4 text-blue-500 underline">
          Login
        </Link>
        <Link href="/register" className="mt-4 text-blue-500 underline">
          Register
        </Link>
      </>
      )}
    </View>
  );
}
