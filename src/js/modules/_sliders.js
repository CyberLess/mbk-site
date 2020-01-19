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
						navText: ['<svg class="icon" viewBox="0 0 11.7 11.7"><use xlink:href="/app/icons/sprite.svg#arrow2"></use></svg>', '<svg class="icon" viewBox="0 0 11.7 11.7"><use xlink:href="/app/icons/sprite.svg#arrow2"></use></svg>']	
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