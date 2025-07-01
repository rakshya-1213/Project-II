// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();  // ✅ Correctly use useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserRole = async () => {
      try {
        // Simulating role fetch
        const role = 'member'; 
        setUserRole(role);
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    fetchUserRole();
  }, [navigate]);  // ✅ Add navigate as a dependency

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role={userRole} />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
