import React, { useContext } from 'react';
import Cards from './Cards';
import {productDatabase} from '../lib/database.js';

function Home () {
    let carte = productDatabase
                .map((UneCarte, key) =>
                    <Cards
                        key = {key}
                        productCode = {UneCarte.productCode}
                        typeImage = {UneCarte.imageType}
                        description = {UneCarte.description}
                        price = {UneCarte.unitPrice}
                    />
                )
    // console.log("🚀 ~ file: Home.jsx ~ line 16 ~ Home ~ carte", carte);

    return (
        <div id="leHome">
            {carte}
        </div>
    );
} 

export default Home;
