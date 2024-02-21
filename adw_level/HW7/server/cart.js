const add = (cart, req) => {
    cart.contents.push(req.body);
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};
const change = (cart, req) => {
    console.log(req)
    const find = cart.contents.find(el => el.id_product === +req.params.id); // находим в корзине такой же товар как в request
    find.quantity += req.body.quantity;
    return { name: find.product_name, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * Добавили новый метод удаления
 * @param cart
 * @param req
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return { name: find.product_name, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};
