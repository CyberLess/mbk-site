(() => {
  const $sliderList = $('.owl-carousel');
  const $visibleLeftBtn = $('.comments-blog__btn_left');
  const $visibleRightBtn = $('.comments-blog__btn_right');

  const setStartItemsQuantity = () => {
    const itemsQuantity = $('.comments-blog__item').length;

    $('.comments-blog__of-pages').text(itemsQuantity);
  };

  const setGoNextBtn = (evt) => {
    if (evt.item.index > 0) {
      $visibleLeftBtn.addClass('comments-blog__btn_is-next');
    } else {
      $visibleLeftBtn.removeClass('comments-blog__btn_is-next');
    }

    console.log(evt.item.index + 3 < $('.comments-blog__item').length)
    console.log(evt.item.index + 3)
    console.log($('.comments-blog__item').length)
    if (evt.item.index + 2 < $('.comments-blog__item').length) {
      $visibleRightBtn.addClass('comments-blog__btn_is-next');
    } else {
      $visibleRightBtn.removeClass('comments-blog__btn_is-next');
    }
  };

  const setCurrentPage = (evt) => {
    $('.comments-blog__current-page').text(evt.item.index + 1);
    $('.comments-blog__of-pages').text(evt.item.count);
  };

  $sliderList.owlCarousel({
    dots: false,
    dotsEach: false,
    nav: true,
    navContainer: '.comments-blog__nav',
    responsive: {
      0: {
        autoWidth: false,
        items: 1,
        autoHeight: true
      },
      581: {
        autoHeight: false,
        autoWidth: true,
        items: 3,
        margin: 0
      }
    }

  });

  $visibleLeftBtn.click(() => {
    $('.owl-prev').trigger('click');
  });

  $visibleRightBtn.click(() => {
    $('.owl-next').trigger('click');
  });

  $sliderList.on('changed.owl.carousel', setCurrentPage);
  $sliderList.on('changed.owl.carousel', setGoNextBtn);
  setStartItemsQuantity();
})();
