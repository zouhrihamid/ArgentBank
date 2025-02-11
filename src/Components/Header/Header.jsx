import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import Logo from '../../assets/argentBankLogo.png';
import './Header.css';

function Header() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useSelector((state) => state.user.user);

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
                              <a className="main-nav-item">
                                    <i className="fa fa-user-circle"></i>
                                    Tony
                              </a>
                              <a onClick={handleLogout} className="main-nav-item">
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
