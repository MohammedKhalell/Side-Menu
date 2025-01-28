import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icons";
import MenuItem from './menuItem';
import { MenuItem as MenuItemType } from './menuData';
// Types
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
}
// Menu Items Data


const SideMenu: React.FC<SideMenuProps> = ({ menuItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [, setPrevSubMenu] = useState<string | null>(null);
  const [, setIsSubMenuTransitioning] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSubMenuTransition = (newMenuId: string) => {
    // If clicking the same menu, close it
    if (openSubMenu === newMenuId) {
      handleCloseSubMenu();
      return;
    }

    setIsSubMenuTransitioning(true);
    setPrevSubMenu(openSubMenu);

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Set new submenu after a brief delay for animation
    transitionTimeoutRef.current = setTimeout(() => {
      setOpenSubMenu(newMenuId);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsSubMenuTransitioning(false);
        setPrevSubMenu(null);
      }, 300); // Match with CSS transition duration
    }, 150);
  };

  const handleMenuClick = (menuId: string) => {
    const menuItem = menuItems.find((item) => item.id === menuId);

    if (menuItem?.disabled) {
      return;
    }

    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => {
        setActiveMenu(menuId);
        if (menuItem?.subItems) {
          handleSubMenuTransition(menuId);
        } else {
          // *** NEW: Close submenu if clicking non-submenu item
          handleCloseSubMenu();
        }
      }, 150);
      return;
    }

    setActiveMenu(menuId);

    if (menuItem?.subItems) {
      handleSubMenuTransition(menuId);
    } else {
      // *** NEW: Close submenu if clicking non-submenu item
      handleCloseSubMenu();
    }
  };

  const handleCloseSubMenu = () => {
    if (openSubMenu) {
      setIsClosing(true);

      // Cleanup existing timeout if any
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Set timeout for animation duration
      transitionTimeoutRef.current = setTimeout(() => {
        setOpenSubMenu(null);
        setIsClosing(false);
      }, 300); // Match this with CSS transition duration
    }
  };

  const handleSearchClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
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

  const activeMenuItem = menuItems.find((item) => item.id === openSubMenu);

  return (
    <div className="side-menu-container">
      <div className={`side-menu ${isCollapsed ? 'collapsed' : ''} ${openSubMenu ? 'has-open-submenu' : ''}`}>
      {/* Header */}
        <div className="menu-header">
          <div className="logo-container">
            <div className="logo">
              <Icon name={"arena"} width={39.78} height={42.09} />
            </div>
            {!isCollapsed && (
              <Icon name={"arena-title"} width={99.97} height={41.93} />
            )}
          </div>
          <button
            className="collapse-button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className={`arrow ${isCollapsed ? "right" : "left"}`}></span>
          </button>
        </div>

        {/* Search */}
        <div className="search-container">
          <div className={`search-bar ${isCollapsed ? "collapsed" : ""}`}>
            <button className="search-icon-button" onClick={handleSearchClick}>
              <Icon name="search" className="text-primary" />
            </button>
            {!isCollapsed && (
              <>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <div className="shortcut">
                  <Icon
                    name="shortcut"
                    width={23}
                    height={23}
                    className="shortcut-icon"
                  />
                  <Icon
                    name="k"
                    width={23}
                    height={23}
                    className="shortcut-icon"
                  />
                </div>
              </>
            )}
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
      {openSubMenu && activeMenuItem?.subItems && !isCollapsed && (
        <div className={`sub-menu-panel ${isClosing ? "closing" : ""}`}>
          <div className="sub-menu-header">
            <div className="sub-menu-title">
              <Icon
                name={activeMenuItem.iconName}
                className={activeMenu === activeMenuItem.id ? "active" : ""}
              />
              <span>{activeMenuItem.label}</span>
            </div>
          </div>
          <div className="sub-menu-items">
            {activeMenuItem.subItems.map((subItem) => (
              <button
                key={subItem.id}
                className="sub-menu-item"
                onClick={() => {
                }}
              >
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
