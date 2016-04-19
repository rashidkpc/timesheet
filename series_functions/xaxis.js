var alter = require('../lib/alter.js');
var _ = require('lodash');
var Chainable = require('../lib/classes/chainable');

module.exports = new Chainable('xaxis', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'ticks',
      types: ['number', 'null'],
      help: 'Specify the number of y-axis ticks'
    },
    {
      name: 'format',
      types: ['string', 'null'],
      help: 'Timestamp format. Use: %a: weekday name, \
%b: month name, \
%d: day of month, zero-padded (01-31), \
%e: day of month, space-padded ( 1-31), \
%H: hours, 24-hour time, zero-padded (00-23), \
%I: hours, 12-hour time, zero-padded (01-12), \
%m: month, zero-padded (01-12), \
%M: minutes, zero-padded (00-59), \
%q: quarter (1-4), \
%S: seconds, zero-padded (00-59), \
%y: year (two digits), \
%Y: year (four digits), \
%p: am/pm, \
%P: AM/PM (uppercase version of %p), \
%w: weekday as number (0-6, 0 being Sunday)'
    },
  ],
  help: 'Configures a variety of x-axis options, for instance the timestmap format. If called on more than 1 seriesList the last call will be used.',
  fn: function yaxisFn(args) {
    return alter(args, function (eachSeries, ticks, timeformat) {
      eachSeries._global = eachSeries._global || {};
      var myAxis = eachSeries._global.xaxis = eachSeries._global.xaxis || {};
      myAxis.ticks = ticks;
      myAxis.timeformat = timeformat;

      return eachSeries;
    });
  }
});
