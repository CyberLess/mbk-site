import "jquery-mask-plugin";

var formInit;

$(() => {
	var selector = [
		"input[name='phone']",
		".js-phone-mask",
		".js-passport-mask",
		".js-date-mask",
		".js-code-mask",
	];

	selector.forEach((element) => {
		let mask;

		let item = document.querySelectorAll(element);

		switch (element) {
			case "input[name='phone']":
			case ".js-phone-mask":
				mask = "+7 000 000 00 00";
				break;
			case ".js-passport-mask":
				mask = "9999 999999";
				break;
			case ".js-date-mask":
				mask = "99.99.9999";
				break;
			case ".js-code-mask":
				mask = "999-999";
				break;
		}

		$(item).mask(mask);
	});

	$("input[name='phone'], .js-phone-mask").keyup(function (e) {
		var this_val = $(this).val();
		var val_length = this_val.length;

		if (val_length == 4 && this_val[3] === "8") {
			$(this).val(this_val.slice(0, 2));
		}
	});

	$.validator.addMethod(
		"checkConfirmCode",
		function (value, element) {
			var response;

			var $slide = $(element).closest(".js-slide");
			var url = $slide.attr("data-action");

			if (value) {
				$.ajax({
					type: "POST",
					url: url,
					data: "checkConfirmCode=" + value,
					dataType: "html",
					success: function (msg) {
						response = msg == "true" ? true : false;
					},
				});
			}

			response = value == 123;

			if (response) {
				$slide.addClass("js-dont-backward");
			}

			return response;
		},
		"Указан неверный код или истек его срок"
	);

	formInit = (el = false) => {
		var $formItems = el ? el : $("form:not(.js-init)");

		$formItems
			.find(".input__item, .textarea__item")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});

		$formItems.each((i, el) => {
			var $form = $(el);

			$form.addClass("js-init").validate({
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass("is-error")
						.removeClass("is-valid");
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass("is-error")
						.addClass("is-valid");
				},
				submitHandler: (form) => {
					var data = $(form).serialize();

					var action = $(form).attr("action")
						? $(form).attr("action")
						: "/app/api/";

					$.ajax({
						type: "POST",
						url: action,
						data: data,
						success: function (data) {
							$(form)[0].reset();
						},
					});

					if ($(form).attr("data-redirect")) {
						window.location = $(form).data("redirect");
					}
				},
				ignore: "input:hidden",
				onkeyup: function (element) {
					var element_id = $(element).attr("name");

					if (
						typeof this.settings.rules[element_id] !== "undefined"
					) {
						if (this.settings.rules[element_id].onkeyup !== false) {
							jQuery.validator.defaults.onkeyup.apply(
								this,
								arguments
							);
						}
					}
				},
				onfocusout: function (element) {
					var element_id = $(element).attr("name");

					if (
						typeof this.settings.rules[element_id] !== "undefined"
					) {
						if (
							this.settings.rules[element_id].onfocusout !== false
						) {
							jQuery.validator.defaults.onfocusout.apply(
								this,
								arguments
							);
						}
					}
				},
				rules: {
					phone: {
						required: true,
						minlength: 10,
					},
					email: {
						required: true,
						email: true,
					},
					name: {
						required: true,
					},
					comment: {
						required: true,
					},
					"comment-min": {
						required: true,
					},

					address: {
						required: true,
					},
					price: {
						required: true,
					},
					square: {
						required: true,
					},
					auctionEmail: {
						required: true,
						email: true,
					},

					confirm: {
						checkConfirmCode: true,
						onkeyup: false,
						onfocusout: false,
					},
				},

				messages: {
					auctionEmail: "Некорекктный e-mail",
				},
			});
		});
	};

	formInit();
});

export { formInit };
