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
    adElement.querySelector('.popup__features').innerHTML = dataAd.offer.features;
    adElement.querySelector('.popup__features + p').textContent = dataAd.offer.description;
    adElement.querySelector('.popup__avatar').src = dataAd.author.avatar;
    return adElement;
  };

  var successHandler = function (similarAds) {
    debugger;
    for (var i = 0; i < similarAds.length; i++) {
      fragmentCard.appendChild(renderAd(similarAds[i]));
    }
    return fragmentCard;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 100px; height: 100px; padding-right: 15px; padding-left: 15px; padding-top: 30px; border-radius: 50%; text-align: center; background-color: darkorange;';
    node.style.border = '10px solid red';
    node.style.position = 'absolute';
    node.style.top = '10px';
    node.style.left = '50%';
    node.style.transform = 'translate(-50%)';
    node.style.fontSize = '14px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.card = {
    fragmentCard: window.backend.load(successHandler, errorHandler),

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
