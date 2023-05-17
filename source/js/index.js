// ОТКРЫТИЕ, ЗАКРЫТИЕ ФОРМ

// форма Register

(function(){
    const popup = document.querySelector('.popup-register_js');
    const btnOpen = document.querySelector('.register-btn_js');
    const closePopupBtn = document.querySelector('.modal__close-register_js');
    const input = document.querySelector('.register__input--email');
    const overlay = document.querySelector('.overlay-register_js');
    console.log(closePopupBtn)

    if ( !popup && !btnOpen ) return;

    btnOpen.addEventListener('click', openPopup);

    function openPopup() {
        popup.classList.add('open');
        input.focus();
        window.addEventListener('keydown', escHandler);
        if ( closePopupBtn ) {
            closePopupBtn.addEventListener('click', closePopup );
        }
        if ( overlay ) {
            overlay.addEventListener('click', closePopup );
        }
    }

    function closePopup() {
        popup.classList.remove('open');
        if ( closePopupBtn ) {
            closePopupBtn.removeEventListener('click', closePopup );
        }
        if ( overlay ) {
            overlay.removeEventListener('click', closePopup );
        }
        window.removeEventListener('keydown', escHandler);
    }

    function escHandler(event) {
        if(event.keyCode === 27) {
            closePopup();
        };
    };

})();

// форма Sign in

(function(){
    const popup = document.querySelector('.popup-sign_js');
    const btnOpen = document.querySelector('.sign-btn_js');
    const closePopupBtn = document.querySelector('.modal__close-sign_js');
    const input = document.querySelector('.sign__input--email');
    const overlay = document.querySelector('.overlay-sign_js');

    if ( !popup && !btnOpen ) return;

    btnOpen.addEventListener('click', openPopup);

    function openPopup() {
        popup.classList.add('open');
        input.focus();
        window.addEventListener('keydown', escHandler);
        if ( closePopupBtn ) {
            closePopupBtn.addEventListener('click', closePopup );
        }
        if ( overlay ) {
            overlay.addEventListener('click', closePopup );
        }
    }

    function closePopup() {
        popup.classList.remove('open');
        if ( closePopupBtn ) {
            closePopupBtn.removeEventListener('click', closePopup );
        }
        if ( overlay ) {
            overlay.removeEventListener('click', closePopup );
        }
        window.removeEventListener('keydown', escHandler);
    }

    
    function escHandler(event) {
        if(event.keyCode === 27) {
            closePopup();
        };
    };

})();

// форма Send message

(function(){
    const popup = document.querySelector('.popup-send_js');
    const btnOpen = document.querySelector('.send-btn_js');
    const closePopupBtn = document.querySelector('.modal__close-send_js');
    const input = document.querySelector('.send__input_js');
    const overlay = document.querySelector('.overlay-send_js');

    if ( !popup && !btnOpen ) return;

    btnOpen.addEventListener('click', openPopup);

    function openPopup() {
        popup.classList.add('open');
        input.focus();
        window.addEventListener('keydown', escHandler);
        if ( closePopupBtn ) {
            closePopupBtn.addEventListener('click', closePopup );
        }
        if ( overlay ) {
            overlay.addEventListener('click', closePopup );
        }
    }

    function closePopup() {
        popup.classList.remove('open');
        if ( closePopupBtn ) {
            closePopupBtn.removeEventListener('click', closePopup );
        }
        if ( overlay ) {
            overlay.removeEventListener('click', closePopup );
        }
        window.removeEventListener('keydown', escHandler);
    }

    
    function escHandler(event) {
        if(event.keyCode === 27) {
            closePopup();
        };
    };

})();

// ВАЛИДАЦИЯ ФОРМ

// Работа с формой регистрации.

