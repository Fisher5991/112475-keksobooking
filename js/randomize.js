'use strict';

(function () {
  window.generateNumber = function (minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
  };
})();
