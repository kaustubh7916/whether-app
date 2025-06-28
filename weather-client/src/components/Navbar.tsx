import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle }) => {
  const location = useLocation();

  // Memoize the active state calculation
  const activeStates = useMemo(() => ({
    home: location.pathname === '/home',
    about: location.pathname === '/about',
    contact: location.pathname === '/contact'
  }), [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button 
          className="sidebar-toggle-btn" 
          onClick={onSidebarToggle}
          aria-label="Open sidebar menu"
        >
          <span className="sidebar-icon">☰</span>
        </button>

        <div className="navbar-menu">
          <Link 
            to="/home" 
            className={`navbar-link ${activeStates.home ? 'active' : ''}`}
          >
            <span className="link-text">Home</span>
            <span className="link-underline"></span>
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${activeStates.about ? 'active' : ''}`}
          >
            <span className="link-text">About</span>
            <span className="link-underline"></span>
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-link ${activeStates.contact ? 'active' : ''}`}
          >
            <span className="link-text">Contact</span>
            <span className="link-underline"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar); 