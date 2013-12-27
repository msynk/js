Http = {
  _xhr: null,
  _getXhr: function () {
    if (!this._xhr) {
      this._xhr = new Xhr();
    }
    return this._xhr;
  },

  get: function (url, options) {
    if (!url) throw 'Http.get: url is needed';

    options = options || {};
    options.url = url;
    options.async = false;

    var x = this._getXhr();
    return x.send(options);
  },
  post: function (url, params, options) {
    if (!url) throw 'Http.post: url is needed';
    if (!params) throw 'Http.post: params is needed';

    options = options || {};
    options.method = XhrRequest.Methods.post;
    options.url = url;
    options.params = params;
    options.async = false;

    var x = this._getXhr();
    return x.send(options);
  },
};