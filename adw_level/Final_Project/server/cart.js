const add = (cart, req) => {
    cart.products.push(req.body);
    return JSON.stringify(cart, null, 4);
}
const change = (cart, req) => {
    console.log(req)
    const find = cart.products.find(el => el.id === +req.params.id);
    console.log(find)
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
}

const remove = (cart, req) => {
    const find = cart.products.find(el => el.id === +req.params.id);
    cart.products.splice(cart.products.indexOf(find), 1);
    return JSON.stringify(cart, null, 4);
}
module.exports = {
    add,
    change,
    remove
}