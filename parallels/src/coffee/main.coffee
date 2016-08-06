#Динамический padding для Global-wrap чтобы прижать footer к низу
gwPadding = -> #  Функция для назначения padding-bottom
	$footerHeight = $("#footer").height() #  Определяем высоту футера и это значение присваиваем переменной
	$(".global-wrap").css "padding-bottom", $footerHeight #  Добавляем CSS свойство .global-wrap
	return

$(document).ready gwPadding #  Вызов функции при загрузке документа
$(window).resize gwPadding #  Вызов функции при изменении ширины окна
#--------------------------------------------------
#    # Slider init
#--------------------------------------------------
$(document).ready ->
	$("#myCarousel").carousel()
	return