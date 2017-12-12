'use strict';

(function () {
  var PRE_NUMBER_ID = '0';
  var userNumber = 1; // счётчик пользователей
  var userIdAmount = 10; // значение, с которого перед ID перестаёт добавляться PRE_NUMBER_ID = '0'
  var userId = 0;

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
  var timesCheck = ['12:00', '13:00', '14:00'];
  var featuresValues = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var similarAds = [];
  var titles = []; // массив со всеми названиями жилищ
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minRoomsAmount = 1;
  var maxRoomsAmount = 5;
  var minGuestsAmount = 1;
  var maxGuestsAmount = 5;
  var minValueX = 300;
  var maxValueX = 900;
  var minValueY = 100;
  var maxValueY = 500;

  var generateFeature = function () {
    var featuresList = []; // создаётся новый массив для преимуществ для каждого объявления
    var featuresValuesWorking = featuresValues.slice(); // копируем возможные значения преимушеств, чтобы не портить изначальный массив, в "рабочий" массив
    featuresList.length = window.generateNumber(1, featuresValuesWorking.length); // генерируем количество преимуществ
    for (var i = 0; i < featuresList.length; i++) {
      var generationFeaturesIndex = window.generateNumber(0, featuresValuesWorking.length - 1); // генерируем индекс, узнав текущую длину "рабочего" массива
      var feature = featuresValuesWorking[generationFeaturesIndex]; // получаем преимущество с сгенерированным индексом
      featuresValuesWorking.splice(generationFeaturesIndex, 1); // удаляем этот индекс из "рабочего" массива
      featuresList.splice(i, 1, feature); // добавляем в массив вместо пустого значения полученное преимущество
    }
    return featuresList; // возвращаем список преимуществ для одного объявления
  };

  var generateUserId = function () {
    if (userNumber < userIdAmount) {
      userId = PRE_NUMBER_ID + userNumber;
    } else {
      userId = userNumber;
    }
    userNumber++;
    return userId;
  };

  // Генерируем само объявление, используя ранее сгенерированные объекты
  var generateAds = function () {
    var adsAmount = 8;
    for (var i = 0; i < adsAmount; i++) {
      var coordinateX = window.generateNumber(minValueX, maxValueX);
      var coordinateY = window.generateNumber(minValueY, maxValueY);
      var adItem = {
        author: {
          avatar: 'img/avatars/user' + generateUserId() + '.png'
        },
        offer: {
          title: titles[i], // из нового массива с названиями жилищ
          address: coordinateX + ', ' + coordinateY,
          price: window.generateNumber(minPrice, maxPrice),
          type: typesHouse[window.generateNumber(0, typesHouse.length - 1)],
          rooms: window.generateNumber(minRoomsAmount, maxRoomsAmount),
          guests: window.generateNumber(minGuestsAmount, maxGuestsAmount),
          checkin: timesCheck[window.generateNumber(0, timesCheck.length - 1)],
          checkout: timesCheck[window.generateNumber(0, timesCheck.length - 1)],
          features: generateFeature(),
          description: '',
          photos: ''
        },
        location: {
          x: coordinateX,
          y: coordinateY
        }
      };
      similarAds.push(adItem); // добавляем в массив сгенерированное объявление
    }
    return similarAds;
  };

  (function () {
    while (titlesHouse.length > 0) {
      var generationTitlesIndex = window.generateNumber(0, titlesHouse.length - 1); // генерируем индекс названия жилища
      var title = titlesHouse[generationTitlesIndex]; // берём сгенерированное название жилища по индексу
      titlesHouse.splice(generationTitlesIndex, 1); // удаляем использованное название жилища из глобального массива
      titles.push(title); // для каждого объявления случайно генерируем неповторяющиеся названия, поочередно добавляя их в массив названий жилищ
    }
  })();

  window.data = {
    similarAds: generateAds(),

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
