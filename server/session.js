const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);
const mongoStore = require('connect-mongo')(expressSession);
const logger = require("ljit-logger");
const config = require("./config").get();

const session = (params = {}) => {
    const options = params;

    switch (config.sessionStorage) {
        case 'redis':
            logger.info('use redis as session storage, connect to ' + config.redisURL);
            options.store = new redisStore({
                url: config.redisURL,
                ttl: config.sessionTTL,
            });
            break;
        case 'mongo':
            logger.info('use mongo as session storage, connect to ' + config.mongoURL);
            options.store = new mongoStore({
                url: config.mongoURL,
                ttl: config.sessionTTL,
            });
            break;
        case 'local':
        default:
			options.resave = true;
			options.saveUninitialized = false;
            logger.info('use local as session storage');
            break;
    }

    return expressSession(options);
};

module.exports = session;
