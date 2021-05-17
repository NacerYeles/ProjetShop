import React, {createContext} from 'react';

export const AppContext = createContext({
    basket: [],
    ErreurCoupon: null,
    voucherRate: null,
    addToBasket: (productCode) => {},
    removeToBasket: (productCode) => {},
    clearBasket: (voucherRate) => {}
});