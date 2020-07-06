(() => {
	function isScrolledIntoView(el) {
		const rect = el.getBoundingClientRect();
		const elemTop = rect.top;
		const elemBottom = rect.bottom;
		const isVisible =
			elemTop < window.innerHeight && elemBottom >= el.clientHeight / 2;
		return isVisible;
	}

	const cont = document.querySelector(`.js-article`);
	const title = document.querySelector(`.js-title`);
	const link = document.querySelector(`.js-link`);

	// window.addEventListener(`scroll`, () => {
	//   if (title && link) {
	//     if (isScrolledIntoView(title)) {
	//       link.classList.add(`is-active`);
	//     } else {
	//       link.classList.remove(`is-active`);
	//     }
	//   }
	// });

	let winWidth = $(window).width();

	if (winWidth < 581) {
		const $toggle = $(".js-toggle-title");
		window.addEventListener(`scroll`, () => {
			if (title && cont) {
				if (isScrolledIntoView(title)) {
					$toggle.addClass(`active`);
				} else if (!isScrolledIntoView(cont)) {
					$toggle.removeClass(`active`);
					$(".article-item__title-wrapper").removeClass("opened");
				}
			}
		});
		$toggle.on("click", (e) => {
			$(cont).addClass("is-active");
			$("body").css("overflow-y", "hidden");
			$(".article-item__title-wrapper").addClass("opened");
		});
		$(".js-title-close").on("click", (e) => {
			$(cont).removeClass("is-active");
			$("body").removeAttr("style");
			$(".article-item__title-wrapper").removeClass("opened");
		});
	}
})($);
