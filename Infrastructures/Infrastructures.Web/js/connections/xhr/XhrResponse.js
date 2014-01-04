XhrResponse = function (xhr) {
  if (!(this instanceof XhrResponse)) {
    throw 'its a constructor not a function.';
  }
  if (!(xhr instanceof Xhr)) {
    throw 'invalid constructor parameter.';
  }

  this.isSuccess = function () {
    return !this.status || (this.status >= 200 && this.status < 300) || this.status == 304;
  };

  this.success = function (fn) {
    if (typeof fn !== "function") return;

    this.xhr.success = fn;
    this.$StateChanged('s');
  };
  this.failure = function (fn) {
    if (typeof fn !== "function") return;

    this.xhr.failure = fn;
    this.$StateChanged('f');
  };
  this.complete = function (fn) {
    if (typeof fn !== "function") return;

    this.xhr.done = fn;
    this.$StateChanged('d');
  };

  ////////////////////////////////////////////////////////
  (function $Init(me) {
    me.xhr = xhr;
    me.state = xhr.x.readyState;
    me.status = null;
    me.responseText = xhr.x.responseText || null;

    if (xhr.request.async) {
      xhr.x.onreadystatechange = me.$StateChanged;
    }
    me.$GetStatus();
  })(this);

  this.$GetStatus = function () {
    try {
      // IE sometimes returns 1223 for a 204 response.
      if (this.xhr.x.status === 1223) {
        this.status = 204;
      } else {
        this.status = this.xhr.x.status || 0;
      }
    } catch (e) {
      this.status = 0;
    }
  };

  this.$StateChanged = function (state) {
    if (this.xhr.x.readyState == 4) {
      this.$Done(state);
    }
  };

  this.$Done = function (state) {
    if (this.xhr.done && (typeof state !== "string" || state === 'd')) {
      this.xhr.done(this);
    }

    if (this.isSuccess() && this.xhr.success && (typeof state !== "string" || state === 's')) {
      this.xhr.success(this);
    } else if (this.xhr.failure && (typeof state !== "string" || state === 'f')) {
      this.xhr.failure(this);
    }
  };
}