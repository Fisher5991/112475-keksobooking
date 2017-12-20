'use strict';

(function () {
  var titlesHouse = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var typesHouse = ['flat', 'house', 'bungalo'];
  var titles = []; // массив со всеми названиями жилищ

  (function () {
    while (titlesHouse.length > 0) {
      var generationTitlesIndex = window.generateNumber(0, titlesHouse.length - 1); // генерируем индекс названия жилища
      var title = titlesHouse[generationTitlesIndex]; // берём сгенерированное название жилища по индексу
      titlesHouse.splice(generationTitlesIndex, 1); // удаляем использованное название жилища из глобального массива
      titles.push(title); // для каждого объявления случайно генерируем неповторяющиеся названия, поочередно добавляя их в массив названий жилищ
    }
  })();

  window.data = {

    getTypeName: function (type) {
      if (type === typesHouse[0]) {
        type = 'Квартира';
      }
      if (type === typesHouse[1]) {
        type = 'Дом';
      }
      if (type === typesHouse[2]) {
        type = 'Бунгало';
      }
      return type;
    },

    getFeatureElements: function (features) {
      var featureElements = '';
      for (var i = 0; i <= features.length - 1; i++) {
        featureElements += '<li class="feature feature--' + features[i] + '"></li>';
      }
      return featureElements;
    }
  };
})();
