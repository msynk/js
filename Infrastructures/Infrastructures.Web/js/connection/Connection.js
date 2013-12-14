Connection = function (config) {
  init();

  this.init = function () {
    this.request = new Request(config);
    this.response = new Response(config);
    this.xhr = new ConnectionFactory().create();

    Utils.override(this, config);
  };

  this.open = function () {
    if (!xhr) throw 'failed to create the XMLHttpRequest object.';
    if (!request.isValid()) throw 'the request is not valid.';

    openAndSet();
  };
  this.openAndSet = function () {
    if (async) {
      xhr.onreadystatechange = stateChanged;
    }
    request.open(xhr);
  };
  this.stateChanged = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

    }
  };

  function send(url) {
    var factory = new ConnectionFactory();
    var xhr = factory.create();
    if (!xhr) return;

    var method = (postData) ? "POST" : "GET";
    xhr.open(method, url, true);
    xhr.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
    if (postData)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200 && xhr.status != 304) {
        //			alert('HTTP error ' + req.status);
        return;
      }
      callback(xhr);
    };

    if (xhr.readyState == 4) return;
    xhr.send(postData);
  }
}