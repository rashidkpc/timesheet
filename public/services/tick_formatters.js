define(function (require) {

  return function ticketFormatters() {
    var formatters =  {
      'bits': function (val, axis) {
        var labels = ['b','kb','mb','gb','tb','pb'];
        var index = 0;
        while (val > 1000 && index < labels.length) {
          val /= 1000;
          index++;
        }
        return (Math.round(val * 100) / 100) + labels[index];
      },
      'bits/s': function (val, axis) {
        var labels = ['b/s','kb/s','mb/s','gb/s','tb/s','pb/s'];
        var index = 0;
        while (val > 1000 && index < labels.length) {
          val /= 1000;
          index++;
        }
        return (Math.round(val * 100) / 100) + labels[index];
      },
      'bytes': function (val, axis) {
        var labels = ['B','KB','MB','GB','TB','PB'];
        var index = 0;
        while (val > 1024 && index < labels.length) {
          val /= 1024;
          index++;
        }
        return (Math.round(val * 100) / 100) + labels[index];
      },
      'bytes/s': function (val, axis) {
        var labels = ['B/s','KB/s','MB/s','GB/s','TB/s','PB/s'];
        var index = 0;
        while (val > 1024 && index < labels.length) {
          val /= 1024;
          index++;
        }
        return (Math.round(val * 100) / 100) + labels[index];
      },
      'currency': function (val, axis) {
        var c = 2;
        var d = '.';
        var t = ',';
        var s = val < 0 ? '-' : '';
        var i = parseInt(val = Math.abs(+val || 0).toFixed(c)) + '';
        var j = (j = i.length) > 3 ? j % 3 : 0;
        var p = axis.options._units[1] || '$';
        return p + ' ' + s + (j ? i.substr(0, j) + t : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
        (c ? d + Math.abs(val - i).toFixed(c).slice(2) : '');
      }
    };

    return formatters;
  };
});
