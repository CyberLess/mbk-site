import Inputmask from "inputmask";

$(()=>{

	var selector = document.querySelectorAll("input[name='phone']");

	var im = new Inputmask({
		"mask": "+7 (999) 999-99-99",
		clearMaskOnLostFocus: true,
		clearIncomplete: true
	});

	im.mask(selector);


	$('.input__item')
		.on('focus', (e)=>{
			let $input = $(e.target)
			$input.parent().addClass('is-focus')
		})
		.on('blur change', (e)=>{
			let $input = $(e.target)

			if($input.val() == '')
				$input.parent().removeClass('is-focus')
	 	})


	$("form").each((i, el) => {
		var $form = $(el);

		$form.validate({
			errorPlacement: function(error, element) {
				//just nothing, empty
			},
			highlight: (element, errorClass, validClass) => {
				$(element).parent().addClass(errorClass).removeClass(validClass);
			},
			unhighlight: (element, errorClass, validClass) => {
				$(element).parent().removeClass(errorClass).addClass(validClass);
			},
			submitHandler: (form) => {

				var data = $(form).serialize();

				$.ajax({
					type: 'POST',
					url: '/app/mail/',
					data: data,
					success: function(data) {
						$(form)[0].reset()
					}
				});

			},
			rules: {
				phone:{
					required: true,
					minlength: 10,
				},
				address: {
					required: true,
					minlength: 3
				},
				price: {
					required: true
				},
				square: {
					required: true
				},
				auctionEmail: {
					required: true,
					email: true
				}
			}
		})

	})
});
