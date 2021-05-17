import React from 'react';

function My404Component () {
    return (
        <div className="PageNotFound404">
            <h3>Erreur 404 : Nous somme désolé, votre page est introuvable</h3>
            <img className="img-fluid" src={`images/monstre_and_cie_404.png`} alt={`Minion not found`}/>
        </div>
    );
} 

export default My404Component;
