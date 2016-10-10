module.exports = (function () {
  'use strict';
  /*** Custom event polyfill ***/
  if(typeof window.CustomEvent === "function") {
    return false;
  }
  function CustomEvent(event, params) {
    params = params || {bubbles: false, cancelable: false, detail: undefined};
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;

  /*** Remove element polyfill ***/
  if(!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if(this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  /*** Element closest polyfill ***/
  if(!('closest' in Element.prototype)) {
    Element.prototype.closest = function closest(selector) {
      var node = this;
      while(node) {
        if(node.matches(selector)) {
          return node;
        }
        else {
          node = node.parentElement;
        }
      }
      return null;
    };
  }

  /*** Element matches polyfill ***/
  if(!('matches' in Element.prototype)) {
    Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;
      while(elements[index] && elements[index] !== element) {
        ++index;
      }
      return !!elements[index];
    };
  }

})();