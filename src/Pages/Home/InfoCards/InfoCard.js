import React from 'react';

const InfoCard = ({card}) => {
    const {name, icon, description, bgClass} = card;

    return (
        <div className={`card ${bgClass} md:card-side lg:p-6 p-4 text-white`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;