(() => {
	let $tabs = $('.tabs');

	if(!$tabs.length)
		return false;

	$tabs.each((i, el) => {

		let $list = $(el).find('.tabs__content-list');
		let $nav = $(el).find('.js-tab-nav');

		$nav.on('click', e => {
			let index = $(e.currentTarget).index();

			$nav.removeClass('is-active')
			$(e.currentTarget).addClass('is-active')
			
			$('.tabs__content-item')
				.removeClass('is-active')
				.eq(index)
				.addClass('is-active')

			if($list.length)
				$list.css({
					'left': `-${index * 100}%`
				})

		})

	})


})($)