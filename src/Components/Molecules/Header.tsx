import React from "react";
import "./dt.css";
import { BsJustify } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  return (
    <header
      className={`header11` }
      style={{ backgroundColor: "#2f3438" }}
    >
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <div className="icon" />
      </div>

      <div className="header-right">
        <a href="/">
          <IoIosLogOut className="icon" size={25} color="white"/>
        </a>
      </div>
    </header>
  );
};

export default Header;
