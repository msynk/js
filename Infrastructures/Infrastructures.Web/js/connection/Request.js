﻿Request = function (config) {
  init();

  this.init = function () {
    this.url = '';
    this.method = RequestMethods.get;
    this.async = true;
    this.username = '';
    this.password = '';
    this.params = '';
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }; // todo: should initialized with required headers

    if (typeof config === 'string') config = { url: config };
    Utils.override(this, config);
  };
  this.setHeader = function (header, value) {
    headers[header] = value;
  };

  this.isValid = function () {
    return validateUrl() && validateMethod() && validateUser();
  };
  this.validateUrl = function () {
    return !!url;
  };
  this.validateMethod = function () {
    if (!method) return false;
    for (var m in RequestMethods) {
      if (RequestMethods.hasOwnProperty(m) && method === RequestMethods[m])
        return true;
    }
    return false;
  };
  this.validateUser = function () {
    if (this.username)
      return !!this.password;
    return true;
  };
}