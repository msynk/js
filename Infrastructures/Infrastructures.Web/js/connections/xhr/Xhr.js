Xhr = function (config) {
  if (!(this instanceof Xhr)) {
    throw 'its a constructor not a function.';
  }

  this.reset = function (options) {
    this.request = new XhrRequest(options);
    this.response = null;

    this.success = function (response) { Utils.log('Xhr(' + response.xhr.request.url + '): Success.'); };
    this.failure = function (response) { Utils.error('Xhr(' + response.xhr.request.url + '): Failue.'); };
    this.done = Utils.EmptyFn;

    this.override(options);
  },

  this.open = function () {
    var x = this.x,
      r = this.request;

    if (!x) throw 'Xhr: no xhr.';
    if (!r) throw 'Xhr: no request.';
    r.validate();

    var headers = r.headers;
    for (var i in headers) {
      x.setRequestHeader(i, headers[i]);
    }
    if (r.username) {
      x.open(r.method, r.url, r.async, r.username, r.password);
    } else {
      x.open(r.method, r.url, r.async);
    }
    return this;
  };
  this.send = function (options) {
    if (options) this.reset(options);
    var x = this.x,
      r = this.request;
    this.response = new XhrResponse(this);
    this.open();
    x.send(r.params);
    return this.response;
  };

  ////////////////////////////////////////////////////////
  (function $Init(me) {
    me.x = $CreateXhr();
    if (!me.x) throw 'Xhr: failed to create the XMLHttpRequest object.';

    me.reset(config);
  })(this);

  function $CreateXhr() {
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


}