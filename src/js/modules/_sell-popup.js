$(() => {
  const ANIMATION_TIME = 300;
  const ESC_KEYCODE = 27;

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

  const openPopup = () => {
    isOpened = true;

    $popup.fadeIn(ANIMATION_TIME, () => {
      if (isOpened) {
        setCloseListeners();
      }
    });
    $overlay.fadeIn(ANIMATION_TIME);
  };

  const closePopup = () => {
    isOpened = false;

    $popup.fadeOut(ANIMATION_TIME);
    $overlay.fadeOut(ANIMATION_TIME);
  };

  $sellFormBtn.click(function (evt) {
    evt.preventDefault();
    openPopup();
  });
});
