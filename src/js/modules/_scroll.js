(() => {
	const $sertificatesLink = $('[href="#sertificates"]');
	const $sertificateScrollElem = $('#sertificates');
	const $titleLink = $('.article-item__title-link[href="#title"]');
	const $title = $('#title');

	const scrollToElement = (evt, $element) => {
		evt.preventDefault();

		$('html, body').animate({
			scrollTop: $element.offset().top - 20
		}, 400);
	};

	$sertificatesLink.click(function (evt) {
		scrollToElement(evt, $sertificateScrollElem);
	});

	$titleLink.click(function (evt) {
		scrollToElement(evt, $title);
	});
})($);
