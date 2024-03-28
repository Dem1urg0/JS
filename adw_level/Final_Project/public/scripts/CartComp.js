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
        }
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

Vue.component('cart-page',{
    data(){
        return{
            cartItems: [],
            totalPrice: 0,
        }
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
    template:`
      <div>
            <div v-for="item of cartItems">
                <div class="products__item">
                    <img class="products__item__img" style="width: 100px; height: 115px;" :src=item.img>
                    <div class="products__item__name">
                        <h2>{{ item.name }}</h2>
                        <p><b>Color:</b> &ensp;{{item.color}} <br>
                            <b>Size:</b> &ensp;{{item.size}} </p>
                    </div>
                    <p class="products__item__uprice">$ {{item.price}}</p>
                    <div class="products__item__input__box">
                        <input class="products__item__input" type="number" min="1" max="10" v-model="item.quantity">
                    </div>
                    <p class="products__item__shipping">FREE</p>
                    <p class="products__item__sprice">{{item.price*item.quantity}}</p>
                  <div class="products__item__button__box">
                    <button class="products__item__action" @click="$root.$refs.cart.remove(item)"><img class="products__item__actionimg" src="style/img/close.png" alt="close"></button>
                  </div>
                </div>
                <div class="line"></div>
            </div>
      </div>
    `
})

