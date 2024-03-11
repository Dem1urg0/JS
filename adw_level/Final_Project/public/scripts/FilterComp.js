Vue.component('filter-el', {
    data() {
        return {
            userSearch: '',
            products: {},
            filtered: {}
        }
    },
    methods: {
        filtration(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = Object.values(this.products).filter(el => regexp.test(el.gender));
            //не нужно фильтровать по гендору, прозе сразу проверять в двух массивах товаров
            //если один в одном массиве ничего не нашлось то название гендера исчезает
        }
    },
    mounted() {
        fetch('../../server/db/clothes.json')
            .then(result => result.json()).then(data => {
            this.products = data
        }).catch(error => console.log(error))
    },
    template: `
      <form action="#" class="form">
        <button class="form__browse">
          Browse
          <div class="drop drop__browse">
            <div class="drop__browse__flex">
              <h3 class="drop__h3 drop__browse__h3">Women</h3>
              <ul class="drop__menu">
                <li><a href="#" class="drop__link">Dresses</a></li>
                <li><a href="#" class="drop__link">Tops</a></li>
                <li><a href="#" class="drop__link">Sweaters/Knits</a></li>
                <li><a href="#" class="drop__link">Jackets/Coats</a></li>
                <li><a href="#" class="drop__link">Blazers</a></li>
                <li><a href="#" class="drop__link">Denim</a></li>
                <li><a href="#" class="drop__link">Leggings/Pants</a></li>
                <li><a href="#" class="drop__link">Skirts/Shorts</a></li>
                <li><a href="#" class="drop__link">Accessories</a></li>
              </ul>
            </div>
            <div class="drop__browse__flex">
              <h3 class="drop__h3 drop__browse__h3">Men</h3>
              <ul class="drop__menu">
                <li><a href="#" class="drop__link">Dresses</a></li>
                <li><a href="#" class="drop__link">Tops</a></li>
                <li><a href="#" class="drop__link">Sweaters/Knits</a></li>
                <li><a href="#" class="drop__link">Jackets/Coats</a></li>
              </ul>
            </div>
          </div>
          <p>{{filtered}}</p>
        </button>
        <input type="text" v-model="userSearch">
        <button @click.prevent="$root.$refs.filter.filtration(userSearch)" class="form__search"><img src="img/search.svg" alt="search" width="18px" height="18px"></button>
      </form>
    `
});