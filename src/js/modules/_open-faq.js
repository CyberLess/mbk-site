(() => {
	const $firstFaq = $('.faq__accordion .accordion__top').eq(0);

	if ($firstFaq) {
		$firstFaq.trigger('click');
	}
})($);
