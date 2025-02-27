import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
export const getUserProfile = (token) => async (dispatch) => {
      console.log('Calling getUserProfile with token:', token);
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

            dispatch(setUserInfo(response.data.body));
      } catch (error) {
            console.error('Erreur lors de la récupération du profil:', error);
      }
};

//creer un utilisateur
export const createUserProfile = createAsyncThunk('user/signUp', async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
      try {
            const response = await axios.post(
                  'http://localhost:3001/api/v1/user/signup',
                  { firstName, lastName, email, password },
                  {
                        headers: { 'Content-Type': 'application/json' },
                  }
            );
            return response.data;
      } catch (error) {
            return rejectWithValue(error.response?.data || 'Une erreur est survenue');
      }
});

//update profil
export const updateUserProfile = (updatedData, token) => async (dispatch) => {
      try {
            const response = await axios.put('http://localhost:3001/api/v1/user/profile', updatedData, {
                  headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                  },
            });

            dispatch(setUserInfo(response.data.user));
      } catch (error) {
            console.error('Erreur lors de la mise à jour du profil :', error.response?.data || error.message);
      }
};

export const signUp = createAsyncThunk('user/signUp', async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
      try {
            const response = await axios.post(
                  'http://localhost:3001/api/v1/user/signup',
                  { firstName, lastName, email, password },
                  {
                        headers: { 'Content-Type': 'application/json' },
                  }
            );

            return response.data;
      } catch (error) {
            console.error(' Erreur API Signup :', error.response?.data || error);
            return rejectWithValue(error.response?.data || 'Erreur lors de l’inscription');
      }
});

// Fonction d'authentification avec l'API
export const authenticateUser = (email, password) => async (dispatch) => {
      try {
            const response = await axios.post(
                  'http://localhost:3001/api/v1/user/login',
                  { email, password },
                  {
                        headers: { 'Content-Type': 'application/json' },
                  }
            );

            const token = response.data.body.token;

            if (token) {
                  dispatch(login({ email, token }));
                  return token;
            }
            throw new Error('Email ou mot de passe incorrect');
      } catch (error) {
            console.error("Erreur d'authentification:", error);
            throw error;
      }
};
// Création du Slice Redux
const userSlice = createSlice({
      name: 'user',
      initialState: {
            connectUser: getUserFromLocalStorage(),
            userInfo: null,
      },
      reducers: {
            login: (state, action) => {
                  state.connectUser = action.payload;
                  saveUserToLocalStorage(action.payload);
            },
            logout: (state) => {
                  state.connectUser = null;
                  state.userInfo = null;
                  removeUserFromLocalStorage();
            },
            setUserInfo: (state, action) => {
                  state.userInfo = action.payload;
            },
      },
});

// Actions Redux
export const { login, logout, setUserInfo } = userSlice.actions;

// Hook pour récupérer l'utilisateur connecté
export const useConnectUser = () => useSelector((state) => state.user.connectUser);
export const useUserInfo = () => useSelector((state) => state.user.userInfo);
export default userSlice.reducer;
