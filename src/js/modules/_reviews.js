(()=>{
	let $reviews = $('.reviews__slider');

	if(!$reviews.length)
		return false;

	$reviews.owlCarousel({
		items: 1,
		margin: 0,
		dots: false,
		nav: false
	})

})($)