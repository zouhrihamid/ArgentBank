import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from '../src/redux/store';

import './index.css';
import Header from './Components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import SignIn from './Pages/Sign-in/SignIn';
import User from './Pages/Profil/Profil';
import './main.css';
import 'font-awesome/css/font-awesome.min.css';

export function App() {
      const user = useSelector((state) => state.user.connectUser);

      return (
            <div className="app-container">
                  <Header />
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-in/user" element={user ? <User /> : <SignIn />} />
                  </Routes>
                  <Footer />
            </div>
      );
}

createRoot(document.getElementById('root')).render(
      <StrictMode>
            <Provider store={store}>
                  <Router>
                        <App />
                  </Router>
            </Provider>
      </StrictMode>
);
