Vue.component('product', {
    data() {
        return {
            prodItems: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                if (data) {
                    for (let el of data) {
                        this.prodItems.push(el);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
    },
    template: `
      <div class="fetured__list">
        <div class="fetured__list__product" v-for="item of prodItems" :key="item.id">
          <img class="fetured__list__product_img" :src="item.img">
          <div class="fetured__list__product__text">
            <a href="/product.html" class="fetured__list__product__text__name">{{ item.name }}</a>
            <a href="/product.html" class="fetured__list__product__text__price">$ {{ item.price }}<img
                src="style/img/star.png"
                alt="stars"></a>
          </div>
          <button class="fetured__list__product__add" @click="$root.$refs.cart.addProduct(item)">Add to Cart</button>
        </div>
      </div>
    `
})

Vue.component('prog-page', {
    data() {
        return {
            item: {
                //Можно парсить из базы
                id: 500,
                color: 'Red',
                size: 'M',
                quantity: 1,
                price: 561,
                name: 'Moschino Cheap And Chic'
            },
        }
    },
    template: `
      <div class="prod_slider">
        <div class="prod_slider__left"><a href="#"><i class="prod_slider__left__arrow fa-solid fa-angle-left"></i></a>
        </div>
        <img class="prod_slider__img" src="style/img/prod_img.jpg" alt="promo_img">
        <div class="prod_slider__right"><a href="#"><i class="prod_slider__left__arrow fa-solid fa-angle-right"></i></a>
        </div>
        <div class="prod_info">
          <h3>WOMEN COLLECTION</h3>
          <div class="prod_info_line"></div>
          <h2>{{ item.name }}</h2>
          <p>Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate
            collaborative architectures before cutting-edge services. Completely visualize parallel core competencies
            rather
            than exceptional portals.</p>
          <section class="prod_info_block">
            <h4>MATERIAL:<span> COTTON</span></h4>
            <h4>DESIGNER:<span> BINBURHAN</span></h4>
          </section>
          <h2 class="prod_price">$ {{ item.price }}</h2>
          <div class="prod_line_long"></div>
          <form class="prod_characteristic">
            <div class="juctcont">
              <div class="prod_characteristic_color">
                <h4>CHOOSE COLOR</h4>
                <select class="prod_characteristic_color_menu" v-model="item.color">
                  <option value="" disabled selected>Color</option>
                  <option class="Red">Red</option>
                  <option>Pink</option>
                </select>
              </div>
              <div class="prod_characteristic_size">
                <h4>CHOOSE SIZE</h4>
                <select class="prod_characteristic_size_menu" v-model="item.size">
                  <option value="" disabled selected>Size</option>
                  <option>XXL</option>
                  <option>XL</option>
                  <option>L</option>
                  <option>M</option>
                  <option>S</option>
                  <option>XS</option>
                </select>
              </div>
              <div class="prod_characteristic_quanity">
                <h4>QUANTITY</h4>
                <input class="prod_characteristic_quanity_input" type="number" min="1" max="10" v-model="item.quantity">
              </div>
            </div>
            <button class="to_cart" @click="$root.$refs.cart.addProduct(item)">Add to Cart</button>
          </form>
        </div>
      </div>`
})

Vue.component('prod-recom', {
    data() {
        return {
            items: {
                prod1: {
                    id: 981,
                    img: 1,
                    name: 'Mango People T-shirt',
                    price: 52
                },
                prod2: {
                    id: 982,
                    img: 2,
                    name: 'Mango People T-shirt',
                    price: 52
                },
                prod3: {
                    id: 983,
                    img: 3,
                    name: 'Mango People T-shirt',
                    price: 52
                },
                prod4: {
                    id: 984,
                    img: 4,
                    name: 'Mango People T-shirt',
                    price: 52
                }
            }

        }
    },
    template: `
      <div class="recomend_items">
        <div class="fetured__list__product" v-for="item of items">
          <div class="fetured__list__product__flex">
            <img class="fetured__list__product_img" :src="'style/img/prod_items' + item.img + '.png' "
                 style="width: auto">
          </div>
          <div class="fetured__list__product__text">
            <a href="product.html" class="fetured__list__product__text__name">{{ item.name }}</a>
            <a href="product.html" class="fetured__list__product__text__price">$ {{ item.price }} <img
                src="style/img/star.png"
                alt="stars"></a>
          </div>
          <button class="fetured__list__product__add" @click="$root.$refs.cart.addProduct(item)">Add to Cart</button>
        </div>
      </div>
    `
})
Vue.component('products-page-items', {
    props: ['prodItems'],
    template: `
      <div class="products-page__list">
        <div class="fetured__list__product products-page__list__product" v-for="item of prodItems" :key="item.id">
          <img class="fetured__list__product_img" :src="item.img">
          <div class="fetured__list__product__text">
            <a href="/product.html" class="fetured__list__product__text__name">{{ item.name }}</a>
            <a href="/product.html" class="fetured__list__product__text__price">$ {{ item.price }}<img
                src="style/img/star.png"
                alt="stars"></a>
          </div>
          <button class="fetured__list__product__add" @click="$root.$refs.cart.addProduct(item)">Add to Cart</button>
        </div>
      </div>
    `
})
Vue.component('product-page', {
    data() {
        return {
            prodItems: [],
            filteredItems: [],
            renderProdItems: [],
            minPrice: 0,
            maxPrice: 0,
            input1: 0,
            input2: 0,
            countShow: 9,
            sortType: 'none',
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                if (data) {
                    for (let el of data) {
                        this.prodItems.push(el);
                    }
                }
                this.calculateMinMax();
                this.filterPrice()
                this.showBlocks()
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
    },
    methods: {
        calculateMinMax() {
            this.minPrice = Math.min(...this.prodItems.map(item => item.price));
            this.maxPrice = Math.max(...this.prodItems.map(item => item.price));
            this.input1 = this.minPrice;
            this.input2 = this.maxPrice;
        },
        filterPrice() {
            let minInput = Math.min(this.input1, this.input2);
            let maxInput = Math.max(this.input1, this.input2);
            this.filteredItems = this.prodItems.filter(item => item.price >= minInput && item.price <= maxInput);
            this.sortBy()
            this.showBlocks()
        },
        changeSortType(event) {
            this.sortType = event.target.value;
            this.sortBy()
        },
        sortBy() {
            if (this.sortType === "Name") {
                this.filteredItems.sort((a, b) => a.name > b.name ? 1 : -1);
            }
            if (this.sortType === "Price") {
                this.filteredItems.sort((a, b) => a.price > b.price ? 1 : -1);
            }
            this.showBlocks();
        },
        countBlockchange(event){
            this.countShow = event.target.value;
            this.showBlocks()
        },
        showBlocks(event) {
            this.renderProdItems = this.filteredItems.slice(0, this.countShow);        }
    },
    template: `
      <div class="products__container">
        <div class="products__container__filter">
          <div class="products__container__filter__types">
            <div class="products__container__filter__types__trending">
              <h2>TRENDING NOW</h2>
              <p><a href="#"> Bohemian</a> &ensp;|&ensp; <a href="#"> Floral</a> &ensp;|&ensp; <a href="#">
                Lace</a> <br>
                <a href="#"> Floral</a> &ensp;|&ensp; <a href="#"> Lace</a> &ensp;|&ensp; <a href="#">
                  Bohemian</a></p>
            </div>
            <div class="products__container__filter__types__size">
              <h2>SIZE</h2>
              <div class="products__container__filter__types__size__inputs">
                <input type="checkbox">
                <p>XXS</p> <input type="checkbox">
                <p>XS</p> <input type="checkbox">
                <p>S</p> <input type="checkbox">
                <p>M</p>
                <input type="checkbox">
                <p>L</p> <input type="checkbox">
                <p>XL</p> <input type="checkbox">
                <p>XXL</p>
              </div>
            </div>
            <div class="products__container__filter__types__price">
              <h2>PRICE</h2>
              <div style="margin-top: 10px; display: flex">
                <input type="range" id="myRange" name="myRange" :min="minPrice" :max="maxPrice"
                       value="{{minPrice}}" v-model=input1 @input="filterPrice">
                <p style="margin-left: 10px;">{{ input1 }}</p>
              </div>
              <div style="margin-top: 10px; display: flex">
                <input type="range" id="myRange" name="myRange" :min="minPrice" :max="maxPrice"
                       value="{{maxPrice}}" v-model=input2 @input="filterPrice">
                <p style="margin-left: 10px;">{{ input2 }}</p>
              </div>
              <div class="products__container__filter__types__price__numbers">
                <p>$ {{ minPrice }}</p>
                <p>$ {{ maxPrice }}</p>
              </div>
            </div>
          </div>
          <div class="products__container__filter__sort">
            <p>Sort By</p>
            <select @change="changeSortType">
              <option disabled="" selected="">sort</option>
              <option value="Name">Name</option>
              <option value="Price">Price</option>
            </select>
            <p>Show</p>
            <select @change="countBlockchange">
              <option selected="" value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>
          </div>
        </div>
        <div class="products__container__content">
          <products-page-items ref="productsPageItems" :prodItems="renderProdItems"></products-page-items>
        </div>
        <div class="products__container__footer">
          <div class="products__container__footer__page">
            <img src="style/img/arrow-left.png" alt="arrow-left-products-page">
            <p>
              <span>1</span>&emsp; <a href="#">2</a>&emsp; <a href="#">3</a>&emsp; <a href="#">4</a>&emsp;
              <a href="#">5</a>&emsp; <a href="#">6</a>.....<a href="#">20</a>
            </p>
            <img src="style/img/arrow-right_pink.png" alt="arrow-right-products-page">
          </div>
          <a href="#" class="products__container__footer__view">View All</a>
        </div>
      </div>
    `
})