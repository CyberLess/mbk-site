(() => {

	let $items = $('.js-gallery-slider');

	if (!$items.length)
		return false;

	$items.each((i, el) => {

		$(el).find('.gallery-slider__link').on('mouseenter', e => {

			let $this = $(e.currentTarget);

			let $parent = $this.parent();

			let index = $parent.index();

			$(el)
				.find('.gallery-slider__image')
				.removeClass('is-active')
				.eq(index)
				.addClass('is-active')

		})

	})

})($)