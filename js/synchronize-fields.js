'use strict';

(function () {
  window.synchronizeFields = function (receivedElement, mainElement, receivedElementValues, mainElementValues, switchValues) {
    var indexMainElement = mainElementValues.indexOf(mainElement.value);
    switchValues(receivedElement, receivedElementValues[indexMainElement]);
  };
})();
