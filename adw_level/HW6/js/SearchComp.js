Vue.component('searcher',{
    data(){
        return{
            filtered:[],
            products:[],
            catalogUrl: '/catalogData.json',
        }
    },
    methods: {
        filter(){
            let regexp = new RegExp(this.$root.userSearch, 'i');
            this.$set(this.$data, 'filtered', this.products.filter(el => regexp.test(el.product_name)));
            console.log(this.filtered);
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template:`
        <form action="#" class="search-form" @submit.prevent="$root.$refs.searcher.filter">
            <input type="text" class="search-field" v-model="$root.userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
        </form>
        `
})
