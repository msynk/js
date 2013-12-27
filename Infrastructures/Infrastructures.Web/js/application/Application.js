Application = function (name, config) {
  if (!(this instanceof Application)) {
    throw 'its a constructor not a function.';
  }

  (function application$Init(me) {
    me.name = name;
    me.utils = Utils;
    me.http = Http;

    application$Set(me);
  })(this);

  function application$Set(app) {
    Object.prototype.override = app.utils.override;
    Object.prototype.apply = app.utils.apply;
    Object.prototype.extend = app.utils.extend;
  }
};