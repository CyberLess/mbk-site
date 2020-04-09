$(() => {
  const ANIMATION_OPEN_TIME = 500;
  const ANIMATION_CLOSE_TIME = 300;
  const ESC_KEYCODE = 27;

  const $body = $('body');
  const $sellFormBtn = $('.sell-form__btn');
  const $popup = $('.sell-popup');
  const $overlay = $('.overlay');
  let isOpened = false;

  const setCloseListeners = () => {
    const $closeBtn = $('.sell-popup__close');

    $closeBtn.click(closePopup);
    $overlay.click(closePopup);
    $(window).on('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    })
  };

  const removeCloseListeners = () => {
    const $closeBtn = $('.sell-popup__close');

    $closeBtn.off('click', closePopup);
    $overlay.off('click', closePopup);
    $(window).off('keydown');
  };

  const openPopup = () => {
    isOpened = true;
    const bodyOldWidth = $body.width();

    $popup.css('display', 'block')
      .animate({
        right: 0,
        opacity: 1
      }, ANIMATION_OPEN_TIME, () => {
        if (isOpened) {
          setCloseListeners();
        }
      });
    $overlay.fadeIn(ANIMATION_OPEN_TIME);
    $body.css({
      position: 'absolute',
      width: bodyOldWidth,
      left: 0,
      top: 0,
      overflowY: 'hidden'
    });
  };

  const closePopup = () => {
    $popup.animate({
      right: '-100%',
      opacity: 0
    }, ANIMATION_CLOSE_TIME, function () {
      $(this).css({
        display: 'none'
      });
    });
    $overlay.fadeOut(ANIMATION_CLOSE_TIME);
    $body.removeAttr('style');

    removeCloseListeners();
    isOpened = false;
  };

  $sellFormBtn.click(function () {
    openPopup();
  });
});
