'use strict';

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
var similarAds = []; // массив со всеми объявлениями
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

var map = document.querySelector('.map');
var fragmentAd = document.createDocumentFragment();
var fragmentPin = document.createDocumentFragment();
var template = document.querySelector('template').content;
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = template.querySelector('.map__pin');
var mapCardTemplate = template.querySelector('.map__card');
var mapPinWidth = 46;
var mapPinHeight = 62;
var mapFilters = document.querySelector('.map__filters-container');

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

// Генерируем случайные числа в диапазоне
var generateNumber = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
};

// Генерируем список преимуществ
var generateFeature = function () {
  var featuresList = []; // создаётся новый массив для преимуществ для каждого объявления
  var featuresValuesWorking = featuresValues.slice(); // копируем возможные значения преимушеств, чтобы не портить изначальный массив, в "рабочий" массив
  featuresList.length = generateNumber(1, featuresValuesWorking.length); //генерируем количество преимуществ
  for (var i = 0; i < featuresList.length; i++) {
    var generationFeaturesIndex = generateNumber(0, featuresValuesWorking.length - 1); // генерируем индекс, узнав текущую длину "рабочего" массива
    var feature = featuresValuesWorking[generationFeaturesIndex]; // получаем преимущество с сгенерированным индексом
    featuresValuesWorking.splice(generationFeaturesIndex, 1); // удаляем этот индекс из "рабочего" массива
    featuresList.splice(i, 1, feature); // добавляем в массив вместо пустого значения полученное преимущество
  }
  return featuresList; //возвращаем список преимуществ для одного объявления
};

// Генерируем ID юзера
var generateUserId = function () {
  if (userNumber < userIdAmount) {
    userId = PRE_NUMBER_ID + userNumber;
  } else {
    userId = userNumber;
  }
  userNumber++;
  return userId;
};

// Генерируем заголовки предложений
var generateTitles = function () {
  while (titlesHouse.length > 0) {
    var generationTitlesIndex = generateNumber(0, titlesHouse.length - 1); // генерируем индекс названия жилища
    var title = titlesHouse[generationTitlesIndex]; // берём сгенерированное название жилища по индексу
    titlesHouse.splice(generationTitlesIndex, 1); // удаляем использованное название жилища из глобального массива
    titles.push(title); // для каждого объявления случайно генерируем неповторяющиеся названия, поочередно добавляя их в массив названий жилищ
  }
};

// Генерируем само объявление, используя ранее сгенерированные объекты
var generateAds = function () {
  var adsAmount = 8;
  for (var i = 0; i < adsAmount; i++) {
    var coordinateX = generateNumber(minValueX, maxValueX);
    var coordinateY = generateNumber(minValueY, maxValueY);
    var adItem = {
      author: {
        avatar: 'img/avatars/user' + generateUserId() + '.png'
      },
      offer: {
        title: titles[i], // из нового массива с названиями жилищ
        address: coordinateX + ', ' + coordinateY,
        price: generateNumber(minPrice, maxPrice),
        type: typesHouse[generateNumber(0, typesHouse.length - 1)],
        rooms: generateNumber(minRoomsAmount, maxRoomsAmount),
        guests: generateNumber(minGuestsAmount, maxGuestsAmount),
        checkin: timesCheck[generateNumber(0, timesCheck.length - 1)],
        checkout: timesCheck[generateNumber(0, timesCheck.length - 1)],
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
};

// Отрисовываем метки объявлений
var renderPin = function (dataAd) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = (dataAd.location.x - mapPinWidth / 2) + 'px';
  mapPinElement.style.top = (dataAd.location.y - mapPinHeight) + 'px';
  mapPinElement.querySelector('img').src = dataAd.author.avatar;
  return mapPinElement;
};

// Получаем название типа из массива для вывода в объявлении
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

// Получаем все значения "преимуществ"
var getFeatureElements = function (features) {
  var featureElements = '';
  for (var i = 0; i <= features.length - 1; i++) {
    featureElements += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return featureElements;
};

// Отрисовываем объявления
var renderAd = function (dataAd) {
  var adElement = mapCardTemplate.cloneNode(true);
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

// Добавляем метки объявлений в фрагмент
var addFragmentPin = function () {
  for (var i = 0; i < similarAds.length; i++) {
    fragmentPin.appendChild(renderPin(similarAds[i]));
  }
};

// Добавляем объявления в фрагмент
var addFragmentAd = function () {
  for (var i = 0; i < similarAds.length; i++) {
    fragmentAd.appendChild(renderAd(similarAds[i]));
  }
};

generateTitles();
generateAds();
addFragmentPin();
addFragmentAd();


/* --------------- Задание 2 ------------------ */

var activeMapPin;
var noticeForm = document.querySelector('.notice__form');
var noticeFieldSet = noticeForm.querySelectorAll('fieldset');
var mapPinMain = map.querySelector('.map__pin--main');
var popupClose = map.querySelector('.popup__close');
var ESC_KEYCODE = 27;

var toFindCloseButton = function () {
  var popupCloseButtons = map.querySelectorAll('.popup__close');
  for (var i = 0; i < popupCloseButtons.length; i++) {
    var popupCloseButton = popupCloseButtons[i];
    popupCloseButton.addEventListener('click', function () {
      hidePopup();
      deactivateMapPins();
    });
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hidePopup();
    deactivateMapPins();
  }
};

var disableField = function () {
  for (var i = 0; i < noticeFieldSet.length; i++) {
    noticeFieldSet[i].disabled = true;
  }
};

var enableField = function () {
  for (var i = 0; i < noticeFieldSet.length; i++) {
    noticeFieldSet[i].disabled = false;
  }
};

var onButtonMouseup = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragmentPin);
  noticeForm.classList.remove('notice__form--disabled');
  enableField();
  map.insertBefore(fragmentAd, mapFilters);
  hidePopup();
  toFindCloseButton();
  mapPinMain.removeEventListener('mouseup', onButtonMouseup);
};

var hidePopup = function () {
  var mapCardItems = map.querySelectorAll('.map__card');
  for (var i = 0; i < mapCardItems.length; i++) {
    var mapCardItem = mapCardItems[i];
    mapCardItem.classList.add('hidden');
  }
  document.removeEventListener('keydown', onPopupEscPress);
};

var showPopup = function (index) {
  var popup = map.querySelectorAll('.map__card');
  hidePopup();
  popup[index].classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var deactivateMapPins = function () {
  var mapPinItems = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < mapPinItems.length; i++) {
    var mapPinItem = mapPinItems[i];
    if (mapPinItem.classList.contains('map__pin--active')) {
      mapPinItem.classList.remove('map__pin--active');
    }
  }
};

var getIndex = function (item) {
  var children = item.parentNode.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < children.length; i++) {
    if (children[i] === item) {
      return i;
    }
  }
  return -1;
};

disableField();

mapPinMain.addEventListener('mouseup', onButtonMouseup);

mapPins.addEventListener('click', function (evt) {
  var toFindTarget = evt.target.closest('.map__pin');
  if (toFindTarget && !toFindTarget.classList.contains('map__pin--main')) {
    deactivateMapPins();
    activeMapPin = toFindTarget;
    activeMapPin.classList.add('map__pin--active');
    var activeIndex = getIndex(activeMapPin);
    showPopup(activeIndex);
  }
});