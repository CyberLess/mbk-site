import { transitionEnd } from '../functions';

$(function() {
	if(!$('.ba').length)
		return false;

	var relXPer = 0;
	var relYPer = 0;
	var slider, handle, arrow;
	var requestID;
	var degree;

	// $('.ba').on('mousemove touchmove touchstart', function(e) {
	//
  //       e.preventDefault();
	//
  //       var touchstart = e.type === 'touchstart' || e.type === 'touchmove',
  //           e = touchstart ? e.originalEvent : e,
  //           pageX = touchstart ? e.targetTouches[0].pageX : e.pageX,
  //           pageY = touchstart ? e.targetTouches[0].pageY : e.pageY;
	//
	// 	slider = $(this);
	// 	handle = slider.find('.ba__handle');
	// 	arrow = slider.find('.ba__arrow');
	//
	// 	var offset = slider.offset();
	//
	// 	var width = slider.outerWidth()
	// 	var height = slider.outerHeight()
	//
	// 	var relX = pageX - offset.left;
	// 	var relY = pageY - offset.top;
	//
	// 	relXPer = 100 / (width / relX);
	// 	relYPer = 100 / (height / relY);
	//
  //       var center_x = (offset.left) + (width/2);
  //       var center_y = (offset.top) + (height/2);
  //       var mouse_x = pageX; var mouse_y = pageY;
  //       var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
  //       degree = (radians * (180 / Math.PI) * -1) + 90;
	//
	// 	requestID = window.requestAnimationFrame(ba_update);
	//
	// }).on('mouseleave', function() {
	//
	// 	handle = $(this).find('.ba__handle');
	// 	arrow = $(this).find('.ba__arrow');
	//
  //       arrow.css({
  //       	'transform': 'rotate(180deg)'
  //       })
	//
	// 	handle.css({
	// 		'left': '50%'
	// 	})
	//
	// 	$(this).addClass('is-mouseleave').find('.ba__resize').css({
	// 		'width': '50%'
	// 	}).on(transitionEnd, function(e) {
	// 		$(this).off(transitionEnd).removeAttr('style').closest('.ba').addClass('js-animation-play')
	// 	})
	//
	// 	window.cancelAnimationFrame(requestID);
	// })
	//
	// $('.ba__inner').on('mouseenter', function() {
	// 	$('.ba').removeClass('is-mouseleave js-animation-play').find('.ba__resize').off(transitionEnd)
	// })

	function ba_update() {
		if(slider.hasClass('is-mouseleave'))
			return false;

		slider.addClass('is-moving').removeClass('is-mouseleave js-animation-play').find('.ba__resize').css({
			'width': relXPer + '%'
		})

		handle.css({
			'left': relXPer+'%'
		})

        arrow.css({
        	'transform': 'rotate('+degree+'deg)'
        })
	}
})

$(window).on('load resize', function() {
	if(!$('.ba').length)
		return false;

	$('.ba__image').each(function() {
		var width = $(this).closest('.ba').outerWidth()
		// console.log("width", width)
		$(this).css('width', width+"px")
	})
})
