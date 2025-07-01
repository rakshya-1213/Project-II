import React, { useState } from 'react';
import { Phone, Video, MoreHorizontal, Send, Search, Smile, Paperclip } from 'lucide-react';

const MessagesPage = () => {
  const [showConversations, setShowConversations] = useState(true);
  const [messageText, setMessageText] = useState('');

  const toggleConversations = () => {
    setShowConversations(!showConversations);
  };

  // Array of slightly different background colors for variation
  const messageBackgrounds = [
    'rgba(243, 244, 246, 1)',    // Original color
    'rgba(241, 245, 249, 1)',    // Slightly different shade
    'rgba(244, 244, 245, 1)',    // Another slight variation
  ];
  
  // Function to get a random background from our array
  const getRandomBackground = () => {
    return messageBackgrounds[Math.floor(Math.random() * messageBackgrounds.length)];
  };

  return (
    <div className="messages-page">
      <div className={`messages-container ${!showConversations ? 'expanded-view' : ''}`}>
        {/* Toggle button */}
        <button 
          className={`toggle-conversations ${!showConversations ? 'conversations-hidden' : ''}`} 
          onClick={toggleConversations}
        >
          {showConversations ? '◀' : '▶'}
        </button>
        
        {showConversations && (
          <div className="conversations-list">
            <div className="conversations-header">
              <h2 className="conversations-title">Conversations</h2>
              <div className="search-wrapper">
                <div className="search-input-container">
                  <Search size={16} className="search-icon" />
                  <input type="text" placeholder="Search messages..." className="search-input" />
                </div>
              </div>
            </div>
            
            <div className="conversation-items">
              {/* Active conversation */}
              <div className="conversation-item active">
                <div className="user-avatar" style={{ 
                  backgroundImage: 'linear-gradient(45deg, #4f46e5, #3b82f6)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>B</div>
                <div className="conversation-details">
                  <h3>BCA</h3>
                  <p className="last-message">Great job on the presentation!</p>
                  <span className="message-time">10:30 AM</span>
                </div>
              </div>
              
              {/* Other conversations */}
              <div className="conversation-item">
                <div className="user-avatar" style={{ 
                  backgroundImage: 'linear-gradient(45deg, #059669, #10b981)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>C</div>
                <div className="conversation-details">
                  <h3>CSIT</h3>
                  <p className="last-message">When can we meet to discuss the campaign?</p>
                  <span className="message-time">Yesterday</span>
                </div>
              </div>
              
              <div className="conversation-item">
                <div className="user-avatar" style={{ 
                  backgroundImage: 'linear-gradient(45deg, #d97706, #f59e0b)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>B</div>
                <div className="conversation-details">
                  <h3>BBS</h3>
                  <p className="last-message">The deadline has been extended by two days.</p>
                  <span className="message-time">Apr 14</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="message-view">
          <div className="message-header">
            <div className="header-info">
              <h2>Samparka</h2>
              <span className="status-indicator">
                <span className="status-dot"></span>
                Active now
              </span>
            </div>
            <div className="message-actions">
              <button className="action-button">
                <Phone className="action-icon" size={18} />
              </button>
              <button className="action-button">
                <Video className="action-icon" size={18} />
              </button>
              <button className="action-button">
                <MoreHorizontal className="action-icon" size={18} />
              </button>
            </div>
          </div>
          
          <div className="messages-list">
            <div className="message-date-separator">
              <span>Today</span>
            </div>
            
            <div className="message received" style={{ backgroundColor: getRandomBackground() }}>
              <div className="message-sender">Rakshya Basyal</div>
              <div className="message-content">Hi Swostika jii</div>
              <div className="message-time">10:15 AM</div>
            </div>
            
            <div className="message sent" style={{ backgroundColor: 'rgba(239, 246, 255, 0.95)' }}>
              <div className="message-content">Hello aaja college najam hai</div>
              <div className="message-time">10:18 AM</div>
            </div>
            
            <div className="message received" style={{ backgroundColor: getRandomBackground() }}>
              <div className="message-sender">Dikshya Devkota</div>
              <div className="message-content">Kina na aaune hora</div>
              <div className="message-time">10:30 AM</div>
            </div>
            <div className="message sent" style={{ backgroundColor: 'rgba(239, 246, 255, 0.95)' }}>
              <div className="message-content">Hello aaja college najam hai</div>
              <div className="message-time">10:18 AM</div>
            </div>
            <div className="message sent" style={{ backgroundColor: 'rgba(239, 246, 255, 0.95)' }}>
              <div className="message-content">Hello aaja college najam hai</div>
              <div className="message-time">10:18 AM</div>
            </div>
            <div className="message sent" style={{ backgroundColor: 'rgba(239, 246, 255, 0.95)' }}>
              <div className="message-content">Hello aaja college najam hai</div>
              <div className="message-time">10:18 AM</div>
            </div>
          </div>

          
          <div className="message-input-area">
            <button className="input-action-button">
              <Paperclip size={18} />
            </button>
            <div className="message-input-wrapper">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="message-input" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button className="emoji-button">
                <Smile size={18} />
              </button>
            </div>
            <button 
              className={`send-button ${messageText.trim() ? 'active' : ''}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ========== LAYOUT & STRUCTURE ========== */
        .messages-page {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 305px; /* Space for sidebar */
          margin: 0;
          padding: 0;
          background-color: #ffffff;
          overflow: hidden;
        }

        .messages-container {
          display: flex;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          overflow: hidden;
          position: relative;
        }

        /* Toggle button for conversations panel */
        .toggle-conversations {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 10;
          width: 20px;
          height: 40px;
          border: none;
          background-color: #f3f4f6;
          border-right: 1px solid #e5e7eb;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #6b7280;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .toggle-conversations:hover {
          background-color: #e5e7eb;
        }

        .toggle-conversations.conversations-hidden {
          left: 0;
        }

        /* ========== CONVERSATIONS PANEL ========== */
        .conversations-list {
          width: 30%;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: #ffffff;
          transition: all 0.3s ease;
        }

        /* Expanded view when conversations are hidden */
        .expanded-view .message-view {
          width: 100%;
        }

        .conversations-header {
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .conversations-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 15px;
        }

        /* Search area */
        .search-wrapper {
          width: 100%;
        }

        .search-input-container {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 36px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 14px;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        /* Conversation list */
        .conversation-items {
          flex: 1;
          overflow-y: auto;
        }

        .conversation-item {
          display: flex;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
        }

        .conversation-item:hover {
          background-color: #f9fafb;
        }

        .conversation-item.active {
          background-color: #f3f4f6;
          border-left: 4px solid #3b82f6;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #d1d5db;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .conversation-details {
          flex: 1;
          min-width: 0;
        }

        .conversation-details h3 {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .last-message {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .message-time {
          font-size: 12px;
          color: #9ca3af;
        }

        /* ========== MESSAGE VIEW ========== */
        .message-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: #ffffff;
          transition: all 0.3s ease;
        }

        /* Message header */
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-info {
          display: flex;
          flex-direction: column;
        }

        .message-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #10b981;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          margin-right: 6px;
          display: inline-block;
        }

        /* Action buttons */
        .message-actions {
          display: flex;
          gap: 10px;
        }

        .action-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background-color: #e5e7eb;
        }

        .action-icon {
          color: #4b5563;
        }

        /* Messages list */
        .messages-list {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-date-separator {
          display: flex;
          align-items: center;
          margin: 16px 0;
          text-align: center;
        }

        .message-date-separator::before,
        .message-date-separator::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #e5e7eb;
        }

        .message-date-separator span {
          padding: 0 16px;
          font-size: 13px;
          color: #9ca3af;
        }

        .message {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 12px;
          position: relative;
        }

        .message-sender {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #4b5563;
        }

        .message-content {
          font-size: 15px;
          line-height: 1.4;
        }

        .message .message-time {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 4px;
          text-align: right;
        }

        .message.received {
          align-self: flex-start;
          background-color: #f3f4f6;
          border-bottom-left-radius: 4px;
        }

        .message.sent {
          align-self: flex-end;
          background-color: #eff6ff;
          border-bottom-right-radius: 4px;
        }

        .message.sent .message-content {
          color: #1f2937;
        }

        /* Message input area */
        .message-input-area {
          display: flex;
          padding: 16px 20px;
          border-top: 1px solid #e5e7eb;
          gap: 12px;
          align-items: center;
        }

        .input-action-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          border: none;
          cursor: pointer;
          color: #6b7280;
        }

        .input-action-button:hover {
          background-color: #e5e7eb;
        }

        .message-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          background-color: #f3f4f6;
          border-radius: 24px;
          padding: 0 8px 0 16px;
        }

        .message-input {
          flex: 1;
          padding: 12px 0;
          border: none;
          outline: none;
          font-size: 15px;
          background-color: transparent;
        }

        .emoji-button {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e5e7eb;
          color: #9ca3af;
          border: none;
          cursor: default;
          transition: all 0.2s ease;
        }

        .send-button.active {
          background-color: #3b82f6;
          color: white;
          cursor: pointer;
        }

        .send-button.active:hover {
          background-color: #2563eb;
        }

        /* ========== RESPONSIVE DESIGN ========== */
        @media (max-width: 1200px) {
          .conversations-list {
            width: 35%;
          }
        }

        @media (max-width: 768px) {
          .messages-page {
            left: 0;
          }
          
          .conversations-list {
            width: 40%;
          }
          
          .toggle-conversations {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .conversations-list {
            width: 85%;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 20;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          .message {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default MessagesPage;