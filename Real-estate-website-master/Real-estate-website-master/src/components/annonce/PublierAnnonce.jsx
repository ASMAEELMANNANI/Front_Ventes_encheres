import React, {useState} from "react";
import "./publierAnnonce.css";
import Back from "../common/Back";
import img from "../images/pricing.jpg";
import Modal from "./Modal";
import ModalSucces from "./ModalSucces";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PublierAnnonce=() => {

    const history = useHistory();
 ///L'objet a remplir et a envoyer au backend
    const [data, setData] = useState({
        productName: '',
        prixDepart: '',
        dateDeb: '',
        dateFin: '',
        description:'',
        idCategory:'',
        idV:1
        // image:''
    });

///La fonction permet de changer les valeurs de l'objet par les valeurs saisie
    const handlChanged = (e) => {

        if (e.target.name === 'image') {
            console.log(e.target.value);
            setData({ ...data, image: e.target.files[0]});
            console.log(data.image);
        }
        else {
            console.log(e.target.name);
            setData({ ...data, [e.target.name]: e.target.value });
            console.log(e.target.value);

        }
    };


///La fonction publier permet d'enregistrer l'annonce dans la base de donnes
    const publier = (e) => {
        e.preventDefault();

        ///L'objet a enregitstre
        // const formData = new FormData();
        // formData.append('image', data.image);
        // formData.append('productName', data.productName);
        // formData.append('idCategory', data.idCategory);
        // formData.append('description', data.description);
        // formData.append('dateDeb', data.dateDeb);
        // formData.append('dateFin', data.dateFin);
        // formData.append('prixDepart', data.prixDepart);


///Envoie de la requete
fetch('http://localhost:8087/api/annonces/publier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "productName": data.productName,
            "idCategory": data.idCategory,
            "description": data.description,
            "dateDeb": data.dateDeb,
            "dateFin": data.dateFin,
            "prixDepart": data.prixDepart,
            "idV": data.idV
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorData => {
                console.error('Error response from server:', errorData);
                if (errorData === '1') {
                    alert('Client not found');
                } else if (errorData === '2') {
                    alert('Invalid product name');
                } else if (errorData === '3') {
                    alert('Invalid price');
                } else if (errorData === '4') {
                    alert('Verify the dates');
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




}


      ///Traitement du model succes
      const [isModalVisible, setModalVisibility] = useState(false);
      const succes = () => {
          //e.preventDefault(); // Prevent the default form submission behavior
          setModalVisibility(true);
      };
      const closeModal = () => {
          setModalVisibility(false);    
          history.push('/');
      };













///Le formulaire d'ajout
return (
        <>
            <section className='contact mb'>
                <Back name='Publier une nouvelle annonce' title='Les informations nécessaires pour une annonce' cover={img}/>
                <div className='container'>
                    <form className='shadow'>
                        {/*<h4>Remplir le formulaire suivant</h4> <br />*/}

                        <div>
                            <input name='productName'  onChange={handlChanged} type={"text"} placeholder={"Nom du produit"}/>
                            <input name='prixDepart' onChange={handlChanged} type={"number"} min={0} placeholder={"Prix initial"}/>
                        </div>
                        <h4 className={"grand-espace"}>Date de début                                                                                 Date de fin</h4> <br />
                        <div>
                            <input aria-placeholder={"Date de début"}  onChange={handlChanged} name='dateDeb' type={"datetime-local"}/>
                            <input aria-placeholder={"Date de fin"}  onChange={handlChanged} name='dateFin' type={"datetime-local"}/>
                        </div>
                        {/* <h4 className={"grand-espace"}>Image du produit                                                               </h4> <br />
                        <div>
                            <input aria-placeholder={"Image du produit"} name='image' accept=".jpg, .jpeg, .png, .gif" onChange={handlChanged} type={"File"}/>
                            <select  name={"idCategory"} onChange={handlChanged} placeholder={"Categorie"}>
                                <option value={"Appartement"}>appartement</option>
                                <option value={"Vehicule"}>Vehicule</option>
                                <option value={"Villa"}>Villa</option>
                                <option value={"Décoration"}>Décoration</option>
                                <option value={"Accesoire"}>Décoration</option>
                            </select>

                        </div> */}

                        <textarea name='description' onChange={handlChanged} placeholder={'Description de produit'} cols='30' rows='8'></textarea>
                <button type={"submit"} className={"contact-button"} onClick={publier}>Publier l'annonce</button>
                    </form>

                </div>

                <ModalSucces isVisible={isModalVisible} onClose={closeModal} />

            </section>
        </>
    )
}

export default PublierAnnonce;