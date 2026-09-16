import React, { useState } from 'react'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  // Direct Dashboard open karne ke liye default true kiya hai
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <>
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </>
  )
}

export default App