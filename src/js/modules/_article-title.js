(() => {
  function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop < window.innerHeight && elemBottom >= el.clientHeight / 2;
    return isVisible;
  }

  const title = document.querySelector(`.js-title`);
  const link = document.querySelector(`.js-link`);

  window.addEventListener(`scroll`, () => {
    if (title && link) {
      if (isScrolledIntoView(title)) {
        link.classList.add(`is-active`);
      } else {
        link.classList.remove(`is-active`);
      }
    }
  });

})($);