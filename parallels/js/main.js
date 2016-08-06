var gwPadding;

gwPadding = function() {
  var $footerHeight;
  $footerHeight = $("#footer").height();
  $(".global-wrap").css("padding-bottom", $footerHeight);
};

$(document).ready(gwPadding);

$(window).resize(gwPadding);

$(document).ready(function() {
  $("#myCarousel").carousel();
});
