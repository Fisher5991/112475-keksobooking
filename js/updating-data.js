'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var cards = [];

  var updateAds = function (newCards) {
    window.render(newCards);
  };

  mapFiltersForm.addEventListener('change', function () {
    window.debounce(function () {
      updateAds(window.filtrate(cards));
    });
  });

  window.updatingData = {
    successHandler: function (similarAds) {
      cards = similarAds;
      updateAds(cards);
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
