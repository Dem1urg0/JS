const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    fs.readFile('./server/db/orders.json', 'utf-8', (err, data) => {
        if (err) {
            res.send({result: 404, text: err});
        } else {
            let orders = JSON.parse(data);
            fs.readFile('./server/db/cart.json', 'utf-8', (err, data) =>{
                if (err) {
                    res.send({result: 404, text: err});
                } else {
                    let cart = JSON.parse(data);
                    req.body.cart = cart;
                    orders.push(req.body);
                    let newOrders = JSON.stringify(orders, null, 4);
                    fs.writeFile('./server/db/orders.json', newOrders, (err) => {
                        if (err) {
                            res.send({result: 404, text: err});
                        } else {
                            res.send({result: 200, text: 'ok'});
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;