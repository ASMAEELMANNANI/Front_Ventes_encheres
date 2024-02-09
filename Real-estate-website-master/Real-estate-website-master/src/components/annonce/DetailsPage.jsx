import React, { useState, useEffect } from "react";
import Back from "../common/Back";
import AdvertisementCard from "./validerAnnonce";

const DetailsPage = () => {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        // Fetch advertisements from your Spring Boot backend
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            const response = await fetch('http://localhost:8087/annonces/enattente');
            if (response.ok) {
                const data = await response.json();
                setAdvertisements(data);
               // console.log(data);
            } else {
                console.error('Failed to fetch advertisements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error.message);
        }
    };

   
    return (
        <>
            <section className="contact mb">
               
                <div className="container">
                    <div className="cards-container">
                        {advertisements.map((ad) => (//objet json
                            <AdvertisementCard
                                id={ad.id}
                                name={ad.productName}
                                category={ad.productName}
                                description={ad.description}
                                prixDepart={ad.prixDepart}
                                vendeurname={ad.vendeur.fname}
                                vendeurprenom={ad.vendeur.lname}
                                phone={ad.vendeur.phone}


                                
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailsPage;
