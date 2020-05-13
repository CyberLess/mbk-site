import { numberWithSpaces } from "../functions";

(function () {
	var $quiz = $(".js-quiz");

	function get_total_price(e) {
		let $parent = $(e).closest("section");
		let $price = $parent.find(".js-price");
		let $time = $parent.find(".js-time");
		let $total = $parent.find(".js-total-payment");

		console.log(
			"test total price",
			$parent[0],
			$price[0],
			$time[0],
			$total[0]
		);

		let price = parseInt($price.val().replace(/\s+/g, ""));
		let time = parseInt($time.val().replace(/\s+/g, ""));
		let total = numberWithSpaces(parseInt(price / time));

		$total.text(total);
	}

	$(document).ready(() => {
		$(".js-payment").each((i, el) => get_total_price(el));
	});

	$(".js-payment").on("change", (e) => get_total_price(e.currentTarget));

	if (!$quiz.length) return false;

	var total = $quiz.find(".js-slide[data-step]:last").data("step");
	$quiz.find(".js-total-step").text(total);

	var global_total = parseInt($quiz.data("from"));
	$(".js-total-progress").text(`${global_total}%`);
	$(".status-bar__done").css("width", `${global_total}%`);

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

	$quiz.find(".js-goto").on("click", function (e) {
		e.preventDefault();

		var dir = $(this).data("dir");
		var $current = $quiz.find(".js-slide.is-active");
		var current = $current.index();
		var count = $quiz.find(".js-slide").length;
		var form = $(e.currentTarget).closest("form");

		if (dir == "prev") {
			current = Math.max(0, current - 1);
		} else {
			current = Math.min(current + 1, count);
		}

		// удаляем лишнее

		var $prevAll = $(e.currentTarget).closest(".js-target-form").prevAll();

		if ($prevAll.length) {
			$prevAll.each(function () {
				if (!$(this).hasClass("js-remove-ignore")) $(this).remove();
				else $(this).addClass("is-checked");
			});
		}

		// валидация слайда

		if (
			dir == "next" &&
			!$(e.currentTarget).hasClass("js-without-submit")
		) {
			form.validate();
			var valid = form.valid();

			if (!valid) {
				$current.removeClass("is-done");

				return false;
			} else {
				$current.addClass("is-done");
			}
		}

		if (
			dir == "prev" &&
			$quiz.find(".js-slide").eq(current).hasClass("js-dont-backward")
		)
			return false;

		// отправка формы
		if (current == count) {
			form.submit();
		}

		// скролл к началу квиза
		// if(isMobile){
		// var offset = isMobile ? 0 : 60
		var top = $(".js-target-form").offset().top;
		window.scrollTo(0, top);
		// }

		// общий прогресс бар

		$(".js-total-bar:hidden").show();

		// let $done = $quiz.find('.js-slide.is-done').slice(0, (dir == 'next' ? current : current - 1));
		let $done = $quiz.find(".js-slide").slice(0, current);
		let $last_done = $quiz.find(".js-slide").eq(current);
		let bar_text = $last_done.attr("data-help")
			? $last_done.data("help")
			: `+${$last_done.data(
					"progress"
			  )}% за заполнение поля "${$last_done
					.find(".input__top .input__label")
					.text()}"`;
		let sub_total = global_total;

		$done.each((i, el) => {
			if (!$(el).hasClass("is-done")) return;

			sub_total += $(el).attr("data-progress")
				? Number($(el).data("progress"))
				: 0;
		});

		$(".js-total-progress").text(`${sub_total}%`);
		$(".status-bar__done").css("width", `${sub_total}%`);
		$(".status-bar__help").text(bar_text);

		// отправка данных слайда
		if (
			$current.hasClass("js-submit-slide") &&
			!$(e.currentTarget).hasClass("js-without-submit")
		) {
			var action = $current.data("action");
			var inputData = $current.find(":input").serialize();

			$.ajax({
				type: "POST",
				url: action,
				data: inputData,
				dataType: "html",
				success: function (msg) {
					console.log(msg);
				},
			});
		}
		// else{
		// 	if(dir == 'next'){
		// 		$last_done = $quiz.find('.js-slide.is-active').next();
		// 		bar_text = $last_done.attr('data-help') ? $last_done.data('help') : `+${$last_done.data('progress')}% за заполнение поля "${$last_done.find('.input__top .input__label').text()}"`
		// 		$('.status-bar__help').text(bar_text);
		// 	}

		// }

		// if($(e.currentTarget).hasClass('js-without-submit') && dir == 'next'){
		// 	$last_done = $quiz.find('.js-slide.is-active').next();
		// 	bar_text = $last_done.attr('data-help') ? $last_done.data('help') : `+${$last_done.data('progress')}% за заполнение поля "${$last_done.find('.input__top .input__label').text()}"`
		// 	$('.status-bar__help').text(bar_text);
		// }

		// следующий слайд

		$quiz
			.find(".js-slide")
			.removeClass("is-active")
			.eq(current)
			.addClass("is-active");

		// прогресс бар вопросов

		var $item = $quiz.find(".js-slide.is-active");
		var step = $item.attr("data-step");
		var barIndex = $item.index();
		var barIndexFirst = $quiz
			.find('.js-slide[data-step="' + step + '"]:first')
			.index();
		var barIndexLast = $quiz
			.find('.js-slide[data-step="' + step + '"]:last')
			.index();

		var barQuestionCount = barIndexLast - barIndexFirst + 1;
		var barQuestionCurrent = barIndex - barIndexFirst + 1;

		var barWidth = 100 / (barQuestionCount / barQuestionCurrent);

		$(".js-bar-current").text(barQuestionCurrent);
		$(".js-bar-total").text(barQuestionCount);
		$(".js-bar-done").css("width", barWidth + "%");

		// настройки слайда
		if ($item.attr("data-title")) {
			$quiz.find(".js-title").text($item.data("title"));
		}

		if (step) {
			$quiz.find(".js-current-step").text(step);
		}

		if ($item.hasClass("js-hide-bottom")) {
			$quiz.find(".quiz__bottom").removeClass("is-visible");
		} else {
			$quiz.find(".quiz__bottom").addClass("is-visible");
		}
	});
})($);
