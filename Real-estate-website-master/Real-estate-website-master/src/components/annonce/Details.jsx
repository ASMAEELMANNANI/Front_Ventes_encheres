import React, {useEffect, useState} from "react";
import "./publierAnnonce.css";
import Back from "../common/Back";
import img from "../images/pricing.jpg";
import Modal from "./Modal";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Details=() => {
    const [isModalVisible, setModalVisibility] = useState(false);    
    const { id, productName, description, dateDeb, dateFin, bestPrice}  = useParams();
    const history = useHistory();

    
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
                    "idC": 3,
                    "idA": 18,
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

    return (
        <>
            <section className='contact mb'>
                <Back name="Détails de l'annonce" title="Commencer l'enchère en cliquant sur enchèrir" cover={img}/>
                <div className='container'>
                    <form className='shadow'>
                        {/*<h4>Remplir le formulaire suivant</h4> <br />*/}

                            <h4>Nom du produit : </h4>
                        <p>                            
                            <span>{productName}</span>
                        </p>
                        {/* <h4>Categorie: </h4>
                        {category == null ? <span></span> : category} */}

                        <h4>Description: </h4>
                        <span>{description}</span>                        

                        <h4>Début de l'annonce: </h4>
                        <span>{dateDeb}</span>

                        <h4>Fin de l'annonce: </h4>
                        <span>{dateFin}</span>

                        <h4>Dernier Prix: </h4>
                        <span>{bestPrice}</span>

                        <button onClick={encherir} className={"proposer-button"}>Proposer un prix</button>

                    </form>

                </div>


            </section>
            <Modal isVisible={isModalVisible} minPrice={bestPrice} onProposePrice={handleProposePrice} onClose={closeModal} />

        </>
    )
}
export default Details;