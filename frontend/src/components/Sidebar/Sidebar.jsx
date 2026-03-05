import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-icon">📝</span>
          <span className="nav-text">Register Youth</span>
        </NavLink>

        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-icon">🛡️</span>
          <span className="nav-text">Admin Panel</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2026 ActivityTracker</p>
      </div>
    </aside>
  );
};

export default Sidebar;