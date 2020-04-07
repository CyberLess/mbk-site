(function() {

	var $quiz = $('.js-quiz');

	if(!$quiz.length)
		return false;



	$quiz.find('.js-goto').on('click', function (e) {

		e.preventDefault();

		var dir = $(this).data('dir');
		var current = $quiz.find('.js-slide.is-active').index();
		var count = $quiz.find('.js-slide').length;

		if(dir == 'prev'){
			current = Math.min(0, (current - 1)); 
		}else{
			current = Math.min((current + 1), (count - 1)); 
		}

		$quiz.find('.js-slide').removeClass('is-active').eq(current).addClass('is-active')

		if(current == 0){
			$quiz.find('.quiz__bottom').removeClass('is-visible')
		}else{
			$quiz.find('.quiz__bottom').addClass('is-visible')
		}

	})

})($)