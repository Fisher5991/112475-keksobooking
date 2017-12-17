'use strict';

(function () {
  var map = document.querySelector('.map');

  window.showCard = function (index) {
    var popup = map.querySelectorAll('.map__card');
    window.card.hideCard();
    popup[index].classList.remove('hidden');
    document.addEventListener('keydown', window.card.onPopupEscPress);
  };
})();
