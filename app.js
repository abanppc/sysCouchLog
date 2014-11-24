var server = require("./lib/node-listen-udp-syslog");
var cluster = require( 'cluster' );
var config = require( './config' );
var nano = require('nano');

var db = nano(
    'http://'+config.couchdb.user+":"+config.couchdb.pass+"@"+config.couchdb.host+':' + config.couchdb.port + "/" + config.couchdb.db
);

if( cluster.isMaster ) {
    /*db.create(config.couchdb.db, function (err1) {
        db.get(config.couchdb.db, function(err, body) {
            if (err) {
                console.error(err, err1);
                process.exit(1);
            } else {
                for (var i = 0; i < require('os').cpus().length; i++) {
                    cluster.fork();
                }
            }
        });
    });*/
} else {

    process.on( 'uncaughtException', function(err){
        console.error( err );
    });

    server.start( config.ip, config.port, function (msg) {
        var data = msg;
        try {
            data = JSON.parse( msg.content.replace( /\w+:\s/g, '' ).replace( /@cee:/g, '') );
        } catch( e ) {
            console.error( e );
        }
        data.createdAt = Date.now();
        db.insert( data, function(err, body) {
            console.log( body || err );
        });
    });
}

