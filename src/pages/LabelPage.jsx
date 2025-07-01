// pages/LabelPage.jsx
import React from 'react';

const LabelPage = () => {
  return (
    <div className="label-page">
      <h1 className="page-title">Labels</h1>
      <div className="content-container">
        <div className="labels-section">
          <div className="section-header">
            <h2>Your Labels</h2>
            <button className="add-button">+ Add New Label</button>
          </div>
          
          <div className="labels-grid">
            <div className="label-card">
              <div className="label-color" style={{ backgroundColor: "#FF5733" }}></div>
              <div className="label-info">
                <h3>High Priority</h3>
                <p>Urgent tasks that need immediate attention</p>
              </div>
              <div className="label-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
            
            <div className="label-card">
              <div className="label-color" style={{ backgroundColor: "#33A1FF" }}></div>
              <div className="label-info">
                <h3>In Progress</h3>
                <p>Tasks currently being worked on</p>
              </div>
              <div className="label-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
            
            <div className="label-card">
              <div className="label-color" style={{ backgroundColor: "#33FF57" }}></div>
              <div className="label-info">
                <h3>Completed</h3>
                <p>Tasks that have been finished</p>
              </div>
              <div className="label-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPage;