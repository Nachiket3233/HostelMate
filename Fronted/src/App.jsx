import React from 'react';

// 📂 All Modular Components Imported in App.jsx
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import RoomAllocation from './components/RoomAllocation.jsx';
import RoomDetails from './components/RoomDetails.jsx';
import Complaints from './components/Complaints.jsx';
import Payments from './components/Payments.jsx';
import Attendance from './components/Attendance.jsx';
import './App.css';

function App() {
  return (
    <>
      <Login />
      <Dashboard />
      <RoomAllocation />
      <RoomDetails />
      <Complaints />
      <Payments />
      <Attendance />
    </>
  );
}

export default App;
