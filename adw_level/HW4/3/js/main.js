'use strict'
/*
Создать форму обратной связи с полями: Имя,Телефон,E-mail,текст, кнопка Отправить.
При нажатии на кнопку Отправитьпроизвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
 */

function valid() {
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
     let regName = /[a-z]+/i
    if (!(regName.test(name))) {
        document.querySelector('.name .uncorrect').classList.toggle('vanish')
        console.log('lda')
    }
}

const button = document.getElementById('button');

button.onclick = () =>  {
    valid();
}
