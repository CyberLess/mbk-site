import { numberWithSpaces } from '../functions';

$(()=>{
  const $numberItems = $('.sell-form__input[name=price], .sell-form__input[name=square]');

  if (!$numberItems) {
    return false;
  }

  $numberItems.on('input', function () {
    const lastChar = this.value[this.value.length - 1];

    this.value = this.value.replace(/[A-Za-zА-Яа-яЁё]/, '');
    this.value = this.value.replace (/\D/, '');

    if (this.value !== '' && $.isNumeric(lastChar)) {
      this.value = numberWithSpaces(Number(this.value.replace(/\s/g, '')));
    }
  });
});
