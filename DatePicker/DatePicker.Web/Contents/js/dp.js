var dp = {};

dp.render = function (id) {
  dp.init();
  dp.createMainPanel();
  dp.t = document.getElementById(id);
  var d = dp.div, t = dp.t;
  d.style.top = t.offsetTop + t.offsetHeight + 'px';
  d.style.left = t.offsetLeft + 'px';
  t.onclick = function () {
    d.style.display = 'block';
  };
  t.onblur = function () {
    //d.style.display = 'none';
  };
  document.onmousedown = function (e) {
    e = e || window.event;
    var target = e.target;
    if (target == t) return;
    if (target == d) return;
    var tt = target;
    while (tt.parentNode) {
      if (tt == d) return;
      tt = tt.parentNode;
    }
    d.style.display = 'none';
  };
};

dp.init = function () {
  dp.panels = {
    days: {},
    months: {},
    years: {},
    decades: {}
  };
  dp.calendar = dp.u.override(dp.defaults.calendar, dp.calendar);

  // options:
  dp.o = {
    weekDays: dp.calendar.weekDays,
    weekLength: dp.calendar.weekDays.length,
    months: dp.calendar.months,
    monthNo: dp.calendar.months.length,
    daysInMonth: dp.calendar.daysInMonth,
    today: dp.calendar.today
  };

  // current date:
  dp.c = {
    year: dp.o.today[0],
    month: dp.o.today[1],
    day: dp.o.today[2],
  };
};

dp.findFirstWeekDayOfMonth = function (year, month) {
  var diff = 0;
  var firstDay = diff % dp.o.weekLength;
  if (firstDay < 0) firstDay += dp.o.weekLength;
  if (firstDay > 6) firstDay -= dp.o.weekLength;
  return firstDay;

  //var firstDay = dp.o.today[3] - (dp.c.day % dp.o.weekLength - 1);
  //if (firstDay < 0) {
  //  firstDay = dp.o.weekLength + firstDay;
  //}
  //return firstDay;
};

dp.setDate = function (day) {
  dp.t.value = dp.c.year + '/' + dp.c.month + '/' + day;
};

dp.prevMonth = function () {

};
dp.nextMonth = function () {

};

dp.defaults = {
  calendar: {
    name: 'Persian Calendar',
    rtl: true,
    weekDays: ['شن', 'یک', 'دو', 'سه', 'چه', 'پن', 'جم'],
    months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    monthDays: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    isLeapYear: function (year) {
      // came from .Net Framework System.Globalization.PersianCalendar class:
      var leapYears33 = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
      return (leapYears33[year % 33] === 1);
    },
    daysInMonth: function (year, month) {
      if (month === 12 && this.isLeapYear(year)) return 30;
      return monthDays[month];
    },
    change: function (current, change) {

    },

    today: [1392, 12, 7, 4],
  }
};