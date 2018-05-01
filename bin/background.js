const cronJobServer = require("../server/cronjob");
const emitter = require("../server/event-emitter");
const config = require("../server/config").get();

global.EMITTER = emitter;

cronJobServer.init(emitter, config);
cronJobServer.start();

// register services with emitter
const services = require("../server/emitter-services");
services.get("bandai-stock").subscribe(emitter);
