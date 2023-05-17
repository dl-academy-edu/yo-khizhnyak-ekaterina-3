(function() {
    const btnToTop = document.querySelector('.button-to-top_js');

    if ( !btnToTop ) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        if ( scrollTop >= 1500 ) {
            visuallyBtn();
        } else {
            notVisuallyBtn();
        }
        btnToTop.addEventListener('click', scrollToTop);
    })

    function visuallyBtn() {
        btnToTop.classList.remove('button-to-top_hidden');
    }

    function notVisuallyBtn() {
        btnToTop.classList.add('button-to-top_hidden');
    }

    function scrollToTop() {
        console.log('scroll');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
})();