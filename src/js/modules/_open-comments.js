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
			$this.append(`<span class="comment__nav-text">${count}</span>`);
		} else {
			$count.text(count);
		}

		if (!count) {
			$this.addClass("is-empty").find(".comment__nav-text").remove();
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
			$container.find(".js-clone-form").remove();
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

			$container.append($copyForm);

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
