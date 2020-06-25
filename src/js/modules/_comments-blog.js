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
    navText: ['<svg class="icon-arrow" fill="none" version="1.1" viewBox="0 0 18.561 9.6213" xmlns="http://www.w3.org/2000/svg"><g shape-rendering="auto"><path d="m13.75 0v4.0605h-13.75v1.5h13.75v4.0605l4.8105-4.8105z" /></g></svg>', '<svg class="icon-arrow" fill="none" version="1.1" viewBox="0 0 18.561 9.6213" xmlns="http://www.w3.org/2000/svg"><g shape-rendering="auto"><path d="m13.75 0v4.0605h-13.75v1.5h13.75v4.0605l4.8105-4.8105z" /></g></svg>'],
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
