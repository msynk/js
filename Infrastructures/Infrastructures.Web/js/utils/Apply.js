$.apply = function (object, config, defaults) {
  if (defaults) {
    $.apply(object, defaults);
  }

  if (object && config && typeof config === 'object') {
    var i, j, k;

    for (i in config) {
      object[i] = config[i];
    }
    var enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
    for (j = enumerables.length; j--;) {
      k = enumerables[j];
      if (config.hasOwnProperty(k)) {
        object[k] = config[k];
      }
    }
  }

  return object;
};