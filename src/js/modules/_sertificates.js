(() => {
	const $list = $('.sertificates__list-cert');

	$list.magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		}
	});
})();
