Utils = {
  init: function () {
    Object.prototype.override = Utils.override;
    Object.prototype.apply = Utils.apply;
    Object.prototype.extend = Utils.extend;
  },
  apply: Apply,
  override: Override,
  extend: Extend,
};