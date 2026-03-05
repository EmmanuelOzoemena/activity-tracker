import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiUserPlus, FiShield, FiLogOut } from 'react-icons/fi'; // Professional Icons
import { toast } from 'react-toastify';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('youthId');
    localStorage.removeItem('role');
    
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {/* Dashboard - Visible to everyone */}
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FiGrid className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </NavLink>

        {/* Register - Usually visible to everyone or just Admin depending on your flow */}
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FiUserPlus className="nav-icon" />
          <span className="nav-text">Register Youth</span>
        </NavLink>

        {/* Admin Panel - ONLY visible if user is an admin */}
        {userRole === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <FiShield className="nav-icon" />
            <span className="nav-text">Admin Panel</span>
          </NavLink>
        )}
      </nav>
      
      <div className="sidebar-footer">
        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut className="nav-icon" />
          <span className="nav-text">Logout</span>
        </button>
        
        <p className="copyright">© 2026 ActivityTracker</p>
      </div>
    </aside>
  );
};

export default Sidebar;