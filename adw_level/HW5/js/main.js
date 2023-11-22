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
    productsFiltered:[],
  },
  methods: {
    getJson(url) {
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
    },
    addProduct(product) {
      console.log(product.id_product);
    },
    filterGoods(title = this.searchLine) {
      this.productsFiltered = this.products
      let buffer = []
      if (title !== ''){
        for (let product of this.products) {
          if ((product.product_name.toLowerCase()).includes(title.toLowerCase())) {
            buffer.push(product)
          }
        }
        if (buffer.length !== 0){
          this.productsFiltered = buffer
        }
      }
    },
  },
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
        this.productsFiltered = this.products
      });
  }
});
