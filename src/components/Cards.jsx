import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import {InfoCircleOutlined} from '@ant-design/icons';
import {PlusCircleOutlined} from '@ant-design/icons';
import {MinusCircleOutlined} from '@ant-design/icons';
import { AppContext } from '../AppContext';
import Swal from 'sweetalert2';


function Cards(props) {
    const context = useContext(AppContext);
    // const { basket, voucherRate, addToBasket, clearBasket } = context
    // console.log("TESTE ADDTOBASKET addToBasket", addToBasket)
    // console.log("LALALALAL ~ file: Cards.jsx ~ line 11 ~ Cards ~ context", context)
    const {productCode, typeImage, description, price} = props
    // console.log('usehistory', useHistory());

    let handleclickPlus = (id) => {
        // console.log('context : ', context);
        context.addToBasket(id);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'success',
            title: `${productCode} à été ajouté avec success !!!`
        });

    }

    let handleclickMoins = (id) => {
        console.log('context click moin : ', context);
        context.removeToBasket(id);
    }

    return (
        <div className="uneseulcarte">
            <div className="card">
                        <img className="img-fluid"
                            src={`images/${productCode.toLowerCase()}.${typeImage}`}
                            alt={`Card image cap1 dans ${productCode}`}/>
                        <div className="card-body">
                            <h4 className="card-title">{productCode}</h4>
                            <p className="card-text"> {description}</p>
                            <p id="phraseinfosBtn"> {price} € </p>
                            <Link className="w-25" to={`/pageduproduit/${productCode}`}>
                                <InfoCircleOutlined className="infoCircleOutlined" />
                            </Link>
                            <div>
                                <strong>Ajout dans panier : </strong>
                                <button data-code={productCode} onClick={() => handleclickPlus(productCode)}>
                                    <PlusCircleOutlined className="plusCircleOutlined" />
                                </button>
                                <button data-code={productCode} onClick={() => handleclickMoins(productCode)}>
                                    <MinusCircleOutlined className="minusCircleOutlined" />
                                </button>
                            </div>
                        </div>
            </div>
        </div>
    )
}

export default Cards;
