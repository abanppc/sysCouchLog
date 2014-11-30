## Installing

Make sure couchDB & node.js are installed. If you are not sure please check [installation guide](https://github.com/abanppc/sysCouchLog/wiki/Installing-on-CentOS-7)

    
    git clone repo
    cd to source directory
    npm install
    

Create a CouchDB database named *access_log* using [your futon console](http://127.0.0.1:5984/_utils)

## Running

Edit [config.js](https://github.com/abanppc/sysCouchLog/blob/master/config.js), then

    npm start

it will listen on port 1514 and log messages to CouchDB
