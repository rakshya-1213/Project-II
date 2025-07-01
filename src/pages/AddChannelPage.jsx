import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddChannelPage = () => {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('');

  const handleAddChannel = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/channels/add', {
        name: channelName,
      });

      // Save new channel name in localStorage
      localStorage.setItem('teamName', res.data.name);

      // Navigate to channels
      navigate('/dashboard/channels');
    } catch (err) {
      console.error('Error creating channel:', err);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/channels');
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Create a New Channel</h2>
      <form onSubmit={handleAddChannel} style={styles.form}>
        <input
          type="text"
          placeholder="Enter channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.addBtn}>Add Channel</button>
          <button type="button" onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  page: {
    marginLeft: '280px',
    padding: '3rem',
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '2rem',
    color: '#1e3a8a'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px'
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem'
  },
  addBtn: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#f87171',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default AddChannelPage;
