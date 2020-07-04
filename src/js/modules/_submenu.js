import { animationEnd } from "../functions";

var submenu_close;

$(() => {
	var $submenu = $(".header__panel");
	var $header = $(".header");
	var windowPostion = 0;
	var currentOut = false;

	if (!$submenu.length) return false;

	var submenu_resize = () => {
		$submenu.css({
			"padding-top": $header.outerHeight() - 1,
		});
	};

	submenu_close = () => {
		$(".js-submenu").removeClass("is-active");
		$("html, body").removeClass("js-lock");
		$(".header").removeClass("is-submenu-open");

		$("body").removeAttr("style");

		console.log("submenu close");

		// window.scroll(0, windowPostion);

		$submenu
			.addClass("is-hide")
			.removeClass(" css-another")
			.on(animationEnd, () => {
				// $submenu.off(animationEnd).removeClass('header__panel_visible is-hide css-another')
				$submenu
					.off(animationEnd)
					.removeClass("is-hide header__panel_visible");
				$(".header__panel-item").removeClass(
					"header__panel-item_active css-another"
				);
			});
	};

	$(window).on("load resize", () => {
		let ww = $(window).width();

		submenu_resize();

		if (ww <= 1024) {
			$(".js-mobile-submenu").each((i, el) => {
				let id = $(el).attr("data-submenu");
				let $submodal = $(id).find(".wrap > *");

				$(el).addClass("is-moved");

				$submodal.appendTo($(el).find(".header__parts-inner"));
			});
		} else {
			$(".js-mobile-submenu.is-moved").each((i, el) => {
				let id = $(el).attr("data-submenu");
				let $submodal = $(el).find(".header__parts-inner > *");

				$(el).removeClass("is-moved");

				$submodal.appendTo($(id).find(".wrap"));
			});
		}
	});

	$(".js-mobile-group").on("click", (e) => {
		// e.preventDefault()

		if (e.target == e.currentTarget) {
			let $this = $(e.currentTarget);

			if ($this.find("+.header__mobile-submenu").length)
				$this
					.toggleClass("is-active")
					.find("+.header__mobile-submenu")
					.toggle();
		}
	});

	$(".js-submenu").each((i, el) => {
		let $this = $(el);
		let eventIn = $this.data("event");
		let eventOut = eventIn == "mouseenter" ? "mouseleave" : false;
		let $item = $($this.data("menu"));

		$this.on(eventIn, (e) => {
			currentOut = false;

			e.preventDefault();

			// windowPostion = window.scrollY;

			// console.log("windowPostion", windowPostion);

			let panelItemClass = "";

			if ($submenu.hasClass("header__panel_visible")) {
				panelItemClass = "css-another";
			}

			$submenu.off(animationEnd).removeClass("is-hide");

			$(".js-toggle-menu").removeClass("is-active");
			$(".js-submenu").removeClass("is-active");
			$(".header__mobile").removeClass("is-visible");

			// $("html, body").addClass("js-lock");
			$("body").css("overflow-y", "hidden");

			submenu_resize();

			// document.documentElement.scrollTop = 5000;

			// window.scrollTo(0, windowPostion);

			if (eventIn != "click") {
				$submenu.addClass(`header__panel_visible ${panelItemClass}`);
				$(".header__panel-item").removeClass(
					`header__panel-item_active ${panelItemClass}`
				);
				$item.addClass(`header__panel-item_active ${panelItemClass}`);
				$this.addClass("is-active");
				$(".header").addClass("is-submenu-open");
			} else {
				// $submenu.toggleClass('header__panel_visible')
				// $('.header__panel-item').removeClass('header__panel-item_active')
				// $item.toggleClass('header__panel-item_active')

				// ------------------------

				// $this.toggleClass('is-active')

				// if(!$this.hasClass('is-active') && $item.attr('id') == $this.data('menu')){
				// 	submenu_close()
				// }else{
				// 	$submenu.toggleClass(`header__panel_visible ${panelItemClass}`)
				// 	$('.header__panel-item').removeClass(`header__panel-item_active ${panelItemClass}`)
				// 	$item.toggleClass(`header__panel-item_active ${panelItemClass}`)
				// }

				// ------------------------
				// if($this.data('menu').indexOf($item.attr('id')) !== -1){
				// 	console.log('текущий')
				// }else{
				// 	console.log('другой')
				// }

				let $current = $(".header__panel-item_active");

				if (
					$current.length &&
					$this.data("menu").indexOf($current.attr("id")) !== -1
				) {
					submenu_close();
				} else {
					$submenu.addClass(
						`header__panel_visible ${panelItemClass}`
					);
					$(".header__panel-item").removeClass(
						`header__panel-item_active ${panelItemClass}`
					);
					$item.addClass(
						`header__panel-item_active ${panelItemClass}`
					);
					$this.addClass("is-active");
					$(".header").addClass("is-submenu-open");
				}
			}
		});

		if (eventOut) {
			$this.on(eventOut, (e) => {
				currentOut = eventOut;

				if (
					$(e.relatedTarget)
						.attr("class")
						.indexOf("header__panel") !== -1
				)
					//  && !$(e.relatedTarget).hasClass('header__panel-bg')
					return false;

				submenu_close();
			});
		}
	});

	$(".header__panel-item").on("mouseleave", (e) => {
		if (!currentOut) return false;

		submenu_close();
	});

	$(".header__panel-bg").on("click", (e) => {
		// if(!$(e.target).hasClass('header__panel'))
		// 	return false;

		submenu_close();
	});
});

export { submenu_close };
