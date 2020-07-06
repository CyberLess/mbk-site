(() => {
	const container = document.querySelector(".js-news-page");
	if (!container) {
		return;
	}

	const btns = container.querySelectorAll('[data-toggle="news-tab"]');
	if (!btns.length) {
		return;
	}

	btns.forEach((btn) => {
		btn.addEventListener("click", function (evt) {
			evt.preventDefault();
			let thisTarget = evt.target;
			let activeBtn = container.querySelector(".news-aside__link_active");
			let id = thisTarget.getAttribute("data-target");
			let content = container.querySelector(".js-tab-content" + id);
			let activeContent = container.querySelector(
				".js-tab-content.active"
			);

			activeBtn.classList.remove("news-aside__link_active");
			btn.classList.add("news-aside__link_active");

			activeContent.classList.remove("active");
			content.classList.add("active");
			window.scroll(0, 0);

			let winWidth = $(window).width();

			if (winWidth < 1025) {
				$(container).addClass("is-active");
				$("html,body").addClass("js-lock");
				$(".news-page__column_left").addClass("active");
			}
		});
	});

	let winWidth = $(window).width();

	if (winWidth < 1025) {
		const btnClose = container.querySelector(".js-news-close");

		if (btnClose) {
			btnClose.addEventListener("click", function (evt) {
				evt.preventDefault();
				$(container).removeClass("is-active");
				$("html,body").addClass("js-lock");
				$(".news-page__column_left").removeClass("active");
			});
		}
	}
})($);
