
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, BarChart3, Settings, Calendar } from "lucide-react";

const BottomNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <Home className={`nav-icon ${isActive('/') ? 'active' : ''}`} />
        <span className={`nav-text ${isActive('/') ? 'active' : ''}`}>Home</span>
      </Link>
      
      <Link to="/calendar" className="nav-item">
        <Calendar className={`nav-icon ${isActive('/calendar') ? 'active' : ''}`} />
        <span className={`nav-text ${isActive('/calendar') ? 'active' : ''}`}>Calendar</span>
      </Link>
      
      <Link to="/add" className="nav-item">
        <div className="bg-taskease-purple rounded-full p-3 -mt-8 shadow-lg">
          <PlusCircle className="h-6 w-6 text-white" />
        </div>
      </Link>
      
      <Link to="/stats" className="nav-item">
        <BarChart3 className={`nav-icon ${isActive('/stats') ? 'active' : ''}`} />
        <span className={`nav-text ${isActive('/stats') ? 'active' : ''}`}>Stats</span>
      </Link>
      
      <Link to="/profile" className="nav-item">
        <Settings className={`nav-icon ${isActive('/profile') ? 'active' : ''}`} />
        <span className={`nav-text ${isActive('/profile') ? 'active' : ''}`}>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
