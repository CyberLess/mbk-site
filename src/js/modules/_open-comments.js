(() => {

	let $comment = $('.comment_open');

	if(!$comment.length)
		return false;

	$comment.each((i, comment) => {
		let $btn = $(comment).find('.comment__button_open');
		let $el = $(comment).find('.comment__other_hidden');

		$btn.on('click', e => {
			$el.slideToggle(400);
			$btn.toggleClass('comment__button_arrow-up');

			if (!$btn.data('status')) {
				$btn.find('span').text('Свернуть ответ');
				$btn.data('status', true);
			}
			else {
				$btn.find('span').text('Открыть ответ');
				$btn.data('status', false);
			}
		});

	})

})($)