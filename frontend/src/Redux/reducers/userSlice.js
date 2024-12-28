import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser,getAllUsers } from '../actions/userActions';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Gestion du login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Stockage des données utilisateur
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Gestion du register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Stockage des données utilisateur
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Gestion du logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null; // Réinitialiser les infos utilisateur
        localStorage.removeItem('userInfo'); // Supprimer l'élément du localStorage
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload; // Gérer les erreurs du logout
      });
      builder.addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
        state.error = null;
      });
      builder.addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporter le reducer
export default userSlice.reducer;
