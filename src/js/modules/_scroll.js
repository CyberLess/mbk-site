(() => {
	const $sertificatesLink = $('[href="#sertificates"]');
	const $sertificateScrollElem = $('#sertificates');

	const scrollToElement = (evt, $element) => {
		evt.preventDefault();

		$('html, body').animate({
			scrollTop: $element.offset().top
		}, 400);
	};

	$sertificatesLink.click(function (evt) {
		scrollToElement(evt, $sertificateScrollElem);
	})
})($);
