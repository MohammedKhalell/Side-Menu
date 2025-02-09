import React from 'react';

interface TopBarProps {
  toggleSideMenu: () => void;
  isCollapsed: boolean;
  isMobileView: boolean;
  isMobileMenuOpen: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ 
  toggleSideMenu, 
  isCollapsed, 
  isMobileView,
  isMobileMenuOpen 
}) => {
  const getMenuIcon = () => {
    if (isMobileView) {
      return isMobileMenuOpen ? "/icons/sidebar-left.svg" : "/icons/sidebar-right.svg";
    }
    return isCollapsed ? "/icons/sidebar-right.svg" : "/icons/sidebar-left.svg";
  };

  return (
    <div className="top-bar">
      <div className="left">
        <button className="toggle-btn" onClick={toggleSideMenu}>
          <img
            src={getMenuIcon()}
            alt="toggle menu"
            width={28}
            height={28}
          />
        </button>
        <span>Knowledge Base</span>
      </div>
      <div className="right">
        <button className="top-bar-btn">
          <img
            src="/icons/home.svg"
            alt="home"
            width={24}
            height={24}
          />
          <span>Home</span>
        </button>
        <button className="top-bar-btn">
          <img
            src="/icons/Notification.svg"
            alt="notifications"
            width={24}
            height={24}
          />
          <span>Notification</span>
        </button>
        <button className="top-bar-btn">
          <img
            src="/icons/English.svg"
            alt="language"
            width={24}
            height={24}
          />
          <span>English</span>
        </button>
        <button className="top-bar-btn">
          <img
            src="/icons/Profile.svg"
            alt="profile"
            width={24}
            height={24}
            className="top-bar-btn user"
          />
          <span>User Names</span>
          <i className="arrow-down"></i>
        </button>
      </div>
    </div>
  );
};

export default TopBar;