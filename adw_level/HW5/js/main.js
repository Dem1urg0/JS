/*
1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода.
На кнопку Искать добавить обработчик клика, вызывающий метод FilterGoods.
2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
3. * Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.
 */

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        productsFiltered: [],
        cartList: [],
        isVisibleCart: false,
        onCart404: true,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        /**
         * @param product - Метод получает на вход товар котрый хотят добавить в карзину
         * Мы проверяем если такой тавор в корзине и если есть увеличиваем кол-во
         * если нет то добавляет
         */
        addProduct(product) {
            if (this.cartList.includes(product)) {
                for (let productCart of this.cartList) {
                    if (product.id_product === productCart.id_product) {
                        product.quantity = productCart.quantity + 1
                    }
                }
                this.cartList = this.cartList.filter((item) => item !== product);
                this.cartList.push(product);
            } else {
                product.quantity = 1;
                this.cartList.push(product);
            }
        },
        /**
         * @param title - Метод получает текст из строки поиска
         * Проверяем на пустоту и далее проверяем по нижнему регистру есть ли такой текст в массиве товаров
         * Записываем полученные товары в массив который выводим
         * При новой итерации обновляем список товаров на дефолтный
         */
        filterGoods(title = this.searchLine) {
            this.productsFiltered = this.products
            let buffer = []
            if (title !== '') {
                for (let product of this.products) {
                    if ((product.product_name.toLowerCase()).includes(title.toLowerCase())) {
                        buffer.push(product)
                    }
                }
                if (buffer.length !== 0) {
                    this.productsFiltered = buffer
                }
            }
        },
        /**
         * Проверяем видна ли корзина и переключаем ее
         */
        openCart() {
            let cart = document.getElementById('cart')
            if (this.isVisibleCart) {
                this.isVisibleCart = false;
                cart.classList.toggle('hidden')
            } else {
                this.isVisibleCart = true;
                cart.classList.toggle('hidden')
            }
        },
        /**
         * @param productCart - товар который удаляем
         * Проверяем кол-во товара если больше одного то уменьшаем на 1
         * если = 1 то удаляем из массива
         */
        deleteFromCart(productCart) {
            if (productCart.quantity === 1) {
                this.cartList = this.cartList.filter((item) => item.id_product !== productCart.id_product);
            } else {
                const index = this.cartList.findIndex(item => item.id_product === productCart.id_product);
                if (index !== -1) {
                    this.$set(this.cartList, index, { ...productCart, quantity: productCart.quantity - 1 });
                }
            }
        },
        /**
         * Проверяет пуста ли карзина
         * если пуста вкл картинку, если нет то выкл
         */
        isCartEmpty(){
            img = document.getElementById('404')
           if (this.cartList.length === 0 && !this.onCart404){
                img.classList.toggle('hidden');
                this.onCart404 = true;
           } else if (this.cartList.length !== 0 && this.onCart404){
               img.classList.toggle('hidden');
               this.onCart404 = false;
           }

        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.productsFiltered = this.products
            });
    }
});
