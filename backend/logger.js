const winston = require('winston');
const { Syslog } = require('winston-syslog');

const logger = winston.createLogger({
  transports: [
    new Syslog({
      host: 'syslog',  
      port: 514,
      protocol: 'udp',
      app_name: 'syslog-app',  
    }),
  ],
});

module.exports = logger;
