'use strict';

(function () {
  var MAP_PIN_WIDTH = 46;
  var MAP_PIN_HEIGHT = 62;
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');
  var maxAmountPin = 5;
  var activeMapPin;

  var getPinData = function (dataAd) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = (dataAd.location.x - MAP_PIN_WIDTH / 2) + 'px';
    mapPinElement.style.top = (dataAd.location.y - MAP_PIN_HEIGHT) + 'px';
    mapPinElement.querySelector('img').src = dataAd.author.avatar;
    return mapPinElement;
  };

  var getIndex = function (item) {
    var children = item.parentNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < children.length; i++) {
      if (children[i] === item) {
        return i;
      }
    }
    return -1;
  };

  mapPins.addEventListener('click', function (evt) {
    var toFindTarget = evt.target.closest('.map__pin');
    if (toFindTarget && !toFindTarget.classList.contains('map__pin--main')) {
      window.pin.deactivateMapPins();
      activeMapPin = toFindTarget;
      activeMapPin.classList.add('map__pin--active');
      var activeIndex = getIndex(activeMapPin);
      window.showCard(activeIndex);
    }
  });

  window.pin = {
    addFragmentPin: function (data) {
      var mapPinItems = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var fragmentPin = document.createDocumentFragment();
      var mapPinAmount = data.length > maxAmountPin ? maxAmountPin : data.length;
      for (var i = 0; i < mapPinAmount; i++) {
        fragmentPin.appendChild(getPinData(data[i]));
      }
      window.removeElements(mapPinItems);
      mapPins.appendChild(fragmentPin);
    },

    deactivateMapPins: function () {
      var mapPinItems = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPinItems.length; i++) {
        var mapPinItem = mapPinItems[i];
        if (mapPinItem.classList.contains('map__pin--active')) {
          mapPinItem.classList.remove('map__pin--active');
        }
      }
    }
  };
})();
