import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

// Fonction pour s'inscrire
export const signUpApi = async ({ firstName, lastName, email, password }) => {
      return axios.post(
            `${API_URL}/signup`,
            { firstName, lastName, email, password },
            {
                  headers: { 'Content-Type': 'application/json' },
            }
      );
};

// Fonction d'authentification
export const loginApi = async ({ email, password }) => {
      return axios.post(
            `${API_URL}/login`,
            { email, password },
            {
                  headers: { 'Content-Type': 'application/json' },
            }
      );
};

// Récupération du profil utilisateur
export const getUserProfileApi = async (token) => {
      return axios.post(
            `${API_URL}/profile`,
            {},
            {
                  headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                  },
            }
      );
};

// Mise à jour du profil utilisateur
export const updateUserProfileApi = async (updatedData, token) => {
      return axios.put(`${API_URL}/profile`, updatedData, {
            headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
            },
      });
};
