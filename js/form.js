'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldSet = noticeForm.querySelectorAll('fieldset');
  var titleField = noticeForm.querySelector('#title');
  var minLengthTitle = 30;
  var maxLengthTitle = 100;
  var timeinOption = noticeForm.querySelector('#timein');
  var timeoutOption = noticeForm.querySelector('#timeout');
  var typeOption = noticeForm.querySelector('#type');
  var priceField = noticeForm.querySelector('#price');
  var roomNumberOption = noticeForm.querySelector('#room_number');
  var capacityOption = noticeForm.querySelector('#capacity');
  var formButton = noticeForm.querySelector('.form__submit');
  var minPrices = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var onTimeinChange = function () {
    timeinOption.value = timeoutOption.value;
  };

  var onTimeoutChange = function () {
    timeoutOption.value = timeinOption.value;
  };

  var onTypeChange = function () {
    priceField.min = minPrices[typeOption.value];
  };

  var onRoomChange = function () {
    capacityOption.value = roomNumberOption.value === '100' ? '0' : roomNumberOption.value;
  };

  var addInvalidColor = function (field) {
    field.style.border = '1px solid red';
  };

  var removeInvalidColor = function (field) {
    field.style.border = '';
  };

  var onTitleFieldInvalid = function () {
    addInvalidColor(titleField);
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Заголовок объявления должен состоять из не менее ' + minLengthTitle + ' символов');
    } else if (titleField.validity.tooLong) {
      titleField.setCustomValidity('Заголовок объявления не может превышать ' + maxLengthTitle + ' символов');
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Поле не может быть пустым');
    } else {
      removeInvalidColor(titleField);
      titleField.setCustomValidity('');
    }
  };

  var onTitleFieldInput = function (evt) {
    if (evt.target.value.length < minLengthTitle) {
      evt.target.setCustomValidity('Заголовок объявления должен состоять из не менее ' + minLengthTitle + ' символов');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var onPriceFieldInvalid = function () {
    addInvalidColor(priceField);
    if (priceField.validity.rangeOverflow) {
      priceField.setCustomValidity('Цена не может превышать' + priceField.max);
    } else if (priceField.validity.rangeUnderflow) {
      priceField.setCustomValidity('Цены на данный тип жилья начинаются с ' + priceField.min);
    } else {
      removeInvalidColor(priceField);
      priceField.setCustomValidity('');
    }
  };

  var onFormButtonMouseup = function () {
    titleField.addEventListener('invalid', onTitleFieldInvalid);
    titleField.addEventListener('input', onTitleFieldInput);
    priceField.addEventListener('invalid', onPriceFieldInvalid);
  };

  var toFindCapacitySelected = function () {
    for (var i = 0; i < capacityOption.options.length; i++) {
      var capacityOptionElement = capacityOption.options[i];
      if (capacityOptionElement.selected === true) {
        capacityOptionElement.selected = false;
      }
    }
  };

  var remapMinPrice = function () {
    for (var i = 0; i < typeOption.options.length; i++) {
      var typeOptionElement = typeOption.options[i];
      if (typeOptionElement.selected === true) {
        priceField.min = minPrices[typeOptionElement.value];
      }
    }
  };

  var remapCapacitySelected = function () {
    for (var i = 0; i < roomNumberOption.options.length; i++) {
      var roomNumberOptionElement = roomNumberOption.options[i];
      if (roomNumberOptionElement.selected === true) {
        var defaultValue = roomNumberOptionElement.value;
        toFindCapacitySelected();
        capacityOption.value = defaultValue === '100' ? '0' : defaultValue;
      }
    }
  };

  remapMinPrice();
  remapCapacitySelected();

  timeinOption.addEventListener('change', onTimeoutChange);
  timeoutOption.addEventListener('change', onTimeinChange);
  typeOption.addEventListener('change', onTypeChange);
  roomNumberOption.addEventListener('change', onRoomChange);
  formButton.addEventListener('mouseup', onFormButtonMouseup);

  window.adsForm = {
    disableField: function () {
      for (var i = 0; i < noticeFieldSet.length; i++) {
        noticeFieldSet[i].disabled = true;
      }
    },

    enableField: function () {
      for (var i = 0; i < noticeFieldSet.length; i++) {
        noticeFieldSet[i].disabled = false;
      }
    }
  };
})();
