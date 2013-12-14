Override = function (object, config) {
  if (!object || !config || typeof config !== 'object') return object;

  for (var property in object) {
    if (config.hasOwnProperty(property))
      object[property] = config[property];
  }
  return object;
};