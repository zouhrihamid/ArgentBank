import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

import './index.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import SignIn from './Pages/Sign-in/SignIn';
import User from './Pages/User/User';
import './main.css';
import 'font-awesome/css/font-awesome.min.css';

createRoot(document.getElementById('root')).render(
      <StrictMode>
            <Provider store={store}>
                  <Router>
                        <div className="app-container">
                              <Header />
                              <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/sign-in" element={<SignIn />} />
                                    <Route path="/sign-in/user" element={<User />} /> {/* Correction du chemin */}
                              </Routes>
                              <Footer />
                        </div>
                  </Router>
            </Provider>
      </StrictMode>
);
