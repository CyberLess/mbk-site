import { animationEnd, transitionEnd } from "../functions";

var background = {
	selector: ".js-gallery-background",

	step: (el) => {
		console.log("gallery background");
		$(el).on(animationEnd, (e) => {
			let index = $(el).index();

			let count = $(background.selector).length;

			let next = count - (index + 1) > 0 ? index + 1 : 0;

			$(background.selector).eq(next).addClass("is-active is-next");

			$(el)
				.addClass("is-done")
				.on(transitionEnd, (e) => {
					if (e.originalEvent.propertyName == "opacity") {
						$(background.selector)
							.eq(next)
							.addClass("is-visible")
							.removeClass("is-next");

						$(el)
							.off(transitionEnd)
							.removeClass(
								"is-active is-next is-done is-visible"
							);
					}
				});
		});
	},

	init: () => {
		if (!$(background.selector).length) return false;

		$(background.selector).each((i, el) => background.step(el));
	},
};

export { background };
