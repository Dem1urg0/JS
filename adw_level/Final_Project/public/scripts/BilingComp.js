Vue.component('billing-page', {
        data() {
            return {
                userData: {
                    address: {
                        country: {value: '', valid: 'letters'},
                        city: {value: '', valid: 'letters'},
                        address: {value: '', valid: 'letters'},
                        zip: {value: '', valid: 'numbers'},
                    },
                    billing: {
                        first: {value: '', valid: 'letters'},
                        second: {value: '', valid: 'letters'},
                        sur: {value: '', valid: 'letters'},
                    },
                    shipping: {
                        method: {value: '', valid: 'letters'},
                    }
                },
                blocksError: {
                    address: {
                        country: false,
                        city: false,
                        address: false,
                        zip: false,
                    },
                    billing: {
                        first: false,
                        second: false,
                        sur: false,
                    },
                    shipping: {
                        method: false,
                    }
                },
                blocksShow: {
                    address: true,
                    billing: false,
                    shipping: false,
                    review: false,
                }
            }
        },
        methods: {
            ValidTest(name) {
                //проверка на пустоту
                let letters = /^[A-Za-z]+$/;
                let numbers = /^[0-9]+$/;

                Object.entries(this.userData[name]).forEach((item, index) => {
                    let value = item[1].value
                    let valid = item[1].valid
                    if (valid !== 'numbers') {
                        if (letters.test(value) && value !== '') {
                            this.blocksError[name][item[0]] = false;
                        } else {
                            this.blocksError[name][item[0]] = true;
                        }
                    } else if (numbers.test(value) && value !== '') {
                        this.blocksError[name][item[0]] = false;
                    } else {
                        this.blocksError[name][item[0]] = true;
                    }
                })
                this.CheckBlock(name);
            },
            CheckBlock(name) {
                Object.entries(this.blocksError[name]).forEach(([key, value]) => {
                    if (value) {
                        this.blocksShow[name] = true;
                    } else {
                        this.blocksShow[name] = false;
                        let nextBlock = Object.keys(this.blocksShow)[Object.keys(this.blocksShow).indexOf(name) + 1];
                        if (nextBlock) {
                            this.blocksShow[nextBlock] = true;
                        }
                    }
                })
            },
            CheckAllBlocks() {
                return !Object.entries(this.blocksError).some(([key, value]) => {
                    return Object.values(value).some(bool => bool);
                });
            },
            Order() {
                return {
                    address: {
                        country: this.userData.address.country.value,
                        city: this.userData.address.city.value,
                        address: this.userData.address.address.value,
                        zip: this.userData.address.zip.value,
                    },
                    billing: {
                        first: this.userData.billing.first.value,
                        second: this.userData.billing.second.value,
                        sur: this.userData.billing.sur.value,
                    },
                    shipping: {
                        method: this.userData.shipping.method.value,
                    }
                }
            },
            SendOrder(){
                // проверка всех полей на валидность
                Object.keys(this.userData).forEach((key, index) => {
                    this.ValidTest(key)
                })
                if (this.CheckAllBlocks()){
                    this.$root.postJson(`/api/order`, JSON.parse(JSON.stringify(this.Order())))
                    alert('Заказ отправлен')
                    // location.reload();
                } else {
                    alert('Заполните все поля')
                }
            },

        },
        template: `
          <section class="arrivals__info container">
            <div class="order_info adress">
              <div @click="blocksShow.address = !blocksShow.address" class="a01"><h2>01. Shipping Address</h2></div>
              <div class="adress_content" v-if="blocksShow.address">
                <div class="log_in">
                  <h4>COUNTRY</h4>
                  <input type="text" class="email country" v-model="userData.address.country.value">
                  <p class="required" v-if="blocksError.address.country">* Required Fileds</p>
                  <h4>CITY</h4>
                  <input type="text" class="pass" v-model="userData.address.city.value">
                  <p class="required" v-if="blocksError.address.city">* Required Fileds</p>
                  <h4>ADDRESS</h4>
                  <input type="text" class="pass" v-model="userData.address.address.value">
                  <p class="required" v-if="blocksError.address.address">* Required Fileds</p>
                  <h4>ZIP</h4>
                  <input type="text" class="pass" v-model="userData.address.zip.value">
                  <p class="required" v-if="blocksError.address.zip">* Required Fileds</p>
                  <br>
                  <button class="log_in_button" @click="ValidTest('address')">NEXT</button>
                </div>
              </div>
              <div class="line"></div>
            </div>
            <div class="order_info">
              <div @click="blocksShow.billing = !blocksShow.billing" class="a01"><h2>02. BILLING INFORMATION</h2></div>
              <div class="adress_content" v-if="blocksShow.billing">
                <div class="log_in">
                  <h4>FIRST NAME</h4>
                  <input type="text" class="email country" v-model="userData.billing.first.value">
                  <p class="required" v-if="blocksError.billing.first">* Required Fileds</p>
                  <h4>SECOND NAME</h4>
                  <input type="text" class="pass" v-model="userData.billing.second.value">
                  <p class="required" v-if="blocksError.billing.second">* Required Fileds</p>
                  <h4>SURNAME</h4>
                  <input type="text" class="pass" v-model="userData.billing.sur.value">
                  <p class="required" v-if="blocksError.billing.sur">* Required Fileds</p>
                  <br>
                  <button class="log_in_button" @click="ValidTest('billing')">NEXT</button>
                </div>
              </div>
              <div class="line"></div>
            </div>
            <div class="order_info">
              <div class="a01" @click="blocksShow.shipping = !blocksShow.shipping"><h2>03. SHIPPING METHOD</h2></div>
              <div class="adress_content" v-if="blocksShow.shipping">
                <div class="log_in">
                  <h4>SHIPPING METHOD</h4>
                  <select
                      style='width: 370px;height: 45px;border: solid 1px #eaeaea; background-color: #fff; padding-left: 20px;'
                      name="Method" v-model="userData.shipping.method.value">
                    <option value="airplane">airplane</option>
                    <option value="car">car</option>
                    <option value="ship">ship</option>
                  </select>
                  <br>
                  <p class="required" v-if="blocksError.shipping.method">* Required Fileds</p>
                  <br>
                  <button class="log_in_button" @click="ValidTest('shipping')">NEXT</button>
                </div>
              </div>
              <div class="line"></div>
            </div>
            <div class="order_info">
              <div class="a01" @click ="blocksShow.review = !blocksShow.review "><h2>04. ORDER REVIEW</h2></div>
              <div class="adress_content" v-if="blocksShow.review">
                <div class="log_in">
                  <h4>ADDRESS</h4>
                  <p>COUNTRY: {{this.userData.address.country.value}}</p>
                  <p>CITY: {{this.userData.address.city.value}}</p>
                  <p>ADDRESS: {{this.userData.address.address.value}}</p>
                  <p>ZIP: {{this.userData.address.zip.value}}</p>
                  <h4>BILLING</h4>
                  <p>FIRST NAME: {{this.userData.billing.first.value}}</p>
                  <p>SECOND NAME: {{this.userData.billing.second.value}}</p>
                  <p>SURNAME: {{this.userData.billing.sur.value}}</p><p></p>
                  <h4>SHIPPING</h4>
                  <p>METHOD: {{this.userData.shipping.method.value}}</p>
                  <h2>YOUR ORDER</h2>
                  <cart-page-items ref="cart-page-items"></cart-page-items>
                  <br>
                  <button class="log_in_button" @click="SendOrder">ORDER</button>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </section>
        `
    }
)
