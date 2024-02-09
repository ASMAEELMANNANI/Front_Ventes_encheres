import React from "react";
import "./header.css";

const DropdownMenu = ({ handleSignOut , isOpen}) => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <button>
            <i className="fa fa-user"></i> Profile
          </button>
        </li>
        <li>
          <button>
            <i className="fa fa-book"></i> Mes annonces
          </button>
        </li>
        <li>
          <button onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i> Déconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;