var jdp = function (target, options) {
  if (this instanceof jdp) {
    throw 'its a function not a constructor.';
  }
  return new jdp.DatePicker(target, options);
};

jdp.DatePicker = function (t, opt) {
  var me = this;
  if (!(me instanceof jdp.DatePicker)) {
    throw 'its a constructor not a function.';
  }
  me.target = t;
  if (typeof t === 'string') {
    me.target = document.getElementById(t);
  }
  if (!me.target) {
    throw 'invalid target';
  }
  me.options = opt || {};

  me.setDates = function () {
    if (!me.target.value) {
      me.selectedDate = me.calendar.today.clone();
    }
    me.viewDate = me.selectedDate.clone();
  };

  me.setEvents = function () {

    me.target.onclick = function () {
      me.show();
    };

    document.onmousedown = function (e) {
      e = e || window.event;
      var target = e.target;
      var isValidTarget = function (tar) {
        return tar == me.panels.days || tar == me.panels.months || tar == me.panels.years || tar == me.panels.decades;
      };
      if (target == me.target || isValidTarget(target)) return;

      while (target.parentNode) {
        if (isValidTarget(target.parentNode)) return;
        target = target.parentNode;
      }
      me.hide();
    };
  };

  me.show = function () {
    me.setDates();
    me.renderDaysPanel();
    me.hide();
    me.panels.days.style.display = 'block';
  };
  me.hide = function () {
    if (me.panels.days) me.panels.days.style.display = 'none';
    if (me.panels.months) me.panels.months.style.display = 'none';
    if (me.panels.years) me.panels.years.style.display = 'none';
    if (me.panels.decades) me.panels.decades.style.display = 'none';
  };


  (function $Init() {
    me.panels = {};

    me.calendar = jdp.u.extend({}, jdp.calendars['default']);
    var oCal = me.options.calendar;
    if (oCal && jdp.calendars[oCal]) {
      me.calendar = jdp.u.extend(me.calendar, jdp.calendars[oCal]);
    }
    me.calendar.weekLength = me.calendar.weekDays.length;
    me.calendar.monthNo = me.calendar.months.length;
    me.calendar.today = new jdp.Date(me.calendar.today[0], me.calendar.today[1], me.calendar.today[2], me.calendar.today[3], me.calendar);

    me.top = me.target.offsetTop + me.target.offsetHeight + 'px';
    me.left = me.target.offsetLeft + 'px';

    me.setEvents();
    //me.hide();

  })();
};

jdp.DatePicker.prototype.selectDate = function (day) {
  var date = this.viewDate.get(day);
  this.selectedDate = date;
  this.target.value = this.selectedDate.toString();
};
jdp.DatePicker.prototype.selectMonth = function (month) {
  this.viewDate.setMonth(month);
  this.panels.months.style.display = 'none';
  this.renderDaysPanel();
};
jdp.DatePicker.prototype.selectYear = function (year) {
  this.viewDate.setYear(year);
  this.panels.years.style.display = 'none';
  this.renderMonthsPanel();
};
jdp.DatePicker.prototype.selectDecade = function (decade) {
  this.viewDate.setYear(decade);
  this.panels.decades.style.display = 'none';
  this.renderYearsPanel();
};

jdp.DatePicker.prototype.renderDaysPanel = function () {
  if (this.panels.days) {
    document.body.removeChild(this.panels.days);
  }
  this.panels.days = jdp.createDaysPanel(this);
  this.panels.days.style.top = this.top;
  this.panels.days.style.left = this.left;
  document.body.appendChild(this.panels.days);
};
jdp.DatePicker.prototype.prevMonth = function () {
  this.viewDate.addMonth(-1);
  this.renderDaysPanel();
};
jdp.DatePicker.prototype.nextMonth = function () {
  this.viewDate.addMonth(1);
  this.renderDaysPanel();
};
jdp.DatePicker.prototype.showMonths = function () {
  this.hide();
  this.renderMonthsPanel();
  this.panels.months.style.display = 'block';
};

jdp.DatePicker.prototype.renderMonthsPanel = function () {
  if (this.panels.months) {
    document.body.removeChild(this.panels.months);
  }
  this.panels.months = jdp.createMonthsPanel(this);
  this.panels.months.style.top = this.top;
  this.panels.months.style.left = this.left;
  document.body.appendChild(this.panels.months);
};
jdp.DatePicker.prototype.prevYear = function () {
  this.viewDate.addYear(-1);
  this.renderMonthsPanel();
};
jdp.DatePicker.prototype.nextYear = function () {
  this.viewDate.addYear(1);
  this.renderMonthsPanel();
};
jdp.DatePicker.prototype.showYears = function () {
  this.hide();
  this.renderYearsPanel();
  this.panels.years.style.display = 'block';
};

jdp.DatePicker.prototype.renderYearsPanel = function () {
  if (this.panels.years) {
    document.body.removeChild(this.panels.years);
  }
  this.panels.years = jdp.createYearsPanel(this);
  this.panels.years.style.top = this.top;
  this.panels.years.style.left = this.left;
  document.body.appendChild(this.panels.years);
};
jdp.DatePicker.prototype.prevDecade = function () {
  this.viewDate.addYear(-10);
  this.renderYearsPanel();
};
jdp.DatePicker.prototype.nextDecade = function () {
  this.viewDate.addYear(10);
  this.renderYearsPanel();
};
jdp.DatePicker.prototype.showDecades = function () {
  this.hide();
  this.renderDecadesPanel();
  this.panels.decades.style.display = 'block';
};

jdp.DatePicker.prototype.renderDecadesPanel = function () {
  if (this.panels.decades) {
    document.body.removeChild(this.panels.decades);
  }
  this.panels.decades = jdp.createDecadesPanel(this);
  this.panels.decades.style.top = this.top;
  this.panels.decades.style.left = this.left;
  document.body.appendChild(this.panels.decades);
};
jdp.DatePicker.prototype.prevCentury = function () {
  this.viewDate.addYear(-100);
  this.renderDecadesPanel();
};
jdp.DatePicker.prototype.nextCentury = function () {
  this.viewDate.addYear(100);
  this.renderDecadesPanel();
};
jdp.DatePicker.prototype.showCenturies = function () {
  //this.hide();
  //this.renderDecadesPanel();
  //this.panels.decades.style.display = 'block';
};