import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Complaints.css';

const Complaints = ({ onBack }) => {
  const navigate = useNavigate();
  const [complaintsList, setComplaintsList] = useState([
    { id: 'HM-1092', category: 'Electricity', title: 'Study lamp socket sparking', date: '14 Sep 2026', status: 'In Progress', priority: 'High', adminComment: 'Electrician assigned, will visit by tomorrow morning' },
    { id: 'HM-1045', category: 'Plumbing', title: 'Washroom tap leakage', date: '02 Sep 2026', status: 'Resolved', priority: 'Medium', adminComment: 'Replaced tap washer on 03 Sep' },
  ]);

  const [formData, setFormData] = useState({
    category: '',
    urgency: 'Medium',
    title: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: 'HM-' + Math.floor(1000 + Math.random() * 9000),
      category: formData.category,
      title: formData.title,
      date: 'Today',
      status: 'Pending',
      priority: formData.urgency,
      adminComment: 'Ticket submitted, awaiting warden review',
    };
    setComplaintsList([newTicket, ...complaintsList]);
    setFormData({ category: '', urgency: 'Medium', title: '', description: '' });
    alert('Complaint Ticket Registered Successfully!');
  };

  return (
    <div className="complaints-card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold text-dark mb-1">⚠️ Hostel Complaint Box</h3>
          <p className="text-muted small mb-0">Submit maintenance issues and track resolution status in real-time</p>
        </div>
        <button 
          className="btn btn-outline-primary btn-sm rounded-pill px-3" 
          onClick={() => onBack ? onBack() : navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="row g-4">
        {/* Left: Raise New Complaint Form */}
        <div className="col-12 col-lg-5">
          <div className="card border rounded-4 p-3 bg-light shadow-none">
            <h5 className="fw-bold text-dark mb-3">📝 Register New Issue</h5>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="form-label small fw-semibold">Category</label>
                <select 
                  className="form-select" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electricity">Electricity / Light / Fan</option>
                  <option value="Plumbing">Plumbing / Water / Tap</option>
                  <option value="Mess Food">Mess Food Quality</option>
                  <option value="Cleaning">Room / Floor Cleaning</option>
                  <option value="WiFi">Wi-Fi / Internet</option>
                  <option value="Carpentry">Bed / Door / Lock</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Urgency Level</label>
                <div className="d-flex gap-3">
                  {['Low', 'Medium', 'High'].map((lvl) => (
                    <div key={lvl} className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="urgency" 
                        id={lvl} 
                        checked={formData.urgency === lvl} 
                        onChange={() => setFormData({...formData, urgency: lvl})} 
                      />
                      <label className="form-check-label small" htmlFor={lvl}>{lvl}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Short Issue Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Bathroom light flickering" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Detailed Description</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Provide details about the issue..." 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  required
                ></textarea>
              </div>

              {/* Photo Upload (Optional) - As per PDF Requirement */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Attach Photo <span className="text-muted fw-normal">(Optional - JPG/PNG)</span>
                </label>
                <input 
                  type="file" 
                  className="form-control form-control-sm" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData({ ...formData, photo: file ? file.name : null });
                  }} 
                />
                {formData.photo && (
                  <small className="text-success d-block mt-1">
                    📎 Attached: {formData.photo}
                  </small>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold rounded-3 py-2">
                Submit Complaint
              </button>
            </form>
          </div>
        </div>

        {/* Right: Track Existing Complaints */}
        <div className="col-12 col-lg-7">
          <h5 className="fw-bold text-dark mb-3">📋 Track My Complaints ({complaintsList.length})</h5>
          <div className="d-flex flex-column gap-3">
            {complaintsList.map((comp) => (
              <div key={comp.id} className="ticket-item">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-secondary-subtle text-dark">Ticket #{comp.id}</span>
                  <span className={comp.status === 'Resolved' ? 'badge bg-success' : comp.status === 'In Progress' ? 'badge bg-warning text-dark' : 'badge bg-secondary'}>
                    {comp.status}
                  </span>
                </div>
                <h6 className="fw-bold text-dark mb-1">{comp.title}</h6>
                <div className="small text-muted mb-2">Category: {comp.category} • Date: {comp.date} • Priority: <strong>{comp.priority}</strong></div>
                {comp.adminComment && (
                  <div className="bg-light p-2 rounded small text-secondary border">
                    💬 <strong>Admin Update:</strong> {comp.adminComment}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
