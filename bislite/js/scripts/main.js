/* owl-slider init
----------------------------------------------------------------------*/
$(document).ready(function() {
 
  var owl = $("#owl-demo");
 
  owl.owlCarousel({
     
      itemsCustom : [
        [0, 1],
        [450, 2],
        [700, 3],
        [960, 4]
      ],
      navigation : true,
      pagination:false
 
  });
 
});


// bxSlider init
$('.bxslider').bxSlider({
  mode: 'fade',
  captions: false
});


/*Динамический padding для Global-wrap чтобы прижать footer к низу  */




gwPadding = function() {                                      //  Функция для назначения padding-bottom
  var $footerHeight =$('#footer').height();                   //  Определяем высоту футера и это значение присваиваем переменной
      $('.global-wrap').css("padding-bottom",$footerHeight);  //  Добавляем CSS свойство .global-wrap
};
$(document).ready(gwPadding);                                 //  Вызов функции при загрузке документа
$(window).resize(gwPadding);                                  //  Вызов функции при изменении ширины окна