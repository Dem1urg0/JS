const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    fs.readFile('db/orders.json', 'utf-8', (err, data) => {
        if (err) {
            res.send({result: 404, text: err});
        } else {
            data.products.push(req.body);
            let newList = JSON.stringify(data, null, 4);
            fs.writeFile('db/orders.json', newList, (err) => {
                if (err) {
                    res.send({result: 404, text: err});
                } else {
                    res.send({result: 200, text: 'ok'});
                }
            })
        }
    })
});

module.exports = router;