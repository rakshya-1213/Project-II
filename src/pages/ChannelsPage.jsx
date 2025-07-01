import React, { useState, useEffect } from 'react';

const ChannelsPage = () => {
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchedTeamName = localStorage.getItem('teamName') || 'Your Team';
    setTeamName(fetchedTeamName);
  }, []);

  const updateTeamName = (newName) => {
    localStorage.setItem('teamName', newName);
    setTeamName(newName);
  };

  return (
    <div className="channels-page">
      <style>
        {`
          .channels-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            height: 100vh;
            padding-left: 300px;
          }

          .page-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            padding: 15px 0;
            border-bottom: 1px solid #eaeaea;
          }

          .team-name {
            font-size: 20px;
            font-weight: 500;
            color: #1e3a8a;
            margin-top: 5px;
            padding-left: 15px;
            display: flex;
            align-items: center;
          }

          .team-name-text {
            margin-right: 10px;
          }

          .edit-button {
            background: none;
            border: none;
            font-size: 14px;
            color: #6b7280;
            cursor: pointer;
            padding: 2px 8px;
            border-radius: 4px;
          }

          .edit-button:hover {
            background-color: #f3f4f6;
          }

          .team-name-input {
            font-size: 18px;
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid #d1d5db;
            color: #1e3a8a;
            margin-right: 8px;
          }

          .save-button {
            background-color: #2563eb;
            color: white;
            border: none;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
          }

          .content-container {
            height: calc(100vh - 100px);
            overflow-y: auto;
          }

          .section-title {
            font-size: 20px;
            font-weight: 600;
            margin: 25px 0 10px 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #eaeaea;
          }

          .announcement-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
          }

          .announcement-card {
            border: 1px solid #eaeaea;
            border-radius: 8px;
            padding: 16px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
          }

          .announcement-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 6px;
          }

          .announcement-date {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 8px;
          }

          .announcement-desc {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.4;
          }
        `}
      </style>

      <h1 className="page-title">Channels</h1>
      
      <TeamNameDisplay 
        teamName={teamName} 
        updateTeamName={updateTeamName} 
      />

      <div className="content-container">
        <div className="section-title">Upcoming Events</div>
        <div className="announcement-list">
          <div className="announcement-card">
            <div className="announcement-title">Monthly All-Hands Meeting</div>
            <div className="announcement-date">May 10, 2025 • 3:00 PM</div>
            <div className="announcement-desc">Join us for the company-wide all-hands meeting where we'll share updates, wins, and upcoming goals.</div>
          </div>
          <div className="announcement-card">
            <div className="announcement-title">UX Design Workshop</div>
            <div className="announcement-date">May 12, 2025 • 11:00 AM</div>
            <div className="announcement-desc">A hands-on session to explore our new design system and get feedback on user flows.</div>
          </div>
        </div>

        <div className="section-title">Reminders</div>
        <div className="announcement-list">
          <div className="announcement-card">
            <div className="announcement-title">Submit Q2 Progress Reports</div>
            <div className="announcement-date">Deadline: May 15, 2025</div>
            <div className="announcement-desc">All team leads must submit their progress reports via the shared drive before the deadline.</div>
          </div>
          <div className="announcement-card">
            <div className="announcement-title">RSVP for Annual Retreat</div>
            <div className="announcement-date">RSVP by: May 20, 2025</div>
            <div className="announcement-desc">Don't forget to RSVP for our team retreat happening next month!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamNameDisplay = ({ teamName, updateTeamName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEdit = () => {
    setEditValue(teamName);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      updateTeamName(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className="team-name">
      {isEditing ? (
        <>
          <input
            type="text"
            className="team-name-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className="team-name-text"># {teamName}</span>
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default ChannelsPage;