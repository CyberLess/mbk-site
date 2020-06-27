(() => {
	const $header = $('.header');
	let scrollPrev = 0;

	$(window).scroll(function() {
		if ($(this).width() > 1024) {
			const scrolled = $(window).scrollTop();

			if (scrolled > $header.outerHeight()) {
				if (scrolled < scrollPrev && !window.itsTitleScroll) {
					$header.removeClass('sticky-hidden');
				} else {
					$header.addClass('sticky sticky-hidden');
				}

				if (scrolled > $header.outerHeight() + 50) {
					$header.addClass('sticky-transition');
				}

				scrollPrev = scrolled;
			} else if (scrolled === 0) {
				$header.removeClass('sticky sticky-hidden sticky-transition');
			}
		}
	});
})($);
