Vue.component('cart', {
    data(){
        return {
            cartItems: [],
            showCart: false,
            totalPrice: 0,
        }
    },
    methods: {
        addProduct(product) {
            fetch('../../server/db/cart.json')
                .then(result => result.json())
                .then(data => {
                    let newCart = data.products.filter(product);

                })
        }
    //     addProduct(product){
    //         this.$parent.getJson(`${API}/addToBasket.json`)
    //             .then(data => {
    //                 if(data.result === 1){
    //                     let find = this.cartItems.find(el => el.id_product === product.id_product);
    //                     if(find){
    //                         find.quantity++;
    //                     } else {
    //                         let prod = Object.assign({quantity: 1}, product);
    //                         this.cartItems.push(prod)
    //                     }
    //                 } else {
    //                     alert('Error');
    //                 }
    //             })
    //     },
    //     remove(item) {
    //         this.$parent.getJson(`${API}/deleteFromBasket.json`)
    //             .then(data => {
    //                 if(data.result === 1) {
    //                     if(item.quantity>1){
    //                         item.quantity--;
    //                     } else {
    //                         this.cartItems.splice(this.cartItems.indexOf(item), 1)
    //                     }
    //                 }
    //             })
    //     },
    },
    mounted(){
        fetch('../server/db/cart.json')
            .then(result => result.json()).then(data => {
            for (let el of data.products) {
                this.cartItems.push(el);
                }
        }).catch(error => console.log(error));
        console.log(this.cartItems);
    },
    template: `
      <div class="cart_menu">
        <img class="cart" src="html/img/cart.svg" alt="cart" @click="showCart= !showCart">
        <div class="drop drop__cart" v-if="showCart">
          <div class="drop__browse__flex">
            <ul class="drop__menu">
              <cart-item  v-for="item of cartItems" :cartItem="item" ref="cart-item"></cart-item>
            </ul>
          </div>
          <div class="drop__cart__price">
            <h3>Total</h3>
            <h3>{{totalPrice}}</h3>
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
                    <a href="product.html"><h3>{{cartItem.name}}</h3></a>
                    <a href="product.html"><img src="html/img/star.png" alt="stars_cart"></a>
                    <p>Price:{{cartItem.price}}</p>
                    <p>Count:{{cartItem.count}}</p>
                  </div>
                </div>
                <a href="#"><img class="close" src="html/img/close.png" alt="close"></a>
              </li>
              <br>
              <li class="cart__line"></li>
              <br>
    `
});
