'use strict';

(function () {
  var IMG_WIDTH = '50';
  var IMG_HEIGHT = '50';
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
      var fragment = document.createDocumentFragment();
      window.removeElements(featureElements);
      for (var i = 0; i < features.length; i++) {
        var liElement = document.createElement('li');
        liElement.className = 'feature feature--' + features[i];
        fragment.appendChild(liElement);
      }
      return fragment;
    },

    getPhotos: function (htmlElement, photos) {
      var emptyLiElement = htmlElement.querySelectorAll('.popup__pictures li');
      var fragment = document.createDocumentFragment();
      window.removeElements(emptyLiElement);
      for (var i = 0; i < photos.length; i++) {
        var liElement = document.createElement('li');
        var imgElement = document.createElement('img');
        imgElement.src = photos[i];
        imgElement.width = IMG_WIDTH;
        imgElement.height = IMG_HEIGHT;
        liElement.appendChild(imgElement);
        fragment.appendChild(liElement);
      }
      return fragment;
    }
  };
})();
