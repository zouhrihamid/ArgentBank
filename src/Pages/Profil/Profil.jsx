import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnectUser, getUserProfile, useUserInfo } from '../../store/authSlice';

import './Profil.css';

function User() {
      const navigate = useNavigate();

      const user = useConnectUser();
      const userInfo = useUserInfo();

      useEffect(() => {
            if (!user || !user.token) {
                  navigate('/');
                  return;
            }

            if (!userInfo && user.token) {
                  getUserProfile(user.token);
            }
      }, [user, userInfo, navigate]);

      if (!userInfo) return <h1>Loading...</h1>;

      return (
            <main className="main bg-dark">
                  <div className="header">
                        <h1>
                              Welcome back
                              <br />
                              {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'User'}!
                        </h1>
                        <button className="edit-button" onClick={() => navigate('/profile/update')}>
                              Edit Name
                        </button>
                  </div>

                  <h2 className="sr-only">Accounts</h2>
                  <section className="account">
                        <div className="account-content-wrapper">
                              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                              <p className="account-amount">$2,082.79</p>
                              <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                              <button className="transaction-button">View transactions</button>
                        </div>
                  </section>
                  <section className="account">
                        <div className="account-content-wrapper">
                              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                              <p className="account-amount">$10,928.42</p>
                              <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                              <button className="transaction-button">View transactions</button>
                        </div>
                  </section>
                  <section className="account">
                        <div className="account-content-wrapper">
                              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                              <p className="account-amount">$184.30</p>
                              <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                              <button className="transaction-button">View transactions</button>
                        </div>
                  </section>
            </main>
      );
}

export default User;
