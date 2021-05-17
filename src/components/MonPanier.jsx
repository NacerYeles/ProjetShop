import React, { Component, Fragment, useContext } from 'react';
import { AppContext } from '../AppContext';
import { voucherDatabase } from '../lib/database.js';
import {CaretUpFilled, PlusCircleOutlined, CaretDownFilled} from '@ant-design/icons';
import {MinusCircleOutlined} from '@ant-design/icons';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {CloseOutlined} from '@ant-design/icons';
import { object } from 'prop-types';
// import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IqFjbA63wM1b1YS01FD2kW7XNGSEKfHCRFFtl6L4rYGPLCyraYOInNz7HHdJ28ZvnCwm5SPyhptBgdfJNxWsBYF00haJyNuH0');

const axios = require('axios');

export default class MonPanier extends Component {
    static contextType = AppContext;// nous permet d'appeler le context via this.context

    state = {
        PrixTotal: 0,
        couponReduction: ''
        // totalWhenApplyCoupon: 0
    }
    // tableauDesPrixTotal = [];
    totalAmount = [];
    poucentage20 = 20;
    totalTVA = [];
    totalWhenApplyTVA = [];
    trAndTdCoupon = [];
    ErreurCoupon = [];
    // totalWhenApplyCoupon = [];

    handleChange = event => {
        const couponReduction = event.target.value
        this.setState({ couponReduction })
    }

    calculeDuPrixTotal = (toto) => {
        console.log('toto : ', toto);
        if(toto.length !== 0){
            let ParseToInt  = toto.map(e => parseFloat(e));
            this.totalAmount = ParseToInt.reduce((e,i) => e + i).toFixed(2);
            this.totalTVA = parseFloat((this.poucentage20 * this.totalAmount) / 100);
            this.totalWhenApplyTVA = (parseFloat(this.totalAmount) + parseFloat((20 * this.totalAmount) / 100)).toFixed(2);
        }
    }

    clearCoupon = () => {
        this.setState({
            couponReduction:''
        })
        this.context.clearVoucher();
    }

    axiosRequest = async () => {

        const stripe = await stripePromise;

        // // Call your backend to create the Checkout Session
        // // const response = await fetch('/create-checkout-session', { method: 'POST'})

        await axios.post('/create-checkout-session', {basket  : this.context.basket})
        .then(async response => {
            stripe.redirectToCheckout({
                sessionId: response.data.id,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    totoaxiosRequest = async () => {
        try {
            const response = await axios.get('/toto54');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    render() {

            console.log('TOTOTOTOTOTOTOTOTOTO : ', this.context.voucherRate);
            console.log('TOTOTOTOTOT55555555OTOTOTOTO : ', this.context.basket);
            
            // let LaSommeTotalAvecReduce = 0;
            let tableauDesPrixTotal = [];
            let filtrerQuandQuantityEgaleAzero = this.context.basket.filter(e => e.quantity !== 0);
            let trAndtd = this.context.basket.map((UnProduit, key) => 
            {
                tableauDesPrixTotal.push(Number.parseFloat(this.context.basket[key].unitPrice * this.context.basket[key].quantity).toFixed(2));
                return (
                    <tr id={key}>
                    <td>
                        <div className="imageAndTitlePanier">
                            <img className="img-fluid imagePagePanier"
                                src={`images/${UnProduit.carousel}`}
                                alt={`Card image cap1 dans ${UnProduit.productCode}`}/>
                            {/* <p>{UnProduit.productCode}</p> */}
                        </div>
                    </td>
                    <td>{UnProduit.description}</td>
                    <td>
                        <div className="btnPlusAndMoinsAndNumber">
                            <p>{UnProduit.quantity}</p>
                            <div className="btnPlusAndMoins">
                                <button onClick={() =>{this.context.addToBasket(UnProduit.productCode);}} id="plusListe">
                                    <CaretUpFilled />
                                </button>
                                <button onClick={() => {this.context.removeToBasket(UnProduit.productCode, key);}} id="moinsListe">
                                    <CaretDownFilled />
                                </button>
                            </div>
                        </div>
                    </td>
                    <td>{UnProduit.unitPrice} €</td>
                    <td>{Number.parseFloat(this.context.basket[key].unitPrice * this.context.basket[key].quantity).toFixed(2)} €</td>
                    <td>
                        <button onClick={() => {this.context.deleteAllproduct(UnProduit.productCode, key)}}  id="deleteListe">
                            <CloseOutlined />
                        </button>
                    </td>
                </tr>
                )
            }
            )

            this.calculeDuPrixTotal(tableauDesPrixTotal);

            if(this.context.voucherRate !== null){
                let reduc = (this.context.voucherRate * this.totalWhenApplyTVA);
                this.trAndTdCoupon = <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Montant total apres calcule de votre coupon:</strong> </td>
                                        <td>{(this.totalWhenApplyTVA - reduc).toFixed(2)} €</td>
                                    </tr>
            }else{
                this.trAndTdCoupon = []
            }


        if(this.context.basket.length === 0){
            return (
                <div id="laPagePanierQuiEstVide">
                    <h1>Votre panier est vide</h1>
                    <ShoppingCartOutlined  style={{fontSize: '3.5vw'}} />
                </div>
            )
        }else{
            return (
                <Fragment>
                    <div id="laPagePanier">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Titre</th>
                                    <th>Quantité</th>
                                    <th>Prix Unitaire</th>
                                    <th>Prix total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.context.basket.length === 0 ? '' : trAndtd}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Montant total HT: </strong></td>
                                    <td>{this.totalAmount} €</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>TVA(20%): </td>
                                    <td>+ {this.totalTVA} €</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Montant total TTC:</strong> </td>
                                    <td>{this.totalWhenApplyTVA} €</td>
                                </tr>
                                {this.trAndTdCoupon}
                            </tbody>
                        </table>
                        <div className='couponAndBtnBox'>
                            <div className="coupon w-100">
                                {this.context.voucherRate === null ?
                                <Fragment>
                                    <input
                                    id="inputAddCoupon"
                                    type='text'
                                    value={this.state.couponReduction}
                                    onChange={this.handleChange}
                                    placeholder='Entre ton Coupon'
                                    pattern='[A-Za-z-]{1,}'
                                    maxLength="20"
                                    required />
                                    <button onClick={() => this.context.editVoucherRate(this.state.couponReduction)} id="goReduc">GO</button>
                                    {this.context.ErreurCoupon === null ? <p>Entre ton coupon de réduction.</p> : this.context.ErreurCoupon}
                                </Fragment>
                                :
                                <Fragment>
                                    <input
                                    id="inputDeleteCoupon"
                                    type='text'
                                    value={this.state.couponReduction}
                                    onChange={this.handleChange}
                                    placeholder='Coupon'
                                    pattern='[A-Za-z-]{1,}'
                                    maxLength="20"
                                    required />
                                    <button onClick={() => this.clearCoupon()} id="suppReduc">X</button> 
                                    <p>Supprime ton coupon de réduction.</p>
                                </Fragment>
                                }
                            </div>
                            <div className="buttonPaye w-75">
                                <button className="btn btn-primary w-75" id="button-paiement-stripe" onClick={() => this.axiosRequest()}>PAYER</button>
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={() => this.totoaxiosRequest()}>toto Paiement</button> */}
                </Fragment>
            );   
        }
    }
}
