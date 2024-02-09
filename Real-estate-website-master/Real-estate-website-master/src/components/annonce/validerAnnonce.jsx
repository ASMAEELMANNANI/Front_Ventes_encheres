import React from "react";
import { Link } from "react-router-dom";

const AdvertisementCard = ({ id, name, category, prixDepart, description, vendeurname, vendeurprenom, phone }) => {
    return (
        <div className="details-card" style={{ borderRadius: '30px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '30px', marginBottom: '10px', marginTop: '30px', maxHeight: '200px' }}>
            <h4 style={{ fontWeight: 'bold' }}>Nom du produit  </h4>
            <p>{name}</p>

            <h4 style={{ fontWeight: 'bold' }}>Vendeur </h4>
            <p>{vendeurname}{  } {vendeurprenom}</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button className="annuler-button">
                    <Link to={`/detailAnnonce?id=${id}`} className="button-link" style={{ color: 'white' }}>
                        Voir détails
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default AdvertisementCard;
