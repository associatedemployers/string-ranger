var chai     = require('chai'),
    expect   = chai.expect,
    moment   = require('moment');

var testModule = require('../index.js');

describe('Unit :: Utilities :: Date Range From String', function () {
  it('returns undefined for unsupported range string', () => {
    expect(testModule()).to.be.undefined;
    expect(testModule('someString')).to.be.undefined;
  });

  var expectRangeObject = ( object ) => {
    expect(object).to.be.an('object');
    expect(object).to.have.all.keys('start', 'end');
    expect(object.start).to.be.a('date');
    expect(object.end).to.be.a('date');
  };

  var expectDate = compareDate => {
    return {
      closeTo: ( assertDate, closeness ) => {
        var _closeness = closeness || 60;
        expect(moment(compareDate).unix()).to.be.closeTo(moment(assertDate).unix(), _closeness);
      }
    };
  };

  describe('string conversion', () => {
    it('today', () => {
      var result = testModule('today');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().startOf('day'));
      expectDate(result.end).closeTo(moment().endOf('day'));
    });

    it('last hour', () => {
      var result = testModule('last hour');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().startOf('hour'), 1);
      expectDate(result.end).closeTo(moment().endOf('hour'), 1);
    });

    it('last 30 days', () => {
      var result = testModule('last 30 days');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().subtract(30, 'days').startOf('day'));
      expectDate(result.end).closeTo(moment().endOf('day'));
    });

    it('this month', () => {
      var result = testModule('this month');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().startOf('month'));
      expectDate(result.end).closeTo(moment().endOf('month'));
    });

    it('last month', () => {
      var result = testModule('last month');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().subtract(1, 'month').startOf('month'));
      expectDate(result.end).closeTo(moment().subtract(1, 'month').endOf('month'));
    });

    it('this year', () => {
      var result = testModule('this year');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().startOf('year'));
      expectDate(result.end).closeTo(moment().endOf('year'));
    });

    it('last year', () => {
      var result = testModule('last year');
      expectRangeObject(result);
      expectDate(result.start).closeTo(moment().subtract(1, 'year').startOf('year'));
      expectDate(result.end).closeTo(moment().subtract(1, 'year').endOf('year'));
    });
  });
});
