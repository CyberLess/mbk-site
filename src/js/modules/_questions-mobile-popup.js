$(() => {
  const questionAnimationOpen = 'question-animation-open';

  const $body = $('body');
  const $questionsHeader = $('.questions-header');
  const $catBtn = $('.questions-header__categories-btn');
  const $questionForm = $('.questions-header__form');
  const $showAllBtn = $questionForm.find('.questions-header__form-select-all');
  const $formCheckbox = $('.tag__input');

  const openPopup = () => {
    $body.css({
      overflow: 'hidden'
    });

    $questionsHeader.css({
      position: 'relative',
      zIndex: '500'
    });

    $questionForm.removeClass('question-animation-close').addClass('question-animation-open');
  };

  const closePopup = () => {
    $body.removeAttr('style');
    $questionsHeader.removeAttr('style');
    $questionForm.removeClass('question-animation-open').addClass('question-animation-close');
  };

  const checkAllCategories = () => {
    $formCheckbox.prop('checked', true);
  };

  const removeHideClass = () => {
    if ($(window).width() > 768) {
      $questionForm.removeClass('mfp-hide');
    }
  };

  const checkIsMobile = () => {
    if ($(window).width() <= 768 && !$questionForm.hasClass('question-animation-open')) {
      $questionForm.addClass('mfp-hide');

      $showAllBtn.click(checkAllCategories);
    } else if ($(window).width() > 768) {
      if ($questionForm.hasClass('question-animation-open')) {
        $.magnificPopup.close();
      }
      removeHideClass();
      $showAllBtn.off();
    }
  };

  $catBtn.magnificPopup({
    type: 'inline',
    removalDelay: 300,
    callbacks: {
      open: openPopup,
      beforeClose: closePopup,
      afterClose: removeHideClass
    }
  });
  checkIsMobile();
  $(window).resize(checkIsMobile);
});
