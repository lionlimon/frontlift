$(function() {

	// Dropdown menu
	$('.js-dropdown-open, .js-dropdown').hover( function(e) {
		$(this).siblings('.js-dropdown').toggleClass('active');
	});

	$('.js-dropdown').hover( function(e) {
		$(this).toggleClass('active');
	});


	
});
