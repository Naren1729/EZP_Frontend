import React from 'react';

export default function Features() {
  return (
    <div className="features-container">
      <h1>Features</h1>
      <div className="features-grid">
        <div className="feature-item">
          <i className="fas fa-lock"></i>
          <h3>Security</h3>
          <p>State-of-the-art encryption for your safety.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-credit-card"></i>
          <h3>Payments</h3>
          <p>Easy and secure transactions.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-shield-alt"></i>
          <h3>Fraud Detection</h3>
          <p>Advanced algorithms to detect and prevent fraud.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-cogs"></i>
          <h3>Customizable</h3>
          <p>Flexible settings to suit your needs.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-people-carry"></i>
          <h3>Support</h3>
          <p>24/7 customer support for all your needs.</p>
        </div>
      </div>
    </div>
  );
}
