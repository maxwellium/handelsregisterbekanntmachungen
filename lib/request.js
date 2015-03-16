var
  Q       = require('q'),
  Request = require('request'),

  url      = {
    root    : 'http://www.handelsregisterbekanntmachungen.de',
    search  : '/?aktion=suche',
    content : '/skripte/hrb.php'
  },
  form = {
    suchart    : 'uneingeschr',
    button     : 'Suche starten',
    all        : false,
    gegenstand : 0,
    anzv       : 10,
    // anzv       : 'alle',
    order      : 4
  };

var extend = function() {
  var
    result = {},
    args = Array.prototype.slice.call(arguments, 0);

  args.forEach(function(argument) {
    if ( 'object' === typeof argument ) {
      Object.keys(argument).forEach(function(key) {
        result[key] = argument[key];
      });
    }
  });

  return result;
};

var request = function(params) {
  var deferred = Q.defer();

  Request(params, function (error, response) {

    if ( !error && response.statusCode == 200 ) {
      deferred.resolve(response);
    } else {
      deferred.reject(error, response);
    }
  });

  return deferred.promise;
};

var content = function(registryId, state) {
  var params = {
    method : 'GET',
    url    : url.root + url.content
  };

  if ( 'object' === typeof registryId ) {
    params.qs = registryId;
  } else {
    params.qs = {
      rb_id    : registryId,
      land_abk : state
    };
  }

  return request(params);
};


/**
 * @param  {[type]} options [description]
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
var search = function(options) {
  var params = {
    method   : 'POST',
    url      : url.root + url.search,
    form     : extend( form, options )
  };

  return request(params);
};


module.exports.search  = search;
module.exports.content = content;
module.exports.request = request;
