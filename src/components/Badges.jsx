import {ShoppingOutlined} from '@ant-design/icons';
import React from "react";
import { Link } from 'react-router-dom';
import PopUpPanier from './PopUpPanier';

function Badges ({number}) {

return  (
    <Link onClick={() => alert('coucou')  }>
        <div className="badgesNavPanier">
            <div id="shoppingCartOutlined">
                <ShoppingOutlined id="shoppingCartOutlined2"/>
            </div>
            <div id="numberForNavPanier">
                {number}
            </div>
        </div>
    </Link>
    );
} 

export default Badges;
