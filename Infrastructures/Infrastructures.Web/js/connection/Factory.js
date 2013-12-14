ConnectionFactory = function () {
  function create() {
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
}