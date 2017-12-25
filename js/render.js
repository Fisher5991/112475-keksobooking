'use strict';

(function () {
  var map = document.querySelector('.map');

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

  window.render = function (similarAds) {
    var fragmentCard = document.createDocumentFragment();
    window.pin.addFragmentPin(similarAds);
    for (var i = 0; i < similarAds.length; i++) {
      fragmentCard.appendChild(window.card.renderAd(similarAds[i]));
    }
    window.card.insertFragment(fragmentCard);
    toFindCloseButton();
  };
})();
