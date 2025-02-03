import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction pour charger les infos de l'utilisateur depuis AsyncStorage
const loadUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Erreur lors du chargement des données utilisateur :", error);
    return null;
  }
};

// Action asynchrone pour charger les infos utilisateur au démarrage
export const fetchUserInfo = createAsyncThunk("auth/fetchUserInfo", async () => {
  return await loadUserInfo();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload)).catch((error) =>
        console.error("Erreur lors de l'enregistrement :", error)
      );
    },
    logout: (state) => {
      state.userInfo = null;
      AsyncStorage.removeItem("userInfo").catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
