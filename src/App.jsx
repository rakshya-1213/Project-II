import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from './components/InputField';
import SocialLogin from './components/SocialLogin';
import logo from './assets/logo.png';
import './App.css';


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#1e3a8a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Debug logging
    console.log('Login attempt with:', { email, password: '***' });

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      const token = response.data.token;
      localStorage.setItem('token', token);

      const user = response.data.user;
      console.log('User data:', user);
      
      // Role-based navigation logic
      if (user && user.role === 'member') {
        // Members go directly to dashboard
        console.log('Redirecting member to dashboard');
        navigate('/dashboard');
      } else if (user && user.role === 'admin') {
        // Admin navigation based on setup status
        if (!user.teamNameSet) {
          console.log('Redirecting admin to team name step');
          navigate('/TeamNameStep');
        } else if (!user.teamInvitationSent) {
          console.log('Redirecting admin to team invitation');
          navigate('/teaminvitation');
        } else {
          console.log('Redirecting admin to dashboard');
          navigate('/dashboard');
        }
      } else {
        // Fallback for users without defined roles
        console.log('Redirecting to dashboard (fallback)');
        navigate('/dashboard');
      }

      alert('Login successful');
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="app-branding">
        <img src={logo} alt="Samparka Logo" className="logo"  style={{ marginTop: "50px" }} />
        <h1>SAMPARKA</h1>
        <p>A tool for internal communication/Task management/Tracking</p>
      </div>

      <div className="login-container">
        <h2 className="form-title">Log in with</h2>
        <SocialLogin />

        <p className="separator"><span>or</span></p>

        <form onSubmit={handleSubmit} className="login-form">
          <InputField 
            type="email" 
            placeholder="Email address" 
            icon="mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <InputField 
            type="password" 
            placeholder="Password" 
            icon="lock" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <Link to="/ForgotPasswordPage" className="forgot-pass-link">Forgot Password?</Link>

          <button className="login-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/SignupPage">Signup now</Link>
        </p>
      </div>
    </>
  );
};

export default App;