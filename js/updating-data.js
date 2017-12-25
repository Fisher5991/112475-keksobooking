'use strict';

(function () {
  var cards = [];
  var updateAds = function (newCards) {
    window.render(newCards);
  };

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

  /* ----------------------- Последнее задание ----------------------- */
  var priceVariant = {
    low: 10000,
    middle: 50000
  };
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');
  var housingFeatures = housingFeaturesFieldset.querySelectorAll('input');

  var filtrate = function () {
    var cardsWorking = cards;
    var selectFilter = function (filterItem, key) {
      if (filterItem.value !== 'any') {
        cardsWorking = cardsWorking.filter(function (card) {
          return card.offer[key].toString() === filterItem.value;
        });
      }
      return cardsWorking;
    };

    var selectPriceFilter = function (filterItem) {
      cardsWorking = cardsWorking.filter(function (card) {
        switch (filterItem.value) {
          case 'low':
            return card.offer.price <= priceVariant.low;
          case 'middle':
            return card.offer.price >= priceVariant.low && card.offer.price <= priceVariant.middle;
          case 'high':
            return card.offer.price >= priceVariant.middle;
          default:
            return true;
        }
      });
      return cardsWorking;
    };

    var selectFeaturesFilter = function (filterItem) {
      filterItem.forEach(function (item) {
        if (item.checked === true) {
          cardsWorking = cardsWorking.filter(function (card) {
            return card.offer.features.indexOf(item.value) >= 0;
          });
        }
      });
      return cardsWorking;
    };

    selectFilter(housingType, 'type');
    selectFilter(housingRooms, 'rooms');
    selectFilter(housingGuests, 'guests');
    selectPriceFilter(housingPrice);
    selectFeaturesFilter(housingFeatures);
    return cardsWorking;
  };

  mapFiltersForm.addEventListener('change', function () {
    window.debounce(function () {
      updateAds(filtrate());
    });
  });
})();
