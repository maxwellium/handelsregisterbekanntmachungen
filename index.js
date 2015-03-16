var
  q       = require('q'),
  request = require( './lib/request' ),
  extract = require( './lib/extract' );

request
  .search()
  .then(function( response ){
    return extract.search( response.body );
  }, function( error ) {
    console.log( error );
    return [];
  })
  .then(function(results) {
    var requests = [];

    results.forEach(function( result ){ requests.push(

      request
        .content(result.id, result.state)
        .then(function( response ) {
          console.log( result, extract.content( response.body ) );
          return true;
        })

    ); });

    return q.all(requests);
  })
  .then(function() {
    console.log('all done');
  }, function( error ) {
    console.log('ERROR', error);
  });