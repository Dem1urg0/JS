'use strict'
/*
2. Реализовать модуль корзины. У каждого товара есть кнопка «Купить», при нажатии на которую
происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать
общую сумму заказа. Один товар можно добавить несколько раз.
 */
let basket = {
    options: {
        buttonMouse: document.getElementById('mouse_button'),
        buttonKeyboard: document.getElementById('keyboard_button'),
        buttonPencil: document.getElementById('pencil_button'),
        bucket: document.getElementById('bucket'),
    },

    addProduct(button) {
        let price = button.target.dataset['price'];
        const bucket = this.options.bucket;
        bucket.textContent = +bucket.textContent + +price;
    },
}
const mouse = basket.options.buttonMouse;
mouse.onclick = mouse => basket.addProduct(mouse);

const keyboard = basket.options.buttonKeyboard;
keyboard.onclick = keyboard => basket.addProduct(keyboard);

const pencil = basket.options.buttonPencil;
pencil.onclick = pencil => basket.addProduct(pencil);