import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');  // get token from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#1e3a8a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid or missing token');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', {
        token,
        newPassword,
      });

      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Your Password</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '4rem auto',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    color: '#1e3a8a',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: 12,
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: 12,
  },
  success: {
    color: 'green',
    marginTop: 12,
  },
};

export default ResetPasswordPage;
