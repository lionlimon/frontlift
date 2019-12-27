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
