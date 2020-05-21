$(function () {
  /* Фиксированная шапка сайта при скролле страницы */

  let header = $("#header");
  let introH = $("#intro").innerHeight(); // высота блока intro в px
  let scrollOffset = $(window).scrollTop(); // величина, на которую мы скроллили страницу, в px (по умолчанию - текущий скролл страницы при загрузке страницы)

  // fixed header
  checkScroll(scrollOffset);

  $(window).on("scroll", function () {
    // событие onscroll
    scrollOffset = $(this).scrollTop();

    checkScroll(scrollOffset);
  });

  function checkScroll(scrollOffset) {
    // если значение в переменной scrollOffset >= чем в introH, то мы в header выдаем class = "fixed" (фиксированная шапка сайта)

    if (scrollOffset >= introH) header.addClass("fixed");
    else header.removeClass("fixed");
  }

  /* smooth scroll (плавный скролл к блокам страницы при клике на соответствующие пункты панели навигации nav) */

  $("[data-scroll").on("click", function (event) {
    // событие onclick
    event.preventDefault(); // отменяем стандартное поведение ссылки

    let $this = $(this); // при клике на ссылку в панели навигации nav значение записывается в переменную $this

    let blockId = $this.data("scroll"); // значение id атрибута data-scroll при клике на ссылку (у ссылки в панели навигации nav есть атрибут data-scroll)

    let blockOffset = $(blockId).offset().top; // позиция элемента от верха страницы

    $("#nav a").removeClass("active");
    $this.addClass("active"); // придаем class = "active" ссылке, на которую кликнули, а у остальных ссылок в панели навигации nav убираем class "active"

    $("html, body").animate(
      {
        scrollTop: blockOffset,
      },
      500 // интервал времени скролла к соответствующему блоку страницы
    );
  });

  /* панель навигации nav-toggle для мобильной версии сайта */

  $("#nav_toggle").on("click", function (event) {
    // событие onclick
    event.preventDefault();

    $(this).toggleClass("active");
    $("nav").toggleClass("active");
  });

  /* accordion */

  $("[data-collapse]").on("click", function (event) {
    event.preventDefault();

    $this = $(this);

    $this.toggleClass("active");
  });

  /* slider */

  $("[data-slider]").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
});
