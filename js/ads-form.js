'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldSet = noticeForm.querySelectorAll('fieldset');
  var titleField = noticeForm.querySelector('#title');
  var addressField = noticeForm.querySelector('#address');
  var timeinOption = noticeForm.querySelector('#timein');
  var timeoutOption = noticeForm.querySelector('#timeout');
  var typeOption = noticeForm.querySelector('#type');
  var priceField = noticeForm.querySelector('#price');
  var roomNumberOption = noticeForm.querySelector('#room_number');
  var capacityOption = noticeForm.querySelector('#capacity');
  var numberGuestsOptions = capacityOption.options;
  var featuresFieldset = noticeForm.querySelector('.features');
  var featureElements = featuresFieldset.querySelectorAll('input');
  var descriptionField = noticeForm.querySelector('#description');
  var formButton = noticeForm.querySelector('.form__submit');
  var formReset = noticeForm.querySelector('.form__reset');
  var minLengthTitle = 30;
  var maxLengthTitle = 100;
  var timesCheck = ['12:00', '13:00', '14:00'];
  var minPrice = {
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
    title: '',
    mapPinMainLeft: '600px',
    mapPinMainTop: '375px',
    address: 'x: 600, y: 429',
    price: '1000',
    type: 'flat',
    timein: '12:00',
    roomNumber: '1',
    description: ''
  };

  var typeOptionValues = Object.keys(minPrice);
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
    window.synchronizeFields(priceField, typeOption, getValues(typeOptionValues, priceFieldValues, minPrice), typeOptionValues, syncValueWithMin);
  };

  var onRoomChange = function () {
    window.synchronizeFields(capacityOption, roomNumberOption, getValues(roomNumberOptionValues, capacityOptionValues, numberGuests), roomNumberOptionValues, syncValues);
    disableOptions();
  };

  var disableOptions = function () {
    for (var i = 0; i < numberGuestsOptions.length; i++) {
      if (roomNumberOption.value === '100') {
        numberGuestsOptions[i].disabled = numberGuestsOptions[i].value !== numberGuests['100'];
      } else {
        numberGuestsOptions[i].disabled = numberGuestsOptions[i].value === numberGuests['100'] || numberGuestsOptions[i].value > roomNumberOption.value;
      }
    }
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

  var onFormResetClick = function (evt) {
    evt.preventDefault();
    restoreForm();
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
        priceField.min = minPrice[typeOptionElement.value];
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
    titleField.value = defaultValues.title;
    mapPinMain.style.left = defaultValues.mapPinMainLeft;
    mapPinMain.style.top = defaultValues.mapPinMainTop;
    addressField.value = defaultValues.address;
    priceField.value = defaultValues.price;
    typeOption.value = defaultValues.type;
    timeinOption.value = defaultValues.timein;
    roomNumberOption.value = defaultValues.roomNumber;
    descriptionField.value = defaultValues.description;
    for (var i = 0; i < featureElements.length; i++) {
      featureElements[i].checked = false;
    }
    window.synchronizeFields(timeoutOption, timeinOption, timesCheck, timesCheck, syncValues);
    window.synchronizeFields(capacityOption, roomNumberOption, getValues(roomNumberOptionValues, capacityOptionValues, numberGuests), roomNumberOptionValues, syncValues);
    window.synchronizeFields(priceField, typeOption, getValues(typeOptionValues, priceFieldValues, minPrice), typeOptionValues, syncValueWithMin);
  };

  var onFormSubmit = function (evt) {
    window.backend.publish(new FormData(noticeForm), function () {
      restoreForm();
    }, window.updatingData.errorHandler);
    evt.preventDefault();
  };

  remapMinPrice();
  remapCapacitySelected();
  disableOptions();

  timeinOption.addEventListener('change', onTimeoutChange);
  timeoutOption.addEventListener('change', onTimeinChange);
  typeOption.addEventListener('change', onTypeChange);
  roomNumberOption.addEventListener('change', onRoomChange);
  formButton.addEventListener('mouseup', onFormButtonMouseup);
  formReset.addEventListener('click', onFormResetClick);
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
