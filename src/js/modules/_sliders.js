$(() => {
	$(window).on('load resize', function() {
		let winWidth = $(window).width();

		if(winWidth < 581){

			$('.js-to-slider')
				.addClass('owl-carousel')
				.each((i, el) => {

					let defaults = {
						items: 1,
						nav: true,
						loop: true,
						// autoHeight:true,
						autoplay: false,
						dots: false,
						margin: 30,	
						navText: ['<svg viewBox="0 0 18.560659 9.6213207"><path class="triangle" d="M14.5 4.81v-3l3 3-3 3z"></path><path class="stroke" d="M14.764 4.864l-.193.23-.61-.133.539-.15m0 0v-3l3 3-3 3zM.007 4.151h13.79v1.542H.007z"></path></svg>', '<svg viewBox="0 0 18.560659 9.6213207"><path class="triangle" d="M14.5 4.81v-3l3 3-3 3z"></path><path class="stroke" d="M14.764 4.864l-.193.23-.61-.133.539-.15m0 0v-3l3 3-3 3zM.007 4.151h13.79v1.542H.007z"></path></svg>']	
					}

					if($(el).attr('data-autowidth')){
						defaults['autoWidth'] = 1;
					}

					if($(el).attr('data-dots')){
						defaults['dots'] = true;
					}

					if($(el).attr('data-nonautoplay')){
						defaults['autoplay'] = false;
					}

					if($(el).attr('data-margin')){
						defaults['margin'] = parseInt($(el).data('margin'));
					}

					$(el).owlCarousel(defaults)

				})
		}else{
			if($('.js-to-slider').hasClass('owl-loaded'))
				$('.js-to-slider').trigger('destroy.owl.carousel')
		}
	})
})