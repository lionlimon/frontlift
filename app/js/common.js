$(function() {

	// Dropdown menu
	$('.js-dropdown-open, .js-dropdown').hover( function(e) {
		$(this).siblings('.js-dropdown').toggleClass('active');
	});

	$('.js-dropdown').hover( function(e) {
		$(this).toggleClass('active');
	});

	// Mobile menu
	$('.js-mobile-menu-open, .js-mobile-menu-back').on('click', function(e) {
		var menu = $(".js-mobile-menu");
    if (!menu.is(e.target) 
        && menu.has(e.target).length === 0) { 
      $('.js-mobile-menu-back').toggleClass('active');
			menu.toggleClass('active');
			$('.js-mobile-menu-open').toggleClass('active');
    }
	});

	
});
$(document).ready(function(){
	var w = $(window).width();
	if (w <= 420) {
		var main_banner_height = $('.new-main-page .big-banner .main-banner-dino-mobile').height();
		$('.new-main-page .big-banner .video').height(main_banner_height - 2);
	}else {
		$('.new-main-page .big-banner .video').attr('style', '');
	}
});
$( window ).resize(function() {
	var w = $(window).width();
	if (w <= 420) {
		var main_banner_height = $('.new-main-page .big-banner .main-banner-dino-mobile').height();
		$('.new-main-page .big-banner .video').height(main_banner_height - 2);
	}else{
		$('.new-main-page .big-banner .video').attr('style', '');
	}
});
	
	// вызовем событие resize
	$(window).resize();
