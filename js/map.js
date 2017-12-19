'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');

  var toFindCloseButton = function () {
    var popupCloseButtons = map.querySelectorAll('.popup__close');
    for (var i = 0; i < popupCloseButtons.length; i++) {
      var popupCloseButton = popupCloseButtons[i];
      popupCloseButton.addEventListener('click', function () {
        window.card.hideCard();
        window.pin.deactivateMapPins();
      });
    }
  };

  var onButtonMouseup = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.adsForm.enableField();
    toFindCloseButton();
    mapPinMain.removeEventListener('mouseup', onButtonMouseup);
  };

  window.adsForm.disableField();

  mapPinMain.addEventListener('mouseup', onButtonMouseup);

  var MAP_PIN_MAIN_HEIGHT = 64;
  var PIN_POINTER_HEIGHT = 22;
  var BOUND_TOP = 100;
  var BOUND_BOTTOM = 500;

  var addressField = noticeForm.querySelector('#address');

  var onMapPinMainMouseDown = function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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

      mapPinMain.style.left = valueOffsetX + 'px';
      if (valueOffsetY >= forbiddenTopY && valueOffsetY <= forbiddenBottomY) {
        mapPinMain.style.top = valueOffsetY + 'px';
      }
    };

    var onMapPinMainMouseUp = function (upEvt) {
      var addressX = parseInt(mapPinMain.style.left, 10);
      var addressY = parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT / 2 + PIN_POINTER_HEIGHT;
      upEvt.preventDefault();
      addressField.value = 'x: ' + addressX + ', y: ' + addressY;
      document.removeEventListener('mousemove', onMapPinMainMouseMove);
      document.removeEventListener('mouseup', onMapPinMainMouseUp);
    };

    document.addEventListener('mousemove', onMapPinMainMouseMove);
    document.addEventListener('mouseup', onMapPinMainMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
})();
