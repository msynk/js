dp.createMainTable = function () {
  var table = '';
  table += '<table>';
  table += dp.createMainTableHeader();
  table += dp.createWeekDaysRow();
  table += dp.createDayRows(dp.createDayRowsIndices());
  table += '</table>';
  return table;
}

dp.createMainTableHeader = function () {
  var tr = '<tr>';
  tr += '<td>&lt;</td>';
  tr += '<td colspan="' + (dp.o.weekLength - 2) + '">' + dp.o.months[dp.c.month] + ' ' + dp.c.year + '</td>';
  tr += '<td>&gt;</td>';
  tr += '</tr>';
  return tr;
};
dp.createWeekDaysRow = function () {
  var tr = '<tr>';
  for (var i = 0; i < dp.o.weekLength; i++) {
    tr += '<td>' + dp.o.weekDays[i] + '</td>';
  }
  tr += '</tr>';
  return tr;
};
dp.createDayRowsIndices = function () {
  var rows = [];

  rows[0] = [];
  var firstDay = dp.c.findFirstDay();
  var index = 1;
  for (var i = 0; i < dp.o.weekLength; i++) {
    rows[0][i] = ((i < firstDay) ? '' : index++);
  }
  var r = 1;
  while (index <= dp.c.days) {
    rows[r] = [];
    for (i = 0; i < dp.o.weekLength; i++) {
      rows[r][i] = (index > dp.c.days) ? '' : index++;
    }
    r++;
  }
  return rows;
};
dp.createDayRows = function (rows) {
  var trs = '';
  for (var i = 0; i < rows.length; i++) {
    trs += '<tr>';
    var row = rows[i];
    for (var j = 0; j < row.length; j++) {
      var day = row[j];
      trs += '<td onclick="dp.setDate(' + day + ')">';
      trs += day;
      trs += '</td>';
    }
    trs += '</tr>';
  }
  return trs;
};