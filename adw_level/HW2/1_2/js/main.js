class GoodsList {
    constructor(container = '.goods') {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this._fetchGoods();
        this._render();
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
            this.allGoods.push(goodsObject);
            block.insertAdjacentHTML('beforeend', goodsObject.render())
        }
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

const list = new GoodsList();

