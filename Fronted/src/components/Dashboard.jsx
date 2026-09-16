import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// 📂 Separate Page Components (Inside components folder)
import RoomAllocation from './RoomAllocation.jsx';
import RoomDetails from './RoomDetails.jsx';
import Complaints from './Complaints.jsx';
import Payments from './Payments.jsx';
import Attendance from './Attendance.jsx';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 📸 Profile Photo State & One-time Lock Workflow
  const [profilePhoto, setProfilePhoto] = useState(
    () => localStorage.getItem('student_profile_photo') || null
  );
  // Ek baar daalne ke baad lock ho jayega (true / false)
  const [isPhotoLocked, setIsPhotoLocked] = useState(
    () => localStorage.getItem('student_photo_locked') === 'true'
  );
  // Admin Request Status: 'none' | 'pending' | 'approved' | 'rejected'
  const [requestStatus, setRequestStatus] = useState(
    () => localStorage.getItem('student_photo_request_status') || 'none'
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const fileInputRef = useRef(null);

  // Student uploads or updates photo
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        localStorage.setItem('student_profile_photo', reader.result);
        
        // Upload karte hi photo lock ho jayegi
        setIsPhotoLocked(true);
        localStorage.setItem('student_photo_locked', 'true');
        
        // Request status reset ho jayega
        setRequestStatus('none');
        localStorage.setItem('student_photo_request_status', 'none');
      };
      reader.readAsDataURL(file);
    }
  };

  // Student Admin se permission maangta hai
  const handleRequestChange = () => {
    setRequestStatus('pending');
    localStorage.setItem('student_photo_request_status', 'pending');
  };

  // Admin permission deta hai ya deny karta hai (Demo/Simulator)
  const handleAdminDecision = (decision) => {
    if (decision === 'approve') {
      setRequestStatus('approved');
      localStorage.setItem('student_photo_request_status', 'approved');
    } else {
      setRequestStatus('rejected');
      localStorage.setItem('student_photo_request_status', 'rejected');
    }
  };

  // Demo testing ke liye Reset function
  const handleResetDemo = () => {
    setProfilePhoto(null);
    setIsPhotoLocked(false);
    setRequestStatus('none');
    localStorage.removeItem('student_profile_photo');
    localStorage.removeItem('student_photo_locked');
    localStorage.removeItem('student_photo_request_status');
  };

  // ⏰ Current Time ke hisaab se Dynamic Greeting
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div className="dashboard-layout">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo">
            <span style={{ fontSize: '24px' }}>🏨</span>
            <span>HostelMate</span>
          </div>

          <ul className="sidebar-menu">
            <li 
              className={activeTab === 'dashboard' ? 'menu-item active' : 'menu-item'}
              onClick={() => setActiveTab('dashboard')}
            >
              <span>🏠</span>
              <span>Dashboard</span>
            </li>
            <li 
              className={activeTab === 'allocation' ? 'menu-item active' : 'menu-item'}
              onClick={() => setActiveTab('allocation')}
            >
              <span>🛏️</span>
              <span>Room Allocation</span>
            </li>
            <li 
              className={activeTab === 'details' ? 'menu-item active' : 'menu-item'}
              onClick={() => setActiveTab('details')}
            >
              <span>📄</span>
              <span>Room Details</span>
            </li>
            <li 
              className={activeTab === 'complaints' ? 'menu-item active' : 'menu-item'}
              onClick={() => setActiveTab('complaints')}
            >
              <span>⚠️</span>
              <span>Complaints</span>
            </li>
            <li 
              className={activeTab === 'payments' ? 'menu-item active' : 'menu-item'}
              onClick={() => setActiveTab('payments')}
            >
              <span>💳</span>
              <span>Payments</span>
            </li>
            <li 
              className={activeTab === 'attendance' ? 'menu-item active' : 'menu-item'}
              onClick={() => setActiveTab('attendance')}
            >
              <span>📅</span>
              <span>Attendance</span>
            </li>
          </ul>
        </div>

        {/* Sidebar Bottom (Logout) */}
        <div className="sidebar-bottom">
          <button 
            className="logout-btn" 
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/login');
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="main-content">
        
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="greeting-text">
            <h2>{getGreeting()}, Rahul Sharma 👋</h2>
            <p>Stay comfortable, stay productive!</p>
          </div>
          
          {/* User Profile with One-time Photo Upload & Admin Approval */}
          <div className="user-profile-wrapper">
            <div 
              className="user-profile" 
              onClick={() => setShowProfileModal(!showProfileModal)} 
              title={
                !isPhotoLocked 
                  ? "Upload Profile Photo" 
                  : requestStatus === 'approved' 
                  ? "Admin Approved! Click to change photo" 
                  : "Click to view profile"
              }
            >
              <div className="avatar-blob-container">
                <div className="avatar-blob">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Student Profile" className="avatar-img" />
                  ) : (
                    <span>RS</span>
                  )}
                </div>
                
                {/* Camera Badge: Only visible when uploading is allowed (No lock symbol) */}
                {(!isPhotoLocked || requestStatus === 'approved') && (
                  <div 
                    className={`avatar-badge ${!isPhotoLocked ? 'camera-badge' : 'approved-badge'}`}
                    title={!isPhotoLocked ? 'Upload Photo' : 'Admin Approved - Change Photo'}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }}
                  >
                    📷
                  </div>
                )}
              </div>

              <div className="user-info-text d-none d-sm-block text-start">
                <div className="fw-bold text-dark" style={{ fontSize: '14.5px', lineHeight: '1.2' }}>Rahul Sharma</div>
                <div className="d-flex align-items-center gap-1">
                  <small className="text-muted" style={{ fontSize: '11.5px' }}>Room B-204</small>
                  {isPhotoLocked && requestStatus === 'approved' && (
                    <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2" style={{ fontSize: '9.5px' }}>
                      Change Allowed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Hidden File Input for Image Selection */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handlePhotoUpload} 
            />

            {/* Profile Modal / Dropdown with Admin Permission Workflow */}
            {showProfileModal && (
              <div className="profile-dropdown-card shadow-lg">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary-subtle text-primary">Student Profile</span>
                  <button 
                    className="btn btn-sm btn-light rounded-circle p-1" 
                    onClick={() => setShowProfileModal(false)}
                    style={{ width: '24px', height: '24px', lineHeight: '10px' }}
                  >
                    ✕
                  </button>
                </div>

                <div className="text-center mb-3">
                  <div className="profile-popup-avatar mx-auto mb-2">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Student Profile" className="avatar-img" />
                    ) : (
                      <span className="fs-3 fw-bold text-success">RS</span>
                    )}
                  </div>
                  <h6 className="fw-bold mb-0 text-dark">Rahul Sharma</h6>
                  <small className="text-muted">Roll: CS-2024-042</small>
                  <div className="badge bg-light text-dark border mt-1 d-block mx-auto" style={{ maxWidth: '160px' }}>
                    Hostel Resident (B-204)
                  </div>
                </div>

                {/* PHOTO PERMISSION WORKFLOW */}
                <div className="photo-policy-box mb-3">
                  
                  {/* CASE 1: No photo uploaded yet (First time upload allowed) */}
                  {!isPhotoLocked && (
                    <div>
                      <div className="alert alert-info py-2 px-3 small mb-2 text-start" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
                        ℹ️ <strong>Profile Photo:</strong> You can upload your profile photo once. Later changes can be made only with Admin approval.
                      </div>
                      <button 
                        className="btn btn-primary btn-sm rounded-pill w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <span>📷</span> Upload Profile Photo
                      </button>
                    </div>
                  )}

                  {/* CASE 2: Photo uploaded (No change request made yet) */}
                  {isPhotoLocked && requestStatus === 'none' && (
                    <div>
                      <div className="alert alert-secondary py-2 px-3 small mb-2 text-start" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
                        ℹ️ <strong>Profile Photo Set:</strong> Your profile photo is registered. If you need to update it, request approval from the Warden / Admin.
                      </div>
                      <button 
                        className="btn btn-outline-primary btn-sm rounded-pill w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        onClick={handleRequestChange}
                      >
                        <span>📩</span> Request Admin Approval to Change
                      </button>
                    </div>
                  )}

                  {/* CASE 3: Change Request Sent & Pending Review */}
                  {isPhotoLocked && requestStatus === 'pending' && (
                    <div>
                      <div className="alert alert-warning py-2 px-3 small mb-2 text-start" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
                        ⏳ <strong>Request Pending:</strong> Your photo change request is under review with the Hostel Warden.
                      </div>

                      {/* Admin Simulator Panel for testing */}
                      <div className="p-2 rounded-3 border bg-light text-center">
                        <small className="fw-bold text-dark d-block mb-1" style={{ fontSize: '11px' }}>
                          👨‍💼 Warden / Admin Actions (Simulator):
                        </small>
                        <div className="d-flex gap-2 justify-content-center mt-1">
                          <button 
                            className="btn btn-success btn-sm py-1 px-2 rounded-pill fw-semibold" 
                            style={{ fontSize: '11px' }}
                            onClick={() => handleAdminDecision('approve')}
                          >
                            ✓ Allow Change
                          </button>
                          <button 
                            className="btn btn-danger btn-sm py-1 px-2 rounded-pill fw-semibold" 
                            style={{ fontSize: '11px' }}
                            onClick={() => handleAdminDecision('reject')}
                          >
                            ✕ Deny Request
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CASE 4: Admin Approved Request -> Unlock Photo Change */}
                  {isPhotoLocked && requestStatus === 'approved' && (
                    <div>
                      <div className="alert alert-success py-2 px-3 small mb-2 text-start" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
                        🎉 <strong>Admin Approved!</strong> The Warden has granted permission. You can now choose a new photo.
                      </div>
                      <button 
                        className="btn btn-success btn-sm rounded-pill w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <span>📷</span> Update Profile Photo Now
                      </button>
                    </div>
                  )}

                  {/* CASE 5: Admin Denied Request */}
                  {isPhotoLocked && requestStatus === 'rejected' && (
                    <div>
                      <div className="alert alert-danger py-2 px-3 small mb-2 text-start" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
                        ❌ <strong>Request Denied:</strong> Admin declined your photo change request.
                      </div>
                      <button 
                        className="btn btn-outline-secondary btn-sm rounded-pill w-100 fw-semibold"
                        style={{ fontSize: '11.5px' }}
                        onClick={handleRequestChange}
                      >
                        🔄 Send Request Again
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-top pt-2 small text-muted" style={{ fontSize: '12px' }}>
                  <div><strong>Course:</strong> B.Tech Computer Science</div>
                  <div><strong>Year:</strong> 3rd Year (Semester 5)</div>
                  <div><strong>Phone:</strong> +91 98765 43210</div>
                  <div><strong>Email:</strong> rahul.sharma@hostel.edu</div>
                </div>

                {/* Reset Demo Option */}
                <div className="text-center mt-2 border-top pt-2">
                  <button 
                    className="btn btn-link text-muted p-0" 
                    style={{ fontSize: '11px', textDecoration: 'none' }}
                    onClick={handleResetDemo}
                  >
                    🔄 Reset Profile Photo (Demo Test)
                  </button>
                </div>

              </div>
            )}
          </div>
        </header>

        {/* TAB 1: MAIN DASHBOARD VIEW (From Image) */}
        {activeTab === 'dashboard' && (
          <>
            {/* 4 Stats Cards */}
            <section className="stats-grid">
              
              {/* Card 1: My Room */}
              <div className="stat-card" onClick={() => setActiveTab('details')} style={{ cursor: 'pointer' }}>
                <div className="stat-icon-wrapper blue">
                  🛏️
                </div>
                <div className="stat-label">My Room</div>
                <div className="stat-value">B-204</div>
                <div className="stat-subtext">Block B • 2nd Floor</div>
              </div>

              {/* Card 2: Mess Bill */}
              <div className="stat-card" onClick={() => setActiveTab('payments')} style={{ cursor: 'pointer' }}>
                <div className="stat-icon-wrapper green">
                  🍽️
                </div>
                <div className="stat-label">Mess Bill</div>
                <div className="stat-value">₹ 2,800</div>
                <div className="stat-subtext">
                  <span>Current Due</span>
                  <span className="pending-badge">Pending</span>
                </div>
              </div>

              {/* Card 3: Complaints */}
              <div className="stat-card" onClick={() => setActiveTab('complaints')} style={{ cursor: 'pointer' }}>
                <div className="stat-icon-wrapper purple">
                  ⚠️
                </div>
                <div className="stat-label">Complaints</div>
                <div className="stat-value">1</div>
                <div className="stat-subtext">
                  <span>Active ticket</span>
                  <span className="view-link">View</span>
                </div>
              </div>

              {/* Card 4: Attendance */}
              <div className="stat-card" onClick={() => setActiveTab('attendance')} style={{ cursor: 'pointer' }}>
                <div className="stat-icon-wrapper yellow">
                  📅
                </div>
                <div className="stat-label">Attendance</div>
                <div className="stat-value">18 / 22</div>
                <div className="stat-subtext">
                  <span>Current Month</span>
                  <span className="view-link yellow-link">View</span>
                </div>
              </div>

            </section>

            {/* Middle Hero Banner */}
            <section className="hero-banner">
              <div className="banner-text">
                <h3>Better Hostel, Better Tomorrow</h3>
                <p>Your comfort is our priority</p>
              </div>
              <div className="banner-illustration">
                🏫🌳
              </div>
            </section>

            {/* Quick Actions Grid */}
            <section>
              <h4 className="section-title">Quick Actions</h4>
              <div className="quick-actions-grid">
                
                <div className="action-card" onClick={() => setActiveTab('allocation')}>
                  <div className="action-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                    🛏️
                  </div>
                  <span>Apply for Room</span>
                </div>

                <div className="action-card" onClick={() => setActiveTab('payments')}>
                  <div className="action-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                    🍽️
                  </div>
                  <span>View Mess Bill</span>
                </div>

                <div className="action-card" onClick={() => setActiveTab('complaints')}>
                  <div className="action-icon" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                    ⚠️
                  </div>
                  <span>Raise Complaint</span>
                </div>

                <div className="action-card" onClick={() => setActiveTab('payments')}>
                  <div className="action-icon" style={{ backgroundColor: '#f0f9ff', color: '#0284c7' }}>
                    💳
                  </div>
                  <span>Make Payment</span>
                </div>

              </div>
            </section>
          </>
        )}

        {/* TAB 2: ROOM ALLOCATION */}
        {activeTab === 'allocation' && <RoomAllocation onBack={() => setActiveTab('dashboard')} />}

        {/* TAB 3: ROOM DETAILS */}
        {activeTab === 'details' && <RoomDetails onBack={() => setActiveTab('dashboard')} />}

        {/* TAB 4: COMPLAINTS */}
        {activeTab === 'complaints' && <Complaints onBack={() => setActiveTab('dashboard')} />}

        {/* TAB 5: PAYMENTS */}
        {activeTab === 'payments' && <Payments onBack={() => setActiveTab('dashboard')} />}

        {/* TAB 6: ATTENDANCE */}
        {activeTab === 'attendance' && <Attendance onBack={() => setActiveTab('dashboard')} />}

      </main>

    </div>
  );
};

export default Dashboard;
