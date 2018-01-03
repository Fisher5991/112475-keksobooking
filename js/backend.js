'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK_CODE = 200;
  var TIMEOUT_VALUE = 30000;

  var configure = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_VALUE;

    return xhr;
  };

  window.backend = {
    publish: function (data, onSuccess, onError) {
      var xhr = configure(onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    load: function (onSuccess, onError) {
      var xhr = configure(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    }
  };
})();
