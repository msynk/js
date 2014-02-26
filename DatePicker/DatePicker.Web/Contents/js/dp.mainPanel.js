dp.createMainPanel = function () {
  var div = document.createElement('div');
  div.id = 'dp';
  div.className = 'datepicker';
  div.style.display = 'none';
  if (dp.culture.rtl) {
    div.style.direction = 'rtl';
  }

  div.innerHTML = dp.createMainTable();

  document.body.appendChild(div);
  dp.div = div;
  return div;

};