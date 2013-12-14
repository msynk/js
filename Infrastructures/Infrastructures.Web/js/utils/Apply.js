Apply = function (object, config, defaults) {
  if (defaults) $.apply(object, defaults);
  if (!object || !config || typeof config !== 'object') return object;

  for (var property in config) {
    if (config.hasOwnProperty(property))
      object[property] = config[property];
  }
  return object;
};