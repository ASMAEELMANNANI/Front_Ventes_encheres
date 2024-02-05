import React from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"
import {useHistory} from "react-router-dom";

const Annonces = () => {
    const history = useHistory();

    const pubAnnonce =() =>{
         // window.history.pushState(null,null,'/publierAnnonce');
        history.push('/publierAnnonce');

    }
  return (
    <>
      <section className='blog-out mb'>
        <Back name='' title='Les annonces disponibles' cover={img} />
        <div className='container recent'>
            <br/>
            <button type={"submit"}  onClick={() => pubAnnonce()}>Publier une annonce</button>
            {/*les cards pour l'affichage dea annonces*/}
            <RecentCard  />
        </div>
      </section>
    </>
  )
}

export default Annonces;
