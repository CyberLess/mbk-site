(() => {
	const $sertificatesLink = $('[href="#sertificates"]');
	const $sertificateScrollElem = $('#sertificates');
	const $titleLink = $('.article-item__title-link[href="#title"]');
	const $title = $('#title');
	const $newsArrow = $('.header-arrow__down[href="#news-page"]');
	const $newsBlock = $('#news-page');

	const scrollToElement = (evt, $element) => {
		evt.preventDefault();

		$('html, body').animate({
			scrollTop: $element.offset().top - 20
		}, 400);

		window.itsTitleScroll = true;
		setTimeout(() => {
			window.itsTitleScroll = false;
		}, 500)
	};

	$sertificatesLink.click(function (evt) {
		scrollToElement(evt, $sertificateScrollElem);
	});

	$titleLink.click(function (evt) {
		scrollToElement(evt, $title);
	});

	$newsArrow.click(function (evt) {
		scrollToElement(evt, $newsBlock);
	});
})($);
