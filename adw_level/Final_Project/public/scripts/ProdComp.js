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
                    img: 1,
                    name: 'Mango People T-shirt',
                    price: 52
                },
                prod2: {
                    img: 2,
                    name: 'Mango People T-shirt',
                    price: 52
                },
                prod3: {
                    img: 3,
                    name: 'Mango People T-shirt',
                    price: 52
                },
                prod4: {
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