import React from 'react';
import { useState } from 'react';

const AttendancePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [isBulkMarking, setIsBulkMarking] = useState(false);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Sample student data
  const students = [
    // Department: Development
    { id: 1, name: 'Rakshya Basyal', department: 'Development', status: 'present', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Swostika Shrestha', department: 'Development', status: 'present', avatar: '/api/placeholder/40/40' },
    
    // Department: Design
    { id: 4, name: 'Jennie Kim', department: 'Design', status: 'present', avatar: '/api/placeholder/40/40' },
    { id: 5, name: 'Hello Kitty', department: 'Design', status: 'present', avatar: '/api/placeholder/40/40' },
    { id: 6, name: 'Sinchan Shrestha', department: 'Design', status: 'absent', avatar: '/api/placeholder/40/40' },
    
    // Department: Testing
    { id: 7, name: 'Lisa Manoban', department: 'Testing', status: 'present', avatar: '/api/placeholder/40/40' },
  ];

  // Filter students based on selected department
  const filteredStudents = selectedDepartment === 'all' 
    ? students 
    : students.filter(student => student.department.toLowerCase() === selectedDepartment);

  // Get unique departments for grouping
  const departments = [...new Set(filteredStudents.map(student => student.department))];

  // Handle status change
  const handleStatusChange = (studentId, newStatus) => {
    console.log(`Changed student ${studentId} status to ${newStatus}`);
    // In a real app, you would update the student's status in state or make an API call
  };

  // Open the attendance modal
  const openAttendanceModal = () => {
    // Prepare data for the modal
    const modalData = selectedDepartment === 'all' 
      ? students 
      : students.filter(student => student.department.toLowerCase() === selectedDepartment);
    
    setAttendanceData(modalData);
    setIsModalOpen(true);
  };

  // Close the attendance modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsBulkMarking(false);
  };

  // Handle bulk status change
  const handleBulkStatusChange = (newStatus) => {
    console.log(`Marking all students as ${newStatus}`);
    // In a real app, you would update all students' statuses in state or make an API call
    
    // Example of updating data
    const updatedData = attendanceData.map(student => ({
      ...student,
      status: newStatus
    }));
    
    setAttendanceData(updatedData);
    setIsBulkMarking(false);
  };

  // Toggle bulk marking options
  const toggleBulkMarking = () => {
    setIsBulkMarking(!isBulkMarking);
  };

  // Save attendance data
  const saveAttendance = () => {
    console.log("Saving attendance data:", attendanceData);
    // In a real app, you would make an API call to save the attendance data
    closeModal();
    // You might want to show a success notification here
  };

  return (
    <div className="attendance-page">
      <div className="attendance-container">
        {/* Header */}
        <div className="header-card">
          <div className="attendance-header">
            <h1 className="page-title">Attendance Tracker</h1>
            
            <div className="date-navigation">
              <button className="nav-button">&lt;</button>
              <span className="current-date">{currentDate}</span>
              <button className="nav-button">&gt;</button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="filter-section">
            <div className="select-container">
              <select
                className="filter-select"
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="testing">Testing</option>
              </select>
            </div>
            
            <button className="take-attendance-button" onClick={openAttendanceModal}>
              Take Attendance
            </button>
          </div>
        </div>
        
        {/* Attendance List */}
        <div className="departments-container">
          {departments.map(department => (
            <div key={department} className="department-section">
              <div className="department-header">
                <h2 className="department-heading">{department}</h2>
              </div>
              
              <ul className="student-list">
                {filteredStudents
                  .filter(student => student.department === department)
                  .map(student => (
                    <li key={student.id} className="student-item">
                      <div className="student-info">
                        <div className="avatar-container">
                          <img src={student.avatar} alt={student.name} className="student-avatar" />
                        </div>
                        <div className="student-details">
                          <p className="student-name">{student.name}</p>
                          <p className="student-department">{student.department}</p>
                        </div>
                      </div>
                      
                      <div className="status-buttons">
                        <button 
                          className={`status-indicator ${student.status === 'present' ? 'present' : ''}`}
                          onClick={() => handleStatusChange(student.id, 'present')}
                        >
                          P
                        </button>
                        
                        <button 
                          className={`status-indicator ${student.status === 'absent' ? 'absent' : ''}`}
                          onClick={() => handleStatusChange(student.id, 'absent')}
                        >
                          A
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          
          {filteredStudents.length === 0 && (
            <div className="empty-state">
              <p>No students found for the selected department.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Take Attendance Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="attendance-modal">
            <div className="modal-header">
              <h2 className="modal-title">Take Attendance</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-actions">
                <div className="attendance-date">
                  <span>Date: {currentDate}</span>
                </div>
                
                <div className="bulk-actions">
                  <button 
                    className="bulk-toggle-button"
                    onClick={toggleBulkMarking}
                  >
                    Mark All Students
                  </button>
                  
                  {isBulkMarking && (
                    <div className="bulk-options">
                      <button 
                        className="bulk-option present"
                        onClick={() => handleBulkStatusChange('present')}
                      >
                        Mark All Present
                      </button>
                      <button 
                        className="bulk-option absent"
                        onClick={() => handleBulkStatusChange('absent')}
                      >
                        Mark All Absent
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="modal-students-container">
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Department</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map(student => (
                      <tr key={student.id} className="student-row">
                        <td className="student-cell">
                          <div className="student-info">
                            <div className="avatar-container">
                              <img src={student.avatar} alt={student.name} className="student-avatar" />
                            </div>
                            <span className="student-name">{student.name}</span>
                          </div>
                        </td>
                        <td className="department-cell">{student.department}</td>
                        <td className="status-cell">
                          <div className="status-buttons">
                            <button 
                              className={`status-indicator ${student.status === 'present' ? 'present' : ''}`}
                              onClick={() => {
                                const updatedData = attendanceData.map(s => 
                                  s.id === student.id ? {...s, status: 'present'} : s
                                );
                                setAttendanceData(updatedData);
                              }}
                            >
                              P
                            </button>
                            
                            <button 
                              className={`status-indicator ${student.status === 'absent' ? 'absent' : ''}`}
                              onClick={() => {
                                const updatedData = attendanceData.map(s => 
                                  s.id === student.id ? {...s, status: 'absent'} : s
                                );
                                setAttendanceData(updatedData);
                              }}
                            >
                              A
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
              <button className="save-button" onClick={saveAttendance}>Save Attendance</button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        /* Main Container Styles - Adjusted for sidebar */
        .attendance-page {
          background-color: #f5f7fa;
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Arial', sans-serif;
          margin-left: 220px; /* Adjust this value to match your sidebar width */
          width: calc(100% - 270px); /* Adjust width to account for sidebar */
          box-sizing: border-box;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          margin-bottom:0;
        }
        
        .attendance-container {
          width: 100%;
          margin: 0 auto;
        }
        
        /* Header Styles */
        .header-card {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .attendance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .page-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e3a8a;
          margin: 0;
        }
        
        .date-navigation {
          display: flex;
          align-items: center;
          background-color: #f6f8fb;
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
        }
        
        .nav-button {
          background: none;
          border: none;
          color: #777;
          font-size: 1.125rem;
          cursor: pointer;
          padding: 0.25rem;
        }
        
        .current-date {
          margin: 0 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #555;
        }
        
        /* Filter Section Styles */
        .filter-section {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .select-container {
          position: relative;
          flex: 1;
          max-width: 300px;
        }
        
        .filter-select {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid #e1e5eb;
          border-radius: 6px;
          background-color: white;
          font-size: 0.875rem;
          color: #333;
          appearance: none;
          cursor: pointer;
        }
        
        .select-container::after {
          content: "";
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #777;
          pointer-events: none;
        }
        
        .take-attendance-button {
          background-color:#1e3a8a;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.625rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.2s;
        }
        
        .take-attendance-button:hover {
          background-color: #3a47d5;
        }
        
        /* Department Section Styles */
        .departments-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .department-section {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .department-header {
          background-color: #f6f8fb;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e1e5eb;
        }
        
        .department-heading {
          font-size: 1.125rem;
          font-weight: 500;
          color: #333;
          margin: 0;
        }
        
        /* Student List Styles */
        .student-list {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        
        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f0f2f5;
        }
        
        .student-item:last-child {
          border-bottom: none;
        }
        
        .student-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .avatar-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .student-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .student-details {
          display: flex;
          flex-direction: column;
        }
        
        .student-name {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #333;
          margin: 0 0 0.25rem 0;
        }
        
        .student-department {
          font-size: 0.75rem;
          color: #777;
          margin: 0;
        }
        
        /* Status Button Styles */
        .status-buttons {
          display: flex;
          gap: 0.75rem;
        }
        
        .status-indicator {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          background-color: #eaeaea;
          color: #777;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .status-indicator:hover {
          background-color: #dedede;
        }
        
        .status-indicator.present {
          background-color: #4cd964;
          color: white;
        }
        
        .status-indicator.absent {
          background-color: #ff3b30;
          color: white;
        }
        
        /* Empty State */
        .empty-state {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          text-align: center;
          color: #777;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .attendance-modal {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e1e5eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #777;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        
        .modal-content {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }
        
        .modal-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .attendance-date {
          font-size: 0.9375rem;
          color: #555;
        }
        
        .bulk-actions {
          position: relative;
        }
        
        .bulk-toggle-button {
          background-color: #f6f8fb;
          border: 1px solid #e1e5eb;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: #555;
          cursor: pointer;
        }
        
        .bulk-options {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background-color: white;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .bulk-option {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .bulk-option:hover {
          background-color: #f6f8fb;
        }
        
        .bulk-option.present {
          color: #4cd964;
        }
        
        .bulk-option.absent {
          color: #ff3b30;
        }
        
        .modal-students-container {
          max-height: 400px;
          overflow-y: auto;
          border: 1px solid #e1e5eb;
          border-radius: 6px;
        }
        
        .attendance-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .attendance-table th {
          padding: 0.75rem 1rem;
          background-color: #f6f8fb;
          border-bottom: 1px solid #e1e5eb;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 500;
          color: #555;
        }
        
        .student-row {
          border-bottom: 1px solid #f0f2f5;
        }
        
        .student-row:last-child {
          border-bottom: none;
        }
        
        .student-cell, .department-cell, .status-cell {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
        }
        
        .student-cell .student-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .department-cell {
          color: #777;
        }
        
        .modal-footer {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid #e1e5eb;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }
        
        .cancel-button {
          background-color: #f6f8fb;
          border: 1px solid #e1e5eb;
          border-radius: 6px;
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
          color: #555;
          cursor: pointer;
        }
        
        .save-button {
          background-color: #1e3a8a;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }
        
        .save-button:hover {
          background-color: #3a47d5;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .attendance-page {
            margin-left: 0;
            width: 100%;
            padding: 1rem;
            position: static;
          }
          
          .attendance-container {
            padding: 0;
          }
        }
        
        @media (max-width: 768px) {
          .attendance-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .filter-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .select-container {
            max-width: none;
          }
          
          .take-attendance-button {
            width: 100%;
          }
          
          .modal-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .bulk-actions {
            width: 100%;
          }
          
          .bulk-toggle-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AttendancePage;