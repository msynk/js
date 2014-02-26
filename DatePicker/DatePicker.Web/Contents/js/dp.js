var dp = {};
dp.createDiv = function () {
  var div = document.createElement('div');
  div.style.Position = 'absolute';
  return div;
};
dp.div = dp.createDiv();
dp.render = function (id) {
  var t = document.getElementById(id),
    d = dp.div;
  d.style.top = t.offsetTop + t.offsetHeight + 'px';
  d.style.left = t.offsetHeight + 'px';
}