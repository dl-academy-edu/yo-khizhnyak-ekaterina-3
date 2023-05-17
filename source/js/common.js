// ВАЛИДАЦИЯ ФОРМ

// Собираем все данные из формы и возвращаем в качестве единого объекта.

function getAll(form) {
    const inputs = form.querySelectorAll('input');
    const textareas = form.querySelectorAll('textarea');

    let result = {};

    for ( let input of inputs ) {

        switch (input.type) {
            case 'radio': {
                if ( input.checked) {
                    result[input.name] = input.value;
                }
                break;
            }
            case 'checkbox': {
                if ( !result[input.name] ) result[input.name] = [];
                if ( input.checked ) result[input.name].push(input.value);
                break;
            }
            case 'file': { 
                result[input.name] = input.files; 
                break;
            }
            default: { 
                result[input.name] = input.value; 
            }
        }
    }

    for (let textarea of textareas) { 
        result[textarea.name] = textarea.value; 
    }

    return result;
}

// Проверка почты на правильность, согласно регулярному выражению

function isEmailCorrect(email) {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
};

// Проверяка номера телефона на правильность, согласно регулярному выражению

function isPhoneCorrect(phone) {
    return phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
};

function isFullNameCorrect(fullName) {
    return fullName.match(/^[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?$/);
};

// Данная функция является распределительной и выбирает вызывать функцию для работы с итерабельными элементами или нет.
// function setError(input, messageError) {
//     if(input[0]) {
//         // функция при работе с итерабельными элементами
//         setErrorChecked(input, messageError);
//     } else {
//         // функция при работе с обычными элементами
//         setErrorText(input, messageError);
//     }
// }

// Благодаря этой функции мы делаем ошибку для итерабельных элементов.
// function setErrorChecked(inputs, messageError) {
//     const error = errorCreator(messageError); // Получаем div ошибки.
//     inputs[0].parentElement.parentElement.insertAdjacentElement('afterend', error); // Кладём его в верстку.
//     function handler() {
//         error.remove(); // Удаляем ошибку.
//         for(let input of [...inputs]) { // Перебираем все наши итерабельные инпуты и снимаем с них eventListener'ы и удаляем им классы.
//             input.removeEventListener('input', handler);
//             input.classList.remove('is-invalid');
//         }
//     }
//     for(let input of [...inputs]) { // Перебираем наши инпуты и вешаем им классы того, что они неверны и вешаем им слушатель.
//         input.classList.add('is-invalid');

//         input.addEventListener('input', handler);
//     }
// }

// Эта функция нужна для работы не с итерабельными элементами.
function setErrorText(input, messageError) { 
    const error = errorCreator(messageError); // Получаем готовый div с ошибкой.
    input.classList.add('is-invalid'); // Вешаем класс ошибки. Border для input'a (красный)
    input.insertAdjacentElement('afterend', error); // Добавляем элемент в вёрстку.
    input.addEventListener('input', () => { // Вешаем слушатель инпут, который отработает тогда, когда пользователь начнет что-то снова вводить.
        error.remove(); // Удаляем ошибку.
        input.classList.remove('is-invalid'); // Удаляем класс ошибки.
    }, {once: true}); // В качестве объекта параметров делаем выполнение этого события одноразовым.
}

// Функция создания элемента ошибки.
function errorCreator(message) {
    let messageError = document.createElement('div'); // Создаем div.
    messageError.classList.add('invalid-feedback'); // Вешаем ему класс. Стили div'a, содержащего сообщение об ошибке (шрифт, цвет)
    messageError.innerText = message; // Кладём в него текст нашей ошибки.
    return messageError; // Возвращаем подготовленный div как результат выполнения нашей функции.
    // ВАЖНОЕ УТОЧНЕНИЕ!!! На момент завершения этой функции div не находится в вёрстке для того, чтобы он там появился мы его потом добавляем в него при помощи insertAdjacentElement.
}

// Функция создания элемента сообщения об успехе.
function successCreator() {
    let messageSuccess = document.createElement('div'); // Создаем div.
    messageSuccess.classList.add('success-feedback'); // Вешаем ему класс. Стили div'a, содержащего сообщение об успехе (шрифт, цвет)
    messageSuccess.innerText = 'All right'; // Кладём в него текст нашей успеха.
    return messageSuccess; // Возвращаем подготовленный div как результат выполнения нашей функции.
    // ВАЖНОЕ УТОЧНЕНИЕ!!! На момент завершения этой функции div не находится в вёрстке для того, чтобы он там появился мы его потом добавляем в него при помощи insertAdjacentElement.
}

// Функция создания элемента успеха.
function setSuccessText(input) { 
    const message = successCreator(); // Получаем готовый div.
    input.classList.add('is-valid'); // Вешаем класс об успехе. Border для input'a (зелёный)
    input.insertAdjacentElement('afterend', message); // Добавляем элемент в вёрстку.
    input.addEventListener('input', () => { // Вешаем слушатель инпут, который отработает тогда, когда пользователь начнет что-то снова вводить.
        message.remove(); // Удаляем div.
        input.classList.remove('is-valid'); // Удаляем класс об успехе.
    }, {once: true}); // В качестве объекта параметров делаем выполнение этого события одноразовым.
}