const fs = require('fs');
const cart = require('./cart');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};
const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.send({result: 404, text: err});
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send({result: 404, text: err});
                } else {
                    res.send({result: 200, text: 'ok'});
                }
            })
        }
    } )
}

module.exports = handler;
