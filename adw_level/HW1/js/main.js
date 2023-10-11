/*
1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины. +
2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или
сократить запись функций?

Ответ: В первой функции убрал return и убрал лишнее равенство у второй функции.
Как было:
const productList = list.map(item => renderProduct(item.title, item.price));
document.querySelector('.products').innerHTML = productList;

3. * Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит?
Как это исправить?
Ответ: .map создает массив, где элементы перечислены через запятую.
Исправил с помощью .join("").

 */

const products = [
  {id: 1, title: 'Notebook', price: 1000},
  {id: 2, title: 'Mouse', price: 100},
  {id: 3, title: 'Keyboard', price: 250},
  {id: 4, title: 'Gamepad', price: 150},
];

const renderProduct = (title = 'Пусто', price = 150) =>
    `<div class="products_item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`

const renderProducts = list => {
  document.querySelector('.products')
      .innerHTML = list.map(item => renderProduct(item.title, item.price)).join("");
};

renderProducts(products);
