// Modal.js
import React from "react";
import "../annonce/Modal.css";

const ModalSucces = ({ isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Votre compte est bien enregisté</h2>
                    <div>
                        <button className={"modal-button"}   onClick={onClose}>Ok</button>

                    </div>
                </div>
            </div>
        )
    );
};

export default ModalSucces;
