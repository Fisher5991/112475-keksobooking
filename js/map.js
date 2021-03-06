'use strict';

(function () {
  var MAP_PIN_MAIN_HEIGHT = 64;
  var PIN_POINTER_HEIGHT = 22;
  var BOUND_TOP = 100;
  var BOUND_RIGHT = 1168;
  var BOUND_BOTTOM = 500;
  var BOUND_LEFT = 32;
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');
  var addressField = noticeForm.querySelector('#address');
  var discontinued = false;

  var onButtonMouseup = function () {
    map.classList.remove('map--faded');
    window.backend.load(window.updatingData.successHandler, window.updatingData.errorHandler);
    noticeForm.classList.remove('notice__form--disabled');
    window.adsForm.enableField();
    mapPinMain.removeEventListener('mouseup', onButtonMouseup);
  };

  var onMapPinMainMouseDown = function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMapPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var valueOffsetX = mapPinMain.offsetLeft - shift.x;
      var valueOffsetY = mapPinMain.offsetTop - shift.y;
      var forbiddenTopY = BOUND_TOP - (MAP_PIN_MAIN_HEIGHT / 2 + PIN_POINTER_HEIGHT);
      var forbiddenBottomY = BOUND_BOTTOM - (MAP_PIN_MAIN_HEIGHT / 2 + PIN_POINTER_HEIGHT);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (valueOffsetX >= BOUND_LEFT && valueOffsetX <= BOUND_RIGHT) {
        mapPinMain.style.left = valueOffsetX + 'px';
      }

      if (valueOffsetY >= forbiddenTopY && valueOffsetY <= forbiddenBottomY) {
        mapPinMain.style.top = valueOffsetY + 'px';
      }
    };

    var onMapPinMainMouseUp = function (upEvt) {
      var addressX = parseInt(mapPinMain.style.left, 10);
      var addressY = parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT / 2 + PIN_POINTER_HEIGHT;
      upEvt.preventDefault();
      addressField.value = 'x: ' + addressX + ', y: ' + addressY;
      if (dragged === false && discontinued === false) {
        addressField.value = window.adsForm.defaultValues.address;
        discontinued = true;
      }
      document.removeEventListener('mousemove', onMapPinMainMouseMove);
      document.removeEventListener('mouseup', onMapPinMainMouseUp);
    };

    document.addEventListener('mousemove', onMapPinMainMouseMove);
    document.addEventListener('mouseup', onMapPinMainMouseUp);
  };

  window.adsForm.disableField();
  mapPinMain.addEventListener('mouseup', onButtonMouseup);
  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
})();
