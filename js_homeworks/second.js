// 1 задача

let number = +prompt('Введите число', '');

function isNumber (number) {
    if (isNaN(number)) {
        return "Ошибка";
    }

for (let i = 0; i <= number; i++) {
    if (i % 4 === 0) continue;
    console.log(i);
}
}

console.log(isNumber(number))

// 2 задача

let n = +prompt('Введите число', '');

function factorial(n) {
    
    if (isNaN(n)) {
        return "Ошибка";
    }

    let result = 1;
    let i = 0;
    while (i<n) {
        result *= i + 1;
        i++;
    }
    return result;
}

console.log(factorial(n))

// 3 задача

let num = +prompt('Введите число', '');
let s = +prompt('Введите степень числа', '');

function power(s,num) {

    if (isNaN(s,num)) {
        return "Ошибка";
    }

    let result = 1;

for (let i = 0; i<s; i++ ) {
    result *= num;
}
return result;
}

console.log(power(s,num))

// 5 задача

let numb = +prompt('Угадайте число', '');
let rand = Math.floor(1 + Math.random() * 10);

while (true) {
    if (numb === rand) {
        console.log(`Ура, вы победили! Ответ: ${rand}`);
        break;
        }
    else {
        numb = +prompt('Угадайте число', '');
    }
}





   






