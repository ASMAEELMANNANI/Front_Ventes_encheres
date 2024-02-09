import React, {useState} from "react";
import "./Modal.css";

const Modal = ({ isVisible, onClose,onProposePrice,minPrice }) => {
    const [enteredPrice, setEnteredPrice] = useState("");

    const handlePriceChange = (e) => {
        setEnteredPrice(e.target.value);
    };

    const handleEnregistrerClick = () => {
        // You can send a request or perform any logic with the entered price here
        // For now, let's just log it to the console
        console.log("Entered Price:", enteredPrice);

        // Close the modal
        onClose();

        // If you want to send the price back to the parent component (Details),
        // you can use the onProposePrice callback
        onProposePrice(enteredPrice);
    };
    return (
        isVisible && (
            <div className="modal-overlay">
                <div className="modal-content2">
                    <h2>Proposition de prix</h2>
                    <br/>
                    <input type="number" min={minPrice} placeholder="Enter un prix" onChange={handlePriceChange} name={'prix'} /><br/>
                    <div className="button-container">
                        <button className={"modal-button"} onClick={handleEnregistrerClick}>Enregistrer</button>
                        <button className={"modal-button2"} onClick={() => onClose()}>Annuler</button>
                    </div>
                    {/*<button  className={"modal-button2"}  onClick={handleEnregistrerClick} >Enregistrer</button>*/}
                    {/*<button  className={"modal-button2"}  onClick={()=>      onClose()} >Annuler</button>*/}

                </div>
            </div>
        )
    );
};

export default Modal;