import Inputmask from "inputmask";

$(()=>{


	var selector = ["input[name='phone']", ".js-passport-mask", ".js-date-mask", ".js-code-mask"];

	selector.forEach(element => {

		let mask;

		let item = document.querySelectorAll(element);

		switch (element) {
			case "input[name='phone']":
				mask = "+7 (999) 999-99-99";
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

		let im = new Inputmask({
			"mask": mask,
			clearMaskOnLostFocus: true,
			clearIncomplete: true			
		});		

		im.mask(item);

	});


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


    $.validator.addMethod(
        "checkConfirmCode", 
        function(value, element) {
        	var response;

        	var $slide = $(element).closest('.js-slide')
        	var url = $slide.attr('data-action');

        	if(value){
	            $.ajax({
	                type: "POST",
	                url: url,
	                data: "checkConfirmCode="+value,
	                dataType:"html",
	                success: function(msg){
	                    response = ( msg == 'true' ) ? true : false;
	                }
	            });

        	}

            response = (value == 123);

            if(response){
            	$slide.addClass('js-dont-backward');
            }

            return response;

        },
        "Указан неверный код или истек его срок"
    );

	$("form").each((i, el) => {
		var $form = $(el);

		$form.validate({

			highlight: (element, errorClass, validClass) => {
				$(element).parent().addClass('is-error').removeClass('is-valid');
			},
			unhighlight: (element, errorClass, validClass) => {
				$(element).parent().removeClass('is-error').addClass('is-valid');
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

				if($(form).attr('data-redirect')){
					window.location = $(form).data('redirect');
				}

			},     
			ignore: "input:hidden",   
			onkeyup: function(element) {
				var element_id = $(element).attr('name');

				if(typeof this.settings.rules[element_id] !== 'undefined'){
					if (this.settings.rules[element_id].onkeyup !== false) {
						jQuery.validator.defaults.onkeyup.apply(this, arguments);
					}					
				}

			},
			onfocusout: function(element) {
				var element_id = $(element).attr('name');

				if(typeof this.settings.rules[element_id] !== 'undefined'){
					if (this.settings.rules[element_id].onfocusout !== false) {
						jQuery.validator.defaults.onfocusout.apply(this, arguments);
					}					
				}

			},
			rules: {
				phone:{
					required: true,
					minlength: 10,
				},  
				email: {
					required: true,
					email: true
				},
				name: {
					required: true
				},
				confirm: {
					checkConfirmCode: true,
					onkeyup: false,
					onfocusout: false
				}
			}		
		})

	})

})