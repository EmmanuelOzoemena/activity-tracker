import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">ActivityTracker</span>
        </Link>
      </div>

      <div className="header-right">
        <Link to="/admin" className="admin-link">
          <span className="admin-icon">⚙️</span>
          Admin Panel
        </Link>
      </div>
    </header>
  );
};

export default Header;