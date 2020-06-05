$(function () {
  /* Fixed header */

  let header = $("#header");
  let intro = $("#intro");
  let introH = intro.innerHeight(); // высота блока intro (метод height() возвращает высоту элемента без учета padding, метод innerHeight() - с учетом padding)
  let scrollPos = $(window).scrollTop(); // позиция скролла документа от верха страницы; величина в px, на которую проскроллили страницу

  // при скролле страницы сравниваем позицию скролла (переменная scrollPos) с высотой блока intro (переменная introH) - обработчик события скролла (on("scroll"))
  // если scrollPos > introH, выдаем класс fixed для шапки сайта

  checkScroll(scrollPos, introH); // функция вызывается при загрузке страницы

  $(window).on("scroll resize", function () {
    // при изменении размеров окна, например, с десктопной версии на мобильную, также выполняется проверка (событие onresize)
    introH = intro.innerHeight();

    scrollPos = $(this).scrollTop(); // this - обращение к объекту window, т.к. находимся внутри объекта Window; получаем текующую позицю скролла при скролле страницы

    checkScroll(scrollPos, introH);
  });

  function checkScroll() {
    if (scrollPos > introH) header.addClass("fixed");
    // в зависимости от условия if либо выдаем класс "fixed", либо убираем
    else header.removeClass("fixed");
  }

  /* Nav Toggle */

  let nav = $("#nav");

  $("#navToggle").on("click", function (event) {
    event.preventDefault();

    nav.toggleClass("show");
  });

  /* Smooth scroll - плавный скролл от пунктов меню к соответствующим разделам сайта */
  // обработчик события клика onclick по пунктакм меню, атрибут data-scroll в тегах меню и соответствующий id в разделах сайта, к которым будет плавный скролл

  $("[data-scroll]").on("click", function (event) {
    event.preventDefault(); // отменяем стандартное поведение ссылки при клике (т.е. перезагрузку страницы)

    let elementId = $(this).data("scroll"); // получаем атрибут data-scroll элемента, по которому кликнули, в переменную записывается id этого элемента: #features, #works, #team, #reviews, #download

    let elementOffset = $(elementId).offset().top; // получаем позицию элемента, на который будет осуществляться плавный скролл, от верха страницы

    nav.removeClass("show"); // скрывает навигацию мобильного меню при клике по пункту меню

    $("html, body").animate(
      {
        scrollTop: elementOffset - 70,
      },
      700
    ); // плавный скролл при помощи анимации (метод animate()); скролл меньше на 70px, чтобы меню не закрывала блок; время анимации - 700 мс
  });

  /* Reviews Slider: https://kenwheeler.github.io/slick/ */

  let slider = $("#reviewsSlider");

  slider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false, // скрываем кнопки прокрутки слайдера previous и next
    dots: true, // точки для прокрутки слайдера
  });
});
