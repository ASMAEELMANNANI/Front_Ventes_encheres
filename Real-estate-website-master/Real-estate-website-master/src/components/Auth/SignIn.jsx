// SignIn.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import img from '../images/login.jpg';
import Registration from './Registration';
import {useHistory} from "react-router-dom";


const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    width: '90%',
    maxHeight: '110%',
    overflow: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    padding: '15px',
    

  },
};

const SignIn = ({isOpen, onRequestClose}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSignInOpen, setIsSignInOpen] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  

  const openRegistrationModal = () => {
    setIsSignInOpen(false);
    setIsRegistrationOpen(true);
  };

  const closeModals = () => {
    setIsSignInOpen(false);
    setIsRegistrationOpen(false);
  };

  const history = useHistory();

  //fonction de login
  const sendAuthenticationData = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8088/api/clients/login', {//bdloha b li f backend dialna
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Type de contenu JSON
        },
        body: JSON.stringify(
            {
                  "login": email,
                  "password": password
            }), // Envoi des données au format JSON
      });
  
      /*if (!response.ok) {
        throw new Error('Erreur lors de l\'authentification');
      }
      const result=await response.text();
      switch (result) {
        case "1":
          // Login success for client
          localStorage.setItem("isLoggedIn", "true");
          onRequestClose();
          history.push('/annonces');
          break;
        case "2":
          // Login success for admin
          localStorage.setItem("isLoggedIn", "true");
          onRequestClose();
          history.push('/valider');
          break;

        case "-1":
          window.alert("Login n'existe pas")
          break;

        default:
          // Handle unexpected response
          window.alert("Mot de passe est incorrecte")

          break;
      }
       */

      if(response.ok)
      {
        const result = await response.json();
         // Vérifier si le rôle est "admin"
        if (result.role === "admin") {
          // Si le rôle est "admin", redirigez vers '/annonces'
          console.log(result.id);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", result.id);
          onRequestClose();
          history.push(`/valider?id=${result.id}`);
        } else {
          // Si le rôle n'est pas "admin", redirigez vers '/valider'
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", result.id);
          onRequestClose();
          history.push(`/annonces?id=${result.id}`);
        }

      }else{
        window.alert("Email ou Mot de passe est incorrecte")
      }

      // window.location.href = '/annonces';  //aller vers page des annonces

    } catch (error) {
      // window.alert("Mot de passe est incorrecte")
      throw new Error(error.message); // Gèrer les erreurs d'authentification
    }
  };
  
  const handleSignIn = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Adresse e-mail non valide');
      valid = false;//validation de l'email
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Veuillez entrer votre mot de passe');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const authData = await sendAuthenticationData(email, password);
      onRequestClose();
    }
    
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Adresse e-mail non valide');
    } else {
      setEmailError('');
    }
  };

   // pour vider les champs apres fermeture de modal
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isSignInOpen && isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal de Connexion"
        style={customStyles}
      >
       
        <div>
          <h2 style={customStyles.heading}>Sign In</h2>
          <img src={img} alt="Description de l'image" />
          <form>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: 'red' ,fontSize:12}}>{emailError}</p>}

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: 'red' ,fontSize:12}}>{passwordError}</p>}

          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
          <p style={{ textAlign: 'center', fontSize: 12, paddingTop: '15px' }}>
            Vous n'avez pas de compte ? <a style={{color:'#4caf50',fontWeight:'bold'}}  onClick={openRegistrationModal}>Sign Up</a>
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isRegistrationOpen && isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal d'Inscription"
        style={customStyles}
      >
       
        <Registration isOpen={isRegistrationOpen} onRequestClose={closeModals} />
      </Modal>
    </>
  );
};

export default SignIn;
