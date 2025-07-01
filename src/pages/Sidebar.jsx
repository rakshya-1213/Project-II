import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  PiUsersThreeFill,
  PiChatsCircleFill,
  PiStackFill,
  PiPlusBold,
  PiUserPlusFill
} from 'react-icons/pi';

const Sidebar = () => {
  const [activeChannel, setActiveChannel] = useState('');
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const fetchedTeamName = localStorage.getItem('teamName') || 'Your Team';
    setTeamName(fetchedTeamName);
    setActiveChannel(`# ${fetchedTeamName}`);
  }, []);

  const handleChannelClick = (channelName) => {
    setActiveChannel(channelName);
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>SAMPARKA</h2>

      <nav style={styles.nav}>
        <NavLink
          to="/dashboard/messages"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          style={({ isActive }) =>
            isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
          }
        >
          <PiChatsCircleFill style={styles.icon} />
          <span>Messages</span>
        </NavLink>

        <div style={styles.channelSection}>
          <NavLink
            to="/dashboard/attendance"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
            }
          >
            <PiUsersThreeFill style={styles.icon} />
            <span>Attendance</span>
          </NavLink>

          <NavLink
            to="/dashboard/channels"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
            }
          >
            <PiStackFill style={styles.icon} />
            <span>Channels</span>
          </NavLink>

          <div style={styles.activeChannelContainer}>
            <span style={styles.activeChannelText}>{activeChannel}</span>
          </div>

          <button
            style={styles.addChannelButton}
            onClick={() => navigate('/dashboard/channels/add')}
          >
            <PiPlusBold style={styles.addChannelIcon} />
            <span style={styles.addChannelText}>Add Channel</span>
          </button>

          <button
            style={styles.inviteMembersButton}
            onClick={() => navigate('/dashboard/invite')}
          >
            <PiUserPlusFill style={styles.inviteMembersIcon} />
            <span style={styles.inviteMembersText}>Invite Members</span>
          </button>
        </div>
      </nav>

      <div style={styles.footer}>
        <p style={styles.footerText}>© 2025 Samparka. All rights reserved.</p>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '305px',
    height: '100vh',
    backgroundColor: '#ffffff',
    color: '#333333',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
    zIndex: 100,
    borderRight: '1px solid #f0f0f0'
  },
  logo: {
    fontSize: '1.8rem',
    marginBottom: '2.5rem',
    color: '#1e3a8a',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: '1px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  navLink: {
    fontSize: '1.1rem',
    color: '#4b5563',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  },
  activeLink: {
    color: '#2563eb',
    backgroundColor: '#f0f7ff'
  },
  icon: {
    fontSize: '1.6rem'
  },
  channelSection: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  addChannelButton: {
    background: 'none',
    border: 'none',
    color: '#4b5563',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    transition: 'all 0.2s ease',
    marginTop: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    gap: '0.75rem'
  },
  addChannelIcon: {
    fontSize: '1.8rem'
  },
  addChannelText: {
    color: '#4b5563'
  },
  inviteMembersButton: {
    background: 'none',
    border: 'none',
    color: '#4b5563',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
    fontWeight: '500',
    gap: '0.75rem'
  },
  inviteMembersIcon: {
    fontSize: '1.8rem'
  },
  inviteMembersText: {
    color: '#4b5563'
  },
  activeChannelContainer: {
    marginTop: '1rem',
    paddingLeft: '1.5rem',
  },
  activeChannelText: {
    fontSize: '1rem',
    color: '#1e3a8a',
    fontWeight: '500'
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '1rem 0'
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#9ca3af'
  }
};

export default Sidebar;
