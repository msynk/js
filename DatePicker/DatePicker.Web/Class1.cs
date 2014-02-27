using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace DatePicker.Web
{
  public class Class1
  {
    public Class1()
    {
      var c = new PersianCalendar();
      var a = c.IsLeapYear(1);
    }
  }
}