# String Ranger
An easy to use, case-insensitive string to date range converter.

## Why
String ranger was made as a result of a need to parse incoming user strings to system date ranges.

## How

#### Install
```
$ npm install string-ranger
```

#### Use
```javascript
var stringRange = require('string-ranger');

var todayInARange = stringRange('today');
// { start: { Date for start of today }, end: { Date for end of today } }
var thisMonth = stringRange('this Month');
var last3Days = stringRange('last 3 days');
var lastYear = stringRange('Last year');
```

## Supported Range Types
- Singular
  - "today"
- Unit
  - "second"
  - "day"
  - "week"
  - "month"
  - "year"

## String format
You can use the singular ("today") range type, or you can use the format below.
```
[verb last|this] [units (optional, ex. 30)] [unit (ex. day)]

Examples

Last                                        Year
Last             6                          Days
This                                        Month
```
