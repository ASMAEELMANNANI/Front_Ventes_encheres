import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ModalSucces from "../annonce/ModalSucces";
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
    maxWidth: '600px',
    width: '40%',
    maxHeight: '950px',
    overflow: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    
  },
  heading: {
    textAlign: 'center',
    fontSize: '13px',
    marginTop: '66px',
  },

 
};

const Registration = ({ isOpen, onRequestClose }) => {
    const [login, setlogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [f_name,setNom]=useState('');
    const [l_name,setPrenom]=useState('');
    const [fieldErrors, setFieldErrors] = useState({});

  const history=useHistory();

  const handleSignUp = async (e) => {
      e.preventDefault();

      const errors = {};
      if (!login.trim()) {
        errors.login = 'login is required';
      } else if (!validatelogin(login)) {
        errors.login = 'Invalid login format';
      }
      if (!phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhone(phone)) {
        errors.phone = 'Invalid phone number';
      }


      if (!password.trim()) {
        errors.password = 'Password is required';
      }else if (!validatePassword(password)) {
        errors.password = 'Invalid password ';
      }

      if (!address.trim()) {
        errors.address = 'Adresse is required';
      }

      if (!f_name.trim()) {
        errors.f_name = 'First name is required';
      }
      else if (!validateName(f_name)) {
        errors.f_name = 'Invalid First name';
      }

      if (!l_name.trim()) {
        errors.l_name = 'Last name is required';
      } else if (!validateName(l_name)) {
        errors.l_name = 'Invalid last name';
      }

      if (Object.keys(errors).length === 0) {
        // si pas d'erreur ,anzido hna fonction backend de sign

        try {

          const response = await fetch('http://localhost:8222/api/clients/signup',
             {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
               },
               body:JSON.stringify(
                   {
                     "f_name":f_name,
                     "l_name":l_name,
                     "login":login,
                     "password":password,
                     "phone":phone,
                     "address":address
                   })

          });

          // Assuming your backend responds with a success message
          if (response.ok) {
            // Clear fields after successful signup
            // clearFields();
            // onRequestClose();
            // // Redirect to the login page
            // window.location.href = '/signIn';
            // setModalVisibility(true); // Show the modal only for a successful response
            window.alert("Votre compte est bien crée");
            history.push("/annonces");


          } else {

            console.error('Registration failed:', response.data.message);
          }
        } catch (error) {
          console.error('Error during registration:', error.message);

        }


        //rederiger vers page de login
       // window.location.href = '/signIn';
        // Clear fields after successful signup
        clearFields();
        onRequestClose();
      } else {
        setFieldErrors(errors);
      }
    };
  
    const validatelogin = (login) => {
      // Use a regular expression to validate login format
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(login);
    };
  const validatePassword = (password) => { const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; return re.test(password); };

  const validatePhone = (phone) => {
      // Use a regular expression to validate phone number format
      const re = /^[0-9]{10}$/;
      return re.test(phone);
    };

  const validateName = (name) => {
    // Use a regular expression to validate name format (alphabets and spaces only)
    const re = /^[A-Za-z ]+$/;
    return re.test(name);
  };
    const clearFields = () => {
      setlogin('');
      setPassword('');
      setPhone('');
      setNom('');
      setPrenom('');
      setAddress('');
      setFieldErrors({});
    };
  
    useEffect(() => {
      if (!isOpen) {
        clearFields();
      }
    }, [isOpen]);
  ///Traitement du model succes
  const [isModalVisible, setModalVisibility] = useState(false);
  const succes = () => {
    //e.preventDefault(); // Prevent the default form submission behavior
    setModalVisibility(true);
  };
  const closeModal = () => {
    setModalVisibility(false);
    // history.push('/');
  };

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal de Sign Up"
        style={customStyles}
      >
        <div>
          {/*<h2 style={customStyles.heading}>Sign Up</h2>*/}
          <form onSubmit={handleSignUp}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '10px' }}>
                <label>Nom:</label>
                <input
                    type="text"
                    value={f_name}
                    onChange={(e) => setNom(e.target.value)}
                />
                {fieldErrors.f_name && (
                    <p style={{ color: 'red', fontSize: 10 }}>{fieldErrors.f_name}</p>
                )}
              </div>

              <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    value={l_name}
                    onChange={(e) => setPrenom(e.target.value)}
                />
                {fieldErrors.l_name && (
                    <p style={{ color: 'red', fontSize: 10 }}>{fieldErrors.l_name}</p>
                )}
              </div>
            </div>


              <label>login:</label>
            <input
              type="login"
              value={login}
              onChange={(e) => setlogin(e.target.value)}
            />
            {fieldErrors.login && (
              <p style={{ color: 'red', fontSize: 10 }}>{fieldErrors.login}</p>
            )}
  
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
    {fieldErrors.password && (
              <p style={{ color: 'red', fontSize: 10 }}>{fieldErrors.password}</p>
            )}
            <label>Téléphone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {fieldErrors.phone && (
              <p style={{ color: 'red', fontSize: 10 }}>{fieldErrors.phone}</p>
            )}
  
            <label>Adresse:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
              {fieldErrors.address && (
              <p style={{ color: 'red', fontSize: 10 }}>{fieldErrors.address}</p>
            )}
          
            <button type="submit" >Sign Up</button>
          </form>
        
        </div>
        <ModalSucces isVisible={isModalVisible} onClose={closeModal} />
      </Modal>

);
  };
  
  export default Registration;