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

let userNumber = +prompt('Введите число', '');

function factorial(userNumber) {
    
    if (isNaN(userNumber)) {
        return "Ошибка";
    }

    let result = 1;
    let i = 0;
    while (i < userNumber) {
        result *= i + 1;
        i++;
    }
    return result;
}

console.log(factorial(userNumber))

// 3 задача

let userNum = +prompt('Введите число', '');
let degree = +prompt('Введите степень числа', '');

function power(degree, userNum) {

    if (isNaN(degree, userNum)) {
        return "Ошибка";
    }

    let result = 1;
    for (let i = 0; i<s; i++ ) {
        result *= userNum;
    }
    return result;
}

console.log(power(degree, userNum))

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





   






