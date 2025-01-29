import React from 'react';
import { Bell, Globe, User } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="left">
        <h2>Knowledge Base</h2>
      </div>
      <div className="right">
        <button className="top-bar-btn">
          <Globe size={20} />
          <span>English</span>
        </button>
        <button className="top-bar-btn">
          <Bell size={20} />
          <span>Notification</span>
        </button>
        <button className="top-bar-btn user">
          <User size={20} />
          <span>User Names</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;