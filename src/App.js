// Import pour utilisation de Component
import Home from './components/Home';
import NavHome from './components/NavHome';
import ProduitParID from './components/ProduitParID';
import MonPanier from './components/MonPanier';
import { findProduct } from './lib/database.js';

// Gestion des routes
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Le css
import './App.css';

// Contexte de l'application
import { AppContext } from './AppContext';
import { useState } from 'react';

// sweetAlert 
import Swal from 'sweetalert2';

// VoucherRate
import { voucherDatabase } from './lib/database.js';

function App(){

  const [state, setState] = useState({
    basket: [],
    voucherRate: null,
    toto: 10,
    editVoucherRate: (couponInput) => {
      let lesClefVoucherDatabse = voucherDatabase.map(e => Object.keys(e));
      let VerifDuCoupon = lesClefVoucherDatabse.find(e => e[0] === couponInput);
      if(couponInput !== ''){
        if(VerifDuCoupon !== undefined){
            let findReduct = voucherDatabase.find(e => e[VerifDuCoupon[0]]);
            let lePourcentage = findReduct[VerifDuCoupon[0]];
            setState({
              ...state,
              voucherRate: lePourcentage
            })
        }else{
            this.ErreurCoupon = <p>Votre coupon de réduction n'est pas valide !!!</p>
        }
      }
    },
    clearVoucher: () => {
      setState({
        ...state,
        voucherRate: null
      })
    },
    deleteAllproduct: (productCode, key) => {
      var basket = state.basket;
      let toto = findProduct(productCode);

      basket.map((e, i)=> {
        if(e.productCode === toto.productCode){
            basket.splice(key, 1)
        }
      });

      setState({
        ...state,
        basket: basket
      })

      // console.log('basket =================> : ', basket[0]);
      // console.log('toto =================> : ', toto);
      
    },
    addToBasket: (productCode) => {
      var basket = state.basket;
      
      let findbasket = basket.find(e => e.productCode === productCode);
      let toto = findProduct(productCode);

      if(findbasket === undefined){
        let nouveauObjetExploitable = {
          unitPrice: toto.unitPrice,
          description: toto.description,
          productCode: toto.productCode,
          quantity: 1
        }
        basket.push(nouveauObjetExploitable)
      }else{
        findbasket.quantity++;
      }
      setState({
        ...state,
        basket: basket,
        toto: 12
      })
    },
    removeToBasket: (productCode) => {
      let tab = state.basket;
      // console.log("tab =====++++++++++++>", tab);
      let findbasket = tab.find(e => e.productCode === productCode);

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

      if(findbasket === undefined){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous ne pouvez pas supprimer un élement qui ne se trouve pas dans votre panier!'
        })
      }else{
        if(findbasket.quantity < 1){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vous ne pouvez pas supprimer un élement qui ne se trouve pas dans votre panier!'
          })
          tab.splice(tab[productCode], 1)
        }else{
          findbasket.quantity--;
          // Toast.fire({
          //   icon: 'success',
          //   title: `${findbasket.productCode} à été supprimer avec success`
          // })
        }
      }
      setState({
        ...state,
        basket: tab
      })

      
    // if(productCode in tab){
    //   if(tab[productCode] <= 1){
    //     delete tab[productCode]
        // Toast.fire({
        //   icon: 'success',
        //   title: `${productCode} à été supprimer avec success`
        // })
    //   }else{
    //     tab[productCode]--
    //   }
    // }else{
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Vous ne pouvez pas supprimer un élement qui ne se trouve pas dans votre panier!'
      // })
    // }
      // setState({
      //   ...state,
      //   basket: tab
      // })
    },
    clearBasket: (voucherRate) => {}
  })

  // console.log("🚀 ~ file: App.js ~ line 19 ~ App ~ state", state.basket)
  
  return (
    <AppContext.Provider value={state}>
      <BrowserRouter>
        <header>
          <NavHome/>
        </header>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/pageduproduit/:id'>
            <ProduitParID />
          </Route>
          <Route exact path='/monPanier'>
            <MonPanier/>
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
