var alter = require('../lib/alter.js');
var util = require('util');

var Chainable = require('../lib/classes/chainable');
module.exports = new Chainable('label', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'label',
      types: ['string'],
      help: 'Legend value for series. You can use $1, $2, etc, in the string to match up with the regex capture groups'
    },
    {
      name: 'regex',
      types: ['string', 'null'],
      help: 'A regex with capture group support'
    },
    {
      name: 'valueFormat',
      types: ['string','null'],
      help: 'Format for displaying values in the label. Use %x and %y for raw x and y values, or %X and %Y for formatted x and y values. default = \'(%Y)\''
    },
  ],
  help: 'Change the label of the series. Use %s reference the existing label',
  fn:  function labelFn(args) {
    var config = args.byName;
    return alter(args, function (eachSeries,label,regex,valueFormat) {
      if (config.regex) {
        eachSeries.label = eachSeries.label.replace(new RegExp(config.regex), config.label);
      } else {
        eachSeries.label = config.label;
      }

      eachSeries.valueFormat = valueFormat || '(%Y)';

      return eachSeries;
    });
  }
});
