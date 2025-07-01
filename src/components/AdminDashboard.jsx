import React, { useState, useEffect } from 'react';
import {
  Users, Calendar, CheckSquare,
  MessageCircle, Settings, Bell,
  UserCircle, PlusCircle, X, Mail
} from 'lucide-react';

// --- Sidebar item component ---
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      cursor: 'pointer',
      backgroundColor: active ? '#1e40af' : 'transparent',
      color: active ? 'white' : '#cbd5e1',
      fontWeight: active ? '700' : '500',
      borderRadius: '8px',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    }}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: 'AdminUser', role: 'admin' });
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '', description: '', type: 'Meeting' });
  const [eventErrors, setEventErrors] = useState({});

  // Load initial mock data
  useEffect(() => {
    const mockUsers = [
      { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'member', teamName: 'Alpha', status: 'Active' },
      { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: 'member', teamName: 'Beta', status: 'Active' },
      { id: 'u3', name: 'Bob Lee', email: 'bob@example.com', role: 'member', teamName: 'Alpha', status: 'Active' },
      { id: 'u4', name: 'Alice Moon', email: 'alice@example.com', role: 'member', teamName: 'Beta', status: 'Active' },
    ];
    setUsers(mockUsers);

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    setAttendance(mockUsers.flatMap(u => [
      { userId: u.id, date: today, status: 'Present' },
      { userId: u.id, date: yesterday, status: 'Present' },
    ]));

    setEvents([
      { id: 1, title: 'Team Workshop', date: today, time: '10:00', location: 'Room A', description: 'Monthly team bonding', type: 'Workshop' },
      { id: 2, title: 'Launch Meeting', date: tomorrow(), time: '14:00', location: 'Main Hall', description: 'Product launch', type: 'Meeting' },
    ]);
  }, []);

  function tomorrow() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  // Invite handler
  const handleInvite = e => {
    e.preventDefault();
    if (!inviteEmail.trim() || !/\S+@\S+\.\S+/.test(inviteEmail)) {
      setInviteError('Valid email is required');
      return;
    }
    alert(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setInviteError('');
    setShowInviteModal(false);
  };

  // Toggle attendance status
  const toggleAttendance = (uid, date) => {
    setAttendance(prev => {
      const idx = prev.findIndex(r => r.userId === uid && r.date === date);
      if (idx > -1) {
        const arr = [...prev];
        arr[idx].status = arr[idx].status === 'Present' ? 'Absent' : 'Present';
        return arr;
      }
      return [...prev, { userId: uid, date, status: 'Present' }];
    });
  };

  const saveAttendance = () => {
    console.log('Attendance saved:', attendance);
    alert('Attendance saved!');
  };

  // Event form handlers
  const handleEventChange = e => setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  const saveEvent = e => {
    e.preventDefault();
    const errs = {};
    ['title', 'date', 'time', 'location', 'type'].forEach(f => {
      if (!eventForm[f]) errs[f] = 'Required';
    });
    if (Object.keys(errs).length) {
      setEventErrors(errs);
      return;
    }
    setEvents([...events, { id: Date.now(), ...eventForm }]);
    setEventForm({ title: '', date: '', time: '', location: '', description: '', type: 'Meeting' });
    setEventErrors({});
    setShowEventModal(false);
  };

  // Unique dates for attendance table
  const dates = [...new Set(attendance.map(r => r.date))].sort();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4ff' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: '#1e293b', padding: 20 }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>Samparka Admin</h2>
        {['Dashboard', 'Users', 'Events', 'Attendance', 'Messages', 'Settings'].map(tab => (
          <SidebarItem
            key={tab}
            label={tab}
            icon={tab === 'Users' ? Users : tab === 'Events' ? Calendar :
                  tab === 'Attendance' ? CheckSquare : tab === 'Messages' ? MessageCircle : Settings}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 30 }}>
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30 }}>
          <Bell size={24} />
          <UserCircle size={28} style={{ margin: '0 10px' }} />
          <span>{currentUser.username} ({currentUser.role})</span>
        </header>

        {/* Render each tab */}
        {activeTab === 'Dashboard' && (
          <div>
            <h1>Dashboard Overview</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {[
                { title: 'Total Users', value: users.length, icon: Users },
                { title: 'Team Members', value: users.filter(u => u.role === 'member').length, icon: Users },
                { title: 'Upcoming Events', value: events.length, icon: Calendar },
                { title: 'Present Today', value: attendance.filter(r => r.date === new Date().toISOString().split('T')[0] && r.status === 'Present').length, icon: CheckSquare },
              ].map(({ title, value, icon: Icon }, i) => (
                <div key={i} style={{ flex: '1 1 200px', background: '#2563eb', color: '#fff', borderRadius: 8, padding: 20 }}>
                  <Icon size={32} />
                  <p style={{ margin: '10px 0 0', fontSize: 24 }}>{title}</p>
                  <h2 style={{ margin: 0 }}>{value}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h1>Users & Invites</h1>
              <button
                onClick={() => setShowInviteModal(true)}
                style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: 6 }}
              >
                <Mail size={16} /> Invite
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#1e40af', color: '#fff' }}>
                <tr>
                  <th>Name</th><th>Email</th><th>Team</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: 8 }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.teamName}</td>
                    <td style={{ color: u.status === 'Active' ? 'green' : 'orange' }}>{u.status}</td>
                    <td>
                      <button
                        onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}
                        style={{ background: '#dc2626', color: '#fff', borderRadius: 4, padding: '4px 8px' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h1>Events</h1>
              <button
                onClick={() => setShowEventModal(true)}
                style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: 6 }}
              >
                <PlusCircle size={16} /> Add Event
              </button>
            </div>
            <div style={{ display: 'grid', gap: 20 }}>
              {events.map(ev => (
                <div key={ev.id} style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ margin: 0 }}>{ev.title}</h3>
                  <p style={{ margin: '8px 0' }}>{ev.date} ‣ {ev.time} ‣ {ev.location}</p>
                  <p>{ev.description}</p>
                  <button
                    onClick={() => setEvents(prev => prev.filter(x => x.id !== ev.id))}
                    style={{ background: '#ef4444', color: '#fff', borderRadius: 4, padding: '4px 8px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Attendance' && (
          <div>
            <h1>Attendance Tracker</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#1e40af', color: '#fff' }}>
                <tr>
                  <th>Date</th><th>Name</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.flatMap(u =>
                  dates.map(date => {
                    const rec = attendance.find(r => r.userId === u.id && r.date === date);
                    const stat = rec?.status || 'Absent';
                    return (
                      <tr key={`${u.id}-${date}`} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: 8 }}>{date}</td>
                        <td>{u.name}</td>
                        <td style={{ color: stat === 'Present' ? 'green' : 'red' }}>{stat}</td>
                        <td>
                          <button
                            onClick={() => toggleAttendance(u.id, date)}
                            style={{ background: '#2563eb', color: '#fff', borderRadius: 4, padding: '4px 8px' }}
                          >
                            Toggle
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
            <button
              onClick={saveAttendance}
              style={{ marginTop: 20, background: '#059669', color: '#fff', padding: '10px 20px', borderRadius: 6 }}
            >
              Save Attendance
            </button>
          </div>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <div style={modalOverlayStyle} onClick={() => setShowInviteModal(false)}>
            <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
              <X size={24} style={{ cursor: 'pointer' }} onClick={() => setShowInviteModal(false)} />
              <h2>Invite Team Member</h2>
              <form onSubmit={handleInvite}>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => { setInviteEmail(e.target.value); setInviteError(''); }}
                  placeholder="Enter email"
                  style={formInputStyle}
                />
                {inviteError && <p style={{ color: 'red' }}>{inviteError}</p>}
                <button type="submit" style={modalButtonStyle}>Send Invite</button>
              </form>
            </div>
          </div>
        )}

        {/* Add Event Modal */}
        {showEventModal && (
          <div style={modalOverlayStyle} onClick={() => setShowEventModal(false)}>
            <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
              <X size={24} style={{ cursor: 'pointer' }} onClick={() => setShowEventModal(false)} />
              <h2>Add New Event</h2>
              <form onSubmit={saveEvent}>
                {['title', 'date', 'time', 'location'].map(f => (
                  <div key={f} style={{ marginBottom: 15 }}>
                    <input
                      name={f}
                      type={f === 'date' ? 'date' : 'text'}
                      placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                      value={eventForm[f]}
                      onChange={handleEventChange}
                      style={formInputStyle}
                    />
                    {eventErrors[f] && <p style={{ color: 'red' }}>{eventErrors[f]}</p>}
                  </div>
                ))}
                <select name="type" value={eventForm.type} onChange={handleEventChange} style={formInputStyle}>
                  {['Meeting', 'Workshop', 'Training', 'Conference', 'Social', 'Other'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={eventForm.description}
                  onChange={handleEventChange}
                  style={{ ...formInputStyle, height: 80 }}
                />
                <button type="submit" style={modalButtonStyle}>Save Event</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Basic styling for modals and form
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};
const modalContentStyle = {
  background: '#fff', padding: 30, borderRadius: 8, width: 400, position: 'relative'
};
const formInputStyle = {
  width: '100%', padding: '10px', marginBottom: 10,
  borderRadius: 4, border: '1px solid #ccc', fontSize: 16
};
const modalButtonStyle = {
  width: '100%', padding: '10px',
  background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'
};

export default AdminDashboard;
