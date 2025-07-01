import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeamNameStep = () => {
  const [teamName, setTeamName] = useState('');
  const maxLength = 50;
  const remainingChars = maxLength - teamName.length;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#1e3a8a';
    
    console.log("TeamNameStep component mounted");
    console.log("Current path:", window.location.pathname);

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with team name:", teamName);

    try {
      console.log("Getting token and making API request");
     
      const token = localStorage.getItem('token'); 
      
      if (!token) {
        console.log("No token found");
        alert('You must be logged in to proceed');
        navigate('/login');
        return;
      }
      
      // Frontend API call in TeamNameStep.js
const response = await axios.patch(
  'http://localhost:5000/api/users/set-team-name', 
  { teamName },
  { headers: { Authorization: `Bearer ${token}` } }
);


      console.log("API response:", response.data);
      if (response.data.success) {
        localStorage.setItem('teamName', response.data.teamName || teamName);
        console.log("Navigating to TeamInvitationPage");
        navigate('/TeamInvitationPage'); 
      }
    } catch (err) {
      console.error("Error setting team name:", err);
      console.error("Error response:", err.response?.data);
      alert('Failed to set team name. Please try again.');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background-color: #1e3a8a;
          }
          .app-branding {
            text-align: center;
            margin-bottom: 2rem;
          }
          .branding-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: white;
          }
          .branding-subtext {
            color: white;
            margin-top: 0.5rem;
          }
          .team-name-container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .back-to-login {
            display: block;
            margin-bottom: 1.5rem;
            color: #3b82f6;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
          }
          .form-title {
            font-size: 1.5rem;
            color: #1e3a8a;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
            font-weight: 600;
          }
          .form-subtext {
            font-size: 0.875rem;
            color: #4b5563;
            margin-bottom: 1.5rem;
          }
          .team-name-form {
            width: 100%;
          }
          .input-wrapper {
            position: relative;
            margin-bottom: 1.5rem;
          }
          .team-name-input {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            box-sizing: border-box;
          }
          .char-count {
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
            font-size: 0.75rem;
            color: #9ca3af;
          }
          .form-button {
            width: 100%;
            padding: 0.75rem;
            background-color: #3b82f6;
            color: white;
            font-weight: 600;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s ease;
          }
          .form-button-active {
            opacity: 1;
            cursor: pointer;
          }
          .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
        `}
      </style>

      <div className="app-branding">
        <h1 className="branding-title">SAMPARKA</h1>
        <p className="branding-subtext">A tool for internal communication/Task management/Tracking</p>
      </div>

      <div className="team-name-container">
        <a href="/login" className="back-to-login">← Back to login</a>

        <h2 className="form-title">What's the name of your company or team?</h2>
        <p className="form-subtext">Choose a name for your Samparka workspace that your team will recognize.</p>

        <form className="team-name-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Example: Google, Microsoft"
              maxLength={50}
              className="team-name-input"
              value={teamName}
              onChange={handleInputChange}
            />
            <span className="char-count">{remainingChars}</span>
          </div>

          <button
            type="submit"
            className={`form-button ${teamName.length > 0 ? 'form-button-active' : ''}`}
            disabled={teamName.length === 0}
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default TeamNameStep;