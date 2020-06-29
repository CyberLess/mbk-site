(()=>{
	let $reviews = $('.reviews__slider');
	let action = $reviews.data('action');
	let loading = false;
	let stop = false;
	let old_count = 0;

	if(!$reviews.length)
		return false;

	let ajax_reviews = () => {
		let data = {};

		if(loading || stop)
			return false;

		loading = true;

		$.ajax({
			url: action,
			type: "GET",
			data: data,
			dataType: 'json',
			success: response => {
				loading = false;
				console.log(response)

				for (var i in response) {
					let $item = $("#"+response[i].id);

					let $picture = `
						<picture>
							${("image_webp" in response[i]) ? `<source type="image/webp" srcset="${response[i].image_webp}">` : ""}
						    <img src="${response[i].image_jpg}" class="video__preview object-fit" alt="">
						</picture>
					`;

					console.log($picture)

					if($item.length){

						// setTimeout - иммитация задержки
						setTimeout(function() {
							$item.find('.reviews__name span').text(response[i].name)
							$item.find('.reviews__who span').text(response[i].who)
							$item.find('.reviews__text').html(response[i].content)
							$item.find('.reviews__video').prepend($picture)
							$item.find('.reviews__video').attr('data-youtube', response[i].youtube)

							$item.removeClass('is-loading')
						}, 1500)

					}else{

						$reviews.trigger('add.owl.carousel',
							[`
								<div class="reviews__row flex flex_vertical" id="${response[i].id}">
			                        <div class="reviews__cell reviews__cell_video">
			                            <div class="reviews__video video js-modal" data-modal="#video" data-youtube="${response[i].youtube}">
				                            ${$picture}
				                            <div class="video__play"></div>
			                            </div>
			                        </div>
			                        <div class="reviews__cell reviews__cell_content">
				                        <div class="reviews__top">
					                        <div class="reviews__name h4"><span>${response[i].name}</span></div>
					                        <div class="reviews__who h6"><span>${response[i].who}</span></div>
				                        </div>
			                            <div class="reviews__text h6">${response[i].content}</div>
			                            <div class="reviews__nav flex flex_vertical"><a class="reviews__button btn h6" href="#">Читать полностью</a><a class="reviews__apply red-link h6" href="#">Обратиться в&nbsp;мбк</a>
			                            </div>
			                        </div>
			                    </div>
							`])
							.trigger('refresh.owl.carousel')
					}
				}

				if(old_count == $('.reviews__row').length){
					stop = true
				}

				old_count = $('.reviews__row').length

			}
		});
	}

	$reviews.owlCarousel({
		items: 1,
		margin: 0,
		dots: false,
		nav: true,
		loop: false,
		mouseDrag: false,
		touchDrag: false,
		navText: ['<svg viewBox="0 0 18.560659 9.6213207"><path class="triangle" d="M14.5 4.81v-3l3 3-3 3z"></path><path class="stroke" d="M14.764 4.864l-.193.23-.61-.133.539-.15m0 0v-3l3 3-3 3zM.007 4.151h13.79v1.542H.007z"></path></svg>', '<svg viewBox="0 0 18.560659 9.6213207"><path class="triangle" d="M14.5 4.81v-3l3 3-3 3z"></path><path class="stroke" d="M14.764 4.864l-.193.23-.61-.133.539-.15m0 0v-3l3 3-3 3zM.007 4.151h13.79v1.542H.007z"></path></svg>'],
		responsive : {
		    0 : {
		    	nav: true,
				touchDrag: true,
		    },

		    769 : {
		    	touchDrag: false,
					navText: ['<svg class="icon-arrow" fill="none" version="1.1" viewBox="0 0 18.561 9.6213" xmlns="http://www.w3.org/2000/svg"><g shape-rendering="auto"><path d="m13.75 0v4.0605h-13.75v1.5h13.75v4.0605l4.8105-4.8105z" /></g></svg>', '<svg class="icon-arrow" fill="none" version="1.1" viewBox="0 0 18.561 9.6213" xmlns="http://www.w3.org/2000/svg"><g shape-rendering="auto"><path d="m13.75 0v4.0605h-13.75v1.5h13.75v4.0605l4.8105-4.8105z" /></g></svg>'],
					navContainer: '.reviews__nav-arrows',
		    }
		}
	}).on('changed.owl.carousel', e => {

		let carousel = e.relatedTarget;
		let slideIndex = (carousel.relative(carousel.current()));

		let total = carousel.items().length - 1;

		console.log(slideIndex, total)

		$('.reviews__conter-current').text(slideIndex + 1)

		if(slideIndex >= total){
			ajax_reviews()
		}

		$('.reviews__item')
			.removeClass('reviews__item_active')
			.eq(slideIndex)
			.addClass('reviews__item_active')

	})

	$('.reviews__item').on('click', e => {
		let id = $(e.currentTarget).attr('data-review');
		let $review = $(id);
		let ind = $(e.currentTarget).index();

		if($review.length){
			$reviews.trigger('to.owl.carousel', [ind, 0])
		}else{

			$reviews.trigger('add.owl.carousel',
				[`
					<div class="reviews__row flex flex_vertical is-loading" id="${id.replace('#', '')}">
                        <div class="reviews__cell reviews__cell_video">
                            <div class="reviews__video video js-modal" data-modal="#video">
	                            <div class="video__play"></div>
                            </div>
                        </div>
                        <div class="reviews__cell reviews__cell_content">
	                        <div class="reviews__top">
		                        <div class="reviews__name h4"><span>Loading Name</span></div>
		                        <div class="reviews__who h6"><span>Lorem ipsum dolor sit amet</span></div>	                        
	                        </div>
                            <div class="reviews__text h6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat obcaecati, accusantium.
                                <br>
                                <br>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam quidem quaerat consectetur dolorum dignissimos sint nemo hic, eaque velit totam doloribus.</div>
                            <div class="reviews__nav flex flex_vertical"><a class="reviews__button btn h6" href="#">Читать полностью</a><a class="reviews__apply red-link h6" href="#">Обратиться в&nbsp;мбк</a>
                            </div>
                        </div>
                    </div>
				`])
				.trigger('refresh.owl.carousel')
				.trigger('to.owl.carousel', [ind, 0]);

			// console.log("action",action)
			ajax_reviews()
		}
	})

})($)
