import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css'; // Assurez-vous de créer un fichier Profile.css pour le style
import img from "../images/ImageAv.jpg";
import { useHistory } from 'react-router-dom';

/*const Profile = () => {
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setUserId(id);
  }, []);

  console.log("userID",userId);
  useEffect(() => {
    // Fonction pour récupérer les détails de l'utilisateur à partir de l'API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/clients/GetClient/${userId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }
        const userDataFromApi = await response.json();
        // Mettre à jour l'état avec les données récupérées de l'API
        setUserData({
          fname: userDataFromApi.f_name,
          lname: userDataFromApi.l_name,
          email: userDataFromApi.login,
          phone: userDataFromApi.phone,
          address: userDataFromApi.address,
          password:  userDataFromApi.password, // Ne récupère pas le mot de passe depuis l'API pour des raisons de sécurité
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData(); // Appeler la fonction pour récupérer les données utilisateur
  }, [userId]); // Exécuter l'effet à chaque changement de l'ID de l'utilisateur

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données mises à jour à l'API
    // Exemple de code pour envoyer les données à l'API
    // fetch('http://localhost:8088/api/clients/updateProfile', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Erreur lors de la mise à jour du profil');
    //   }
    //   // Gérer la réponse de l'API en conséquence
    // })
    // .catch(error => console.error(error));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={img} alt="User" />
        </div>
        <div className="profile-details">
          <h2>Modifier Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fname">Nom</label>
              <input type="text" id="fname" name="fname" value={userData.fname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Prénom</label>
              <input type="text" id="lname" name="lname" value={userData.lname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="password">Nouveau mot de passe</label>
              <input type="password" id="password" name="password" value={userData.password} onChange={handleChange}  disabled/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Addresse</label>
              <input type="text" id="address" name="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="button-container">
              <button type="submit">Sauvegarder</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;*/


const Profile = () => {
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [userId, setUserId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setUserId(id);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/clients/GetClient/${userId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }
        const userDataFromApi = await response.json();
        setUserData({
          fname: userDataFromApi.f_name,
          lname: userDataFromApi.l_name,
          email: userDataFromApi.login,
          phone: userDataFromApi.phone,
          address: userDataFromApi.address,
          password: userDataFromApi.password,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        f_name: e.target.elements.fname.value,
        l_name: e.target.elements.lname.value,
        address: e.target.elements.address.value,
        phone: e.target.elements.phone.value,
        login: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };
  
      const response = await fetch('http://localhost:8088/api/clients/EditProfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }
  
      // Gérer la réponse de l'API en conséquence
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={img} alt="User" />
        </div>
        <div className="profile-details">
          <h2>Modifier Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fname">Nom</label>
              <input type="text" id="fname" name="fname" value={userData.fname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Prénom</label>
              <input type="text" id="lname" name="lname" value={userData.lname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="password">Nouveau mot de passe</label>
              <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} disabled/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Addresse</label>
              <input type="text" id="address" name="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="button-container">
              <button type="submit">Sauvegarder</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

