'use strict';

(function () {
  window.statusHandler = {
    successHandler: function (similarAds, cb) {
      window.pin.addFragmentPin(similarAds);

      for (var i = 0; i < similarAds.length; i++) {
        window.card.fragmentCard.appendChild(window.card.renderAd(similarAds[i]));
      }
      cb(window.card.fragmentCard);
    },

    errorHandler: function (errorMessage) {
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
    }
  };
})();
