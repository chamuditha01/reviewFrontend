import React, { useState } from "react";
import { BsGrid1X2Fill, BsFillArchiveFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../../Assets/Images/logo.avif";
import imgdashboard from "../../Assets/Images/imgdash.png";
import "./index.css";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  openSidebarToggle,
  OpenSidebar,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time
  };

  return (
   
    <aside
      id="sidebar"
      style={{ background: "linear-gradient(135deg, #A6AEBF, #4A90E2)" }}
      className={`main-container light-mode1 ${
        openSidebarToggle ? "sidebar-responsive" : ""
      }`
    }
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <a href="/login">
            <img
              style={{ width: "50px", height: "50px", borderRadius: "40px" }}
              src={logo}
              className="icon_header"
            />
          </a>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/Dashboard" onClick={simulateLoading}
          style={{color:'black'}}>
            {isLoading ? (
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <BsGrid1X2Fill className="icon" color="black"/> Library
              </>
            )}
          </a>
        </li>
        
        
      </ul>
     
 
    </aside>
    
  );
};

export default Sidebar;
