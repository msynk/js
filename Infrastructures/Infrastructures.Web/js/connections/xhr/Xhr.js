Xhr = function (config) {
  if (!(this instanceof Xhr)) {
    throw 'its a constructor not a function.';
  }

  this.reset = function (options) {
    this.request = new XhrRequest(options);
    this.response = null;

    this.success = Utils.log('Xhr(' + this.request.url + '): Success.');
    this.failure = Utils.error('Xhr(' + this.request.url + '): Failue.');
    this.complete = Utils.EmptyFn;

    this.override(options);
  },

  this.open = function () {
    var x = this.xhr,
      r = this.request;

    if (!x) throw 'Xhr: no xhr.';
    if (!r) throw 'Xhr: no request.';
    r.validate();

    if (r.async) {
      x.onreadystatechange = this.xhr$StateChanged;
    }
    var headers = r.headers;
    for (var i in headers) {
      x.setRequestHeader(i, headers[i]);
    }
    if (r.username) {
      x.open(r.method, r.url, r.async, r.username, r.password);
    } else {
      x.open(r.method, r.url, r.async);
    }
  };
  this.send = function (options) {
    if (options) this.reset(options);
    var x = this.xhr,
      r = this.request;

    this.open();
    x.send(r.params);
    if (!r.async) {
      this.response = new XhrResponse(x);
      return this.response.responseText;
    }
  };

  ////////////////////////////////////////////////////////
  (function xhr$Init(me) {
    me.xhr = xhr$CreateXhr();
    if (!me.xhr) throw 'Xhr: failed to create the XMLHttpRequest object.';

    me.reset(config);
  })(this);

  function xhr$CreateXhr() {
    var xhr = null,
      xhrs = [
        function () { return new XMLHttpRequest(); },
        function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
        function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
        function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
      ];
    for (var i = 0; i < xhrs.length; i++) {
      try {
        xhr = xhrs[i]();
      } catch (e) {
        continue;
      }
      break;
    }
    return xhr;
  }

  this.xhr$StateChanged = function () {
    if (this.xhr.readyState == 4) {
      this.xhr$Done();
    }
  };

  this.xhr$Done = function () {
    this.response = new XhrResponse(xhr);

    if (this.complete) {
      this.complete(this.response);
    }

    if (this.response.isSuccess() && this.success) {
      this.success(this.response);
    } else if (this.failure) {
      this.failure(this.response);
    }
  };
}