import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Memoize the active state calculation
  const activeStates = useMemo(() => ({
    home: location.pathname === '/home',
    about: location.pathname === '/about',
    contact: location.pathname === '/contact',
    settings: location.pathname === '/settings'
  }), [location.pathname]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={handleOverlayClick}
      />
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h3>🌤️ WeatherApp</h3>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/home" className={`sidebar-link ${activeStates.home ? 'active' : ''}`} onClick={onClose}>
            <span className="sidebar-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/about" className={`sidebar-link ${activeStates.about ? 'active' : ''}`} onClick={onClose}>
            <span className="sidebar-icon">ℹ️</span>
            <span>About</span>
          </Link>
          <Link to="/contact" className={`sidebar-link ${activeStates.contact ? 'active' : ''}`} onClick={onClose}>
            <span className="sidebar-icon">📧</span>
            <span>Contact</span>
          </Link>
          <Link to="/settings" className={`sidebar-link ${activeStates.settings ? 'active' : ''}`} onClick={onClose}>
            <span className="sidebar-icon">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <p>© 2024 WeatherApp</p>
        </div>
      </div>
    </>
  );
};

export default React.memo(Sidebar); 