import {submenu_close} from './_submenu';

(() => {

	let $search = $('.search');
	let $header = $('.header');

	if(!$search.length)
		return false;

	$('.js-search-open').on('click', e => {

		submenu_close()

		$search.addClass('is-active')

		$header.addClass('is-search-open')

		$('.js-mobile-menu, .header__device').removeClass('is-active')

	})

	$('.js-search-close').on('click', e => {
		$search.removeClass('is-active')

		$header.removeClass('is-search-open')

		$('.js-search-toggle').removeClass('is-active')
	})

	$('.js-search-toggle').on('click', e => {
		$(e.currentTarget).toggleClass('is-active')
		$search.toggleClass('is-active')
		$header.toggleClass('is-search-open')

		$('.js-mobile-menu, .header__device').removeClass('is-active')
	})

})($)