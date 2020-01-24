(()=>{

	$('.js-mobile-menu').on('click', e => {
		let $this = $(e.currentTarget);
		let $menu = $('.header__device');

		$this.toggleClass('is-active')
		$menu.toggleClass('is-active')

		$('.search, .header, .js-search-toggle').removeClass('is-active is-search-open')

		$('.js-device-backward, .js-service-backward, .js-mobile-close-inside').trigger('click')
	})

	$('.js-close-mobile-menu').on('click', e => {
		$('.js-mobile-menu').trigger('click')
	})

	$('.js-mobile-link').on('click', e => {
		e.preventDefault();

		let id = $(e.currentTarget).data('menu');

		let $submenu = $(`[data-submenu="${id}"]`);

		$('.header__device-menu').hide()

		$submenu.show()

	})

	$('.js-device-backward').on('click', e => {
		e.preventDefault();
		$(`[data-submenu]`).hide();
		$('.header__device-menu').show()
	})

	$('.js-mobile-nav-tab').on('click', e => {

		let ww = $(window).width()
		if(ww > 768)
			return false;

		let $tabs = $(e.currentTarget).closest('.tabs');
		let $submenu = $(e.currentTarget).closest('.header__parts-submenu');
		$tabs.find('.tabs__nav').hide()
		$tabs.find('.tabs__content').show()

		$submenu.find('.header__parts-nav').hide()

	})

	$('.js-service-backward').on('click', e => {

		let ww = $(window).width()
		if(ww > 768)
			return false;

		let $tabs = $(e.currentTarget).closest('.tabs');
		let $submenu = $(e.currentTarget).closest('.header__parts-submenu');

		$tabs.find('.tabs__nav').show()
		$tabs.find('.tabs__content').hide()

		$submenu.find('.header__parts-nav').show()		
	})

	$('.js-mobile-open-inside').on('click', e => {

		let ww = $(window).width()
		if(ww > 768)
			return false;

		let $cell = $(e.currentTarget).parent();

		let $submenu = $(e.currentTarget).closest('.header__parts-submenu');

		$cell.find('.services-tab__title').hide()	
		$cell.find('.services-tab__content').show()	

		$submenu.find('.services-tab__mobile').hide()

		$('.services-tab__cell').not($cell).hide()
	})

	$('.js-mobile-close-inside').on('click', e => {

		let ww = $(window).width()
		if(ww > 768)
			return false;

		let $cell = $(e.currentTarget).closest('.services-tab__cell');

		let $submenu = $(e.currentTarget).closest('.header__parts-submenu');

		$('.services-tab__title, .services-tab__content, .services-tab__cell').removeAttr('style')	

		$submenu.find('.services-tab__mobile').show()

	})


})($)