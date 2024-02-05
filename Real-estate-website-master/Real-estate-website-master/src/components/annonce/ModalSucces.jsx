// Modal.js
import React from "react";
import "./Modal.css";

const ModalSucces = ({ isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Annonce enregisté</h2>
                    <h4>L'annonce est envoyée a l' administrateur quand l'annonce est validé vous serez notifié</h4>
                    <div>
                        <button className={"modal-button"}   onClick={onClose}>Ok</button>

                    </div>
                </div>
            </div>
        )
    );
};

export default ModalSucces;
