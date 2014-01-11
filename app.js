var server = require("./lib/node-listen-udp-syslog");
var listen = {ip:'0.0.0.0',port:1514};

// start server
server.start(listen.ip, listen.port, function (msg, rinfo) {
    console.log(msg);
});
