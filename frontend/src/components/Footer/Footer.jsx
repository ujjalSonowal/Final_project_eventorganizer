// Footer.js

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="https://facebook.com">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://twitter.com">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
        <div className="contact-info">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: contact@example.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Street, City, Country</li>
          </ul>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="about-organizer">
          <h3>About Organizer</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            facilisis lacus id arcu viverra, nec dapibus ipsum accumsan. Integer
            nec libero at quam tincidunt fermentum. Curabitur vel tortor sit
            amet nisi ultrices varius.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Event Organizer. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
