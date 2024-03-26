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
                console.log(this.prodItems)
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
          <a href="html/product.html" class="fetured__list__product__text__name">{{item.name}}</a>
          <a href="html/product.html" class="fetured__list__product__text__price">{{item.price}}$ <img
              src="html/img/star.png"
              alt="stars"></a>
        </div>
        <button class="fetured__list__product__add" @click="$root.$refs.cart.addProduct(item)">Add to Cart</button>
      </div>
      </div>
    `
})