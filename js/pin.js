'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');
  var mapPinWidth = 46;
  var mapPinHeight = 62;
  var maxAmountPin = 5;
  var activeMapPin;

  var renderPin = function (dataAd) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = (dataAd.location.x - mapPinWidth / 2) + 'px';
    mapPinElement.style.top = (dataAd.location.y - mapPinHeight) + 'px';
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

  var removeMapPins = function (items) {
    items.forEach(function (item) {
      item.remove();
    });
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
        fragmentPin.appendChild(renderPin(data[i]));
      }
      removeMapPins(mapPinItems);
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
