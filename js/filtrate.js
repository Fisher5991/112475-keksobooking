'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');
  var housingFeatures = housingFeaturesFieldset.querySelectorAll('input');

  var priceVariant = {
    low: 10000,
    middle: 50000
  };

  window.filtrate = function (items) {
    var cardsWorking = items;
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
})();
