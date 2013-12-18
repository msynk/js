Connection = function (config) {
  if (!(this instanceof Connection)) {
    throw 'its a constructor not a function.';
  }

  this.open = function () {
    var xhr = this.xhr,
      request = this.request;
    if (!xhr) throw 'failed to create the XMLHttpRequest object.';
    if (!request.isValid()) throw 'the request is not valid.';

    if (async) {
      xhr.onreadystatechange = this.stateChanged;
    }
    var headers = request.headers;
    for (var i in headers) {
      xhr.setRequestHeader(i, headers[i]);
    }
    if (request.username) {
      xhr.open(request.method, request.url, request.async, request.username, request.password);
    } else {
      xhr.open(request.method, request.url, request.async);
    }
  };
  this.send = function (data) {
    var xhr = this.xhr,
      request = this.request;
    data = data || request.params || null;
    xhr.send(data);
    if (request.async) {
      this.response = new Response(xhr);
    }
  };

  this.stateChanged = function () {
    if (this.xhr.readyState == 4) {
      this.done();
    }
  };
  this.done = function () {
    this.response = new Response(xhr);
    this.complete(this.response);
    if (this.response.isSuccess()) {
      this.success(this.response);
    } else {
      this.failure(this.response);
    }
  };

  (function connection$Init(me) {
    me.request = new Request(config);
    me.xhr = createXhr();
    me.response = null;
    me.success = null;
    me.failure = null;
    me.complete = null;

    me.override(config);
  })(this);

  function createXhr() {
    var xhr,
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
}