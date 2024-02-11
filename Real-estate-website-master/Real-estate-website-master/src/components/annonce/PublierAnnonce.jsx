import React, {useState} from "react";
import "./publierAnnonce.css";
import Back from "../common/Back";
import img from "../images/pricing.jpg";
import Modal from "./Modal";
import ModalSucces from "./ModalSucces";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PublierAnnonce=() => {

    const history = useHistory();
    const [image,setImages]=useState([]);
    const userId = localStorage.getItem("userId");
 ///L'objet a remplir et a envoyer au backend
    const [data, setData] = useState({
        productName: '',
        prixDepart: '',
        dateDeb: '',
        dateFin: '',
        description:'',
        idCategory:'',
        idV:userId,
        images:''
    });

///La fonction permet de changer les valeurs de l'objet par les valeurs saisie
    const handlChanged = (e) => {

            console.log(e.target.name);
            setData({ ...data, [e.target.name]: e.target.value });
            console.log(e.target.value);


    };

    const handleFile = (e) =>{
       // let images = e.target.files;
        for(let i=0; i< e.target.files.length; i++)
        {
            image.push(e.target.files[i]);
        }
        setData({ ...data, [e.target.name]: image });
        console.log(data.images);


    };
///La fonction publier permet d'enregistrer l'annonce dans la base de donnes
    const publier = (e) => {
        e.preventDefault();
        //handleFile(e);
        console.log(data);

///Envoie de la requete
fetch('http://localhost:8087/annonces/publier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
            "productName": data.productName,
            "idCategory": data.idCategory,
            "description": data.description,
            "dateDeb": data.dateDeb,
            "dateFin": data.dateFin,
            "prixDepart": data.prixDepart,
            "idV":userId,
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
                        <h4 className={"grand-espace"}>Date de début                                                                                                             Date de fin</h4> <br />
                        <div>
                            <input aria-placeholder={"Date de début"}  onChange={handlChanged} name='dateDeb' type={"datetime-local"}/>
                            <input aria-placeholder={"Date de fin"}  onChange={handlChanged} name='dateFin' type={"datetime-local"}/>
                        </div>
                        <div>
                            <input aria-placeholder={"Les images"}  onChange={handleFile} name='images' type={"file"} accept={".png,.jpg, .jpeg"} multiple />
                        </div>
                        
                        <div>
                           
                            <select  name={"idCategory"} onChange={handlChanged} placeholder={"Categorie"}>
                                <option value={""}>Catégorie du produit</option>
                                <option value={"1"}>Appartement</option>
                                <option value={"2"}>Vehicule</option>
                                <option value={"3"}>Villa</option>
                                <option value={"4"}>Décoration</option>
                                <option value={"5"}>Bijoux</option>
                            </select>

                        </div> 



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