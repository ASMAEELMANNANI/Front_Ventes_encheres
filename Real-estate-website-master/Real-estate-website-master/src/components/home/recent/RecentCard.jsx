import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom";
import "./recentCard.css"


const RecentCard = () => {
    const history = useHistory();

    function handleButtonClick(id,category,name,price,type) {
        // event.safePreventDefault();

        history.push('/Details/'+id+'/'+category+'/'+name+'/'+price+'/'+type);
        // this.props.history.push('/Details?id='+id+'category='+category+'name='+name+'price='+price+'type='+type);
    }

    ///Envoie du requete pour la recupertion des annonces

    ///Creation du modele de l'annone
    const [annonces, setannonces] = useState([]);

    //La requete pour recuperer toutes les annonces
    useEffect(() => {
    
        // Envoie du requete au port du service d'annonces
        fetch('http://localhost:8087/api/annonces')
        
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setannonces(data);
                console.log(annonces);

            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
    <>
      <div className='content grid3 mtop'>
        {/* {list.map((val, index) => { */}
           {annonces.map((val, index) => {
          //const { cover, category, location, name, price, type } = val
          const { id, productName, description, dateDeb, dateFin, prixDepart, bestPrice, statut} = val

          
          return (
            <div className='box shadow' key={index}>
              
              <div className='img'>
                <img src="../images/annonces/th.jpeg" alt='' />
               {/*<img src={image} alt='' />*/}
              </div>

            <div className='text'>
                <div className='category flex'>
                {/* <span style={{ background: "#ff98001a", color:  "#ff9800" }}>{category}</span> */}
                {/* <span style={{ background: "#ff98001a", color:  "#ff9800" }}>{statut}</span> */}
                  <i className='fa fa-heart'></i>
                </div>                
                   <h4>{productName}</h4>
                <p>
                    {/* <span>{type}</span> */}
                    {/* <span>{category}</span> */}
                </p>
              </div>
              <div className='button flex'>
                <div className='price-info'>
                    <span className='start-price'>{prixDepart} DH</span>
                    <span className='arrow'>→</span>
                    <span className='current-price'>{bestPrice} DH</span>
                </div>
                <Link className='btn2' to={`/Details/${id}/${productName}/${description}/${dateDeb}/${dateFin}/${bestPrice}`}>
                    Détails
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
