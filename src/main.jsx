import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import App from './App';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Dashboard from './pages/Dashboard';
import Sidebar from './pages/Sidebar';
import AttendancePage from './pages/AttendancePage';
import MessagesPage from './pages/MessagesPage';
import ChannelsPage from './pages/ChannelsPage';
import LabelPage from './pages/LabelPage';
import ResetPass from './pages/ResetPass';
import TeamNameStep from './pages/TeamNameStep';
import TeamInvitationPage from './pages/TeamInvitationPage';
import AddChannelPage from './pages/AddChannelPage';
import FrontPage from './components/FrontPage';
import AdminDashboard from './components/AdminDashboard';

import ErrorBoundary from './components/ErrorBoundary'; // <-- import here

import './index.css';


// Route debugger component
const RouteDebugger = () => {
  const location = useLocation();
  console.log('Current route:', {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state,
    key: location.key
  });
  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteDebugger />
      <ErrorBoundary>
<Routes>
  {/* Homepage routes */}
  <Route path="/" element={<FrontPage />} />
  <Route path="/FrontPage" element={<FrontPage />} />

  {/* Authentication routes */}
  <Route path="/login" element={<App />} />
  <Route path="/SignupPage" element={<SignupPage />} />
  <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
   <Route path="/reset-password" element={<ResetPass />} />


  {/* Team setup routes */}
  <Route path="/TeamNameStep" element={<TeamNameStep />} />
  <Route path="/teamnamestep" element={<TeamNameStep />} />
  <Route path="/TeamInvitationPage" element={<TeamInvitationPage />} />
  <Route path="/teaminvitationpage" element={<TeamInvitationPage />} />

  {/* Sidebar route */}
  <Route path="/Sidebar" element={<Sidebar />} />

  {/* Admin Dashboard route */}
  <Route path="/AdminDashboard" element={<AdminDashboard />} />

  {/* Dashboard and nested routes */}
  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<AttendancePage />} />
    <Route path="attendance" element={<AttendancePage />} />
    <Route path="messages" element={<MessagesPage />} />
    <Route path="channels" element={<ChannelsPage />} />
    <Route path="channels/add" element={<AddChannelPage />} />
    <Route path="label" element={<LabelPage />} />
    <Route path="teamnamestep" element={<TeamNameStep />} />
    <Route path="teaminvitation" element={<TeamInvitationPage />} />
    <Route path="/dashboard/channels/add" element={<AddChannelPage />} />

  </Route>

  {/* Fallback Route */}
  <Route
    path="*"
    element={
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>404 - Route not found</h2>
        <p>Unable to match: {window.location.pathname}</p>
        <a href="/login">Return to login</a>
      </div>
    }
  />
</Routes>

      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
