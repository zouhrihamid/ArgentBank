import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, useConnectUser, saveUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage, getUserProfile, authenticateUser } from '../../store/authSlice';

import './SignIn.css';

function SignIn() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [rememberMe, setRememberMe] = useState(false);
      const [error, setError] = useState('');
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

      // Gestion de la soumission du formulaire de connexion
      const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');

            try {
                  const result = await dispatch(authenticateUser({ email, password }));
                  console.log('Résultat de authenticateUser:', result);

                  if (!result.payload) {
                        throw new Error('Email ou mot de passe incorrect');
                  }
                  const token = result.payload;
                  if (!token) {
                        throw new Error('Token invalide');
                  }

                  const profileResult = await dispatch(getUserProfile(token));
                  if (profileResult.error) {
                        console.error('Erreur lors de la récupération du profil:', profileResult.error);
                        throw new Error('Impossible de récupérer le profil utilisateur');
                  }

                  const userData = { ...profileResult.payload, token };
                  dispatch(login(userData));

                  if (rememberMe) {
                        saveUserToLocalStorage(userData);
                  } else {
                        removeUserFromLocalStorage();
                  }
                  navigate('/sign-in/user');
            } catch (error) {
                  setError(error.message);
                  console.error(error);
            }
      };

      const handleSignUp = () => {
            navigate('/sign-up');
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
                              {error && <p className="error-message">{error}</p>}
                              <div className="input-remember">
                                    <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                    <label htmlFor="remember-me">Remember me</label>
                              </div>

                              <button type="submit" className="sign-in-button">
                                    Sign In
                              </button>

                              <p className="create-user" onClick={handleSignUp}>
                                    {' '}
                                    Créer un compte
                              </p>
                        </form>
                  </section>
                  {/* 
                  {user && (
                        <button onClick={handleLogout} className="logout-button">
                              Log out
                        </button>
                  )} */}
            </main>
      );
}

export default SignIn;
