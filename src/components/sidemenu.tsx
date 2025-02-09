import React, { useState, useRef, useEffect } from "react";
import MenuItem from "./menuItem";
import { MenuItem as MenuItemType } from "./menuData";

interface SubMenuItem {
  id: string;
  label: string;
  to: string;
}

interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  subItems?: SubMenuItem[];
  disabled?: boolean;
}

interface SideMenuProps {
  menuItems: MenuItemType[];
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  openSubmenuId: string | null;
  setOpenSubmenuId: React.Dispatch<React.SetStateAction<string | null>>;
}

const SideMenu: React.FC<SideMenuProps> = ({
  menuItems,
  isCollapsed,
  setIsCollapsed,
  openSubmenuId,
  setOpenSubmenuId,
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSubMenuTransition = (newMenuId: string) => {
    if (openSubmenuId === newMenuId) {
      handleCloseSubMenu();
      return;
    }

    handleSubMenuOpen(newMenuId);
  };

  const handleMenuClick = (menuId: string) => {
    const menuItem = menuItems.find((item) => item.id === menuId);

    if (menuItem?.disabled) {
      return;
    }

    setActiveMenu(menuId);

    if (menuItem?.subItems) {
      handleSubMenuTransition(menuId);
    } else {
      handleCloseSubMenu();
    }
  };

  const handleCloseSubMenu = () => {
    if (openSubmenuId) {
      setIsClosing(true);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setOpenSubmenuId(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const handleBackClick = () => {
    handleCloseSubMenu();
    setIsCollapsed(false);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMenuItem = menuItems.find((item) => item.id === openSubmenuId);

  const handleSubMenuOpen = (menuId: string) => {
    setOpenSubmenuId(menuId);
    setIsCollapsed(true);
  };

  return (
    <div className="side-menu-content">
      <div className={`side-menu ${isCollapsed ? "collapsed" : ""} ${openSubmenuId ? 'submenu-open' : ''}`}>
        {/* Header */}
        <div className="menu-header">
          <div className="logo-container">
            <div className="logo">
              <img
                src={"/icons/Logo-Icon.svg"}
                alt={`icon`}
                width={39.78}
                height={42.09}
                className="logo"
              />
            </div>
            {!isCollapsed && (
              <img
                src={"/icons/Arena-logo-type.svg"}
                alt={`icon`}
                width={99.97}
                height={41.93}
              />
            )}
          </div>
        </div>

        {/* Search */}
        <div className="search-container">
          <div className={`search-bar side-menu-search`}>
            <img
              src={`/icons/side-menu-search.svg`}
              alt={`icon`}
              className="search-icon-button"
            />
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="shortcut">
              <img src={"/icons/Cmd.svg"} alt={`icon`} width={52} height={23} />
            </div>
          </div>
        </div>

        {/* Menu Title */}
        {!isCollapsed && <div className="menu-title">Main Menu</div>}

        {/* Menu Items */}
        <div className="menu-items">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              activeMenu={activeMenu}
              isCollapsed={isCollapsed}
              onClick={handleMenuClick}
            />
          ))}
        </div>
      </div>

      {/* Sub Menu Panel */}
      {openSubmenuId && activeMenuItem?.subItems && (
        <div className={`sub-menu-panel ${isClosing ? "closing" : ""}`}>
          <div className="sub-menu-header">
            <button
              className="back-button"
              onClick={handleBackClick}
            >
              {"<"}
              <span>Back to Main Menu</span>
            </button>
            <div className="sub-menu-title">
              <img
                src={activeMenuItem.iconName || "/placeholder.svg"}
                alt={`${activeMenuItem.label} icon`}
                width={24}
                height={24}
                className={activeMenu === activeMenuItem.id ? "text-primary" : "text-secondary"}
              />
              <span>{activeMenuItem.label}</span>
            </div>
          </div>
          <div className="sub-menu-items">
            {activeMenuItem.subItems.map((subItem) => (
              <button key={subItem.id} className="sub-menu-item" onClick={() => {}}>
                <span>{subItem.label}</span>
                <span className="sub-menu-arrow"></span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;