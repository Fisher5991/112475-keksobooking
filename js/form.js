'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldSet = noticeForm.querySelectorAll('fieldset');
  var titleField = noticeForm.querySelector('#title');
  var addressField = noticeForm.querySelector('#address');
  var minLengthTitle = 30;
  var maxLengthTitle = 100;
  var timeinOption = noticeForm.querySelector('#timein');
  var timeoutOption = noticeForm.querySelector('#timeout');
  var typeOption = noticeForm.querySelector('#type');
  var priceField = noticeForm.querySelector('#price');
  var roomNumberOption = noticeForm.querySelector('#room_number');
  var capacityOption = noticeForm.querySelector('#capacity');
  var featuresFieldset = noticeForm.querySelector('.features');
  var featureElements = featuresFieldset.querySelectorAll('input');
  var descriptionField = noticeForm.querySelector('#description');
  var formButton = noticeForm.querySelector('.form__submit');
  var timesCheck = ['12:00', '13:00', '14:00'];
  var minPrices = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var numberGuests = {
    1: '1',
    2: '2',
    3: '3',
    100: '0'
  };

  var defaultValues = {
    titleValue: '',
    mapPinMainLeft: '600px',
    mapPinMainTop: '375px',
    addressValue: 'x: 600, y: 429',
    priceValue: '1000',
    typeValue: 'flat',
    timeinValue: '12:00',
    roomNumberValue: '1',
    descriptionValue: ''
  };

  var typeOptionValues = Object.keys(minPrices);
  var roomNumberOptionValues = Object.keys(numberGuests);
  var priceFieldValues = [];
  var capacityOptionValues = [];

  var getValues = function (keys, values, object) {
    for (var i = 0; i < keys.length; i++) {
      values.push(object[keys[i]]);
    }
    return values;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var onTimeinChange = function () {
    window.synchronizeFields(timeinOption, timeoutOption, timesCheck, timesCheck, syncValues);
  };

  var onTimeoutChange = function () {
    window.synchronizeFields(timeoutOption, timeinOption, timesCheck, timesCheck, syncValues);
  };

  var onTypeChange = function () {
    window.synchronizeFields(priceField, typeOption, getValues(typeOptionValues, priceFieldValues, minPrices), typeOptionValues, syncValueWithMin);
  };

  var onRoomChange = function () {
    window.synchronizeFields(capacityOption, roomNumberOption, getValues(roomNumberOptionValues, capacityOptionValues, numberGuests), roomNumberOptionValues, syncValues);
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

  var restoreForm = function () {
    titleField.value = defaultValues.titleValue;
    mapPinMain.style.left = defaultValues.mapPinMainLeft;
    mapPinMain.style.top = defaultValues.mapPinMainTop;
    addressField.value = defaultValues.addressValue;
    priceField.value = defaultValues.priceValue;
    typeOption.value = defaultValues.typeValue;
    timeinOption.value = defaultValues.timeinValue;
    roomNumberOption.value = defaultValues.roomNumberValue;
    descriptionField.value = defaultValues.descriptionValue;
    for (var i = 0; i < featureElements.length; i++) {
      featureElements[i].checked = false;
    }
    window.synchronizeFields(timeoutOption, timeinOption, timesCheck, timesCheck, syncValues);
    window.synchronizeFields(capacityOption, roomNumberOption, getValues(roomNumberOptionValues, capacityOptionValues, numberGuests), roomNumberOptionValues, syncValues);
    window.synchronizeFields(priceField, typeOption, getValues(typeOptionValues, priceFieldValues, minPrices), typeOptionValues, syncValueWithMin);
  };

  var onFormSubmit = function (evt) {
    window.backend.publish(new FormData(noticeForm), function () {
      restoreForm();
    }, window.statusHandler.errorHandler);
    evt.preventDefault();
  };

  remapMinPrice();
  remapCapacitySelected();

  timeinOption.addEventListener('change', onTimeoutChange);
  timeoutOption.addEventListener('change', onTimeinChange);
  typeOption.addEventListener('change', onTypeChange);
  roomNumberOption.addEventListener('change', onRoomChange);
  formButton.addEventListener('mouseup', onFormButtonMouseup);
  noticeForm.addEventListener('submit', onFormSubmit);

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
