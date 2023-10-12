'use strict'

/*
Некая сеть фастфуда предлагает несколько видов гамбургеров:

a. Маленький (50 рублей, 20 калорий).
b. Большой (100 рублей, 40 калорий).

Гамбургер может быть с одним из нескольких видов начинок (обязательно):

a. С сыром (+10 рублей, +20 калорий).
b. С салатом (+20 рублей, +5 калорий).
c. С картофелем (+15 рублей, +10 калорий).

Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить
майонезом (+20 рублей, +5 калорий).
*/

class Hamburger {
    constructor(size = 'Не выбран', stuffing = 'Не выбрана') {
        this.choosedSize = size;
        this.choosedStuffing = stuffing;
        this.choosedTopping = [];
        this.toppings = [];
        this.sizes = [];
        this.stuffings = [];
        this.price = 0;


        this.addTopping(toppingName);
        this.removeTopping(toppingName);
        this.getToppings();
        this.getSize();
        this.getStuffing();
        this.calculatePrice();
        this.calculateCalories();
        this.loadMenuList();
        this.printMenuList();
        this.changeSize();
        this.changeStuffing();
    }

    loadMenuList() {
        this.toppings = [
            {id:0 ,name: 'mayo', price: 20, cal: 5},
            {id:1 ,name: 'seas', price: 15, cal: 0}
        ]
        this.sizes = [
            {id:0 ,name: 'small', price: 50, cal: 20},
            {id:1 ,name: 'big', price: 100, cal: 40},
        ]
        this.stuffings = [
            {id:0 ,name: 'cheesy', price: 10, cal: 20},
            {id:1 ,name: 'salad', price: 20, cal: 5},
            {id:2 ,name: 'potato', price: 15, cal: 10},
        ]
    }

    printMenuList() {
        console.log(this.sizes, this.stuffings, this.toppings)
    }


    addTopping(toppingName) {
        for (const topping of this.toppings) {
            if (topping.name === toppingName) {
                this.choosedTopping.push(topping);
            } else {
                console.log('Такой добавки нет в меню')
            }
        }
    }

    removeTopping(toppingName, count = 1) {
        for (const topping of this.toppings) {
            if (toppingName.name === toppingName) {
                for (let i = 0; i <= count; i++) {
                    this.toppings.slice(topping.id, 1);
                }
            }
        }
        console.log('Такой добавки нет в выбранных')
        return false;
    }

    getToppings() {
        console.log(this.choosedTopping);
    }

    getSize() {
        console.log(this.choosedSize);
    }
    changeSize(newSize){
        for (const size of this.sizes){
            if (newSize == size.name){
                this.choosedSize = newSize;
                return true;
            }
        }
        console.log('Такого размера нет')
        return false;
    }
    changeStuffing(stuffing){
        this.choosedStuffing = stuffing;
    }
    getStuffing() {
        console.log(this.choosedTopping);
    }

    calculatePrice() {
        for (let size in this.sizes){
            if this.choosedSize
        }



        /*
        this.choosedSize = size;
        this.choosedStuffing = stuffing;
        this.choosedTopping = [];
        */
    }

    calculateCalories() {
    }
}

