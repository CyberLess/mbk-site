(()=>{
	let $reviews = $('.reviews__slider');
	let action = $reviews.data('action');



	if(!$reviews.length)
		return false;

	$reviews.owlCarousel({
		items: 1,
		margin: 0,
		dots: false,
		nav: false,
		loop: false
	}).on('changed.owl.carousel', e => {

		let carousel = e.relatedTarget;
		let slideIndex = (carousel.relative(carousel.current()));	

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

			let data = {};

			$reviews.trigger('add.owl.carousel', 
				[`
					<div class="reviews__row flex flex_vertical is-loading" id="${id.replace('#', '')}">
                        <div class="reviews__cell reviews__cell_video">
                            <div class="reviews__video video">
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
			$.ajax({
				url: action,
				type: "GET",
				data: data,
				dataType: 'json',
				success: response => {
					for (var i in response) {
						let $item = $("#"+response[i].id);

						if($item.length){

						// иммитация задержки
						setTimeout(function() {
							$item.find('.reviews__name span').text(response[i].name)
							$item.find('.reviews__who span').text(response[i].who)
							$item.find('.reviews__text').html(response[i].content)

							$item.removeClass('is-loading')								
						}, 1500)

						}else{
							$reviews.trigger('add.owl.carousel', 
								[`
									<div class="reviews__row flex flex_vertical" id="${response[i].id}">
				                        <div class="reviews__cell reviews__cell_video">
				                            <div class="reviews__video video">
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
					// console.log(response)
				}
			});
		}
	})

})($)