// форма Password

(function(){
    const popup = document.querySelector('.popup-password_js');
    const btnOpen = document.querySelector('.password-btn_js');
    const closePopupBtn = document.querySelector('.modal__close-password_js');
    const input = document.querySelector('.password__input');
    const overlay = document.querySelector('.overlay-password_js');

    if ( !popup && !btnOpen ) return;

    btnOpen.addEventListener('click', openPopup);

    function openPopup() {
        popup.classList.add('open');
        input.focus();
        window.addEventListener('keydown', escHandler);
        if ( closePopupBtn ) {
            closePopupBtn.addEventListener('click', closePopup );
        };
        if ( overlay ) {
            overlay.addEventListener('click', closePopup );
        };
    };

    function closePopup() {
        popup.classList.remove('open');
        if ( closePopupBtn ) {
            closePopupBtn.removeEventListener('click', closePopup );
        };
        if ( overlay ) {
            overlay.removeEventListener('click', closePopup );
        };
        window.removeEventListener('keydown', escHandler);
    };

    function escHandler(event) {
        if(event.keyCode === 27) {
            closePopup();
        };
    };

})();

// форма Data

(function(){
    const popup = document.querySelector('.popup-data_js');
    const btnOpen = document.querySelector('.data-btn_js');
    const closePopupBtn = document.querySelector('.modal__close-data_js');
    const input = document.querySelector('.data__input--email');
    const overlay = document.querySelector('.overlay-data_js');

    if ( !popup && !btnOpen ) return;

    btnOpen.addEventListener('click', openPopup);

    function openPopup() {
        popup.classList.add('open');
        input.focus();
        window.addEventListener('keydown', escHandler);
        if ( closePopupBtn ) {
            closePopupBtn.addEventListener('click', closePopup );
        };
        if ( overlay ) {
            overlay.addEventListener('click', closePopup );
        };
    };

    function closePopup() {
        popup.classList.remove('open');
        if ( closePopupBtn ) {
            closePopupBtn.removeEventListener('click', closePopup );
        };
        if ( overlay ) {
            overlay.removeEventListener('click', closePopup );
        };
        window.removeEventListener('keydown', escHandler);
    };

    function escHandler(event) {
        if(event.keyCode === 27) {
            closePopup();
        };
    };

})();

// ВАЛИДАЦИЯ ФОРМ 

// Работа с формой изменения пароля Form-password.

(function() {
    const form = document.forms.password;
    const inputs = [...form.querySelectorAll('input')];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); 
        for (let error of errorsOldMessages) error.remove(); 

        const successOldMessages = document.querySelectorAll('.success-feedback');
        for (let success of successOldMessages) success.remove();

        const userData = getAll(form);
        console.log(userData);

        let errors = {}; 

        console.log(inputs);

        inputs.forEach(input => {
            if ( input.hasAttribute('required') ) {
                if ( input.name === 'oldPassword' ) {
                    if ( userData.oldPassword.length < 6 ) {
                        errors.oldPassword = 'This field is required';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'newPassword' ) {
                    if ( userData.newPassword.length < 6 ) {
                        errors.newPassword = 'This field is required';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'repeatPassword' ) {
                    if ( userData.repeatPassword !== userData.newPassword || userData.repeatPassword.length === 0 || userData.repeatPassword.length < 6 ) {
                        errors.repeatPassword = 'Your password does not match the password you entered!';
                    } else {setSuccessText(input);}
                }            
            }
        })
        console.log(errors);

        Object.keys(errors) 
        if ( Object.keys(errors).length ) {
            Object.keys(errors).forEach((key) => {
                setErrorText(form.elements[key], errors[key]); 
            })
            return; 
        }

        const data = {
            oldPassword: userData.oldPassword,
            onewPassword: userData.newPassword,
            repeatPassword: userData.repeatPassword,
        };

        console.log(data);
    })
})();

// Работа с формой изменения Данных Form-Data.

(function() {
    const form = document.forms.data;
    const inputs = [...form.querySelectorAll('input')];

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); 
        for (let error of errorsOldMessages) error.remove(); 

        const successOldMessages = document.querySelectorAll('.success-feedback');
        for (let success of successOldMessages) success.remove();

        const userData = getAll(form); 
        console.log(userData);

        let errors = {};

        console.log(inputs);

        inputs.forEach(input => {
                if ( input.name === 'email' ) {
                    if ( !isEmailCorrect(userData.email) ) {
                        errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'name' ) {
                    if ( userData.name.length === 0 ) {
                        errors.name = 'This field is required';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'surname' ) {
                    if ( userData.surname.length === 0 ) { 
                        errors.surname = 'This field is required';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'location' ) {
                    if ( userData.location.length === 0 ) {
                        errors.location = 'This field is required';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'age' ) {
                    if ( userData.age.length === 0 ) {
                        errors.age = 'This field is required'; 
                   } else {setSuccessText(input);}  
                }                      
            }
        )
        console.log(errors);

        Object.keys(errors)
        if ( Object.keys(errors).length ) {
            Object.keys(errors).forEach((key) => {
                setErrorText(form.elements[key], errors[key]); 
            })
            return; 
        }

        const data = {
            email: userData.email,
            name: userData.name,
            surname: userData.surname,
            location: userData.location,
            age: +userData.age,
        };
 
        console.log(data);
    })
})();
