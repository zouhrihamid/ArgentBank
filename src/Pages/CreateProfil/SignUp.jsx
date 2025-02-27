import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/authSlice';

import './SignUp.css';

const SignUp = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const user = useSelector((state) => state.user.userInfo);

      const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
      });

      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(false);

      useEffect(() => {
            if (user) {
                  setFormData({
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        email: user.email || '',
                        password: '',
                  });
            }
      }, [user]);

      const handleChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
      };

      const handleClose = () => {
            navigate('/sign-in');
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            setSuccess(false);

            try {
                  const resultAction = await dispatch(signUp(formData));

                  if (signUp.fulfilled.match(resultAction)) {
                        setSuccess(true);
                  } else {
                        setError(resultAction.payload || 'Erreur lors de la création du profil.');
                  }
            } catch (error) {
                  setError('Erreur lors de la création du profil.', error);
            }
      };

      return (
            <div className="main bg-dark">
                  <section className="sign-in-content">
                        <h2 className="create-account">{success ? '' : 'Créer un compte'}</h2>

                        {success ? (
                              <div className="success-message">
                                    <p>✅ Profil créé avec succès !</p>
                                    <button onClick={handleClose}>Fermer</button>
                              </div>
                        ) : (
                              <>
                                    {error && <div className="error-message">{typeof error === 'string' ? error : error.message || 'Une erreur est survenue'}</div>}
                                    <form onSubmit={handleSubmit}>
                                          <div className="input-wrapper-up">
                                                <label>Prénom :</label>
                                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                          </div>
                                          <div className="input-wrapper-up">
                                                <label>Nom :</label>
                                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                          </div>
                                          <div className="input-wrapper-up">
                                                <label>Email :</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                          </div>
                                          <div className="input-wrapper-up">
                                                <label>Mot de passe :</label>
                                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                                          </div>
                                          <button type="submit" className="sign-up-button ">
                                                Créer un compte
                                          </button>
                                    </form>
                              </>
                        )}
                  </section>
            </div>
      );
};

export default SignUp;
