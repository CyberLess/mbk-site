import 'selectric';

(() => {

	let $select = $('.js-select');

	if(!$select.length)
		return false;


	$select.each((i, el) => {

		$(el).find('.select__field').selectric({
			maxHeight: 180,
			nativeOnMobile: false
		});

	})

})($)
