var alter = require('../lib/alter.js');
var _ = require('lodash');
var Chainable = require('../lib/classes/chainable');

var tickFormatters = {'bits':'bits','bits/s':'bits/s','bytes':'bytes','bytes/s':'bytes/s','currency':'currency(:prefix)','custom':'custom(:prefix:suffix)'}

module.exports = new Chainable('yaxis', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'yaxis',
      types: ['number', 'null'],
      help: 'The numbered y-axis to plot this series on, eg .yaxis(2) for a 2nd y-axis.'
    },
    {
      name: 'min',
      types: ['number', 'null'],
      help: 'Min value'
    },
    {
      name: 'max',
      types: ['number', 'null'],
      help: 'Max value'
    },
    {
      name: 'position',
      types: ['string', 'null'],
      help: 'left or right'
    },
    {
      name: 'units',
      types: ['string', 'null'],
      help: 'The function to use for formatting y-axis labels. One of: ' + _.values(tickFormatters).join(', ')
    },
  ],
  help: 'Configures a variety of y-axis options, the most important likely being the ability to add an Nth (eg 2nd) y-axis',
  fn: function yaxisFn(args) {
    return alter(args, function (eachSeries, yaxis, min, max, position, units) {
      yaxis = yaxis || 1;
      eachSeries.yaxis = yaxis;
      eachSeries._global = eachSeries._global || {};

      var yaxes = eachSeries._global.yaxes = eachSeries._global.yaxes || [];
      _.times(yaxis-1,function(idx){
        yaxes[idx] = {};
      });
      var myAxis = yaxes[yaxis - 1] = yaxes[yaxis - 1] || {};
      myAxis.position = position;
      myAxis.min = min == null ? 0 : min;
      myAxis.max = max;

      if (units !== null && units !== undefined) {
        var unitTokens = units.split(':');
        if (tickFormatters[unitTokens[0]] === undefined) {
          throw new Error ('`'+units+'` is not a supported unit type.');
        }
        myAxis._units = unitTokens;
      }

      return eachSeries;
    });
  }
});
