$(function () {

	// Header on scroll
	var header = $('.main-header').clone().addClass('main-header_fixed');
	$('body').append(header);

	$(window).scroll(function() {
	 
		if($(this).scrollTop() > 300 && $('.main-header_fixed').length) {
			header.css('transform', 'translate(0, 0)');
		} else {
			header.css('transform', 'translate(0, -100%)');
		}
	});

	// Dropdown menu
	$('.js-dropdown-open').on('click', function(e) {
		$(this).addClass('active');
		$(this).siblings('.js-dropdown').addClass('active');
	});

	$('.js-dropdown-close').on('click', function(e) {
		$('.js-dropdown-open').toggleClass('active');
		$('.js-dropdown').toggleClass('active');
	});

	$('body').on('click', function(e) {
		var dropdown = $('.js-dropdown');

		if (!dropdown.is(e.target) 
		    && dropdown.has(e.target).length === 0
		    && dropdown.hasClass('active')
		    && !$('.js-dropdown-open').is(e.target)) { 
			$('.js-dropdown-open').removeClass('active');
			$('.js-dropdown').removeClass('active');
		}
	});

	// Header dropdown menu (2lvl)
	$('.main-header__list-parent').hover(function() { // For desktop
		if (window.innerWidth > 1365) {
			$(this).toggleClass('active');
			$(this).find('.main-header__second-list').toggleClass('active');
		}
			
	});
	
	$('.main-header__list-parent').on('click', function(e) { // For mobile
		if (window.innerWidth <= 1365) {
			e.preventDefault();
			
			if ( $(this).hasClass('active') ) {
				$('.main-header__list-item').each(function() {
					if ( !$(this).hasClass('active') ) 
						$(this).toggleClass('main-header__list-item_hidden')
				});

				$(this).removeClass('active');
				$(this).find('.main-header__second-list').removeClass('active');
			} else {
				$(this).addClass('active');
				$(this).find('.main-header__second-list').addClass('active');

				$('.main-header__list-item').each(function() {
					if ( !$(this).hasClass('active') ) 
						$(this).toggleClass('main-header__list-item_hidden')
				});
			}	
		}
	}); 


	// Mobile menu
	$('.js-mobile-menu-open, .js-mobile-menu-back').on('click', function (e) {
		

		var menu = $(".js-mobile-menu");
		if (!menu.is(e.target)
			&& menu.has(e.target).length === 0) {
			$('.js-mobile-menu-back').toggleClass('active');
			menu.toggleClass('active');
			$('.js-mobile-menu-open').toggleClass('active');
			$('body').toggleClass('no-scroll');
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
	
		// Interactive dino
		$(document).on('click', '.js-interactive-dot', function() {
			$('.js-interactive-dino-item').each(function() {
				if ( $(this).hasClass('active') )
					$(this).removeClass('active');
			});
			
			$(this).parent().toggleClass('active');	

			if (window.innerWidth < 779) { // Mobile 
				$('.js-interactive-mobile-items .interactive-dino__item-info').remove();
				var info = $(this).parent().find('.interactive-dino__item-info');
				var mobileContainer = $('.js-interactive-mobile-items');

				mobileContainer.append( info.clone().css('display', 'none').fadeIn(200) );
			} 

		});
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
			779: {
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
		if ($(window).width() < 779) {
			$('.feedback-slider').after($('.feedback__button'));
			$('.gallery-carousel').after($('.gallery__button'));
		} else if ($(window).width() >= 780) {
			$('.feedback__title').after($('.feedback__button'));
			$('.gallery__button').appendTo($('.gallery__title-right'));
		}
	})

	if ($(window).width() < 779) {
		$('.feedback-slider').after($('.feedback__button'));
		$('.gallery-carousel').after($('.gallery__button'));
	} else if ($(window).width() >= 780) {
		$('.feedback__title').after($('.feedback__button'));
		$('.gallery__button').appendTo($('.gallery__title-right'));
	}

	// Gallery slider
	var gallery = $('.gallery-carousel');
	gallery.owlCarousel({
		loop: true,
		items: 7,
		smartSpeed: 400,
		autoWidth: true,
	});
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


// Validation
var formPhone = '';
var formEmail = '';
var formPhoneStatus = false;
var formEmailStatus = false;

$(document).on('keyup', '.js-form__phone', function() {
	var num = this.value.replace( /\D/g, '' ).split( /(?=.)/ ), i = num.length - 1;
	if ( 0 < i ) num.unshift( '+' );
	if ( 1 <= i ) num.splice( 2, 0, ' (' );
	if ( 4 <= i ) num.splice( 6, 0, ') ' );
	if ( 7 <= i ) num.splice( 10, 0, '-' );
	if ( 9 <= i ) num.splice( 13, 0, '-' );
	this.value = num.splice(0, 16).join( '' );
})

$(document).on('keyup', '.js-form__email', function() {
	this.value = this.value.replace( /[^\,A-Za-z0-9@._-]+/g, '' );
})

$(document).on('keyup', '.js-form__name', function() {
	this.value = this.value.replace( /[^\,A-Za-zА-Яа-я0-9 ]+/g, '' );
})

function setStatusClass(status, elem) {
	switch (status) {
		case 'correct':
			elem.classList.add('form__input_correct');
			elem.classList.remove('form__input_error');
			elem.classList.remove('form__input_empty');
			break;
		case 'error':
			elem.classList.remove('form__input_correct');
			elem.classList.add('form__input_error');
			elem.classList.remove('form__input_empty');
			break;
		case 'empty':
			elem.classList.remove('form__input_correct');
			elem.classList.remove('form__input_error');
			elem.classList.add('form__input_empty');
			break;
	}
}

function phoneValidate(elem) {
	if (/[^0-9-() ]+/.test(elem.value) && elem.value.length == 18) {
		setStatusClass('correct', elem);
		if(elem.style.color != 'red') {
			formPhone = elem.value;
		}
		formPhoneStatus = true;
	} else if (elem.value.length == 0) {
		setStatusClass('empty', elem);
		if(elem.style.color != 'red') {
			formPhone = elem.value;
		}
		elem.value = "Поле обязательно для заполнения!";
		elem.style.color = "red";
		formPhoneStatus = false;
	} else {
		setStatusClass('error', elem);
		if(elem.style.color != 'red') {
			formPhone = elem.value;
		}
		elem.value = "Неверно заполнено! Пример: +7 (111) 111-11-11";
		elem.style.color = "red";
		formPhoneStatus = false;
	}
}

function emailValidate(elem) {
	if (/\S+@\S+\.\S+/.test(elem.value) && elem.value.length <= 36) {
		setStatusClass('correct', elem);
		if(elem.style.color != 'red') {
			formEmail = elem.value;
		}
		formEmailStatus = true;
	} else if (elem.value.length == 0) {
		setStatusClass('empty', elem);
		if(elem.style.color != 'red') {
			formEmail = elem.value;
		}
		elem.value = "Поле обязательно для заполнения!";
		elem.style.color = "red";
		formEmailStatus = false;
	} else {
		setStatusClass('error', elem);
		if(elem.style.color != 'red') {
			formEmail = elem.value;
		}
		elem.value = "Неверно заполнено! Пример: name@mail.com";
		elem.style.color = "red";
		formEmailStatus = false;
	}
}

$('.js-form__email').change(function() {
	emailValidate(this);
})

$('.js-form__phone').change(function() {
	phoneValidate(this);
})

$('.js-form__name').change(function() {
	if (this.value.length > 0) {
		setStatusClass('correct', this);
	}
})

$(document).on('click', '.js-form__email', function() {
	if (this.classList.contains('form__input_error') || this.classList.contains('form__input_empty')) {
		this.value = formEmail;
		this.style.color = "black";
	}
})

$(document).on('click', '.js-form__phone', function() {
	if (this.classList.contains('form__input_error') || this.classList.contains('form__input_empty')) {
		this.value = formPhone;
		this.style.color = "black";
	}
})

$('.form-form').on('submit', function (e){
	e.preventDefault();
	phoneValidate(document.querySelector('.js-form__phone'));
	emailValidate(document.querySelector('.js-form__email'));
	if (formEmailStatus == true && formPhoneStatus == true) {
		alert('Отправляем');
	}
})

// Validation END