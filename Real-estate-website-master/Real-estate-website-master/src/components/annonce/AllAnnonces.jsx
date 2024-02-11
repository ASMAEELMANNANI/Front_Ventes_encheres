import React, {useEffect, useState} from 'react';
import MyCards from "../home/recent/MyCards";
import "./mesannonces.css";
const AllAnnonces = () => {
    const [category, setCategory] = useState('');
    const [ville, setVille] = useState('');
    const [status, setStatus] = useState('');
    const [cardsData, setCardsData] = useState([]);
    const [FiltredData,setFiltredData]=useState([]);
    const [imagesArray,setImages]=useState([]);
    const userId = localStorage.getItem("userId");
    


    // Function to handle search button click
    const handleSearch = () => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

            const filteredCards = cardsData.filter(card => {
                return (
                    (category === '' || card.category.name === category) &&
                    (category === '' || card.category.name === category) &&
                    (status === '' || card.statut === status)
                );
            });
            setFiltredData(filteredCards);

    };
    useEffect(() => {

            // Envoie du requete au port du service d'annonces
            fetch(`http://localhost:8087/annonces`)

                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCardsData(data);

                    setFiltredData(data);
                    console.log(cardsData);

                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching data:', error);
                });
        }, []);
    return (
        <div className="blog-out mb">
            {/*La barre de recherche*/}
            <div className={"search-Bar"}>
                <select id="select-option" name={"category"} onChange={e => setCategory(e.target.value)}>
                    <option value="">Catégorie</option>
                    <option value="Villa">Villa</option>
                    <option value="Appartement">Appartement</option>
                    <option value="Décoration">Décoration</option>
                    <option value="Bijoux">Bijoux</option>
                </select>
                <select id="select-option" name={"ville"} onChange={e => setVille(e.target.value)}>
                    <option value="">Ville</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                </select>
                <select id="select-option" name={"status"} onChange={e => setStatus(e.target.value)}>
                    <option value="">Statut</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="TERMINEE">Terminé</option>
                    <option value="REJETEE">Rejeté</option>
                    <option value="EN_ATTENTE">En attente</option>
                </select>
                <button type={"submit"} className={"search-Button"} onClick={handleSearch}>Chercher</button>
            </div>

            {/*Les annonces*/}
            {
                FiltredData.map((card)=>{
                    const imageArray = card.images ? card.images.split(",") : [];
                console.log("i"+imageArray[0]);
                return(

                <MyCards
                        key={card.id}
                        name={card.productName}
                        description={card.description}
                        imageUrl={imageArray[0]}
                        status={card.statut}
                        category={card.category.name}
                    />
                )
            })
            }
        </div>
    );
};

export default AllAnnonces;
