'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapCardTemplate = template.querySelector('.map__card');
  var mapFilters = document.querySelector('.map__filters-container');

  window.card = {
    renderAd: function (dataAd) {
      var adElement = mapCardTemplate.cloneNode(true);
      adElement.querySelector('h3').textContent = dataAd.offer.title;
      adElement.querySelector('small').textContent = dataAd.offer.address;
      adElement.querySelector('.popup__price').innerHTML = dataAd.offer.price + ' &#x20bd;/ночь';
      adElement.querySelector('h4').textContent = window.data.getTypeName(dataAd.offer.type);
      adElement.querySelector('h4 + p').textContent = dataAd.offer.rooms + ' для ' + dataAd.offer.guests + ' гостей';
      adElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + dataAd.offer.checkin + ', выезд до ' + dataAd.offer.checkout;
      adElement.querySelector('.popup__features').innerHTML = window.data.getFeatureElements(dataAd.offer.features);
      adElement.querySelector('.popup__features + p').textContent = dataAd.offer.description;
      adElement.querySelector('.popup__avatar').src = dataAd.author.avatar;
      return adElement;
    },

    fragmentCard: document.createDocumentFragment(),

    cb: function (frag) {
      map.insertBefore(frag, mapFilters);
      window.card.hideCard();
    },

    hideCard: function () {
      var mapCardItems = map.querySelectorAll('.map__card');
      for (var i = 0; i < mapCardItems.length; i++) {
        var mapCardItem = mapCardItems[i];
        mapCardItem.classList.add('hidden');
      }
      document.removeEventListener('keydown', window.card.onPopupEscPress);
    },

    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.card.hideCard();
        window.pin.deactivateMapPins();
      }
    }
  };
})();
