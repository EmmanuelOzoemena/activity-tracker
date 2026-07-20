import { FiSettings, FiMenu } from 'react-icons/fi'; // Add FiMenu
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar }) => { // Accept toggle function as prop
  return (
    <header className="main-header">
      <div className="header-left">
        {/* Toggle Button for Mobile/Tablet */}
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        
        <Link to="/" className="logo">
          <span className="logo-text">ActivityTracker</span>
        </Link>
      </div>

      <div className="header-right">
        <Link to="/admin" className="admin-link">
          <FiSettings className="admin-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;