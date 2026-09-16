import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Payments.css';

const Payments = ({ onBack }) => {
  const navigate = useNavigate();
  const paymentHistory = [
    { id: 'TXN-98214', description: 'Hostel Semester Fee (Sem 1)', amount: '₹ 15,000', date: '01 Aug 2026', status: 'Paid', receipt: 'receipt_aug_2026.pdf' },
    { id: 'TXN-98950', description: 'August Mess Bill', amount: '₹ 2,650', date: '05 Sep 2026', status: 'Paid', receipt: 'receipt_sep_2026.pdf' },
  ];

  return (
    <div className="payments-card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold text-dark mb-1">💳 Fee & Mess Payments</h3>
          <p className="text-muted small mb-0">Pay pending dues online and download official fee receipts in PDF</p>
        </div>
        <button 
          className="btn btn-outline-primary btn-sm rounded-pill px-3" 
          onClick={() => onBack ? onBack() : navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Due Summary Card */}
      <div className="payment-banner mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <span className="badge bg-white text-success mb-2">Current Month Bill</span>
            <h2 className="fw-bold mb-1">₹ 2,800</h2>
            <p className="mb-0 opacity-75">September Mess Bill • Due Date: 25th September 2026</p>
            <small className="opacity-75">Calculation: 20 Days Attended @ ₹140/day = ₹ 2,800</small>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button 
              className="btn btn-light fw-bold text-success px-4 py-2 rounded-3 shadow-sm"
              onClick={() => alert('Initiating secure online payment of ₹2,800...')}
            >
              Pay Now (UPI / Card)
            </button>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <h5 className="fw-bold text-dark mb-3">📜 Payment History & Receipts</h5>
      <div className="table-responsive">
        <table className="table table-hover align-middle border">
          <thead className="table-light">
            <tr>
              <th>Transaction ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((item) => (
              <tr key={item.id}>
                <td className="fw-semibold text-secondary">{item.id}</td>
                <td>{item.description}</td>
                <td className="text-muted small">{item.date}</td>
                <td className="fw-bold text-dark">{item.amount}</td>
                <td><span className="badge bg-success-subtle text-success">Paid</span></td>
                <td>
                  <button 
                    className="btn btn-outline-secondary btn-sm rounded-pill"
                    onClick={() => alert('Downloading official fee receipt: ' + item.receipt)}
                  >
                    📥 Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
