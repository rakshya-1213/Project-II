import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import InputField from "../components/InputField";
import SocialLogin from "../components/SocialLogin";
import logo from "../assets/logo.png";


const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const defaultRole = queryParams.get("role") || "admin";
  const prefilledTeam = queryParams.get("team") || "";

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teamName, setTeamName] = useState(prefilledTeam);
  const [role] = useState(defaultRole);
  const [loading, setLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState('');
  const [confirmTouched, setConfirmTouched] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#1e3a8a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const passwordsMatch = password === confirmPassword;
  const showMatchError = confirmTouched && !passwordsMatch;

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!termsAgreed) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username,
        email,
        password,
        confirmPassword,
        role,
        teamName: role === "member" ? teamName : undefined,
      };

      const response = await axios.post('http://localhost:5000/api/users/register', payload);

      if (response && response.data) {
        const { token, user } = response.data;
        console.log(response.data);

        localStorage.setItem("token", token);

        localStorage.setItem("users", JSON.stringify(user));

        // Optional: save team name
        if (role === 'member' && teamName) {
          localStorage.setItem("teamName", teamName);
        }

        

        alert(response.data.message || 'Account created successfully!');

        // 👇 REDIRECT LOGIC
        if (role === 'member' && prefilledTeam) {
          navigate('/dashboard');  // Direct to dashboard for invited members
        } else {
          navigate('/TeamNameStep');  // Default for admin/setup
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Server error');
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
        <h2 className="form-title">Sign up with</h2>
        <SocialLogin />

        <p className="separator"><span>or</span></p>

        <form onSubmit={handleSubmit} className="login-form">
          <InputField 
            type="text" 
            name="username"
            placeholder="Username" 
            icon="person" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          
          <InputField 
            type="email" 
            name="email"
            placeholder="Email address" 
            icon="mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          
          <InputField 
            type="password" 
            name="password"
            placeholder="Password" 
            icon="lock" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          
          <InputField 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            icon="lock" 
            value={confirmPassword} 
            onChange={handleConfirmChange} 
            required
          />

          {showMatchError && (
            <p className="error-message">Passwords do not match</p>
          )}

          {role === "member" && (
            <>
              <InputField
                type="text"
                name="teamName"
                placeholder="Team Name"
                icon="group"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                readOnly={!!prefilledTeam}
              />
              {!!prefilledTeam && (
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  You were invited to join <strong>{teamName}</strong>
                </p>
              )}
            </>
          )}

          <div className="terms-checkbox">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              required 
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button 
            className="login-button" 
            type="submit" 
            disabled={loading || !termsAgreed || (confirmTouched && !passwordsMatch)}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {error && error !== 'Passwords do not match' && (
            <p className="error-message">{error}</p>
          )}
        </form>

        <p className="signup-text">Already have an account? <a href="/login">Log in</a></p>
      </div>
    </>
  );
};

export default SignupPage;
