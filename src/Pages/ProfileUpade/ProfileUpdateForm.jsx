import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './ProfileUpdateForm.css';

const ProfileUpdateForm = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const user = useSelector((state) => state.user.userInfo);
      const token = useSelector((state) => state.user.connectUser?.token);

      const [formData, setFormData] = useState({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
      });

      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(false);

      useEffect(() => {
            if (user) {
                  setFormData({
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
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
            navigate('/sign-in/user');
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            setSuccess(false);

            if (!token) {
                  setError('Token manquant! Veuillez vous reconnecter.');
                  return;
            }

            try {
                  await dispatch(updateUserProfile({ updatedData: formData, token }));

                  await dispatch(getUserProfile(token));
                  setSuccess(true);
            } catch (err) {
                  console.error('Erreur lors de la mise à jour du profil:', err);
                  setError('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
            }
      };

      return (
            <div className="main bg-dark">
                  <section className="sign-in-content">
                        <h2>Modifier votre profil</h2>

                        {success ? (
                              <div className="success-message">
                                    <p>Profil mis à jour avec succès !</p>
                                    <button onClick={handleClose} className="button-common">
                                          Fermer
                                    </button>
                              </div>
                        ) : (
                              <>
                                    {error && <div className="error-message">{error}</div>}
                                    <form onSubmit={handleSubmit}>
                                          <div className="input-wrapper">
                                                <label>Prénom :</label>
                                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                          </div>
                                          <div className="input-wrapper">
                                                <label>Nom :</label>
                                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                          </div>
                                          <button type="submit" className="button-common">
                                                Mettre à jour
                                          </button>
                                    </form>
                              </>
                        )}
                  </section>
            </div>
      );
};

export default ProfileUpdateForm;
