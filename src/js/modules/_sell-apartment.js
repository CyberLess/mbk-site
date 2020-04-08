import { numberWithSpaces } from '../functions';

$(()=>{
  const $numberItems = $('.sell-form__input[name=price], .sell-form__input[name=square]');

  if (!$numberItems) {
    return false;
  }

  $numberItems.on('input', function () {
    this.value = this.value.replace (/\D/, '');
    if (this.value !== '') {
      this.value = numberWithSpaces(Number(this.value.replace(/\s/g, '')));
    }
  });
});
