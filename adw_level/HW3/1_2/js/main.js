'use stirck'

/*
1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
Убрал makegetrequest тк он не нужен
2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара
из корзины и получения списка товаров корзины.
3. Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в
обработчике этого промиса.
*/

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

//1 Задание переделать

class ProductList {
    //3 Задание готово
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this._render();
            });
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }


    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
    }

    _fullPrice() {
        let price = 0;
        for (let good of this.goods) {
            price += good.price;
        }
        console.log(price)
    }
}

class ProductItem {
    constructor(product, img = '') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="good-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
        //кнопка вызывает метод купить
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }

    //_addtoCart() {

   // }
}

//2 Задание
class Cart {
    constructor() {
        this.cartGoods = [];
    }

    _deleteItem() {

    }
}

const list = new ProductList();

