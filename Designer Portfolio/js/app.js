$(function () {
  const worksSlider = $("[data-slider='slick']");

  /* Filter (фильтр по категориям)
  Блок Works.
  При клике по категориям (App, Website, Interaction) показываются работы, соответствующие категории, и все работы при клике по категории All.
  Каждая работа находится в своей колонке (class="portfolio__col"). У каждой колонки есть свой data-атрибут (data-cat) - категория работ.
  У ссылок в навигационной панели блока Works (class="works__nav") также есть свой data-атрибут (data-filter). По нему отслеживается событие клика по ссылке.
  */

  let filter = $("[data-filter]"); // в переменную записывается элемент с data-атрибутом data-filter

  filter.on("click", function (event) {
    event.preventDefault(); // отменяем стандартное поведение ссылки

    let cat = $(this).data("filter"); // в переменную записывается значение data-атрибута data-filter при клике по ссылке для дальнейшей фильтрации по этому значению

    // Фильтрация: проходим по всем элементам с data-атрибутом data-cat. Если значение атрибута элемента не совпадает со значением атрибута в переменной cat, то мы скрываем этот элемент (добавляем class = "hide"). Если совпадает - то показываем этот элемент (удаяем class = "hide").
    // При клике по ссылке All показываются все элементы.

    if (cat === "all") $("[data-cat]").removeClass("hide");
    else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat"); // в переменную записывается значение data-атрибута data-cat текущего элемента

        if (workCat !== cat) $(this).addClass("hide");
        else $(this).removeClass("hide");
      });
    }
  });

  /* Модальные окна
  У модального окна есть свой id. У кнопки есть свой data-атрибут (data-modal).
  При клике по кнопке (или по работе в блоке Works) сохраняем в переменную значение data-атрибута. И по этому значению вызываем соответствующее модальное окно.
  У кнопки для закрытия модального окна (крестик в правом верхнем углу) есть data0атрибут (data-close).
  Модпльное окно также закрывается при клике по маске - области вне модального окна.
  При вызове модального окна выдаем для <body> - class = "no-scroll" (запрет скролла страницы). При закрытии модального окна удаляем этот класс.
  */

  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this); // записываем в переменную кнопку, по которой кликнули
    let modalId = $this.data("modal"); // записываем в переменную значение data-атрибута кнопки, по которой кликнули

    $(modalId).addClass("show"); // вызываем модальное окно при клике по кнопке, добавляем class = "show", чтобы показать его
    $("body").addClass("no-scroll");

    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({ transform: "scale(1)" }); // добавляем эффект при открытии модального окна: находим элемент с class = "modal__dialog" и меняем для него css-свойство с задержкой setTimeout
    }, 200);

    worksSlider.slick("setPosition"); // т.к. в случае открытия модального окна меняются размеры элемента, в котором находится слайдер, вызываем event setPosition, чтобы произошел перерасчет размеров
  });

  modalClose.on("click", function (event) {
    event.preventDefault();

    let $this = $(this); // записываем в переменную кнопку, по которой кликнули
    let modalParent = $this.parents(".modal"); // получаем родительский элемент кнопки, по которой кликнули, с class = "modal"

    modalParent.find(".modal__dialog").css({ transform: "scale(0)" }); // убираем эффект при закрытии модального окна

    setTimeout(function () {
      modalParent.removeClass("show"); // закрываем модальное окно при клике по кнопке, удаляем class = "show", чтобы закрыть его
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal").on("click", function (event) {
    let $this = $(this);

    $this.find(".modal__dialog").css({ transform: "scale(0)" }); // убираем эффект при закрытии модального окна

    setTimeout(function () {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  // отменяем закрытие модального окна при клике внутри модального окна
  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation(); // отменяем событие клика по его родителю
  });

  /* Слайдер slick (https://kenwheeler.github.io/slick/):
  в модальном окне (JQuery): для модального окна с обзором работы в блоке Works
  */

  worksSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find("[data-slider='slick']"); // кнопка Previous находится вне слайдера. При клике по ней находим родительский элемент - модальное окно (с классом modal) и в нем - слайдер. В переменной currentSlider находится слайдер, который находится в открытом модальном окне

    currentSlider.slick("slickPrev"); // Переключаем слайдер назад к предыдущему слайду
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find("[data-slider='slick']"); // кнопка Next находится вне слайдера. При клике по ней находим родительский элемент - модальное окно (с классом modal) и в нем - слайдер. В переменной currentSlider находится слайдер, который находится в открытом модальном окне

    currentSlider.slick("slickNext"); // Переключаем слайдер вперед к следуюющему слайду
  });

  /* Mobile menu
   */

  const navToggle = $("#navToggle");
  const nav = $("#nav");

  navToggle.on("click", function (event) {
    event.preventDefault();

    nav.toggleClass("show");
  });
});
