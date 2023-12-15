Vue.component('error', {
    template: `<div class="error">
                <p>Ошибка загрузки данных. Текст ошибки: </p>
                <p> {{ $root.loadError }} </p>
                 </div>`
})