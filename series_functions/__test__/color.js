const filename = require('path').basename(__filename);
const fn = require(`../${filename}`);

const _ = require('lodash');
const expect = require('chai').expect;
const invoke = require('./helpers/invoke_series_fn.js');

describe(filename, () => {

  let seriesList;
  beforeEach(() => {
    seriesList = require('./fixtures/seriesList.js')();
  });

  it('sets the color, on all series', () => {
    return invoke(fn, [seriesList, '#eee']).then((r) => {
      const colors = _.map(r.output.list, 'color');
      _.each(colors, (color) => expect(color).to.equal('#eee'));
    });
  });

  it('generates a gradient', () => {
    const expected = ['#000000', '#111111', '#222222'];
    return invoke(fn, [seriesList, '#000:#222']).then((r) => {
      const colors = _.map(r.output.list, 'color');
      _.each(colors, (color, i) => expect(color).to.equal(expected[i]));
    });
  });

  it('throws if you pass more colors than series', () => {
    const expected = ['#000000', '#111111', '#222222'];
    invoke(fn, [seriesList, '#000:#111:#222:#333']).catch((e) => {
      expect(e).to.be.an(Error);
    });
  });

  it('throws if you do not pass a color', () => {
    const expected = ['#000000', '#111111', '#222222'];
    invoke(fn, [seriesList, '']).catch((e) => {
      expect(e).to.be.an(Error);
    });
  });

});