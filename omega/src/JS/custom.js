/*Динамический padding для Global-wrap чтобы прижать footer к низу  */
gwPadding = function() {                                      //  Функция для назначения padding-bottom
	var $footerHeight =$('#footer').height();                   //  Определяем высоту футера и это значение присваиваем переменной
			$('.global-wrap').css("padding-bottom",$footerHeight);  //  Добавляем CSS свойство .global-wrap
};
$(document).ready(gwPadding);                                 //  Вызов функции при загрузке документа
$(window).resize(gwPadding);                                  //  Вызов функции при изменении ширины окна
/*
# ===============================================
#   
# ===============================================
*/

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
#    Waypoint & animate.css
# ===============================================
*/
/*$('.parallax__item').waypoint(function() {
	$(this).removeClass('hidden');
	$(this).addClass('fadeInUp');
},{
	offset: '10%'
});*/
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
			$navbar.removeClass("navbar-fixed-top").clearQueue().animate({ top: "-48px" }, 0);
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
#   Tabs
# ===============================================
*/
$(document).ready(function(){
    var tabs = $('#tabs');
    $('.tabs__content > div', tabs).each(function(i){
        if ( i != 0 ) $(this).hide(0);
    });
    tabs.on('click', '.tab__link', function(e){
        /* Предотвращаем стандартную обработку клика по ссылке */
        e.preventDefault();

        /* Узнаем значения ID блока, который нужно отобразить */
        var tabId = $(this).attr('href');

        /* Удаляем все классы у якорей и ставим active текущей вкладке */
        $('.tab__link',tabs).removeClass();
        $(this).addClass('active');

        /* Прячем содержимое всех вкладок и отображаем содержимое нажатой */
        $('.tabs-content > div', tabs).hide(0);
        $(tabId).show();
    });
});
/*
# ===============================================
#  Progress Bars 
# ===============================================
*/
/*Parameters*/
//1
$(document).ready(function(){
    $('#skill-11').goalProgress({
        goalAmount: 100,
        currentAmount: 99.9,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-12').goalProgress({
        goalAmount: 100,
        currentAmount: 95,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-13').goalProgress({
        goalAmount: 100,
        currentAmount: 80,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-14').goalProgress({
        goalAmount: 100,
        currentAmount: 45,
        textBefore: '',
        textAfter: ''
    });
});
//2
$(document).ready(function(){
    $('#skill-21').goalProgress({
        goalAmount: 100,
        currentAmount: 99.9,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-22').goalProgress({
        goalAmount: 100,
        currentAmount: 95,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-23').goalProgress({
        goalAmount: 100,
        currentAmount: 80,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-24').goalProgress({
        goalAmount: 100,
        currentAmount: 45,
        textBefore: '',
        textAfter: ''
    });
});
//3
$(document).ready(function(){
    $('#skill-31').goalProgress({
        goalAmount: 100,
        currentAmount: 99.9,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-32').goalProgress({
        goalAmount: 100,
        currentAmount: 95,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-33').goalProgress({
        goalAmount: 100,
        currentAmount: 80,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-34').goalProgress({
        goalAmount: 100,
        currentAmount: 45,
        textBefore: '',
        textAfter: ''
    });
});
//4
$(document).ready(function(){
    $('#skill-41').goalProgress({
        goalAmount: 100,
        currentAmount: 99.9,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-42').goalProgress({
        goalAmount: 100,
        currentAmount: 95,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-43').goalProgress({
        goalAmount: 100,
        currentAmount: 80,
        textBefore: '',
        textAfter: ''
    });
});
$(document).ready(function(){
    $('#skill-44').goalProgress({
        goalAmount: 100,
        currentAmount: 45,
        textBefore: '',
        textAfter: ''
    });
});