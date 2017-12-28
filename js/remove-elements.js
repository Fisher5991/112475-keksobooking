'use strict';

(function () {
  window.removeElements = function (items) {
    items.forEach(function (item) {
      item.remove();
    });
  };
})();
