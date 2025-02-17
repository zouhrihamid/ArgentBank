import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, useConnectUser, getUserProfile, useUserInfo } from '../../redux/authSlice';
import { useEffect } from 'react';
import Logo from '../../assets/argentBankLogo.png';
import './Header.css';

function Header() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useConnectUser();
      const userInfo = useUserInfo();

      // Récupération des infos utilisateur via Redux Thunk
      useEffect(() => {
            if (user && user.token) {
                  dispatch(getUserProfile(user.token));
            }
      }, [user, dispatch]);

      const handleLogout = () => {
            dispatch(logout());
            navigate('/sign-in');
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
                              <a onClick={handleLogout} className="main-nav-item" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>
                                    <i className="fa fa-sign-out"></i> Sign out
                              </a>
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
