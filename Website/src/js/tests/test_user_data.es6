/***** Test user data module *****/
module.exports = function() {
  'use strict';
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://ip-api.com/json/');
    xhr.responseType = 'json';
    xhr.onload = function() {
      resolve(this.response);
    };

    xhr.onerror = function() {
      reject('Ошибка ' + this.status);
    };

    xhr.send();
  });
};