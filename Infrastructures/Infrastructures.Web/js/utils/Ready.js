// Completely copied from jquery 1.10.2
Ready = function (fn) {
  
  var completed = function (event) {

    // readyState === "complete" is good enough for us to call the dom ready in oldIE
    if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
      this.detach();
      fn();
    }
  };
  
  var detach = function () {
    if (document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", completed, false);
      window.removeEventListener("load", completed, false);

    } else {
      document.detachEvent("onreadystatechange", completed);
      window.detachEvent("onload", completed);
    }
  };
  
  if (document.readyState === "complete") {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    setTimeout(fn);

    // Standards-based browsers support DOMContentLoaded
  } else if (document.addEventListener) {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed, false);

    // A fallback to window.onload, that will always work
    window.addEventListener("load", completed, false);

    // If IE event model is used
  } else {
    // Ensure firing before onload, maybe late but safe also for iframes
    document.attachEvent("onreadystatechange", completed);

    // A fallback to window.onload, that will always work
    window.attachEvent("onload", completed);

    // If IE and not a frame
    // continually check to see if the document is ready
    var top = false;
    var done = false;
    try {
      top = window.frameElement == null && document.documentElement;
    } catch (e) { }

    if (top && top.doScroll) {
      (function doScrollCheck() {
        if (!done) {
          try {
            top.doScroll("left");
          } catch (e) {
            return setTimeout(doScrollCheck, 50);
          }
          detach();
          if (!done) {
            fn();
            done = true;
          }
        }
      })();
    }
  }
};