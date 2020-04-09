import { numberWithSpaces } from '../functions';

$(() => {
  const BACKSPACE__KEYCODE = 8;

  const $numberInputs = $('.sell-form__input[name=price], .sell-form__input[name=square]');
  const $sellForm = $('.sell-form');
  let prevValue = '';


  // $sellForm.removeAttr('novalidate');
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

  $sellForm.validate({
    rules: {
      address: {
        required: true,
        minlength: 3
      },
      price: {
        required: true
      },
      square: {
        required: true
      }
    },
    messages: {
      address: {
        required: "Поле «Адрес» обязательно к заполнению",
        minlength: "Введите не менее 3-х символов в поле «Адрес»"
      },
      price: {
        required: "Поле «Цена» обязательно к заполнению",
      },
      square: "Поле «Площадь» обязательно к заполнению"
    }
  });
});
