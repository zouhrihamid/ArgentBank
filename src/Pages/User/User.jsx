import './User.css';

function User() {
      const accounts = [
            { id: 1, title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
            { id: 2, title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
            { id: 3, title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
      ];

      return (
            <main className="main bg-dark">
                  <div className="header">
                        <h1>
                              Welcome back
                              <br />
                              Tony Jarvis!
                        </h1>
                        <button className="edit-button">Edit Name</button>
                  </div>
                  <h2 className="sr-only">Accounts</h2>

                  {accounts.map((account) => (
                        <section className="account" key={account.id}>
                              <div className="account-content-wrapper">
                                    <h3 className="account-title">{account.title}</h3>
                                    <p className="account-amount">{account.amount}</p>
                                    <p className="account-amount-description">{account.description}</p>
                              </div>
                              <div className="account-content-wrapper cta">
                                    <button className="transaction-button">View transactions</button>
                              </div>
                        </section>
                  ))}
            </main>
      );
}

export default User;
