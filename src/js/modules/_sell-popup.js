$(() => {
  const ESC_KEYCODE = 27;
  const ANIMATION_OPEN_TIME = 500;
  const ANIMATION_CLOSE_TIME = 300;

  const $body = $('body');
  const $overlay = $('.sell-apartment__overlay');
  const $sellFormBtn = $('.sell-form__btn');
  const $contactBuyerBtn = $('.sell-popup__btn');
  const $firstPopup = $('.sell-popup');
  const $secondPopup = $('.sell-order-popup');
  const $closeSecondBtn = $('.sell-order-popup__close');
  let isFirstOpened = false;

  const removeCloseFirstListeners = () => {
    const $closeBtn = $('.sell-popup__close');

    $closeBtn.off('click', closeFirstPopup);
    $overlay.off('click', closeFirstPopup);
    $(window).off('keydown');
  };

  const onFirstPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeFirstPopup();
    }
  };

  const setCloseFirstListeners = () => {
    const $closeBtn = $('.sell-popup__close');

    $closeBtn.click(closeFirstPopup);
    $overlay.click(closeFirstPopup);
    $(window).on('keydown', onFirstPopupClose.bind());
  };

  const openSecondPop = (popup) => {
    popup.addClass('sell-order-popup__open-animation');
    popup.removeClass('sell-order-popup__close-animation');
    removeCloseFirstListeners();
  };

  const closeSecondPop = (popup) => {
    popup.addClass('sell-order-popup__close-animation');
    popup.removeClass('sell-order-popup__open-animation');
    setCloseFirstListeners();
  };

  const openFirstPopup = () => {
    isFirstOpened = true;
    const bodyOldWidth = $body.width();

    $firstPopup.css('display', 'block')
      .animate({
        right: 0,
        opacity: 1
      }, ANIMATION_OPEN_TIME, () => {
        if (isFirstOpened) {
          setCloseFirstListeners();
        }
      })
      .attr('tabindex', 0)
      .focus();

    $overlay.fadeIn(ANIMATION_OPEN_TIME).css('z-index', '601');
    $body.css({
      position: 'absolute',
      width: bodyOldWidth,
      left: 0,
      top: 0,
      overflowY: 'hidden'
    });
  };

  const closeFirstPopup = () => {
    $firstPopup.animate({
      right: '-100%',
      opacity: 0
    }, ANIMATION_CLOSE_TIME, function () {
      $(this).css({
        display: 'none'
      });
    }).removeAttr('tabindex');

    $overlay.fadeOut(ANIMATION_CLOSE_TIME);
    $body.removeAttr('style');

    removeCloseFirstListeners();
    isFirstOpened = false;
  };

  $sellFormBtn.click(() => {
    openFirstPopup();
  });

  $contactBuyerBtn.magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: ANIMATION_CLOSE_TIME,
    callbacks: {
      open: () => {
        openSecondPop($secondPopup);
      },
      beforeClose: () => {
        closeSecondPop($secondPopup)
      }
    },
  });

  $closeSecondBtn.click(function () {
    $.magnificPopup.close();
  });
});
