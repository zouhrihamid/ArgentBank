import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnectUser } from '../../redux/authSlice';
import { fetchUserProfile } from '../../redux/authSlice';
import './Profil.css';

function User() {
      const navigate = useNavigate();
      const user = useConnectUser();
      const [userInfo, setUserInfo] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if (!user || !user.token) {
                  navigate('/');
                  return;
            }

            const getUserData = async () => {
                  const data = await fetchUserProfile(user.token);
                  if (data) {
                        setUserInfo(data);
                  } else {
                        navigate('/');
                  }
                  setLoading(false);
            };

            getUserData();
      }, [user, navigate]);

      if (loading) return <h1>Loading...</h1>;

      return (
            <main className="main bg-dark">
                  <div className="header">
                        <h1>
                              Welcome back
                              <br />
                              {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'User'}!
                        </h1>
                        <button className="edit-button">Edit Name</button>
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
