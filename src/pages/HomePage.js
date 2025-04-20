import React from 'react';
import Search from '../components/Search';

const HomePage = ({ search, setSearch }) => {
  return (
    <>
      <Search search={search} setSearch={setSearch} />
      
      <section className="welcome-section">
        <div className="container">
          <h2>Blockchain-Powered Real Estate Marketplace</h2>
          <div className="welcome-content">
            <div className="welcome-text">
              <p>LandChain revolutionizes property transactions with secure blockchain technology that ensures transparency, reduces fraud, and streamlines the buying and selling process.</p>
              
              <div className="features">
                <div className="feature">
                  <h3>Secure Transactions</h3>
                  <p>All property transactions are recorded on the blockchain, providing an immutable record of ownership.</p>
                </div>
                <div className="feature">
                  <h3>Smart Contracts</h3>
                  <p>Automated smart contracts eliminate intermediaries and reduce closing time from weeks to minutes.</p>
                </div>
                <div className="feature">
                  <h3>Transparent History</h3>
                  <p>Complete property history and documentation accessible to all parties involved in the transaction.</p>
                </div>
              </div>
              
              <div className="cta-buttons">
                <a href="/properties" className="btn-primary">Explore Properties</a>
                <a href="/contact" className="btn-secondary">Contact Us</a>
              </div>
            </div>
            
            <div className="welcome-image">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" alt="Modern house interior" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <div className="container">
          <h2>How LandChain Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Find Property</h3>
              <p>Browse our curated selection of properties available on the blockchain or through traditional channels.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Verify Ownership</h3>
              <p>Review property details and ownership history, all verified and stored on the blockchain.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Smart Contract</h3>
              <p>Complete the purchase through our secure smart contracts with minimal paperwork.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Transfer Ownership</h3>
              <p>Receive digital proof of ownership instantly after the transaction is complete.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
