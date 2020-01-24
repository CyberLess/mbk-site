(() => {

	let $blog_filter = $('.blog__filter-inside');

	// if(!$blog_filter.length)
	// 	return false;

	$('.js-open-filter').on('click', e => {
		e.preventDefault();

		$('html, body').addClass('js-lock')

		$blog_filter.addClass('is-active')
	})

	$('.js-close-filter').on('click', e => {
		e.preventDefault();

		$('html, body').removeClass('js-lock')

		$blog_filter.removeClass('is-active')
	})

	$('.blog__mobile-label').on('click', e => {

		let $item = $($(e.currentTarget).data('selector'));

		$('.blog__cell').hide()

		$('.blog__mobile-label').removeClass('is-active')

		$(e.currentTarget).addClass('is-active')

		$item.show()

	})

})($)