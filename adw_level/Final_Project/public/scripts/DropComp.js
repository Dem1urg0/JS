Vue.component('drop-filter',{
    template: `
            <div class="drop drop__browse">
                        <div class="drop__browse__flex">
                            <h3 class="drop__h3 drop__browse__h3">Women</h3>
                            <ul class="drop__menu">
                                <li ref="ref" v-for="item of filtered" :key="filtered.indexOf('item')"><a href="#" class="drop__link">Dresses</a></li>
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