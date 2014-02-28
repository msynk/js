jdp.createDecadesPanel = function (me) {
  var d = document.createElement('div');
  d.id = me.target.id + '_decadesPanel';
  d.className = 'jdp jdp-decadesPanel';
  if (me.calendar.rtl) {
    d.className += ' jdp-rtl';
  }
  d.innerHTML = jdp.createDecadesTable(me);
  return d;
};

jdp.createDecadesTable = function (me) {
  return '';
};