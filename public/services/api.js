var chrome = require('ui/chrome');

module.exports = function ($http) {

  function apiMethod(method, name) {
    return function (opts) {
      return $http[method](chrome.addBasePath(`/api/timelion/${name}`), opts);
    };
  }

  return {
    run: apiMethod('post', 'run'),
    functions: apiMethod('get', 'functions'),
    validateWithEs: apiMethod('get', 'validate/es'),
  };
};
