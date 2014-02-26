var dp = {};
dp.createDiv = function () {
  var div = document.createElement('div');
  div.className = 'datepicker';
  div.style.display = 'none';
  if (dp.culture.rtl) {
    div.style.direction = 'rtl';
  }
  var weekDaysNo = dp.culture.weekDays.length;
  var months = dp.culture.months;
  var today = dp.culture.today;
  var year = today[0];
  var month = today[1] - 1;
  var day = today[2];
  var dayOfWeek = today[3];
  var monthDays = dp.culture.monthDays[month];

  var table = '<table>';

  table += '<tr>';
  table += '<td>&lt;</td><td colspan="' + (weekDaysNo - 2) + '">' + months[month] + ' ' + year + '</td><td>&gt;</td>';
  table += '</tr>';

  table += '<tr>';
  for (var i = 0; i < weekDaysNo; i++) {
    table += '<td>' + dp.culture.weekDays[i] + '</td>';
  }
  table += '</tr>';

  var firstDay = dayOfWeek - (day % weekDaysNo - 1);
  if (firstDay < 0) {
    firstDay = weekDaysNo + firstDay;
  }
  
  var index = 1;
  table += '<tr>';
  for (i = 0; i < weekDaysNo; i++) {
    table += '<td>' + ((i < firstDay) ? '' : index++) + '</td>';
  }
  table += '</tr>';
  while (index <= monthDays) {
    table += '<tr>';
    for (i = 0; i < weekDaysNo; i++) {
      table += '<td>' + ((index > monthDays) ? '' : index++) + '</td>';
    }
    table += '</tr>';
  }

  table += '</table>';
  div.innerHTML = table;

  document.body.appendChild(div);
  dp.div = div;
  return div;
};
dp.render = function (id) {
  if (!dp.div) dp.createDiv();
  var t = document.getElementById(id),
    d = dp.div;
  d.style.top = t.offsetTop + t.offsetHeight + 'px';
  d.style.left = t.offsetLeft + 'px';
  t.onclick = function () {
    d.style.display = 'block';
  };
  t.onblur = function () {
    d.style.display = 'none';
  };
};