'use strict'

/*
1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
 */

const str = "fgfhgfdgdfgdrfggfd 'fasd' 'sdaasdasdasdas  aren't dasdsaasd' 'sad' as 'dasdasd' aren't 'asdasdads' 'asdasd' wan't aren't Some text with words like don't and more won't. But it's important."

/**
 * \b\w+'\w+\b - слово с внутреними кавычками
 * (?!..) - не внутрение выражение
 * \B'|'\B - боковые кавычки
 */
const regex = /(?!\b\w+'\w+\b)\B'|'\B/g;
let newText = str.replace(regex, '"');
console.log(newText)