import { Provider } from "react-redux";
import store from "./Redux/store"; // Assure-toi que le chemin est correct
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <Provider store={store}>
      <View>
        <Redirect href="/home" />
      </View>
    </Provider>
  );
}
