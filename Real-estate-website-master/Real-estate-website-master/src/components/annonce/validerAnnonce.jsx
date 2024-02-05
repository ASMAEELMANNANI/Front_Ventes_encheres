import React from "react";
const customStyles = {

    container: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },


};
const AdvertisementCard = ({ id, name, category,prixDepart,description,vendeurname,vendeurprenom,phone , onValidate, onCancel }) => {
    return (
        <div className="details-card shadow">
            <h4>Nom du produit : </h4>
            <p>{name}</p>

            <h4>Categorie: </h4>
            <p>{category}</p>

            <h4>Description: </h4>
            <p>{description}</p>

            <h4>Vendeur: </h4>
            <p>{vendeurname}{  } {vendeurprenom}</p>

            <h4>Numéro de téléphone: </h4>
            <p>{phone}</p>

            <div style={customStyles.container}>
                <button onClick={() => onValidate(id)} className="valider-button">
                    Valider
                </button>

                <button onClick={() => onCancel(id)} className="annuler-button">
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default AdvertisementCard;