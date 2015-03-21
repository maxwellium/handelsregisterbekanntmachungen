var handelsregisterbekanntmachungen = require( '../index' );

handelsregisterbekanntmachungen
  .get( 20 )

  .then(function( bekanntmachungen ) {
    console.log( 'found', bekanntmachungen.length );
  }, function( error ) {
    console.log('encountered error', error);
  },function( bekanntmachung ) {
    console.log( bekanntmachung );
  });
