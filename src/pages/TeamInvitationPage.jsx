import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamInvitationPage = () => {
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#1e3a8a';

    const fetchTeamName = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.teamName) {
          setTeamName(response.data.teamName);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchTeamName();

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleInputChange = (e) => setEmail(e.target.value);

  const handleInvite = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: 'Please enter an email address', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/users/add-team-member",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ text: response.data.message || 'Invitation sent successfully!', type: 'success' });
      setEmail('');

      // Optional: Redirect after invite
      setTimeout(() => {
        navigate('/AdminDashboard');
      }, 1500);

    } catch (error) {
      console.error("Error inviting user:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to invite user. Please try again.",
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="app-branding" style={styles.appBranding}>
        <h1 style={styles.brandingTitle}>SAMPARKA</h1>
        <p style={styles.brandingSubtext}>A tool for internal communication/Task management/Tracking</p>
      </div>

      <div className="invitation-container" style={styles.invitationContainer}>
        <a href="/TeamNameStep" className="back-link" style={styles.backLink}>
          ← Back to previous step
        </a>

        <h2 className="form-title" style={styles.formTitle}>
          Who else is on the <span style={styles.brandHighlight}>{teamName || "your"}</span> team?
        </h2>

        {message.text && (
          <div
            style={{
              ...styles.message,
              backgroundColor: message.type === 'error' ? '#fee2e2' : '#ecfdf5',
              color: message.type === 'error' ? '#b91c1c' : '#065f46'
            }}
          >
            {message.text}
          </div>
        )}

        <form className="invitation-form" style={styles.invitationForm} onSubmit={handleInvite}>
          <div className="input-wrapper" style={styles.inputWrapper}>
            <div style={styles.inputIconWrapper}>
              <Mail size={16} style={styles.inputIcon} />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Example: colleague@company.com"
              className="email-input"
              style={styles.emailInput}
              disabled={isLoading}
            />
          </div>

          <button
            className="next-button"
            style={{
              ...styles.nextButton,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} style={styles.loadingIcon} /> Inviting...
              </>
            ) : 'Invite'}
          </button>
        </form>
      </div>
    </>
  );
};

// 🧾 Styles
const styles = {
  appBranding: { textAlign: 'center', marginBottom: '2rem' },
  brandingTitle: { fontSize: '2.5rem', fontWeight: 'bold', color: 'white' },
  brandingSubtext: { color: 'white', marginTop: '0.5rem' },
  invitationContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  backLink: {
    display: 'block',
    marginBottom: '1rem',
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  formTitle: {
    fontSize: '1.5rem',
    color: '#1e3a8a',
    marginBottom: '1.5rem',
    fontWeight: '600'
  },
  brandHighlight: { color: '#4c1d95' },
  inputWrapper: { position: 'relative', marginBottom: '1.5rem' },
  inputIconWrapper: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280'
  },
  inputIcon: { display: 'block' },
  emailInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    fontSize: '0.875rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    boxSizing: 'border-box'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  loadingIcon: {
    animation: 'spin 1s linear infinite'
  },
  message: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    fontSize: '0.875rem'
  }
};

// 🔁 Animation for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default TeamInvitationPage;
