$(function () {

	// Dropdown menu
	$('.js-dropdown-open, .js-dropdown').hover(function (e) {
		$(this).siblings('.js-dropdown').toggleClass('active');
	});

	$('.js-dropdown').hover(function (e) {
		$(this).toggleClass('active');
	});

	// Mobile menu
	$('.js-mobile-menu-open, .js-mobile-menu-back').on('click', function (e) {
		$('body').toggleClass('.no-scroll');

		var menu = $(".js-mobile-menu");
		if (!menu.is(e.target)
			&& menu.has(e.target).length === 0) {
			$('.js-mobile-menu-back').toggleClass('active');
			menu.toggleClass('active');
			$('.js-mobile-menu-open').toggleClass('active');
		}
	});

	// Adv slider
	$('.js-adv-slider').owlCarousel({
		loop: true,
		responsive: {
			0: {
				items: 2,
			},
			780: {
				items: 4,
				center: true,
				margin: 60
			},
			1000: {
				items: 4,
			},
			1366: {
				items: 7
			}
		}
	});

	// Attach slider
	var attach = $('.attachments-slider');
	attach.owlCarousel({
		loop: true,
		items: 9,
		margin: 18,
		autoWidth: true,
		responsive: {
			0: {
				center: true
			},
			1366: {
				center: false
			}
		}
	});

	function addAttachActive() {
		$('.attachments-item').removeClass('attachments-item_active');

		setTimeout(function () {
			var itemNum = 2;
			if ($(window).width() < 1100) {
				itemNum = 0;
			} else if ($(window).width() < 1366) {
				itemNum = 1;
			}

			var item = $('.attachments .owl-item.active .attachments-item:eq(' + itemNum + ')');
			item.addClass('attachments-item_active');

			var image = item.attr('data-image');
			var url = 'url(' + image + ')';

			$('.attachments-item__top').stop().animate({ opacity: 0 }, 200, function () {
				$(this).css({ 'background-image': url })
					.animate({ opacity: 1 }, { duration: 300 });
			});
		}, 100);
	};

	addAttachActive();

	$(document).on('click', '.attachments-slider__button', function () {
		attach.trigger('prev.owl.carousel', [300]);
	})

	$(document).on('click', '.attachments-item__button', function () {
		attach.trigger('next.owl.carousel', [300]);
	})

	attach.on('changed.owl.carousel', function () {
		addAttachActive();
	});

	// Feedback slider
	var feedback = $('.feedback-slider');
	feedback.owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		smartSpeed: 400,
		responsive: {
			0: {
				center: true,
			},
			768: {
				autoWidth: true,
				center: true,
			}
		}
	});

	function feedbackActive() {
		setTimeout(function () {
			$('.feedback-item.feedback-item_active:eq(0)').removeClass('feedback-item_active');
			$('.feedback .owl-item.center .feedback-item').addClass('feedback-item_active');
		}, 10);
	}

	feedbackActive();

	feedback.on('change.owl.carousel', feedbackActive);

	$(function () {
		var resizeEnd;
		$(window).on('resize', function () {
			clearTimeout(resizeEnd);
			resizeEnd = setTimeout(function () {
				$(window).trigger('resize-end');
			}, 100);
		});
	});

	$(window).on('resize-end', function() {
		if ($(window).width() < 768) {
			$('.feedback-slider').after($('.feedback__button'));
		} else if ($(window).width() >= 768) {
			$('.feedback__title').after($('.feedback__button'));
		}
	})

	if ($(window).width() < 768) {
		$('.feedback-slider').after($('.feedback__button'));
	} else if ($(window).width() >= 768) {
		$('.feedback__title').after($('.feedback__button'));
	}
});

$(document).ready(function () {
	var w = $(window).width();
	if (w <= 420) {
		var main_banner_height = $('.new-main-page .big-banner .main-banner-dino-mobile').height();
		$('.new-main-page .big-banner .video').height(main_banner_height - 2);
	} else {
		$('.new-main-page .big-banner .video').attr('style', '');
	}
});
$(window).resize(function () {
	var w = $(window).width();
	if (w <= 420) {
		var main_banner_height = $('.new-main-page .big-banner .main-banner-dino-mobile').height();
		$('.new-main-page .big-banner .video').height(main_banner_height - 2);
	} else {
		$('.new-main-page .big-banner .video').attr('style', '');
	}
});

// вызовем событие resize
$(window).resize();
