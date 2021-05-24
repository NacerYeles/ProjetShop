const stripe = require('stripe')('sk_test_51IqFjbA63wM1b1YSzEoA9uO7mN6JY0oguTLlbonfnDylgxxNcOvEWEVFXI9ScaejuN2FjdccXTgv0CS4p8zYoThh00Lihm00Uu')

let images = {
    "opm": { image: "https://i.ibb.co/cTxSSDb/opm.jpg"},
    "fma": { image: "https://i.ibb.co/5x65s2j/fma.jpg"},
    "sky": { image: "https://i.ibb.co/XLZn4bG/sky.jpg"},
    "swt": { image: "https://i.ibb.co/BV9Zz9R/swt.jpg"},
    "dbz": { image: "https://i.ibb.co/28CjVkt/dbz.jpg"}
};

module.exports = async (req, res) => {
        console.log('req.body ==========>', req.body);

        console.log('parseInt(req.body.promo) =====> ', req.body.voucherRate);

        let mesItems = [];
        req.body.basket.map(e => {
            let monImage = [];
            if(images[e.productCode.toLowerCase()]){
                monImage.push(images[e.productCode.toLowerCase()].image)
            }
        return mesItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                    name: e.productCode,
                    images: monImage 
                    },
                    unit_amount: e.unitPrice * 100,
                    },
                    quantity: e.quantity
            })
        })

        const sessionWithoutCoupon = {
            payment_method_types: ['card'],
            line_items: mesItems,
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'http://localhost:3000/monPanier',
        }

        if(req.body.voucherRate !== null){
            const coupon = await stripe.coupons.create({
                percent_off: req.body.voucherRate * 100 ,
                duration: 'once',
            });
            sessionWithoutCoupon.discounts = [{
                coupon: coupon.id
            }]
        }

        const session = await stripe.checkout.sessions.create(sessionWithoutCoupon);
        
        res.json({ id: session.id });
}