import React, { useState } from 'react';
import SideMenu from './sidemenu';
import TopBar from './TopBar';
import { menuData } from './menuData';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideMenu = () => {
    console.log("Toggling side menu. Current state:", isCollapsed); // Debugging
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="main-layout">
      <SideMenu menuItems={menuData} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="main-content">
        <TopBar toggleSideMenu={toggleSideMenu} isCollapsed={isCollapsed} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;