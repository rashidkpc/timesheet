var reduce = require('../lib/reduce.js');

var Chainable = require('../lib/classes/chainable');
module.exports = new Chainable('showifgreater', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'comparator',
      types: ['seriesList', 'number'],
	  help: 'Number or series to compare to. If passing a seriesList it must contain exactly 1 series.'
    } 
  ],
  help: 'Shows each point in inputSeries if it is larger than the equivalent point in the compared series',
  fn: function showifgreaterFn(args) {
    return reduce(args, function (a, b) {
      return a > b ? a : null;
    });
  }
});   