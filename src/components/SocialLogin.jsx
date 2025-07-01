// SocialLogin.jsx
import React from 'react';
import googleIcon from '../assets/google.png'; // Adjust path as needed

const SocialLogin = () => {
  return (
    <div className="social-login">
      <button className="social-button">
        <img src={googleIcon} alt="google" className="social-icon" />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;