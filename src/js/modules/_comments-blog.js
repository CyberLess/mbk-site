(() => {
  const $sliderList = $('.owl-carousel');
  const $visibleLeftBtn = $('.comments-blog__btn_left');
  const $visibleRightBtn = $('.comments-blog__btn_right');

  const setStartItemsQuantity = () => {
    const itemsQuantity = $('.comments-blog__item').length;

    $('.comments-blog__of-pages').text(itemsQuantity);
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
  setStartItemsQuantity();
})();
