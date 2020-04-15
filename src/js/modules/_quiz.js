(function() {

	var $quiz = $('.js-quiz');

	if(!$quiz.length)
		return false;

	var total = $quiz.find('.js-slide[data-step]:last').data('step');
	$quiz.find('.js-total-step').text(total)


	$quiz.find('.js-goto').on('click', function (e) {

		e.preventDefault();

		var dir = $(this).data('dir');
		var $current = $quiz.find('.js-slide.is-active');
		var current = $current.index();
		var count = $quiz.find('.js-slide').length;
		var form = $(e.currentTarget).closest('form');

		if(dir == 'prev'){
			current = Math.max(0, (current - 1)); 
		}else{
			current = Math.min((current + 1), (count - 1)); 
		}

		// валидация слайда
	
		if(dir == 'next' && !$(e.currentTarget).hasClass('js-without-submit')){

			form.validate()
			var valid = form.valid();

			if(!valid)
				return false;
		}

		if(dir == 'prev' && $quiz.find('.js-slide').eq(current).hasClass('js-dont-backward'))
			return false;

		// отправка формы
		if(current == count){
			form.submit();
		}

		// отправка данных слайда
		if($current.hasClass('js-submit-slide') && !$(e.currentTarget).hasClass('js-without-submit')){
			var action = $current.data('action');
			var inputData = $current.find(':input').serialize();

            $.ajax({
                type: "POST",
                url: action,
                data: inputData,
                dataType:"html",
                success: function(msg){
                    console.log(msg);

                }
            });
		}
		
		// следующий слайд

		$quiz.find('.js-slide').removeClass('is-active').eq(current).addClass('is-active')

		// прогресс бар вопросов

		var $item = $quiz.find('.js-slide.is-active');
		var step = $item.attr('data-step');
		var barIndex = $item.index();
		var barIndexFirst = $quiz.find('.js-slide[data-step="'+step+'"]:first').index();
		var barIndexLast = $quiz.find('.js-slide[data-step="'+step+'"]:last').index();

		var barQuestionCount = barIndexLast - barIndexFirst + 1;
		var barQuestionCurrent = barIndex - barIndexFirst + 1;

		var barWidth = 100 / (barQuestionCount / barQuestionCurrent);

		$('.js-bar-current').text(barQuestionCurrent)
		$('.js-bar-total').text(barQuestionCount)
		$('.js-bar-done').css('width', barWidth + '%')
 		

 		// настройки слайда
		if($item.attr('data-title')){
			$quiz.find('.js-title').text($item.data('title'))
		}

		if(step){
			$quiz.find('.js-current-step').text(step)
		}

		if($item.hasClass('js-hide-bottom')){
			$quiz.find('.quiz__bottom').removeClass('is-visible')
		}else{
			$quiz.find('.quiz__bottom').addClass('is-visible')
		}

	})

})($)