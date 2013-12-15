Response = function (xhr) {
  init();


  this.init = function () {
    this.state = xhr.readyState;
    this.status = null;
    this.responseText = xhr.responseText || null;

    getStatus();
  };

  this.isSuccess = function () {
    return !status || (status >= 200 && status < 300) || status == 304;
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
}