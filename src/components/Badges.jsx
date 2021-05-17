import {ShoppingOutlined} from '@ant-design/icons';
import React from "react";

function Badges ({number}) {

return  (
    <div className="badgesNavPanier">
        {/* <Icon type="shopping-cart" style={{ fontSize: 16, color: '#08c' }}/> */}
        <div id="shoppingCartOutlined">
            <ShoppingOutlined id="shoppingCartOutlined2"/>
        </div>
        <div id="numberForNavPanier">
            {number}
        </div>
    </div>
    );
} 

export default Badges;
