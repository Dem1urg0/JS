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
                this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    });
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
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
        <img class="cart" src="html/img/cart.svg" alt="cart" @click="showCart= !showCart">
        <div class="drop drop__cart" v-if="showCart">
          <div class="drop__browse__flex">
            <ul class="drop__menu">
              <cart-item v-for="item of cartItems" :cart-item="item" :key="item.id" ref="cart-item" @remove="remove"></cart-item>
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
          <a href="product.html"><img src="html/img/cart__item1.jpg" alt="item"></a>
          <div class="drop__cart__items__info__text">
            <a href="product.html"><h3>{{ cartItem.name }}</h3></a>
            <a href="product.html"><img src="html/img/star.png" alt="stars_cart"></a>
            <p>Price:{{ cartItem.price }}</p>
            <p>Count:{{ cartItem.quantity }}</p>
          </div>
        </div>
        <img class="close" src="html/img/close.png" alt="close" @click="$emit('remove',cartItem)">
      </li>
    `
});

