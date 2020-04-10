$(() => {
  const ANIMATION_CLOSE_TIME = 300;

  const $body = $('body');
  const $sellFormBtn = $('.sell-form__btn');
  const $contactBuyerBtn = $('.sell-popup__btn');
  const $firstPopup = $('.sell-popup');
  const $closeFirstBtn = $('.sell-popup__close');
  const $secondPopup = $('.sell-order-popup');
  const $closeSecondBtn = $('.sell-order-popup__close');

  const animateOpen = (popup) => {
    popup.addClass('sell-popup__open-animation');
    popup.removeClass('sell-popup__close-animation');
  };

  const animateClose = (popup) => {
    popup.addClass('sell-popup__close-animation');
    popup.removeClass('sell-popup__open-animation');
  };

  $sellFormBtn.magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: ANIMATION_CLOSE_TIME,
    callbacks: {
      open: () => {
        animateOpen($firstPopup);
      },
      beforeClose: () => {
        animateClose($firstPopup)
      }
    },
  });

  $closeFirstBtn.click(function() {
    $.magnificPopup.close();
  });

  $contactBuyerBtn.magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: ANIMATION_CLOSE_TIME,
    callbacks: {
      open: () => {
        animateOpen($secondPopup);
      },
      beforeClose: () => {
        animateClose($secondPopup)
      }
    },
  });

  $closeSecondBtn.click(function() {
    $.magnificPopup.close();
  });
});
