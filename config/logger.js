const winston = require('winston');
const fs = require('fs');

if (!fs.existsSync('logs')) {
	fs.mkdirSync('logs');
}

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			 filename: 'logs/briefer.log', 
			 level: 'error',
			 maxFiles: 10,
			 maxsize: 10000000
			}),
	]
});

if(process.env.NODE_ENV !== 'production'){
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
}

module.exports = logger;