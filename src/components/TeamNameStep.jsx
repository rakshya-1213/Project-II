import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeamNameStep = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to proceed");
        navigate('/login', { replace: true });
        return;
      }

      const response = await axios.patch(
        'http://localhost:5000/api/teams/set-team-name',
        { teamName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem('teamName', response.data.teamName);
        navigate('/AdminDashboard', { replace: true }); // Use replace to prevent back nav
      } else {
        alert('Failed to set team name. Please try again.');
      }

    } catch (error) {
      console.error("Error creating team:", error);
      alert('Failed to set team name. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Set Your Team Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default TeamNameStep;
