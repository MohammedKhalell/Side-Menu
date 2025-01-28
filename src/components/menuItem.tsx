import React from 'react';
import { Icon, IconProps } from './Icons';
import { MenuItem as MenuItemType } from './menuData';

export interface MenuItemProps {
  item: MenuItemType;
  activeMenu: string;
  isCollapsed: boolean;
  onClick: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, activeMenu, isCollapsed, onClick }) => {
  return (
    <button
      key={item.id}
      className={`menu-item ${activeMenu === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
      onClick={() => onClick(item.id)}
      disabled={item.disabled}
    >
      <div className="item-content">
        <div className={`icon ${activeMenu === item.id ? 'active' : ''}`}>
          <Icon name={item.iconName} className={activeMenu === item.id ? 'text-primary' : 'text-secondary'} />
        </div>
        {!isCollapsed && (
          <span className="item-label">{item.label}</span>
        )}
      </div>
      {!isCollapsed && item.subItems && (
        <span className="sub-menu-arrow"></span>
      )}
    </button>
  );
};

export default MenuItem;
