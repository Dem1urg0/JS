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
    constructor() {
        this.choosedSize = '';
        this.choosedStuffing = '';
        this.choosedToppings = [];
        this.toppings = [];
        this.sizes = [];
        this.stuffings = [];
        this.price = 0;
        this.calories = 0;
        this.binar = true

        this.loadMenuList();
        this.printMenuList();
        this.buy();
    }

    buy() {
        this.price = 0;
        this.calories = 0;
        while (this.binar) {
            this.changeSize()
        }
        this.binar = true
        while (this.binar) {
            this.changeStuffing()
        }
        this.binar = true
        if (confirm('Хотите добавку?'))
            while (this.binar) {
                this.addTopping()
            }
        this.binar = true;
        if (confirm('Хотите убрать добавку?')){
            while (this.binar){
                this.removeTopping()
            }
        }
        console.log(`Калорийность:${this.calculateCalories()}, Цена:${this.calculatePrice()}`)
        if(confirm('Желаете изменить заказ?')){
            this.buy();
        }
    }

    loadMenuList() {
        this.toppings = [
            {id: 0, name: 'mayo', price: 20, cal: 5},
            {id: 1, name: 'seas', price: 15, cal: 0}
        ]
        this.sizes = [
            {id: 0, name: 'small', price: 50, cal: 20},
            {id: 1, name: 'big', price: 100, cal: 40},
        ]
        this.stuffings = [
            {id: 0, name: 'cheesy', price: 10, cal: 20},
            {id: 1, name: 'salad', price: 20, cal: 5},
            {id: 2, name: 'potato', price: 15, cal: 10},
        ]
    }

    printMenuList() {
        console.log(this.sizes, this.stuffings, this.toppings)
    }


    addTopping() {
        let newTopping = prompt('Введите добавку из меню')
        for (const topping of this.toppings) {
            if (topping.name === newTopping) {
                this.choosedToppings.push(topping.name);
                if (confirm('Хотите еще добавку?')){
                    this.addTopping();
                } else
                    this.binar = false;
            }
        }
    }
// хотелось бы починить многократный выход
    removeTopping() {
        let toppingName = prompt('Введите название добавки:')
        for (const topping of this.choosedToppings) {
            if (topping === toppingName) {
                this.choosedToppings.slice(topping, 1);
                if (confirm('Хотите убрать еще добавку?')){
                    this.removeTopping();
                } else
                    return  this.binar = false;
            }
        }
        console.log('Такой добавки нет в выбранных')
        if (confirm('Хотите выйти?')){
            this.binar = false
        }
    }

    changeSize() {

        let newSize = prompt('Введите размер бургера из меню')
        for (const size of this.sizes) {
            if (newSize === size.name) {
                this.choosedSize = newSize;
                console.log('Размер выбран')
                return this.binar = false;
            }
        }
        console.log('Такого размера нет')
    }

    changeStuffing(stuffing) {
        let newStuff = prompt('Введите тип бургера из меню')
        for (const stuff of this.stuffings) {
            if (newStuff === stuff.name) {
                this.choosedStuffing = newStuff;
                console.log('Тип выбран')
                return this.binar = false;
            }
        }
        console.log('Такого типа нет')
    }

    calculatePrice() {
        for (let size of this.sizes) {
            if (this.choosedSize === size.name) {
                this.price += size.price;
            }
        }
        for (let stuff of this.stuffings) {
            if (this.choosedStuffing === stuff.name) {
                this.price += stuff.price;
            }
        }
        for (let topping of this.toppings) {
            for (let choosedTopping of this.choosedToppings) {
                if (choosedTopping === topping.name) {
                    this.price += topping.price;
                }
            }
        }
        return (this.price);
    }

    calculateCalories() {
        for (let size of this.sizes) {
            if (this.choosedSize === size.name) {
                this.calories += size.cal;
            }
        }
        for (let stuff of this.stuffings) {
            if (this.choosedStuffing === stuff.name) {
                this.calories += stuff.cal;
            }
        }
        for (let topping of this.toppings) {
            for (let choosedTopping of this.choosedToppings) {
                if (choosedTopping === topping.name) {
                    this.calories += topping.cal;
                }
            }
        }
        return (this.calories);
    }
}

const Burger = new Hamburger();
