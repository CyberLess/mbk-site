export var setStartItemsQuantity = ($items, $elem) => {
	const itemsQuantity = $items.length;

	$elem.text(` ${itemsQuantity}`);
};

export var setCurrentPage = (evt, $currentPage, $allPages, listWrapClass) => {

	if (listWrapClass) {
		const clonesLength = $currentPage.closest(`.${listWrapClass}`).find('.cloned').length;
    const current = evt.item.index + 1 - Math.floor(clonesLength / 2);
    const text = current === 0 ? evt.item.count : current;
		$currentPage.text(text);
	} else {
		$currentPage.text(evt.item.index + 1);
	}

	$allPages.text(evt.item.count);
};

(() => {
	const $sliderList = $('.comments-blog__list');
	const $items = $('.comments-blog__item');
	const $currentPage = $('.comments-blog__current-page');
	const $allPages = $('.comments-blog__of-pages');

	$sliderList.owlCarousel({
		dots: false,
		dotsEach: false,
		nav: true,
		navText: ['<svg class="icon-arrow" fill="none" version="1.1" viewBox="0 0 18.561 9.6213" xmlns="http://www.w3.org/2000/svg"><g shape-rendering="auto"><path d="m13.75 0v4.0605h-13.75v1.5h13.75v4.0605l4.8105-4.8105z" /></g></svg>', '<svg class="icon-arrow" fill="none" version="1.1" viewBox="0 0 18.561 9.6213" xmlns="http://www.w3.org/2000/svg"><g shape-rendering="auto"><path d="m13.75 0v4.0605h-13.75v1.5h13.75v4.0605l4.8105-4.8105z" /></g></svg>'],
		navContainer: '.comments-blog__nav',
		responsive: {
			0: {
				autoWidth: false,
				items: 1,
				autoHeight: true
			},
			581: {
				autoHeight: false,
				autoWidth: true,
				items: 3,
				margin: 0
			}
		}
	});

	$sliderList.on('changed.owl.carousel', (evt) => {
		setCurrentPage(evt, $currentPage, $allPages);
	});

	setStartItemsQuantity($items, $allPages);
})();
