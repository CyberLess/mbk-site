import { getRandomInt } from "../functions";

$(() => {
  const ANIMATION_TIMEOUT = 7000;
  const ITEMS_HALF_MARGIN = 4;
  const POPUP_OPEN_TIMEOUT = 500;

  const $list = $('.success-auction__carusel');
  const $items = $list.find('.success-auction__item');
  const $form = $('.success-auction__form');

  const x = getRandomInt(30, 60);

  const pushItemsInList = (copiesQuantity) => {
    for (let i = 0; i <= copiesQuantity; i += 1) {
      $items.clone().appendTo($list);
    }
  };

  const openPopupWinner = ($item) => {
    const $itemCopy = $item.clone();

    $itemCopy.addClass('success-auction__item_opened');

    $.magnificPopup.open({
      items: {
        src: $itemCopy,
        type: 'inline'
      },
      afterClose: () => {
        $itemCopy.remove();
      }
    });
  };

  const getWinnerItem = () => {
    const $indicator = $('.success-auction__indicator');
    const indicatorCoords = $indicator.offset().left;
    const $items = $('.success-auction__item');

    $items.css('opacity', '0.2');
    $items.each(function () {
      if (parseInt($(this).offset().left) - ITEMS_HALF_MARGIN <= indicatorCoords && parseInt($(this).offset().left + $(this).outerWidth()) + ITEMS_HALF_MARGIN >= indicatorCoords + $indicator.outerWidth()) {
        $(this).css('opacity', '1');
        setTimeout(() => {
          openPopupWinner($(this));
        }, POPUP_OPEN_TIMEOUT);
        return 'winner';
      }
    });
  };

  const rotateWheel = () => {
    $list.animate({
      right: ((x * $items.outerWidth())+(x * ($items.length - getRandomInt(1, 6))))
    }, ANIMATION_TIMEOUT, 'easeInOutCubic', getWinnerItem);
  };

  pushItemsInList(x);

  let counter = 0;

  $form.on('submit', () => {
    if (counter < 1 && !$form.children().hasClass('is-error')) {
      rotateWheel();
      counter += 1;
    }
  });
});
