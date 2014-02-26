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
    tt = target;
    while (tt.parentNode) {
      if (tt == d) return;
      tt = tt.parentNode;
    }
    d.style.display = 'none';
  }
};

dp.init = function () {
  dp.culture = dp.u.override(dp.defaults.culture, dp.culture);
  dp.o = {
    weekDays: dp.culture.weekDays,
    weekLength: dp.culture.weekDays.length,
    months: dp.culture.months,
    monthNo: dp.culture.months.length,
    monthDays: dp.culture.monthDays,
    today: dp.culture.today
  };
  var today = dp.o.today;
  var m = today[1] - 1;
  dp.c = {
    year: today[0],
    month: m,
    day: today[2],
    days: dp.o.monthDays[m],
    findFirstDay: function () {
      var firstDay = dp.o.today[3] - (dp.c.day % dp.o.weekLength - 1);
      if (firstDay < 0) {
        firstDay = dp.o.weekLength + firstDay;
      }
      return firstDay;
    }
  };
};

dp.setDate = function (day) {
  dp.t.value = dp.c.year + '/' + dp.c.month + '/' + day;
}

dp.defaults = {
  culture : {
    rtl: true,
    weekDays: ['شن', 'یک', 'دو', 'سه', 'چه', 'پن', 'جم'],
    months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    monthDays: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    today: [1392, 12, 7, 4]
  }
};