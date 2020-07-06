import { transitionEnd } from "../functions";

$(function () {
	if (!$(".ba").length) return false;

	const MOBILE_MAX_WIDTH = 768;
	let isMobile = $(window).width() <= MOBILE_MAX_WIDTH;

	var relXPer = 0;
	var relYPer = 0;
	var slider, handle, arrow;
	var requestID;
	var degree;

	const onMousemoveTouchmoveTouchstart = function (evt) {
		evt.preventDefault();

		const moveSlider = function (thisEl) {
			var touchstart =
					evt.type === "touchstart" || evt.type === "touchmove",
				e = touchstart ? evt.originalEvent : evt,
				pageX = touchstart ? e.targetTouches[0].pageX : e.pageX,
				pageY = touchstart ? e.targetTouches[0].pageY : e.pageY;

			slider = thisEl;
			handle = slider.find(".ba__handle");
			arrow = slider.find(".ba__arrow");

			var offset = slider.offset();

			var width = slider.outerWidth();
			var height = slider.outerHeight();

			var relX = pageX - offset.left;
			var relY = pageY - offset.top;

			relXPer = 100 / (width / relX);
			relYPer = 100 / (height / relY);

			var center_x = offset.left + width / 2;
			var center_y = offset.top + height / 2;
			var mouse_x = pageX;
			var mouse_y = pageY;
			var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
			degree = radians * (180 / Math.PI) * -1 + 90;

			requestID = window.requestAnimationFrame(ba_update);
		};

		if (!isMobile && $(".ba__inner:active").length > 0) {
			moveSlider($(this));
		}

		if (isMobile) {
			moveSlider($(this));
		}
	};

	const onMouseleave = function () {
		if (
			$(".we-sell__comment-opener:hover").length === 0 &&
			$(".we-sell__help:hover").length === 0
		) {
			handle = $(this).find(".ba__handle");
			arrow = $(this).find(".ba__arrow");

			arrow.css({
				transform: "rotate(180deg)",
			});

			handle.css({
				left: "50%",
			});

			$(this)
				.addClass("is-mouseleave")
				.find(".ba__resize")
				.css({
					width: "50%",
				})
				.on(transitionEnd, function (e) {
					$(this)
						.off(transitionEnd)
						.removeAttr("style")
						.closest(".ba")
						.addClass("js-animation-play");
				});

			window.cancelAnimationFrame(requestID);
		}
	};

	const onMouseEnter = function () {
		$(this)
			.removeClass("is-mouseleave js-animation-play")
			.find(".ba__resize")
			.off(transitionEnd);
	};

	$(".ba")
		.on("mousemove touchmove touchstart", onMousemoveTouchmoveTouchstart)
		// .on("mouseleave", onMouseleave)
		.on("mouseenter", onMouseEnter);

	function ba_update() {
		if (slider.hasClass("is-mouseleave")) return false;

		slider
			.addClass("is-moving")
			.removeClass("is-mouseleave js-animation-play")
			.find(".ba__resize")
			.css({
				width: relXPer + "%",
			});

		handle.css({
			left: relXPer + "%",
		});

		arrow.css({
			transform: "rotate(" + degree + "deg)",
		});
	}

	$(window).on("load resize", function () {
		if (!$(".ba").length) return false;

		$(".ba__image").each(function () {
			var width = $(this).closest(".ba").outerWidth();
			// console.log("width", width)
			$(this).css("width", width + "px");
		});
	});

	$(window).resize(() => {
		$(".ba").off();
		$(".ba").on(
			"mousemove touchmove touchstart",
			onMousemoveTouchmoveTouchstart
		);
		// .on('mouseleave', onMouseleave).on('mouseenter', onMouseEnter);
	});
});
