import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { signUpApi, loginApi, getUserProfileApi, updateUserProfileApi } from '../services/api';

const TOKEN_KEY = 'user';

// Sauvegarde utilisateur dans localStorage
export const saveUserToLocalStorage = (user) => {
      try {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
      } catch (e) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur:", e);
      }
};

// Récupération de l'utilisateur depuis localStorage
export const getUserFromLocalStorage = () => {
      try {
            const storedUser = localStorage.getItem(TOKEN_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
      } catch (e) {
            console.error('Erreur lors du parsing du token:', e);
            return null;
      }
};

// Suppression de l'utilisateur dans localStorage
export const removeUserFromLocalStorage = () => {
      try {
            localStorage.removeItem(TOKEN_KEY);
      } catch (e) {
            console.error("Erreur lors de la suppression de l'utilisateur:", e);
      }
};

// Action pour s'inscrire
export const signUp = createAsyncThunk('user/signUp', async (userData, { rejectWithValue }) => {
      try {
            const response = await signUpApi(userData);
            return response.data;
      } catch (error) {
            console.error('Erreur API Signup:', error.response?.data || error);
            return rejectWithValue(error.response?.data || 'Erreur lors de l’inscription');
      }
});

// Action pour s'authentifier
export const authenticateUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
      try {
            const response = await loginApi({ email, password });

            const token = response.data.body.token;
            if (token) {
                  dispatch(login({ email, token }));
                  return token;
            }
            throw new Error('Email ou mot de passe incorrect');
      } catch (error) {
            console.error(" Erreur d'authentification:", error);
            return rejectWithValue(error.response?.data || 'Erreur de connexion');
      }
});

// Action pour récupérer le profil utilisateur
export const getUserProfile = createAsyncThunk('user/getProfile', async (token, { rejectWithValue, dispatch }) => {
      try {
            const response = await getUserProfileApi(token);
            dispatch(setUserInfo(response.data.body));
      } catch (error) {
            console.error('Erreur lors de la récupération du profil:', error);
            return rejectWithValue(error.response?.data || 'Erreur de récupération du profil');
      }
});

// Action pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk('user/updateProfile', async ({ updatedData, token }, { rejectWithValue, dispatch }) => {
      try {
            const response = await updateUserProfileApi(updatedData, token);
            dispatch(setUserInfo(response.data.user));
      } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);

            if (error.response) {
                  console.error("Réponse de l'API:", error.response.data);
            }
            return rejectWithValue(error.response?.data || 'Erreur de mise à jour');
      }
});

// Création du slice Redux
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

export const { login, logout, setUserInfo } = userSlice.actions;

export const useConnectUser = () => useSelector((state) => state.user.connectUser);
export const useUserInfo = () => useSelector((state) => state.user.userInfo);

export default userSlice.reducer;
