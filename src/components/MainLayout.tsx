// MainLayout.tsx
import React from 'react';
import SideMenu from './sidemenu';
import TopBar from './TopBar';
import { menuData } from './menuData';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main-layout">
    <SideMenu menuItems={menuData} />
    <div className="main-content">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
