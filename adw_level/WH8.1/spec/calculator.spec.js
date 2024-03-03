const calculator = require('../calculator.js');
describe('Сложение двух чисел', () => {
    it('при двух случайных целых значениях в диапозоне от 0 до 10000', () => {
        const first = Math.floor(Math.random() * 10001);
        const second = Math.floor(Math.random() * 10001);
        const result = first + second;
        expect(calculator.add(first,second)).toBe(result);
    });
    it('при двух случайных дробных значениях в диапозоне от 0 до 10000', () => {
        const first = Math.random() * 10001
        const second = Math.random() * 10001
        const result = first + second;
        expect(calculator.add(first,second)).toBe(result);
    });
});
describe('Вычетание двух чисел', () => {
    it('при двух случайных целых значениях в диапозоне от 0 до 10000', () => {
        const first = Math.floor(Math.random() * 10001);
        const second = Math.floor(Math.random() * 10001);
        const result = first - second;
        expect(calculator.sub(first,second)).toBe(result);
    });
    it('при двух случайных дробных значениях в диапозоне от 0 до 10000', () => {
        const first = Math.random() * 10001
        const second = Math.random() * 10001
        const result = first - second;
        expect(calculator.sub(first,second)).toBe(result);
    });
});
describe('Деление двух чисел', () => {
    it('при двух случайных целых значениях в диапозоне от 0 до 10000', () => {
        const first = Math.floor(Math.random() * 10001);
        const second = Math.floor(Math.random() * 10001);
        const result = first / second;
        expect(calculator.div(first,second)).toBe(result);
    });
    it('при двух случайных дробных значениях в диапозоне от 0 до 10000', () => {
        const first = Math.random() * 10001
        const second = Math.random() * 10001
        const result = first / second;
        expect(calculator.div(first,second)).toBe(result);
    });
});
describe('Умножение двух чисел', () => {
    it('при двух случайных целых значениях в диапозоне от 0 до 10000', () => {
        const first = Math.floor(Math.random() * 10001);
        const second = Math.floor(Math.random() * 10001);
        const result = first * second;
        expect(calculator.mul(first,second)).toBe(result);
    });
    it('при двух случайных дробных значениях в диапозоне от 0 до 10000', () => {
        const first = Math.random() * 10001
        const second = Math.random() * 10001
        const result = first * second;
        expect(calculator.mul(first,second)).toBe(result);
    });
});
