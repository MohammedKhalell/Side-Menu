import React, { useState, useEffect } from "react";
import SideMenu from "./sidemenu";
import TopBar from "./TopBar";
import { menuData } from "./menuData";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  const handleBackdropClick = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileMenuOpen(false);
      setOpenSubmenuId(null); // Close submenu when backdrop is clicked
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideMenu = () => {
    if (isMobileView) {
      if (openSubmenuId) {
        setOpenSubmenuId(null); // Close submenu first
      }
      setIsMobileMenuOpen(!isMobileMenuOpen);
      setIsCollapsed(false); // Always expand menu on mobile when opening
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };
  return (
    <div className="main-layout">
      <div className="content-wrapper">
        <div
          className={`side-menu-container ${isMobileMenuOpen ? "open" : ""}`}
        >
          <SideMenu
            menuItems={menuData}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            openSubmenuId={openSubmenuId}
            setOpenSubmenuId={setOpenSubmenuId}
          />
        </div>
        <div className="main-content">
          <TopBar
            toggleSideMenu={toggleSideMenu}
            isCollapsed={isCollapsed}
            isMobileView={isMobileView}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <div className="page-content">{children}</div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="backdrop" onClick={handleBackdropClick} />
      )}
    </div>
  );
};

export default MainLayout;