(function() {
    const form = document.forms.register;
    const inputs = [...form.querySelectorAll('input')];
    const checkboxInput = form.querySelector('.register__checkbox--input');
    const btnSubmit = form.querySelector('.register__button');

    checkboxInput.addEventListener('click', function() {   
            if ( !checkboxInput.checked ) {
                btnSubmit.setAttribute('disabled', 'disabled');    
            } else btnSubmit.removeAttribute('disabled');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ломаем стандартное поведение события.

        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.

        const successOldMessages = document.querySelectorAll('.success-feedback');
        for (let success of successOldMessages) success.remove();

        const userData = getAll(form); // Получаем все данные формы и кладём их в переменную userData.
        console.log(userData);

        let errors = {}; // объект под ошибки.

        console.log(inputs);

        inputs.forEach(input => {
            if ( input.hasAttribute('required') ) {
                if ( input.name === 'email' ) {
                    if ( !isEmailCorrect(userData.email) ) {
                        errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'repeatPassword' ) {
                    if ( userData.repeatPassword !== userData.password || userData.repeatPassword.length === 0 ) {
                        errors.repeatPassword = 'Your password does not match the password you entered!';
                    } else {setSuccessText(input);}
                } 
                if ( input.name === 'password' ) {
                    if ( userData.password.length < 6 ) {
                        errors.password = 'This field is required';
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
        })
        console.log(errors);

        Object.keys(errors) // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if ( Object.keys(errors).length ) {
            // Дальше мы перебираем все наши свойства.
            Object.keys(errors).forEach((key) => {
                // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setErrorText(form.elements[key], errors[key]); // функция, которая вешает ошибку
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        // Объект data, который в последующем будет отправляться на сервер.
        const data = {
            email: userData.email,
            password: userData.password,
            name: userData.name,
            surname: userData.surname,
            location: userData.location,
            age: +userData.age,
        };
        // Якобы отправка данных
        console.log(data);
    })
})();


// Работа с формой входа Sign in.

(function() {
    const form = document.forms.signIn;
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
                if ( input.name === 'email' ) {
                    if ( !isEmailCorrect(userData.email) ) {
                        errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'password' ) {
                    if ( userData.password.length < 6 ) {
                        errors.password = 'This field is required';
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
            email: userData.email,
            password: userData.password,
        };

        console.log(data);
    })
})();

// Работа с формой отправки сообщений Send message.

(function() {
    const form = document.forms.send;
    const inputs = [...form.querySelectorAll('input')];
    const checkboxInput = form.querySelector('.send__checkbox--input');
    const btnSubmit = form.querySelector('.send__button');

    if ( !send ) return;

    checkboxInput.addEventListener('click', function() {   
            if ( !checkboxInput.checked ) {
                btnSubmit.setAttribute('disabled', 'disabled');    
            } else btnSubmit.removeAttribute('disabled');
    });

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
                if ( input.name === 'name') {
                    if ( !isFullNameCorrect(userData.name) ) {
                        errors.name = 'Please enter a valid full name';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'subjectMessage' ) {
                    if ( userData.subjectMessage.length === 0 ) {
                        errors.subjectMessage = 'This field is required';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'email' ) {
                    if ( !isEmailCorrect(userData.email) ) {
                        errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                    } else {setSuccessText(input);}
                }
                if ( input.name === 'phone' ) {
                    if ( !isPhoneCorrect(userData.phone) ) {
                        errors.phone = 'Please enter a valid phone number';
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
            name: userData.name,
            subject: userData.subjectMessage,
            email: userData.email,
            phone: userData.phone,
            message: userData.message || null,
        };
 
        console.log(data);
    })
})();


// SLIDER

(function() {
    const slider = document.querySelector('.slider');
    const wrapper = slider.querySelector('.slider__wrapper');
    const innerWrapper = wrapper.querySelector('.slider__inner-wrapper');
    const buttonNext = slider.querySelector('.slider__button-next_js');
    const buttonBack = slider.querySelector('.slider__button-back_js');
    const pagination = slider.querySelector('.slider__pagination_js');
    const slides = [...innerWrapper.querySelectorAll('.slider__slide')];
    const slidesCount = slides.length;
    const animationDuration = 500;
    const dots = [];

    let timer = null;
    let slideWidth = wrapper.offsetWidth;
    let activeSlideIndex;
    
    const updateSlideIndex = () => {
        +localStorage.getItem('activeSlideIndex')
            ? (activeSlideIndex = +localStorage.getItem('activeSlideIndex'))
            : (activeSlideIndex = 0);
    }
    updateSlideIndex();

    initWidth();
    createDots();
    setActiveSlide(activeSlideIndex, withAnimation = false);  

    window.addEventListener('resize', () => {
        initWidth();
        setActiveSlide(activeSlideIndex, withAnimation = false);
    });

    buttonBack.addEventListener('click', () => {
        setActiveSlide(activeSlideIndex - 1);
    });

    buttonNext.addEventListener('click', () => {
        setActiveSlide(activeSlideIndex + 1);
    });
    
    function setActiveSlide(index, withAnimation = true) {
        if ( index < 0 || index >= slidesCount ) return;
        innerWrapper.style.transform = `translateX(${index * slideWidth * (-1)}px)`;

        if (withAnimation) {
            clearTimeout(timer);
            innerWrapper.style.transition = `transform ${animationDuration}ms`;
            timer = setTimeout(() => {
                innerWrapper.style.transition = '';
            }, animationDuration);
        }

        buttonBack.removeAttribute('disabled');
        buttonNext.removeAttribute('disabled');

        if ( index === 0 ) {
            buttonBack.setAttribute('disabled', 'disabled');
        }

        if ( index === slidesCount - 1 ) {
            buttonNext.setAttribute('disabled', 'disabled');
        }

        dots[activeSlideIndex].classList.remove('slider__dot_active');
        dots[index].classList.add('slider__dot_active');

        activeSlideIndex = index;
        localStorage.setItem('activeSlideIndex', activeSlideIndex);
    }

    function initWidth() {
        slideWidth = wrapper.offsetWidth;

        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
    }

    function createDots() {
        for ( let i = 0; i < slidesCount; i++ ) {
            const dot = createDot(i);
            dots.push(dot);
            pagination.insertAdjacentElement('beforeend', dot);
        }
    }

    function createDot(index) {
        const dot = document.createElement('button');
        dot.classList.add('slider__dot');

        if ( index === activeSlideIndex ) {
            dot.classList.add('slider__dot_active');
        }

        dot.addEventListener('click', () => {
            setActiveSlide(index);
        })
        return dot;
    }

    // setActiveSlide(1);

})();


// SLIDER - SWIPER 

const swiper = new Swiper('.swiper', {
    // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});