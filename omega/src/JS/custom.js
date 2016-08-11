/*Динамический padding для Global-wrap чтобы прижать footer к низу  */
gwPadding = function() {                                      //  Функция для назначения padding-bottom
	var $footerHeight =$('#footer').height();                   //  Определяем высоту футера и это значение присваиваем переменной
			$('.global-wrap').css("padding-bottom",$footerHeight);  //  Добавляем CSS свойство .global-wrap
};
$(document).ready(gwPadding);                                 //  Вызов функции при загрузке документа
$(window).resize(gwPadding);                                  //  Вызов функции при изменении ширины окна
/*
# ===============================================
#   Owl-carousel
# ===============================================
*/
$(document).ready(function() {

  var owl = $("#owl1");
  var owl2 = $("#owl2");

  owl.owlCarousel({
    items : 4, //10 items above 1000px browser width
    itemsDesktop : [1000,4], //5 items between 1000px and 901px
    itemsDesktopSmall : [900,2], // betweem 900px and 601px
    itemsTablet: [600,1], //2 items between 600 and 0
    itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
    afterAction : syncPosition,
    //Pagination
    pagination : false,
    paginationNumbers: true,
     // Other
    addClassActive : false,
    afterInit : function(el){
      console.log(el.find(".owl-item"));
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });

    owl2.owlCarousel({
        singleItem : true,
        slideSpeed : 1000,
        navigation: true,
        pagination:false,
        //Pagination
        pagination : false,
         // Other
        addClassActive : false
  });




   function syncPosition(el){
    var current = this.currentItem;
    console.log('current: ',current);
    $("#owl2")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#owl2").data("owlCarousel") !== undefined){
      center(current)
    }
  }

    function center(number){
    var sync2visible = owl2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;

        for(var i in sync2visible){
          if(num === sync2visible[i]){
            var found = true;
          }
        }
    }

/*  function afterAction(){
    console.log("owlItems.length: ",this.owl.owlItems.length);
    console.log("this.owl.currentItem: ",this.owl.currentItem);
    console.log("this.prevItem: ",this.prevItem);
    console.log("owl.visibleItems: ",this.owl.visibleItems);
    console.log("owl.dragDirection: ",this.owl.dragDirection);
  }*/


  // Custom Navigation Events
  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
  $(".play").click(function(){
    owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
  })
  $(".stop").click(function(){
    owl.trigger('owl.stop');
  })

});

$(function() {
  $('progress').each(function() {
        var max = $(this).val();
        $(this).val(0).animate({ value: max }, { duration: 2000, easing: 'easeOutCirc' });
    });
});

/*
# ===============================================
#   Waypoint navbar
# ===============================================
*/
var navLi = $('.navbar li');

$('.tracked').waypoint(function() {
	var hash = $(this).attr('id');
	navLi.removeClass('active');
	$.each(navLi,function() {
		if ( $(this).children('a').attr('href').slice(1) == hash ){
			$(this).addClass('active');
		}
	});
},{
	offset: '30%'
});
/*
# ===============================================
#   Sticky navbar
# ===============================================
*/
(function($, undefined){

	var $navbar = $(".navbar"),
			y_pos = $navbar.offset().top,
			height = $navbar.height();

	$(document).scroll(function(){
		var scrollTop = $(this).scrollTop();

		if (scrollTop > y_pos + height){
			$navbar.addClass("navbar-fixed-top").animate({ top: 0 });
		} else if (scrollTop <= y_pos){
			$navbar.removeClass("navbar-fixed-top").clearQueue().animate({}, 0);
		}
	});

})(jQuery, undefined);
/*
# ===============================================
#   Flip cards
# ===============================================
*/
$(".card").flip({
	axis: 'y',
	trigger: 'hover'
});
$(".whatwedo__card").flip({
	axis: 'y',
	trigger: 'hover'
});
/*
# ===============================================
#  CountUp
# ===============================================
*/
var options = {
  useEasing : true,
  useGrouping : true,
  separator : ' ',
  decimal : '.',
  prefix : '',
  suffix : ''
};
var demo  = new CountUp("countUp1", 0, 3041, 0, 2.5, options);
var demo2 = new CountUp("countUp2", 0, 185200, 0, 2.5, options);
var demo3 = new CountUp("countUp3", 0, 367, 0, 2.5, options);
var demo4 = new CountUp("countUp4", 0, 251060, 0, 2.5, options);

$('.parallax__item').waypoint(function() {
    demo.start();
    demo2.start();
    demo3.start();
    demo4.start();
},{
    offset: '90%'
});


/*
# ===============================================
#  Progress Bars
# ===============================================
*/
