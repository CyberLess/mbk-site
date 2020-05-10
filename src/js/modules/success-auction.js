import { getRandomInt } from "../functions";

$(() => {
  const ANIMATION_TIMEOUT = 7000;

  const $list = $('.success-auction__carusel');
  const $items = $list.find('.success-auction__item');
  const $testButton = $('.success-auction__prompt');

  const x = getRandomInt(30, 60);

  const pushItemsInList = (copiesQuantity) => {
    for (let i = 0; i <= copiesQuantity; i += 1) {
      $items.clone().appendTo($list);
    }
  };

  const rotateWheel = () => {
    $list.animate({
      right: ((x * $items.outerWidth())+(x * ($items.length - getRandomInt(1, 6))))
    }, ANIMATION_TIMEOUT, 'easeInOutCubic');
  };

  pushItemsInList(x);

  let counter = 0;

  $list.on('mousedown', function (evt) {
    if (counter < 1) {
      rotateWheel();
    }

    counter += 1;
  });
});
