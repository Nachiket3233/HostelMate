import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // 🔴 Error message ke liye state
  const [errorMessage, setErrorMessage] = useState('');

  // Sahi Demo Credentials (testing ke liye):
  const VALID_USER = 'admin';
  const VALID_PASS = '123456';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Purana error reset karein

    // Dono me se koi bhi ek galat hua toh error aayega:
    if (username !== VALID_USER || password !== VALID_PASS) {
      setErrorMessage('Invalid User Name or Password.!!');
      return;
    }

    // Agar dono sahi hain:
    alert('✓ Login Successful! Welcome to HostelMate Dashboard.');
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    const dashElement = document.querySelector('.dashboard-layout');
    if (dashElement) {
      dashElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h2 className="login-title">HostelMate</h2>
          <p className="login-subtitle">Enter your login details</p>
          
          {/* 🔴 Red Error Message "Enter your login details" ke theek niche */}
          {errorMessage && (
            <div className="error-alert">
              ⚠️ {errorMessage}
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-input ${errorMessage ? 'input-error' : ''}`}
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage(''); // Type karte hi error hat jayega
              }}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errorMessage ? 'input-error' : ''}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(''); // Type karte hi error hat jayega
              }}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;


