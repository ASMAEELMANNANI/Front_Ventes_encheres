import React, {useState} from 'react';
import "./mycards.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faMapMarker} from '@fortawesome/free-solid-svg-icons';
import {faGlobe} from "@fortawesome/free-solid-svg-icons/faGlobe"; // Import the desired icon

const MyCards = ({ name, description, imageUrl, status,category }) => {
   // const statusClassName = status === 'En cours' ? 'status statusA' : 'status statusB';
    let statusClassName;
    switch (status) {
        case 'EN_COURS':
            statusClassName = 'status statusA';

            break;
        case 'EN_ATTENTE':
            statusClassName = 'status statusB';

            break;
        case 'REJETEE':
            statusClassName = 'status statusC';

            break;
        case 'TERMINEE':
            statusClassName = 'status statusD';

            break;
        default:
            statusClassName = 'status';
            break;
    }
    const maxLength = 80; // Set the maximum number of characters to display
    
    return (
        // <div className="card-container">

        <div className="card">
            <div className="image-container">
                {/*<img src={'test.jpg'}  className="profile-image"  alt={''}/>*/}
                <img src={'/images/'+imageUrl} className="profile-image" alt={''} />

            </div>

            <div className="card-content">
                <div className={"row"}>
                   <button className={statusClassName} >{status}</button>
                </div>

                <div className="card-header">
                        <h2>{name}</h2>
                </div>
                <div className="card-body">
                    {/*<p>{description}</p>*/}
                    <p>{description.length > maxLength ? description.substring(0, maxLength) + '...' : description}</p>

                    <span className={"location"}>
                <FontAwesomeIcon icon={faGlobe} />
                    <span>{"     "+category}</span>
              </span>

                </div>
                <div className="card-footer">
                    <button className="details-button">Voir les détails</button>
                </div>
            </div>
        {/*</div>*/}
        </div>
    );
};

export default MyCards;