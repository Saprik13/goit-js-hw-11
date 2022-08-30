// Нижняя стрелка для прокрутки вверх
    $(function () {
            // при нажатии на кнопку scrollup
            $('.scrollup').click(function () {
                // переместиться в верхнюю часть страницы
                $("html, body").animate({
                    scrollTop: 0
                }, 500);
            })
        })
        // при прокрутке окна (window)
        $(window).scroll(function () {
            // если пользователь прокрутил страницу более чем на 400px
            if ($(this).scrollTop() > 400) {
                // то сделать кнопку scrollup видимой
                $('.scrollup').fadeIn();
            }
            // иначе скрыть кнопку scrollup
            else {
                $('.scrollup').fadeOut();
            }
        });