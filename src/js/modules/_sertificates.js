import { setStartItemsQuantity, setCurrentPage } from "./_comments-blog";

(() => {
	const $list = $('.sertificates__list-cert');

	const $wrapTop = $('.sertificates__list-wrap_top');
	const $listTop = $wrapTop.find('.sertificates__list-cert');
	const $topItems = $listTop.find('.sertificates__item-cert');
	const $topCurPage = $wrapTop.find('.sertificates__conter-current').eq(0);
	const $topAllPages = $wrapTop.find('.sertificates__counter-total').eq(0);

	const $wrapBottom = $('.sertificates__list-wrap_bottom');
	const $listBottom = $wrapBottom.find('.sertificates__list-cert');
	const $bottomItems = $listBottom.find('.sertificates__item-cert');
	const $bottomCurPage = $wrapBottom.find('.sertificates__conter-current').eq(0);
	const $bottomAllPages = $wrapBottom.find('.sertificates__counter-total').eq(0);

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

	$listTop.on('initialize.owl.carousel', () => {
		setStartItemsQuantity($topItems, $topAllPages);
	}).on('changed.owl.carousel', function (evt) {
		setCurrentPage(evt, $topCurPage, $topAllPages, 'sertificates__list-wrap')
	});

	$listBottom.on('initialize.owl.carousel', () => {
		setStartItemsQuantity($bottomItems, $bottomAllPages);
	}).on('changed.owl.carousel', function (evt) {
		setCurrentPage(evt, $bottomCurPage, $bottomAllPages, 'sertificates__list-wrap')
	});
})();
