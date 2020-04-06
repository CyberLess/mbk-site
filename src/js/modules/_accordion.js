(() => {

	let $accordion = $('.js-accordion');

	if(!$accordion.length)
		return false;

	$accordion.each((i, el) => {

		$(el).find('.accordion__top').on('click', e => {

			$accordion
				.not(el)
				.removeClass('is-active')
				.find('.accordion__content')
				.slideUp(400)				

			$(el)
				.toggleClass('is-active')
				.find('.accordion__content')
				.slideToggle(400)

		})

	})

})($)