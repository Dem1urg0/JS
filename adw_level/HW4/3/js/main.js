'use strict'
/*
Создать форму обратной связи с полями: Имя,Телефон,E-mail,текст, кнопка Отправить.
При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
 */



let regName = /^[A-Za-z]+$/
let regPhone = /^\+7[0-9]{10}$/
let regEmail = /^\w*-?.?-?\w*@mail\.ru$/

function valid() {
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value

    if (!(regName.test(name))) {
        document.querySelector('.name .uncorrect').classList.remove('vanish')
        document.getElementById('name').classList.add('red')
    } else{
            document.querySelector('.name .uncorrect').classList.add('vanish')
        document.getElementById('name').classList.remove('red')
    }
    if (!(regPhone.test(phone))) {
        document.querySelector('.phone .uncorrect').classList.remove('vanish')
        document.getElementById('phone').classList.add('red')
    } else{
        document.querySelector('.phone .uncorrect').classList.add('vanish')
        document.getElementById('phone').classList.remove('red')
    }
    if (!(regEmail.test(email))) {
        document.querySelector('.email .uncorrect').classList.remove('vanish')
        document.getElementById('email').classList.add('red')
    } else{
        document.querySelector('.email .uncorrect').classList.add('vanish')
        document.getElementById('email').classList.remove('red')
    }
}

const button = document.getElementById('button');

button.onclick = () => {
    valid();
}
