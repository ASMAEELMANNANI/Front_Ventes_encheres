import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"
import SignIn from "../../Auth/SignIn"; 
import Registration from "../../Auth/Registration"; 

import "../../Auth/modal.css"; 


const Header = () => {
  const [navList, setNavList] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false); // Ajoutez un état pour gérer le modal de SignUp

  

  const openSignInModal = () => {
    setSignInModalOpen(true);
    setSignUpModalOpen(false); 
  };
  const closeSignInModal = () => setSignInModalOpen(false);

  
  const closeSignUpModal = () => setSignUpModalOpen(false);

 
  
  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/logo3.jpg' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            {/*<h4>*/}
            {/*  <span>2</span> My List*/}
            {/*</h4>*/}
            <button className='btn1' onClick={openSignInModal}
         
            >
              <i className='fa fa-sign-out'></i> Sign In 
            </button>
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
      <SignIn isOpen={signInModalOpen} onRequestClose={closeSignInModal}/>
      <Registration isOpen={signUpModalOpen} onRequestClose={closeSignUpModal} /> 

    </>
  )
}

export default Header
