'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_WIDTH = '50';
  var IMG_HEIGHT = '50';
  var noticePhoto = document.querySelector('.notice__photo #avatar');
  var formPhoto = document.querySelector('.form__photo-container #images');
  var noticePreview = document.querySelector('.notice__preview img');
  var formPhotoContainer = document.querySelector('.form__photo-container');
  var uploadPhoto = formPhotoContainer.querySelector('.upload');

  var onNoticePhotoChange = function () {
    uploadFile(noticePhoto, noticePreview, acceptPhoto, insertNoticePhoto);
  };

  var onFormPhotoChange = function () {
    uploadFile(formPhoto, formPhotoContainer, acceptPhoto, insertFormPhoto);
  };

  var insertNoticePhoto = function (preview, reader) {
    preview.src = reader.result;
  };

  var insertFormPhoto = function (preview, reader) {
    var imageElement = document.createElement('img');
    imageElement.src = reader.result;
    imageElement.width = IMG_WIDTH;
    imageElement.height = IMG_HEIGHT;
    preview.insertBefore(imageElement, uploadPhoto);
  };

  var uploadFile = function (filesPlace, preview, acceptFile, cb) {
    for (var i = 0; i < filesPlace.files.length; i++) {
      var file = filesPlace.files[i];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        acceptFile(preview, file, cb);
      }
    }
  };

  var acceptPhoto = function (preview, file, cb) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      cb(preview, reader);
    });
    reader.readAsDataURL(file);
  };

  noticePhoto.addEventListener('change', onNoticePhotoChange);
  formPhoto.addEventListener('change', onFormPhotoChange);
})();
