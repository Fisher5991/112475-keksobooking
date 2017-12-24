'use strict';

(function () {
  var cards = [];
  var cardsWorking = [];
  var updateAds = function (newCards) {
    window.render(newCards);
  };

  window.statusHandler = {
    successHandler: function (similarAds) {
      cards = similarAds;
      cardsWorking = cards.slice();
      updateAds(cardsWorking);
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

  /* ----------------------- Последнее задание ----------------------- */
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  /* var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = mapFiltersForm.querySelector('#housing-features'); */

  var filtrate = function () {
    var selectFilter = function (filterItem) {
      if (filterItem.value !== 'any') {
        cardsWorking = cards.filter(function (card) {
          return card.offer.type === filterItem.value;
        });
      }
    };
    selectFilter(housingType);
    return cardsWorking;
  };

  mapFiltersForm.addEventListener('change', function () {
    updateAds(filtrate());
  });
})();
