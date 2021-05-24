import React, { Fragment, useContext } from 'react';
import { AppContext } from '../AppContext';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';

function PopUpPanier () {
    const context = useContext(AppContext);
    let tabDesPrix = []

    console.log('JE SUIS DANS LE POP UP ', context.basket);
    const LesBlockDuPopUp = context.basket.map((e,key) =>{
        tabDesPrix.push(e.unitPrice * e.quantity)
        return (
    
            <div className="unBlockImageAndInfosAndDelete">
                <div className="imagesPopUp">
                        <img className="img-fluid"
                                            src={`images/${e.carousel}`}
                                            alt={`Card image cap1 dans ${e.productCode}`}/>
                </div>
                <div className="unBlockTextAndbuttonPoubelle">
                    <div className="infosAcoterImagesPopUp">
                        <p>{e.unitPrice} €</p>
                        <p>{e.description}</p>
                        <p>Qté: {e.quantity}</p>
                    </div>
                    <div className="deleteButtonPopUp">
                        <DeleteOutlined />
                    </div>
                </div>
            </div>
        )
    }
    )

    let priceFinal = parseFloat(tabDesPrix.reduce((e,i) => e + i )).toFixed(2)

    return (
        <Fragment>
            <div className="enTeteDuPopUp">
                <div className="enTeteDuPopUpText">
                    Mon panier, {context.basket.length} article
                </div>
                <div className="enTeteDuPopUpIcon">
                    <CloseOutlined />
                </div>
            </div>
            {LesBlockDuPopUp}
            <div className="sousTeteDuPopUpText">
                    <div className="leTitleToal">
                        <p>Sous-total</p>
                    </div>
                    <div className="prixTitleTotal">
                        <p>{priceFinal} €</p>
                    </div>
            </div>
        </Fragment>
    );
}

export default PopUpPanier;
