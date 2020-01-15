$(function () {

	// Header on scroll
	var header = $('.main-header').clone().addClass('main-header_fixed');
	$('body').append(header);

	$(window).scroll(function () {

		if ($(this).scrollTop() > 300 && $('.main-header_fixed').length) {
			header.css('transform', 'translate(0, 0)');
		} else {
			header.css('transform', 'translate(0, -100%)');
		}
	});

	// Dropdown menu
	$('.js-dropdown-open').on('click', function (e) {
		$(this).addClass('active');
		$(this).siblings('.js-dropdown').addClass('active');
	});

	$('.js-dropdown-close').on('click', function (e) {
		$('.js-dropdown-open').removeClass('active');
		$('.js-dropdown').removeClass('active');
	});

	$('body').on('click', function (e) {
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
	$('.main-header__list-parent').hover(function () { // For desktop
		if (window.innerWidth > 1365) {
			$(this).toggleClass('active');
			$(this).find('.main-header__second-list').toggleClass('active');
		}

	});

	$('.main-header__list-parent').on('click', function (e) { // For mobile
		if (window.innerWidth <= 1365) {
			e.preventDefault();

			if ($(this).hasClass('active')) {
				$('.main-header__list-item').each(function () {
					if (!$(this).hasClass('active'))
						$(this).toggleClass('main-header__list-item_hidden');
				});

				$(this).removeClass('active');
				$(this).find('.main-header__second-list').removeClass('active');
			} else {
				$(this).addClass('active');
				$(this).find('.main-header__second-list').addClass('active');

				$('.main-header__list-item').each(function () {
					if (!$(this).hasClass('active'))
						$(this).toggleClass('main-header__list-item_hidden');
				});
			}
		}
	});


	// Mobile menu
	$('.js-mobile-menu-open, .js-mobile-menu-back').on('click', function (e) {

		if (window.innerWidth < 1366) {
			var menu = $(".js-mobile-menu");
			if (!menu.is(e.target)
				&& menu.has(e.target).length === 0) {
				$('.js-mobile-menu-back').toggleClass('active');
				menu.toggleClass('active');
				$('.js-mobile-menu-open').toggleClass('active');
				$('body').toggleClass('no-scroll');
			}
		}
	});

	// Adv slider
	var adv = $('.js-adv-slider').owlCarousel({
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
	var attach = new Swiper('.attachments-slider', {
		spaceBetween: 20,
		slidesPerView: 2,
		loop: true,
		slideToClickedSlide: true,
		breakpoints: {
			0: {
				slidesPerView: 2,
				centeredSlides: true
			},
			560: {
				slidesPerView: 3.5,
			},
			780: {
				slidesPerView: 4,
				centeredSlides: false
			},
			1000: {
				slidesPerView: 5,
			},
			1200: {
				slidesPerView: 6,
			},
			1366: {
				slidesPerView: 4.5
			},
			1500: {
				slidesPerView: 5
			},
			1700: {
				slidesPerView: 6
			},
		}
	});

	function addAttachActive() {
		$('.attachments-item').removeClass('attachments-item_active');

		setTimeout(function () {
			var item = $('.attachments .swiper-slide-active');
			item.addClass('attachments-item_active');

			var image = item.attr('data-image');
			var url = 'url(' + image + ')';

			$('.attachments-item__top').stop().animate({ opacity: 0 }, 200, function () {
				$(this).css({ 'background-image': url })
					.animate({ opacity: 1 }, { duration: 300 });
			});
		}, 100);

		// Interactive dino
		$('.js-interactive-dot').hover(function () {
			$('.js-interactive-dino-item').each(function () {
				if ($(this).hasClass('active'))
					$(this).removeClass('active');
			});

			$(this).parent().toggleClass('active');

			if (window.innerWidth < 779) { // Mobile 
				$('.js-interactive-mobile-items .interactive-dino__item-info').remove();
				var info = $(this).parent().find('.interactive-dino__item-info');
				var mobileContainer = $('.js-interactive-mobile-items');

				mobileContainer.append(info.clone().css('display', 'none').fadeIn(200));
			}

		}, function() {
			$(this).parent().toggleClass('active');
		});
	};



	addAttachActive();

	$(document).on('click', '.attachments-slider__button', function () {
		attach.slidePrev(300);
	})

	$(document).on('click', '.attachments-item__button', function () {
		attach.slideNext(300);
	})

	attach.on('slideChangeTransitionStart', function () {
		addAttachActive();
	});

	// Interactive dino
	$(document).on('click', '.js-interactive-dot', function () {
		$('.js-interactive-dino-item').each(function () {
			if ($(this).hasClass('active'))
				$(this).removeClass('active');
		});

		$(this).parent().toggleClass('active');

		if (window.innerWidth < 779) { // Mobile 
			$('.js-interactive-mobile-items .interactive-dino__item-info').remove();
			var info = $(this).parent().find('.interactive-dino__item-info');
			var mobileContainer = $('.js-interactive-mobile-items');

			mobileContainer.append(info.clone().css('display', 'none').fadeIn(200));
		}

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

	$(window).on('resize-end', function () {
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

function validate(elem) {
	if (elem.type == 'email') {
		if (/^[.0-9a-zA-Zа-яА-Я_-]+@[0-9a-zA-Zа-яА-Я_-]+?\.[a-zA-Zа-яА-Я]{2,}$/.test(elem.value) && elem.value.length <= 36) {
			setStatusClass('correct', elem);
			return 'correct';
		}
	} else {
		if (/[0-9+() ]/.test(elem.value)) {
			setStatusClass('correct', elem);
			return 'correct';
		}
	}
	if (elem.value.length == 0 || elem.dataset.value.length == 0) {
		setStatusClass('empty', elem);
		return 'empty';
	} else {
		setStatusClass('error', elem);
		return 'error';
	}
}

function fieldChange(elem) {
	var status = validate(elem);
	if (status == 'error' || status == 'empty') {
		if (elem.style.color != 'red') {
			elem.dataset.value = elem.value;
			elem.style.color = "red";
		}
		if (elem.type != 'email') {
			elem.value = status == 'error' ? "Неверно заполнено! Пример: +7 (111) 111-11-11" : "Поле обязательно для заполнения!";
		} else {
			elem.value = status == 'error' ? "Неверно заполнено! Пример: name@mail.com" : "Поле обязательно для заполнения!";
		}
	} else if (status == 'correct' || elem.style.color != 'red') {
		elem.dataset.value = elem.value;
	}
}

$('.js-form__email, .js-form__phone, .js-form-sub__input').change(function () {
	fieldChange(this);
})

$('.js-form__name').change(function () {
	if (this.value.length > 0) {
		setStatusClass('correct', this);
	}
})

$(document).on('click focus', '.js-form__email, .js-form-sub__input, .js-form__phone', function () {
	if (this.classList.contains('form__input_error') || this.classList.contains('form__input_empty')) {
		this.value = this.dataset.value;
		this.style.color = "black";
	}
})

$(document).on('keyup', '.js-form__phone', function () {
	this.value = this.value.replace(/[^+0-9-() ]/, '');
	this.dataset.value = this.value;
})

$(document).on('keyup', '.js-form__email, .js-form-sub__input', function () {
	this.value = this.value.replace(/[^\,A-Za-z0-9а-яА-Я@._-]+/g, '');
	this.dataset.value = this.value;
})

$(document).on('keyup', '.js-form__name', function () {
	this.value = this.value.replace(/[^\,A-Za-zА-Яа-я0-9 ]+/g, '');
})

$('.form-form').on('submit', function (e) {
	e.preventDefault();
	var email = document.querySelector('.js-form__email');
	var phone = document.querySelector('.js-form__phone');
	var phoneStatus = validate(phone);
	var emailStatus = validate(email);
	fieldChange(email);
	fieldChange(phone);
	if (phoneStatus == 'correct' && emailStatus == 'correct') {
		alert('Отправляем');
	}
})

$('.form-sub').on('submit', function (e) {
	e.preventDefault();
	var email = document.querySelector('.js-form-sub__input');
	var emailStatus = validate(email);
	fieldChange(email);
	if (emailStatus == 'correct') {
		alert('Отправляем');
	}
})
// Validation END

function footerElemsPosition() {
	if ($(window).width() < 1365 && $(window).width() >= 780) {
		var margin = $('.footer-col:nth-child(3)').height() - $('.footer-col:nth-child(3) .footer-col__title').height()
			- $('.footer-col:nth-child(3) .footer-col__list').height();
		$('.footer-col:nth-child(4)').css('margin-top', -margin + 30);
	} else if ($(window).width() >= 1366 || $(window).width() < 780) {
		$('.footer-col:nth-child(4)').css('margin-top', 0);
	}
}

footerElemsPosition();

function footerOpenList(elem) {
	if ($(window).width() < 780) {
		$(".js-footer-col__list").slideUp(400);
		if(!elem.next().is(':visible')) {
			elem.next().slideDown(400);
		}
	} else {
		$(".js-footer-col__list:hidden").slideDown(400);
	}
}

$(window).on('resize-end', function () {
	if ($(window).width() >= 780) {
		$(".js-footer-col__list").show();
	} else {
		$(".js-footer-col__list").hide();
	}
	footerElemsPosition();
})

$(document).on('click', '.js-footer-col__title', function () {
	footerOpenList($(this));
});


