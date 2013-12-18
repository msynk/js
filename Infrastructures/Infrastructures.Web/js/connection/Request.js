Request = function (config) {
  if (!(this instanceof Request)) {
    throw 'its a constructor not a function.';
  }

  this.setHeader = function (header, value) {
    this.headers[header] = value;
  };

  this.isValid = function () {
    return this.validateUrl()
      && this.validateMethod()
      && this.validateUser();
  };
  this.validateUrl = function () {
    return !!this.url;
  };
  this.validateMethod = function () {
    if (!this.method) return false;
    var methods = Request.RequestMethods;
    for (var m in methods) {
      if (methods.hasOwnProperty(m) && this.method === methods[m])
        return true;
    }
    return false;
  };
  this.validateUser = function () {
    if (this.username)
      return !!this.password;
    return true;
  };

  (function request$Init(me) {
    me.url = '';
    me.method = Request.RequestMethods.get;
    me.async = true;
    me.username = '';
    me.password = '';
    me.params = '';
    me.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }; // todo: should be initialized with required headers

    if (typeof config === 'string') config = { url: config };
    me.override(config);
  })(this);
};
Request.RequestMethods = {
  'get': 'GET',
  'post': 'POST',
  'put': 'PUT',
  'delete': 'DELETE'
};