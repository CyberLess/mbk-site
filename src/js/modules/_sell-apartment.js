import { numberWithSpaces } from '../functions';

$(()=>{
  const $numberInputs = $('.sell-form__input[name=price], .sell-form__input[name=square]');

  if (!$numberInputs) {
    return false;
  }

  const BACKSPACE__KEYCODE = 8;
  let prevValue = '';

  $numberInputs.on('input', function () {
    const lastChar = this.value[this.value.length - 1];

    this.value = this.value
      .replace(/[A-Za-zА-Яа-яЁё]/, '')
      .replace (/\D/, '');

    if (this.value !== '' && $.isNumeric(lastChar)) {
      prevValue = Number(this.value.replace(/\s/g, ''));
      this.value = numberWithSpaces(Number(this.value.replace(/\s/g, '')));
    } else {
      this.value = numberWithSpaces(prevValue);
    }
  });

  $numberInputs.on('keydown', function (evt) {
    if (evt.keyCode === BACKSPACE__KEYCODE && this.value.length === 1) {
      prevValue = '';
      this.value = prevValue;
    }
  });
});
