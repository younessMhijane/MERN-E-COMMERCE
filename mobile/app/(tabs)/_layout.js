import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from "../Redux/store";

export default function TabsLayout() {
  return (
    <Provider store={store}>
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'product') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'darkviolet',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="cart" options={{ title: 'Panier' }} />
      <Tabs.Screen name="product" options={{ title: 'Produits' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
    </Provider>
  );
}
