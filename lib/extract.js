var
  ent     = require('ent'),
  regex   = {
    search  : /<LI><a href="javascript:NeuFenster\('rb_id=(\d+)&land_abk=(\w{2})'\)" >(\d{2})\.(\d{2})\.(\d{4})<ul>(.*?), (\w+? \d+?) <br>(.*?)<\/ul/g,
    content : {
      title : /<U>(.+?) Aktenzeichen: (.+?)<\/U>/,
      date  : /Bekannt gemacht am: (\d{2})\.(\d{2})\.(\d{4}) (\d{2})\:(\d{2})/,
      lines : /<tr><td colspan=2 ><br>(.+?)<\/td>/g
    }
  };

var search = function(html) {
  var
    results = [],
    row;

  regex.search.lastIndex = 0;

  while( row = regex.search.exec( html ) ) {
    results.push({
      id       : row[1],
      state    : row[2],
      date     : new Date( row[5], row[4], row[3] ),
      title    : ent.decode( row[6] ),
      register : ent.decode( row[7] ),
      caption  : ent.decode( row[8] )
    });
  }

  return results;
};

var content = function(html) {
  var
    result = {},
    match;

  regex.content.title.lastIndex = 0;
  regex.content.date.lastIndex  = 0;
  regex.content.lines.lastIndex = 0;

  if ( match = regex.content.title.exec( html ) ) {
    result.title = ent.decode( match[1] );
  }

  if ( match = regex.content.date.exec( html ) ) {
    result.date = new Date( match[1], match[2], match[3], match[4], match[5] );
  }


  regex.content.lines.exec( html );

  if ( match = regex.content.lines.exec( html ) ) {
    result.type = ent.decode( match[1] );
  }

  regex.content.lines.exec( html );

  if ( match = regex.content.lines.exec( html ) ) {
    result.text = ent.decode( match[1] );
  }

  return result;
};


module.exports.search  = search;
module.exports.content = content;
