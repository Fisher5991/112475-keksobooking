'use strict';

var userNumber = 1;
var PRE_NUMBER_ID = '0';
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
var titles = [];
var minValueX = 300;
var maxValueX = 900;
var minValueY = 100;
var maxValueY = 500;

var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();
var template = document.querySelector('template').content;
var mapPins = document.querySelector('.map__pins');
var mapPin = template.querySelector('.map__pin');
var mapPinWidth = 46;
var mapPinHeight = 62;
var mapCard = template.querySelector('.map__card');
var mapFilters = document.querySelector('.map__filters-container');

var generateNumber = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var generateFeature = function () {
  var featuresList = [];
  var featuresValuesWorking = featuresValues.slice();
  featuresList.length = generateNumber(1, featuresValuesWorking.length);
  for (var i = 0; i < featuresList.length; i++) {
    var generationFeaturesIndex = generateNumber(0, featuresValuesWorking.length - 1);
    var feature = featuresValuesWorking[generationFeaturesIndex];
    featuresValuesWorking.splice(generationFeaturesIndex, 1);
    featuresList.splice(i, 1, feature);
  }
  return featuresList;
};

var generateUserId = function () {
  if (userNumber < 10) {
    userId = PRE_NUMBER_ID + userNumber;
  } else {
    userId = userNumber;
  }
  userNumber++;
  return userId;
};

var generateTitles = function () {
  while (titlesHouse.length > 0) {
    var generationTitlesIndex = generateNumber(0, titlesHouse.length - 1);
    var title = titlesHouse[generationTitlesIndex];
    titlesHouse.splice(generationTitlesIndex, 1);
    titles.push(title);
  }
};

var generateAds = function () {
  var adsAmount = 8;
  for (var i = 0; i < adsAmount; i++) {
    var coordinateX = generateNumber(minValueX, maxValueX);
    var coordinateY = generateNumber(minValueY, maxValueY);
    var adItem = {
      'author': {
        'avatar': 'img/avatars/user' + generateUserId() + '.png'
      },
      'offer': {
        'title': titles[i],
        'address': coordinateX + ', ' + coordinateY,
        'price': generateNumber(1000, 1000000),
        'type': typesHouse[generateNumber(0, typesHouse.length - 1)],
        'rooms': generateNumber(1, 5),
        'guests': generateNumber(1, 5),
        'checkin': timesCheck[generateNumber(0, timesCheck.length - 1)],
        'checkout': timesCheck[generateNumber(0, timesCheck.length - 1)],
        'features': generateFeature(),
        'description': '',
        'photos': ''
      },
      'location': {
        'x': coordinateX,
        'y': coordinateY
      }
    };
    similarAds.push(adItem);
  }
};

var renderPin = function (dataAd) {
  var mapPinElement = mapPin.cloneNode(true);
  mapPinElement.style.left = (dataAd.location.x - mapPinWidth / 2) + 'px';
  mapPinElement.style.top = (dataAd.location.y - mapPinHeight) + 'px';
  mapPinElement.querySelector('img').src = dataAd.author.avatar;
  return mapPinElement;
};

var getTypeName = function (type) {
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
};

var getFeatureElements = function (features) {
  var featureElements = '';
  for (var i = 0; i <= features.length - 1; i++) {
    featureElements += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return featureElements;
};

var renderAd = function (dataAd) {
  var adElement = mapCard.cloneNode(true);
  adElement.querySelector('h3').textContent = dataAd.offer.title;
  adElement.querySelector('small').textContent = dataAd.offer.address;
  adElement.querySelector('.popup__price').innerHTML = dataAd.offer.price + ' &#x20bd;/ночь';
  adElement.querySelector('h4').textContent = getTypeName(dataAd.offer.type);
  adElement.querySelector('h4 + p').textContent = dataAd.offer.rooms + ' для ' + dataAd.offer.guests + ' гостей';
  adElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + dataAd.offer.checkin + ', выезд до ' + dataAd.offer.checkout;
  adElement.querySelector('.popup__features').innerHTML = getFeatureElements(dataAd.offer.features);
  adElement.querySelector('.popup__features + p').textContent = dataAd.offer.description;
  adElement.querySelector('.popup__avatar').src = dataAd.author.avatar;
  return adElement;
};

var addFragmentPin = function () {
  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(renderPin(similarAds[i]));
  }
};

var addFragmentAd = function () {
  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(renderAd(similarAds[i]));
  }
};

map.classList.remove('map--faded');
generateTitles();
generateAds();
addFragmentPin();
addFragmentAd();
mapPins.appendChild(fragment);
map.insertBefore(fragment, mapFilters);
