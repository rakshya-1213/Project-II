import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputField from "../components/InputField";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#1e3a8a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
        email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-branding">
        <h1>SAMPARKA</h1>
        <p>A tool for internal communication/Task management/Tracking</p>
      </div>
      
      <div className="login-container">
        <h2 className="form-title">Reset Password</h2>
        <p className="reset-instructions">Enter your email address and we'll send you instructions to reset your password.</p>

        <form onSubmit={handleSubmit} className="login-form"> 
          <InputField
            type="email"
            placeholder="Email address"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="login-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p className="signup-text">
          <a href="/login">&larr; Back to Login</a>
        </p>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
