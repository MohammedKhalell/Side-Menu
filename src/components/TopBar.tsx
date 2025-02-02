import React from 'react';

interface TopBarProps {
  toggleSideMenu: () => void;
  isCollapsed: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSideMenu, isCollapsed }) => {
  return (
    <div className="top-bar">
      <div className="left">
        <button className="toggle-btn" onClick={toggleSideMenu}>
        {isCollapsed ?  <img
                src={"/icons/sidebar-right.svg"}
                alt={`icon`}
                width={28}
                height={28}
              /> :  <img
              src={"/icons/sidebar-left.svg"}
              alt={`icon`}
              width={28}
              height={28}
            /> }
       
        </button>
        <h2>Knowledge Base</h2>
      </div>
      <div className="right">
        
      <button className="top-bar-btn">
      <img
                src={"/icons/home.svg"}
                alt={`icon`}
                width={24}
                height={24}
              />          <span>Home</span>
        </button>
        <button className="top-bar-btn">
        <img
                src={"/icons/Notification.svg"}
                alt={`icon`}
                width={24}
                height={24}
              />
                        <span>Notification</span>
        </button>
        <button className="top-bar-btn">
        <img
                src={"/icons/English.svg"}
                alt={`icon`}
                width={24}
                height={24}
              />          <span>English</span>
        </button>
        <button className="top-bar-btn ">
        <img
                src={"/icons/Profile.svg"}
                alt={`icon`}
                width={24}
                height={24}
                className="top-bar-btn user"
              />            <span>User Names</span>
              <i className="arrow-down"></i>
        </button>
      </div>
    </div>
  );
};

export default TopBar;