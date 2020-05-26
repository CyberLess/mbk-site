(() => {
	let container = ".js-checkbox-list";

	let $container = $(container);
	let $inputs = $container.find("input");

	let reset = ".js-reset";
	let isAll = ".js-all";

	let active = "is-active";

	if (!$container.length) return false;

	$inputs.on("change", (e) => {
		let $parent = $(e.currentTarget).closest(container);

		let count = $parent.find("input:checked").length;

		if (count > 0) {
			$parent.find(reset).addClass(active);
		} else {
			$parent.find(reset).removeClass(active);
		}
	});

	$container.find(reset).on("click", (e) => {
		e.preventDefault();

		let $this = $(e.currentTarget);

		let $parent = $this.closest(container);

		if (!$this.hasClass(active)) return false;

		$this.removeClass(active);

		$parent.find("input:checked").prop("checked", false);
	});

	$container.find(isAll).on("click", (e) => {
		e.preventDefault();

		let $this = $(e.currentTarget);

		let $parent = $this.closest(container);

		$parent.find(reset).addClass(active);

		$parent.find("input").prop("checked", true);
	});
})($);
