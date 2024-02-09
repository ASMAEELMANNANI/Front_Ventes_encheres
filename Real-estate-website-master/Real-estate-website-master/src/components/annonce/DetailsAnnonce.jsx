import React , { useState, useEffect } from 'react';
import './DetailAnnonce.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';



function DetailAnnonce() {

  const [annonceDetails, setAnnonceDetails] = useState(null);
  const [AnnonceId, setAnnonceId] = useState(null);
  const history = useHistory();
  
  

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


  const handleValidate = async (id) => {
    console.log("id from valider ",id);
    try {
        const response = await fetch('http://localhost:8087/annonces/valider',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idA": id,
                    "etat" : 1,
                }),
            }
            );
        if (response.ok) {
            window.alert("Annonce bien validé");
            window.location.reload();

            const data = await response.json();
            setAnnonceDetails(data);
        } else {
            console.error('Failed to fetch advertisements:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching advertisements:', error.message);
    }
    console.log(`Validating advertisement with id ${id}`);
};

const handleCancel = async (id) => {
    console.log(`Canceling advertisement with id ${id}`);
    try
    {
        const response = await fetch('http://localhost:8087/annonces/valider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idA": id,
                    "etat": 2,
                }),
            }
        );
        if (response.ok) {
            window.alert("Annonce bien refusé");
            window.location.reload();
            const data = await response.json();
            setAnnonceDetails(data);

        } else {
            console.error('Failed to fetch advertisements:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching advertisements:', error.message);
    }
    console.log(`Validating advertisement with id ${id}`);


};
  


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
        <div className="info-section">
        <div className="info">
            {annonceDetails && (
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
                <p>{annonceDetails.category}</p>
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
            )}
          </div>

          
          <div className="buttons">
            <button className="validate"  onClick={() => handleValidate(AnnonceId)}>Valider</button>
            <button className="cancel" onClick={() => handleCancel(AnnonceId)} >Annuler</button>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default DetailAnnonce;
