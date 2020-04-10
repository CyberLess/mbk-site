$(() => {
  const ANIMATION_OPEN_TIME = 500;
  const ANIMATION_CLOSE_TIME = 300;
  const ESC_KEYCODE = 27;

  const $body = $('body');
  const $sellFormBtn = $('.sell-form__btn');
  const $contactBuyerBtn = $('.sell-popup__btn');
  const $firstPopup = $('.sell-popup');
  const $secondPopup = $('.sell-order-popup');
  const $overlay = $('.overlay');
  let isFirstOpened = false;
  let isSecondOpened = false;

  const onFirstPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !isSecondOpened) {
      closeFirstPopup();
    }
  };

  const onSecondPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && isSecondOpened) {
      closeSecondPopup();
    }
  };

  const setCloseFirstListeners = () => {
    const $closeBtn = $('.sell-popup__close');

    $closeBtn.click(closeFirstPopup);
    $overlay.click(closeFirstPopup);
    $(window).on('keydown', onFirstPopupClose.bind());
  };

  const removeCloseFirstListeners = () => {
    const $closeBtn = $('.sell-popup__close');

    $closeBtn.off('click', closeFirstPopup);
    $overlay.off('click', closeFirstPopup);
    $(window).off('keydown');

    if (isSecondOpened) {
      $(window).on('keydown', onSecondPopupClose.bind());
    }
  };

  const setCloseSecondListeners = () => {
    const $closeBtn = $('.sell-order-popup__close');

    $closeBtn.click(closeSecondPopup);
    $overlay.click(closeSecondPopup);
    $(window).on('keydown', onSecondPopupClose.bind())
  };

  const removeCloseSecondListeners = () => {
    const $closeBtn = $('.sell-order-popup__close');

    $closeBtn.off('click', closeSecondPopup);
    $overlay.off('click', closeSecondPopup);
    $(window).off('keydown');

    if (isFirstOpened) {
      $(window).on('keydown', onFirstPopupClose.bind());
    }
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
      });
    $overlay.fadeIn(ANIMATION_OPEN_TIME).css('z-index', '601');
    $body.css({
      position: 'absolute',
      width: bodyOldWidth,
      left: 0,
      top: 0,
      overflowY: 'hidden'
    });
  };

  const openSecondPopup = () => {
    isSecondOpened = true;

    $secondPopup.css('display', 'block')
      .animate({
        right: 0,
        opacity: 1
      }, ANIMATION_OPEN_TIME, () => {
        if (isSecondOpened) {
          setCloseSecondListeners();
          removeCloseFirstListeners();
        }
      });
    $overlay.fadeOut(ANIMATION_CLOSE_TIME, function () {
      $(this).css({
        zIndex: '603'
      })
    })
      .fadeIn(ANIMATION_OPEN_TIME);
  };

  const closeFirstPopup = () => {
    $firstPopup.animate({
      right: '-100%',
      opacity: 0
    }, ANIMATION_CLOSE_TIME, function () {
      $(this).css({
        display: 'none'
      });
    });
    $overlay.fadeOut(ANIMATION_CLOSE_TIME);
    $body.removeAttr('style');

    removeCloseFirstListeners();
    isFirstOpened = false;
  };

  const closeSecondPopup = () => {
    $secondPopup.animate({
      right: '-100%',
      opacity: 0
    }, ANIMATION_CLOSE_TIME, function () {
      $(this).css({
        display: 'none'
      });
    });
    $overlay.fadeOut(ANIMATION_CLOSE_TIME, function () {
      $(this).css({
        zIndex: '601'
      }).fadeIn(ANIMATION_CLOSE_TIME);
      removeCloseSecondListeners();
      setCloseFirstListeners();
    });

    isSecondOpened = false;
  };

  $sellFormBtn.click(() => {
    openFirstPopup();
  });

  $contactBuyerBtn.click(() => {
    openSecondPopup();
  })
});
