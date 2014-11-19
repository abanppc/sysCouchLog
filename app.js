var server = require("./lib/node-listen-udp-syslog");
var cluster = require( 'cluster' );
var config = require( './config' );

var nano   = require('nano')(
    'http://'+config.couchdb.user+":"+config.couchdb.pass+"@"+config.couchdb.host+':' + config.couchdb.port );


if( cluster.isMaster ) {
    nano.db.create(config.couchdb.db, function (err1) {
        nano.db.get(config.couchdb.db, function(err, body) {
            if (err) {
                console.error(err, err1);
                process.exit(1);
            } else {
                for (var i = 0; i < require('os').cpus().length; i++) {
                    cluster.fork();
                }
            }
        });
    });
} else {

    process.on( 'uncaughtException', function(err){
        console.error( err );
    });

    var db = nano.use( config.couchdb.db );

    server.start( config.ip, config.port, function (msg) {
        //console.log( msg );
        var data = msg;
        try {
            data = JSON.parse( msg.content.replace( /\w+:\s/g, '' ) )
        } catch( e ) {
        }
        db.insert( data, function(err, body) {
            console.log( body || err );
        });
    });
}

