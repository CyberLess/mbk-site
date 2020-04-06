(() => {

	let service =  $('.service'),
		row = service.find('.service__row');


	if(!service.length)
		return false;

	$('.js-service-type').on('click', e => {

		let $this = $(e.currentTarget);

		let inline = $this.attr('data-inline');

		$('.js-service-type').removeClass('is-active')
		$this.addClass('is-active')

		console.log('inline', inline)



		row.fadeOut(200, () => {
			if(inline){
				row.addClass('is-inline')
			}else{
				row.removeClass('is-inline')
			}			

			row.fadeIn(200)
		})

	})

})($)