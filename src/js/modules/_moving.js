(() => {
	if (!$(".js-move-item").length) return false;

	$(window).on("load resize", () => {
		let ww = $(window).width();

		$(".js-move-item").each((i, el) => {
			let $this = $(el);

			let $to = $($this.data("to"));
			let $from = $($this.data("from"));

			let method = $this.attr("data-method")
				? $(this).data("method")
				: "append";

			let point = $this.attr("data-point")
				? parseInt($this.data("point"))
				: 1024;

			if (ww <= point) {
				if (method == "append") {
					$this.appendTo($to).addClass("is-moved");
				} else {
					$this.prependTo($to).addClass("is-moved");
				}
			} else {
				if ($this.hasClass("is-moved")) {
					if (method == "append") {
						$this.appendTo($from).removeClass("is-moved");
					} else {
						$this.prependTo($from).removeClass("is-moved");
					}
				}
			}
		});
	});
})($);
