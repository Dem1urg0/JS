Vue.component('drop-filter',{
    data:{
        show: false,
    },
    props: ['filteredWoman','filteredMan'],
    template: `
      <div class="drop drop__browse">
        <div class="drop__browse__flex" v-if="filteredWoman.length != 0">
          <h3 class="drop__h3 drop__browse__h3">Women</h3>
          <ul class="drop__menu">
            <li v-for="item of filteredWoman" :key="filteredWoman.indexOf('item')">
              <a href="#" class="drop__link">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="drop__browse__flex" v-if="filteredMan.length != 0">
          <h3 class="drop__h3 drop__browse__h3">Men</h3>
          <ul class="drop__menu">
            <li v-for="item of filteredMan" :key="filteredMan.indexOf('item')">
              <a href="#" class="drop__link">{{ item }}</a></li>
          </ul>
        </div>
        <img style="width: 236px" v-if="filteredWoman.length === 0" src="img/no_product_found.png" alt="no_product_img">
      </div>
    `
})
Vue.component('drop-def',{
    template: `
            <div class="drop drop_middle">
                    <div class="drop__flex">
                        <h3 class="drop__h3">Women</h3>
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
                    <div class="drop__flex">
                        <h3 class="drop__h3">Women</h3>
                        <ul class="drop__menu">
                            <li><a href="#" class="drop__link">Dresses</a></li>
                            <li><a href="#" class="drop__link">Tops</a></li>
                            <li><a href="#" class="drop__link">Sweaters/Knits</a></li>
                            <li><a href="#" class="drop__link">Jackets/Coats</a></li>
                        </ul>
                        <h3 class="drop__h3">Women</h3>
                        <ul class="drop__menu">
                            <li><a href="#" class="drop__link">Dresses</a></li>
                            <li><a href="#" class="drop__link">Tops</a></li>
                            <li><a href="#" class="drop__link">Sweaters/Knits</a></li>
                        </ul>
                    </div>
                    <div class="drop__flex">
                        <h3 class="drop__h3">Women</h3>
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
                </div>
    `
})