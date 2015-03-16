var
  fs      = require( 'fs' ),
  extract = require( '../lib/extract' ),

  search  = fs.readFileSync( './search.html', {encoding : 'utf8'} ),
  content = fs.readFileSync( './content.html', {encoding : 'utf8'} );

console.log( extract.search(search) );
console.log( extract.content(content) );