import { Stack } from 'expo-router';
import { Provider } from "react-redux";
import store from "../Redux/store";

export default function AuthLayout() {
  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
    </Stack>
    </Provider>
  );
}