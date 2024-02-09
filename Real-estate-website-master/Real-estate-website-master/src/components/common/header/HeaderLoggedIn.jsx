// HeaderLoggedIn.js
import React, { useState } from "react";
import "./header.css";

const HeaderLoggedIn = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Appel à la fonction de déconnexion passée en prop
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <header>
      <div className="container flex">
        <div className="logo">
          <img src="./images/logo3.jpg" alt="" />
        </div>
        <div className="button flex">
          <button className="user-menu-button" onClick={handleDropdownToggle}>
            <img src="./images/logo3.jpg" alt="Profile" />
          </button>
          {isDropdownOpen && (
            <div className="user-dropdown">
              <a href="/mes-annonces">Mes Annonces</a>
              <button onClick={handleLogout}>LogOut</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderLoggedIn;
