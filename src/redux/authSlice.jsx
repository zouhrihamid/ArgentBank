import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Importer Axios

const TOKEN_KEY = 'user';

// Sauvegarde utilisateur
export const saveUserToLocalStorage = (user) => {
      try {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
      } catch (e) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur dans localStorage:", e);
      }
};

// Récupère l'utilisateur stocké
export const getUserFromLocalStorage = () => {
      try {
            const storedUser = localStorage.getItem(TOKEN_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
      } catch (e) {
            console.error('Erreur lors du parsing du token:', e);
            return null;
      }
};

// Supprime l'utilisateur stocké
export const removeUserFromLocalStorage = () => {
      try {
            localStorage.removeItem(TOKEN_KEY);
      } catch (e) {
            console.error("Erreur lors de la suppression de l'utilisateur du localStorage:", e);
      }
};

// Fonction pour récupérer le profil utilisateur via l'API avec Axios
export const fetchUserProfile = async (token) => {
      try {
            const response = await axios.post(
                  'http://localhost:3001/api/v1/user/profile',
                  {},
                  {
                        headers: {
                              Authorization: `Bearer ${token}`,
                              'Content-Type': 'application/json',
                        },
                  }
            );

            return response.data.body;
      } catch (error) {
            console.error('Erreur lors de la récupération du profil:', error);
            return null;
      }
};

// État initial
const initialState = {
      connectUser: getUserFromLocalStorage(),
};

// Création du Slice Redux
const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
            login: (state, action) => {
                  state.connectUser = action.payload;
                  saveUserToLocalStorage(action.payload);
            },
            logout: (state) => {
                  state.connectUser = null;
                  removeUserFromLocalStorage();
            },
      },
});

// Actions Redux
export const { login, logout } = userSlice.actions;

// Hook pour récupérer l'utilisateur connecté
export const useConnectUser = () => useSelector((state) => state.user.connectUser);

export default userSlice.reducer;
