XhrRequest = function (config) {
  if (!(this instanceof XhrRequest)) {
    throw 'its a constructor not a function.';
  }

  this.setHeader = function (header, value) {
    this.headers[header] = value;
  };

  this.validate = function () {
    var exception = '';
    if (!this.xhrRequest$ValidateUrl()) exception += 'XhrRequest: invalid url.';
    if (!this.xhrRequest$ValidateMethod()) exception += 'XhrRequest: invalid method.';
    if (!this.xhrRequest$ValidateUser()) exception += 'XhrRequest: invalid user.';

    if (exception) throw exception;

    return true;
  };

  ////////////////////////////////////////////////////////
  (function request$Init(me) {
    me.url = '';
    me.method = XhrRequest.Methods.get;
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

  this.xhrRequest$ValidateUrl = function () {
    return !!this.url || typeof this.url === 'string';
  };
  this.xhrRequest$ValidateMethod = function () {
    if (!this.method) return false;
    var methods = XhrRequest.Methods;
    for (var m in methods) {
      if (methods.hasOwnProperty(m) && this.method === methods[m])
        return true;
    }
    return false;
  };
  this.xhrRequest$ValidateUser = function () {
    if (this.username)
      return !!this.password;
    return true;
  };
};
XhrRequest.Methods = {
  'get': 'GET',
  'post': 'POST',
  'put': 'PUT',
  'delete': 'DELETE'
};