/*
1. Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте,
какие методы понадобятся для работы с этими сущностями.

2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
*/
class GoodsList {
    constructor(container = '.goods') {
        this.container = container;
        this.goods = [];
        this._fetchGoods();
        this._render();
        this._fullPrice();
    }

    _fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 1000},
            {id: 2, title: 'Mouse', price: 100},
            {id: 3, title: 'Keyboard', price: 250},
            {id: 4, title: 'Gamepad', price: 150},
        ]
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let good of this.goods) {
            const goodsObject = new GoodItem(good);
            block.insertAdjacentHTML('beforeend', goodsObject.render())
        }
    }
    _fullPrice(){
        let price = 0;
        for (let good of this.goods){
            price += good.price;
        }
        console.log(price)
    }
}

class GoodItem {
    constructor(good, img = '') {
        this.title = good.title;
        this.price = good.price;
        this.id = good.id;
        this.img = img;
    }

    render() {
        return `<div class="good-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}
class Cart {
    constructor() {
        this.cartGoods = [];
        this._addtoCart();
    }
    _addtoCart(){

    }
}
const list = new GoodsList();

