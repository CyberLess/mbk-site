(() => {
	let $list = $(".js-mobile-list-hide");
	let items = ".js-mobile-list-item";
	let $button = $(".js-mobile-list-more");

	if (!$list.length) return false;

	$(window).on("load resize", () => {
		$list
			.find(items)
			.removeClass("is-visible")
			.slice(0, 3)
			.addClass("is-visible");
	});

	$button.on("click", (e) => {
		$list.find(items).not(".is-visible").slice(0, 3).addClass("is-visible");

		let count = $list.find(items).not(".is-visible").length;

		if (!count) $(e.currentTarget).hide();
	});
	// .each((i, el) => {

	// })
})($);
