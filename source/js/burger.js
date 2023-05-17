// ОТКРЫТИЕ, ЗАКРЫТИЕ БУРГЕР-МЕНЮ

(function() {
    const burgerBtn = document.querySelector('.burger__menu');
    const mobileMenu = document.querySelector('.burger');
    const closeMenu = document.querySelector('.burger__close');

    if ( !burgerBtn ) return;
    if ( !mobileMenu ) return;

    burgerBtn.addEventListener('click', openBurger);

    function openBurger() {
        mobileMenu.classList.add('burger__open');
        if ( closeMenu ) {
            closeMenu.addEventListener('click', closeBurger);
            window.addEventListener('keydown', escHandler);
        };
    };

    function escHandler(event) {
        if(event.keyCode === 27) {
            closeBurger();
        };
    };

    function closeBurger() {
        mobileMenu.classList.remove('burger__open');
        window.removeEventListener('keydown', escHandler);
        closeMenu.removeEventListener('click', closeBurger);
    };

})();

// форма Sign in

(function() {
    const popup = document.querySelector('.popup-sign_js');
    const btnOpen = document.querySelector('.burger-sign_js');
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

// форма Register

(function() {
    const popup = document.querySelector('.popup-register_js');
    const btnOpen = document.querySelector('.burger-register_js');
    const closePopupBtn = document.querySelector('.modal__close-register_js');
    const input = document.querySelector('.register__input--email');
    const overlay = document.querySelector('.overlay-register_js');

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
