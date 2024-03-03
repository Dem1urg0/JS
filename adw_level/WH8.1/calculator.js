/*Калькулятор*/
const calculator = {
    check: function (first, second) {
        if (first === '' || second === '' || isNaN(first) || isNaN(second)) {
            console.log('Не корректные данные')
            return false;
        } else {
            return true;
        }
    },
    add: function (first, second) {
        if (this.check(first, second)) {
            let result = +first + +second;
            return result;
        }
    },
    sub: function (first, second) {
        if (this.check(first, second)) {
            let result = +first - +second;
            return result;
        }
    },
    div: function (first, second) {
        if (this.check(first, second)) {
            let result = +first / +second;
            return result;
        }
    },
    mul: function (first, second) {
        if (this.check(first, second)) {
            let result = +first * +second;
            return result;
        }
    },
};
module.exports = calculator;