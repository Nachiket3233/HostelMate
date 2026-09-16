import React from 'react';
import './Attendance.css';

const Attendance = ({ onBack }) => {
  const logs = [
    { date: '16 Sep 2026', inTime: '08:15 PM', outTime: '04:30 PM', status: 'Present' },
    { date: '15 Sep 2026', inTime: '09:10 PM', outTime: '05:00 PM', status: 'Present' },
    { date: '14 Sep 2026', inTime: '08:45 PM', outTime: '03:15 PM', status: 'Present' },
    { date: '13 Sep 2026', inTime: '10:05 PM', outTime: '06:00 PM', status: 'Late Check-in' },
    { date: '12 Sep 2026', inTime: '--', outTime: '--', status: 'Night Leave Approved' },
  ];

  return (
    <div className="attendance-card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold text-dark mb-1">📅 Attendance & Digital QR Pass</h3>
          <p className="text-muted small mb-0">Track daily biometric / QR gate entries and check-in records</p>
        </div>
        {onBack && (
          <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={onBack}>
            ← Back to Dashboard
          </button>
        )}
      </div>

      <div className="row g-4 mb-4">
        {/* Attendance Stats */}
        <div className="col-12 col-md-7">
          <div className="card border rounded-4 p-4 bg-light shadow-none h-100">
            <h5 className="fw-bold text-dark mb-2">Monthly Summary (September 2026)</h5>
            <div className="d-flex align-items-center gap-4 my-3">
              <div>
                <h1 className="fw-bold text-primary mb-0">81.8%</h1>
                <small className="text-muted">Attendance Rate</small>
              </div>
              <div className="border-start ps-4">
                <div>Total Days: <strong>22 Days</strong></div>
                <div>Present: <strong className="text-success">18 Days</strong></div>
                <div>Late / Leaves: <strong className="text-warning">4 Days</strong></div>
              </div>
            </div>
            <div className="alert alert-success py-2 px-3 small mb-0 rounded-3">
              ✓ <strong>Today's Status:</strong> Checked In at 08:15 PM (In Time)
            </div>
          </div>
        </div>

        {/* Digital QR Gate Pass Card */}
        <div className="col-12 col-md-5">
          <div className="card border rounded-4 p-3 text-center bg-white shadow-sm h-100">
            <h6 className="fw-bold text-dark mb-1">📱 Daily In/Out QR Pass</h6>
            <small className="text-muted mb-2 d-block">Show this QR to the security guard</small>
            <div className="d-inline-flex justify-content-center align-items-center p-3 border rounded-3 bg-light mx-auto my-2" style={{ width: '130px', height: '130px' }}>
              <span style={{ fontSize: '70px' }}>📲</span>
            </div>
            <strong className="text-primary small">Rahul Sharma • B-204</strong>
            <span className="badge bg-success-subtle text-success mt-1 mx-auto">Active Gate Pass</span>
          </div>
        </div>
      </div>

      {/* Daily Logs Table */}
      <h5 className="fw-bold text-dark mb-3">🕒 Daily In / Out Log</h5>
      <div className="table-responsive">
        <table className="table table-hover align-middle border">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Out Time (Exit)</th>
              <th>In Time (Entry)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td className="fw-semibold text-dark">{log.date}</td>
                <td className="text-muted">{log.outTime}</td>
                <td className="text-muted">{log.inTime}</td>
                <td>
                  <span className={log.status === 'Present' ? 'badge bg-success' : log.status === 'Late Check-in' ? 'badge bg-danger' : 'badge bg-warning text-dark'}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
