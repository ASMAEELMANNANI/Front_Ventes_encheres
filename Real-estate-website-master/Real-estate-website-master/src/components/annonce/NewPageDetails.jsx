import React , { useState, useEffect } from 'react';
import './DetailAnnonce.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';
import Modal from "./Modal";



function NewPageDetails() {

  const [annonceDetails, setAnnonceDetails] = useState(null);
  const [AnnonceId, setAnnonceId] = useState(null);
  const history = useHistory();
  const userId = localStorage.getItem("userId");


  const [isModalVisible, setModalVisibility] = useState(false);    
  
  const encherir = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setModalVisibility(true);
  };


  const closeModal = () => {
    setModalVisibility(false);
    // history.push("/");
};

const handleProposePrice = async (proposedPrice) => {
            
        const response = await fetch('http://localhost:8087/encherir/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "idC": userId,
                "idA": AnnonceId,
                "prop": proposedPrice
              }),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorData => {
                    console.error('Error response from server:', errorData);
                    if (errorData === '1') {
                        alert('Client not found');
                    } else if (errorData === '2') {
                        alert('You cannot bid on your own products');
                    } else if (errorData === '3') {
                        alert('your proposal must be greater than last one');
                    } else if (errorData === '4') {
                        alert('You cannot bid on you self');
                    } else {
                        alert('Unknown error occurred');
                    }
                    throw new Error('Error occurred');
                });
            }
            return response.text(); // Return the response body as text
        })
        .then(responseData => {
            console.log(responseData); // Log the response to the console
            setModalVisibility(true); // Show the modal only for a successful response
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // alert('An error occurred. Please try again later.');
        });

        

    // Close the modal
    closeModal();
};

  

  useEffect(() => {
    const fetchAnnonceDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      setAnnonceId(id);
      console.log(AnnonceId);
      try {
        const response = await fetch(`http://localhost:8087/annonces/${AnnonceId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de l\'annonce');
        }
        const data = await response.json();

         // Fetch category details
        const categoryResponse = await fetch(data._links.category.href);
        if (!categoryResponse.ok) {
            throw new Error('Erreur lors de la récupération des détails de la catégorie');
        }
        const categoryData = await categoryResponse.json();
        
       // Add category name to the response data
       data.category = categoryData;
       setAnnonceDetails(data);
        // Récupérer les détails du vendeur
        const vendeurResponse = await fetch(data._links.vendeur.href);
        if (!vendeurResponse.ok) {
          throw new Error('Erreur lors de la récupération des détails du vendeur');
        }
        const vendeurData = await vendeurResponse.json();
        // Ajouter les détails du vendeur à la réponse de l'annonce
        data.vendeurDetails = vendeurData;
        setAnnonceDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAnnonceDetails();
  }, [AnnonceId]);
  

  return (
    <div className="app">
      <div className="content">
        <div className="image-section">
         
          <Carousel>
          {annonceDetails && annonceDetails.images && annonceDetails.images.split(',').map((image, index) => (
            <div key={index}>
              <img src={`/images/${image}`} alt={`Image ${index + 1}`} />
            </div>
          ))}
          </Carousel>
        </div>
        {annonceDetails && (
        <div className="info-section">
        <div className="info">
           
              <>
                <p><strong>Nom :</strong></p>
                <br />
                <p>{annonceDetails.productName}</p>
                <br />
                <p><strong>Description :</strong></p>
                <br />
                <p>{annonceDetails.description}</p>
                <br />
                <p><strong>Catégorie :</strong></p>
                <br />
                <p>{annonceDetails.category.name}</p>
                <br />
                <p><strong>Le prix de depart :</strong></p>
                <br />
                <p>{annonceDetails.prixDepart} DH</p>
                <br />
                <p><strong>Le meilleur prix :</strong></p>
                <br />
                <p>{annonceDetails.bestPrice} DH</p>
                <br />

                {annonceDetails.vendeurDetails && (
                  <>
                    <p><strong>Vendeur :</strong></p>
                    <br />
                    <p>{annonceDetails.vendeurDetails.fname} {annonceDetails.vendeurDetails.lname}</p>
                    <br />
                    <p><strong>Téléphone :</strong></p>
                    <br />
                    <p>{annonceDetails.vendeurDetails.phone}</p>
                  </>
                )}
              </>
            
          </div>
         
          <div className="buttons">
           {parseInt(userId, 10) !== 0 && (
              <button onClick={encherir} className="validate">
                proposer Prix
              </button>
            )}
            <Modal isVisible={isModalVisible} minPrice={annonceDetails.bestPrice} onProposePrice={handleProposePrice} onClose={closeModal} />

          </div>
          
        </div>
         )}
    
      </div>
      
    </div>
   
  );
}

export default NewPageDetails;
