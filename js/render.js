'use strict';

(function () {
  window.render = function (similarAds) {
    var fragmentCard = document.createDocumentFragment();
    window.pin.addFragmentPin(similarAds);
    for (var i = 0; i < similarAds.length; i++) {
      fragmentCard.appendChild(window.card.renderAd(similarAds[i]));
    }
    window.card.insertFragment(fragmentCard);
  };
})();
