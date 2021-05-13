import React, { useContext } from "react";
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';

function NavHome ({}) {

  const context = useContext(AppContext);
  const { basket, voucherRate, addToBasket, clearBasket } = context

  console.log('TATATATATATATATATTATATATTAT', context);
  let filtrerQuandQuantityEgaleAzero = Object.keys(basket.filter(e => e.quantity !== 0)).length;

  return  (
    <div className="container">
      <Link to={`/`}>
          <img id="logo-main" src="/images/online-shopping.png" width="130" alt="Logo Thing main logo"/>
      </Link>
    <p id="numberProduit"><Link to={`/monPanier`}>Votre panier</Link> contient <b>{filtrerQuandQuantityEgaleAzero}</b> produit</p>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={`/`}>
          <a className="navbar-brand" href="#">Shop</a>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={`/monPanier`}>
                <a className="nav-item nav-link active" href="#">Mon Panier<span className="sr-only">(current)</span></a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
    );
} 

export default NavHome;
