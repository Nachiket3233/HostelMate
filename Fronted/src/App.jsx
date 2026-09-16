import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
      <Routes>
        {/* Default route opens Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Main Dashboard & Sub-pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room-allocation" element={<RoomAllocation />} />
        <Route path="/allocation" element={<RoomAllocation />} />
        <Route path="/room-details" element={<RoomDetails />} />
        <Route path="/details" element={<RoomDetails />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/attendance" element={<Attendance />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;