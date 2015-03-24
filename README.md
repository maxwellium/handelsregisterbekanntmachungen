# Handelsregisterbekanntmachungen

Crawls entries in the German commercial register.
E.g. to access the last 20 entries try

```javascript
var handelsregisterbekanntmachungen = require( 'handelsregisterbekanntmachungen' );

handelsregisterbekanntmachungen
  .get( 20 )

  .then(function( entries ) {
  
    console.log( 'found', entries.length );
    
  }, function( error ) {
  
    console.log('encountered error', error);
    
  }, function( entry ) {
  
    console.log( entry );
    
  });
```
