/* Storage module */
module.exports = class Storage {
  constructor() {
    this.local_storage_support = this.supportLocalStorage();
  }

  setItem(name, value, days) {
    this.local_storage_support
      ? localStorage.setItem(name, value)
      : writeCookie(name, value, days);
  }
  getItem(name) {
    return this.local_storage_support
      ? localStorage.getItem(name) 
      : readCookie(name);
  }
  removeItem(name) {
    this.local_storage_support
      ? localStorage.removeItem(name)
      : this.set(name, '', -1);
  }
  supportLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    }
    catch(e) {
      return false;
    }
  }
  readCookie(name) {
    let name_equal = name + "=";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while(cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if(cookie.indexOf(name_equal) == 0) {
        return cookie.substring(name_equal.length, cookie.length);
      }
    }
    return null;
  }
  writeCookie(name, value, days) {
    let expiration = (function() {
      if(days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        return "; expires=" + date.toGMTString();
      }
      else {
          return 315360000000;
      }
    })();
    document.cookie = name + "=" + value + expiration + "; path=/";
  }

}