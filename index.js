var
  q       = require('q'),
  request = require( './lib/request' ),
  extract = require( './lib/extract' );


/**
 * @param  {[type]} options
 *                  suchart:uneingeschr
 *                  button:Suche starten
 *                  land:
 *                  gericht:
 *                  gericht_name:
 *                  seite:
 *                  l:
 *                  r:
 *                  all:false
 *                  vt:
 *                  vm:
 *                  vj:
 *                  bt:
 *                  bm:
 *                  bj:
 *                  fname:
 *                  fsitz:
 *                  rubrik:
 *                  az:
 *                  gegenstand:0
 *                  anzv:10
 *                  order:1
 */
var get = function( options ) {

  var deferred = q.defer();

  if ( ('number' === typeof options) || ('string' === typeof options) ) {
    options = {
      anzv : options
    };
  }

  request
    .search( options )
    .then(function( response ){

      var
        results  = extract.search( response.body ),
        requests = [];

      results.forEach(function( result ){ requests.push(

        request
          .content( result.id, result.state )
          .then(function( response ) {
            result.content = extract.content( response.body );
            deferred.notify( result );
            return true;
          })

      ); });

      return q
        .all( requests )
        .then(function() {
          deferred.resolve( results );
        });
    })
    .catch(function( error ) {
      deferred.reject( error );
    });

  return deferred.promise;
};

module.exports.get = get;
