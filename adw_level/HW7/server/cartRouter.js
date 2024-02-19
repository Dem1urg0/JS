const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => { // /api/cart/
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  handler(req, res, 'add', './server/db/userCart.json');
});
// https://some_url/api/cart/123 // req.params.id
// https://some_url/api/cart/?var1='sfsf'&var2='ada' // req.query
// https://some_url/api/cart/?limit=100
router.put('/:id', (req, res) => {
  handler(req, res, 'change', './server/db/userCart.json');
});
router.delete('/:id', (req, res) => {
  handler(req, res, 'remove', './server/db/userCart.json')
});

module.exports = router;
