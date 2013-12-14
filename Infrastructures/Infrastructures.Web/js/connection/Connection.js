function Connection() {

  function sendRequest(url, callback, postData) {
    var xhr = new Factory().create();
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
    }
    if (xhr.readyState == 4) return;
    xhr.send(postData);
  }
}