import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, useConnectUser } from '../../redux/authSlice';
import { useEffect, useState } from 'react';
import Logo from '../../assets/argentBankLogo.png';
import './Header.css';
import axios from 'axios';

function Header() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useConnectUser();
      const [userInfo, setUserInfo] = useState(null);

      // Récupération des infos utilisateur depuis l'API
      useEffect(() => {
            if (!user || !user.token) return;

            const fetchUserProfile = async () => {
                  try {
                        setUserInfo(null);

                        const response = await axios.post(
                              'http://localhost:3001/api/v1/user/profile',
                              {},
                              {
                                    headers: {
                                          Authorization: `Bearer ${user.token}`,
                                          'Content-Type': 'application/json',
                                    },
                              }
                        );

                        setUserInfo(response.data.body);
                  } catch (error) {
                        console.error('Erreur lors de la récupération du profil:', error.response?.data?.message || error.message);
                  }
            };

            fetchUserProfile();
      }, [user]);

      const handleLogout = () => {
            dispatch(logout());
            navigate('/');
      };

      return (
            <nav className="main-nav">
                  <Link to="/">
                        <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
                  </Link>
                  {user ? (
                        <div className="main-nav-out">
                              <span className="main-nav-item">
                                    <i className="fa fa-user-circle"></i>
                                    {userInfo ? userInfo.firstName : 'User'}
                              </span>
                              <button onClick={handleLogout} className="main-nav-item" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>
                                    <i className="fa fa-sign-out"></i> Sign out
                              </button>
                        </div>
                  ) : (
                        <Link to="/sign-in" className="main-nav-item">
                              <i className="fa fa-user-circle"></i> Sign in
                        </Link>
                  )}
            </nav>
      );
}

export default Header;
