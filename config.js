module.exports = {

  ip: '0.0.0.0',
  port: process.env.SYSCOUCHLOG_PORT || 1514,

  filter_mime_types: [ 'mp4', 'flv', 'webm', 'ts' ],

  couchdb: {
    host: process.env.SYSCOUCHLOG_COUCH_HOST || '127.0.0.1',
    port: 5984,
    user: process.env.SYSCOUCHLOG_COUCH_USER || 'admin',
    pass: process.env.SYSCOUCHLOG_COUCH_PASS || 'admin',
    db: process.env.SYSCOUCHLOG_COUCH_DB || 'access_log'
  }

};