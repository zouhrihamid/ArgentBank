import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout, useConnectUser, saveUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../redux/authSlice';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [rememberMe, setRememberMe] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useConnectUser();

      //  Vérifie si un utilisateur est stocké et le connecte automatiquement
      useEffect(() => {
            const storedUser = getUserFromLocalStorage();
            if (storedUser) {
                  dispatch(login(storedUser));
                  navigate('/sign-in/user');
            }
      }, [dispatch, navigate]);

      //  Redirection si l'utilisateur est connecté
      useEffect(() => {
            if (user) {
                  navigate('/sign-in/user');
            }
      }, [user, navigate]);

      // Fonction d'authentification avec l'API
      const authenticateUser = async (email, password) => {
            try {
                  const response = await axios.post(
                        'http://localhost:3001/api/v1/user/login',
                        { email, password },
                        {
                              headers: { 'Content-Type': 'application/json' },
                        }
                  );

                  return response.data.body.token; // Retourne le token JWT
            } catch (error) {
                  console.error("Erreur d'authentification:", error);
                  return null;
            }
      };

      //  Fonction pour récupérer le profil utilisateur
      const fetchUserProfile = async (token) => {
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

      // Gestion de la soumission du formulaire de connexion
      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const token = await authenticateUser(email, password);

                  if (!token) {
                        alert('Email ou mot de passe invalide !');
                        return;
                  }

                  const userProfile = await fetchUserProfile(token);

                  if (userProfile) {
                        const userData = { ...userProfile, token };

                        dispatch(login(userData));

                        if (rememberMe) {
                              saveUserToLocalStorage(userData);
                        } else {
                              removeUserFromLocalStorage();
                        }

                        navigate('/sign-in/user');
                  } else {
                        alert('Impossible de récupérer les informations utilisateur.');
                  }
            } catch (error) {
                  console.error('Erreur lors de la connexion :', error);
                  alert('Une erreur est survenue lors de la connexion.');
            }
      };

      //  Déconnexion de l'utilisateur
      const handleLogout = () => {
            dispatch(logout());
            removeUserFromLocalStorage();
            navigate('/');
      };

      return (
            <main className="main bg-dark">
                  <section className="sign-in-content">
                        <i className="fa fa-user-circle sign-in-icon"></i>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                              <div className="input-wrapper">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                              </div>
                              <div className="input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                              </div>
                              <div className="input-remember">
                                    <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                    <label htmlFor="remember-me">Remember me</label>
                              </div>
                              <button type="submit" className="sign-in-button">
                                    Sign In
                              </button>
                        </form>
                  </section>

                  {user && (
                        <button onClick={handleLogout} className="logout-button">
                              Log out
                        </button>
                  )}
            </main>
      );
}

export default SignIn;
