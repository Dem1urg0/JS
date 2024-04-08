Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
            totalPrice: 0,
        }
    },
    methods: {
        addProduct(product) {
            const find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                find.quantity++;
                this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .catch(error => {
                        console.error('Error:', error);
                        find.quantity--;
                    });
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.cartItems.push(prod);
                this.$parent.postJson('/api/cart', prod)
                    .catch(error => {
                        console.error('Error:', error);
                        this.cartItems.slice(this.cartItems.indexOf(prod), 1);
                    });
            }
            this.total()
        },
        remove(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.$parent.putJson(`/api/cart/${item.id}`, {quantity: -1})
                    .catch(error => {
                        console.error('Error:', error);
                        item.quantity++;
                    });
            } else {
                const index = this.cartItems.indexOf(item);
                this.cartItems.splice(index, 1);
                this.$parent.deleteJson(`/api/cart/${item.id}`)
                    .catch(error => {
                        console.error('Error:', error);
                        this.cartItems.splice(index, 0, item);
                    });
            }
            this.total()
        },
        total() {
            this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                if (data && data.products) {
                    for (let el of data.products) {
                        this.cartItems.push(el);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
    },
    template: `
      <div class="cart_menu">
        <img class="cart" src="style/img/cart.svg" alt="cart" @click="showCart= !showCart">
        <div class="drop drop__cart" v-if="showCart">
          <div class="drop__browse__flex">
            <ul class="drop__menu">
              <cart-item v-for="item of cartItems" :cart-item="item" :key="item.id" ref="cart-item"
                         @remove="remove"></cart-item>
            </ul>
          </div>
          <div class="drop__cart__price">
            <h3>Total</h3>
            <h3>{{ totalPrice }}</h3>
          </div>
          <a href="Checkout.html">
            <button class="drop__cart__button1">Checkout</button>
          </a>
          <a href="Shopping%20Cart.html">
            <button class="drop__cart__button2">Go to cart</button>
          </a>
        </div>
      </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
      <li class="drop__cart__items">
        <div class="drop__cart__items__info">
          <a href="product.html"><img src="style/img/cart__item1.jpg" alt="item"></a>
          <div class="drop__cart__items__info__text">
            <a href="product.html"><h3>{{ cartItem.name }}</h3></a>
            <a href="product.html"><img src="style/img/star.png" alt="stars_cart"></a>
            <p>Price:{{ cartItem.price }}</p>
            <p>Count:{{ cartItem.quantity }}</p>
          </div>
        </div>
        <img class="close" src="style/img/close.png" alt="close" @click="$emit('remove',cartItem)">
      </li>
    `
});

Vue.component('cart-page-items', {
    data() {
        return {
            cartItems: [],
            totalPrice: 0,
            previousQuantity: 0,
        }
    },
    mounted() {
        this.$root.getJson(`/api/cart`)
            .then(data => {
                if (data && data.products) {
                    for (let el of data.products) {
                        this.cartItems.push(el);
                    }
                }
                this.total()
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
    },
    methods: {
        addProd(product) {
            const find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                find.quantity++;
                this.$root.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .catch(error => {
                        console.error('Error:', error);
                        find.quantity--;
                    });
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.cartItems.push(prod);
                this.$root.postJson('/api/cart', prod)
                    .catch(error => {
                        console.error('Error:', error);
                        this.cartItems.slice(this.cartItems.indexOf(prod), 1);
                    });
            }
            this.total()
        },
        remProd(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.$root.putJson(`/api/cart/${item.id}`, {quantity: -1})
                    .catch(error => {
                        console.error('Error:', error);
                        item.quantity++;
                    });
            } else {
                const index = this.cartItems.indexOf(item);
                this.cartItems.splice(index, 1);
                this.$root.deleteJson(`/api/cart/${item.id}`)
                    .catch(error => {
                        console.error('Error:', error);
                        this.cartItems.splice(index, 0, item);
                    });
            }
            this.total()
        },
        deleteProd(item) {
            const index = this.cartItems.indexOf(item);
            this.cartItems.splice(index, 1);
            this.$root.deleteJson(`/api/cart/${item.id}`)
                .catch(error => {
                    console.error('Error:', error);
                    this.cartItems.splice(index, 0, item);
                });
            this.total()
        },
        total() {
            this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            this.$emit('totalChanged', this.totalPrice)
        },
    },

    template: `
      <div>
        <div v-for="item of cartItems" :key="item.id">
          <div class="products__item">
            <img class="products__item__img" style="width: 100px; height: 115px;" :src=item.img>
            <div class="products__item__name">
              <h2>{{ item.name }}</h2>
              <p><b>Color:</b> &ensp;{{ item.color }} <br>
                <b>Size:</b> &ensp;{{ item.size }} </p>
            </div>
            <p class="products__item__uprice">$ {{ item.price }}</p>
            <p class='products__item__quantity'>
              <button class="products__item__quantity__button" @click="addProd(item)">+</button>
              {{item.quantity}}
              <button class="products__item__quantity__button" @click="remProd(item)">-</button>
            </p>
            <p class="products__item__shipping">FREE</p>
            <p class="products__item__sprice">{{ item.price * item.quantity }}</p>
            <div class="products__item__button__box">
              <button class="products__item__action" @click=""><img
                  class="products__item__actionimg" src="style/img/close.png" alt="close" @click="deleteProd(item)">
              </button>
            </div>
          </div>
          <div class="line"></div>
        </div>

      </div>
    `
})
Vue.component('cart-page', {
    data() {
        return {
            totalPrice: 0,
        }
    },
    methods:{
        totalChanged(total) {
            this.totalPrice = total
        }
    },
    template: `
      <div>
        <section class="products container">
          <div class="products__detail">
            <p>product details</p>
            <p>unite Price</p>
            <p>Quantity</p>
            <p>shipping</p>
            <p>Subtotal</p>
            <p>ACTION</p>
          </div>
          <div>
            <div class="line"></div>
            <cart-page-items ref="cart-page-items" @totalChanged="totalChanged"></cart-page-items>
          </div>
        </section>
        <section class="info container">
          <div class="info__shipping-adress">
            <h2>SHIPPING ADRESS</h2>
            <select>
              <option value="значение1">Bangladesh</option>
              <option value="значение2">Пункт 2</option>
              <option value="значение3">Пункт 3</option>
            </select>
            <input type="text" placeholder="State">
            <input type="text" placeholder="Postcode / Zip">
            <button>GET A QUOTE</button>
          </div>
          <div class="info__discount">
            <h2>COUPON DISCOUNT</h2>
            <p>Enter your coupon code if you have one</p>
            <input type="text" placeholder="Code">
            <button>APPLY COUPON</button>
          </div>
          <div class="info__total-price">
            <div class="info__total-price__sub">
              <p>SUB TOTAL</p>
              <p>{{ totalPrice }}</p>
            </div>
            <div class="info__total-price__grand">
              <h2>GRAND TOTAL</h2>
              <p>{{ totalPrice }}</p>
            </div>
            <div class="info__total-price__line"></div>
            <a href="Checkout.html"><button>proceed to checkout</button></a>
          </div>
        </section>
      </div>
    `
})

