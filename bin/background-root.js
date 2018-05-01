const config = require("../server/config").get();
const { hostname, backgroundPort, logLevel, mongoURL } = config;

global.HOSTNAME = hostname;
global.PORT = backgroundPort;
global.LOG_LEVEL = logLevel;
global.MONGO_URL = mongoURL;
global.Promise = require("bluebird");

require("mongoose").Promise = global.Promise;

require("ljit-mongodb").initialize();
// require("./www.js");
require("./background.js");
