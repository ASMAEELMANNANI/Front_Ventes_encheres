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
            const response = await fetch('http://localhost:8087/api/annonces/enattente');
            if (response.ok) {
                const data = await response.json();
                setAdvertisements(data);
            } else {
                console.error('Failed to fetch advertisements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error.message);
        }
    };

    const handleValidate = async (id) => {
        try {
            const response = await fetch('http://localhost:8087/api/annonces/valider',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "idA": id,
                        "etat" : 1,
                    }),
                }
                );
            if (response.ok) {
                window.alert("Annonce bien validé");
                window.location.reload();

                const data = await response.json();
                setAdvertisements(data);
            } else {
                console.error('Failed to fetch advertisements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error.message);
        }
        console.log(`Validating advertisement with id ${id}`);
    };

    const handleCancel = async (id) => {
        console.log(`Canceling advertisement with id ${id}`);
        try
        {
            const response = await fetch('http://localhost:8087/api/annonces/valider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "idA": id,
                        "etat": 2,
                    }),
                }
            );
            if (response.ok) {
                window.alert("Annonce bien refusé");
                window.location.reload();
                const data = await response.json();
                setAdvertisements(data);

            } else {
                console.error('Failed to fetch advertisements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error.message);
        }
        console.log(`Validating advertisement with id ${id}`);


    };

    return (
        <>
            <section className="contact mb">
                <Back name="Détails des annonces" />
                <div className="container">
                    <div className="cards-container">
                        {advertisements.map((ad) => (//objet json
                            <AdvertisementCard
                                id={ad.id}
                                name={ad.productName}
                                category={ad.category.name}
                                description={ad.description}
                                prixDepart={ad.prixDepart}
                                vendeurname={ad.vendeur.fname}
                                vendeurprenom={ad.vendeur.lname}
                                phone={ad.vendeur.phone}


                                onValidate={handleValidate}
                                onCancel={handleCancel}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailsPage;
