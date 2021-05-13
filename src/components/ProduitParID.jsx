import { useParams } from "react-router";
import { findProduct } from '../lib/database.js';
// import Slider from "react-slick";
import {Carousel} from '3d-react-carousal';

function ProduitParID ({}) {

    const { id } = useParams();

    let recupParId = findProduct(id);

    const {carousel, stock, description, imageType, productCode, unitPrice } = recupParId;

    let slide1 = carousel.map((e,i) => <img className="w-50" src={`/images/${e}`} alt={i} />);

    var settings = {
        slides: slide1,
        autoplay: true,
        interval: 2500
    };

    let ImageOuCarousel = carousel.length === 1 ?
    <div id="imageOuCarousel">
        <div className="myImage">
            <img
                className="img-fluid monImage"
                src={`/images/${productCode.toLowerCase()}.${imageType}`}
                alt={`Card image cap1 dans ${productCode}`}
            />
        </div>
    </div>
    :
        <Carousel {...settings} />
    
    return (
        <div className="imageParProduit">
            {ImageOuCarousel}
            <div id="detailsProduct">
                <ul>
                    <li><b>productCode :</b> {productCode}</li>
                    <li><b>description :</b> {description}</li>
                    <li><b>prix :</b> {unitPrice} € </li>
                    <li><b>stock :</b> {stock} </li>
                </ul>
            </div>
        </div>
    );
} 

export default ProduitParID;
