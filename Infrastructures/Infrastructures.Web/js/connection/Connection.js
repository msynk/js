Connection = function (config) {
  init();

  this.open = function () {
    if (!xhr) throw 'failed to create the XMLHttpRequest object.';
    if (!request.isValid()) throw 'the request is not valid.';

    openAndSet();
  };

  this.send = function (data) {
    data = data || request.params || null;
    xhr.send(data);
    if (request.async) {
      this.response = new Response(xhr);
    }
  };

  this.init = function () {
    this.request = new Request(config);
    this.response = null;
    this.xhr = new createXhr();
    this.success = null;
    this.failure = null;
    this.complete = null;

    Utils.override(this, config);
  };

  function createXhr() {
    var xmlhttp = false, xhrs = [
      function () { return new XMLHttpRequest(); },
      function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
      function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
      function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
    ];
    for (var i = 0; i < xhrs.length; i++) {
      try {
        xmlhttp = xhrs[i]();
      }
      catch (e) {
        continue;
      }
      break;
    }
    return xmlhttp;
  }
  this.openAndSet = function () {
    if (async) {
      xhr.onreadystatechange = stateChanged;
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
  this.stateChanged = function () {
    if (xhr.readyState == 4) {
      done();
    }
  };
  this.done = function() {
    this.response = new Response(xhr);
    complete(response);
    if (response.isSuccess()) {
      success(response);
    } else {
      failure(response);
    }
  };
}