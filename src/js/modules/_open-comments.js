(() => {
	let $comment = $(".comment_open");

	if (!$comment.length) return false;

	let $likes = $(".js-comment-like");

	$likes.on("click", (e) => {
		e.preventDefault();

		let $this = $(e.currentTarget);
		let $count = $this.find(".comment__nav-text");

		let count = $count.length ? parseInt($.trim($count.text())) : 0;

		$this.toggleClass("is-clicked");

		if ($this.hasClass("is-clicked")) {
			count++;
		} else {
			count = Math.max(0, count - 1);
		}

		if (!$count.length) {
			const elem = `<span class="comment__nav-text" style="position: absolute; top: 50%; right: 0; opacity: 0; transform: translateY(-50%)">${count}</span>`;

			const $apendedElem = $this.append(elem).find('.comment__nav-text');
			const width = $apendedElem.width();

			$this.animate({
				paddingRight: `${width + 8}px`
			}, 300, function () {
				$apendedElem.animate({
					opacity: 1
				});
			});
		} else {
			$count.text(count);
		}

		if (!count) {
			const $apendedElem = $this.find('.comment__nav-text');
			$apendedElem.css('opacity', '0');

			$this.animate({
				paddingRight: 0
			}, 300, function () {
				$(this).addClass("is-empty");
				$apendedElem.remove();
			});
		} else {
			$this.removeClass("is-empty");
		}
	});

	let $cloneForm = $(".comments__clone-form > *");
	let $commentForm = $(".js-comment-form");

	$commentForm.on("click", (e) => {
		e.preventDefault();

		let $this = $(e.currentTarget);
		let $comment = $this.closest(".comment");
		let $container = $comment.find(">.js-comment-form-area");
		let $copyForm = $cloneForm.clone();

		if ($container.find(".js-clone-form").length) {
			$container.find(".js-clone-form").slideUp(500, function () {
				$container.prevAll('.comment__content').css({
					borderBottom: ''
				});
				$(this).remove();
			});
			$container.removeClass("is-form-open");

			// $comment
			// 	.find(">.comment__content")
			// 	.removeClass("comment__content_no-border");
		} else {
			$(".comment .js-clone-form").remove();
			$container.addClass("is-form-open");
			// $(".comment__content").removeClass("comment__content_no-border");

			// if (!$comment.hasClass("is-opened")) {
			// 	$comment
			// 		.find(">.comment__content")
			// 		.addClass("comment__content_no-border");
			// }

			$container.prevAll('.comment__content').css({
				borderBottom: 'none'
			});
			$copyForm.hide();
			$container.append($copyForm);
			$container.find($copyForm).slideDown(500);

			// if ($comment.is(":last-child")) {
			// 	$container
			// 		.find(".js-clone-form .comment__content")
			// 		.addClass("comment__content_no-border");
			// }
		}
	});

	$comment.each((i, comment) => {
		let $btn = $(comment).find(".comment__button_open");
		let $el = $(comment).find(".comment__other_hidden");

		$btn.on("click", (e) => {
			$el.slideToggle(400);
			$btn.toggleClass("comment__button_arrow-up");

			$(comment).toggleClass("is-opened");

			// if (
			// 	$(comment).find(".js-clone-form").length &&
			// 	$(comment).hasClass("is-opened")
			// ) {
			// 	$(comment)
			// 		.find(">.comment__content")
			// 		.removeClass("comment__content_no-border");
			// } else {
			// 	$(comment)
			// 		.find(">.comment__content")
			// 		.addClass("comment__content_no-border");
			// }

			if (!$btn.data("status")) {
				$btn.find("span").text($btn.data("hide"));
				$btn.data("status", true);
			} else {
				$btn.find("span").text($btn.data("open"));
				$btn.data("status", false);
			}
		});
	});
})($);
