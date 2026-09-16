import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomDetails.css';

const RoomDetails = ({ onBack }) => {
  const navigate = useNavigate();
  const roommates = [
    { name: 'Aditya Singh', branch: 'Computer Science (3rd Year)', bed: 'Bed 2 (Door side)', phone: '+91 9876543210', email: 'aditya.cs@college.edu' },
    { name: 'Vikram Rao', branch: 'Information Tech (3rd Year)', bed: 'Bed 3 (Balcony side)', phone: '+91 9876543211', email: 'vikram.it@college.edu' },
  ];

  const inventory = [
    { item: 'Study Table & Chair', count: '3 Sets', status: 'Good' },
    { item: 'Wardrobe & Keys', count: '3 Units', status: 'Allocated' },
    { item: 'Ceiling Fan', count: '2 Fans', status: 'Working' },
    { item: 'Wi-Fi Router', count: '1 Unit', status: 'Active (5G)' },
    { item: 'Air Conditioner', count: '1 Split AC', status: 'Active' },
  ];

  return (
    <div className="room-details-card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold text-dark mb-1">📄 My Room & Roommate Details</h3>
          <p className="text-muted small mb-0">View your current room allocation, roommates and room inventory</p>
        </div>
        <button 
          className="btn btn-outline-primary btn-sm rounded-pill px-3" 
          onClick={() => onBack ? onBack() : navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Room Card */}
      <div className="room-hero-banner mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <span className="badge bg-white text-primary mb-2">Active Allotment</span>
            <h2 className="fw-bold mb-1">Room B-204</h2>
            <p className="mb-2 opacity-75">Wing B • 2nd Floor • 3-Bed Sharing (AC)</p>
            <div className="d-flex gap-3 small">
              <span>🛏️ <strong>Your Bed:</strong> Bed 1 (Window side)</span>
              <span>📅 <strong>Allotted on:</strong> 1st August 2026</span>
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <div className="bg-white bg-opacity-25 rounded-3 p-3 text-center d-inline-block">
              <span className="d-block small">Floor Warden</span>
              <strong className="d-block">Mr. Rajesh Kumar</strong>
              <small>📞 +91 9876543200</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Roommates List */}
        <div className="col-12 col-lg-6">
          <h5 className="fw-bold text-dark mb-3">👥 My Roommates</h5>
          <div className="d-flex flex-column gap-3">
            {roommates.map((rm, idx) => (
              <div key={idx} className="roommate-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">{rm.name}</h6>
                    <small className="text-muted">{rm.branch}</small>
                  </div>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">{rm.bed}</span>
                </div>
                <div className="small text-secondary mt-1">
                  <div>📞 {rm.phone}</div>
                  <div>✉️ {rm.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Inventory Checklist */}
        <div className="col-12 col-lg-6">
          <h5 className="fw-bold text-dark mb-3">📋 Room Inventory & Amenities</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((inv, idx) => (
                  <tr key={idx}>
                    <td className="fw-semibold">{inv.item}</td>
                    <td>{inv.count}</td>
                    <td><span className="badge bg-success-subtle text-success">{inv.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mess Bill Summary Card - As per PDF Requirement */}
      <div className="mt-4 p-3 rounded-4 border bg-light d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 bg-white rounded-3 shadow-sm text-primary fs-4">
            🍽️
          </div>
          <div>
            <h6 className="fw-bold text-dark mb-0">Mess Bill Summary</h6>
            <small className="text-muted">Current Month (September 2026): <strong>₹ 2,800</strong> (20 Days Attended @ ₹140/day)</small>
          </div>
        </div>
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Payment Pending</span>
      </div>
    </div>
  );
};

export default RoomDetails;
