import React, {createContext} from 'react';

export const AppContext = createContext({
    basket: [],
    voucherRate: null,
    addToBasket: (productCode) => {},
    removeToBasket: (productCode) => {},
    clearBasket: (voucherRate) => {}
});