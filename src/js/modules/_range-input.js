import 'jquery-ui/ui/widgets/slider';
require('jquery-ui-touch-punch');
import { numberWithSpaces } from '../functions';

(() => {

	let $items = $('.range-input');

	if(!$items.length)
		return false;

	$items.each((i, el) => {
		let item = $(el).find('.range-input__path');
		let input = $(el).find('.range-input__input');
		let line = $(el).find('.range-input__line');
		let char = item.attr('data-char') ? item.attr('data-char') : '';

		let	minimum = Number(item.data('min')),
			maximum = Number(item.data('max')),
			value 	= input.attr('value') ? Number(input.val()) : minimum,
			step 	= item.attr('data-step') ? Number(item.data('step')) : 1;


		var update_line = function(val, subvalMin, subvalMax) {
			// console.log('update:' + val + " / " + maximum)

			let subMax = subvalMax - subvalMin
			let subCur = val - subvalMin

			let width = 100 / (subMax / subCur)

			line.width(width + "%")						
		}

		var update_input = function(set = false) {

			let val = Number(input.val().replace(/\s/g, '').match(/[+-]?([0-9]*[.])?[0-9]+/g));
			
			if (val > maximum)
				val = maximum

			if (val < minimum)
				val = minimum

			if(isNaN(val))
				val = 0

			if(set){
				char = item.attr('data-char') ? item.attr('data-char') : '';
				input.val(numberWithSpaces(val) + " " + char).trigger('change')
				item.slider( 'value', val);


				minimum = Number(item.attr('data-min'))
				maximum = Number(item.attr('data-max'))
				update_line(val, minimum, maximum)
			}
			else{
				input.val(val).trigger('change')
			}
		
		}



		input.on({
			focus: function() {
				update_input()
			},
			focusout: function() {
				update_input(1)
			}
		})

		// console.log('val: ' + value)

		item.slider({
			min: minimum,
			max: maximum,
			step: step,
			value: value,	
			create: function() {
				char = item.attr('data-char') ? item.attr('data-char') : '';
				input.val(numberWithSpaces($(this).slider( "value" )) + " " + char).trigger('change')
				minimum = Number(item.attr('data-min'))
				maximum = Number(item.attr('data-max'))
				update_line(Number(item.slider( "value" )), minimum, maximum)									
			},
			slide: function( event, ui ) {
				char = item.attr('data-char') ? item.attr('data-char') : '';
				input.val(numberWithSpaces(ui.value) + " " + char).trigger('change')

				minimum = Number(item.attr('data-min'))
				maximum = Number(item.attr('data-max'))
				update_line(Number(ui.value), minimum, maximum)			

			}
		});

	})
})($)