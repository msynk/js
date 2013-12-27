XhrResponse = function (xhr) {
  if (!(this instanceof XhrResponse)) {
    throw 'its a constructor not a function.';
  }
  
  this.isSuccess = function () {
    return !this.status || (this.status >= 200 && this.status < 300) || this.status == 304;
  };
  this.getStatus = function () {
    try {
      // IE sometimes returns 1223 for a 204 response.
      if (xhr.status === 1223) {
        this.status = 204;
      } else {
        this.status = xhr.status || 0;
      }
    } catch (e) {
      this.status = 0;
    }
  };
  
  (function response$Init(me) {
    me.xhr = xhr;
    me.state = xhr.readyState;
    me.status = null;
    me.responseText = xhr.responseText || null;

    me.getStatus();
  })(this);
}