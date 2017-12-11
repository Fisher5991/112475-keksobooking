'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');

  var toFindCloseButton = function () {
    var popupCloseButtons = map.querySelectorAll('.popup__close');
    for (var i = 0; i < popupCloseButtons.length; i++) {
      var popupCloseButton = popupCloseButtons[i];
      popupCloseButton.addEventListener('click', function () {
        window.card.hidePopup();
        window.pin.deactivateMapPins();
      });
    }
  };

  var onButtonMouseup = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(window.pin.fragmentPin);
    noticeForm.classList.remove('notice__form--disabled');
    window.adsForm.enableField();
    map.insertBefore(window.card.fragmentCard, mapFilters);
    window.card.hidePopup();
    toFindCloseButton();
    mapPinMain.removeEventListener('mouseup', onButtonMouseup);
  };

  window.adsForm.disableField();

  mapPinMain.addEventListener('mouseup', onButtonMouseup);
})();
