var moment = require('moment'),
    _ = require('lodash');

var staticConversions = { today: 'this day' },
    supportedUnits = [ 'second', 'hour', 'day', 'week', 'month', 'year' ];

/**
 * Module Identity
 * Date Range From String
 * Converts a number of strings to a range object
 * 'today' => { start: {Date SOD}, end: {Date EOD} }
 *
 * @param  {String} rangeString String representing the range you want back
 * @return {Object}             Date range object
 */
module.exports = function ( rangeString ) {
  var _rs = rangeString ? rangeString.toLowerCase() : rangeString;

  if ( !_rs ) {
    return undefined;
  }
  // Split the string into an array by spaces
  var keys = _rs.split(' ');

  // If we have a static word, like "Today"
  if ( keys.length === 1 ) {
    // Get the static mapping
    _rs = staticConversions[_rs];

    if ( !_rs ) {
      return undefined;
    }
    // Re-split string
    keys = _rs.split(' ');
  }

  // Alias the array positions
  var verb = keys[0],
      unit = keys[1],
      units;

  // Starts handling "last 30 days"
  if ( keys[2] && _.isNumber(_.toNumber(unit)) ) {
    units = _.toNumber(unit);
    unit = keys[2];
  }

  // Depluralize
  unit = unit.replace(/s$/, '');

  // If we don't have a supported unit, return
  if ( supportedUnits.indexOf(unit) < 0 ) {
    return undefined;
  }

  // Initialize start/end
  var start = moment(),
      end = moment();

  // Check if the verb is "last" and if we are using a unit that would need
  // subtraction. "last hour", "last day" don't need to be subtracted.
  if ( verb === 'last' && supportedUnits.indexOf(unit) > 2 ) {
    start.subtract(1, unit);
    end.subtract(1, unit);
  }

  if ( units ) {
    start.subtract(units, unit);
  }

  start = start.startOf(unit).toDate();
  end = end.endOf(unit).toDate();

  return { start, end };
};
