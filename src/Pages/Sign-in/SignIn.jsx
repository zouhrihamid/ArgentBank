import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice';
import './SignIn.css';

function SignIn() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useSelector((state) => state.user.user);
      useEffect(() => {
            if (user) {
                  navigate('/sign-in/user');
            }
      }, [user, navigate]);

      const handleSubmit = (e) => {
            e.preventDefault();

            if (username === 'tony@stark.com' && password === 'password123') {
                  dispatch(login({ username }));
                  navigate('/sign-in/user');
            } else {
                  alert('Invalid username or password!');
            }
      };

      return (
            <main className="main bg-dark">
                  <section className="sign-in-content">
                        <i className="fa fa-user-circle sign-in-icon"></i>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                              <div className="input-wrapper">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                              </div>
                              <div className="input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                              </div>
                              <div className="input-remember">
                                    <input type="checkbox" id="remember-me" />
                                    <label htmlFor="remember-me">Remember me</label>
                              </div>
                              <button type="submit" className="sign-in-button">
                                    Sign In
                              </button>
                        </form>
                  </section>
            </main>
      );
}

export default SignIn;
