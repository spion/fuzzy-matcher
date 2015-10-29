# fuzzy-matcher

Fuzzy match a string against a list of strings.

# install

    npm install fuzzy-matcher

# usage example

    var match = require('fuzzy-match');
    
    function matches(search, lines) {
      var matched = [];
      for (var k = 0; k < lines.length; ++k) {
        var score = match(search, line);
        matched.push({line: line, score: score});
      }
      return matched.sort(function(i1, i2) { 
        return i2.score - i1.score; 
      });
    }

# api

`match(search, line)`

Returns a score indiciating how well the line matches the search string. The score will be 0 if no match is found.

# license

ISC
