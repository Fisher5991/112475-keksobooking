'use strict';

(function () {
  var typesHouse = ['flat', 'house', 'bungalo'];

  window.data = {
    getTypeName: function (type) {
      switch (type) {
        case typesHouse[0]:
          return 'Квартира';
        case typesHouse[1]:
          return 'Дом';
        case typesHouse[2]:
          return 'Бунгало';
        default:
          throw new Error('Неизвестный тип жилища');
      }
    },

    getFeatureElements: function (htmlElement, features) {
      var featureElements = htmlElement.querySelectorAll('.feature');
      window.removeElements(featureElements);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var liElement = document.createElement('li');
        liElement.className = 'feature feature--' + features[i];
        fragment.appendChild(liElement);
      }
      return fragment;
    }
  };
})();
