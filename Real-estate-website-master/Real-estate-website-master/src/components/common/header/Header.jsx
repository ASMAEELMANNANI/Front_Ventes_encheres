import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import SignIn from "../../Auth/SignIn";
import Registration from "../../Auth/Registration";
import "../../Auth/modal.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import img from "../../images/ImageAv.jpg";
//import profile from "../../profile/profile.jsx"

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = localStorage.getItem("userId");
  const toggleNavList = () => {
    setNavList(!navList);
  };

  const openSignInModal = () => {
    setSignInModalOpen(true);
    setSignUpModalOpen(false);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  };

  const closeSignUpModal = () => setSignUpModalOpen(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("userId", 0);
    window.location.href = "http://localhost:3000/";
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo3.jpg" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
            {nav.filter(item => item !== null).map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {isLoggedIn ? (
              <div style={{ position: "relative" }}>
                <img
                  src={img}
                  alt="Profile"
                  style={{ borderRadius: "50%", width: "40px", height: "40px", border: "1px solid #ccc", cursor: "pointer" }}
                  onClick={handleClick}
                />
                <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0  }}>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  > 

                    <MenuItem onClick={handleClose}>Hidden </MenuItem>
                    <MenuItem onClick={handleClose}>Hidden</MenuItem>  
                    <MenuItem component={Link} to={`/profile?id=${userId}`} onClick={handleClose}><i className="fa fa-user"></i> Profile</MenuItem> {/* Utiliser Link pour la navigation */}
                    <MenuItem component={Link} to={`/mesAnnonces?id=${userId}`} onClick={handleClose}><i className="far fa-file-alt"></i>  Mes annonces</MenuItem>
                    <MenuItem onClick={handleSignOut}><i className="fa fa-sign-out"></i>  Déconnexion</MenuItem>
                  </Menu>
                </div>
              </div>
            ) : (
              <button className="btn1" onClick={openSignInModal}>
                <i className="fa fa-sign-in"></i> Sign In
              </button>
            )}
          </div>
          <div className="toggle">
            <button onClick={toggleNavList}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>
      <SignIn isOpen={signInModalOpen} onRequestClose={closeSignInModal} />
      <Registration isOpen={signUpModalOpen} onRequestClose={closeSignUpModal} />
    </>
  );
};

export default Header;
