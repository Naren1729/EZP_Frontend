/**
 * @author Mayuri
 * @description 
 * This component represents the footer section of the website. It includes links to privacy policy,
 * terms of service, and compliance information. Additionally, it displays company information, including
 * a copyright notice and contact information for inquiries.
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section for footer links */}
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/compliance">Compliance</a>
        </div>

        {/* Section for company information */}
        <div className="footer-company-info">
          <p>© 2024 Security and Compliance Project. All rights reserved.</p>
          <p>
            For inquiries, contact us at: 
            <a href="mailto:support@securityproject.com">support@securityproject.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
