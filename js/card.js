'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapCardTemplate = template.querySelector('.map__card');
  var fragmentCard = document.createDocumentFragment();

  var renderAd = function (dataAd) {
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
  };

  var addFragmentCard = function () {
    for (var i = 0; i < window.data.similarAds.length; i++) {
      fragmentCard.appendChild(renderAd(window.data.similarAds[i]));
    }
    return fragmentCard;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.hidePopup();
      window.pin.deactivateMapPins();
    }
  };

  window.card = {
    fragmentCard: addFragmentCard(),

    hidePopup: function () {
      var mapCardItems = map.querySelectorAll('.map__card');
      for (var i = 0; i < mapCardItems.length; i++) {
        var mapCardItem = mapCardItems[i];
        mapCardItem.classList.add('hidden');
      }
      document.removeEventListener('keydown', onPopupEscPress);
    },

    showPopup: function (index) {
      var popup = map.querySelectorAll('.map__card');
      window.card.hidePopup();
      popup[index].classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    }
  };
})();
