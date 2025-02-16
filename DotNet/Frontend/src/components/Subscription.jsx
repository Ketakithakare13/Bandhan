import React from 'react';
import '../../Styles/subscription.css'; 

const Subscription = () => {
  return (
    <section className="features-section">
      <h2>Subscription Feature</h2>
      <div className="features-container">
        {/* Free Features */}
        <div className="feature-column free">
          <h3>Free Features</h3>
          <ul>
            <li>Create a profile</li>
            <li>Browse potential matches</li>
            <li>View limited profile details</li>
            <li>Send and receive interest requests</li>
          </ul>
          <a href="#" className="subscribe-button">Register Free</a>
        </div>

        {/* Premium Features */}
        <div className="feature-column premium">
          <h3>Premium Features</h3>
          <ul>
            <li>Unlimited Profile Views</li>
            <li>Priority Matching</li>
            <li>Video Calling</li>
            <li>Advanced Preferences</li>
          </ul>
          <a href="#" className="subscribe-button">Subscribe Now</a>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
