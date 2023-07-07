'use strict'

let ticket = prompt("Введите номер билета")

if (ticket > 999999) {
    console.log("Не правильный номер билета");
} else {
    let n6 = ticket % 10
    let n5 = Math.floor((ticket % 100) / 10)
    let n4 = Math.floor((ticket % 1000) / 100)
    let n3 = Math.floor((ticket % 10000) / 1000)
    let n2 = Math.floor((ticket % 100000) / 10000)
    let n1 = Math.floor((ticket % 1000000) / 100000)

    let leftSide = n1 + n2 + n3
    let rightSide = n4 + n5 + n6
    if (leftSide == rightSide){
        console.log("Билет счастливый")
    } else {
        console.log("Билет несчастливый")
    }
        }

