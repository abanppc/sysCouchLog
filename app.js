var server = require("./lib/node-listen-udp-syslog");
var cluster = require( 'cluster' );
var config = require( './config' );
var nano = require('nano');

var db = nano(
    'http://'+config.couchdb.host+':' + config.couchdb.port + "/" + config.couchdb.db
);

if( cluster.isMaster ) {
    for (var i = 0; i < require('os').cpus().length; i++) {
        cluster.fork();
    }
} else {

    process.on( 'uncaughtException', function(err){
        console.error( err );
    });

    var filter = new RegExp( "\\.("+ config.filter_mime_types.join( '|' ) + ")", "gi" );
    server.start( config.ip, config.port, function (msg) {
        var data = msg;
        try {
            ;
            if( msg.content.match( filter ) ) {
                data = JSON.parse( msg.content.replace( /\w+:\s/g, '' ).replace( /@cee:/g, '') );
            }
        } catch( e ) {
            console.error( e );
        }
        data.createdAt = Date.now();
        db.insert( data, function(err, body) {
            console.log( body || err );
        });
    });
}

