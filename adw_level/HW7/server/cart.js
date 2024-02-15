const add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id); // находим в корзине такой же товар как в request
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove,
};
